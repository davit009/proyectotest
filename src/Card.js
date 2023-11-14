import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuestionCard = ({
  pregunta,
  respuestas,
  onAnswer,
  esCorrecta, // Esta prop debería ser actualizada por el componente padre con cada respuesta
  nivelCompletado,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [localRespuestaCorrecta, setLocalRespuestaCorrecta] = useState(0);
  const [localRespuestaIncorrecta, setLocalRespuestaIncorrecta] = useState(0);

  // Mezclar respuestas cuando la pregunta cambie
  useEffect(() => {
    setShuffledAnswers(shuffleArray([...respuestas]));
  }, [pregunta, respuestas]);

  // Reiniciar los contadores cuando el nivel esté completo
  useEffect(() => {
    if (nivelCompletado) {
      setLocalRespuestaCorrecta(0);
      setLocalRespuestaIncorrecta(0);
    }
  }, [nivelCompletado]);

  // Actualizar los contadores locales basados en la corrección de la respuesta
  useEffect(() => {
    // Solo actualiza los contadores si la respuesta ha sido dada (esCorrecta no es null)
    if (esCorrecta !== null) {
      if (esCorrecta) {
        setLocalRespuestaCorrecta(prev => prev + 1);
      } else {
        setLocalRespuestaIncorrecta(prev => prev + 1);
      }
    }
  }, [esCorrecta]);

  const handleAnswerClick = (respuesta) => {
    onAnswer(respuesta);
    setShowModal(true);

    // No necesitas comprobar aquí si la respuesta es correcta; eso se maneja en el componente padre.

    // Cerrar el modal después de un tiempo
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="card mx-auto" style={{ width: '25rem', background: "#708090"}}>
      <h5 className="card-title">Preguntas</h5>
      <div className="card-body text-center">
        <p className="title">{pregunta}</p>
        {shuffledAnswers.map((respuesta, index) => (
          <button
            style={{ margin: '5px' }}
            type="button"
            className="btn btn-primary my-2"
            key={index}
            onClick={() => handleAnswerClick(respuesta)}
          >
            {respuesta}
          </button>
        ))}

        {/* Contadores de respuestas */}
        <div className="counters">
          <p>Respuestas correctas: {localRespuestaCorrecta}</p>
          <p>Respuestas incorrectas: {localRespuestaIncorrecta}</p>
        </div>
      </div>

      {/* Modal para mostrar si la respuesta es correcta o incorrecta */}
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{marginTop:'100px', display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Respuesta</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {esCorrecta ? <p style={{background:'#1AF010', color:`white`}}>¡Correcto!</p> : <p style={{background:`#F32323` , color:`white`}}>Incorrecto</p>}
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
