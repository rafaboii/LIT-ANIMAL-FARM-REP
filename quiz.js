// Quiz functionality
const quizQuestions = [
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
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let answered = false;
  
  function loadQuestion() {
    const questionData = quizQuestions[currentQuestion];
    const quizContent = document.getElementById('quiz-content');
    const progressBar = document.getElementById('quiz-progress');
    
    // Update progress bar
    progressBar.style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;
    
    // Check if we're at the end of the quiz
    if (currentQuestion >= quizQuestions.length) {
      showResults();
      return;
    }
    
    // Reset answered state
    answered = false;
    
    // Create question HTML
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
      if (selectedIndex === quizQuestions[currentQuestion].correctAnswer) {
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
    
    // Complete progress bar
    progressBar.style.width = '100%';
    
    // Calculate percentage
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
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
        <h3>Quiz Results</h3>
        <div class="quiz-score">You scored ${score} out of ${quizQuestions.length} (${percentage}%)</div>
        <div class="quiz-feedback">${feedback}</div>
        <button class="quiz-button" onclick="restartQuiz()">Restart Quiz</button>
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