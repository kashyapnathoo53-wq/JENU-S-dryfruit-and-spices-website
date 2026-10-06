// JENU'S Kashmir Valley - Authentic Kashmiri Chinar Leaves & Pampore Mongra Saffron Simulation
// High-performance 60fps Canvas particle engine with 3D tumbling physics & mountain wind aerodynamics

export class KashmirAmbientLeaves {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.sprites = {};
    this.particles = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.maxParticles = isMobile ? 18 : 34; // Generous, atmospheric cascade across the entire screen
    this.isRunning = true;
    this.animationFrameId = null;
    this.width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    this.height = typeof window !== 'undefined' ? window.innerHeight : 800;
    this.mouse = { x: -1000, y: -1000, radius: 160 };
    this.wind = { x: 0.35, y: 0.70, turbulence: 0 };
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'kashmir-ambient-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 90;
      opacity: 0.92;
      transition: opacity 0.4s ease;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Pre-render photorealistic offscreen vector sprites for 60fps performance
    this.generateSprites();

    // Interactive mouse breeze air disturbance
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    // Aerodynamic mountain draft when scrolling (never hides leaves, gently sways them all over website)
    let lastScrollY = window.scrollY;
    let scrollTimeout = null;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Temporary wind turbulence simulating air displacement
      this.wind.turbulence = Math.min(Math.max(scrollDelta * 0.035, -1.5), 1.5);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.wind.turbulence = 0;
      }, 120);
    }, { passive: true });

    // Energy saving when tab is inactive
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.createParticles();
    this.start();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  // =========================================================================
  // 1. HIGH-FIDELITY KASHMIRI VECTOR SPRITE GENERATOR (OFFSCREEN PRE-RENDERING)
  // =========================================================================
  generateSprites() {
    this.sprites = {
      chinarGolden: this.createChinarSprite('golden'),
      chinarCrimson: this.createChinarSprite('crimson'),
      chinarAmber: this.createChinarSprite('amber'),
      saffronSingle: this.createSaffronSingleSprite(),
      saffronCluster: this.createSaffronClusterSprite(),
      saffronCurved: this.createSaffronCurvedSprite(),
      pamporePetal: this.createPamporePetalSprite()
    };
  }

  // Authentic 5-pointed serrated Kashmiri Chinar Leaf (Boonyi / Platanus orientalis)
  createChinarSprite(theme) {
    const size = 180; // 2x resolution for crispness
    const offCanvas = document.createElement('canvas');
    offCanvas.width = size;
    offCanvas.height = size;
    const ctx = offCanvas.getContext('2d');

    const cx = size / 2;
    const cy = size / 2 - 4;
    const scale = 0.88;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    let gradStart, gradMid, gradEdge, veinColor;
    if (theme === 'golden') {
      gradStart = '#FDE68A'; // Luminous golden heart
      gradMid = '#EA580C';   // Autumn Kashmir orange
      gradEdge = '#991B1B';  // Deep crimson edge
      veinColor = '#78350F';
    } else if (theme === 'crimson') {
      gradStart = '#FCD34D'; // Amber center
      gradMid = '#DC2626';   // Royal Kashmiri scarlet
      gradEdge = '#7F1D1D';  // Burgundy perimeter
      veinColor = '#450A0A';
    } else { // 'amber'
      gradStart = '#FEF08A';
      gradMid = '#D97706';
      gradEdge = '#9A3412';
      veinColor = '#713F12';
    }

    // Warm realistic drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;

    // Woody curved petiole stem
    ctx.strokeStyle = '#5E2B08';
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 36);
    ctx.quadraticCurveTo(-4, 56, -2, 70);
    ctx.stroke();

    // 5-Pointed Palmate Serrated Chinar Blade
    ctx.beginPath();
    ctx.moveTo(0, 35); // Basal sinus

    // --- Left Lower Lobe ---
    ctx.bezierCurveTo(-14, 34, -28, 40, -42, 32);
    ctx.lineTo(-54, 25);
    ctx.lineTo(-44, 18);
    ctx.lineTo(-49, 13);
    ctx.bezierCurveTo(-36, 11, -30, 4, -26, 3);

    // --- Left Upper Lobe ---
    ctx.bezierCurveTo(-40, -3, -55, -12, -68, -23);
    ctx.lineTo(-59, -27);
    ctx.lineTo(-72, -40); // tip
    ctx.lineTo(-61, -44);
    ctx.lineTo(-55, -48);
    ctx.bezierCurveTo(-42, -44, -28, -34, -20, -26);

    // --- Central Lobe (Dominant) ---
    ctx.bezierCurveTo(-25, -43, -26, -59, -32, -73);
    ctx.lineTo(-22, -75);
    ctx.lineTo(0, -92); // Central main tip
    ctx.lineTo(22, -75);
    ctx.lineTo(32, -73);
    ctx.bezierCurveTo(26, -59, 25, -43, 20, -26);

    // --- Right Upper Lobe ---
    ctx.bezierCurveTo(28, -34, 42, -44, 55, -48);
    ctx.lineTo(61, -44);
    ctx.lineTo(72, -40); // tip
    ctx.lineTo(59, -27);
    ctx.bezierCurveTo(55, -12, 40, -3, 26, 3);

    // --- Right Lower Lobe ---
    ctx.lineTo(49, 13);
    ctx.lineTo(44, 18);
    ctx.lineTo(54, 25);
    ctx.bezierCurveTo(42, 32, 28, 40, 14, 34);
    ctx.closePath();

    // Autumn Sunlit Radial Gradient
    const grad = ctx.createRadialGradient(0, 10, 6, 0, -20, 80);
    grad.addColorStop(0, gradStart);
    grad.addColorStop(0.5, gradMid);
    grad.addColorStop(1, gradEdge);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = gradEdge;
    ctx.lineWidth = 0.9;
    ctx.stroke();

    // Architectural Primary & Secondary Vein Network
    ctx.lineWidth = 2.0;
    ctx.strokeStyle = veinColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. Central main vein
    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.quadraticCurveTo(-1, -28, 0, -89);
    ctx.stroke();

    // 3D Vein light ridge
    ctx.lineWidth = 0.7;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0.8, 33);
    ctx.quadraticCurveTo(0, -28, 0.8, -87);
    ctx.stroke();

    // 2. Left & Right Upper Primary Veins
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = veinColor;
    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.quadraticCurveTo(-24, 5, -70, -38);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.quadraticCurveTo(24, 5, 70, -38);
    ctx.stroke();

    // 3. Lower Primary Veins
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.quadraticCurveTo(-20, 26, -52, 24);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.quadraticCurveTo(20, 26, 52, 24);
    ctx.stroke();

    // Secondary fine pinnate rib veins
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 'rgba(90, 30, 10, 0.6)';
    const drawVeinPair = (yStart, len, angleDeg) => {
      const rad = (angleDeg * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(0, yStart);
      ctx.lineTo(-Math.cos(rad) * len, yStart - Math.sin(rad) * len * 0.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, yStart);
      ctx.lineTo(Math.cos(rad) * len, yStart - Math.sin(rad) * len * 0.7);
      ctx.stroke();
    };

    drawVeinPair(15, 18, 35);
    drawVeinPair(-4, 20, 40);
    drawVeinPair(-23, 16, 45);
    drawVeinPair(-42, 12, 50);
    drawVeinPair(-61, 8, 55);

    ctx.restore();
    return offCanvas;
  }

  // Authentic Pampore Mongra Saffron Single Filament with Trumpet Mouth
  createSaffronSingleSprite() {
    const w = 90;
    const h = 180;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const ctx = offCanvas.getContext('2d');

    ctx.save();
    ctx.translate(w / 2, h / 2);

    // Warm radiant saffron crimson drop shadow & glow
    ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    const baseGrad = ctx.createLinearGradient(0, 68, 0, -68);
    baseGrad.addColorStop(0, '#F59E0B');    // Saffron style base where plucked (golden amber)
    baseGrad.addColorStop(0.18, '#EA580C'); // Carmine orange transition
    baseGrad.addColorStop(0.48, '#DC2626'); // Vibrant Kashmiri scarlet
    baseGrad.addColorStop(0.82, '#991B1B'); // Pure Pampore Mongra crimson
    baseGrad.addColorStop(1, '#7F1D1D');    // Deep ruby serrated trumpet mouth

    const c = 20;
    ctx.beginPath();
    ctx.moveTo(2.2, 66);
    ctx.bezierCurveTo(c * 0.5, 30, c * 1.1, -10, 4.5, -52);
    // Fluted serrated trumpet mouth
    ctx.lineTo(10.5, -64);
    ctx.lineTo(6.5, -68);
    ctx.lineTo(9.5, -73);
    ctx.lineTo(2.0, -70);
    ctx.lineTo(-2.5, -74);
    ctx.lineTo(-5.5, -69);
    ctx.lineTo(-9.5, -72);
    ctx.lineTo(-6.5, -63);
    ctx.bezierCurveTo(c * 1.1 - 5, -10, c * 0.5 - 2.5, 30, -2.2, 66);
    ctx.closePath();

    ctx.fillStyle = baseGrad;
    ctx.fill();

    // Silky thread highlight sheen
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255, 235, 205, 0.45)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(0.5, 48);
    ctx.bezierCurveTo(c * 0.5, 22, c * 0.9, -15, 1.5, -54);
    ctx.stroke();

    ctx.restore();
    return offCanvas;
  }

  // Gracefully Curved Mongra Saffron Thread
  createSaffronCurvedSprite() {
    const w = 100;
    const h = 180;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const ctx = offCanvas.getContext('2d');

    ctx.save();
    ctx.translate(w / 2, h / 2);

    ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = 2;

    const baseGrad = ctx.createLinearGradient(0, 66, 0, -66);
    baseGrad.addColorStop(0, '#F59E0B');
    baseGrad.addColorStop(0.18, '#EA580C');
    baseGrad.addColorStop(0.50, '#B91C1C');
    baseGrad.addColorStop(0.85, '#881337');
    baseGrad.addColorStop(1, '#701A75');

    const c = -24;
    ctx.beginPath();
    ctx.moveTo(-2.2, 64);
    ctx.bezierCurveTo(c * 0.5, 28, c * 1.1, -12, -4.5, -50);
    ctx.lineTo(-10.5, -62);
    ctx.lineTo(-6.5, -66);
    ctx.lineTo(-9.5, -71);
    ctx.lineTo(-2.0, -68);
    ctx.lineTo(2.5, -72);
    ctx.lineTo(5.5, -67);
    ctx.lineTo(9.5, -70);
    ctx.lineTo(6.5, -61);
    ctx.bezierCurveTo(c * 1.1 + 5, -12, c * 0.5 + 2.5, 28, 2.2, 64);
    ctx.closePath();

    ctx.fillStyle = baseGrad;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255, 230, 205, 0.45)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(-0.5, 46);
    ctx.bezierCurveTo(c * 0.5, 20, c * 0.9, -15, -1.5, -52);
    ctx.stroke();

    ctx.restore();
    return offCanvas;
  }

  // Royal Trifid Zafran Guchha (3-Stigma Pampore Saffron Cluster)
  createSaffronClusterSprite() {
    const w = 130;
    const h = 180;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const ctx = offCanvas.getContext('2d');

    ctx.save();
    ctx.translate(w / 2, h / 2 + 12);

    // Golden style stem base where plucked
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 3.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.lineTo(0, 38);
    ctx.stroke();

    // Helper: draw single stigma inside cluster
    const drawSubStigma = (x, y, scale, angle, curveSign) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.scale(scale, scale);

      ctx.shadowColor = 'rgba(220, 38, 38, 0.45)';
      ctx.shadowBlur = 6;

      const baseGrad = ctx.createLinearGradient(0, 56, 0, -56);
      baseGrad.addColorStop(0, '#F59E0B');
      baseGrad.addColorStop(0.18, '#EA580C');
      baseGrad.addColorStop(0.50, '#DC2626');
      baseGrad.addColorStop(0.85, '#991B1B');
      baseGrad.addColorStop(1, '#7F1D1D');

      const c = curveSign * 18;
      ctx.beginPath();
      ctx.moveTo(1.5, 54);
      ctx.bezierCurveTo(c * 0.5, 22, c * 1.0, -10, 3.5, -46);
      ctx.lineTo(8.5, -56);
      ctx.lineTo(4.5, -60);
      ctx.lineTo(7.0, -64);
      ctx.lineTo(1.0, -62);
      ctx.lineTo(-2.5, -65);
      ctx.lineTo(-4.5, -60);
      ctx.lineTo(-8.0, -63);
      ctx.lineTo(-5.5, -55);
      ctx.bezierCurveTo(c * 1.0 - 4, -10, c * 0.5 - 2, 22, -1.5, 54);
      ctx.closePath();

      ctx.fillStyle = baseGrad;
      ctx.fill();
      ctx.restore();
    };

    drawSubStigma(-3, 36, 0.90, -25, -1);
    drawSubStigma(3, 36, 0.92, 23, 1);
    drawSubStigma(0, 34, 1.0, -2, 0.3);

    ctx.restore();
    return offCanvas;
  }

  // Translucent Pampore Saffron Crocus Petal (Crocus sativus purple flower)
  createPamporePetalSprite() {
    const size = 90;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = size;
    offCanvas.height = size;
    const ctx = offCanvas.getContext('2d');

    const cx = size / 2;
    const cy = size / 2;

    ctx.save();
    ctx.translate(cx, cy);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 6;

    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.bezierCurveTo(-18, 22, -24, -4, -14, -25);
    ctx.bezierCurveTo(-7, -35, -2, -40, 0, -42);
    ctx.bezierCurveTo(2, -40, 7, -35, 14, -25);
    ctx.bezierCurveTo(24, -4, 18, 22, 0, 35);
    ctx.closePath();

    const petalGrad = ctx.createLinearGradient(0, 35, 0, -42);
    petalGrad.addColorStop(0, '#5B21B6'); // Deep royal purple base
    petalGrad.addColorStop(0.35, '#7C3AED'); // Pampore violet
    petalGrad.addColorStop(0.75, '#A78BFA'); // Silky lilac
    petalGrad.addColorStop(1, '#DDD6FE'); // Pale translucent rim
    ctx.fillStyle = petalGrad;
    ctx.fill();

    // Fine violet vein lines
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(91, 33, 182, 0.55)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 33);
    ctx.quadraticCurveTo(0, -8, 0, -39);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 26);
    ctx.quadraticCurveTo(-8, 0, -10, -22);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 26);
    ctx.quadraticCurveTo(8, 0, 10, -22);
    ctx.stroke();

    ctx.restore();
    return offCanvas;
  }

  // =========================================================================
  // 2. PARTICLE GENERATION & 3D MOUNTAIN WIND AERODYNAMICS
  // =========================================================================
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.generateParticle(true));
    }
  }

  generateParticle(randomY = false) {
    const roll = Math.random();
    let type, spriteKey, baseScale;

    if (roll < 0.48) {
      // 48% Authentic Kashmiri Chinar Leaves (Golden, Crimson, Amber)
      const chinarType = Math.random();
      if (chinarType < 0.40) {
        type = 'chinar';
        spriteKey = 'chinarGolden';
      } else if (chinarType < 0.75) {
        type = 'chinar';
        spriteKey = 'chinarCrimson';
      } else {
        type = 'chinar';
        spriteKey = 'chinarAmber';
      }
      baseScale = Math.random() * 0.22 + 0.28; // ~48px - 85px crisp Kashmiri Chinar leaf
    } else if (roll < 0.94) {
      // 46% Pure Pampore Mongra Saffron Threads (Single filaments, curved strands & 3-stigma clusters)
      const saffronType = Math.random();
      if (saffronType < 0.45) {
        type = 'saffron';
        spriteKey = 'saffronSingle';
      } else if (saffronType < 0.78) {
        type = 'saffron';
        spriteKey = 'saffronCurved';
      } else {
        type = 'saffron';
        spriteKey = 'saffronCluster';
      }
      baseScale = Math.random() * 0.28 + 0.32; // ~48px - 85px distinct crimson saffron thread
    } else {
      // 6% Pampore Purple Crocus Sativus Flower Petals
      type = 'petal';
      spriteKey = 'pamporePetal';
      baseScale = Math.random() * 0.22 + 0.25;
    }

    // Depth layers: 0 (background, small, fast), 1 (midground), 2 (foreground, large, crisp)
    const depthLayer = Math.random() < 0.30 ? 2 : (Math.random() < 0.70 ? 1 : 0);
    const depthScale = depthLayer === 2 ? 1.25 : (depthLayer === 0 ? 0.75 : 1.0);
    const depthSpeed = depthLayer === 2 ? 1.15 : (depthLayer === 0 ? 0.85 : 1.0);

    return {
      type,
      spriteKey,
      x: Math.random() * (this.width + 120) - 60,
      y: randomY ? Math.random() * this.height : -55,
      scale: baseScale * depthScale,
      depthLayer,
      // Physical aerodynamic velocity (drifting gently downwards)
      speedX: (Math.random() - 0.25) * 0.55 * depthSpeed,
      speedY: (Math.random() * 0.65 + 0.55) * depthSpeed,
      // 3D Tumbling & Flutter Angles
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.0,
      flipAngle: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.022 + 0.012,
      pitchAngle: Math.random() * Math.PI * 2,
      pitchSpeed: Math.random() * 0.018 + 0.008,
      // Thermal updraft sway
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAmplitude: Math.random() * 1.5 + 0.8,
      // High-contrast, radiant opacity across all sections
      opacity: depthLayer === 2
        ? Math.random() * 0.12 + 0.86
        : (depthLayer === 0 ? Math.random() * 0.20 + 0.62 : Math.random() * 0.18 + 0.76)
    };
  }

  // =========================================================================
  // 3. 60FPS LIVE ANIMATION LOOP WITH 3D FLUTTER & MOUSE DISTURBANCE
  // =========================================================================
  update() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const mouseRadiusSq = this.mouse.radius * this.mouse.radius;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update angles
      p.sway += p.swaySpeed;
      p.rotation += p.rotationSpeed;
      p.flipAngle += p.flipSpeed;
      p.pitchAngle += p.pitchSpeed;

      // Natural mountain breeze drift with thermal oscillation
      const thermalSway = Math.sin(p.sway) * p.swayAmplitude;
      p.x += this.wind.x + p.speedX + thermalSway + (this.wind.turbulence * 1.6);
      p.y += this.wind.y + p.speedY + (this.wind.turbulence * 1.3);

      // Interactive mouse air-cushion repulsion
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < mouseRadiusSq && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p.x += (dx / dist) * force * 5.5;
        p.y += (dy / dist) * force * 5.5;
        p.rotation += force * 9;
        p.flipAngle += force * 0.1;
      }

      // Render Particle
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;

      const sprite = this.sprites[p.spriteKey];
      if (sprite) {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);

        // 3D Tumbling projection: cos(flip) simulates flipping in 3D space
        const scale3DX = p.scale * Math.cos(p.flipAngle);
        const scale3DY = p.scale * (0.85 + 0.15 * Math.sin(p.pitchAngle));
        this.ctx.scale(scale3DX, scale3DY);

        // Draw centered
        this.ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
      }

      this.ctx.restore();

      // Recycle particles smoothly when leaving the bottom or sides
      if (p.y > this.height + 60 || p.x > this.width + 80 || p.x < -80) {
        this.particles[i] = this.generateParticle(false);
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.update());
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      if (this.canvas) this.canvas.style.opacity = '0.92';
      this.update();
    } else if (!this.animationFrameId) {
      this.update();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.canvas) this.canvas.style.opacity = '0';
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}
