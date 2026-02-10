// ==========================================
// MÉTODO CIS 248 — FEBRACIS ABC PAULISTA
// script.js — Animations, Interactions & Tracking
// ==========================================

// ============ PAGE PRELOADER ============
(function() {
  const preloader = document.getElementById('preloader');
  const preloaderFill = preloader ? preloader.querySelector('.preloader-fill') : null;
  let progress = 0;

  if (preloaderFill) {
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 90) progress = 90;
      preloaderFill.style.width = progress + '%';
    }, 150);

    window.addEventListener('load', () => {
      clearInterval(interval);
      preloaderFill.style.width = '100%';
      setTimeout(() => {
        if (preloader) preloader.classList.add('done');
      }, 400);
    });
  }
})();

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ============ HERO VIDEO — START AT SECOND 4 ============
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('loadedmetadata', () => {
      heroVideo.currentTime = 4;
    });
    // Fallback if metadata already loaded
    if (heroVideo.readyState >= 1) {
      heroVideo.currentTime = 4;
    }
  }

  // ============ PROGRESS BAR ============
  // .progress-bar element at top of page
  // Animate scaleX from 0 to 1 as user scrolls entire page
  gsap.to('.progress-bar', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });

  // ============ NAVBAR SHRINK ON SCROLL ============
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 100,
      onUpdate: (self) => {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  }

  // ============ HERO TEXT REVEAL (clip-path) ============
  const heroLines = document.querySelectorAll('.hero h1 .reveal-line');
  if (heroLines.length) {
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl.from(heroLines, {
      y: 80,
      opacity: 0,
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    });
    heroTl.from('.hero-badge', {
      y: -20, opacity: 0, duration: 0.6, ease: 'power3.out'
    }, '-=0.5');
    heroTl.from('.hero-sub', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.3');
    heroTl.from('.hero-cta-group', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.3');
  }

  // ============ COUNTER ANIMATION ============
  // Social proof numbers animate from 0 to final value
  const counters = document.querySelectorAll('.proof-item h3');
  counters.forEach(counter => {
    const text = counter.textContent;
    // Parse: extract number and suffix (M+, +, etc.)
    const match = text.match(/^([\d.]+)(.*)/);
    if (match) {
      const endVal = parseFloat(match[1]);
      const suffix = match[2]; // e.g., "M+", "+", ""
      const obj = { val: 0 };

      gsap.to(obj, {
        val: endVal,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.social-proof-bar',
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          // Format: if endVal >= 1 show integer, else show decimal
          if (endVal >= 100) {
            counter.textContent = Math.floor(obj.val) + suffix;
          } else if (endVal >= 10) {
            counter.textContent = Math.floor(obj.val) + suffix;
          } else {
            counter.textContent = obj.val.toFixed(1) + suffix;
          }
        },
        onComplete: () => {
          counter.textContent = text; // Restore exact original text
        }
      });
    }
  });

  // ============ STAGGERED CARD REVEALS ============
  // Find all grid containers and animate their children
  const cardGrids = [
    '.pain-grid',
    '.cycle-grid',
    '.days-timeline',
    '.pillars-grid',
    '.learnings-grid',
    '.audience-grid',
    '.testimonials-grid',
    '.laws-grid'
  ];

  cardGrids.forEach(selector => {
    const grid = document.querySelector(selector);
    if (!grid) return;

    const cards = grid.children;
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        once: true
      }
    });
  });

  // ============ SECTION LABEL REVEALS ============
  document.querySelectorAll('.section-label').forEach(label => {
    gsap.from(label, {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: label,
        start: 'top 90%',
        once: true
      }
    });
  });

  // ============ SECTION TITLE REVEALS ============
  document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        once: true
      }
    });
  });

  // ============ SECTION DESC REVEALS ============
  document.querySelectorAll('.section-desc').forEach(desc => {
    gsap.from(desc, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: desc,
        start: 'top 85%',
        once: true
      }
    });
  });

  // ============ METHOD SECTION ============
  const methodText = document.querySelector('.method-text');
  const methodVisual = document.querySelector('.method-visual');
  if (methodText) {
    gsap.from(methodText, {
      x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: methodText, start: 'top 80%', once: true }
    });
  }
  if (methodVisual) {
    gsap.from(methodVisual, {
      x: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: methodVisual, start: 'top 80%', once: true }
    });
  }

  // Big number scale-in
  const bigNumber = document.querySelector('.big-number');
  if (bigNumber) {
    gsap.from(bigNumber, {
      scale: 0.5, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)',
      scrollTrigger: { trigger: bigNumber, start: 'top 85%', once: true }
    });
  }

  // ============ PAULO VIEIRA SECTION ============
  const pauloImage = document.querySelector('.paulo-image-wrapper');
  const pauloText = document.querySelector('.paulo-text');
  if (pauloImage) {
    gsap.from(pauloImage, {
      x: -80, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: pauloImage, start: 'top 80%', once: true }
    });
  }
  if (pauloText) {
    gsap.from(pauloText, {
      x: 80, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: pauloText, start: 'top 80%', once: true }
    });
  }

  // Paulo stats counter animation
  document.querySelectorAll('.paulo-stat h4').forEach(stat => {
    const text = stat.textContent;
    const match = text.match(/^([\d.,]+)(.*)/);
    if (match) {
      const endVal = parseFloat(match[1].replace('.', '').replace(',', '.'));
      const suffix = match[2];
      const displayOriginal = match[1];
      const obj = { val: 0 };

      gsap.to(obj, {
        val: endVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: stat, start: 'top 90%', once: true },
        onUpdate: () => {
          if (endVal >= 1000) {
            stat.textContent = Math.floor(obj.val).toLocaleString('pt-BR') + suffix;
          } else {
            stat.textContent = Math.floor(obj.val) + suffix;
          }
        },
        onComplete: () => { stat.textContent = text; }
      });
    }
  });

  // ============ TRANSFORMATION SECTION ============
  const transformCard = document.querySelector('.transformation-card');
  if (transformCard) {
    gsap.from(transformCard, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: transformCard, start: 'top 80%', once: true }
    });
  }

  // ============ SEATS INDICATOR ============
  const seatsFill = document.querySelector('.seats-fill');
  if (seatsFill) {
    const targetWidth = seatsFill.style.width;
    seatsFill.style.width = '0%';
    gsap.to(seatsFill, {
      width: targetWidth,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: seatsFill, start: 'top 90%', once: true }
    });
  }

  // ============ VISUAL BREAK PARALLAX ============
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    gsap.to(parallaxBg, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.visual-break',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // ============ CTA SECTION ANIMATIONS ============
  const ctaSection = document.querySelector('.section-cta');
  if (ctaSection) {
    gsap.from('.cta-edition', {
      y: -20, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: ctaSection, start: 'top 70%', once: true }
    });
  }

  // ============ COUNTDOWN TIMER ============
  function updateCountdown() {
    const eventDate = new Date('2026-02-26T14:00:00-03:00');
    const now = new Date();
    const diff = eventDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    if (diff <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Update screen reader countdown every 60 seconds
  const countdownSR = document.getElementById('countdown-sr');
  function updateCountdownSR() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    if (countdownSR && daysEl) {
      countdownSR.textContent = `Faltam ${daysEl.textContent} dias e ${hoursEl.textContent} horas para o evento.`;
    }
  }
  updateCountdownSR();
  setInterval(updateCountdownSR, 60000);

  // ============ MAGNETIC BUTTONS ============
  // Only on non-touch devices
  if (!('ontouchstart' in window)) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
        gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  // ============ FAQ ACCORDION ============
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const toggle = button.querySelector('.faq-toggle');
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      // Close all others
      document.querySelectorAll('.faq-question').forEach(otherBtn => {
        if (otherBtn !== button) {
          const otherAnswer = otherBtn.nextElementSibling;
          const otherToggle = otherBtn.querySelector('.faq-toggle');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherToggle.textContent = '+';
          gsap.to(otherAnswer, { height: 0, duration: 0.4, ease: 'power2.inOut' });
        }
      });

      // Toggle current
      if (isOpen) {
        button.setAttribute('aria-expanded', 'false');
        toggle.textContent = '+';
        gsap.to(answer, { height: 0, duration: 0.4, ease: 'power2.inOut' });
      } else {
        button.setAttribute('aria-expanded', 'true');
        toggle.textContent = '\u2212';
        gsap.set(answer, { height: 'auto' });
        const targetHeight = answer.offsetHeight;
        gsap.from(answer, { height: 0, duration: 0.4, ease: 'power2.inOut' });

        // Track FAQ open
        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({ event: 'faq_open', question: button.textContent.trim().replace(/[+−]$/, '').trim() });
        }
      }
    });
  });

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // ============ MOBILE MENU (with focus trap) ============
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = menuToggle.classList.contains('active');
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', !isActive);
      document.body.style.overflow = isActive ? '' : 'hidden';
      // Focus first link when opening
      if (!isActive) {
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) setTimeout(() => firstLink.focus(), 100);
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });

    // Focus trap for mobile menu
    mobileMenu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = mobileMenu.querySelectorAll('a, button');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // ============ FORM POPUP ============
  const formPopup = document.getElementById('formPopup');
  const formPopupClose = formPopup ? formPopup.querySelector('.form-popup-close') : null;
  const formPopupOverlay = formPopup ? formPopup.querySelector('.form-popup-overlay') : null;

  function openFormPopup(section) {
    if (!formPopup) return;
    formPopup.classList.add('active');
    formPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus first input
    const firstInput = formPopup.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 300);
    // Track
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({ event: 'form_popup_open', section: section || 'unknown' });
    }
  }

  function closeFormPopup() {
    if (!formPopup) return;
    formPopup.classList.remove('active');
    formPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open popup from any CTA button
  document.querySelectorAll('.open-form-popup').forEach(btn => {
    btn.addEventListener('click', () => {
      openFormPopup(btn.dataset.section);
    });
  });

  // Close popup
  if (formPopupClose) formPopupClose.addEventListener('click', closeFormPopup);
  if (formPopupOverlay) formPopupOverlay.addEventListener('click', closeFormPopup);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formPopup && formPopup.classList.contains('active')) {
      closeFormPopup();
    }
  });

  // ============ METHOD VIDEO — PLAY/PAUSE + SOUND TOGGLE ============
  const methodVideo = document.getElementById('methodVideo');
  const videoToggle = document.getElementById('videoPlayToggle');
  const soundToggle = document.getElementById('videoSoundToggle');

  if (methodVideo && videoToggle) {
    const iconPlay = videoToggle.querySelector('.icon-play');
    const iconPause = videoToggle.querySelector('.icon-pause');

    // Volume ready, NOT muted — play with sound on user click
    methodVideo.volume = 1;
    methodVideo.muted = false;

    function updateSoundUI() {
      if (!soundToggle) return;
      const iconSoundOff = soundToggle.querySelector('.icon-sound-off');
      const iconSoundOn = soundToggle.querySelector('.icon-sound-on');
      if (methodVideo.muted) {
        iconSoundOff.style.display = 'block';
        iconSoundOn.style.display = 'none';
        soundToggle.classList.remove('unmuted');
        soundToggle.setAttribute('aria-label', 'Ativar som');
      } else {
        iconSoundOff.style.display = 'none';
        iconSoundOn.style.display = 'block';
        soundToggle.classList.add('unmuted');
        soundToggle.setAttribute('aria-label', 'Desativar som');
      }
    }

    updateSoundUI();

    videoToggle.addEventListener('click', () => {
      if (methodVideo.paused) {
        // Try playing with sound first (user gesture allows it)
        methodVideo.muted = false;
        const playPromise = methodVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser blocks unmuted play, try muted
            methodVideo.muted = true;
            methodVideo.play();
            updateSoundUI();
          });
        }
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        videoToggle.classList.add('playing');
        videoToggle.setAttribute('aria-label', 'Pausar vídeo');
        updateSoundUI();
      } else {
        methodVideo.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        videoToggle.classList.remove('playing');
        videoToggle.setAttribute('aria-label', 'Reproduzir vídeo');
      }
    });

    // Also allow clicking on the video itself to toggle play/pause
    methodVideo.addEventListener('click', () => {
      videoToggle.click();
    });

    methodVideo.addEventListener('ended', () => {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      videoToggle.classList.remove('playing');
      videoToggle.setAttribute('aria-label', 'Reproduzir vídeo');
    });
  }

  // Sound toggle button
  if (methodVideo && soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      methodVideo.muted = !methodVideo.muted;
      const iconSoundOff = soundToggle.querySelector('.icon-sound-off');
      const iconSoundOn = soundToggle.querySelector('.icon-sound-on');
      if (methodVideo.muted) {
        iconSoundOff.style.display = 'block';
        iconSoundOn.style.display = 'none';
        soundToggle.classList.remove('unmuted');
        soundToggle.setAttribute('aria-label', 'Ativar som');
      } else {
        iconSoundOff.style.display = 'none';
        iconSoundOn.style.display = 'block';
        soundToggle.classList.add('unmuted');
        soundToggle.setAttribute('aria-label', 'Desativar som');
      }
    });
  }

  // ============ FORM HANDLING (with real-time validation) ============
  const captureForm = document.getElementById('captureForm');
  if (captureForm) {
    // Real-time validation
    const formInputs = captureForm.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim().length > 0 && input.checkValidity()) {
          input.classList.add('valid');
          input.classList.remove('invalid');
        } else if (input.value.trim().length > 0) {
          input.classList.remove('valid');
          input.classList.add('invalid');
        } else {
          input.classList.remove('valid', 'invalid');
        }
      });

      input.addEventListener('focus', () => {
        if (!captureForm.dataset.touched) {
          captureForm.dataset.touched = 'true';
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({ event: 'form_start', form_type: 'capture' });
          }
        }
      });
    });

    captureForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      let valid = true;
      formInputs.forEach(input => {
        if (!input.value.trim() || !input.checkValidity()) {
          input.classList.add('invalid');
          valid = false;
        }
      });
      if (!valid) return;

      const name = captureForm.querySelector('#capture-name').value;
      const phone = captureForm.querySelector('#capture-phone').value;
      const email = captureForm.querySelector('#capture-email').value;

      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          event: 'form_submit',
          form_type: 'capture',
          lead_name: name,
          lead_phone: phone,
          lead_email: email
        });
      }

      // Show success state
      captureForm.style.display = 'none';
      const popupDesc = document.querySelector('.form-popup-desc');
      if (popupDesc) popupDesc.style.display = 'none';
      const formSuccess = document.getElementById('formSuccess');
      if (formSuccess) formSuccess.style.display = 'block';

      captureForm.dataset.submitted = 'true';
    });

    // Form abandonment tracking
    window.addEventListener('beforeunload', () => {
      if (captureForm.dataset.touched && !captureForm.dataset.submitted) {
        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({ event: 'form_abandonment', form_type: 'capture' });
        }
      }
    });
  }

  // ============ CTA CLICK TRACKING ============
  document.querySelectorAll('.btn-primary, .navbar-cta').forEach(cta => {
    cta.addEventListener('click', () => {
      const section = cta.closest('section');
      const location = section ? (section.id || section.className.split(' ')[0]) : 'navbar';

      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'cta_click', cta_location: location });
      }
    });
  });

  // ============ SCROLL DEPTH TRACKING ============
  const scrollMilestones = [25, 50, 75, 100];
  const trackedMilestones = new Set();

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const percent = Math.round(self.progress * 100);
      scrollMilestones.forEach(milestone => {
        if (percent >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({ event: `scroll_${milestone}` });
          }
        }
      });
    }
  });

  // ============ LOCAL SECTION ANIMATION ============
  const localInfo = document.querySelector('.local-info');
  const localMap = document.querySelector('.local-map');
  if (localInfo) {
    gsap.from(localInfo, {
      x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: localInfo, start: 'top 80%', once: true }
    });
  }
  if (localMap) {
    gsap.from(localMap, {
      x: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: localMap, start: 'top 80%', once: true }
    });
  }

  // ============ STACK VALUE ANIMATION ============
  const stackItems = document.querySelectorAll('.stack-item');
  if (stackItems.length) {
    gsap.from(stackItems, {
      x: -30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.stack-card', start: 'top 80%', once: true }
    });
  }

  const stackTotal = document.querySelector('.stack-total');
  if (stackTotal) {
    gsap.from(stackTotal, {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: stackTotal, start: 'top 90%', once: true }
    });
  }

  // ============ CUSTOM CURSOR (desktop only) ============
  const cursor = document.getElementById('customCursor');
  const cursorDot = document.getElementById('customCursorDot');

  if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows immediately
      gsap.set(cursorDot, { x: mouseX, y: mouseY });
    });

    // Smooth follow for outer ring
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    // Hover state on interactive elements
    document.querySelectorAll('a, button, input, .glass-card, .faq-question, .video-wrapper').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Click state
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
  }

  // ============ LIVE VIEWERS (Social Proof) ============
  const liveViewers = document.getElementById('liveViewers');
  const viewerCount = document.getElementById('viewerCount');

  if (liveViewers && viewerCount) {
    // Show after 3 seconds
    setTimeout(() => {
      liveViewers.classList.add('visible');
    }, 3000);

    // Simulate realistic fluctuation
    setInterval(() => {
      const current = parseInt(viewerCount.textContent);
      const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
      const newVal = Math.max(89, Math.min(167, current + change));
      viewerCount.textContent = newVal;
    }, 4000);
  }

  // ============ CTA POPUP TRACKING ============
  // (Tracked via openFormPopup function above)

  // ============ TIME-ON-SECTION TRACKING ============
  const trackedSections = document.querySelectorAll('section[id]');
  const sectionTimers = {};

  trackedSections.forEach(section => {
    const id = section.id;
    sectionTimers[id] = { total: 0, entered: null };

    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => { sectionTimers[id].entered = Date.now(); },
      onEnterBack: () => { sectionTimers[id].entered = Date.now(); },
      onLeave: () => {
        if (sectionTimers[id].entered) {
          sectionTimers[id].total += Date.now() - sectionTimers[id].entered;
          sectionTimers[id].entered = null;
        }
      },
      onLeaveBack: () => {
        if (sectionTimers[id].entered) {
          sectionTimers[id].total += Date.now() - sectionTimers[id].entered;
          sectionTimers[id].entered = null;
        }
      }
    });
  });

  // Send time-on-section data when user leaves page
  window.addEventListener('beforeunload', () => {
    // Flush active timers
    Object.keys(sectionTimers).forEach(id => {
      if (sectionTimers[id].entered) {
        sectionTimers[id].total += Date.now() - sectionTimers[id].entered;
      }
    });

    if (typeof dataLayer !== 'undefined') {
      const sectionData = {};
      Object.keys(sectionTimers).forEach(id => {
        if (sectionTimers[id].total > 0) {
          sectionData[id] = Math.round(sectionTimers[id].total / 1000);
        }
      });
      dataLayer.push({ event: 'time_on_sections', sections: sectionData });
    }
  });

}); // End DOMContentLoaded
