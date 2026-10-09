import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildPracticeBank,makeCloze,answerMemory,isAnswer,recordAutomaticEvents} from '../src/practice-memory.js';
import {freshProgress,cleanProgress,mergeProgress} from '../src/progress.js';
import {AccountStore} from '../src/account-store.js';
const read=name=>JSON.parse(readFileSync(new URL('../src/'+name,import.meta.url)));
const b2=read('course-b2.json');
test('B2 contains all 24 authored units and usable answers in every activity',()=>{
 assert.equal(b2.units.length,24);assert.equal(read('deep-b2.json').length,24);
 for(const u of b2.units){assert.equal(u.rules.length,3);assert.equal(u.vocab.length,20);assert.equal(u.reading.length,4);assert.equal(u.caseQuestions.length,4);assert.equal(u.listening.questions.length,3);assert.equal(u.dialogue.length,6);assert.equal(u.transforms.length,4);assert.equal(u.forms.length,4);assert(u.story.split(/\s+/).length>=170);assert(u.case.split(/\s+/).length>=75);assert(u.model.length>500);}
 const bank=buildPracticeBank(b2,'b2');assert(bank.length>4000);assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of bank){assert(q.answer&&q.prompt&&q.why,q.id);assert(isAnswer(q.answer,q),q.id);if(q.type==='choice'){assert(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length,q.id);}}
});
test('every whole-text gap has the same item in the error-review bank for all levels',()=>{
 for(const level of ['a1','a2','b1','b2']){const c=read('course'+(level==='a1'?'':'-'+level)+'.json'),bank=buildPracticeBank(c,level),map=new Map(bank.map(q=>[q.id,q]));for(const u of c.units)for(const [field,code]of [['story','r'],['case','c']])if(u[field]){for(const [i,g]of makeCloze(u[field],level==='a1'?6:10).entries()){assert.equal(u[field].slice(g.start,g.end),g.answer);assert.equal(map.get(`u${u.id}-z${code}${i}`).answer,g.answer);}}}
});
test('delayed retrieval advances across days, early repeats do not and errors reset',()=>{
 const start=1000000,a=answerMemory(null,true,start);assert.equal(a[2],1);
 const early=answerMemory(a,true,start+100);assert.equal(early[2],1);assert.equal(early[3],a[3]);
 const due=answerMemory(early,true,a[3]+1);assert.equal(due[2],2);assert.equal(due[3],a[3]+1+3*86400000);
 const fail=answerMemory(due,false,due[4]+1);assert.equal(fail[2],0);assert.equal(fail[3],due[4]+1+15*60000);
});
test('parallel practice merges counts and keeps a newer failure instead of a stale success',()=>{
 const b=freshProgress();b.workbook['u1-v0r']=[2,2,2,100,10];
 const l=structuredClone(b),r=structuredClone(b);l.workbook['u1-v0r']=[3,3,3,200,20];r.workbook['u1-v0r']=[3,2,0,40,30];
 l.portfolio.u1_essay='Local text';r.portfolio.u2_essay='Remote text';l.lexicon.test=[0,40];r.lexicon.test=[1,20];
 const m=mergeProgress(b,l,r);assert.deepEqual(m.workbook['u1-v0r'],[4,3,0,40,30]);assert.equal(m.portfolio.u2_essay,'Remote text');assert.equal(m.portfolio.u1_essay,'Local text');assert.deepEqual(m.lexicon.test,[0,40]);
});
test('new data survives cleaning, bounds imported content and records lessons once',()=>{
 const old=freshProgress(),p=freshProgress();p.completed['1_0']={score:100,date:'2026-10-09'};p.portfolio.u1_essay='x'.repeat(3000);p.portfolio.u25_essay='bad';p.workbook['u1-v0r']=[1,7,10,100,20];p.workbook['u99-test']=[1,1,1,1,1];p.lexicon.good=[1,12];p.lexicon['<script>']=[1,12];
 const c=cleanProgress(p);assert.equal(c.portfolio.u1_essay.length,2400);assert(!c.portfolio.u25_essay);assert.deepEqual(c.workbook['u1-v0r'],[1,1,5,100,20]);assert.equal(Object.keys(c.workbook).length,1);assert.deepEqual(c.lexicon,{good:[1,12]});
 recordAutomaticEvents(old,c);assert.equal(c.studyLog.length,1);recordAutomaticEvents(c,c);assert.equal(c.studyLog.length,1);
});
test('B2 never migrates B1 and keeps guest vocabulary and drafts separate',()=>{
 const map=new Map(),storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};storage.setItem('hello-b1-v1',JSON.stringify({...freshProgress(),version:3,course:'B1',xp:60}));
 const a=new AccountStore({storage,courseId:'b1'}),b=new AccountStore({storage,courseId:'b2'});
 try{assert.equal(b.getState().xp,0);const p=b.getState();p.portfolio.u1_essay='B2 draft';p.lexicon.setback=[1,12];b.save(p);assert.deepEqual(a.getState().portfolio,{});assert.deepEqual(a.getState().lexicon,{});const c=new AccountStore({storage,courseId:'b2'});assert.equal(c.getState().portfolio.u1_essay,'B2 draft');c.destroy();}finally{a.destroy();b.destroy();}
});
test('all 44 chart sounds and three accent variants have nonempty bundled WAV samples',()=>{
 const sounds=read('sounds.json'),meta=read('phoneme-audio.json');assert.equal(sounds.length,44);
 for(const id of [...sounds.map(s=>s.id),'er','axr','ow']){const bytes=readFileSync(new URL('../public/assets/phonemes/'+id+'.wav',import.meta.url));assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WAVE');assert(bytes.length>1000);assert(meta[id].duration>0);}
});
