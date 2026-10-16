import starters from './journey-start.json';
import notes from './teacher-notes.json';
import {lessonSupport,shuffle} from './handbook-model.js';
import {normaliseAnswer,answerMemory} from './practice-memory.js';
export const chapters={a1:['Hello, world','Tu pequeño mundo','En casa','Así es tu día','Fuera de casa','En movimiento','Lo que pasó','Hagamos planes'],a2:['Tu vida de ahora','Historias que continúan','Lo que viene','La vida en la ciudad','Un viaje juntos','Tu día a día','Posibilidades','Conecta más'],b1:['Tienes una historia','Cambiar y avanzar','¿Y si…?','El mundo que cuentas','Cada detalle importa','Resolver juntos','Hazte entender','Tu voz cuenta'],b2:['Abre posibilidades','Mira más allá','Di lo que quieres decir','Ideas bien conectadas','Construye tu opinión','Un mundo compartido','Otras perspectivas','Haz que cuente']};
export const title=(level,u,i)=>level==='a1'&&starters[`${u.id}_${i}`]?.title||u.rules[i].title;
export function routeState(course,level,p){const nodes=course.units.flatMap(u=>[0,1,2].map(i=>({unit:u.id,index:i,key:`${u.id}_${i}`,title:title(level,u,i)}))),first=nodes.findIndex(n=>!p.completed[n.key]);return {nodes:nodes.map((n,i)=>({...n,done:!!p.completed[n.key],open:!!p.completed[n.key]||i===first||first===-1})),next:nodes[first]||nodes[0],count:nodes.filter(n=>p.completed[n.key]).length,finished:first===-1};}
const choice=(prompt,answer,options,why='',extra={})=>({type:'choice',prompt,answer,options:[...new Set(options)],why,...extra});
const order=(en,es)=>({type:'order',prompt:'Construye la frase',answer:en,meaning:es||'',why:en});
export const scored=q=>['choice','order'].includes(q.type);
export const correct=(q,value)=>normaliseAnswer(q.answer)===normaliseAnswer(value);
export function mission(course,level,unit,index){
 unit=Number(unit);index=Number(index);const u=course.units.find(u=>u.id===unit);if(!u||![0,1,2].includes(index))return null;
 const c=level==='a1'?starters[`${unit}_${index}`]:null,n=notes[level][unit-1][index],r=u.rules[index],support=lessonSupport(level,unit,index),people=u.voices||['Mia','Leo'];
 const examples=c?.examples||r.examples.map((en,i)=>[en,i===0?n.es:'']);
 const turns=index===0?u.dialogue.slice(0,2):index===1?u.dialogue.slice(2,4):u.dialogue;
 const items=[{type:'scene',context:c?.scene||u.goal,lines:c?.lines||turns.map(([_,en],i)=>[people[i%2],en,''])}];
 if(!c){const words=u.vocab.slice(index*6,index*6+6);for(let j=0;j<words.length;j+=3)items.push({type:'words',words:words.slice(j,j+3)});}
 items.push({type:'notice',examples,notice:c?.notice||support?.section.brief||r.tip,pattern:c?'':r.pattern});
 if(c){items.push(...c.questions.map(q=>choice(...q)),order(...examples[0]),choice('Escucha. ¿Cuál has oído?',examples[0][0],examples.map(x=>x[0]),examples[0][1],{audio:examples[0][0]}),choice('Responde en esta conversación',c.reply[1],c.reply[2],c.reply[3],{cue:c.reply[0],role:c.lines[0][0]}),order(...examples[1]));}
 else{
  const words=u.vocab.slice(index*6,index*6+6);words.slice(0,3).forEach(v=>items.push(choice(`Elige: ${v.es}`,v.en,[v.en,...words.filter(x=>x.en!==v.en).slice(0,2).map(x=>x.en)],`${v.en}: ${v.es}`,{word:v.en,icon:v.icon})));
  items.push(...u.questions.slice(index*2,index*2+2).map(q=>choice(q.prompt,q.answer,q.options,q.why)),order(...examples[0]),choice('Escucha. ¿Cuál has oído?',examples[1][0],examples.map(x=>x[0]),r.tip,{audio:examples[1][0]}),order(...examples[1]));
  if(index===2&&u.reading?.length){const q=u.reading[0];items.push(choice(q.prompt,q.answer,q.options,q.why,{passage:u.story}));}
 }
 if(unit>1||index>0){const pi=index>0?index-1:2,pu=index>0?u:course.units[unit-2],prev=level==='a1'?starters[`${pu.id}_${pi}`]:null,x=prev?.examples[0]||[pu.rules[pi].examples[0],notes[level][pu.id-1][pi].es];items.push({...order(...x),prompt:'¿Todavía lo recuerdas?',recall:true});}
 items.push({type:'create',prompt:c?.task||n.task,model:c?.model||examples[0][0]});
 return {unit,index,key:`${unit}_${index}`,title:title(level,u,index),people,support,items:items.map((q,j)=>({...q,id:`u${unit}-j${index}q${j}`,options:q.options?shuffle(q.options):undefined,tokens:q.type==='order'?shuffle(q.answer.split(/\s+/).map((text,id)=>({id,text}))):undefined}))};
}
export function saveAnswer(store,q,ok,now=Date.now()){
 const p=store.getState();p.workbook[q.id]=answerMemory(p.workbook[q.id],ok,now);const day=new Date(now).toLocaleDateString('en-CA');p.activity[day]=(p.activity[day]||0)+1;if(ok&&q.word&&/^[a-z][a-z ,'-]{0,69}$/.test(q.word.toLowerCase()))p.lexicon[q.word.toLowerCase()]=[1,now];store.save(p);
}
export function finish(store,m,right,total,now=Date.now()){
 const p=store.getState(),score=total?Math.round(right/total*100):0,prev=p.completed[m.key],passed=score>=70;let xp=0;
 if(passed){p.completed[m.key]={score:Math.max(prev?.score||0,score),date:new Date(now).toLocaleDateString('en-CA')};if(!prev){p.xp+=30;xp=30;}}
 const key=`u${m.unit}_g${m.index}`,old=p.study[key]||{};p.study[key]={score,best:Math.max(old.best||0,score),attempts:(old.attempts||0)+1,date:new Date(now).toLocaleDateString('en-CA'),updated:now,due:now+86400000,reviews:old.reviews||0,self:false,wrong:[]};store.save(p);return {passed,score,xp,right,total};
}
export function dueItems(course,level,p,now=Date.now()){return course.units.flatMap(u=>[0,1,2].flatMap(i=>mission(course,level,u.id,i).items.filter(scored))).filter(q=>p.workbook[q.id]?.[3]<=now).sort((a,b)=>p.workbook[a.id][3]-p.workbook[b.id][3]);}
