import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {teachingQuestions,reconstructionFeedback} from '../src/teaching-model.js';
import {freshProgress,cleanProgress,mergeProgress} from '../src/progress.js';
import {recordAutomaticEvents} from '../src/practice-memory.js';
const json=name=>JSON.parse(readFileSync(new URL('../src/'+name,import.meta.url)));
const notes=json('teacher-notes.json'), scenes=json('conversations.json'), checks=json('scene-checks.json');
const files={a1:'course.json',a2:'course-a2.json',b1:'course-b1.json',b2:'course-b2.json'};
test('all 288 guided lessons use an exact course example, a Spanish meaning and a specific transfer task',()=>{
 let count=0;
 for(const [level,file]of Object.entries(files))for(const u of json(file).units){
  const rows=notes[level][u.id-1];assert.equal(rows.length,3);assert.equal(new Set(rows.map(x=>x.es)).size,3);
  rows.forEach((n,i)=>{assert.equal(n.en,u.rules[i].examples[0]);assert(n.es.length>8&&n.task.length>25);count++;});
 }
 assert.equal(count,288);
});
test('lesson quizzes assess modelled sentences, include unambiguous keys and preserve unique review IDs',()=>{
 for(const [level,file]of Object.entries(files)){
  const ids=[];
  for(const u of json(file).units)for(let i=0;i<3;i++){
   const qs=teachingQuestions(u,i,notes[level][u.id-1],a=>[...a].reverse());
   assert.equal(qs.length,i===2?(level==='a1'?7:8):5);
   for(const q of qs){ids.push(q.id);assert(q.answer&&q.why);if(q.options){assert.equal(q.options.filter(x=>x===q.answer).length,1);assert.equal(new Set(q.options).size,q.options.length);}if(q.type==='dictation')assert(u.rules[i].examples.includes(q.answer));if(q.type==='order')assert.equal(q.words.map(x=>x.t).sort().join('|'),q.answer.split(/\s+/).sort().join('|'));}
  }
  assert.equal(new Set(ids).size,ids.length);
 }
});
test('order feedback diagnoses the first mismatch, including repeated words and punctuation',()=>{
 assert(reconstructionFeedback('Hello My name is Ana','Hello! My name is Ana.').correct);
 const f=reconstructionFeedback('My Hello name is Ana','Hello! My name is Ana.');assert.equal(f.index,0);assert.equal(f.expected,'hello');
 assert.equal(reconstructionFeedback('I am I','I am who I am.').missing,2);
 assert(!reconstructionFeedback('I am am','I am.').correct);
 assert(!reconstructionFeedback('','I am here.').correct);
 assert(reconstructionFeedback('I’m here','I’m here.').correct);
});
test('every scene has one supported comprehension check with an actual evidence turn',()=>{
 let count=0;
 for(const [level,stories]of Object.entries(scenes))for(const c of stories)for(let i=0;i<2;i++){
  const q=checks[`${level}-${c.id}-${i}`];assert(q&&q.question.length>20&&q.why.length>40);assert.equal(q.options.filter(x=>x===q.answer).length,1);assert.equal(new Set(q.options).size,3);assert(c.episodes[i].lines[q.evidence]?.en);count++;
 }
 assert.equal(count,48);assert.equal(Object.keys(checks).length,48);
});
test('full workshop and mentor records coexist, survive import and merge without awarding mastery',()=>{
 const p=freshProgress();
 for(let u=1;u<=24;u++){
  for(const k of ['s0','s1','s2','s3','s4','s5','p0','p1','p2','p3','recall','g0','g1','g2'])p.study[`u${u}_${k}`]={score:k[0]==='g'?4:85,best:85,attempts:1,date:'2026-10-13',updated:100,self:k[0]==='g'};
  for(const k of ['notes','reading','listening','project','reflection','mentor0','mentor1','mentor2'])p.studyDrafts[`u${u}_${k}`]='My saved draft.';
 }
 p.studyDrafts.u25_mentor0='invalid';p.studyDrafts.u1_mentor3='invalid';
 const c=cleanProgress(p);assert.equal(Object.keys(c.study).length,336);assert.equal(Object.keys(c.studyDrafts).length,192);assert.deepEqual(c.completed,{});assert.equal(c.xp,0);
 const local=structuredClone(c),remote=structuredClone(c);local.studyDrafts.u1_mentor0='Local message.';remote.studyDrafts.u2_notes='Remote notes.';
 const merged=mergeProgress(c,local,remote);assert.equal(merged.studyDrafts.u1_mentor0,'Local message.');assert.equal(merged.studyDrafts.u2_notes,'Remote notes.');assert.equal(merged.studyDrafts.u24_mentor2,'My saved draft.');
 const after=freshProgress();after.study.u1_g0={score:4,best:4,attempts:1,self:true};recordAutomaticEvents(freshProgress(),after);assert.equal(after.studyLog[0].kind,'lesson');assert.equal(after.studyLog[0].total,0);assert.equal(after.xp,0);
});
