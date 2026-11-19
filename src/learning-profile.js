// Evidence-based feedback: observations are not CEFR certification or automated essay grading.
const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
const stats=(correct,total,minimum=1)=>({value:total>=minimum?clamp(correct/total*100):null,samples:total});
export const skillNames={reading:'Reading',listening:'Listening',grammar:'Gramática',vocabulary:'Vocabulario',writing:'Writing',speaking:'Speaking'};
export function profileFromProgress(p={}){
 const readings=Object.values(p.readings||{}).filter(x=>Number.isFinite(x.last));
 const mastery=Object.values(p.mastery||{}).filter(x=>Number.isFinite(x.last));
 const allReading=[...readings,...mastery];
 const reading={value:allReading.length?clamp(allReading.reduce((s,x)=>s+x.last,0)/allReading.length):null,samples:allReading.length};
 const work=Object.values(p.workbook||{}).filter(x=>Array.isArray(x)&&Number.isFinite(x[0])&&Number.isFinite(x[1]));
 const grammar=stats(work.reduce((s,x)=>s+x[1],0),work.reduce((s,x)=>s+x[0],0),5);
 const videos=Object.values(p.videoLessons||{}).filter(x=>x?.watched);
 let listens=videos.length,listensRight=videos.filter(x=>x.correct).length;
 for(const x of p.exam||[]){if(x.kind==='integrated'&&x.skills?.listening?.total){listens+=x.skills.listening.total;listensRight+=x.skills.listening.right;}}
 const listening=stats(listensRight,listens,1);
 const words=Object.values(p.lexicon||{}).filter(x=>Array.isArray(x)&&[0,1].includes(x[0]));
 const vocabulary=stats(words.filter(x=>x[0]===1).length,words.length,5);
 const drafts=Object.keys(p.writing||{}).length+Object.values(p.capstones||{}).filter(x=>x.revised?.trim()).length+Object.values(p.masteryDrafts||{}).filter(x=>x.writing?.trim()).length;
 const writing={value:drafts?clamp(drafts/8*100):null,samples:drafts,coverage:true};
 const recorded=(p.speech||[]).length + Object.values(p.pronunciationDrills||{}).reduce((s,x)=>s+(x.attempts>0?1:0),0);
 const speaking={value:recorded?clamp(recorded/12*100):null,samples:recorded,coverage:true};
 const skills={reading,listening,grammar,vocabulary,writing,speaking};
 const advice={
  reading:['#reading','Practica un artículo breve, identifica la idea principal y cita una frase como evidencia.'],
  listening:['#video','Escucha una escena primero sin subtítulos y después confirma las palabras que no reconociste.'],
  grammar:['#resources/grammar','Repasa una estructura, crea tres oraciones y vuelve a intentarlo sin mirar.'],
  vocabulary:['#phrasebook','Guarda expresiones completas, no palabras aisladas; repásalas después de uno y tres días.'],
  writing:['#portfolio','Escribe un párrafo y mejora una segunda versión con una lista de revisión.'],
  speaking:['#pronunciation','Escucha, repite y graba frases cortas; compara el ritmo sin asumir que el reconocimiento de voz mide toda tu pronunciación.']
 };
 const objective=Object.entries(skills).filter(([k,x])=>!x.coverage&&x.value!==null).sort((a,b)=>a[1].value-b[1].value);
 const practiced=Object.entries(skills).filter(([,x])=>x.value!==null);
 const suggestions=(objective.length?objective.slice(0,2):[['reading',reading],['listening',listening]]).map(([key])=>({skill:skillNames[key],link:advice[key][0],message:advice[key][1]}));
 if(!writing.samples)suggestions.push({skill:'Writing',link:advice.writing[0],message:'Todavía no hay muestras escritas. '+advice.writing[1]});
 if(!speaking.samples)suggestions.push({skill:'Speaking',link:advice.speaking[0],message:'Todavía no hay práctica oral registrada. '+advice.speaking[1]});
 return {skills,suggestions:suggestions.slice(0,4),strongest:objective.length?{key:objective.at(-1)[0],score:objective.at(-1)[1].value}:null,covered:practiced.length};
}
export const safeAlias=value=>String(value??'').trim().replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ0-9 _-]/g,'').replace(/\s+/g,' ').slice(0,20);
export const safeCountry=value=>/^[A-Z]{2}$/.test(String(value??''))?value:'XX';
export function leaderboardSort(rows){return [...rows].sort((a,b)=>(b.score||0)-(a.score||0)||String(a.alias).localeCompare(String(b.alias),'es')).slice(0,50);}
