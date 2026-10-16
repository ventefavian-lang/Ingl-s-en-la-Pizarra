# Edición 9 · más inglés en uso, menos instrucciones visibles

## Qué cambia al estudiar

La lección empieza con una conversación breve: el texto se muestra en inglés y la traducción se abre cuando la necesitas. Puedes escucharla completa, repetir una intervención, reducir la velocidad o pasar a **Solo audio**. Una pregunta comprueba el mensaje con una pista tomada del propio diálogo.

En **Tu turno** respondes como el segundo personaje. Puedes escribir, grabarte y escuchar una respuesta posible. La grabación permanece temporalmente en la pestaña y se puede descargar; no se envía a Firebase. Esta actividad es práctica libre, sin una nota gramatical o fonética inventada.

**Observa** muestra primero ejemplos. Cada uno abre su significado y el motivo de la estructura. Hay una idea breve visible y una explicación más amplia plegada. Las instrucciones genéricas de planificar, cambiar y comprobar se han reducido; la tarea concreta de cada lección se conserva.

## Entender el inglés

Nueva sección accesible desde la portada, el menú, cada unidad y las lecciones:

- **61 temas**, con **190 apartados** de usos, formas, contrastes y excepciones relevantes.
- **376 ejemplos explicados**. Algunos recuperan frases del diálogo para examinarlas con atención; no son 376 estructuras distintas.
- **61 conversaciones nuevas**, con **244 intervenciones bilingües** y una pregunta de comprensión por conversación.
- **122 comprobaciones** de significado o uso, con respuestas y explicación.
- Enlaces específicos desde las **288 lecciones** de A1 a B2.
- Búsqueda por tema, uso o ejemplo en inglés; filtro por punto de entrada.
- Copia de consulta e impresión: **MANUAL_INGLES_A1_B2.html**. En la web: `manual-ingles.html`.

Incluye fundamentos de la oración, pronombres, be, artículos, nombres, posesión, descripción, cantidad, lugar y tiempo; tiempos verbales y aspecto; modales, condiciones, voz pasiva, estilo indirecto, relativas, patrones verbales, combinaciones de palabras, conectores y énfasis; conversación, servicios, mensajes, relatos, opiniones, negociación, lectura, escucha, mediación y comunicación en el trabajo.

Los niveles son una orientación de entrada. Un tema puede incluir comparaciones que se retoman más adelante. La selección no certifica por sí sola todo el nivel MCER ni sustituye el uso del idioma con otras personas y textos nuevos.

## Lo que se mantiene

96 unidades, 96 talleres, 24 historias largas con 48 escenas, el banco de 12.070 variantes de actividades, exámenes integrados, repaso, errores, historial, gráficos, ayuda contextual al pasar el cursor y palabras no recordadas en violeta. La boca animada sigue retirada; permanece el laboratorio de 44 sonidos.

El progreso anterior conserva sus claves. Las nuevas consultas y prácticas libres no suman XP ni se presentan como dominio. Los borradores de **Úsalo** siguen guardándose. Los borradores de **Tu turno** del nuevo manual son temporales y se descartan al cambiar de página.

## Audio y cuentas

El catálogo crece a **1.517 MP3**, con diez voces fijas. Las 61 conversaciones nuevas están cubiertas por archivos incluidos. Los ejemplos sueltos que no coinciden con una grabación recurren a la lectura disponible en el navegador. Son voces sintéticas preparadas previamente, no actores humanos.

No se requiere una API de IA de pago. Para que Google y la sincronización funcionen en tu instalación, conserva o configura tu proyecto Firebase siguiendo **CONFIGURAR_GOOGLE.md**. La configuración del ZIP está vacía.

## Actualizar

Extrae el ZIP completo. Abre **EMPIEZA_AQUI.html**. Si tu Google ya funciona, conserva `public/firebase-config.js` antes de reemplazar el proyecto. Publica el contenido extraído, incluyendo `public/assets/voices` y `public/build`, con las instrucciones de **PUBLICAR_PASO_A_PASO.md**.

Para editar estos temas, modifica `scripts/handbook/foundations.py` o `expanded.py`; las escenas de fundamentos están en `scenes.py` y las relaciones con las lecciones en `mapping.py`. Ejecuta `python3 scripts/handbook/build.py`, genera los audios nuevos si cambias diálogos y después `npm run build`. La publicación normal no necesita Python ni generar audios: los archivos ya vienen preparados.
