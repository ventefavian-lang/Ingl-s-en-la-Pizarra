import {answerMemory} from './practice-memory.js';
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const num=(x,max=10000)=>Number.isFinite(x)?Math.max(0,Math.min(max,Math.floor(x))):0;
const str=x=>typeof x==='string'?x.slice(0,1800):'';
export const episodeKey=(id,index)=>`c${id}e${index}`;
export const emptyConversation=()=>({done:[],updated:0,draft:'',reflection:'',plays:0,attempts:0,correct:0,choice:-1,review:[0,0,0,0,0]});
export function cleanConversations(input){
 const out={};
 for(const[k,raw]of Object.entries(obj(input))){if(!/^c[1-6]e[01]$/.test(k))continue;const v=obj(raw),attempts=num(v.attempts),a=Array.isArray(v.review)?v.review:[];
 out[k]={done:[...new Set((Array.isArray(v.done)?v.done:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<6))].sort(),updated:num(v.updated,9999999999999),draft:str(v.draft),reflection:str(v.reflection),plays:num(v.plays),attempts,correct:Math.min(attempts,num(v.correct)),choice:[0,1].includes(v.choice)?v.choice:-1,review:[num(a[0]),Math.min(num(a[0]),num(a[1])),num(a[2],5),num(a[3],9999999999999),num(a[4],9999999999999)]};
 }return out;
}
export function mergeConversations(base,local,remote){
 const b=cleanConversations(base),l=cleanConversations(local),r=cleanConversations(remote),out={...r};
 for(const[k,v]of Object.entries(l)){
  if(JSON.stringify(b[k])===JSON.stringify(v))continue;
  const rv=r[k];if(!rv){out[k]=v;continue;}const bv=b[k]||emptyConversation(),latest=v.updated>=rv.updated?v:rv,reviewLatest=v.review[4]>=rv.review[4]?v.review:rv.review;
  out[k]={...latest,done:[...new Set([...v.done,...rv.done])].sort(),plays:rv.plays+Math.max(0,v.plays-bv.plays),attempts:rv.attempts+Math.max(0,v.attempts-bv.attempts),correct:rv.correct+Math.max(0,v.correct-bv.correct),review:[rv.review[0]+Math.max(0,v.review[0]-bv.review[0]),rv.review[1]+Math.max(0,v.review[1]-bv.review[1]),...reviewLatest.slice(2)]};
 }return cleanConversations(out);
}
export function finishStage(previous,stage,now=Date.now()){
 const v={...emptyConversation(),...previous};if(!Number.isInteger(stage)||stage<0||stage>5)return v;
 const done=[...new Set([...v.done,stage])].sort();
 return {...v,done,updated:now,review:done.length===6&&!v.review[3]?[0,0,0,now+86400000,now]:v.review};
}
export const reviewConversation=(previous,remembered,now=Date.now())=>({...previous,review:answerMemory(previous.review,remembered,now),updated:now});
export const sceneComplete=v=>v?.done?.length===6;
// Similarity of a transcript to a script, never a phonetic pronunciation score.
export function transcriptMatch(a,b){
 const tokens=x=>String(x).normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]/g,' ').trim().split(/\s+/).filter(Boolean);
 const x=tokens(a),y=tokens(b);if(!x.length||!y.length)return 0;
 let row=Array.from({length:y.length+1},(_,i)=>i);
 for(let i=1;i<=x.length;i++){const next=[i];for(let j=1;j<=y.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(x[i-1]===y[j-1]?0:1));row=next;}
 return Math.max(0,Math.round(100*(1-row[y.length]/Math.max(x.length,y.length))));
}
