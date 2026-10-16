# Verificación de la edición 10

Comprobaciones del 16 de octubre de 2026:

- Construcción con `npm run build` y 68 pruebas automatizadas: contenido, claves de respuesta, audio, cuentas, separación de usuarios, importación, sincronización, memoria y la nueva ruta.
- Las 288 misiones tienen modelos antes de la evaluación, respuestas válidas, una tarea propia al final y recuperación de una idea anterior desde la segunda misión.
- La ruta abre el primer paso pendiente y conserva misiones completadas en versiones anteriores. Las pruebas verifican el umbral del 70%, la concesión de XP una sola vez y que un intento fallido no abra la siguiente misión.
- Los datos nuevos se guardan en los campos existentes de progreso. Las respuestas programan repaso sin marcar automáticamente una lección como completada.
- Pruebas DOM con JSDOM en A1, A2, B1 y B2: 148 comprobaciones de navegación, bloqueos, actividad por pantalla, una misión completa, resultado, borrador, puntos y desbloqueo. Recorrido de 12 apartados en cada nivel.
- Una prueba adicional completa una misión con un error, lo recupera al final, comprueba que la nota siga siendo 83% y que la memoria guarde ambos intentos. También abre y cierra la ayuda con Escape.
- El catálogo completo contiene 1.822 archivos MP3 presentes. Se comprueba la decodificación de los 305 nuevos audios con FFmpeg.
- El ZIP se valida con CRC y presencia de código, compilación, ilustraciones, manual, sonidos, configuración y audios.

## Límites de estas comprobaciones

JSDOM verifica estructura y comportamiento; no dibuja la página. **No se ha hecho una revisión visual en navegador real en esta sesión**. Quedan por comprobar el ajuste visual final, la reproducción y los permisos de micrófono en dispositivos reales. Los sustitutos de las API de audio utilizados en las pruebas no prueban un micrófono físico.

Google requiere la configuración Firebase del propietario. No se inició sesión con una cuenta real; las pruebas de guardado y separación de cuentas se conservan. El ZIP deja la configuración pública vacía para que conserves la tuya.

No se ha evaluado perceptualmente cada pronunciación. Las voces son sintéticas. El porcentaje de dictado compara palabras reconocidas, no precisión fonética. La escritura libre se guarda y ofrece un modelo; no recibe una calificación gramatical automática. Las traducciones heredadas que son orientativas mantienen esa indicación.

Para ejecutar las pruebas: `npm ci`, `npm run build`, `npm test`, usando Node 22 o posterior.
