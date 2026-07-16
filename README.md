# Inglés en la Pizarra

Sitio estático (HTML/CSS/JS puro, sin frameworks) para aprender inglés,
pensado para publicar en GitHub Pages y monetizar con Google AdSense.

## Estructura

```
index.html                 → página principal (hero + mapa de niveles + artículos destacados)
css/style.css               → todos los estilos (tema "pizarra de tiza")
js/script.js                 → motor de quizzes interactivos + progreso en localStorage
niveles/a1.html              → lección completa de ejemplo (nivel A1)
articulos/index.html         → listado de artículos del blog
articulos/*.html             → cada artículo individual
```

## Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo (o usa uno existente) y sube todo el contenido de esta carpeta a la raíz del repo.
2. Ve a **Settings → Pages** y selecciona la rama `main` y carpeta `/root`.
3. Espera unos minutos: tu sitio quedará disponible en `https://tu-usuario.github.io/tu-repo/`.
4. Si más adelante compras un dominio propio, agrégalo en la misma sección de Pages (igual que hiciste con RutaBeca).

## Cómo agregar un nuevo nivel (A2, B1, B2, C1, C2)

1. Duplica `niveles/a1.html` y renómbralo, por ejemplo `niveles/a2.html`.
2. Cambia el `<title>`, la explicación de gramática, el vocabulario y las preguntas del quiz.
3. Dale a cada `<div class="quiz" data-quiz="...">` un identificador único (por ejemplo `a2-pasado-simple`) para que el progreso se guarde por separado.
4. En `index.html`, cambia el nodo del nivel correspondiente: quítale la clase `bloqueado` y actualiza el `href`.

## Cómo agregar un artículo nuevo

1. Duplica `articulos/como-aprender-ingles-rapido-en-2026.html`.
2. Cambia título, meta-descripción y contenido. Mantén los bloques `<div class="bloque-anuncio">` donde quieras que aparezcan anuncios.
3. Agrega una tarjeta nueva en `articulos/index.html` (y opcionalmente en la sección "Artículos recientes" de `index.html`) que enlace al artículo.
4. Para SEO: usa un título descriptivo, una sola idea por artículo, y enlaza siempre a una lección relacionada (como en el ejemplo).

## Integrar Google AdSense

1. Cuando tu solicitud de AdSense sea aprobada, reemplaza el comentario en el `<head>` de cada página:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
2. Dentro de cada `<div class="bloque-anuncio">`, reemplaza el texto de marcador por el `<ins class="adsbygoogle">` que te dé AdSense.
3. No pongas más de 2-3 anuncios por página para no perjudicar la experiencia ni la aprobación.

## Cómo funciona el quiz interactivo

Cada pregunta es un `<div class="pregunta" data-correcta="N">` donde `N` es el
índice (empezando en 0) del botón `<button class="opcion">` correcto.
`js/script.js` detecta el clic, marca la opción correcta en verde y la
incorrecta en rojo, y guarda el puntaje en `localStorage` bajo la clave
`progreso-ingles-pizarra`. No necesitas backend ni base de datos.

## Ideas para seguir creciendo el sitio

- Agregar audio (puedes usar la API de síntesis de voz del navegador,
  `speechSynthesis`, para pronunciar el vocabulario sin subir archivos de audio).
- Agregar una página de "vocabulario por tema" (comida, viajes, trabajo, etc.)
  con la misma cuadrícula `.vocab-rejilla` usada en la lección A1.
- Cuando tengas más lecciones, considera agregar un buscador simple con
  JavaScript que filtre las tarjetas por palabra clave.
- Para imágenes reales (en vez de emojis), usa fotos propias o bancos de
  imágenes de uso libre (Pexels, Unsplash) y verifica su licencia antes de
  subirlas al repositorio.
