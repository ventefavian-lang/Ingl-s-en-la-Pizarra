import fs from 'node:fs';
import {normaliseText} from '../src/word-context.js';
const contextPath=new URL('../public/assets/context-help.js',import.meta.url);
const source=fs.readFileSync(contextPath,'utf8');
if(!source.startsWith('window.HELLO_CONTEXTS='))throw new Error('Formato de contexto inesperado.');
const contexts=JSON.parse(source.slice('window.HELLO_CONTEXTS='.length).trim().replace(/;$/,''));
const notes=JSON.parse(fs.readFileSync(new URL('../src/teacher-notes.json',import.meta.url)));
for(const units of Object.values(notes))for(const lessons of units)for(const note of lessons){
 const key=normaliseText(note.en);
 contexts[key]={...contexts[key],en:note.en,es:note.es,source:'authored'};
}
const handbook=JSON.parse(fs.readFileSync(new URL('../src/handbook.json',import.meta.url)));
for(const topic of handbook.topics){
 for(const line of topic.scene){const key=normaliseText(line.en);contexts[key]={...contexts[key],en:line.en,es:line.es,source:'authored'};}
 for(const section of topic.sections)for(const example of section.examples){const key=normaliseText(example.en);contexts[key]={...contexts[key],en:example.en,es:example.es,use:example.why,source:'authored'};}
 const g=topic.gist,key=normaliseText(g.prompt);contexts[key]={...contexts[key],en:g.prompt,es:g.es,source:'authored'};
}
fs.writeFileSync(contextPath,'window.HELLO_CONTEXTS='+JSON.stringify(contexts)+';\n');
