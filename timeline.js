// Timeline functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to timeline events as they scroll into view
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Function to handle scroll events
    function handleScroll() {
      timelineEvents.forEach(event => {
        if (isInViewport(event)) {
          event.classList.add('visible');
        }
      });
    }
    
    // Initial check on page load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  });