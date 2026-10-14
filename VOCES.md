# Voces predeterminadas · edición 7

Esta edición cambia el motor anterior por **Supertonic 3** y amplía el reparto a diez voces diferentes. Cada personaje conserva una voz fija; el alumno solo controla la reproducción y la velocidad. Los archivos tienen identificadores nuevos para evitar reutilizar los audios anteriores desde la caché.

| Personaje | Voz |
|---|---|
| Leo | M1 |
| Mia | F1 |
| Nora | F2 |
| Sam | M2 |
| Ella | F3 |
| Oliver | M3 |
| Zoe | F4 |
| Max | M4 |
| Ava | F5 |
| Noah | M5 |

La narración de ejemplos utiliza F5. Las parejas cambian entre historias y unidades. No se intenta convertir una voz en otra alterando el tono.

## Audios incluidos

1.274 MP3: intervenciones, ejemplos y respuestas alternativas de las 48 escenas; los diálogos de las 96 unidades; las historias cortas del laboratorio; los cuatro mensajes de las nuevas evaluaciones integradas. Se cargan al reproducirlos, sin descargar el catálogo completo al abrir la portada.

Son voces sintéticas generadas previamente, no grabaciones de actores. El navegador reproduce MP3 mono a 44,1 kHz y 80 kbit/s, con volumen normalizado. La naturalidad es subjetiva y puede haber pronunciaciones mejorables. No hay una API de pago ni un modelo de voz ejecutándose en el navegador.

Los textos libres, las palabras del diccionario y otras lecturas que no están en este catálogo utilizan las voces inglesas disponibles en el navegador. La calidad y disponibilidad de esa lectura dependen del dispositivo. El idioma del dictado no cambia los MP3.

## Procedencia

- Código: https://github.com/supertone-oss-archive/supertonic — MIT; copia en SUPERTONIC_CODE_LICENSE.txt.
- Modelo: https://huggingface.co/supertone-oss-archive/supertonic-3 — revisión aafc6e32416a594460b32413efc49d7fe4ce6d46; OpenRAIL-M, copia en SUPERTONIC_MODEL_LICENSE.txt.
- No se incluyen los pesos del modelo en el ZIP. La inferencia utilizada para preparar los archivos desactiva la telemetría de ONNX Runtime.

## Publicación

Sube también `public/assets/voices`. No necesitas generar nada para publicar este paquete. Conserva `public/firebase-config.js` si ya tienes configurado Google.

## Solo al editar el contenido

Cambiar una frase exige generar su audio nuevo. Los archivos se identifican por motor, voz y texto, para no leer una frase antigua cuando el texto cambia.

1. Edita los JSON de `src`. El generador de conversaciones también aplica el reparto de `scripts/recast.py`.
2. Ejecuta `node scripts/audio-plan.mjs`.
3. En un entorno de desarrollo con Python y FFmpeg, instala `onnxruntime==1.31.0`, `numpy` y `soundfile`.
4. Descarga `onnx/` y `voice_styles/` de la revisión oficial indicada, conservando su estructura.
5. Ejecuta `python scripts/generate_audio.py --model RUTA_DEL_MODELO --workers 3`.
6. Ejecuta `npm test` y `npm run build`; sube los nuevos MP3 y el código. No subas los pesos ni dependencias locales.

La compilación normal de Netlify no genera audios ni descarga estos modelos.
