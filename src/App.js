import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import QuestionCard from './Card';
import preguntas from './preguntas';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [esCorrecta, setEsCorrecta] = useState(null);
  const [dificultad, setDificultad] = useState('');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false); // Nuevo estado para manejar el fin del juego

  const startGame = (selectedDificultad) => {
    setDificultad(selectedDificultad);
    const filteredQuestions = preguntas.filter(q => q.dificultad === selectedDificultad);
    setShuffledQuestions(shuffleQuestions(filteredQuestions));
    setCurrentQuestionIndex(0);
    setJuegoTerminado(false); // Reiniciar el estado de juegoTerminado cuando se inicia un nuevo juego
  };

  const shuffleQuestions = (questions) => {
    return [...questions].sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (respuesta) => {
    const respuestaCorrecta = shuffledQuestions[currentQuestionIndex].respuestaCorrecta;
    const esRespuestaCorrecta = respuesta === respuestaCorrecta;
    setEsCorrecta(esRespuestaCorrecta);

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setJuegoTerminado(true); // Establecer que el juego ha terminado
      }
      setEsCorrecta(null);
    }, 2000);
  };

  const resetGame = () => {
    setDificultad('');
    setShuffledQuestions([]);
    setCurrentQuestionIndex(0);
    setEsCorrecta(null);
    setJuegoTerminado(false); // Restablecer el juego
  };

  const margenes = {
    margin: '20px',
  };

  return (
    <div className="App" style={margenes}>
      {juegoTerminado ? (
        // Mostrar mensaje de fin del juego y botón de reinicio
        <div>
          <p>¡Fin del juego! Gracias por jugar.</p>
          <button onClick={resetGame}>Reiniciar Juego</button>
        </div>
      ) : dificultad && shuffledQuestions.length > 0 ? (
        // Mostrar el juego si la dificultad está seleccionada y las preguntas están cargadas
        <>
          {esCorrecta !== null && <div>{esCorrecta ? "Correcto" : "Incorrecto"}</div>}
          <QuestionCard
            pregunta={shuffledQuestions[currentQuestionIndex].pregunta}
            respuestas={shuffledQuestions[currentQuestionIndex].respuestas}
            onAnswer={handleAnswer}
            esCorrecta={esCorrecta}
          />
        </>
      ) : (
        // Mostrar interfaz de selección de dificultad
        <div className="mb-3" style={margenes}>
          <h2>Selecciona el nivel de dificultad:</h2>
          <button onClick={() => startGame('facil')}>Fácil</button>
          <button onClick={() => startGame('media')}>Media</button>
          <button onClick={() => startGame('dificil')}>Difícil</button>
        </div>
      )}
    </div>
  );
}

export default App;
