/* ==========================================================================
   EDS — quiz.js
   Drives quiz.html using data/courses.js + data/quizzes.js.
   URL: quiz.html?course=<course-id>
   ========================================================================== */

(function(){
  function currentLang(){ return (window.EDS && EDS.language) ? EDS.language.getLang() : 'en'; }

  function init(){
    const root = document.getElementById('quiz-root');
    if(!root) return;

    const courseId = EDS.getParam('course');
    const course = (window.EDS_COURSES || []).find(function(c){ return c.id === courseId; });
    const questions = (window.EDS_QUIZZES || {})[courseId];

    if(!course || !questions){
      root.innerHTML = '<div class="quiz-empty text-center">' +
        '<h2 data-en="Quiz not found" data-ar="لم يتم العثور على الاختبار">Quiz not found</h2>' +
        '<p class="lead" style="margin-inline:auto" data-en="This quiz link looks incorrect. Choose a course to try its quiz." data-ar="يبدو أن رابط الاختبار غير صحيح. اختاري مساقاً لتجربة اختباره.">This quiz link looks incorrect.</p>' +
        '<a class="btn btn-primary" href="courses.html" style="margin-top:24px" data-en="Browse Courses" data-ar="تصفّحي المساقات">Browse Courses</a>' +
        '</div>';
      if(window.EDS && EDS.language) EDS.language.applyLang(currentLang());
      return;
    }

    let index = 0;
    let score = 0;
    let started = false;
    const answers = new Array(questions.length).fill(null);

    document.querySelectorAll('[data-quiz-course]').forEach(function(el){
      el.textContent = course.title[currentLang()];
    });

    function renderStart(){
      const lang = currentLang();
      root.innerHTML =
        '<div class="quiz-card glass reveal in">' +
          '<div class="card-icon" data-icon="' + course.icon + '" style="background:' + course.gradient + '"></div>' +
          '<h2>' + course.title[lang] + '</h2>' +
          '<p class="lead" style="margin-inline:0">' + course.summary[lang] + '</p>' +
          '<p class="quiz-meta">' + (lang === 'ar' ? '10 أسئلة \u00b7 دقيقتان تقريباً' : '10 questions \u00b7 about 2 minutes') + '</p>' +
          '<button class="btn btn-primary" id="quiz-start">' + (lang === 'ar' ? 'ابدئي الاختبار' : 'Start Quiz') + '</button>' +
        '</div>';
      root.querySelectorAll('[data-icon]').forEach(function(el){
        el.innerHTML = EDS.renderIcon(el.getAttribute('data-icon'));
      });
      document.getElementById('quiz-start').addEventListener('click', function(){
        started = true;
        index = 0; score = 0; answers.fill(null);
        renderQuestion();
      });
    }

    function renderQuestion(){
      const lang = currentLang();
      const q = questions[index];
      const progress = Math.round((index / questions.length) * 100);

      root.innerHTML =
        '<div class="quiz-card glass">' +
          '<div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>' +
          '<p class="quiz-step">' + (lang === 'ar' ? ('سؤال ' + (index+1) + ' من ' + questions.length) : ('Question ' + (index+1) + ' of ' + questions.length)) + '</p>' +
          '<h3 class="quiz-question">' + q.q[lang] + '</h3>' +
          '<div class="quiz-options" role="radiogroup">' +
            q.options.map(function(opt, i){
              return '<button class="quiz-option" data-i="' + i + '" role="radio" aria-checked="false">' + opt[lang] + '</button>';
            }).join('') +
          '</div>' +
          '<div class="quiz-feedback" aria-live="polite"></div>' +
          '<button class="btn btn-primary quiz-next" disabled>' + (lang === 'ar' ? (index === questions.length - 1 ? 'إنهاء' : 'التالي') : (index === questions.length - 1 ? 'Finish' : 'Next')) + '</button>' +
        '</div>';

      let picked = null;
      const optionEls = root.querySelectorAll('.quiz-option');
      const feedback = root.querySelector('.quiz-feedback');
      const nextBtn = root.querySelector('.quiz-next');

      optionEls.forEach(function(btn){
        btn.addEventListener('click', function(){
          if(picked !== null) return;
          picked = parseInt(btn.getAttribute('data-i'), 10);
          answers[index] = picked;
          const correct = picked === q.correct;
          if(correct) score++;

          optionEls.forEach(function(b){
            const i = parseInt(b.getAttribute('data-i'), 10);
            b.setAttribute('aria-checked', i === picked ? 'true' : 'false');
            if(i === q.correct) b.classList.add('correct');
            else if(i === picked) b.classList.add('incorrect');
            b.disabled = true;
          });

          feedback.textContent = correct
            ? (lang === 'ar' ? 'إجابة صحيحة!' : 'Correct!')
            : (lang === 'ar' ? 'ليست تماماً — استمري!' : 'Not quite — keep going!');
          feedback.classList.add(correct ? 'is-correct' : 'is-incorrect');
          nextBtn.disabled = false;
        });
      });

      nextBtn.addEventListener('click', function(){
        if(index < questions.length - 1){
          index++;
          renderQuestion();
        } else {
          renderResults();
        }
      });
    }

    function renderResults(){
      const lang = currentLang();
      const pct = Math.round((score / questions.length) * 100);
      let message;
      if(pct >= 80) message = { en:'Great job! You\u2019re building strong knowledge.', ar:'عمل رائع! أنتِ تبنين معرفة قوية.' };
      else if(pct >= 50) message = { en:'Good progress! Review a bit more and try again.', ar:'تقدّم جيد! راجعي قليلاً وحاولي مجدداً.' };
      else message = { en:'A good start — every course helps you grow.', ar:'بداية جيدة — كل مساق يساعدك على النمو.' };

      root.innerHTML =
        '<div class="quiz-card glass text-center">' +
          '<div class="quiz-score-ring" style="--pct:' + pct + '">' +
            '<span>' + score + ' / ' + questions.length + '</span>' +
          '</div>' +
          '<h2>' + pct + '%</h2>' +
          '<p class="lead" style="margin-inline:auto">' + message[lang] + '</p>' +
          '<div class="quiz-actions">' +
            '<button class="btn btn-primary" id="quiz-restart">' + (lang === 'ar' ? 'إعادة المحاولة' : 'Restart') + '</button>' +
            '<a class="btn btn-ghost" href="courses.html">' + (lang === 'ar' ? 'كل المساقات' : 'All Courses') + '</a>' +
          '</div>' +
        '</div>';

      document.getElementById('quiz-restart').addEventListener('click', renderStart);
    }

    renderStart();
    document.addEventListener('eds:langchange', function(){
      if(!started) renderStart();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
