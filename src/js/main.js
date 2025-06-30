import SetupScreenComponent from "./SetupScreenComponent/setup.js"
import AudioComponent from "./AudioComponent/audio.js"
import PixelStarsComponent from "./PixelStarsComponent/stars.js"

const $ = $ => document.querySelector($)

const loading = document.createElement('loading-spinner')
$('.container').appendChild(loading)
new SetupScreenComponent({}, loading).show()