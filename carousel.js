// Carousel functionality for index page
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide")
  const indicators = document.getElementById("indicators")
  let currentSlide = 0
  let slideInterval
  const intervalTime = 5000 // Time between automatic slides (5 seconds)

  // Create indicator dots
  function createIndicators() {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("div")
      dot.classList.add("indicator")
      if (i === 0) dot.classList.add("active")
      dot.addEventListener("click", () => {
        goToSlide(i)
        resetInterval()
      })
      indicators.appendChild(dot)
    }
  }

  // Show a specific slide
  function goToSlide(n) {
    // Hide current slide
    slides[currentSlide].classList.remove("active")
    document.querySelectorAll(".indicator")[currentSlide].classList.remove("active")

    // Update current slide
    currentSlide = (n + slides.length) % slides.length

    // Show new slide
    slides[currentSlide].classList.add("active")
    document.querySelectorAll(".indicator")[currentSlide].classList.add("active")

    // Update slide position
    document.getElementById("slides").style.transform = `translateX(-${currentSlide * 25}%)`
    
    // Show CTA button for active slide
    slides.forEach((slide, index) => {
      const ctaButton = slide.querySelector(".cta-button")
      if (index === currentSlide) {
        ctaButton.style.opacity = "1"
        ctaButton.style.transform = "translateY(0)"
      } else {
        ctaButton.style.opacity = "0"
        ctaButton.style.transform = "translateY(20px)"
      }
    })
  }

  // Next slide function
  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  // Previous slide function
  window.prevSlide = () => {
    goToSlide(currentSlide - 1)
    resetInterval()
  }

  // Next slide function (exposed to window for onclick)
  window.nextSlide = () => {
    goToSlide(currentSlide + 1)
    resetInterval()
  }

  // Reset interval timer
  function resetInterval() {
    clearInterval(slideInterval)
    slideInterval = setInterval(nextSlide, intervalTime)
  }

  // Initialize carousel
  function initCarousel() {
    createIndicators()

    // Add active class to first slide
    slides[0].classList.add("active")
    
    // Show CTA button for first slide
    const firstCta = slides[0].querySelector(".cta-button")
    if (firstCta) {
      firstCta.style.opacity = "1"
      firstCta.style.transform = "translateY(0)"
    }

    // Set up automatic sliding
    slideInterval = setInterval(nextSlide, intervalTime)

    // Add fade-in animation to all slides
    slides.forEach((slide) => {
      slide.style.opacity = 0
      setTimeout(() => {
        slide.style.opacity = 1
        slide.style.transition = "opacity 0.5s ease-in-out"
      }, 100)
    })
  }

  // Initialize on page load
  initCarousel()
})