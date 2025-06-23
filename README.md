# 🧠 Trivia Challenge Game

## 📋 Descripción del Proyecto

Aplicación web interactiva de trivia que demuestra el manejo de programación asíncrona utilizando HTML, CSS y JavaScript vanilla. El juego consume la API externa de Open Trivia Database para proporcionar una experiencia completa de preguntas y respuestas con temporizadores y sistema de puntuación.

## ✨ Características Principales

### 🎮 **Funcionalidades del Juego**
- Configuración personalizada del juego (nombre, cantidad de preguntas, dificultad, categoría)
- Consumo asíncrono de API externa para obtener preguntas
- Temporizador de 20 segundos por pregunta con indicadores visuales
- Sistema de puntuación en tiempo real
- Feedback visual inmediato para respuestas
- Pantalla de resultados con estadísticas completas

### 🎨 **Interfaz de Usuario**
- Diseño responsivo para dispositivos móviles, tablets y desktop
- Interfaz moderna con efectos glassmorphism y gradientes
- Animaciones suaves y transiciones elegantes
- Indicadores visuales claros para todas las interacciones
- Paleta de colores profesional y accesible

### ⚡ **Programación Asíncrona**
- Peticiones HTTP asíncronas con `fetch()`
- Manejo de temporizadores con `setTimeout()` y `setInterval()`
- Gestión de estados de carga y errores
- Control de flujo asíncrono del juego

## 🏗️ Estructura del Proyecto

```
trivia-challenge/
│
├── index.html          # Archivo principal con la aplicación completa
├── main.js             # Archivo con la lógica del juego
├── README.md           # Este archivo
└── styles.css          # Estilos del proyecto
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para consumir la API

### Instrucciones de Instalación
1. **Clona o descarga el proyecto**
   ```bash
   git clone https://github.com/tu-usuario/trivia-challenge.git
   cd trivia-challenge
   ```

2. **Abre el archivo HTML**
   - Doble clic en `index.html` para abrir en el navegador, o
   - Usa un servidor local como live server (recomendado):

## 🎯 Configuración del Juego

### Parámetros Disponibles

| Parámetro | Opciones | Validación |
|-----------|----------|------------|
| **Nombre del Jugador** | Texto libre | 2-20 caracteres, obligatorio |
| **Cantidad de Preguntas** | Numérico | Mínimo 5, máximo 20 |
| **Dificultad** | Fácil, Medio, Difícil | Selección única obligatoria |
| **Categoría** | Mixtas + 7 específicas | Opcional (mixtas por defecto) |

### Categorías Disponibles
- **Mixtas**: Todas las categorías mezcladas
- **Conocimiento General**: Cultura general
- **Ciencia y Naturaleza**: Biología, física, química
- **Deportes**: Deportes de todo el mundo
- **Geografía**: Países, capitales, landmarks
- **Historia**: Eventos históricos mundiales
- **Películas**: Cine internacional
- **Música**: Artistas, géneros, historia musical

## 🏆 Sistema de Puntuación

### Mecánica de Puntos
- **Respuesta Correcta**: +10 puntos base
- **Respuesta Incorrecta**: 0 puntos
- **Tiempo Agotado**: 0 puntos

### Estadísticas Finales
- Puntuación total acumulada
- Número de respuestas correctas vs incorrectas
- Porcentaje de aciertos
- Tiempo promedio empleado por pregunta
- Representación visual circular del rendimiento

## ⏱️ Sistema de Temporizador

### Características del Timer
- **Duración**: 20 segundos por pregunta
- **Actualización**: Cada segundo (1000ms)
- **Indicador Visual**: Cambio de color en los últimos 5 segundos
- **Auto-avance**: Pregunta siguiente al agotarse el tiempo
- **Pausa**: Se detiene al seleccionar respuesta

### Estados Visuales
- **Normal**: Verde (15-20 segundos)
- **Advertencia**: Naranja pulsante (1-5 segundos)
- **Agotado**: Avance automático a siguiente pregunta

## 🔧 API y Servicios Externos

### Open Trivia Database
- **URL Base**: `https://opentdb.com/api.php`
- **Parámetros**: amount, category, difficulty, type
- **Formato**: JSON con preguntas y respuestas
- **Manejo de Errores**: Validación de respuesta y fallbacks

### Ejemplo de Petición
```javascript
const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
```

## 💻 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y formularios
- **CSS3**: 
  - Flexbox y CSS Grid para layouts
  - Animaciones CSS y transiciones
  - Variables CSS para temas
  - Media queries para responsividad
- **JavaScript ES6+**:
  - Clases y módulos
  - Async/Await y Promises
  - Fetch API
  - DOM manipulation
  - Event handling

### Características Técnicas
- **Sin dependencias externas**: Vanilla JavaScript puro
- **Programación orientada a objetos**: Clase principal `TriviaGame`
- **Gestión de estados**: Control centralizado del flujo del juego
- **Manejo de errores**: Try-catch y validaciones

## 🔄 Estados de la Aplicación

### Flujo de Navegación
```
Configuración → Carga → Juego → Resultados
     ↑              ↓         ↑
     └── Cambiar Config ←─────┘
     └── Jugar de Nuevo ←─────┘
```

### Manejo de Errores
- **Error de API**: Mensaje informativo y opción de reintentar
- **Sin conexión**: Notificación y sugerencias
- **Datos inválidos**: Validación en tiempo real
- **Timeouts**: Manejo automático y fallbacks

## 🧪 Testing y Debugging

### Herramientas de Desarrollo
- **Console.log**: Tracking de estados del juego
- **DevTools**: Inspección de red y performance
- **Responsive Design**: Testing en diferentes viewports

### Variables Globales para Debug
```javascript
// Acceso a la instancia del juego
window.triviaGame

// Estados disponibles
triviaGame.gameState
triviaGame.gameConfig
```

## 📚 Estructura del Código

### Organización de Archivos
- **HTML**: Estructura de las 4 pantallas principales
- **CSS**: Estilos organizados por componentes
- **JavaScript**: Clase principal con métodos específicos

### Métodos Principales
```javascript
class TriviaGame {
    // Configuración
    initializeEventListeners()
    showScreen(screenId)
    
    // Flujo del juego
    startGame()
    loadQuestions()
    startQuestion()
    
    // Temporizador
    startTimer()
    updateTimer()
    
    // Interacciones
    selectAnswer(button)
    nextQuestion()
    
    // Resultados
    showResults()
    calculateStats()
    
    // Navegación
    playAgain()
    changeConfiguration()
    exitGame()
}
```

## 🎓 Objetivos Académicos Cumplidos

### Programación Asíncrona
- ✅ Uso de `fetch()` para consumo de API
- ✅ Implementación de `setTimeout()` y `setInterval()`
- ✅ Manejo de Promises y async/await
- ✅ Control de flujos asíncronos

### Manipulación del DOM
- ✅ Event listeners y delegation
- ✅ Modificación dinámica de contenido
- ✅ Gestión de clases CSS programáticamente
- ✅ Formularios y validación

### Buenas Prácticas
- ✅ Código modular y reutilizable
- ✅ Separación de responsabilidades
- ✅ Manejo de errores robusto
- ✅ Interfaz responsive y accesible


## 👨‍💻 Autor

**[Eliab Parra]**  
Estudiante de Ingeniería de Computación  
Universidad Rafael Urdaneta  

---

**¡Disfruta jugando Trivia Challenge! 🎉**