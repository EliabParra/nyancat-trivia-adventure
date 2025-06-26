// Controles de audio
const audio = document.getElementById('nyanAudio');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeDisplay = document.getElementById('volumeDisplay');
let isMuted = false;

// Configurar volumen inicial
audio.volume = 0.02;

muteBtn.addEventListener('click', () => {
    if (isMuted) {
        isMuted = false;
        muteBtn.textContent = '🔊';
        audio.muted = false;
    } else {
        isMuted = true;
        muteBtn.textContent = '🔇';
        audio.muted = true;
    }
});

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    volumeDisplay.textContent = volume;
    audio.volume = volume / 100;
    
    if (volume == 0) {
        muteBtn.textContent = '🔇';
        isMuted = true;
        audio.muted = true;
    } else if (isMuted) {
        muteBtn.textContent = '🔊';
        isMuted = false;
        audio.muted = false;
    }
});

// Función para iniciar la música
function startMusic() {
    audio.play().catch(e => {
        console.log('Audio necesita interacción del usuario');
    });
}

// Iniciar música después de interacción del usuario
let musicStarted = false;
function handleFirstInteraction() {
    if (!musicStarted) {
        startMusic();
        musicStarted = true;
    }
}

document.addEventListener('click', handleFirstInteraction);
document.addEventListener('keydown', handleFirstInteraction);
document.addEventListener('touchstart', handleFirstInteraction);

// Mostrar/ocultar slider de volumen en móviles
const volumeControl = document.getElementById('volumeControl');
const volumeSliderWrap = document.getElementById('volumeSliderWrap');
muteBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        volumeSliderWrap.classList.toggle('active');
    }
});
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !volumeControl.contains(e.target)) volumeSliderWrap.classList.remove('active');
});