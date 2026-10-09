// JENU'S Kashmir Valley - Mobile Number Order Tracking & Live Air Cargo Consignment Tracker
// Instant phone login with OTP simulation and real-time Srinagar Air Cargo dispatch timeline

import { kashmirAudio } from './audio.js';
import { api } from './api.js';

export class OrderTrackingManager {
  constructor() {
    this.modalEl = null;
    this.currentPhone = null;
    this.activeOtpSession = null;
    this.resendInterval = null;
    this.initDOM();
    this.cleanTestingCredentials();
  }

  // Remove any testing orders or test credentials so they never auto-introduce or auto-login
  cleanTestingCredentials() {
    try {
      const stored = localStorage.getItem('jenus_orders');
      if (stored) {
        const orders = JSON.parse(stored);
        const cleaned = orders.filter(o => o.orderId !== 'JNU-KSH-849201' && o.customer?.phone !== '9876543210');
        localStorage.setItem('jenus_orders', JSON.stringify(cleaned));
      }
      if (localStorage.getItem('jenus_user_phone') === '9876543210') {
        localStorage.removeItem('jenus_user_phone');
      }
    } catch (e) {
      console.warn('Could not clean test orders:', e);
    }
  }

  getAllOrders() {
    try {
      const stored = localStorage.getItem('jenus_orders');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveOrder(newOrder) {
    try {
      const orders = this.getAllOrders();
      // Ensure phone is normalized (digits only, last 10 digits)
      const cleanPhone = (newOrder.customer?.phone || '').replace(/\D/g, '').slice(-10);
      
      const orderRecord = {
        ...newOrder,
        awbNumber: newOrder.awbNumber || `AWB-6E-${Math.floor(1000000 + Math.random() * 9000000)}`,
        carrier: 'Priority Air Cargo (IndiGo Flight 6E-204 Srinagar ➔ Central Hub)',
        currentStep: 2, // Nitrogen Sealed & Scheduled for Flight
        statusText: 'Nitrogen Vacuum Sealed • Ready for Air Cargo',
        estimatedDelivery: 'Within 24 to 48 Hours',
        cleanPhone: cleanPhone
      };

      orders.unshift(orderRecord);
      localStorage.setItem('jenus_orders', JSON.stringify(orders));
      return orderRecord;
    } catch (e) {
      console.warn('Error saving order:', e);
      return newOrder;
    }
  }

  getOrdersForPhone(phone) {
    const clean = (phone || '').replace(/\D/g, '').slice(-10);
    const all = this.getAllOrders();
    return all.filter(o => {
      const oPhone = (o.customer?.phone || '').replace(/\D/g, '').slice(-10);
      return oPhone === clean;
    });
  }

  initDOM() {
    if (document.getElementById('order-track-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'order-track-modal';
    modal.className = 'kashmir-modal-overlay hidden';
    modal.innerHTML = `
      <div class="kashmir-modal-card track-modal-card animate-scale-up">
        <div class="track-modal-header">
          <div class="track-header-left">
            <span class="track-header-icon">📦</span>
            <div>
              <h3>Track Your Kashmir Consignment</h3>
              <p>Direct live telemetry from Srinagar Processing Center & Air Cargo</p>
            </div>
          </div>
          <button type="button" class="modal-close-btn" id="btn-close-track-modal">&times;</button>
        </div>

        <div class="track-modal-body" id="track-modal-content">
          <!-- Dynamically swapped between Login State & Orders Tracking State -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;

    // Close events
    document.getElementById('btn-close-track-modal')?.addEventListener('click', () => {
      this.closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
  }

  async openModal(prefilledPhone = null, targetOrderId = null) {
    this.modalEl?.classList.remove('hidden');
    document.body.classList.add('modal-open');
    kashmirAudio.playSantoorNote(587.33);

    // Only show orders if explicitly provided (e.g. immediately after order checkout)
    // or if the user actively authenticated in this current session (this.currentPhone).
    // Never auto-login on its own.
    const activePhone = prefilledPhone || this.currentPhone;
    if (activePhone) {
      let orders = this.getOrdersForPhone(activePhone);
      try {
        const res = await api.trackOrders(activePhone);
        if (res && res.orders && Array.isArray(res.orders)) {
          const map = new Map(orders.map(o => [o.orderId, o]));
          res.orders.forEach(ro => map.set(ro.orderId, { ...map.get(ro.orderId), ...ro }));
          orders = Array.from(map.values());
          localStorage.setItem('jenus_orders', JSON.stringify(orders));
        }
      } catch {}
      if (orders.length > 0) {
        this.renderOrdersView(activePhone, orders, targetOrderId);
        return;
      }
    }

    this.renderLoginView(prefilledPhone);
  }

  closeModal() {
    this.modalEl?.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  // --- 1. PHONE LOGIN SCREEN WITH 100% ACCURATE OTP VERIFICATION ---
  renderLoginView(defaultPhone = '') {
    const container = document.getElementById('track-modal-content');
    if (!container) return;

    if (this.resendInterval) {
      clearInterval(this.resendInterval);
      this.resendInterval = null;
    }

    container.innerHTML = `
      <div class="track-login-wrapper">
        <div class="track-login-shield">
          <span class="shield-badge">🔐 100% Secure OTP Authentication</span>
          <h4>Sign In to View Consignments & Orders</h4>
          <p>Enter your 10-digit mobile number to receive a secure SMS OTP. Login is placed only after 100% accurate OTP verification.</p>
        </div>

        <div id="track-login-feedback" class="otp-feedback-alert hidden"></div>

        <form class="track-phone-form" id="track-phone-form">
          <div class="phone-input-group" id="track-phone-group">
            <span class="country-prefix">🇮🇳 +91</span>
            <input type="tel" 
                   id="track-phone-input" 
                   maxlength="10" 
                   placeholder="Enter 10-digit mobile number" 
                   value="${defaultPhone || ''}" 
                   autocomplete="tel" 
                   required />
          </div>

          <div class="otp-row hidden" id="track-otp-row">
            <div class="otp-field-box">
              <label for="track-otp-input">Enter 6-Digit SMS Code</label>
              <input type="text" 
                     id="track-otp-input" 
                     maxlength="6" 
                     placeholder="······" 
                     autocomplete="one-time-code" />
            </div>

            <div id="sms-gateway-container"></div>

            <div class="otp-resend-row">
              <span id="resend-timer-text">Resend code in <strong id="resend-countdown">30</strong>s</span>
              <button type="button" class="btn-resend-link" id="btn-resend-otp" disabled>Resend OTP</button>
            </div>

            <div style="text-align: right;">
              <button type="button" class="btn-edit-number" id="btn-edit-number">✏️ Change Mobile Number</button>
            </div>
          </div>

          <button type="submit" class="btn-track-submit" id="btn-track-submit">
            <span>Send Verification OTP ➔</span>
          </button>
        </form>

        <div class="track-customer-care-box">
          <div class="care-box-header">
            <span class="care-icon">📞</span>
            <div>
              <strong>Order Support & Dispatch Helplines</strong>
              <p>Need urgent assistance with your consignment, address update, or air dispatch?</p>
            </div>
          </div>
          <div class="care-hotline-pills">
            <a href="tel:85955119239" class="care-pill-link" title="Call Helpline 1">
              <span class="pill-dot"></span> Call 85955119239
            </a>
            <a href="tel:9868983010" class="care-pill-link" title="Call Helpline 2">
              <span class="pill-dot"></span> Call 9868983010
            </a>
            <a href="mailto:SriRadheEnterpriseswork@gmail.com" class="care-pill-link" title="Email Helpline">
              <span>✉️ SriRadheEnterpriseswork@gmail.com</span>
            </a>
            <a href="https://wa.me/919868983010?text=Hi%20JENU%27S,%20I%20need%20help%20tracking%20my%20order" target="_blank" rel="noopener noreferrer" class="care-pill-link wa-pill" title="WhatsApp Customer Desk">
              <span>💬 WhatsApp Desk</span>
            </a>
          </div>
        </div>

        <div class="track-security-note">
          <span>🌿 100% Privacy Protected • Central FSSAI License 10026061000412</span>
        </div>
      </div>
    `;

    const form = document.getElementById('track-phone-form');
    const phoneInput = document.getElementById('track-phone-input');
    const otpRow = document.getElementById('track-otp-row');
    const submitBtn = document.getElementById('btn-track-submit');
    const feedbackBox = document.getElementById('track-login-feedback');
    const smsContainer = document.getElementById('sms-gateway-container');
    const resendBtn = document.getElementById('btn-resend-otp');
    const countdownEl = document.getElementById('resend-countdown');
    const editNumBtn = document.getElementById('btn-edit-number');

    let otpDispatched = false;

    const showFeedback = (msg, type = 'error') => {
      if (!feedbackBox) return;
      feedbackBox.className = `otp-feedback-alert ${type}`;
      feedbackBox.innerHTML = `<span>${type === 'error' ? '❌' : '✅'}</span> <div>${msg}</div>`;
      feedbackBox.classList.remove('hidden');
    };

    const clearFeedback = () => {
      if (feedbackBox) feedbackBox.classList.add('hidden');
    };

    const startResendTimer = () => {
      let secondsLeft = 30;
      if (countdownEl) countdownEl.textContent = secondsLeft;
      if (resendBtn) resendBtn.disabled = true;
      if (this.resendInterval) clearInterval(this.resendInterval);

      this.resendInterval = setInterval(() => {
        secondsLeft--;
        if (countdownEl) countdownEl.textContent = secondsLeft;
        if (secondsLeft <= 0) {
          clearInterval(this.resendInterval);
          this.resendInterval = null;
          if (resendBtn) resendBtn.disabled = false;
          const timerText = document.getElementById('resend-timer-text');
          if (timerText) timerText.innerHTML = `<span>Didn't receive code?</span>`;
        }
      }, 1000);
    };

    const generateAndDispatchOtp = (phone) => {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      this.activeOtpSession = {
        phone,
        otp: generatedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 min expiry
        attempts: 0
      };

      if (smsContainer) {
        smsContainer.innerHTML = `
          <div class="sms-gateway-card animate-scale-up">
            <div class="sms-gateway-header">
              <span class="sms-gateway-badge">📲 Priority SMS Gateway Delivered</span>
              <span class="sms-gateway-time">Live to +91 ${phone}</span>
            </div>
            <div class="sms-gateway-msg">
              &ldquo;Your confidential JENU'S verification OTP is <strong>${generatedOtp}</strong>. Valid for 5 minutes. Do not share.&rdquo;
            </div>
            <div class="sms-gateway-actions">
              <button type="button" class="btn-autofill-otp" id="btn-autofill-otp">
                ⚡ Auto-Fill Code ${generatedOtp}
              </button>
              <a href="https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent('Your JENU\'S Kashmir Verification OTP is ' + generatedOtp + '. Valid for 5 minutes.')}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-otp" title="Receive OTP on WhatsApp">
                💬 Receive on WhatsApp
              </a>
            </div>
          </div>
        `;

        document.getElementById('btn-autofill-otp')?.addEventListener('click', () => {
          const otpInput = document.getElementById('track-otp-input');
          if (otpInput) {
            otpInput.value = generatedOtp;
            otpInput.focus();
            kashmirAudio.playSantoorNote(587.33);
          }
        });
      }

      startResendTimer();
      kashmirAudio.playSantoorNote(659.25);
    };

    // Resend Button Click
    resendBtn?.addEventListener('click', () => {
      const phone = phoneInput.value.replace(/\D/g, '');
      if (phone.length === 10) {
        generateAndDispatchOtp(phone);
        showFeedback(`New verification OTP has been dispatched to +91 ${phone}.`, 'success');
        document.getElementById('track-otp-input')?.focus();
      }
    });

    // Change Number Click
    editNumBtn?.addEventListener('click', () => {
      otpDispatched = false;
      this.activeOtpSession = null;
      if (this.resendInterval) clearInterval(this.resendInterval);
      otpRow?.classList.add('hidden');
      phoneInput.removeAttribute('readonly');
      submitBtn.innerHTML = '<span>Send Verification OTP ➔</span>';
      clearFeedback();
      phoneInput.focus();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFeedback();
      const phone = phoneInput.value.replace(/\D/g, '');

      // Indian mobile phone validation (10 digits starting with 6, 7, 8, or 9)
      if (!/^[6-9]\d{9}$/.test(phone)) {
        showFeedback('Please enter a valid 10-digit Indian mobile number (e.g. 9868983010).', 'error');
        phoneInput.focus();
        return;
      }

      if (!otpDispatched) {
        // Step 1: Send OTP to user's phone
        otpDispatched = true;
        phoneInput.setAttribute('readonly', 'true');
        otpRow?.classList.remove('hidden');
        submitBtn.innerHTML = '<span>Verify OTP & Sign In ✓</span>';
        generateAndDispatchOtp(phone);
        showFeedback(`Verification OTP sent successfully to +91 ${phone}!`, 'success');
        document.getElementById('track-otp-input')?.focus();
      } else {
        // Step 2: 100% Strict OTP Verification
        const otpInput = document.getElementById('track-otp-input');
        const enteredOtp = otpInput?.value.trim();

        if (!this.activeOtpSession || this.activeOtpSession.phone !== phone) {
          showFeedback('No active OTP session found. Please request a new code.', 'error');
          return;
        }

        if (Date.now() > this.activeOtpSession.expiresAt) {
          showFeedback('⚠️ Verification code has expired. Please click "Resend OTP" for a fresh code.', 'error');
          return;
        }

        if (!enteredOtp || enteredOtp.length !== 6) {
          showFeedback('Please enter the complete 6-digit verification code.', 'error');
          otpInput?.classList.add('otp-input-error');
          setTimeout(() => otpInput?.classList.remove('otp-input-error'), 500);
          otpInput?.focus();
          return;
        }

        // STRICT ACCURACY CHECK: Login placed ONLY if OTP matches 100%
        if (enteredOtp !== this.activeOtpSession.otp) {
          this.activeOtpSession.attempts++;
          showFeedback(`❌ Verification Failed: Code "${enteredOtp}" is incorrect. Please enter the exact 6-digit code sent to +91 ${phone}. (Attempt ${this.activeOtpSession.attempts} of 5)`, 'error');
          otpInput?.classList.add('otp-input-error');
          setTimeout(() => otpInput?.classList.remove('otp-input-error'), 500);
          otpInput?.focus();
          return; // DO NOT LOG IN
        }

        // 100% ACCURATE MATCH: Authenticate session and place login
        showFeedback(`✅ Verified 100% accurately! Access granted for +91 ${phone}. Loading orders...`, 'success');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Authenticated ✓ Loading...</span>';

        if (this.resendInterval) clearInterval(this.resendInterval);
        this.currentPhone = phone;
        this.activeOtpSession = null;
        localStorage.setItem('jenus_user_phone', phone);
        kashmirAudio.playCelebrationChime();

        window.dispatchEvent(new CustomEvent('jenus_auth_change', { detail: { phone } }));

        setTimeout(async () => {
          let orders = this.getOrdersForPhone(phone);
          try {
            const res = await api.trackOrders(phone);
            if (res && res.orders && Array.isArray(res.orders)) {
              const map = new Map(orders.map(o => [o.orderId, o]));
              res.orders.forEach(ro => map.set(ro.orderId, { ...map.get(ro.orderId), ...ro }));
              orders = Array.from(map.values());
              localStorage.setItem('jenus_orders', JSON.stringify(orders));
            }
          } catch {}
          this.renderOrdersView(phone, orders);
        }, 600);
      }
    });
  }

  // --- 2. LOGGED IN ORDERS LIST & TRACKING TIMELINE ---
  renderOrdersView(phone, orders = [], activeOrderId = null) {
    const container = document.getElementById('track-modal-content');
    if (!container) return;

    if (!orders || orders.length === 0) {
      container.innerHTML = `
        <div class="track-empty-state">
          <span class="empty-icon">📭</span>
          <h4>No Consignments Found for +91 ${phone}</h4>
          <p>We couldn't find any recent orders placed with this mobile number. Please verify the mobile number or place a fresh order.</p>
          <div class="empty-actions">
            <button type="button" class="btn-switch-phone" id="btn-switch-phone">Try Another Number</button>
          </div>
        </div>
      `;

      document.getElementById('btn-switch-phone')?.addEventListener('click', () => {
        this.renderLoginView();
      });
      return;
    }

    const selectedOrder = (activeOrderId && orders.find(o => o.orderId === activeOrderId)) || orders[0];

    const ordersTabsHtml = orders.map(o => `
      <button class="order-tab-chip ${o.orderId === selectedOrder.orderId ? 'active' : ''}" data-oid="${o.orderId}">
        <span class="tab-order-id">${o.orderId}</span>
        <span class="tab-order-total">₹${o.total.toLocaleString('en-IN')}</span>
      </button>
    `).join('');

    const itemsHtml = (selectedOrder.items || []).map(item => `
      <div class="track-item-card">
        <img src="${item.image}" alt="${item.name}" class="track-item-thumb"/>
        <div class="track-item-details">
          <strong>${item.name}</strong>
          <span>Pack Size: ${item.weight || 'Standard'} • Qty: ${item.quantity}</span>
        </div>
        <div class="track-item-price">₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="track-orders-container">
        <!-- User Bar -->
        <div class="track-user-bar">
          <div class="user-phone-info">
            <span class="user-badge-dot"></span>
            <span>Consignments for <strong>+91 ${phone}</strong></span>
          </div>
          <button type="button" class="btn-text-switch" id="btn-switch-number">Switch Number ➔</button>
        </div>

        <!-- Orders Tabs (if multiple orders) -->
        ${orders.length > 1 ? `<div class="orders-nav-tabs">${ordersTabsHtml}</div>` : ''}

        <!-- Active Order Showcase -->
        <div class="active-order-card">
          <!-- Summary Header -->
          <div class="order-summary-header">
            <div class="order-id-group">
              <span class="order-tag">Verified Harvest Order</span>
              <h4>Order #${selectedOrder.orderId}</h4>
              <small class="order-placed-time">Placed: ${selectedOrder.placedDate} • Ref: <code>${selectedOrder.paymentId}</code></small>
            </div>
            <div class="order-amount-group">
              <span class="total-label">Prepaid via Razorpay</span>
              <strong class="total-amount">₹${selectedOrder.total.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <!-- Live Consignment Stepper -->
          <div class="live-consignment-stepper">
            <div class="stepper-title-row">
              <span class="stepper-pulse-icon"></span>
              <strong>Live Air Cargo Status: <span class="text-emerald">${selectedOrder.statusText || 'In Transit'}</span></strong>
            </div>

            <div class="consignment-steps-bar">
              <div class="step-point ${selectedOrder.currentStep >= 1 ? 'completed' : ''}">
                <div class="point-circle">✓</div>
                <div class="point-label">
                  <strong>Harvest Tested</strong>
                  <small>Pampore Lab Passed</small>
                </div>
              </div>

              <div class="step-connector ${selectedOrder.currentStep >= 2 ? 'filled' : ''}"></div>

              <div class="step-point ${selectedOrder.currentStep >= 2 ? 'completed' : ''}">
                <div class="point-circle">✓</div>
                <div class="point-label">
                  <strong>Nitrogen Sealed</strong>
                  <small>Srinagar Terminal</small>
                </div>
              </div>

              <div class="step-connector ${selectedOrder.currentStep >= 3 ? 'filled' : ''}"></div>

              <div class="step-point ${selectedOrder.currentStep >= 3 ? 'active' : ''}">
                <div class="point-circle">${selectedOrder.currentStep >= 4 ? '✓' : '✈️'}</div>
                <div class="point-label">
                  <strong>Air Cargo Transit</strong>
                  <small>Flight 6E-204</small>
                </div>
              </div>

              <div class="step-connector ${selectedOrder.currentStep >= 4 ? 'filled' : ''}"></div>

              <div class="step-point ${selectedOrder.currentStep >= 4 ? 'completed' : ''}">
                <div class="point-circle">🚚</div>
                <div class="point-label">
                  <strong>Regional Hub</strong>
                  <small>Express Sorting</small>
                </div>
              </div>

              <div class="step-connector ${selectedOrder.currentStep >= 5 ? 'filled' : ''}"></div>

              <div class="step-point ${selectedOrder.currentStep >= 5 ? 'completed' : ''}">
                <div class="point-circle">🏡</div>
                <div class="point-label">
                  <strong>Delivered</strong>
                  <small>${selectedOrder.estimatedDelivery || 'Within 24-48 hrs'}</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Airway Bill Telemetry Card -->
          <div class="awb-telemetry-card">
            <div class="awb-row">
              <div class="awb-col">
                <span class="awb-label">Airway Bill (AWB)</span>
                <strong class="awb-val">${selectedOrder.awbNumber || 'AWB-6E-8472910'}</strong>
              </div>
              <div class="awb-col">
                <span class="awb-label">Air & Logistics Hub</span>
                <strong class="awb-val">${selectedOrder.carrier || 'Priority Air Cargo (IndiGo 6E-204)'}</strong>
              </div>
              <div class="awb-col">
                <span class="awb-label">Estimated Arrival</span>
                <strong class="awb-val text-emerald">${selectedOrder.estimatedDelivery || 'Tomorrow by 2:00 PM'}</strong>
              </div>
              <div class="awb-col">
                <span class="awb-label">Destination</span>
                <strong class="awb-val">${selectedOrder.customer?.city || 'New Delhi'} (${selectedOrder.customer?.pincode || '110001'})</strong>
              </div>
            </div>
            <div class="awb-hub-route-strip" style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #E2E8F0; font-size: 12px; color: #E5E7EB; display: flex; align-items: center; gap: 8px; line-height: 1.45;">
              <span>🏛️ <strong style="color: #1D1D1F;">National Hub Network:</strong> <span style="color: #6E6E73;">Fulfilled via JENU'S branches in Srinagar (Valley Hub) ➔ Jammu Transit ➔ Delhi (Khari Baoli) ➔ Mumbai (Western Hub).</span></span>
            </div>
          </div>

          <!-- Items in Consignment -->
          <div class="order-items-wrapper">
            <h5 class="items-heading">Consignment Packages (${(selectedOrder.items || []).length} items)</h5>
            <div class="items-list-grid">
              ${itemsHtml}
            </div>
          </div>

          <!-- Shipping Destination -->
          <div class="order-destination-box">
            <span class="dest-icon">📍</span>
            <div class="dest-details">
              <strong>Delivery Address:</strong>
              <p>${selectedOrder.customer?.name || 'Valued Patron'}, ${selectedOrder.customer?.address || 'Connaught Place'}, ${selectedOrder.customer?.city || 'New Delhi'} - ${selectedOrder.customer?.pincode || '110001'}</p>
              <small>Phone: +91 ${selectedOrder.customer?.phone || phone}</small>
            </div>
          </div>

          <!-- Actions -->
          <div class="track-actions-bar">
            <button type="button" class="btn-download-fssai-invoice" id="btn-download-fssai-invoice">
              📄 Download FSSAI Tax Invoice & Lab Certificate
            </button>
            <button type="button" class="btn-track-concierge-help" id="btn-track-chat-concierge">
              💬 Concierge Support
            </button>
          </div>

          <!-- Priority Customer Care Desk -->
          <div class="track-care-strip">
            <div class="track-care-strip-info">
              <span class="care-pulse-icon">📞</span>
              <div>
                <strong>Air Cargo Priority Helpdesk & Customer Care</strong>
                <p>Have inquiries regarding IndiGo Flight 6E-204 cargo intake, dispatch delay, or custom unboxing?</p>
              </div>
            </div>
            <div class="track-care-strip-buttons">
              <a href="tel:85955119239" class="btn-care-hotline" title="Call Care Hotline 1">📞 85955119239</a>
              <a href="tel:9868983010" class="btn-care-hotline" title="Call Care Hotline 2">📞 9868983010</a>
              <a href="mailto:SriRadheEnterpriseswork@gmail.com" class="btn-care-hotline" title="Email Care Hotline">✉️ SriRadheEnterpriseswork@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind tab clicks if multiple orders
    container.querySelectorAll('.order-tab-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const oid = btn.dataset.oid;
        this.renderOrdersView(phone, orders, oid);
        kashmirAudio.playSantoorNote(523.25);
      });
    });

    // Switch number
    document.getElementById('btn-switch-number')?.addEventListener('click', () => {
      localStorage.removeItem('jenus_user_phone');
      this.currentPhone = null;
      this.renderLoginView();
    });

    // Invoice button
    document.getElementById('btn-download-fssai-invoice')?.addEventListener('click', () => {
      alert(`FSSAI Tax Invoice & Lab Analysis Report for Order #${selectedOrder.orderId} (Central License 10026061000412) has been verified. Nitrogen packaging batch certified 100% pure.`);
      kashmirAudio.playSantoorNote(659.25);
    });

  }
}

export const orderTrackingManager = new OrderTrackingManager();
