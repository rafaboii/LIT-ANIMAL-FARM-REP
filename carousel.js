// Enhanced Carousel functionality for index page
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide")
  const indicators = document.getElementById("indicators")
  const progressBar = document.querySelector(".progress-bar")
  let currentSlide = 0
  let slideInterval
  const intervalTime = 6000 // Time between automatic slides (6 seconds)

  // Subtle parallax effect for slides
  document.addEventListener("mousemove", (e) => {
    const activeSlide = document.querySelector(".slide.active")
    if (!activeSlide) return
    
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50
    
    const title = activeSlide.querySelector("h2")
    const button = activeSlide.querySelector(".cta-button")
    
    if (title) title.style.transform = `translate(${xAxis}px, ${yAxis}px)`
    if (button) button.style.transform = `translate(${xAxis * 0.5}px, ${yAxis * 0.5}px)`
  })

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

  // Show a specific slide with enhanced transitions
  function goToSlide(n) {
    // Hide current slide
    slides[currentSlide].classList.remove("active")
    document.querySelectorAll(".indicator")[currentSlide].classList.remove("active")

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${(n + 1) / slides.length * 100}%`
    }

    // Update current slide
    currentSlide = (n + slides.length) % slides.length

    // Show new slide
    slides[currentSlide].classList.add("active")
    document.querySelectorAll(".indicator")[currentSlide].classList.add("active")

    // Update slide position
    document.getElementById("slides").style.transform = `translateX(-${currentSlide * 25}%)`
    
    // Show CTA button for active slide with subtle animation
    slides.forEach((slide, index) => {
      const ctaButton = slide.querySelector(".cta-button")
      if (!ctaButton) return
      
      if (index === currentSlide) {
        setTimeout(() => {
          ctaButton.style.opacity = "1"
          ctaButton.style.transform = "translateY(0)"
        }, 300)
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
    
    // Reset and restart progress animation
    if (progressBar) {
      progressBar.style.transition = "none"
      progressBar.style.width = "0%"
      
      setTimeout(() => {
        progressBar.style.transition = `width ${intervalTime}ms linear`
        progressBar.style.width = "100%"
      }, 50)
    }
  }

  // Initialize carousel
  function initCarousel() {
    createIndicators()

    // Add active class to first slide
    slides[0].classList.add("active")
    
    // Show CTA button for first slide
    const firstCta = slides[0].querySelector(".cta-button")
    if (firstCta) {
      setTimeout(() => {
        firstCta.style.opacity = "1"
        firstCta.style.transform = "translateY(0)"
      }, 1000)
    }

    // Set up automatic sliding with progress bar
    if (progressBar) {
      progressBar.style.transition = `width ${intervalTime}ms linear`
      progressBar.style.width = "100%"
    }
    
    slideInterval = setInterval(nextSlide, intervalTime)

    // Add fade-in animation to all slides
    slides.forEach((slide) => {
      slide.style.opacity = 0
      setTimeout(() => {
        slide.style.opacity = 1
        slide.style.transition = "opacity 0.8s ease-in-out"
      }, 100)
    })
    
    // Initialize scroll animations
    initScrollAnimations()
  }
  
  // Scroll animations for content sections
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1
    })
    
    animatedElements.forEach(element => {
      observer.observe(element)
    })
  }

  // Initialize on page load
  initCarousel()
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('mobile-menu-toggle')
  const navMenu = document.querySelector('nav')
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open')
      menuToggle.classList.toggle('open')
    })
  }
})