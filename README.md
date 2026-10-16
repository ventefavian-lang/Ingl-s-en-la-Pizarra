# Hello English — A1, A2, B1 y B2 · Edición 10

**Proyecto completo y unificado.** Incluye A1, A2, B1, B2, imágenes, sonidos, ejercicios, código y la web ya compilada. No necesitas ningún ZIP anterior. Abre **EMPIEZA_AQUI.html** o sigue **[PUBLICAR_PASO_A_PASO.md](PUBLICAR_PASO_A_PASO.md)**.

## Una ruta nueva · edición 10

La portada es ahora un camino de **8 capítulos, 24 temas y 72 misiones por nivel**. Tiene una interfaz nueva, ilustraciones originales, una navegación más sencilla y una pantalla de carga real. Conserva los cuatro niveles y sus materiales anteriores.

Cada misión presenta una situación, vocabulario y ejemplos antes de pedir una respuesta. Las actividades aparecen de una en una: elegir, escuchar, construir frases, comprender un texto y crear un mensaje propio. A1 empieza con saludos y nombres antes de desarrollar el verbo *be*. Los errores vuelven durante la sesión y quedan programados para otro día.

Completar una misión con al menos 70% en las primeras respuestas abre la siguiente y da 30 XP solo la primera vez. Los reintentos no inflan esa precisión. Los niveles se pueden elegir libremente; el recorrido dentro de cada nivel es progresivo. Tus lecciones ya completadas siguen reconocidas.

Consulta **[NOVEDADES_V10.md](NOVEDADES_V10.md)**. Todas las historias, el manual, los talleres, las evaluaciones, los sonidos, las tarjetas y las gráficas siguen accesibles desde la navegación y **Explorar**.

## Entender el inglés · edición 9

**61 temas, 190 apartados y 376 ejemplos explicados**, conectados con las 288 lecciones. La enseñanza empieza con conversaciones en inglés; traducciones, explicaciones y contrastes se abren cuando hacen falta. Las instrucciones genéricas se han reducido.

Hay **61 conversaciones nuevas con 244 intervenciones**, preguntas de comprensión con evidencia, modo de solo audio y práctica del papel del segundo personaje. Los ejemplos abren su significado y uso. La sección **Entender el inglés** permite buscar por tema o ejemplo y filtrar por punto de entrada.

Consulta **[NOVEDADES_V9.md](NOVEDADES_V9.md)** y **[APRENDER_PASO_A_PASO.md](APRENDER_PASO_A_PASO.md)**. La copia para leer e imprimir es **[MANUAL_INGLES_A1_B2.html](MANUAL_INGLES_A1_B2.html)**.

## Historias para practicar

La sección Historias reúne **24 historias y 48 escenas de A1 a B2**, con personajes e ilustraciones originales. Cada escena sigue seis pasos: comprender el diálogo, explorar expresiones, responder en contexto, hablar, ensayar decisiones y crear una versión propia. Incluye 384 intervenciones bilingües, 144 expresiones explicadas y 96 opciones con respuesta del personaje.

Escucha con traducción, sin traducción o sin texto. Practica tu papel, graba tu voz, guarda borradores y vuelve a recuperar las expresiones con repasos espaciados. El historial registra esta práctica por separado de los ejercicios de gramática. Consulta **[CONVERSACIONES.md](CONVERSACIONES.md)**.

## Voces predeterminadas

Diez personajes tienen voces sintéticas distintas y fijas, preparadas previamente. **1.822 MP3 incluidos** cubren las conversaciones, las nuevas conversaciones de apoyo, los diálogos de las unidades, las historias cortas y la escucha de las nuevas evaluaciones. No hay selector de voces ni API de pago. Consulta **[VOCES.md](VOCES.md)** y **[NOVEDADES_V7.md](NOVEDADES_V7.md)**.

## Contenido

| Nivel | Unidades | Lecciones base | Talleres de seis etapas | Actividades del nuevo banco |
|---|---:|---:|---:|---:|
| A1 | 24 | 72 | 24 | 2.567 |
| A2 | 24 | 72 | 24 | 2.753 |
| B1 | 24 | 72 | 24 | 2.731 |
| B2 | 24 | 72 | 24 | 4.019 |

El banco ofrece modalidades distintas sobre vocabulario y estructuras del curso; su tamaño no cuenta conceptos nuevos ni repeticiones realizadas. Consulta el alcance y los temas B2 en **[TEMARIO_B2.md](TEMARIO_B2.md)**.

Las herramientas comunes incluyen rondas por habilidad, repaso espaciado y de errores, pruebas de comprensión lectora, textos completos con huecos, escritura y mediación con borradores, grabación local, historial y gráficas de actividad. Las nuevas misiones presentan una actividad por pantalla; las guías anteriores se conservan como apoyo.

Al pasar el cursor, enfocar o tocar palabras de los textos aparece ayuda de traducción. Todas las palabras todavía sin marcar como recordadas aparecen en violeta. La ayuda incluye palabra, expresión, frase completa y notas de uso. Las traducciones automáticas adicionales se señalan como orientativas. Las pruebas mantienen ocultas las ayudas que revelarían respuestas.

El laboratorio ofrece 44 sonidos, contrastes, repetición, grabación temporal y dictado. Se retiró el diagrama de la boca. El porcentaje del dictado compara palabras reconocidas, no precisión fonética.

Las nuevas evaluaciones integran lectura, escucha y uso en contexto, con corrección por habilidad, evidencia y tareas libres de escritura y habla.

## Guardado y publicación

Se puede estudiar como invitado. Para cuentas, conserva tu Firebase y publica las reglas actualizadas. Configura también la exención de índices indicada en **PUBLICAR_PASO_A_PASO.md**. Si Google no estaba configurado, la guía original **CONFIGURAR_GOOGLE.md** explica su activación.

Los avances y borradores se guardan por nivel. El reconocimiento de voz depende del navegador y puede enviar audio a su proveedor; la grabación de autoescucha permanece en la pestaña y se puede descargar. No se guardan grabaciones en Firebase.

El proyecto no necesita una API de IA de pago. Las redacciones tienen modelos y autoevaluación, sin inventar una calificación automática. Los servicios de alojamiento y cuentas tienen sus propios límites; el código no activa facturación.

Con Node 22:

```sh
npm ci
npm test
npm run build
npm run serve
```

Abre `http://localhost:8085`. Netlify usa `npm run build` y publica `public`, según el archivo `netlify.toml` que ya existe en tu proyecto.

## Material y atribución

- [METODO_B2.md](METODO_B2.md): cómo trabajar el material y qué miden las actividades.
- [TEMARIO_B2.md](TEMARIO_B2.md): contenido detallado y alcance.
- [DICCIONARIO_LICENCIA.md](DICCIONARIO_LICENCIA.md): FreeDict/WikDict y la licencia CC BY-SA 3.0 de la adaptación del diccionario.
- `CMUDICT_LICENSE.txt`: licencia del diccionario de pronunciación ya incluido.
- `public/assets/phonemes/README.md`: origen de las muestras sintéticas.
- [VERIFICACION_B2.md](VERIFICACION_B2.md): comprobaciones y límites de la validación.

El contenido B2 original se puede editar en los JSON de `src` o regenerar desde los ocho archivos Python de `scripts/b2`, usando `python3 scripts/b2/build_content.py`. El generador solo utiliza la biblioteca estándar de Python.

Los nuevos temas originales se editan en `scripts/handbook/`. Ejecuta `python3 scripts/handbook/build.py` para regenerar el manual, los enlaces y el plan de audio. Si cambias una conversación, genera su MP3 antes de publicar; consulta **VOCES.md**.
