// Thematic Analysis functionality
document.addEventListener("DOMContentLoaded", () => {
  // Set up theme search functionality
  const themeSearch = document.getElementById("theme-search")
  if (themeSearch) {
    themeSearch.addEventListener("input", function () {
      filterThemes(this.value.toLowerCase())
    })
  }

  // Add entrance animations for theme cards
  animateThemeCards()

  // Add click event listeners to theme headers
  const themeHeaders = document.querySelectorAll(".theme-header")
  themeHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      toggleTheme(this.parentElement)
    })
  })
})

function animateThemeCards() {
  const cards = document.querySelectorAll(".theme-card")

  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"

    setTimeout(
      () => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      },
      100 + index * 100,
    )
  })
}

function toggleTheme(themeCard) {
  // Toggle active class
  const wasActive = themeCard.classList.contains("active")

  // If it was active, just close it
  if (wasActive) {
    themeCard.classList.remove("active")
    return
  }

  // Otherwise, close all others and open this one
  const allCards = document.querySelectorAll(".theme-card")
  allCards.forEach((card) => {
    if (card !== themeCard) {
      card.classList.remove("active")
    }
  })

  themeCard.classList.add("active")

  // Scroll to the card
  setTimeout(() => {
    themeCard.scrollIntoView({ behavior: "smooth", block: "start" })
  }, 300)

  // Animate the content
  const content = themeCard.querySelector(".theme-content")
  content.style.opacity = "0"

  setTimeout(() => {
    content.style.opacity = "1"
    content.style.transition = "opacity 0.5s ease"
  }, 300)
}

function filterThemes(searchTerm) {
  const themeCards = document.querySelectorAll(".theme-card")
  let foundMatch = false

  themeCards.forEach((card) => {
    const title = card.querySelector(".theme-title").textContent.toLowerCase()
    const content = card.querySelector(".theme-content").textContent.toLowerCase()

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      card.style.display = "block"

      // Highlight matching text if there's a search term
      if (searchTerm.length > 0) {
        highlightText(card, searchTerm)

        // Open the card if it matches
        if (!card.classList.contains("active")) {
          card.classList.add("active")
        }

        foundMatch = true
      } else {
        // Remove highlights if search is cleared
        removeHighlights(card)
      }
    } else {
      card.style.display = "none"
    }
  })

  // Show "no results" message if needed
  const themesContainer = document.getElementById("themes-container")
  let noResults = document.getElementById("no-results-message")

  if (!foundMatch && searchTerm.length > 0) {
    if (!noResults) {
      noResults = document.createElement("div")
      noResults.id = "no-results-message"
      noResults.className = "no-results-message"
      noResults.textContent = "No themes match your search criteria."
      noResults.style.padding = "20px"
      noResults.style.textAlign = "center"
      noResults.style.color = "#666"
      themesContainer.appendChild(noResults)
    }
  } else if (noResults) {
    noResults.remove()
  }
}

function highlightText(card, searchTerm) {
  // Remove existing highlights first
  removeHighlights(card)

  // Function to highlight text in an element
  function highlightInElement(element) {
    if (element.nodeType === 3) {
      // Text node
      const text = element.nodeValue
      const lowerText = text.toLowerCase()
      const index = lowerText.indexOf(searchTerm)

      if (index >= 0) {
        const span = document.createElement("span")
        span.className = "highlight"

        const before = document.createTextNode(text.substring(0, index))
        const match = document.createTextNode(text.substring(index, index + searchTerm.length))
        const after = document.createTextNode(text.substring(index + searchTerm.length))

        const matchSpan = document.createElement("span")
        matchSpan.className = "highlight"
        matchSpan.style.backgroundColor = "rgba(151, 23, 29, 0.2)"
        matchSpan.style.borderRadius = "2px"
        matchSpan.style.padding = "0 2px"
        matchSpan.appendChild(match)

        const parent = element.parentNode
        parent.insertBefore(before, element)
        parent.insertBefore(matchSpan, element)
        parent.insertBefore(after, element)
        parent.removeChild(element)
      }
    } else if (element.nodeType === 1) {
      // Element node
      // Skip if it's a highlight span
      if (element.className === "highlight") return

      // Process child nodes
      Array.from(element.childNodes).forEach((child) => {
        highlightInElement(child)
      })
    }
  }

  // Start highlighting from the content
  const content = card.querySelector(".theme-content")
  Array.from(content.childNodes).forEach((child) => {
    highlightInElement(child)
  })
}

function removeHighlights(card) {
  const highlights = card.querySelectorAll(".highlight")

  highlights.forEach((highlight) => {
    const parent = highlight.parentNode
    const text = highlight.textContent
    const textNode = document.createTextNode(text)

    parent.insertBefore(textNode, highlight)
    parent.removeChild(highlight)
  })
}
