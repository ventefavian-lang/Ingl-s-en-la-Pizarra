# Verificación de voces predeterminadas · edición 6.2

Comprobaciones de esta actualización:

- Compilación con `npm run build` y 47 pruebas de Node aprobadas.
- Cobertura de las 48 escenas: cada intervención, ejemplo y respuesta alternativa tiene su grabación y papel asignados.
- Cobertura de las 576 intervenciones de los diálogos de las unidades anteriores.
- Los 1.191 archivos MP3 incluidos se decodificaron con FFmpeg sin errores; ocupan 30.721.371 bytes antes de empaquetar.
- Pruebas de reproducción sin catálogo de voces del navegador, cambio de velocidad conservando el tono, reutilización del reproductor, detención, sustitución de una reproducción por otra y cancelación al navegar.
- Un error de archivo o una reproducción cancelada no devuelve una escucha completada. La reproducción de las escenas no recurre a una voz distinta cuando falla un archivo.
- Chromium con audio MP3 real y sin SpeechSynthesis: ocho intervenciones consecutivas, cuatro niveles, pausa/cancelación, error de descarga y reintento. Comprobación de diseño a 1440 y 390 píxeles sin desbordamiento horizontal.
- Los datos de progreso y las reglas de Firebase conservan el esquema de la edición 6.

Los audios de las conversaciones son síntesis neural incluida en el paquete. Los textos fuera de ese catálogo siguen utilizando lectura automática del navegador. La comprobación técnica no acredita que cada pronunciación o entonación sea perfecta. El reconocimiento de voz y una conexión real al Firebase del usuario requieren su dispositivo y configuración.

## Registro de ediciones anteriores

La edición 6.2 sustituye el selector de voces de la edición 6.1 por el reparto fijo y los MP3 descritos en VOCES.md. El siguiente registro documenta las verificaciones anteriores del contenido y guardado.

# Verificación de la edición 6

Comprobaciones realizadas el 11 de octubre de 2026 sobre el proyecto completo.

- Compilación estática con `npm run build`.
- 36 pruebas de Node: contenido, limpieza y límites de importación, progreso independiente por nivel, combinación de dispositivos, aislamiento de cuentas, reintentos de sincronización, reinicio, repaso espaciado y comparación de transcripciones.
- 404 vistas e interacciones en DOM: las 48 escenas con sus seis pasos y pantalla de repaso, además de rutas conservadas en A1, A2, B1 y B2. Se completó una escena de principio a fin en cada nivel, incluyendo un error y su reintento, las cuatro respuestas, práctica oral, ambos caminos, creación, guardado y repaso.
- Navegador Chromium a 1440 px y 390 px: portada, escenas, traducción al pasar el cursor sin navegar, ocultación de texto, borrador conservado al recargar y ausencia de desbordamiento horizontal en las vistas comprobadas.
- MediaRecorder con un micrófono sintético de prueba: grabación, reproducción local disponible, conservación de la toma al abrir el modelo y retirada al cambiar de turno.
- Laboratorio conservado: 44 fichas de sonidos y reproducción de una muestra incluida.
- 44 comprobaciones con Firestore Emulator: lectura y escritura del propietario, acceso ajeno y anónimo rechazado, límites de estructura, revisión y reinicio, compatibilidad de campos anteriores y persistencia del nuevo mapa `conversations`.

Las pruebas de audio del diálogo usan una voz simulada en DOM para verificar el recorrido y la cancelación. La disponibilidad y calidad de voces reales dependen del navegador y sistema del estudiante. No se verificó un reconocimiento remoto real ni un inicio de sesión contra un proyecto Firebase del usuario, porque no se han proporcionado sus credenciales o configuración. La configuración pública incluida es una plantilla.

El contenido se ha revisado como material de práctica original. Estas comprobaciones no son una certificación pedagógica, una validación de resultados de aprendizaje ni una garantía de que completar las pantallas acredite A1, A2, B1 o B2. Los relatos complementan las unidades y talleres del paquete.

Los guiones y las opciones son preescritos. Las respuestas libres se comparan con apoyos y se autoevalúan; no se promete corrección de IA. Las variantes del paso «Decide» no modifican los episodios posteriores.

Para repetir las pruebas incluidas:

```sh
npm ci
npm test
npm run build
```

Las comprobaciones de navegador y del emulador se realizaron durante la preparación del paquete; sus dependencias de QA no forman parte de la web entregada.

## Edición 6.1: reparto de voces

- 42 pruebas de Node aprobadas. Las seis nuevas cubren reparto de cuatro voces, mezcla de acentos cuando faltan voces de uno solo, estabilidad de identidad al cambiar el orden de los turnos, elección manual, voces ausentes y catálogos duplicados.
- Verificación DOM con catálogo simulado: carga tardía mediante `voiceschanged`, cuatro objetos de voz distintos, elección y persistencia, ocho intervenciones con sus voces, cambio de posición del personaje, narrador, diálogos anteriores y cancelación al cambiar de pantalla o probar otra voz.
- Chromium con catálogo simulado: selector en computadora y móvil, preferencia conservada al recargar y uso de la misma elección en A1, A2, B1 y B2.

Estas pruebas verifican la selección y el recorrido de reproducción. No evalúan de oído la naturalidad de voces instaladas en otros equipos. El navegador del estudiante determina qué voces reales ofrece. No se han añadido grabaciones humanas ni voces de pago. Las reglas de Firebase y los datos de aprendizaje conservan el esquema de la edición 6.
