/* ==========================================================================
   EDS — cursor.js
   A small custom cursor (dot + lagging ring) for hover-capable, fine-pointer
   devices only. Falls back to the native cursor everywhere else, and is
   fully disabled under prefers-reduced-motion.
   ========================================================================== */

(function(){
  const canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!canHover || reduceMotion) return;

  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('has-custom-cursor');

    const dot = document.createElement('div');
    dot.className = 'cursor-dot is-hidden';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring is-hidden';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    });
    document.addEventListener('mouseleave', function(){
      dot.classList.add('is-hidden'); ring.classList.add('is-hidden');
    });

    function loop(){
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    const hoverTargets = 'a, button, input, textarea, select, .quiz-option, [role="button"], .carousel-slide, .gallery-item';
    document.addEventListener('mouseover', function(e){
      if(e.target.closest(hoverTargets)) ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', function(e){
      if(e.target.closest(hoverTargets)) ring.classList.remove('is-hover');
    });
  });
})();
