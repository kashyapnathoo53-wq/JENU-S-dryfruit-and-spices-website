// JENU'S Cart & Wishlist State Management

import { COUPONS, PRODUCTS } from './data.js';

class CartStore {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.activeCoupon = this.loadCoupon();
    this.shippingThreshold = 499;
    this.standardShippingCost = 99;
    this.listeners = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem('jenus_cart');
      const list = data ? JSON.parse(data) : [];
      return list.map(item => {
        const p = PRODUCTS.find(prod => prod.id === item.id);
        if (p) {
          return {
            ...item,
            image: p.image || item.image,
            images: (p.images && p.images.length > 0) ? p.images : (item.images || [item.image]),
            comboItems: p.comboItems || item.comboItems || null
          };
        }
        return item;
      });
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('jenus_cart', JSON.stringify(this.cart));
    } catch (e) {}
    this.notify();
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem('jenus_wishlist');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem('jenus_wishlist', JSON.stringify(this.wishlist));
    } catch (e) {}
    this.notify();
  }

  loadCoupon() {
    try {
      const data = localStorage.getItem('jenus_coupon');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveCoupon() {
    try {
      if (this.activeCoupon) {
        localStorage.setItem('jenus_coupon', JSON.stringify(this.activeCoupon));
      } else {
        localStorage.removeItem('jenus_coupon');
      }
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.getState()));
  }

  addItem(product, weightObj, quantity = 1) {
    const itemKey = `${product.id}-${weightObj.weight}`;
    const existingIndex = this.cart.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        subname: product.subname,
        image: product.image,
        images: product.images || [product.image],
        comboItems: product.comboItems || null,
        origin: product.origin,
        weight: weightObj.weight,
        price: weightObj.price,
        originalPrice: weightObj.originalPrice,
        quantity: quantity
      });
    }
    this.saveCart();
  }

  updateQuantity(itemKey, change) {
    const item = this.cart.find(i => i.key === itemKey);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(i => i.key !== itemKey);
    }
    this.saveCart();
  }

  removeItem(itemKey) {
    this.cart = this.cart.filter(i => i.key !== itemKey);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  toggleWishlist(product) {
    const exists = this.wishlist.some(p => p.id === product.id);
    if (exists) {
      this.wishlist = this.wishlist.filter(p => p.id !== product.id);
    } else {
      const w0 = (product.weights && product.weights[0]) ? product.weights[0] : null;
      this.wishlist.push({
        id: product.id,
        name: product.name,
        subname: product.subname || '',
        image: product.image,
        price: w0 ? w0.price : (product.price || 0),
        originalPrice: w0 ? w0.originalPrice : (product.originalPrice || 0),
        weight: w0 ? w0.weight : '500g',
        origin: product.origin || 'Kashmir Valley'
      });
    }
    this.saveWishlist();
    return !exists;
  }

  removeFromWishlist(productId) {
    this.wishlist = this.wishlist.filter(p => p.id !== productId);
    this.saveWishlist();
  }

  clearWishlist() {
    this.wishlist = [];
    this.saveWishlist();
  }

  isInWishlist(productId) {
    return this.wishlist.some(p => p.id === productId);
  }

  applyCoupon(code) {
    const upper = (code || '').trim().toUpperCase();
    if (!COUPONS[upper]) {
      return { success: false, message: 'Invalid or expired valley coupon code.' };
    }

    const subtotal = this.getSubtotal();
    const couponData = COUPONS[upper];

    if (subtotal < couponData.minOrder) {
      return {
        success: false,
        message: `Coupon requires minimum order of ₹${couponData.minOrder}. Add ₹${couponData.minOrder - subtotal} more.`
      };
    }

    this.activeCoupon = {
      code: upper,
      ...couponData
    };
    this.saveCoupon();
    return { success: true, message: `Coupon ${upper} applied! ${couponData.description}` };
  }

  removeCoupon() {
    this.activeCoupon = null;
    this.saveCoupon();
  }

  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getOriginalSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  }

  getDiscount() {
    if (!this.activeCoupon) return 0;
    const subtotal = this.getSubtotal();

    if (this.activeCoupon.type === 'percent') {
      return Math.round((subtotal * this.activeCoupon.value) / 100);
    } else if (this.activeCoupon.type === 'flat') {
      return Math.min(this.activeCoupon.value, subtotal);
    }
    return 0;
  }

  getShippingCost() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= this.shippingThreshold ? 0 : this.standardShippingCost;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const discount = this.getDiscount();
    const shipping = this.getShippingCost();
    return Math.max(0, subtotal - discount + shipping);
  }

  getTotalCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getState() {
    const subtotal = this.getSubtotal();
    const originalSubtotal = this.getOriginalSubtotal();
    const discount = this.getDiscount();
    const shipping = this.getShippingCost();
    const total = this.getTotal();
    const totalCount = this.getTotalCount();
    const freeShippingRemaining = Math.max(0, this.shippingThreshold - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / this.shippingThreshold) * 100));

    return {
      cart: this.cart,
      wishlist: this.wishlist,
      wishlistCount: this.wishlist.length,
      activeCoupon: this.activeCoupon,
      subtotal,
      originalSubtotal,
      savings: Math.max(0, originalSubtotal - subtotal) + discount,
      discount,
      shipping,
      total,
      totalCount,
      freeShippingThreshold: this.shippingThreshold,
      freeShippingRemaining,
      freeShippingProgress
    };
  }
}

export const cartStore = new CartStore();
