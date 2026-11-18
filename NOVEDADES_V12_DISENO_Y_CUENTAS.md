# Hello English V12 — Rediseño, cuentas y recursos

## Cambios hechos sobre el ZIP original V11

1. **Bienvenida pública:** página de inicio nueva con ilustraciones existentes, descripción de la plataforma, beneficios y cifras del temario.
2. **Acceso obligatorio:** la interfaz de los cursos queda oculta mientras Firebase no confirme una sesión. No se ofrece continuar como invitado.
3. **Registro e inicio de sesión:** correo/contraseña, Google y recuperación de contraseña.
4. **Cuenta en la esquina superior derecha:** se muestra como acceso a Mi cuenta; en celular permanece accesible mediante un botón de perfil.
5. **Barra lateral izquierda:** ahora tiene desplazamiento vertical propio en pantallas de escritorio y permite llegar a los elementos inferiores.
6. **Diseño móvil:** cabecera en dos filas, selector de niveles adaptable, acceso rápido a herramientas, navegación inferior y tarjetas fluidas.
7. **Mi guía de estudio:** nuevo espacio `#coach` con explicación de la unidad, ejemplo, vocabulario, mini pregunta corregible y enlaces a práctica, talleres y memoria.
8. **Atajos pedagógicos:** acceso a la guía desde el inicio, los recursos y Más herramientas.
9. **Persistencia de sesión:** la cuenta permanece iniciada entre visitas, hasta que la persona cierre sesión explícitamente.
10. **Se conserva** el contenido existente, sus 96 unidades, 288 misiones y recursos de voz, escritura, práctica y progreso.

## No incluido todavía

- No se añadió ningún profesor IA ni se solicitó ninguna clave de modelo.
- Firebase del usuario no está configurado en el ZIP: se debe completar `CONFIGURAR_ACCESO_V12.md`.
- No se ha comprobado con una cuenta real ni en un navegador gráfico sin restricciones.
- Una web pública no puede ocultar criptográficamente sus JSON y otros archivos estáticos solo con una pantalla de acceso.

## Arquitectura de la entrega

- Código fuente editable: `src/`.
- Versión publicable sin instalador: `public/v12mod/` y `public/v12.css`.
- Generador de la versión independiente: `node scripts/build-standalone.mjs`.
- Proyecto original y pruebas conservados.

## Pruebas ejecutadas

- `node --check` para los módulos fuente y los generados: sin fallos de sintaxis.
- `node --test tests/v12-features.test.js`: 3 pruebas correctas.
- Pruebas existentes ejecutadas parcialmente: 52 pruebas superadas. 4 archivos de pruebas adicionales no pudieron cargarse porque este entorno no dispone de `esbuild` y no puede instalarlo desde el registro.
- Inspección visual automatizada: no completada; el navegador Chromium de este entorno bloquea incluso URL locales por política administrativa.

Para evitar cargos imprevistos, revisa los límites gratuitos de Firebase y Netlify si la plataforma crece.
