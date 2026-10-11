// Automatic browser fallback. Conversation audio uses the bundled fixed cast.
export const voiceCharacters=['Leo','Mia','Nora','Sam'];
export const voiceRoles=[...voiceCharacters,'Narrador'];
const language=v=>String(v?.lang||'').replace(/_/g,'-').toLowerCase();
export const voiceID=v=>JSON.stringify([String(v.voiceURI||v.name||''),language(v),String(v.name||'')]);
export function englishVoices(list=[]){
 const unique=new Map();for(const v of list)if(/^en(?:-|$)/.test(language(v))){const key=String(v.name).toLowerCase()+'|'+language(v);if(!unique.has(key))unique.set(key,v);}
 return [...unique.values()].sort((a,b)=>voiceID(a).localeCompare(voiceID(b),'en'));
}
const preferredNames={Leo:/\b(david|guy|daniel|ryan|male)\b/i,Mia:/\b(zira|jenny|samantha|aria|female)\b/i,Nora:/\b(hazel|sonia|susan|karen|moira|shelley)\b/i,Sam:/\b(mark|alex|thomas|oliver|tom|reed)\b/i};
export function cleanVoicePreferences(raw={}){const out={};for(const role of voiceRoles)if(Object.hasOwn(raw||{},role)&&typeof raw[role]==='string'&&raw[role].length<=700)out[role]=raw[role];return out;}
export function assignVoiceCast(list,preferences={},accent='en-US',activePeople=[]){
 const voices=englishVoices(list),prefs=cleanVoicePreferences(preferences),map={},used=new Set(),explicit=new Set();
 const rank=(role,v)=>(language(v)===accent.toLowerCase()?20:0)+(preferredNames[role]?.test(v.name)?40:0)+(/natural|neural|enhanced|premium/i.test(v.name)?8:0)+(v.default?1:0);
 const ranked=role=>[...voices].sort((a,b)=>rank(role,b)-rank(role,a)||voiceID(a).localeCompare(voiceID(b),'en'));
 // Reserve explicit choices before assigning the remaining characters.
 for(const role of voiceCharacters){const selected=voices.find(v=>voiceID(v)===prefs[role]);if(selected){map[role]=selected;explicit.add(role);used.add(voiceID(selected));}}
 for(const role of voiceCharacters){if(map[role])continue;const options=ranked(role),candidate=options.find(v=>!used.has(voiceID(v)))||map[role==='Nora'?'Mia':'Leo']||options[0]||null;map[role]=candidate;if(candidate)used.add(voiceID(candidate));}
 // With fewer voices than characters, prioritize two distinct speakers in this scene.
 const activeUsed=new Set();for(const role of activePeople){if(!map[role])continue;let id=voiceID(map[role]);if(activeUsed.has(id)&&!explicit.has(role)){const candidate=ranked(role).find(v=>!activeUsed.has(voiceID(v)));if(candidate){map[role]=candidate;id=voiceID(candidate);}}activeUsed.add(id);}
 map.Narrador=voices.find(v=>voiceID(v)===prefs.Narrador)||ranked('Narrador')[0]||null;return map;
}
let attached=false;
const listeners=new Set();
export function availableVoices(){try{return englishVoices(window.speechSynthesis?.getVoices()||[]);}catch{return[];}}
export function browserCast(accent='en-US',active=[]){return assignVoiceCast(availableVoices(),{},accent,active);}
export function voiceFor(role='Narrador',accent='en-US',active=[]){return browserCast(accent,active)[role]||browserCast(accent,active).Narrador;}
export function configureVoice(utterance,role='Narrador',accent='en-US',active=[]){const v=voiceFor(role,accent,active);utterance.voice=v;utterance.lang=v?.lang||accent;utterance.pitch=1;return v;}
function notify(){for(const fn of listeners)fn();}
export function initVoiceCatalog(){if(attached)return;attached=true;window.speechSynthesis?.addEventListener?.('voiceschanged',notify);availableVoices();}
export function onVoiceCatalogChange(fn){initVoiceCatalog();listeners.add(fn);return()=>listeners.delete(fn);}
export function waitForVoices(timeout=1400){initVoiceCatalog();const v=availableVoices();if(v.length||!window.speechSynthesis)return Promise.resolve(v);return new Promise(resolve=>{let timer;const off=onVoiceCatalogChange(()=>{const current=availableVoices();if(current.length){clearTimeout(timer);off();resolve(current);}});timer=setTimeout(()=>{off();resolve(availableVoices());},timeout);});}
