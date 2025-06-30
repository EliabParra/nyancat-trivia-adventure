export default class LoadingComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .loading {
                    display: none;
                    text-align: center;
                    padding: 50px;
                    background: #ff99cc;
                    border: 4px solid #000000;
                    position: relative;
                }

                .loading::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: #ffffff;
                    z-index: -1;
                }

                .spinner {
                    width: 48px;
                    height: 48px;
                    border: 4px solid #000000;
                    background: #ffffff;
                    margin: 0 auto 20px;
                    animation: pixelSpin 1s linear infinite;
                    position: relative;
                }

                .spinner::before {
                    content: '';
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    right: 4px;
                    bottom: 4px;
                    background: #00ccff;
                    animation: pixelSpin 1s linear infinite reverse;
                }

                @keyframes pixelSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .loading-text {
                    font-size: 12px;
                    color: #000000;
                    text-shadow: 1px 1px 0px #ffffff;
                    line-height: 1.4;
                }
            </style>
            <div class="loading" id="loadingScreen">
                <div class="spinner"></div>
                <div class="loading-text">NYAN CAT IS FLYING<br>THROUGH SPACE<br>COLLECTING QUESTIONS...</div>
            </div>
        `
    }

    show() {
        const loadingDiv = this.shadowRoot.getElementById('loadingScreen')
        if (loadingDiv) loadingDiv.style.display = 'block'
    }

    hide() {
        const loadingDiv = this.shadowRoot.getElementById('loadingScreen')
        if (loadingDiv) loadingDiv.style.display = 'none'
    }
}

customElements.define('loading-spinner', LoadingComponent)