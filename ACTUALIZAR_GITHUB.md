# Actualizar tu página con GitHub Desktop

Este ZIP es el proyecto completo. No subas el ZIP como un archivo a tu página.

## Antes de reemplazar archivos

1. En tu página actual, exporta el progreso de cada nivel que quieras conservar desde **Mi progreso → Exportar progreso**.
2. Si Google ya funciona, guarda una copia de tu archivo **public/firebase-config.js**. El ZIP incluye una configuración vacía: necesitas conservar la tuya.
3. Si utilizas Firebase, publica el contenido del nuevo **firestore.rules** en **Firestore Database → Reglas** de tu mismo proyecto. Las reglas admiten el progreso anterior y los nuevos talleres. Subirlas a GitHub no las publica en Firebase.

## Copiar, confirmar y enviar

1. Descomprime el ZIP en una carpeta temporal.
2. Abre **GitHub Desktop** y selecciona tu repositorio. Si aún no está descargado, usa **File → Clone repository** y elige el repositorio de tu cuenta.
3. Pulsa **Repository → Show in Explorer** para abrir su carpeta en Windows.
4. Copia el contenido descomprimido dentro de esa carpeta. Acepta reemplazar los archivos del proyecto. En la raíz deben quedar `package.json`, `netlify.toml`, `src` y `public`, sin una carpeta adicional que los envuelva.
5. Restaura tu configuración en **public/firebase-config.js** si ya habías conectado Google.
6. Regresa a GitHub Desktop. Verás los archivos modificados y nuevos. Escribe un resumen como **Ampliar A1 a B1 y mejorar pronunciación**.
7. Pulsa **Commit to main** (o el nombre de tu rama) y después **Push origin**. Si Netlify publica otra rama, integra los cambios en esa rama.
8. Si Netlify ya está conectado a ese repositorio, espera a que termine el despliegue. Ajustes: `npm run build`, carpeta `public`, base vacía.

No copies `node_modules`, claves privadas ni cuentas de servicio. Mantén el mismo dominio si quieres conservar directamente el progreso de invitado de ese navegador.

## Comprobar la actualización

- Abre tu enlace habitual y recarga la página; cierra pestañas antiguas del curso.
- En **Voz y sonidos**, comprueba el mapa de vocales, las vistas de la boca y los 44 sonidos.
- En **Talleres completos**, abre una unidad y escribe un borrador. Cambia de página y vuelve: debe mantenerse.
- Comprueba que A1, A2 y B1 siguen teniendo avances separados.
- Si Google está configurado, espera a que indique sincronización y verifica el borrador desde otro dispositivo con la misma cuenta.

## Enlaces directos

Añade a tu dominio:

- `?level=a1#lab`: boca y mapa interactivos.
- `?level=a1#study`: talleres A1.
- `?level=a2#study`: talleres A2.
- `?level=b1#study`: talleres B1.
- `?level=b1#study/14/read`: lectura ampliada de la unidad 14 de B1.

## Problemas frecuentes

| Problema | Qué comprobar |
| --- | --- |
| Google no está activado | Completa tu configuración siguiendo CONFIGURAR_GOOGLE.md. |
| Entra con Google pero no guarda talleres | Publica las reglas nuevas en Firebase y recarga la página. |
| El invitado perdió el avance al cambiar de dominio | Importa la copia exportada en el nivel correspondiente. |
| No se ven los cambios | Revisa que hiciste Push origin y que Netlify terminó el despliegue de la rama correcta. |
| El micrófono no funciona al abrir un archivo | Usa el enlace HTTPS publicado o localhost y permite el micrófono. |
| Falta la articulación de una palabra | Una palabra desconocida se marca; no se inventan sus sonidos. |

Documentación: https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop · https://docs.netlify.com/start/quickstarts/deploy-from-repository/
