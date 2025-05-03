// Thematic Analysis functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up theme search functionality
    const themeSearch = document.getElementById('theme-search');
    if (themeSearch) {
      themeSearch.addEventListener('input', function() {
        filterThemes(this.value.toLowerCase());
      });
    }
  });
  
  function toggleTheme(themeCard) {
    // Toggle active class
    themeCard.classList.toggle('active');
  }
  
  function filterThemes(searchTerm) {
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach(card => {
      const title = card.querySelector('.theme-title').textContent.toLowerCase();
      const content = card.querySelector('.theme-content').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }