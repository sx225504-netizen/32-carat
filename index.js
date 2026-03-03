/* ============================================================
   32 CARAT DENTAL HOSPITAL — Interactions & UI Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL EFFECT ──
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  
  const handleScroll = () => {
    const scrolled = window.scrollY > 60;
    navbar.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── BACK TO TOP ──
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── SCROLL-TRIGGERED ANIMATIONS ──
  const animateElements = document.querySelectorAll('[data-animate]');
  
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for siblings
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.querySelectorAll('[data-animate]'));
        const index = siblings.indexOf(entry.target);
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        
        animateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach(el => animateObserver.observe(el));

  // ── COUNTER ANIMATION ──
  const statValues = document.querySelectorAll('.stat-card__value[data-count]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      const current = eased * target;
      
      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current).toLocaleString() + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString() + '+';
        }
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // ── CONTACT FORM HANDLING ──
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const originalText = btn.textContent;
    
    // Simulate submission
    btn.disabled = true;
    btn.textContent = 'Sending…';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
      // Show success state
      contactForm.innerHTML = `
        <div class="form-success">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <h3>Appointment Request Sent</h3>
          <p>Thank you! Our team will reach out to you shortly to confirm your appointment.</p>
        </div>
      `;
    }, 1200);
  });

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── PARALLAX SUBTLE EFFECT ON HERO ──
  const hero = document.querySelector('.hero__bg img');
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          hero.style.transform = `scale(${1.05 + scrolled * 0.0001})`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

});
