import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import QuestionCard from './Card';
import preguntas from './preguntas';

function App() {
  // Estado para controlar la pregunta actual y la respuesta del jugador
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [esCorrecta, setEsCorrecta] = useState(null);

  // Estado para la dificultad seleccionada, preguntas aleatorias y estado del juego
  const [dificultad, setDificultad] = useState('');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Estado para contar respuestas correctas e incorrectas, y para indicar si se completó el nivel
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(0);
  const [respuestaIncorrecta, setRespuestaIncorrecta] = useState(0);
  const [nivelCompletado, setNivelCompletado] = useState(false);

  // Función para iniciar el juego con la dificultad seleccionada
  const startGame = (selectedDificultad) => {
    setDificultad(selectedDificultad);

    // Filtrar preguntas según la dificultad
    const filteredQuestions = preguntas.filter(q => q.dificultad === selectedDificultad);

    // Barajar las preguntas para obtener un orden aleatorio
    setShuffledQuestions(shuffleQuestions(filteredQuestions));
    setCurrentQuestionIndex(0);
    setJuegoTerminado(false); // Reiniciar el estado de juegoTerminado cuando se inicia un nuevo juego
  };

  // Función para barajar las preguntas en orden aleatorio
  const shuffleQuestions = (questions) => {
    return [...questions].sort(() => Math.random() - 0.5);
  };

  // Función para manejar la respuesta del jugador
  const handleAnswer = (respuesta) => {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].respuestaCorrecta;
    const esRespuestaCorrecta = respuesta === correctAnswer;
    setEsCorrecta(esRespuestaCorrecta);

    if (esRespuestaCorrecta) {
      setRespuestaCorrecta((prevCorrectas) => prevCorrectas + 1);
    } else {
      setRespuestaIncorrecta((prevIncorrectas) => prevIncorrectas + 1);
    }

    // Temporizador para avanzar a la siguiente pregunta o finalizar el juego
    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setNivelCompletado(false); 
      } else {
        setJuegoTerminado(true); 
        setNivelCompletado(true); 
      }
      setEsCorrecta(null);
    }, 2000);
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    setDificultad('');
    setShuffledQuestions([]);
    setCurrentQuestionIndex(0);
    setEsCorrecta(null);
    setJuegoTerminado(false); 
    setRespuestaCorrecta(0);
    setRespuestaIncorrecta(0);  
  };
  

  // Estilo para los márgenes en el componente
  const margenes = {
    margin: '20px',
  };

  return (
    <div className="App" style={margenes}>
      {juegoTerminado ? (
        // Sección para mostrar el mensaje de fin de juego y botón de reinicio
        <div>
          <p>¡Fin del juego! Gracias por jugar.</p>
          <p>Respuestas correctas: {respuestaCorrecta}</p>
          <p>Respuestas incorrectas: {respuestaIncorrecta}</p>
          <br></br>
          <button onClick={resetGame}>Volver a Empezar</button>
          
        </div>
      ) : dificultad && shuffledQuestions.length > 0 ? (
        // Sección para mostrar la pregunta y opciones de respuesta
        <>
          {esCorrecta !== null && <div>{esCorrecta ? "Correcto" : "Incorrecto"}</div>}
          <QuestionCard
            pregunta={shuffledQuestions[currentQuestionIndex].pregunta}
            respuestas={shuffledQuestions[currentQuestionIndex].respuestas}
            onAnswer={handleAnswer}
            esCorrecta={esCorrecta}
            nivelCompletado={nivelCompletado} // Pasamos el nuevo estado como prop
          />
        </>
      ) : (
        // Sección para la selección de dificultad y estadísticas
        <div className="mb-3" style={margenes}>
          <h2 id="fs">Selecciona el nivel de dificultad:</h2>
          <button className="boton1" onClick={() => startGame('facil')}>Fácil</button>
          <button className="boton1" onClick={() => startGame('media')}>Media</button>
          <button className="boton1" onClick={() => startGame('dificil')}>Difícil</button>
          
        </div>
      )}
    </div>
  );
}

export default App;
