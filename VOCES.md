# Voces predeterminadas · edición 6.2

Entra a una escena y pulsa **Escuchar conversación**. Cada personaje ya tiene una voz distinta. Se mantiene al cambiar de escena, nivel o dispositivo. El alumno puede repetir o cambiar la velocidad; no elige las voces.

## Audios que vienen incluidos

El paquete contiene **1.191 archivos MP3**, reutilizados cuando coinciden el texto y el personaje:

- Los 384 turnos de las 48 escenas de A1 a B2.
- Los 144 ejemplos de expresiones de esas escenas.
- Las 96 respuestas alternativas de los personajes.
- Las 576 intervenciones de los diálogos de las unidades anteriores.

Son 1.200 usos de audio, con nueve coincidencias reutilizadas. Los turnos del paso «Habla» utilizan la misma grabación que la escena, de modo que el personaje conserva su voz. Los audios se cargan al escucharlos; no se descarga el catálogo completo al abrir la portada.

La velocidad inicial es natural. Las opciones tranquila y lenta conservan el tono. Cambiar de pantalla, detener o iniciar otra intervención cancela la anterior. Una descarga fallida muestra un aviso para reintentar y no cuenta como diálogo escuchado.

## Procedencia y reparto

Los audios son **síntesis neural generada previamente**, no grabaciones humanas. Se generaron localmente con Kokoro-82M v1.0, exportación ONNX q8, y se incluyen como MP3 mono a 24 kHz y 64 kbit/s. El navegador del estudiante solo reproduce archivos: no descarga el modelo ni necesita una clave o cuenta de un proveedor de voz. Escucharlos no genera cargos de una API; sí utiliza la transferencia de datos de tu alojamiento.

| Papel | Voz fija del modelo | Idioma |
|---|---|---|
| Leo | am_michael | Inglés estadounidense |
| Mia | af_heart | Inglés estadounidense |
| Nora | af_bella | Inglés estadounidense |
| Sam | am_fenrir | Inglés estadounidense |
| Ejemplos / narración | af_sarah | Inglés estadounidense |

Se ajustó el volumen de los archivos para reducir saltos entre intervenciones. La naturalidad es subjetiva y una voz sintetizada puede pronunciar algún nombre o frase de forma imperfecta. El reparto usa voces diferentes; no convierte una sola voz en varias cambiándole el tono.

Referencias del modelo y sus autores:

- https://huggingface.co/hexgrad/Kokoro-82M
- https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md
- https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX
- https://github.com/hexgrad/kokoro/tree/main/kokoro.js
- `KOKORO_LICENSE.txt`: licencia Apache 2.0 del proyecto utilizado para generar los audios. Los pesos del modelo no se distribuyen en este ZIP.

## Otros textos y laboratorio

Las lecturas completas, palabras de diccionario y textos libres que no pertenecen a las grabaciones utilizan una voz inglesa elegida automáticamente entre las del navegador. Su disponibilidad y calidad dependen del equipo. El ajuste de idioma del dictado sigue controlando el reconocimiento; no cambia el acento de los MP3 incluidos. Las antiguas preferencias manuales de voces se ignoran.

El laboratorio de los 44 sonidos conserva sus muestras, su diagrama y sus referencias de pronunciación. El reconocimiento de voz y el micrófono siguen dependiendo del navegador. El porcentaje de palabras entendidas no es una evaluación fonética.

## Para actualizar la web

Este ZIP contiene el proyecto entero. Sigue `PUBLICAR_PASO_A_PASO.md` y conserva `public/firebase-config.js` si ya configuraste Google. Copia también **public/assets/voices**; subir solo el JavaScript dejaría los audios sin publicar. La compilación habitual no genera audios: usa los que ya están incluidos.

Si ya publicaste las reglas de la edición 6, este cambio no requiere modificar Firebase. El progreso conserva el mismo formato.

## Solo si después editas los diálogos

Cambiar un texto requiere generar su nueva grabación. El archivo se identifica por personaje y texto; la página evita reproducir una grabación antigua para una frase modificada.

1. Edita las conversaciones o los diálogos en los JSON de `src`.
2. Ejecuta `node scripts/audio-plan.mjs` para actualizar el catálogo.
3. En tu equipo de desarrollo, instala FFmpeg y después `npm install --no-save --package-lock=false kokoro-js@1.2.1`.
4. Ejecuta `node scripts/generate-audio.mjs`. Descarga el modelo abierto una vez y genera localmente los MP3 que falten. Puede tardar según el procesador. No subas `.audio-cache` ni `node_modules`.
5. Ejecuta `npm test` y `npm run build`. Sube los archivos del proyecto, incluidos los MP3 nuevos.

Estos pasos de generación son opcionales para quien modifica el contenido. No son necesarios para publicar o escuchar el paquete entregado.
