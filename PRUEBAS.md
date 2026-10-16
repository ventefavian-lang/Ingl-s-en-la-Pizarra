# Verificación de la edición 9

Comprobado el 15 de octubre de 2026 sobre este paquete:

- `npm run build` genera correctamente la web publicada en `public/`.
- **63 pruebas automáticas pasan**: contenido y claves de respuestas; relaciones entre lecciones y explicaciones; búsqueda; protección frente a HTML inyectado; audios; repaso; progreso, importación y sincronización; separación de cuentas; expresiones y evaluaciones.
- Los **61 temas** tienen escenas completas, traducciones, evidencia de comprensión, dos comprobaciones y ejemplos explicados. Los **288 enlaces de lección** apuntan a apartados existentes con ejemplos o tablas.
- Las **244 intervenciones** de las nuevas conversaciones tienen un MP3 del personaje correspondiente. Los 244 archivos usados por estas escenas se decodificaron con FFmpeg sin errores. El catálogo completo contiene 1.517 MP3.
- En pruebas de interfaz con **JSDOM** se generaron los 61 temas y las 288 guías. Se comprobaron búsqueda y filtros, traducción opcional, modo sin texto, respuestas con evidencia, borradores, autoevaluación y acceso a la práctica.
- Se comprobó la secuencia de audio y el ciclo de grabación con sustitutos de las API de audio y micrófono. Una autorización de micrófono que llega después de cambiar de página libera el dispositivo; escuchar un modelo cancela una grabación activa y restaura el botón.
- El paquete compilado se ejecutó en JSDOM para A1, A2, B1 y B2. Se recorrieron portada, manual, unidad, guía, progreso y laboratorio. La ayuda contextual mostró la traducción de una frase nueva, y las palabras desconocidas aparecieron con la clase de color correspondiente. No hubo errores de ejecución en ese recorrido.
- El ZIP se revisó mediante CRC y comprobación de presencia del catálogo de audio, la web compilada, el código y el manual.

## Qué falta verificar en un dispositivo real

JSDOM no es un navegador con renderizado visual. **Esta edición no se ha revisado visualmente en un navegador real en esta sesión**: quedan por comprobar el ajuste final en pantallas reales, la reproducción con los controles del navegador y el permiso de un micrófono real. Las pruebas de audio y micrófono simuladas no sustituyen esas comprobaciones.

No se probó un acceso real con Google porque falta la configuración Firebase del propietario. La estructura y las pruebas del guardado se conservan, pero para usar tu cuenta en la web debes configurar tu proyecto.

No se ha evaluado perceptualmente cada voz ni cada pronunciación. Las voces son sintéticas y las lecturas que no tienen MP3 utilizan las voces disponibles en el navegador. El dictado no proporciona una evaluación fonética. Las traducciones automáticas heredadas del diccionario siguen señaladas como orientativas.

## Reproducir las pruebas incluidas

Con Node 22 o posterior, desde la raíz del proyecto:

```sh
npm ci
npm run build
npm test
```

Para comprobar manualmente la web: `npm run serve`, abrir `http://localhost:8085`, recorrer **Entender el inglés**, una lección de cada nivel, las historias y el laboratorio. En la web publicada con HTTPS, probar micrófono y la cuenta de Google configurada. Los modelos de voz no se necesitan para publicar o ejecutar el curso.
