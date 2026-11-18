
import {initVoiceCatalog} from './voice-cast.js';
import a1 from './course.json.js';
import a2 from './course-a2.json.js';
import b1 from './course-b1.json.js';
import b2 from './course-b2.json.js';
import {bootCourse as bootB2} from './course-engine-b2.js';



import {initWordHelp} from './word-links.js';
import {bootCourse as bootB1} from './course-engine-b1.js';
import {bootCourse as bootA2} from './course-engine-a2.js';

import {initAuthGate} from './auth-gate.js';
const requested=new URLSearchParams(location.search).get('level');
const courseId=['a1','a2','b1','b2'].includes(requested)?requested:'a1';
const course={a1,a2,b1,b2}[courseId];







import {AccountStore} from './account-store.js';
import {bootCourse} from './course-engine.js';
window.COURSE=course;
initVoiceCatalog();
async function initialize(){
 let adapter=null;
 try{
  const c=window.FIREBASE_CONFIG;
  if(c&&['apiKey','authDomain','projectId','appId'].every(k=>typeof c[k]==='string'&&c[k].trim()&&!c[k].includes('REEMPLAZAR'))){
   const {createFirebaseAdapter}=await import('./firebase-adapter.js');
   adapter=createFirebaseAdapter(c,courseId);
  }
 }catch{console.warn('No se pudo iniciar el servicio de cuentas. Revisa la configuración de Firebase y la conexión.');}
 let storage;let persistent=true;
 try{storage=window.localStorage;}catch{persistent=false;const cache=new Map();storage={getItem:k=>cache.get(k)||null,setItem:(k,v)=>cache.set(k,v)};}
 const store=new AccountStore({adapter,storage,courseId});
 if(!persistent)store.localAvailable=false;
 initAuthGate(store);
 ({a1:bootCourse,a2:bootA2,b1:bootB1,b2:bootB2}[courseId])(store);store.start();
 let lastFocus=0;
 const syncWhenVisible=()=>{if(!document.hidden&&Date.now()-lastFocus>5000){lastFocus=Date.now();void store.sync();}};
 window.addEventListener('online',()=>void store.sync());
 window.addEventListener('focus',syncWhenVisible);
 document.addEventListener('visibilitychange',syncWhenVisible);
 window.addEventListener('pagehide',()=>{void store.sync();});
 document.addEventListener('click',async e=>{const button=e.target.closest('[data-level]');if(!button||button.dataset.level===courseId)return;button.disabled=true;await store.sync();const target=new URL(location.href);target.searchParams.set('level',button.dataset.level);target.hash='home';location.href=target.href;});
 initWordHelp(store,course);
 window.HelloStore=store;
}
void initialize();
