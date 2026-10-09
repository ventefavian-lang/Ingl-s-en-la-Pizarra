# Verificación de la actualización B2

Comprobado el 9 de octubre de 2026.

- Compilación de producción con esbuild completada.
- 31 pruebas de contenido, saneamiento de importaciones, fusión de progreso, aislamiento entre cuentas/niveles, recuperaciones diferidas y archivos de audio: aprobadas (`npm test`).
- 276 vistas y recorridos de interfaz comprobados en A1, A2, B1 y B2, incluidas las seis etapas de los 24 talleres B2; 54 respuestas verificadas a través de los controles de práctica/lectura.
- Probados borradores, revisión guiada, vuelta a un borrador, huecos incorrectos que aparecen en repaso, historial, 44 fichas de sonidos y la traducción sin cambio de ruta.
- Chromium: ayuda de traducción desde el diccionario local, reproducción de un WAV, recorrido automático de sonidos, persistencia de ocultar la boca y presentación a 390 y 1.440 píxeles de ancho. Revisadas las capturas del entrenamiento y del laboratorio.
- Firestore Emulator: 41 comprobaciones de reglas, incluidas lectura/escritura del propietario en B2, rechazo de otros usuarios y visitantes, campos nuevos, límites de historial y protección frente a clientes antiguos que eliminen campos.

No se inició sesión con una cuenta Google real del propietario ni se publicó en su GitHub, Netlify o Firebase: sus credenciales/configuración no estaban disponibles. Las pruebas de cuenta usaron un servicio simulado y las de reglas, un emulador. El micrófono físico, la precisión del reconocimiento y las voces particulares de cada dispositivo deben comprobarse desde la página publicada. Las muestras aisladas son sintéticas, no una validación fonética por especialistas.

Este paquete completo reúne la edición 4 y la actualización B2 ya verificada. No requiere archivos anteriores. Incluye una configuración Firebase vacía para empezar como invitado; si ya usabas Google, conserva tu configuración real. El código de ejecución es idéntico al de la actualización probada.
