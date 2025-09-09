document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
   
    const userData = sessionStorage.getItem('user');
    if (!userData) {
        console.error('No user data found in sessionStorage');
        window.location.href = '/login'; 
        return;
    }


    let user;
    try {
        user = JSON.parse(userData);
    } catch (e) {
        console.error('Failed to parse user data:', e);
        window.location.href = '/login';
        return;
    }

    if (!user || !user.user_id) {
        console.error('User ID not found in user data');
        window.location.href = '/login';
        return;
    }
    const quizResultsContainer = document.getElementById('quizResultsContainer');
    const totalQuizzesElement = document.getElementById('total-quizzes');
    const averageScoreElement = document.getElementById('average-score');
    const bestScoreElement = document.getElementById('best-score');
    const topicFilter = document.getElementById('topic-filter');
    const dateFilter = document.getElementById('date-filter');

    // Fetch quiz results from Firebase
    async function fetchQuizResults() {
        try {
            const response = await fetch(`/api/quiz-results`);
            if (!response.ok) {
                throw new Error('Failed to fetch quiz results');
            }
            const results = await response.json();

            if (!Array.isArray(results)) {
                throw new Error('Invalid response format - expected array');
            }

            displayQuizResults(results);
            updateSummaryStats(results);
            populateTopicFilter(results);
        } catch (error) {
            console.error('Error fetching quiz results:', error);
            showErrorState(error.message);
        }
    }

    
    function showErrorState(message) {
        const container = document.getElementById('quizResultsContainer');
        container.innerHTML = `
            <div class="error-state">
                <i class="uil uil-exclamation-triangle"></i>
                <p>${message || 'Failed to load quiz results'}</p>
                <button onclick="window.location.reload()">Retry</button>
            </div>
        `;
    }
    

    // Display quiz results in the UI
    function displayQuizResults(results) {
        if (!results || results.length === 0) {
            quizResultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="uil uil-clipboard-notes"></i>
                    <p>No quiz results found. Take some quizzes to see your progress!</p>
                </div>
            `;
            return;
        }

        // Filter results based on selected filters
        const filteredResults = filterResults(results);
        
        if (filteredResults.length === 0) {
            quizResultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="uil uil-search"></i>
                    <p>No results match your filters. Try different criteria.</p>
                </div>
            `;
            return;
        }

        // Sort by most recent first
        filteredResults.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        let html = '';
        filteredResults.forEach(result => {
            const scorePercentage = Math.round((result.score / result.total_questions) * 100);
            const date = new Date(result.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            let scoreClass = 'score-medium';
            if (scorePercentage >= 80) scoreClass = 'score-high';
            else if (scorePercentage < 50) scoreClass = 'score-low';

            html += `
                <div class="quiz-result-card">
                    <div class="quiz-result-info">
                        <div class="quiz-result-topic">${result.topic}</div>
                        <div class="quiz-result-date">${date}</div>
                        <button class="toggle-details" data-quiz-id="${result.quiz_id}">
                            <i class="uil uil-angle-down"></i> View Details
                        </button>
                        <div class="quiz-result-details" id="details-${result.quiz_id}">
                            <div class="details-header">
                                <span>Score: ${result.score} out of ${result.total_questions}</span>
                                <span>${scorePercentage}%</span>
                            </div>
                            <div class="details-questions">
                                ${renderQuestions(result.questions)}
                            </div>
                        </div>
                    </div>
                    <div class="quiz-result-score ${scoreClass}">${scorePercentage}%</div>
                </div>
            `;
        });

        quizResultsContainer.innerHTML = html;
        
        // Add event listeners to toggle buttons
        document.querySelectorAll('.toggle-details').forEach(button => {
            button.addEventListener('click', function() {
                const quizId = this.getAttribute('data-quiz-id');
                const detailsElement = document.getElementById(`details-${quizId}`);
                detailsElement.classList.toggle('show');
                this.classList.toggle('active');
            });
        });
    }

    // Render questions for the details view
    function renderQuestions(questions) {
        return questions.map((question, index) => {
            return `
                <div class="details-question">
                    <div class="details-question-text">${index + 1}. ${question.question}</div>
                    <div class="details-options">
                        ${question.options.map((option, i) => {
                            const optionLetter = String.fromCharCode(65 + i);
                            let optionClass = '';
                            if (optionLetter === question.answer) optionClass = 'correct';
                            return `
                                <div class="details-option ${optionClass}">
                                    ${optionLetter}. ${option}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update summary statistics
    function updateSummaryStats(results) {
        if (!results || results.length === 0) {
            totalQuizzesElement.textContent = '0';
            averageScoreElement.textContent = '0%';
            bestScoreElement.textContent = '0%';
            return;
        }

        totalQuizzesElement.textContent = results.length;
        
        const totalScores = results.reduce((sum, result) => {
            return sum + (result.score / result.total_questions);
        }, 0);
        
        const averagePercentage = Math.round((totalScores / results.length) * 100);
        averageScoreElement.textContent = `${averagePercentage}%`;
        
        const bestPercentage = Math.round(Math.max(...results.map(result => 
            (result.score / result.total_questions) * 100
        ))
    );
        bestScoreElement.textContent = `${bestPercentage}%`;
    }

    // Populate topic filter dropdown
    function populateTopicFilter(results) {
        if (!results || results.length === 0) return;
        
        const topics = new Set(results.map(result => result.topic));
        topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            topicFilter.appendChild(option);
        });
    }

    // Filter results based on selected filters
    function filterResults(results) {
        const topic = topicFilter.value;
        const dateRange = dateFilter.value;
        
        let filtered = [...results];
        
        // Filter by topic
        if (topic !== 'all') {
            filtered = filtered.filter(result => result.topic === topic);
        }
        
        // Filter by date
        if (dateRange !== 'all') {
            const now = new Date();
            let cutoffDate;
            
            if (dateRange === 'week') {
                cutoffDate = new Date(now.setDate(now.getDate() - 7));
            } else if (dateRange === 'month') {
                cutoffDate = new Date(now.setDate(now.getDate() - 30));
            }
            
            filtered = filtered.filter(result => {
                const resultDate = new Date(result.timestamp);
                return resultDate >= cutoffDate;
            });
        }
        
        return filtered;
    }

    // Add event listeners to filters
    topicFilter.addEventListener('change', () => fetchQuizResults());
    dateFilter.addEventListener('change', () => fetchQuizResults());

    // Initial fetch
    fetchQuizResults();
});

    