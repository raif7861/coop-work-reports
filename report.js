const gallery = document.querySelector('#people .section-body');
if (gallery) {
 const slides = [
  {src:'assets/interns-start.png', alt:'Fellow interns at the Freedom wall at the beginning of the term', caption:'Our intern group at the beginning of the term.'},
  {src:'assets/interns-end.png', alt:'Fellow interns at the Freedom wall at the end of the term', caption:'Our intern group at the end of the term.'},
  {src:'assets/intern-meal.png', alt:'Fellow interns sharing a meal', caption:'A meal with fellow interns.'},
  {src:'assets/team-meal.png', alt:'Interns and the wider team gathered around a restaurant table', caption:'Time together with the wider team.'}
 ];
 const oldTabs = gallery.querySelector('.photo-tabs');
 const oldMain = oldTabs?.nextElementSibling;
 const oldPair = gallery.querySelector('.photo-pair');
 const carousel = document.createElement('div');
 carousel.className = 'photo-carousel';
 carousel.setAttribute('aria-label', 'Work-term photo gallery');
 carousel.innerHTML = `
  <div class="carousel-frame">
   <img class="carousel-image" src="${slides[0].src}" alt="${slides[0].alt}">
   <button class="carousel-arrow carousel-prev" type="button" aria-label="Previous photo">←</button>
   <button class="carousel-arrow carousel-next" type="button" aria-label="Next photo">→</button>
  </div>
  <div class="carousel-meta">
   <p class="carousel-caption" aria-live="polite">${slides[0].caption}</p>
   <span class="carousel-count" aria-live="polite">1 / ${slides.length}</span>
  </div>
  <div class="carousel-dots" aria-label="Choose a photo"></div>`;
 oldTabs?.replaceWith(carousel);
 oldMain?.remove();
 oldPair?.remove();

 const image = carousel.querySelector('.carousel-image');
 const caption = carousel.querySelector('.carousel-caption');
 const count = carousel.querySelector('.carousel-count');
 const dots = carousel.querySelector('.carousel-dots');
 let currentSlide = 0;

 slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show photo ${index + 1}: ${slide.caption}`);
  dot.setAttribute('aria-current', index === 0 ? 'true' : 'false');
  dot.addEventListener('click', () => showSlide(index));
  dots.append(dot);
 });

 function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];
  image.classList.add('is-changing');
  window.setTimeout(() => {
   image.src = slide.src;
   image.alt = slide.alt;
   caption.textContent = slide.caption;
   count.textContent = `${currentSlide + 1} / ${slides.length}`;
   [...dots.children].forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === currentSlide)));
   image.classList.remove('is-changing');
  }, 150);
 }
 carousel.querySelector('.carousel-prev').addEventListener('click', () => showSlide(currentSlide - 1));
 carousel.querySelector('.carousel-next').addEventListener('click', () => showSlide(currentSlide + 1));
 carousel.tabIndex = 0;
 carousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
  if (event.key === 'ArrowRight') showSlide(currentSlide + 1);
 });
}
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

// Build the Intron mark from clipped copies of the original transparent logo.
// The existing section observer adds .owl-arrived when this heading scrolls in.
const owlMark = document.querySelector('.owl-mark');
if (owlMark && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 owlMark.innerHTML = `
  <img class="owl-piece owl-orange" src="assets/intron-owl.png" alt="">
  <img class="owl-piece owl-yellow" src="assets/intron-owl.png" alt="">
  <img class="owl-piece owl-face-piece" src="assets/intron-owl.png" alt="">
  <img class="owl-piece owl-blue" src="assets/intron-owl.png" alt="">
  <img class="owl-piece owl-green" src="assets/intron-owl.png" alt="">`;
}
