// Quote Database functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const quoteCards = document.querySelectorAll('.quote-card');
    
    // Add click event to filter options
    filterOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove active class from siblings
        const siblings = Array.from(this.parentElement.children);
        siblings.forEach(sib => sib.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Get selected filters
        const selectedCharacter = document.querySelector('.filter-group:nth-child(1) .filter-option.active').textContent;
        const selectedTheme = document.querySelector('.filter-group:nth-child(2) .filter-option.active').textContent;
        
        // Filter quotes
        filterQuotes(selectedCharacter, selectedTheme);
      });
    });
    
    function filterQuotes(character, theme) {
      quoteCards.forEach(card => {
        const quoteSource = card.querySelector('.quote-source').textContent.toLowerCase();
        const showByCharacter = character === 'All' || quoteSource.includes(character.toLowerCase());
        const showByTheme = theme === 'All' || quoteSource.includes(theme.toLowerCase());
        
        if (showByCharacter && showByTheme) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  });