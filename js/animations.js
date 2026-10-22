/**
 * Cinematic Startup Animation & Unified Scroll-Reveal Motion System
 * Sam Dharan Rozario R — Futuristic AI Research Laboratory Aesthetic
 */

class MotionSystem {
  constructor() {
    this.introOverlay = document.getElementById('cinematic-intro');
    this.statusText = document.getElementById('intro-status-text');
    this.progressBar = document.getElementById('intro-progress-fill');
    this.progressGlow = document.getElementById('intro-progress-glow');
    this.percentText = document.getElementById('intro-meta-percent');
    this.taskText = document.getElementById('intro-meta-task');
    this.skipBtn = document.getElementById('intro-skip-btn');
    this.scrollProgressBar = document.getElementById('scroll-progress-bar');

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.hasSeenIntro = sessionStorage.getItem('sdr_portfolio_intro_seen') === 'true' ||
                        document.documentElement.classList.contains('intro-already-seen');
    this.introComplete = false;

    this.init();
  }

  init() {
    // 1. Accessibility: Instant bypass if reduced motion is requested
    if (this.isReducedMotion) {
      this.instantBypass();
      this.initScrollProgress();
      this.initScrollReveal();
      return;
    }

    // 2. Returning Visitors: Bypass intro without flash or delay
    if (this.hasSeenIntro) {
      this.instantBypass();
      this.initScrollProgress();
      this.initScrollReveal();
      this.initHeroParallax();
      return;
    }

    // 3. Setup Skip Action Listeners
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.finishIntro(true);
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.introComplete) {
        this.finishIntro(true);
      }
    });

    // 4. Play Startup Animation
    this.playCinematicIntro();

    // 5. Setup Scroll Progress & Reveals
    this.initScrollProgress();
    this.initScrollReveal();
    this.initHeroParallax();
  }

  instantBypass() {
    this.introComplete = true;
    sessionStorage.setItem('sdr_portfolio_intro_seen', 'true');
    document.body.classList.remove('intro-active');
    document.body.classList.add('hero-active');
    document.documentElement.classList.add('js-reveal-enabled');

    if (this.introOverlay) {
      this.introOverlay.classList.add('hidden');
      if (this.introOverlay.parentNode) {
        this.introOverlay.parentNode.removeChild(this.introOverlay);
      }
    }
  }

  playCinematicIntro() {
    if (!this.introOverlay) {
      this.instantBypass();
      return;
    }

    // Lock body scrolling and hide navbar during intro sequence
    document.body.classList.add('intro-active');

    // Quick, punchy telemetry sequence (~1.3s total)
    const telemetrySequence = [
      { progress: 15, task: 'SYS_CHECK.PERCEPTION', status: 'INITIALIZING AI PERCEPTION LAB...', time: 0 },
      { progress: 48, task: 'CALIBRATING.NEURAL', status: 'SYNCHRONIZING COMPUTER VISION PIPELINES...', time: 350 },
      { progress: 82, task: 'RAG_CORE.LINKED', status: 'CALIBRATING LOCAL LLM ORCHESTRATION...', time: 750 },
      { progress: 100, task: 'SYS.ACTIVE', status: 'AI WORKSPACE ONLINE // SDR', time: 1100 }
    ];

    let currentStep = 0;

    const runStep = () => {
      if (this.introComplete) return;

      if (currentStep < telemetrySequence.length) {
        const step = telemetrySequence[currentStep];

        if (this.progressBar) this.progressBar.style.width = `${step.progress}%`;
        if (this.progressGlow) this.progressGlow.style.left = `${step.progress}%`;
        if (this.percentText) this.percentText.textContent = `${step.progress}%`;
        if (this.taskText) this.taskText.textContent = step.task;
        if (this.statusText) {
          this.statusText.style.opacity = '0';
          setTimeout(() => {
            if (this.statusText) {
              this.statusText.textContent = step.status;
              this.statusText.style.opacity = '1';
            }
          }, 80);
        }

        currentStep++;
        const nextDelay = currentStep < telemetrySequence.length
          ? telemetrySequence[currentStep].time - step.time
          : 320;
        setTimeout(runStep, Math.max(80, nextDelay));
      } else {
        // Complete telemetry and lift curtain
        setTimeout(() => this.finishIntro(false), 160);
      }
    };

    runStep();
  }

  finishIntro(immediate = false) {
    if (this.introComplete) return;
    this.introComplete = true;

    sessionStorage.setItem('sdr_portfolio_intro_seen', 'true');

    if (!this.introOverlay) {
      document.body.classList.remove('intro-active');
      document.body.classList.add('hero-active');
      return;
    }

    if (immediate) {
      document.body.classList.remove('intro-active');
      document.body.classList.add('hero-active');
      this.introOverlay.classList.add('hidden');
      if (this.introOverlay.parentNode) {
        this.introOverlay.parentNode.removeChild(this.introOverlay);
      }
      return;
    }

    // 1. Trigger curtain lift: intro-content fades, dark curtain slides up
    this.introOverlay.classList.add('finishing');

    // 2. Unlock body and stagger in the hero while curtain is parting
    setTimeout(() => {
      document.body.classList.remove('intro-active');
      document.body.classList.add('hero-active');
    }, 100);

    // 3. Fully remove overlay from DOM after curtain has cleared the viewport
    setTimeout(() => {
      if (this.introOverlay) {
        this.introOverlay.classList.add('hidden');
        if (this.introOverlay.parentNode) {
          this.introOverlay.parentNode.removeChild(this.introOverlay);
        }
      }
    }, 700);
  }

  initScrollProgress() {
    if (!this.scrollProgressBar) return;

    const updateProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / scrollHeight) * 100));
        this.scrollProgressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  initScrollReveal() {
    document.documentElement.classList.add('js-reveal-enabled');

    // Fallback if reduced motion or unsupported
    if (this.isReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-init').forEach(el => el.classList.add('revealed'));
      return;
    }

    // Attach IntersectionObserver for scroll-triggered section entrance
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.revealObserver = revealObserver;

    // Apply reveal-init to key content targets
    const attachReveals = () => {
      // 1. All Section Headers
      document.querySelectorAll('.section-header:not(.reveal-init)').forEach(header => {
        header.classList.add('reveal-init');
        revealObserver.observe(header);
      });

      // 2. About Me Elements
      document.querySelectorAll('.about-text-column p:not(.reveal-init), .about-highlight-box:not(.reveal-init)').forEach((p, idx) => {
        p.classList.add('reveal-init');
        p.classList.add(`reveal-stagger-${Math.min(idx + 1, 4)}`);
        revealObserver.observe(p);
      });

      document.querySelectorAll('.about-stats-grid .stat-card:not(.reveal-init)').forEach((card, idx) => {
        card.classList.add('reveal-init');
        card.classList.add(`reveal-stagger-${idx + 1}`);
        revealObserver.observe(card);
      });

      // 3. Skills Category Blocks & Cards
      document.querySelectorAll('.skill-category-block:not(.reveal-init)').forEach((block, idx) => {
        block.classList.add('reveal-init');
        block.classList.add(`reveal-stagger-${(idx % 3) + 1}`);
        revealObserver.observe(block);
      });

      // 4. Project Filters & Cards
      const projFilters = document.querySelector('.project-filters');
      if (projFilters && !projFilters.classList.contains('reveal-init')) {
        projFilters.classList.add('reveal-init');
        revealObserver.observe(projFilters);
      }

      document.querySelectorAll('.project-card:not(.reveal-init)').forEach((card, idx) => {
        card.classList.add('reveal-init');
        card.classList.add(`reveal-stagger-${(idx % 3) + 1}`);
        revealObserver.observe(card);
      });

      // 5. Timeline Items (Experience)
      const timelineContainer = document.querySelector('.experience-timeline');
      if (timelineContainer && !timelineContainer.classList.contains('reveal-init')) {
        timelineContainer.classList.add('reveal-init');
        revealObserver.observe(timelineContainer);
      }

      document.querySelectorAll('.timeline-item:not(.reveal-init)').forEach((item, idx) => {
        item.classList.add('reveal-init');
        item.classList.add(`reveal-stagger-${idx + 1}`);
        revealObserver.observe(item);
      });

      // 6. GitHub Dashboard
      const ghDash = document.querySelector('.github-dashboard');
      if (ghDash && !ghDash.classList.contains('reveal-init')) {
        ghDash.classList.add('reveal-init');
        revealObserver.observe(ghDash);
      }

      // 7. Education Card
      const eduCard = document.querySelector('.education-card');
      if (eduCard && !eduCard.classList.contains('reveal-init')) {
        eduCard.classList.add('reveal-init');
        revealObserver.observe(eduCard);
      }

      // 8. Certification Cards
      document.querySelectorAll('.cert-grid .cert-card:not(.reveal-init)').forEach((card, idx) => {
        card.classList.add('reveal-init');
        card.classList.add(`reveal-stagger-${(idx % 3) + 1}`);
        revealObserver.observe(card);
      });

      // 9. Workshops & Additional Learning
      document.querySelectorAll('.workshops-subsection:not(.reveal-init), .workshop-card:not(.reveal-init)').forEach((item, idx) => {
        item.classList.add('reveal-init');
        item.classList.add(`reveal-stagger-${(idx % 2) + 1}`);
        revealObserver.observe(item);
      });

      // 10. Contact Section Items
      document.querySelectorAll('.contact-item-link:not(.reveal-init), .contact-form-card:not(.reveal-init)').forEach((el, idx) => {
        el.classList.add('reveal-init');
        el.classList.add(`reveal-stagger-${(idx % 3) + 1}`);
        revealObserver.observe(el);
      });
    };

    this.attachReveals = attachReveals;

    // Attach reveals for already-rendered markup
    attachReveals();

    // Re-verify after dynamic components (projects, skills, certs) have populated
    setTimeout(attachReveals, 200);
    setTimeout(attachReveals, 600);
  }

  animateFilteredProjects() {
    if (this.isReducedMotion) return;
    const cards = document.querySelectorAll('#projects-render-target .project-card');
    cards.forEach((card, idx) => {
      card.classList.remove('revealed');
      card.classList.add('reveal-init');
      card.className = card.className.replace(/\breveal-stagger-\d\b/g, '').trim();
      card.classList.add(`reveal-stagger-${(idx % 4) + 1}`);
    });

    // Trigger staggered entrance on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cards.forEach(card => card.classList.add('revealed'));
      });
    });
  }

  initHeroParallax() {
    if (this.isReducedMotion || window.innerWidth < 1024) return;

    const heroVisual = document.querySelector('.hero-visual');
    const heroAmbientGlow = document.querySelector('.dark-glow-ambient');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (heroVisual) {
          heroVisual.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        if (heroAmbientGlow) {
          heroAmbientGlow.style.transform = `translateY(${scrollY * 0.06}px)`;
        }
      }
    }, { passive: true });
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioMotion = new MotionSystem();
});
