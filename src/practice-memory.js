// Pure learning helpers shared by the page and its tests.
export const normaliseAnswer=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/\bwon't\b/g,'will not').replace(/\bcan't\b/g,'cannot').replace(/\bshan't\b/g,'shall not').replace(/\b(\w+)n't\b/g,'$1 not').replace(/\b(\w+)'ve\b/g,'$1 have').replace(/\b(\w+)'re\b/g,'$1 are').replace(/\bi'm\b/g,'i am').replace(/[^\p{L}\p{N}'\s-]/gu,' ').replace(/\s+/g,' ').trim();
export const isAnswer=(value,q)=>(q.answers||[q.answer]).some(a=>normaliseAnswer(a)===normaliseAnswer(value));
const intervals=[1,3,7,14,30];
export function answerMemory(previous,correct,now=Date.now()){
 const [attempts=0,right=0,stage=0,due=0]=previous||[];
 // Repeating early never counts as another delayed retrieval.
 const next=correct?(due&&now<due?stage:Math.min(5,stage+1)):0;
 const nextDue=correct?(due&&now<due?due:now+intervals[Math.max(0,next-1)]*86400000):now+15*60000;
 return [Math.min(10000,attempts+1),Math.min(10000,right+(correct?1:0)),next,nextDue,now];
}
export function addLearningEvent(p,kind,unit,right,total,now=Date.now()){
 p.studyLog=[{id:globalThis.crypto?.randomUUID?.()||`${now}-${Math.random()}`,t:now,kind,unit:Number(unit)||0,right:Math.max(0,Number(right)||0),total:Math.max(0,Number(total)||0)},...(p.studyLog||[])].slice(0,200);
}
export function recordAutomaticEvents(old,p){
 for(const [key,v]of Object.entries(p.completed))if(!old.completed[key]||v.score!==old.completed[key].score)addLearningEvent(p,'lesson',key.split('_')[0],v.score,100);
 for(const [key,v]of Object.entries(p.study))if(v.attempts>(old.study?.[key]?.attempts||0))addLearningEvent(p,v.self?'project':'workshop',Number(key.match(/^u(\d+)/)?.[1]),v.self?0:v.score,v.self?0:100);
 for(const type of ['exam','speech'])for(const v of p[type])if(!old[type].some(x=>x.id===v.id&&x.date===v.date&&x.score===v.score))addLearningEvent(p,type==='speech'?'voice':'exam',v.unit||0,v.score,100);
 return p;
}
export function makeCloze(text,max=8){
 const words=[...text.matchAll(/\b[a-zA-Z]+(?:['’][a-zA-Z]+)?\b/g)];
 const targets=new Set(['although','because','while','however','before','after','until','unless','whether','which','whose','where','been','would','should','could','had','have','has','were','was','with','from','for','about','than','their','they','there','the','a','an','to','in','on','at','and','but','is','are']);
 const selected=[],minimum=Math.max(6,Math.floor(words.length/(max+1)));let last=-minimum;
 for(let i=6;i<words.length-3&&selected.length<max;i++){const w=words[i];if(i-last>=minimum&&targets.has(w[0].toLowerCase())){selected.push({answer:w[0],start:w.index,end:w.index+w[0].length});last=i;}}
 return selected;
}
export function buildPracticeBank(course,level='b2'){
 const bank=[];
 for(const u of course.units){
  const add=(suffix,q)=>bank.push({...q,id:`u${u.id}-${suffix}`,unit:u.id});
  const choices=(answer,values)=>[answer,...[...new Set(values)].filter(x=>x!==answer).slice(0,3)];
  u.vocab.forEach((v,i)=>{
   const others=u.vocab.filter(x=>x.en!==v.en);
   add(`v${i}m`,{skill:'vocabulary',type:'choice',prompt:`En esta unidad, ¿qué significa «${v.en}»?`,answer:v.es,options:choices(v.es,others.map(x=>x.es)),why:`${v.en}: ${v.es}. ${v.example||''}`});
   add(`v${i}r`,{skill:'vocabulary',type:'typed',prompt:`Recupera la expresión de esta unidad: ${v.es}.`,answer:v.en,hint:`Empieza por ${v.en[0]}; ${v.en.split(/\s+/).length} palabra(s).`,why:`${v.en}: ${v.es}. ${v.example||''}`});
   add(`v${i}d`,{skill:'listening',type:'dictation',prompt:'Escucha y escribe la expresión. Puedes repetir el audio.',answer:v.en,audio:v.en,why:`${v.en}: ${v.es}.`});
   add(`v${i}l`,{skill:'listening',type:'choice',prompt:'Escucha la expresión y elige su significado en esta unidad.',answer:v.es,audio:v.en,options:choices(v.es,others.map(x=>x.es)),why:`${v.en}: ${v.es}.`});
   const escaped=v.en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
   const match=v.example?.match(new RegExp('\\b'+escaped+'\\b','i'));
   if(match){
    const index=match.index;
    add(`v${i}c`,{skill:'vocabulary',type:'choice',prompt:'Completa usando la expresión adecuada de esta unidad.',passage:v.example.slice(0,index)+' ___ '+v.example.slice(index+v.en.length),answer:v.en,options:choices(v.en,others.map(x=>x.en)),why:v.example});
   }
  });
  u.questions.forEach((q,i)=>{add(`g${i}c`,{...q,skill:'grammar',type:'choice'});add(`g${i}t`,{...q,skill:'grammar',type:'typed',hint:`Usa ${q.answer.split(/\s+/).length} palabra(s); empieza por ${q.answer[0]}.`});});
  u.rules.forEach((r,j)=>r.examples.forEach((sentence,i)=>{add(`e${j}${i}o`,{skill:'grammar',type:'order',prompt:'Reconstruye el modelo de la unidad. Después cambia un dato al decirlo.',answer:sentence,why:r.text});add(`e${j}${i}d`,{skill:'listening',type:'dictation',prompt:'Escucha una frase completa y escríbela.',audio:sentence,answer:sentence,why:r.tip});}));
  for(const [prefix,text,questions]of [['r',u.story,u.reading],['c',u.case,u.caseQuestions]])if(text){
   questions?.forEach((q,i)=>add(`${prefix}${i}`,{...q,skill:'reading',type:'choice',passage:text}));
   const gaps=makeCloze(text,level==='a1'?6:10);
   gaps.forEach((g,i)=>add(`z${prefix}${i}`,{skill:'reading',type:'typed',prompt:`Restaura el original. Palabras del banco: ${[...new Set(gaps.map(x=>x.answer.toLowerCase()))].sort().join(' · ')}.`,passage:text.slice(0,g.start)+' ___ '+text.slice(g.end),answer:g.answer,why:'La palabra del original es «'+g.answer+'». Lee de nuevo la oración completa: '+text.slice(Math.max(0,g.start-90),Math.min(text.length,g.end+90))}));
  }
  u.listening?.questions.forEach((q,i)=>add(`l${i}`,{...q,skill:'listening',type:'choice',audio:u.listening.text,transcript:u.listening.text}));
  u.transforms?.forEach((q,i)=>add(`t${i}`,{...q,skill:'grammar',type:'typed',answers:q.answer.split('~'),answer:q.answer.split('~')[0]}));
  u.forms?.forEach((q,i)=>add(`f${i}`,{...q,prompt:`${q.prompt} (${q.stem})`,skill:'grammar',type:'typed',answers:q.answer.split('~'),answer:q.answer.split('~')[0]}));
 }
 return bank;
}
