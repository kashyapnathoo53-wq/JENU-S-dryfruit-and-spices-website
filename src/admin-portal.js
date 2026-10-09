// JENU'S Kashmir Valley - Master Database & Admin Portal Controller
// Full-screen administrative suite for inventory toggles, bestsellers, and live air-cargo shipment status

import { dbStore } from './database.js';
import { kashmirAudio } from './audio.js';
import { wholesaleManager } from './wholesale.js';

export class AdminPortalManager {
  constructor() {
    this.loginModalEl = null;
    this.portalEl = null;
    this.activeTab = 'products'; // 'dashboard' | 'products' | 'orders' | 'wholesale' | 'utilities'
    this.searchQuery = '';
    this.categoryFilter = 'all';
    this.initDOM();
    this.bindGlobalTriggers();
    this.initWholesaleListeners();
  }

  initWholesaleListeners() {
    window.addEventListener('wholesale-inquiry-created', () => {
      this.updateWholesaleBadge();
      if (this.activeTab === 'wholesale') {
        const viewport = document.getElementById('admin-suite-viewport');
        if (viewport) this.renderWholesaleTab(viewport);
      }
    });

    window.addEventListener('wholesale-inquiry-updated', () => {
      this.updateWholesaleBadge();
    });
  }

  updateWholesaleBadge() {
    const badge = document.getElementById('admin-wholesale-count');
    if (!badge) return;
    const unread = wholesaleManager.getUnreadCount();
    if (unread > 0) {
      badge.textContent = `⚡ ${unread} New`;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  initDOM() {
    this.createLoginModal();
    this.createDatabasePortal();
  }

  // --- 1. ADMIN LOGIN MODAL ---
  createLoginModal() {
    if (document.getElementById('admin-login-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'admin-login-modal';
    modal.className = 'kashmir-modal-overlay hidden';
    modal.innerHTML = `
      <div class="kashmir-modal-card admin-login-card animate-scale-up">
        <div class="admin-login-header">
          <div class="admin-crest-row">
            <span class="admin-crown-icon">🛡️</span>
            <div class="admin-shield-text">
              <h4>JENU'S Administrative Terminal</h4>
              <p>Confidential Operations & Master Database Access</p>
            </div>
          </div>
          <button type="button" class="modal-close-btn" id="btn-close-admin-login" title="Close">&times;</button>
        </div>

        <div class="admin-login-body">
          <div class="admin-security-alert">
            <span class="alert-icon">🔒</span>
            <div>
              <strong>Confidential Gateway</strong>
              <p>Restricted access node. Entering administrator credentials automatically loads and enables real-time edits in the Master Database.</p>
            </div>
          </div>

          <div id="admin-login-feedback" class="admin-login-feedback hidden"></div>

          <form id="admin-login-form" class="admin-login-form" autocomplete="off">
            <div class="admin-input-group">
              <label for="admin-user-id">Administrator ID</label>
              <div class="admin-input-box">
                <span class="input-icon">👤</span>
                <input type="text" id="admin-user-id" placeholder="Enter administrative identifier..." value="" required autocomplete="username" />
              </div>
            </div>

            <div class="admin-input-group">
              <label for="admin-password">Administrative Access Key</label>
              <div class="admin-input-box">
                <span class="input-icon">🔑</span>
                <input type="password" id="admin-password" placeholder="••••••••••••" value="" required autocomplete="current-password" />
                <button type="button" class="btn-toggle-pwd" id="btn-toggle-admin-pwd" title="Show/Hide Access Key">👁️</button>
              </div>
            </div>

            <button type="submit" class="btn-submit-admin-login" id="btn-submit-admin-login">
              <span>Authenticate & Enter Master Database ➔</span>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.loginModalEl = modal;

    // Close button
    document.getElementById('btn-close-admin-login')?.addEventListener('click', () => {
      this.closeLoginModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeLoginModal();
    });

    // Toggle password
    document.getElementById('btn-toggle-admin-pwd')?.addEventListener('click', () => {
      const pwdInput = document.getElementById('admin-password');
      if (pwdInput) {
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      }
    });

    // Login Form Submit
    document.getElementById('admin-login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('admin-user-id')?.value;
      const pwd = document.getElementById('admin-password')?.value;
      const feedback = document.getElementById('admin-login-feedback');
      const submitBtn = document.getElementById('btn-submit-admin-login');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.querySelector('span').textContent = 'Authenticating with Secure Server...';
      }

      try {
        const result = await dbStore.login(id, pwd);
        if (result.success) {
          if (feedback) feedback.classList.add('hidden');
          const pwdInput = document.getElementById('admin-password');
          if (pwdInput) pwdInput.value = '';
          this.closeLoginModal();
          kashmirAudio.playCelebrationChime();
          this.openDatabasePortal();
          this.flashAutoSaveStatus('✓ Administrator Authenticated • Master Database Live');
        } else {
          if (feedback) {
            feedback.textContent = result.message || 'Invalid administrative credentials. Access restricted.';
            feedback.classList.remove('hidden');
            feedback.classList.add('animate-shake');
            setTimeout(() => feedback.classList.remove('animate-shake'), 600);
          } else {
            alert(result.message || 'Invalid administrative credentials.');
          }
          kashmirAudio.playSantoorNote(330);
        }
      } catch (err) {
        if (feedback) {
          feedback.textContent = 'Server connection error. Please try again.';
          feedback.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.querySelector('span').textContent = 'Authenticate & Enter Master Database ➔';
        }
      }
    });
  }

  // --- 2. FULL-SCREEN DATABASE PORTAL SUITE ---
  createDatabasePortal() {
    if (document.getElementById('admin-database-portal')) return;

    const portal = document.createElement('div');
    portal.id = 'admin-database-portal';
    portal.className = 'admin-portal-suite hidden';
    portal.innerHTML = `
      <!-- Top Operations Bar -->
      <header class="admin-suite-header">
        <div class="admin-suite-brand">
          <img src="/favicon.svg" alt="JENU'S" class="admin-brand-icon" style="width: 32px; height: 32px; border-radius: 6px;"/>
          <div>
            <h3>JENU'S Master Database & Operations Suite</h3>
            <div class="db-sync-meta-row" style="display:flex; align-items:center; gap:10px; margin-top:3px; flex-wrap:wrap;">
              <span class="db-sync-chip"><span class="live-pulse-dot"></span> Reactive Database Connected • J&K Hub</span>
              <span class="db-autosave-live-pill" id="db-live-sync-indicator">⚡ Auto-Save Active • Real-time Sync</span>
            </div>
          </div>
        </div>

        <div class="admin-suite-actions">
          <span class="admin-user-tag">👤 admin@jenus.com</span>
          <button type="button" class="btn-suite-preview" id="btn-suite-view-store">
            🛒 View Live Storefront
          </button>
          <button type="button" class="btn-suite-logout" id="btn-suite-logout">
            🔒 Log Out
          </button>
        </div>
      </header>

      <!-- Suite Navigation Tabs -->
      <nav class="admin-suite-nav">
        <button class="suite-nav-btn active" data-tab="products">
          <span>📦</span> Products & Inventory Database
        </button>
        <button class="suite-nav-btn" data-tab="orders">
          <span>🚚</span> Orders & Live Shipment Stepper
        </button>
        <button class="suite-nav-btn" data-tab="wholesale">
          <span>⚡</span> Wholesale Bulk Leads <span class="admin-wholesale-badge hidden" id="admin-wholesale-count">0</span>
        </button>
        <button class="suite-nav-btn" data-tab="dashboard">
          <span>📊</span> Financial & Sales Overview
        </button>
        <button class="suite-nav-btn" data-tab="utilities">
          <span>⚙️</span> Database Utilities
        </button>
      </nav>

      <!-- Suite Main Content Viewport -->
      <main class="admin-suite-content" id="admin-suite-viewport">
        <!-- Rendered dynamically based on active tab -->
      </main>
    `;

    document.body.appendChild(portal);
    this.portalEl = portal;

    // View storefront button
    document.getElementById('btn-suite-view-store')?.addEventListener('click', () => {
      this.closeDatabasePortal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Logout button
    document.getElementById('btn-suite-logout')?.addEventListener('click', () => {
      dbStore.logout();
      this.closeDatabasePortal();
      alert('You have been logged out of JENU\'S Master Database.');
    });

    // Tab buttons
    portal.querySelectorAll('.suite-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        portal.querySelectorAll('.suite-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = btn.dataset.tab;
        this.renderActiveTab();
        kashmirAudio.playSantoorNote(523.25);
      });
    });

    this.updateWholesaleBadge();
  }

  // --- 3. RENDERING ACTIVE VIEW ---
  renderActiveTab() {
    const viewport = document.getElementById('admin-suite-viewport');
    if (!viewport) return;

    if (this.activeTab === 'products') {
      this.renderProductsTab(viewport);
    } else if (this.activeTab === 'orders') {
      this.renderOrdersTab(viewport);
    } else if (this.activeTab === 'wholesale') {
      this.renderWholesaleTab(viewport);
    } else if (this.activeTab === 'dashboard') {
      this.renderDashboardTab(viewport);
    } else if (this.activeTab === 'utilities') {
      this.renderUtilitiesTab(viewport);
    }
  }

  // TAB 1: PRODUCTS INVENTORY & BESTSELLER DATABASE
  renderProductsTab(container) {
    const products = dbStore.getProducts();

    // Stats
    const totalSkus = products.length;
    const inStockCount = products.filter(p => p.inStock).length;
    const outOfStockCount = totalSkus - inStockCount;
    const bestsellerCount = products.filter(p => p.isBestseller).length;

    let filtered = [...products];
    if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === this.categoryFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.origin.toLowerCase().includes(q));
    }

    const rowsHtml = filtered.map(p => {
      const defaultPrice = p.weights?.[0]?.price || 0;
      return `
        <tr class="product-db-row ${!p.inStock ? 'is-out-of-stock' : ''}">
          <td class="col-thumb">
            <img src="${p.image}" alt="${p.name}" class="db-product-thumb" />
          </td>
          <td class="col-title">
            <strong>${p.name}</strong>
            <small>${p.origin} • ${p.category}</small>
          </td>
          <td class="col-price">
            <div class="db-price-editor">
              <span class="currency-tag">₹</span>
              <input type="number" 
                     class="input-db-price" 
                     data-pid="${p.id}" 
                     value="${defaultPrice}" 
                     min="1" max="99999" 
                     title="Edit price in database (auto-saves)" />
            </div>
          </td>
          <td class="col-stock-toggle">
            <button type="button" 
                    class="btn-toggle-stock ${p.inStock ? 'in-stock' : 'out-of-stock'}" 
                    data-pid="${p.id}"
                    title="Click to toggle In Stock / Out of Stock">
              ${p.inStock ? '✓ In Stock' : '✕ Out of Stock'}
            </button>
          </td>
          <td class="col-bestseller-toggle">
            <button type="button" 
                    class="btn-toggle-bestseller ${p.isBestseller ? 'is-bestseller' : 'regular'}" 
                    data-pid="${p.id}"
                    title="Click to toggle Bestseller badge">
              ${p.isBestseller ? '⭐ Bestseller' : '☆ Regular'}
            </button>
          </td>
          <td class="col-units">
            <div class="db-units-editor">
              <input type="number" 
                     class="input-stock-units" 
                     data-pid="${p.id}" 
                     value="${p.stockCount !== undefined ? p.stockCount : (p.inStock ? 50 : 0)}" 
                     min="0" max="9999" />
              <span class="unit-tag">packs</span>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="suite-products-view">
        <!-- Quick Stats Cards -->
        <div class="db-metric-cards-grid">
          <div class="metric-card">
            <span class="metric-label">Total Gourmet SKUs</span>
            <strong class="metric-num">${totalSkus}</strong>
            <small class="metric-sub">Active in Catalog</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Products In Stock</span>
            <strong class="metric-num text-emerald">${inStockCount}</strong>
            <small class="metric-sub">Ready for Dispatch</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Out of Stock Alerts</span>
            <strong class="metric-num ${outOfStockCount > 0 ? 'text-danger' : 'text-muted'}">${outOfStockCount}</strong>
            <small class="metric-sub">Auto-disabled on Storefront</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Bestseller Badges</span>
            <strong class="metric-num text-gold">${bestsellerCount}</strong>
            <small class="metric-sub">High Priority Highlights</small>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="db-toolbar">
          <div class="db-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="db-search-input" placeholder="Search by product name, origin, or category..." value="${this.searchQuery}" />
          </div>

          <div class="db-filter-group">
            <label>Filter by Category:</label>
            <select id="db-category-select">
              <option value="all" ${this.categoryFilter === 'all' ? 'selected' : ''}>All Categories (${totalSkus})</option>
              <option value="combos" ${this.categoryFilter === 'combos' ? 'selected' : ''}>Value Combos</option>
              <option value="spices" ${this.categoryFilter === 'spices' ? 'selected' : ''}>Authentic Spices</option>
              <option value="walnuts" ${this.categoryFilter === 'walnuts' ? 'selected' : ''}>Snow Walnuts</option>
              <option value="almonds" ${this.categoryFilter === 'almonds' ? 'selected' : ''}>Mamra Almonds</option>
              <option value="saffron" ${this.categoryFilter === 'saffron' ? 'selected' : ''}>Pampore Saffron</option>
              <option value="dried-fruits" ${this.categoryFilter === 'dried-fruits' ? 'selected' : ''}>Figs & Apricots</option>
              <option value="hampers" ${this.categoryFilter === 'hampers' ? 'selected' : ''}>Gourmet Hampers</option>
            </select>
          </div>
        </div>

        <!-- Products Database Table -->
        <div class="db-table-container">
          <table class="db-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Product & Origin</th>
                <th>Price</th>
                <th>Inventory Status</th>
                <th>Bestseller Marker</th>
                <th>Stock Units</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind Search Input
    document.getElementById('db-search-input')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderProductsTab(container);
    });

    // Bind Category Select
    document.getElementById('db-category-select')?.addEventListener('change', (e) => {
      this.categoryFilter = e.target.value;
      this.renderProductsTab(container);
    });

    // Bind Price Input (Auto-saves to DB instantly on change)
    container.querySelectorAll('.input-db-price').forEach(input => {
      input.addEventListener('change', () => {
        const pid = input.dataset.pid;
        dbStore.updateProductPrice(pid, input.value);
        this.flashAutoSaveStatus(`✓ Price auto-saved to Database: ₹${input.value}`);
        kashmirAudio.playSantoorNote(587.33);
      });
    });

    // Bind Stock Toggle
    container.querySelectorAll('.btn-toggle-stock').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.pid;
        const nowInStock = dbStore.toggleProductStock(pid);
        kashmirAudio.playSantoorNote(nowInStock ? 659.25 : 440);
        this.flashAutoSaveStatus(`✓ Inventory status auto-saved: ${nowInStock ? 'In Stock' : 'Out of Stock'}`);
        this.renderProductsTab(container);
      });
    });

    // Bind Bestseller Toggle
    container.querySelectorAll('.btn-toggle-bestseller').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.pid;
        const nowBestseller = dbStore.toggleProductBestseller(pid);
        kashmirAudio.playSantoorNote(nowBestseller ? 783.99 : 523.25);
        this.flashAutoSaveStatus(`✓ Bestseller status auto-saved: ${nowBestseller ? 'Highlighted' : 'Regular'}`);
        this.renderProductsTab(container);
      });
    });

    // Bind Units Input
    container.querySelectorAll('.input-stock-units').forEach(input => {
      input.addEventListener('change', () => {
        const pid = input.dataset.pid;
        dbStore.updateProductStockCount(pid, input.value);
        this.flashAutoSaveStatus(`✓ Stock units auto-saved to Database: ${input.value} packs`);
        this.renderProductsTab(container);
      });
    });
  }

  // TAB 2: ORDERS DATABASE & LIVE AIR CARGO SHIPMENT CONTROLLER
  renderOrdersTab(container) {
    const orders = dbStore.getOrders();
    const totalOrders = orders.length;
    const totalGrossRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const ordersCardsHtml = orders.map((order, idx) => {
      const step = order.currentStep || 2;
      return `
        <div class="db-order-card">
          <!-- Order Card Header -->
          <div class="db-order-card-header">
            <div class="db-order-meta">
              <span class="db-order-badge">Consignment #${order.orderId}</span>
              <strong>Placed: ${order.placedDate} • Ref: <code>${order.paymentId || 'pay_RzpKsh'}</code></strong>
              <small>Payment Method: ${order.method || 'Razorpay Prepaid'}</small>
            </div>
            <div class="db-order-total-badge">
              <span>Total Paid via Razorpay</span>
              <strong>₹${(order.total || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <!-- Customer & Items Row -->
          <div class="db-order-info-grid">
            <div class="db-customer-box">
              <h6>👤 Customer & Consignment Destination:</h6>
              <p><strong>${order.customer?.name || 'Gourmet Patron'}</strong> ${order.customer?.phone ? `(📱 +91 ${order.customer.phone})` : ''}</p>
              <p>${order.customer?.address || 'Self-Pickup / Standard Fulfillment'}${order.customer?.city ? `, ${order.customer.city}` : ''}${order.customer?.pincode ? ` - ${order.customer.pincode}` : ''}</p>
            </div>

            <div class="db-items-summary-box">
              <h6>📦 Consignment Contents (${(order.items || []).length} items):</h6>
              <div class="db-items-mini-list">
                ${(order.items || []).map(item => `
                  <div class="db-mini-item">
                    <span>• <strong>${item.name}</strong> (${item.weight || 'Std'}) × ${item.quantity || 1}</span>
                    <span>₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Live Shipment Stepper Controller -->
          <div class="db-shipment-controller">
            <div class="controller-title-row">
              <span class="stepper-pulse-icon"></span>
              <strong>Live Air Cargo Tracking Stage: <span class="text-emerald" id="status-text-${order.orderId}">${order.statusText || 'In Transit'}</span></strong>
            </div>

            <!-- Interactive Step Buttons -->
            <div class="admin-stepper-buttons">
              <button type="button" class="btn-set-step ${step === 1 ? 'current' : ''} ${step > 1 ? 'done' : ''}" data-oid="${order.orderId}" data-step="1">
                <span>1</span> Harvest Tested
              </button>
              <button type="button" class="btn-set-step ${step === 2 ? 'current' : ''} ${step > 2 ? 'done' : ''}" data-oid="${order.orderId}" data-step="2">
                <span>2</span> Nitrogen Sealed
              </button>
              <button type="button" class="btn-set-step ${step === 3 ? 'current' : ''} ${step > 3 ? 'done' : ''}" data-oid="${order.orderId}" data-step="3">
                <span>3</span> ✈️ Air Cargo (Flight 6E-204)
              </button>
              <button type="button" class="btn-set-step ${step === 4 ? 'current' : ''} ${step > 4 ? 'done' : ''}" data-oid="${order.orderId}" data-step="4">
                <span>4</span> 🚚 Regional Hub
              </button>
              <button type="button" class="btn-set-step ${step === 5 ? 'current' : ''}" data-oid="${order.orderId}" data-step="5">
                <span>5</span> 🏡 Delivered
              </button>
            </div>

            <!-- AWB Airway Bill Quick Edit -->
            <div class="db-awb-edit-row">
              <div class="awb-field">
                <label>Airway Bill (AWB Number):</label>
                <input type="text" class="input-awb" id="awb-input-${order.orderId}" value="${order.awbNumber || 'AWB-6E-4819204'}" />
              </div>
              <div class="awb-field">
                <label>Air Cargo Carrier:</label>
                <input type="text" class="input-carrier" id="carrier-input-${order.orderId}" value="${order.carrier || 'IndiGo Air Cargo 6E-204'}" />
              </div>
              <button type="button" class="btn-save-awb" data-oid="${order.orderId}">
                Save Telemetry Details ✓
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="suite-orders-view">
        <div class="db-metric-cards-grid">
          <div class="metric-card">
            <span class="metric-label">Total Consignments</span>
            <strong class="metric-num">${totalOrders}</strong>
            <small class="metric-sub">Recorded in Database</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Gross Revenue (Prepaid)</span>
            <strong class="metric-num text-emerald">₹${totalGrossRevenue.toLocaleString('en-IN')}</strong>
            <small class="metric-sub">100% Captured via Razorpay</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Active Air Shipments</span>
            <strong class="metric-num text-gold">${orders.filter(o => (o.currentStep || 1) < 5).length}</strong>
            <small class="metric-sub">In Transit from Srinagar</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Delivered Doorstep</span>
            <strong class="metric-num text-emerald">${orders.filter(o => o.currentStep === 5).length}</strong>
            <small class="metric-sub">Consignments Completed</small>
          </div>
        </div>

        <div class="db-orders-list">
          ${orders.length > 0 ? ordersCardsHtml : `
            <div class="empty-orders-banner">
              <h4>No Customer Orders Placed Yet</h4>
              <p>Any order placed on the website via Razorpay will appear here with live tracking telemetry.</p>
            </div>
          `}
        </div>
      </div>
    `;

    // Bind Stepper Click Buttons
    container.querySelectorAll('.btn-set-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const oid = btn.dataset.oid;
        const step = btn.dataset.step;
        dbStore.updateOrderStatus(oid, step);
        kashmirAudio.playSantoorNote(659.25);
        this.renderOrdersTab(container);
      });
    });

    // Bind AWB Save
    container.querySelectorAll('.btn-save-awb').forEach(btn => {
      btn.addEventListener('click', () => {
        const oid = btn.dataset.oid;
        const awb = document.getElementById(`awb-input-${oid}`)?.value;
        const carrier = document.getElementById(`carrier-input-${oid}`)?.value;
        dbStore.updateOrderAwb(oid, awb, carrier);
        kashmirAudio.playCelebrationChime();
        alert(`Airway Bill updated to ${awb} for Order #${oid}. Live customer phone tracker is now updated!`);
        this.renderOrdersTab(container);
      });
    });
  }

  // TAB 3: DASHBOARD & REVENUE ANALYTICS
  renderDashboardTab(container) {
    const products = dbStore.getProducts();
    const orders = dbStore.getOrders();
    const totalGrossRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    container.innerHTML = `
      <div class="suite-dashboard-view">
        <div class="db-metric-cards-grid">
          <div class="metric-card">
            <span class="metric-label">Total Gross Sales</span>
            <strong class="metric-num text-emerald">₹${totalGrossRevenue.toLocaleString('en-IN')}</strong>
            <small class="metric-sub">Razorpay Sandbox Verified</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Total Customer Orders</span>
            <strong class="metric-num">${orders.length}</strong>
            <small class="metric-sub">Average Order: ₹${orders.length ? Math.round(totalGrossRevenue / orders.length) : 0}</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Active Valley SKUs</span>
            <strong class="metric-num">${products.length}</strong>
            <small class="metric-sub">100% FSSAI Certified Products</small>
          </div>
          <div class="metric-card">
            <span class="metric-label">Srinagar Hub Cold-Storage</span>
            <strong class="metric-num text-emerald">4°C Active</strong>
            <small class="metric-sub">Nitrogen Vacuum Packaging</small>
          </div>
        </div>

        <div class="dashboard-sections-grid">
          <div class="dash-card">
            <h4>🌿 Top Flagship Harvest Products</h4>
            <div class="dash-products-list">
              ${products.slice(0, 5).map(p => `
                <div class="dash-product-row">
                  <img src="${p.image}" alt="${p.name}" class="dash-thumb" />
                  <div class="dash-info">
                    <strong>${p.name}</strong>
                    <span>${p.origin} • Rating: ★ ${p.rating} (${p.reviewsCount} reviews)</span>
                  </div>
                  <span class="dash-badge ${p.inStock ? 'in-stock' : 'out'}">${p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="dash-card">
            <h4>✈️ Srinagar International Airport Cargo Status</h4>
            <div class="dash-cargo-feed">
              <div class="cargo-row">
                <span>Flight 6E-204 (Srinagar ➔ Delhi)</span>
                <strong class="text-emerald">Departed On Time</strong>
              </div>
              <div class="cargo-row">
                <span>Flight AI-826 (Srinagar ➔ Mumbai)</span>
                <strong class="text-emerald">Scheduled 04:15 PM</strong>
              </div>
              <div class="cargo-row">
                <span>FSSAI Quality Titration Lab</span>
                <strong class="text-emerald">Batch Certified 100% Pure</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 4: DATABASE UTILITIES & BACKUPS
  renderUtilitiesTab(container) {
    container.innerHTML = `
      <div class="suite-utilities-view">
        <div class="utilities-card">
          <h4>📥 Export Database (JSON Backup)</h4>
          <p>Download a complete JSON snapshot of all products, stock levels, orders, and consignment tracking states.</p>
          <button type="button" class="btn-util" id="btn-export-db">Download Database JSON ➔</button>
        </div>

        <div class="utilities-card danger">
          <h4>🔄 Reset to Factory Default Seed</h4>
          <p>Reset the product database, stock toggles, and orders to original default state. Useful for resetting test data.</p>
          <button type="button" class="btn-util danger" id="btn-reset-db">Reset Database to Default</button>
        </div>
      </div>
    `;

    document.getElementById('btn-export-db')?.addEventListener('click', () => {
      const dump = {
        exportedAt: new Date().toISOString(),
        products: dbStore.getProducts(),
        orders: dbStore.getOrders()
      };
      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jenus_kashmir_database_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('btn-reset-db')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all products and orders to factory default?')) {
        dbStore.resetToFactoryData();
        alert('Database has been reset to factory seed.');
        this.renderActiveTab();
      }
    });
  }

  // --- TAB: WHOLESALE BULK LEADS & INQUIRIES ---
  renderWholesaleTab(container) {
    const inquiries = wholesaleManager.getInquiries();
    const unreadCount = wholesaleManager.getUnreadCount();
    const quotedCount = inquiries.filter(i => (i.status || '').includes('Quoted') || (i.status || '').includes('Negotiating')).length;

    const rowsHtml = inquiries.length === 0 ? `
      <tr>
        <td colspan="9" style="text-align: center; padding: 40px; color: #9CA3AF;">
          No wholesale bulk inquiries yet. Click "⚡ Simulate Test Bulk Inquiry" below to test.
        </td>
      </tr>
    ` : inquiries.map(item => `
      <tr class="wholesale-db-row ${!item.isRead ? 'is-new-blink' : ''}">
        <td>
          <strong class="w-db-ref">${item.refId}</strong>
          <small class="w-db-time" style="display:block; color:#9CA3AF; font-size:11px;">${item.date}</small>
        </td>
        <td>
          <strong class="w-db-name" style="display:block; color:#111827;">${item.name}</strong>
          <span class="w-db-biz" style="font-size:11.5px; color:#4B5563;">${item.business || 'Direct Purchaser'}</span>
        </td>
        <td>
          <a href="tel:${item.phone}" class="w-db-phone" style="display:block; color:#0284C7; font-weight:600; font-size:12px;">📞 +91 ${item.phone}</a>
          <a href="https://wa.me/91${item.phone}" target="_blank" rel="noopener noreferrer" class="w-db-wa" style="color:#059669; font-size:11px; font-weight:600;">💬 Open WhatsApp</a>
        </td>
        <td>
          <strong class="w-db-prod" style="display:block; color:#0F2E24; font-size:12.5px;">${item.product}</strong>
          <small class="w-db-pack" style="color:#6B7280; font-size:11px;">${item.packaging ? item.packaging.split('(')[0] : 'Standard Packing'}</small>
        </td>
        <td>
          <span class="w-db-qty-pill" style="background:#FEF3C7; color:#92400E; padding:3px 8px; border-radius:12px; font-weight:700; font-size:11.5px;">${item.quantity}</span>
        </td>
        <td>
          <strong class="w-db-target-price" style="color:#D97706; font-size:12.5px;">${item.targetPrice}</strong>
        </td>
        <td>
          <span class="w-db-branch" style="font-size:11.5px; color:#374151;">${item.branch ? item.branch.split('(')[0] : 'Central Hub'}</span>
        </td>
        <td>
          <select class="w-status-select" data-ref="${item.refId}" style="padding:4px 8px; border-radius:6px; border:1px solid #D1D5DB; font-size:11.5px; font-weight:600;">
            <option value="New Blink ⚡" ${item.status === 'New Blink ⚡' ? 'selected' : ''}>New Blink ⚡</option>
            <option value="Quoted 📋" ${item.status === 'Quoted 📋' ? 'selected' : ''}>Quoted 📋</option>
            <option value="Negotiating 🤝" ${item.status === 'Negotiating 🤝' ? 'selected' : ''}>Negotiating 🤝</option>
            <option value="Order Invoiced 📜" ${item.status === 'Order Invoiced 📜' ? 'selected' : ''}>Order Invoiced 📜</option>
            <option value="Dispatched 🚚" ${item.status === 'Dispatched 🚚' ? 'selected' : ''}>Dispatched 🚚</option>
          </select>
        </td>
        <td>
          <button type="button" class="btn-db-delete-lead" data-ref="${item.refId}" title="Delete inquiry" style="background:none; border:none; cursor:pointer; font-size:16px;">🗑️</button>
        </td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="wholesale-admin-view">
        
        <!-- Header & Stats Cards -->
        <div class="db-metric-cards-grid">
          <div class="metric-card">
            <span class="metric-label">Total Bulk Leads</span>
            <span class="metric-num">${inquiries.length}</span>
            <span class="metric-sub">Commercial inquiries logged</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">New Blinks (Pending)</span>
            <span class="metric-num text-danger">${unreadCount}</span>
            <span class="metric-sub">Awaiting wholesale price quote</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Quoted / In Negotiations</span>
            <span class="metric-num text-gold">${quotedCount}</span>
            <span class="metric-sub">Active buyer communications</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Direct Hub Dispatch</span>
            <span class="metric-num" style="color: #059669;">4 Hubs</span>
            <span class="metric-sub">Delhi • Srinagar • Jammu • Mumbai</span>
          </div>
        </div>

        <!-- Action Toolbar -->
        <div class="db-toolbar">
          <div class="db-toolbar-title">
            <h4 style="font-size: 16px; color: #111827; margin-bottom: 2px;">⚡ Live Wholesale Bulk Inquiries</h4>
            <small style="color: #6B7280;">Instant blink leads submitted by purchasers requesting shorter wholesale bulk pricing.</small>
          </div>
          <div class="db-actions-group" style="display: flex; gap: 8px;">
            <button type="button" class="btn-suite-preview" id="btn-mark-all-wholesale-read">
              ✓ Mark All as Read
            </button>
            <button type="button" class="btn-toggle-stock in-stock" id="btn-simulate-wholesale-lead">
              ⚡ Simulate Test Bulk Inquiry
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="db-table-container">
          <table class="db-table">
            <thead>
              <tr>
                <th>Ref ID / Time</th>
                <th>Purchaser & Business</th>
                <th>Contact</th>
                <th>Product & Packing</th>
                <th>Quantity</th>
                <th>Target Rate</th>
                <th>Preferred Hub</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

      </div>
    `;

    // Bind mark all as read
    document.getElementById('btn-mark-all-wholesale-read')?.addEventListener('click', () => {
      wholesaleManager.markAllAsRead();
      this.renderWholesaleTab(container);
      this.updateWholesaleBadge();
    });

    // Bind simulate test lead
    document.getElementById('btn-simulate-wholesale-lead')?.addEventListener('click', () => {
      const names = ['Kailash Sharma', 'Vikrant Oberoi', 'Gaurav Kothari', 'Anita Deshmukh'];
      const businesses = ['Oberoi Luxury Catering', 'Kothari Dry Fruit Traders', 'Sharma Sweet Emporium', 'Deshmukh Gourmet Store'];
      const products = ['Kashmiri Mamra Almonds (Grade-1)', 'Pampore Mogra Saffron (Grade-1 A++)', 'Kashmiri Kagzi Snow Walnuts', 'Authentic Kashmiri Lal Mirch'];
      const quantities = ['50 kg', '100 kg', '250 kg', '500 kg (Half Ton)'];
      const targets = ['₹1,820 / kg', '₹210 / gram', '₹1,250 / kg', '₹420 / kg'];
      const hubs = ['Delhi (Khari Baoli Market - Kashyap Nathoo)', 'Mumbai Metropolitan Hub (APMC Market Complex)', 'Srinagar Valley Flagship Hub', 'Jammu Regional Hub'];

      const randIdx = Math.floor(Math.random() * names.length);

      wholesaleManager.saveInquiry({
        name: names[randIdx],
        phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
        business: businesses[randIdx],
        product: products[randIdx],
        quantity: quantities[randIdx],
        targetPrice: targets[randIdx],
        branch: hubs[randIdx],
        packaging: '10kg Nitrogen-Flushed Vacuum Sealed Metal Tins',
        notes: 'Simulated test wholesale blink lead.'
      });

      kashmirAudio.playCelebrationChime();
      this.renderWholesaleTab(container);
      this.updateWholesaleBadge();
    });

    // Status change listener
    container.querySelectorAll('.w-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const ref = e.target.dataset.ref;
        wholesaleManager.updateInquiryStatus(ref, e.target.value);
        this.updateWholesaleBadge();
      });
    });

    // Delete lead
    container.querySelectorAll('.btn-db-delete-lead').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ref = e.target.dataset.ref;
        if (confirm(`Delete wholesale inquiry ${ref}?`)) {
          const list = wholesaleManager.getInquiries().filter(i => i.refId !== ref);
          localStorage.setItem('jenus_wholesale_inquiries', JSON.stringify(list));
          this.renderWholesaleTab(container);
          this.updateWholesaleBadge();
        }
      });
    });
  }

  // --- 4. SHOW / HIDE CONTROLS ---
  openLoginModal() {
    this.loginModalEl?.classList.remove('hidden');
    document.body.classList.add('modal-open');
    kashmirAudio.playSantoorNote(587.33);
  }

  closeLoginModal() {
    this.loginModalEl?.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  async openDatabasePortal() {
    this.portalEl?.classList.remove('hidden');
    document.body.classList.add('modal-open');
    this.renderActiveTab();
    try {
      await dbStore.syncOrdersFromBackend();
      if (this.activeTab === 'orders' || this.activeTab === 'dashboard') {
        this.renderActiveTab();
      }
    } catch {}
  }

  closeDatabasePortal() {
    this.portalEl?.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  flashAutoSaveStatus(msg) {
    const pill = document.getElementById('db-live-sync-indicator');
    if (!pill) return;
    pill.innerHTML = `⚡ ${msg}`;
    pill.classList.add('flash-saved');
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      if (pill) {
        pill.innerHTML = `⚡ Auto-Save Active • Real-time Sync`;
        pill.classList.remove('flash-saved');
      }
    }, 2800);
  }

  bindGlobalTriggers() {
    // 1. Secretive Keyboard Shortcut: Ctrl + Shift + A or Alt + A
    window.addEventListener('keydown', (e) => {
      const isCtrlShiftA = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a');
      const isAltA = e.altKey && (e.key === 'A' || e.key === 'a');
      if (isCtrlShiftA || isAltA) {
        e.preventDefault();
        if (dbStore.isAuthenticated()) {
          this.openDatabasePortal();
        } else {
          this.openLoginModal();
        }
      }
      if (e.key === 'Escape') {
        if (this.loginModalEl && !this.loginModalEl.classList.contains('hidden')) {
          this.closeLoginModal();
        }
      }
    });

    // 2. Secretive footer anchor dot click
    document.getElementById('secret-admin-anchor')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dbStore.isAuthenticated()) {
        this.openDatabasePortal();
      } else {
        this.openLoginModal();
      }
    });

    // 3. Secretive triple-click on footer copyright text
    let copyrightClicks = 0;
    let clickTimeout = null;
    document.getElementById('footer-legal-copy')?.addEventListener('click', () => {
      copyrightClicks++;
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => { copyrightClicks = 0; }, 700);
      if (copyrightClicks >= 3) {
        copyrightClicks = 0;
        if (dbStore.isAuthenticated()) {
          this.openDatabasePortal();
        } else {
          this.openLoginModal();
        }
      }
    });

    // 4. URL hash & search param listener (e.g. #admin, #database, #portal, ?admin=true)
    const checkHash = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (hash === '#admin' || hash === '#database' || hash === '#portal' || params.get('admin') === 'portal' || params.get('admin') === 'true') {
        if (dbStore.isAuthenticated()) {
          this.openDatabasePortal();
        } else {
          this.openLoginModal();
        }
      }
    };

    window.addEventListener('hashchange', checkHash);
    checkHash();

    // 5. Any residual internal programmatic triggers
    document.querySelectorAll('.btn-open-admin-portal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (dbStore.isAuthenticated()) {
          this.openDatabasePortal();
        } else {
          this.openLoginModal();
        }
      });
    });

    // 6. Expose console helper for store owner
    window.openJenusAdmin = () => {
      if (dbStore.isAuthenticated()) {
        this.openDatabasePortal();
      } else {
        this.openLoginModal();
      }
    };
    window.jenusAdminLogin = (id, pwd) => {
      const res = dbStore.login(id, pwd);
      if (res.success) {
        this.openDatabasePortal();
      }
      return res;
    };
  }
}

export const adminPortalManager = new AdminPortalManager();
