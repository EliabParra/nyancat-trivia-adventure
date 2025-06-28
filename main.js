import SetupScreenComponent from "/SetupScreenComponent/setup.js"
import GameScreenComponent from "/GameScreenComponent/game.js"
import AudioComponent from "/AudioComponent/audio.js"

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

// Create pixel stars periodically
function createPixelStar() {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.top = Math.random() * 100 + '%'
    star.style.left = Math.random() * 100 + '%'
    star.style.animationDelay = Math.random() * 3 + 's'
    document.querySelector('.stars').appendChild(star)
    
    setTimeout(() => {
        star.remove()
    }, 3000)
}

// Create new stars periodically
setInterval(createPixelStar, 2000)

// Add sound effect simulation (visual feedback)
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .category-option')) {
        e.target.style.transform = 'scale(0.95)'
        setTimeout(() => {
            e.target.style.transform = ''
        }, 100)
    }
})