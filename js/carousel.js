/* ==========================================================================
   EDS — carousel.js
   Renders a scroll-snap image carousel of the five courses, used on the
   homepage and courses.html. Reads from data/courses.js.
   ========================================================================== */

(function(){
  function currentLang(){ return (window.EDS && EDS.language) ? EDS.language.getLang() : 'en'; }

  function initCarousel(root){
    const track = root.querySelector('.carousel-track');
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');
    const dotsWrap = root.querySelector('.carousel-dots');
    const courses = window.EDS_COURSES || [];
    let autoplayTimer = null;

    function render(){
      const lang = currentLang();
      track.innerHTML = courses.map(function(c){
        return (
          '<a class="carousel-slide" href="course-details.html?id=' + c.id + '">' +
            '<div class="carousel-photo">' +
              '<img src="assets/images/courses/' + c.image + '" alt="' + c.title[lang].replace(/"/g,'&quot;') + '" data-fallback="course" loading="lazy">' +
              '<span class="carousel-photo-icon" style="background:' + c.gradient + '" data-icon="' + c.icon + '"></span>' +
            '</div>' +
            '<div class="carousel-caption">' +
              '<h3>' + c.title[lang] + '</h3>' +
              '<p>' + c.summary[lang] + '</p>' +
              '<span class="story-readmore">' + (lang==='ar' ? 'اعرفي المزيد \u2190' : 'Learn more \u2192') + '</span>' +
            '</div>' +
          '</a>'
        );
      }).join('');

      dotsWrap.innerHTML = courses.map(function(_, i){
        return '<button class="carousel-dot' + (i===0 ? ' active' : '') + '" data-i="' + i + '" aria-label="' + (lang==='ar' ? ('الشريحة ' + (i+1)) : ('Slide ' + (i+1))) + '"></button>';
      }).join('');

      track.querySelectorAll('[data-icon]').forEach(function(el){
        el.innerHTML = EDS.renderIcon(el.getAttribute('data-icon'));
      });
      wireDots();
      if(window.EDS && EDS.animations) EDS.animations.initScrollReveal();
    }

    function slideWidth(){
      const slide = track.querySelector('.carousel-slide');
      return slide ? slide.getBoundingClientRect().width + 20 : 320;
    }

    function goTo(i){
      track.scrollTo({ left: i * slideWidth(), behavior:'smooth' });
    }

    function activeIndex(){
      return Math.round(track.scrollLeft / slideWidth());
    }

    function updateDots(){
      const i = activeIndex();
      dotsWrap.querySelectorAll('.carousel-dot').forEach(function(d, idx){
        d.classList.toggle('active', idx === i);
      });
    }

    function wireDots(){
      dotsWrap.querySelectorAll('.carousel-dot').forEach(function(d){
        d.addEventListener('click', function(){ goTo(parseInt(d.getAttribute('data-i'),10)); });
      });
    }

    if(prevBtn) prevBtn.addEventListener('click', function(){ goTo(Math.max(0, activeIndex() - 1)); });
    if(nextBtn) nextBtn.addEventListener('click', function(){ goTo(Math.min(courses.length - 1, activeIndex() + 1)); });

    track.addEventListener('scroll', function(){
      window.requestAnimationFrame(updateDots);
    }, { passive:true });

    function startAutoplay(){
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stopAutoplay();
      autoplayTimer = setInterval(function(){
        const next = (activeIndex() + 1) % courses.length;
        goTo(next);
      }, 4500);
    }
    function stopAutoplay(){ if(autoplayTimer) clearInterval(autoplayTimer); }

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('touchstart', stopAutoplay, { passive:true });

    render();
    startAutoplay();
    document.addEventListener('eds:langchange', render);
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.course-carousel').forEach(initCarousel);
  });
})();
