const byId = id => document.getElementById(id);

byId('saludo-hoja-1').textContent = CARTA.saludo1;
byId('carta-hoja-1').textContent = CARTA.carta1;
byId('saludo-hoja-2').textContent = CARTA.saludo2;
byId('carta-hoja-2').textContent = CARTA.carta2;
byId('personal').textContent = CARTA.personal;
byId('despedida').textContent = CARTA.despedida;
byId('firma').textContent = CARTA.firma;

let currentPage = 0;
const pages = [...document.querySelectorAll('.letter-page')];
const indicator = byId('page-indicator');
function showPage(index) {
  currentPage = (index + pages.length) % pages.length;
  pages.forEach((page, i) => {
    const active = i === currentPage;
    page.hidden = !active;
    page.classList.toggle('active', active);
  });
  indicator.textContent = `Hoja ${currentPage + 1} de ${pages.length}`;
}
byId('prev-page').onclick = () => showPage(currentPage - 1);
byId('next-page').onclick = () => showPage(currentPage + 1);
showPage(0);

const path = n => `assets/recuerdo-${String(n).padStart(2,'0')}.webp`;
let current = 0;
const box = byId('lightbox');
function show(i) {
  current = (i + MEMORIES.length) % MEMORIES.length;
  const [n, t] = MEMORIES[current];
  byId('full').src = path(n);
  byId('full').alt = t;
}
MEMORIES.forEach(([n, t, style], i) => {
  const b = document.createElement('button');
  b.className = 'memory ' + style;
  const im = document.createElement('img');
  im.src = path(n);
  im.alt = t;
  im.loading = 'lazy';
  b.append(im);
  b.onclick = () => { show(i); box.showModal(); };
  byId('gallery').append(b);
});
byId('close').onclick = () => box.close();
byId('prev').onclick = () => show(current - 1);
byId('next').onclick = () => show(current + 1);
box.addEventListener('click', e => { if (e.target === box) box.close(); });
document.addEventListener('keydown', e => {
  if (box.open && e.key === 'ArrowLeft') show(current - 1);
  if (box.open && e.key === 'ArrowRight') show(current + 1);
});

const layer = byId('sparkles');
for (let i = 0; i < 24; i++) {
  const s = document.createElement('span');
  s.className = 'spark';
  s.textContent = i % 3 === 0 ? '♡' : '✦';
  s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${9+Math.random()*13}px;animation-delay:${Math.random()*3}s`;
  layer.append(s);
}
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 55; i++) {
    let c = document.createElement('span');
    c.className = 'confetti';
    c.textContent = ['♡','✦','✿','♪'][i % 4];
    c.style.cssText = `left:${Math.random()*100}%;color:${['#d95198','#f9bbd8','#a478c8','#e7b55f'][i % 4]};--drift:${Math.random()*180-90}px;animation-delay:${Math.random()*.7}s`;
    layer.append(c);
    setTimeout(() => c.remove(), 3600);
  }
}
byId('celebrar').onclick = confetti;
byId('final-confetti').onclick = confetti;
if ('IntersectionObserver' in window) {
  let observer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }), { threshold: .05 });
  document.querySelectorAll('.reveal').forEach(e => {
    e.classList.add('ready');
    observer.observe(e);
  });
}
