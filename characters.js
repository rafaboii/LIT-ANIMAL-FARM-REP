// Character Bio functionality
const characterList = document.getElementById('character-list');
const characterDetails = document.getElementById('character-details');

const characters = {
  napoleon: {
    name: 'Napoleon',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Napoleon is a large, fierce-looking Berkshire boar who is the main antagonist of Animal Farm. Based on Joseph Stalin, Napoleon uses military force (his nine loyal attack dogs) to intimidate the other animals and consolidate his power.`,
    characteristics: [
      'Manipulative and cunning',
      'Power-hungry and ruthless',
      'Excellent strategic thinker',
      'Gradually adopts human behaviors he once condemned'
    ],
    analysis: `Napoleon represents the corrupt leadership that betrays the revolution's ideals. He gradually changes the Seven Commandments to benefit himself and the other pigs, ultimately becoming indistinguishable from the humans the animals sought to overthrow.`
  },
  snowball: {
    name: 'Snowball',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Snowball is a pig who, with Napoleon, leads the rebellion against Mr. Jones. Based on Leon Trotsky, Snowball is intelligent, passionate, eloquent, and less subtle and devious than Napoleon.`,
    characteristics: [
      'Intelligent and innovative',
      'Eloquent speaker',
      'Genuinely committed to Animalism',
      'Focuses on education and infrastructure'
    ],
    analysis: `Snowball represents the intellectual revolutionary who is driven by genuine idealism. His plans for the windmill symbolize technological progress and his commitment to improving the animals' lives.`
  },
  boxer: {
    name: 'Boxer',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Boxer is an enormous, powerful cart-horse with tremendous strength. He is dedicated to Animal Farm and follows two personal mottos: "I will work harder" and "Napoleon is always right."`,
    characteristics: [
      'Incredibly strong and hardworking',
      'Loyal and dedicated',
      'Limited intelligence',
      'Trusting to a fault'
    ],
    analysis: `Boxer represents the working class or proletariat who are exploited by the ruling class. His strength and loyalty are taken advantage of, and when he can no longer work, he is betrayed and sent to the knacker.`
  },
  clover: {
    name: 'Clover',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Clover is a motherly mare who cares deeply for the other animals. She is one of the few who can read somewhat and notices the changes to the Seven Commandments.`,
    characteristics: [
      'Maternal and caring',
      'Observant but not confrontational',
      'Loyal to Animal Farm',
      'Skeptical but silent'
    ],
    analysis: `Clover represents the skeptical working class who notice the corruption of their leaders but feel powerless to act against it. She symbolizes those who see the betrayal of revolutionary ideals but lack the means to resist.`
  },
  benjamin: {
    name: 'Benjamin',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Benjamin is an old, cynical donkey who is the oldest animal on the farm. He is skeptical of the revolution and maintains that life will remain unpleasant no matter who is in charge.`,
    characteristics: [
      'Cynical and pessimistic',
      'Intelligent and literate',
      'Emotionally detached',
      'Outlives most other animals'
    ],
    analysis: `Benjamin represents the cynical intellectuals who see through political propaganda but do nothing to challenge it. His statement that "life would go on as it had always gone on—that is, badly" reflects his fatalistic worldview.`
  },
  squealer: {
    name: 'Squealer',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Squealer is a small, fat pig who serves as Napoleon's propagandist. He is extremely persuasive and can "turn black into white" with his manipulative rhetoric.`,
    characteristics: [
      'Persuasive and articulate',
      'Manipulative and deceptive',
      'Loyal to Napoleon',
      'Expert at distorting facts'
    ],
    analysis: `Squealer represents state propaganda and the media control used by totalitarian regimes. His ability to confuse and persuade the animals mirrors how propaganda is used to maintain power through deception.`
  },
  mollie: {
    name: 'Mollie',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Mollie is a vain, white mare who loves sugar cubes and ribbons. She eventually abandons Animal Farm to be pampered by humans.`,
    characteristics: [
      'Vain and materialistic',
      'Lazy and self-centered',
      'Yearns for human comforts',
      'Disloyal to the revolution'
    ],
    analysis: `Mollie represents the bourgeoisie or middle class who are unwilling to sacrifice their luxuries for revolutionary ideals. Her departure symbolizes those who fled Russia after the revolution rather than live under communism.`
  },
  mrjones: {
    name: 'Mr. Jones',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animal%20Farm%20Project.png-AXQCA8BfUwfiypQu0WDuszux4yvANd.jpeg',
    description: `Mr. Jones is the original owner of Manor Farm, who is overthrown by the animals. He is an alcoholic and neglectful farmer.`,
    characteristics: [
      'Alcoholic and negligent',
      'Cruel to animals',
      'Incompetent as a farmer',
      'Represents the overthrown ruling class'
    ],
    analysis: `Mr. Jones represents Tsar Nicholas II, the last emperor of Russia. His neglect of the farm parallels the Tsar's mismanagement of Russia, which contributed to the Russian Revolution.`
  }
};

// Add click event listeners to character list items
characterList.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', function() {
    // Remove active class from all items
    characterList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    
    // Add active class to clicked item
    this.classList.add('active');
    
    // Get character data
    const character = characters[this.dataset.character];
    
    // If character exists, update details
    if (character) {
      characterDetails.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character-image">
        <div class="character-info">
          <h3>${character.name}</h3>
          <p>${character.description}</p>
          <p>Key characteristics:</p>
          <ul>
            ${character.characteristics.map(trait => `<li>${trait}</li>`).join('')}
          </ul>
          <p>${character.analysis}</p>
        </div>
      `;
    }
  });
});