// Character Bio functionality
document.addEventListener("DOMContentLoaded", () => {
    const characterList = document.getElementById("character-list")
    const characterItems = characterList.querySelectorAll("li")
  
    // Add entrance animations
    animateCharacterList()
  
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
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
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
      snowball: {
        name: "Snowball",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
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
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
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
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Clover is a motherly mare who cares deeply for the other animals. She is one of the few who notices the gradual changes in the farm's principles but lacks the ability to articulate her concerns.",
        characteristics: [
          "Maternal and caring",
          "Observant but inarticulate",
          "Loyal to the farm",
          "Increasingly doubtful about the revolution's outcome",
        ],
        significance:
          "Clover represents the segment of the working class that recognizes the corruption of revolutionary ideals but feels powerless to challenge it. Her silent doubts reflect the quiet disillusionment of many Soviet citizens.",
      },
      benjamin: {
        name: "Benjamin",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Benjamin is an elderly donkey, the oldest animal on the farm. He is cynical and pessimistic, rarely offering his opinion but observing everything with a detached skepticism.",
        characteristics: [
          "Cynical and pessimistic",
          "Intelligent and literate",
          "Refuses to get involved",
          'Lives by the philosophy that "life will go on as it has always gone on—that is, badly"',
        ],
        significance:
          "Benjamin represents the intellectual skeptics who recognize the corruption of power but remain passive. His refusal to take action until Boxer's fate becomes clear symbolizes how inaction enables tyranny.",
      },
      squealer: {
        name: "Squealer",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Squealer is a small, fat pig known for his persuasive speaking abilities. He serves as Napoleon's propagandist, justifying every decision and rewriting history to maintain the pigs' power.",
        characteristics: [
          "Extremely persuasive speaker",
          "Manipulative and dishonest",
          "Skilled at twisting language",
          "Completely loyal to Napoleon",
        ],
        significance:
          'Squealer represents state propaganda in totalitarian regimes. His ability to make the animals believe contradictions ("Snowball was always against us") reflects how propaganda can distort reality and rewrite history.',
      },
      mollie: {
        name: "Mollie",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Mollie is a vain, white mare who loves sugar cubes and ribbons. She is reluctant to work and eventually abandons Animal Farm to return to human care.",
        characteristics: ["Vain and self-centered", "Materialistic", "Avoids work", "Prefers comfort to freedom"],
        significance:
          "Mollie represents the bourgeoisie or upper-class citizens who are unwilling to sacrifice their luxuries for revolutionary ideals. Her departure symbolizes the emigration of those who preferred their previous lifestyle.",
      },
      oldmajor: {
        name: "Old Major",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Old Major is an elderly prize Middle White boar who inspires the animals with his vision of a world where animals are free from human oppression. He dies three days after delivering his speech.",
        characteristics: ["Wise and respected", "Visionary", "Eloquent speaker", "Revolutionary idealist"],
        significance:
          "Old Major represents Karl Marx and Vladimir Lenin, whose ideas inspired the Russian Revolution. His speech about animal unity against human exploitation parallels Marxist theory, and his death before seeing the revolution mirrors Lenin's early death.",
      },
      mrjones: {
        name: "Mr. Jones",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Mr. Jones is the original owner of Manor Farm (later Animal Farm). He is an alcoholic and neglectful farmer who mistreats his animals.",
        characteristics: [
          "Alcoholic and negligent",
          "Cruel to animals",
          "Incompetent farmer",
          "Represents the old order",
        ],
        significance:
          "Mr. Jones represents Tsar Nicholas II, the last emperor of Russia. His neglect of the farm symbolizes the Tsar's mismanagement of Russia, and his expulsion represents the Russian Revolution of 1917.",
      },
      pilkington: {
        name: "Mr. Pilkington",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Mr. Pilkington is the owner of Foxwood, a large neighboring farm. He is an easy-going gentleman farmer who spends most of his time hunting and fishing rather than working on his farm.",
        characteristics: [
          "Leisurely and aristocratic",
          "Inefficient farmer",
          "Competitive with Frederick",
          "Eventually allies with Napoleon",
        ],
        significance:
          "Mr. Pilkington represents the capitalist nations (particularly Great Britain) that initially opposed the Soviet Union but later established diplomatic relations. The card game at the end symbolizes the complex and often duplicitous relations between these powers.",
      },
      frederick: {
        name: "Mr. Frederick",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Mr. Frederick is the owner of Pinchfield, a small but well-kept neighboring farm. He is a tough, shrewd businessman known for his harsh treatment of animals and humans alike.",
        characteristics: [
          "Ruthless and calculating",
          "Efficient but cruel farmer",
          "Deceptive in business dealings",
          "Briefly trades with Animal Farm before attacking it",
        ],
        significance:
          "Mr. Frederick represents Nazi Germany. His trade deal with Napoleon that ends in betrayal parallels the Nazi-Soviet Non-Aggression Pact of 1939, which Hitler violated when Germany invaded the Soviet Union in 1941.",
      },
      moses: {
        name: "Moses",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background.jpg-NpcfRZ9ph5r5ccukhTwKPwuxvixR0R.jpeg",
        description:
          "Moses is a tame raven who tells the animals stories about Sugarcandy Mountain, a paradise where animals go when they die. He leaves after the rebellion but returns years later and is tolerated by the pigs.",
        characteristics: [
          "Storyteller and dreamer",
          "Speaks of afterlife rewards",
          "Doesn't work but receives privileges",
          "Provides comfort to suffering animals",
        ],
        significance:
          "Moses represents organized religion in Soviet society. Initially rejected by the revolutionary leadership, religion was later tolerated by Stalin as a way to pacify the suffering population with promises of future rewards.",
      },
    }
  
    return characters[character] || characters.napoleon
  }
  