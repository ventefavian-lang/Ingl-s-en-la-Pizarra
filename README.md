# Hello English — A1, A2 y B1 · Edición 4

Abre **EMPIEZA_AQUI.html**. Esta entrega contiene el proyecto completo para GitHub y Netlify, con la boca rediseñada y los talleres ampliados. Para actualizar, sigue **ACTUALIZAR_GITHUB.md**.

## Qué contiene

| Nivel | Unidades | Lecciones base | Ejercicios de las lecciones base | Talleres ampliados |
| --- | ---: | ---: | ---: | ---: |
| A1 | 24 | 72 | 504 | 24 |
| A2 | 24 | 72 | 576 | 24 |
| B1 | 24 | 72 | 576 | 24 |

Los 72 talleres añaden 216 explicaciones ampliadas, 72 lecturas originales nuevas con preguntas y apoyo de vocabulario, 72 proyectos, situaciones de conversación y cuatro rondas de práctica por unidad. Se conservan las lecturas, los diálogos, las tarjetas, los exámenes y las nueve historias bilingües anteriores.

Cada taller tiene seis etapas:

1. **Comprender:** explicación, modelos, contraste y ejemplo propio.
2. **Construir:** elegir significado, ordenar frases, recuperar vocabulario y dictado del caso nuevo.
3. **Leer:** idea principal, evidencia, preguntas y reconstrucción sin texto.
4. **Escuchar:** comprensión sin transcripción, comprobación y práctica por intervenciones.
5. **Expresarte:** tres situaciones de conversación, proyecto escrito y autoevaluación.
6. **Recordar:** recuperación mezclada y repasos posteriores con intervalos orientativos de 1, 3, 7, 14 y 30 días.

El calendario se cuenta desde cada repaso válido. Las repeticiones anticipadas no adelantan la fecha. Las rondas usan el primer intento sin pistas; el 80% permite registrar una ronda superada. Los proyectos se registran como práctica con autoevaluación, no como una nota automática de gramática. No se bloquea el acceso a contenidos ni se promete un número de días para dominar un nivel.

Las lecciones base y los talleres muestran avances distintos. Se guardan notas, respuestas y borradores por nivel. Las respuestas abiertas se comparan con referencias y criterios; no hay un tutor generativo.

## Pronunciación y boca interactiva

- Mapa vocálico interactivo con referencia estadounidense y británica tradicional: altura y posición de la lengua; trayectorias de diptongos.
- Boca vectorial original con labios, dientes, lengua sombreada y vistas frontal, lateral o ambas.
- Controles de fase, pausa, movimiento lento, sonido anterior/siguiente y capas de lengua, aire y etiquetas.
- Seis partes explorables: lengua, labios, paladar, dientes, aire y voz.
- Catálogo tradicional de 44 sonidos, todos con instrucciones, ejemplos, errores frecuentes y práctica guiada.
- Analizador de palabras y frases con 124 082 entradas de CMUdict estadounidense. Las variantes se eligen; lo desconocido se marca sin inventar una transcripción.
- Lectura normal/lenta, comparación de palabras reconocidas y grabación temporal para escucharte.

La boca es una ilustración didáctica 2D aproximada. No reconstruye tu boca ni sincroniza exactamente los fonemas con el audio del navegador. Los acentos pueden diferir del dibujo y del diccionario. **El porcentaje de voz compara palabras transcritas: no evalúa fonemas ni acento.**

## Google y conservación del progreso

Puedes estudiar como invitado. Para guardar en una cuenta, configura tu propio Firebase siguiendo **CONFIGURAR_GOOGLE.md**. Los alumnos solo pulsan Google; no introducen claves ni crean proyectos.

Al actualizar, conserva `public/firebase-config.js` y publica el nuevo `firestore.rules` en el mismo proyecto Firebase. Las reglas aceptan los nuevos campos de talleres. Las rutas A1, A2 y B1 se mantienen. Si una pestaña muy antigua intenta borrar campos nuevos, la escritura se rechaza: recarga la página.

Los borradores se guardan como texto dentro del progreso. No se guarda audio en Firebase. El reconocimiento puede enviar audio al proveedor del navegador; la grabación de autoescucha permanece temporalmente en la pestaña.

No se requiere una API de IA. El código no activa facturación. El alojamiento y Firebase tienen planes y límites propios; no se promete uso ilimitado gratuito.

## Ejecutar y publicar

Node 22 o superior:

```sh
npm ci
npm run build
npm test
npm run serve
```

`serve` necesita Python 3 y abre http://localhost:8085. La carpeta `public` ya incluye la compilación. Abrir `public/index.html` permite probar como invitado; Google y el micrófono requieren HTTPS o localhost y un navegador compatible.

En Netlify conectado a GitHub: comando **npm run build**, carpeta publicada **public**, directorio base **vacío**. No se ha publicado automáticamente en una cuenta externa.

## Archivos principales

- Contenido base: `src/course.json`, `src/course-a2.json`, `src/course-b1.json`.
- Talleres: `src/deep-course.json`, `src/study.js`, `src/study.css`, `src/study-memory.js`.
- Boca y mapa: `src/mouth-art.js`, `src/lab.js`, `src/lab.css`, `src/sounds.json`, `src/sound-coaching.js`.
- Generación reproducible del contenido ampliado: `python3 scripts/expand_course.py`. No hace falta ejecutarla para publicar; el contenido ya está incluido.
- Diccionario: `public/assets/pronunciation-us.js`, con licencia `CMUDICT_LICENSE.txt`.
- Verificación: `PRUEBAS.md`. Método y fuentes: `METODOS_Y_FUENTES.md`.
