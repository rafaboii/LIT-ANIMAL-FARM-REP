// Quote Database functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const quoteCards = document.querySelectorAll('.quote-card');
    const searchBar = document.getElementById('quote-search');
  
    // Add click event to filter options
    filterOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove active class from siblings
        const siblings = Array.from(this.parentElement.children);
        siblings.forEach(sib => sib.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Apply filters
        applyFilters();
      });
    });
  
    // Add search functionality
    if (searchBar) {
      searchBar.addEventListener('input', function() {
        applyFilters();
      });
    }
  
    // Add click event to quote cards for detailed view
    quoteCards.forEach(card => {
      card.addEventListener('click', function() {
        showQuoteDetails(this);
      });
    });
  
    // Initial filter application
    applyFilters();
  });
  
  function applyFilters() {
    const searchTerm = document.getElementById('quote-search').value.toLowerCase();
    const selectedCharacter = document.querySelector('.filter-group:nth-child(1) .filter-option.active').textContent;
    const selectedTheme = document.querySelector('.filter-group:nth-child(2) .filter-option.active').textContent;
    const selectedChapter = document.querySelector('.filter-group:nth-child(3) .filter-option.active').textContent;
    
    const quoteCards = document.querySelectorAll('.quote-card');
    
    quoteCards.forEach(card => {
      const quoteText = card.querySelector('.quote-text').textContent.toLowerCase();
      const character = card.getAttribute('data-character');
      const theme = card.getAttribute('data-theme');
      const chapter = card.getAttribute('data-chapter');
      
      const matchesSearch = searchTerm === '' || 
                            quoteText.includes(searchTerm) || 
                            character.toLowerCase().includes(searchTerm) || 
                            theme.toLowerCase().includes(searchTerm);
      
      const matchesCharacter = selectedCharacter === 'All' || character.includes(selectedCharacter);
      const matchesTheme = selectedTheme === 'All' || theme.includes(selectedTheme);
      const matchesChapter = selectedChapter === 'All' || chapter === selectedChapter;
      
      if (matchesSearch && matchesCharacter && matchesTheme && matchesChapter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  function showQuoteDetails(quoteCard) {
    const modal = document.getElementById('quote-modal');
    const modalQuoteText = document.getElementById('modal-quote-text');
    const modalCharacter = document.getElementById('modal-character');
    const modalChapter = document.getElementById('modal-chapter');
    const modalTheme = document.getElementById('modal-theme');
    const modalContext = document.getElementById('modal-context');
    
    const quoteText = quoteCard.querySelector('.quote-text').textContent;
    const character = quoteCard.getAttribute('data-character');
    const theme = quoteCard.getAttribute('data-theme');
    const chapter = quoteCard.getAttribute('data-chapter');
    
    // Set modal content
    modalQuoteText.textContent = quoteText;
    modalCharacter.textContent = character;
    modalChapter.textContent = chapter;
    modalTheme.textContent = theme;
    
    // Get context based on the quote
    const context = getQuoteContext(quoteText, character, chapter);
    modalContext.textContent = context;
    
    // Show modal
    modal.style.display = 'flex';
  }
  
  function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    modal.style.display = 'none';
  }
  
  function getQuoteContext(quote, character, chapter) {
    // This would ideally be a database lookup
    // For now, we'll use a simple mapping
    const contexts = {
      "All animals are equal, but some animals are more equal than others.": 
        "This quote appears on the barn wall after the pigs have modified the Seven Commandments. It represents the complete corruption of the revolution's original ideals of equality. By this point in the novel, the pigs have fully established themselves as the ruling class, contradicting the fundamental principle that all animals are equal.",
      
      "Four legs good, two legs bad.": 
        "This slogan was created by Snowball to encapsulate the principles of Animalism in a way that even the least intelligent animals could remember. It distinguishes animals (four legs) from humans (two legs) and reinforces the animals' opposition to humans. Later, when the pigs start walking on two legs, the slogan is changed to 'Four legs good, two legs better,' showing how revolutionary principles can be manipulated.",
      
      "The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.": 
        "This is the final line of the novel, occurring when the neighboring farmers visit Animal Farm for a card game with the pigs. The other animals observe through the window as the pigs and humans argue while playing cards, and they can no longer distinguish between their pig rulers and the humans they once rebelled against. This represents the complete betrayal of the revolution's ideals.",
      
      "I will work harder!": 
        "This is Boxer's personal motto, which he adopts after the rebellion. It represents his unwavering dedication to the farm and the revolution. Boxer believes that hard work will solve all problems, but his blind loyalty is ultimately exploited by Napoleon, who sells him to a knacker when he is no longer useful.",
      
      "Man is the only creature that consumes without producing.": 
        "This quote is from Old Major's speech in Chapter 1, where he lays out the case for rebellion. He argues that humans exploit animals by taking everything they produce (milk, eggs, labor) while contributing nothing in return. This forms the ideological foundation for Animalism and the revolution.",
      
      "No animal shall sleep in a bed with sheets.": 
        "This is one of the modified Seven Commandments. The original commandment was 'No animal shall sleep in a bed,' but the pigs add 'with sheets' after they begin sleeping in the farmhouse beds. This represents how those in power can subtly alter principles and rules to suit their own interests while claiming to uphold the original values.",
      
      "All men are enemies. All animals are comrades.": 
        "This quote comes from Old Major's speech in Chapter 1, establishing the fundamental division between animals and humans that forms the basis of Animalism. It promotes solidarity among animals against their human oppressors. This principle is later betrayed when the pigs begin to collaborate with humans.",
      
      "Surely, comrades, you do not want Jones back?": 
        "This is Squealer's frequent rhetorical question whenever animals express doubt about the pigs' decisions. It's a manipulative tactic that frames any criticism of the current leadership as support for the return of the previous oppressor. This represents how totalitarian regimes use fear to suppress dissent.",
      
      "Comrades, do you know who is responsible for this? Do you know the enemy who has come in the night and overthrown our windmill? SNOWBALL!": 
        "Napoleon uses this accusation to blame Snowball for the collapse of the windmill during a storm. This represents how totalitarian leaders create scapegoats to explain away failures and consolidate power. By blaming an external enemy, Napoleon diverts attention from his own mismanagement.",
      
      "Donkeys live a long time. None of you has ever seen a dead donkey.": 
        "This is Benjamin's cryptic response when asked why he never expresses opinions about the revolution. It suggests his long-term perspective and cynicism—he has seen enough to know that revolutions come and go, but suffering continues. Benjamin represents the skeptics who recognize the cyclical nature of power and oppression.",
      
      "If she herself had had any picture of the future, it had been of a society of animals set free from hunger and the whip, all equal, each working according to his capacity, the strong protecting the weak.": 
        "This quote reveals Clover's disillusionment as she observes how far Animal Farm has strayed from the original revolutionary ideals. It contrasts the utopian vision that inspired the revolution with the harsh reality that has emerged under Napoleon's leadership.",
      
      "Napoleon is always right.": 
        "This becomes Boxer's second personal motto after 'I will work harder.' It represents blind loyalty to leadership and the dangerous acceptance of authority without question. This motto facilitates Napoleon's rise to absolute power, as even the strongest animals on the farm refuse to challenge his decisions."
    };
    
    return contexts[quote] || "This quote represents key themes in Animal Farm including the corruption of power, the manipulation of language, and the betrayal of revolutionary ideals. It appears in Chapter " + chapter + " and is spoken by " + character + ".";
  }