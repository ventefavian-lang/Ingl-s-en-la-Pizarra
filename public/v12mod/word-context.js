import {readRecord} from './progress.js';
export const normaliseText=s=>String(s||'').trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');
export const wordTokens=s=>[...String(s).matchAll(/\b[a-z]+(?:['’][a-z]+)?\b/gi)].map(m=>({word:normaliseText(m[0]),text:m[0],start:m.index,end:m.index+m[0].length}));
export function knownWords(store){const out={};for(const level of ['a1','a2','b1','b2']){const p=level===store.courseId?store.getState():readRecord(store.storage,'hello-english:'+level+':'+store.scope).state;for(const[k,v]of Object.entries(p.lexicon||{})){for(const token of [k,...(k.includes(' ')?wordTokens(k).map(t=>t.word):[])])if(!out[token]||v[1]>out[token][1])out[token]=v;}}return out;}
export function sentenceAt(text,offset){if(typeof Intl.Segmenter==='function')for(const x of new Intl.Segmenter('en',{granularity:'sentence'}).segment(text))if(offset>=x.index&&offset<x.index+x.segment.length)return x.segment.trim();return text.trim();}
export function phraseAt(text,offset,phrases){let best=null;for(const p of phrases){const rx=new RegExp('\\b'+p.en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/[’‘]/g,"'")+'\\b','gi');let m;while((m=rx.exec(text.replace(/[’‘]/g,"'"))))if(offset>=m.index&&offset<m.index+m[0].length&&(!best||p.en.length>best.en.length))best=p;}return best;}
const rows=[
["give me a hand","echarme una mano / ayudarme","Give someone a hand significa ayudar, no entregar una mano literalmente."],
["up to you","tú decides / te corresponde a ti","En be up to you, la decisión corresponde a la persona con la que se habla."],
["look forward to","tener ganas de / esperar con ilusión","To es una preposición en esta expresión. Después va un nombre o -ing: I look forward to seeing you."],
["looking forward to","tener ganas de / esperar con ilusión","Después de to va un nombre o -ing: meeting, seeing, hearing. No se traduce palabra por palabra."],
["I'd like","quisiera / me gustaría","I'd significa I would aquí. I'd like + nombre pide algo; I'd like to + verbo dice qué quieres hacer."],
["would like","quisiera / me gustaría","Expresa un deseo o una petición amable. Con otro verbo se usa would like to + verbo base."],
["look after","cuidar de","Look after es un verbo compuesto. After no significa después en esta combinación."],
["get along with","llevarse bien con","Describe una relación, no un movimiento físico."],
["get on with","llevarse bien con / continuar con","Puede describir una relación o continuar una tarea; la frase completa distingue los sentidos."],
["used to","solía / acostumbrado a","Used to + verbo base describe hábitos pasados. Be/get used to + nombre o -ing significa estar/acostumbrarse a algo."],
["have to","tener que","Have to + verbo base expresa obligación. Don't have to significa que no es necesario; no que esté prohibido."],
["there is","hay (singular)","Introduce la existencia de algo singular o incontable. There no significa allí en esta estructura."],
["there are","hay (plural)","Introduce la existencia de varias cosas. No traduzcas there y are por separado."],
["a lot of","mucho / muchos","Se usa con nombres contables plurales o incontables."],
["a few","unos pocos","Va con nombres contables plurales. A few destaca que sí hay algunos; few destaca la escasez."],
["a little","un poco","Con nombres incontables expresa una cantidad pequeña. Little sin a destaca la escasez."],
["how much","cuánto / cuánto cuesta","Pregunta por precio o cantidad incontable; how many pregunta por número de elementos."],
["next to","al lado de","Las dos palabras forman una expresión de lugar."],
["in front of","delante de","Expresión de posición que se aprende como una unidad."],
["because of","a causa de / por","Después va un nombre o -ing. Because sin of introduce una oración completa."],
["instead of","en lugar de","Introduce una alternativa con un nombre, pronombre o -ing."],
["as long as","siempre que / mientras","Puede expresar condición o duración. En acuerdos suele introducir una condición."],
["provided that","siempre que / con tal de que","Introduce una condición necesaria para que lo anterior sea válido."],
["even though","aunque / a pesar de que","Introduce un hecho que contrasta con otra idea. Even if suele plantear una condición hipotética."],
["even if","incluso si","Plantea una condición que no cambiaría el resultado, no necesariamente un hecho real."],
["as soon as","en cuanto","Relaciona dos sucesos. Para un futuro, la subordinada suele llevar presente."],
["in order to","para / con el fin de","Introduce un propósito con verbo base. La negación es in order not to."],
["on the other hand","por otro lado","Presenta otra perspectiva o contrapartida, sin hablar literalmente de una mano."],
["take into account","tener en cuenta","Significa considerar un factor antes de decidir."],
["run out of","quedarse sin","El recurso que se agota va después de of."],
["running late","ir con retraso","No significa correr: indica que alguien no llegará a la hora prevista."],
["turn down","rechazar / bajar el volumen","Con una oferta significa rechazar; con un aparato puede significar bajar el volumen."],
["put off","posponer / desanimar","El objeto y la situación distinguen aplazar una tarea de quitarle a alguien las ganas."],
["find out","averiguar / descubrir","Se usa para obtener información que antes no se conocía."],
["carry out","llevar a cabo","Combinación frecuente con planes, tareas, estudios y pruebas."],
["fill in","rellenar","Con form significa completar un formulario; fill out es también frecuente en inglés estadounidense."],
["pick up","recoger / aprender informalmente","Puede significar recoger a alguien o adquirir algo, según el objeto y la situación."],
["by the way","por cierto","Introduce un comentario o un pequeño cambio de tema."],
["never mind","no importa / déjalo","Puede quitar importancia a algo o retirar una petición."],
["make sense","tener sentido","Expresa que algo es comprensible o lógico."],
["in fact","de hecho","Introduce una precisión o refuerza o corrige lo anterior."],
["so far","hasta ahora","Delimita lo que sabemos hasta este momento, sin prometer que continúe igual."],
["go ahead","adelante / proceder","Da permiso o indica que una acción puede continuar."],
["would rather","preferiría","Va con verbo base sin to: I'd rather wait. Puede comparar opciones con than."],
["had better","más vale que / sería mejor que","Consejo fuerte referido al presente o futuro. Lleva verbo base sin to."],
["let me know","avísame / hazme saber","Pide que comuniquen información. Let lleva objeto + verbo base sin to."],
["see you","nos vemos","Fórmula de despedida; no se traduce como una afirmación literal de estar viendo a alguien."]
];
export const phraseNotes=rows.map(([en,es,use])=>({en,es,use}));
export function grammarFor(word,phrase,context){if(phrase?.use)return phrase.use;if(context?.use)return context.use;const w=normaliseText(word);
if(['say','says','said'].includes(w))return 'Say introduce lo que se dice. Para indicar la persona destinataria, suele usarse to: say something to someone. Tell suele llevar la persona directamente.';
if(['tell','tells','told'].includes(w))return 'Tell suele llevar la persona destinataria sin to: tell someone something. Tell someone to + verbo expresa una instrucción.';
if(['my','your','his','her','its','our','their'].includes(w))return 'Como posesivo, va delante de un nombre y señala a quién pertenece. No cambia por el género o número del objeto. Her también puede ser pronombre objeto, según su posición.';
if(['i','you','he','she','we','they'].includes(w))return 'Este pronombre puede ser el sujeto de la oración. En inglés el sujeto suele expresarse, aunque en español pueda omitirse. He/she/it modifican algunos verbos en presente.';
if(['leo','mia','nora','sam','ella','oliver','zoe','max','ava','noah','alex'].includes(w))return 'Es el nombre de una persona en esta situación. Los nombres propios se escriben con mayúscula y normalmente no se traducen.';
if(['a','an','the'].includes(w))return w==='the'?'The señala algo identificable para quienes hablan. Puede equivaler a el, la, los o las.':'A/an introduce algo singular contable. Se elige por el sonido siguiente: a antes de consonante, an antes de vocal.';
if(['can','could','may','might','must','should','will','would'].includes(w))return 'Este auxiliar expresa capacidad, posibilidad, obligación, consejo o hipótesis según el contexto. Después suele ir un verbo base sin to.';
if(['do','does','did',"don't","doesn't","didn't"].includes(w))return 'Puede significar hacer o ser auxiliar. En preguntas y negativas con do/does/did, el verbo principal queda en forma base.';
if(['is','am','are','was','were',"i'm","you're","we're","they're"].includes(w))return 'Forma de be: ser o estar. Con -ing forma un tiempo continuo; con participio puede formar una pasiva. Se interpreta con lo que viene después.';
if(['have','has','had',"i've"].includes(w))return 'Puede indicar posesión. Con participio forma tiempos perfectos; have to + verbo expresa obligación.';
if(["i'd","you'd","he'd","she'd","we'd","they'd"].includes(w))return "'d puede ser would o had. Would lleva verbo base; had suele llevar participio. Had better es una expresión especial de consejo.";
if(['in','on','at','to','of','for','with','from','up','off','over'].includes(w))return 'Esta preposición o partícula se interpreta con las palabras vecinas. Dentro de una expresión puede cambiar de sentido: mira la traducción completa.';
if(['although','though','however','nevertheless','despite'].includes(w))return 'Introduce contraste. Although/though unen oraciones; despite va con nombre o -ing. However/nevertheless conectan ideas y suelen separarse con puntuación.';
if(w.endsWith('ing'))return 'Esta forma puede expresar una acción en curso, nombrar una actividad o ir después de una preposición. La estructura completa determina su función.';
if(w.endsWith('ed'))return 'Puede ser pasado, participio o adjetivo. Con have forma tiempos perfectos; con be puede aparecer en pasivas. -ed no se pronuncia siempre igual.';
return 'Observa con qué palabras se combina y qué quiere comunicar la persona. Aprende la expresión completa y cambia un detalle para usarla en una situación tuya.';
}
