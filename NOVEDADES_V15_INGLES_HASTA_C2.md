# Hello English V15 — ampliación de inglés hasta C2

## Qué incluye esta edición

La base A1–B2 de V14 se conserva, con sus 96 unidades, 288 misiones, Reading Academy de 48 artículos y 288 preguntas, ocho videolecciones y demás herramientas sin IA.

Se incorpora una nueva **Academia C1–C2**: 24 módulos originales (12 C1 + 12 C2). Cada módulo tiene una lectura original de aproximadamente 130–160 palabras, cuatro términos explicados, una explicación de lenguaje avanzado con ejemplo y errores frecuentes, un examen interactivo de cinco preguntas con justificaciones y tareas separadas de writing, speaking y mediación. Son 120 preguntas cerradas y 96 entradas de glosario contextualizado.

La academia incluye además un **Atlas C1–C2 con 64 temas** (32 por nivel) que explican aspectos de gramática, discurso, léxico, retórica, pragmática, investigación y comunicación; dispone de búsqueda, filtros y ejemplos. El texto puede leerse en voz alta mediante la síntesis de voz del navegador cuando está disponible.

## Cómo acceder

1. Iniciar sesión en una cuenta real de Firebase (configurada por el administrador).
2. Entrar en el nivel **B2** desde el selector superior.
3. Abrir **C1–C2 · Dominio** desde el menú, o los accesos C1 y C2 del selector.
4. Elegir una lectura o el Atlas, contestar su prueba y guardar los borradores.

Por compatibilidad con el almacenamiento original de progreso, los registros de C1–C2 se almacenan en el documento B2 de la misma cuenta, sin sobreescribir las misiones anteriores.

## Límites de esta edición

- No se incluye IA, evaluación automática de escritura libre, descarga de clases ni modo offline nuevo.
- Completar el banco de preguntas no significa obtener un certificado ni demostrar todo el nivel C2. La producción oral y escrita necesita corrección humana y práctica con contenido auténtico amplio.
- Esta edición añade una **primera ruta avanzada C1–C2**, no pretende abarcar literalmente todo el inglés existente ni sustituir estudios prolongados.
- Se requiere Firebase configurado para utilizar las cuentas. Publica las reglas `firestore.rules` actualizadas antes de sincronizar los nuevos campos.
- La síntesis de voz utiliza voces del dispositivo; no es un audio nativo grabado.

## Pruebas

El 18 de noviembre de 2026 se ejecutaron 81 comprobaciones: 77 pasaron. Cuatro archivos de pruebas no pudieron ejecutarse porque requieren el paquete `esbuild` no disponible en el entorno. Las seis pruebas específicas nuevas de C1–C2 pasaron. No se ha verificado una sesión real de Firebase ni una revisión visual completa en navegador.

## Instalación

- **ZIP completo:** incluye `src/` y los módulos, datos, estilos, pruebas y documentación editables.
- **ZIP para publicar:** contiene el contenido de `public/` que puede desplegarse en Netlify. No requiere ejecutar npm en el equipo del estudiante.
- Actualizar las reglas de Firebase en la consola, configurar `public/firebase-config.js` y realizar una prueba de acceso, guardado y sincronización antes de publicar al público.
