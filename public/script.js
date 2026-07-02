const targetDate = new Date('2026-07-15T10:00:00+05:00').getTime();
let els;

function tick() {
  if (!els) return;
  const d = targetDate - Date.now();
  if (d <= 0) { els.days.textContent = els.hours.textContent = els.minutes.textContent = els.seconds.textContent = '0'; return; }
  els.days.textContent = Math.floor(d / 864e5);
  els.hours.textContent = Math.floor((d % 864e5) / 36e5);
  els.minutes.textContent = Math.floor((d % 36e5) / 6e4);
  els.seconds.textContent = Math.floor((d % 6e4) / 1e3);
}

els = { days: document.getElementById('days'), hours: document.getElementById('hours'), minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds') };
tick();
setInterval(tick, 1000);

document.querySelectorAll('.day-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const t = tab.dataset.day;
    document.querySelectorAll('.day-tab').forEach(b => b.classList.toggle('active', b === tab));
    document.querySelectorAll('.day').forEach(d => d.classList.toggle('active', d.dataset.day === t));
  });
});

if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}
