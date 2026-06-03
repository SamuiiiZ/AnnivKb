// Set the anniversary date (YYYY, MM-DD) - CHANGE THIS TO YOUR SPECIAL DATE!
const anniversaryDate = new Date(2025, 5, 15); // June 15, 2025 as an example
// For a real event, set your own: e.g., new Date(2024, 8, 20) for Sept 20, 2024

// ---------- COUNTDOWN TIMER ----------
function updateCountdown() {
  const now = new Date().getTime();
  const target = anniversaryDate.getTime();
  const distance = target - now;

  if (distance < 0) {
    // If past the anniversary, show a lovely message and stop countdown
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    const timerContainer = document.getElementById('timerContainer');
    if (!document.getElementById('celebrateMsg')) {
      const celebrateDiv = document.createElement('div');
      celebrateDiv.id = 'celebrateMsg';
      celebrateDiv.style.marginTop = '1rem';
      celebrateDiv.style.fontSize = '1.2rem';
      celebrateDiv.innerHTML = '🎉 Happy Anniversary, my love! Every day with you is a celebration. 🎉';
      timerContainer.parentNode.appendChild(celebrateDiv);
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (86400000)) / (3600000));
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById('days').innerText = days < 10 ? '0' + days : days;
  document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
  document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

// ---------- FLOATING HEARTS GENERATOR ----------
function createFloatingHeart() {
  const heartContainer = document.getElementById('floatingHearts');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';
  const size = Math.random() * 1.2 + 0.8; // rem
  heart.style.fontSize = `${size}rem`;
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${Math.random() * 8 + 7}s`;
  heart.style.opacity = Math.random() * 0.5 + 0.3;
  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}

// Generate hearts every 600ms
let heartInterval;
function startHearts() {
  heartInterval = setInterval(createFloatingHeart, 600);
}

// ---------- MEMORY GALLERY (Romantic moments) ----------
const memoriesData = [
  { image: 'kbsunset.png', caption: 'My Sunshine 🌅' },
  { image: 'kbflower.png', caption: 'My beloved💞' },
  { image: 'kbqualtime.png', caption: 'My light amidst of the dark 🕯️' },
  { image: 'nailoongkb.png', caption: 'Quality time together 🌸' },
  { image: 'sillikb.png', caption: 'Our precious moments together 💕' }
];

function buildGallery() {
  const galleryContainer = document.getElementById('galleryContainer');
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
  memoriesData.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.setAttribute('data-index', index);
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('memory-img');
    imgDiv.style.backgroundImage = `url('${item.image}')`;
    const captionDiv = document.createElement('div');
    captionDiv.classList.add('memory-caption');
    captionDiv.innerText = item.caption;
    card.appendChild(imgDiv);
    card.appendChild(captionDiv);
    card.addEventListener('click', () => {
      openLightbox(item.image, item.caption);
    });
    galleryContainer.appendChild(card);
  });
}

// ---------- LIGHTBOX MODAL ----------
function openLightbox(imageSrc, caption) {
  let lightbox = document.getElementById('lightboxModal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightboxModal';
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption"></div>
        <button class="lightbox-prev">&#10094;</button>
        <button class="lightbox-next">&#10095;</button>
      </div>
    `;
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);
  }
  
  currentImageIndex = memoriesData.findIndex(m => m.image === imageSrc);
  displayLightboxImage();
}

let currentImageIndex = 0;

function displayLightboxImage() {
  const lightbox = document.getElementById('lightboxModal');
  const item = memoriesData[currentImageIndex];
  lightbox.querySelector('.lightbox-image').src = item.image;
  lightbox.querySelector('.lightbox-caption').innerText = item.caption;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) lightbox.style.display = 'none';
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % memoriesData.length;
  displayLightboxImage();
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + memoriesData.length) % memoriesData.length;
  displayLightboxImage();
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNextImage();
  if (e.key === 'ArrowLeft') showPrevImage();
});

// ---------- SURPRISE MESSAGE (Romantic note) ----------
const surpriseMessages = [
  "💖 You are the reason my world is full of color. Every day with you is a gift I treasure.",
  "🌹 Every Moment we spent together, will be always cherished",
  "🌟 In a sea of people, my eyes will always search for you. You are my forever.",
  "💌 Thank you for being my rock, my joy, and my greatest adventure. I love you more than words can say."
];

function setupSurprise() {
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseDiv = document.getElementById('surpriseMessage');
  if (!surpriseBtn || !surpriseDiv) return;
  surpriseBtn.addEventListener('click', () => {
    const randomMsg = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    surpriseDiv.innerHTML = `<i class="fas fa-heart" style="color:#ff7e9e;"></i> ${randomMsg} <i class="fas fa-heart" style="color:#ff7e9e;"></i>`;
    surpriseDiv.classList.remove('hidden');
    surpriseDiv.classList.add('show');
    // Optional: smooth remove after 8 seconds? Keep visible.
  });
}

// ---------- MUSIC PLAYER (with gentle controls) ----------
function initMusicPlayer() {
  const musicToggle = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  if (!musicToggle || !audio) return;
  let isPlaying = false;
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      musicToggle.innerHTML = '<i class="fas fa-music"></i> Play Romantic Melody';
      isPlaying = false;
    } else {
      audio.play().catch(e => console.log("Autoplay restricted, but user clicked:", e));
      musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Melody';
      isPlaying = true;
    }
  });
}

// Optional: preload partner name from browser storage or just set a nice name
function personalizeMessage() {
  const partnerSpan = document.getElementById('partnerName');
  if (partnerSpan) {
    // If you wish to change this, you can store a name. Default romantic:
    partnerSpan.innerText = "My Forever Love";
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  startHearts();
  buildGallery();
  setupSurprise();
  initMusicPlayer();
  personalizeMessage();

  // Add extra romantic touch: title animation
  setInterval(() => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && Math.random() > 0.85) {
      heroTitle.style.transform = 'scale(1.01)';
      setTimeout(() => { heroTitle.style.transform = ''; }, 400);
    }
  }, 3000);
});