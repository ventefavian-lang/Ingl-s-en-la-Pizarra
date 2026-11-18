# Configurar el registro y el inicio de sesión — Hello English V12

Esta versión **exige que la persona inicie sesión** antes de usar los cursos. No lleva ninguna IA integrada: el profesor IA se añadirá en una fase posterior.

## Qué funciona ya en el proyecto

- Pantalla pública de presentación con niveles, misiones y beneficios.
- Formularios separados para **crear cuenta** e **iniciar sesión** mediante correo y contraseña.
- Botón de acceso con **Google** (la primera vez también crea la cuenta).
- Recuperación de contraseña por correo.
- Guardado del progreso por usuario y por nivel en Firestore, reutilizando el sistema original.
- Botón de cuenta en la esquina superior derecha, también visible en celular.

**Importante:** en el ZIP `public/firebase-config.js` tiene valores vacíos; por eso la pantalla pública se ve, pero los botones para entrar están deshabilitados hasta completar la configuración. No se debe abrir el curso como invitado.

## Paso 1. Preparar Firebase

1. Abre https://console.firebase.google.com/ y selecciona tu proyecto (o crea uno en el plan gratuito si reúne los requisitos).
2. En **Authentication → Sign-in method** activa **Google** y **Email/Password**.
3. En **Authentication → Settings → Authorized domains** comprueba el dominio real de tu página y, si vas a probar localmente, el dominio local autorizado.
4. En la sección general del proyecto registra tu aplicación **Web** y obtén los valores de la configuración pública de Firebase.
5. Copia esos valores en `public/firebase-config.js` reemplazando `apiKey`, `authDomain`, `projectId` y `appId`. Si Firebase entrega `storageBucket`, `messagingSenderId` u otros campos públicos, también pueden conservarse.
6. **No** guardes aquí contraseñas, cuentas de servicio ni claves privadas. La configuración web de Firebase es pública por diseño; las reglas y la autenticación protegen los datos.

Ejemplo con valores ficticios:

```js
window.FIREBASE_CONFIG = {
  apiKey: "VALOR_PUBLICO_DEL_PROYECTO",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  appId: "VALOR_PUBLICO_DE_LA_APP"
};
```

## Paso 2. Configurar Firestore

1. Activa **Cloud Firestore** si no lo has hecho.
2. Copia las reglas de `firestore.rules` en la consola de Firebase y publícalas.
3. Verifica con dos cuentas de prueba que cada una solo puede leer y modificar sus propios documentos de progreso.
4. Comprueba los límites del plan gratuito antes de publicar para muchos estudiantes.

## Paso 3. Publicar en Netlify

**Opción sin instalar Node:** sube la carpeta `public/` a un sitio de Netlify mediante su publicación manual. Ya incluye el frontend en `public/v12mod/`, con módulos de JavaScript y una hoja de estilos `public/v12.css`. Este modo requiere conexión para cargar el SDK público de Firebase desde Google cuando las cuentas estén configuradas.

**Opción con compilación:** publica el proyecto completo usando Git y el comando `npm run build`; Netlify podrá instalar dependencias y preparar el paquete usando esbuild. La versión de esta entrega contiene también el frontend independiente en `public/` para que puedas publicarla sin compilar.

> Nota: las reglas de acceso del frontend ocultan los cursos a quien no haya iniciado sesión, pero los archivos estáticos de una web pública se pueden descargar si se conoce la URL. Si necesitas proteger el contenido del curso como material privado (y no solo la interfaz y el progreso), tendrás que distribuirlo mediante un backend autenticado.

## Paso 4. Pruebas antes de publicar

- Abrir en modo incógnito: solo debe aparecer la bienvenida, no los cursos.
- Crear cuenta con correo y contraseña; revisar que accedes a las lecciones.
- Cerrar sesión y verificar que regresa la bienvenida.
- Entrar con Google en un segundo navegador y comprobar que se carga el progreso correspondiente.
- Solicitar recuperación de contraseña desde la pantalla de acceso.
- Probar en celular, con teclado abierto, y verificar la barra inferior y la entrada a Mi cuenta.
- Desplazar el menú lateral en una computadora con ventana de poca altura.
- Abrir **Más herramientas → Mi guía de estudio** y elegir unidades de los cuatro niveles.

El acceso real no se puede verificar con este ZIP sin un proyecto Firebase activado. La IA no forma parte de esta entrega.
