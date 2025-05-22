// Character Bio functionality
document.addEventListener("DOMContentLoaded", () => {
  const characterList = document.getElementById("character-list")
  if (!characterList) return;
  
  const characterItems = characterList.querySelectorAll("li")

  // Add entrance animations
  animateCharacterList()

  // Add mobile menu toggle functionality
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('nav');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      menuToggle.classList.toggle('open');
    });
  }

  characterItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      characterItems.forEach((i) => i.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Update character details with animation
      updateCharacterDetails(this.getAttribute("data-character"))
    })
  })

  // Initial character details load with animation
  setTimeout(() => {
    const characterDetails = document.getElementById("character-details")
    if (!characterDetails) return;
    
    characterDetails.style.opacity = "0"
    characterDetails.style.transform = "translateY(20px)"

    setTimeout(() => {
      characterDetails.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      characterDetails.style.opacity = "1"
      characterDetails.style.transform = "translateY(0)"
    }, 100)
  }, 300)
})

function animateCharacterList() {
  const items = document.querySelectorAll("#character-list li")
  if (!items.length) return;

  items.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-20px)"

    setTimeout(
      () => {
        item.style.transition = "opacity 0.3s ease, transform 0.3s ease"
        item.style.opacity = "1"
        item.style.transform = "translateX(0)"
      },
      100 + index * 50,
    )
  })
}

function updateCharacterDetails(character) {
  const characterDetails = document.getElementById("character-details")
  if (!characterDetails) return;
  
  const characterData = getCharacterData(character)

  // Fade out
  characterDetails.style.opacity = "0"
  characterDetails.style.transform = "translateY(20px)"

  setTimeout(() => {
    // Update content
    characterDetails.innerHTML = `
      <img src="${characterData.image}" alt="${characterData.name}" class="character-image">
      <div class="character-info">
        <h3>${characterData.name.toUpperCase()}</h3>
        <p>${characterData.description}</p>
        <p class="key-characteristics">Key characteristics:</p>
        <ul>
          ${characterData.characteristics.map((trait) => `<li>${trait}</li>`).join("")}
        </ul>
        <p>${characterData.significance}</p>
      </div>
    `

    // Fade in
    setTimeout(() => {
      characterDetails.style.opacity = "1"
      characterDetails.style.transform = "translateY(0)"
    }, 50)
  }, 300)
}

function getCharacterData(character) {
  const characters = {
    napoleon: {
      name: "Napoleon",
      image:
        "images/napoleon.jpg",
      description:
        "Napoleon is a large, fierce-looking Berkshire boar who is the main antagonist of Animal Farm. Based on Joseph Stalin, Napoleon uses military force (his nine loyal attack dogs) to intimidate the other animals and consolidate his power.",
      characteristics: [
        "Manipulative and cunning",
        "Power-hungry and ruthless",
        "Excellent strategic thinker",
        "Gradually adopts human behaviors he once condemned",
      ],
      significance:
        "Napoleon represents the corrupt leadership that betrays the revolution's ideals. He gradually changes the Seven Commandments to benefit himself and the other pigs, ultimately becoming indistinguishable from the humans the animals sought to overthrow.",
    },
    // Other character data remains the same
    snowball: {
      name: "Snowball",
      image:
        "images/snowball.jpg",
      description:
        "Snowball is a young, intelligent, and idealistic pig who is one of the leaders of the revolution. Based on Leon Trotsky, Snowball is a brilliant orator and planner who genuinely believes in the principles of Animalism and works to improve the farm.",
      characteristics: [
        "Intelligent and creative",
        "Eloquent speaker",
        "Committed to Animalism's ideals",
        "Focuses on education and infrastructure",
      ],
      significance:
        "Snowball represents the intellectual, idealistic revolutionary who is eventually purged by the more ruthless and power-hungry Napoleon. His plans for the windmill and his emphasis on education reflect Trotsky's focus on industrialization and literacy.",
    },
    boxer: {
      name: "Boxer",
      image:
        "images/boxer.jpg",
      description:
        'Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    clover: {
      name: "Clover",
      image:
        "images/clover.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    benjamin: {
      name: "Benjamin",
      image:
        "images/benjamin.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    squealer: {
      name: "Squealer",
      image:
        "images/squealer.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    mollie: {
      name: "Mollie",
      image:
        "images/mollie.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    oldmajor: {
      name: "Old Major",
      image:
        "images/old-major.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    mrjones: {
      name: "Mr. Jones",
      image:
        "images/jones.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    pilkington: {
      name: "Mr. Pilkington",
      image:
        "images/pilkington.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    frederick: {
      name: "Mr. Frederick",
      image:
        "images/frederick.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    },
    moses: {
      name: "Moses",
      image:
        "images/moses.jpg",
      description:
        'EDIT TEXT! Boxer is a large, powerful cart-horse known for his incredible strength and work ethic. He is devoted to Animal Farm and adopts the personal mottos "I will work harder" and later "Napoleon is always right."',
      characteristics: [
        "Immensely strong and hardworking",
        "Loyal and dedicated",
        "Limited intelligence but good-hearted",
        "Trusting to a fault",
      ],
      significance:
        "Boxer represents the loyal working class who support the revolution with their labor but are ultimately betrayed by the leadership. His sale to the knacker when he is no longer useful symbolizes how totalitarian regimes exploit and discard workers.",
    }
  }

  return characters[character] || characters.napoleon
}