/* ==========================================================================
   EDS — navigation.js
   Mobile hamburger menu, scroll-aware navbar, active nav link.
   ========================================================================== */

(function(){
  function initNavbarScroll(){
    const nav = document.querySelector('.site-nav');
    if(!nav) return;
    const onScroll = function(){
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
  }

  function initMobileMenu(){
    const toggle = document.querySelector('.hamburger');
    const menu = document.querySelector('.mobile-menu');
    if(!toggle || !menu) return;

    function close(){
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }
    function open(){
      toggle.classList.add('open');
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded','true');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function(){
      toggle.classList.contains('open') ? close() : open();
    });
    menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', close); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') close();
    });
  }

  function initActiveLink(){
    const path = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a){
      const href = (a.getAttribute('href') || '').split('?')[0];
      if(href === path || (path === '' && href === 'index.html')){
        a.classList.add('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initNavbarScroll();
    initMobileMenu();
    initActiveLink();
  });
})();
