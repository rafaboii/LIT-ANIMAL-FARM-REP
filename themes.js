// Thematic Analysis functionality
document.addEventListener("DOMContentLoaded", () => {
  // Add mobile menu toggle functionality
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('nav');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      menuToggle.classList.toggle('open');
    });
  }

  // Add entrance animations for theme cards
  animateThemeCards();

  // Add click event listeners to theme headers
  const themeHeaders = document.querySelectorAll(".theme-header");
  themeHeaders.forEach((header) => {
    header.addEventListener("click", function() {
      toggleTheme(this.parentElement);
    });
  });
});

function animateThemeCards() {
  const cards = document.querySelectorAll(".theme-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(
      () => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      },
      100 + index * 100
    );
  });
}

function toggleTheme(themeCard) {
  // Toggle active class
  const wasActive = themeCard.classList.contains("active");

  // If it was active, just close it
  if (wasActive) {
    themeCard.classList.remove("active");
    return;
  }

  // Otherwise, close all others and open this one
  const allCards = document.querySelectorAll(".theme-card");
  allCards.forEach((card) => {
    if (card !== themeCard) {
      card.classList.remove("active");
    }
  });

  themeCard.classList.add("active");

  // Scroll to the card
  setTimeout(() => {
    themeCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 300);

  // Animate the content
  const content = themeCard.querySelector(".theme-content");
  content.style.opacity = "0";

  setTimeout(() => {
    content.style.opacity = "1";
    content.style.transition = "opacity 0.5s ease";
  }, 300);
}