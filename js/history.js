/* ==========================================================================
   EDS — history.js
   Drives the About page "initiative history" section: the connecting line
   fills progressively as the visitor scrolls, and each chapter lights up
   as it becomes the active one (previous chapters stay subtly visible).
   ========================================================================== */

(function(){
  function init(){
    const track = document.querySelector('.history-track');
    if(!track) return;
    const fill = track.querySelector('.history-line-fill');
    const chapters = Array.from(track.querySelectorAll('.history-chapter'));
    if(!chapters.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function markPassedAndActive(activeIdx){
      chapters.forEach(function(ch, i){
        ch.classList.toggle('is-active', i === activeIdx);
        ch.classList.toggle('is-passed', i < activeIdx);
      });
    }

    function updateFill(activeIdx){
      if(!fill) return;
      const last = chapters[chapters.length - 1];
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const target = chapters[activeIdx];
      const targetMid = target.getBoundingClientRect().top + window.scrollY - trackTop
        + target.querySelector('.history-marker-wrap').offsetHeight / 2;
      const trackHeight = track.offsetHeight;
      const pct = Math.min(100, Math.max(0, (targetMid / trackHeight) * 100));
      fill.style.height = pct + '%';
    }

    if(reduceMotion || !('IntersectionObserver' in window)){
      chapters.forEach(function(ch, i){ ch.classList.add(i === 0 ? 'is-active' : 'is-passed'); });
      if(fill) fill.style.height = '100%';
      return;
    }

    const io = new IntersectionObserver(function(entries){
      let activeIdx = null;
      entries.forEach(function(entry){
        const idx = chapters.indexOf(entry.target);
        if(entry.isIntersecting) activeIdx = idx;
      });
      if(activeIdx === null) return;
      markPassedAndActive(activeIdx);
      updateFill(activeIdx);
    }, { threshold:0.5, rootMargin:'-15% 0px -15% 0px' });

    chapters.forEach(function(ch){ io.observe(ch); });

    // Initialize state on load
    markPassedAndActive(0);
    window.requestAnimationFrame(function(){ updateFill(0); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
