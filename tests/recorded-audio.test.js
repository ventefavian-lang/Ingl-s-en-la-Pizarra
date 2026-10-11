import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {build} from 'esbuild';
const root=new URL('../',import.meta.url);
const catalog=JSON.parse(readFileSync(new URL('src/recorded-voices.json',root)));
const stories=JSON.parse(readFileSync(new URL('src/conversations.json',root)));

test('every dialogue, example and branch has a recording with its fixed speaker',()=>{
 assert.equal(new Set(['Leo','Mia','Nora','Sam'].map(role=>catalog.cast[role])).size,4);
 const check=(text,role)=>assert(catalog.entries[role+'\n'+text.trim()],role+': '+text);
 for(const list of Object.values(stories))for(const story of list)for(const e of story.episodes){
  e.lines.forEach(l=>check(l.en,story.people[l.speaker]));
  e.chunks.forEach(c=>check(c.example,'Narrador'));
  e.branches.forEach(b=>check(b.reply,story.people[0]));
 }
 for(const name of ['course','course-a2','course-b1','course-b2']){
  const course=JSON.parse(readFileSync(new URL(`src/${name}.json`,root)));
  for(const u of course.units)u.dialogue.forEach(([,text],i)=>check(text,i%2?'Mia':'Leo'));
 }
 for(const file of new Set(Object.values(catalog.entries))){
  assert.match(file,/^[a-f0-9]{20}\.mp3$/);
  const path=new URL('public/assets/voices/'+file,root);assert(existsSync(path),file);assert(statSync(path).size>1000,file);
 }
});

const win=new EventTarget();let synthesisCalls=0;
win.speechSynthesis={cancel(){},getVoices(){return[];},addEventListener(){},speak(){synthesisCalls++;}};
globalThis.window=win;globalThis.document={baseURI:'https://example.test/english/'};
const instances=[];
class FakeAudio{
 constructor(){instances.push(this);this.paused=true;}
 play(){this.paused=false;this.onplaying?.();return Promise.resolve();}
 pause(){this.paused=true;}
}
globalThis.Audio=FakeAudio;
const built=await build({entryPoints:[new URL('src/recorded-audio.js',root).pathname],bundle:true,write:false,format:'esm',platform:'node'});
const api=await import('data:text/javascript;base64,'+Buffer.from(built.outputFiles[0].text).toString('base64'));
const first=stories.a1[0].episodes[0].lines;
test('recordings play without browser voices; slow playback preserves pitch and the same element is reused',async()=>{
 let started=0;
 const p=api.playLessonAudio(first[0].en,{role:'Leo',recordedOnly:true,onstart:()=>started++});
 const audio=instances[0];assert.equal(started,1);assert.match(audio.src,/https:\/\/example.test\/english\/assets\/voices\/.*\.mp3$/);
 api.setLessonAudioRate(.65);assert.equal(audio.playbackRate,.65);assert.equal(audio.preservesPitch,true);
 audio.onended();assert.equal(await p,true);
 const q=api.playLessonAudio(first[1].en,{role:'Mia',recordedOnly:true});
 assert.equal(instances.length,1);assert.equal(audio.playbackRate,1);audio.onended();assert.equal(await q,true);assert.equal(synthesisCalls,0);
});
test('stop and rapid replay settle the old promise, so a cancelled dialogue cannot continue',async()=>{
 const a=api.playLessonAudio(first[0].en,{role:'Leo',recordedOnly:true});
 const b=api.playLessonAudio(first[1].en,{role:'Mia',recordedOnly:true});
 assert.equal(await a,false);api.stopLessonAudio();assert.equal(await b,false);assert.equal(instances[0].paused,true);
});
test('an unavailable recording reports failure without awarding a listen or silently changing the voice',async()=>{
 let message='';const p=api.playLessonAudio(first[0].en,{role:'Leo',recordedOnly:true,onerror:m=>message=m});
 instances[0].onerror();assert.equal(await p,false);assert.match(message,/audio/);assert.equal(synthesisCalls,0);
 assert.equal(await api.playLessonAudio('unbundled phrase',{role:'Leo',recordedOnly:true}),false);
});
test('page navigation cancels active audio',async()=>{
 const p=api.playLessonAudio(first[0].en,{role:'Leo',recordedOnly:true});
 win.dispatchEvent(new Event('hashchange'));assert.equal(await p,false);assert.equal(instances[0].paused,true);
});
