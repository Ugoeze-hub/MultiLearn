const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");
const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");
const timeLeftText = document.querySelector(".time-left");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Timer & Progress Variables
let totalExamTime = 20 * 60; // 20 minutes in seconds
let examTimer, progressTimer;
const progressBar = document.createElement("div");
progressBar.classList.add("progress-bar");

// Quiz State Variables
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Start Quiz
startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

// Exit Quiz
exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

// Continue to Quiz
continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  resetQuiz();
  startExamTimer(); // Start the 20-minute timer
};

// Try Again Button
tryAgainBtn.onclick = () => {
  resetQuiz();
  quizBox.classList.add("active");
  resultBox.classList.remove("active");
  startExamTimer();
};

// Go Home Button
goHomeBtn.onclick = () => {
  quizSection.classList.remove("active");
  resultBox.classList.remove("active");
  clearInterval(examTimer); // Stop the exam timer
  resetQuiz();
};

// Reset Quiz
function resetQuiz() {
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
  nextBtn.classList.remove("active");
}

// Start 20-Minute Exam Timer
function startExamTimer() {
  let timeLeft = totalExamTime;
  updateExamTimerDisplay(timeLeft);

  examTimer = setInterval(() => {
    timeLeft--;
    updateExamTimerDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(examTimer);
      showResult(); // Auto-submit when time runs out
    }
  }, 1000);
}

// Update Exam Timer Display
function updateExamTimerDisplay(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;
  timeLeftText.textContent = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  timeLeftText.style.color = seconds <= 60 ? "red" : "#007bff"; // Turn red in the last minute
}

// Next Question
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumb++;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    nextBtn.classList.remove("active");
  } else {
    showResult();
  }
};

// Show Questions
function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = questions[index].options
    .map((option) => `<div class="option">${option}</div>`)
    .join("");
  optionList.innerHTML = optionTag;

  document.querySelectorAll(".option").forEach((opt) => {
    opt.addEventListener("click", function () {
      optionSelected(this);
    });
  });
}

// Handle Answer Selection
function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  
  if (userAnswer === correctAnswer) {
    answer.classList.add("correct");
    userScore++;
  } else {
    answer.classList.add("incorrect");

    // Highlight the correct answer
    [...optionList.children].forEach((opt) => {
      if (opt.textContent === correctAnswer) {
        opt.classList.add("correct");
      }
    });
  }

  // Disable further selections
  [...optionList.children].forEach((opt) => opt.classList.add("disabled"));
  nextBtn.classList.add("active");

  headerScore();
}

// Update Question Counter
function questionCounter(num) {
  document.querySelector(".question-total").textContent = `${num} of ${questions.length} Questions`;
}

// Update Header Score
function headerScore() {
  document.querySelector(".header-score").textContent = `Score: ${userScore} / ${questions.length}`;
}

// Show Final Result
function showResult() {
  clearInterval(examTimer); // Stop the timer
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

  let progressValue = 0;
  let progressEndValue = questions.length > 0 ? (userScore / questions.length) * 100 : 0;
  let progressDisplay = document.querySelector(".progress-value");
  let circularProgress = document.querySelector(".circular-progress");

  let progressInterval = setInterval(() => {
    if (progressValue >= progressEndValue) {
      clearInterval(progressInterval);
    } else {
      progressValue++;
      progressDisplay.textContent = `${progressValue}%`;
      circularProgress.style.background = `conic-gradient(#007bff ${progressValue * 3.6}deg, rgba(225, 225, 225, .1) 0deg)`;
    }
  }, 20);
}


themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  // Toggle icon
  themeToggle.classList.add("rotate");
  setTimeout(() => themeToggle.classList.remove("rotate"), 300);

  const icon = themeToggle.querySelector("i");
  if (body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }

  // Save preference
  localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
});

// Load user preference
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
}
