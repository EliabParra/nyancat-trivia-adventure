const $ = $ => document.querySelector($)
const $$ = $$ => document.querySelectorAll($$)

class TriviaGame {
    constructor() {
        this.currentScreen = 'config-screen'
        this.gameConfig = {}
        this.gameState = {
            currentQuestion: 0,
            score: 0,
            correctAnswers: 0,
            questions: [],
            timer: null,
            timePerQuestion: []
        }
        
        this.initializeEventListeners()
    }

    initializeEventListeners() {
        // seleccionar dificultad
        $$('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                $$('.difficulty-btn').forEach(b => b.classList.remove('selected'))
                e.target.classList.add('selected')
            })
        })

        // enviar formulario de configuracion
        $('#config-form').addEventListener('submit', e => {
            e.preventDefault()
            this.startGame()
        })

        // seleccionar respuesta
        $('#answers-container').addEventListener('click', e => {
            if (e.target.classList.contains('answer-btn')) {
                this.selectAnswer(e.target)
            }
        })

        // jugar de nuevo
        $('#play-again-btn').addEventListener('click', () => {
            this.playAgain()
        })

        // cambiar configuracion
        $('#change-config-btn').addEventListener('click', () => {
            this.changeConfiguration()
        })

        // salir del juego
        $('#exit-game-btn').addEventListener('click', () => {
            this.exitGame()
        })
    }

    showScreen(screenId) {
        // mostrar pantalla indicada
        $$('.screen').forEach(screen => {
            screen.classList.remove('active')
        })
        document.getElementById(screenId).classList.add('active')
        this.currentScreen = screenId
    }

    startGame() {
        // recopilar configuracion del formulario
        this.gameConfig = {
            playerName: $('#player-name').value,
            questionCount: parseInt($('#question-count').value),
            difficulty: $('.difficulty-btn.selected').dataset.difficulty,
            category: $('#category').value
        }

        // mostrar pantalla de carga
        this.showScreen('loading-screen')

        // TODO: llamar a la api para obtener preguntas
        setTimeout(() => {
            this.showScreen('game-screen')
            // TODO: cargar preguntas
            // TODO: iniciar pregunta
        }, 2000)
    }

    selectAnswer(button) {
        // seleccionar respuesta
        console.log('respuesta seleccionada', button.dataset.answer)
        
        // deshabilitar todos los botones de respuesta
        $$('.answer-btn').forEach(btn => {
            btn.disabled = true
        })

        // mostrar feedback visual
        button.classList.add('correct') // TODO: marcar como incorrecto si corresponde
        
        // TODO: verificar si la respuesta es correcta
        // TODO: avanzar a la siguiente pregunta o mostrar resultados
    }

    playAgain() {
        // reiniciar juego con la misma configuracion
        this.resetGameState()
        this.showScreen('loading-screen')
        // TODO: volver a cargar preguntas
    }

    changeConfiguration() {
        // volver a la pantalla de configuracion
        this.resetGameState()
        this.showScreen('config-screen')
    }

    exitGame() {
        // recargar pagina para salir del juego
        if (confirm('estas seguro de que quieres salir del juego')) {
            location.reload()
        }
    }

    resetGameState() {
        // reiniciar estado del juego
        this.gameState = {
            currentQuestion: 0,
            score: 0,
            correctAnswers: 0,
            questions: [],
            timer: null,
            timePerQuestion: []
        }
    }

    // TODO: implementar metodo para cargar preguntas desde la api
    // async loadQuestions() {
    // }

    // TODO: implementar metodo para mostrar pregunta actual e iniciar temporizador
    // startQuestion() {
    // }

    // TODO: implementar temporizador con setInterval y advertencia cuando queden 5 segundos
    // startTimer() {
    // }

    // TODO: avanzar a la siguiente pregunta o mostrar resultados finales
    // nextQuestion() {
    // }

    // TODO: calcular estadisticas finales y mostrar pantalla de resultados
    // showResults() {
    // }
}

// inicializar juego al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    const game = new TriviaGame()
    
    // instancia para debugear
    window.triviaGame = game
})