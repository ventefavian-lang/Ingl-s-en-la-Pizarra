"""Banco ORIGINAL de lecturas graduadas para Hello English. No incluye textos de otros sitios."""
import json, re, pathlib
items=[]

def add(level,title,genre,topic,passage,glossary,facts,claim,purpose):
    words=[v.strip().split('=',1) for v in glossary.split(';')]
    qs=[x.strip().split('|') for x in facts.strip().split('\n') if x.strip()]
    assert len(words)==3 and all(len(x)==2 for x in words),(level,title,'glossary')
    assert len(qs)==3 and all(len(x)==5 for x in qs),(level,title,'questions',qs)
    assert len(claim.split('|'))==3,(level,title,'claim')
    assert len(purpose.split('|'))==3,(level,title,'purpose')
    item={'id':f'{level}-{sum(x["level"]==level for x in items)+1:02d}','level':level,'title':title,'genre':genre,'topic':topic,'paragraphs':[s.strip() for s in passage.strip().split('\n\n') if s.strip()], 'glossary':[{'word':w,'es':d} for w,d in words], 'facts':[{'prompt':q,'correct':a,'distractors':[b,c],'why':why,'skill':'detalle'} for q,a,b,c,why in qs], 'claim':dict(zip(['text','answer','why'],claim.split('|'))), 'purpose':dict(zip(['correct','wrong1','wrong2'],purpose.split('|')))}
    items.append(item)

add('a1','The School Garden','Artículo','Naturaleza', '''Every Tuesday, students at Green Hill School work in a small garden behind the library. There are tomatoes, beans and flowers. The children use little watering cans. Their teacher, Mr Lee, shows them how to take care of each plant.

The garden has a quiet corner with a bench in the shade. Students sit there to read after lunch. In June, the class shares its vegetables with the school kitchen. The garden is not very big, but everyone enjoys it.''',
 'garden=jardín;shade=sombra;vegetables=verduras', '''Where is the garden?|Behind the library|In the school kitchen|Next to the bus stop|El primer párrafo sitúa el jardín detrás de la biblioteca.
When do the students work there?|On Tuesdays|Every Sunday|On Friday evenings|El texto dice “Every Tuesday”.
What happens in June?|The class shares vegetables|The school closes the garden|The teacher buys a bench|En junio comparten las verduras con la cocina escolar.''',
 'Students grow only flowers.|False|También cultivan tomates y frijoles; no solo flores.',
 'To describe a school garden|To announce a football match|To explain a train schedule')

add('a1','How Bees Help Flowers','Artículo','Ciencia', '''A bee is a small insect. It has six legs and two pairs of wings. Bees visit flowers because they need food. They collect nectar, a sweet liquid, and carry pollen on their bodies.

When a bee flies to a new flower, some pollen can move to that flower. This helps many plants make seeds. Bees need safe places to live and flowers to visit. In our town, people plant flowers near the park so that bees can find food in spring and summer.''',
 'nectar=néctar;pollen=polen;seeds=semillas', '''Why do bees visit flowers?|To find food|To build a school|To drink sea water|El primer párrafo explica que buscan alimento.
How many legs does a bee have?|Six|Four|Eight|El texto dice que una abeja tiene seis patas.
What do people plant near the park?|Flowers|Palm trees only|Rice|Plantan flores para ayudar a las abejas.''',
 'Bees can help plants make seeds.|True|El polen que transportan puede ayudar a formar semillas.',
 'To explain why bees are useful|To tell a story about a dog|To describe a sports competition')

add('a1','Your First Library Card','Instrucciones','Vida diaria', '''The town library is open from Monday to Saturday. You can read books there for free. To take books home, you need a library card. Ask at the front desk and give your name and address.

The librarian makes your card in five minutes. You can borrow three books for two weeks. Please return them on time so that other people can read them. The library also has a quiet room for studying and a small area for children.''',
 'borrow=pedir prestado;return=devolver;desk=mostrador', '''What do you need to take books home?|A library card|A bus ticket|A camera|Necesitas una tarjeta de biblioteca.
How many books can you borrow?|Three|Five|Ten|Se permite llevar tres libros.
How long can you keep the books?|Two weeks|One day|Three months|El préstamo dura dos semanas.''',
 'The library is open on Sundays.|False|El horario indicado es de lunes a sábado.',
 'To explain how library cards work|To sell a new bicycle|To teach a cake recipe')

add('a1','A Bus Across the River','Aviso','Transporte', '''River Town has a little blue bus. It takes people from the train station to the museum. The bus crosses a bridge and stops at the park. It leaves the station every thirty minutes, from nine in the morning until five in the afternoon.

A ticket costs two coins. Children under six travel for free with an adult. The bus is small, so it has only twenty seats. Many visitors use it because they want to see the river from the bridge.''',
 'bridge=puente;ticket=billete;seats=asientos', '''Where does the bus start?|At the train station|At the museum|At the hospital|El recorrido empieza en la estación de tren.
How often does it leave?|Every thirty minutes|Once a day|Every two hours|Sale cada treinta minutos.
How many seats does the bus have?|Twenty|Thirty|Six|El aviso indica veinte asientos.''',
 'Children under six always pay two coins.|False|Los menores de seis viajan gratis acompañados de un adulto.',
 'To give information about a local bus|To describe a school garden|To explain why bees fly')

add('a1','The Weather Corner','Artículo','Ciencia', '''Mina and Omar check the weather at their school every morning. They look at a thermometer to see if the air is hot or cold. They also watch the clouds and write notes in a notebook.

On Monday, the sky is blue and the temperature is 22 degrees. On Tuesday, there are dark clouds and rain. Their teacher puts the notes on a classroom wall. At the end of the week, the students compare the days. They learn that the weather can change quickly.''',
 'thermometer=termómetro;clouds=nubes;compare=comparar', '''What do Mina and Omar use to check temperature?|A thermometer|A calendar|A ruler|Usan un termómetro para medir la temperatura.
What is the weather like on Tuesday?|Rainy|Sunny with a blue sky|Snowy|El martes llueve y hay nubes oscuras.
Where does the teacher put the notes?|On the classroom wall|Under a tree|In the kitchen|El profesor coloca las notas en la pared del aula.''',
 'The weather stays the same all week.|False|Las condiciones cambian entre lunes y martes.',
 'To describe a simple weather activity|To teach students to cook pasta|To explain a football rule')

add('a1','Sorting Our Rubbish','Guía','Medio ambiente', '''At home, Ana has three boxes for rubbish. The blue box is for clean paper and cardboard. The green box is for glass bottles and jars. The brown box is for fruit skins and other food scraps.

Ana checks that containers are empty before she puts them in a box. Her family takes the boxes to a collection point on Saturday. They also use shopping bags many times. Ana says that small habits help her family make less waste each week.''',
 'rubbish=basura;scraps=restos;collection=recolección', '''Which box is for paper?|The blue box|The brown box|The green box|La caja azul es para papel y cartón.
What goes in the brown box?|Food scraps|Glass bottles|Newspapers|La caja marrón recibe restos de comida.
When does the family visit the collection point?|On Saturday|On Tuesday|Every evening|La familia lleva los residuos el sábado.''',
 'Ana puts full drink bottles in the boxes.|False|Comprueba que los recipientes estén vacíos.',
 'To describe a family recycling routine|To invite people to a concert|To give directions to a zoo')

add('a1','The Saturday Market','Artículo','Alimentación', '''Every Saturday morning, the market opens in the town square. Farmers bring fruit, vegetables and eggs. A baker sells fresh bread. People walk between the tables and talk to the sellers.

Sara goes to the market with her father. They buy apples, potatoes and a loaf of bread. Sara likes asking where food comes from. One farmer tells her that his apples grow on trees outside the town. At eleven, Sara and her father go home to prepare lunch.''',
 'farmers=agricultores;baker=panadero;loaf=barra de pan', '''Where is the market?|In the town square|Inside the school|At the airport|Se instala en la plaza del pueblo.
What does the baker sell?|Bread|Eggs|Potatoes|El panadero vende pan recién hecho.
What time do Sara and her father go home?|At eleven|At eight|At two|Regresan a casa a las once.''',
 'Sara buys oranges at the market.|Not Given|El texto enumera manzanas, papas y pan; no confirma compra de naranjas.',
 'To describe a visit to a food market|To explain the water cycle|To announce a school exam')

add('a1','Breakfast Before School','Consejos','Salud', '''Luis has breakfast before he goes to school. On Monday he eats oats with milk and a banana. He drinks a glass of water. His sister prefers bread, cheese and an orange.

Their family chooses different foods during the week. They do not eat exactly the same meal every day. Luis helps by washing fruit and putting cups on the table. Breakfast is also a time for the family to talk about the day ahead.''',
 'oats=avena;prefers=prefiere;ahead=por delante', '''What does Luis eat on Monday?|Oats and a banana|Rice and fish|Only bread|El lunes come avena y un plátano.
What does his sister prefer?|Bread, cheese and an orange|Oats and a banana|Soup and beans|Su hermana prefiere pan, queso y una naranja.
How does Luis help?|He washes fruit|He drives to school|He buys all the food|Ayuda lavando la fruta.''',
 'The family eats the same breakfast every day.|False|El texto dice que eligen alimentos distintos durante la semana.',
 'To describe a family morning routine|To explain how to buy a train ticket|To describe a science museum')

add('a1','Finding Your Way in the Park','Guía','Lugares', '''Welcome to Maple Park. The main gate is next to the bus stop. From the gate, walk straight to the fountain. Turn left for the playground or right for the small lake.

There is a café near the lake. The toilets are behind the café. You can sit on benches under the trees. Please use the paths and put rubbish in bins. The park closes at six in the evening, so make sure you leave before then.''',
 'fountain=fuente;paths=senderos;bins=papeleras', '''Where is the main gate?|Next to the bus stop|Behind the café|Near the lake|La puerta principal está junto a la parada del autobús.
Which way is the playground from the fountain?|Left|Right|Straight ahead|Desde la fuente se gira a la izquierda.
Where are the toilets?|Behind the café|In the playground|At the gate|Los baños están detrás del café.''',
 'Visitors can stay in the park all night.|False|El parque cierra a las seis de la tarde.',
 'To give directions around a park|To teach a music lesson|To explain plant growth')

add('a1','Why Do We Sleep?','Artículo','Cuerpo humano', '''People need sleep every day. When we sleep, our bodies rest. Many people feel better after a good night of sleep. Children and adults may need different amounts of sleep.

At home, Leo gets ready for bed at the same time each evening. He puts his phone away, brushes his teeth and reads a short book. His bedroom is quiet and dark. In the morning, Leo has more energy to play and learn. Good sleep habits can help people feel ready for the next day.''',
 'sleep=dormir;rest=descansar;energy=energía', '''What happens when people sleep?|Their bodies rest|They eat lunch|They go to school|El cuerpo descansa mientras dormimos.
What does Leo do before bed?|He reads a short book|He runs around the park|He watches his phone all night|Lee un libro corto antes de acostarse.
What is Leo’s bedroom like?|Quiet and dark|Noisy and bright|Very cold and wet|El dormitorio es tranquilo y oscuro.''',
 'Everyone needs exactly the same amount of sleep.|False|El texto dice que niños y adultos pueden necesitar cantidades distintas.',
 'To explain basic sleep habits|To describe a train journey|To give a shopping list')

add('a1','A Visit to the History Museum','Folleto','Cultura', '''The City History Museum has four rooms. Room One shows old photographs of the town. Room Two has toys from the past. In Room Three, visitors can see maps and letters. Room Four has a short film about the river.

The museum opens at ten and closes at four. Entry is free for students. Visitors can ask questions at the information desk. Please do not touch the old objects. There is a small shop near the exit with postcards and pencils.''',
 'photographs=fotografías;entry=entrada;objects=objetos', '''Which room has old toys?|Room Two|Room One|Room Four|Los juguetes antiguos están en la segunda sala.
What can visitors see in Room Four?|A film about the river|Old trains|A big garden|La cuarta sala proyecta un documental corto sobre el río.
How much does entry cost for students?|It is free|Five coins|Ten coins|El folleto dice que la entrada para estudiantes es gratuita.''',
 'Visitors can touch the old objects.|False|Se pide no tocar los objetos antiguos.',
 'To introduce a history museum|To explain a breakfast menu|To describe the weather tomorrow')

add('a1','Music Class at the Community Centre','Aviso','Arte', '''Do you like music? The community centre has a music class for beginners on Wednesday afternoons. The class starts at four and ends at five. Students can try a drum, a keyboard and small bells.

You do not need to bring an instrument. The teacher, Nina, has everything ready in the room. Students listen first and then play together. Parents can wait in the hall. The class is free, but places are limited, so please sign up at the front desk.''',
 'beginners=principiantes;instrument=instrumento;limited=limitado', '''What day is the class?|Wednesday|Saturday|Monday|La clase se celebra los miércoles.
What should students bring?|No instrument|A large drum|Their own keyboard|El aviso aclara que no necesitan llevar instrumentos.
Where do students sign up?|At the front desk|On the bus|In the library garden|La inscripción se realiza en recepción.''',
 'The class starts at five in the afternoon.|False|Empieza a las cuatro y termina a las cinco.',
 'To invite beginners to a music class|To sell concert tickets|To explain a museum map')

add('a2','Rain Gardens in the City','Artículo informativo','Medio ambiente', '''When heavy rain falls on a city, water often runs across roads and pavements. A rain garden is a planted area that collects some of this water. Its soil helps the water move slowly into the ground instead of going straight into street drains.

A group of neighbours made a rain garden outside their community centre. First, they chose plants that can live with both wet and dry weather. Then they prepared the soil and made a shallow space for water. After a storm, the garden may look very wet, but the water usually disappears gradually.

The neighbours check the garden once a month. They remove rubbish and replace damaged plants. Their project will not stop every flood, but it is one small way to manage rainwater.''',
 'pavements=aceras;shallow=poco profundo;gradually=gradualmente', '''What does a rain garden collect?|Some rainwater|Plastic bottles|Warm air|El jardín recibe parte del agua de lluvia.
Why did the neighbours choose special plants?|They tolerate wet and dry conditions|They grow only indoors|They need no soil|Buscaban plantas que soportaran tiempo húmedo y seco.
How often is the garden checked?|Once a month|Every hour|Once a year|Los vecinos lo revisan mensualmente.''',
 'A rain garden can prevent every flood.|False|El último párrafo explica que no puede detener todas las inundaciones.',
 'To explain a small rainwater project|To sell a new kind of car|To announce a sports event')

add('a2','The Repair Café','Reportaje','Comunidad', '''Every second Saturday, volunteers open a repair café in the old town hall. People bring broken lamps, bags and small household objects. A volunteer looks at each item and explains whether it can be repaired safely. Visitors watch, ask questions and sometimes help with simple tasks.

The café does not promise to fix everything. Some objects need specialist parts or a qualified technician. If an item cannot be repaired, the volunteers explain why and suggest appropriate recycling options.

Last month, a visitor brought a backpack with a broken strap. Together with a volunteer, she repaired the strap and learned how to sew a strong stitch. She left with her bag and a useful new skill. The organisers hope people will think twice before throwing something away.''',
 'volunteers=voluntarios;strap=correa;stitch=puntada', '''Where does the repair café meet?|In the old town hall|In a shopping centre|At the train station|Los encuentros tienen lugar en el antiguo ayuntamiento.
What did one visitor repair?|A backpack strap|A bicycle wheel|A television screen|La visitante reparó la correa de una mochila.
What happens when an item cannot be repaired?|Volunteers explain other options|It is hidden in a cupboard|The visitor must buy a new lamp|Dan una explicación y opciones para reciclar cuando corresponde.''',
 'The repair café guarantees that every object will be fixed.|False|El texto advierte que algunas cosas necesitan repuestos o especialistas.',
 'To describe a community repair project|To compare holiday destinations|To teach students to swim')

add('a2','A Safer Route to School','Artículo informativo','Transporte', '''Last year, students at West Park School asked how they could travel to school more safely. A survey showed that many wanted to walk or cycle, but they worried about busy roads. The local council visited the area and discussed several possible changes.

Now there is a marked crossing near the main gate and a wider path beside the park. The school has also installed bike racks. A teacher reminds students to check traffic carefully and follow local road rules.

More students are walking than before, but the school still offers bus information for families who live far away. The project is not about forcing everyone to travel in the same way. Its goal is to give families safer choices.''',
 'survey=encuesta;crossing=cruce peatonal;racks=soportes', '''Why were some students worried?|The roads were busy|The school had no books|The park was closed|La preocupación era el tráfico intenso.
What was installed for bicycles?|Bike racks|New traffic lights everywhere|An indoor track|Instalaron soportes para bicicletas.
What is the project's main goal?|To offer safer choices|To stop all buses|To make every student cycle|El objetivo es ofrecer opciones más seguras a las familias.''',
 'All students must cycle to school now.|False|El texto recalca que no se obliga a todos a usar el mismo medio.',
 'To report on safer school travel|To advertise a racing competition|To explain how to grow tomatoes')

add('a2','Inside a Modern Library','Entrevista','Cultura', '''“A library is more than a room full of books,” says Omar, a librarian in a small coastal town. His library lends novels and information books, but it also offers computers, language clubs and workshops. On Thursday afternoons, local people can learn how to find trustworthy information online.

Some visitors need a quiet place to study. Others come to work on group projects. To support both groups, the building has separate spaces. The library team also helps people use the online catalogue to find books.

Omar's favourite moment is when someone discovers a new interest. Last week, a teenager borrowed a book about astronomy after attending a science talk. Omar hopes the library will continue to be a welcoming place for people of different ages.''',
 'lends=presta;trustworthy=fiable;catalogue=catálogo', '''What can people learn on Thursdays?|How to find reliable online information|How to drive a bus|How to paint houses|El taller semanal enseña a buscar información fiable.
Why are there separate spaces?|For quiet study and group work|To sell expensive books|To divide visitors by age|Hay espacios distintos para silencio y trabajo grupal.
What book did one teenager borrow?|A book about astronomy|A book about cooking|A book about football|Después de una charla tomó prestado un libro de astronomía.''',
 'The library is only for children.|False|Recibe visitantes de diferentes edades.',
 'To show the different roles of a library|To describe a dangerous storm|To invite readers to a restaurant')

add('a2','A School Solar Project','Informe','Tecnología', '''Students at Lakeview School wanted to understand solar energy. Their science teacher brought a small solar panel into the classroom. The panel produces electricity when light reaches it. The class connected it to a tiny fan and watched the fan turn on during a bright afternoon.

The students tested the same setup on a cloudy day. The fan moved more slowly because the panel received less light. They wrote down their observations and discussed why electricity from sunlight can change during the day.

Their experiment cannot power a whole school. However, it helps students understand how solar panels work and why some systems also use storage or other electricity sources. The teacher says that asking good questions is as valuable as getting results.''',
 'panel=panel;cloudy=nublado;storage=almacenamiento', '''What did the panel power?|A small fan|The entire school|A large train|El experimento movía un ventilador pequeño.
What happened on a cloudy day?|The fan moved more slowly|The panel became a battery|The fan disappeared|Con menos luz, el ventilador giró más despacio.
Why did the class write observations?|To compare the tests|To advertise the panel|To count students|Registraron observaciones para comparar los resultados.''',
 'The experiment powered every classroom.|False|Era un montaje pequeño, no una fuente para todo el colegio.',
 'To describe an experiment with solar energy|To tell readers how to repair a bicycle|To announce a music festival')

add('a2','Postcards Before Smartphones','Artículo histórico','Historia', '''Today, people can send photos to friends in seconds. In the past, travellers often sent postcards instead. A postcard usually had a picture on one side and space for a short message and an address on the other.

People bought postcards at shops, museums or train stations. They wrote about the weather, the places they visited and the people they met. Then they put the card in the post. The message could take several days to arrive, especially when it travelled a long distance.

A local museum has a collection of old postcards. They show streets, clothes and buildings from many years ago. Some postcards are interesting because of their pictures, while others tell us about everyday life through the words written on them.''',
 'postcard=postal;address=dirección;collection=colección', '''What did people write on postcards?|Short messages|Long scientific books|School examinations|Generalmente escribían mensajes breves.
Where could travellers buy them?|At stations and museums|Only at hospitals|Only at farms|Se vendían, entre otros lugares, en estaciones y museos.
Why are old postcards useful to historians?|They show pictures and everyday messages|They predict tomorrow's weather|They replace every history book|Las imágenes y palabras permiten conocer aspectos del pasado.''',
 'Postcards always arrived on the same day.|False|Podían tardar varios días.',
 'To explain the use and value of postcards|To give instructions for baking bread|To compare two sports teams')

add('a2','Why City Trees Matter','Artículo informativo','Naturaleza', '''On a hot day, the street outside a shopping centre can feel very warm. A nearby street with many trees may feel more comfortable. Tree leaves create shade, and trees can also help cool their surroundings as water moves through their leaves.

Trees provide homes and food for some birds and insects. They also make parks more pleasant places to walk and meet friends. However, planting a tree is only the beginning. Young trees need suitable space, water and care, especially during their first years.

In one neighbourhood, residents made a simple plan to protect their trees. They check new trees in dry weather and report damaged branches to the town's maintenance team. They know that healthy trees are a long-term community project.''',
 'shade=sombra;surroundings=alrededores;branches=ramas', '''Why can a tree-lined street feel cooler?|Trees give shade|Trees make roads wider|Trees stop all wind|La sombra es una razón de la diferencia.
What do young trees need?|Water and care|Only paint|Nothing after planting|Los árboles jóvenes requieren atención y espacio adecuado.
Who handles damaged branches in the example?|The maintenance team|A local bakery|A football team|Los vecinos informan al equipo municipal.''',
 'Planting a tree means it never needs care again.|False|El artículo destaca el mantenimiento a largo plazo.',
 'To explain benefits and care of urban trees|To explain how computers store photos|To advertise a holiday')

add('a2','Bread: From Flour to Loaf','Explicación','Alimentación', '''Bread begins with a few common ingredients: flour, water, yeast and sometimes salt. A baker mixes them to make dough. Yeast produces gas in the dough, helping it grow as it rests. The baker then shapes the dough and puts it in an oven.

Heat changes the dough into bread with a firm outside and a softer inside. The time and temperature depend on the recipe and the size of the loaf. Some breads also use seeds or different kinds of flour.

In a community class, learners compare two loaves made with different resting times. They notice changes in size and texture. Their teacher asks them to describe what they see rather than decide that one loaf must always be better.''',
 'dough=masa;yeast=levadura;loaf=barra de pan', '''What helps dough rise?|Yeast producing gas|Cold water alone|A wooden table|La levadura produce gas que hace crecer la masa.
What changes dough into baked bread?|Heat in an oven|A notebook|A refrigerator|El calor del horno transforma la masa.
What do learners compare in the class?|Loaves with different resting times|Two different types of buses|Two school timetables|Comparan panes con diferentes tiempos de reposo.''',
 'Every kind of bread needs exactly the same baking time.|False|El tiempo varía según la receta y el tamaño.',
 'To explain how bread is made|To review a science-fiction film|To describe a sports stadium')

add('a2','A Day with a Park Ranger','Entrevista','Naturaleza', '''Rosa works as a ranger in a national park. She starts each morning by checking the visitor paths and reading the weather forecast. Later, she answers questions from visitors about plants, birds and the park's rules.

“People sometimes think my job is only walking outside,” Rosa says. “But I also prepare reports and work with other staff.” If a path is damaged, she tells the maintenance team so they can make it safe. She never asks visitors to approach wild animals for a better photo.

Rosa enjoys explaining why the park has different habitats. Some plants grow near water, while others prefer drier ground. Her favourite part of the job is helping people leave the park with more knowledge and respect for nature.''',
 'ranger=guardaparques;forecast=pronóstico;habitats=hábitats', '''What does Rosa check in the morning?|Visitor paths and the forecast|Restaurant menus|School homework|Revisa senderos y pronóstico del tiempo.
Why does she report a damaged path?|So staff can make it safe|So visitors can ignore it|So animals can use it as a road|Busca que el equipo competente lo repare.
What does Rosa enjoy most?|Helping visitors learn about nature|Selling cameras|Driving around the city|Disfruta enseñar a respetar el entorno.''',
 'Rosa tells visitors to get close to wild animals for photos.|False|El texto dice lo contrario.',
 "To describe a park ranger's responsibilities|To explain a recipe for soup|To compare fashion trends")

add('a2','Planning a Simple Budget','Consejos','Vida diaria', '''A budget is a plan for how to use money. It can help people understand what they receive, what they spend and what they want to save. Student Lina uses a notebook to record the small amount of pocket money she gets each month.

First, she writes down things she must pay for, such as a bus pass. Next, she decides how much she can use for snacks or hobbies. Finally, she sets aside a little money for a future school trip.

One month, Lina spends more than expected on transport. She changes her plan instead of ignoring the difference. Her budget is not a set of perfect rules; it helps her make decisions with the money available.''',
 'budget=presupuesto;spend=gastar;sets aside=reserva', '''What does Lina use to record money?|A notebook|A camera|A football|Anota ingresos y gastos en un cuaderno.
What is one regular expense?|A bus pass|A holiday abroad|A new computer|El pase de autobús es un gasto previsto.
What does she do after unexpected transport costs?|She changes her plan|She ignores them|She stops recording expenses|Adapta su presupuesto a la situación real.''',
 "Lina's budget never changes.|False|El último párrafo muestra un ajuste.",
 'To explain a basic personal budget|To sell sports equipment|To tell a story about bees')

add('a2','The School Newspaper Team','Reportaje','Educación', '''At Sunrise School, students publish a small newspaper every month. The team includes writers, photographers and editors. At the beginning of each month, they meet to decide which stories would interest their readers.

The writers interview people and check their facts. The editors look for unclear sentences and spelling mistakes. Photos need captions that explain what is happening. Before publishing, the team asks a teacher to check that information about students is appropriate to share.

For the latest issue, the team wrote about a new garden and a student music concert. They also printed a short guide to borrowing books from the library. The editors say the hardest part is not writing quickly, but making every article accurate and understandable.''',
 'editor=editor;caption=pie de foto;accurate=preciso', '''How often is the newspaper published?|Every month|Every day|Once a year|Publican un ejemplar mensual.
Who checks unclear sentences?|The editors|The bus drivers|The gardeners|Los editores revisan redacción y ortografía.
What is the team's biggest challenge?|Making stories accurate and clear|Finding enough ink colours|Writing only about sports|Destacan la claridad y exactitud antes que la velocidad.''',
 'The newspaper team publishes personal student information without checking.|False|Consulta a un docente antes de publicar datos de estudiantes.',
 'To explain how students produce a newspaper|To explain how bread grows in an oven|To advertise a new phone')

add('a2','Plastic at the Beach','Artículo informativo','Medio ambiente', '''After a windy weekend, volunteers found plastic bottles and food wrappers on a local beach. Some rubbish came from visitors, while other pieces arrived with the water. The volunteers collected what they could safely remove and recorded the types of items they found.

The information helped the community see which kinds of rubbish were most common. A local group suggested adding more bins near the entrance and asking visitors to bring reusable water bottles. They also organised short talks at schools about keeping litter out of drains and rivers.

A clean-up is useful, but it cannot solve the whole problem. The group believes preventing rubbish from reaching the water is just as important as collecting it later.''',
 'wrappers=envoltorios;reusable=reutilizable;litter=basura tirada', '''What did volunteers record?|The types of rubbish|The colour of every fish|The number of clouds|Registraron los tipos de residuos encontrados.
What did the group suggest near the entrance?|More bins|A new swimming pool|A car park in the sand|Propusieron añadir papeleras.
What is important besides clean-ups?|Stopping rubbish before it reaches water|Painting the bins every week|Closing every beach|La prevención es tan importante como recoger basura.''',
 'All the rubbish came from beach visitors.|False|El texto dice que parte llegó arrastrada por el agua.',
 'To describe actions against beach litter|To teach visitors how to surf|To compare different sea animals')

add('b1','Why Cities Need Quiet Spaces','Artículo de opinión','Urbanismo', '''Many cities have become lively places where cafés, traffic and construction continue almost all day. This activity can be exciting, but constant noise may make it difficult to concentrate or relax. Urban planners are therefore paying more attention to quiet public spaces: small parks, gardens and pedestrian areas away from busy roads.

A quiet space does not need to be completely silent. People might hear birds, footsteps or a conversation nearby. What matters is having somewhere they can choose a calmer environment. In one neighbourhood, residents worked with the council to turn an unused parking area into a small garden. They added seats, trees and a path that everyone could use.

The project did not remove noise from the rest of the city. However, it gave local people another option. Critics argued that the money could have been spent on other services, while supporters said the garden improved everyday life. The discussion shows that even modest changes involve priorities.''',
 'planners=planificadores;pedestrian=peatonal;modest=modesto', '''What is the purpose of quiet public spaces?|To offer places for calm and rest|To close every café|To stop all city activity|Ofrecen una alternativa a entornos ruidosos.
What was the neighbourhood's garden before?|An unused parking area|A railway station|A sports stadium|El terreno había sido una zona de estacionamiento sin uso.
Why did people disagree about the project?|They had different spending priorities|They did not know where the park was|They wanted a louder street|La discusión trató sobre prioridades del presupuesto público.''',
 'The new garden made the entire city silent.|False|El texto aclara que el resto de la ciudad siguió teniendo ruido.',
 'To examine the value and limits of quiet city spaces|To teach how to build a musical instrument|To report a wildlife discovery')

add('b1','Reading the Weather of the Past','Artículo científico','Ciencia', '''Weather records from the last few decades tell us a great deal about recent conditions. But how can researchers learn about temperatures and rainfall from hundreds or even thousands of years ago? They often study natural evidence that changed as the environment changed.

For example, the growth rings of some trees can reveal information about past growing conditions. Scientists also examine layers of ice and sediment. Each source provides a different kind of evidence, and none offers a perfect daily weather report. A narrow tree ring might be connected to a dry year, but other factors could also affect growth.

Researchers therefore compare several records before drawing conclusions. Their aim is not to guess the weather on a particular Tuesday long ago. Instead, they look for broader patterns and changes over time. Studying past climates can help scientists understand natural variation and put present-day observations in a longer context.''',
 'rings=anillos;sediment=sedimento;variation=variación', '''What can tree rings help researchers investigate?|Past growing conditions|The price of wood|Ancient street names|Los anillos reflejan condiciones de crecimiento.
Why do scientists compare different records?|Each record has limitations|Every tree gives exactly the same results|Ice records are always wrong|Ninguna fuente por sí sola ofrece una reconstrucción perfecta.
What is the main goal of these studies?|To identify long-term patterns|To predict the exact weather on an old Tuesday|To write a fictional travel guide|Buscan patrones amplios a través del tiempo.''',
 'A narrow tree ring always proves that a year was dry.|False|El texto señala que otras causas también influyen en el crecimiento.',
 'To explain how researchers study past climate|To advertise a weather app|To teach visitors how to plant a garden')

add('b1','Lunch from Nearby Farms','Reportaje','Alimentación', '''A school district has started buying some vegetables from farms near its towns. The organisers hope the arrangement will help students learn where food comes from and give local farmers a more regular market. Each month, a different vegetable appears on the lunch menu, together with a short explanation about how it is grown.

The change has required careful planning. Farmers cannot always supply the same vegetables throughout the year, and school kitchens must prepare meals for hundreds of children. Staff have therefore designed flexible menus and kept other suppliers available. The district also checks that food meets its safety and quality requirements.

Students have different opinions. Some enjoy discovering new dishes, while others prefer familiar meals. Teachers use this as an opportunity to discuss taste, nutrition and seasonal food without forcing everyone to like the same thing. The project is still being evaluated, so its organisers avoid claiming that all its goals have already been achieved.''',
 'district=distrito;supply=suministrar;seasonal=de temporada', '''Why did the district start buying local vegetables?|To teach about food and support local markets|To stop serving all other food|To replace school kitchens|Los objetivos son educativos y comerciales para agricultores locales.
Why must the menus be flexible?|Farm products change with seasons|Students never eat lunch|Every vegetable lasts for years|La disponibilidad depende de la temporada.
How are the project's results described?|Still being evaluated|Fully proven in every school|A complete failure|Los organizadores evitan anunciar éxitos no medidos.''',
 'All students enjoy the new dishes equally.|False|Hay opiniones distintas entre los estudiantes.',
 'To report on a school food initiative and its challenges|To explain how trees form rings|To review a television show')

add('b1','The Journey of a Cotton T-shirt','Explicación','Consumo', '''A cotton T-shirt looks like a simple product, yet it may pass through many places before reaching a shop. Cotton is grown, collected and processed into fibres. The fibres become thread, and factories turn the thread into fabric. Later, another factory may cut and sew the fabric into clothing.

Transport connects these stages. Labels do not always reveal the full journey, and the country where a shirt is sewn might be different from the country where its cotton was grown. The people and organisations involved make decisions about energy, water, working conditions and quality.

After buying the shirt, the customer also becomes part of its story. Washing, repairing and using it for longer can affect its total impact. A single label such as “green” cannot explain every part of the process. Comparing products responsibly requires asking specific questions and checking the evidence behind advertising claims.''',
 'fibres=fibras;fabric=tela;claims=afirmaciones', '''Which stage comes before making fabric?|Turning fibres into thread|Sewing on a label|Selling the shirt|Las fibras se convierten en hilo antes de fabricar la tela.
Why can a country-of-origin label be incomplete?|Production may happen in several places|Labels are always fictional|All shirts are handmade in one town|La fabricación puede repartirse entre países.
What can customers do after purchase?|Use and repair a shirt for longer|Know the full factory history instantly|Remove every impact of cotton|El uso y reparación también forman parte del ciclo del producto.''',
 'The country where a shirt is sewn must be where its cotton grew.|False|El texto presenta explícitamente la posibilidad contraria.',
 'To explain the stages and choices behind a T-shirt|To introduce a music course|To tell an adventure story')

add('b1','Birdwatchers as Citizen Scientists','Artículo informativo','Ciencia', '''Professional researchers cannot observe every bird in every park on the same day. Citizen-science projects invite members of the public to help collect information, often by recording the species they see and where they see them. This can create a much wider picture than one small research team could produce alone.

Accuracy matters. Volunteers are usually asked to follow clear instructions, avoid counting the same bird repeatedly and report when they are unsure about an identification. Some projects provide photographs or recordings to help participants learn. Researchers later check unusual reports and consider possible errors in the data.

A local group recently counted birds around its town for one weekend. The activity encouraged people to notice wildlife in familiar streets. However, the organiser reminded everyone that a weekend survey cannot reveal every change in bird populations. Repeated observations and careful analysis are needed before drawing broader conclusions.''',
 'species=especies;identification=identificación;survey=estudio', '''What do citizen-science volunteers record?|Bird species and locations|Only the colour of benches|Daily train tickets|Registran especies y lugares observados.
Why should volunteers report uncertainty?|To improve data quality|To receive more points|To avoid working with scientists|Declarar dudas permite revisar registros y reducir errores.
Why is one weekend not enough for broad conclusions?|More repeated data is needed|Birds never move|Weather never changes|La observación puntual tiene limitaciones para inferir tendencias.''',
 'Researchers accept every unusual bird report without checking.|False|Los reportes poco comunes se revisan.',
 'To explain how public participation can help bird research|To advertise binoculars|To explain school lunch prices')

add('b1','Signs That People Actually Understand','Artículo de diseño','Comunicación', '''Public signs are meant to help people find places, avoid danger and understand rules. Yet a sign can fail even when every word is technically correct. Long sentences, unfamiliar vocabulary and poor contrast make information harder to notice, especially when someone is moving quickly or feeling stressed.

Designers often begin by asking what a person needs to do. A railway sign, for example, should help passengers find their platform without reading a paragraph. Clear symbols can support written instructions, although symbols must be tested because people may interpret them differently.

A hospital recently redesigned some direction signs after visitors repeatedly became lost. Staff tested two versions with volunteers and watched where people hesitated. They discovered that moving a sign was sometimes more useful than changing its wording. The lesson was simple: good communication depends on the reader's situation, not only the writer's intentions.''',
 'contrast=contraste;platform=andén;hesitated=dudaron', '''What can make a sign difficult to use?|Long text and poor contrast|Clear placement|Simple language|Oraciones largas y bajo contraste dificultan su lectura.
What did the hospital test?|Two versions of direction signs|Two bus engines|Different hospital meals|Probaron dos versiones de señalización.
What surprising improvement helped visitors?|Moving a sign|Printing longer instructions|Removing all arrows|En algunos casos era mejor cambiar el lugar del cartel.''',
 'A correct sentence always makes a useful sign.|False|Una frase correcta puede fallar por diseño o contexto.',
 'To explain principles of effective public signs|To describe the history of cotton|To provide a weather forecast')

add('b1','Learning from Home: Strengths and Limits','Artículo comparativo','Educación', '''Online lessons allow students to join a class without travelling to a school building. Recorded explanations can be replayed, and digital documents are easy to share. For learners who live far from a specialist teacher, these opportunities may be especially valuable.

However, access is not equal. Some students have unreliable internet connections, noisy homes or limited access to a suitable device. Others find it difficult to ask a quick question or stay focused during long video meetings. Teachers may also struggle to notice confusion when cameras are off.

One school introduced a mixed approach: short online explanations followed by classroom discussions and independent practice. The team asked students for feedback and changed the length of some activities. Its experience suggests that the best choice depends on the learner, the task and the available resources. Online learning is a tool, not an automatic solution to every problem.''',
 'replayed=reproducido de nuevo;unreliable=poco fiable;approach=enfoque', '''Which advantage is mentioned?|Recorded lessons can be replayed|Everyone has fast internet|Teachers never need preparation|Se pueden volver a ver las explicaciones grabadas.
What makes learning harder for some students?|Noise or unreliable connections|Too many printed books|A quiet study room|El hogar y la conexión pueden dificultar la participación.
How did the school improve its mixed approach?|It used student feedback|It removed all discussions|It stopped asking questions|El equipo ajustó actividades según comentarios de estudiantes.''',
 'Online learning is always better than classroom learning.|False|El artículo presenta beneficios y limitaciones de ambos enfoques.',
 'To compare opportunities and limitations of online learning|To explain the history of public buses|To invite students to a party')

add('b1','Restoring an Old Town Hall','Reportaje','Patrimonio', '''The oldest building in Westbridge is a town hall that has stood in the main square for more than a century. Its roof leaked, and some windows were damaged. The council wanted to repair it, but residents disagreed about how much of the original design should be preserved.

A team of specialists first examined the walls and roof to understand which repairs were necessary. They photographed details and searched for old drawings. Some modern materials were chosen for safety, while certain decorative features were carefully restored.

The building reopened with public meeting rooms and a small exhibition about local history. Not everyone liked every decision, but the project showed why restoring a historic place is different from constructing a new one. Builders must balance safety, current needs and the evidence of the past. The town now has a useful building and a visible reminder of its history.''',
 'restoring=restauración;preserved=conservado;decorative=decorativo', '''What problem affected the town hall?|A leaking roof|A broken bridge|A fire in the library|El techo dejaba pasar agua.
Why did specialists search for old drawings?|To understand original features|To plan a football field|To choose lunch menus|Los dibujos ayudaban a documentar el diseño histórico.
What does restoration require balancing?|Safety, current use and history|Only the cheapest paint|Only the number of tourists|Se deben equilibrar necesidades actuales, seguridad y patrimonio.''',
 'Every resident agreed about the design.|False|Se mencionan desacuerdos sobre la conservación.',
 'To explore the decisions involved in restoring a building|To explain why clouds form|To advertise new apartments')

add('b1','What Changes When a Bus Route Changes?','Artículo informativo','Transporte', '''A city can change its bus network by adding stops, adjusting timetables or connecting neighbourhoods that previously had few services. Such changes may make travelling easier for some people, but they can create new difficulties for others.

In one city, transport planners moved a route closer to a hospital and a shopping area. They expected more passengers to use it. However, some residents complained that their former stop was now too far away. The council collected comments and studied how long different journeys took.

The planners eventually added a connecting service during busy hours. They also improved the information shown at stops. The case illustrates why a route should not be judged only by the number of passengers it carries. Accessibility, waiting times and the needs of people with different mobility levels also matter. A successful change requires listening as well as counting.''',
 'timetables=horarios;accessibility=accesibilidad;mobility=movilidad', '''Why was the route moved?|To serve a hospital and shopping area|To close all stations|To make buses smaller|La nueva ruta pasaba más cerca de servicios importantes.
What problem did some residents report?|Their old stop became too far away|Buses were painted blue|Tickets became free|A algunos vecinos les quedaba más lejos el acceso.
What did planners add later?|A connecting service|A train line to another country|A private airport|Añadieron un servicio de conexión en horas punta.''',
 'Passenger numbers are the only useful measure of a bus route.|False|El artículo también destaca accesibilidad y tiempos de espera.',
 'To examine the effects of changing bus routes|To review a historic novel|To explain a recipe')

add('b1','Where Do Borrowed Words Come From?','Artículo lingüístico','Lengua', '''Languages change whenever people use them. One way they change is by borrowing words from other languages. English, for example, contains words that entered through travel, trade, science and cultural contact. Sometimes a borrowed word keeps a familiar meaning; sometimes people adapt its pronunciation or use it in new ways.

Borrowing is not evidence that a language is weak. Speakers often need names for unfamiliar foods, inventions or experiences. In other cases, a foreign word becomes popular even though another expression already exists. Over time, a borrowed word may feel so ordinary that most speakers forget its history.

Linguists study these changes by examining old texts, comparing pronunciations and tracing how words were used. They also warn that the origin of a word can be complicated: it may pass through several languages before reaching its current form. A dictionary entry is often the beginning of the story, not the whole story.''',
 'borrowing=préstamo lingüístico;pronunciation=pronunciación;tracing=rastreando', '''Why do languages borrow words?|Because of contact and changing needs|Because speakers stop using grammar|Because dictionaries are too short|El contacto cultural y las nuevas necesidades influyen.
What may happen to a borrowed word?|Its meaning or pronunciation may change|It must disappear in one year|It can never be used in writing|Su significado o pronunciación puede adaptarse.
Why can word origins be difficult to trace?|Words may travel through several languages|All words were invented yesterday|Old texts never contain words|El recorrido de un préstamo puede incluir varias lenguas.''',
 'Borrowed words prove that a language is weak.|False|El texto rechaza explícitamente esa interpretación.',
 'To explain how word borrowing works|To teach the rules of a board game|To describe a city garden')

add('b1','Saving Water in a Dry Town','Reportaje','Medio ambiente', '''A town that experiences long dry seasons has introduced several ways to use water more carefully. Public buildings now check their taps and pipes for leaks. Garden teams have replaced some thirsty plants with species better suited to local conditions. Schools discuss everyday water use in science classes.

These steps are relatively simple, but larger decisions are harder. Farmers, households and businesses all need water, and changes to one system can affect others. Town officials publish information about water use and invite residents to ask questions. They also explain that short-term savings do not remove the need for long-term planning.

At home, one family discovered that a leaking tap had been wasting water for weeks. Fixing it was straightforward, but the family learned a broader lesson: measuring a problem can be the first step toward solving it. The town's programme will be reviewed after a full year to see which changes were most effective.''',
 'leaks=fugas;thirsty=que requiere mucha agua;effective=eficaz', '''What do public buildings check?|Taps and pipes for leaks|Only their paint colours|The number of school desks|Revisan tuberías y grifos para detectar fugas.
Why are larger decisions complicated?|Different groups need water|Water cannot be measured|Every farm uses identical amounts|Los usos del agua compiten y están conectados.
When will the programme be reviewed?|After a full year|Tomorrow morning|After ten years only|La evaluación se prevé tras un año completo.''',
 'Fixing one tap removes the need for long-term water planning.|False|La solución local no sustituye la planificación general.',
 "To report on a town's water-saving efforts|To describe the history of an old town hall|To advertise a new phone")

add('b1','A Museum That Invites Questions','Reportaje','Arte y sociedad', '''Traditional museums often use labels to tell visitors what an object is and when it was made. A new local exhibition takes a slightly different approach. It still provides reliable information, but each room begins with an open question such as “Who decides what deserves to be remembered?”

Visitors see photographs, everyday objects and recorded memories from people of different ages. Some displays place two objects side by side and invite visitors to compare how their meanings have changed. There are no prizes for giving the “correct” personal opinion, although historical facts are carefully checked.

The exhibition team tested the displays with school groups before opening. Students said they enjoyed discussing different interpretations, but they sometimes needed more background information. The team responded by adding short explanations next to challenging objects. Their aim is to encourage curiosity without turning uncertainty into confusion.''',
 'exhibition=exposición;interpretations=interpretaciones;curiosity=curiosidad', '''How does each room begin?|With an open question|With a compulsory examination|With a shopping receipt|Cada sala plantea una pregunta abierta.
Why were explanations added?|Students needed more background|The objects had been sold|Visitors requested longer opening hours|Las pruebas indicaron necesidad de contexto adicional.
How does the museum treat personal opinions?|It welcomes discussion while checking facts|It grades every opinion|It avoids all questions|Promueve interpretaciones sin descuidar datos históricos.''',
 'The exhibition presents every interpretation as a proven historical fact.|False|Se distingue entre opiniones e información histórica comprobada.',
 "To describe a museum's discussion-based approach|To explain the repair of a bus engine|To advertise private art lessons")

add('b2','The Hidden Trade-offs of Fast Delivery','Artículo de análisis','Economía y sociedad', '''Online shoppers have grown accustomed to seeing delivery options measured in hours rather than days. Faster delivery can be convenient, particularly for urgent or essential purchases. Yet the promise of speed can influence how warehouses are organised, how transport routes are planned and how much flexibility workers and customers have.

A company that groups deliveries by neighbourhood may reduce repeated journeys, but it usually needs time to organise those orders. Delivering each item immediately can require more separate trips. The actual environmental effect depends on vehicle types, distance, packaging and the behaviour of shoppers. It would therefore be misleading to claim that every fast delivery is necessarily worse than every slower one.

Customers also face a less obvious choice. An immediate purchase may seem attractive even when the item is not needed urgently. Some services now provide a clear comparison between delivery dates rather than highlighting the fastest one. Advocates say transparent options help people make informed decisions; critics argue that convenience will continue to dominate. The important question is not simply how fast a package arrives, but which costs remain invisible at checkout.''',
 'warehouses=almacenes;misleading=engañoso;checkout=pago final', '''Why can grouped deliveries be more efficient?|They may reduce repeated trips|They eliminate packaging in every case|They make all orders arrive instantly|Agrupar pedidos puede reducir viajes duplicados.
Why is it wrong to say fast delivery is always worse?|Impact depends on several factors|Fast delivery never uses vehicles|Every customer lives near a warehouse|La huella varía por distancia, vehículo y otras condiciones.
What choice do some services make clearer?|Different delivery dates|The colour of delivery uniforms|The number of product photographs|Presentan plazos alternativos para decidir con información.''',
 'The author argues that convenience is the only factor customers should consider.|False|El texto plantea costes y decisiones más amplias.',
 'To analyse benefits and hidden costs of delivery speed|To explain how to repair a computer|To describe a fictional adventure')

add('b2','Cooling a City Without More Air Conditioning','Artículo científico','Urbanismo y clima', '''During hot periods, dense neighbourhoods can remain uncomfortable even after sunset. Buildings and paved surfaces absorb energy during the day and release it later. Air conditioning can protect people from dangerous indoor heat, but the electricity it uses and the heat released by some systems raise further planning questions.

Urban designers therefore explore several complementary approaches. Trees provide shade and help cool nearby air, while reflective roofs can reduce the amount of solar energy absorbed by buildings. Well-designed ventilation and shaded public spaces can improve comfort. However, each approach has limitations. Trees need water and growing space, reflective materials must suit local conditions, and better ventilation cannot replace essential cooling in every climate or building.

A city considering these measures should measure temperatures in different streets and speak with residents about their needs. Installing an attractive project in one neighbourhood does not guarantee equal benefits elsewhere. The strongest plans combine immediate protection for vulnerable people with longer-term improvements to buildings, streets and public transport.''',
 'dense=densamente construido;reflective=reflectante;vulnerable=vulnerable', '''Why do paved areas stay warm after sunset?|They release stored daytime heat|They produce sunlight at night|They stop all movement of air|Las superficies liberan energía acumulada.
What limitation of reflective roofs is mentioned?|They must suit local conditions|They always increase rainfall|They work only under trees|Su utilidad depende del clima y del edificio.
What makes an urban cooling plan stronger?|Combining immediate protection with long-term changes|Replacing all hospitals with parks|Using one solution in every street|Se propone combinar urgencia y planificación de fondo.''',
 'Planting trees removes every need for indoor cooling.|False|El texto explica que ninguna solución sustituye todas las necesidades.',
 'To evaluate complementary strategies for urban heat|To teach children a short song|To review a tourist hotel')

add('b2','Can We Trust Online Reviews?','Artículo crítico','Tecnología y consumo', '''When choosing a restaurant, course or electronic device, many people consult online reviews. They offer information that advertisements may overlook, especially when reviewers describe specific experiences. Nevertheless, an average rating can create an impression of certainty that the underlying evidence does not justify.

A product with a high score based on only three reviews is not necessarily more reliable than one with a slightly lower score from hundreds of purchasers. Reviews may also be outdated, influenced by expectations or written by people whose needs differ greatly from ours. Some platforms attempt to identify suspicious patterns, but no detection system is perfect.

A critical reader looks beyond the headline score. Useful questions include whether the reviewer actually used the product, which features mattered to them and whether recent comments describe the same problem repeatedly. Contradictory accounts should not always be dismissed; they may reveal differences in context. Reading reviews carefully is less about finding a perfect rating than understanding the uncertainties behind a decision.''',
 'underlying=subyacente;suspicious=sospechoso;contradictory=contradictorio', '''Why can a high average rating be misleading?|It may be based on very few reviews|It guarantees excellent service|It includes no numbers|Una media con pocas opiniones aporta evidencia limitada.
Why might honest reviews disagree?|Users have different needs and contexts|Every reviewer lies|Platforms prohibit different opinions|Las experiencias pueden variar según expectativas y usos.
What does the author recommend?|Inspecting evidence beyond the score|Trusting only the latest star rating|Ignoring all review details|Se recomienda examinar detalles, patrones y contexto.''',
 'A platform can identify every suspicious review perfectly.|False|El texto advierte que los sistemas de detección no son perfectos.',
 'To assess the strengths and weaknesses of online reviews|To advertise a particular restaurant|To explain how to plant a tree')

add('b2','Rewilding the Neighbourhood','Artículo de debate','Biodiversidad', '''Rewilding usually refers to allowing ecological processes to recover with less continuous human control. In urban settings, the term is sometimes used for reducing mowing, restoring native plants or reconnecting small habitats. Supporters hope these measures will create more room for insects, birds and other wildlife.

Yet a city is not an empty landscape. Parks serve people with different needs, and unmanaged areas can create difficulties if paths become inaccessible or invasive plants spread. Ecologists also caution that an attractive patch of wildflowers does not automatically become a healthy ecosystem. Successful projects require monitoring, appropriate species and attention to local conditions.

One town experimented with leaving parts of a large park unmown during spring. Signs explained why the grass looked different, while walking paths and sports areas remained maintained. After receiving feedback, the council changed some boundaries. The project illustrates a wider point: rewilding should be evaluated through ecological evidence and public use, not treated as a fashionable label that removes the need for planning.''',
 'rewilding=renaturalización;invasive=invasoras;unmown=sin segar', '''What is an urban rewilding measure mentioned?|Reducing mowing in selected areas|Replacing all parks with shops|Removing every walking path|Dejar zonas sin segar es una medida descrita.
What problem can poor planning cause?|Inaccessible paths or invasive plants|Perfect biodiversity everywhere|Automatic growth of native forests|La falta de manejo puede afectar acceso y especies.
Why did the council change boundaries?|It considered feedback about the trial|All grasses died immediately|The park was sold|Ajustó los límites después de escuchar comentarios.''',
 'Any patch of wildflowers automatically becomes a healthy ecosystem.|False|El artículo rechaza esa equivalencia simple.',
 'To weigh ecological benefits against practical urban constraints|To teach the names of garden tools|To describe a school timetable')

add('b2','When Numbers Tell Different Stories','Artículo de análisis','Pensamiento crítico', '''Imagine two schools reporting that their reading results improved. School A says its average score increased by ten points; School B says the proportion of students meeting a target rose by ten percentage points. Both statements may be accurate, but they measure different things. Comparing them as if they were identical could produce an unfair judgement.

Statistics depend on definitions, the groups measured and the period selected. A percentage can look impressive without revealing how many people were involved. Similarly, an average can hide substantial differences between individual learners. A graph with a shortened vertical axis may make a modest change appear dramatic even when the numbers themselves are correct.

A responsible reader asks what was counted, how it was counted and what alternatives might explain the change. Were the same students tested? Did the assessment become easier? Were there other changes in teaching? Numbers are essential for evaluating evidence, but they do not interpret themselves. The aim is not to distrust every statistic; it is to learn which questions make statistics meaningful.''',
 'proportion=proporción;substantial=considerable;vertical axis=eje vertical', '''Why are the two schools' improvements not directly comparable?|They describe different measures|One school has no students|Neither used any numbers|Una habla de promedio y la otra de un umbral.
What can a shortened graph axis do?|Exaggerate the visual appearance of change|Change test answers automatically|Make every percentage wrong|La escala puede hacer que un cambio parezca mayor.
Which question improves statistical interpretation?|Were the same students tested?|Was the graph printed in colour?|Who designed the school logo?|La comparabilidad de grupos afecta las conclusiones.''',
 'Every statement containing a percentage is necessarily false.|False|El texto propone interpretar cuidadosamente, no rechazar las estadísticas.',
 'To teach critical interpretation of statistical claims|To announce a mathematics contest|To explain how rainfall happens')

add('b2','Why Community Archives Matter','Artículo cultural','Historia y memoria', '''National archives preserve documents of broad historical significance, but smaller community collections can reveal experiences that official records overlook. Local photographs, meeting notes, letters and oral histories may show how residents responded to changes in work, migration or public space.

Collecting these materials raises questions as well as opportunities. A photograph might contain people who never agreed to have their image published online. A recorded interview can reveal personal details that deserve protection. Archivists therefore consider consent, access restrictions and the circumstances in which each item was created. They also document who provided an object rather than presenting every collection as a neutral picture of the past.

In one neighbourhood, volunteers created a digital catalogue of community newsletters. Instead of uploading everything immediately, they contacted contributors and reviewed material for sensitive information. Their slower approach attracted less publicity at first, but it helped build trust. A useful archive is not simply the largest collection; it is one that preserves context and treats contributors responsibly.''',
 'archives=archivos históricos;consent=consentimiento;contributors=colaboradores', '''What can community archives reveal?|Experiences absent from official records|The exact future of a town|Only national election results|Aportan testimonios que pueden faltar en fuentes oficiales.
Why is consent relevant to old photographs?|People pictured may not have agreed to online publication|Every photograph is public by default|Photographs contain no personal information|La difusión puede afectar derechos y privacidad.
Why did volunteers delay uploading materials?|To review permissions and sensitive details|Because the internet was invented later|To sell all the documents|Revisaron procedencia y autorización antes de publicar.''',
 'The largest archive is always the most responsible one.|False|Se da prioridad a contexto y trato responsable, no volumen.',
 'To explore the historical value and ethical duties of local archives|To compare two recipes|To advertise digital cameras')

add('b2','Understanding Food Labels','Artículo crítico','Salud y consumo', '''Food packaging often uses short phrases to attract attention: “natural”, “high in protein” or “made with whole grains”. Such descriptions may convey useful information, but their meaning depends on the rules applied and the rest of the product. A single claim cannot replace a careful look at ingredients, portion sizes and the wider context of someone's diet.

For example, two foods can both contain protein while differing substantially in fibre, salt or added sugars. Serving sizes can also influence how numbers appear. Comparing products requires checking that the quantities refer to comparable amounts. It is especially important to distinguish a factual nutrition statement from the impression created by colours, images and advertising language.

Educational campaigns that teach label-reading skills should avoid turning every choice into a moral judgement. Food decisions depend on availability, culture, accessibility and individual needs. The practical goal is to interpret the information provided and notice what it does not tell us. That approach supports informed choices without suggesting that one label can define an entire eating pattern.''',
 'packaging=envase;serving size=tamaño de porción;fibre=fibra', '''Why should similar label claims be compared carefully?|Products may differ in other nutrients|All labels mean the same thing|Serving sizes never vary|Una afirmación no informa por sí sola de toda la composición.
What is important when comparing numerical values?|Using comparable quantities|Comparing only package colours|Ignoring portion sizes|Las cifras deben referirse a cantidades equivalentes.
What should education about labels avoid?|Moralising individual food choices|Explaining serving sizes|Checking ingredients|El texto propone informar sin juzgar elecciones personales.''',
 'A single claim on the front of a package explains the entire diet.|False|El artículo insiste en el contexto y la información completa.',
 'To explain how to interpret food labels critically|To advertise one food brand|To provide a recipe for bread')

add('b2','Designing Streets for More People','Artículo de urbanismo','Accesibilidad', '''A street is a shared space, but its design can favour some users while making life difficult for others. Narrow pavements may be manageable for an unhurried adult yet create barriers for wheelchair users, people pushing prams or pedestrians travelling in groups. Poorly placed signs can be obstacles, while crossings that change too quickly may leave some people struggling to reach the other side safely.

Designing for accessibility begins by studying how different people actually use the space. Engineers may collect measurements, but they also need conversations with residents and observations at different times of day. Improvements might include smoother surfaces, clear crossing signals, protected cycle routes or benches at useful intervals.

Trade-offs still exist. Removing parking spaces can be controversial, and a cycle lane must connect to other safe routes to be valuable. A council that tests changes, explains its reasoning and measures their effects can make better decisions than one relying on assumptions. The most inclusive street is not necessarily the one with the most features; it is the one whose features work together for a broad range of people.''',
 'pavements=aceras;prams=cochecitos;inclusive=inclusivo', '''Why might a narrow pavement be a barrier?|Different people need different amounts of space|Pavements are only for cars|Everyone walks at the same speed|El espacio puede dificultar movilidad y acompañamiento.
What should measurements be combined with?|Residents' experiences and observations|Only photographs of buildings|Advertising slogans|Los datos físicos necesitan contexto de uso real.
Why is a disconnected cycle lane less useful?|It may not connect to safe routes|It is always too long|It cannot have signs|La red necesita continuidad para ser práctica.''',
 'Adding the greatest possible number of features always creates the best street.|False|La coordinación y utilidad de las medidas es más importante que la cantidad.',
 'To examine inclusive street design and its trade-offs|To describe a historic concert|To explain how bread rises')

add('b2','The Environmental Cost of Digital Life','Artículo científico','Tecnología y ambiente', '''A digital message feels weightless because it appears instantly on a screen. Yet the services behind it rely on physical equipment: data centres, networks and devices that must be manufactured, powered and maintained. Assessing their environmental impact is complicated because energy sources, equipment efficiency and patterns of use differ widely.

One popular claim is that every online activity has a single fixed carbon cost. Such figures can be misleading if they ignore where electricity is generated or how infrastructure is shared among users. Streaming a video at different resolutions, for example, changes the amount of data transferred, but the relationship between data and energy is not always simple or proportional.

Practical decisions involve several levels. Manufacturers can improve the lifespan and repairability of devices; service providers can report and reduce energy use; and users can avoid replacing functioning equipment unnecessarily. A serious discussion should measure these actions rather than treating every click as equally harmful. Digital technology offers real benefits, but understanding those benefits also means acknowledging its material foundations.''',
 'data centres=centros de datos;proportional=proporcional;repairability=facilidad de reparación', '''Why is digital activity not literally weightless?|It relies on physical equipment|It occurs only on paper|It requires no electricity|Hay infraestructura física detrás de las pantallas.
Why can a fixed carbon figure for each click mislead?|Energy systems and shared infrastructure vary|Every device is identical|Only text messages use energy|El impacto depende de condiciones y mediciones.
What action is suggested for device users?|Avoid unnecessary replacement of working devices|Replace every device yearly|Stop all internet communication|Prolongar el uso puede ser una medida práctica.''',
 'Data transferred and energy consumption are always perfectly proportional.|False|El texto cuestiona expresamente esa relación simple.',
 'To examine environmental impacts of digital services with nuance|To advertise a new phone model|To explain street navigation')

add('b2','What Gets Lost in Translation?','Ensayo cultural','Lengua y cultura', '''Translating a story involves more than replacing words with their dictionary equivalents. A joke may depend on a sound that does not exist in another language, while a cultural reference may be unfamiliar to new readers. The translator has to decide which details are essential and how to make them understandable without erasing the original voice.

Consider a character who speaks in an informal regional variety. Reproducing that variety through a different region's dialect could create associations that the author never intended. Using entirely standard language, however, might remove part of the character's personality. There is rarely a solution that preserves every effect at once.

Some translators add a brief note; others reshape a phrase so that its effect resembles the original. Their choices depend on the audience, genre and purpose of the translation. Readers sometimes describe a translation as “faithful” when it sounds natural, but naturalness and literal accuracy are not identical. Understanding translation means recognising that even thoughtful decisions involve interpretation.''',
 'equivalents=equivalentes;dialect=dialecto;faithful=fiel', '''Why can jokes be difficult to translate?|They may depend on language-specific sounds|Every joke uses the same words|Translators never understand humour|La forma lingüística puede ser parte del efecto humorístico.
What is a problem with replacing one regional dialect with another?|It may add unintended associations|It makes the story shorter|It removes all grammar|El dialecto elegido puede sugerir una identidad nueva.
How does the author describe translation choices?|As context-dependent interpretations|As a mechanical word replacement|As completely objective decisions|Traducir implica decisiones interpretativas según público y propósito.''',
 'Literal accuracy and naturalness always mean exactly the same thing.|False|El texto distingue fluidez y correspondencia literal.',
 'To explore the dilemmas faced by literary translators|To teach readers to use a dictionary only|To provide instructions for travelling')

add('b2','Could a Four-Day Workweek Succeed?','Artículo de debate','Trabajo y sociedad', '''A shorter working week is often presented as a simple exchange: fewer days at work, more time for personal life. Supporters argue that better rest and more focused schedules could maintain productivity while improving well-being. Critics respond that results may differ sharply between office-based roles, hospitals, shops and services that must operate every day.

The details of a trial matter. Does the change mean the same pay for fewer hours, or the same weekly hours compressed into longer days? Are extra staff hired? Is performance measured by tasks completed, customer experience or employee satisfaction? These are different arrangements, and using one label for all of them makes comparisons difficult.

A company testing a shorter week might discover that unnecessary meetings disappear, but another may struggle to cover important shifts. Researchers would need to examine outcomes over time and consider which workers benefit or lose flexibility. The most useful debate is not whether a shorter week is universally good or bad, but under which conditions it works and for whom.''',
 'productivity=productividad;compressed=concentrado;shifts=turnos', '''Why are shorter-week trials hard to compare?|They may use different hours and pay arrangements|All workplaces have identical schedules|Nobody measures their results|El término incluye organizaciones muy distintas.
What improvement might one company observe?|Fewer unnecessary meetings|The end of all customer demand|Automatic growth in every industry|Algunas reuniones podrían eliminarse.
What is the central research question?|Under which conditions the change works|Whether every worker likes Mondays|How to make weeks longer|Se evalúan condiciones y distribución de resultados.''',
 'The article claims a four-day week works equally well in every job.|False|Subraya las diferencias entre sectores y condiciones.',
 'To evaluate different models and evidence for shorter workweeks|To explain how to grow trees|To advertise a business conference')

add('b2','Small Experiments, Better Teaching?','Artículo educativo','Aprendizaje', '''Teachers often introduce new activities because they have seen them succeed elsewhere. Yet a method that works for one class may not have the same effect in another. Small classroom experiments can help educators examine their assumptions before making large changes to a course.

Imagine a teacher who wants to improve reading comprehension. She might compare two short teaching approaches over several lessons while keeping the texts and assessment criteria as similar as possible. Even then, the results require caution: students differ, practice itself can improve scores, and a small sample may produce misleading patterns. Students should never lose essential instruction merely to create a comparison.

The greatest value of a small experiment may be the questions it raises. Did learners understand ideas more clearly, or simply remember the answers? Did the change help some students more than others? Was the improvement sustained after several weeks? Rather than treating a promising result as final proof, reflective teachers combine evidence with professional judgement, learner feedback and further observation.''',
 'assumptions=supuestos;sample=muestra;sustained=sostenido', '''Why might a successful method fail in another class?|Learners and contexts differ|Learning is always identical|Teachers cannot change activities|Los contextos educativos varían entre grupos.
What makes a classroom comparison more reliable?|Similar materials and assessment criteria|Completely different tests every time|Giving one group no teaching|Controlar diferencias ayuda a interpretar resultados.
Why is a short-term score increase not final proof?|It may not show lasting understanding|Every assessment is useless|Students cannot learn from practice|Una subida puede reflejar memoria inmediata y no comprensión durable.''',
 'A classroom experiment should remove essential teaching from some students.|False|El texto advierte que no debe privarse a estudiantes de instrucción necesaria.',
 'To examine how cautious classroom experiments inform teaching|To describe a history museum|To teach a simple musical rhythm')

# Equilibrar las tres respuestas de evidencia: True, False y Not Given.
# Las afirmaciones True están explícitamente respaldadas por el pasaje;
# Not Given pregunta por datos ausentes, no por afirmaciones falsas.
overrides={
'a1-01':('The school garden is behind the library.','True','El primer párrafo sitúa allí el jardín.'),
'a1-02':('Bees collect nectar from flowers.','True','El texto explica que las abejas recogen néctar.'),
'a1-03':('The library also lends musical instruments.','Not Given','La lectura no indica si presta instrumentos.'),
'a1-04':('The bus crosses a bridge.','True','El recorrido incluye el puente.'),
'a1-05':('Mina lives next door to Omar.','Not Given','Se explica qué hacen en clase, pero no dónde viven.'),
'a1-07':('Sara buys oranges during her visit.','Not Given','Se mencionan manzanas, papas y pan, pero no naranjas.'),
'a1-08':('Luis helps by washing fruit.','True','El segundo párrafo afirma que lava fruta.'),
'a1-09':('The park café serves orange juice.','Not Given','Se indica dónde está el café, pero no sus bebidas.'),
'a2-01':('The rain garden needs maintenance.','True','Los vecinos retiran residuos y reemplazan plantas.'),
'a2-02':('The volunteers are paid by the town council.','Not Given','El texto no especifica remuneración o financiación.'),
'a2-04':('The library offers classes about online information.','True','El taller de los jueves trata sobre información fiable en internet.'),
'a2-05':('The solar panel was made in Japan.','Not Given','No se informa dónde se fabricó el panel.'),
'a2-07':('Every resident helped plant the trees.','Not Given','El texto describe un grupo de vecinos, no a toda la población.'),
'a2-08':('The teacher asks learners to compare two loaves.','True','La clase compara panes con distintos tiempos de reposo.'),
'a2-10':('Lina changes her budget after higher transport costs.','True','El último párrafo dice que modifica el plan.'),
'a2-11':('The newspaper is printed on recycled paper.','Not Given','No hay datos sobre el papel utilizado.'),
'b1-01':('Some people questioned the garden spending.','True','Se mencionan críticas por otras prioridades presupuestarias.'),
'b1-02':('The research team works at a university in Canada.','Not Given','No se identifica una institución ni país concreto.'),
'b1-04':('A T-shirt may be made in more than one country.','True','Se describen etapas productivas en lugares diferentes.'),
'b1-05':('The town counted exactly 120 bird species.','Not Given','El texto no da una cifra concreta de especies.'),
'b1-07':('Online lessons can be replayed.','True','El texto destaca la repetición de explicaciones grabadas.'),
'b1-08':('The town hall reopened with meeting rooms.','True','La reapertura incluyó salas de reunión.'),
'b1-10':('All the borrowed words discussed came from French.','Not Given','No se menciona una lista de orígenes concretos de palabras.'),
'b1-11':('The water-saving programme cost exactly $50,000.','Not Given','No se presenta un coste concreto del programa.'),
'b2-01':('The delivery company uses electric vans in every city.','Not Given','El artículo no nombra ninguna empresa específica ni flota.'),
'b2-02':('Urban trees need space and water.','True','El texto presenta estas necesidades como límite práctico.'),
'b2-04':('The trial park contained six lakes.','Not Given','No se especifica ningún número de lagos.'),
'b2-05':('A shortened vertical axis can exaggerate a visual difference.','True','Se explica expresamente ese efecto gráfico.'),
'b2-06':('The newsletters were first published in 1987.','Not Given','No se indica ningún año específico de edición.'),
'b2-08':('Street designs can disadvantage wheelchair users.','True','Las aceras estrechas se presentan como barreras posibles.'),
'b2-10':('Literary translation may involve difficult choices about dialects.','True','El segundo párrafo analiza precisamente esa dificultad.'),
'b2-12':('The teacher conducted her experiment at a school in Peru.','Not Given','El ejemplo es hipotético y no se ubica en un país.')
}
for item in items:
 if item['id'] in overrides:
  text,ans,why=overrides[item['id']]
  item['claim']={'text':text,'answer':ans,'why':why}

# Construcción reproducible. Incluye preguntas de idea principal, detalles, vocabulario y verdadero/falso/no se menciona.
for x in items:
    q=[]
    for fact in x.pop('facts'):
        q.append({'kind':'choice','skill':fact['skill'],'prompt':fact['prompt'],'options':[fact['correct'],*fact['distractors']],'answer':fact['correct'],'why':fact['why']})
    purpose=x.pop('purpose')
    q.append({'kind':'choice','skill':'propósito','prompt':'What is the main purpose of this text?','options':[purpose['correct'],purpose['wrong1'],purpose['wrong2']],'answer':purpose['correct'],'why':'La respuesta resume la finalidad del texto completo; las otras opciones no coinciden con su contenido.'})
    gloss=x['glossary']; key=gloss[0]
    q.append({'kind':'choice','skill':'vocabulario','prompt':f'In this text, what does "{key["word"]}" mean?','options':[g['es'] for g in gloss],'answer':key['es'],'why':f'En este contexto, «{key["word"]}» significa «{key["es"]}». Relee la frase donde aparece.'})
    claim=x.pop('claim')
    q.append({'kind':'tfng','skill':'evidencia','prompt':f'{claim["text"]} — Is this statement true, false, or not given?','options':['True','False','Not Given'],'answer':claim['answer'],'why':claim['why']})
    for i, question in enumerate(q):
        if question['kind']=='choice':
            pos=(int(x['id'][-2:])+i*2)%3
            question['options']=question['options'][pos:]+question['options'][:pos]
    x['questions']=q
    x['words']=len(' '.join(x['paragraphs']).split())
    x['readingMinutes']=max(2,round(x['words']/115+len(q)/3))
    x['challenge']={'a1':'Escribe 2 frases en inglés con información del texto.','a2':'Resume el texto en 3 frases y explica una idea nueva.','b1':'Escribe un resumen de 60 a 90 palabras con dos datos del texto.','b2':'Redacta un comentario crítico de 100 a 140 palabras: tesis, evidencia y un matiz.'}[x['level']]
levels={k:sum(x['level']==k for x in items) for k in ('a1','a2','b1','b2')}
assert levels==dict.fromkeys(levels,12),levels
for x in items:
    assert len(x['questions'])==6
    assert len(set(g['es'] for g in x['glossary']))==3
    assert all(len(q['options'])==3 and q['options'].count(q['answer'])==1 for q in x['questions'])
    assert x['words']>=({'a1':70,'a2':105,'b1':130,'b2':155}[x['level']]),(x['id'],x['words'])
    full=' '.join(x['paragraphs']).casefold()
    for v in x['glossary']:
        assert v['word'].casefold() in full,(x['id'],v['word'])
source=pathlib.Path(__file__).resolve().parents[1]
(source/'src/reading-library.json').write_text(json.dumps({'edition':'Hello English · Reading Academy · 2026','original':True,'readings':items},ensure_ascii=False,indent=1)+'\n',encoding='utf8')
print(f'Lecturas originales: {len(items)}; preguntas: {sum(len(x["questions"]) for x in items)}; palabras en textos: {sum(x["words"] for x in items)}; por nivel: {levels}')
