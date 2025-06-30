import ResultsScreenComponent from "../ResultsScreenComponent/results.js"
const $ = $ => document.querySelector($)

export default class GameScreenComponent {
    constructor({ playerName, questionCount, difficulty, category }) {
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
        this.fetchQuestion()
    }

    renderScreen() {
        this.gameScreenContainer.innerHTML = `
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

            <div class="answers-container" id="answersContainer">
                
            </div>
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
                    this.gameScreenContainer.style.display = 'none'
                    $('#resultsScreen').style.display = 'block'
                    console.log(this.getResults())
                    const resultsScreen = new ResultsScreenComponent(this.getResults())
                }
            }
        }, 1000)
    }

    async fetchQuestion() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${this.category ? this.category : ''}&difficulty=${this.difficulty}&type=multiple`)
            const data = await response.json()
            $('#loadingScreen').style.display = 'none'
            $('#gameScreen').style.display = 'block'
            this.questionData = data.results[0]
            this.renderScreen()
        } catch (error) {
            console.error('Error fetching questions:', error)
            $('#gameScreen').style.display = 'none'
            $('#loadingScreen').innerHTML = 'Failed to load questions. Please try again later.'
        }
    }

    renderAnswers() {
        const answersContainer = $('#answersContainer')
        const answers = [...this.questionData.incorrect_answers, this.questionData.correct_answer]
        answers.sort(() => Math.random() - 0.5)

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
                    $('#scoreInfo').textContent = `SCORE: ${this.score}`
                    $('#correctAnswersInfo').textContent = `CORRECT ANSWERS: ${this.correctAnswers}`
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
                        this.gameScreenContainer.style.display = 'none'
                        $('#resultsScreen').style.display = 'block'
                        console.log(this.getResults())
                        const resultsScreen = new ResultsScreenComponent(this.getResults())
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
}