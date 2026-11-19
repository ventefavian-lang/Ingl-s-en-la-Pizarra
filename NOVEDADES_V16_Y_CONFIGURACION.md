# Hello English V16 — entrega y configuración

## Funciones incluidas
- Estudiantes y panel administrativo con permiso `admin: true` asignado desde Firebase Admin SDK.
- Ranking por país y global, con actualización en tiempo real mediante Firestore, alias y participación voluntaria.
- Perfil de fortalezas y recomendaciones sin IA basado en evidencias de actividades.
- Examen de nivel en navegación.
- Lectura con ayudas contextuales por clic, análisis de frases y reproducción de voz estadounidense y británica cuando el dispositivo ofrece esas voces.
- Conservación de materiales A1–C2.

## Cómo activar
1. Configura Firebase Authentication y Firestore.
2. Rellena `firebase-config.js` con la configuración web pública de tu proyecto (no contraseñas).
3. Publica las reglas `firestore.rules` y los índices `firestore.indexes.json` del proyecto completo.
4. Asigna permisos admin usando un entorno confiable con Firebase Admin SDK; no existe una contraseña maestra `admin123`.
5. Publica el contenido de `public/` en Netlify y prueba con dos cuentas.

## Límites conocidos
- El ranking muestra hasta 50 perfiles por consulta, no una clasificación mundial exhaustiva.
- Los XP se cotejan con Firestore, pero las actividades aún no tienen verificación segura en servidor. No usar para premios oficiales.
- El panel admin muestra resúmenes, no crea ni elimina cuentas desde la web.
- Las voces US/UK dependen del navegador.
- No se incluye IA ni modo offline.
- 83 de 87 pruebas pasaron; cuatro fallaron por ausencia de `esbuild` en este entorno.
- Falta probar Firebase real y la publicación en navegador.
