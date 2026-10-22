# Verificación · Edición 11

Fecha: 20 de octubre de 2026.

- `npm run build`: construcción correcta con el código final y actualización de traducciones contextuales.
- `npm test`: 73 pruebas superadas. Incluyen contenido, respuestas y variantes, datos de progreso, separación de cuentas, sincronización simulada, memoria espaciada, audios, conversaciones y rutas progresivas.
- Auditoría de las 288 misiones: 5.747 actividades corregibles. Todas tienen recuperación escrita, dictado, ayuda de vocabulario, modelos y una tarea personal con mínimo de palabras. Los textos con huecos conservan las posiciones y soluciones del original.
- Las opciones incorrectas no se aceptan por una normalización demasiado permisiva. Por ejemplo, «Yes, I'm.» no equivale a «Yes, I am.» en una respuesta breve final.
- Los 99 verbos y 25 guías generan 546 actividades de Recursos, con identificadores distintos y compatibles con el progreso existente. Las variantes británicas y americanas indicadas se aceptan.
- Pruebas DOM con JSDOM (1413 comprobaciones): navegación de 13 apartados en cada nivel, tabla y búsqueda de verbos, inicio y salida de práctica en la misma ruta, ejercicios de guía y una misión completa por nivel. También se verifican respuestas vacías, dictado, parejas, huecos, borrador propio, nota, guardado y gráfica de 14 días.
- Una respuesta incorrecta seguida de un reintento correcto mantiene el resultado inicial de 5/6 (83 %) en la guía probada. No se convierte en 100 %.
- Una misma misión no se duplica en el historial por escribir simultáneamente su resultado y su registro de estudio.
- Los 1.822 MP3 declarados existen. Se conservan las pruebas de reproducción, cancelación, velocidad y reparto fijo mediante sustitutos de la API de audio.
- ZIP completo comprobado con CRC y presencia de audios declarados, código fuente, compilación, configuración, imágenes y documentación.

## Límites de verificación

JSDOM comprueba estructura y comportamiento, pero no dibuja la página. **No se ha hecho revisión visual en un navegador real en esta sesión.** Los estilos incluyen puntos de adaptación para móvil y escritorio, pero requieren una comprobación visual final en dispositivos reales.

No se probó un micrófono físico ni un acceso real con Google. Firebase requiere la configuración del propietario; el ZIP deja esa plantilla vacía. Las pruebas de cuentas usan adaptadores de prueba.

No se evaluó perceptualmente cada audio. Las voces son sintéticas y las frases sin archivo incluido dependen del navegador. La nota de reconocimiento de voz compara palabras reconocidas, no precisión fonética. La escritura personal se guarda sin calificación automática.

Las actividades practicadas, el porcentaje de aciertos y los XP no certifican por sí solos un nivel del MCER. Las claves de respuestas cerradas no abarcan todas las paráfrasis posibles.
