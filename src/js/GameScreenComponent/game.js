import ResultsScreenComponent from "../ResultsScreenComponent/results.js"
const $ = $ => document.querySelector($)

export default class GameScreenComponent {
    constructor({ playerName, questionCount, difficulty, category }, loading) {
        this.gameScreenContainer = $('#gameScreen')
        this.playerName = playerName
        this.questionCount = questionCount
        this.difficulty = difficulty
        this.category = category
        this.currentQuestionIndex = 0
        this.score = 0
        this.correctAnswers = 0
        this.avgTime = 0
        this.timeSpent = []
        this.loading = loading
        this.fetchQuestion()
    }

    renderScreen() {
        this.gameScreenContainer.innerHTML = `
            <style>
                .game-screen {
                    display: none;
                    background: #ff99cc;
                    border: 4px solid #000000;
                    padding: 30px;
                    position: relative;
                }

                .game-screen::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: #ffffff;
                    z-index: -1;
                }

                .game-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .progress-info, .score-info, .correct-answers-info {
                    font-size: 10px;
                    color: #000000;
                    text-shadow: 1px 1px 0px #ffffff;
                    background: #00ccff;
                    padding: 8px 12px;
                    border: 2px solid #000000;
                }

                .timer-container {
                    text-align: center;
                    margin-bottom: 25px;
                    background: #000000;
                    border: 4px solid #ffffff;
                    padding: 15px;
                }

                .timer {
                    font-size: 32px;
                    color: #ffffff;
                    font-family: 'Press Start 2P', monospace;
                    animation: pixelPulse 1s infinite;
                }

                .timer.warning {
                    color: #ff0000;
                    animation: pixelAlarm 0.5s infinite;
                }

                @keyframes pixelPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                @keyframes pixelAlarm {
                    0%, 100% { color: #ff0000; }
                    50% { color: #ffffff; }
                }

                .timer-label {
                    color: #ffffff;
                    font-size: 8px;
                    margin-top: 10px;
                }

                .question-container {
                    background: #0033cc;
                    border: 4px solid #000000;
                    padding: 20px;
                    margin-bottom: 25px;
                    position: relative;
                }

                .question-container::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: #ffffff;
                    z-index: -1;
                }

                .question-text {
                    font-size: 12px;
                    color: #ffffff;
                    text-shadow: 1px 1px 0px #000000;
                    line-height: 1.6;
                    text-align: center;
                }

                .answers-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                }

                .answer-btn {
                    background: #ffff00;
                    border: 3px solid #000000;
                    padding: 15px 10px;
                    color: #000000;
                    font-size: 9px;
                    font-family: 'Press Start 2P', monospace;
                    min-height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    line-height: 1.3;
                    transition: none;
                    cursor: url('/src/assets/nyan_cat_cursor_pointer.png'), pointer;
                }

                .answer-btn:hover {
                    background: #99ff99;
                    box-shadow: inset 2px 2px 0px #000000;
                }

                .answer-btn.correct {
                    background: #00ff00;
                    animation: pixelCorrect 0.6s ease;
                }

                .answer-btn.incorrect {
                    background: #ff0000;
                    color: #ffffff;
                    animation: pixelIncorrect 0.6s ease;
                }

                @keyframes pixelCorrect {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                @keyframes pixelIncorrect {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
            </style>
            <div class="game-header">
                <div class="progress-info" id="progressInfo"></div>
                <div class="score-info" id="scoreInfo">SCORE: ${this.score}</div>
                <div class="correct-answers-info" id="correctAnswersInfo">CORRECT ANSWERS: ${this.correctAnswers}</div>
            </div>

            <div class="timer-container">
                <div class="timer" id="timer"></div>
                <div class="timer-label">SECONDS LEFT</div>
            </div>

            <div class="question-container">
                <div class="question-text" id="questionText">
                    ${this.questionData.question}
                </div>
            </div>

            <div class="answers-container" id="answersContainer"></div>
        `

        this.renderAnswers()
        this.startTimer()
    }

    startTimer() {
        const timerElement = $('#timer')
        const progressInfo = $('#progressInfo')
        let timeLeft = 20
        timerElement.textContent = timeLeft
        progressInfo.textContent = `Q: ${this.currentQuestionIndex + 1}/${this.questionCount}`

        this.questionStart = Date.now()

        this.timerInterval = setInterval(() => {
            timeLeft--
            timerElement.textContent = timeLeft

            if (timeLeft <= 5) {
                timerElement.classList.add('warning')
            }

            if (timeLeft <= 0) {
                clearInterval(this.timerInterval)
                timerElement.textContent = '0'
                this.timeSpent.push(20)
                this.updateAvgTime()
                this.currentQuestionIndex++
                progressInfo.textContent = `Q: ${this.currentQuestionIndex + 1}/${this.questionCount}`
                if (this.currentQuestionIndex < this.questionCount) {
                    timerElement.classList.remove('warning')
                    this.fetchQuestion()
                } else {
                    this.hide()
                    new ResultsScreenComponent(this.getResults(), this.loading).show()
                }
            }
        }, 1000)
    }

    async fetchQuestion() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${this.category ? this.category : ''}&difficulty=${this.difficulty}&type=multiple`)
            const data = await response.json()
            this.loading.hide()
            this.show()
            this.questionData = data.results[0]
            this.renderScreen()
        } catch (error) {
            console.error('Error fetching questions:', error)
            this.hide()
            this.loading.shadowRoot.innerHTML = 'Failed to load questions. Please try again later.'
        }
    }

    renderAnswers() {
        const answersContainer = $('#answersContainer')
        const answers = [...this.questionData.incorrect_answers, this.questionData.correct_answer]
        answers.sort(() => Math.random() - 0.5)

        const scoreInfo = $('#scoreInfo')
        const correctAnswersInfo = $('#correctAnswersInfo')

        answersContainer.innerHTML = ''
        answers.forEach(answer => {
            const answerButton = document.createElement('button')
            answerButton.classList.add('answer-button')
            answerButton.textContent = answer
            answerButton.classList.add('answer-btn')
            answerButton.addEventListener('click', () => {
                const elapsed = Math.round((Date.now() - this.questionStart) / 1000)
                this.timeSpent.push(elapsed)
                this.updateAvgTime()

                if (this.checkAnswer(answer)) {
                    answerButton.classList.add('correct')
                    scoreInfo.textContent = `SCORE: ${this.score}`
                    correctAnswersInfo.textContent = `CORRECT ANSWERS: ${this.correctAnswers}`
                } else {
                    answerButton.classList.add('incorrect')
                    const correctAnswerButton = Array.from(answersContainer.children).find(btn => btn.textContent === this.questionData.correct_answer)
                    correctAnswerButton.classList.add('correct')
                }
                const allButtons = answersContainer.querySelectorAll('.answer-button')
                allButtons.forEach(btn => btn.disabled = true)
                this.currentQuestionIndex++
                clearInterval(this.timerInterval)
                setTimeout(() => {
                    if (this.currentQuestionIndex < this.questionCount) {
                        this.fetchQuestion()
                    } else {
                        this.hide()
                        new ResultsScreenComponent(this.getResults(), this.loading).show()
                    }
                }, 3000)
            })
            answersContainer.appendChild(answerButton)
        })
    }

    updateAvgTime() {
        if (this.timeSpent.length > 0) {
            const sum = this.timeSpent.reduce((a, b) => a + b, 0)
            this.avgTime = sum / this.timeSpent.length
        } else {
            this.avgTime = 0
        }
    }

    checkAnswer(answer) {
        const correctAnswer = this.questionData.correct_answer
        if (answer === correctAnswer) {
            this.correctAnswers++
            this.score += 10
            return true
        }
        return false
    }

    getResults() {
        return {
            playerName: this.playerName,
            questionCount: this.questionCount,
            difficulty: this.difficulty,
            category: this.category,
            correctAnswers: this.correctAnswers,
            score: this.score,
            avgTime: this.avgTime,
        }
    }

    show() {
        if (this.gameScreenContainer) this.gameScreenContainer.style.display = 'block'
    }

    hide() {
        if (this.gameScreenContainer) this.gameScreenContainer.style.display = 'none'
    }
}