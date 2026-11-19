import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {build} from 'esbuild';
const result=await build({entryPoints:[new URL('../src/handbook-model.js',import.meta.url).pathname],bundle:true,platform:'node',format:'esm',write:false});
const m=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const json=n=>JSON.parse(readFileSync(new URL('../src/'+n,import.meta.url)));
const catalog=json('recorded-voices.json'),data=json('handbook.json');
test('every A1–B2 lesson has a valid explanation with examples or a substantive table',()=>{
 let n=0;for(const level of ['a1','a2','b1','b2'])for(let unit=1;unit<=24;unit++)for(let i=0;i<3;i++){
  const s=m.lessonSupport(level,unit,i);assert(s,`${level}/${unit}/${i}`);assert(s.section.examples.length||s.section.table?.rows.length);assert(s.section.paragraphs.join(' ').length>100);n++;
 }assert.equal(n,288);assert.equal(m.lessonSupport('a1',99,0),null);
});
test('original handbook scenes, evidence and checks have complete and unique answer keys',()=>{
 assert.equal(new Set(m.topics.map(t=>t.id)).size,61);
 for(const t of m.topics){assert.equal(t.scene.length,4);assert.equal(t.questions.length,2);assert.equal(new Set(t.people).size,2);assert.equal(t.gist.options.filter(x=>x===t.gist.answer).length,1);assert(t.scene[t.gist.evidence]?.es);for(const l of t.scene){assert(l.en&&l.es);assert([0,1].includes(l.speaker));}for(const q of t.questions){assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(x=>x===q.answer).length,1);assert(m.answerFeedback(q,q.answer).correct);assert(!m.answerFeedback(q,q.options.find(x=>x!==q.answer)).correct);}for(const s of t.sections){assert(s.brief);for(const e of s.examples){assert(e.en&&e.es&&e.why.length>=10);}}}
 assert.equal(m.topics.reduce((n,t)=>n+t.sections.length,0),190);assert.equal(m.topics.reduce((n,t)=>n+t.sections.reduce((a,s)=>a+s.examples.length,0),0),376);
});
test('every speaker uses their fixed cast and every scene audio file is included',()=>{
 for(const t of m.topics)for(const l of t.scene){const role=t.people[l.speaker];assert(catalog.cast[role]);const name=catalog.entries[role+'\n'+l.en];assert(name,role+': '+l.en);const path=new URL('../public/assets/voices/'+name,import.meta.url);assert(existsSync(path));assert(statSync(path).size>1000);}
 assert.deepEqual(m.topicById.get('be').people,['Mia','Leo']);assert.deepEqual(m.topicById.get('social').people,['Leo','Mia']);
});
test('search finds accents, usage paragraphs and English examples without changing level filters',()=>{
 assert(m.searchTopics('posesion').some(t=>t.id==='possession'));assert(m.searchTopics('wish').some(t=>t.id==='wishes'));assert(m.searchTopics('I am cold').some(t=>t.id==='be'));assert(m.searchTopics('past perfect','b2').length);assert(m.searchTopics('','a1').every(t=>t.level==='a1'));assert.equal(m.searchTopics('zzzxxyynonexistent').length,0);
});
test('rich examples escape markup and only explicitly mark English spans',()=>{
 assert.equal(m.richText('Dice [[I am cold]] aquí.'),'Dice <span lang="en">I am cold</span> aquí.');assert(!m.richText('<img src=x onerror=alert(1)>').includes('<img'));assert(m.richText('[[<script>]]').includes('&lt;script&gt;'));assert.equal(m.escapeHTML('"<&'), '&quot;&lt;&amp;');
});
test('handbook turns and examples have authored contextual translations in the published dictionary',()=>{
 const raw=readFileSync(new URL('../public/assets/context-help.js',import.meta.url),'utf8'),contexts=JSON.parse(raw.slice('window.HELLO_CONTEXTS='.length).trim().replace(/;$/,''));
 const normal=x=>x.trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');
 for(const t of m.topics)for(const line of [...t.scene,...t.sections.flatMap(s=>s.examples),{en:t.gist.prompt}]){const entry=contexts[normal(line.en)];assert(entry?.es,line.en);assert.equal(entry.source,'authored');}
});
