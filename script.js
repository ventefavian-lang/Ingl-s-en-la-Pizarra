/* =========================================================
   INGLÉS EN LA PIZARRA — lógica compartida
   - Motor de quizzes interactivos (multiple choice)
   - Progreso del alumno guardado en localStorage
   ========================================================= */

/**
 * Cada quiz en el HTML se marca así:
 * <div class="quiz" data-quiz="a1-to-be">
 *   <div class="pregunta" data-correcta="1">
 *     <p class="enunciado">She ___ a teacher.</p>
 *     <div class="opciones">
 *       <button class="opcion">am</button>
 *       <button class="opcion">is</button>
 *       <button class="opcion">are</button>
 *     </div>
 *   </div>
 *   ...
 * </div>
 */

function iniciarQuizzes() {
  const quizzes = document.querySelectorAll('.quiz[data-quiz]');

  quizzes.forEach((quiz) => {
    const preguntas = quiz.querySelectorAll('.pregunta');
    let respondidas = 0;
    let correctas = 0;

    preguntas.forEach((pregunta) => {
      const indiceCorrecta = parseInt(pregunta.dataset.correcta, 10);
      const botones = pregunta.querySelectorAll('.opcion');

      botones.forEach((boton, indice) => {
        boton.addEventListener('click', () => {
          if (pregunta.dataset.resuelta === 'true') return;
          pregunta.dataset.resuelta = 'true';
          respondidas += 1;

          if (indice === indiceCorrecta) {
            boton.classList.add('correcta');
            correctas += 1;
          } else {
            boton.classList.add('incorrecta');
            botones[indiceCorrecta].classList.add('correcta');
          }

          botones.forEach((b) => (b.disabled = true));

          if (respondidas === preguntas.length) {
            mostrarResultado(quiz, correctas, preguntas.length);
            guardarProgreso(quiz.dataset.quiz, correctas, preguntas.length);
          }
        });
      });
    });
  });
}

function mostrarResultado(quiz, correctas, total) {
  let resultado = quiz.querySelector('.resultado-quiz');
  if (!resultado) {
    resultado = document.createElement('p');
    resultado.className = 'resultado-quiz';
    quiz.appendChild(resultado);
  }
  const porcentaje = Math.round((correctas / total) * 100);
  resultado.textContent = `Puntaje: ${correctas}/${total} (${porcentaje}%)`;
}

function guardarProgreso(idQuiz, correctas, total) {
  try {
    const clave = 'progreso-ingles-pizarra';
    const datos = JSON.parse(localStorage.getItem(clave) || '{}');
    datos[idQuiz] = { correctas, total, fecha: new Date().toISOString() };
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch (e) {
    // localStorage puede fallar (modo privado, etc.) — no interrumpir la lección
    console.warn('No se pudo guardar el progreso:', e);
  }
}

document.addEventListener('DOMContentLoaded', iniciarQuizzes);
