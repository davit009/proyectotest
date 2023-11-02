import React, { useState, useEffect } from 'react';

// Función para mezclar las respuestas
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuestionCard = ({ pregunta, respuestas, onAnswer, esCorrecta }) => {
  // Estado para las respuestas mezcladas
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Estado para controlar la visualización del modal
  const [showModal, setShowModal] = useState(false);

  // Efecto para mezclar las respuestas cada vez que cambian la pregunta o las respuestas
  useEffect(() => {
    setShuffledAnswers(shuffleArray([...respuestas]));
  }, [pregunta, respuestas]);

  const handleAnswer = (respuesta) => {
    onAnswer(respuesta);
    setShowModal(true);

    // Ocultar el modal después de 2 segundos
    setTimeout(() => {
      setShowModal(false);
    }, 2000); 
  };

  return (
    <div className="card mx-auto" style={{ width: '25rem', height: '12rem', background:"#708090"}}>
      <h5 className="card-title">Preguntas</h5>
      <div className="card-body text-center">
        <p className="title">{pregunta}</p>
        {/* Usar shuffledAnswers en lugar de respuestas para mostrar los botones */}
        {shuffledAnswers.map((respuesta, index) => (
          <button
            style={{ margin: '5px' }}
            type="button"
            className="btn btn-primary my-2"
            key={index}
            onClick={() => handleAnswer(respuesta)}
          >
            {respuesta}
          </button>
        ))}
      </div>

      {/* Modal para mostrar si la respuesta es correcta o incorrecta */}
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Respuesta</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {esCorrecta === true && <p>Correcto</p>}
                {esCorrecta === false && <p>Incorrecto</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
