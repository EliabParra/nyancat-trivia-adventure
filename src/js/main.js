import SetupScreenComponent from "./SetupScreenComponent/setup.js"
import AudioComponent from "./AudioComponent/audio.js"
import PixelStarsComponent from "./PixelStarsComponent/stars.js"

const setupScreen = new SetupScreenComponent()

document.addEventListener("click", (e) => {
    if (e.target.matches("button, .category-option")) {
        e.target.style.transform = "scale(0.95)"
        setTimeout(() => {
            e.target.style.transform = ""
        }, 100)
    }
})