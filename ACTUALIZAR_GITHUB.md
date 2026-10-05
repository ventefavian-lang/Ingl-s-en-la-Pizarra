# Actualizar A1 + A2 a A1 + A2 + B1 con pronunciación

Este ZIP contiene el proyecto completo. No lo combines manualmente con los antiguos archivos del A2 independiente.

1. Descomprime el ZIP.
2. Si Google ya funcionaba en tu página, copia el contenido de tu actual `public/firebase-config.js` al archivo del nuevo proyecto. El entregado viene vacío para usar tu propio Firebase.
3. Abre tu repositorio de GitHub. En la raíz, pulsa **Add file → Upload files** y arrastra el contenido descomprimido, con sus carpetas. No subas el ZIP ni la carpeta exterior: `package.json` y `netlify.toml` deben quedar en la raíz.
4. Revisa y guarda los cambios. Si trabajas en una rama, intégrala en la rama que publica tu sitio. No subas `node_modules` ni claves privadas o cuentas de servicio.
5. Si usas Netlify conectado al repositorio, espera a que termine el despliegue: `npm run build`, carpeta `public`, directorio base vacío.
6. En el **mismo proyecto Firebase**, abre **Firestore Database → Reglas** y publica el contenido del nuevo `firestore.rules`. Esta versión permite A1, A2 y B1. No borres la base de datos ni los documentos anteriores.
7. Abre tu enlace habitual. Comprueba los tres botones de nivel y entra en **Laboratorio**. Completa una lección B1 y revisa que A1/A2 mantienen sus avances.

Si aún no has configurado Google, sigue `CONFIGURAR_GOOGLE.md`. Puedes estudiar como invitado mientras tanto.

## Enlaces directos

Añade a la dirección de tu página:

- `?level=b1#home`: inicio B1.
- `?level=b1#lab`: sonidos y boca animada.
- `?level=a1#lab/stories`: historias con traducción A1.
- `?level=a2#lab/method`: rutina de práctica A2.

## Conservación de datos

A1 sigue usando `users/UID/courses/a1`; A2, `users/UID/courses/a2`; B1 utiliza `users/UID/courses/b1`. Cada nivel tiene su propia copia local, exportación, resultados e historial de voz.

Mantén el mismo dominio para conservar al invitado. Si cambias de dominio, exporta desde Mi progreso antes e importa la copia en el mismo nivel después. Las copias de un nivel no se importan en otro.

Si cambias de nivel sin conexión, vuelve al nivel que tenía cambios pendientes cuando recuperes internet. La página no los presenta como sincronizados hasta que se confirme el envío.

## Si algo falla

| Situación | Comprobación |
| --- | --- |
| Google desactivado | Completa y conserva `public/firebase-config.js`. |
| A1/A2 guardan, pero B1 no | Publica las nuevas reglas de Firestore. |
| Falta el diccionario | Comprueba `public/assets/pronunciation-us.js`. |
| El micrófono no funciona al abrir el archivo | Prueba la página publicada con HTTPS o usa localhost; permite el micrófono. |
| No hay voz inglesa | Revisa las voces disponibles en navegador/sistema o usa otro navegador compatible. |
| La palabra tiene variantes | Elige la que corresponde al contexto; el diccionario no resuelve homógrafos automáticamente. |
| Palabra desconocida o cifra | Se permite escucharla, pero no se inventa una secuencia fonética. Prueba escribir los números como palabras. |

Fuentes de publicación: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository · https://docs.netlify.com/start/quickstarts/deploy-from-repository/ · https://firebase.google.com/docs/firestore/security/get-started
