// Carousel functionality
let currentSlide = 0;
const totalSlides = 4;

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
  createIndicators();
  updateIndicators();
});

function createIndicators() {
  const indicatorsContainer = document.getElementById('indicators');
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.onclick = function() {
      goToSlide(i);
    };
    indicatorsContainer.appendChild(indicator);
  }
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  const slides = document.getElementById('slides');
  slides.style.transform = `translateX(-${currentSlide * 25}%)`;
  updateIndicators();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

// Auto-advance slides every 7 seconds
setInterval(nextSlide, 7000);