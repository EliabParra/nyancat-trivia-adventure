export default class AudioComponent extends HTMLElement {
    static get observedAttributes() {
        return ['src']
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
        this.audio = this.shadowRoot.querySelector('#nyanAudio')
        this.muteBtn = this.shadowRoot.querySelector('#muteBtn')
        this.volumeSlider = this.shadowRoot.querySelector('#volumeSlider')
        this.volumeDisplay = this.shadowRoot.querySelector('#volumeDisplay')
        this.isMuted = false

        this.setupEventListeners()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src' && this.audio) {
            this.audio.src = newValue || 'https://www.nyan.cat/music/original.mp3'
        }
    }

    render() {
        const src = this.getAttribute('src') || 'https://www.nyan.cat/music/original.mp3'
        this.shadowRoot.innerHTML = `
            <style>
                .controls {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .volume-control {
                    background: #003366;
                    border: 2px solid #ffffff;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .volume-slider-wrap {
                    display: flex;
                    align-items: center;
                }

                .mute-btn {
                    background: #003366;
                    border: 2px solid #ffffff;
                    color: #ffffff;
                    padding: 6px 10px;
                    font-family: 'Press Start 2P', cursive;
                    font-size: 8px;
                    cursor: pointer;
                    transition: all 0.1s;
                    image-rendering: pixelated;
                }

                .mute-btn:hover {
                    background: #ffffff;
                    color: #003366;
                }

                .mute-btn:active {
                    transform: scale(0.95);
                }

                .volume-slider {
                    -webkit-appearance: none;
                    width: 60px;
                    height: 8px;
                    background: #003366;
                    border: 2px solid #ffffff;
                    outline: none;
                }

                .volume-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    background: #ffffff;
                    border: 1px solid #003366;
                    cursor: pointer;
                }

                .volume-slider::-moz-range-thumb {
                    width: 12px;
                    height: 12px;
                    background: #ffffff;
                    border: 1px solid #003366;
                    cursor: pointer;
                    border-radius: 0;
                }

                .volume-display {
                    color: #ffffff;
                    font-size: 8px;
                    min-width: 25px;
                    text-align: center;
                }
                
                @media (max-width: 768px) {
                    .volume-control {
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-end;
                        background: none;
                        border: none;
                        padding: 0;
                    }
                    .volume-slider-wrap {
                        display: none;
                        flex-direction: row;
                        align-items: center;
                        background: #003366;
                        border: 2px solid #ffffff;
                        padding: 8px;
                        margin-left: 8px;
                        border-radius: 6px;
                        position: absolute;
                        top: 40px;
                        right: 0;
                        z-index: 200;
                    }
                    .volume-slider-wrap.active {
                        display: flex;
                    }
                    .volume-slider {
                        width: 60px;
                    }
                }
            </style>
            <div class="controls">
                <div class="volume-control" id="volumeControl">
                    <button class="mute-btn" id="muteBtn">🔊</button>
                    <div class="volume-slider-wrap" id="volumeSliderWrap">
                        <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="2">
                        <div class="volume-display" id="volumeDisplay">2</div>
                    </div>
                </div>
            </div>
            <audio id="nyanAudio" loop preload="auto" src="${src}"></audio>
        `
    }

    setupEventListeners() {
        this.muteBtn.addEventListener('click', () => {
            if (this.isMuted) {
                this.isMuted = false
                this.muteBtn.textContent = '🔊'
                this.audio.muted = false
            } else {
                this.isMuted = true
                this.muteBtn.textContent = '🔇'
                this.audio.muted = true
            }
        })

        this.volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value
            this.volumeDisplay.textContent = volume
            this.audio.volume = volume / 100
            if (volume == 0) {
                this.muteBtn.textContent = '🔇'
                this.isMuted = true
                this.audio.muted = true
            } else if (this.isMuted) {
                this.muteBtn.textContent = '🔊'
                this.isMuted = false
                this.audio.muted = false
            }
        })

        // Iniciar audio tras cualquier interacción
        let started = false
        const startAudio = () => {
            if (!started) {
                this.audio.volume = this.volumeSlider.value / 100
                this.audio.play().catch(() => {})
                started = true
            }
        }
        const events = ['click', 'keydown', 'touchstart', 'touchend', 'pointerdown']
        events.forEach(ev => {
            window.addEventListener(ev, startAudio, { once: true, passive: true })
            if (this.shadowRoot) {
                this.shadowRoot.addEventListener(ev, startAudio, { once: true, passive: true })
            }
        })
        this.muteBtn.addEventListener('click', startAudio)
        this.volumeSlider.addEventListener('input', startAudio)

        // Mostrar/ocultar slider de volumen en móviles
        const volumeControl = this.shadowRoot.querySelector('#volumeControl')
        const volumeSliderWrap = this.shadowRoot.querySelector('#volumeSliderWrap')
        this.muteBtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault()
                volumeSliderWrap.classList.toggle('active')
            }
        })
        document.addEventListener('click', (e) => {
            if (window.innerWidth > 768) return
            const path = e.composedPath()
            const isInside = path.includes(volumeControl)
            if (!isInside) {
                volumeSliderWrap.classList.remove('active')
            }
        })
    }
}

customElements.define('nyan-cat-music', AudioComponent)