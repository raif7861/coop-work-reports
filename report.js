const photo = document.getElementById('moment-photo');
const caption = document.getElementById('moment-caption');
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    const start = button.dataset.photo === 'start';
    photo.src = start ? 'assets/interns-start.png' : 'assets/interns-end.png';
    photo.alt = `Our intern group at the Freedom wall at the ${start ? 'beginning' : 'end'} of the term`;
    caption.textContent = `Our intern group at the ${start ? 'beginning' : 'end'} of the term.`;
    document.querySelectorAll('[data-photo]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  });
});
document.getElementById('print-report').addEventListener('click', event => { event.preventDefault(); window.print(); });
if ('IntersectionObserver' in window) {
 const links = [...document.querySelectorAll('nav a')];
 const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
     if (entry.isIntersecting) links.forEach(link => {
       if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
       else link.removeAttribute('aria-current');
     });
   });
 }, { rootMargin: '-10% 0px -65% 0px' });
 document.querySelectorAll('.report-section').forEach(section => observer.observe(section));
}
const progress = document.querySelector('.reading-progress span');
let progressQueued = false;
function updateProgress() {
 const distance = document.documentElement.scrollHeight - window.innerHeight;
 progress.style.transform = `scaleX(${distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0})`;
 progressQueued = false;
}
window.addEventListener('scroll', () => { if (!progressQueued) { progressQueued = true; requestAnimationFrame(updateProgress); } }, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const entrance = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
   entry.target.classList.add('just-arrived');
   const owl = entry.target.querySelector('.owl-mark');
   if (owl) owl.classList.add('owl-arrived');
   entrance.unobserve(entry.target);
  }
 }), {threshold:.03});
 document.querySelectorAll('.report-section').forEach(section => entrance.observe(section));
}

// Intron logo intro. The pieces use the original transparent logo image with
// different clipping masks, so the assembled result stays faithful to the mark.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
 const loader = document.createElement('div');
 loader.className = 'intron-loader';
 loader.setAttribute('aria-hidden', 'true');
 loader.innerHTML = `
  <div class="loader-glow"></div>
  <div class="logo-assembly">
   <img class="logo-part feather feather-orange" src="assets/intron-owl.png" alt="">
   <img class="logo-part feather feather-yellow" src="assets/intron-owl.png" alt="">
   <img class="logo-part owl-face" src="assets/intron-owl.png" alt="">
   <img class="logo-part feather feather-blue" src="assets/intron-owl.png" alt="">
   <img class="logo-part feather feather-green" src="assets/intron-owl.png" alt="">
  </div>
  <p class="loader-wordmark">INTRÔN</p>
  <button class="loader-skip" type="button">Skip intro</button>`;
 document.body.prepend(loader);
 document.body.classList.add('intro-playing');

 const finishIntro = () => {
  if (loader.classList.contains('is-leaving')) return;
  loader.classList.add('is-leaving');
  document.body.classList.remove('intro-playing');
  window.setTimeout(() => loader.remove(), 650);
 };
 loader.querySelector('.loader-skip').addEventListener('click', finishIntro);
 window.setTimeout(finishIntro, 4100);
}
