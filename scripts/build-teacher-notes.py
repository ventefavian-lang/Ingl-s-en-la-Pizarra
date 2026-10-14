"""Modelos traducidos y tareas breves originales, alineados con las 288 lecciones."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
DATA = {
'a1': '''
¡Hola! Me llamo Ana.|Saluda a alguien que acabas de conocer y di tu nombre.
Me llamo Leo.|Preséntate con tu nombre real o uno inventado y deletréalo en voz alta.
Por favor, habla despacio.|Imagina que tu compañero habla muy rápido. Pídele ayuda con una frase cortés.
Soy estudiante.|Di quién eres con una profesión o una descripción sencilla.
No estoy cansado o cansada.|Escribe cómo no te sientes hoy. Después di cómo sí te sientes.
¿Eres estudiante?|Pregunta a otra persona si es estudiante y ensaya una respuesta breve.
Ella es de España.|Di de dónde eres tú y de dónde es otra persona.
Tengo veinte años.|Di tu edad o la edad de un personaje. En inglés se usa be, no have.
¿Cuál es tu dirección?|Pide un dato de contacto. Usa datos inventados al practicar.
Esto es un bolígrafo.|Presenta un objeto que tengas cerca usando a o an.
Tengo dos bolígrafos.|Cuenta dos tipos de objetos de tu habitación; comprueba sus plurales.
Esto es un libro.|Señala un objeto cercano y otro lejano con this y that.
Esta es mi hermana.|Presenta a una persona de una familia real o inventada usando my.
Este es el hermano de Sara.|Explica una relación de otra persona usando el nombre y apóstrofo.
Mi hermana es estudiante.|Di quién es un familiar y añade un dato sencillo sobre esa persona.
Ella es muy amable.|Describe la personalidad de alguien con be y un adjetivo.
Tengo el pelo castaño.|Describe tu pelo o el de un personaje. Decide entre have y has.
Tengo una bolsa azul.|Di qué tienes usando have got. Puedes inventar el objeto.
Hay una cama.|Di qué hay en una habitación: primero una cosa y después varias.
¿Hay un baño?|Pregunta si hay algo que necesitas en una casa o un hotel.
La lámpara está al lado de la cama.|Describe dónde está un objeto con respecto a otro.
Me levanto a las siete.|Di a qué hora haces una actividad habitual.
Ella trabaja en una escuela.|Cuenta un hábito de otra persona y comprueba la terminación del verbo.
Primero, desayuno.|Cuenta dos pasos de tu mañana en orden.
No bebo café.|Di algo que no haces habitualmente y contrástalo con algo que sí haces.
¿Hablas inglés?|Pregunta por un hábito a otra persona y prepara una respuesta breve.
¿Dónde vives?|Pregunta dónde o cuándo hace algo una persona. Usa datos inventados.
Son las ocho.|Di una hora y relaciona esa hora con una actividad.
Mi cumpleaños es en mayo.|Di el mes de un cumpleaños y el día de una actividad semanal.
Siempre desayuno.|Di con qué frecuencia haces dos actividades; evita usar siempre para todo.
Me gusta el fútbol.|Di una cosa que te gusta y otra que no te gusta.
Sé nadar.|Di una habilidad que tienes y una que todavía no tienes.
¿Puedes ayudarme?|Pide ayuda y usa me, him, her o us para indicar a quién ayudar.
Tengo dos huevos.|Haz una pequeña lista con un alimento contable y otro incontable.
Hay algunas manzanas.|Explica qué comida hay y pregunta si queda otra cosa.
¿Cuántos plátanos quieres?|Pregunta una cantidad eligiendo how much o how many.
Quisiera un café, por favor.|Pide una bebida o comida que te gustaría tomar ahora.
Me gusta el café.|Distingue tu gusto habitual de lo que quieres pedir hoy.
¿Cuánto cuesta el sándwich?|Pregunta el precio de algo y ensaya cómo terminarías la compra.
¿Cuánto cuesta esta bolsa?|Pregunta el precio de un objeto y después el de varios.
Necesito una talla mediana.|Pide una prenda indicando tu talla o color preferido.
Esta bolsa es más pequeña.|Compara dos objetos que tengas a la vista usando un adjetivo sencillo.
¿Hay un banco cerca de aquí?|Pregunta por un lugar que necesitas encontrar en una ciudad.
Sigue recto y gira a la derecha.|Da dos instrucciones para moverse por una calle imaginaria.
Gira a la derecha en el banco.|Explica un giro usando un lugar como referencia.
Voy a la escuela en autobús.|Di cómo vas habitualmente a algún sitio.
¿A qué hora sale el autobús?|Pregunta por la salida de un transporte y ensaya una respuesta.
Una habitación para dos noches, por favor.|Pide una habitación o un billete indicando la cantidad necesaria.
Estoy leyendo ahora.|Di qué estás haciendo ahora tú o un personaje.
¿Estás escuchando?|Pregunta qué está haciendo alguien y da una respuesta breve.
Ella trabaja todos los días.|Contrasta una costumbre con lo que ocurre ahora.
Hoy hace sol.|Describe el tiempo de hoy o de una imagen imaginaria.
Llevo puesta una camisa azul.|Di qué lleva puesto una persona, incluyendo un color.
Hace calor en verano.|Relaciona una estación con su clima y da una razón sencilla.
Me duele la mano.|Di qué parte del cuerpo te duele en una situación ficticia.
Me duele el estómago.|Describe una molestia para pedir ayuda. Es una práctica de idioma.
Por favor, ayúdame.|Pide ayuda de forma cortés y añade una instrucción sencilla.
Ayer estuve en casa.|Di dónde estabas ayer tú y otra persona.
¿Estabas en la escuela?|Pregunta dónde estaba alguien y ensaya una respuesta negativa.
La semana pasada estuve ocupado u ocupada.|Cuenta cómo estabas en un momento pasado y precisa cuándo.
Ayer visité a mi amigo.|Cuenta una acción terminada con un verbo regular.
Fui al parque.|Cuenta adónde fuiste ayer usando el pasado de go.
¿Visitaste a tu amigo?|Pregunta qué hizo alguien ayer y ensaya una respuesta con did.
Voy a estudiar esta noche.|Di un plan concreto para esta noche o mañana.
¿Vas a estudiar?|Pregunta a alguien por un plan y responde brevemente.
¿Te gustaría venir?|Invita a una persona y acuerda un lugar o una hora.
Me gustan el té y el café.|Une dos ideas con and, but o because según su relación.
¡Hola, Ana! ¿Cómo estás?|Escribe el comienzo de un mensaje a una persona conocida.
La biblioteca está cerrada el domingo.|Escribe un aviso de horario y di qué día sí puedes ir.
Soy Ana y soy de Perú.|Preséntate añadiendo tu lugar de origen.
Un billete a Oxford, por favor.|Resuelve una compra sencilla indicando el destino que necesitas.
Puedo presentarme.|Di una cosa que ya puedes hacer en inglés y demuéstrala con un ejemplo.
''',
'a2': '''
Normalmente estudio por la tarde-noche.|Contrasta un hábito de tu semana con algo temporal que haces estos días.
Casi nunca veo la televisión.|Cuenta la frecuencia real de dos actividades y pregunta por la de otra persona.
Prefiero los lugares tranquilos porque puedo leer.|Explica una preferencia con una razón concreta.
Mi vecino tiene el pelo corto y rizado.|Describe el aspecto y un rasgo de personalidad de alguien.
Este cuaderno es mío.|Aclara a quién pertenecen dos objetos sin repetir sus nombres.
Ella es la amiga que me ayuda a estudiar.|Identifica a una persona explicando qué hace.
Ayer visitamos el museo.|Cuenta dos hechos terminados de una salida real o inventada.
¿Disfrutaste del concierto?|Pregunta por una experiencia pasada y añade algo que no ocurrió.
Primero compramos las entradas.|Cuenta tres pasos de una salida en un orden comprensible.
Anoche a las nueve estaba leyendo.|Describe qué hacías a una hora concreta de ayer.
Estábamos comiendo cuando se fue la luz.|Cuenta qué estabas haciendo y qué lo interrumpió.
Mientras yo cocinaba, mi hermana leía.|Describe dos actividades que ocurrían a la vez.
He visitado otro país.|Cuenta una experiencia sin decir todavía cuándo ocurrió.
¿Has dormido alguna vez en una tienda de campaña?|Pregunta por una experiencia y responde con ever o never cuando corresponda.
Mi hermano ha estado en Chile dos veces.|Distingue una visita de la que alguien volvió de un viaje del que aún no ha vuelto.
Acabo de enviar el correo.|Comunica una novedad usando just, already o yet según el mensaje.
Vivo aquí desde hace tres años.|Describe algo que empezó antes y continúa; distingue la duración del inicio.
He perdido las llaves y no puedo entrar.|Cuenta una noticia con efecto actual y añade un detalle situado en el pasado.
Voy a aprender a nadar.|Expresa una intención y explica por qué la tienes.
Tu bolsa pesa. Yo la llevaré.|Imagina que alguien necesita ayuda y ofrece hacer algo en ese momento.
Hemos quedado en la estación a las diez.|Cuenta un plan acordado indicando lugar y hora.
¿Les gustaría almorzar con nosotros?|Invita a alguien a una actividad concreta.
Suena genial. ¿A qué hora quedamos?|Acepta una invitación y pide un dato para concretarla.
¿Estás libre el viernes a las tres?|Propón una hora y ofrece una alternativa si no funciona.
El autobús es más barato que el taxi.|Compara dos formas de llegar a un lugar.
Esta es la cafetería más barata de la ciudad.|Recomienda una opción dentro de un grupo usando un superlativo.
Hoy el tren es tan rápido como el autobús.|Compara dos opciones indicando en qué son iguales o diferentes.
Necesitamos una botella de aceite.|Prepara una lista de compra con recipientes o cantidades adecuados.
Nos quedan unos cuantos tomates.|Explica qué queda para cocinar con a few y a little.
Hay demasiada sal en esta sopa.|Describe un exceso o una cantidad insuficiente y propone un cambio.
Prefiero el azul.|Elige entre dos objetos sin repetir el nombre de ambos.
Estos zapatos son demasiado pequeños.|Explica por qué una prenda no te sirve usando too o enough.
Compré esta camisa ayer.|Explica una compra, un problema y la solución que pides.
Camina por esta calle.|Da una ruta breve con dos indicaciones de movimiento.
Esta es la cafetería donde solemos quedar.|Identifica un lugar por lo que haces allí.
Disculpe, ¿cómo llego al museo?|Pide indicaciones y confirma un paso para evitar perderte.
El tren sale a las seis y media.|Comunica un horario publicado de un viaje.
Normalmente viajo en tren.|Explica cómo viajas y pide el billete que necesitas.
Nuestro tren lleva veinte minutos de retraso.|Comunica un problema de transporte y pregunta por otra opción.
¿Podría darme una toalla extra, por favor?|Haz una petición concreta en un alojamiento.
Hay un problema con la ducha.|Explica qué no funciona y pide que lo revisen.
Tengo una reserva para dos noches.|Confirma los datos esenciales de una reserva ficticia.
Me duele la garganta desde el lunes.|Explica una molestia ficticia e indica desde cuándo la tienes.
Deberías pedir ayuda si estás preocupado o preocupada.|Da un consejo prudente y una razón en una situación ficticia.
Necesito hablar con un médico.|Expresa claramente qué ayuda necesitas; practica el idioma, no un diagnóstico.
Aquí debes llevar casco.|Explica una norma y su motivo.
No debes usar el teléfono durante el examen.|Distingue una prohibición de algo que simplemente no es obligatorio.
¿Tengo que llevar uniforme?|Pregunta por un requisito y confirma la respuesta.
Ahora sé reparar una bicicleta.|Compara una habilidad actual con lo que podías hacer antes.
¿Me prestas tu bolígrafo?|Pide permiso o un objeto de forma cortés y responde.
Ella explica las reglas con claridad.|Describe cómo hace alguien una tarea usando un adverbio.
Me gusta hacer fotos.|Cuenta una afición con un verbo seguido de -ing.
Quiero apuntarme a un club de música.|Explica una intención con un verbo seguido de to e infinitivo.
Prefiero caminar a correr.|Compara dos aficiones y propone una actividad compartida.
Si llueve, nos quedaremos dentro.|Prepara un plan alternativo para una condición posible.
Si me acuesto tarde, me siento cansado o cansada.|Relaciona una condición habitual con su resultado.
Puede que llueva esta tarde.|Expresa una posibilidad sin presentarla como algo seguro.
Fui a correos para enviar un paquete.|Explica para qué fuiste a un lugar.
¿Podría decirme dónde está el cajero automático?|Pide información cortésmente y comprueba el orden de la pregunta indirecta.
¿Cuánto cuesta enviar este paquete?|Pregunta un precio y aclara qué incluye.
Hay algún problema con la pantalla.|Describe un fallo usando something, anything o nothing.
Primero, abre el correo y descarga el archivo adjunto.|Da dos instrucciones digitales sencillas y comprueba el orden.
Estoy intentando subir una foto.|Di qué intentas hacer y en qué paso aparece el problema.
Antes iba caminando a la escuela, pero ahora voy en autobús.|Compara una costumbre anterior con tu situación actual.
La noticia me sorprendió.|Distingue cómo se siente una persona de lo que provoca ese sentimiento.
Aunque estaba nervioso o nerviosa, me uní al grupo.|Cuenta un cambio incluyendo una dificultad y un contraste.
Hola, Ben. Gracias por tu mensaje.|Empieza un mensaje, explica su propósito y pide una respuesta concreta.
Perdí el autobús, así que llegué tarde.|Conecta un hecho con su causa o su resultado.
Estudio inglés los lunes.|Escribe un mensaje breve y revisa tiempo, orden y puntuación.
Normalmente viajo en autobús, pero ayer fui andando.|Cuenta un hábito y una excepción pasada usando tiempos distintos.
Prefiero el autobús porque es más barato. ¿Y tú?|Justifica una preferencia e invita a otra persona a responder.
Creo que deberíamos elegir el tren más temprano.|Propón una solución y apóyala con una razón.
''',
'b1': '''
Practico un poco todos los días.|Contrasta una rutina con un cambio que estás intentando hacer.
Entiendo la idea principal.|Explica qué entiendes y qué estás haciendo para mejorar.
Tomo apuntes porque me ayudan a recordar.|Amplía una respuesta breve con una razón y un ejemplo.
Estaba esperando cuando llegó el tren.|Cuenta un acontecimiento y la situación en la que ocurrió.
El tren se había ido antes de que llegáramos.|Explica qué había pasado antes de un problema.
Al principio no sabía qué hacer.|Cuenta una historia con inicio, cambio y desenlace.
He participado en dos proyectos.|Cuenta una experiencia relevante para una situación actual.
Conozco a Sara desde hace tres años.|Explica desde cuándo conoces a alguien o haces una actividad.
¿Has organizado alguna vez un evento?|Pregunta por una experiencia y después solicita un detalle pasado.
Llevo toda la mañana trabajando en mi proyecto.|Cuenta una actividad reciente destacando su duración.
He escrito tres páginas.|Contrasta cuánto has terminado con cuánto tiempo llevas trabajando.
Llevo horas mirando la pantalla.|Explica una dificultad como resultado de una actividad reciente.
Antes vivía cerca del mar.|Cuenta un hábito o estado anterior que ya cambió.
Ahora estoy acostumbrado o acostumbrada al ruido.|Distingue algo a lo que ya te adaptaste de algo a lo que te estás adaptando.
Mi antiguo pueblo era tranquilo, mientras que esta ciudad tiene mucho movimiento.|Compara dos etapas de tu vida sin decir que una es mejor en todo.
Vamos a organizar una excursión.|Distingue una intención, un acuerdo y una decisión tomada al hablar.
Te llamaré cuando llegue.|Acuerda qué harás cuando ocurra otra cosa.
¿Estás disponible el viernes por la tarde?|Negocia una fecha y ofrece una alternativa concreta.
Si duermo mal, me siento cansado o cansada.|Explica una relación habitual entre una condición y su resultado.
Si llueve, nos quedaremos dentro.|Prepara un plan y una alternativa para un imprevisto.
Lleva una chaqueta por si hace frío.|Distingue una precaución previa de una acción que depende de una condición.
Si tuviera más tiempo, aprendería a cocinar.|Imagina un cambio en tu situación y explica qué harías.
Si yo fuera tú, pediría consejo.|Da un consejo para una situación ficticia y justifícalo.
Una ventaja sería tener más tiempo libre.|Evalúa dos alternativas imaginarias con una ventaja y un inconveniente.
Debes llevar zapatos cerrados.|Explica una obligación, una prohibición y algo opcional en un lugar.
Deberías leer primero las instrucciones.|Da un consejo práctico y pregunta por un permiso.
Deja la puerta despejada para que la gente pueda salir.|Explica el propósito de una norma.
Las luces están encendidas; debe de haber alguien en casa.|Haz una deducción y menciona la evidencia que la apoya.
Puede que esté trabajando arriba.|Ofrece dos explicaciones posibles sin afirmar que sean hechos.
La pantalla está oscura, pero puede que la batería esté descargada.|Distingue lo que observas de lo que supones y propone cómo comprobarlo.
El papel se recoge todos los viernes.|Describe un proceso centrándote en lo que ocurre.
Los artistas locales diseñaron los carteles.|Decide si importa más la acción o quién la hizo y formula la frase.
Primero, las botellas se clasifican por colores.|Explica tres pasos de un proceso sencillo.
Ella dijo que estaba ocupada.|Transmite un mensaje indicando quién lo dijo.
Ella preguntó si yo estaba libre.|Cuenta una pregunta o una petición de otra persona.
El guía dijo que la excursión empezaría al día siguiente.|Transmite un aviso cambiando las referencias de persona y tiempo necesarias.
La mujer que lleva la cafetería es mi vecina.|Identifica a una persona con información necesaria.
Este es el parque donde nos conocimos.|Describe un lugar importante o a quién pertenece algo.
Mi hermana, que vive cerca, puede ayudar.|Añade información extra sobre una persona ya identificada.
Me gusta aprender nuevas habilidades.|Usa dos verbos con sus estructuras habituales en un plan personal.
Me interesa estudiar en el extranjero.|Explica un interés y el propósito de una actividad.
Dejó de hablar cuando empezó la película.|Crea dos situaciones que distingan dejar de hacer algo de parar para hacerlo.
Esta opción es mucho más barata.|Compara dos opciones indicando el tamaño de la diferencia.
La maleta es demasiado pesada para llevarla.|Explica por qué algo supera un límite o resulta suficiente.
Vale la pena considerar la reparación.|Recomienda una opción y justifícala con dos criterios.
Necesitamos menos botellas de plástico.|Propón reducir o aumentar recursos distinguiendo contables e incontables.
Unas cuantas personas se ofrecieron a ayudar.|Describe una cantidad escasa y explica si es suficiente para tu propósito.
Cada persona puede llevarse un cuaderno.|Reparte materiales e indica qué corresponde a cada persona.
Nos quedamos dentro porque estaba lloviendo.|Une un hecho con su causa y después con su consecuencia.
Aunque hacía frío, salimos.|Expresa un contraste usando una estructura completa.
En mi opinión, las bibliotecas son importantes.|Escribe un párrafo con idea principal, razón y ejemplo.
¿Puedes decirme dónde está el mostrador?|Pide información de manera cortés sin invertir el orden de la pregunta indirecta.
Mi vuelo se ha retrasado.|Explica un problema de viaje con los datos necesarios para recibir ayuda.
¿Sería posible tomar un autobús más tarde?|Pide una alternativa y confirma sus condiciones.
Compré estos auriculares la semana pasada.|Describe una compra y un defecto con hechos concretos.
Quisiera un reemplazo.|Pide una solución razonable e indica por qué la necesitas.
Lamento el problema.|Responde a una reclamación y acuerda el siguiente paso.
Puedo organizar tareas de grupo.|Describe una habilidad y demuestra su uso con un ejemplo.
He trabajado con diferentes equipos.|Relaciona una experiencia previa con un objetivo actual.
Nuestro grupo tenía un plazo ajustado.|Cuenta una situación, tu acción y el resultado obtenido.
Según el aviso, la carretera está cerrada.|Transmite información e indica de dónde procede.
Comprueba la fecha antes de compartir la publicación.|Explica dos comprobaciones antes de confiar en un mensaje.
Puede que esta sea una fotografía antigua.|Resume información dudosa dejando claro qué falta por verificar.
Sugiero que quedemos más temprano.|Haz una sugerencia y pide la opinión del grupo.
Entiendo tu punto de vista, pero tenemos poco tiempo.|Discrepa de una propuesta reconociendo primero una parte válida.
Contactaré con el lugar antes del viernes, como máximo.|Cierra un acuerdo dejando claros responsable, acción y plazo.
La historia era conmovedora.|Describe una experiencia y explica qué reacción te produjo.
Recomiendo visitar la exposición.|Recomienda algo incluyendo una razón y una limitación.
Disfruté especialmente de la música en directo.|Adapta una recomendación a los gustos de una persona concreta.
El mes pasado organicé un pequeño evento.|Cuenta un proyecto usando los tiempos que aclaren la secuencia.
Creo que el plan funcionó porque se unieron más personas.|Justifica una valoración y prepara una respuesta a una objeción.
La idea principal que quiero expresar es sencilla.|Revisa un mensaje para que una persona entienda su idea principal.
''',
'b2': '''
Llevo toda la mañana trabajando en este informe y todavía no está terminado.|Contrasta un resultado terminado con una actividad reciente que aún continúa.
Cuando llegué a la estación, el tren ya se había ido.|Cuenta un problema distinguiendo el hecho principal y una causa anterior.
Estoy acostumbrado o acostumbrada a trabajar con personas de distintas zonas horarias.|Compara un hábito anterior, una adaptación en marcha y algo ya familiar.
Según el horario, el tren sale a las siete.|Organiza un viaje distinguiendo un horario publicado, un acuerdo y una previsión.
Para el viernes habremos completado la primera etapa.|Explica qué estará terminado para una fecha y qué seguirá en marcha.
Enviaremos la invitación una vez que todos hayan confirmado.|Acuerda un plazo condicionado a que otra tarea se complete.
Si hubiéramos comprobado la dirección, habríamos encontrado el edificio.|Revisa un error pasado y explica una consecuencia alternativa.
Si hubiera aceptado ese trabajo, ahora viviría en el extranjero.|Relaciona una decisión pasada imaginaria con una situación presente distinta.
Podemos usar la sala siempre que la dejemos limpia.|Negocia una posibilidad dejando clara la condición que la limita.
Ojalá tuviera más tiempo para practicar hoy.|Expresa un deseo sobre una situación actual que quisieras cambiar.
Ojalá hubiera guardado una copia antes de que el portátil dejara de funcionar.|Expresa un arrepentimiento pasado y una medida para la próxima vez.
Preferiría hablar de esto en persona.|Expresa una preferencia y una queja sin sonar innecesariamente agresivo.
El suelo está mojado. Alguien debe de haber derramado agua.|Formula una deducción pasada, indica su evidencia y admite otra posibilidad.
Compré una entrada, pero el acceso era gratuito. No hacía falta que la comprara.|Distingue una acción realizada innecesariamente de una obligación inexistente.
A pesar de la cerradura rota, conseguimos abrir la puerta.|Cuenta una dificultad pasada y cómo lograste resolverla.
Esta semana están reparando el puente, por lo que el tráfico está restringido.|Informa de un cambio de servicio centrándote en el proceso y su efecto.
Llevé mi portátil a una tienda local para que lo repararan.|Explica un servicio que encargaste sin dar a entender que lo hiciste tú.
Se cree que el cuadro fue robado anoche.|Transmite una información atribuida sin presentarla como certeza propia.
Ella me dijo que había terminado el borrador el día anterior.|Transmite un mensaje revisando las referencias de persona y tiempo.
Ella preguntó dónde estaba la estación más cercana.|Resume una consulta y una instrucción manteniendo su intención.
Él admitió haber perdido la llave.|Elige un verbo que distinga admitir, sugerir o prometer algo.
Mi vecino, que trabaja en la biblioteca, me recomendó el libro.|Distingue información que identifica a una persona de un detalle adicional.
Esta es la sala donde hicimos la entrevista.|Describe un lugar relacionándolo con una experiencia y una referencia clara.
Los documentos entregados ayer se están revisando.|Describe documentos o personas con una relativa reducida sin perder claridad.
Tenemos muchas ganas de conocer al nuevo grupo.|Expresa una expectativa usando la estructura completa de la expresión.
Recuerda cerrar la puerta con llave cuando salgas.|Contrasta recordar hacer algo con recordar haberlo hecho.
Nos permitieron usar la sala.|Explica quién permitió una acción y quién la realizó.
Ella me dio unos consejos útiles.|Da información nueva y después refiérete a ella sin errores de artículo o cantidad.
Tenemos un poco de tiempo, así que podemos revisar un ejemplo más.|Describe un recurso limitado e indica si alcanza para un propósito.
El número de solicitudes ha aumentado.|Comunica un cambio numérico con una referencia y concordancia claras.
Esta opción es considerablemente más barata que la original.|Compara alternativas indicando la magnitud de las diferencias.
Las instrucciones eran lo bastante claras para que todos pudieran seguirlas.|Explica si una condición es suficiente para conseguir un resultado.
Apenas he tenido tiempo para repasar esta semana.|Describe un límite usando un adverbio cuyo alcance quede claro.
A pesar del retraso, la sesión fue útil.|Concede una dificultad y explica por qué no invalida tu conclusión.
Salimos temprano para poder comprobar el equipo.|Relaciona una decisión con su propósito y distingue propósito de resultado.
El plan ahorra tiempo. Además, reduce los gastos de impresión.|Construye un párrafo en el que cada frase añada algo al argumento.
La nueva organización ofrece mayor flexibilidad.|Reformula una idea cambiando la familia de una palabra y su función.
Tenemos que tomar una decisión hoy.|Usa una colocación completa para explicar una decisión o responsabilidad.
La música está alta. Por favor, bájala.|Da una instrucción con un phrasal verb y un pronombre en el lugar adecuado.
Los resultados sugieren que el método puede ayudar a algunos estudiantes.|Formula una conclusión cuya fuerza corresponda a la evidencia disponible.
Es cierto que el plan cuesta más, pero facilita el acceso a más personas.|Reconoce una objeción y responde con una ventaja justificada.
Lo que necesitamos es una explicación más clara.|Destaca el punto central de una propuesta sin exagerarlo.
El autor sugiere que los resultados necesitan más investigación.|Distingue lo que un texto demuestra de lo que propone investigar.
Según el informe, la muestra era pequeña.|Resume una fuente conservando una limitación importante.
¿Podrías explicar qué significa el término?|Pide aclaración de un concepto y después explícalo con palabras sencillas.
¿Qué tal si pasamos la reunión al martes?|Propón un cambio y deja espacio para que otras personas respondan.
Puedo terminar para el viernes si me envías los datos hoy.|Negocia una entrega indicando compromiso, condición y plazo.
Yo era responsable de coordinar al voluntariado.|Demuestra una habilidad con situación, acción propia y resultado.
El titular afirma que el servicio es completamente fiable.|Distingue una afirmación del titular de una conclusión comprobada.
La función permite a los usuarios comparar distintas versiones.|Explica una función tecnológica y una consecuencia o limitación concreta.
¿Podrías decirme de dónde sale esa cifra?|Cuestiona una afirmación pidiendo la fuente de forma cortés.
La asistencia subió de cuarenta a sesenta personas.|Describe un cambio numérico sin inventar la causa.
Crear una zona de espera con sombra mejoraría el confort cuando haga calor.|Propón una mejora urbana y evalúa un beneficio y un posible coste.
El objetivo de este informe es evaluar las opciones disponibles.|Abre un informe indicando propósito, alcance y criterios.
¿Podría decirme dónde para el autobús?|Pide una información precisa y verifica que entendiste la respuesta.
Por mi experiencia, los acuerdos tienden a ser más flexibles en contextos informales.|Compara experiencias culturales sin generalizar a todo un grupo.
Lo que quise decir es que necesitábamos una sala más tranquila.|Repara un malentendido reformulando tu intención.
Me estoy acostumbrando a hacer pausas cortas entre tareas.|Describe una adaptación en marcha y un hábito que la facilita.
Podrías probar a planificar una tarea manejable para cada sesión.|Da una sugerencia condicionada a la situación de la persona.
Preferiría terminar una tarea antes de empezar otra.|Expresa una preferencia y negocia un límite de tiempo o de carga.
La historia sigue a una familia que vuelve a su pueblo.|Resume una trama sin revelar su desenlace ni perder el hilo.
El final me resultó decepcionante.|Evalúa una obra con un criterio y un ejemplo concreto.
Vale la pena visitar la exposición.|Recomienda una experiencia para un público específico e indica una limitación.
Escribo para consultar las fechas disponibles.|Empieza un correo formal dejando claro por qué escribes.
La confirmación indicaba que la entrega estaba incluida.|Presenta una reclamación con evidencia y pide una solución concreta.
Mi experiencia me ha ayudado a desarrollar buenas habilidades de organización.|Relaciona una experiencia con los requisitos de una solicitud.
Entiendo lo que quieres decir, pero me preocupa el calendario.|Discrepa manteniendo el turno y señalando una preocupación concreta.
Nunca lo he probado. — Yo tampoco.|Reacciona a una afirmación y comprueba el auxiliar de tu respuesta breve.
Si no recuerdo una palabra, puedo describir lo que significa.|Explica una palabra sin decirla y comprueba si otra persona puede entenderte.
Si hubiéramos comprobado antes las cifras, habríamos detectado el error.|Revisa una decisión pasada y convierte lo aprendido en una propuesta futura.
El informe revisado incluye la condición que faltaba en la primera versión.|Compara dos versiones de un mensaje y explica qué mejora de significado aporta la revisión.
Tengo ganas de usar estas habilidades en un nuevo proyecto.|Elige una habilidad, un uso real y una evidencia observable para tu próxima semana.
'''
}
files={'a1':'course.json','a2':'course-a2.json','b1':'course-b1.json','b2':'course-b2.json'}
out={}
for level,raw in DATA.items():
 rows=[line.split('|') for line in raw.strip().splitlines()]
 units=json.loads((ROOT/'src'/files[level]).read_text())['units']
 assert len(rows)==72 and all(len(r)==2 for r in rows), (level,len(rows))
 out[level]=[[{'en':r['examples'][0],'es':rows[j*3+i][0],'task':rows[j*3+i][1]} for i,r in enumerate(u['rules'])] for j,u in enumerate(units)]
(ROOT/'src/teacher-notes.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('288 modelos traducidos y 288 tareas específicas de uso.')
