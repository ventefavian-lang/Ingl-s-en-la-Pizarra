import {cleanConversations,mergeConversations} from './conversation-memory.js';
// Datos de aprendizaje. Sin tokens, correos ni credenciales.
export const freshProgress = () => ({version:1,completed:{},activity:{},errors:{},vocab:{},writing:{},study:{},studyDrafts:{},workbook:{},portfolio:{},conversations:{},lexicon:{},studyLog:[],checks:[],speech:[],exam:[],xp:0,goal:10,accent:'en-US',name:''});
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
 for(const[k,v]of entries(s.study).slice(0,288))if(/^u([1-9]|1\d|2[0-4])_(s[0-5]|p[0-3]|recall)$/.test(k)&&v&&typeof v==='object')p.study[k]={score:finite(v.score,100),best:finite(v.best,100),attempts:Math.floor(finite(v.attempts,10000)),date:date(v.date),updated:finite(v.updated,9999999999999),due:finite(v.due,9999999999999),reviews:Math.floor(finite(v.reviews,5)),self:v.self===true,wrong:(Array.isArray(v.wrong)?v.wrong:[]).filter(x=>typeof x==='string'&&/^[a-z0-9]{1,20}$/.test(x)).slice(0,40)};
 for(const[k,v]of entries(s.studyDrafts).slice(0,120))if(/^u([1-9]|1\d|2[0-4])_(notes|reading|listening|project|reflection)$/.test(k))p.studyDrafts[k]=text(v,2400);
 for(const[k,v]of entries(s.workbook).slice(0,6500))if(/^u([1-9]|1\d|2[0-4])-[a-z0-9]{1,20}$/.test(k)&&Array.isArray(v)&&v.length===5&&v.every(Number.isFinite)){const attempts=Math.floor(finite(v[0],10000));p.workbook[k]=[attempts,Math.min(attempts,Math.floor(finite(v[1],10000))),Math.floor(finite(v[2],5)),finite(v[3],9999999999999),finite(v[4],9999999999999)];}
 for(const[k,v]of entries(s.portfolio).slice(0,72))if(/^u([1-9]|1\d|2[0-4])_(essay|speech|mediation)$/.test(k))p.portfolio[k]=text(v,2400);
 for(const[k,v]of entries(s.lexicon).slice(0,3000))if(/^[a-z][a-z ,'-]{0,69}$/.test(k)&&Array.isArray(v)&&[0,1].includes(v[0])&&Number.isFinite(v[1]))p.lexicon[k]=[v[0],finite(v[1],9999999999999)];
 p.studyLog=(Array.isArray(s.studyLog)?s.studyLog:[]).filter(v=>v&&typeof v.id==='string'&&Number.isFinite(v.t)&&['lesson','workshop','project','exam','voice','practice','reading','cloze','writing','speaking','mediation','conversation'].includes(v.kind)).slice(0,200).map(v=>({id:text(v.id,100),t:finite(v.t,9999999999999),kind:v.kind,unit:Math.floor(finite(v.unit,24)),right:finite(v.right,10000),total:finite(v.total,10000)}));
 p.checks=Array.isArray(s.checks)?[...new Set(s.checks.filter(x=>Number.isInteger(x)&&x>=0&&x<50))].sort((a,b)=>a-b):[];
 // Los errores se reconstruyen desde el catálogo, nunca se ejecuta contenido importado.
 for(const[k]of entries(s.errors).slice(0,600))if(/^u\d+[a-z]+\d+[a-z]*$/.test(k))p.errors[k]=true;
 p.speech=(Array.isArray(s.speech)?s.speech:[]).filter(x=>x&&typeof x.phrase==='string'&&Number.isFinite(x.score)).slice(0,100).map(x=>({id:text(x.id,100),phrase:text(x.phrase,300),score:finite(x.score,100),date:date(x.date),unit:Math.floor(finite(x.unit,24))||1}));
 p.exam=(Array.isArray(s.exam)?s.exam:[]).filter(x=>x&&Number.isFinite(x.score)&&(x.block==='all'||['0','1','2','3'].includes(String(x.block)))).slice(0,12).map(x=>({id:text(x.id,100),score:finite(x.score,100),block:x.block,date:date(x.date),results:[]}));
 return p;
}
const sortValue=v=>Array.isArray(v)?v.map(sortValue):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sortValue(v[k])])):v;
export const equal=(a,b)=>JSON.stringify(sortValue(a))===JSON.stringify(sortValue(b));
function mergeMap(base,local,remote){const out={...remote};for(const k of new Set([...Object.keys(base),...Object.keys(local)])){if(!equal(base[k],local[k])){if(Object.hasOwn(local,k))out[k]=clone(local[k]);else delete out[k];}}return out;}
function mergeHistory(local,remote,max){const seen=new Set();return [...local,...remote].filter(x=>{const key=x.id||JSON.stringify(x);if(seen.has(key))return false;seen.add(key);return true;}).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,max);}
// Tres versiones: último estado confirmado, cambios locales y estado del servidor.
export function mergeProgress(baseInput,localInput,remoteInput){
 const b=cleanProgress(baseInput),l=cleanProgress(localInput),r=cleanProgress(remoteInput),out=clone(r);
 for(const k of ['errors','vocab','writing','studyDrafts','portfolio'])out[k]=mergeMap(b[k],l[k],r[k]);
 for(const[k,v]of Object.entries(l.study)){
  if(equal(b.study[k],v))continue;
  const remote=r.study[k],base=b.study[k];
  if(!remote){out.study[k]=clone(v);continue;}
  const latest=v.updated>=remote.updated?v:remote;
  out.study[k]={...latest,best:Math.max(v.best,remote.best),attempts:Math.min(10000,remote.attempts+Math.max(0,v.attempts-(base?.attempts||0))),reviews:Math.max(v.reviews,remote.reviews),due:Math.max(v.due,remote.due)};
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
 for(const k of ['name','goal','accent'])if(!equal(b[k],l[k]))out[k]=l[k];
 return cleanProgress(out);
}
export function readRecord(storage,key){try{const x=JSON.parse(storage.getItem(key)||'null');if(x?.recordVersion===1)return{...x,state:cleanProgress(x.state),base:cleanProgress(x.base),epoch:Number.isInteger(x.epoch)&&x.epoch>=0?x.epoch:0,pending:x.pending&&typeof x.pending.id==='string'?{id:x.pending.id,base:cleanProgress(x.pending.base),local:cleanProgress(x.pending.local),epoch:Math.max(0,Number(x.pending.epoch)||0)}:null};}catch{}return{recordVersion:1,state:freshProgress(),base:freshProgress(),epoch:0,dirty:false,pending:null,lastSynced:null};}
export function hasLearning(p){return Object.keys(p.completed).length>0||Object.keys(p.writing).length>0||Object.keys(p.vocab).length>0||Object.keys(p.activity).length>0||Object.keys(p.study||{}).length>0||Object.keys(p.studyDrafts||{}).length>0||Object.keys(p.workbook||{}).length>0||Object.keys(p.portfolio||{}).length>0||Object.keys(p.conversations||{}).length>0;}
