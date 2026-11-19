from common import unit,rule
unit('Medios, tecnología y credibilidad','Reading the digital world','📰','Comparar fuentes, identificar intención y debatir tecnología con afirmaciones proporcionadas.',[
rule('Hecho, opinión y atribución','Un hecho se puede comprobar; una opinión interpreta o evalúa. Un texto puede combinarlos en una misma frase. According to, reportedly y the author argues atribuyen afirmaciones sin hacerlas automáticamente verdaderas. Examina quién publica, qué evidencia presenta y qué interés puede tener. Las palabras emocionales pueden orientar la reacción del lector. Resume primero lo verificable y después describe la interpretación del autor.','The report states…; The author appears to…; The evidence does not establish…','Un titular puede omitir condiciones que sí aparecen en el cuerpo.',
'The headline claims {that} the service is completely reliable.|what|which that',
'The figures have not {been independently checked}.|being independently checked|independently checking',
'The article appears to promote a product rather than compare several options.'),
rule('Tecnología y consecuencias','Usa pasivas para procesos y condicionales para consecuencias posibles. Distinguish enable someone to do de prevent someone from doing. Be likely to y may pueden presentar efectos probables sin prometerlos. Al explicar una herramienta, separa lo que puede hacer de lo que has comprobado que hace bien. Compara beneficios, límites y qué información necesitaría una persona antes de usarla.','enable + person + to; prevent + person + from -ing','No confundas acceso a una herramienta con garantía de resultado.',
'The feature enables users {to compare} different versions.|comparing|compare to',
'A clear warning may prevent people {from sharing} the wrong file.|to share|of share',
'If the connection fails, the changes may not be saved immediately.'),
rule('Responder y corregir en línea','Una corrección clara identifica el error, aporta la información relevante y evita atacar a la persona. I may have misunderstood… y Could you point me to… permiten pedir evidencia. En mensajes escritos faltan gestos y tono, así que explicita intención y evita ambigüedad innecesaria. Si corriges un mensaje propio, indica qué cambió para que quienes leyeron la primera versión puedan actualizar su comprensión.','Could you point me to the source?; The earlier message should have said…','Distingue una pregunta de una acusación cuando no conoces todos los hechos.',
'Could you tell me where the figure {comes from}?|does come from it|from comes does',
'The earlier message should {have included} the date.|had included|to include',
'I may have misunderstood your point; are you referring to the trial or the final service?')],
'''headline|titular|The headline leaves out an important condition.
coverage|cobertura informativa|The coverage focuses mainly on the benefits.
source|fuente|Can you identify the original source?
verify|verificar|We should verify the figure before sharing it.
misinformation|información falsa o inexacta|A correction can help limit misinformation.
privacy|privacidad|Users should understand the privacy settings.
permission|permiso|The app asks for permission to use the microphone.
reliable|fiable|The tool is useful but not always reliable.
transparent|transparente|The report should be transparent about its limitations.
algorithm|algoritmo|An algorithm selects which posts appear first.
recommendation|recomendación|A recommendation may reflect earlier choices.
engagement|participación o interacción|High engagement does not necessarily mean agreement.
access|acceso|Not every household has equal access to devices.
digital divide|brecha digital|The digital divide affects how people use online services.
back up|hacer una copia de seguridad|Remember to back up your work regularly.
log in|iniciar sesión|You need to log in to see your saved progress.
sign up|registrarse|Participants can sign up through the website.
opt out|elegir no participar|Users should be able to opt out of optional messages.
take down|retirar contenido|The editor agreed to take down the inaccurate notice.
point out|señalar|A reader may point out a missing source.''',
'''A video claimed that a new study application had helped every participant double their test score. The caption linked to a company report, but the report described a smaller and more complicated result. Some participants improved, others remained at a similar level, and several had not completed the final test.

A student sharing the video initially focused on its confident presentation. She later noticed that the speaker was also selling access to the application. This did not automatically make every statement false, but it gave her a reason to inspect the evidence more carefully.

She compared the headline with the report's method and conclusion. The report measured performance on a particular set of exercises after a short trial. It did not assess whether learners could use the language spontaneously in another situation. The student posted a correction explaining this distinction and linked to the relevant section.

Some viewers complained that she was being unnecessarily negative. She replied that the application might still be useful; the problem was the certainty and breadth of the original claim. Evaluating a digital tool meant asking what had been tested and for whom, rather than choosing between complete enthusiasm and complete rejection.''',
'''How did the report differ from the video?|It described varied results and missing final tests.|It proved every score doubled.~It contained no participants.|El vídeo exageró uniformidad.
Why did the sales link matter?|It gave a reason to examine potential interests.|It proved every statement false.~It made the study independent.|Interés comercial no equivale a falsedad automática.
What had actually been measured?|Performance on specific exercises after a short trial.|All spontaneous language use.~Permanent mastery for every learner.|Se delimita alcance.
What was the student's main criticism?|The original claim was too broad and certain.|No digital tool can help.~Any improvement is impossible.|La postura conserva una posibilidad de utilidad.''',
'''A neighbourhood group received a screenshot saying that a road would close for a month. The image had no visible date. Several people shared it before someone found the original notice, which referred to a closure from the previous year.

The information had once been accurate, but its missing context made it misleading when circulated again. The administrator added the original date and a link to the current transport notice. She also asked members to include dates when sharing announcements. Checking a source involved more than asking whether the words had ever been true.''',
'''What important detail was missing?|The date.|The colour of the road.~The group name only.|El contexto temporal era decisivo.
Was the original notice necessarily fabricated?|No, it referred to an earlier closure.|Yes, no road had ever closed.~The text does not allow any date.|Información antigua puede reaparecer como actual.
What did the administrator add?|The original date and a current source.|A new unsupported claim.~A longer emotional headline.|La corrección repone contexto.
What principle does the case illustrate?|Accuracy depends partly on context and timing.|Screenshots are always reliable.~Old information is always useless.|Se distingue verdad pasada de pertinencia actual.''',
'''Before using the new platform, please check which features work without signing in and which require an account. Your draft can be saved locally, but it will only appear on another device after it has been synchronised. A successful login does not by itself prove that the latest changes have reached the server. If you see a pending message, keep the tab open and check the connection. You can also download a copy of your work. When describing the platform to others, avoid saying that data can never be lost. Explain the available safeguards and how to check that a save has completed.''',
'''What is needed to access the latest draft on another device?|Successful synchronisation.|Only seeing a login button.~Changing the page colour.|Acceso y sincronización son distintos.
What should users do with a pending message?|Check the connection and save status.|Assume everything is already saved.~Delete the draft immediately.|La comprobación protege trabajo.
What claim should be avoided?|Data can never be lost.|A backup can be downloaded.~Some features require an account.|Es una promesa absoluta injustificada.''',
'Escribe 140–190 palabras evaluando una afirmación tecnológica ficticia. Distingue lo probado, lo posible y lo que aún falta comprobar.',
'''The advertisement for the new study platform claims that it guarantees fluent conversation after a short course. The demonstration shows several useful features, including audio practice and immediate feedback on fixed-answer exercises. These may help learners notice mistakes and review regularly.

However, the evidence presented does not support the guarantee. The examples show users answering familiar questions, not responding to unexpected information in a real conversation. The advertisement also does not explain how long the users practised or whether people with different starting levels achieved similar results.

I would consider the platform a possible practice tool rather than proof that a particular level has been reached. Before recommending it, I would want to test whether its activities help learners use the language in new situations and whether its feedback is accurate.

The company could make its message more convincing by describing the limits of the demonstration and publishing a clearer account of the evaluation. A useful tool does not need an unrealistic promise to be worth trying.''',
'Compara un titular con su explicación completa. Tu compañero debe identificar qué parte es dato, interpretación y promesa no comprobada.',
'''The feature lets users compare versions. Complete: It enables users ___ versions.|to compare|Enable + objeto + to.
The warning stops people from sharing it. Complete: It prevents people ___ it.|from sharing|Prevent + objeto + from -ing.
Who produced this figure? Complete: Do you know who ___ this figure?|produced|Pregunta indirecta sin inversión innecesaria.
Someone has checked the claim. Complete: The claim has ___ .|been checked|Pasiva de present perfect.''',
'''The information was ___.|ACCURATE|inaccurate|La tarea pide la forma negativa.
Users need greater ___.|TRANSPARENT|transparency|Nombre de la cualidad.
The website requires ___.|REGISTER|registration|Sustantivo del registro.
The claim needs independent ___.|VERIFY|verification|Nombre de verificar.''',
'Escucha crítica: presta atención a may, all, always y only. Una palabra breve puede cambiar el alcance de una afirmación.')

unit('Ambiente, ciudades y propuestas','Improving our shared spaces','🌍','Describir tendencias, comparar efectos y proponer acciones con ventajas, costes y condiciones.',[
rule('Describir tendencias sin inventar causas','Rise, fall, remain stable y fluctuate describen movimiento; sharply, gradually y slightly añaden grado. By indica cuánto cambia una cifra; to señala su valor final. From… to… fija inicio y final. Distingue percentage points de un cambio porcentual relativo. Si solo observas dos variables que cambian juntas, evita presentar automáticamente una como causa de la otra.','rose by 10; rose to 40; fell from 50 to 35','De 20% a 30% son 10 puntos porcentuales, no un aumento relativo del 10%.',
'Attendance rose {from} forty to sixty.|by|with',
'The total fell {by} ten, from fifty to forty.|to|at',
'The figures remained relatively stable during the final month.'),
rule('Proponer y evaluar efectos','Should y could permiten recomendar con distinta fuerza. Would + base describe un efecto esperado de una medida hipotética; might reconoce incertidumbre. Incluye quién se beneficiaría, quién podría afrontar una dificultad y cómo se reduciría esa dificultad. Una propuesta B2 conecta una acción específica con una razón y una evaluación posterior. No basta con afirmar que algo sería mejor para todos.','We could…; This would…; One possible drawback is…','Describe el mecanismo que conecta la medida con el resultado esperado.',
'Creating a shaded waiting area {would improve} comfort during hot weather.|would improves|will improved',
'The council should consider {testing} the change before expanding it.|test|to testing',
'The plan might reduce traffic, but its effect would need to be monitored.'),
rule('Informes y propuestas con estructura','Un informe distingue propósito, observaciones y recomendaciones. Usa títulos breves cuando ayuden al lector. Presenta los datos como tales y marca las opiniones de residentes como opiniones atribuidas. En la recomendación, concreta una acción, responsable, plazo y criterio de revisión. Si el presupuesto o la muestra son limitados, dilo en la conclusión en vez de ocultarlo en un detalle secundario.','purpose → findings → options → recommendation → review','Una propuesta útil permite comprobar después si la medida funcionó.',
'The aim of this report is {to assess} the available options.|assessing to|assess',
'Residents expressed concern {about} the lack of shade.|for to|with to',
'I recommend a three-month trial followed by a public review.')],
'''sustainable|sostenible|The proposal aims to make local transport more sustainable.
emissions|emisiones|The report compares emissions from different activities.
congestion|congestión|Congestion makes the journey unpredictable.
public transport|transporte público|Reliable public transport can widen access to services.
pedestrian|peatón|The crossing should be clear to every pedestrian.
green space|zona verde|Residents asked for more green space.
shade|sombra|The waiting area has very little shade.
accessibility|accesibilidad|Accessibility should be considered from the start.
waste|residuos o desperdicio|The event produced less waste than last year.
reusable|reutilizable|Visitors were encouraged to bring reusable bottles.
affordable|asequible|Any change should remain affordable for regular users.
impact|impacto|The impact may differ between neighbourhoods.
trade-off|contrapartida entre ventajas|The proposal involves a trade-off between space and parking.
stakeholder|parte interesada|Each stakeholder should understand the proposal.
consultation|consulta pública|The consultation included residents and shop owners.
implement|poner en práctica|The team will implement the change in stages.
monitor|hacer seguimiento|We need to monitor the results of the trial.
gradually|gradualmente|Use of the new route increased gradually.
sharply|bruscamente|Attendance fell sharply during the closure.
remain stable|mantenerse estable|The number of visits may remain stable after the initial rise.''',
'''A town tested closing one street to cars on Saturday mornings. Supporters expected a safer space for pedestrians and more visitors to local shops. Some shop owners worried that customers would find it difficult to collect large purchases. Residents with limited mobility also asked how they would reach nearby services.

During the first month, the number of people walking through the street increased. However, this coincided with a local festival, so the organisers could not attribute the entire rise to the closure. They collected comments and compared several ordinary Saturdays as well.

The trial was adjusted rather than simply extended unchanged. A collection point was created at one end of the street, and access arrangements were clarified for people who needed them. Signs were moved after visitors reported difficulty finding the alternative route.

At the review, the council described both benefits and remaining problems. The street felt more pleasant to many users, but deliveries still required coordination. The decision to continue the trial included a later review date and specific measures of access, footfall and business feedback. Treating the scheme as an experiment made it possible to improve the details without pretending that one rule would meet every need automatically.''',
'''What concern did shop owners raise?|Collecting large purchases could become harder.|No pedestrians ever visited.~The festival had been cancelled.|Se identifica un efecto práctico.
Why could the whole increase not be attributed to the closure?|A festival occurred at the same time.|No figures were collected.~Every Saturday was identical.|Había otra explicación posible.
What adjustment was made?|A collection point and clearer access arrangements.|A permanent ban on deliveries everywhere.~Removal of all signs.|La adaptación responde a dificultades.
What made the continuation conditional?|A later review and specific measures.|A guarantee that everyone agreed.~An end to feedback collection.|Se define evaluación futura.''',
'''A report said that cycling participation rose from twenty per cent to thirty per cent of a group. One summary called this a ten per cent increase. Another called it a fifty per cent relative increase. The difference came from the baseline used.

The clearest version stated the original and final proportions, then explained that the change was ten percentage points. The group also noted that the survey covered one neighbourhood, so the figures could not automatically describe the whole city. Careful language made the result easier to compare without making it less interesting.''',
'''How many percentage points did participation rise?|Ten.|Fifty.~Thirty.|Treinta menos veinte son diez puntos.
What is the relative increase from twenty to thirty?|Fifty per cent.|Ten per cent.~One hundred per cent.|Diez es la mitad de veinte.
What limits the generalisation?|Only one neighbourhood was surveyed.|The numbers were written in English.~No baseline was known.|La muestra delimita alcance.
Which wording is clearest?|State both the initial and final proportions.|Give only the largest-sounding number.~Avoid all numbers.|La referencia permite interpretar.''',
'''Our proposal is to add shade and seating beside the community centre. The aim is to make the waiting area more comfortable, particularly for people who cannot stand for long. We suggest starting with two benches and a temporary shade structure. This would allow us to observe how the space is used before committing to a larger project. One possible drawback is that the entrance could become crowded, so the layout must leave a clear path. After six weeks, volunteers could record usage at different times and ask visitors whether the arrangement meets their needs.''',
'''What is the proposal's main purpose?|Improve comfort in the waiting area.|Increase car parking.~Close the entrance.|Se expresa al inicio.
Why begin with a small trial?|To observe use before a larger commitment.|To avoid ever collecting feedback.~To guarantee permanent success.|La prueba informa ampliación.
What must the layout preserve?|A clear route through the entrance.|Space for advertisements only.~A closed pathway.|Se reconoce una condición de acceso.''',
'Redacta una propuesta de 140–190 palabras para mejorar un espacio común. Incluye observaciones, dos opciones, una desventaja y un plan de evaluación.',
'''Proposal: improving the waiting area

The purpose of this proposal is to make the space outside the community centre more comfortable and accessible. Visitors often wait there before activities, but the area has little shade and only one narrow bench.

One option would be to install a permanent shelter immediately. This could provide good protection, although it would require a larger budget and a careful review of the entrance layout. A second option is a temporary shade structure with two additional benches.

I recommend starting with the temporary arrangement for six weeks. It would be cheaper and could be adjusted if visitors found the position inconvenient. The main limitation is that temporary equipment would need regular checks and secure storage during unsuitable weather.

Volunteers should record how many people use the space at different times and collect brief comments about comfort and access. A clear path must remain available throughout the trial. The final decision should consider this evidence rather than assume that adding furniture automatically improves the area.''',
'Presenta una propuesta a un grupo con intereses distintos. Responde a una objeción sobre coste y otra sobre acceso; termina con un criterio de evaluación.',
'''The total changed from 50 to 40. Complete: It fell ___ ten.|by|By expresa la magnitud del cambio.
The total is now 40 after a fall. Complete: It fell ___ forty.|to|To indica el valor final.
We should test the idea. Complete: I recommend ___ the idea.|testing|Recommend + -ing.
The project aims to improve access. Complete: The aim is ___ access.|to improve|Infinitivo de finalidad.''',
'''The plan should improve ___.|ACCESSIBLE|accessibility|Nombre de la cualidad.
We need a more ___ approach.|SUSTAIN|sustainable|Adjetivo de sostenibilidad.
Public ___ will begin next month.|CONSULT|consultation|Nombre de la consulta.
The change was introduced ___.|GRADUAL|gradually|Adverbio de modo.''',
'Datos orales: contrasta by y to con énfasis claro. Repite el número inicial y final cuando una cifra aislada pueda confundir.')

unit('Viajes y encuentros interculturales','Understanding each other','🧳','Resolver malentendidos, pedir aclaraciones y comparar costumbres sin convertir experiencias individuales en reglas universales.',[
rule('Preguntar con precisión y tacto','Una pregunta indirecta puede suavizar una petición, pero debe conservar una necesidad concreta. Could you tell me…? lleva después orden afirmativo. Cuando la información es crucial, confirma con una reformulación: So, does that mean…? No finjas haber entendido. Pedir que repitan una palabra puede ser menos útil que explicar exactamente qué parte falta.','Could you tell me where…?; Do you mean…?; Am I right in thinking…?','La cortesía depende también de contexto y tono, no solo de una fórmula.',
'Could you tell me where the bus {stops}?|does stop it|stop does',
'Am I right {in} thinking that the ticket includes the return journey?|on|at',
'Would you mind explaining which entrance we should use?'),
rule('Comparar prácticas sin generalizar','People tend to… describe una tendencia, no una regla sin excepciones. In my experience delimita una observación personal. It depends on… reconoce factores como lugar, edad, situación y relación entre personas. Al comparar una costumbre, pregunta por su significado para tu interlocutor y evita asumir que todo el mundo de un país actúa igual.','In my experience…; People sometimes…; It may depend on…','Distingue una observación de una explicación o un juicio.',
'In my experience, arrangements tend {to be} more flexible in informal settings.|being|be to',
'The meaning may depend {on} the relationship between the speakers.|of|at',
'I had assumed that the invitation was formal, but I may have misunderstood.'),
rule('Reparar un malentendido','Explica tu intención, identifica la diferencia y comprueba una interpretación compartida. I meant… no es lo mismo que I said…; puedes reformular sin culpar al oyente. En una reclamación durante un viaje, describe el acuerdo original, el problema y la solución deseada. Escucha la alternativa ofrecida antes de decidir si responde a tu necesidad.','What I meant was…; Let me rephrase that.; Could we agree on…?','Una reformulación útil cambia la explicación, no solo el volumen.',
'What I meant {was} that we needed a quieter room.|were|be',
'I apologise {for} the misunderstanding.|of|to for',
'Could we check the details together before making a new arrangement?')],
'''assumption|suposición|My assumption about the invitation was incorrect.
custom|costumbre|A local custom may have several meanings.
etiquette|normas de trato social|Etiquette can vary with the situation.
hospitality|hospitalidad|We appreciated the family's hospitality.
misunderstanding|malentendido|A short explanation resolved the misunderstanding.
clarify|aclarar|Could you clarify the departure point?
rephrase|reformular|Let me rephrase the question.
confirm|confirmar|Please confirm whether the return journey is included.
interpret|interpretar|People may interpret the same gesture differently.
adapt|adaptarse|It took time to adapt to the new routine.
respectful|respetuoso|A respectful question can prevent an assumption.
flexible|flexible|We need to remain flexible if plans change.
expectation|expectativa|Our expectation did not match the actual arrangement.
arrangement|acuerdo práctico|The arrangement included transport to the station.
destination|destino|Check the destination before boarding.
departure|salida|The departure has been moved to another platform.
accommodation|alojamiento|The accommodation is close to the old town.
reservation|reserva|The reservation was made under my surname.
get around|desplazarse por un lugar|It is easy to get around by bus.
check in|registrarse al llegar|We can check in after three o'clock.''',
'''During a visit to another city, Nina was invited to join a local group's evening meal. The message said to arrive "around seven." She reached the house at exactly seven and found the host still preparing the table. Nina wondered whether she had misunderstood the invitation and felt embarrassed about arriving too early.

Instead of deciding that people in that city were always late, she asked how the group usually organised informal meals. The host explained that guests often arrived over a short period and helped finish the preparations. For a work appointment, however, he would expect a precise arrival time.

Later, Nina described the experience to her classmates. She distinguished what had happened in that household from a claim about an entire culture. The useful lesson was not a universal rule about punctuality. It was the value of clarifying expectations when words such as around, informal or join us leave room for interpretation. She also noticed that offering to help was a more productive response than silently worrying about having made a mistake.''',
'''Why did Nina feel uncertain?|The host was still preparing when she arrived.|She had not been invited.~The address was wrong.|La situación no coincidía con su expectativa.
What distinction did the host make?|Informal meals and work appointments had different expectations.|All appointments were flexible.~Guests should never help.|El contexto cambia la interpretación.
What did Nina avoid in her later account?|Generalising about everyone in the city.|Describing the actual event.~Asking a question.|Una experiencia no define una cultura.
What response proved useful?|Clarifying expectations and offering help.|Silently blaming the host.~Leaving without speaking.|La interacción resuelve la incertidumbre.''',
'''A traveller asked whether breakfast was included. The receptionist replied that it was available every morning, which did not answer the question about price. The traveller almost accepted this as confirmation, then asked more precisely whether the room charge covered breakfast.

The receptionist explained that it was an optional extra. The traveller thanked her and chose a different arrangement. No complicated language was needed. The important skill was noticing that two people were answering different questions and checking the missing detail before acting.''',
'''What distinction mattered?|Available versus included in the price.|Breakfast versus dinner time only.~One city versus another.|La primera respuesta no aclaraba coste.
How was the question improved?|It explicitly referred to the room charge.|It was repeated more loudly.~It omitted breakfast.|Se nombra el dato necesario.
Was breakfast included?|No, it was an optional extra.|Yes, for every guest.~Only the text's author knows.|La aclaración lo establece.
What skill does the case show?|Repairing a mismatch in understanding.|Using the rarest possible vocabulary.~Avoiding further questions.|Se detecta una respuesta insuficiente.''',
'''Welcome to the walking tour. We meet outside the side entrance of the museum, not at the ticket desk. The price includes the guide and the bus journey back to the centre, but refreshments are separate. If you need to leave early, tell the guide before we set off. There is a short section with steps; anyone who would prefer an alternative route can speak to us now. Please check these arrangements rather than assume that every tour follows the same pattern. We will be happy to clarify anything that is uncertain.''',
'''Where is the meeting point?|Outside the side entrance.|At the ticket desk.~Inside the bus station.|El contraste aclara lugar.
What is not included?|Refreshments.|The guide.~The return bus journey.|Separate indica coste adicional.
Who should speak to the guide before departure?|People leaving early or needing an alternative route.|Only people who know the city.~Nobody.|Permite adaptar la organización.''',
'Escribe 140–190 palabras contando un malentendido durante un viaje. Explica las dos interpretaciones, cómo se aclaró y qué preguntarías la próxima vez.',
'''During a recent trip, I booked a room described as being near the station. I assumed this meant that I could walk there with my luggage in a few minutes. When I arrived, I discovered that the guesthouse was on a steep hill about twenty minutes away.

At first, I felt that the description had been misleading. However, the owner explained that most guests arrived by a local bus, which stopped close to the entrance. We had interpreted near in different ways because we had imagined different forms of transport.

I asked the owner to explain the bus route and confirm whether it operated early in the morning. Once those details were clear, the arrangement worked well for the rest of my stay.

Next time, I would ask a more specific question before booking: how long does the journey take on foot, and are there steps or steep sections? The experience taught me to check the practical meaning of a description instead of assuming that my interpretation is the only possible one.''',
'Turista y anfitrión: resuelvan una ambigüedad sobre horario, precio o acceso. Terminen reformulando el mismo acuerdo con sus propias palabras.',
'''Where does the bus stop? Complete: Could you tell me where the bus ___?|stops|Orden afirmativo en pregunta indirecta.
Please explain again differently. Complete: Could you ___ that?|rephrase|Rephrase cambia la formulación.
It depends on the situation. Complete: The meaning may depend ___ the situation.|on|Depend on.
I am sorry about the confusion. Complete: I apologise ___ the confusion.|for|Apologise for.''',
'''There was an unfortunate ___.|UNDERSTAND|misunderstanding|El prefijo indica interpretación errónea.
We appreciated their ___.|HOSPITABLE|hospitality|Sustantivo de hospitalidad.
Our ___ were different.|EXPECT|expectations|Plural tras were.
Her questions were polite and ___.|RESPECT|respectful|Adjetivo paralelo a polite.''',
'Cortesía y claridad: marca el dato que necesitas confirmar, como included o available. Un acento claro en esa palabra puede evitar otra ambigüedad.')

unit('Hábitos, bienestar y tiempo','Making sustainable changes','🌱','Hablar de hábitos y equilibrio personal, evaluar consejos y expresar recomendaciones sin prometer resultados universales.',[
rule('Hábitos y cambios sostenidos','Used to contrasta pasado y presente; be/get used to describe familiaridad y adaptación. Present perfect continuous permite hablar de un cambio que has estado probando. Si cuentas una estrategia personal, explica durante cuánto tiempo la usaste y en qué situación. Esto permite al oyente entender el alcance de la experiencia y evita presentar una preferencia como una regla para todos.','used to do; get used to doing; have been trying','Una rutina personal puede variar según responsabilidades y circunstancias.',
'I am getting used to {taking} short breaks between tasks.|take|took',
'I {have been trying} a different study routine this month.|am try|have trying',
'I used to answer every message immediately, but now I check them at set times.'),
rule('Consejos con condiciones','Should, could y might want to expresan recomendaciones con diferente fuerza. It may help to… reconoce una posibilidad sin garantizarla. Explica para quién podría ser útil un consejo y qué dificultad podría impedir aplicarlo. En una conversación, pregunta por las circunstancias antes de proponer una solución. Practicar inglés sobre bienestar no exige diagnosticar ni dar tratamientos: céntrate en explicar experiencias, preferencias y decisiones cotidianas.','You could try…; It may help to…; One option would be…','Evita convertir una anécdota en una promesa de resultado.',
'You could try {planning} one manageable task for each session.|planned|plan toing',
'It may help {to reduce} unnecessary interruptions.|reducing to|reduce to',
'One option would be to discuss the schedule with the people involved.'),
rule('Equilibrio y límites','Rather than y instead of permiten comparar alternativas; instead of lleva nombre o -ing. Too… to y enough to expresan límites para actuar. I would prefer… y I would rather… comunican preferencias con patrones diferentes. Explicar un límite puede incluir una alternativa concreta y una fecha de revisión. No necesitas justificar toda tu vida para negociar una responsabilidad de manera clara.','instead of doing; would prefer to do; would rather do','Prefer to y would rather no comparten exactamente el mismo patrón.',
'I would prefer {to finish} one task before starting another.|finishing to|finish',
'Instead of {checking} messages constantly, I set aside time for them.|check|to check',
'The plan needs to be simple enough to follow on a busy day.')],
'''routine|rutina|A routine should fit the rest of your day.
balance|equilibrio|We are trying to find a better balance between tasks.
manageable|manejable|Choose a manageable goal for the next session.
distraction|distracción|A notification can become a distraction during reading.
interruption|interrupción|Frequent interruption makes it harder to follow an argument.
boundary|límite personal|A clear boundary can prevent conflicting expectations.
commitment|compromiso|Do not accept a commitment before understanding it.
consistent|constante|A consistent routine can make practice easier to organise.
realistic|realista|The schedule should be realistic on an ordinary day.
gradual|gradual|The change was gradual rather than immediate.
prioritise|priorizar|We need to prioritise the most useful tasks.
reflect on|reflexionar sobre|Take a moment to reflect on what worked.
cut back on|reducir|I decided to cut back on unnecessary meetings.
set aside|reservar tiempo|Try to set aside a short period for review.
switch off|desconectar o apagar|I switch off notifications while recording.
keep to|ceñirse a|It is easier to keep to a flexible but clear plan.
build up|aumentar gradualmente|We can build up the length of the conversations.
take a break|hacer una pausa|We agreed to take a break between the two tasks.
overwhelmed|agobiado|She felt overwhelmed by the number of unfinished tasks.
motivation|motivación|Motivation may change, so the plan needs to remain practical.''',
'''When Luis decided to improve his English, he designed an ambitious timetable with two hours of study every evening. For the first three days, he completed everything. Then a change at work made the plan difficult to maintain. He missed one evening, felt that he had failed and stopped recording his practice altogether.

A friend asked him to describe an ordinary busy day rather than an ideal one. Together they identified a shorter period that was usually available. Luis chose one practical task for each session, such as explaining a news item or responding to a recorded message. On quieter days, he could do more, but the basic plan did not depend on having unlimited energy or free time.

He also changed what he recorded. Instead of noting only whether he had followed the timetable, he wrote what he had practised and one difficulty to revisit. A missed day no longer erased the earlier work. The new routine was not a universal formula. It was an arrangement that better matched his circumstances and gave him information he could use to adjust the next session.''',
'''Why did the original plan break down?|It did not fit a change in his daily circumstances.|He had no interest in English.~Every evening remained free.|El horario dependía de condiciones ideales.
What did his friend ask him to consider?|An ordinary busy day.|A perfect holiday week.~Other people's scores only.|La revisión parte de la vida real.
What did he begin recording?|The task practised and a difficulty to revisit.|Only the number of days missed.~A promise never to change anything.|El registro orienta práctica futura.
What does the final paragraph avoid claiming?|That one routine works for everyone.|That Luis changed his plan.~That missed days can occur.|Se delimita una experiencia personal.''',
'''A study partner recommended turning off every notification for an entire afternoon. This worked for her, but her friend was responsible for receiving urgent messages from a family member. Copying the same arrangement would not meet both people's needs.

They discussed the purpose of the suggestion: fewer unnecessary interruptions. The friend chose to silence optional notifications while keeping one important contact available. The adjustment preserved the useful idea without copying every detail. Before recommending a habit, understanding the person's constraints can matter as much as describing your own success.''',
'''Why could the same arrangement not suit both people?|One needed to receive urgent family messages.|Neither owned a device.~All notifications were equally important.|Había responsabilidades diferentes.
What was the underlying purpose?|Reduce unnecessary interruptions.|Prevent all communication permanently.~Use a more expensive phone.|Se conserva el objetivo.
What adjustment was made?|Keep an important contact available.|Turn every notification on.~Ignore every message for a week.|La solución responde al límite real.
What should a recommendation consider?|The person's circumstances.|Only the speaker's own success.~The length of the advice.|El contexto cambia utilidad.''',
'''For the next week, choose one communication task you can realistically repeat. It might be describing your day, summarising a short article or asking a partner about a plan. Keep the first version brief. After each attempt, note one thing that was clear and one point you want to improve. You can increase the difficulty when the task becomes familiar, but do not judge the whole week by one difficult session. If the plan does not fit your schedule, revise it. The aim is to create opportunities to use English and learn from the result, not to maintain a perfect record at any cost.''',
'''What kind of task should be chosen?|One that can realistically be repeated.|The longest task available.~A task requiring perfect performance.|Se busca continuidad viable.
What should be noted after each attempt?|One clear point and one improvement.|Only the time of day.~Every word ever learned.|La reflexión se mantiene concreta.
What if the plan does not fit?|Revise it.|Abandon all previous progress.~Pretend it was completed.|Adaptar forma parte del proceso.''',
'Escribe 140–190 palabras para un compañero sobre una rutina que probaste. Incluye una dificultad, un ajuste y una limitación de tu recomendación.',
'''I recently changed the way I organise my English practice. I used to plan long sessions, but I often postponed them when the rest of the day became busy. The plan looked impressive, yet it gave me few opportunities to practise consistently.

For the past month, I have been trying shorter tasks with a clear purpose. On one day, I explain a short article to a friend; on another, I record a response to a question and listen for one point to improve. I still use grammar explanations, but I connect them to something I want to say.

The main difficulty is protecting time without ignoring other responsibilities. Instead of switching off every message, I silence optional notifications and keep important contacts available.

This routine may not suit everyone. Someone preparing for a particular assessment might need longer sessions or different materials. My suggestion is to start with a plan that fits an ordinary day, review what it helps you do and adjust it when your circumstances change.''',
'Pregunta a tu compañero por una dificultad al practicar. Antes de aconsejar, aclara dos restricciones y negocia una acción pequeña que pueda probar.',
'''I am becoming accustomed to speaking. Complete: I am getting used to ___.|speaking|Used to aquí es preposición más -ing.
I prefer to work now. Complete: I would rather ___ now.|work|Would rather + base.
Do this rather than checking every message. Complete: Do this instead of ___ every message.|checking|Instead of + -ing.
The task is sufficiently short to repeat. Complete: It is short ___ to repeat.|enough|Enough va después del adjetivo.''',
'''The goal should be ___.|MANAGE|manageable|Adjetivo de viabilidad.
We need a more ___ plan.|REAL|realistic|Adjetivo que describe el plan.
There were too many ___.|INTERRUPT|interruptions|Sustantivo plural tras many.
The routine changed ___.|GRADUAL|gradually|Adverbio de modo.''',
'Fluidez: practica una misma intención con datos nuevos. Busca grupos de sentido claros; hablar más rápido no equivale por sí solo a comunicar mejor.')
