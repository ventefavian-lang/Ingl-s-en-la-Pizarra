import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const lessons=JSON.parse(fs.readFileSync(new URL('../src/mastery-curriculum.json',import.meta.url),'utf8'));
const atlas=JSON.parse(fs.readFileSync(new URL('../src/mastery-atlas.json',import.meta.url),'utf8'));
import {gradeMastery,renderMastery,masteryLessons} from '../public/v12mod/mastery-academy.js';
import {freshProgress,cleanProgress,mergeProgress} from '../src/progress.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=filename=>fs.readFileSync(path.join(root,filename),'utf8');
const mock=(p=freshProgress())=>({courseId:'b2',user:{uid:'test'},getState:()=>structuredClone(p),save(s){p=structuredClone(s)}});

test('C1 and C2 include 24 original lessons, 120 questions and 96 contextual vocabulary entries',()=>{
 assert.equal(masteryLessons.length,24);
 assert.equal(lessons.filter(x=>x.level==='c1').length,12);
 assert.equal(lessons.filter(x=>x.level==='c2').length,12);
 assert.equal(lessons.reduce((n,l)=>n+l.questions.length,0),120);
 assert.equal(lessons.reduce((n,l)=>n+l.glossary.length,0),96);
 assert.equal(new Set(lessons.map(l=>l.id)).size,24);
 for(const l of lessons){
  assert.match(l.id,/^(c1|c2)-(0[1-9]|1[0-2])$/);
  assert.ok(l.passage.split(/\s+/).length>=115,`${l.id}: needs substantive original reading`);
  assert.ok(l.passage.toLowerCase().includes(l.glossary[0].en.toLowerCase()),`${l.id}: contextual word should appear in the text`);
  assert.equal(l.questions.length,5);
  for(const q of l.questions){assert.equal(q.options.length,3);assert.ok([0,1,2].includes(q.answer));assert.ok(q.why.length>25);assert.equal(new Set(q.options).size,3);}
  assert.ok(l.grammar.explain.length>60&&l.grammar.example.length>15);
  for(const field of ['writing','speaking','mediation']) assert.ok(l[field].length>40);
 }
});

test('64 advanced atlas references have content and distinct C1/C2 descriptions',()=>{
 assert.equal(atlas.length,64);
 assert.equal(atlas.filter(x=>x.level==='c1').length,32);
 assert.equal(atlas.filter(x=>x.level==='c2').length,32);
 assert.equal(new Set(atlas.map(x=>x.title)).size,64);
 for(const x of atlas){assert.ok(x.explain.length>40);assert.ok(x.example.length>20);assert.ok(x.warning.length>25)}
});

test('quiz returns 100% for keyed correct answers and zero for deliberately wrong answers',()=>{
 const l=lessons[0],right=l.questions.map(q=>q.answer),wrong=l.questions.map(q=>(q.answer+1)%3);
 assert.deepEqual(gradeMastery(l,right),{right:5,total:5,score:100});
 assert.equal(gradeMastery(l,wrong).score,0);
});

test('catalogue, lesson, exam and atlas render without IA and with controls',()=>{
 const store=mock(),home=renderMastery(store),unit=renderMastery(store,'c2-11'),exam=renderMastery(store,'c1-01','exam'),reference=renderMastery(store,'atlas','c2');
 for(const html of [home,unit,exam,reference])assert.match(html,/id="mastery-root"/);
 assert.match(home,/64 conceptos/);assert.match(home,/C1/);assert.match(home,/C2/);
 assert.match(unit,/data-master="save"/);assert.match(unit,/data-master="speak"/);
 assert.match(exam,/data-master="choose"/);assert.match(exam,/data-master="check"/);
 assert.match(reference,/data-master-atlas-card/);
 assert.doesNotMatch(unit,/calificación automática de escritura/i);
 assert.match(renderMastery({...store,courseId:'a1'}),/espacio de progreso B2/);
});

test('cleaning, merging and multi-device attempts retain mastery and bounded drafts',()=>{
 const old=freshProgress(),l=structuredClone(old),r=structuredClone(old);
 l.mastery['c1-01']={best:80,last:80,attempts:1,updated:100};
 r.mastery['c1-01']={best:100,last:100,attempts:1,updated:200};
 l.masteryDrafts['c2-03']={writing:'a'.repeat(9999),speaking:'b'.repeat(9999),mediation:'c'.repeat(9999),checks:['argument','nonsense'],updated:100};
 const merged=mergeProgress(old,l,r);
 assert.equal(merged.mastery['c1-01'].best,100);
 assert.equal(merged.mastery['c1-01'].attempts,2);
 assert.equal(merged.masteryDrafts['c2-03'].writing.length,2400);
 assert.equal(merged.masteryDrafts['c2-03'].speaking.length,1100);
 assert.deepEqual(merged.masteryDrafts['c2-03'].checks,['argument']);
 const bad=cleanProgress({mastery:{'c9-01':{best:100,last:100,attempts:1,updated:1}},masteryDrafts:{'__proto__':{writing:'x'}}});
 assert.equal(Object.keys(bad.mastery).length,0);
});

test('every engine contains the mastery route and the published ESM bundle has the data',()=>{
 for(const engine of ['course-engine.js','course-engine-a2.js','course-engine-b1.js','course-engine-b2.js']){
  const js=source('src/'+engine);assert.match(js,/renderMastery\(store,id,index\)/);
 }
 assert.match(source('src/journey-ui.js'),/C1–C2 · Dominio/);
 assert.match(source('public/index.html'),/A1–C2/);
 assert.match(source('firestore.rules'),/masteryDrafts/);
 assert.ok(fs.existsSync(path.join(root,'public/v12mod/mastery-curriculum.json.js')));
 assert.ok(fs.existsSync(path.join(root,'public/v12mod/mastery-atlas.json.js')));
 assert.match(source('public/v12.css'),/mastery-atlas-grid/);
 assert.doesNotMatch(source('src/mastery-academy.js'),/\b(fetch|apiKey|OpenRouter|Groq)\b/);
});
