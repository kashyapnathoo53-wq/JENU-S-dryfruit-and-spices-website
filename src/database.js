// JENU'S Kashmir Valley - Master Database & Admin Operations Engine
// Complete product inventory management, stock toggles, bestseller markers, and live order tracking controller
// Synchronized with Python Flask REST API & PostgreSQL (Supabase)

import { PRODUCTS as SEED_PRODUCTS, CATEGORIES } from './data.js';
import { kashmirAudio } from './audio.js';
import { api } from './api.js';

export class KashmirDatabase {
  constructor() {
    this.subscribers = [];
    this.initDatabase();
    this.syncFromBackend();
  }

  // --- 1. DATABASE INITIALIZATION & LOCALSTORAGE SYNC ---
  initDatabase() {
    // 1. Initialize Products in DB if not present or on version update
    const DB_VERSION = 'v8_rest_api_supabase_ready';
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
    }
  }

  // Background sync from backend REST API
  async syncFromBackend() {
    try {
      const res = await api.getProducts();
      if (res && res.products && Array.isArray(res.products) && res.products.length > 0) {
        // Merge backend values into local store
        const current = this.getProducts();
        const merged = current.map(p => {
          const backendProd = res.products.find(bp => bp.id === p.id);
          if (backendProd) {
            return {
              ...p,
              price: backendProd.price,
              inStock: backendProd.inStock,
              stockCount: backendProd.stockCount,
              isBestseller: backendProd.isBestseller,
              badge: backendProd.badge || p.badge,
              weights: backendProd.weights && backendProd.weights.length > 0 ? backendProd.weights : p.weights
            };
          }
          return p;
        });
        localStorage.setItem('jenus_db_products', JSON.stringify(merged));
        this.notify('products_synced', merged);
      }
    } catch (e) {
      // Backend may be starting or offline, fallback to local storage
      console.info('[KashmirDatabase] Running in cached mode:', e.message);
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
    this.subscribers.forEach(fn => {
      try {
        fn(event, payload);
      } catch (e) {
        console.error('Subscriber error:', e);
      }
    });
  }

  // --- 2. PRODUCT CRUD OPERATIONS ---
  getProducts() {
    try {
      const data = localStorage.getItem('jenus_db_products');
      let products = data ? JSON.parse(data) : SEED_PRODUCTS;
      
      const existingIds = new Set(products.map(p => p.id));
      SEED_PRODUCTS.forEach(sp => {
        if (!existingIds.has(sp.id)) {
          products.push({
            ...sp,
            inStock: true,
            isBestseller: sp.badge === 'Bestseller' || sp.badgeType === 'bestseller',
            stockCount: 80
          });
        }
      });

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

    // Sync to backend API asynchronously
    api.updateProduct(id, { inStock: target.inStock }).catch(err => {
      console.warn('Backend sync warning (stock toggle):', err.message);
    });

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

    // Sync to backend API
    api.updateProduct(id, {
      isBestseller: target.isBestseller,
      badge: target.badge,
      badgeType: target.badgeType
    }).catch(err => {
      console.warn('Backend sync warning (bestseller toggle):', err.message);
    });

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

    // Sync to backend API
    api.updateProduct(id, {
      stockCount: target.stockCount,
      inStock: target.inStock
    }).catch(err => {
      console.warn('Backend sync warning (stock count):', err.message);
    });
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

    // Sync to backend API
    api.updateProduct(id, { price: priceNum }).catch(err => {
      console.warn('Backend sync warning (price update):', err.message);
    });

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

  async syncOrdersFromBackend() {
    if (!this.isAuthenticated()) return;
    try {
      const res = await api.getAdminOrders({ limit: 50 });
      if (res && res.orders && Array.isArray(res.orders)) {
        localStorage.setItem('jenus_orders', JSON.stringify(res.orders));
        this.notify('orders_synced', res.orders);
        return res.orders;
      }
    } catch (e) {
      console.warn('Could not sync orders from backend:', e.message);
    }
    return this.getOrders();
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

    // Sync to backend API
    api.updateOrderStatus(orderId, step, order.statusText).catch(err => {
      console.warn('Backend sync warning (order status):', err.message);
    });

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

    // Sync to backend API
    api.updateOrderAwb(orderId, order.awbNumber, order.carrier).catch(err => {
      console.warn('Backend sync warning (order AWB):', err.message);
    });

    return true;
  }

  // --- 4. AUTHENTICATION ---
  isAuthenticated() {
    return Boolean(api.getAdminToken()) || localStorage.getItem('jenus_admin_auth') === 'true';
  }

  async login(id, password) {
    const cleanId = (id || '').trim();
    const cleanPass = (password || '').trim();

    try {
      const res = await api.adminLogin(cleanId, cleanPass);
      if (res && res.token) {
        localStorage.setItem('jenus_admin_auth', 'true');
        localStorage.setItem('jenus_admin_user', res.admin?.email || cleanId);
        // Refresh orders from backend upon successful login
        this.syncOrdersFromBackend();
        return { success: true, admin: res.admin };
      }
    } catch (err) {
      const msg = err.data?.error || err.message || 'Invalid Admin ID or Password.';
      return { success: false, message: msg };
    }

    return { success: false, message: 'Invalid Admin ID or Password. Please check credentials.' };
  }

  logout() {
    api.removeAdminToken();
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
