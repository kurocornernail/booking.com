/* ========================================
   Kuro Corner Nail — Main JavaScript
   Features: Loader, Nav, Carousel,
   Lightbox, Language Toggle, CRT,
   Scroll Animations, Touch/Swipe
   ======================================== */

(function() {
  'use strict';

  // === State ===
  let currentLang = 'vi';
  let currentSlide = 0;
  const totalSlides = 7;
  let lightboxImages = [];
  let lightboxIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // === DOM Ready ===
  document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initNav();
    initCarousel();
    initLightbox();
    initLanguageToggle();
    initScrollAnimations();
    initParticles();
    initTouchSwipe();
  });

  // === Loader ===
  function initLoader() {
    const loader = document.getElementById('loader');
    const fill = document.getElementById('loaderFill');
    let progress = 0;

    const interval = setInterval(function() {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        fill.style.width = '100%';
        clearInterval(interval);
        setTimeout(function() {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
        }, 400);
      } else {
        fill.style.width = progress + '%';
      }
    }, 200);
  }

  // === Navigation ===
  function initNav() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');

    // Scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Hamburger toggle
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on overlay click (create overlay)
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.id = 'mobileOverlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', function() {
      overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        overlay.classList.remove('open');
      });
    });
  }

  // === Carousel ===
  function initCarousel() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-slide', i);
      dot.setAttribute('aria-label', 'Collection ' + (i + 1));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      slides.forEach(function(slide) { slide.classList.remove('active'); });
      tabs.forEach(function(tab) { tab.classList.remove('active'); });
      dots.forEach(function(dot) { dot.classList.remove('active'); });

      slides[index].classList.add('active');
      tabs[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    // Tab clicks
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        goToSlide(parseInt(this.getAttribute('data-collection')));
      });
    });

    // Dot clicks
    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.getAttribute('data-slide')));
      });
    });

    // Prev/Next
    prevBtn.addEventListener('click', function() {
      goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function() {
      goToSlide(currentSlide + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });
  }

  // === Lightbox ===
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    // Collect all gallery items with images
    function updateLightboxImages() {
      lightboxImages = [];
      const activeSlide = document.querySelector('.gallery-slide.active');
      if (activeSlide) {
        const items = activeSlide.querySelectorAll('.gallery-item[data-src]');
        items.forEach(function(item) {
          lightboxImages.push(item.getAttribute('data-src'));
        });
      }
    }

    // Click on gallery item
    document.querySelectorAll('.gallery-item[data-src]').forEach(function(item) {
      item.addEventListener('click', function() {
        updateLightboxImages();
        lightboxIndex = lightboxImages.indexOf(this.getAttribute('data-src'));
        if (lightboxIndex === -1) lightboxIndex = 0;
        lightboxImg.src = lightboxImages[lightboxIndex];
        lightboxImg.alt = 'Gallery image ' + (lightboxIndex + 1);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      lightboxImg.src = lightboxImages[lightboxIndex];
    });

    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
      lightboxImg.src = lightboxImages[lightboxIndex];
    });

    // Keyboard
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        lightboxImg.src = lightboxImages[lightboxIndex];
      }
      if (e.key === 'ArrowRight') {
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        lightboxImg.src = lightboxImages[lightboxIndex];
      }
    });

    // Touch swipe for lightbox
    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        } else {
          lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        }
        lightboxImg.src = lightboxImages[lightboxIndex];
      }
    }, { passive: true });
  }

  // === Language Toggle ===
  function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    const toggleMobile = document.getElementById('langToggleMobile');

    function switchLang(lang) {
      currentLang = lang;
      const attr = 'data-' + lang;

      document.querySelectorAll('[data-vi][data-en]').forEach(function(el) {
        const text = el.getAttribute(attr);
        if (text) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
          } else {
            el.textContent = text;
          }
        }
      });

      toggle.textContent = lang === 'vi' ? 'EN' : 'VI';
      if (toggleMobile) toggleMobile.textContent = lang === 'vi' ? 'EN' : 'VI';

      document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
    }

    toggle.addEventListener('click', function() {
      switchLang(currentLang === 'vi' ? 'en' : 'vi');
    });

    if (toggleMobile) {
      toggleMobile.addEventListener('click', function() {
        switchLang(currentLang === 'vi' ? 'en' : 'vi');
      });
    }
  }

  // === Scroll Animations ===
  function initScrollAnimations() {
    const elements = document.querySelectorAll(
      '.about-header, .about-grid, .gallery-header, .gallery-tabs, .gallery-slide, .contact-header, .contact-card, .footer-content'
    );

    elements.forEach(function(el) {
      el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // === Particles ===
  function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      container.appendChild(particle);
    }
  }

  // === Touch Swipe for Carousel ===
  function initTouchSwipe() {
    const carousel = document.getElementById('galleryCarousel');
    if (!carousel) return;

    carousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        const tabs = document.querySelectorAll('.gallery-tab');
        if (diff > 0) {
          // Swipe left → next
          const next = (currentSlide + 1) % totalSlides;
          tabs[next].click();
        } else {
          // Swipe right → prev
          const prev = (currentSlide - 1 + totalSlides) % totalSlides;
          tabs[prev].click();
        }
      }
    }, { passive: true });
  }

})();
