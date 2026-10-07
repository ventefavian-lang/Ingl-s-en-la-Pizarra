import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {reviewSchedule} from '../src/study-memory.js';
import {freshProgress,cleanProgress,mergeProgress,hasLearning} from '../src/progress.js';
test('old progress gains empty workshop fields without changing completed lessons',()=>{
 const old={version:1,completed:{'1_0':{score:80,date:'2026-10-06'}},xp:30};
 const p=cleanProgress(old);assert.equal(p.completed['1_0'].score,80);assert.deepEqual(p.study,{});assert.deepEqual(p.studyDrafts,{});
});
test('workshop drafts count as learning and stay separate during merges',()=>{
 const a=freshProgress(),b=freshProgress();a.studyDrafts.u1_project='A first draft';b.studyDrafts.u2_project='A second draft';
 assert(hasLearning(a));const out=mergeProgress(freshProgress(),a,b);assert.equal(out.studyDrafts.u1_project,a.studyDrafts.u1_project);assert.equal(out.studyDrafts.u2_project,b.studyDrafts.u2_project);
});
test('parallel retrieval results preserve best score and do not double spaced reviews',()=>{
 const b=freshProgress();b.study.u1_recall={score:80,best:80,attempts:1,updated:1,due:100,reviews:0,date:'2026-10-06'};
 const l=structuredClone(b),r=structuredClone(b);l.study.u1_recall={...b.study.u1_recall,score:90,best:90,attempts:2,updated:200,reviews:1,due:500};r.study.u1_recall={...l.study.u1_recall,score:100,best:100,updated:220};
 const out=mergeProgress(b,l,r);assert.equal(out.study.u1_recall.best,100);assert.equal(out.study.u1_recall.reviews,1);assert.equal(out.study.u1_recall.attempts,3);assert.equal(out.study.u1_recall.score,100);
});
test('same-day practice and unsuccessful recall cannot advance an interval',()=>{
 const now=1700000000000,d=86400000;
 const first=reviewSchedule(null,80,now);assert.equal(first.due,now+d);assert.equal(first.reviews,0);
 const early=reviewSchedule(first,100,now+1000);assert.equal(early.due,first.due);assert.equal(early.reviews,0);assert.equal(early.qualified,false);
 const failed=reviewSchedule(first,70,now+d);assert.equal(failed.due,first.due);assert.equal(failed.reviews,0);
 const later=reviewSchedule(first,90,now+d);assert.equal(later.reviews,1);assert.equal(later.due,now+4*d);
});
test('imports bound workshop records and reject invalid unit and draft fields',()=>{
 const p=cleanProgress({study:{u25_p0:{score:100},u1_p0:{score:500,best:600,reviews:100,wrong:['<script>','m0']}},studyDrafts:{u1_project:'x'.repeat(3000),u2_token:'secret'}});
 assert(!p.study.u25_p0);assert.equal(p.study.u1_p0.score,100);assert.equal(p.study.u1_p0.reviews,5);assert.deepEqual(p.study.u1_p0.wrong,['m0']);assert.equal(p.studyDrafts.u1_project.length,2400);assert(!p.studyDrafts.u2_token);
});
test('every unit has original extended explanations, a new case, support and a transfer task',()=>{
 const packs=JSON.parse(fs.readFileSync(new URL('../src/deep-course.json',import.meta.url)));
 const texts=new Set();for(const level of ['a1','a2','b1']){assert.equal(packs[level].length,24);for(const [i,p]of packs[level].entries()){assert.equal(p.id,i+1);assert.equal(p.insights.length,3);assert(p.insights.every(r=>r.text.length>150));assert(p.text.split(/\s+/).length>=80);assert.equal(p.facts.length,3);assert.equal(p.glossary.length,6);assert.equal(p.transfer.length,3);assert(p.challenge.length>70);assert(!texts.has(p.text));texts.add(p.text);}}
 assert.equal(texts.size,72);
});
