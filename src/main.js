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
    this.initWishlist();
    this.initPincodeChecker();
    this.initCertificateModal();
    this.initOrderTracking();
    this.initAdminPortal();
    this.initWholesale();
    this.initCheckoutModal();
    this.initScrollReveal();
    this.preventRecurringBanners();
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
  }

  // --- PRODUCTS RENDERING ---
  renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let list = [...dbStore.getProducts()];

    if (this.currentCategory !== 'all') {
      list = list.filter(p => {
        if (p.category === this.currentCategory) return true;
        if (p.subCategory === this.currentCategory) return true;
        if (this.currentCategory === 'teas' && (p.category === 'teas' || p.subCategory === 'teas' || p.category === 'kahwa-spices' || p.id === 'jnu-kahwa-06')) return true;
        if (this.currentCategory === 'powdered-spices' && (p.category === 'powdered-spices' || p.subCategory === 'powdered-spices')) return true;
        if (this.currentCategory === 'raw-spices' && (p.category === 'raw-spices' || p.subCategory === 'raw-spices')) return true;
        if (this.currentCategory === 'spices' && (p.category === 'spices' || p.subCategory === 'spices' || p.subCategory === 'powdered-spices' || p.subCategory === 'raw-spices')) return true;
        if (this.currentCategory === 'dates' && (p.category === 'dates' || p.subCategory === 'dates' || p.id.includes('dates'))) return true;
        if (this.currentCategory === 'seeds' && (p.category === 'seeds' || p.subCategory === 'seeds')) return true;
        if (this.currentCategory === 'breakfast' && (p.category === 'breakfast' || p.subCategory === 'breakfast')) return true;
        if (this.currentCategory === 'dried-fruits' && (p.category === 'dried-fruits' || p.subCategory === 'dried-fruits')) return true;
        if (this.currentCategory === 'cashews' && (p.subCategory === 'cashews' || p.category === 'cashews')) return true;
        if (this.currentCategory === 'pistachios' && (p.subCategory === 'pistachios' || p.category === 'pistachios')) return true;
        if (this.currentCategory === 'raisins' && (p.subCategory === 'raisins' || p.category === 'raisins')) return true;
        if (this.currentCategory === 'berries-seeds' && (p.category === 'berries-seeds' || p.subCategory === 'nuts' || p.category === 'dryfruits')) return true;
        return false;
      });
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
            <div class="product-card-top-actions">
              ${p.isBestseller ? '<span class="product-clean-badge bestseller">⭐ Bestseller</span>' : (p.badge ? `<span class="product-clean-badge">${p.badge}</span>` : '')}
              <button type="button" class="wishlist-btn ${isWish ? 'active' : ''}" data-pid="${p.id}" title="${isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}" aria-label="Wishlist">
                <svg class="wishlist-heart-icon" viewBox="0 0 24 24" width="15" height="15" fill="${isWish ? '#DC2626' : 'none'}" stroke="${isWish ? '#DC2626' : '#D1D5DB'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
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
          kashmirAudio.playSantoorNote(added ? 659.25 : 440);
          btn.classList.toggle('active', added);
          const icon = btn.querySelector('.wishlist-heart-icon');
          if (icon) {
            icon.setAttribute('fill', added ? '#DC2626' : 'none');
            icon.setAttribute('stroke', added ? '#DC2626' : '#D1D5DB');
          }
          btn.title = added ? 'Remove from Wishlist' : 'Add to Wishlist';
          this.showToast(added ? `❤️ Saved "${prod.name}" to Wishlist` : `Removed "${prod.name}" from Wishlist`);
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
        if (e.target.closest('.btn-add-to-cart, .btn-order-now, .qty-btn, .weight-chip, .qty-stepper-clean, .wishlist-btn')) {
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

    this.updateWishlistCount();

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
      
            // --- NEW EXPANDED PRODUCE & SPICE CLOSEUPS ---
      // Powdered Spices
      if (curImg.includes('mirch-powder-macro')) return `🌶️ Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Kashmiri Degi Mirch Powder (Vibrant Natural Ruby Sheen, Cold-Milled Below 40°C)`;
      if (curImg.includes('mirch-powder-bowl')) return `🌶️ Photo ${idx + 1} of ${images.length}: Real Close-up Photography — Pure Degi Mirch Powder in Artisan Brass Bowl (Smoky Paprika Notes)`;
      if (curImg.includes('mirch-powder-spices') || curImg.includes('mirch-powder-chakki')) return `🌶️ Photo ${idx + 1} of ${images.length}: Real Harvest Documentation — Hand-Sorted Stemless Kashmiri Chillies & Traditional Stone Chakki Milling`;
      if (curImg.includes('mirch-powder-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Nitrogen-Flushed Aroma-Lock Packaging — Safeguarding Natural Capsaicin & Color`;

      if (curImg.includes('saunf-powder-macro')) return `🌿 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Stone-Ground Kashmiri Fennel (Badiyan) Powder (Anethole Oil Rich Green Tone)`;
      if (curImg.includes('saunf-seeds-macro')) return `🌿 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — High-Altitude Mountain Fennel Seeds with Distinct Ridges`;
      if (curImg.includes('saunf-harvest') || curImg.includes('saunf-mortar')) return `🌿 Photo ${idx + 1} of ${images.length}: Valley Harvest & Stone Mortar Pulverizing — Handpicked Anantnag Umbel Seeds`;
      if (curImg.includes('saunf-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Food-Grade Tin Canister Freshness Seal — Cornerstone Spice for Wazwan Rogan Josh`;

      if (curImg.includes('sonth-powder-macro')) return `🍂 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Sun-Cured Mountain Sonth Powder (Golden Fibrous Ginger Zing)`;
      if (curImg.includes('sonth-roots-macro') || curImg.includes('sonth-sliced-dry')) return `🍂 Photo ${idx + 1} of ${images.length}: Real Macro Photography — Whole Dried Himalayan Ginger Rhizomes (Zero Bleach, Pure Natural Root)`;
      if (curImg.includes('sonth-stone-grind') || curImg.includes('sonth-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Traditional Valley Grinding & Hermetic Moisture-Barrier Pouch Packaging`;

      if (curImg.includes('haldi-powder-macro')) return `✨ Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — 5.5% High Curcumin Kashmiri Haldi Powder (Luminous Deep Golden Glow)`;
      if (curImg.includes('haldi-rhizome-macro') || curImg.includes('haldi-cross-section')) return `✨ Photo ${idx + 1} of ${images.length}: Real Macro Rhizome Cross-Section — Dense Concentric Rings of Pure Golden Curcuminoids`;
      if (curImg.includes('haldi-harvest-roots') || curImg.includes('haldi-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Organically Harvested Valley Roots & UV-Protected Air-Tight Gold Packaging`;

      if (curImg.includes('garam-masala-powder-macro')) return `👑 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Royal Kashmiri Wazwan 16-Spice Garam Masala Blend`;
      if (curImg.includes('garam-masala-whole-blend') || curImg.includes('garam-masala-roasting')) return `👑 Photo ${idx + 1} of ${images.length}: Whole Spice Master Blending — Ceylon Cinnamon, Green & Black Cardamom, Cloves, Mace and Star Anise`;
      if (curImg.includes('garam-masala-bowl') || curImg.includes('garam-masala-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Brass Urn Display & Imperial Multi-Layer Aroma Caddy Packaging`;

      if (curImg.includes('dhaniya-powder-macro')) return `🌱 Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Pure Himalayan Coriander Seed Powder (Floral Citrus Essence)`;
      if (curImg.includes('dhaniya-seeds-macro') || curImg.includes('dhaniya-seeds-harvest')) return `🌱 Photo ${idx + 1} of ${images.length}: High-Altitude Coriander Seed Spheres & Terrace Sun-Curing Documentation`;
      if (curImg.includes('dhaniya-mortar') || curImg.includes('dhaniya-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Traditional Stone Pulverizing & Nitrogen-Purged Moisture-Proof Container`;

      // Raw Whole Spices
      if (curImg.includes('badi-elaichi-macro') || curImg.includes('badi-elaichi-seeds-close')) return `🖤 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Smoky Kashmiri Badi Elaichi (Deep Ribbed Pods & Sticky Resinous Seeds)`;
      if (curImg.includes('badi-elaichi-tray') || curImg.includes('badi-elaichi-harvest')) return `🖤 Photo ${idx + 1} of ${images.length}: Hand-Graded Jumbo 25mm+ Pods & Traditional Firewood Smoke Curing`;
      if (curImg.includes('badi-elaichi-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Heavyweight Vacuum Pouch — Preserves Camphoric & Piney Essential Oils`;

      if (curImg.includes('choti-elaichi-macro') || curImg.includes('choti-elaichi-seeds-close')) return `💚 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Royal Kashmiri Green Cardamom (8mm+ Emerald Pods Packed with Black Seeds)`;
      if (curImg.includes('choti-elaichi-handful') || curImg.includes('choti-elaichi-brass-bowl')) return `💚 Photo ${idx + 1} of ${images.length}: Hand-Sorted Extra Bold Pods in Royal Brass Tasting Bowl (Crown Jewel of Shahi Kahwa)`;
      if (curImg.includes('choti-elaichi-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Hermetically Sealed Tin Caddy — Preserves Minty-Sweet Aroma`;

      if (curImg.includes('cinnamon-quills-macro') || curImg.includes('cinnamon-layers-close')) return `📜 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Pure Ceylon Cinnamon Quills (Wafer-Thin Scroll Layers, Delicate Sweetness)`;
      if (curImg.includes('cinnamon-bundle') || curImg.includes('cinnamon-bark-harvest')) return `📜 Photo ${idx + 1} of ${images.length}: Hand-Tied Artisan Quills & Traditional Inner Bark Peeling Documentation`;
      if (curImg.includes('cinnamon-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Glass Storage Tube with Airtight Wooden Seal`;

      if (curImg.includes('cloves-macro') || curImg.includes('cloves-oil-sheen')) return `⭐ Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — High-Oil Kashmiri Cloves (Intact Crown Heads with Natural Eugenol Oil Sheen)`;
      if (curImg.includes('cloves-handful') || curImg.includes('cloves-harvest')) return `⭐ Photo ${idx + 1} of ${images.length}: Hand-Selected Deep Reddish Buds & Sun-Curing Inspection`;
      if (curImg.includes('cloves-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Amber Glass Jar Packaging — Guards Essential Eugenol Oils from Light`;

      if (curImg.includes('star-anise-macro') || curImg.includes('star-anise-single-close')) return `✨ Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Royal 8-Point Star Anise (Glossy Polished Carpels with Glinting Seeds)`;
      if (curImg.includes('star-anise-walnut-wood') || curImg.includes('star-anise-harvest')) return `✨ Photo ${idx + 1} of ${images.length}: Whole Selected Stars on Kashmiri Walnut Wood & Orchard Harvest Inspection`;
      if (curImg.includes('star-anise-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Rigid Presentation Box — Prevents Delicate 8-Point Stars from Snapping`;

      if (curImg.includes('mace-javitri-macro') || curImg.includes('mace-aril-nutmeg-close')) return `🏵️ Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Golden Flame Javitri Mace Blades (Exotic Laced Filaments & Musky Fragrance)`;
      if (curImg.includes('mace-tray') || curImg.includes('mace-handful')) return `🏵️ Photo ${idx + 1} of ${images.length}: Handful of Whole Unbroken Javitri Flowers on Brass Tray (Key Wazwan Aroma)`;
      if (curImg.includes('mace-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Nitrogen-Flushed Protective Caddy`;

      // Premium Dry Fruits
      if (curImg.includes('cashews-jumbo-macro') || curImg.includes('cashews-w180-scale')) return `🥜 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — King W180 Jumbo Cashews (Colossal Ivory Kernels, World's Largest Grade)`;
      if (curImg.includes('cashews-handful') || curImg.includes('cashews-raw-bowl')) return `🥜 Photo ${idx + 1} of ${images.length}: Handful of Unblemished Giant Cashews in Carved Walnut Bowl (Sweet Creamy Crunch)`;
      if (curImg.includes('cashews-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Cold-Sealed Foil Pouch with Zip-Lock Freshness Barrier`;

      if (curImg.includes('cashews-roasted-macro') || curImg.includes('cashews-roasted-split')) return `🔥 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Slow-Roasted King Cashews Dusted with Pure Himalayan Pink Salt`;
      if (curImg.includes('cashews-roasted-bowl') || curImg.includes('cashews-roasting-process')) return `🔥 Photo ${idx + 1} of ${images.length}: Artisan Dry-Roasting in Small Batches (Zero Palm Oil) & Ceramic Serving Dish`;
      if (curImg.includes('cashews-roasted-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Vacuum Flushed Re-Sealable Pouch — Guaranteed Snapping Crunch`;

      if (curImg.includes('pista-inshell-macro') || curImg.includes('pista-split-handful')) return `🌰 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Royal In-Shell Pistachios (Naturally Sun-Opened Smile Shells & Emerald Meat)`;
      if (curImg.includes('pista-wood-tray') || curImg.includes('pista-harvest-orchard')) return `🌰 Photo ${idx + 1} of ${images.length}: Chinar Wood Presentation Tray & High-Altitude Mountain Orchard Harvest`;
      if (curImg.includes('pista-inshell-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Nitrogen-Flushed Protective Jar — Retains Crisp Shells`;

      if (curImg.includes('pista-giri-macro') || curImg.includes('pista-slivers-close')) return `💚 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Shelled Emerald Pistachio Kernels (Pista Giri) (Luminous Jade Chlorophyll Sheen)`;
      if (curImg.includes('pista-giri-handful') || curImg.includes('pista-kahwa-garnish')) return `💚 Photo ${idx + 1} of ${images.length}: Handful of 100% Whole Green Kernels & Wazwan Shahi Kahwa Almond-Pistachio Garnish`;
      if (curImg.includes('pista-giri-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: UV-Shielding Foil Packaging — Preserves Natural Bright Jade Color`;

      if (curImg.includes('raisins-green-macro') || curImg.includes('raisins-green-handful')) return `🍇 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Royal Long Green Seedless Raisins (25mm+ Extra Long Kishmish, Translucent Sweetness)`;
      if (curImg.includes('raisins-drying-shade') || curImg.includes('raisins-green-bowl')) return `🍇 Photo ${idx + 1} of ${images.length}: Traditional Valley Shade-Drying Kiln (Kishmish Khana) & Brass Serving Bowl`;
      if (curImg.includes('raisins-green-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Moisture-Barrier Zip Canister — Retains Plump Soft Chewiness`;

      if (curImg.includes('raisins-black-macro') || curImg.includes('raisins-black-handful')) return `🍇 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Mountain Black Seedless Raisins (Deep Obsidian Skin Rich in Natural Iron)`;
      if (curImg.includes('raisins-black-hydrated') || curImg.includes('raisins-black-vine')) return `🍇 Photo ${idx + 1} of ${images.length}: High-Altitude Vine Sun-Curing & Plump Hydrated Berry Macro`;
      if (curImg.includes('raisins-black-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Vacuum Freshness Canister — Protects Natural Fructose Balance`;

      if (curImg.includes('dates-medjool-macro') || curImg.includes('dates-medjool-open-close')) return `👑 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — King Medjool Dates (Lustrous Amber Wrinkled Skin & Luscious Caramel Honey Pulp)`;
      if (curImg.includes('dates-medjool-five') || curImg.includes('dates-palm-harvest')) return `👑 Photo ${idx + 1} of ${images.length}: Jumbo 35g+ Grade Selection & Tree-Ripened Palm Harvest Inspection`;
      if (curImg.includes('dates-medjool-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Luxury Rigid Presentation Box with Inner Fluted Tray`;

      if (curImg.includes('dates-chhuara-macro') || curImg.includes('dates-chhuara-handful')) return `☀️ Photo ${idx + 1} of ${images.length}: Authentic Real Macro Photography — Kashmiri Sun-Dried Chhuara (Dense Golden Brown Dry Dates, Pure Sun-Cured)`;
      if (curImg.includes('dates-chhuara-split') || curImg.includes('dates-chhuara-brass-bowl')) return `☀️ Photo ${idx + 1} of ${images.length}: Split Chhuara Macro (Nutrient-Dense Calcium Core) & Valley Brass Display`;
      if (curImg.includes('dates-chhuara-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Heavy Duty Food-Grade Air-Tight Pouch`;

      if (curImg.includes('hazelnuts-macro') || curImg.includes('hazelnuts-inshell-cracked')) return `🌰 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Wild Himalayan Hazelnut Kernels (Round Golden-Brown Kernels with Rich Hazelnut Oil)`;
      if (curImg.includes('hazelnuts-roasted-skins') || curImg.includes('hazelnuts-forest-harvest')) return `🌰 Photo ${idx + 1} of ${images.length}: Gentle Roasted Kernels with Flaked Skins & High-Altitude Himalayan Forest Forage`;
      if (curImg.includes('hazelnuts-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Foil Aroma-Lock Standup Pouch — Retains Fresh Roasted Crispness`;

      if (curImg.includes('pecans-macro') || curImg.includes('macadamia-macro')) return `🍂 Photo ${idx + 1} of ${images.length}: Extreme Real Macro Photography — Jumbo Alpine Pecan Halves & Raw Creamy Macadamia Nuts`;
      if (curImg.includes('pecans-bowl') || curImg.includes('pecans-shell-cracking')) return `🍂 Photo ${idx + 1} of ${images.length}: Luxury Carved Walnut Wood Medley & Hand-Graded Pecan Halves`;
      if (curImg.includes('pecans-packaged')) return `🏷️ Photo ${idx + 1} of ${images.length}: Nitrogen-Sealed Imperial Nut Tin — Preserves Rich Omega Oils`;

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

            <!-- BUYING ACTIONS & WISHLIST (IMMEDIATELY VISIBLE) -->
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
              <button type="button" class="btn-qv-wishlist ${cartStore.isInWishlist(product.id) ? 'active' : ''}" id="btn-qv-wishlist" title="${cartStore.isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}" aria-label="Wishlist">
                <svg class="qv-wishlist-icon" viewBox="0 0 24 24" width="20" height="20" fill="${cartStore.isInWishlist(product.id) ? '#DC2626' : 'none'}" stroke="${cartStore.isInWishlist(product.id) ? '#DC2626' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span class="qv-wishlist-label">${cartStore.isInWishlist(product.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            <div class="qv-wholesale-action-box">
              <button type="button" class="btn-qv-wholesale-blink" id="btn-qv-wholesale-blink" title="Request bulk discount price for ${product.name}">
                <span class="w-blink-dot-small"></span>
                <span>⚡ Blink Us for Bulk Wholesale Rate (10kg – 1Ton+)</span>
              </button>
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

    const qvWishBtn = modal.querySelector('#btn-qv-wishlist');
    qvWishBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const added = cartStore.toggleWishlist(product);
      kashmirAudio.playSantoorNote(added ? 659.25 : 440);
      qvWishBtn.classList.toggle('active', added);
      const icon = qvWishBtn.querySelector('.qv-wishlist-icon');
      const label = qvWishBtn.querySelector('.qv-wishlist-label');
      if (icon) {
        icon.setAttribute('fill', added ? '#DC2626' : 'none');
        icon.setAttribute('stroke', added ? '#DC2626' : 'currentColor');
      }
      if (label) {
        label.textContent = added ? 'Saved in Wishlist' : 'Add to Wishlist';
      }
      qvWishBtn.title = added ? 'Remove from Wishlist' : 'Add to Wishlist';
      this.showToast(added ? `❤️ Saved "${product.name}" to Wishlist` : `Removed "${product.name}" from Wishlist`);
      this.updateWishlistCount();
      this.renderProducts();
    });

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

  // --- ORDER TRACKING & AUTH ---
  initOrderTracking() {
    const updateHeaderTrackBtn = () => {
      const phone = orderTrackingManager.currentPhone || localStorage.getItem('jenus_user_phone');
      const trackBtn = document.getElementById('btn-header-track');
      if (trackBtn) {
        if (phone) {
          trackBtn.innerHTML = `<span>👤 +91 ${phone.slice(0, 5)}...</span>`;
          trackBtn.title = `Verified Patron +91 ${phone} • Click to view orders`;
        } else {
          trackBtn.innerHTML = `<span>📦 Track Orders / Login</span>`;
          trackBtn.title = `Track Consignment / Sign In`;
        }
      }
    };

    updateHeaderTrackBtn();
    window.addEventListener('jenus_auth_change', updateHeaderTrackBtn);

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

  // --- WISHLIST MANAGEMENT ---
  initWishlist() {
    const toggleBtns = document.querySelectorAll('.btn-wishlist-toggle, #btn-wishlist-toggle');
    toggleBtns.forEach(b => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        this.openWishlistModal();
      });
    });
    this.updateWishlistCount();
  }

  updateWishlistCount() {
    const count = cartStore.getState().wishlistCount;
    document.querySelectorAll('.wishlist-count-badge').forEach(b => {
      b.textContent = count;
      b.classList.toggle('has-items', count > 0);
    });
  }

  openWishlistModal() {
    let modal = document.getElementById('kashmir-wishlist-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'kashmir-wishlist-modal';
      modal.className = 'kashmir-modal-overlay hidden';
      document.body.appendChild(modal);
    }

    const renderWishlistContent = () => {
      const items = cartStore.getState().wishlist || [];
      const count = items.length;

      modal.innerHTML = `
        <div class="wishlist-modal-container animate-scale-up">
          <div class="wishlist-modal-header">
            <div class="wishlist-header-title">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#DC2626" stroke="#DC2626" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <h3>My Saved Wishlist</h3>
              <span class="wishlist-count-pill">${count} ${count === 1 ? 'item' : 'items'}</span>
            </div>
            <button type="button" class="modal-close-x" id="btn-close-wishlist" title="Close Wishlist">&times;</button>
          </div>

          <div class="wishlist-modal-body">
            ${count === 0 ? `
              <div class="wishlist-empty-state">
                <div class="wishlist-empty-icon">🤍</div>
                <h4>Your Wishlist is Empty</h4>
                <p>You haven't saved any Kashmiri delicacies yet. Click the heart icon on any product or when viewing product details to save items for later.</p>
                <button type="button" class="btn-wishlist-browse" id="btn-wishlist-browse">Explore Valley Harvest</button>
              </div>
            ` : `
              <div class="wishlist-items-list">
                ${items.map(item => `
                  <div class="wishlist-item-row" data-pid="${item.id}">
                    <div class="wishlist-item-thumb" title="Click to view full product details">
                      <img src="${item.image}" alt="${item.name}" loading="lazy"/>
                    </div>
                    <div class="wishlist-item-details">
                      <h4 class="wishlist-item-title" title="Click to view full product details">${item.name}</h4>
                      <p class="wishlist-item-sub">${item.subname || item.origin || '100% Valley Harvest'}</p>
                      <div class="wishlist-item-pricing">
                        <span class="wishlist-price">₹${item.price.toLocaleString('en-IN')}</span>
                        ${item.originalPrice ? `<span class="wishlist-orig-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                        <span class="wishlist-pack-badge">${item.weight || '500g'}</span>
                      </div>
                    </div>
                    <div class="wishlist-item-actions">
                      <button type="button" class="btn-wishlist-move-cart" data-pid="${item.id}" title="Add to Cart">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <span>Add to Cart</span>
                      </button>
                      <button type="button" class="btn-wishlist-remove" data-pid="${item.id}" title="Remove from wishlist">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          ${count > 0 ? `
            <div class="wishlist-modal-footer">
              <button type="button" class="btn-wishlist-add-all" id="btn-wishlist-add-all">
                <span>Move All to Cart</span>
              </button>
              <button type="button" class="btn-wishlist-clear-all" id="btn-wishlist-clear-all">
                <span>Clear All</span>
              </button>
            </div>
          ` : ''}
        </div>
      `;

      // Bind Close
      modal.querySelector('#btn-close-wishlist')?.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
      });

      // Bind Browse
      modal.querySelector('#btn-wishlist-browse')?.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      });

      // Bind Thumb / Title click to open Quick View
      modal.querySelectorAll('.wishlist-item-thumb, .wishlist-item-title').forEach(el => {
        el.addEventListener('click', () => {
          const row = el.closest('.wishlist-item-row');
          const pid = row?.dataset.pid;
          const prod = dbStore.getProducts().find(p => p.id === pid) || PRODUCTS.find(p => p.id === pid);
          if (prod) {
            modal.classList.add('hidden');
            this.openQuickViewModal(prod);
          }
        });
      });

      // Bind Move to Cart
      modal.querySelectorAll('.btn-wishlist-move-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = btn.dataset.pid;
          const prod = dbStore.getProducts().find(p => p.id === pid) || PRODUCTS.find(p => p.id === pid);
          if (prod) {
            const weightObj = this.selectedProductWeights[pid] || prod.weights[0];
            cartStore.addItem(prod, weightObj, 1);
            kashmirAudio.playSantoorNote(523.25);
            this.showToast(`Added ${prod.name} (${weightObj.weight}) to cart`);
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            this.openCartDrawer();
          }
        });
      });

      // Bind Remove
      modal.querySelectorAll('.btn-wishlist-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = btn.dataset.pid;
          cartStore.removeFromWishlist(pid);
          this.showToast("Item removed from wishlist");
          this.updateWishlistCount();
          this.renderProducts();
          renderWishlistContent();
        });
      });

      // Bind Add All to Cart
      modal.querySelector('#btn-wishlist-add-all')?.addEventListener('click', () => {
        items.forEach(item => {
          const prod = dbStore.getProducts().find(p => p.id === item.id) || PRODUCTS.find(p => p.id === item.id);
          if (prod) {
            const weightObj = this.selectedProductWeights[prod.id] || prod.weights[0];
            cartStore.addItem(prod, weightObj, 1);
          }
        });
        kashmirAudio.playSantoorNote(659.25);
        this.showToast(`Added ${items.length} wishlist items to cart`);
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        this.openCartDrawer();
      });

      // Bind Clear All
      modal.querySelector('#btn-wishlist-clear-all')?.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your saved wishlist?")) {
          cartStore.clearWishlist();
          this.showToast("Wishlist cleared");
          this.updateWishlistCount();
          this.renderProducts();
          renderWishlistContent();
        }
      });
    };

    renderWishlistContent();
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Close on backdrop click
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    };
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

  preventRecurringBanners() {
    const purgeBanners = () => {
      document.querySelectorAll('#live-sales-toast, .live-sales-toast, [class*="live-sales"], .recent-sales-toast, .purchase-toast').forEach(el => {
        el.remove();
      });
    };

    purgeBanners();

    if (typeof MutationObserver !== 'undefined' && document.body) {
      const bannerObserver = new MutationObserver(() => {
        purgeBanners();
      });
      bannerObserver.observe(document.body, { childList: true, subtree: true });
    }
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
  window.orderTrackingManager = orderTrackingManager;
  window.razorpayManager = razorpayManager;
  window.kashmirAudio = kashmirAudio;
  window.dbStore = dbStore;
});
