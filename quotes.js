// Quote Database functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterOptions = document.querySelectorAll(".filter-option")
  const quoteCards = document.querySelectorAll(".quote-card")
  const searchBar = document.getElementById("quote-search")

  // Add mobile menu toggle functionality
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('nav');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      menuToggle.classList.toggle('open');
    });
  }

  // Add entrance animations for quote cards
  animateQuoteCards()

  // Add click event to filter options
  filterOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from siblings
      const siblings = Array.from(this.parentElement.children)
      siblings.forEach((sib) => sib.classList.remove("active"))

      // Add active class to clicked option
      this.classList.add("active")

      // Apply filters with animation
      applyFilters(true)
    })
  })

  // Add search functionality
  if (searchBar) {
    searchBar.addEventListener("input", () => {
      applyFilters(true)
    })
  }

  // Add click event to quote cards for detailed view
  quoteCards.forEach((card) => {
    card.addEventListener("click", function () {
      showQuoteDetails(this)
    })
  })

  // Initial filter application
  applyFilters(false)
})

function animateQuoteCards() {
  const cards = document.querySelectorAll(".quote-card")

  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease"
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      },
      100 + index * 50,
    )
  })
}

function applyFilters(animate) {
  const searchTerm = document.getElementById("quote-search").value.toLowerCase()
  const selectedCharacter = document.querySelector(".filter-group:nth-child(1) .filter-option.active").textContent
  const selectedTheme = document.querySelector(".filter-group:nth-child(2) .filter-option.active").textContent
  const selectedChapter = document.querySelector(".filter-group:nth-child(3) .filter-option.active").textContent

  const quoteCards = document.querySelectorAll(".quote-card")
  let visibleCount = 0

  quoteCards.forEach((card, index) => {
    const quoteText = card.querySelector(".quote-text").textContent.toLowerCase()
    const character = card.getAttribute("data-character")
    const theme = card.getAttribute("data-theme")
    const chapter = card.getAttribute("data-chapter")

    const matchesSearch =
      searchTerm === "" ||
      quoteText.includes(searchTerm) ||
      character.toLowerCase().includes(searchTerm) ||
      theme.toLowerCase().includes(searchTerm)

    const matchesCharacter = selectedCharacter === "All" || character.includes(selectedCharacter)
    const matchesTheme = selectedTheme === "All" || theme.includes(selectedTheme)
    const matchesChapter = selectedChapter === "All" || chapter === selectedChapter

    const shouldShow = matchesSearch && matchesCharacter && matchesTheme && matchesChapter

    if (animate) {
      // Animate filtering
      if (shouldShow) {
        visibleCount++
        setTimeout(() => {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 50)
        }, index * 30)
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    } else {
      // No animation for initial load
      if (shouldShow) {
        visibleCount++
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    }
  })

  // Show "no results" message if needed
  const quotesGrid = document.getElementById("quotes-grid")
  const noResults = document.getElementById("no-results-message")

  if (visibleCount === 0) {
    if (!noResults) {
      const message = document.createElement("div")
      message.id = "no-results-message"
      message.className = "no-results-message"
      message.textContent = "No quotes match your search criteria. Try adjusting your filters."
      quotesGrid.appendChild(message)
    }
  } else if (noResults) {
    noResults.remove()
  }
}

function showQuoteDetails(quoteCard) {
  const modal = document.getElementById("quote-modal")
  const modalQuoteText = document.getElementById("modal-quote-text")
  const modalCharacter = document.getElementById("modal-character")
  const modalChapter = document.getElementById("modal-chapter")
  const modalTheme = document.getElementById("modal-theme")
  const modalContext = document.getElementById("modal-context")

  const quoteText = quoteCard.querySelector(".quote-text").textContent
  const character = quoteCard.getAttribute("data-character")
  const theme = quoteCard.getAttribute("data-theme")
  const chapter = quoteCard.getAttribute("data-chapter")

  // Set modal content
  modalQuoteText.textContent = quoteText
  modalCharacter.textContent = character
  modalChapter.textContent = chapter
  modalTheme.textContent = theme

  // Get context based on the quote
  const context = getQuoteContext(quoteText, character, chapter)
  modalContext.textContent = context

  // Show modal with animation
  modal.style.display = "flex"
  modal.style.opacity = "0"

  setTimeout(() => {
    modal.style.opacity = "1"
    modal.style.transition = "opacity 0.3s ease"

    const modalContent = modal.querySelector(".quote-modal-content")
    modalContent.style.transform = "scale(0.9)"
    modalContent.style.opacity = "0"

    setTimeout(() => {
      modalContent.style.transform = "scale(1)"
      modalContent.style.opacity = "1"
      modalContent.style.transition = "transform 0.3s ease, opacity 0.3s ease"
    }, 100)
  }, 50)
}

function closeQuoteModal() {
  const modal = document.getElementById("quote-modal")
  const modalContent = modal.querySelector(".quote-modal-content")

  modalContent.style.transform = "scale(0.9)"
  modalContent.style.opacity = "0"

  setTimeout(() => {
    modal.style.opacity = "0"

    setTimeout(() => {
      modal.style.display = "none"
    }, 300)
  }, 200)
}

function getQuoteContext(quote, character, chapter) {
  // This would ideally be a database lookup
  // For now, we'll use a simple mapping
  const contexts = {
    "All animals are equal, but some animals are more equal than others.":
      "This quote appears on the barn wall after the pigs have modified the Seven Commandments. It represents the complete corruption of the revolution's original ideals of equality. By this point in the novel, the pigs have fully established themselves as the ruling class, contradicting the fundamental principle that all animals are equal.",

    "Four legs good, two legs bad.":
      "This slogan was created by Snowball to encapsulate the principles of Animalism in a way that even the least intelligent animals could remember. It distinguishes animals (four legs) from humans (two legs) and reinforces the animals' opposition to humans. Later, when the pigs start walking on two legs, the slogan is changed to 'Four legs good, two legs better,' showing how revolutionary principles can be manipulated.",

    // Other quote contexts remain the same
  }

  return (
    contexts[quote] ||
    "This quote represents key themes in Animal Farm including the corruption of power, the manipulation of language, and the betrayal of revolutionary ideals. It appears in Chapter " +
      chapter +
      " and is spoken by " +
      character +
      "."
  )
}