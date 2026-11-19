import {cleanConversations,mergeConversations} from './conversation-memory.js';
// Datos de aprendizaje. Sin tokens, correos ni credenciales.
export const freshProgress = () => ({version:1,completed:{},activity:{},errors:{},vocab:{},writing:{},readings:{},readingNotes:{},study:{},studyDrafts:{},workbook:{},portfolio:{},diagnostic:null,personalPhrases:{},branching:{},videoLessons:{},pronunciationDrills:{},capstones:{},mastery:{},masteryDrafts:{},conversations:{},lexicon:{},studyLog:[],checks:[],speech:[],exam:[],xp:0,goal:10,accent:'en-US',name:''});
export const clone = value => JSON.parse(JSON.stringify(value));
const own = obj => obj && typeof obj==='object' && !Array.isArray(obj) ? obj : {};
const safeKey=k=>!['__proto__','prototype','constructor'].includes(k);
const entries=obj=>Object.entries(own(obj)).filter(([k])=>safeKey(k));
const text=(s,n)=>typeof s==='string'?s.slice(0,n):'';
const finite=(x,max=1000000)=>Number.isFinite(x)?Math.max(0,Math.min(max,x)):0;
const date=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||'')?s:'';
export function cleanProgress(input) {
 const s=own(input),p=freshProgress();
 p.conversations=cleanConversations(s.conversations);
 p.name=text(s.name,30);p.goal=[5,10,15,20].includes(s.goal)?s.goal:10;p.accent=['en-US','en-GB'].includes(s.accent)?s.accent:'en-US';p.xp=Math.floor(finite(s.xp));
 for(const[k,v]of entries(s.completed)) if(/^([1-9]|1\d|2[0-4])_[012]$/.test(k)&&v&&Number.isFinite(v.score)&&v.score>=70&&v.score<=100)p.completed[k]={score:v.score,date:date(v.date)};
 for(const[k,v]of entries(s.activity).slice(-3660))if(date(k)&&Number.isFinite(v))p.activity[k]=Math.floor(finite(v,10000));
 for(const[k,v]of entries(s.vocab).slice(0,1000))if(/^(u\d+v\d+|colours\d+|jobs\d+|animals\d+|pack\d+v\d+)$/.test(k)&&v&&Number.isFinite(v.due))p.vocab[k]={due:finite(v.due,9999999999999),interval:[0,1,3,7,14].includes(v.interval)?v.interval:0,reviews:Math.floor(finite(v.reviews,10000))};
 for(const[k,v]of entries(s.writing))if(/^([1-9]|1\d|2[0-4])$/.test(k))p.writing[k]=text(v,2000);
 for(const[k,v]of entries(s.readingNotes).slice(0,48))if(/^(a1|a2|b1|b2)-(0[1-9]|1[0-2])$/.test(k))p.readingNotes[k]=text(v,2000);
 for(const[k,v]of entries(s.readings).slice(0,48))if(/^(a1|a2|b1|b2)-(0[1-9]|1[0-2])$/.test(k)&&v&&typeof v==='object'&&Number.isFinite(v.best)&&Number.isFinite(v.last)){
  p.readings[k]={best:finite(v.best,100),last:finite(v.last,100),attempts:Math.floor(finite(v.attempts,10000)),date:date(v.date),updated:finite(v.updated,9999999999999),wrong:(Array.isArray(v.wrong)?v.wrong:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<6).slice(0,6)};
 }
 for(const[k,v]of entries(s.study).slice(0,360))if(/^u([1-9]|1\d|2[0-4])_(s[0-5]|p[0-3]|g[0-2]|recall)$/.test(k)&&v&&typeof v==='object')p.study[k]={score:finite(v.score,100),best:finite(v.best,100),attempts:Math.floor(finite(v.attempts,10000)),date:date(v.date),updated:finite(v.updated,9999999999999),due:finite(v.due,9999999999999),reviews:Math.floor(finite(v.reviews,5)),self:v.self===true,wrong:(Array.isArray(v.wrong)?v.wrong:[]).filter(x=>typeof x==='string'&&/^[a-z0-9]{1,20}$/.test(x)).slice(0,40)};
 for(const[k,v]of entries(s.studyDrafts).slice(0,192))if(/^u([1-9]|1\d|2[0-4])_(notes|reading|listening|project|reflection|mentor[0-2])$/.test(k))p.studyDrafts[k]=text(v,2400);
 for(const[k,v]of entries(s.workbook).slice(0,6500))if(/^u([1-9]|1\d|2[0-4])-[a-z0-9]{1,20}$/.test(k)&&Array.isArray(v)&&v.length===5&&v.every(Number.isFinite)){const attempts=Math.floor(finite(v[0],10000));p.workbook[k]=[attempts,Math.min(attempts,Math.floor(finite(v[1],10000))),Math.floor(finite(v[2],5)),finite(v[3],9999999999999),finite(v[4],9999999999999)];}
 for(const[k,v]of entries(s.portfolio).slice(0,72))if(/^u([1-9]|1\d|2[0-4])_(essay|speech|mediation)$/.test(k))p.portfolio[k]=text(v,2400);
 for(const[k,v]of entries(s.lexicon).slice(0,3000))if(/^[a-z][a-z ,'-]{0,69}$/.test(k)&&Array.isArray(v)&&[0,1].includes(v[0])&&Number.isFinite(v[1]))p.lexicon[k]=[v[0],finite(v[1],9999999999999)];
 // V14: progreso individual, sin servicios de IA y limitado en tamaño para Firestore.
 if(s.diagnostic&&typeof s.diagnostic==='object'&&Number.isFinite(s.diagnostic.score)){
  p.diagnostic={score:finite(s.diagnostic.score,100),date:date(s.diagnostic.date),recommended:['a1','a2','b1','b2'].includes(s.diagnostic.recommended)?s.diagnostic.recommended:'a1',breakdown:Object.fromEntries(['a1','a2','b1','b2'].map(k=>[k,finite(s.diagnostic.breakdown?.[k],100)]))};
 }
 for(const[k,v]of entries(s.personalPhrases).slice(0,180))if(/^p-[a-z0-9-]{4,42}$/.test(k)&&v&&typeof v==='object'&&text(v.en,160).trim())p.personalPhrases[k]={en:text(v.en,160),es:text(v.es,180),example:text(v.example,250),due:finite(v.due,9999999999999),interval:finite(v.interval,30),reviews:Math.floor(finite(v.reviews,1000)),created:finite(v.created,9999999999999),updated:finite(v.updated,9999999999999)};
 for(const[k,v]of entries(s.branching).slice(0,32))if(/^(a1|a2|b1|b2)-adv-[1-3]$/.test(k)&&v&&typeof v==='object')p.branching[k]={endings:[...new Set((Array.isArray(v.endings)?v.endings:[]).filter(x=>/^[ab][ab]$/.test(x)))].slice(0,4),last:text(v.last,2)};
 for(const[k,v]of entries(s.videoLessons).slice(0,16))if(/^(a1|a2|b1|b2)-v[12]$/.test(k)&&v&&typeof v==='object')p.videoLessons[k]={watched:v.watched===true,correct:v.correct===true,attempts:Math.floor(finite(v.attempts,100)),updated:finite(v.updated,9999999999999)};
 for(const[k,v]of entries(s.pronunciationDrills).slice(0,25))if(/^drill-(0[1-9]|1\d|20)$/.test(k)&&v&&typeof v==='object')p.pronunciationDrills[k]={attempts:Math.floor(finite(v.attempts,100)),confidence:Math.floor(finite(v.confidence,3)),updated:finite(v.updated,9999999999999)};
 for(const[k,v]of entries(s.capstones).slice(0,24))if(/^(a1|a2|b1|b2)-p[1-3]$/.test(k)&&v&&typeof v==='object')p.capstones[k]={draft:text(v.draft,2400),revised:text(v.revised,2400),checks:[...new Set((Array.isArray(v.checks)?v.checks:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<5))],done:v.done===true,updated:finite(v.updated,9999999999999)};
 // V15: módulos C1-C2, registrados en la cuenta B2. Sin evaluación automática de escritura libre.
 for(const[k,v] of entries(s.mastery).slice(0,24))if(/^(c1|c2)-(0[1-9]|1[0-2])$/.test(k)&&v&&typeof v==='object'&&Number.isFinite(v.best)&&Number.isFinite(v.last))p.mastery[k]={best:finite(v.best,100),last:finite(v.last,100),attempts:Math.floor(finite(v.attempts,10000)),updated:finite(v.updated,9999999999999)};
 for(const[k,v] of entries(s.masteryDrafts).slice(0,24))if(/^(c1|c2)-(0[1-9]|1[0-2])$/.test(k)&&v&&typeof v==='object')p.masteryDrafts[k]={writing:text(v.writing,2400),speaking:text(v.speaking,1100),mediation:text(v.mediation,1600),checks:[...new Set((Array.isArray(v.checks)?v.checks:[]).filter(k=>['argument','precision','cohesion','limits'].includes(k)))].slice(0,4),updated:finite(v.updated,9999999999999)};
 p.studyLog=(Array.isArray(s.studyLog)?s.studyLog:[]).filter(v=>v&&typeof v.id==='string'&&Number.isFinite(v.t)&&['lesson','workshop','project','exam','voice','practice','reading','cloze','writing','speaking','mediation','conversation'].includes(v.kind)).slice(0,200).map(v=>({id:text(v.id,100),t:finite(v.t,9999999999999),kind:v.kind,unit:Math.floor(finite(v.unit,24)),right:finite(v.right,10000),total:finite(v.total,10000)}));
 p.checks=Array.isArray(s.checks)?[...new Set(s.checks.filter(x=>Number.isInteger(x)&&x>=0&&x<50))].sort((a,b)=>a-b):[];
 // Los errores se reconstruyen desde el catálogo, nunca se ejecuta contenido importado.
 for(const[k]of entries(s.errors).slice(0,600))if(/^u\d+[a-z]+\d+[a-z]*$/.test(k))p.errors[k]=true;
 p.speech=(Array.isArray(s.speech)?s.speech:[]).filter(x=>x&&typeof x.phrase==='string'&&Number.isFinite(x.score)).slice(0,100).map(x=>({id:text(x.id,100),phrase:text(x.phrase,300),score:finite(x.score,100),date:date(x.date),unit:Math.floor(finite(x.unit,24))||1}));
 p.exam=(Array.isArray(s.exam)?s.exam:[]).filter(x=>x&&Number.isFinite(x.score)&&(x.block==='all'||['0','1','2','3'].includes(String(x.block)))).slice(0,12).map(x=>({id:text(x.id,100),score:finite(x.score,100),block:x.block,date:date(x.date),results:(Array.isArray(x.results)?x.results:[]).filter(r=>r&&/^u([1-9]|1\d|2[0-4])-as[0-9]{2,4}$/.test(r.qid)).slice(0,20).map(r=>({qid:r.qid,answer:text(r.answer,400),correct:r.correct===true,skill:['reading','listening','use'].includes(r.skill)?r.skill:'use'})),...(x.kind==='integrated'?{kind:'integrated',paper:/^(a1|a2|b1|b2)-1$/.test(x.paper)?x.paper:'',mode:x.mode==='guided'?'guided':'independent',duration:finite(x.duration,604800),listens:finite(x.listens,1000),skills:Object.fromEntries(['reading','listening','use'].map(k=>[k,{right:Math.min(finite(x.skills?.[k]?.right,10),finite(x.skills?.[k]?.total,10)),total:finite(x.skills?.[k]?.total,10)}])),production:{writing:text(x.production?.writing,2400),checks:(Array.isArray(x.production?.checks)?x.production.checks:[]).filter(v=>Number.isInteger(v)&&v>=0&&v<4).slice(0,4)}}:{})}));
 return p;
}
const sortValue=v=>Array.isArray(v)?v.map(sortValue):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sortValue(v[k])])):v;
export const equal=(a,b)=>JSON.stringify(sortValue(a))===JSON.stringify(sortValue(b));
function mergeMap(base,local,remote){const out={...remote};for(const k of new Set([...Object.keys(base),...Object.keys(local)])){if(!equal(base[k],local[k])){if(Object.hasOwn(local,k))out[k]=clone(local[k]);else delete out[k];}}return out;}
function mergeHistory(local,remote,max){const seen=new Set();return [...local,...remote].filter(x=>{const key=x.id||JSON.stringify(x);if(seen.has(key))return false;seen.add(key);return true;}).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,max);}
// Tres versiones: último estado confirmado, cambios locales y estado del servidor.
export function mergeProgress(baseInput,localInput,remoteInput){
 const b=cleanProgress(baseInput),l=cleanProgress(localInput),r=cleanProgress(remoteInput),out=clone(r);
 for(const k of ['errors','vocab','writing','readingNotes','studyDrafts','portfolio'])out[k]=mergeMap(b[k],l[k],r[k]);
 for(const[k,v]of Object.entries(l.study)){
  if(equal(b.study[k],v))continue;
  const remote=r.study[k],base=b.study[k];
  if(!remote){out.study[k]=clone(v);continue;}
  const latest=v.updated>=remote.updated?v:remote;
  out.study[k]={...latest,best:Math.max(v.best,remote.best),attempts:Math.min(10000,remote.attempts+Math.max(0,v.attempts-(base?.attempts||0))),reviews:Math.max(v.reviews,remote.reviews),due:Math.max(v.due,remote.due)};
 }
 for(const[k,v]of Object.entries(l.readings)){
  if(equal(b.readings[k],v))continue;
  const rv=r.readings[k],bv=b.readings[k];
  if(!rv){out.readings[k]=clone(v);continue;}
  const latest=v.updated>=rv.updated?v:rv;
  out.readings[k]={...latest,best:Math.max(v.best,rv.best),attempts:Math.min(10000,rv.attempts+Math.max(0,v.attempts-(bv?.attempts||0)))};
 }
 for(const[k,v]of Object.entries(l.workbook)){
  if(equal(b.workbook[k],v))continue;
  const rv=r.workbook[k],bv=b.workbook[k];
  if(!rv){out.workbook[k]=v;continue;}
  const latest=v[4]>=rv[4]?v:rv;
  out.workbook[k]=[Math.min(10000,rv[0]+Math.max(0,v[0]-(bv?.[0]||0))),Math.min(10000,rv[1]+Math.max(0,v[1]-(bv?.[1]||0))),latest[2],latest[3],latest[4]];
 }
 for(const[k,v]of Object.entries(l.lexicon))if(!equal(b.lexicon[k],v)&&(!r.lexicon[k]||v[1]>=r.lexicon[k][1]))out.lexicon[k]=v;
 out.conversations=mergeConversations(b.conversations,l.conversations,r.conversations);
 const log=new Map([...r.studyLog,...l.studyLog.filter(x=>!b.studyLog.some(y=>y.id===x.id))].map(x=>[x.id,x]));out.studyLog=[...log.values()].sort((a,b)=>b.t-a.t).slice(0,200);
 for(const[k,v]of Object.entries(l.completed)){if(!out.completed[k]||v.score>out.completed[k].score)out.completed[k]=v;}
 for(const[k,v]of Object.entries(l.activity))out.activity[k]=Math.min(10000,(r.activity[k]||0)+Math.max(0,v-(b.activity[k]||0)));
 out.xp=Math.min(1000000,r.xp+Math.max(0,l.xp-b.xp));
 // No duplicar los 30 XP de una lección terminada en paralelo en dos equipos.
 for(const k of Object.keys(l.completed))if(!b.completed[k]&&r.completed[k])out.xp=Math.max(0,out.xp-30);
 out.xp=Math.max(out.xp,Object.keys(out.completed).length*30);
 out.checks=[...new Set([...r.checks.filter(i=>!(b.checks.includes(i)&&!l.checks.includes(i))),...l.checks.filter(i=>!b.checks.includes(i))])].sort((a,b)=>a-b);
 out.speech=mergeHistory(l.speech.filter(x=>!b.speech.some(y=>equal(x,y))),r.speech,100);
 out.exam=mergeHistory(l.exam.filter(x=>!b.exam.some(y=>equal(x,y))),r.exam,12);
 for(const k of ['personalPhrases','branching','videoLessons','pronunciationDrills','capstones'])out[k]=mergeMap(b[k],l[k],r[k]);
 // Conservar la mejor puntuación y los intentos de dos dispositivos que trabajan a la vez.
 for(const [k,v] of Object.entries(l.mastery)){
  if(equal(b.mastery[k],v))continue;
  const remote=r.mastery[k],base=b.mastery[k];
  if(!remote){out.mastery[k]=clone(v);continue;}
  out.mastery[k]={...(v.updated>=remote.updated?v:remote),best:Math.max(v.best,remote.best),attempts:Math.min(10000,remote.attempts+Math.max(0,v.attempts-(base?.attempts||0)))};
 }
 out.masteryDrafts={...r.masteryDrafts};
 for(const [k,v] of Object.entries(l.masteryDrafts)){
  if(equal(b.masteryDrafts[k],v))continue;
  const remote=r.masteryDrafts[k];
  if(!remote||v.updated>=remote.updated)out.masteryDrafts[k]=clone(v);
 }
 for(const k of Object.keys(b.masteryDrafts))if(!Object.hasOwn(l.masteryDrafts,k)&&!equal(b.masteryDrafts[k],l.masteryDrafts[k]))delete out.masteryDrafts[k];
 if(!equal(b.diagnostic,l.diagnostic))out.diagnostic=l.diagnostic;
 for(const k of ['name','goal','accent'])if(!equal(b[k],l[k]))out[k]=l[k];
 return cleanProgress(out);
}
export function readRecord(storage,key){try{const x=JSON.parse(storage.getItem(key)||'null');if(x?.recordVersion===1)return{...x,state:cleanProgress(x.state),base:cleanProgress(x.base),epoch:Number.isInteger(x.epoch)&&x.epoch>=0?x.epoch:0,pending:x.pending&&typeof x.pending.id==='string'?{id:x.pending.id,base:cleanProgress(x.pending.base),local:cleanProgress(x.pending.local),epoch:Math.max(0,Number(x.pending.epoch)||0)}:null};}catch{}return{recordVersion:1,state:freshProgress(),base:freshProgress(),epoch:0,dirty:false,pending:null,lastSynced:null};}
export function hasLearning(p){return Object.keys(p.completed).length>0||Object.keys(p.writing).length>0||Object.keys(p.vocab).length>0||Object.keys(p.activity).length>0||Object.keys(p.readingNotes||{}).length>0||Object.keys(p.readings||{}).length>0||Object.keys(p.mastery||{}).length>0||Object.keys(p.masteryDrafts||{}).length>0||Object.keys(p.study||{}).length>0||Object.keys(p.studyDrafts||{}).length>0||Object.keys(p.workbook||{}).length>0||Object.keys(p.portfolio||{}).length>0||Object.keys(p.conversations||{}).length>0||Object.keys(p.lexicon||{}).length>0||p.exam.length>0;}
