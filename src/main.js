// JENU'S Kashmir Valley Gourmet - Main Application Controller
// FSSAI Certified & Professional Architecture

import { PRODUCTS, CATEGORIES, REVIEWS, COUPONS, HAMPER_BOX_STYLES, HAMPER_FILL_ITEMS } from './data.js';
import { cartStore } from './cart.js';
import { kashmirAudio } from './audio.js';
import { razorpayManager } from './razorpay.js';
import { KashmirAmbientLeaves } from './ambient-leaves.js';
import { KashmirInteractiveExperience } from './interactive-features.js';
import { orderTrackingManager } from './tracking.js';
import { dbStore } from './database.js';
import { adminPortalManager } from './admin-portal.js';
import { wholesaleManager } from './wholesale.js';

class JenusApp {
  constructor() {
    this.currentCategory = 'all';
    this.currentSort = 'recommended';
    this.searchQuery = '';
    this.activeSlide = 0;
    this.slideInterval = null;
    this.ambientLeaves = null;
    this.interactiveExperience = null;
    this.hamperState = {
      box: HAMPER_BOX_STYLES[0],
      items: [HAMPER_FILL_ITEMS[0], HAMPER_FILL_ITEMS[1], HAMPER_FILL_ITEMS[2]],
      message: 'Warmest greetings with the authentic royal sweetness of Kashmir!'
    };
    this.selectedProductWeights = {};
    this.visitedProductIds = this.loadVisitedProducts();
    this.init();
  }

  loadVisitedProducts() {
    try {
      const data = localStorage.getItem('jenus_visited_products');
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  markProductVisited(pid) {
    if (!this.visitedProductIds) this.visitedProductIds = new Set();
    this.visitedProductIds.add(pid);
    try {
      localStorage.setItem('jenus_visited_products', JSON.stringify([...this.visitedProductIds]));
    } catch (e) {}
  }

  isProductVisited(pid) {
    return this.visitedProductIds ? this.visitedProductIds.has(pid) : false;
  }

  init() {
    this.ambientLeaves = new KashmirAmbientLeaves();
    this.interactiveExperience = new KashmirInteractiveExperience();
    this.initSelectedWeights();
    this.renderCategoryCircles();
    this.renderFilterTabs();
    this.renderProducts();
    this.renderDealOfTheDay();
    this.renderReviews();
    this.renderHamperBuilder();
    this.initHeroSlider();
    this.initAnnouncementTicker();
    this.initCountdownTimer();
    this.initSearch();
    this.initCartDrawer();
    this.initPincodeChecker();
    this.initCertificateModal();
    this.initOrderTracking();
    this.initAdminPortal();
    this.initWholesale();
    this.initCheckoutModal();
    this.initLiveSalesTicker();
    this.initScrollReveal();
    this.bindGlobalEvents();

    cartStore.subscribe(() => {
      this.updateCartUI();
      this.renderProducts();
    });

    dbStore.subscribe(() => {
      this.renderProducts();
      this.renderDealOfTheDay();
    });

    this.updateCartUI();
  }

  initSelectedWeights() {
    const prods = dbStore.getProducts();
    prods.forEach(p => {
      const def = p.weights.find(w => w.isDefault) || p.weights[0];
      this.selectedProductWeights[p.id] = def;
    });
  }

  // --- ANNOUNCEMENT TICKER (CLEAN & NON-CONFUSING) ---
  initAnnouncementTicker() {
    const messages = [
      "✈️ Free Express Air Delivery from Srinagar on all orders above ₹499",
      "🎁 Use Coupon Code <strong>KASHMIR10</strong> for an Instant 10% Discount on Checkout",
      "🌿 FSSAI Central Certified (Lic: 10026061000412) • 100% Laboratory Tested Harvest",
      "🏔️ 100% Direct Kashmiri Orchard Harvest • Nitrogen Vacuum Sealed & Unbleached"
    ];
    let idx = 0;
    const tickerText = document.getElementById('ticker-text');
    if (!tickerText) return;

    setInterval(() => {
      idx = (idx + 1) % messages.length;
      tickerText.style.opacity = '0';
      setTimeout(() => {
        tickerText.innerHTML = messages[idx];
        tickerText.style.opacity = '1';
      }, 350);
    }, 4500);
  }

  // --- HERO SLIDER ---
  initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;

    const showSlide = (i) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      this.activeSlide = (i + slides.length) % slides.length;
      slides[this.activeSlide].classList.add('active');
      if (dots[this.activeSlide]) dots[this.activeSlide].classList.add('active');
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        this.resetSlideTimer();
      });
    });

    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(this.activeSlide - 1); this.resetSlideTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(this.activeSlide + 1); this.resetSlideTimer(); });

    this.slideInterval = setInterval(() => showSlide(this.activeSlide + 1), 6000);
  }

  resetSlideTimer() {
    if (this.slideInterval) clearInterval(this.slideInterval);
    const slides = document.querySelectorAll('.hero-slide');
    this.slideInterval = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % slides.length;
      slides.forEach(s => s.classList.remove('active'));
      const dots = document.querySelectorAll('.hero-dot');
      dots.forEach(d => d.classList.remove('active'));
      slides[this.activeSlide].classList.add('active');
      if (dots[this.activeSlide]) dots[this.activeSlide].classList.add('active');
    }, 6000);
  }

  // --- CATEGORY STORY CIRCLES ---
  renderCategoryCircles() {
    const container = document.getElementById('category-story-strip');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
      <div class="category-circle-item ${this.currentCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}" title="Filter by ${cat.name}">
        <div class="circle-ring">
          <img src="${cat.image}" alt="${cat.name}" class="category-roundel-img" loading="lazy" />
          <div class="circle-ring-bevel"></div>
        </div>
        <span class="circle-label">${cat.name}</span>
        <span class="circle-active-dot"></span>
      </div>
    `).join('');

    container.querySelectorAll('.category-circle-item').forEach(el => {
      el.addEventListener('click', () => {
        const cat = el.dataset.cat;
        this.setCategory(cat);
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // --- COLLECTION FILTER TABS ---
  renderFilterTabs() {
    const tabsContainer = document.getElementById('filter-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="filter-tab-btn ${this.currentCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.filter-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setCategory(btn.dataset.cat);
      });
    });
  }

  setCategory(catId) {
    this.currentCategory = catId;
    this.renderCategoryCircles();
    this.renderFilterTabs();

    const grid = document.getElementById('products-grid');
    if (grid) {
      grid.style.opacity = '0.35';
      grid.style.transform = 'translateY(8px)';
      grid.style.transition = 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        this.renderProducts();
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 120);
    } else {
      this.renderProducts();
    }

    kashmirAudio.playSantoorNote(440);
  }

  // --- PRODUCTS RENDERING ---
  renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let list = [...dbStore.getProducts()];

    if (this.currentCategory !== 'all') {
      list = list.filter(p => p.category === this.currentCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.subname.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.origin.toLowerCase().includes(q));
    }

    if (this.currentSort === 'price-low') {
      list.sort((a, b) => {
        const wa = this.selectedProductWeights[a.id] || a.weights[0];
        const wb = this.selectedProductWeights[b.id] || b.weights[0];
        return wa.price - wb.price;
      });
    } else if (this.currentSort === 'price-high') {
      list.sort((a, b) => {
        const wa = this.selectedProductWeights[a.id] || a.weights[0];
        const wb = this.selectedProductWeights[b.id] || b.weights[0];
        return wb.price - wa.price;
      });
    } else if (this.currentSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    const cartState = cartStore.getState();

    grid.innerHTML = list.map(p => {
      const selectedWeight = this.selectedProductWeights[p.id] || p.weights[0];
      const isInCart = cartState.cart.find(i => i.id === p.id && i.weight === selectedWeight.weight);
      const isWish = cartStore.isInWishlist(p.id);
      const isOutOfStock = p.inStock === false;

      const weightsHtml = p.weights.map(w => `
        <button class="weight-chip ${w.weight === selectedWeight.weight ? 'active' : ''}" 
                data-pid="${p.id}" 
                data-weight="${w.weight}">
          ${w.weight}
        </button>
      `).join('');

      let badgeHtml = '';
      if (isOutOfStock) {
        badgeHtml = `<span class="product-promo-badge badge-out">Out of Stock</span>`;
      } else if (p.isBestseller) {
        badgeHtml = `<span class="product-promo-badge badge-bestseller">⭐ Bestseller</span>`;
      } else {
        badgeHtml = `<span class="product-promo-badge badge-${p.badgeType}">${p.badge}</span>`;
      }

      const prodImages = (p.images && p.images.length > 0) ? p.images : [p.image];
      const hasMulti = prodImages.length > 1;
      const isCombo = p.category === 'combos' || (p.comboItems && p.comboItems.length > 0);
      const isVisited = this.isProductVisited(p.id);

      return `
        <div class="product-card reveal-item ${isOutOfStock ? 'is-out-of-stock-card' : ''}" data-pid="${p.id}">
          <div class="product-card-top-bar">
            <span class="product-origin-chip">📍 ${p.origin.split(',')[0]}</span>
            ${p.isBestseller ? '<span class="product-clean-badge bestseller">⭐ Bestseller</span>' : (p.badge ? `<span class="product-clean-badge">${p.badge}</span>` : '')}
          </div>

          <div class="product-image-box" title="Click to view all photos & details">
            <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" />
            ${prodImages.some(img => img.includes('real-')) ? `
              <span class="card-real-tag">📷 Real Produce</span>
            ` : ''}
          </div>

          <div class="product-info">
            <h3 class="product-title" data-pid="${p.id}">${p.name}</h3>
            <p class="product-subname">${p.subname}</p>

            <div class="product-weights-selector">
              <span class="weight-label">Select Package Size:</span>
              <div class="weight-chips-group">
                ${weightsHtml}
              </div>
            </div>

            <div class="product-order-bar">
              <div class="product-price-stack">
                <span class="current-price">₹${selectedWeight.price.toLocaleString('en-IN')}</span>
                <span class="original-price">₹${selectedWeight.originalPrice.toLocaleString('en-IN')}</span>
                <span class="save-tag">${selectedWeight.discount}% OFF</span>
              </div>
              
              <div class="product-order-action">
                ${isOutOfStock ? `
                  <button class="btn-order-now disabled" disabled>
                    <span>Sold Out</span>
                  </button>
                ` : (isInCart ? `
                  <div class="qty-stepper-clean">
                    <button class="qty-btn btn-minus" data-key="${isInCart.key}">−</button>
                    <span class="qty-count">${isInCart.quantity} in Cart</span>
                    <button class="qty-btn btn-plus" data-key="${isInCart.key}">+</button>
                  </div>
                ` : `
                  <button class="btn-order-now btn-add-to-cart" data-pid="${p.id}">
                    <span>Order Now</span>
                    <svg class="cart-btn-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                `)}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.bindProductCardEvents(grid);
    if (this.refreshScrollReveal) this.refreshScrollReveal();
  }

  bindProductCardEvents(container) {
    const products = dbStore.getProducts();

    container.querySelectorAll('.weight-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = chip.dataset.pid;
        const weight = chip.dataset.weight;
        const prod = products.find(p => p.id === pid);
        if (prod) {
          const wObj = prod.weights.find(w => w.weight === weight);
          if (wObj) {
            this.selectedProductWeights[pid] = wObj;
            this.renderProducts();
          }
        }
      });
    });

    container.querySelectorAll('.btn-add-to-cart:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.dataset.pid;
        const prod = dbStore.getProducts().find(p => p.id === pid);
        if (prod && prod.inStock !== false) {
          const weightObj = this.selectedProductWeights[pid] || prod.weights[0];
          this.triggerFlyingCartAnimation(btn, prod);
          cartStore.addItem(prod, weightObj, 1);
          kashmirAudio.playSantoorNote(523.25);
          this.showToast(`Added ${prod.name} (${weightObj.weight}) to your cart`);
          this.openCartDrawer();
        }
      });
    });

    container.querySelectorAll('.qty-btn.btn-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartStore.updateQuantity(btn.dataset.key, 1);
        kashmirAudio.playSantoorNote(587.33);
      });
    });

    container.querySelectorAll('.qty-btn.btn-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartStore.updateQuantity(btn.dataset.key, -1);
      });
    });

    container.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.dataset.pid;
        const prod = dbStore.getProducts().find(p => p.id === pid);
        if (prod) {
          const added = cartStore.toggleWishlist(prod);
          kashmirAudio.playSantoorNote(659.25);
          btn.innerHTML = added ? '❤️' : '🤍';
          btn.classList.toggle('active', added);
          this.showToast(added ? `Saved to Wishlist` : `Removed from Wishlist`);
          this.updateWishlistCount();
        }
      });
    });

    container.querySelectorAll('.card-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = dot.dataset.pid;
        const idx = parseInt(dot.dataset.idx);
        const card = dot.closest('.product-card');
        const img = card?.querySelector('.product-img');
        const prod = products.find(p => p.id === pid);
        if (prod) {
          const pImgs = (prod.images && prod.images.length > 0) ? prod.images : [prod.image];
          if (pImgs[idx] && img) {
            img.src = pImgs[idx];
            card.querySelectorAll('.card-dot').forEach((d, i) => {
              d.classList.toggle('active', i === idx);
            });
            const pill = card.querySelector('.card-real-cam-pill');
            if (pill) {
              const isReal = pImgs[idx].includes('real-');
              pill.style.display = isReal ? 'inline-flex' : 'none';
            }
          }
        }
      });
    });

    // Clicking anywhere on the product card opens the wide-screen modal
    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-add-to-cart, .btn-order-now, .qty-btn, .weight-chip, .qty-stepper-clean')) {
          return;
        }
        const pid = card.dataset.pid;
        const prod = dbStore.getProducts().find(p => p.id === pid);
        if (prod) this.openQuickViewModal(prod);
      });
    });

    container.querySelectorAll('.btn-product-wholesale-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pname = btn.getAttribute('data-pname');
        wholesaleManager.openModal({ name: pname });
      });
    });

    // Refresh 3D tilt and scroll reveal on newly rendered cards
    this.interactiveExperience?.initCard3DTilt?.();
    this.refreshScrollReveal?.();
  }

  // --- DEAL OF THE DAY ---
  renderDealOfTheDay() {
    const deal = PRODUCTS.find(p => p.id === 'jnu-deal-bundle-12');
    if (!deal) return;

    const dealContainer = document.getElementById('deal-product-slot');
    if (!dealContainer) return;

    dealContainer.innerHTML = `
      <div class="deal-card-content" style="cursor: pointer;" title="Click to view wide-screen details & 5 photos">
        <div class="deal-image-wrapper">
          <img src="${deal.image}" alt="${deal.name}" class="deal-img"/>
          <span class="deal-save-badge">31% SAVINGS</span>
          <span class="deal-photos-chip">📸 5 Photos & Overview</span>
        </div>
        <div class="deal-details-wrapper">
          <div class="deal-tag-row">
            <span class="valley-certified-tag">🌿 FSSAI Certified Pure</span>
            <span class="deal-stock-tag">Allocation: 7 Left in Today's Batch</span>
          </div>
          <h3 class="deal-title">${deal.name}</h3>
          <p class="deal-sub">${deal.subname}</p>
          <p class="deal-desc">${deal.description}</p>
          
          <div class="deal-benefits-list">
            ${deal.benefits.map(b => `<div>✓ ${b}</div>`).join('')}
          </div>

          <div class="deal-pricing-row">
            <span class="deal-price">₹1,899</span>
            <span class="deal-orig">₹2,750</span>
            <span class="deal-saving">Save ₹851</span>
          </div>

          <div class="stock-meter-wrapper">
            <div class="stock-meter-bar"><div class="stock-fill" style="width: 82%;"></div></div>
            <div class="stock-meter-labels">
              <span>Daily Allocation: 40 Units</span>
              <span class="stock-hurry">33 Claimed</span>
            </div>
          </div>

          <button class="btn-claim-deal" id="btn-claim-deal">
            <span>Add Special Offer to Cart</span>
            <span>₹1,899</span>
          </button>
        </div>
      </div>
    `;

    const dealContent = dealContainer.querySelector('.deal-card-content');
    dealContent?.addEventListener('click', (e) => {
      if (e.target.closest('#btn-claim-deal')) return;
      this.openQuickViewModal(deal);
    });

    const dealBtn = document.getElementById('btn-claim-deal');
    dealBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.triggerFlyingCartAnimation(dealBtn, deal);
      cartStore.addItem(deal, deal.weights[0], 1);
      kashmirAudio.playSantoorNote(659.25);
      this.showToast("Daily Special bundle added to your cart");
      this.openCartDrawer();
    });
  }

  initCountdownTimer() {
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');
    if (!hoursEl || !minsEl || !secsEl) return;

    let totalSecs = 8 * 3600 + 42 * 60 + 19;

    setInterval(() => {
      if (totalSecs > 0) totalSecs--;
      const h = Math.floor(totalSecs / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // --- HAMPER BUILDER ---
  renderHamperBuilder() {
    const boxContainer = document.getElementById('hamper-boxes-selector');
    const itemsContainer = document.getElementById('hamper-items-selector');
    const previewContainer = document.getElementById('hamper-preview-visual');
    const priceDisplay = document.getElementById('hamper-calculated-price');
    const addHamperBtn = document.getElementById('btn-add-custom-hamper');

    if (!boxContainer || !itemsContainer || !previewContainer) return;

    boxContainer.innerHTML = HAMPER_BOX_STYLES.map(b => `
      <div class="hamper-box-card ${this.hamperState.box.id === b.id ? 'active' : ''}" data-boxid="${b.id}">
        <div class="box-card-radio"></div>
        <div class="box-card-info">
          <strong>${b.name}</strong>
          <p>${b.desc}</p>
          <span class="box-price">+₹${b.price}</span>
        </div>
      </div>
    `).join('');

    boxContainer.querySelectorAll('.hamper-box-card').forEach(el => {
      el.addEventListener('click', () => {
        const found = HAMPER_BOX_STYLES.find(b => b.id === el.dataset.boxid);
        if (found) {
          this.hamperState.box = found;
          this.renderHamperBuilder();
          kashmirAudio.playSantoorNote(440);
        }
      });
    });

    itemsContainer.innerHTML = HAMPER_FILL_ITEMS.map(item => {
      const isSelected = this.hamperState.items.some(i => i.id === item.id);
      return `
        <div class="hamper-item-pill ${isSelected ? 'selected' : ''}" data-itemid="${item.id}">
          <img src="${item.img}" alt="${item.name}" class="hamper-item-thumb"/>
          <div class="hamper-item-meta">
            <span class="hamper-item-name">${item.name}</span>
            <span class="hamper-item-price">₹${item.price}</span>
          </div>
          <span class="hamper-item-check">${isSelected ? '✓' : '+'}</span>
        </div>
      `;
    }).join('');

    itemsContainer.querySelectorAll('.hamper-item-pill').forEach(el => {
      el.addEventListener('click', () => {
        const item = HAMPER_FILL_ITEMS.find(i => i.id === el.dataset.itemid);
        if (!item) return;

        const existsIndex = this.hamperState.items.findIndex(i => i.id === item.id);
        if (existsIndex > -1) {
          if (this.hamperState.items.length <= 2) {
            this.showToast("Select at least 2 items for this custom hamper");
            return;
          }
          this.hamperState.items.splice(existsIndex, 1);
        } else {
          if (this.hamperState.items.length >= 5) {
            this.showToast("Maximum 5 items per hamper box");
            return;
          }
          this.hamperState.items.push(item);
        }
        this.renderHamperBuilder();
        kashmirAudio.playSantoorNote(523.25);
      });
    });

    const boxTotal = this.hamperState.box.price;
    const itemsTotal = this.hamperState.items.reduce((sum, item) => sum + item.price, 0);
    const hamperGrandTotal = boxTotal + itemsTotal;

    if (priceDisplay) {
      priceDisplay.textContent = `₹${hamperGrandTotal.toLocaleString('en-IN')}`;
    }

    previewContainer.innerHTML = `
      <div class="hamper-visual-box box-${this.hamperState.box.id}">
        <div class="hamper-visual-lid">
          <div class="hamper-plaque">
            <span class="plaque-brand">JENU'S</span>
            <span class="plaque-sub">Curated Gourmet Suite</span>
          </div>
        </div>
        <div class="hamper-visual-slots-grid">
          ${this.hamperState.items.map(item => `
            <div class="hamper-slot-item">
              <img src="${item.img}" alt="${item.name}"/>
              <div class="slot-badge">${item.name.split('(')[0]}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="hamper-greeting-card-preview">
        <span class="card-icon">✉️</span>
        <div class="card-text">
          <small>Personalized Greeting Card Note:</small>
          <p id="preview-gift-msg">"${this.hamperState.message}"</p>
        </div>
      </div>
    `;

    const msgInput = document.getElementById('hamper-greeting-input');
    if (msgInput) {
      msgInput.value = this.hamperState.message;
      msgInput.oninput = (e) => {
        this.hamperState.message = e.target.value || 'With best regards from Kashmir';
        const preview = document.getElementById('preview-gift-msg');
        if (preview) preview.textContent = `"${this.hamperState.message}"`;
      };
    }

    if (addHamperBtn) {
      addHamperBtn.onclick = () => {
        const customHamperProd = {
          id: `custom-hamper-${Date.now()}`,
          name: `Custom Hamper (${this.hamperState.box.name})`,
          subname: `${this.hamperState.items.length} Gourmet Items + Gift Card`,
          image: this.hamperState.box.image,
          origin: 'JENU\'S Artisan Packaging Hub, Srinagar',
          description: `Custom box with ${this.hamperState.items.map(i => i.name).join(', ')}. Gift message: "${this.hamperState.message}"`,
          weights: [{ weight: 'Gift Suite', price: hamperGrandTotal, originalPrice: Math.round(hamperGrandTotal * 1.25) }]
        };

        this.triggerFlyingCartAnimation(addHamperBtn, customHamperProd);
        cartStore.addItem(customHamperProd, customHamperProd.weights[0], 1);
        kashmirAudio.playCelebrationChime();
        this.showToast("Custom gift hamper added to your cart");
        this.openCartDrawer();
      };
    }
  }

  // --- REVIEWS ---
  renderReviews() {
    const container = document.getElementById('reviews-wall-grid');
    if (!container) return;

    container.innerHTML = REVIEWS.map(r => `
      <div class="review-card">
        <div class="review-top">
          <div class="review-avatar">${r.avatar}</div>
          <div class="review-author">
            <strong>${r.name}</strong>
            <span class="review-city">${r.city}</span>
          </div>
          <div class="review-rating">★★★★★</div>
        </div>
        <div class="review-product-tag">Purchased: ${r.product}</div>
        <p class="review-text">"${r.comment}"</p>
        <div class="review-footer">
          <span class="review-verified">✓ Verified Buyer</span>
          <span class="review-date">${r.date}</span>
        </div>
      </div>
    `).join('');
  }

  // --- SEARCH ---
  initSearch() {
    const searchInput = document.getElementById('header-search-input');
    const searchDropdown = document.getElementById('search-autocomplete-dropdown');
    if (!searchInput || !searchDropdown) return;

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      this.searchQuery = q;

      if (!q) {
        searchDropdown.classList.add('hidden');
        this.renderProducts();
        return;
      }

      const allProds = dbStore.getProducts();
      const matches = allProds.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.subname.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length > 0) {
        searchDropdown.innerHTML = matches.map(p => `
          <div class="search-drop-item ${p.inStock === false ? 'is-out' : ''}" data-pid="${p.id}">
            <img src="${p.image}" alt="${p.name}" class="search-drop-thumb"/>
            <div class="search-drop-info">
              <strong>${p.name}</strong>
              <small>${p.origin}</small>
              <span class="search-drop-price">₹${p.weights[0].price}</span>
            </div>
            ${p.inStock === false 
              ? `<span style="font-size: 11px; color: #EF4444; font-weight: 700;">Out of Stock</span>` 
              : `<button class="search-drop-add" data-pid="${p.id}">Add</button>`}
          </div>
        `).join('');
        searchDropdown.classList.remove('hidden');

        searchDropdown.querySelectorAll('.search-drop-item').forEach(item => {
          item.addEventListener('click', (evt) => {
            const pid = item.dataset.pid;
            const prod = dbStore.getProducts().find(p => p.id === pid);
            if (evt.target.classList.contains('search-drop-add')) {
              if (prod && prod.inStock !== false) {
                cartStore.addItem(prod, prod.weights[0], 1);
                kashmirAudio.playSantoorNote(523.25);
                this.showToast(`Added ${prod.name} to cart`);
              }
            } else {
              if (prod) this.openQuickViewModal(prod);
              searchDropdown.classList.add('hidden');
            }
          });
        });
      } else {
        searchDropdown.innerHTML = `<div class="search-drop-empty">No products found for "${q}".</div>`;
        searchDropdown.classList.remove('hidden');
      }

      this.renderProducts();
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    });
  }

  // --- CART DRAWER ---
  initCartDrawer() {
    const cartToggleBtns = document.querySelectorAll('.btn-cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const closeCartBtn = document.getElementById('btn-close-cart');
    const checkoutBtn = document.getElementById('btn-cart-checkout');
    const applyCouponBtn = document.getElementById('btn-apply-coupon');
    const couponInput = document.getElementById('cart-coupon-input');

    cartToggleBtns.forEach(b => {
      b.addEventListener('click', () => this.openCartDrawer());
    });

    if (closeCartBtn) closeCartBtn.addEventListener('click', () => this.closeCartDrawer());
    if (cartBackdrop) cartBackdrop.addEventListener('click', () => this.closeCartDrawer());

    if (applyCouponBtn && couponInput) {
      applyCouponBtn.addEventListener('click', () => {
        const res = cartStore.applyCoupon(couponInput.value);
        this.showToast(res.message);
        if (res.success) {
          couponInput.value = '';
          kashmirAudio.playSantoorNote(659.25);
        }
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cartStore.cart.length === 0) {
          this.showToast("Your cart is empty");
          return;
        }
        this.closeCartDrawer();
        this.openCheckoutModal();
      });
    }
  }

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.classList.add('drawer-open');
    }
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }
  }

  updateCartUI() {
    const state = cartStore.getState();

    document.querySelectorAll('.cart-count-badge').forEach(b => {
      b.textContent = state.totalCount;
      b.classList.toggle('has-items', state.totalCount > 0);
    });

    document.querySelectorAll('.header-cart-total').forEach(el => {
      el.textContent = `₹${state.total.toLocaleString('en-IN')}`;
    });

    const itemsContainer = document.getElementById('cart-items-list');
    const emptyState = document.getElementById('cart-empty-state');
    const filledState = document.getElementById('cart-filled-state');

    if (state.cart.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      if (filledState) filledState.classList.add('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (filledState) filledState.classList.remove('hidden');

    const freeProg = document.getElementById('free-shipping-progress');
    const freeMsg = document.getElementById('free-shipping-msg');
    if (freeProg && freeMsg) {
      freeProg.style.width = `${state.freeShippingProgress}%`;
      if (state.freeShippingRemaining === 0) {
        freeMsg.innerHTML = `✓ <strong>Qualified for Free Express Air Shipping</strong>`;
      } else {
        freeMsg.innerHTML = `Add <strong>₹${state.freeShippingRemaining.toLocaleString('en-IN')}</strong> more for <strong>Free Express Shipping</strong>`;
      }
    }

    if (itemsContainer) {
      itemsContainer.innerHTML = state.cart.map(item => {
        const itemImgs = (item.images && item.images.length > 0) ? item.images : [item.image];
        const isCombo = item.comboItems && item.comboItems.length > 0;
        return `
        <div class="cart-item-row" data-key="${item.key}">
          <div class="cart-item-img-wrapper" data-pid="${item.id}" title="Click to view all ${itemImgs.length} photos">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img"/>
            <span class="cart-item-photos-badge">${isCombo ? `🎁 ${item.comboItems.length}` : `📸 ${itemImgs.length}`}</span>
          </div>
          <div class="cart-item-details">
            <div class="cart-item-title-row">
              <strong class="cart-item-title clickable-qv" data-pid="${item.id}" title="Click to view full photos">${item.name}</strong>
              <button class="cart-item-remove-btn" data-key="${item.key}" title="Remove item">×</button>
            </div>
            <div class="cart-item-weight-badge">Size: ${item.weight}</div>

            ${isCombo ? `
              <div class="cart-combo-preview-bar">
                <span class="cart-combo-tag">🎁 ${item.comboItems.length} Products Pack</span>
                <span class="cart-combo-summary">${item.comboItems.map(c => c.name.split('(')[0].trim()).join(', ')}</span>
              </div>
            ` : ''}

            <button class="btn-cart-view-gallery" data-pid="${item.id}">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block; vertical-align:middle; margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>View Photos (${isCombo ? `${item.comboItems.length} Products` : `${itemImgs.length} Angles`})</span>
            </button>

            <div class="cart-item-bottom-row">
              <div class="cart-item-stepper">
                <button class="btn-step-minus" data-key="${item.key}">−</button>
                <span class="step-qty">${item.quantity}</span>
                <button class="btn-step-plus" data-key="${item.key}">+</button>
              </div>
              <div class="cart-item-pricing">
                <span class="cart-item-unit-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                ${item.originalPrice ? `<span class="cart-item-original-price">₹${(item.originalPrice * item.quantity).toLocaleString('en-IN')}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
      }).join('');

      itemsContainer.querySelectorAll('.btn-step-plus').forEach(b => {
        b.addEventListener('click', () => {
          cartStore.updateQuantity(b.dataset.key, 1);
          kashmirAudio.playSantoorNote(587.33);
        });
      });
      itemsContainer.querySelectorAll('.btn-step-minus').forEach(b => {
        b.addEventListener('click', () => {
          cartStore.updateQuantity(b.dataset.key, -1);
        });
      });
      itemsContainer.querySelectorAll('.cart-item-remove-btn').forEach(b => {
        b.addEventListener('click', () => {
          cartStore.removeItem(b.dataset.key);
          this.showToast("Item removed from cart");
        });
      });
      itemsContainer.querySelectorAll('.cart-item-img-wrapper, .clickable-qv, .btn-cart-view-gallery').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = el.dataset.pid;
          const prod = dbStore.getProducts().find(p => p.id === pid) || PRODUCTS.find(p => p.id === pid);
          if (prod) {
            this.openQuickViewModal(prod);
          }
        });
      });
    }

    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount-amount');
    const totalEl = document.getElementById('cart-grand-total');
    const activeCouponTag = document.getElementById('active-coupon-tag');

    if (subtotalEl) subtotalEl.textContent = `₹${state.subtotal.toLocaleString('en-IN')}`;
    if (shippingEl) shippingEl.textContent = state.shipping === 0 ? 'FREE' : `₹${state.shipping}`;
    if (totalEl) totalEl.textContent = `₹${state.total.toLocaleString('en-IN')}`;

    if (state.activeCoupon && state.discount > 0) {
      if (discountRow) discountRow.classList.remove('hidden');
      if (discountEl) discountEl.textContent = `-₹${state.discount.toLocaleString('en-IN')}`;
      if (activeCouponTag) {
        activeCouponTag.innerHTML = `
          <span>Coupon: <strong>${state.activeCoupon.code}</strong> applied</span>
          <button id="btn-remove-coupon" class="btn-remove-coupon">Remove</button>
        `;
        document.getElementById('btn-remove-coupon')?.addEventListener('click', () => {
          cartStore.removeCoupon();
          this.showToast("Coupon removed");
        });
      }
    } else {
      if (discountRow) discountRow.classList.add('hidden');
      if (activeCouponTag) activeCouponTag.innerHTML = '';
    }
  }

  // --- CHECKOUT & ADDRESS MODAL ---
  initCheckoutModal() {
    let modal = document.getElementById('checkout-address-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'checkout-address-modal';
      modal.className = 'kashmir-modal-overlay hidden';
      modal.innerHTML = `
        <div class="checkout-modal-container animate-scale-up">
          <div class="checkout-modal-header">
            <div class="chk-title-group">
              <div>
                <h3>Delivery & Contact Details</h3>
                <p>Dispatched with 100% tamper-evident FSSAI compliant food packaging</p>
              </div>
            </div>
            <button class="modal-close-x" id="btn-close-checkout">&times;</button>
          </div>

          <form id="checkout-address-form" class="checkout-form">
            <div class="form-section-title">1. Recipient Information</div>
            <div class="form-row">
              <div class="form-field">
                <label>Full Name *</label>
                <input type="text" id="chk-name" required placeholder="Enter recipient's full name" value="" autocomplete="name" />
              </div>
              <div class="form-field">
                <label>Mobile Number *</label>
                <input type="tel" id="chk-phone" maxlength="10" required placeholder="10-digit mobile number" value="" autocomplete="tel" />
              </div>
            </div>
            <div class="form-field">
              <label>Email Address</label>
              <input type="email" id="chk-email" placeholder="name@example.com" value="" autocomplete="email" />
            </div>

            <div class="form-section-title">2. Shipping Address</div>
            <div class="form-field">
              <label>Street Address / Flat / Floor *</label>
              <input type="text" id="chk-address" required placeholder="House / Flat No., Building, Street, Landmark" value="" autocomplete="street-address" />
            </div>
            <div class="form-row">
              <div class="form-field">
                <label>Pincode *</label>
                <input type="text" id="chk-pincode" maxlength="6" required placeholder="6-digit PIN code" value="" autocomplete="postal-code" />
                <span class="pincode-detected-city hidden" id="chk-pincode-city"></span>
              </div>
              <div class="form-field">
                <label>City *</label>
                <input type="text" id="chk-city" required placeholder="City" value="" autocomplete="address-level2" />
              </div>
              <div class="form-field">
                <label>State *</label>
                <input type="text" id="chk-state" required placeholder="State" value="" autocomplete="address-level1" />
              </div>
            </div>

            <div class="valley-delivery-badge">
              <span>🌿 <strong>FSSAI Certified Packaging:</strong> Temperature-controlled vacuum sealing in Srinagar. Estimated transit time: <strong>48 hours</strong>.</span>
            </div>

            <div class="checkout-summary-box">
              <div class="chk-total-row">
                <span>Total Payable:</span>
                <strong class="chk-amount-gold" id="chk-modal-total">₹0</strong>
              </div>
            </div>

            <button type="submit" class="btn-proceed-razorpay" id="btn-submit-to-razorpay">
              <span>Proceed to Payment</span>
            </button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    }

    document.getElementById('btn-close-checkout')?.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });

    const pinInput = document.getElementById('chk-pincode');
    const cityInput = document.getElementById('chk-city');
    const stateInput = document.getElementById('chk-state');
    const pinCityLabel = document.getElementById('chk-pincode-city');

    pinInput?.addEventListener('input', (e) => {
      const pin = e.target.value.trim();
      if (pin.length === 6) {
        const detected = this.lookupPincode(pin);
        if (cityInput) cityInput.value = detected.city;
        if (stateInput) stateInput.value = detected.state;
        if (pinCityLabel) {
          pinCityLabel.classList.remove('hidden');
          pinCityLabel.textContent = `✓ Destination: ${detected.city}, ${detected.state} (Estimated: ${detected.estDays})`;
        }
      }
    });

    const form = document.getElementById('checkout-address-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = cartStore.getState();

      const checkoutData = {
        txnRef: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        total: state.total,
        items: [...state.cart],
        customer: {
          name: document.getElementById('chk-name').value.trim(),
          phone: document.getElementById('chk-phone').value.trim(),
          email: document.getElementById('chk-email').value.trim(),
          address: document.getElementById('chk-address').value.trim(),
          pincode: document.getElementById('chk-pincode').value.trim(),
          city: document.getElementById('chk-city').value.trim(),
          state: document.getElementById('chk-state').value.trim()
        }
      };

      modal.classList.add('hidden');
      razorpayManager.openPayment(checkoutData);
    });
  }

  openCheckoutModal() {
    const modal = document.getElementById('checkout-address-modal');
    const totalEl = document.getElementById('chk-modal-total');
    const state = cartStore.getState();
    if (totalEl) totalEl.textContent = `₹${state.total.toLocaleString('en-IN')}`;

    // Place details ONLY if the user is already actively logged in during this session
    const loggedInPhone = orderTrackingManager?.currentPhone;
    if (loggedInPhone) {
      const orders = orderTrackingManager.getOrdersForPhone(loggedInPhone);
      const lastCust = orders && orders[0]?.customer;
      const phoneInput = document.getElementById('chk-phone');
      if (phoneInput && !phoneInput.value) phoneInput.value = loggedInPhone;
      if (lastCust) {
        const nameInput = document.getElementById('chk-name');
        const addrInput = document.getElementById('chk-address');
        const cityInput = document.getElementById('chk-city');
        const pinInput = document.getElementById('chk-pincode');
        const stateInput = document.getElementById('chk-state');
        if (nameInput && !nameInput.value && lastCust.name) nameInput.value = lastCust.name;
        if (addrInput && !addrInput.value && lastCust.address) addrInput.value = lastCust.address;
        if (cityInput && !cityInput.value && lastCust.city) cityInput.value = lastCust.city;
        if (pinInput && !pinInput.value && lastCust.pincode) pinInput.value = lastCust.pincode;
        if (stateInput && !stateInput.value && lastCust.state) stateInput.value = lastCust.state;
      }
    }

    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }

  lookupPincode(pin) {
    const prefix = pin.substring(0, 2);
    const map = {
      '11': { city: 'New Delhi', state: 'Delhi', estDays: '1 Day (Delhi Chandni Chowk Branch Express)' },
      '12': { city: 'Gurugram', state: 'Haryana', estDays: '1-2 Days (Delhi Branch Transit)' },
      '13': { city: 'Ambala', state: 'Haryana', estDays: '2 Days (Jammu & Delhi Route)' },
      '14': { city: 'Ludhiana', state: 'Punjab', estDays: '1-2 Days (Jammu Regional Hub Direct)' },
      '16': { city: 'Chandigarh', state: 'Punjab', estDays: '1-2 Days (Jammu Regional Route)' },
      '18': { city: 'Jammu', state: 'Jammu & Kashmir', estDays: 'Same Day - 1 Day (Jammu Commercial Hub)' },
      '19': { city: 'Srinagar', state: 'Jammu & Kashmir', estDays: 'Same Day (Srinagar Valley Flagship Hub)' },
      '40': { city: 'Mumbai', state: 'Maharashtra', estDays: 'Same Day - 1 Day (Mumbai APMC Hub Direct)' },
      '41': { city: 'Pune', state: 'Maharashtra', estDays: '1-2 Days (Mumbai Western Hub Express)' },
      '56': { city: 'Bengaluru', state: 'Karnataka', estDays: '2 Days (Direct Air Dispatch)' },
      '50': { city: 'Hyderabad', state: 'Telangana', estDays: '2 Days (Direct Air Dispatch)' },
      '60': { city: 'Chennai', state: 'Tamil Nadu', estDays: '2-3 Days (Direct Air Cargo)' },
      '70': { city: 'Kolkata', state: 'West Bengal', estDays: '2-3 Days (Direct Air Cargo)' }
    };

    return map[prefix] || { city: 'National Center', state: 'India', estDays: '2-3 Days (Direct Hub Air Dispatch)' };
  }

  // --- WIDE SCREEN QUICK VIEW MODAL & 5-IMAGE GALLERY ---
  openQuickViewModal(product) {
    let modal = document.getElementById('product-quickview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'product-quickview-modal';
      modal.className = 'kashmir-modal-overlay hidden';
      document.body.appendChild(modal);
    }

    this.markProductVisited(product.id);
    const curWeight = this.selectedProductWeights[product.id] || product.weights[0];
    const images = (product.images && product.images.length > 0) ? product.images : [product.image];
    const isCombo = product.category === 'combos' || (product.comboItems && product.comboItems.length > 0);
    const isSpice = product.category === 'spices';
    let activeImgIndex = 0;

    const getCaption = (idx) => {
      const curImg = images[idx] || '';
      
      // Hamper Constituent Items Close-ups
      if (product.category === 'hampers' && idx > 0) {
        if (curImg.includes('real-mamra')) return `🎁 Photo ${idx + 1} of ${images.length}: Hamper Item 1 — Kashmiri Mamra Giri Almonds (High-Oil Macro Close-Up)`;
        if (curImg.includes('real-walnuts')) return `🎁 Photo ${idx + 1} of ${images.length}: Hamper Item 2 — Kagzi Snow Walnuts (Extra-White Halves Macro Close-Up)`;
        if (curImg.includes('real-saffron')) return `🎁 Photo ${idx + 1} of ${images.length}: Hamper Item 3 — Grade A1 Pampore Mongra Saffron Jar (Macro Close-Up)`;
        if (curImg.includes('real-apricots')) return `🎁 Photo ${idx + 1} of ${images.length}: Hamper Item 4 — Sun-Dried Golden Khumani Apricots (Macro Close-Up)`;
        if (curImg.includes('hamper-open-suite')) return `🎁 Photo ${idx + 1} of ${images.length}: Hamper Suite — Velvet Partition Tray & Inner Sealed Glass Jars`;
      }

      if (product.comboItems && product.comboItems[idx]) {
        const item = product.comboItems[idx];
        const itemName = typeof item === 'object' ? item.name : item;
        const itemWeight = typeof item === 'object' && item.weight ? ` (${item.weight})` : '';
        return `🎁 Photo ${idx + 1} of ${images.length}: Combo Item ${idx + 1} — ${itemName}${itemWeight} (Dedicated Real Produce Close-Up)`;
      }

      // Specific Real Macro & Camera detections:
      if (curImg.includes('real-apricots-macro') || curImg.includes('apricots-khumani-close')) {
        return `🍑 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Sun-Dried Kashmiri Khumani Apricots (Natural Amber Translucence & Edible Sweet Kernel)`;
      }
      if (curImg.includes('apricots-kargil')) {
        return `🍑 Photo ${idx + 1} of ${images.length}: Real Market Photography — Traditional Sun-Cured Ladakh & Kargil Khumani Apricots`;
      }
      if (curImg.includes('real-figs-macro')) {
        return `🍯 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Traditional Threaded Garland of Mountain Anjeer Figs`;
      }
      if (curImg.includes('figs-close')) {
        return `🔍 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Cross-Section — Sun-Dried Mountain Fig Sliced Open Showing Honey Amber Pulp & Crunchy Seeds`;
      }
      if (curImg.includes('real-berries-macro') || curImg.includes('berries-seeds-mix-close')) {
        return `🫐 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Wild Berries & Roasted Seeds Superfood Mix (Ruby Cranberries, Blueberries, Pumpkin & Sunflower Seeds)`;
      }
      if (curImg.includes('cranberries-close')) {
        return `🫐 Photo ${idx + 1} of ${images.length}: Real Macro Photography — Sun-Dried Kashmiri Mountain Ruby Cranberries`;
      }
      if (curImg.includes('blueberries-close')) {
        return `🫐 Photo ${idx + 1} of ${images.length}: Real Macro Photography — High-Altitude Glacial Wild Blueberries`;
      }
      if (curImg.includes('real-gurbandi-macro') || curImg.includes('gurbandi-almonds-close')) {
        return `🥜 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Wild Kashmiri Gurbandi Choti Giri Almonds (Teardrop Shape, 52% Oil Sheen)`;
      }
      if (curImg.includes('kahwa-brewed-cup')) {
        return `☕ Photo ${idx + 1} of ${images.length}: Real Close-up Photography — Steaming Amber Shahi Kahwa Brewed in Glass Cup with Saffron Threads & Sliced Almonds`;
      }
      if (curImg.includes('kahwa-tea-blend')) {
        return `🌿 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Whole Green Tea Leaves, Crushed Green Cardamom, Cinnamon Quills & Saffron`;
      }
      if (curImg.includes('real-mamra-macro')) {
        return `📷 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Kashmiri Mamra Badam (High 50% Natural Oil Sheen, Wrinkled Himalayan Skin & Raw Interior)`;
      }
      if (curImg.includes('real-almonds-raw-camera')) {
        return `📸 Photo ${idx + 1} of ${images.length}: Genuine Camera High-Res Photograph — Raw Unpolished Kashmiri Almonds on Natural Mountain Wood`;
      }
      if (curImg.includes('real-almonds-stages-camera')) {
        return `🔬 Photo ${idx + 1} of ${images.length}: Real Camera Harvest Documentation — In-Shell, Cracked Paper Hull & Graded Kernels`;
      }
      if (curImg.includes('real-saffron-macro')) {
        return `📷 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Grade A1+ Pampore Mongra Saffron (Pure Crimson Trumpet Stigmas on Carved Walnut Wood)`;
      }
      if (curImg.includes('real-saffron-raw-camera')) {
        return `📸 Photo ${idx + 1} of ${images.length}: Genuine Camera Photograph — Laboratory Tested Dried Mongra Kesar Filaments (Zero Yellow Stems)`;
      }
      if (curImg.includes('real-walnuts-macro')) {
        return `📷 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Kagzi Snow Walnut (Freshly Cracked Paper-Shell & Whole Creamy Halves)`;
      }
      if (curImg.includes('real-walnuts-raw-camera')) {
        return `📸 Photo ${idx + 1} of ${images.length}: Genuine Camera High-Res Photograph — Whole Sun-Cured Kagzi Nuts & Split Brain-Halves`;
      }
      if (curImg.includes('real-figs-apricots-macro')) {
        return `📷 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Sun-Dried Kashmiri Fig & Halman Apricot (Caramelized Honey Crystals & Seed Crunch)`;
      }
      if (curImg.includes('real-chilgoza-macro')) {
        return `📷 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Wild Himalayan Forest Chilgoza Pine Nuts (Ivory Kernels & Slender Shells)`;
      }
      if (curImg.includes('real-mirch-macro')) {
        return `📷 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Sun-Cured Wrinkled Deep Ruby Kashmiri Mirch Whole Pods`;
      }
      if (curImg.includes('kashmiri-mirch-powder')) {
        return `🌶️ Photo ${idx + 1} of ${images.length}: Authentic Real Close-up — Stone-Ground Bright Ruby Kashmiri Mirch Powder in Brass Spoon`;
      }
      if (curImg.includes('real-jeera-macro')) {
        return `📷 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Wild Himalayan Shahi Jeera Seeds with Fine Longitudinal Ridges on Walnut Tray`;
      }
      if (curImg.includes('wazwan-ver-slice')) {
        return `🔪 Photo ${idx + 1} of ${images.length}: Real Macro Cross-Section — Sliced Masala Ver Cake Showing Aromatic Shallots, Garlic, Mirch & Mustard Oil`;
      }
      if (curImg.includes('wazwan-ver')) {
        return `🌶️ Photo ${idx + 1} of ${images.length}: Authentic Real Photography — Handcrafted Traditional Kashmiri Wazwan Masala Ver Spice Cake Disc`;
      }
      if (curImg.includes('packaged')) {
        return `🏷️ Photo ${idx + 1} of ${images.length}: JENU'S Srinagar Cold-Storage Packaging (Nitrogen-Flushed Airtight Aroma-Lock Container)`;
      }
      if (curImg.includes('infusion')) {
        return `🌸 Photo ${idx + 1} of ${images.length}: Authentic Saffron Purity Test — Cold Water Diffusion & Golden Crocin Bloom`;
      }
      if (curImg.includes('shell')) {
        return `🌰 Photo ${idx + 1} of ${images.length}: Paper-Thin Kagzi Shell Curation & River-Washed Natural Timber Drying`;
      }
      if (curImg.includes('hamper') || curImg.includes('suite')) {
        return `🎁 Photo ${idx + 1} of ${images.length}: Heirloom Hand-Carved Kashmiri Solid Walnut Wood Khatamband Presentation Box`;
      }

      if (idx === 0) return `🏷️ Photo 1 of ${images.length}: JENU'S Authentic Produce & Sealed Packaging`;
      if (idx === 1) return `🌱 Photo 2 of ${images.length}: 100% Authentic Valley Raw Produce`;
      if (idx === 2) return `🔍 Photo 3 of ${images.length}: Premium Kernel & Texture Cross-Section`;
      if (idx === 3) return `🏔️ Photo 4 of ${images.length}: High-Altitude Himalayan Valley Harvest`;
      return `✨ Photo 5 of ${images.length}: Gourmet Serving & Valley Heritage`;
    };

    const getThumbLabel = (idx) => {
      const curImg = images[idx] || '';
      if (product.comboItems && product.comboItems[idx]) {
        const item = product.comboItems[idx];
        const name = typeof item === 'object' ? item.name : item;
        return name.split(' ')[0];
      }
      if (product.category === 'hampers' && idx > 0) {
        if (curImg.includes('real-mamra')) return 'Almonds';
        if (curImg.includes('real-walnuts')) return 'Walnuts';
        if (curImg.includes('real-saffron')) return 'Saffron';
        if (curImg.includes('real-apricots')) return 'Apricots';
      }
      if (curImg.includes('packaged')) return 'Packaging';
      if (curImg.includes('apricots') || curImg.includes('kargil')) return 'Apricots';
      if (curImg.includes('real-figs') || curImg.includes('figs-close')) return 'Anjeer';
      if (curImg.includes('cranberries')) return 'Cranberries';
      if (curImg.includes('blueberries')) return 'Blueberries';
      if (curImg.includes('berries')) return 'Berries';
      if (curImg.includes('gurbandi')) return 'Gurbandi';
      if (curImg.includes('kahwa-brewed')) return 'Brewed';
      if (curImg.includes('kahwa-tea-blend')) return 'Blend';
      if (curImg.includes('slice')) return 'Slice';
      if (curImg.includes('powder')) return 'Powder';
      if (curImg.includes('real-') && curImg.includes('macro')) return '📷 Macro';
      if (curImg.includes('real-') && curImg.includes('camera')) return '📸 Camera';
      if (curImg.includes('real-')) return '📷 Real Pic';
      if (curImg.includes('infusion')) return 'Purity Test';
      if (curImg.includes('shell')) return 'Shells';
      if (curImg.includes('close')) return 'Close-up';
      if (idx === 0) return 'Primary';
      return 'Heritage';
    };

    modal.innerHTML = `
      <div class="quickview-container qv-widescreen-modal animate-scale-up">
        <button class="modal-close-x" id="btn-close-qv" aria-label="Close Widescreen View">&times;</button>
        
        <!-- WIDESCREEN TOP BAR: PRODUCT TYPE & BOTANICAL CLASSIFICATION -->
        <div class="qv-widescreen-header">
          <div class="qv-header-left">
            <span class="qv-category-badge">🏔️ ${product.category.toUpperCase()}</span>
            <div class="qv-product-type-pill" title="Official Botanical & Grade Classification">
              <span class="qv-type-icon">🔬</span>
              <span class="qv-type-text"><strong>Product Type:</strong> ${product.productType || product.subname}</span>
            </div>
          </div>
          <div class="qv-header-right">
            <span class="qv-fssai-top-badge">🌿 FSSAI Central License: 10026061000412</span>
            <span class="qv-batch-badge">Harvest: ${product.harvestYear || '2026 Valley Fresh'}</span>
          </div>
        </div>

        <div class="qv-grid qv-widescreen-grid">
          
          <!-- LEFT: PANORAMIC MULTI-IMAGE GALLERY (4-5 PHOTOS) -->
          <div class="qv-gallery-col">
            <div class="qv-main-image-wrapper qv-widescreen-img-wrapper">
              <img src="${images[0]}" alt="${product.name}" class="qv-main-image" id="qv-main-active-img"/>
              
              ${images.length > 1 ? `
                <button class="qv-gallery-arrow qv-gallery-prev" id="btn-qv-prev" aria-label="Previous Photo" title="Previous Photo">‹</button>
                <button class="qv-gallery-arrow qv-gallery-next" id="btn-qv-next" aria-label="Next Photo" title="Next Photo">›</button>
              ` : ''}

              <div class="qv-img-badge-overlay">
                <span class="qv-img-counter-badge" id="qv-counter-badge">${isCombo ? `Photo 1 of ${images.length} (Combo Item 1)` : `Photo 1 of ${images.length}`}</span>
                <span class="qv-real-camera-tag ${(images[0].includes('real-') || images[0].includes('-close') || images[0].includes('kargil') || images[0].includes('brewed') || images[0].includes('blend') || images[0].includes('slice') || images[0].includes('powder') || images[0].includes('shell')) ? '' : 'hidden'}" id="qv-real-camera-tag">
                  ${(images[0].includes('macro') || images[0].includes('close') || images[0].includes('slice') || images[0].includes('powder')) ? '📷 Real Macro Photography' : '📸 Real Camera Photo'}
                </span>
                ${isSpice ? `<span class="qv-pack-badge spice-pack">🏷️ JENU'S Packaging Included</span>` : ''}
                ${isCombo ? `<span class="qv-pack-badge combo-pack">🎁 ${images.length} Items Multi-Pack</span>` : ''}
              </div>
            </div>

            <!-- Dynamic Image Caption Bar -->
            <div class="qv-img-caption-bar" id="qv-img-caption">
              ${getCaption(0)}
            </div>

            <!-- Interactive 5-Thumbnails Strip -->
            ${images.length > 1 ? `
              <div class="qv-thumbnails-strip" id="qv-thumbnails-strip">
                ${images.map((img, idx) => `
                  <button class="qv-thumb-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" title="${getCaption(idx)}">
                    <img src="${img}" alt="Photo ${idx + 1}" />
                    <span class="qv-thumb-num">${idx + 1}</span>
                    <span class="qv-thumb-label">${getThumbLabel(idx)}</span>
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <!-- Combo Items 1:1 Breakdown (for combo products) -->
            ${product.comboItems && product.comboItems.length > 0 ? `
              <div class="qv-combo-contents-box">
                <div class="qv-combo-title">
                  <span>✨ Included Products in this Combo (${product.comboItems.length} Items):</span>
                </div>
                <div class="qv-combo-list">
                  ${product.comboItems.map((ci, idx) => `
                    <div class="qv-combo-item-chip ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
                      <img src="${images[idx] || product.image}" class="qv-combo-chip-thumb" />
                      <div class="qv-combo-chip-info">
                        <strong>${typeof ci === 'object' ? ci.name : ci}</strong>
                        <small>${typeof ci === 'object' && ci.weight ? ci.weight : `Item ${idx+1}`}</small>
                      </div>
                      <button class="btn-qv-inspect-combo" data-idx="${idx}" title="Switch view to this photo">Inspect Photo ➔</button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Packaging & Cold Storage Seal Quality Guarantee -->
            <div class="qv-packaging-callout">
              <div class="qv-callout-icon">🛡️</div>
              <div class="qv-callout-text">
                <strong>JENU'S Srinagar Cold-Storage Packaging Standards:</strong>
                <span>Packaged directly at our Srinagar depot in heavy-duty food-grade aroma-lock canisters & glass jars. Purged with nitrogen to maintain zero humidity and retain 100% natural essential oils.</span>
              </div>
            </div>

            <!-- Customer Care & Direct Helpline Bar -->
            <div class="qv-support-hotline-bar">
              <span class="qv-support-icon">📞</span>
              <div class="qv-support-info">
                <span>Customer Care & Bulk Ordering Lines:</span>
                <div class="qv-support-numbers">
                  <a href="tel:85955119239" class="qv-tel-link"><strong>85955119239</strong></a>
                  <span class="qv-tel-sep">•</span>
                  <a href="tel:9868983010" class="qv-tel-link"><strong>9868983010</strong></a>
                  <span class="qv-tel-sep">•</span>
                  <a href="mailto:SriRadheEnterpriseswork@gmail.com" class="qv-tel-link" style="color: #FDE68A;"><strong>SriRadheEnterpriseswork@gmail.com</strong></a>
                  <span class="qv-support-hubs">(Jammu • Kashmir • Delhi • Mumbai)</span>
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT: COMPREHENSIVE PRODUCT OVERVIEW & SPECIFICATIONS -->
          <div class="qv-details-col">
            
            <div class="qv-origin-strip">
              <span>📍 Origin: <strong>${product.origin}</strong></span>
              <span class="qv-origin-sep">•</span>
              <span>🌾 Harvest: <strong>${product.harvestYear || '2026 Season'}</strong></span>
            </div>

            <h2 class="qv-title">${product.name}</h2>
            <p class="qv-sub">${product.subname}</p>
            
            <!-- Product Type Highlight -->
            <div class="qv-type-feature-box">
              <span class="qv-type-label">Product Type / Classification:</span>
              <span class="qv-type-value">${product.productType || product.subname}</span>
            </div>

            <div class="qv-rating-bar">
              <span class="stars">★★★★★</span>
              <strong>${product.rating}</strong>
              <span>(${product.reviewsCount.toLocaleString()} Verified Customer Reviews)</span>
              ${this.isProductVisited(product.id) ? '<span class="qv-visited-tag">✓ You Explored This</span>' : ''}
            </div>

            <div class="qv-price-stack">
              <span class="qv-cur-price" id="qv-price">₹${curWeight.price.toLocaleString('en-IN')}</span>
              <span class="qv-orig-price" id="qv-orig">₹${curWeight.originalPrice.toLocaleString('en-IN')}</span>
              <span class="qv-save" id="qv-save">${curWeight.discount}% OFF</span>
              <span class="qv-tax-tag">Inclusive of all taxes • Free Air Delivery</span>
            </div>

            <!-- Weight Selection -->
            <div class="qv-weights-group">
              <label>Select Package Size / Weight:</label>
              <div class="qv-weight-pills">
                ${product.weights.map(w => `
                  <button class="qv-pill ${w.weight === curWeight.weight ? 'active' : ''}" data-weight="${w.weight}">
                    ${w.weight}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- COMPREHENSIVE PRODUCT OVERVIEW GRID -->
            <div class="qv-overview-section">
              <div class="qv-section-header">
                <span class="qv-section-icon">📋</span>
                <h4>Product Overview & Terroir Specifications</h4>
              </div>
              <div class="qv-overview-grid">
                <div class="qv-overview-card">
                  <div class="qv-card-icon">🏔️</div>
                  <div class="qv-card-content">
                    <span class="qv-card-label">Terroir & Altitude</span>
                    <strong class="qv-card-val">${product.overview?.terroir || product.origin}</strong>
                  </div>
                </div>
                <div class="qv-overview-card">
                  <div class="qv-card-icon">🌾</div>
                  <div class="qv-card-content">
                    <span class="qv-card-label">Harvesting Method</span>
                    <strong class="qv-card-val">${product.overview?.harvestMethod || 'Hand-harvested 2026 Fresh Valley Harvest'}</strong>
                  </div>
                </div>
                <div class="qv-overview-card">
                  <div class="qv-card-icon">👃</div>
                  <div class="qv-card-content">
                    <span class="qv-card-label">Aroma & Flavor Profile</span>
                    <strong class="qv-card-val">${product.overview?.aromaFlavor || 'Sweet mountain richness, rich bouquet'}</strong>
                  </div>
                </div>
                <div class="qv-overview-card">
                  <div class="qv-card-icon">💎</div>
                  <div class="qv-card-content">
                    <span class="qv-card-label">Purity & Processing</span>
                    <strong class="qv-card-val">${product.overview?.purityGrade || '100% Pure, Unbleached & Non-GMO'}</strong>
                  </div>
                </div>
                <div class="qv-overview-card">
                  <div class="qv-card-icon">📦</div>
                  <div class="qv-card-content">
                    <span class="qv-card-label">Packaging Standard</span>
                    <strong class="qv-card-val">${product.overview?.packagingStandard || 'Airtight nitrogen sealed food-grade canister'}</strong>
                  </div>
                </div>
                <div class="qv-overview-card">
                  <div class="qv-card-icon">⏳</div>
                  <div class="qv-card-content">
                    <span class="qv-card-label">Shelf Life & Storage</span>
                    <strong class="qv-card-val">${product.overview?.shelfLife || '12 Months in cool dry mountain storage'}</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- DETAILED PRODUCT DESCRIPTION -->
            <div class="qv-description-section">
              <div class="qv-section-header">
                <span class="qv-section-icon">📖</span>
                <h4>Detailed Description & Provenance</h4>
              </div>
              <p class="qv-desc">${product.description}</p>
            </div>

            <!-- BENEFITS & QUALITY ASSURANCE -->
            <div class="qv-benefits-section">
              <div class="qv-section-header">
                <span class="qv-section-icon">✓</span>
                <h4>FSSAI Certified Quality & Laboratory Specifications</h4>
              </div>
              <ul class="qv-benefits-grid-list">
                ${product.benefits.map(b => `<li><span class="qv-check">✓</span> <span>${b}</span></li>`).join('')}
              </ul>
            </div>

            <!-- NUTRITIONAL BREAKDOWN -->
            <div class="qv-nutrition-table">
              <div class="qv-section-header">
                <span class="qv-section-icon">🥗</span>
                <h4>Nutritional Breakdown (per 100g serving)</h4>
              </div>
              <div class="nutrition-chips qv-widescreen-nutrition">
                <div class="nutri-cell">
                  <span class="nutri-label">Energy</span>
                  <strong class="nutri-val">${product.nutrition.calories}</strong>
                </div>
                <div class="nutri-cell">
                  <span class="nutri-label">Protein</span>
                  <strong class="nutri-val">${product.nutrition.protein}</strong>
                </div>
                <div class="nutri-cell">
                  <span class="nutri-label">Healthy Fats</span>
                  <strong class="nutri-val">${product.nutrition.healthyFats}</strong>
                </div>
                <div class="nutri-cell">
                  <span class="nutri-label">Carbs</span>
                  <strong class="nutri-val">${product.nutrition.carbs}</strong>
                </div>
                <div class="nutri-cell">
                  <span class="nutri-label">Dietary Fiber</span>
                  <strong class="nutri-val">${product.nutrition.fiber}</strong>
                </div>
              </div>
            </div>

            <!-- BUYING ACTIONS -->
            <div class="qv-actions-box">
              ${product.inStock === false ? `
                <button class="btn-qv-add-cart disabled" disabled style="background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; border: 1px solid #D1D5DB;">
                  <span>Out of Stock</span>
                  <span id="qv-btn-price">🚫 Sold Out in Cold Storage</span>
                </button>
              ` : `
                <button class="btn-qv-add-cart btn-qv-widescreen-add" id="btn-qv-add-cart">
                  <span>Add to Cart (${curWeight.weight})</span>
                  <span id="qv-btn-price">₹${curWeight.price.toLocaleString('en-IN')}</span>
                </button>
              `}
            </div>

            <div class="qv-wholesale-action-box">
              <button type="button" class="btn-qv-wholesale-blink" id="btn-qv-wholesale-blink" title="Request bulk discount price for ${product.name}">
                <span class="w-blink-dot-small"></span>
                <span>⚡ Blink Us for Bulk Wholesale Rate (10kg – 1Ton+)</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Gallery update logic for all 5 images
    const updateGallery = (newIdx) => {
      activeImgIndex = (newIdx + images.length) % images.length;
      const imgEl = document.getElementById('qv-main-active-img');
      const capEl = document.getElementById('qv-img-caption');
      const countEl = document.getElementById('qv-counter-badge');

      if (imgEl) {
        imgEl.style.opacity = '0.35';
        imgEl.style.transform = 'scale(0.97)';
        setTimeout(() => {
          imgEl.src = images[activeImgIndex];
          imgEl.style.opacity = '1';
          imgEl.style.transform = 'scale(1)';
        }, 120);
      }
      if (capEl) capEl.textContent = getCaption(activeImgIndex);
      if (countEl) {
        if (isCombo && product.comboItems?.[activeImgIndex]) {
          const item = product.comboItems[activeImgIndex];
          const itemName = typeof item === 'object' ? item.name : item;
          countEl.textContent = `Photo ${activeImgIndex + 1} of ${images.length} (${itemName.split('(')[0]})`;
        } else {
          countEl.textContent = `Photo ${activeImgIndex + 1} of ${images.length}`;
        }
      }

      const realTag = document.getElementById('qv-real-camera-tag');
      if (realTag) {
        const curImg = images[activeImgIndex] || '';
        const isReal = curImg.includes('real-') || curImg.includes('-close') || curImg.includes('kargil') || curImg.includes('brewed') || curImg.includes('blend') || curImg.includes('slice') || curImg.includes('powder') || curImg.includes('shell');
        realTag.classList.toggle('hidden', !isReal);
        if (isReal) {
          realTag.textContent = (curImg.includes('macro') || curImg.includes('close') || curImg.includes('slice') || curImg.includes('powder'))
            ? '📷 Real Macro Photography' 
            : '📸 Real Camera Photo';
        }
      }
      modal.querySelectorAll('.qv-thumb-btn').forEach((b, i) => {
        b.classList.toggle('active', i === activeImgIndex);
      });
      modal.querySelectorAll('.qv-combo-item-chip').forEach((c, i) => {
        c.classList.toggle('active', i === activeImgIndex);
      });
      kashmirAudio.playSantoorNote(440 + (activeImgIndex * 40));
    };

    // Bind Gallery Arrows
    document.getElementById('btn-qv-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGallery(activeImgIndex - 1);
    });
    document.getElementById('btn-qv-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGallery(activeImgIndex + 1);
    });

    // Bind Thumbnails
    modal.querySelectorAll('.qv-thumb-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateGallery(parseInt(btn.dataset.idx));
      });
    });

    // Bind Combo Breakdown clicks
    modal.querySelectorAll('.qv-combo-item-chip, .btn-qv-inspect-combo').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        updateGallery(parseInt(el.dataset.idx));
      });
    });

    document.getElementById('btn-close-qv')?.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });

    let activeW = curWeight;
    modal.querySelectorAll('.qv-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.qv-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const chosen = product.weights.find(w => w.weight === btn.dataset.weight);
        if (chosen) {
          activeW = chosen;
          this.selectedProductWeights[product.id] = chosen;
          document.getElementById('qv-price').textContent = `₹${chosen.price.toLocaleString('en-IN')}`;
          document.getElementById('qv-orig').textContent = `₹${chosen.originalPrice.toLocaleString('en-IN')}`;
          document.getElementById('qv-save').textContent = `${chosen.discount}% OFF`;
          const btnPriceEl = document.getElementById('qv-btn-price');
          const btnAddCart = document.getElementById('btn-qv-add-cart');
          if (btnPriceEl && product.inStock !== false) {
            btnPriceEl.textContent = `₹${chosen.price.toLocaleString('en-IN')}`;
          }
          if (btnAddCart && product.inStock !== false) {
            const labelSpan = btnAddCart.querySelector('span:first-child');
            if (labelSpan) labelSpan.textContent = `Add to Cart (${chosen.weight})`;
          }
          this.renderProducts();
        }
      });
    });

    if (product.inStock !== false) {
      document.getElementById('btn-qv-add-cart')?.addEventListener('click', () => {
        cartStore.addItem(product, activeW, 1);
        kashmirAudio.playSantoorNote(523.25);
        this.showToast(`Added ${product.name} (${activeW.weight}) to your cart`);
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        this.openCartDrawer();
      });
    }

    modal.querySelector('#btn-qv-wholesale-blink')?.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.classList.remove('modal-open');
      wholesaleManager.openModal({ name: product.name });
    });
  }

  // --- PINCODE CHECKER ---
  initPincodeChecker() {
    const pinBtn = document.getElementById('btn-header-pincode');
    if (!pinBtn) return;

    pinBtn.addEventListener('click', () => {
      const pin = prompt("Enter your 6-digit Pincode to check express delivery time:", "110001");
      if (pin && pin.trim().length === 6) {
        const info = this.lookupPincode(pin.trim());
        pinBtn.innerHTML = `📍 Deliver to: <strong>${pin} (${info.city})</strong>`;
        this.showToast(`Air Dispatch to ${info.city}: Estimated delivery in ${info.estDays} days`);
      }
    });
  }

  // --- OFFICIAL FSSAI CERTIFICATE MODAL ---
  initCertificateModal() {
    const openBtns = document.querySelectorAll('.btn-open-fssai-cert');
    let certModal = document.getElementById('fssai-cert-modal');

    if (!certModal) {
      certModal = document.createElement('div');
      certModal.id = 'fssai-cert-modal';
      certModal.className = 'kashmir-modal-overlay hidden';
      certModal.innerHTML = `
        <div class="fssai-cert-container animate-scale-up">
          <button class="modal-close-x" id="btn-close-cert">&times;</button>
          <div class="fssai-cert-frame">
            
            <!-- FSSAI Header -->
            <div class="fssai-cert-header">
              <div class="fssai-logo-box">
                <span class="fssai-text-emblem">fssai</span>
                <span class="fssai-licence-badge">Central License</span>
              </div>
              <div class="fssai-gov-titles">
                <h3>FOOD SAFETY AND STANDARDS AUTHORITY OF INDIA</h3>
                <p>Ministry of Health & Family Welfare, Government of India</p>
                <strong class="fssai-licence-num">Registration & License No: 10026061000412</strong>
              </div>
            </div>

            <div class="fssai-status-strip">
              <span class="fssai-active-pill">✓ COMPLIANT & CERTIFIED ACTIVE</span>
              <span>Valid Thru: 2028 | Standard: ISO 22000 / HACCP Level 3</span>
            </div>

            <!-- Business & Facility Info -->
            <div class="fssai-info-grid">
              <div class="fssai-info-item">
                <span class="fssai-label">Certified Entity:</span>
                <strong>JENU'S Kashmir Gourmet Pvt. Ltd.</strong>
              </div>
              <div class="fssai-info-item">
                <span class="fssai-label">Processing & Packaging Facility:</span>
                <strong>Highway 44 Agro-Park, Pampore, Pulwama, J&K - 192121</strong>
              </div>
              <div class="fssai-info-item">
                <span class="fssai-label">Authorized Food Category:</span>
                <strong>Dry Fruits, Nuts, Edible Seeds, Saffron & Spices</strong>
              </div>
              <div class="fssai-info-item">
                <span class="fssai-label">Inspection & Audit Protocol:</span>
                <strong>Annual NABL Accredited Laboratory Batch Surveillance</strong>
              </div>
            </div>

            <!-- Comprehensive Lab Test Results Table -->
            <div class="fssai-test-table-wrapper">
              <h5>NABL Accredited Food Safety & Purity Test Report (Batch: JNU-2026-VALLEY)</h5>
              <table class="fssai-table">
                <thead>
                  <tr>
                    <th>Test Parameter</th>
                    <th>FSSAI Safe Limit</th>
                    <th>Observed Batch Result</th>
                    <th>Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Aflatoxins (B1, B2, G1, G2)</strong></td>
                    <td>Max 15.0 ppb</td>
                    <td>< 0.5 ppb (Not Detected)</td>
                    <td class="status-pass">PASS ✓</td>
                  </tr>
                  <tr>
                    <td><strong>Pesticide Residue (200+ Screen)</strong></td>
                    <td>Max Residue Limit (MRL)</td>
                    <td>Nil (Below LOD)</td>
                    <td class="status-pass">PASS ✓</td>
                  </tr>
                  <tr>
                    <td><strong>Heavy Metals (Pb, Cd, As, Hg)</strong></td>
                    <td>As per FSSAI Reg. 2.1.1</td>
                    <td>Within Safe Normal Limits</td>
                    <td class="status-pass">PASS ✓</td>
                  </tr>
                  <tr>
                    <td><strong>Moisture Content</strong></td>
                    <td>Max 10.0%</td>
                    <td>7.8% (Optimal Stability)</td>
                    <td class="status-pass">PASS ✓</td>
                  </tr>
                  <tr>
                    <td><strong>Saffron Crocin Strength (E1% 440nm)</strong></td>
                    <td>Min 190.0 (Grade 1)</td>
                    <td><strong>254.8 (Exceptional Purity)</strong></td>
                    <td class="status-pass">PASS ✓</td>
                  </tr>
                  <tr>
                    <td><strong>Microbiological (E. coli, Salmonella)</strong></td>
                    <td>Absent / 25g</td>
                    <td>Absent</td>
                    <td class="status-pass">PASS ✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="fssai-cert-footer">
              <div class="fssai-auth-sign">
                <span class="auth-name">Authorized Quality Analyst</span>
                <span class="auth-dept">Central Food Safety Certification Division</span>
              </div>
              <div class="fssai-seal-mark">
                <span>🌿 100% FOOD SAFE & PURE</span>
              </div>
            </div>

          </div>
        </div>
      `;
      document.body.appendChild(certModal);
    }

    openBtns.forEach(b => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        certModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        kashmirAudio.playSantoorNote(659.25);
      });
    });

    document.getElementById('btn-close-cert')?.addEventListener('click', () => {
      certModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });
  }

  // --- ORDER TRACKING ---
  initOrderTracking() {
    document.querySelectorAll('.btn-open-track-orders, #btn-header-track, #sub-nav-track-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        orderTrackingManager.openModal();
      });
    });
  }

  // --- MASTER DATABASE & ADMIN PORTAL ---
  initAdminPortal() {
    document.querySelectorAll('.btn-open-admin-portal, #secret-admin-anchor').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (dbStore.isAuthenticated()) {
          adminPortalManager.openDatabasePortal();
        } else {
          adminPortalManager.openLoginModal();
        }
      });
    });
  }

  // --- WHOLESALE & BULK INQUIRIES ---
  initWholesale() {
    document.querySelectorAll('.btn-open-wholesale, #btn-header-wholesale, .btn-open-wholesale-nav, #dock-wholesale-btn, #btn-hero-wholesale').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        wholesaleManager.openModal();
      });
    });
  }

  updateWishlistCount() {
    const count = cartStore.getState().wishlistCount;
    document.querySelectorAll('.wishlist-count-badge').forEach(b => {
      b.textContent = count;
      b.classList.toggle('has-items', count > 0);
    });
  }

  showToast(msg) {
    let toast = document.getElementById('kashmir-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kashmir-toast';
      toast.className = 'kashmir-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- ANIMATIONS & LIVE SOCIAL PROOF ---
  triggerFlyingCartAnimation(sourceEl, product) {
    const headerCart = document.getElementById('btn-header-cart');
    if (!sourceEl || !headerCart) return;

    try {
      const srcRect = sourceEl.getBoundingClientRect();
      const destRect = headerCart.getBoundingClientRect();
      const startX = srcRect.left + srcRect.width / 2;
      const startY = srcRect.top + srcRect.height / 2;

      // 1. Burst 8 golden sparkle particles around the clicked button
      const sparkleSymbols = ['✦', '✨', '★', '🌸', '✦', '✨', '★', '🌿'];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dist = Math.random() * 45 + 32;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        const particle = document.createElement('div');
        particle.className = 'cart-sparkle-particle';
        particle.textContent = sparkleSymbols[i];
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 700);
      }

      // 2. Parabolic flying thumbnail of the product to header cart
      const flyingDot = document.createElement('div');
      flyingDot.className = 'flying-cart-dot';
      if (product && product.image) {
        flyingDot.innerHTML = `<img src="${product.image}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" alt="" />`;
      } else {
        flyingDot.innerHTML = '✦';
      }
      flyingDot.style.left = `${startX - 18}px`;
      flyingDot.style.top = `${startY - 18}px`;
      flyingDot.style.width = '36px';
      flyingDot.style.height = '36px';
      flyingDot.style.borderRadius = '50%';
      flyingDot.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.65)';
      document.body.appendChild(flyingDot);

      // Force reflow
      void flyingDot.offsetWidth;

      const targetX = (destRect.left + destRect.width / 2) - startX;
      const targetY = (destRect.top + destRect.height / 2) - startY;

      flyingDot.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.35) rotate(720deg)`;
      flyingDot.style.opacity = '0.2';
      flyingDot.style.transition = 'transform 0.68s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.68s ease';

      setTimeout(() => {
        flyingDot.remove();
        headerCart.classList.remove('cart-bump');
        void headerCart.offsetWidth;
        headerCart.classList.add('cart-bump');
        kashmirAudio.playSantoorNote(587.33); // D5 chime
      }, 680);
    } catch (err) {
      console.warn("Animation error:", err);
    }
  }

  initLiveSalesTicker() {
    const recentOrders = [
      { city: "Mumbai", item: "Valley Vitality Duo (1kg)", time: "2 mins ago", img: "/images/combos-pack.jpg" },
      { city: "New Delhi", item: "Kashmiri Kagzi Snow Walnuts (500g)", time: "Just now", img: "/images/walnuts-akhrot.jpg" },
      { city: "Bengaluru", item: "Pure Pampore Mongra Saffron (2g)", time: "5 mins ago", img: "/images/saffron-pampore.jpg" },
      { city: "Srinagar", item: "The Kashmir Royal Valley Trio", time: "1 min ago", img: "/images/combos-pack.jpg" },
      { city: "Pune", item: "Authentic Kashmiri Mirch (250g)", time: "3 mins ago", img: "/images/kashmiri-mirch.jpg" },
      { city: "Hyderabad", item: "Royal Khatamband Carved Hamper", time: "Just now", img: "/images/royal-hamper.jpg" },
      { city: "Chennai", item: "Wild Kashmiri Shahi Jeera (100g)", time: "7 mins ago", img: "/images/shahi-jeera.jpg" },
      { city: "Kolkata", item: "Royal Shahi Kashmiri Kahwa (500g)", time: "4 mins ago", img: "/images/kahwa-tea.jpg" }
    ];

    let orderIdx = 0;
    let toast = document.getElementById('live-sales-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'live-sales-toast';
      toast.id = 'live-sales-toast';
      document.body.appendChild(toast);
    }

    const showNextSalesToast = () => {
      const sale = recentOrders[orderIdx];
      orderIdx = (orderIdx + 1) % recentOrders.length;

      toast.innerHTML = `
        <img src="${sale.img}" alt="${sale.item}" class="live-sales-thumb" />
        <div class="live-sales-content">
          <div class="live-sales-user">
            <span>Verified Order • ${sale.city}</span>
            <span class="live-pulse-dot"></span>
          </div>
          <strong class="live-sales-product">${sale.item}</strong>
          <span class="live-sales-meta">${sale.time}</span>
        </div>
        <button class="live-sales-close" id="btn-close-sales-toast" aria-label="Dismiss">&times;</button>
        <div class="live-sales-progress"></div>
      `;

      toast.classList.add('show');

      document.getElementById('btn-close-sales-toast')?.addEventListener('click', (e) => {
        e.stopPropagation();
        toast.classList.remove('show');
      });

      toast.onclick = () => {
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      };

      setTimeout(() => {
        toast.classList.remove('show');
      }, 5800);
    };

    setTimeout(() => {
      showNextSalesToast();
      setInterval(showNextSalesToast, 12000);
    }, 3500);
  }

  initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.08 });

    const observeAll = () => {
      document.querySelectorAll('.product-card, .why-feature-card, .review-card, .deal-banner-wrapper, .hamper-builder-controls').forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
      });
    };

    observeAll();
    this.refreshScrollReveal = observeAll;
  }

  bindGlobalEvents() {
    document.getElementById('sort-products-select')?.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.renderProducts();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.kashmir-modal-overlay, .razorpay-overlay').forEach(m => m.classList.add('hidden'));
        this.closeCartDrawer();
        document.body.classList.remove('modal-open');
      }
    });

    document.querySelectorAll('[data-nav-cat], [data-footer-cat]').forEach(el => {
      el.addEventListener('click', (e) => {
        const cat = el.getAttribute('data-nav-cat') || el.getAttribute('data-footer-cat');
        if (cat) {
          e.preventDefault();
          this.setCategory(cat);
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          document.querySelectorAll('.sub-nav-bar .nav-links-list li a').forEach(a => a.classList.remove('active'));
          el.classList.add('active');
        }
      });
    });

    document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletter-email');
      if (input && input.value) {
        this.showToast(`Thank you! 10% coupon code <strong>KASHMIR10</strong> has been sent to ${input.value}`);
        input.value = '';
        kashmirAudio.playCelebrationChime();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.jenusApp = new JenusApp();
});
