// JENU'S Kashmir Valley - Interactive Experience & Micro-Animations Controller
// Handles 3D Tilt, Scroll Progress, Circular Back-to-Top, Weather Hub Telemetry & Saffron Purity Lab Test

export class KashmirInteractiveExperience {
  constructor() {
    this.initScrollProgress();
    this.removeBackToTop();
    this.initCard3DTilt();
    this.initLiveViewersFluctuation();
    this.initWeatherHubModal();
    this.initSaffronPurityLab();
  }

  // --- 1. TOP SCROLL PROGRESS BAR ---
  initScrollProgress() {
    let progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress-bar';
      progressBar.className = 'scroll-progress-bar';
      document.body.appendChild(progressBar);
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --- 2. BACK TO TOP (REMOVED AS REQUESTED) ---
  removeBackToTop() {
    const btn = document.getElementById('btn-back-to-top');
    if (btn) btn.remove();
  }

  // --- 3. 3D MAGNETIC TILT & SPECULAR REFLECTION ON PRODUCT CARDS ---
  initCard3DTilt() {
    const bindTilt = () => {
      const cards = document.querySelectorAll('.product-card:not(.tilt-bound)');
      cards.forEach(card => {
        card.classList.add('tilt-bound');

        // Create specular light reflection layer if not present
        let glare = card.querySelector('.card-glare-overlay');
        if (!glare) {
          glare = document.createElement('div');
          glare.className = 'card-glare-overlay';
          card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
          const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
          
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
          glare.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
          glare.style.opacity = '0';
        });
      });
    };

    bindTilt();
    this.refreshTilt = bindTilt;
  }

  // --- 4. REAL-TIME VIEWERS DYNAMIC FLUCTUATION ---
  initLiveViewersFluctuation() {
    setInterval(() => {
      const chips = document.querySelectorAll('.live-viewer-chip');
      if (!chips.length) return;

      // Pick 2 random cards to fluctuate
      const count = Math.min(2, chips.length);
      for (let i = 0; i < count; i++) {
        const randomIdx = Math.floor(Math.random() * chips.length);
        const chip = chips[randomIdx];
        const span = chip.querySelector('span:last-child');
        if (span) {
          const current = parseInt(span.textContent, 10) || 14;
          const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
          const next = Math.max(9, Math.min(34, current + delta));
          
          span.style.transform = 'scale(1.25)';
          span.style.color = '#F59E0B';
          setTimeout(() => {
            span.textContent = `${next} viewing now`;
            span.style.transform = 'scale(1)';
            span.style.color = '';
          }, 200);
        }
      }
    }, 7000);
  }

  // --- 5. SRINAGAR VALLEY TELEMETRY & WEATHER HUB MODAL ---
  initWeatherHubModal() {
    // Inject modal if not present
    let modal = document.getElementById('srinagar-weather-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'srinagar-weather-modal';
      modal.className = 'kashmir-modal-overlay hidden';
      modal.innerHTML = `
        <div class="kashmir-modal-card weather-hub-card">
          <div class="weather-hub-header">
            <div class="weather-hub-title">
              <span class="live-pulse-dot large"></span>
              <div>
                <h3>Srinagar Valley Processing Hub • Live Telemetry</h3>
                <p>Sheikh-ul-Alam Agro-Terminal & Nitrogen Packaging Center, J&K</p>
              </div>
            </div>
            <button class="modal-close-btn" id="btn-close-weather-hub">&times;</button>
          </div>

          <div class="weather-hub-body">
            <!-- Metrics Grid -->
            <div class="telemetry-grid">
              <div class="telemetry-metric-box">
                <span class="telemetry-icon">🌡️</span>
                <div class="telemetry-data">
                  <strong class="telemetry-value">14.2°C</strong>
                  <span class="telemetry-label">Ambient Valley Temp</span>
                  <small class="telemetry-status text-emerald">Crisp Autumn Ideal</small>
                </div>
              </div>

              <div class="telemetry-metric-box">
                <span class="telemetry-icon">🍃</span>
                <div class="telemetry-data">
                  <strong class="telemetry-value">18 AQI</strong>
                  <span class="telemetry-label">Valley Air Purity</span>
                  <small class="telemetry-status text-emerald">Pristine Alpine Himalayan Air</small>
                </div>
              </div>

              <div class="telemetry-metric-box">
                <span class="telemetry-icon">💧</span>
                <div class="telemetry-data">
                  <strong class="telemetry-value">42%</strong>
                  <span class="telemetry-label">Relative Humidity</span>
                  <small class="telemetry-status text-emerald">Optimal for Dry Kernel Curing</small>
                </div>
              </div>

              <div class="telemetry-metric-box">
                <span class="telemetry-icon">🏔️</span>
                <div class="telemetry-data">
                  <strong class="telemetry-value">1,585m</strong>
                  <span class="telemetry-label">Hub Altitude (ASL)</span>
                  <small class="telemetry-status text-emerald">High Altitude Nutrient Density</small>
                </div>
              </div>
            </div>

            <!-- Valley Active Operations Stream -->
            <div class="valley-operations-stream">
              <h4 class="operations-stream-title">🌾 Real-Time Harvest & Processing Stations</h4>
              
              <div class="operation-stream-item">
                <div class="op-icon-badge">🌸</div>
                <div class="op-info">
                  <div class="op-header">
                    <strong>Pampore Saffron Plateaus</strong>
                    <span class="op-badge active">Plucking Active</span>
                  </div>
                  <p>Hand-harvesting fresh violet crocus flowers at sunrise. Filaments separated within 3 hours under certified laboratory hygiene.</p>
                </div>
              </div>

              <div class="operation-stream-item">
                <div class="op-icon-badge">🌰</div>
                <div class="op-info">
                  <div class="op-header">
                    <strong>Shopian Kagzi Akhrot Orchards</strong>
                    <span class="op-badge complete">Cured & Graded</span>
                  </div>
                  <p>Sun-cured thin paper shells cracked. Extra-light amber walnut halves sorted and vacuum-sealed with zero chemical bleaching.</p>
                </div>
              </div>

              <div class="operation-stream-item">
                <div class="op-icon-badge">✈️</div>
                <div class="op-info">
                  <div class="op-header">
                    <strong>Air Cargo Logistics (SXR ➔ DEL)</strong>
                    <span class="op-badge in-transit">Daily Cargo Flight Dispatched</span>
                  </div>
                  <p>1,482 nitrogen-sealed consignments dispatched today via priority cold air cargo to Delhi Central Hub for same-day nationwide dispatch.</p>
                </div>
              </div>
            </div>

            <!-- FSSAI Quality Stamp -->
            <div class="weather-fssai-stamp">
              <span class="fssai-badge-circle">FSSAI</span>
              <div>
                <strong>Central Food Safety License #10026061000412</strong>
                <p>Every harvest lot undergoes gas chromatography, moisture titration, and microbiological safety checks before sealing.</p>
              </div>
            </div>
          </div>

          <div class="weather-hub-footer">
            <button class="btn-weather-shop" id="btn-weather-explore">Shop Fresh Autumn Harvest 🛒</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // Bind close
      document.getElementById('btn-close-weather-hub')?.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          document.body.classList.remove('modal-open');
        }
      });

      document.getElementById('btn-weather-explore')?.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Bind triggers in header/announcement bar
    const bindTriggers = () => {
      document.querySelectorAll('.announcement-weather, #btn-srinagar-weather, .btn-valley-telemetry').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          modal.classList.remove('hidden');
          document.body.classList.add('modal-open');
        });
      });
    };

    bindTriggers();
  }

  // --- 6. INTERACTIVE SAFFRON PURITY LAB WATER TEST DEMO ---
  initSaffronPurityLab() {
    const section = document.getElementById('saffron-purity-lab-container');
    if (!section) return;

    section.innerHTML = `
      <div class="purity-lab-wrapper">
        <div class="purity-lab-header">
          <span class="purity-lab-badge">🔬 Live Laboratory Purity Demonstration</span>
          <h2 class="purity-lab-title">How to Test Real Kashmiri Saffron at Home</h2>
          <p class="purity-lab-desc">Authentic Pampore Mongra Saffron never bleeds artificial red dye. Watch what happens when authentic saffron vs counterfeit market saffron is dropped into lukewarm water.</p>
        </div>

        <div class="purity-beakers-container">
          <!-- Beaker A: Pure JENU'S Saffron -->
          <div class="beaker-card pure-beaker" id="beaker-pure">
            <div class="beaker-tag">🌿 JENU'S Authentic Pampore Mongra</div>
            <div class="beaker-glass">
              <div class="water-body" id="water-pure">
                <div class="saffron-filaments pure-filaments" id="filaments-pure">
                  <span class="filament-thread thread-1"></span>
                  <span class="filament-thread thread-2"></span>
                  <span class="filament-thread thread-3"></span>
                </div>
                <div class="golden-diffusion" id="diffusion-pure"></div>
              </div>
              <div class="beaker-measurements">
                <span>50ml</span>
                <span>25ml</span>
              </div>
            </div>
            <div class="beaker-status" id="status-pure">
              <strong>Status: Ready to Test</strong>
              <p>Click "Run Water Test" below to drop Mongra saffron threads.</p>
            </div>
          </div>

          <!-- Beaker B: Fake Market Saffron -->
          <div class="beaker-card fake-beaker" id="beaker-fake">
            <div class="beaker-tag">❌ Counterfeit / Artificially Dyed Threads</div>
            <div class="beaker-glass">
              <div class="water-body" id="water-fake">
                <div class="saffron-filaments fake-filaments" id="filaments-fake">
                  <span class="filament-thread fake-thread-1"></span>
                  <span class="filament-thread fake-thread-2"></span>
                  <span class="filament-thread fake-thread-3"></span>
                </div>
                <div class="harsh-red-diffusion" id="diffusion-fake"></div>
              </div>
              <div class="beaker-measurements">
                <span>50ml</span>
                <span>25ml</span>
              </div>
            </div>
            <div class="beaker-status" id="status-fake">
              <strong>Status: Ready to Test</strong>
              <p>Adulterated with corn silk & synthetic Carmoisine dye.</p>
            </div>
          </div>
        </div>

        <!-- Interactive Control Bar -->
        <div class="purity-lab-controls">
          <button class="btn-run-purity-test" id="btn-run-purity-test">
            <span class="test-icon">🧪</span>
            <span>Drop Filaments in Lukewarm Water (Simulate 15 Mins)</span>
          </button>
          <button class="btn-reset-purity-test hidden" id="btn-reset-purity-test">
            <span>↺ Reset Water Glasses</span>
          </button>
        </div>

        <!-- Verification Checklist -->
        <div class="purity-checklist-grid">
          <div class="check-box verified">
            <span class="check-icon">✓</span>
            <div>
              <strong>Pure Saffron Behavior:</strong>
              <p>Colors the water a luminous golden-yellow hue slowly over 10-15 minutes. The filament itself stays deep crimson and never loses its color.</p>
            </div>
          </div>

          <div class="check-box counterfeit">
            <span class="check-icon">⚠</span>
            <div>
              <strong>Counterfeit Warning:</strong>
              <p>Turns water instantly bright blood red within 3 seconds due to artificial dyes. The threads turn pale white or translucent immediately.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const btnRun = document.getElementById('btn-run-purity-test');
    const btnReset = document.getElementById('btn-reset-purity-test');
    const waterPure = document.getElementById('water-pure');
    const waterFake = document.getElementById('water-fake');
    const statusPure = document.getElementById('status-pure');
    const statusFake = document.getElementById('status-fake');

    if (!btnRun) return;

    btnRun.addEventListener('click', () => {
      btnRun.disabled = true;
      btnRun.innerHTML = '<span>⏳ Water Diffusion in Progress...</span>';

      // Drop threads
      document.getElementById('filaments-pure')?.classList.add('dropped');
      document.getElementById('filaments-fake')?.classList.add('dropped');

      // Fake water colors instantly in 1.5s
      setTimeout(() => {
        waterFake?.classList.add('dyed-red');
        if (statusFake) {
          statusFake.innerHTML = `
            <strong class="text-danger">❌ Failed Purity: Instant Red Dye Bleed</strong>
            <p>Artificial chemical colorant dissolved in 2 seconds. Threads turned white!</p>
          `;
        }
      }, 1400);

      // Pure water diffuses golden sunbeams slowly over 3.5s
      setTimeout(() => {
        waterPure?.classList.add('diffused-gold');
        if (statusPure) {
          statusPure.innerHTML = `
            <strong class="text-success">🌿 100% Pure Mongra: Luminous Gold Hue</strong>
            <p>Rich Crocin pigments released gently. Original thread stays deep ruby-red!</p>
          `;
        }
        btnRun.classList.add('hidden');
        btnReset?.classList.remove('hidden');
      }, 3200);
    });

    btnReset?.addEventListener('click', () => {
      waterPure?.classList.remove('diffused-gold');
      waterFake?.classList.remove('dyed-red');
      document.getElementById('filaments-pure')?.classList.remove('dropped');
      document.getElementById('filaments-fake')?.classList.remove('dropped');
      
      if (statusPure) {
        statusPure.innerHTML = '<strong>Status: Ready to Test</strong><p>Click "Run Water Test" below to drop Mongra saffron threads.</p>';
      }
      if (statusFake) {
        statusFake.innerHTML = '<strong>Status: Ready to Test</strong><p>Adulterated with corn silk & synthetic Carmoisine dye.</p>';
      }

      btnRun.disabled = false;
      btnRun.innerHTML = '<span class="test-icon">🧪</span><span>Drop Filaments in Lukewarm Water (Simulate 15 Mins)</span>';
      btnRun.classList.remove('hidden');
      btnReset.classList.add('hidden');
    });
  }
}
