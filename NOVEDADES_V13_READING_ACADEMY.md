# Hello English V13 · Reading Academy

## Qué se añadió

Esta entrega amplía el rediseño V12, **sin añadir inteligencia artificial** y sin eliminar el curso original. Conserva las 96 unidades, 288 misiones, audios, recursos, cuentas y opciones de progreso de V12.

### Biblioteca nueva de comprensión lectora

- **48 lecturas originales en inglés:** 12 A1, 12 A2, 12 B1 y 12 B2.
- **288 preguntas nuevas**, seis por lectura, con respuestas y explicaciones redactadas para cada ejercicio.
- Tipos de textos: artículos informativos, reportajes, avisos, entrevistas, guías, informes, explicaciones y análisis breves.
- Temas: naturaleza, ciencia, transporte, cultura, historia, tecnología, salud, medio ambiente, accesibilidad y pensamiento crítico, entre otros.
- Actividades de búsqueda de datos específicos, idea principal, vocabulario contextual y afirmaciones True / False / Not Given.
- Lectura y examen en una misma experiencia: se puede consultar el artículo mientras se responde.
- Resultado final, explicación por pregunta, revisión de errores, repetición y avance a la siguiente lectura.
- Glosario bilingüe de tres entradas por lectura y una propuesta original de escritura personal.
- **Borradores de writing guardados**, sin pretender que exista una corrección automática de texto libre.
- Cuatro estrategias graduadas de lectura por nivel, filtros por tipo de texto y búsqueda.
- La sección **Mi progreso** muestra ahora las lecturas superadas e intentadas, y **Mis repasos** permite recuperar lecturas difíciles.

Cada lectura es un texto de práctica **no oficial**, no una prueba de certificación MCER/CEFR. Las longitudes son deliberadamente breves y progresivas para complementar las misiones existentes. El proyecto no incorpora textos, preguntas ni recursos copiados del sitio que se utilizó como inspiración: https://englishpracticetest.net/.

## Cómo usarlo

1. Configura las cuentas de Firebase según `CONFIGURAR_ACCESO_V12.md`. Esta versión sigue exigiendo iniciar sesión para utilizar el curso.
2. En el menú lateral de la app, pulsa **Reading Academy**. En teléfonos está disponible también desde **Explorar**.
3. Elige tu nivel A1–B2, busca una lectura, lee el texto y consulta el glosario.
4. Pulsa **Comenzar examen de lectura**, responde las seis preguntas y revisa la explicación.
5. Regresa al artículo para guardar tu borrador de escritura. Consulta **Mis repasos** o **Mi progreso** para continuar.

## Publicación

**Versión lista para publicar:** el contenido del ZIP `Hello_English_V13_Listo_Para_Publicar.zip` corresponde a la carpeta `public/`. Extrae el contenido y publícalo en Netlify. Mantén el `firebase-config.js` que corresponda a tu proyecto, si ya lo configuraste.

**Proyecto completo:** `Hello_English_V13_Reading_Academy_Completo.zip`. Incluye `src/`, `scripts/`, `public/`, reglas de Firestore y pruebas. Si lo usas en un repositorio conectado a Netlify, aplica el código fuente y sigue el procedimiento de `PUBLICAR_PASO_A_PASO.md`.

**IMPORTANTE:** los nuevos campos `readings` y `readingNotes` requieren publicar también el contenido actualizado de `firestore.rules` en Firebase. Publicar un ZIP web en Netlify **no** actualiza automáticamente las reglas de Firestore. Sin ese cambio, puede fallar la sincronización de resultados y borradores con la nube. No borres ni reemplaces datos reales de estudiantes: realiza respaldo antes de cambiar reglas o migrar cuentas.

## Actualización y mantenimiento del contenido

- Fuente de la biblioteca: `scripts/build-reading-library.py` (textos y respuestas originales).
- Archivo generado con preguntas y metadatos: `src/reading-library.json`.
- Interfaz de lectura: `src/reading-academy.js` y `src/reading-academy.css`.
- Para regenerar contenidos: `python3 scripts/build-reading-library.py` y luego `node scripts/build-standalone.mjs`.
- Las 48 lecturas usan identificadores estables `a1-01` a `b2-12`. Si se modifica una pregunta ya publicada, hay que considerar cómo conservar la validez del progreso histórico.

## Comprobaciones efectuadas

- 27/27 pruebas focalizadas de Reading Academy, progreso y V12 pasaron.
- El conjunto general devolvió 61 pruebas aprobadas y 4 que no pudieron ejecutarse debido a la falta de `esbuild` en este entorno, **sin confirmar regresiones**.
- Se generó correctamente el paquete `public/v12mod/` (53 módulos y 13 estilos), con las fuentes y contenidos nuevos.
- Vista estática del catálogo comprobada en Chromium a anchos de escritorio (1366 px) y celular (390 px): 12 tarjetas visibles por nivel y sin desplazamiento horizontal accidental en esas vistas.
- No se probó una sesión completa contra Firebase real ni una publicación real de Netlify. La vista previa del sitio completo en navegador fue bloqueada por este entorno; las comprobaciones visuales citadas se hicieron sobre el componente renderizado en una página estática de prueba.

## Lo que todavía no se incluye

- Corrección de escritura libre mediante IA, profesor IA o conversación inteligente.
- Examen oficial Cambridge, IELTS, TOEFL o certificado de nivel.
- Grabaciones nuevas de las 48 lecturas; puedes seguir practicando con el audio original de las misiones y las voces disponibles en el navegador donde corresponda.
