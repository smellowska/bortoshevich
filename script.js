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
}, {
  threshold: 0.1
});

revealBlocks.forEach(block => {
  scrollObserver.observe(block);
});

const videos = document.querySelectorAll('.video-item video');
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      if (video.readyState < 2) {
        video.load();
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, {
  threshold: 0.25
});

videos.forEach(video => {
  videoObserver.observe(video);
});

const parallaxBg = document.getElementById('parallaxBg');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  
  if (scrolled > 600) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const sponsorForm = document.getElementById('sponsorForm');
const toastContainer = document.getElementById('toastContainer');

sponsorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('sponsorName').value;
  const email = document.getElementById('sponsorEmail').value;
  const message = document.getElementById('sponsorMessage').value;
  
  const fullText = `Здравствуйте! Меня зовут ${name}.\n\n${message}\n\nМой Email для связи: ${email}\n\nВас интересует наше предложение?`;
  
  const toast = document.createElement('div');
  toast.className = 'toast-node';
  toast.innerHTML = `
    <div class="toast-content">Текст скопирован! Вставьте его в чат с Никитой.</div>
    <div class="toast-bar"></div>
  `;
  toastContainer.appendChild(toast);
  
  navigator.clipboard.writeText(fullText).then(() => {
    proceedToInstagram();
  }).catch(() => {
    proceedToInstagram();
  });

  function proceedToInstagram() {
    sponsorForm.reset();
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    setTimeout(() => {
      if (isMobile) {
        window.location.href = "instagram://user?username=nikitabortoshevich777";
        
        setTimeout(() => {
          window.location.href = "https://www.instagram.com/nikitabortoshevich777/";
        }, 1500);
      } else {
        window.location.href = "https://www.instagram.com/nikitabortoshevich777/";
      }
      toast.remove();
    }, 1000);
  }
});