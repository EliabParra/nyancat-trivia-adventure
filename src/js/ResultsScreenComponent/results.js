import SetupScreenComponent from "../SetupScreenComponent/setup.js"
import GameScreenComponent from "../GameScreenComponent/game.js"

const $ = $ => document.querySelector($)

export default class ResultsScreenComponent {
    constructor({ playerName, questionCount, difficulty, category, correctAnswers, score, avgTime }) {
        this.resultsScreenContainer = $('#resultsScreen')
        this.gameData = {
            playerName,
            questionCount,
            difficulty,
            category
        }
        this.correctAnswers = correctAnswers
        this.score = score
        this.avgTime = avgTime
        this.renderScreen()
    }

    renderScreen() {
        const { playerName, questionCount } = this.gameData
        this.resultsScreenContainer.innerHTML = `
            <h2>GAME COMPLETE!</h2>
            <div class="results-trophy">🏆</div>

            <div class="player-name" style="margin-bottom:16px;font-size:18px;">
                Player: <span id="playerName">${playerName}</span>
            </div>
            
            <div class="results-stats">
                <div class="stat-item">
                    <span class="stat-value" id="finalScore">${this.score}</span>
                    <div class="stat-label">TOTAL POINTS</div>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="correctAnswers">${this.correctAnswers}/${questionCount}</span>
                    <div class="stat-label">CORRECT</div>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="successRate">${((this.correctAnswers / questionCount) * 100).toFixed(0)}%</span>
                    <div class="stat-label">SUCCESS RATE</div>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="avgTime">${this.avgTime}S</span>
                    <div class="stat-label">AVG TIME</div>
                </div>
            </div>

            <div style="margin-top: 30px;">
                <button class="btn btn-success" id="playAgainBtn">PLAY AGAIN</button>
                <button class="btn btn-secondary" id="newConfigBtn">NEW CONFIG</button>
                <button class="btn" id="exitBtn">EXIT GAME</button>
            </div>
        `

        this.addEventListeners()
    }

    addEventListeners() {
        $('#playAgainBtn').addEventListener('click', () => {
            this.resultsScreenContainer.style.display = 'none'
            const gameScreen = new GameScreenComponent(this.gameData)
        })

        $('#newConfigBtn').addEventListener('click', () => {
            this.resultsScreenContainer.style.display = 'none'
            const setupScreen = new SetupScreenComponent(this.gameData)
        })

        $('#exitBtn').addEventListener('click', () => {
            this.resultsScreenContainer.style.display = 'none'
            window.location.reload()
        })
    }
}