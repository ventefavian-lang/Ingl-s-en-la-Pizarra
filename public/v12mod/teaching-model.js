// Pure helpers: every lesson checks language it has explicitly modelled.
export const teachingWords = text => String(text||'').toLowerCase().replace(/[’‘]/g,"'").match(/[a-z0-9]+(?:'[a-z]+)?/g)||[];
export function reconstructionFeedback(answer, model) {
 const a=teachingWords(answer), b=teachingWords(model);
 const mismatch=b.findIndex((w,i)=>a[i]!==w);
 return {correct:a.length===b.length&&mismatch<0,index:mismatch<0?b.length:mismatch,missing:Math.max(0,b.length-a.length),expected:b[mismatch<0?b.length:mismatch]||'',actual:a[mismatch<0?b.length:mismatch]||''};
}
export function teachingQuestions(unit,index,notes,shuffle=xs=>[...xs]) {
 const r=unit.rules[index],id=s=>`u${unit.id}${s}`;
 const choice=(q,key)=>({...q,id:key,unit:unit.id,type:'choice',options:shuffle(q.options)});
 const q=unit.questions.slice(index*2,index*2+2).map((x,j)=>choice(x,id(`q${index*2+j}`)));
 q.push(choice({prompt:'¿Qué mensaje comunica este ejemplo?',sentence:notes[index].en,answer:notes[index].es,options:notes.map(x=>x.es),optionLang:'es',why:`${notes[index].en} → ${notes[index].es} ${r.tip}`},id(`gv${index}`)));
 const answer=r.examples[1].replace(/[.!?]$/,'');
 q.push({type:'order',id:id(`o${index}`),unit:unit.id,prompt:'Reconstruye el segundo ejemplo que practicaste.',answer,words:shuffle(answer.split(/\s+/)).map((t,i)=>({t,id:i})),why:`${r.text} Modelo: ${r.examples[1]}`});
 q.push({type:'dictation',id:id(`d${index}`),unit:unit.id,prompt:'Escucha el tercer ejemplo y escríbelo.',answer:r.examples[2],why:`Modelo: ${r.examples[2]} ${r.tip}`});
 if(index===2){
  q.push(...unit.reading.slice(0,2).map((x,j)=>({...choice(x,id(`r${j}`)),passage:unit.story})));
  if(unit.listening?.questions?.length)q.push({...choice(unit.listening.questions[2]||unit.listening.questions[0],id('l2')),listening:unit.listening.text});
 }
 return q;
}
export const teachingTerms=[
 ['sujeto','La persona o cosa de la que hablamos. En «I work», I indica quién trabaja.'],
 ['verbo','Expresa una acción o un estado: work (trabajar), know (saber), be (ser/estar).'],
 ['infinitivo','La forma básica del verbo. «To work» es trabajar; después de can usamos «work» sin to.'],
 ['auxiliar','Un verbo que ayuda a construir otra forma: do en «Do you work?» o have en «I have finished».'],
 ['adjetivo','Describe una persona o cosa: a quiet room = una habitación tranquila.'],
 ['adverbio','Añade información sobre cómo, cuándo o cuánto: slowly = despacio; often = a menudo.'],
 ['sustantivo','Nombra una persona, cosa, lugar o idea: teacher, book, city, time.'],
 ['pronombre','Permite referirte a alguien o algo sin repetir el nombre: she, it, they.'],
 ['preposición','Relaciona palabras: in the room (en la habitación), on Monday (el lunes). Aprende la combinación completa.'],
 ['artículo','A/an presentan algo no identificado; the suele indicar algo que el interlocutor puede identificar. Hay más usos y excepciones.'],
 ['negación','Expresa que algo no ocurre o no es cierto. La estructura cambia según el verbo: is not, do not, cannot.'],
 ['tercera persona','Al hablar de he, she o it. En presente simple afirmativo muchos verbos añaden -s: she works.'],
 ['contracción','Una forma abreviada muy habitual al hablar: I am → I’m; do not → don’t.'],
 ['participio','Una forma verbal usada en tiempos perfectos y pasivas: worked, seen, written. Los irregulares cambian.'],
 ['gerundio','Aquí suele referirse a una forma en -ing usada como actividad: I enjoy reading = disfruto leyendo. No todo -ing tiene la misma función.'],
 ['contable','Algo que puedes contar por unidades: one apple, two apples.'],
 ['incontable','Un nombre que en ese sentido no contamos directamente: water, advice. Podemos usar recipientes o unidades de medida.'],
 ['comparativo','Compara: cheaper than = más barato que; more useful than = más útil que.'],
 ['superlativo','Destaca un extremo dentro de un grupo: the cheapest = el más barato.'],
 ['condicional','Relaciona una situación con su consecuencia. La forma depende de si la situación es habitual, posible o imaginaria.'],
 ['relativo','Conecta un nombre con una explicación: the person who called = la persona que llamó.'],
 ['pasiva','Pone el foco en lo que recibe la acción: The window was repaired = la ventana fue reparada.'],
 ['perfect','Una familia de formas con have + participio. Su significado depende del punto de referencia y el contexto, no de que algo sea perfecto.'],
 ['continuous','Una forma con be + -ing que presenta una actividad en desarrollo. El tiempo de be sitúa esa actividad.'],
 ['modal','Verbos como can, might o should añaden capacidad, posibilidad, consejo y otros matices. Suelen ir seguidos del verbo básico sin to.'],
 ['colocación','Palabras que se usan habitualmente juntas: make a decision = tomar una decisión.'],
 ['phrasal','Verbo y partícula que funcionan como expresión: turn down puede significar bajar el volumen. Revisa su significado y su estructura juntos.'],
 ['registro','La forma de expresarte según la persona y la situación: un mensaje a un amigo y una solicitud formal no suenan igual.'],
 ['concordancia','Que las formas encajen: this book is / these books are.'],
 ['imperativo','Una forma para dar instrucciones o peticiones: Open the door. Please sit down.'],
 ['posesivo','Indica a quién pertenece algo o con quién se relaciona: my book, her brother, Sara’s bag.'],
 ['cláusula','Un grupo con verbo que expresa una idea dentro de una oración: because it was raining = porque estaba lloviendo.']
];
