const $ = $ => document.querySelector($)
const $$ = $$ => document.querySelectorAll($$)

export default class GameScreenComponent {
    constructor({ playerName, questionCount, difficulty, categories }) {
        this.gameScreenContainer = $('#gameScreen');
        this.playerName = playerName;
        this.questionCount = questionCount;
        this.difficulty = difficulty;
        this.categories = categories;
        this.currentQuestionIndex = 1;
        this.score = 0;
        this.renderScreen();
        this.startTimer();
    }

    renderScreen() {
        let html = `
            <div class="game-header">
                <div class="progress-info" id="progressInfo">Q: ${this.currentQuestionIndex}/10</div>
                <div class="score-info" id="scoreInfo">SCORE: ${this.score}</div>
            </div>

            <div class="timer-container">
                <div class="timer" id="timer">20</div>
                <div class="timer-label">SECONDS LEFT</div>
            </div>

            <div class="question-container">
                <div class="question-text" id="questionText">
                    WHAT IS THE SPEED OF LIGHT IN VACUUM?
                </div>
            </div>

            <div class="answers-container" id="answersContainer">
                <button class="answer-btn">299,792,458 M/S</button>
                <button class="answer-btn">300,000,000 M/S</button>
                <button class="answer-btn">299,792,458 KM/S</button>
                <button class="answer-btn">186,282 MILES/S</button>
            </div>
        `

        this.gameScreenContainer.innerHTML = html;
    }

    startTimer() {
        const timerElement = $('#timer');
        let timeLeft = 20;
        timerElement.textContent = timeLeft;

        const timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = '0';
            }
        }, 1000);
    }
}