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
