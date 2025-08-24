import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCiCXhlUxE-OTfu_3jS2vr0_E1KYKrNM50",
    authDomain: "learnify-ydfgroup2.firebaseapp.com",
    databaseURL: "https://learnify-ydfgroup2-default-rtdb.firebaseio.com",
    projectId: "learnify-ydfgroup2",
    storageBucket: "learnify-ydfgroup2.firebasestorage.app",
    messagingSenderId: "330149071608",
    appId: "1:330149071608:web:4b64e760f8793b2835490d",
    measurementId: "G-JGBSE62KS0"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  export const db = getDatabase(app);

let currentQuiz = {
    id: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    startTime: null,
    timeElapsed: 0,
    answers: [],
    timer: null
};

export async function initializeQuiz() {
    console.log("initializeQuiz() called!")
    const quizError = document.getElementById('quizError'); // moved up
    const topic = document.getElementById('quizTopic').value.trim();
    
    if (!topic) {
        quizError.textContent = 'Please enter a quiz topic';
        quizError.style.display = 'block';
        return;
    }

    const difficulty = document.getElementById('difficulty').value;
    const questionCount = document.getElementById('questionCount').value;
    
    console.log("Starting quiz with:", { topic, difficulty, questionCount });
    quizError.style.display = 'none';

    try {
        const response = await fetch('/api/start-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                topic: topic,
                difficulty: difficulty,
                num_questions: parseInt(questionCount)
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMsg = errorData?.error || `Server error: ${response.status}`;
            throw new Error(errorMsg);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Expected JSON, got: ${text.substring(0, 100)}...`);
    }
        // to check if the response is JSON

    

        if (response.redirected && response.url.includes && response.status === 401('/login')) {
            // throw new Error('Session expired. Please log in again.');
            window.location.href = '/login';
    return;
    }

        const data = await response.json();
        console.log("Backend response:", data);

        if (!response.ok) {
            throw new Error(data.error || 'Failed to start quiz');
        }
        if (!data.questions || !Array.isArray(data.questions)) {
            throw new Error('Invalid questions format from server');
        }

        currentQuiz = {
            id: data.quiz_id,
            questions: data.questions,
            currentIndex: 0,
            score: 0,
            startTime: new Date(),
            timeElapsed: 0,
            timer: null,
            answers: []
        };


        document.getElementById('quizInterface').innerHTML = `
            <div class="quiz-header">
                <div class="quiz-progress" id="quizProgress"></div>
                <div class="quiz-timer" id="quizTimer">00:00</div>
            </div>
            <div class="quiz-question-container" id="questionContainer"></div>
        `;

        document.getElementById('quizInterface').style.display = 'block';
        document.querySelector('.quiz-config-card').style.display = 'none';
        startTimer();
        showQuestion();

    } catch (error) {
        console.error("Quiz initialization failed:", error);
        document.getElementById('quizError').textContent = error.message;
        document.getElementById('quizError').style.display = 'block';

    }
}

document.getElementById('generateQuizButton').addEventListener('click', initializeQuiz);
    

function showQuestion() {

    if (!currentQuiz || !currentQuiz.questions || currentQuiz.questions.length === 0) {
        console.error("No questions available!");
        document.getElementById('questionContainer').innerHTML = "<p>Error: No questions loaded</p>";
        return;
    }
    
    const container = document.getElementById('questionContainer');
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    
    const optionsHTML = question.options.map((opt, index) => `
        <button class="quiz-option" 
                data-index="${index}"
                data-answer="${String.fromCharCode(65 + index)}">
            ${String.fromCharCode(65 + index)}. ${opt}
        </button>
    `).join('');

    container.innerHTML = `
        <div class="current-question">
            <h3>Question ${currentQuiz.currentIndex + 1}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">${optionsHTML}</div>
        </div>

    `;
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const selectedIndex = parseInt(this.getAttribute('data-index'));
            selectAnswer(selectedIndex);
        });
    });

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentQuiz.currentIndex === 0;
        nextBtn.disabled = currentQuiz.currentIndex >= currentQuiz.questions.length - 1;
    }
    document.getElementById('quizProgress').textContent = 
        `Question ${currentQuiz.currentIndex + 1} of ${currentQuiz.questions.length}`;
}

export function handleOptionClick(index) {
    if (!currentQuiz) return;
    selectAnswer(index);
}

function selectAnswer(selectedIndex) {

    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const correctIndex = question.answer.charCodeAt(0) - 65;
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = selectedIndex === (question.answer.charCodeAt(0) - 65);
    
    // Highlight correct answer
    options.forEach((opt, index) => {
        if (index === correctIndex) {
            opt.classList.add('correct');
        }
        if (index === selectedIndex && index !== correctIndex) {
            opt.classList.add('wrong');
        }
        opt.disabled = true; // Disable all options after selection
    });

    // Update score if correct
    if (isCorrect) {
        currentQuiz.score++;
    }

    const feedback = document.createElement('div');
    feedback.className = `answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.textContent = isCorrect ? 'Correct! ✔' : `Incorrect ✘ (Correct answer: ${String.fromCharCode(65 + correctIndex)})`;
    document.getElementById('questionContainer').appendChild(feedback);
    
    // Check answer after delay
    setTimeout(() => {
        currentQuiz.currentIndex++;
        
        if(currentQuiz.currentIndex < currentQuiz.questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 2000);
}

async function saveQuizResults() {
    try {
      const user = await auth.currentUser;
      if (!user) throw new Error("User not authenticated");
  
      const quizRef = ref(learnify_db, `users/${user.uid}/quizResults/${currentQuiz.id}`);
      await set(quizRef, {
        score: currentQuiz.score,
        totalQuestions: currentQuiz.questions.length,
        timeElapsed: currentQuiz.timeElapsed,
        completedAt: new Date().toISOString(),
        topic: document.getElementById('quizTopic').value.trim(),
        questions: currentQuiz.questions, // Store the questions too, if needed
        answers: currentQuiz.answers // Store the user answers too,
      });
    } catch (error) {
      console.error("Save quiz error:", error);
    }
  }



async function fetchQuizResults() {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const quizResultsRef = ref(learnify_db, `users/${user.uid}/quizResults`);
    const snapshot = await get(quizResultsRef);

    if (snapshot.exists()) {
      return snapshot.val(); // Returns an object where keys are quiz IDs
    } else {
      return null; // No quiz results found
    }
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return null;
  }
}

async function displayQuizResults() {
    const results = await fetchQuizResults();
    const resultsContainer = document.getElementById("quizResultsContainer"); // Make sure you have this in progress.html
  
    if (results) {
      let resultsHTML = "";
      for (const quizId in results) {
        const quiz = results[quizId];
        resultsHTML += `
          <div class="quiz-result-item">
            <h3>${quiz.topic}</h3>
            <p>Score: ${quiz.score} / ${quiz.totalQuestions}</p>
            <p>Time: ${formatTime(quiz.timeElapsed)}</p>
            <p>Completed: ${new Date(quiz.completedAt).toLocaleDateString()}</p>
            ${quiz.questions ? `<button onclick="showQuizDetails('${quizId}')">View Details</button>` : ''}
          </div>
        `;
      }
      resultsContainer.innerHTML = resultsHTML;
    } else {
      resultsContainer.innerHTML = "<p>No quiz results found.</p>";
    }
  }

  export async function showQuizDetails(quizId) {
    const results = await fetchQuizResults();
    const quiz = results[quizId];
  
    if (quiz) {
      let detailsHTML = `
        <h2>${quiz.topic} Details</h2>
        <p>Score: ${quiz.score} / ${quiz.totalQuestions}</p>
        <p>Time: ${formatTime(quiz.timeElapsed)}</p>
        <p>Completed: ${new Date(quiz.completedAt).toLocaleString()}</p>
      `;
  
      quiz.questions.forEach((question, index) => {
        detailsHTML += `
          <div class="quiz-detail-question">
            <h3>Question ${index + 1}: ${question.question}</h3>
            <p>Your Answer: ${quiz.answers[index] || "Not answered"}</p>
            <p>Correct Answer: ${question.answer}</p>
          </div>
        `;
      });
  
      document.getElementById("quizResultsContainer").innerHTML = detailsHTML;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("/progress")) {
      displayQuizResults();
    }
  });

function endQuiz() {
    stopTimer();  // Stop the timer
    currentQuiz.timeElapsed = Math.floor((new Date() - currentQuiz.startTime) / 1000);
    currentQuiz.timeElapsed = Math.floor((new Date() - currentQuiz.startTime) / 1000);

    const percentage = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100);
  saveQuizResults();

    let message;
    if (percentage >= 80) {
        message = "Excellent work! 🎉";
    } else if (percentage >= 60) {
        message = "Good job! 👍";
    } else {
        message = "Keep practicing! 💪";
    }
    
    
    document.getElementById('quizInterface').innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <div class="result-score">
                <div class="score-circle" style="--percentage: ${percentage}">
                    <span>${percentage}%</span>
                </div>
                <div class="score-details">
                    <p>${currentQuiz.score} out of ${currentQuiz.questions.length} correct</p>
                    <p>Time: ${formatTime(currentQuiz.timeElapsed)}</p>
                </div>
            </div>
            <p class="result-message">${message}</p>
            <button class="restart-btn" onclick="location.reload()">
                <i class="uil uil-redo"></i> Try Another Quiz
            </button>
        </div>
    `;
}

function stopTimer() {
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
        currentQuiz.timer = null; // Important: Clear the timer reference
    }
}


function startTimer() {
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
    }
    
    currentQuiz.timeElapsed = 0;
    document.getElementById('quizTimer').textContent = '00:00';
    
    currentQuiz.timer = setInterval(() => {
        currentQuiz.timeElapsed++;
        document.getElementById('quizTimer').textContent = 
            formatTime(currentQuiz.timeElapsed);
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function previousQuestion() {
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        showQuestion();
    }
    
}

function nextQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        showQuestion();
    }
 
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
});

async function handleQuizCompletion(quizId) {
    try {
        // Verify the quiz was stored
        const verification = await fetch('/api/verify-quiz-storage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quiz_id: quizId })
        });
        
        const verificationData = await verification.json();
        
        if (!verificationData.stored) {
            console.error('Quiz storage verification failed:', verificationData);
            alert('Failed to save quiz results. Please contact support.');
            return;
        }
        
        console.log('Quiz successfully stored:', verificationData.quiz_data);
        // Proceed with showing results to user
        
    } catch (error) {
        console.error('Verification error:', error);
        alert('Error verifying quiz storage. Check console for details.');
    }
}