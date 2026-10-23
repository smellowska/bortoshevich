const raceDate = new Date(2027, 2, 27, 10, 0, 0).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = raceDate - now;

  if (distance < 0) {
    document.getElementById("raceTimer").innerHTML = "<div class='time-val'>СЕЗОН НАЧАЛСЯ!</div>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeBtn.addEventListener('click', () => {
  const activeTheme = html.getAttribute('data-theme');
  const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);
});

const revealBlocks = document.querySelectorAll('.reveal');
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

revealBlocks.forEach(block => scrollObserver.observe(block));

const videos = document.querySelectorAll('.video-item video');
if(videos.length > 0) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.readyState < 2) video.load();
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });
  videos.forEach(video => videoObserver.observe(video));
}

const parallaxBg = document.getElementById('parallaxBg');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (parallaxBg) parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  if (scrolled > 600) scrollTopBtn.classList.add('visible');
  else scrollTopBtn.classList.remove('visible');
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: 'Никита Бортошевич #777',
        text: 'Официальный сайт Мастера спорта по мотокроссу',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ссылка на сайт скопирована!');
    }
  });
}

const sponsorForm = document.getElementById('sponsorForm');
const toastContainer = document.getElementById('toastContainer');

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-node';
  toast.innerHTML = `<div class="toast-content">${message}</div>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
  return toast;
}

if (sponsorForm) {
  sponsorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('sponsorName').value;
    const email = document.getElementById('sponsorEmail').value;
    const message = document.getElementById('sponsorMessage').value;
    
    const fullText = `Здравствуйте! Меня зовут ${name}.\n\n${message}\n\nМой Email для связи: ${email}\n\nВас интересует наше предложение?`;
    
    const toast = showToast('Текст скопирован! Переходим в Telegram...');
    
    navigator.clipboard.writeText(fullText).then(() => {
      proceedToTelegram();
    }).catch(() => {
      proceedToTelegram();
    });

    function proceedToTelegram() {
      sponsorForm.reset();
      setTimeout(() => {
        window.location.href = "https://t.me/bartia_1";
        if(toast && toast.parentNode) toast.remove();
      }, 1200);
    }
  });
}