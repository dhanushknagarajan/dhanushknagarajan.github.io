// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.innerHTML = nav.classList.contains('open')
      ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  });
}

// Highlight current page in nav
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Typing effect on home page
const typed = document.querySelector('.typed');
if (typed) {
  const words = typed.dataset.words.split(',');
  let w = 0, c = 0, deleting = false;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!deleting && c < word.length) c++;
    else if (deleting && c > 0) c--;
    else if (!deleting) { deleting = true; return setTimeout(tick, 1500); }
    else { deleting = false; w = (w + 1) % words.length; }
    setTimeout(tick, deleting ? 45 : 90);
  })();
}

// Reveal sections and fill skill bars on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.bar div').forEach(b => b.style.width = b.dataset.value + '%');
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Portfolio filters
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project').forEach(p => {
      p.classList.toggle('hide', f !== 'all' && !p.dataset.cat.includes(f));
    });
  });
});

// Footer year
document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());
