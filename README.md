# Hello English — A1, A2, B1 y laboratorio de pronunciación

Abre `EMPIEZA_AQUI.html`. Para actualizar la página publicada, sigue **ACTUALIZAR_GITHUB.md** y conserva tu configuración pública de Firebase.

## Tres niveles en el mismo sitio

| Nivel | Unidades | Lecciones | Actividades | Examen final |
| --- | ---: | ---: | ---: | ---: |
| A1 | 24 | 72 | 504 | 48 preguntas |
| A2 | 24 | 72 | 576 | 72 preguntas |
| B1 | 24 | 72 | 576 | 72 preguntas |

Cada nivel guarda su propio progreso. B1 incluye 24 lecturas, 24 escuchas con preguntas, diálogos, tareas de escritura con modelos y misiones orales. Consulta `TEMARIO_B1.md`. El material está orientado a esos niveles; no es una certificación oficial ni promete dominar el idioma en un plazo fijo.

## Laboratorio para todos los sonidos

- Mapa de 44 sonidos con organización británica tradicional: 12 vocales, 8 diptongos y 24 consonantes. El inventario y las realizaciones varían entre acentos.
- Cada sonido tiene instrucciones de lengua, labios, aire y voz, ejemplos, contraste y un dibujo lateral/frontal animable.
- Palabras y frases: secuencia fonética basada en un diccionario estadounidense de 124 082 entradas. Las variantes se pueden elegir; las palabras desconocidas se marcan. El sistema no adivina el significado para elegir homógrafos como *read*.
- Animación lenta, avance sonido a sonido, lectura normal/lenta y repetición. Las posiciones y tiempos son ilustrativos; no constituyen una simulación anatómica 3D ni una alineación exacta del audio.
- Puedes pulsar palabras en textos ingleses del curso para abrir su análisis.
- Ejercicios de escucha entre pares, práctica de ritmo y enlaces, micrófono con comparación de palabras y grabación temporal para escucharte.
- **El porcentaje compara texto reconocido. No califica fonemas, acento ni movimientos de tu boca.** El reconocimiento puede acertar a pesar de una pronunciación imprecisa o fallar con una pronunciación correcta.

## Historias y método

Hay 9 historias adicionales con traducción línea por línea: 3 en cada nivel. Puedes ocultar apoyo o todo el texto, escuchar varias veces, contestar una pregunta, imitar con pausas y escribir tu propia versión. Las 72 unidades conservan además sus lecturas y diálogos.

La rutina combina comprensión, apoyo temporal, recuperación de memoria, producción, imitación y repasos espaciados. Se incorpora lo útil de las capturas proporcionadas con material original. No se incluyen vídeos, cursos de pago ni promesas publicitarias ajenas.

## Google, privacidad y coste

La integración Firebase está implementada. Para usar Google debes completar `public/firebase-config.js`, habilitar el proveedor, autorizar tu dominio y publicar `firestore.rules`. Al actualizar desde A1 o A2, utiliza el mismo proyecto y conserva la configuración. Los documentos anteriores mantienen sus rutas.

Como invitado, se guarda por navegador y dominio. Con cuenta, los resultados y avances del nivel se sincronizan cuando hay conexión. El audio grabado para escucharte se queda temporalmente en la pestaña y puede borrarse. El reconocimiento de voz puede usar un servicio del navegador; no se promete procesamiento completamente local. No se guarda la grabación ni la transcripción completa en Firebase.

No se requiere una API de IA ni se ha añadido tutor generativo. Firebase y el alojamiento tienen sus propios planes y límites de uso; el código no activa facturación.

## Desarrollar y publicar

Node 22 o superior:

```sh
npm ci
npm run build
npm test
npm run serve
```

`serve` necesita Python 3 y abre el sitio en http://localhost:8085. La compilación viene incluida. También puedes abrir `public/index.html` para el modo invitado; micrófono y Google requieren HTTPS o localhost y compatibilidad del navegador.

Para Netlify conectado a GitHub: comando `npm run build`, carpeta publicada `public`, directorio base vacío.

Contenido: `src/course.json`, `src/course-a2.json`, `src/course-b1.json`. Laboratorio: `src/lab.js`, `src/lab.css`, `src/sounds.json`, `src/stories.json`, `src/word-links.js`. Diccionario: `public/assets/pronunciation-us.js`, con licencia en `CMUDICT_LICENSE.txt`. El diccionario se carga al analizar palabras, no en cada visita a la portada.

Consulta `PRUEBAS.md` para las verificaciones y límites; `METODOS_Y_FUENTES.md` explica las decisiones educativas.
