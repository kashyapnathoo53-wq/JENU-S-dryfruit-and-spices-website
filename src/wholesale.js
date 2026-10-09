// JENU'S Kashmir Valley - Wholesale & Bulk Procurement Manager
// Direct orchard-to-business bulk procurement at shorter wholesale prices
// Instant "Blink Us" notification system with WhatsApp connect & Admin Portal synchronization

import { kashmirAudio } from './audio.js';
import { api } from './api.js';

export class WholesaleManager {
  constructor() {
    this.modalEl = null;
    this.initDOM();
    this.seedSampleInquiryIfEmpty();
  }

  seedSampleInquiryIfEmpty() {
    try {
      const stored = localStorage.getItem('jenus_wholesale_inquiries');
      if (!stored || JSON.parse(stored).length === 0) {
        const sampleInquiries = [
          {
            refId: 'JNU-BLK-94821',
            date: 'Today, 03:15 PM',
            name: 'Sunil Aggarwal',
            phone: '9811223344',
            business: 'Aggarwal Sweets & Dry Fruit House',
            city: 'New Delhi (NCR)',
            branch: 'Delhi (Khari Baoli Market)',
            product: 'Kashmiri Mamra Almonds (Grade-1 Organic)',
            quantity: '150 kg',
            targetPrice: '₹1,850 / kg',
            notes: 'Requires 10kg nitrogen-sealed airtight canister packing for Diwali corporate suites.',
            status: 'New Blink ⚡',
            isRead: false
          },
          {
            refId: 'JNU-BLK-91204',
            date: 'Yesterday, 11:40 AM',
            name: 'Pooja Mehta',
            phone: '9820011223',
            business: 'Royal Heritage Caterers & Confectionery',
            city: 'Mumbai',
            branch: 'Mumbai (APMC Vashi Hub)',
            product: 'Pure Pampore Mogra Saffron (Grade-1 A++)',
            quantity: '250 grams (250 x 1g airtight jars)',
            targetPrice: '₹220 / gram',
            notes: 'Need NABL laboratory purity certificate for 5-star hotel banquet dessert menu.',
            status: 'Quoted 📋',
            isRead: true
          }
        ];
        localStorage.setItem('jenus_wholesale_inquiries', JSON.stringify(sampleInquiries));
      }
    } catch (e) {
      console.warn('Error seeding sample wholesale inquiries:', e);
    }
  }

  getInquiries() {
    try {
      const stored = localStorage.getItem('jenus_wholesale_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveInquiry(inquiryData) {
    try {
      const list = this.getInquiries();
      const refId = `JNU-BLK-${Math.floor(10000 + Math.random() * 90000)}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = `Today, ${timeStr}`;

      const newRecord = {
        refId: refId,
        date: dateStr,
        ...inquiryData,
        status: 'New Blink ⚡',
        isRead: false,
        timestamp: Date.now()
      };

      list.unshift(newRecord);
      localStorage.setItem('jenus_wholesale_inquiries', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('wholesale-inquiry-created', { detail: newRecord }));

      // Persist to backend database
      api.submitWholesaleInquiry({
        name: inquiryData.name,
        phone: inquiryData.phone,
        email: inquiryData.email,
        businessName: inquiryData.business,
        city: inquiryData.city,
        productInterest: inquiryData.product,
        estimatedQuantity: inquiryData.quantity,
        targetPrice: inquiryData.targetPrice,
        packaging: inquiryData.packaging,
        preferredHub: inquiryData.branch,
        notes: inquiryData.notes
      }).catch(err => {
        console.warn('Backend wholesale submission warning:', err.message);
      });

      return newRecord;
    } catch (e) {
      console.warn('Error saving wholesale inquiry:', e);
      return null;
    }
  }

  updateInquiryStatus(refId, newStatus) {
    try {
      const list = this.getInquiries();
      const item = list.find(i => i.refId === refId);
      if (item) {
        item.status = newStatus;
        item.isRead = true;
        localStorage.setItem('jenus_wholesale_inquiries', JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('wholesale-inquiry-updated', { detail: item }));

        // Sync to backend if admin token available
        api.updateWholesaleStatus(refId, newStatus).catch(err => {
          console.warn('Backend wholesale update status warning:', err.message);
        });
      }
    } catch (e) {}
  }

  markAllAsRead() {
    try {
      const list = this.getInquiries();
      list.forEach(i => i.isRead = true);
      localStorage.setItem('jenus_wholesale_inquiries', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('wholesale-inquiry-updated'));
    } catch (e) {}
  }

  getUnreadCount() {
    const list = this.getInquiries();
    return list.filter(i => !i.isRead).length;
  }

  initDOM() {
    if (document.getElementById('wholesale-bulk-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'wholesale-bulk-modal';
    modal.className = 'kashmir-modal-overlay hidden';
    document.body.appendChild(modal);
    this.modalEl = modal;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
  }

  openModal(prefill = {}) {
    if (!this.modalEl) this.initDOM();

    const productName = prefill.name || 'All Premium Kashmiri Produce';

    this.modalEl.innerHTML = `
      <div class="wholesale-modal-container animate-scale-up">
        
        <!-- Modal Header -->
        <div class="wholesale-modal-header">
          <div class="w-header-left">
            <div class="w-icon-badge">📦</div>
            <div>
              <h3>Wholesale & Bulk Procurement Suite</h3>
              <p>Direct Orchard Sourcing at Shorter Wholesale Prices • Instant Blink Alert</p>
            </div>
          </div>
          <button type="button" class="modal-close-x" id="btn-close-wholesale">&times;</button>
        </div>

        <div class="wholesale-modal-body" id="wholesale-modal-content">
          
          <!-- Blink Notice Banner -->
          <div class="w-blink-banner">
            <div class="w-blink-pulse-ring">
              <span class="w-blink-dot"></span>
            </div>
            <div class="w-banner-text">
              <strong>⚡ Instant Wholesale Blink Desk Active:</strong>
              <p>Submit your requirements below to instantly alert our commercial desks across <strong>Delhi (Khari Baoli), Srinagar, Jammu, and Mumbai</strong>. Direct Call Helplines: <a href="tel:85955119239" style="color: #1D1D1F; font-weight: 700; text-decoration: underline;">85955119239</a> | <a href="tel:9868983010" style="color: #1D1D1F; font-weight: 700; text-decoration: underline;">9868983010</a> • Email: <a href="mailto:SriRadheEnterpriseswork@gmail.com" style="color: #1D1D1F; font-weight: 700; text-decoration: underline;">SriRadheEnterpriseswork@gmail.com</a>. We reply within 15 minutes with our shortest wholesale bulk price sheet.</p>
            </div>
          </div>

          <!-- Wholesale Inquiry Form -->
          <form id="wholesale-inquiry-form" class="wholesale-inquiry-form">
            
            <div class="w-form-grid">
              
              <!-- 1. Contact Person -->
              <div class="w-field">
                <label>Contact Person / Purchaser Name *</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">👤</span>
                  <input type="text" id="w-client-name" required placeholder="e.g. Vikram Malhotra / Rajesh Singhania" value="" />
                </div>
              </div>

              <!-- 2. WhatsApp / Phone -->
              <div class="w-field">
                <label>Mobile / WhatsApp Number (For Instant Price Alert) *</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">📱</span>
                  <input type="tel" id="w-client-phone" required placeholder="Enter 10-digit mobile number" maxlength="10" />
                </div>
              </div>

              <!-- 3. Business Name -->
              <div class="w-field">
                <label>Business / Firm / Institutional Name (Optional)</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">🏢</span>
                  <input type="text" id="w-client-business" placeholder="e.g. Malhotra Confectioners / Royal Caterers / Individual" />
                </div>
              </div>

              <!-- 4. Preferred Branch -->
              <div class="w-field">
                <label>Preferred Fulfillment Hub / Branch *</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">📍</span>
                  <select id="w-client-branch" required>
                    <option value="Delhi (Khari Baoli Market - Kashyap Nathoo)">🏛️ Delhi Branch (Khari Baoli Market, Chandni Chowk)</option>
                    <option value="Srinagar Valley Flagship Hub (Cherry Garden, Gogji Bagh)">🌸 Srinagar Flagship Center (Cherry Garden, Gogji Bagh)</option>
                    <option value="Jammu Regional Hub (Residency Road / Raghunath Bazaar)">🏔️ Jammu Regional Hub (Residency Road / Raghunath Bazaar)</option>
                    <option value="Mumbai Metropolitan Hub (APMC Market Complex)">🌊 Mumbai Metropolitan Hub (APMC Complex & Crawford Market)</option>
                    <option value="Direct Express Air/Surface Freight to My City">✈️ Direct Express Freight to My Destination</option>
                  </select>
                </div>
              </div>

              <!-- 5. Product Category -->
              <div class="w-field">
                <label>Selected Product for Bulk Allocation *</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">🌰</span>
                  <select id="w-client-product" required>
                    <option value="${productName}" selected>${productName}</option>
                    <option value="Kashmiri Mamra Almonds (Grade-1)">Kashmiri Mamra Almonds (Grade-1 Organic)</option>
                    <option value="Kashmiri Kagzi Snow Walnuts (Kernels & In-Shell)">Kagzi Snow Walnuts (Kernels & In-Shell)</option>
                    <option value="Pampore Pure Mogra Saffron (Grade-1 A++)">Pampore Pure Mogra Saffron (Grade-1 A++)</option>
                    <option value="Authentic Kashmiri Lal Mirch & Shahi Jeera Spices">Authentic Kashmiri Spices (Lal Mirch, Shahi Jeera, Wazwan Ver)</option>
                    <option value="Shahi Traditional Kashmiri Kahwa Tea">Traditional Kashmiri Kahwa Tea Blend</option>
                    <option value="Sun-Dried Organic Figs & Apricots">Sun-Dried Organic Figs & Apricots</option>
                    <option value="Himalayan Roasted Wild Chilgoza (Pine Nuts)">Himalayan Roasted Chilgoza (Pine Nuts)</option>
                    <option value="Curated Luxury Gift Hampers (Bulk Corporate)">Curated Luxury Gift Hampers (Corporate Suites)</option>
                    <option value="Multi-Product Commercial Assortment">Multi-Product Commercial Assortment</option>
                  </select>
                </div>
              </div>

              <!-- 6. Required Quantity -->
              <div class="w-field">
                <label>Required Bulk Quantity (Kilograms / Volume) *</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">⚖️</span>
                  <select id="w-client-qty" required>
                    <option value="10 kg to 25 kg (Trial / Boutique Commercial)">10 kg – 25 kg (Trial / Boutique Commercial)</option>
                    <option value="25 kg to 50 kg (Standard Store Allocation)" selected>25 kg – 50 kg (Standard Store Allocation)</option>
                    <option value="50 kg to 100 kg (Wholesale Tier 1)">50 kg – 100 kg (Wholesale Tier 1)</option>
                    <option value="100 kg to 250 kg (Wholesale Tier 2)">100 kg – 250 kg (Wholesale Tier 2)</option>
                    <option value="250 kg to 500 kg (Distributor Volume)">250 kg – 500 kg (Distributor Volume)</option>
                    <option value="500 kg to 1 Ton (Institutional / Industrial)">500 kg – 1 Ton (Institutional / Industrial)</option>
                    <option value="1 Ton+ (Full Trailer / Semi-Trailer Allocation)">1 Ton+ (Full Trailer / Semi-Trailer Allocation)</option>
                  </select>
                </div>
              </div>

              <!-- 7. Target Shorter Price -->
              <div class="w-field">
                <label>Target Shorter Price / Expected Rate (₹ per kg or Total Budget)</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">💰</span>
                  <input type="text" id="w-client-price" placeholder="e.g. Targeting ₹1,800/kg or Seeking 25-30% Wholesale Discount" />
                </div>
              </div>

              <!-- 8. Packaging Preference -->
              <div class="w-field">
                <label>Bulk Packaging Specification Preference</label>
                <div class="w-input-wrap">
                  <span class="w-input-icon">🎁</span>
                  <select id="w-client-packaging">
                    <option value="10kg Nitrogen-Flushed Vacuum Sealed Metal Tins">10kg Nitrogen-Flushed Vacuum Sealed Metal Tins (Maximum Shelf Life)</option>
                    <option value="25kg High-Barrier Jute Sacks with Inner Poly Liner">25kg High-Barrier Jute Sacks with Poly Liner</option>
                    <option value="500g / 1kg Consumer Ready Sealed Pouches with JENU'S Branding">500g / 1kg Consumer Retail Pouches with JENU'S Branding</option>
                    <option value="Neutral White-Label / Foodservice Unlabeled Bulk Packing">Neutral White-Label / Unbranded Foodservice Bulk Packing</option>
                  </select>
                </div>
              </div>

            </div>

            <!-- Notes field -->
            <div class="w-field full-width" style="margin-top: 10px;">
              <label>Special Instructions / Recurring Order Frequency (Optional)</label>
              <textarea id="w-client-notes" rows="2" placeholder="Mention any specific quality parameters, moisture preferences, monthly recurring schedule, or delivery timeline..."></textarea>
            </div>

            <!-- Wholesale Assurance Badges -->
            <div class="w-assurances-row">
              <span>🌿 Direct Orchard Sourcing</span>
              <span>🔬 NABL Lab Certified Purity</span>
              <span>📜 FSSAI Licensed (10026061000412)</span>
              <span>⚡ Shortest Wholesale Rates Guaranteed</span>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-submit-wholesale-blink" id="btn-submit-w-blink">
              <span class="w-blink-lightning">⚡</span>
              <span>Blink JENU'S Wholesale Desk (Send Instant Inquiry)</span>
              <span class="w-btn-sub">15-Min Response ➔</span>
            </button>
          </form>

        </div>

      </div>
    `;

    this.modalEl.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Close button
    document.getElementById('btn-close-wholesale')?.addEventListener('click', () => {
      this.closeModal();
    });

    // Form submission
    const form = document.getElementById('wholesale-inquiry-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  handleFormSubmit() {
    const name = document.getElementById('w-client-name')?.value.trim();
    const phone = document.getElementById('w-client-phone')?.value.trim();
    const business = document.getElementById('w-client-business')?.value.trim() || 'Direct Gourmet Buyer';
    const branch = document.getElementById('w-client-branch')?.value;
    const product = document.getElementById('w-client-product')?.value;
    const quantity = document.getElementById('w-client-qty')?.value;
    const targetPrice = document.getElementById('w-client-price')?.value.trim() || 'Requested Shortest Wholesale Price';
    const packaging = document.getElementById('w-client-packaging')?.value;
    const notes = document.getElementById('w-client-notes')?.value.trim();

    if (!name || !phone || phone.length < 10) {
      alert("Please enter your name and a valid 10-digit mobile number so our wholesale manager can contact you.");
      return;
    }

    const inquiryRecord = this.saveInquiry({
      name,
      phone,
      business,
      branch,
      product,
      quantity,
      targetPrice,
      packaging,
      notes
    });

    kashmirAudio.playCelebrationChime();
    this.renderSuccessView(inquiryRecord);
  }

  renderSuccessView(record) {
    const container = document.getElementById('wholesale-modal-content');
    if (!container) return;

    const whatsappMsg = encodeURIComponent(
      `Hello JENU'S Kashmir Gourmet! I just blinked your Wholesale Desk for bulk procurement.\n\n` +
      `*Reference:* ${record.refId}\n` +
      `*Purchaser:* ${record.name} (${record.business})\n` +
      `*Product:* ${record.product}\n` +
      `*Quantity:* ${record.quantity}\n` +
      `*Target Rate:* ${record.targetPrice}\n` +
      `*Preferred Hub:* ${record.branch}\n\n` +
      `Please share your official wholesale price sheet and delivery schedule.`
    );

    const whatsappUrl = `https://wa.me/919868983010?text=${whatsappMsg}`;

    container.innerHTML = `
      <div class="wholesale-success-view animate-scale-up">
        
        <div class="w-success-glow-crest">
          <div class="w-pulse-beacon">⚡</div>
          <span class="w-success-pill">✓ BLINK NOTIFICATION BROADCASTED</span>
        </div>

        <h3>Wholesale Bulk Inquiry Alert Active!</h3>
        <p class="w-success-lead">Thank you, <strong>${record.name}</strong>. Our commercial wholesale managers have received your blink notification.</p>

        <!-- Ticket Card -->
        <div class="w-ticket-card">
          <div class="w-ticket-top">
            <div>
              <span class="w-ticket-label">Wholesale Inquiry Ref:</span>
              <strong class="w-ticket-code">${record.refId}</strong>
            </div>
            <div style="text-align: right;">
              <span class="w-ticket-label">Priority:</span>
              <span class="w-ticket-priority">⚡ Immediate Commercial Desk</span>
            </div>
          </div>

          <div class="w-ticket-grid">
            <div class="w-t-item">
              <span>Allocated Product:</span>
              <strong>${record.product}</strong>
            </div>
            <div class="w-t-item">
              <span>Bulk Quantity:</span>
              <strong>${record.quantity}</strong>
            </div>
            <div class="w-t-item">
              <span>Target / Expected Price:</span>
              <strong>${record.targetPrice}</strong>
            </div>
            <div class="w-t-item">
              <span>Fulfillment Hub:</span>
              <strong>${record.branch.split('(')[0]}</strong>
            </div>
            <div class="w-t-item">
              <span>Client Mobile / WhatsApp:</span>
              <strong>+91 ${record.phone}</strong>
            </div>
            <div class="w-t-item">
              <span>Packaging Style:</span>
              <strong>${record.packaging.split('(')[0]}</strong>
            </div>
          </div>
        </div>

        <!-- Next steps -->
        <div class="w-next-steps-box">
          <div class="w-step-item">
            <span class="w-step-num">1</span>
            <span>Our nearest branch desk (Delhi, Srinagar, Jammu, or Mumbai) is reviewing stock allocations.</span>
          </div>
          <div class="w-step-item">
            <span class="w-step-num">2</span>
            <span>You will receive an official wholesale pricing quotation via WhatsApp & Call within <strong>15 minutes</strong>.</span>
          </div>
        </div>

        <!-- Direct Actions -->
        <div class="w-success-actions">
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-w-whatsapp-instant">
            <span>💬 Chat on WhatsApp with Wholesale Desk Now (9868983010)</span>
          </a>
          <div class="w-direct-call-row" style="display: flex; gap: 10px; margin: 10px 0; width: 100%; flex-wrap: wrap;">
            <a href="tel:85955119239" class="btn-w-phone-call" style="flex: 1; background: #1D1D1F; color: #FFFFFF; border: none; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13.5px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>📞 Call 85955119239</span>
            </a>
            <a href="tel:9868983010" class="btn-w-phone-call" style="flex: 1; background: #1D1D1F; color: #FFFFFF; border: none; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13.5px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>📞 Call 9868983010</span>
            </a>
            <a href="mailto:SriRadheEnterpriseswork@gmail.com" class="btn-w-phone-call" style="width: 100%; background: #F8FAFC; color: #1D1D1F; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>✉️ SriRadheEnterpriseswork@gmail.com</span>
            </a>
          </div>
          <button type="button" class="btn-w-done" id="btn-close-w-success">
            <span>Done & Return to Storefront</span>
          </button>
        </div>

      </div>
    `;

    document.getElementById('btn-close-w-success')?.addEventListener('click', () => {
      this.closeModal();
    });
  }

  closeModal() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }
}

export const wholesaleManager = new WholesaleManager();
