import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {AccountStore} from '../src/account-store.js';
import {freshProgress} from '../src/progress.js';

function memoryStorage(){const m=new Map();return{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};}
test('V12 registration and password login use distinct account methods, not a shared guest profile',async()=>{
 const calls=[];
 const adapter={signUp:async(email,password,name)=>calls.push(['register',email,password,name]),signInWithPassword:async(email,password)=>calls.push(['login',email,password]),resetPassword:async email=>calls.push(['reset',email]),read:async()=>({progress:freshProgress(),epoch:0})};
 const store=new AccountStore({adapter,storage:memoryStorage(),courseId:'a1'});
 assert.equal(await store.signUp('demo@example.org','ABCDEF1','Estudiante'),true);
 assert.equal(await store.signInWithPassword('demo@example.org','ABCDEF1'),true);
 assert.equal(await store.resetPassword('demo@example.org'),true);
 assert.deepEqual(calls.map(x=>x[0]),['register','login','reset']);
 store.destroy();
});
test('V12 error in email signup does not report a completed registration',async()=>{
 const store=new AccountStore({adapter:{signUp:async()=>{throw {code:'auth/email-already-in-use'};}},storage:memoryStorage()});
 assert.equal(await store.signUp('demo@example.org','abcABC123','Demo'),false);
 assert.match(store.message,/ya tiene una cuenta/);
 store.destroy();
});
test('V12 has a responsive lock screen, a separate guide, and a deployable ESM bundle',async()=>{
 const html=fs.readFileSync('public/index.html','utf8');
 const css=fs.readFileSync('public/v12.css','utf8');
 const journey=fs.readFileSync('src/journey-ui.js','utf8');
 assert.match(html,/class="auth-locked"/);
 assert.match(html,/firebase\/auth/);
 assert.match(html,/v12mod\/main.js/);
 assert.match(css,/\.h-sidebar\{overflow-y:auto/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(journey,/h-mobile-tools/);
 assert.match(journey,/Mi guía de estudio/);
 globalThis.document={addEventListener(){},querySelectorAll(){return[];}};
 const {renderLearningCoach}=await import('../public/v12mod/learning-coach.js');
 for(const [level,filename] of [['a1','course'],['a2','course-a2'],['b1','course-b1'],['b2','course-b2']]){
  const {default:course}=await import(`../public/v12mod/${filename}.json.js`);
  const markup=renderLearningCoach({courseId:level,getState:freshProgress},course);
  assert.match(markup,/COMPRENDE/);
  assert.match(markup,/PONLO EN CONTEXTO/);
  assert.match(markup,/RECUPERA Y USA/);
  assert.match(markup,/data-v12-coach-choice/);
 }
});
