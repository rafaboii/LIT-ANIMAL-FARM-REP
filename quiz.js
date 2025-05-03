// Quiz functionality
const quizQuestions = {
  easy: [
    {
      question: "Which character represents Leon Trotsky in Animal Farm?",
      options: ["Napoleon", "Snowball", "Boxer", "Squealer"],
      correctAnswer: 1,
    },
    {
      question: "What was Boxer's motto?",
      options: [
        "Four legs good, two legs bad",
        "I will work harder",
        "Napoleon is always right",
        "All animals are equal",
      ],
      correctAnswer: 1,
    },
    {
      question: "How does the original commandment 'All animals are equal' change by the end of the novel?",
      options: [
        "All animals are equal, except the pigs",
        "All animals are equal, but some animals are more equal than others",
        "All animals are equal under Napoleon's leadership",
        "The commandment remains unchanged",
      ],
      correctAnswer: 1,
    },
    {
      question: "What happens to Boxer when he becomes too old to work?",
      options: [
        "He is given a comfortable retirement",
        "He is sent to a hospital for treatment",
        "He is sold to a knacker to be slaughtered",
        "He dies peacefully in his sleep",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which human character represents the Tsar of Russia?",
      options: ["Mr. Jones", "Mr. Frederick", "Mr. Pilkington", "Mr. Whymper"],
      correctAnswer: 0,
    },
  ],
  medium: [
    {
      question: "What does the windmill symbolize in Animal Farm?",
      options: [
        "The Five-Year Plans and Soviet industrialization",
        "The animals' desire for electricity",
        "Napoleon's architectural ambitions",
        "The futility of animal labor",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which animal represents the skeptical intellectual who refuses to participate?",
      options: ["Mollie", "Benjamin", "Clover", "Moses"],
      correctAnswer: 1,
    },
    {
      question: "What historical event does the Battle of the Cowshed represent?",
      options: ["The Russian Civil War", "World War I", "The October Revolution", "The Cold War"],
      correctAnswer: 0,
    },
    {
      question: "How do the pigs justify their consumption of milk and apples?",
      options: [
        "They claim they need the nutrients to think properly and manage the farm",
        "They say they're testing the food for poison",
        "They argue that pigs naturally require more nutrition",
        "They don't justify it; they simply take it",
      ],
      correctAnswer: 0,
    },
    {
      question: "What does Sugarcandy Mountain represent?",
      options: [
        "Heaven or religion",
        "A mythical place where animals can escape",
        "The promise of abundance after the revolution",
        "The farm after the windmill is built",
      ],
      correctAnswer: 0,
    },
  ],
  hard: [
    {
      question: "Which historical figure does Squealer represent?",
      options: ["Leon Trotsky", "Vyacheslav Molotov", "Pravda (Soviet propaganda newspaper)", "Lavrentiy Beria"],
      correctAnswer: 2,
    },
    {
      question: "What does the card game at the end of the novel symbolize?",
      options: [
        "The Tehran Conference of 1943",
        "The corruption of the pigs",
        "The Yalta Conference of 1945",
        "The Cold War tensions between capitalist and communist powers",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Which real-world event is paralleled by Napoleon's violent purge of animals who confess to being in league with Snowball?",
      options: [
        "The Russian Civil War",
        "The Great Purge (Stalin's show trials)",
        "The Kronstadt Rebellion",
        "The formation of the Warsaw Pact",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does Frederick's attack on Animal Farm and destruction of the windmill represent?",
      options: [
        "The Allied invasion of Normandy",
        "The Nazi invasion of the Soviet Union (Operation Barbarossa)",
        "The Winter War between Finland and the Soviet Union",
        "The Berlin Blockade",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of the following is NOT one of the original Seven Commandments?",
      options: [
        "No animal shall sleep in a bed",
        "No animal shall drink alcohol",
        "No animal shall engage in trade",
        "No animal shall kill any other animal",
      ],
      correctAnswer: 2,
    },
  ],
}

let currentDifficulty = "easy"
let currentQuestion = 0
let score = 0
let answered = false
const completedLevels = {
  easy: false,
  medium: false,
  hard: false,
}
const quizScores = []

document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animations
  animateQuizElements()

  // Initialize the quiz
  loadQuestion()

  // Add event listeners to difficulty buttons
  const difficultyBtns = document.querySelectorAll(".difficulty-btn")
  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      setDifficulty(this.getAttribute("data-difficulty"))
    })
  })
})

function animateQuizElements() {
  // Animate difficulty buttons
  const difficultyBtns = document.querySelectorAll(".difficulty-btn")
  difficultyBtns.forEach((btn, index) => {
    btn.style.opacity = "0"
    btn.style.transform = "translateY(-20px)"

    setTimeout(
      () => {
        btn.style.transition = "opacity 0.4s ease, transform 0.4s ease"
        btn.style.opacity = "1"
        btn.style.transform = "translateY(0)"
      },
      100 + index * 100,
    )
  })

  // Animate progress bar
  const progressBar = document.getElementById("quiz-progress")
  progressBar.style.width = "0"

  setTimeout(() => {
    progressBar.style.transition = "width 0.8s ease-in-out"
    progressBar.style.width = `${(currentQuestion / quizQuestions[currentDifficulty].length) * 100}%`
  }, 500)

  // Animate quiz content
  const quizContent = document.getElementById("quiz-content")
  quizContent.style.opacity = "0"
  quizContent.style.transform = "translateY(20px)"

  setTimeout(() => {
    quizContent.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    quizContent.style.opacity = "1"
    quizContent.style.transform = "translateY(0)"
  }, 700)
}

function setDifficulty(difficulty) {
  // Check if the difficulty level is locked
  const difficultyBtn = document.querySelector(`.difficulty-btn[data-difficulty="${difficulty}"]`)
  if (difficultyBtn.classList.contains("locked")) {
    // Add shake animation to indicate it's locked
    difficultyBtn.classList.add("shake")
    setTimeout(() => {
      difficultyBtn.classList.remove("shake")
    }, 500)
    return
  }

  // Update active difficulty
  document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  difficultyBtn.classList.add("active")

  // Set new difficulty and reset quiz with animation
  const quizContent = document.getElementById("quiz-content")
  quizContent.style.opacity = "0"
  quizContent.style.transform = "translateY(20px)"

  setTimeout(() => {
    currentDifficulty = difficulty
    currentQuestion = 0
    score = 0
    answered = false
    loadQuestion()

    // Animate back in
    quizContent.style.opacity = "1"
    quizContent.style.transform = "translateY(0)"
  }, 300)
}

function loadQuestion() {
  const questions = quizQuestions[currentDifficulty]
  const progressBar = document.getElementById("quiz-progress")

  // Update progress bar with animation
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`

  // Check if we're at the end of the quiz
  if (currentQuestion >= questions.length) {
    showResults()
    return
  }

  // Reset answered state
  answered = false

  // Get current question data
  const questionData = questions[currentQuestion]

  // Create question HTML
  const quizContent = document.getElementById("quiz-content")
  quizContent.innerHTML = `
    <div class="quiz-question">
      <h3>${currentQuestion + 1}. ${questionData.question}</h3>
      <div class="quiz-options">
        ${questionData.options
          .map(
            (option, index) => `
          <div class="quiz-option" onclick="selectOption(this, ${index})">
            <div class="option-marker">${String.fromCharCode(65 + index)}</div>
            <div>${option}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>

    <div class="quiz-navigation">
      <button class="quiz-button" id="prev-button" onclick="prevQuestion()" ${currentQuestion === 0 ? "disabled" : ""}>Previous</button>
      <button class="quiz-button" id="next-button" onclick="nextQuestion()">Next</button>
    </div>
  `

  // Add animation to options
  setTimeout(() => {
    const options = document.querySelectorAll(".quiz-option")
    options.forEach((option, index) => {
      option.style.opacity = "0"
      option.style.transform = "translateX(-20px)"

      setTimeout(
        () => {
          option.style.transition = "opacity 0.3s ease, transform 0.3s ease"
          option.style.opacity = "1"
          option.style.transform = "translateX(0)"
        },
        100 + index * 50,
      )
    })
  }, 100)
}

function selectOption(option, index) {
  if (answered) return

  const options = document.querySelectorAll(".quiz-option")

  // Remove selected class from all options
  options.forEach((opt) => opt.classList.remove("selected"))

  // Add selected class to clicked option with animation
  option.classList.add("selected")

  // Add pulse animation
  option.classList.add("pulse")
  setTimeout(() => {
    option.classList.remove("pulse")
  }, 500)

  // Enable next button
  document.getElementById("next-button").disabled = false
}

function nextQuestion() {
  const selectedOption = document.querySelector(".quiz-option.selected")

  if (selectedOption && !answered) {
    const selectedIndex = Array.from(document.querySelectorAll(".quiz-option")).indexOf(selectedOption)
    if (selectedIndex === quizQuestions[currentDifficulty][currentQuestion].correctAnswer) {
      score++

      // Add correct answer animation
      selectedOption.classList.add("correct")
      setTimeout(() => {
        proceedToNextQuestion()
      }, 500)
    } else {
      // Add incorrect answer animation
      selectedOption.classList.add("incorrect")

      // Show correct answer
      const correctOption =
        document.querySelectorAll(".quiz-option")[quizQuestions[currentDifficulty][currentQuestion].correctAnswer]
      setTimeout(() => {
        correctOption.classList.add("correct")
        setTimeout(() => {
          proceedToNextQuestion()
        }, 800)
      }, 500)
    }
    answered = true
  } else {
    proceedToNextQuestion()
  }
}

function proceedToNextQuestion() {
  const quizContent = document.getElementById("quiz-content")
  quizContent.style.opacity = "0"
  quizContent.style.transform = "translateY(20px)"

  setTimeout(() => {
    currentQuestion++
    loadQuestion()

    quizContent.style.opacity = "1"
    quizContent.style.transform = "translateY(0)"
  }, 300)
}

function prevQuestion() {
  if (currentQuestion > 0) {
    const quizContent = document.getElementById("quiz-content")
    quizContent.style.opacity = "0"
    quizContent.style.transform = "translateY(20px)"

    setTimeout(() => {
      currentQuestion--
      loadQuestion()

      quizContent.style.opacity = "1"
      quizContent.style.transform = "translateY(0)"
    }, 300)
  }
}

function showResults() {
  const quizContent = document.getElementById("quiz-content")
  const progressBar = document.getElementById("quiz-progress")
  const questions = quizQuestions[currentDifficulty]

  // Complete progress bar with animation
  progressBar.style.width = "100%"

  // Calculate percentage
  const percentage = Math.round((score / questions.length) * 100)

  // Mark level as completed
  completedLevels[currentDifficulty] = true

  // Save score
  quizScores.push({
    difficulty: currentDifficulty,
    score: score,
    total: questions.length,
    percentage: percentage,
    date: new Date().toLocaleString(),
  })

  // Unlock next level if applicable with animation
  if (currentDifficulty === "easy" && percentage >= 60) {
    const mediumBtn = document.querySelector('.difficulty-btn[data-difficulty="medium"]')
    mediumBtn.classList.remove("locked")

    setTimeout(() => {
      mediumBtn.classList.add("pulse")
      setTimeout(() => {
        mediumBtn.classList.remove("pulse")
      }, 1000)
    }, 1000)
  } else if (currentDifficulty === "medium" && percentage >= 60) {
    const hardBtn = document.querySelector('.difficulty-btn[data-difficulty="hard"]')
    hardBtn.classList.remove("locked")

    setTimeout(() => {
      hardBtn.classList.add("pulse")
      setTimeout(() => {
        hardBtn.classList.remove("pulse")
      }, 1000)
    }, 1000)
  }

  // Determine feedback based on score
  let feedback
  let feedbackClass
  if (percentage >= 80) {
    feedback = "Excellent! You have a deep understanding of Animal Farm."
    feedbackClass = "excellent"
  } else if (percentage >= 60) {
    feedback = "Good job! You have a solid grasp of the key concepts in Animal Farm."
    feedbackClass = "good"
  } else if (percentage >= 40) {
    feedback = "Not bad, but there's room for improvement. Consider revisiting some key themes and characters."
    feedbackClass = "average"
  } else {
    feedback = "You might want to reread Animal Farm to better understand its themes and characters."
    feedbackClass = "needs-improvement"
  }

  // Display results with animation
  quizContent.style.opacity = "0"

  setTimeout(() => {
    quizContent.innerHTML = `
      <div class="quiz-results">
        <h3>Quiz Results - ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level</h3>
        <div class="quiz-score">
          <div class="score-circle">
            <div class="score-number">${percentage}%</div>
          </div>
          <div class="score-text">You scored ${score} out of ${questions.length}</div>
        </div>
        <div class="quiz-feedback ${feedbackClass}">${feedback}</div>
        <button class="quiz-button" onclick="restartQuiz()">Restart Quiz</button>
        
        <div class="quiz-scores-history">
          <h4>Your Quiz History</h4>
          <ul class="scores-list">
            ${quizScores
              .map(
                (record) => `
              <li>
                <span>${record.difficulty.charAt(0).toUpperCase() + record.difficulty.slice(1)} Level:</span>
                <span>${record.score}/${record.total} (${record.percentage}%)</span>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      </div>
    `

    quizContent.style.opacity = "1"

    // Animate score circle
    setTimeout(() => {
      const scoreCircle = document.querySelector(".score-circle")
      scoreCircle.style.background = `conic-gradient(#97171d ${percentage}%, #f0f0f0 0)`
      scoreCircle.classList.add("animate")
    }, 300)
  }, 300)
}

function restartQuiz() {
  const quizContent = document.getElementById("quiz-content")
  quizContent.style.opacity = "0"

  setTimeout(() => {
    currentQuestion = 0
    score = 0
    loadQuestion()

    quizContent.style.opacity = "1"
  }, 300)
}

// Add these CSS styles to the existing styles.css
window.addEventListener("load", () => {
  const styleSheet = document.styleSheets[0]

  // Add new styles for quiz animations
  const newStyles = `
    .quiz-option.pulse {
      animation: pulse 0.5s ease;
    }
    
    .quiz-option.correct {
      border-color: #2e7d32;
      background-color: rgba(46, 125, 50, 0.1);
    }
    
    .quiz-option.incorrect {
      border-color: #c62828;
      background-color: rgba(198, 40, 40, 0.1);
    }
    
    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      position: relative;
      overflow: hidden;
    }
    
    .score-circle::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      background: white;
      border-radius: 50%;
      z-index: 1;
    }
    
    .score-number {
      font-size: 36px;
      font-weight: bold;
      color: #97171d;
      position: relative;
      z-index: 2;
    }
    
    .score-circle.animate {
      transition: background 1.5s ease;
    }
    
    .quiz-feedback {
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      font-weight: bold;
    }
    
    .quiz-feedback.excellent {
      background-color: rgba(46, 125, 50, 0.1);
      color: #2e7d32;
    }
    
    .quiz-feedback.good {
      background-color: rgba(56, 142, 60, 0.1);
      color: #388e3c;
    }
    
    .quiz-feedback.average {
      background-color: rgba(245, 124, 0, 0.1);
      color: #f57c00;
    }
    
    .quiz-feedback.needs-improvement {
      background-color: rgba(198, 40, 40, 0.1);
      color: #c62828;
    }
    
    .difficulty-btn.shake {
      animation: shake 0.5s ease;
    }
    
    .difficulty-btn.pulse {
      animation: buttonPulse 1s ease;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    
    @keyframes buttonPulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(151, 23, 29, 0.7); }
      50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(151, 23, 29, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(151, 23, 29, 0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }
  `

  // Add the styles to the stylesheet
  styleSheet.insertRule(newStyles, styleSheet.cssRules.length)
})
