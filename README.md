# Hello English — A1, A2, B1 y B2 · Edición 5

**Proyecto completo y unificado.** Incluye A1, A2, B1, B2, imágenes, sonidos, ejercicios, código y la web ya compilada. No necesitas ningún ZIP anterior. Abre **EMPIEZA_AQUI.html** o sigue **[PUBLICAR_PASO_A_PASO.md](PUBLICAR_PASO_A_PASO.md)**.

## Contenido

| Nivel | Unidades | Lecciones base | Talleres de seis etapas | Actividades del nuevo banco |
|---|---:|---:|---:|---:|
| A1 | 24 | 72 | 24 | 2.567 |
| A2 | 24 | 72 | 24 | 2.753 |
| B1 | 24 | 72 | 24 | 2.731 |
| B2 | 24 | 72 | 24 | 4.019 |

El banco ofrece modalidades distintas sobre vocabulario y estructuras del curso; su tamaño no cuenta conceptos nuevos ni repeticiones realizadas. Consulta el alcance y los temas B2 en **[TEMARIO_B2.md](TEMARIO_B2.md)**.

Las herramientas comunes incluyen rondas por habilidad, repaso espaciado y de errores, pruebas de comprensión lectora, textos completos con huecos, escritura y mediación con borradores, grabación local, historial y gráficas de actividad. Las lecciones incorporan contexto antes de la explicación y tareas de transferencia después.

Al pasar el cursor, enfocar o tocar palabras de los textos aparece ayuda de traducción. El vocabulario aún no marcado como recordado aparece en violeta. Las pruebas mantienen ocultas las ayudas que revelarían respuestas.

El laboratorio conserva el mapa articulatorio, las vistas frontal y lateral, el diccionario de pronunciación y la comparación de transcripción. Añade muestras sintéticas incluidas para las 44 fichas, recorridos automáticos animados y un botón para ocultar el diagrama. El porcentaje compara palabras reconocidas, no precisión fonética. Las posiciones del dibujo son aproximadas.

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
