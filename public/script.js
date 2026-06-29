const targetDate = new Date('2026-07-15T08:00:00+05:00').getTime();
let countdownEls = null;

function updateCountdown() {
  if (!countdownEls) return;
  const diff = targetDate - Date.now();
  const { days, hours, minutes, seconds } = countdownEls;

  if (diff <= 0) {
    days.textContent = hours.textContent = minutes.textContent = seconds.textContent = '0';
    return;
  }

  days.textContent = Math.floor(diff / 86400000);
  hours.textContent = Math.floor((diff % 86400000) / 3600000);
  minutes.textContent = Math.floor((diff % 3600000) / 60000);
  seconds.textContent = Math.floor((diff % 60000) / 1000);
}

function initCountdown() {
  countdownEls = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function initDayTabs() {
  const tabs = document.querySelectorAll('.day-tab');
  const days = document.querySelectorAll('.day');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.day;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      days.forEach((d) => d.classList.toggle('active', d.dataset.day === target));
    });
  });
}

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
}

initCountdown();
initDayTabs();
initReveal();
