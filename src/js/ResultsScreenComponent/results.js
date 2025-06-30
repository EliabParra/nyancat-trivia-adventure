import SetupScreenComponent from "../SetupScreenComponent/setup.js"
import GameScreenComponent from "../GameScreenComponent/game.js"
const $ = $ => document.querySelector($)

export default class ResultsScreenComponent {
    constructor({ playerName, questionCount, difficulty, category, correctAnswers, score, avgTime }, loading) {
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
        this.loading = loading
        this.renderScreen()
    }

    renderScreen() {
        const { playerName, questionCount } = this.gameData
        this.resultsScreenContainer.innerHTML = `
            <style>
                .results-screen {
                    display: none;
                    background: #ffff00;
                    border: 4px solid #000000;
                    padding: 30px;
                    text-align: center;
                    position: relative;
                }

                .results-screen::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: #ffffff;
                    z-index: -1;
                }

                .results-screen h2 {
                    color: #000000;
                    font-size: 16px;
                    margin-bottom: 25px;
                    text-shadow: 1px 1px 0px #ffffff;
                }

                .results-trophy {
                    font-size: 48px;
                    margin: 20px 0;
                    animation: pixelBounce 2s ease-in-out infinite;
                }

                @keyframes pixelBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                .results-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .stat-item {
                    background: #ff99cc;
                    border: 3px solid #000000;
                    padding: 15px 10px;
                    position: relative;
                }

                .stat-item::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    right: -1px;
                    bottom: -1px;
                    background: #ffffff;
                    z-index: -1;
                }

                .stat-value {
                    font-size: 16px;
                    display: block;
                    margin-bottom: 8px;
                    color: #000000;
                }

                .stat-label {
                    font-size: 8px;
                    color: #000000;
                    line-height: 1.2;
                }
            </style>
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
            this.hide()
            new GameScreenComponent(this.gameData, this.loading)
        })

        $('#newConfigBtn').addEventListener('click', () => {
            this.hide()
            new SetupScreenComponent(this.gameData, this.loading)
        })

        $('#exitBtn').addEventListener('click', () => {
            this.hide()
            window.location.reload()
        })
    }

    show() {
        if (this.resultsScreenContainer) this.resultsScreenContainer.style.display = 'block'
    }

    hide() {
        if (this.resultsScreenContainer) this.resultsScreenContainer.style.display = 'none'
    }
}