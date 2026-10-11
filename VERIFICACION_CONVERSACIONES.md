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
