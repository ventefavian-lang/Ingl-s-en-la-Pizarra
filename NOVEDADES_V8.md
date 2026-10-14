# Edición 8 · Enseñar antes de evaluar

Este ZIP incluye el proyecto entero de A1, A2, B1 y B2. No necesitas combinar versiones ni pegar fragmentos de código.

## Qué cambia al aprender

Las **288 lecciones** tienen una guía interactiva de cinco pasos:

1. **Entiende.** Una tarea concreta, un modelo en inglés con traducción redactada para ese ejemplo y palabras de apoyo. Escucha y relaciona sonido con significado.
2. **Observa.** La explicación de la lección, su ampliación del taller, tres ejemplos y ayuda para entender términos como sujeto, auxiliar o participio.
3. **Construye.** Reconstruye el modelo con fichas. Puedes quitar palabras, pedir la siguiente o mirar otra vez. La corrección señala la primera diferencia de orden.
4. **Decide.** Dos casos de la misma estructura, con pistas y explicación. Puedes cambiar una respuesta mientras aprendes.
5. **Úsalo.** Una tarea específica para crear un mensaje propio, por escrito o en voz alta. Guarda tu borrador y revísalo antes de pasar a la práctica.

Hay **288 modelos bilingües y 288 tareas breves** alineados con sus lecciones. Los modelos principales tienen traducciones redactadas y revisadas en esta edición; las traducciones automáticas adicionales de otros textos siguen identificadas como orientativas.

Las pruebas de cada lección comprueban las estructuras y ejemplos que se acaban de trabajar. Las dos primeras lecciones de una unidad tienen cinco actividades; la tercera añade lectura y, desde A2, comprensión de un mensaje de audio. El banco amplio de práctica y los talleres siguen disponibles para profundizar y repasar.

## Conversaciones con comprobación de comprensión

- Las **48 escenas** tienen una pregunta sobre el mensaje, con la intervención que justifica la respuesta. Es práctica acompañada y puedes volver a escuchar.
- Después de explorar las tres expresiones, hay **tres comprobaciones por escena** para relacionarlas con su intención: 144 en total.
- Al participar en el diálogo, la pista de tu intención se consulta cuando la necesitas. Una respuesta equivocada muestra qué significa tu elección y con qué mensaje debes conectarla.
- La portada conecta tu próxima lección con una historia relacionada y el repaso.

## Un error sirve para aprender

En la práctica de las lecciones puedes volver a responder después de leer la explicación. **La nota conserva el primer intento**: copiar la solución durante una corrección no aumenta esa nota ni elimina el error pendiente de un repaso posterior.

Los borradores de las guías se conservan por nivel y cuenta. La práctica guiada no otorga puntos ni acredita dominio por haber abierto pantallas. Las redacciones y respuestas orales libres usan autoevaluación; no se inventa una corrección automática de su gramática.

## Se conserva lo anterior

96 unidades, 96 talleres, 24 historias, 48 escenas, diez voces fijas, 1.274 MP3, 44 sonidos, cuatro evaluaciones integradas, palabras nuevas en morado, ayuda de palabra y expresión, historial, gráficas y repaso. El diagrama de la boca continúa retirado.

Los audios grabados incluidos cubren las historias y diálogos indicados en VOCES.md. Otros ejemplos y textos libres utilizan la lectura del navegador. No se ha contratado ni conectado un servicio de IA de pago.

## Cómo actualizar

Abre **EMPIEZA_AQUI.html**. Copia el contenido completo del ZIP extraído a tu repositorio. Si ya utilizabas Google, **conserva tu archivo public/firebase-config.js** y publica las reglas incluidas en **firestore.rules**: se amplían los límites de las colecciones internas de guías y borradores. Un commit de GitHub no publica estas reglas en Firebase.

No necesitas crear otro proyecto Firebase. Los avances anteriores se conservan, incluidos los errores de actividades antiguas. Puedes exportar tu progreso antes de actualizar.

## Editar el material

- `src/teacher-notes.json`: modelos traducidos y tareas de cada lección.
- `src/teaching-guide.js` y `src/teaching-model.js`: guía y práctica vinculada a ella.
- `src/scene-checks.json`: comprensión con evidencia para las 48 escenas.
- `scripts/build-teacher-notes.py` y `scripts/build-scene-checks.py`: fuentes originales para regenerar esos dos JSON.
- `src/deep-course.json` y `src/deep-b2.json`: explicaciones ampliadas y talleres.

Después de modificar el código o los JSON, ejecuta `npm run build`. La compilación también sincroniza las traducciones de los modelos con la ayuda contextual. Los archivos compilados de esta entrega ya están incluidos.
