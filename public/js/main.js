document.addEventListener('DOMContentLoaded', () => {

  /* === Custom Cursor === */
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const excludeElements = document.querySelectorAll('a, button, .brutal-button, .glitch-hover, .brutal-list-item');

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: 'power2.out'
    });
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1
    });
  });

  // Cursor state for interactive elements
  excludeElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.background = 'rgba(250,38,160, 0.25)';
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.border = '2px solid var(--primary)';
    });
    element.addEventListener('mouseleave', () => {
      cursor.style.background = 'rgba(250,38,160, 0.12)';
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.border = '3px solid var(--primary)';
    });
  });

  /* === Mobile Menu Toggle === */
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.brutal-nav-links');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('open');
    navLinks.classList.toggle('show');
    if (navLinks.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu after click link
  document.querySelectorAll('.brutal-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('open');
      navLinks.classList.remove('show');
      document.body.style.overflow = '';
    });
  });


  /* === Stagger Animation on Scroll === */
  function onScrollAppear(selector, visibleClass, delay = 120, extra = 0) {
    const items = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(visibleClass);
          }, extra + idx * delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    items.forEach(item => observer.observe(item));
  }
  onScrollAppear('.stagger-item', 'visible', 120);
  onScrollAppear('.stagger-item-pop', 'visible', 160, 500);


  /* === Glitch Effect on Header === */
  const glitchTitle = document.querySelector('.glitch-title');
  if (glitchTitle) {
    glitchTitle.addEventListener('mouseover', () => {
      glitchTitle.style.animation = 'none';
      setTimeout(() => {
        glitchTitle.style.animation = 'glitch 1.2s infinite alternate-reverse';
      }, 10);
    });
    glitchTitle.addEventListener('click', () => {
      glitchTitle.style.animation = 'none';
      setTimeout(() => {
        glitchTitle.style.animation = 'glitch 0.2s infinite alternate-reverse';
        setTimeout(() => {
          glitchTitle.style.animation = 'glitch 1.2s infinite alternate-reverse';
        }, 1000);
      }, 10);
    });
  }

  /* === Button Brutalist Effects === */
  const brutalButtons = document.querySelectorAll('.brutal-button');
  brutalButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-4px)';
      button.style.boxShadow = '0 7px var(--brutal-4)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 3px var(--brutal-4)';
    });
    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(2px)';
      button.style.boxShadow = '0 1px var(--brutal-4)';
    });
    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-4px)';
      button.style.boxShadow = '0 7px var(--brutal-4)';
    });
  });

  /* === Footer Glitch Effect === */
  const footerGlitch = document.querySelector('.footer-glitch');
  if (footerGlitch) {
    footerGlitch.addEventListener('mouseover', () => {
      const randomColor = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
      footerGlitch.style.color = randomColor;
    });
    footerGlitch.addEventListener('mouseout', () => {
      footerGlitch.style.color = 'var(--brutal-3)';
    });
  }

  /* === Random Logo Animation === */
  const brutalBrand = document.querySelector('.brutal-brand');
  if (brutalBrand) {
    brutalBrand.addEventListener('click', () => {
      brutalBrand.style.transition = 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)';
      brutalBrand.style.transform = 'rotate(360deg) scale(1.2)';
      setTimeout(() => {
        brutalBrand.style.transition = 'transform 0.3s';
        brutalBrand.style.transform = 'rotate(0) scale(1)';
      }, 500);
    });
  }

  /* === Prevent mobile hover issues === */
  function watchForHover() {
    let lastTouchTime = 0;
    function enableHover() {
      if (new Date() - lastTouchTime < 500) return;
      document.body.classList.add('has-hover');
    }
    function disableHover() {
      document.body.classList.remove('has-hover');
    }
    function updateLastTouchTime() {
      lastTouchTime = new Date();
    }
    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', function() {
      disableHover();
      setTimeout(enableHover, 500);
    }, true);
    enableHover();
  }
  watchForHover();

  /* === Typewriter reset when visible on scroll (for effect) === */
  const tagline = document.querySelector('.typewriter');
  if(tagline) {
    let animated = false;
    const taglineObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !animated) {          tagline.style.animation = 'none';
          // Force reflow
          void tagline.offsetWidth;
          tagline.style.animation = 'typing 3.5s steps(30, end) 1, blink-cursor 1s step-end infinite alternate';
          animated = true;
        }
      });
    }, {threshold: 0.6});
    taglineObserver.observe(tagline);
  }

  const postNavButtons = document.querySelectorAll('.brutal-post-nav-item');
  postNavButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-6px)';
      btn.style.boxShadow = '0 12px 0 0 var(--brutal-5)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0)';
      btn.style.boxShadow = '0 6px 0 0 var(--brutal-4)';
    });
  });

}); // End of DOMContentLoaded

         

