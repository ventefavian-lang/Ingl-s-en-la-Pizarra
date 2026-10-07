> Actualización A1 + A2 + B1: utiliza el mismo proyecto Firebase. Conserva tu configuración web y publica las reglas nuevas de este ZIP, que permiten los tres niveles y los campos de talleres y borradores. No borres los documentos de A1.

# Activar Google y guardar progreso

Solo tú, como propietaria de la página, haces esta configuración. Tus alumnos únicamente pulsarán «Continuar con Google»; no tendrán que introducir ninguna API ni crear proyectos.

## 1. Crear el proyecto gratuito

1. Abre https://console.firebase.google.com/ e inicia sesión con tu cuenta.
2. Crea un proyecto, por ejemplo `Hello English`.
3. Mantén el plan **Spark**. No necesitas añadir una tarjeta ni activar Blaze.
4. Google Analytics es opcional y esta página no lo utiliza; puedes desactivarlo.

## 2. Registrar la aplicación web

1. Dentro del proyecto, abre la configuración del proyecto (icono de engranaje).
2. En «Tus apps», añade una aplicación web con el símbolo `</>`.
3. Ponle un nombre, por ejemplo `Hello English web`. No necesitas configurar Firebase Hosting: utilizaremos Netlify.
4. Firebase mostrará un objeto de configuración con `apiKey`, `authDomain`, `projectId` y `appId`.
5. Abre **public/firebase-config.js** en GitHub y completa esos cuatro campos con los valores exactos de tu aplicación.

Ejemplo de estructura (no copies valores inventados):

```js
window.FIREBASE_CONFIG = {
  apiKey: "VALOR_DE_TU_CONFIGURACION_WEB",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  appId: "VALOR_DE_TU_APP_WEB"
};
```

Estos valores de configuración web son públicos y se incluyen en el navegador por diseño. La protección del progreso depende de Authentication y las reglas de Firestore. **No copies una clave privada de una cuenta de servicio, un secreto OAuth ni una contraseña.** Los alumnos nunca editan este archivo.

## 3. Habilitar Google

1. Abre **Authentication** en Firebase y empieza su configuración.
2. En los proveedores o métodos de acceso, habilita **Google**.
3. Selecciona el correo de asistencia del proyecto y guarda.
4. En **Authentication → Settings/Configuración → Authorized domains/Dominios autorizados**, añade el dominio de tu web, por ejemplo `tu-escuela.netlify.app`.
5. Introduce solo el dominio: sin `https://` y sin rutas.
6. Si vas a probar con un servidor local, añade también `localhost` cuando no esté en la lista.

No necesitas pedir acceso a Gmail, Drive ni otros servicios. La página solicita el acceso básico necesario para identificar la cuenta.

## 4. Crear la base de datos

1. Abre **Firestore Database** y crea la base de datos **predeterminada**, de edición **Standard**, en modo nativo si se te pregunta.
2. Elige una ubicación apropiada para tus usuarios. Revisa la selección antes de confirmar: la ubicación no se cambia libremente después.
3. Empieza en **modo producción**. No uses reglas de prueba que permitan acceso a cualquiera.
4. Abre la pestaña **Rules/Reglas**.
5. Copia **todo** el contenido de `firestore.rules` incluido en este proyecto y reemplaza las reglas iniciales.
6. Pulsa **Publish/Publicar**.

No necesitas crear colecciones ni documentos a mano. La página los crea con la primera sincronización de cada usuario. Los documentos de progreso son `users/{uid}/courses/a1`, `users/{uid}/courses/a2` y `users/{uid}/courses/b1`. Una cuenta solo puede acceder a su propio documento.

Subir `firestore.rules` a GitHub **no publica las reglas en Firebase**: debes realizar el paso anterior en su consola. También existe una opción para desarrolladores con Firebase CLI, pero no es necesaria para estos pasos.

## 5. Publicar y probar

1. Guarda el cambio de `public/firebase-config.js` en GitHub.
2. Espera al despliegue de Netlify y abre el enlace HTTPS de tu página.
3. En «Mi cuenta», pulsa **Continuar con Google**. Debería abrirse la ventana oficial de Google.
4. Completa una lección y espera a que indique que tu progreso está sincronizado.
5. Abre el mismo enlace en otro navegador o dispositivo y entra con **la misma cuenta**. Comprueba que aparece la lección.
6. Entra con otra cuenta y comprueba que tiene su propio progreso.
7. Si tenías progreso como invitado, puedes añadirlo desde Mi cuenta. La aplicación no lo adjunta sin que pulses esa opción.

El proyecto entregado no está conectado a una cuenta de Firebase ajena. Por eso el botón aparece desactivado hasta que completes la configuración pública.

## Si aparece un error

| Lo que ocurre | Qué revisar |
| --- | --- |
| El botón está desactivado | Completa los cuatro campos en `public/firebase-config.js` y vuelve a publicar. |
| Dominio no autorizado | Añade el dominio exacto de Netlify a Authentication → Dominios autorizados. |
| Método no permitido | Habilita el proveedor Google en Authentication. |
| Ventana bloqueada | Permite ventanas emergentes para tu sitio y vuelve a pulsar el botón. |
| Entra con Google pero no guarda | Crea Firestore predeterminado y publica `firestore.rules`. |
| Límite del servicio alcanzado | Consulta el uso de Firebase Spark; conserva una copia y espera al restablecimiento de cuota. No hace falta activar cobros para exportar tu progreso. |
| Funciona localmente, pero no en Netlify | Verifica el dominio autorizado y que editaste la configuración de la versión publicada. |

Si compartes una captura para recibir ayuda, oculta cualquier contraseña, token, clave privada o dato personal que no sea necesario. Para conectar este proyecto solo se necesita la configuración pública de la aplicación web.

## Documentación oficial

- Acceso con Google: https://firebase.google.com/docs/auth/web/google-signin
- Planes y coste: https://firebase.google.com/pricing
- Cuotas de Firestore: https://firebase.google.com/docs/firestore/quotas
- Reglas por usuario: https://firebase.google.com/docs/firestore/security/rules-conditions
- Publicar desde GitHub en Netlify: https://docs.netlify.com/start/quickstarts/deploy-from-repository/
