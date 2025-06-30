import GameScreenComponent from '../GameScreenComponent/game.js'
import LoadingComponent from '../LoadingComponent/loading.js'
const $ = $ => document.querySelector($)

export default class SetupScreenComponent {
    constructor({ playerName, questionCount, difficulty, category } = {}, loading) {
        this.setupContainer = $('#setupScreen')
        this.setupContainer.style.display = 'block'
        this.gameData = {
            playerName: playerName || '',
            questionCount: questionCount || 10,
            difficulty: difficulty || 'medium',
            category: category || '',
        }
        this.loading = loading
        this.renderScreen()
    }

    renderScreen() {
        const { playerName, questionCount, difficulty } = this.gameData

        this.setupContainer.innerHTML = `
            <style>
                .setup-screen {
                    background: #ff99cc;
                    border: 4px solid #000000;
                    padding: 30px;
                    position: relative;
                    margin-bottom: 20px;
                    display: none;
                }

                .setup-screen::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: #ffffff;
                    z-index: -1;
                }

                .setup-screen h2 {
                    color: #000000;
                    font-size: 16px;
                    text-align: center;
                    margin-bottom: 25px;
                    text-shadow: 1px 1px 0px #ffffff;
                }

                .form-row {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                }

                .form-group {
                    flex: 1;
                    min-width: 250px;
                }

                .form-group label {
                    display: block;
                    color: #000000;
                    font-size: 10px;
                    margin-bottom: 8px;
                    text-shadow: 1px 1px 0px #ffffff;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 10px;
                    border: 3px solid #000000;
                    font-size: 10px;
                    font-family: 'Press Start 2P', monospace;
                    background: #ffffff;
                    color: #000000;
                    transition: none;
                }

                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    background: #ffff99;
                    box-shadow: inset 2px 2px 0px #000000;
                }
            </style>
            <h2>GAME SETUP</h2>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="playerName">PLAYER NAME:</label>
                    <input type="text" id="playerName" placeholder="ENTER YOUR NAME..." maxlength="20" value="${playerName}" required>
                </div>
                
                <div class="form-group">
                    <label for="questionCount">QUESTION COUNT:</label>
                    <select id="questionCount">
                        <option value="5">5 QUESTIONS</option>
                        <option value="10" selected>10 QUESTIONS</option>
                        <option value="15">15 QUESTIONS</option>
                        <option value="20">20 QUESTIONS</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="difficulty">DIFFICULTY LEVEL:</label>
                    <select id="difficulty">
                        <option value="easy">EASY MODE</option>
                        <option value="medium" selected>MEDIUM MODE</option>
                        <option value="hard">HARD MODE</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>QUESTION CATEGORIES:</label>
                <select class="categories-select" id="categories">
                    <option value="" selected>ALL MIXED</option>
                </select>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button class="btn btn-success" id="startGameBtn">START GAME!</button>
            </div>
        `

        this.renderCategories()
        $('#questionCount').value = questionCount
        $('#difficulty').value = difficulty
        this.addEventListeners()
    }
    
    async getCategories() {
        const response = await fetch('https://opentdb.com/api_category.php')
        const data = await response.json()
        return data.trivia_categories
    }

    getPlayerName() {
        this.playerName = $('#playerName').value.trim()
        if (this.playerName.length < 2 || this.playerName.length > 20) {
            alert('NAME MUST BE 2-20 CHARACTERS!')
            return
        }
        return this.playerName
    }
    
    renderCategories() {
        this.categoriesSelect = $('#categories')
        this.getCategories().then(categories => {
            categories.forEach(category => {
                const { id, name } = category
                this.categoriesSelect.innerHTML += `<option value="${id}">${name}</option>`
            })
            this.categoriesSelect.value = this.gameData.category
        })
    }
    
    setGameData() {
        this.playerName = this.getPlayerName()
        this.questionCount = $('#questionCount').value
        this.difficulty = $('#difficulty').value
        this.category = this.categoriesSelect.value

        this.gameData = {
            playerName: this.playerName,
            questionCount: this.questionCount,
            difficulty: this.difficulty,
            category: this.category
        }
    }

    addEventListeners() {
        this.startButton = $('#startGameBtn')
        this.startButton.addEventListener('click', () => this.startGame())
    }

    startGame() {
        this.setGameData()
        if (!this.playerName) return
        this.setupContainer.style.display = 'none'
        this.loading.show()
        new GameScreenComponent(this.gameData, this.loading)
    }

    show() {
        if (this.setupContainer) this.setupContainer.style.display = 'block'
    }

    hide() {
        if (this.setupContainer) this.setupContainer.style.display = 'none'
    }
}