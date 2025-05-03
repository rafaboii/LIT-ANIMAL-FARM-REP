// Carousel functionality
let index = 0;
const totalSlides = document.querySelectorAll('.slide').length;
const indicatorsContainer = document.getElementById('indicators');

// Create indicators
for (let i = 0; i < totalSlides; i++) {
  const indicator = document.createElement('div');
  indicator.className = 'indicator' + (i === 0 ? ' active' : '');
  indicator.onclick = () => showSlide(i);
  indicatorsContainer.appendChild(indicator);
}

function showSlide(i) {
  const slides = document.getElementById('slides');
  const indicators = document.querySelectorAll('.indicator');
  
  // Update index
  index = (i + totalSlides) % totalSlides;
  
  // Update slide position
  slides.style.transform = 'translateX(' + (-index * 25) + '%)';
  
  // Update indicators
  indicators.forEach((ind, idx) => {
    ind.className = 'indicator' + (idx === index ? ' active' : '');
  });
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

// Auto-play carousel every 7 seconds
setInterval(() => nextSlide(), 7000);