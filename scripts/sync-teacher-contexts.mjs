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
fs.writeFileSync(contextPath,'window.HELLO_CONTEXTS='+JSON.stringify(contexts)+';\n');
