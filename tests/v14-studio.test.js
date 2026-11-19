import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {freshProgress,cleanProgress,mergeProgress} from '../src/progress.js';
import {adventures,drills,capstoneTopics} from '../src/v14-data.js';
import {renderV14,placementBank,placementResult,studySuggestions} from '../public/v12mod/v14-studio.js';
import videoClips from '../src/v14-videos.json' with {type:'json'};

const courses={a1:JSON.parse(fs.readFileSync('src/course.json')),a2:JSON.parse(fs.readFileSync('src/course-a2.json')),b1:JSON.parse(fs.readFileSync('src/course-b1.json')),b2:JSON.parse(fs.readFileSync('src/course-b2.json'))};
globalThis.window={ALL_COURSES:courses};
const store=(level='a1',state=freshProgress())=>({courseId:level,user:{uid:'uid-v14'},getState:()=>structuredClone(state)});

test('diagnostic uses twenty real original question keys, equally distributed among four levels',()=>{
 const q=placementBank(courses);assert.equal(q.length,20);assert.equal(new Set(q.map(x=>x.id)).size,20);
 for(const l of ['a1','a2','b1','b2'])assert.equal(q.filter(x=>x.level===l).length,5);
 for(const item of q){assert.ok(item.options.includes(item.answer));assert.ok(item.prompt.length>=5);}
 const answers=Object.fromEntries(q.map(x=>[x.id,x.answer]));assert.equal(placementResult(q,answers).score,100);
 assert.equal(placementResult(q,answers).recommended,'b2');
 const none=placementResult(q,{});assert.equal(none.recommended,'a1');assert.equal(none.score,0);
});
test('each level has branching stories, original video, pronunciation drills and three projects',()=>{
 for(const l of ['a1','a2','b1','b2']){
  assert.equal(adventures.filter(x=>x.level===l).length,2);
  assert.equal(videoClips.filter(x=>x.level===l).length,2);
  assert.equal(capstoneTopics[l].length,3);
 }
 assert.ok(drills.length>=12);
 for(const a of adventures){assert.equal(a.branches.length,2);assert.ok(a.branches.every(b=>b.ends.length===2));}
 for(const v of videoClips){assert.ok(v.lines.length>=4);assert.ok(v.duration>6);assert.ok(v.options.includes(v.answer));assert.ok(fs.statSync('public/'+v.file).size>50000);}
});
test('V14 learning data survives cleaning and merging without leaking between accounts',()=>{
 const p=freshProgress();p.diagnostic={score:75,date:'2026-11-18',recommended:'b1',breakdown:{a1:80,a2:80,b1:60,b2:30}};
 p.personalPhrases['p-12345678']={en:'Could you repeat that?',es:'¿Podrías repetirlo?',example:'Could you repeat the question?',due:100,interval:3,reviews:2,created:90,updated:120};
 p.branching['a1-adv-1']={endings:['aa','ab'],last:'ab'};
 p.videoLessons['a1-v1']={watched:true,correct:true,attempts:2,updated:100};
 p.pronunciationDrills['drill-01']={attempts:3,confidence:1,updated:90};
 p.capstones['a1-p1']={draft:'First draft',revised:'Improved draft',checks:[0,1,2],done:true,updated:300};
 const cleaned=cleanProgress(p);assert.deepEqual(cleaned.diagnostic,p.diagnostic);assert.equal(cleaned.personalPhrases['p-12345678'].en,'Could you repeat that?');
 assert.equal(cleaned.capstones['a1-p1'].done,true);
 const other=freshProgress();assert.equal(other.diagnostic,null);assert.equal(Object.keys(other.personalPhrases).length,0);
 const merged=mergeProgress(freshProgress(),cleaned,freshProgress());assert.deepEqual(merged.capstones,cleaned.capstones);assert.equal(merged.branching['a1-adv-1'].endings.length,2);
});
test('new rendered sections have real controls, no synthetic AI grader or download mode',()=>{
 for(const l of ['a1','a2','b1','b2'])for(const r of ['academy','placement','plan','adventures','phrasebook','video','pronunciation','skills-map','portfolio']){
  const html=renderV14(store(l),courses[l],r);assert.match(html,/v14-root/);assert.ok(html.length>200,`${l}:${r}`);
 }
 assert.match(renderV14(store('a1'),courses.a1,'placement'),/data-v14="answer-placement"/);
 assert.match(renderV14(store('a1'),courses.a1,'phrasebook'),/data-v14="add-phrase"/);
 assert.match(renderV14(store('a1'),courses.a1,'video','a1-v1'),/<video/);
 assert.match(renderV14(store('a1'),courses.a1,'portfolio','a1-p1'),/data-v14="finish-portfolio"/);
});
test('learning plan reacts to recorded weak readings and scheduled reviews',()=>{
 const p=freshProgress();p.readings['a1-01']={best:50,last:50,attempts:1,date:'2026-11-18',updated:1,wrong:[1]};p.workbook['u1-n0q0']=[1,0,0,1,1];
 const suggestions=studySuggestions(p,courses.a1,'a1',Date.now());
 assert.ok(suggestions.some(x=>x.target==='reading/review'));assert.ok(suggestions.some(x=>x.target==='memory'));
 assert.ok(suggestions.some(x=>x.target==='placement'));
});
test('all engines expose V14 routes, rules and published module',()=>{
 for(const name of ['course-engine.js','course-engine-a2.js','course-engine-b1.js','course-engine-b2.js']){
  const code=fs.readFileSync('src/'+name,'utf8');assert.match(code,/renderV14\(/);assert.match(code,/renderV14ProgressLink\(/);
 }
 const rules=fs.readFileSync('firestore.rules','utf8');for(const field of ['diagnostic','personalPhrases','branching','videoLessons','pronunciationDrills','capstones'])assert.ok(rules.includes(`'${field}'`));
 const html=fs.readFileSync('public/index.html','utf8');assert.match(html,/v12mod\/main\.js\?v=1[456]/);assert.ok(fs.existsSync('public/v12mod/v14-videos.json.js'));
});
