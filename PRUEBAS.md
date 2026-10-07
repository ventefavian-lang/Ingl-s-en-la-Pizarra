# Verificación de la edición 4

- Compilación de producción correcta.
- 24 pruebas portátiles incluidas en `npm test`: progreso, cuentas, migraciones, trabajo sin conexión, separación de niveles, borradores de talleres, fusiones entre dispositivos, límites de importación y calendario de repasos.
- 432 vistas de talleres ejecutadas: seis etapas de las 24 unidades de cada nivel. Sin contenido `undefined` ni errores de ejecución en esa comprobación.
- Doce rondas completas de talleres comprobadas con respuestas correctas: las cuatro modalidades en cada nivel. Se verificaron puntuación, borradores, autoevaluación y persistencia.
- Lecciones anteriores comprobadas en A1, A2 y B1: vistas, finalización de una lección, escritura, vocabulario y exámenes.
- Laboratorio comprobado en los tres niveles: 44 sonidos, secuencias, variantes, palabras desconocidas, controles, historias y comparación de transcripción simulada.
- Mapa, selector de referencia, vistas de boca, capas, detalles y cambios de posición comprobados. Se corrigió el redondeamiento final de /ɔɪ/ y la liberación de oclusivas.
- Revisión visual en Chromium de escritorio y móvil; once rutas móviles sin desbordamiento horizontal. Se ajustó el menú inferior para evitar superposición de sus opciones.
- 28 comprobaciones de acceso y estructura ejecutadas con el emulador real de Firestore: propietario, otras cuentas, anónimos, niveles, revisiones, límites de talleres y borradores. Después se añadió una protección revisada en código para impedir que un cliente anterior elimine los campos nuevos; ese caso adicional no se volvió a ejecutar en el emulador.
- Integridad del ZIP y presencia de archivos de publicación comprobadas.

Las pruebas de interfaz y emulador se ejecutaron durante el desarrollo. El ZIP incluye las pruebas portátiles; no necesitas las herramientas de QA para publicar.

## Alcance de lo verificado

No se ha iniciado sesión con tu Google porque la configuración de tu Firebase no está disponible. No se ha probado un micrófono físico ni se han escuchado todas las voces de los dispositivos. Después de publicar, comprueba acceso, permiso de micrófono, reproducción y sincronización desde otro dispositivo.

La puntuación de voz mide coincidencia de palabras transcritas, no precisión fonética. Las respuestas libres utilizan autoevaluación y modelos; no reciben una nota automática de gramática. El dibujo es didáctico y aproximado, sin alineación exacta con el audio sintético.
