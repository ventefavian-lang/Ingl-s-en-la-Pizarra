import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {masteryLessons,gradeMastery,renderMastery} from '../public/v12mod/mastery-academy.js';
import {freshProgress,cleanProgress,mergeProgress} from '../src/progress.js';

const atlas=JSON.parse(fs.readFileSync('src/mastery-atlas.json','utf8'));
const store=(level='b2',state=freshProgress())=>({courseId:level,user:{uid:'sample-student'},getState:()=>structuredClone(state),save:()=>{}});
test('C1-C2 has 24 unique authored advanced modules with five graded questions each',()=>{
 assert.equal(masteryLessons.length,24);
 assert.equal(new Set(masteryLessons.map(l=>l.id)).size,24);
 for(const level of ['c1','c2'])assert.equal(masteryLessons.filter(x=>x.level===level).length,12);
 for(const l of masteryLessons){
  assert.ok(l.passage.split(/\s+/).length>=110,l.id);
  assert.equal(l.questions.length,5,l.id);
  assert.ok(l.glossary.length>=4,l.id);
  assert.ok(l.grammar.example.length>15,l.id);
  assert.ok(['writing','speaking','mediation'].every(k=>typeof l[k]==='string'&&l[k].length>20),l.id);
  assert.ok(l.questions.every(q=>Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length&&q.why.length>=20),l.id);
  assert.equal(gradeMastery(l,l.questions.map(q=>q.answer)).score,100);
  assert.equal(gradeMastery(l,l.questions.map(q=>(q.answer+1)%q.options.length)).score,0);
 }
});
test('64 authored reference concepts exist for the expert atlas',()=>{
 assert.equal(atlas.length,64);
 assert.equal(new Set(atlas.map(x=>x.id)).size,64);
 assert.equal(atlas.filter(x=>x.level==='c1').length,32);
 assert.equal(atlas.filter(x=>x.level==='c2').length,32);
 assert.ok(atlas.every(x=>x.title&&x.explain&&x.example&&x.warning&&x.category));
});
test('C1-C2 views expose navigation, original reading, glossary, exams and drafts',()=>{
 const s=store(),lesson=masteryLessons[0];
 for(const [id,stage,expected] of [['','',/Academia C1/],['atlas','',/64 CONCEPTOS/],[lesson.id,'',/mastery-writing/],[lesson.id,'exam',/Comprobar respuesta/]]){
  const html=renderMastery(s,id,stage);
  assert.match(html,/mastery-root/);
  assert.match(html,expected);
 }
 assert.match(renderMastery(store('a1')), /level=b2/);
});
test('advanced learning achievements and drafts survive validation and merge',()=>{
 const p=freshProgress();p.mastery['c1-01']={best:80,last:60,attempts:3,updated:12345};
 p.masteryDrafts['c2-12']={writing:'An essay argument',speaking:'A talk',mediation:'Simplify the message',checks:['argument','precision'],updated:1000};
 const cleaned=cleanProgress(p);
 assert.equal(cleaned.mastery['c1-01'].best,80);
 assert.equal(cleaned.masteryDrafts['c2-12'].writing,'An essay argument');
 assert.deepEqual(mergeProgress(freshProgress(),cleaned,freshProgress()).mastery,cleaned.mastery);
 assert.equal(Object.keys(freshProgress().mastery).length,0);
});
