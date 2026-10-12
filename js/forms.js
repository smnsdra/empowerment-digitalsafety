/* ==========================================================================
   EDS — forms.js
   Front-end validation for every form on the site. There is no backend, so
   forms never claim to actually send data — see js/api/README for the
   integration point once a backend exists.
   ========================================================================== */

(function(){
  function lang(){ return (window.EDS && EDS.language) ? EDS.language.getLang() : 'en'; }

  function showError(field, show){
    field.classList.toggle('error', !!show);
  }

  function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function validateField(field){
    const input = field.querySelector('input, textarea, select');
    if(!input) return true;
    let ok = true;

    if(input.hasAttribute('required') && !input.value.trim()) ok = false;
    if(ok && input.type === 'email' && input.value.trim() && !isEmail(input.value.trim())) ok = false;
    if(ok && input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) ok = false;

    showError(field, !ok);
    return ok;
  }

  function initForm(form){
    const successBox = form.parentElement.querySelector('.form-success');

    form.addEventListener('submit', function(e){
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('.field').forEach(function(field){
        if(!validateField(field)) valid = false;
      });
      if(!valid){
        const firstError = form.querySelector('.field.error input, .field.error textarea, .field.error select');
        if(firstError) firstError.focus();
        return;
      }

      /* No backend is connected. This is an honest front-end-only success
         state — see README.md "Connecting forms to a backend". */
      form.style.display = 'none';
      if(successBox) successBox.classList.add('show');
    });

    form.querySelectorAll('.field input, .field textarea, .field select').forEach(function(input){
      input.addEventListener('blur', function(){ validateField(input.closest('.field')); });
      input.addEventListener('input', function(){
        if(input.closest('.field').classList.contains('error')) validateField(input.closest('.field'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('form[data-validate]').forEach(initForm);
  });
})();
