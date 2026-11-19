import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
export const cast={Leo:'M1',Mia:'F1',Nora:'F2',Sam:'M2',Ella:'F3',Oliver:'M3',Zoe:'F4',Max:'M4',Ava:'F5',Noah:'M5',Narrador:'F5'};
const clips=new Map();
function add(text,role){
 const key=role+'\n'+text.trim();if(clips.has(key))return;
 const file=createHash('sha256').update('supertonic3-v7|'+cast[role]+'\n'+text.trim()).digest('hex').slice(0,20)+'.mp3';
 clips.set(key,{text:text.trim(),role,voice:cast[role],file});
}
const stories=JSON.parse(await readFile(new URL('src/conversations.json',root),'utf8'));
for(const level of Object.values(stories))for(const story of level)for(const episode of story.episodes){
 for(const line of episode.lines)add(line.en,story.people[line.speaker]);
 for(const chunk of episode.chunks)add(chunk.example,'Narrador');
 for(const branch of episode.branches)add(branch.reply,story.people[0]);
}
for(const name of ['course','course-a2','course-b1','course-b2']){
 const course=JSON.parse(await readFile(new URL(`src/${name}.json`,root),'utf8'));
 for(const unit of course.units)unit.dialogue.forEach(([,text],i)=>add(text,unit.voices[i%2]));
}
const shorts=JSON.parse(await readFile(new URL('src/stories.json',root),'utf8'));
shorts.forEach((s,i)=>s.lines.forEach(l=>add(l.en,Object.keys(cast)[i%10])));
try{const exams=JSON.parse(await readFile(new URL('src/assessments.json',root),'utf8'));for(const e of exams)add(e.listening.text,e.listening.role);}catch{}
const entries=Object.fromEntries([...clips].map(([key,c])=>[key,c.file]));
await mkdir(new URL('public/assets/voices/',root),{recursive:true});
await writeFile(new URL('src/recorded-voices.json',root),JSON.stringify({version:7,model:'Supertonic 3',cast,entries},null,2)+'\n');
await writeFile(new URL('scripts/audio-plan.json',root),JSON.stringify([...clips.values()],null,2)+'\n');
console.log('Audio plan:',clips.size,'clips');
