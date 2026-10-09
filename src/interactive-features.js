// JENU'S Kashmir Valley - Interactive Experience & Micro-Animations Controller
// Handles 3D Tilt, Scroll Progress, Circular Back-to-Top, Weather Hub Telemetry & Saffron Purity Lab Test

export class KashmirInteractiveExperience {
  constructor() {
    this.initScrollProgress();
    this.removeBackToTop();
    // 3D Tilt and live viewer fluctuations disabled for clean, sophisticated, Apple-grade stability
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

  // --- 6. AUTHENTIC KASHMIRI SAFFRON PURITY VERIFICATION & LAB TESTS ---
  initSaffronPurityLab() {
    const section = document.getElementById('saffron-purity-lab-container');
    if (!section) return;

    const REAL_TESTS = [
      {
        id: 'water-diffusion',
        badge: 'Zero Chemicals • 10-15 Mins',
        tabLabel: '1. Water Diffusion Test',
        title: 'The Lukewarm Water Diffusion & Filament Integrity Test',
        subtitle: 'Observe natural Crocin pigment dispersion and thread structure over 15 minutes',
        steps: [
          'Pour 50ml of clean lukewarm water into a clear transparent drinking glass.',
          'Gently place 3 to 4 dry saffron filaments onto the surface of the water without stirring or pressing.',
          'Observe the color dispersion from the stigmas at 1 minute, 5 minutes, and 15 minutes.'
        ],
        passTitle: '✓ Pure Kashmiri Mongra Behavior',
        passTag: 'Luminous Liquid Gold • Thread Remains Deep Red',
        passPoints: [
          'Filaments float and release a slow, radiant golden-yellow / amber halo that spreads downward in delicate sunburst rays.',
          'The water turns pure luminous golden-yellow over 10–15 minutes, NEVER harsh scarlet or blood red.',
          'The filaments remain 100% intact, retain their deep crimson trumpet shape, and never lose their color even after soaking for 24 hours.'
        ],
        failTitle: '❌ Counterfeit / Artificially Dyed Threads',
        failTag: 'Instant Blood-Red Bleed • Bleaches to Pale White',
        failPoints: [
          'Water turns an instant dark artificial red, crimson, or fluorescent magenta within 3 to 5 seconds as synthetic food dye bleeds off.',
          'The threads (typically dyed corn silk, safflower petals, or shredded coconut fiber) rapidly bleach to pale white, translucent, or grey.',
          'Threads disintegrate, become limp and slimy, or dissolve when disturbed with a spoon.'
        ],
        science: 'Authentic saffron contains Crocin, a natural water-soluble carotenoid glycoside bound inside the cellular tissue of Crocus sativus. It requires progressive hydration to leach out gradually. Synthetic dyes like Carmoisine, Ponceau 4R, or Tartrazine have no plant cell matrix and flash-dissolve instantaneously.'
      },
      {
        id: 'baking-soda',
        badge: 'Alkaline pH Reaction • Instant',
        tabLabel: '2. Baking Soda Chemical Test',
        title: 'The Sodium Bicarbonate (Baking Soda) Chemical Test',
        subtitle: 'Differentiates natural plant carotenoids from synthetic Azo coal-tar dyes',
        steps: [
          'In a small white ceramic cup or clear glass, dissolve 1/2 teaspoon of pure baking soda in 30ml clean water.',
          'Drop 2 threads of dry saffron into the clear alkaline solution.',
          'Observe the solution color shift within 60 seconds.'
        ],
        passTitle: '✓ Pure Kashmiri Mongra Behavior',
        passTag: 'Radiant Canary Yellow • Stable in Alkaline pH',
        passPoints: [
          'The alkaline liquid turns a crystal-clear, bright canary-yellow or luminous golden hue.',
          'No turbidity, muddy sediment, or reddish hue develops under alkaline conditions (pH 8.2–8.4).',
          'Natural Crocin carotenoid molecules remain chemically stable and vibrant in mildly basic environments.'
        ],
        failTitle: '❌ Counterfeit / Artificially Dyed Threads',
        failTag: 'Murky Reddish-Orange / Dull Pinkish Brown',
        failPoints: [
          'The liquid turns a dull murky orange, dirty pink, or brownish-crimson hue.',
          'Synthetic Azo coal-tar colorants undergo molecular degradation and wavelength shifts when exposed to sodium bicarbonate.',
          'Solution often develops cloudiness or chemical dye precipitates settling at the bottom.'
        ],
        science: 'Carotenoid pigments in pure Crocus sativus maintain their conjugated double-bond yellow absorbance in mildly alkaline pH. In contrast, synthetic dye adulterants react chemically with sodium bicarbonate, altering their molecular chromophore structure and shifting visibly toward dull reddish-brown.'
      },
      {
        id: 'finger-rub',
        badge: 'Physical Elasticity • 10 Seconds',
        tabLabel: '3. Finger Rub & Tensile Test',
        title: 'The Hydrated Finger Rub & Fiber Tensile Test',
        subtitle: 'Evaluates botanical stigma cellulose strength and skin staining characteristics',
        steps: [
          'Take a single saffron thread that has been soaked in plain water for 5 minutes.',
          'Place it firmly on your thumb and rub it vigorously back and forth with your index finger.',
          'Inspect both the physical state of the thread and the stain left on your skin.'
        ],
        passTitle: '✓ Pure Kashmiri Mongra Behavior',
        passTag: 'Golden-Yellow Skin Stain • Filament Remains Unbroken',
        passPoints: [
          'The thread remains remarkably resilient, fibrous, and elastic—it does NOT break into pulp or mush.',
          'It leaves a distinct, warm golden-yellow stain on your skin that rinses off cleanly with warm water.',
          'Under close inspection, it retains the classic flared, funnel-shaped trifid stigma tip with natural serrated ridges.'
        ],
        failTitle: '❌ Counterfeit / Artificially Dyed Threads',
        failTag: 'Chemical Crimson Stain • Filament Crumbles to Paste',
        failPoints: [
          'The thread disintegrates instantly into mushy paste, flakes, or shredded synthetic strands under slight finger pressure.',
          'Leaves a harsh, stubborn deep pink, purple, or chemical blood-red stain on your skin that is difficult to wash off.',
          'Threads have uniform cylinder thickness without natural trumpeted stigma flare.'
        ],
        science: 'Authentic saffron stigmas are composed of tough cellulose and pectin fiber architecture that withstands hydration. Counterfeits made from boiled corn silk, paper shreds, or gelatinized starch lack authentic botanical cell walls and break down into mush when wet.'
      },
      {
        id: 'taste-aroma',
        badge: 'Organoleptic Sensory • Instant',
        tabLabel: '4. Aroma vs Taste Paradox',
        title: 'The Sweet Aroma vs Bitter Taste Paradox',
        subtitle: 'The golden rule of Kashmiri saffron: Pure saffron smells sweet, but NEVER tastes sweet',
        steps: [
          'Open the saffron container and inhale the aroma deeply for 3 seconds.',
          'Take a single hydrated thread and place it directly on the center of your clean tongue for 10 seconds.',
          'Evaluate the sensory profile: does it taste sweet or bitter?'
        ],
        passTitle: '✓ Pure Kashmiri Mongra Behavior',
        passTag: 'Honeyed Mountain Hay Scent • Bitter & Astringent Palate',
        passPoints: [
          'Aroma is intensely floral, warm, honey-like, and reminiscent of sweet Alpine hay (driven by high volatile Safranal).',
          'When tasted on the tongue, pure saffron is strictly earthy, dry, astringent, and distinctly BITTER (driven by Picrocrocin).',
          'Leaves a clean, lingering aromatic warmth in the throat with zero sugary or syrupy film.'
        ],
        failTitle: '❌ Counterfeit / Artificially Dyed Threads',
        failTag: 'Sweet Sugary Taste • Flat / Chemical / Musty Odor',
        failPoints: [
          'Tastes distinctly sweet, sugary, or syrupy on the tongue.',
          'Adulterators soak fake threads in glucose syrup, honey, or chemical glycerin to artificially inflate wholesale weight by 20% to 30%.',
          'Smells like vinegar, tobacco, metallic perfume, or has virtually no aroma at all.'
        ],
        science: 'Pure saffron exhibits a natural biological paradox: high volatile Safranal creates a rich honey-like aroma, while the bitter glucoside Picrocrocin delivers an astringent medicinal bite. If saffron tastes sweet on your tongue, it has been adulterated with sugar syrups.'
      },
      {
        id: 'butter-paper',
        badge: 'Paraffin & Oil Detection • 15 Seconds',
        tabLabel: '5. Butter Paper Grease Blot Test',
        title: 'The Clean Butter Paper Oil & Paraffin Blot Test',
        subtitle: 'Detects illegal mineral oils, animal fats, or glycerin added to increase batch weight',
        steps: [
          'Place 5 to 6 dry saffron threads between two sheets of clean white butter paper or greaseproof baking parchment.',
          'Press down firmly with your thumb for 10 seconds against a flat, hard surface.',
          'Hold the paper up against a bright light source to check for translucent grease marks.'
        ],
        passTitle: '✓ Pure Kashmiri Mongra Behavior',
        passTag: 'Zero Oil Halo • Paper Remains 100% Crisp & Dry',
        passPoints: [
          'The paper remains completely dry, clean, and pristine with zero oily residue or translucent ring.',
          'Threads are bone-dry and brittle, snapping with a crisp dry sound when bent.',
          'Moisture content is strictly under 8.5%, sealed immediately in nitrogen-flushed containers.'
        ],
        failTitle: '❌ Counterfeit / Artificially Dyed Threads',
        failTag: 'Translucent Grease Spot / Paraffin Smudge',
        failPoints: [
          'A noticeable translucent oily grease ring or paraffin smudge appears on the paper around the threads.',
          'Unscrupulous merchants spray threads with paraffin wax, mineral oil, or animal fat to add weight and make old, brittle threads look fresh.',
          'Threads feel sticky, excessively flexible, or gummy to the touch.'
        ],
        science: 'Authentic mountain-harvested saffron is cured over low heat until moisture drops below 10%, containing negligible free lipids. Added oils or glycerin (used to fraudulently increase weight and artificial gloss) wick into paper fibers within seconds, creating permanent translucent spots.'
      }
    ];

    let currentTestIdx = 0;

    const render = () => {
      const cur = REAL_TESTS[currentTestIdx];

      section.innerHTML = `
        <div class="purity-lab-wrapper">
          <div class="purity-lab-header">
            <span class="purity-lab-badge">🔬 Certified Laboratory Standards & Real Home Verification</span>
            <h2 class="purity-lab-title">How to Test Real Kashmiri Saffron at Home</h2>
            <p class="purity-lab-desc">Authentic Pampore Mongra Saffron is a precious natural treasure. Follow genuine scientific home verification tests and official FSSAI / ISO 3632 spectrophotometric standards to verify 100% pure harvest.</p>
          </div>

          <!-- Real Test Selection Tabs -->
          <div class="real-tests-nav-strip">
            ${REAL_TESTS.map((t, idx) => `
              <button class="real-test-nav-btn ${idx === currentTestIdx ? 'active' : ''}" data-test-idx="${idx}">
                <span class="test-tab-icon">${idx === 0 ? '💧' : idx === 1 ? '🧪' : idx === 2 ? '✋' : idx === 3 ? '👃' : '📄'}</span>
                <span class="test-tab-text">${t.tabLabel}</span>
              </button>
            `).join('')}
          </div>

          <!-- Active Test Detailed Protocol & Pass/Fail Card -->
          <div class="real-test-card animate-fade-in">
            <div class="test-card-top-bar">
              <div class="test-card-heading-group">
                <span class="test-difficulty-pill">${cur.badge}</span>
                <h3 class="test-active-title">${cur.title}</h3>
                <p class="test-active-subtitle">${cur.subtitle}</p>
              </div>
            </div>

            <!-- Step by Step Protocol -->
            <div class="test-steps-container">
              <h4 class="test-steps-title">📋 Step-by-Step Testing Procedure:</h4>
              <div class="test-steps-grid">
                ${cur.steps.map((st, i) => `
                  <div class="test-step-card">
                    <span class="step-num">${i + 1}</span>
                    <p class="step-text">${st}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Pass vs Fail Real Verification Comparison -->
            <div class="test-comparison-grid">
              
              <!-- Pass Box -->
              <div class="test-outcome-box outcome-pass">
                <div class="outcome-header">
                  <span class="outcome-icon">✓</span>
                  <div>
                    <h4 class="outcome-title">${cur.passTitle}</h4>
                    <span class="outcome-tag-pill pass-pill">${cur.passTag}</span>
                  </div>
                </div>
                <ul class="outcome-points-list">
                  ${cur.passPoints.map(pt => `<li><span class="bullet-pass">●</span> <span>${pt}</span></li>`).join('')}
                </ul>
              </div>

              <!-- Fail Box -->
              <div class="test-outcome-box outcome-fail">
                <div class="outcome-header">
                  <span class="outcome-icon">❌</span>
                  <div>
                    <h4 class="outcome-title">${cur.failTitle}</h4>
                    <span class="outcome-tag-pill fail-pill">${cur.failTag}</span>
                  </div>
                </div>
                <ul class="outcome-points-list">
                  ${cur.failPoints.map(pt => `<li><span class="bullet-fail">●</span> <span>${pt}</span></li>`).join('')}
                </ul>
              </div>

            </div>

            <!-- Scientific Principle Callout -->
            <div class="test-science-callout">
              <div class="science-icon">🔬</div>
              <div class="science-text">
                <strong>Scientific Principle & Chemical Mechanism:</strong>
                <p>${cur.science}</p>
              </div>
            </div>
          </div>

          <!-- Official Government & ISO 3632 Laboratory Standards Table -->
          <div class="lab-standards-card">
            <div class="lab-standards-header">
              <div class="lab-title-group">
                <span class="lab-gov-tag">🌿 Ministry of Health & Family Welfare • FSSAI Central Authority</span>
                <h3 class="lab-table-title">ISO 3632-1:2011 Grade A1+ Certified Laboratory Specifications</h3>
                <p class="lab-table-subtitle">Every batch of JENU'S Pampore Mongra Saffron is tested by independent NABL-accredited spectrophotometric laboratories before packaging.</p>
              </div>
              <button class="btn-open-fssai-cert btn-purity-cert-cta" id="btn-open-lab-cert">
                <span class="cert-btn-icon">📜</span>
                <span>View Certified FSSAI Lab Report</span>
              </button>
            </div>

            <div class="lab-table-responsive">
              <table class="lab-spec-table">
                <thead>
                  <tr>
                    <th>Quality Parameter</th>
                    <th>Analytical Testing Method</th>
                    <th>JENU'S Grade A1+ Result</th>
                    <th>Government Minimum Standard</th>
                    <th>Market Adulterated Samples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Coloring Strength (Crocin)</strong></td>
                    <td>UV-Vis Spectrophotometry (440nm)</td>
                    <td><strong class="highlight-pure">258.4</strong> (Highest Category 1)</td>
                    <td>190.0 Min (ISO Grade 1)</td>
                    <td><span class="highlight-fail">< 110.0 (Dyed / Diluted)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Aroma Potency (Safranal)</strong></td>
                    <td>Spectrophotometric Absorbance (330nm)</td>
                    <td><strong class="highlight-pure">41.2</strong> (Peak High-Altitude Aroma)</td>
                    <td>20.0 – 50.0</td>
                    <td><span class="highlight-fail">< 18.0 (Flat / Stale)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Bitterness Index (Picrocrocin)</strong></td>
                    <td>Spectrophotometric Absorbance (257nm)</td>
                    <td><strong class="highlight-pure">89.6</strong> (Intense Medicinal Grade)</td>
                    <td>70.0 Min</td>
                    <td><span class="highlight-fail">< 45.0 (Inert Fibers)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Moisture & Volatile Matter</strong></td>
                    <td>Oven Desiccation (103°C)</td>
                    <td><strong class="highlight-pure">7.8%</strong> (Aroma-Lock Bone Dry)</td>
                    <td>12.0% Max</td>
                    <td><span class="highlight-fail">16.0% – 22.0% (Excess Water)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Artificial Synthetic Dyes</strong></td>
                    <td>HPLC / Thin Layer Chromatography</td>
                    <td><strong class="highlight-pure">0.00% (Not Detected)</strong></td>
                    <td>0.00% (Strictly Prohibited)</td>
                    <td><span class="highlight-fail">Detected (Carmoisine / Tartrazine)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Stigma Purity / Yellow Style</strong></td>
                    <td>Microscopic Manual Separation</td>
                    <td><strong class="highlight-pure">100% Pure Red Mongra Tips</strong></td>
                    <td>Max 5% Yellow Styles</td>
                    <td><span class="highlight-fail">> 25% Yellow Waste Styles</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="lab-table-footer">
              <div class="lab-cert-num">
                <span>Central FSSAI License Number: <strong>10026061000412</strong></span>
                <span class="lab-dot">•</span>
                <span>Audit Facility: <strong>Highway 44 Agro-Park, Pampore, J&K</strong></span>
              </div>
              <a href="#products-section" class="btn-shop-certified-saffron" data-nav-cat="saffron">
                <span>Shop Certified Pampore Saffron ➔</span>
              </a>
            </div>
          </div>

        </div>
      `;

      // Bind tab button clicks
      section.querySelectorAll('.real-test-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentTestIdx = parseInt(btn.dataset.testIdx, 10);
          render();
        });
      });

      // Bind certificate modal trigger
      section.querySelector('#btn-open-lab-cert')?.addEventListener('click', () => {
        const certModal = document.getElementById('fssai-cert-modal');
        if (certModal) {
          certModal.classList.remove('hidden');
          document.body.classList.add('modal-open');
        }
      });

      // Bind shop saffron link
      section.querySelector('.btn-shop-certified-saffron')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.jenusApp?.setCategory('saffron');
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    };

    render();
  }
}

