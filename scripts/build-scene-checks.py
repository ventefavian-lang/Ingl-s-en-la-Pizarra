"""Una comprobación del mensaje con evidencia, para cada escena del curso."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
DATA={
'a1': '''
¿Adónde tiene que ir Mia para encontrar el aula tres?|Al aula de al lado.|Al colegio de Sara.|A la cafetería.|6|Leo corrige la confusión: están en el aula dos y el aula tres está al lado.
¿Qué le piden a Mia que escriba en la tarjeta?|Su nombre.|Su dirección.|El nombre de un país.|6|Después de deletrear Reed, Leo pide que Mia ponga su propio nombre en la tarjeta.
¿Por qué la hermana de Ella no está en casa?|Porque está en el colegio.|Porque está tocando en un concierto.|Porque vive en Canadá.|6|Ella dice que su hermana Sara está en el colegio. No dice que se haya mudado.
¿Cuándo van a tocar música juntos?|El sábado a las diez.|El viernes después de cenar.|Todos los días a las siete.|7|Ella está libre el sábado por la mañana y acuerdan quedar a las diez.
¿Qué tipo de agua pide el cliente?|Sin gas.|Con gas.|No pide agua.|7|Después de rechazar la leche, pide agua y elige still: sin gas.
¿Cuánto cuesta el pedido?|Seis libras.|Doce libras.|Dos libras.|4|Nora indica el total antes de hablar de dónde puede sentarse el cliente.
¿Dónde están los probadores?|Allí, a la izquierda.|Junto a la parada del autobús.|Al fondo a la derecha.|6|La indicación sirve para que el cliente vaya a probarse la chaqueta.
¿Qué decide comprar el cliente?|La chaqueta, sin paraguas.|Solo el paraguas.|La chaqueta y dos paraguas.|7|Rechaza el paraguas porque ya tiene uno y confirma que se lleva la chaqueta.
¿Qué autobús lleva al museo?|El doce.|El diez.|El cinco.|4|El número doce es la línea. Diez se refiere a los minutos aproximados del viaje.
¿Qué ayuda pide el pasajero después de comprar el billete?|Que le avisen al llegar al museo.|Que le reserven una habitación.|Que cambien la ruta al parque.|5|Pide que le indiquen cuándo llegan; el conductor le sugiere sentarse cerca de la parte delantera.
¿Dónde han quedado para el paseo?|En la entrada junto al café.|Dentro del autobús.|En el colegio.|6|Confirman una entrada concreta para poder encontrarse.
¿Por qué estaba cansado el personaje después de la película?|Porque la película fue muy larga.|Porque llegó a casa después de medianoche.|Porque perdió el autobús.|5|Dice que la película estuvo bien, pero fue muy larga. Después aclara que llegó a casa a las siete.
''',
'a2': '''
¿Qué es diferente en la rutina de esta semana?|Trabaja desde casa.|Sale a las cinco para trabajar.|No puede compartir la cocina.|5|La persona normalmente sale a las siete, pero esta semana trabaja desde casa: hábito frente a situación temporal.
¿Qué acuerdo ayuda a resolver el problema de la música?|Usar auriculares por la noche.|Dejar de hablar durante toda la semana.|Mudarse ese mismo día.|4|El acuerdo cambia cómo se escucha la música; no prohíbe toda actividad compartida.
¿Cuál es el plan si llueve el día del picnic?|Ir al piso de Nora.|Cancelar sin avisar.|Quedarse junto al lago de todas formas.|6|Nora propone su piso porque hay espacio para todos y acuerdan avisar si cambia el lugar.
¿Qué responde Nora al retraso hasta las doce y media?|Que no es demasiado tarde y guardarán comida.|Que ya no puede entrar.|Que debe llevar una tienda de campaña.|6|La respuesta tranquiliza a la persona retrasada y mantiene el plan.
¿Qué debe recordar el viajero sobre la alternativa de tren?|Andén cinco y cambio en Reading.|Andén doce y sin cambios.|Devolver el billete y caminar al hotel.|7|La persona repite los datos al final para comprobar que entendió la alternativa.
¿Qué solución pide el huésped para el ruido?|Una habitación más tranquila en la parte de atrás.|Una habitación junto al ascensor, obligatoriamente.|Cancelar el desayuno.|5|El personal ofrece una habitación atrás y el huésped pide quedarse con esa.
¿Qué solución solicita el cliente para los auriculares?|Cambiarlos por el mismo modelo si es posible.|Comprar un teléfono nuevo.|Pedir una devolución sin mostrar el recibo.|7|Tiene el recibo, pide un cambio y precisa que prefiere el mismo modelo.
¿Qué nombre debe seleccionar al conectar los auriculares?|El que termina en 24.|Siempre el primer nombre de la lista.|El que no tiene números.|6|Noah da un detalle concreto para distinguir dos nombres que aparecen en pantalla.
¿Qué debe hacer si alguien necesita ayuda en la entrada?|Llamar por la radio sin dejar la entrada sola.|Salir a buscar a la persona y abandonar la entrada.|Cobrar dinero antes de responder.|6|Mia da un canal para pedir ayuda y aclara la norma de no dejar la entrada desatendida.
¿Dónde debe esperar la visitante?|Junto a las sillas azules.|Dentro del museo.|En la calle, lejos de la entrada.|5|La ubicación permite a Sam encontrarla cuando llegue a ayudar.
¿Por qué la excursión no fue del todo decepcionante?|Conocieron a otros excursionistas y compartieron comida.|Porque no llegó a llover.|Porque habían reservado un hotel de lujo.|7|El mal tiempo cambió el plan, pero la conversación rescata una experiencia positiva.
¿Qué deciden para su primera experiencia de acampada?|Empezar con una noche y preparar una lista.|Ir una semana sin preparar nada.|Comprar una tienda antes de hablar con el primo.|6|Proponen una duración manejable, pueden pedir prestada la tienda y harán una lista antes de reservar.
''',
'b1': '''
¿Qué hará primero la nueva persona del proyecto?|Preparar las preguntas y enviarlas para revisión.|Hacer veinte entrevistas esa misma mañana.|Publicar un informe sin consultar a nadie.|7|La respuesta final convierte el encargo en un siguiente paso concreto antes del viernes.
¿Cómo van a mejorar las preguntas del cuestionario?|Pedir que prueben la tarea y describan qué ocurre.|Preguntar solo si les gusta la tecnología.|Añadir preguntas más largas sin probarlas.|4|La sugerencia busca información de una experiencia concreta, y después probarán las preguntas con dos personas.
¿Qué ocurrió antes de llegar al lugar correcto?|El tren ya se había ido.|La amiga ya había comido con el empleado.|El viajero había terminado la excursión.|4|La pregunta de la amiga confirma el orden: primero salió el tren y después llegó el viajero.
¿Qué harán antes de empezar el nuevo plan de la tarde?|Comprobar el horario del último autobús.|Comprar un billete sin mirar la hora.|Descartar cualquier alternativa si llueve.|7|El acuerdo incluye una alternativa si llueve y una comprobación que evita quedarse sin transporte de vuelta.
¿Quién se ocupa de contactar con quien tomó prestado un libro dañado?|La bibliotecaria.|La nueva persona voluntaria, sin consultar.|La persona que espera en la puerta.|6|La instrucción distingue revisar y separar el libro de contactar al usuario.
¿Qué pueden afirmar con seguridad sobre el libro mojado?|Que está mojado, pero no cómo ocurrió.|Que una persona concreta lo dañó intencionalmente.|Que la ventana siempre está rota.|7|Separan el hecho observado de las posibles explicaciones y evitan culpar sin evidencia.
¿Qué pide confirmar el cliente por correo?|Las fechas de recogida y entrega.|El nombre de todos los empleados.|Que nunca necesitará enviar fotos.|7|Pide fechas por escrito para organizarse y estar en casa.
¿Qué se acuerda finalmente para la lámpara?|Recogida y entrega el jueves.|Entrega garantizada a una hora exacta el miércoles.|Solo una devolución del dinero.|7|La persona confirma ambos servicios para el jueves; la tienda no garantiza una hora exacta.
¿Qué aclara el aviso oficial del centro cultural?|El edificio cierra un día y las clases pasan a ser virtuales.|Que todas las clases terminan para siempre.|Que las reparaciones ya acabaron hace un mes.|7|Revisar la fuente evita convertir un cierre temporal del edificio en una cancelación general de clases.
¿Qué incluirá el mensaje corto para el amigo?|Hora, enlace y dónde pedir ayuda.|Una traducción de toda la web.|Solo una opinión sobre las clases virtuales.|7|La mediación selecciona los datos que la otra persona necesita para actuar.
¿Para qué proponen enviar primero el tráiler?|Para que el grupo pueda valorar la película.|Para demostrar que nadie puede discrepar.|Para sustituir la película por una charla.|7|La recomendación tiene en cuenta gustos y duración, y el tráiler ayuda al grupo a decidir.
¿Con qué condición ofrece la persona volver a poner su casa?|Que otra persona se ocupe de la comida.|Que una sola persona haga todas las tareas.|Que nadie pueda elegir la película.|7|El acuerdo distribuye trabajo: casa por una parte y comida por otra.
''',
'b2': '''
¿Qué entrega se compromete a tener lista en la fecha adelantada?|Páginas informativas y formulario; los pagos irán después.|Toda la plataforma con pagos sin limitaciones.|Solo un informe sobre contratar más personas.|7|La propuesta delimita el alcance y separa lo que puede entregarse con calidad de lo que requiere otra semana.
¿Qué limitación deben comunicar a los usuarios en el lanzamiento?|Las reservas se confirmarán manualmente la primera semana.|No será posible consultar ninguna información.|Todos los pagos estarán automatizados desde el primer día.|5|Aclaran el malentendido explicando el funcionamiento temporal y lo dejan escrito en las notas del lanzamiento.
¿Qué reconocen ambas personas sobre la reserva equivocada?|Que deberían haber revisado los detalles.|Que la recepcionista eligió mal el destino.|Que conocen con certeza la causa exacta de todo.|4|Revisan su actuación sin confundir las deducciones sobre el error con hechos ya comprobados.
¿Cómo deciden resolver el gasto extra?|Repartirlo por mitades y dar el asunto por cerrado.|Dejarlo sin hablar hasta que genere más tensión.|Exigir que lo pague íntegramente el hotel.|6|La transferencia de la mitad concreta un acuerdo que pretende cerrar el conflicto.
¿Por qué no recomiendan el curso de productividad todavía?|Faltan detalles del método y de los participantes.|Porque un resumen demuestra que todos los cursos son inútiles.|Porque el equipo ya hizo un experimento controlado.|4|No conocer el tamaño de la muestra y otros detalles impide extender la conclusión con confianza a todo el equipo.
¿Qué siguiente paso propone la persona antes de comprar la formación?|Pedir detalles y valorar un piloto pequeño con criterios claros.|Comprar para toda la empresa porque hubo una mejora.|Rechazar para siempre cualquier formación.|7|La recomendación conserva la incertidumbre y propone una forma proporcionada de obtener más información.
¿Qué necesita ver la vecina en la propuesta del jardín?|Compromisos escritos sobre responsabilidad y quejas.|Una promesa de que nunca habrá ningún desacuerdo.|Solo fotografías del terreno.|6|Pide que la gestión de problemas quede incorporada a la propuesta, no solo comentada en la charla.
¿Qué alternativa combina los intereses de ambos grupos?|Uso tranquilo habitual y talleres programados con límites.|Actividades ilimitadas todos los días.|Prohibir cualquier reserva sin revisarlo después.|4|El compromiso combina tipos de uso, avisos y límites, con una revisión tras probar el calendario.
¿Qué pide el cliente tras explicar la falta de accesibilidad?|Una respuesta escrita con la solución que puedan ofrecer.|Que exageren los hechos en la web.|Que se ignore la información de la reserva.|7|La reclamación señala el impacto, pide corregir la información y solicita una solución documentada.
¿Por qué la reseña recomendará la visita con reservas?|Distingue la calidad del guía de los problemas de información.|Porque todo fue perfecto desde el principio.|Porque la empresa se negó a corregir cualquier cosa.|7|Una reseña equilibrada reconoce la respuesta de la empresa y explica para quién resulta adecuada la experiencia.
¿Qué propone para complementar las series?|Conversaciones cortas que exijan recordar y recibir comentarios.|Abandonar toda escucha de inglés.|Elegir un único método para todas las personas.|7|Reconoce la utilidad de escuchar y añade producción y revisión de errores para practicar otra parte de la habilidad.
¿Cuándo acuerdan corregirse mientras hablan?|En el momento si se pierde el sentido; lo demás, después.|Después de cada palabra aunque se entienda todo.|Nunca, aunque dejen de entenderse.|5|El acuerdo protege el intercambio y reserva una o dos mejoras para comentarlas al terminar.
'''
}
out={}
stories=json.loads((ROOT/'src/conversations.json').read_text())
for level,raw in DATA.items():
 rows=[r.split('|') for r in raw.strip().splitlines()]
 assert len(rows)==12
 for n,row in enumerate(rows):
  assert len(row)==6
  story=stories[level][n//2];episode=n%2
  out[f'{level}-{story["id"]}-{episode}']={'question':row[0],'answer':row[1],'options':row[1:4],'evidence':int(row[4]),'why':row[5]}
(ROOT/'src/scene-checks.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('48 comprobaciones de comprensión con evidencia del diálogo.')
