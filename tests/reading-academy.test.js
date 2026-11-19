import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=JSON.parse(fs.readFileSync('src/reading-library.json','utf8'));
import {readingBank,readingForLevel,scoreReading,renderReadingAcademy,nextReading} from '../public/v12mod/reading-academy.js';
import {cleanProgress,freshProgress,mergeProgress} from '../src/progress.js';

const levels=['a1','a2','b1','b2'];
test('48 original nonfiction readings with 288 keyed comprehension questions',()=>{
 assert.equal(source.original,true);
 assert.equal(readingBank.length,48);
 assert.equal(new Set(readingBank.map(x=>x.id)).size,48);
 assert.equal(readingBank.flatMap(x=>x.questions).length,288);
 for(const level of levels)assert.equal(readingForLevel(level).length,12);
});
test('passages are substantive, 6 explained questions per text, and varied evidence answers',()=>{
 for(const x of readingBank){
  assert.ok(x.paragraphs.length>=2,x.id);
  assert.ok(x.words>=({a1:70,a2:105,b1:130,b2:155}[x.level]),x.id);
  assert.equal(x.questions.length,6,x.id);
  assert.ok(x.glossary.every(g=>typeof g.word==='string'&&typeof g.es==='string'),x.id);
  assert.ok(x.questions.every(q=>q.options.length===3&&q.options.filter(v=>v===q.answer).length===1&&q.why.length>=15),x.id);
  assert.deepEqual(new Set(x.questions.map(q=>q.skill)),new Set(['detalle','propósito','vocabulario','evidencia']),x.id);
 }
 for(const level of levels){
  const answers=readingForLevel(level).map(x=>x.questions.at(-1).answer);
  for(const answer of ['True','False','Not Given'])assert.equal(answers.filter(x=>x===answer).length,4,level+answer);
 }
});
test('closed-answer scoring and progression are deterministic',()=>{
 assert.equal(scoreReading([{correct:true},{correct:true},{correct:false}]),67);
 assert.equal(scoreReading([]),0);
 for(const level of levels){const last=readingForLevel(level).at(-1);assert.equal(nextReading(last.id,level).id,readingForLevel(level)[0].id);}
});
test('catalogue, article, exam and strategies render from each level without paid services',()=>{
 const store={courseId:'a2',user:{uid:'test'},getState:freshProgress};
 assert.ok(renderReadingAcademy(store,null).includes('12 lecturas'));
 assert.ok(renderReadingAcademy(store,null,'a2-01').includes('Rain Gardens'));
 assert.ok(renderReadingAcademy(store,null,'a2-01','exam').includes('Pregunta 1 de 6'));
 assert.ok(renderReadingAcademy(store,null,'strategies').includes('Cuatro estrategias'));
 assert.ok(renderReadingAcademy(store,null,'review').includes('Los errores también enseñan'));
});
test('progress records are sanitized, per-level and merge across devices',()=>{
 const a=freshProgress(),b=freshProgress();
 a.readings['a1-01']={best:83,last:83,attempts:1,date:'2026-11-18',updated:111,wrong:[2]};
 a.readingNotes['a1-01']='My summary';
 b.readings['a1-01']={best:100,last:100,attempts:1,date:'2026-11-19',updated:222,wrong:[]};
 b.readingNotes['a1-02']='Another note';
 const result=mergeProgress(freshProgress(),a,b);
 assert.equal(result.readings['a1-01'].best,100);
 assert.equal(result.readings['a1-01'].attempts,2);
 assert.equal(result.readings['a1-01'].last,100);
 assert.equal(result.readingNotes['a1-01'],'My summary');
 assert.equal(result.readingNotes['a1-02'],'Another note');
 const cleaned=cleanProgress({readings:{'a1-01':{best:130,last:-9,attempts:200000,date:'bad',updated:-4,wrong:[-1,0,10,1]},'bad-id':{best:100,last:100}},readingNotes:{'a1-01':'ok','__proto__':'unsafe'}});
 assert.equal(cleaned.readings['a1-01'].best,100);
 assert.deepEqual(cleaned.readings['a1-01'].wrong,[0,1]);
 assert.equal(cleaned.readings['bad-id'],undefined);
 assert.equal({}.unsafe,undefined);
});
test('all four engines link Reading Academy and Firestore rules allow the new progress fields',()=>{
 for(const filename of ['course-engine.js','course-engine-a2.js','course-engine-b1.js','course-engine-b2.js']){
  const src=fs.readFileSync('src/'+filename,'utf8');
  assert.match(src,/if\(r==='reading'\)/);
  assert.match(src,/readingNotes/);
 }
 const rules=fs.readFileSync('firestore.rules','utf8');
 assert.match(rules,/readings\.size\(\) <= 48/);
 assert.match(rules,/readingNotes\.size\(\) <= 48/);
 const html=fs.readFileSync('public/index.html','utf8');
 assert.match(html,/v12mod\/main\.js\?v=1[45]/);
 assert.ok(fs.existsSync('public/v12mod/reading-library.json.js'));
});
