# Conversaciones con contexto · Edición 6

La página principal ahora es una ruta de historias. Cada una tiene personajes, un motivo para hablar y dos escenas relacionadas. Las prácticas reutilizan esa situación antes de pedirte que la adaptes a tu vida.

## Qué se añadió

| Nivel | Historias | Escenas | Intervenciones bilingües | Expresiones explicadas | Opciones con respuesta del personaje |
|---|---:|---:|---:|---:|---:|
| A1 | 6 | 12 | 96 | 36 | 24 |
| A2 | 6 | 12 | 96 | 36 | 24 |
| B1 | 6 | 12 | 96 | 36 | 24 |
| B2 | 6 | 12 | 96 | 36 | 24 |
| Total | 24 | 48 | 384 | 144 | 96 |

Son textos originales. Las ilustraciones de personajes y lugares son vectores incluidos en el código. Se conservan las 96 unidades, los 96 talleres, los bancos de práctica, las lecturas, los textos con huecos, el laboratorio de sonidos, el diccionario y las herramientas de las ediciones anteriores.

## Cómo recorrer una escena

1. **Comprende.** Lee o escucha el intercambio. Empieza con inglés y español. Cuando entiendas la intención, vuelve a escucharlo con «Solo inglés» y después «Solo escuchar». Puedes ir por parejas de intervenciones o abrir el diálogo completo.
2. **Descubre.** Aprende tres expresiones: significado, uso y otro ejemplo traducido. Di una variación que tenga sentido en tu vida.
3. **Responde.** Recupera tus cuatro turnos del mismo diálogo. Siempre aparece la intervención anterior del otro personaje. Si eliges un turno de otro momento, vuelve a revisar la intención y reintenta.
4. **Habla.** Escucha al personaje y responde. Usa el guion al principio y después ocúltalo. Puedes grabarte y escuchar tu toma, usar el dictado del navegador o practicar sin micrófono. Una respuesta libre distinta del guion no se marca automáticamente como incorrecta.
5. **Decide.** Ensaya dos versiones de ese momento. Ambas tienen una respuesta escrita del personaje y una explicación de lo que consigues con tu frase. Son variantes de práctica: el episodio siguiente continúa el guion principal.
6. **Úsalo.** Cambia nombres, necesidades o circunstancias. Escribe tu propio intercambio, dilo en voz alta y revisa tres criterios. Guarda qué te costó para volver a intentarlo.

Los pasos están abiertos para consultar apoyos. La página registra cuáles has practicado; no bloquea el contenido con tiempos de espera. El primer repaso se programa cuando has recorrido los seis pasos, para aproximadamente un día después. Puedes consultar su fecha y abrirlo desde **Entrenar y crear → Historial y gráficas**.

En cada repaso intenta recuperar las expresiones antes de abrir los modelos. Si necesitas ayuda, vuelve a intentarlo unos 15 minutos después. Si las recuerdas en días separados, los intervalos pasan por 1, 3, 7, 14 y hasta 30 días. Practicar antes de la fecha no adelanta los intervalos. Esta valoración del recuerdo la realizas tú.

## Una rutina posible

- Primer encuentro: entiende una escena y explora sus expresiones. No avances por haber reconocido una traducción una sola vez.
- Siguiente encuentro: responde y habla sin leer; después comprueba el modelo. Repite los turnos que te costaron.
- Otro día: crea una variante, practica el episodio siguiente y atiende los repasos pendientes.
- Cuando necesites ampliar una estructura, abre «Gramática y talleres de apoyo». Cada historia conecta con cuatro unidades del nivel. Vuelve después a usar esa estructura en una conversación.

Puedes dedicar sesiones cortas o largas según tu atención. La cantidad de pantallas recorridas no garantiza soltura ni acredita un nivel MCER. Para comprobar transferencia, usa lo aprendido en una situación distinta y conversa con otra persona cuando puedas.

## Temas de las historias

| A1 | A2 | B1 | B2 |
|---|---|---|---|
| Conocer gente en un club | Compartir piso | Entrar en un equipo | Negociar un plazo |
| Visitar una casa | Organizar un cumpleaños | Resolver un viaje | Revisar errores y acuerdos |
| Pedir en un café | Viaje y alojamiento | Biblioteca comunitaria | Interpretar evidencia |
| Comprar una chaqueta | Producto e instrucciones | Pedido y reclamación | Proponer mejoras al barrio |
| Llegar a un museo | Voluntariado | Comprobar un rumor | Queja y reseña equilibrada |
| Planes y experiencias | Contar una experiencia | Organizar una actividad | Discrepar y acordar una rutina |

## Audio y pronunciación

Las conversaciones tienen audios incluidos y una voz predeterminada para cada personaje: Leo, Mia, Nora y Sam. Mantienen esa voz al cambiar de historia, nivel o dispositivo. Los ejemplos usan una quinta voz de narración. No hay que elegir ni instalar voces. Puedes repetir el diálogo y cambiar entre velocidad natural, tranquila y lenta; el reproductor conserva el tono. Los audios se generaron con síntesis neural local y se publican como MP3: no son grabaciones de actores ni respuestas generadas en tiempo real. Si un archivo no carga, aparece un aviso para reintentarlo y no se registra la escucha como terminada.

Los diálogos de las 96 unidades también tienen audios incluidos. Las lecturas completas, las palabras sueltas y los textos libres que no forman parte de ese catálogo usan una voz automática del navegador, con la disponibilidad y calidad de ese dispositivo.

La grabación para autoescucha permanece en la pestaña y se descarta al cambiar de turno o salir de la escena. No se sube a Firebase. El dictado depende de la compatibilidad y los permisos del navegador, y puede usar el servicio de voz de su proveedor.

El porcentaje compara las **palabras de una transcripción** con las del guion. No mide la precisión de los sonidos ni determina si una respuesta diferente es correcta. Para observar la articulación, usa el laboratorio de los 44 sonidos, que conserva muestras incluidas, diagrama animado, reproducción lenta y botón para ocultarlo. El diagrama es una guía aproximada.

## Guardado

Los borradores, pasos, elecciones, intentos y fechas de repaso se guardan por nivel. Como invitado se almacenan en este navegador. Con Google configurado, se sincronizan con tu cuenta. Las reglas de Firebase de esta edición añaden el campo `conversations`: **hay que publicarlas aunque Google ya estuviera funcionando**. Consulta PUBLICAR_PASO_A_PASO.md.

Las grabaciones no se guardan en el progreso. Las fechas del historial representan actividades registradas, no minutos reales de estudio. Los intentos de elección se muestran como aciertos sobre intentos; la producción libre usa autoevaluación.

## Editar el contenido

- `src/conversations.json`: todas las historias.
- `scripts/conversations/`: originales en un formato breve, divididos por nivel.
- `python3 scripts/conversations/build.py`: regenera el JSON desde esos originales.
- `src/conversation-course.js`: recorrido, diálogos, audio, decisiones y práctica oral.
- `src/conversation-art.js`: personajes y escenarios originales.
- `src/conversation-memory.js`: guardado, combinación entre dispositivos y repaso.
- `src/conversation.css`: diseño adaptable.

Si editas el JSON directamente, no ejecutes luego el generador sin trasladar tus cambios a los archivos Python. Si cambias el texto de una intervención, actualiza también su audio siguiendo VOCES.md. Ejecuta `npm run build` para actualizar la copia publicada. El ZIP ya incluye la compilación.
