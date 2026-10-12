/* ==========================================================================
   EDS — animations.js
   Scroll reveal, animated counters, gentle parallax, magnetic buttons.
   All observers are cleaned up automatically once triggered (perf-friendly).
   ========================================================================== */

(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollReveal(){
    const targets = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .timeline-line');
    if(!targets.length) return;

    if(reduceMotion || !('IntersectionObserver' in window)){
      targets.forEach(function(t){ t.classList.add('in'); });
      return;
    }

    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.18, rootMargin:'0px 0px -60px 0px' });

    targets.forEach(function(t){ io.observe(t); });
  }

  function animateCount(el, target, duration){
    const start = performance.now();
    const suffix = el.getAttribute('data-suffix') || '';
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters(){
    const counters = document.querySelectorAll('[data-count]');
    if(!counters.length) return;

    if(reduceMotion || !('IntersectionObserver' in window)){
      counters.forEach(function(el){
        el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
      });
      return;
    }

    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          const target = parseInt(entry.target.getAttribute('data-count'), 10) || 0;
          animateCount(entry.target, target, 1400);
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.5 });

    counters.forEach(function(el){ io.observe(el); });
  }

  function initParallax(){
    if(reduceMotion) return;
    const layers = document.querySelectorAll('[data-parallax]');
    if(!layers.length) return;
    let ticking = false;

    function update(){
      const vh = window.innerHeight;
      layers.forEach(function(el){
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = 'translateY(' + (center * -speed * -1) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }, { passive:true });
    update();
  }

  function initMagnetic(){
    if(reduceMotion || matchMedia('(hover: hover)').matches === false) return;
    document.querySelectorAll('.magnetic').forEach(function(wrap){
      const inner = wrap.firstElementChild;
      if(!inner) return;
      wrap.addEventListener('mousemove', function(e){
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) * 0.28;
        const y = (e.clientY - r.top - r.height/2) * 0.35;
        inner.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      wrap.addEventListener('mouseleave', function(){
        inner.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---- Section headings: eyebrow → heading → description, staggered ---- */
  function initHeadingReveal(){
    const heads = document.querySelectorAll('.section-head');
    if(!heads.length) return;

    if(reduceMotion || !('IntersectionObserver' in window)){
      heads.forEach(function(h){ h.classList.add('reveal-head', 'in'); });
      return;
    }

    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.4, rootMargin:'0px 0px -40px 0px' });

    heads.forEach(function(h){
      h.classList.add('reveal-head');
      io.observe(h);
    });
  }

  /* ---- Masked image reveal for large editorial images ---- */
  function initClipReveal(){
    const targets = document.querySelectorAll(
      '.hero-frame, .story-teaser-media, .video-frame, .journal-photo'
    );
    if(!targets.length) return;

    if(reduceMotion || !('IntersectionObserver' in window)){
      targets.forEach(function(t){ t.classList.add('clip-reveal', 'in'); });
      return;
    }

    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.2 });

    targets.forEach(function(t){
      t.classList.add('clip-reveal');
      io.observe(t);
    });
  }

  window.EDS = window.EDS || {};
  window.EDS.animations = { initScrollReveal: initScrollReveal, initCounters: initCounters };

  document.addEventListener('DOMContentLoaded', function(){
    initScrollReveal();
    initCounters();
    initParallax();
    initMagnetic();
    initHeadingReveal();
    initClipReveal();
  });
})();
