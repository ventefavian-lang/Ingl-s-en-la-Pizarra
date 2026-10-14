# Hello English — A1, A2, B1 y B2 · Edición 8

**Proyecto completo y unificado.** Incluye A1, A2, B1, B2, imágenes, sonidos, ejercicios, código y la web ya compilada. No necesitas ningún ZIP anterior. Abre **EMPIEZA_AQUI.html** o sigue **[PUBLICAR_PASO_A_PASO.md](PUBLICAR_PASO_A_PASO.md)**.

## Enseñanza paso a paso · edición 8

Las **288 lecciones** enseñan una idea antes de evaluarla: entiende un modelo traducido, observa cómo funciona, construye con pistas, decide en dos casos y crea tu mensaje. Hay **288 traducciones principales revisadas y 288 tareas específicas**. Las explicaciones ampliadas se integran en la lección y los términos gramaticales tienen ayuda sencilla.

Las **48 escenas** comprueban ahora el mensaje con evidencia del diálogo y añaden 144 actividades para recuperar expresiones según su intención. La práctica permite corregir un error sin inflar la nota del primer intento. Se conservan los borradores, avances y errores pendientes anteriores.

Abre **[NOVEDADES_V8.md](NOVEDADES_V8.md)** para conocer los cambios y **[APRENDER_PASO_A_PASO.md](APRENDER_PASO_A_PASO.md)** para empezar a estudiar.

## La página empieza con historias

La pantalla inicial muestra **24 historias y 48 escenas de A1 a B2**, con personajes e ilustraciones originales. Cada escena sigue seis pasos: comprender el diálogo, explorar expresiones, responder en contexto, hablar, ensayar decisiones y crear una versión propia. Incluye 384 intervenciones bilingües, 144 expresiones explicadas y 96 opciones con respuesta del personaje.

Escucha con traducción, sin traducción o sin texto. Practica tu papel, graba tu voz, guarda borradores y vuelve a recuperar las expresiones con repasos espaciados. El historial registra esta práctica por separado de los ejercicios de gramática. Consulta **[CONVERSACIONES.md](CONVERSACIONES.md)**.

## Voces predeterminadas · edición 7

Diez personajes tienen voces distintas y fijas, generadas con un motor nuevo. **1.274 MP3 incluidos** cubren las conversaciones, los diálogos de las unidades, las historias cortas y la escucha de las nuevas evaluaciones. No hay selector de voces ni API de pago. Consulta **[VOCES.md](VOCES.md)** y **[NOVEDADES_V7.md](NOVEDADES_V7.md)**.

## Contenido

| Nivel | Unidades | Lecciones base | Talleres de seis etapas | Actividades del nuevo banco |
|---|---:|---:|---:|---:|
| A1 | 24 | 72 | 24 | 2.567 |
| A2 | 24 | 72 | 24 | 2.753 |
| B1 | 24 | 72 | 24 | 2.731 |
| B2 | 24 | 72 | 24 | 4.019 |

El banco ofrece modalidades distintas sobre vocabulario y estructuras del curso; su tamaño no cuenta conceptos nuevos ni repeticiones realizadas. Consulta el alcance y los temas B2 en **[TEMARIO_B2.md](TEMARIO_B2.md)**.

Las herramientas comunes incluyen rondas por habilidad, repaso espaciado y de errores, pruebas de comprensión lectora, textos completos con huecos, escritura y mediación con borradores, grabación local, historial y gráficas de actividad. Las lecciones siguen cinco pasos con apoyo gradual y una tarea propia antes de la práctica evaluada.

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
