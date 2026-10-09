// JENU'S Kashmir Valley - Master API Client
// Direct bridge between Vite storefront and Python Flask REST API

const API_BASE = (import.meta.env?.VITE_API_URL || '').replace(/\/$/, '') || '/api';

class ApiClient {
  constructor() {
    this.tokenKey = 'jenus_admin_token';
  }

  getAdminToken() {
    try {
      return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey) || null;
    } catch {
      return null;
    }
  }

  setAdminToken(token, remember = true) {
    try {
      if (remember) {
        localStorage.setItem(this.tokenKey, token);
      } else {
        sessionStorage.setItem(this.tokenKey, token);
      }
    } catch (e) {
      console.warn('Could not store admin token:', e);
    }
  }

  removeAdminToken() {
    try {
      localStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.tokenKey);
    } catch {}
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const token = this.getAdminToken();
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const isJson = (response.headers.get('content-type') || '').includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const errorMsg = (data && data.error) || response.statusText || 'API request failed';
        const err = new Error(errorMsg);
        err.status = response.status;
        err.data = data;
        throw err;
      }

      return data;
    } catch (error) {
      console.warn(`[API] Error on ${options.method || 'GET'} ${url}:`, error.message);
      throw error;
    }
  }

  // --- PUBLIC ENDPOINTS ---

  async getHealth() {
    return this.request('/health');
  }

  async getConfig() {
    return this.request('/config');
  }

  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.sort) query.set('sort', params.sort);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/products${qs}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async validateCart(items, promoCode = null) {
    return this.request('/cart/validate', {
      method: 'POST',
      body: JSON.stringify({ items, promoCode }),
    });
  }

  async createOrder(orderPayload) {
    return this.request('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
  }

  async getOrder(orderNumber) {
    return this.request(`/orders/${orderNumber}`);
  }

  async trackOrders(query) {
    // query can be phone string or { phone, orderNumber }
    const payload = typeof query === 'string' ? { phone: query } : query;
    return this.request('/orders/track', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async verifyPayment(verificationPayload) {
    return this.request('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(verificationPayload),
    });
  }

  async submitWholesaleInquiry(data) {
    return this.request('/wholesale', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // --- ADMIN ENDPOINTS (REQUIRES JWT) ---

  async adminLogin(email, password) {
    const res = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      this.setAdminToken(res.token);
    }
    return res;
  }

  async getAdminDashboard() {
    return this.request('/admin/dashboard');
  }

  async getAdminProducts() {
    return this.request('/admin/products');
  }

  async updateProduct(id, updates) {
    return this.request(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async getAdminOrders(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    if (params.page) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/admin/orders${qs}`);
  }

  async updateOrderStatus(orderId, currentStep, statusText = null) {
    return this.request(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ currentStep, statusText }),
    });
  }

  async updateOrderAwb(orderId, awbNumber, carrier = null) {
    return this.request(`/admin/orders/${orderId}/awb`, {
      method: 'PUT',
      body: JSON.stringify({ awbNumber, carrier }),
    });
  }

  async getAdminWholesale(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/wholesale${qs}`);
  }

  async updateWholesaleStatus(refIdOrId, status) {
    return this.request(`/admin/wholesale/${refIdOrId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

export const api = new ApiClient();
