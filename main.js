import SetupScreenComponent from "/SetupScreenComponent/setup.js"
import GameScreenComponent from "/GameScreenComponent/game.js"

const $ = $ => document.querySelector($)
const $$ = $$ => document.querySelectorAll($$)

const setupScreen = new SetupScreenComponent()

setupScreen.startButton.addEventListener('click', () => {
    setupScreen.startGame()
    if (!setupScreen.playerName) return
    const gameData = setupScreen.gameData
    setupScreen.setupContainer.style.display = 'none'
    $('#loadingScreen').style.display = 'block'
    console.log(gameData)
    const gameScreen = new GameScreenComponent(gameData)
})


// Controles de audio
const audio = $('#nyanAudio')
const muteBtn = $('#muteBtn')
const volumeSlider = $('#volumeSlider')
const volumeDisplay = $('#volumeDisplay')
let isMuted = false

// Configurar volumen inicial
audio.volume = 0.02

muteBtn.addEventListener('click', () => {
    if (isMuted) {
        isMuted = false
        muteBtn.textContent = '🔊'
        audio.muted = false
    } else {
        isMuted = true
        muteBtn.textContent = '🔇'
        audio.muted = true
    }
})

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value
    volumeDisplay.textContent = volume
    audio.volume = volume / 100
    
    if (volume == 0) {
        muteBtn.textContent = '🔇'
        isMuted = true
        audio.muted = true
    } else if (isMuted) {
        muteBtn.textContent = '🔊'
        isMuted = false
        audio.muted = false
    }
})

// Función para iniciar la música
function startMusic() {
    audio.play().catch(e => {
        console.log('Audio necesita interacción del usuario')
    })
}

// Iniciar música después de interacción del usuario
let musicStarted = false
function handleFirstInteraction() {
    if (!musicStarted) {
        startMusic()
        musicStarted = true
    }
}

document.addEventListener('click', handleFirstInteraction)
document.addEventListener('keydown', handleFirstInteraction)
document.addEventListener('touchstart', handleFirstInteraction)

// Mostrar/ocultar slider de volumen en móviles
const volumeControl = $('#volumeControl')
const volumeSliderWrap = $('#volumeSliderWrap')
muteBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        e.preventDefault()
        volumeSliderWrap.classList.toggle('active')
    }
})
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !volumeControl.contains(e.target)) volumeSliderWrap.classList.remove('active')
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