# Hello English V14 — Estudio avanzado (sin IA ni modo de descarga)

Esta edición parte del **ZIP completo V13 Reading Academy**, conserva los cursos A1, A2, B1 y B2, sus 288 misiones, las 48 lecturas originales y los audios ya incluidos.

## Ocho ampliaciones activas

1. **Clínica de pronunciación (#pronunciation)**: 12 contrastes y ejercicios de escucha. Permite reproducir ambos sonidos, registrar la práctica y continuar en el laboratorio de voz con el micrófono. La reproducción y el dictado automático no sustituyen una evaluación fonética profesional.
2. **Diagnóstico inicial (#placement)**: 20 preguntas de selección provenientes de las unidades originales (5 por nivel), un resultado guardado por nivel y una recomendación orientativa A1–B2. No concede certificación oficial.
3. **Plan de estudio (#plan)**: decide qué repasar a partir de las misiones incompletas, fechas de memoria espaciada, lecturas difíciles, videos pendientes y proyectos.
4. **Aventuras interactivas (#adventures)**: 8 historias originales, 2 por nivel, con dos puntos de decisión y cuatro finales distintos por historia. Los finales descubiertos quedan guardados.
5. **Diccionario personal (#phrasebook)**: frases personalizadas con significado y ejemplo, tarjetas con repaso espaciado y propuestas del vocabulario real de cada nivel. Máximo 180 expresiones por nivel para respetar la capacidad de sincronización.
6. **Video Listening (#video)**: 8 archivos MP4 originales, 2 por nivel. Sus grabaciones proceden de los diálogos ya incluidos en Hello English; la parte visual se produjo especialmente para V14. Hay subtítulos opcionales, transcripción interactiva, repetición de frases y comprobaciones de escucha.
7. **Mapa de habilidades (#skills-map)**: recopila evidencias diferenciadas de Reading, Listening, Speaking, Writing, gramática y misiones. No transforma estas métricas en falsos porcentajes de dominio.
8. **Proyectos finales (#portfolio)**: 3 proyectos por nivel, 12 en total, con borrador, revisión por criterios, versión revisada y estado guardado. No se evalúan automáticamente con IA.

## Funciones que NO se añadieron

- Profesor personal con IA, conversaciones libres con IA y corrector inteligente de escritura (ideas 1, 2 y 5).
- PWA instalable, paquetes descargables ni modo de uso offline (idea 12). Las copias de progreso que ya existían siguen disponibles para no romper funciones anteriores.

## Cómo utilizar la edición

Después de configurar Firebase y entrar con tu cuenta, abre **Estudio avanzado** desde el menú. También están disponibles **Mi plan** y los accesos adicionales de **Más herramientas**. Cambia entre A1, A2, B1 y B2 desde el selector superior. El progreso de cada nivel se guarda por separado dentro de la misma cuenta.

### Configurar la sincronización

1. Configura la aplicación Firebase en `public/firebase-config.js` según `CONFIGURAR_ACCESO_V12.md`.
2. Activa los métodos de inicio de sesión que utilizarás en Firebase Authentication.
3. **Publica las reglas actualizadas** de `firestore.rules`; las reglas V13 bloquearían el guardado de los campos nuevos de V14.
4. Comprueba dos cuentas distintas y dos dispositivos con tus credenciales reales antes de abrir registros públicos.
5. Si Netlify compila desde el repositorio, usa `npm ci && npm run build`; si vas a subir el paquete estático, usa el ZIP listo para publicar.

## Archivos nuevos/modificados

- `src/v14-studio.js`: lógica, interfaz y eventos de las nuevas secciones.
- `src/v14-data.js`: historias, pronunciación y propuestas de proyectos.
- `src/v14-videos.json`: índice y tiempos de los videos.
- `src/v14.css`: diseño responsive.
- `public/assets/v14-video/*.mp4`: 8 videos originales.
- `src/progress.js` y `firestore.rules`: limpieza, fusión y acceso a los nuevos datos.
- `src/main.js`, `src/journey-ui.js` y los cuatro motores `src/course-engine*.js`: navegación y conexión.
- `src/auth-gate.js`: detalles de la bienvenida.
- `tests/v14-studio.test.js`: pruebas del contenido e integración.

## Verificación de esta copia

- 71 pruebas detectadas; **67 pasaron**.
- Las 4 pruebas restantes no pudieron ejecutarse, porque importan la dependencia de desarrollo `esbuild`, no instalada en este entorno. Esas cuatro tampoco podían ejecutarse en la copia V13 de partida; no se presentan como éxitos.
- Los 8 MP4 fueron generados y se pudo leer su duración con FFprobe.
- La comprobación visual automatizada en Chromium **no pudo completarse** porque el entorno bloquea la navegación local (`ERR_BLOCKED_BY_ADMINISTRATOR`). No debe considerarse realizada.
- Falta confirmar el funcionamiento con Firebase real y probar visualmente en dispositivos antes de una publicación definitiva.
