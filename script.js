// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav border on scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');
menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Project filters
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  projects.forEach(p => p.classList.toggle('hide', f !== 'all' && p.dataset.cat !== f));
}));

// Count-up stats
const countUp = el => {
  const target = +el.dataset.count;
  const start = performance.now();
  const dur = 1400;
  const tick = now => {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Reveal on scroll
const revealTargets = document.querySelectorAll('.section-head, .about-grid, .skills, .job, .case, .project, .activity, .offer, .steps, .build-cta, .contact');
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      const n = e.target.querySelector('[data-count]');
      if (n) countUp(n);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in'));
  document.querySelectorAll('[data-count]').forEach(n => n.textContent = (+n.dataset.count).toLocaleString());
}

// Start a conversation form (Web3Forms)
const buildForm = document.getElementById('build-form');
if (buildForm) {
  const status = document.getElementById('bf-status');
  const btn = buildForm.querySelector('button[type="submit"]');
  buildForm.addEventListener('submit', async e => {
    e.preventDefault();
    const key = buildForm.querySelector('[name="access_key"]').value;
    if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      status.className = 'form-status err';
      status.textContent = 'The form isn\'t switched on yet. Please email ecwiertn@gmail.com instead.';
      return;
    }
    btn.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Sending…';
    try {
      const data = Object.fromEntries(new FormData(buildForm));
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 200 && json.success !== false) {
        buildForm.reset();
        status.className = 'form-status ok';
        status.textContent = 'Thanks! Your message is on its way. I\'ll get back to you soon.';
      } else {
        throw new Error(json.message || 'Send failed');
      }
    } catch (err) {
      status.className = 'form-status err';
      status.textContent = 'Something went wrong sending that. Please email ecwiertn@gmail.com instead.';
    } finally {
      btn.disabled = false;
    }
  });
}
