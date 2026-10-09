# Muestras sintéticas de referencia

47 archivos WAV PCM, mono, 22.050 Hz: las 44 fichas pedagógicas y tres variantes estadounidenses (`er`, `axr`, `ow`). No son grabaciones de hablantes humanos.

Generados para este material con eSpeak NG mediante `@echogarden/espeak-ng-emscripten` 0.3.5, voz inglesa británica para las 44 fichas y estadounidense para las tres variantes. Parámetros: rate 105, pitch 48, volume 100. Se retiró silencio exterior y se ajustó el volumen; los nasales se prolongaron mediante secuencias del mismo símbolo. Los fonemas oclusivos son breves por naturaleza. `src/phoneme-audio.json` conserva los símbolos de generación y duraciones.

Proyecto del sintetizador: https://github.com/echogarden-project/espeak-ng-emscripten
Documentación de fonemas: https://github.com/espeak-ng/espeak-ng/blob/master/docs/phonemes.md

El motor eSpeak NG no se distribuye en esta página. Los WAV son salida sintética generada; no se copiaron audios comerciales. La finalidad es ofrecer una referencia breve, complementada con palabras completas y escucha externa. La selección tradicional de 44 sonidos no representa todos los acentos del inglés. Un dibujo 2D y una voz sintética no permiten evaluar clínicamente ni medir la precisión de la articulación de una persona.
