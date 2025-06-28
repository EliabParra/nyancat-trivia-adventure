export default class PixelStarsComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .stars {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }

                .star {
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    background: #ffffff;
                    box-shadow: 
                        0 0 0 2px #ffffff,
                        4px 0 0 0 #ffffff,
                        0 4px 0 0 #ffffff,
                        4px 4px 0 0 #ffffff;
                    animation: pixelTwinkle 3s ease-in-out infinite;
                }

                @keyframes pixelTwinkle {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(0.8); }
                }
            </style>
            <div class="stars">
                <div class="star" style="top: 10%; left: 10%; animation-delay: 0s;"></div>
                <div class="star" style="top: 20%; left: 80%; animation-delay: 1s;"></div>
                <div class="star" style="top: 70%; left: 20%; animation-delay: 2s;"></div>
                <div class="star" style="top: 80%; left: 70%; animation-delay: 3s;"></div>
                <div class="star" style="top: 40%; left: 90%; animation-delay: 4s;"></div>
                <div class="star" style="top: 60%; left: 5%; animation-delay: 5s;"></div>
            </div>
        `
    }

    connectedCallback() {
        this.starsContainer = this.shadowRoot.querySelector('.stars')
        this.starInterval = setInterval(() => this.createPixelStar(), 2000)
    }

    createPixelStar() {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.top = Math.random() * 100 + '%'
        star.style.left = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 3 + 's'
        this.starsContainer.appendChild(star)
        
        setTimeout(() => {
            star.remove()
        }, 3000)
    }
}

customElements.define('pixel-stars', PixelStarsComponent)