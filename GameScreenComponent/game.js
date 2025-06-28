const $ = $ => document.querySelector($)
const $$ = $$ => document.querySelectorAll($$)

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
        this.fetchQuestions()
    }

    renderScreen() {
        let html = `
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

        this.gameScreenContainer.innerHTML = html
    }

    startTimer() {
        const timerElement = $('#timer')
        const progressInfo = $('#progressInfo')
        let timeLeft = 20
        timerElement.textContent = timeLeft
        progressInfo.textContent = `Q: ${this.currentQuestionIndex + 1}/${this.questionCount}`

        this.timerInterval = setInterval(() => {
            timeLeft--
            timerElement.textContent = timeLeft

            if (timeLeft <= 5) {
                timerElement.classList.add('warning')
            }

            if (timeLeft <= 0) {
                clearInterval(this.timerInterval)
                timerElement.textContent = '0'
                this.currentQuestionIndex++
                progressInfo.textContent = `Q: ${this.currentQuestionIndex + 1}/${this.questionCount}`
                if (this.currentQuestionIndex <= this.questionCount) {
                    timerElement.classList.remove('warning')
                    this.fetchQuestions()
                } else {
                    this.gameScreenContainer.style.display = 'none'
                    this.resultsScreenContainer.style.display = 'block'
                }
            }
        }, 1000)
    }

    async fetchQuestions() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${this.category ? this.category : ''}&difficulty=${this.difficulty}&type=multiple`)
            const data = await response.json()
            $('#loadingScreen').style.display = 'none'
            $('#gameScreen').style.display = 'block'
            this.questionData = data.results[0]
            this.renderScreen()
            this.renderAnswers()
            this.startTimer()
        } catch (error) {
            console.error('Error fetching questions:', error)
            $('#gameScreen').style.display = 'none'
            $('#loadingScreen').innerHTML = 'Failed to load questions. Please try again later.'
            this.questionData = {}
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
                        this.fetchQuestions()
                    } else {
                        this.gameScreenContainer.style.display = 'none'
                        
                    }
                }, 2000)
            })
            answersContainer.appendChild(answerButton)
        })
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
}