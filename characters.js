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
        'Clover is a gentle, caring cart-horse who plays a maternal role on Animal Farm. Loyal and hardworking, she represents the female working class and is deeply saddened by the corruption of the revolution, though she lacks the education to challenge it directly.',
      characteristics: [
        "Kind and nurturing",
        "Loyal yet questioning",
        "Lacks education and critical thinking",
        "Symbol of silent suffering and disillusionment",
      ],
      significance:
        "Clover represents the proletariat who remain faithful to the cause but are powerless to stop its betrayal. Although she notices the changes in the commandments and the pigs’ behavior, she is unable to articulate her doubts and ultimately accepts the new reality with resignation.",
    },
    benjamin: {
      name: "Benjamin",
      image:
        "images/benjamin.jpg",
      description:
        'Benjamin is a cynical, elderly donkey who is one of the oldest animals on the farm. He rarely speaks, but when he does, it with is dry wit and skepticism, showing his belief that no true change will ever come, regardless of who is in charge.',
      characteristics: [
        "Intelligent but pessimistic",
        "Loyal yet emotionally detached",
        "Deeply skeptical of authority",
        "Rarely acts, even when he understands the truth",
      ],
      significance:
        "Benjamin represents the intellectual class who recognize tyranny but choose not to act. Although he understands what is happening on the farm, his fatalism and inaction allow the pigs' oppression to continue unchallenged.",
    },
    squealer: {
      name: "Squealer",
      image:
        "images/squealer.jpg",
      description:
        'Squealer is a small, fat pig with a shrill voice who serves as Napoleon’s chief propagandist. He manipulates language to justify the actions of the pigs and convince the other animals that everything is being done for their benefit.',
      characteristics: [
        "Persuasive and deceptive",
        "Highly intelligent and articulate",
        "Loyal mouthpiece of the regime",
        "Twists truth to control perception",
      ],
      significance:
        "Squealer represents propaganda and the media used to manipulate and control public opinion. He constantly rewrites history and alters the commandments, ensuring that the animals remain confused, misinformed, and obedient to Napoleon’s rule.",
    },
    mollie: {
      name: "Mollie",
      image:
        "images/mollie.jpg",
      description:
        'Mollie is a vain, shallow white mare who enjoys ribbons, sugar, and attention from humans. She struggles to adapt to life under animal rule and eventually abandons the farm in search of comfort and luxury.',
      characteristics: [
        "Self-centered and materialistic",
        "Frivolous and easily distracted",
        "Resistant to change",
        "Values comfort over freedom",
      ],
      significance:
        "Mollie represents the bourgeoisie who resist revolution because it threatens their privileged lifestyle. Her departure from the farm symbolizes those who flee a new regime when it demands sacrifice and hard work over personal pleasure.",
    },
    oldmajor: {
      name: "Old Major",
      image:
        "images/old-major.jpg",
      description:
        'Old Major is an elderly, wise Middle White boar who inspires the animals to rebel with his dream of an equal society. Based on Karl Marx and Vladimir Lenin, he plants the ideological seeds of the revolution but dies before seeing it take place.',
      characteristics: [
        "Wise and persuasive",
        "Idealistic and visionary",
        "Respected by all animals",
        "Serves as the philosophical foundation of the rebellion",
      ],
      significance:
        "Old Major represents the revolutionary thinkers whose ideas inspire change but are later distorted by those in power. His teachings are manipulated by Napoleon and the pigs to justify a regime completely opposed to his original vision of equality and unity.",
    },
    mrjones: {
      name: "Mr. Jones",
      image:
        "images/jones.jpg",
      description:
        'Mr. Jones is the often-drunk farmer who originally runs Manor Farm before being overthrown by the animals. He is careless and neglectful, which sparks the rebellion of animals against human rule.',
      characteristics: [
        "Irresponsible and cruel",
        "Neglectful of the animals' needs",
        "Represents oppressive authority",
        "Eventually powerless and forgotten",
      ],
      significance:
        "Mr. Jones represents Tsar Nicholas II and the corrupt, ineffective leadership that sparked the Russian Revolution. His downfall marks the beginning of the animals’ fight for freedom, though his misrule is eventually replaced by an equally oppressive regime under Napoleon.",
    },
    pilkington: {
      name: "Mr. Pilkington",
      image:
        "images/pilkington.jpg",
      description:
        'Mr. Pilkington is the easygoing and crafty owner of Foxwood, a neighboring farm that represents the capitalist countries of the West. He maintains a complicated relationship with Animal Farm, eventually allying with Napoleon for mutual benefit.',
      characteristics: [
        "Shrewd and diplomatic",
        "Represents Western political powers",
        "Willing to cooperate when profitable",
        "Initially skeptical but later supportive",
      ],
      significance:
        "Mr. Pilkington represents the Western allies, particularly Britain and the United States, who at first oppose the Soviet regime but later collaborate with it when convenient. His eventual camaraderie with Napoleon highlights the hypocrisy and self-interest of political alliances.",
    },
    frederick: {
      name: "Mr. Frederick",
      image:
        "images/frederick.jpg",
      description:
        'Mr. Frederick is the tough, ruthless owner of Pinchfield, a neighboring farm known for its harsh conditions. He tricks Napoleon with counterfeit money and later attacks Animal Farm, showing his treacherous and violent nature.',
      characteristics: [
        "Cruel and untrustworthy",
        "Cunning and manipulative",
        "Harsh toward his own workers",
        "Aggressive and warlike",
      ],
      significance:
        "Mr. Frederick represents Adolf Hitler and Nazi Germany, particularly in reference to the broken non-aggression pact with Stalin. His betrayal and attack on Animal Farm mirror the Nazi invasion of the Soviet Union, exposing the dangers of misplaced trust in authoritarian regimes.",
    },
    moses: {
      name: "Moses",
      image:
        "images/moses.jpg",
      description:
        'Moses is a tame raven who tells the animals stories about Sugarcandy Mountain, a paradise where animals go when they die. He disappears after the rebellion but later returns, continuing to preach his tales despite the disapproval of pigs.',
      characteristics: [
        "Religious and mysterious",
        "Persuasive storyteller",
        "Detached from the animals’ struggles",
        "Used to maintain hope and obedience",
      ],
      significance:
        "Moses represents organized religion, particularly the Russian Orthodox Church, which was suppressed and later tolerated by the Soviet regime. His tales of Sugarcandy Mountain offer the animals comfort and a distraction from their suffering, helping to maintain control.",
    }
  }

  return characters[character] || characters.napoleon
}