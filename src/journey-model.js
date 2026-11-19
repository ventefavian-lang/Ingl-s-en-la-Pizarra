import starters from './journey-start.json';
import notes from './teacher-notes.json';
import {lessonSupport,shuffle} from './handbook-model.js';
import {normaliseAnswer,answerMemory,makeCloze} from './practice-memory.js';
export const chapters={a1:['Hello, world','Tu pequeño mundo','En casa','Así es tu día','Fuera de casa','En movimiento','Lo que pasó','Hagamos planes'],a2:['Tu vida de ahora','Historias que continúan','Lo que viene','La vida en la ciudad','Un viaje juntos','Tu día a día','Posibilidades','Conecta más'],b1:['Tienes una historia','Cambiar y avanzar','¿Y si…?','El mundo que cuentas','Cada detalle importa','Resolver juntos','Hazte entender','Tu voz cuenta'],b2:['Abre posibilidades','Mira más allá','Di lo que quieres decir','Ideas bien conectadas','Construye tu opinión','Un mundo compartido','Otras perspectivas','Haz que cuente']};
export const title=(level,u,i)=>level==='a1'&&starters[`${u.id}_${i}`]?.title||u.rules[i].title;
export function routeState(course,level,p){const nodes=course.units.flatMap(u=>[0,1,2].map(i=>({unit:u.id,index:i,key:`${u.id}_${i}`,title:title(level,u,i)}))),first=nodes.findIndex(n=>!p.completed[n.key]);return {nodes:nodes.map((n,i)=>({...n,done:!!p.completed[n.key],open:!!p.completed[n.key]||i===first||first===-1})),next:nodes[first]||nodes[0],count:nodes.filter(n=>p.completed[n.key]).length,finished:first===-1};}
const choice=(prompt,answer,options,why='',extra={})=>({type:'choice',prompt,answer,options:[...new Set(options)],why,...extra});
const order=(en,es)=>({type:'order',prompt:'Construye la frase',answer:en,meaning:es||'',why:en});
export const scored=q=>['choice','order','typed','dictation','match','cloze'].includes(q.type);
const normal=v=>normaliseAnswer(v).replace(/\bcannot\b/g,'can not').replace(/\b(\w+)'ll\b/g,'$1 will');
function expansions(value){const n=normal(value);return [n,n.replace(/\b(i|you|he|she|it|we|they)'d\b/g,'$1 would'),n.replace(/\b(i|you|he|she|it|we|they)'d\b/g,'$1 had'),n.replace(/\b(he|she|it|that|there|what|who)'s\b/g,'$1 is'),n.replace(/\b(he|she|it|that|there|what|who)'s\b/g,'$1 has')];}
export function correct(q,value){
 if(q.type==='choice')return value===q.answer;
 if(q.type==='match')return value===true;
 if(q.type==='cloze'){const xs=Array.isArray(value)?value:String(value).split(' | ');return xs.length===q.gaps.length&&q.gaps.every((g,i)=>normal(g.answer)===normal(xs[i]));}
 // A contracted affirmative auxiliary cannot end a short answer: Yes, I'm.
 if(/^(yes[, ]+)?(i'm|you're|he's|she's|it's|we're|they're)[.!? ]*$/i.test(String(value).trim()))return false;
 const values=expansions(value);return (q.answers||[q.answer]).some(a=>expansions(a).some(x=>values.includes(x)));
}
export function prepareItems(items,unit=1,index=0,prefix='n'){
 return items.map((q,j)=>({...q,id:q.id||`u${unit}-${prefix}${index}q${j}`,options:q.options?shuffle(q.options):undefined,tokens:q.type==='order'?shuffle(q.answer.split(/\s+/).map((text,id)=>({id,text}))):undefined,rightPairs:q.type==='match'?shuffle(q.pairs.map((v,id)=>({id,text:v.es}))):undefined}));
}
export function mission(course,level,unit,index){
 unit=Number(unit);index=Number(index);const u=course.units.find(u=>u.id===unit);if(!u||![0,1,2].includes(index))return null;
 const c=level==='a1'?starters[`${unit}_${index}`]:null,n=notes[level][unit-1][index],r=u.rules[index],support=lessonSupport(level,unit,index),people=u.voices||['Mia','Leo'];
 const examples=c?.examples||r.examples.map((en,i)=>[en,i===0?n.es:'']);
 const size=Math.ceil(u.vocab.length/3),words=u.vocab.slice(index*size,(index+1)*size);
 const turns=index===0?u.dialogue.slice(0,2):index===1?u.dialogue.slice(2,4):u.dialogue;
 const preview=c?examples.map(([en,es])=>({en,es})):words;
 const items=[{type:'scene',context:c?.scene||u.goal,preview,lines:c?.lines||turns.map(([_,en],i)=>[people[i%2],en,''])}];
 if(c)items.push(choice(...c.questions[0]));
 else{
  for(let j=0;j<words.length;j+=3){const group=words.slice(j,j+3);items.push({type:'words',words:group});for(const v of group)items.push(choice('¿Qué significa aquí?',v.es,[v.es,...words.filter(x=>x.es!==v.es).slice(0,2).map(x=>x.es)],`${v.en}: ${v.es}`,{cue:v.en,word:v.en,optionsLang:'es'}));}
  const pairs=words.filter((v,i)=>words.findIndex(x=>x.es===v.es)===i).slice(0,4);if(pairs.length>1)items.push({type:'match',prompt:'Une cada expresión con su significado',pairs,answer:true,why:'Escucha las expresiones y vuelve a decirlas en otra situación.'});
 }
 items.push({type:'notice',examples,notice:c?.notice||r.text,pattern:c?'':r.pattern,tip:c?'':r.tip});
 const chunk=Math.ceil(u.questions.length/3),grammar=c?c.questions.slice(1).map(q=>choice(...q)):u.questions.slice(index*chunk,(index+1)*chunk).map(q=>choice(q.prompt,q.answer,q.options,q.why));
 items.push(...grammar,order(...examples[0]),order(...examples[1]));
 for(const q of grammar.filter(q=>q.prompt.includes('___')))items.push({...q,type:'typed',options:undefined,prompt:q.prompt,hint:'Escribe solo lo que falta.'});
 if(c){items.push({type:'typed',prompt:`Escribe en inglés: ${examples[0][1]}`,answer:examples[0][0],answers:unit===1&&index===0?['Hello','Hi']:unit===1&&index===1?['I am Mia','My name is Mia']:undefined,why:c.notice});items.push(choice('Responde en esta conversación',c.reply[1],c.reply[2],c.reply[3],{cue:c.reply[0],role:c.lines[0][0]}));}
 else for(const v of words.slice(0,2))items.push({type:'typed',prompt:`Recupera la expresión de esta lección: ${v.es}`,answer:v.en,word:v.en,hint:`Empieza por ${v.en[0]}.`,why:`${v.en}: ${v.es}`});
 examples.slice(0,2).forEach(([text,es])=>items.push({type:'dictation',prompt:'Escucha y escribe lo que oyes',audio:text,answer:text,why:es||r.tip}));
 if(!c){
  if(turns[1])items.push({...order(turns[1][1]),prompt:'Completa la conversación',cue:turns[0][1],role:people[0]});
  if(u.reading?.length){const q=u.reading[Math.min(index,u.reading.length-1)];items.push(choice(q.prompt,q.answer,q.options,q.why,{passage:u.story,optionsLang:['a1','a2'].includes(level)?'es':'en'}));}
  if(index===2){const gaps=makeCloze(u.story,3);if(gaps.length)items.push({type:'cloze',prompt:'Devuelve las palabras a esta historia',text:u.story,gaps,bank:shuffle([...new Set(gaps.map(g=>g.answer))]),answer:gaps.map(g=>g.answer).join(' | '),why:'Lee la oración completa: conecta cada palabra con lo que viene antes y después.'});if(u.listening?.questions?.length){const q=u.listening.questions[0];items.push(choice(q.prompt,q.answer,q.options,q.why,{audio:u.listening.text,optionsLang:['a1','a2'].includes(level)?'es':'en'}));}}
 }
 if(unit>1||index>0){const pi=index>0?index-1:2,pu=index>0?u:course.units[unit-2],prev=level==='a1'?starters[`${pu.id}_${pi}`]:null,x=prev?.examples[0]||[pu.rules[pi].examples[0],notes[level][pu.id-1][pi].es];items.push({...order(...x),prompt:'¿Todavía lo recuerdas?',recall:true});}
 items.push({type:'create',prompt:c?.task||n.task,model:c?.model||examples[0][0],minWords:c?2:({a1:5,a2:10,b1:15,b2:20}[level])});
 return {unit,index,key:`${unit}_${index}`,title:title(level,u,index),people,support,items:prepareItems(items,unit,index)};
}
export function saveAnswer(store,q,ok,now=Date.now()){
 const p=store.getState();p.workbook[q.id]=answerMemory(p.workbook[q.id],ok,now);const day=new Date(now).toLocaleDateString('en-CA');p.activity[day]=(p.activity[day]||0)+1;
 if(ok){const text=q.word||(q.type==='match'?q.pairs.map(v=>v.en).join(' '):q.type==='cloze'?q.gaps.map(g=>g.answer).join(' '):q.optionsLang!=='es'?String(q.answer):'');const phrase=text.toLowerCase();if(/^[a-z][a-z ,'-]{0,69}$/.test(phrase))p.lexicon[phrase]=[1,now];for(const word of phrase.match(/[a-z]+(?:'[a-z]+)?/g)||[])p.lexicon[word]=[1,now];}
 store.save(p);
}
export function finish(store,m,right,total,now=Date.now()){
 const p=store.getState(),score=total?Math.round(right/total*100):0,prev=p.completed[m.key],passed=score>=70;let xp=0;
 if(passed){p.completed[m.key]={score:Math.max(prev?.score||0,score),date:new Date(now).toLocaleDateString('en-CA')};if(!prev){p.xp+=30;xp=30;}}
 const key=`u${m.unit}_g${m.index}`,old=p.study[key]||{};p.study[key]={score,best:Math.max(old.best||0,score),attempts:(old.attempts||0)+1,date:new Date(now).toLocaleDateString('en-CA'),updated:now,due:now+86400000,reviews:old.reviews||0,self:false,wrong:[]};store.save(p);return {passed,score,xp,right,total};
}
export function dueItems(course,level,p,now=Date.now()){return course.units.flatMap(u=>[0,1,2].flatMap(i=>mission(course,level,u.id,i).items.filter(scored))).filter(q=>p.workbook[q.id]?.[3]<=now).sort((a,b)=>p.workbook[a.id][3]-p.workbook[b.id][3]);}
