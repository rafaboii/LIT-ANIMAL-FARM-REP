// Quiz functionality
const quizQuestions = {
    easy: [
      {
        question: "Which character represents Leon Trotsky in Animal Farm?",
        options: ["Napoleon", "Snowball", "Boxer", "Squealer"],
        correctAnswer: 1
      },
      {
        question: "What was Boxer's motto?",
        options: ["Four legs good, two legs bad", "I will work harder", "Napoleon is always right", "All animals are equal"],
        correctAnswer: 1
      },
      {
        question: "How does the original commandment 'All animals are equal' change by the end of the novel?",
        options: [
          "All animals are equal, except the pigs",
          "All animals are equal, but some animals are more equal than others",
          "All animals are equal under Napoleon's leadership",
          "The commandment remains unchanged"
        ],
        correctAnswer: 1
      },
      {
        question: "What happens to Boxer when he becomes too old to work?",
        options: [
          "He is given a comfortable retirement",
          "He is sent to a hospital for treatment",
          "He is sold to a knacker to be slaughtered",
          "He dies peacefully in his sleep"
        ],
        correctAnswer: 2
      },
      {
        question: "Which human character represents the Tsar of Russia?",
        options: ["Mr. Jones", "Mr. Frederick", "Mr. Pilkington", "Mr. Whymper"],
        correctAnswer: 0
      }
    ],
    medium: [
      {
        question: "What does the windmill symbolize in Animal Farm?",
        options: [
          "The Five-Year Plans and Soviet industrialization",
          "The animals' desire for electricity",
          "Napoleon's architectural ambitions",
          "The futility of animal labor"
        ],
        correctAnswer: 0
      },
      {
        question: "Which animal represents the skeptical intellectual who refuses to participate?",
        options: ["Mollie", "Benjamin", "Clover", "Moses"],
        correctAnswer: 1
      },
      {
        question: "What historical event does the Battle of the Cowshed represent?",
        options: [
          "The Russian Civil War",
          "World War I",
          "The October Revolution",
          "The Cold War"
        ],
        correctAnswer: 0
      },
      {
        question: "How do the pigs justify their consumption of milk and apples?",
        options: [
          "They claim they need the nutrients to think properly and manage the farm",
          "They say they're testing the food for poison",
          "They argue that pigs naturally require more nutrition",
          "They don't justify it; they simply take it"
        ],
        correctAnswer: 0
      },
      {
        question: "What does Sugarcandy Mountain represent?",
        options: [
          "Heaven or religion",
          "A mythical place where animals can escape",
          "The promise of abundance after the revolution",
          "The farm after the windmill is built"
        ],
        correctAnswer: 0
      }
    ],
    hard: [
      {
        question: "Which historical figure does Squealer represent?",
        options: [
          "Leon Trotsky",
          "Vyacheslav Molotov",
          "Pravda (Soviet propaganda newspaper)",
          "Lavrentiy Beria"
        ],
        correctAnswer: 2
      },
      {
        question: "What does the card game at the end of the novel symbolize?",
        options: [
          "The Tehran Conference of 1943",
          "The corruption of the pigs",
          "The Yalta Conference of 1945",
          "The Cold War tensions between capitalist and communist powers"
        ],
        correctAnswer: 0
      },
      {
        question: "Which real-world event is paralleled by Napoleon's violent purge of animals who confess to being in league with Snowball?",
        options: [
          "The Russian Civil War",
          "The Great Purge (Stalin's show trials)",
          "The Kronstadt Rebellion",
          "The formation of the Warsaw Pact"
        ],
        correctAnswer: 1
      },
      {
        question: "What does Frederick's attack on Animal Farm and destruction of the windmill represent?",
        options: [
          "The Allied invasion of Normandy",
          "The Nazi invasion of the Soviet Union (Operation Barbarossa)",
          "The Winter War between Finland and the Soviet Union",
          "The Berlin Blockade"
        ],
        correctAnswer: 1
      },
      {
        question: "Which of the following is NOT one of the original Seven Commandments?",
        options: [
          "No animal shall sleep in a bed",
          "No animal shall drink alcohol",
          "No animal shall engage in trade",
          "No animal shall kill any other animal"
        ],
        correctAnswer: 2
      }
    ]
  };
  
  let currentDifficulty = 'easy';
  let currentQuestion = 0;
  let score = 0;
  let answered = false;
  let completedLevels = {
    easy: false,
    medium: false,
    hard: false
  };
  let quizScores = [];
  
  function setDifficulty(difficulty) {
    // Check if the difficulty level is locked
    const difficultyBtn = document.querySelector(`.difficulty-btn[data-difficulty="${difficulty}"]`);
    if (difficultyBtn.classList.contains('locked')) {
      return;
    }
    
    // Update active difficulty
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    difficultyBtn.classList.add('active');
    
    // Set new difficulty and reset quiz
    currentDifficulty = difficulty;
    currentQuestion = 0;
    score = 0;
    answered = false;
    loadQuestion();
  }
  
  function loadQuestion() {
    const questions = quizQuestions[currentDifficulty];
    const progressBar = document.getElementById('quiz-progress');
    
    // Update progress bar
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
    
    // Check if we're at the end of the quiz
    if (currentQuestion >= questions.length) {
      showResults();
      return;
    }
    
    // Reset answered state
    answered = false;
    
    // Get current question data
    const questionData = questions[currentQuestion];
    
    // Create question HTML
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = `
      <div class="quiz-question">
        <h3>${currentQuestion + 1}. ${questionData.question}</h3>
        <div class="quiz-options">
          ${questionData.options.map((option, index) => `
            <div class="quiz-option" onclick="selectOption(this, ${index})">
              <div class="option-marker">${String.fromCharCode(65 + index)}</div>
              <div>${option}</div>
            </div>
          `).join('')}
        </div>
      </div>
  
      <div class="quiz-navigation">
        <button class="quiz-button" id="prev-button" onclick="prevQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>Previous</button>
        <button class="quiz-button" id="next-button" onclick="nextQuestion()">Next</button>
      </div>
    `;
  }
  
  function selectOption(option, index) {
    if (answered) return;
    
    const options = document.querySelectorAll('.quiz-option');
    
    // Remove selected class from all options
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    option.classList.add('selected');
    
    // Enable next button
    document.getElementById('next-button').disabled = false;
  }
  
  function nextQuestion() {
    const selectedOption = document.querySelector('.quiz-option.selected');
    
    if (selectedOption && !answered) {
      const selectedIndex = Array.from(document.querySelectorAll('.quiz-option')).indexOf(selectedOption);
      if (selectedIndex === quizQuestions[currentDifficulty][currentQuestion].correctAnswer) {
        score++;
      }
    }
    
    currentQuestion++;
    loadQuestion();
  }
  
  function prevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }
  
  function showResults() {
    const quizContent = document.getElementById('quiz-content');
    const progressBar = document.getElementById('quiz-progress');
    const questions = quizQuestions[currentDifficulty];
    
    // Complete progress bar
    progressBar.style.width = '100%';
    
    // Calculate percentage
    const percentage = Math.round((score / questions.length) * 100);
    
    // Mark level as completed
    completedLevels[currentDifficulty] = true;
    
    // Save score
    quizScores.push({
      difficulty: currentDifficulty,
      score: score,
      total: questions.length,
      percentage: percentage,
      date: new Date().toLocaleString()
    });
    
    // Unlock next level if applicable
    if (currentDifficulty === 'easy' && percentage >= 60) {
      document.querySelector('.difficulty-btn[data-difficulty="medium"]').classList.remove('locked');
    } else if (currentDifficulty === 'medium' && percentage >= 60) {
      document.querySelector('.difficulty-btn[data-difficulty="hard"]').classList.remove('locked');
    }
    
    // Determine feedback based on score
    let feedback;
    if (percentage >= 80) {
      feedback = "Excellent! You have a deep understanding of Animal Farm.";
    } else if (percentage >= 60) {
      feedback = "Good job! You have a solid grasp of the key concepts in Animal Farm.";
    } else if (percentage >= 40) {
      feedback = "Not bad, but there's room for improvement. Consider revisiting some key themes and characters.";
    } else {
      feedback = "You might want to reread Animal Farm to better understand its themes and characters.";
    }
    
    // Display results
    quizContent.innerHTML = `
      <div class="quiz-results">
        <h3>Quiz Results - ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level</h3>
        <div class="quiz-score">You scored ${score} out of ${questions.length} (${percentage}%)</div>
        <div class="quiz-feedback">${feedback}</div>
        <button class="quiz-button" onclick="restartQuiz()">Restart Quiz</button>
        
        <div class="quiz-scores-history">
          <h4>Your Quiz History</h4>
          <ul class="scores-list">
            ${quizScores.map(record => `
              <li>
                <span>${record.difficulty.charAt(0).toUpperCase() + record.difficulty.slice(1)} Level:</span>
                <span>${record.score}/${record.total} (${record.percentage}%)</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
  }
  
  // Initialize the quiz
  document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
  });