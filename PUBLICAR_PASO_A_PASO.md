# Subir el proyecto completo

Este ZIP tiene todo A1, A2, B1 y B2. No necesitas unirlo con otros ZIP ni copiar fragmentos de código.

## Si ya tienes el repositorio en GitHub Desktop

1. Descarga y extrae **Hello_English_A1_A2_B1_B2_Completo.zip**. Abre la carpeta extraída: deben aparecer `public`, `src`, `package.json` y `netlify.toml`.
2. En **GitHub Desktop**, selecciona el repositorio de tu página. Pulsa **Repository → Show in Explorer** para abrirlo en el Explorador de archivos.
3. **Solo si ya habías activado Google:** copia el archivo `public/firebase-config.js` de tu repositorio al Escritorio para guardarlo temporalmente. El archivo del ZIP está vacío porque no conocemos tu proyecto Firebase.
4. Vuelve a la carpeta extraída, selecciona todo su contenido con **Ctrl+A**, cópialo con **Ctrl+C** y pégalo con **Ctrl+V** dentro de la carpeta del repositorio. Debe quedar `package.json` directamente en la raíz, al lado de `netlify.toml`. Acepta reemplazar los archivos del mismo nombre y combinar carpetas. No necesitas borrar nada antes.
5. Si guardaste tu configuración Google en el paso 3, vuelve a colocarla en `public/firebase-config.js` del repositorio, reemplazando la plantilla vacía.
6. Regresa a GitHub Desktop. En **Summary**, escribe `Pagina completa A1 A2 B1 B2`. Pulsa **Commit to main** (o el nombre de tu rama) y después **Push origin**.
7. Abre Netlify → tu sitio → **Deploys**. Si el repositorio y esa rama están conectados a despliegue continuo, espera a que el nuevo despliegue termine. Abre tu mismo enlace y selecciona B2.

En Windows, copiar carpetas combina su contenido. Si usas macOS y Finder solo te ofrece sustituir una carpeta entera, usa la opción de combinar o copia sus contenidos por separado.

## Si tu repositorio está en GitHub, pero no en GitHub Desktop

1. Abre GitHub Desktop e inicia sesión en tu cuenta de GitHub.
2. Pulsa **File → Clone repository**.
3. Selecciona el repositorio de tu página y una carpeta de tu computadora.
4. Pulsa **Clone** y sigue los pasos anteriores.

No pegues todo el proyecto en la casilla «Code» de GitHub ni subas únicamente el ZIP. Son varios archivos que necesitan conservar sus carpetas; GitHub Desktop puede subirlos juntos.

## Configuración de Netlify

La configuración ya está en `netlify.toml`:

- Directorio base: raíz del repositorio; déjalo vacío si no hay una subcarpeta configurada.
- Comando de compilación: `npm run build`.
- Carpeta de publicación: `public`.
- Versión de Node: 22.

Si antes configuraste un directorio base distinto, comprueba que apunte a la carpeta donde están `package.json` y `netlify.toml`. Si aún no conectaste Netlify, crea un sitio mediante la importación de un proyecto existente desde GitHub, elige este repositorio y usa estos valores. El nombre exacto de los botones puede variar según la interfaz.

## Google y progreso

Puedes usar toda la página como invitado: se guarda en ese navegador. Para guardar con una cuenta Google, conserva tu configuración real o sigue **CONFIGURAR_GOOGLE.md** si es la primera vez.

Aunque ya funcionara Google, para esta versión publica el contenido completo de **firestore.rules** en **Firebase → Firestore Database → Rules → Publish**. Realiza también el apartado **4.1** de CONFIGURAR_GOOGLE.md sobre índices. Así se admiten B2 y los campos nuevos. Subir esos archivos a GitHub no los publica en Firebase.

No tienes que crear otro proyecto Firebase para B2. Usa el mismo que tenías. El progreso se separa por nivel y por cuenta. Si deseas una copia adicional de tus avances, usa **Mi progreso → Exportar** antes de actualizar.

## Probar en la computadora

Después de extraer el ZIP puedes abrir **EMPIEZA_AQUI.html** y pulsar «Abrir la página». Para micrófono, cuentas y funciones que requieren un origen seguro, usa el enlace HTTPS publicado o localhost.

Si tienes Node 22 y Python instalados, abre una terminal en la carpeta y ejecuta:

```sh
npm ci
npm run build
npm run serve
```

Después abre `http://localhost:8085`. La compilación de `public/build` ya viene incluida; no tienes que hacer esto en tu computadora para subirlo a GitHub y dejar que Netlify compile.

## Qué contiene

96 unidades entre A1, A2, B1 y B2; lecciones y talleres; vocabulario; imágenes; sonidos; traducción al pasar el cursor; pruebas de lectura; textos con huecos; escritura, conversación y grabación; repaso; historial y gráficas. Se conserva el código editable y las pruebas.

La pronunciación utiliza las voces del navegador y muestras sintéticas incluidas. El porcentaje de voz compara palabras transcritas, no exactitud fonética. El diagrama es una guía aproximada. Los modelos de escritura permiten autoevaluarse, sin una corrección de IA de pago.
