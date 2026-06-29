const targetDate = new Date('2026-07-15T08:00:00+05:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;

  const el = (id) => document.getElementById(id);

  if (diff <= 0) {
    el('days').textContent = '0';
    el('hours').textContent = '0';
    el('minutes').textContent = '0';
    el('seconds').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  el('days').textContent = days;
  el('hours').textContent = hours;
  el('minutes').textContent = minutes;
  el('seconds').textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
