# Hello English · Edición 11

Curso interactivo para practicar inglés A1, A2, B1 y B2. Este ZIP contiene el proyecto completo para GitHub y Netlify, los archivos compilados y los audios. Empieza por **EMPIEZA_AQUI.html** o **LEEME_PRIMERO.txt**.

## Qué cambia

- Nueva interfaz violeta: menú lateral, capítulos y tarjetas de misiones; navegación inferior en móvil.
- 96 unidades y 288 misiones progresivas. La ruta incluye 5.747 actividades corregibles: 2.647 elecciones, 1.142 frases para ordenar, 1.006 respuestas escritas, 576 dictados, 282 ejercicios de parejas y 94 textos con huecos. Son actividades de práctica, no 5.747 temas diferentes.
- Una misión alterna escena, palabras, modelos, comprensión, recuperación y uso propio. No se puede comprobar una respuesta vacía. La última tarea necesita un mínimo de palabras.
- Recursos reúne el vocabulario por unidad, las 288 explicaciones del curso, una tabla de 99 verbos y 25 guías de auxiliares y estructuras. Las guías tienen ejemplos, contrastes y seis actividades cada una; los verbos tienen cuatro.
- Palabras nuevas en morado, ayuda al pasar el cursor o tocar, traducción de la frase cuando está incluida y explicación de uso. Los nuevos ejemplos de Recursos tienen traducciones originales incorporadas.
- Las respuestas correctas registran palabras practicadas. También puedes marcar una palabra como conocida o volver a repasarla. Esa marca no equivale por sí sola a dominarla.
- Panel con actividad de 14 días, memoria, errores y sesiones recientes. Usa tus datos reales.

Se conservan las historias, talleres, evaluaciones, sonidos, biblioteca y progreso compatible de las versiones anteriores. La boca animada sigue retirada.

## Publicar o actualizar

1. Extrae el ZIP.
2. Abre la carpeta de tu repositorio con GitHub Desktop.
3. Conserva **tu `public/firebase-config.js`** si Google ya estaba configurado.
4. Copia el contenido extraído en la raíz del repositorio. Deben quedar allí `package.json`, `netlify.toml`, `src/` y `public/`.
5. Restaura tu configuración pública Firebase. Revisa los cambios, haz Commit y Push origin.
6. Netlify debe usar `npm run build` y publicar `public`. `netlify.toml` ya lo declara, con Node 22.
7. Espera un despliegue correcto y comprueba **EDICIÓN 11** al pie de la página.

Un repositorio conectado despliega los cambios enviados a la rama configurada mientras la construcción y publicación automáticas estén activas. No subas el ZIP sin extraer como sustituto del código. La versión compilada en `public/` también permite un despliegue manual de esa carpeta.

Guía detallada: **PUBLICAR_PASO_A_PASO.md**. Google y sincronización: **CONFIGURAR_GOOGLE.md**. Un push a GitHub no publica las reglas de Firestore: sigue esa guía si las necesitas actualizar.

## Trabajar en tu equipo

Con Node 22 o superior:

```sh
npm ci
npm run build
npm test
npm run serve
```

El último comando usa Python y sirve `public/` en `http://localhost:8085`. El código está en `src/`; el proceso de construcción genera `public/build/app.js` y `app.css`. No edites solo esos archivos compilados: una construcción los reemplaza.

La configuración Firebase de esta entrega está vacía. El modo invitado guarda en el navegador. El inicio de sesión Google y la sincronización requieren configurar el proyecto del propietario; no se han probado contra una cuenta real en esta entrega.

## Progreso, corrección y memoria

Una misión aprobada con al menos 70 % de las primeras respuestas abre el siguiente paso. Los errores vuelven a practicarse sin inflar esa primera nota. Una misión concede 30 XP una sola vez. Recursos practica y registra respuestas sin desbloquear misiones ni conceder XP extra.

La memoria programa revisiones a 1, 3, 7, 14 y 30 días según los aciertos cuando ya toca repasar. Los errores se programan antes; repetir pronto no avanza artificialmente el intervalo. Se conservan los campos de progreso y las claves de lecciones de versiones anteriores. Las nuevas preguntas usan identificadores distintos para no heredar una respuesta de otra pregunta.

El mensaje personal se guarda y se puede comparar con un modelo. No hay un corrector de gramática de texto libre ni un tutor de IA. Las respuestas cerradas usan claves y variantes explícitas; no interpretan todas las paráfrasis posibles. Una nota de reconocimiento de voz mide coincidencia del texto reconocido, no precisión fonética.

## Voz y límites

Hay 1.822 MP3 incluidos, con diez voces sintéticas fijas de personajes. Son voces generadas previamente, no actores humanos. No requieren una API de pago en el sitio. Los textos sin grabación, incluidas algunas palabras y ejemplos, usan las voces instaladas en el navegador. La calidad y disponibilidad de esas voces dependen del dispositivo. El texto sigue accesible si la voz falla.

Completar las actividades no certifica un nivel del MCER. La práctica real, la comprensión de material nuevo y la retroalimentación externa siguen siendo importantes.

## Comprobaciones de esta edición

Consulta **PRUEBAS.md**. Se verificaron construcción, contenido, progreso, memoria, variantes de respuestas, navegación y flujos de las cuatro rutas. No hubo revisión visual en navegador real, pruebas de micrófono físico ni acceso real con Google en esta sesión.

## Archivos útiles

- `NOVEDADES_V11.md`: cambios de esta entrega.
- `METODOS_Y_FUENTES.md`: diseño de aprendizaje y referencias.
- `VOCES.md`: reparto, generación y licencias de audio.
- `TEMARIO_A2.md`, `TEMARIO_B1.md`, `TEMARIO_B2.md`: contenido por nivel.
- `MANUAL_INGLES_A1_B2.html`: copia de consulta del manual.
- `tests/`: pruebas automatizadas reproducibles con `npm test`.

Las notas `NOVEDADES_V7.md` a `NOVEDADES_V10.md` se conservan como historial.
