# 🌈 Nyan Cat Trivia Adventure! 🐱

¡Bienvenido a la trivia más colorida y pixelada del universo!  
Disfruta de preguntas desafiantes, temporizadores animados, música retro y una interfaz inspirada en Nyan Cat.

---

## ✨ Características Principales

- Configuración personalizada: nombre, cantidad de preguntas, dificultad y categoría.
- Todas las preguntas se obtienen de la API Open Trivia Database en una sola petición.
- Temporizador de 20 segundos por pregunta, con animaciones y advertencias visuales.
- Feedback inmediato: respuestas correctas/incorrectas resaltadas y animadas.
- Avance automático tras responder o agotar el tiempo.
- Pantalla de resultados con estadísticas: puntaje, aciertos, porcentaje de éxito y tiempo promedio.
- Música de fondo controlable y efectos visuales de estrellas pixeladas.
- Interfaz responsiva y temática Nyan Cat (cursores, colores, animaciones).

---

## 🏗️ Estructura del Proyecto

```
nyancat-trivia-adventure/
│
├── index.html
├── src/
│   ├── styles.css
│   ├── assets/
│   │   ├── nyan_cat_cursor_normal.png
│   │   ├── nyan_cat_cursor_pointer.png
│   │   ├── nyan_cat_music.mp3
│   │   └── nyan_cat.gif
│   └── js/
│       ├── main.js
│       ├── AudioComponent/
│       │   └── audio.js
│       ├── GameScreenComponent/
│       │   └── game.js
│       ├── LoadingComponent/
│       │   └── loading.js
│       ├── PixelStarsComponent/
│       │   └── stars.js
│       ├── ResultsScreenComponent/
│       │   └── results.js
│       └── SetupScreenComponent/
│           └── setup.js
└── README.md
```

---

## 🚦 Secuencia y Lógica de la Aplicación

1. **Pantalla de Configuración:**  
   El usuario elige nombre, cantidad de preguntas, dificultad y categoría.

2. **Pantalla de Carga:**  
   Aparece un spinner animado mientras se obtienen todas las preguntas de la API.

3. **Pantalla de Juego:**  
   - Se muestran las preguntas una a una, con temporizador de 20 segundos.
   - Si el usuario responde, se muestra feedback visual y tras 2 segundos avanza.
   - Si el tiempo se agota, se muestra la respuesta correcta y tras 2 segundos avanza.
   - Se registra el tiempo empleado en cada pregunta.

4. **Pantalla de Resultados:**  
   - Estadísticas completas: puntaje, aciertos, porcentaje de éxito y tiempo promedio.
   - Opciones para jugar de nuevo, cambiar configuración o salir.

5. **Extras visuales:**  
   - Fondo animado de estrellas pixeladas.
   - Cursores personalizados y música de fondo controlable.

---

## 🔧 API Utilizada

- **Open Trivia Database**  
  - URL: `https://opentdb.com/api.php`
  - Parámetros: `amount`, `category`, `difficulty`, `type`
  - Formato: JSON

---

## 🚀 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/nyancat-trivia-adventure.git
   cd nyancat-trivia-adventure
   ```

2. **Abre `index.html` en tu navegador**  
   (o usa un servidor local para mejor compatibilidad con módulos ES).

---

## 🏆 Sistema de Puntuación y Estadísticas

- **Respuesta correcta:** +10 puntos
- **Respuesta incorrecta o tiempo agotado:** 0 puntos
- **Estadísticas finales:**  
  - Puntaje total
  - Respuestas correctas / totales
  - Porcentaje de aciertos
  - Tiempo promedio por pregunta

---

## ⏱️ Temporizador

- **20 segundos por pregunta**
- **Indicador visual:** Cambia de color en los últimos 5 segundos
- **Avance automático:** Al responder o agotar el tiempo

---

## 👾 Créditos y Autor

Desarrollado por **Eliab Parra**  
Universidad Rafael Urdaneta

---

¡Disfruta la aventura de trivia más colorida y pixelada con Nyan Cat! 🎉
