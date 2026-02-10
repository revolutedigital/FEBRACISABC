// ==========================================
// IF — Inteligência Financeira
// Febracis ABC Paulista
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

  gsap.registerPlugin(ScrollTrigger);

  const mobileAnim = window.matchMedia('(max-width: 768px)').matches;

  // ============ PROGRESS BAR ============
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

  // ============ HERO TEXT REVEAL ============
  const heroLines = document.querySelectorAll('.hero h1 .reveal-line');
  if (heroLines.length) {
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl.from(heroLines, {
      y: 80, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.2, stagger: 0.15, ease: 'power4.out'
    });
    heroTl.from('.hero-logo-badge', {
      y: -20, opacity: 0, duration: 0.6, ease: 'power3.out'
    }, '-=0.8');
    heroTl.from('.hero-sub', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.3');
    heroTl.from('.hero-cta-group', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.3');
  }

  // ============ COUNTER ANIMATION ============
  document.querySelectorAll('.proof-item h3').forEach(counter => {
    const text = counter.textContent;
    const match = text.match(/^([\d.]+)(.*)/);
    if (match) {
      const endVal = parseFloat(match[1]);
      const suffix = match[2];
      const obj = { val: 0 };

      gsap.to(obj, {
        val: endVal, duration: 2.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.social-proof-bar', start: 'top 85%', once: true },
        onUpdate: () => {
          counter.textContent = (endVal >= 10 ? Math.floor(obj.val) : obj.val.toFixed(1)) + suffix;
        },
        onComplete: () => { counter.textContent = text; }
      });
    }
  });

  // ============ STAGGERED CARD REVEALS ============
  ['.pain-grid', '.pillars-grid', '.tools-grid', '.audience-grid'].forEach(selector => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    gsap.from(grid.children, {
      y: mobileAnim ? 30 : 60, opacity: 0,
      duration: mobileAnim ? 0.5 : 0.8,
      stagger: mobileAnim ? 0.06 : 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
    });
  });

  // ============ SECTION REVEALS ============
  document.querySelectorAll('.section-label').forEach(el => {
    gsap.from(el, { x: -30, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  document.querySelectorAll('.section-title').forEach(el => {
    gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  document.querySelectorAll('.section-desc').forEach(el => {
    gsap.from(el, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  // ============ METHOD SECTION ============
  const methodText = document.querySelector('.method-text');
  const methodVisual = document.querySelector('.method-visual');
  if (methodText) {
    gsap.from(methodText, {
      x: mobileAnim ? 0 : -60, y: mobileAnim ? 30 : 0, opacity: 0, duration: mobileAnim ? 0.6 : 1, ease: 'power3.out',
      scrollTrigger: { trigger: methodText, start: 'top 80%', once: true }
    });
  }
  if (methodVisual) {
    gsap.from(methodVisual, {
      x: mobileAnim ? 0 : 60, y: mobileAnim ? 30 : 0, opacity: 0, duration: mobileAnim ? 0.6 : 1, ease: 'power3.out',
      scrollTrigger: { trigger: methodVisual, start: 'top 80%', once: true }
    });
  }

  const bigNumber = document.querySelector('.big-number');
  if (bigNumber) {
    gsap.from(bigNumber, {
      scale: 0.5, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)',
      scrollTrigger: { trigger: bigNumber, start: 'top 85%', once: true }
    });
  }

  // ============ VISUAL BREAK ============
  const visualBreak = document.querySelector('.visual-break blockquote');
  if (visualBreak) {
    gsap.from(visualBreak, {
      y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.visual-break', start: 'top 70%', once: true }
    });
  }

  // ============ CTA BADGE ============
  const ctaBadge = document.querySelector('.cta-badge');
  if (ctaBadge) {
    gsap.from(ctaBadge, {
      y: -20, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: ctaBadge, start: 'top 80%', once: true }
    });
  }

  // ============ LOCAL SECTION ============
  const localInfo = document.querySelector('.local-info');
  const localMap = document.querySelector('.local-map');
  if (localInfo) {
    gsap.from(localInfo, {
      x: mobileAnim ? 0 : -60, y: mobileAnim ? 30 : 0, opacity: 0, duration: mobileAnim ? 0.6 : 1, ease: 'power3.out',
      scrollTrigger: { trigger: localInfo, start: 'top 80%', once: true }
    });
  }
  if (localMap) {
    gsap.from(localMap, {
      x: mobileAnim ? 0 : 60, y: mobileAnim ? 30 : 0, opacity: 0, duration: mobileAnim ? 0.6 : 1, ease: 'power3.out',
      scrollTrigger: { trigger: localMap, start: 'top 80%', once: true }
    });
  }

  // ============ MAGNETIC BUTTONS (desktop) ============
  const isMobile = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window);
  if (!isMobile) {
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

      document.querySelectorAll('.faq-question').forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.querySelector('.faq-toggle').textContent = '+';
          gsap.to(otherBtn.nextElementSibling, { height: 0, duration: 0.4, ease: 'power2.inOut' });
        }
      });

      if (isOpen) {
        button.setAttribute('aria-expanded', 'false');
        toggle.textContent = '+';
        gsap.to(answer, { height: 0, duration: 0.4, ease: 'power2.inOut' });
      } else {
        button.setAttribute('aria-expanded', 'true');
        toggle.textContent = '\u2212';
        gsap.set(answer, { height: 'auto' });
        gsap.from(answer, { height: 0, duration: 0.4, ease: 'power2.inOut' });
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
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 20, behavior: 'smooth' });
      }
    });
  });

  // ============ FORM POPUP ============
  const formPopup = document.getElementById('formPopup');
  const formPopupClose = formPopup ? formPopup.querySelector('.form-popup-close') : null;
  const formPopupOverlay = formPopup ? formPopup.querySelector('.form-popup-overlay') : null;

  function openFormPopup(section) {
    if (!formPopup) return;
    formPopup.classList.add('active');
    formPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = formPopup.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 300);
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({ event: 'form_popup_open', section: section || 'unknown', page: 'if' });
    }
  }

  function closeFormPopup() {
    if (!formPopup) return;
    formPopup.classList.remove('active');
    formPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-form-popup').forEach(btn => {
    btn.addEventListener('click', () => openFormPopup(btn.dataset.section));
  });

  if (formPopupClose) formPopupClose.addEventListener('click', closeFormPopup);
  if (formPopupOverlay) formPopupOverlay.addEventListener('click', closeFormPopup);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formPopup && formPopup.classList.contains('active')) closeFormPopup();
  });

  // ============ FORM HANDLING ============
  const captureForm = document.getElementById('captureForm');
  if (captureForm) {
    const formInputs = captureForm.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim().length > 0 && input.checkValidity()) {
          input.classList.add('valid'); input.classList.remove('invalid');
        } else if (input.value.trim().length > 0) {
          input.classList.remove('valid'); input.classList.add('invalid');
        } else {
          input.classList.remove('valid', 'invalid');
        }
      });
      input.addEventListener('focus', () => {
        if (!captureForm.dataset.touched) {
          captureForm.dataset.touched = 'true';
          if (typeof dataLayer !== 'undefined') dataLayer.push({ event: 'form_start', form_type: 'if_capture' });
        }
      });
    });

    captureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      formInputs.forEach(input => {
        if (input.required && (!input.value.trim() || !input.checkValidity())) {
          input.classList.add('invalid'); valid = false;
        }
      });
      if (!valid) return;

      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          event: 'form_submit', form_type: 'if_capture',
          lead_name: captureForm.querySelector('#capture-name').value,
          lead_phone: captureForm.querySelector('#capture-phone').value,
          lead_email: captureForm.querySelector('#capture-email').value
        });
      }

      captureForm.style.display = 'none';
      const popupDesc = document.querySelector('.form-popup-desc');
      if (popupDesc) popupDesc.style.display = 'none';
      const formSuccess = document.getElementById('formSuccess');
      if (formSuccess) formSuccess.style.display = 'block';
      captureForm.dataset.submitted = 'true';
    });

    window.addEventListener('beforeunload', () => {
      if (captureForm.dataset.touched && !captureForm.dataset.submitted) {
        if (typeof dataLayer !== 'undefined') dataLayer.push({ event: 'form_abandonment', form_type: 'if_capture' });
      }
    });
  }

  // ============ CTA CLICK TRACKING ============
  document.querySelectorAll('.btn-primary').forEach(cta => {
    cta.addEventListener('click', () => {
      const section = cta.closest('section');
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'cta_click', cta_location: section ? (section.id || section.className.split(' ')[0]) : 'topbar', page: 'if' });
      }
    });
  });

  // ============ SCROLL DEPTH TRACKING ============
  const trackedMilestones = new Set();
  ScrollTrigger.create({
    trigger: document.documentElement, start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => {
      const percent = Math.round(self.progress * 100);
      [25, 50, 75, 100].forEach(m => {
        if (percent >= m && !trackedMilestones.has(m)) {
          trackedMilestones.add(m);
          if (typeof dataLayer !== 'undefined') dataLayer.push({ event: `scroll_${m}`, page: 'if' });
        }
      });
    }
  });

  // ============ TIME-ON-SECTION TRACKING ============
  const sectionTimers = {};
  document.querySelectorAll('section[id]').forEach(section => {
    const id = section.id;
    sectionTimers[id] = { total: 0, entered: null };
    ScrollTrigger.create({
      trigger: section, start: 'top 60%', end: 'bottom 40%',
      onEnter: () => { sectionTimers[id].entered = Date.now(); },
      onEnterBack: () => { sectionTimers[id].entered = Date.now(); },
      onLeave: () => { if (sectionTimers[id].entered) { sectionTimers[id].total += Date.now() - sectionTimers[id].entered; sectionTimers[id].entered = null; } },
      onLeaveBack: () => { if (sectionTimers[id].entered) { sectionTimers[id].total += Date.now() - sectionTimers[id].entered; sectionTimers[id].entered = null; } }
    });
  });

  window.addEventListener('beforeunload', () => {
    Object.keys(sectionTimers).forEach(id => {
      if (sectionTimers[id].entered) sectionTimers[id].total += Date.now() - sectionTimers[id].entered;
    });
    if (typeof dataLayer !== 'undefined') {
      const data = {};
      Object.keys(sectionTimers).forEach(id => { if (sectionTimers[id].total > 0) data[id] = Math.round(sectionTimers[id].total / 1000); });
      dataLayer.push({ event: 'time_on_sections', sections: data, page: 'if' });
    }
  });

}); // End DOMContentLoaded
