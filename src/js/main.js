import SetupScreenComponent from "./SetupScreenComponent/setup.js"
import AudioComponent from "./AudioComponent/audio.js"
import PixelStarsComponent from "./PixelStarsComponent/stars.js"

const loading = document.createElement('loading-spinner')
document.body.appendChild(loading)
new SetupScreenComponent({}, loading).show()