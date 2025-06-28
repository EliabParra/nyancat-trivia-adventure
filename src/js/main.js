import SetupScreenComponent from "./SetupScreenComponent/setup.js"
import GameScreenComponent from "./GameScreenComponent/game.js"
import AudioComponent from "./AudioComponent/audio.js"
import PixelStarsComponent from "./PixelStarsComponent/stars.js"

const $ = $ => document.querySelector($)
const $$ = $$ => document.querySelectorAll($$)

const setupScreen = new SetupScreenComponent()

setupScreen.startButton.addEventListener('click', () => {
    setupScreen.startGame()
    if (!setupScreen.playerName) return
    const gameData = setupScreen.gameData
    setupScreen.setupContainer.style.display = 'none'
    $('#loadingScreen').style.display = 'block'
    const gameScreen = new GameScreenComponent(gameData)
})

document.addEventListener('click', (e) => {
    if (e.target.matches('button, .category-option')) {
        e.target.style.transform = 'scale(0.95)'
        setTimeout(() => {
            e.target.style.transform = ''
        }, 100)
    }
})