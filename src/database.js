// JENU'S Kashmir Valley - Master Database & Admin Operations Engine
// Complete product inventory management, stock toggles, bestseller markers, and live order tracking controller

import { PRODUCTS as SEED_PRODUCTS, CATEGORIES } from './data.js';
import { kashmirAudio } from './audio.js';

export class KashmirDatabase {
  constructor() {
    this.adminCredentials = {
      id: 'admin@jenus.com',
      altId: 'jenus_admin',
      password: 'Kashmir2026!'
    };
    this.subscribers = [];
    this.initDatabase();
  }

  // --- 1. DATABASE INITIALIZATION & LOCALSTORAGE SYNC ---
  initDatabase() {
    // 1. Initialize Products in DB if not present or on version update
    const DB_VERSION = 'v6_all_spices_and_dryfruits';
    if (localStorage.getItem('jenus_db_version') !== DB_VERSION || !localStorage.getItem('jenus_db_products')) {
      const initialProducts = SEED_PRODUCTS.map(p => ({
        ...p,
        inStock: true,
        isBestseller: p.badge === 'Bestseller' || p.badgeType === 'bestseller' || p.id === 'jnu-mamra-01' || p.id === 'jnu-deal-bundle-12',
        stockCount: p.badgeType === 'bestseller' ? 42 : 120
      }));
      localStorage.setItem('jenus_db_products', JSON.stringify(initialProducts));
      localStorage.setItem('jenus_db_version', DB_VERSION);
    }

    // 2. Initialize Orders in DB if not present
    if (!localStorage.getItem('jenus_orders')) {
      localStorage.setItem('jenus_orders', JSON.stringify([]));
    } else {
      // Purge any previously seeded test orders
      try {
        const stored = JSON.parse(localStorage.getItem('jenus_orders') || '[]');
        const cleaned = stored.filter(o => o.orderId !== 'JNU-KSH-849201' && o.orderId !== 'JNU-KSH-610482' && o.customer?.phone !== '9876543210');
        localStorage.setItem('jenus_orders', JSON.stringify(cleaned));
      } catch (e) {}
    }
  }

  // Reactive subscription
  subscribe(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== fn);
    };
  }

  notify(event, payload) {
    this.subscribers.forEach(fn => fn(event, payload));
  }

  // --- 2. PRODUCT CRUD OPERATIONS ---
  getProducts() {
    try {
      const data = localStorage.getItem('jenus_db_products');
      let products = data ? JSON.parse(data) : SEED_PRODUCTS;
      return products.map(p => {
        const seed = SEED_PRODUCTS.find(s => s.id === p.id);
        if (seed) {
          return {
            ...seed,
            ...p,
            image: seed.image,
            images: seed.images || [seed.image],
            comboItems: seed.comboItems || null
          };
        }
        return p;
      });
    } catch (e) {
      return SEED_PRODUCTS;
    }
  }

  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  }

  toggleProductStock(id) {
    const products = this.getProducts();
    const target = products.find(p => p.id === id);
    if (!target) return false;

    target.inStock = !target.inStock;
    localStorage.setItem('jenus_db_products', JSON.stringify(products));
    this.notify('product_updated', target);
    return target.inStock;
  }

  toggleProductBestseller(id) {
    const products = this.getProducts();
    const target = products.find(p => p.id === id);
    if (!target) return false;

    target.isBestseller = !target.isBestseller;
    if (target.isBestseller) {
      target.badge = 'Bestseller';
      target.badgeType = 'bestseller';
    } else {
      target.badge = target.fssaiCertified ? 'FSSAI Certified' : 'Valley Pure';
      target.badgeType = 'fssai';
    }
    localStorage.setItem('jenus_db_products', JSON.stringify(products));
    this.notify('product_updated', target);
    return target.isBestseller;
  }

  updateProductStockCount(id, count) {
    const products = this.getProducts();
    const target = products.find(p => p.id === id);
    if (!target) return;

    target.stockCount = Math.max(0, parseInt(count, 10) || 0);
    target.inStock = target.stockCount > 0;
    localStorage.setItem('jenus_db_products', JSON.stringify(products));
    this.notify('product_updated', target);
  }

  updateProductPrice(id, newPrice) {
    const products = this.getProducts();
    const target = products.find(p => p.id === id);
    if (!target) return null;

    const priceNum = Math.max(1, parseInt(newPrice, 10) || 0);
    if (target.weights && target.weights.length > 0) {
      const defaultIdx = target.weights.findIndex(w => w.isDefault);
      const baseIdx = defaultIdx >= 0 ? defaultIdx : 0;
      const oldBase = target.weights[baseIdx].price;
      const ratio = oldBase > 0 ? priceNum / oldBase : 1;

      target.weights.forEach((w, idx) => {
        if (idx === baseIdx) {
          w.price = priceNum;
          if (w.originalPrice) {
            w.originalPrice = Math.round(priceNum * 1.25);
          }
        } else {
          w.price = Math.round(w.price * ratio);
          if (w.originalPrice) {
            w.originalPrice = Math.round(w.price * 1.25);
          }
        }
      });
    }
    target.price = priceNum;
    localStorage.setItem('jenus_db_products', JSON.stringify(products));
    this.notify('product_updated', target);
    return target;
  }

  // --- 3. ORDERS OPERATIONS & LIVE TRACKING CONTROLLER ---
  getOrders() {
    try {
      const data = localStorage.getItem('jenus_orders');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  updateOrderStatus(orderId, stepNumber, statusText = null) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return false;

    const step = parseInt(stepNumber, 10);
    order.currentStep = step;

    const defaultStatuses = {
      1: 'Harvest Verified & Lab Tested (Pampore & Shopian)',
      2: 'Nitrogen Vacuum Sealed at Srinagar Terminal',
      3: 'In Transit via Express Air Cargo (IndiGo Flight 6E-204)',
      4: 'Arrived at Regional Distribution Hub • Sorting for Courier',
      5: 'Consignment Delivered to Doorstep ✓'
    };

    order.statusText = statusText || defaultStatuses[step] || 'In Transit';
    if (step === 5) {
      order.estimatedDelivery = 'Delivered Successfully';
    }

    localStorage.setItem('jenus_orders', JSON.stringify(orders));
    this.notify('order_updated', order);
    return true;
  }

  updateOrderAwb(orderId, awbNumber, carrier = null) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return false;

    if (awbNumber) order.awbNumber = awbNumber;
    if (carrier) order.carrier = carrier;

    localStorage.setItem('jenus_orders', JSON.stringify(orders));
    this.notify('order_updated', order);
    return true;
  }

  // --- 4. AUTHENTICATION ---
  isAuthenticated() {
    return localStorage.getItem('jenus_admin_auth') === 'true';
  }

  login(id, password) {
    const cleanId = (id || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const idValid = cleanId === this.adminCredentials.id || cleanId === this.adminCredentials.altId;
    const passValid = cleanPass === this.adminCredentials.password;

    if (idValid && passValid) {
      localStorage.setItem('jenus_admin_auth', 'true');
      localStorage.setItem('jenus_admin_user', cleanId);
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin ID or Password. Please check credentials.' };
  }

  logout() {
    localStorage.removeItem('jenus_admin_auth');
    localStorage.removeItem('jenus_admin_user');
    this.notify('admin_logout', null);
  }

  // --- 5. FACTORY RESET ---
  resetToFactoryData() {
    localStorage.removeItem('jenus_db_products');
    localStorage.removeItem('jenus_orders');
    this.initDatabase();
    this.notify('database_reset', null);
  }
}

export const dbStore = new KashmirDatabase();
