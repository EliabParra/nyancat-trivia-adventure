const $ = $ => document.querySelector($)

export default class SetupScreenComponent {
    constructor() {
        this.gameData = {}
        this.setupContainer = $('#setupScreen')
        this.renderScreen()
        this.startButton = $('#startGameBtn')
        this.categoriesSelect = $('#categories')
        this.categories = this.getCategories()
        this.renderOptions()
    }

    renderScreen() {
        this.setupContainer.innerHTML += `
            <h2>GAME SETUP</h2>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="playerName">PLAYER NAME:</label>
                    <input type="text" id="playerName" placeholder="ENTER YOUR NAME..." maxlength="20" required>
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
    
    renderOptions() {
        this.categories.then(categories => {
            categories.forEach(category => {
                const { id, name } = category
                this.categoriesSelect.innerHTML += `<option value="${id}">${name}</option>`
            })
        })
    }
    
    startGame() {
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
}