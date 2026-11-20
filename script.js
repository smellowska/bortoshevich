const raceDate = new Date(2027, 2, 27, 10, 0, 0).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = raceDate - now;

  if (distance < 0) {
    const label = currentLang === 'en' ? 'SEASON STARTED!' : 'СЕЗОН НАЧАЛСЯ!';
    document.getElementById("raceTimer").innerHTML = `<div class='time-val'>${label}</div>`;
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
if (videos.length > 0) {
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
    const shareTitle = currentLang === 'en' ? 'Nikita Bortoshevich #777' : 'Никита Бортошевич #777';
    const shareText = currentLang === 'en'
      ? 'Official website of Master of Sports in Motocross'
      : 'Официальный сайт Мастера спорта по мотокроссу';
    const copiedText = currentLang === 'en' ? 'Link copied to clipboard!' : 'Ссылка на сайт скопирована!';

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(copiedText);
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
    
    const fullText = currentLang === 'en'
      ? `Hello! My name is ${name}.\n\n${message}\n\nMy Email: ${email}\n\nAre you interested in our partnership proposal?`
      : `Здравствуйте! Меня зовут ${name}.\n\n${message}\n\nМой Email для связи: ${email}\n\nВас интересует наше предложение?`;
    
    const toastMsg = currentLang === 'en'
      ? 'Text copied! Redirecting to Telegram...'
      : 'Текст скопирован! Переходим в Telegram...';

    const toast = showToast(toastMsg);
    
    navigator.clipboard.writeText(fullText).then(() => {
      proceedToTelegram();
    }).catch(() => {
      proceedToTelegram();
    });

    function proceedToTelegram() {
      sponsorForm.reset();
      setTimeout(() => {
        window.location.href = "https://t.me/bartia_1";
        if (toast && toast.parentNode) toast.remove();
      }, 1200);
    }
  });
}

// Мобильное меню
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('active');
    burgerBtn.classList.toggle('open', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      burgerBtn.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
      mobileMenu.classList.remove('active');
      burgerBtn.classList.remove('open');
    }
  });
}

// Мультиязычность (RU / EN)
const translations = {
  ru: {
    nav_main: "ГЛАВНОЕ",
    nav_calendar: "КАЛЕНДАРЬ",
    nav_media: "МЕДИА",
    nav_chronicle: "ХРОНИКА",
    nav_sponsor: "СВЯЗЬ",
    hero_badge: "МАСТЕР СПОРТА",
    hero_name: 'НИКИТА<br><span class="accent-text">БОРТОШЕВИЧ</span>',
    prof_age_lbl: "Возраст",
    prof_birth_lbl: "Место рождения",
    prof_birth_val: "Ошмяны, Беларусь",
    prof_start_lbl: "Начало карьеры",
    prof_start_val: "В 3 года",
    prof_disc_lbl: "Дисциплина",
    prof_disc_val: "Мотокросс",
    cal_title: 'Следующий <span class="accent-text">Старт</span>',
    race_title: "Открытие Весеннего Сезона",
    race_loc: "Республика Беларусь",
    t_days: "ДНЕЙ",
    t_hours: "ЧАСОВ",
    t_min: "МИНУТ",
    t_sec: "СЕКУНД",
    media_title: 'Медиа <span class="accent-text">Лента</span>',
    gal_title: 'Яркие <span class="accent-text">Моменты</span>',
    chr_title: 'Хроника <span class="accent-text">Успеха</span>',
    c50_tag: "КЛАСС 50 см³",
    c50_desc: "Завоевание престижного титула Чемпиона Республики Беларусь. Успешные выезды и призовые подиумы на треках Латвии, Литвы, Эстонии и России.",
    c65_tag: "КЛАСС 65 см³",
    c65_desc: "Выход на серьезный международный уровень. Масштабное участие в этапах Чемпионата Европы с прохождением жестких отборов в Польше и Латвии.",
    c85_tag: "КЛАСС 85 см³",
    c85_desc: "Закрепление статуса одного из сильнейших юниоров страны. Уверенное завоевание серебряного подиума на домашней трассе в Ошмянах.",
    c125_tag: "КЛАСС 125 см³",
    c125_desc: "Переход во взрослый дивизион. Высокие результаты на этапах Чемпионата РБ и яркое выступление в заездах на «Игора Драйв».",
    c250_tag: "КЛАСС 250 см³",
    c250_desc: "Уверенное удержание лидерских позиций в топ-3 текущего личного зачета Чемпионата Республики Беларусь.",
    sp_title: 'СТАТЬ <span class="accent-text">СПОНСОРОМ</span>',
    sp_name: "ВАШЕ ИМЯ / КОМПАНИЯ",
    sp_email: "ВАШ EMAIL",
    sp_msg: "ВАШЕ ПРЕДЛОЖЕНИЕ О ПОДДЕРЖКЕ КОМАНДЫ",
    sp_btn: "ОТПРАВИТЬ ПРЕДЛОЖЕНИЕ"
  },
  en: {
    nav_main: "HOME",
    nav_calendar: "CALENDAR",
    nav_media: "MEDIA",
    nav_chronicle: "CHRONICLE",
    nav_sponsor: "CONTACT",
    hero_badge: "MASTER OF SPORTS",
    hero_name: 'NIKITA<br><span class="accent-text">BORTOSHEVICH</span>',
    prof_age_lbl: "Age",
    prof_birth_lbl: "Birthplace",
    prof_birth_val: "Oshmyany, Belarus",
    prof_start_lbl: "Career Start",
    prof_start_val: "At age 3",
    prof_disc_lbl: "Discipline",
    prof_disc_val: "Motocross",
    cal_title: 'Next <span class="accent-text">Race</span>',
    race_title: "Spring Season Opener",
    race_loc: "Republic of Belarus",
    t_days: "DAYS",
    t_hours: "HOURS",
    t_min: "MINUTES",
    t_sec: "SECONDS",
    media_title: 'Media <span class="accent-text">Feed</span>',
    gal_title: 'Highlight <span class="accent-text">Moments</span>',
    chr_title: 'Career <span class="accent-text">Chronicle</span>',
    c50_tag: "50 cc CLASS",
    c50_desc: "Won the prestigious title of Champion of the Republic of Belarus. Multiple podium finishes on tracks across Latvia, Lithuania, Estonia, and Russia.",
    c65_tag: "65 cc CLASS",
    c65_desc: "Stepped up to the international stage. Competed extensively in European Championship rounds, passing tough qualifiers in Poland and Latvia.",
    c85_tag: "85 cc CLASS",
    c85_desc: "Cemented status as one of the nation's top juniors. Claimed a confident silver podium finish at the home track in Oshmyany.",
    c125_tag: "125 cc CLASS",
    c125_desc: "Transitioned into the senior division. Strong results in the Belarusian Championship rounds and standout rides at Igora Drive.",
    c250_tag: "250 cc CLASS",
    c250_desc: "Consistently holding top-3 overall standings in the Belarusian National Motocross Championship.",
    sp_title: 'BECOME A <span class="accent-text">SPONSOR</span>',
    sp_name: "YOUR NAME / COMPANY",
    sp_email: "YOUR EMAIL",
    sp_msg: "YOUR PARTNERSHIP PROPOSAL",
    sp_btn: "SEND PROPOSAL"
  }
};

let currentLang = localStorage.getItem('lang') || 'ru';
if (!translations[currentLang]) currentLang = 'ru';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  const dict = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

setLanguage(currentLang);
updateCountdown();
setInterval(updateCountdown, 1000);