// Datos de aprendizaje. Sin tokens, correos ni credenciales.
export const freshProgress = () => ({version:1,completed:{},activity:{},errors:{},vocab:{},writing:{},checks:[],speech:[],exam:[],xp:0,goal:10,accent:'en-US',name:''});
export const clone = value => JSON.parse(JSON.stringify(value));
const own = obj => obj && typeof obj==='object' && !Array.isArray(obj) ? obj : {};
const safeKey=k=>!['__proto__','prototype','constructor'].includes(k);
const entries=obj=>Object.entries(own(obj)).filter(([k])=>safeKey(k));
const text=(s,n)=>typeof s==='string'?s.slice(0,n):'';
const finite=(x,max=1000000)=>Number.isFinite(x)?Math.max(0,Math.min(max,x)):0;
const date=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||'')?s:'';
export function cleanProgress(input) {
 const s=own(input),p=freshProgress();
 p.name=text(s.name,30);p.goal=[5,10,15,20].includes(s.goal)?s.goal:10;p.accent=['en-US','en-GB'].includes(s.accent)?s.accent:'en-US';p.xp=Math.floor(finite(s.xp));
 for(const[k,v]of entries(s.completed)) if(/^([1-9]|1\d|2[0-4])_[012]$/.test(k)&&v&&Number.isFinite(v.score)&&v.score>=70&&v.score<=100)p.completed[k]={score:v.score,date:date(v.date)};
 for(const[k,v]of entries(s.activity).slice(-3660))if(date(k)&&Number.isFinite(v))p.activity[k]=Math.floor(finite(v,10000));
 for(const[k,v]of entries(s.vocab).slice(0,1000))if(/^(u\d+v\d+|colours\d+|jobs\d+|animals\d+|pack\d+v\d+)$/.test(k)&&v&&Number.isFinite(v.due))p.vocab[k]={due:finite(v.due,9999999999999),interval:[0,1,3,7,14].includes(v.interval)?v.interval:0,reviews:Math.floor(finite(v.reviews,10000))};
 for(const[k,v]of entries(s.writing))if(/^([1-9]|1\d|2[0-4])$/.test(k))p.writing[k]=text(v,2000);
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
 for(const k of ['errors','vocab','writing'])out[k]=mergeMap(b[k],l[k],r[k]);
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
export function hasLearning(p){return Object.keys(p.completed).length>0||Object.keys(p.writing).length>0||Object.keys(p.vocab).length>0||Object.keys(p.activity).length>0;}
