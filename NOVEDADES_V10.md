# Hello English · edición 10

## Qué cambia

- Diseño completo de la app: menú lateral en escritorio, barra inferior en móvil, colores cálidos, capítulos, ilustraciones propias y mascota.
- Ruta progresiva A1–B2: 32 capítulos, 96 temas y 288 misiones en total. Se muestra un capítulo a la vez y puedes consultar los demás.
- A1 empieza con Hello/Hi/Goodbye, luego nombres y presentaciones y después afirmaciones, negaciones y preguntas con be. Más adelante aparecen objetos, personas, hogar, rutinas, comida, ciudad, viajes y planes.
- Una actividad por pantalla, con progreso de sesión, audio, traducción, ejemplos, selección, orden de palabras, comprensión y escritura personal.
- Ayuda gramatical opcional accesible desde el signo de interrogación. La práctica de escritura se guarda y se compara con un modelo; no inventa una nota de gramática.
- Errores que vuelven dentro de la sesión. Un error programa otra recuperación en 15 minutos; las respuestas correctas utilizan intervalos de 1, 3, 7, 14 y 30 días. Repetir antes de tiempo no adelanta el intervalo.
- Repaso de misiones en Explorar → Un poco de memoria. Rondas de hasta 10 actividades, sin quitar vidas.
- Desbloqueo con al menos 70% de acierto inicial; 30 XP la primera vez. Reparar un error no cambia la nota inicial. Los puntos y la ruta representan ejercicios completados, no una certificación del nivel.
- Animaciones de transición, nodo actual y celebración; respetan la preferencia de reducir movimiento. La pantalla de carga aparece mientras arranca la aplicación, sin una espera artificial.

## Qué se conserva

Tus avances por nivel, el guardado de invitado, el acceso Google/Firebase configurable, las voces fijas, 44 sonidos, las historias, el manual de 61 temas, los talleres, las evaluaciones, los borradores, las traducciones contextuales y el historial. La boca animada sigue retirada. Esta edición no incorpora un chat de IA ni pide una clave de API.

Las misiones completadas en versiones anteriores siguen completadas. Una misión futura ya realizada sigue accesible, aunque haya huecos anteriores. Puedes elegir A1, A2, B1 o B2 desde arriba; dentro del nivel se abre el primer paso que falta.

## Publicación

Sustituye el contenido del repositorio con el contenido de este ZIP, preservando tu `public/firebase-config.js`. Incluye `public/assets/journey` y `public/assets/voices`. Netlify construye con Node 22, `npm run build`, carpeta `public`. No hace falta una migración nueva de reglas Firebase con respecto a la edición 9.

Consulta `PRUEBAS.md` para el alcance real de las comprobaciones. No se garantiza que completar las misiones equivalga a dominar un nivel: el repaso, las tareas libres y las evaluaciones forman parte del trabajo.
