// Optional authoring tool. The published website only plays the included MP3 files.
import {readFile,mkdir,stat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
let KokoroTTS,StyleTextToSpeech2Model,AutoTokenizer,env;
try{
 ({KokoroTTS}=await import('kokoro-js'));
 ({StyleTextToSpeech2Model,AutoTokenizer,env}=await import('@huggingface/transformers'));
}catch{console.error('Solo para regenerar audio: instala kokoro-js@1.2.1 y FFmpeg. Lee VOCES.md.');process.exit(1);}
if(spawnSync('ffmpeg',['-version'],{stdio:'ignore'}).status!==0){console.error('Instala FFmpeg antes de regenerar los audios.');process.exit(1);}
env.cacheDir=fileURLToPath(new URL('.audio-cache/',root));
const id='onnx-community/Kokoro-82M-v1.0-ONNX';
const model=await StyleTextToSpeech2Model.from_pretrained(id,{dtype:'q8',device:'cpu',session_options:{intraOpNumThreads:2,interOpNumThreads:1}});
const tts=new KokoroTTS(model,await AutoTokenizer.from_pretrained(id));
const plan=JSON.parse(await readFile(new URL('scripts/audio-plan.json',root),'utf8'));
await mkdir(new URL('public/assets/voices/',root),{recursive:true});
let count=0;
for(const clip of plan){
 const path=fileURLToPath(new URL('public/assets/voices/'+clip.file,root));
 try{if((await stat(path)).size>1000)continue;}catch{}
 const audio=await tts.generate(clip.text,{voice:clip.voice,speed:1});
 const samples=audio.audio;
 if(samples.length<8400||!samples.every(Number.isFinite))throw Error('Audio no válido: '+clip.file);
 const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','f32le','-ar','24000','-ac','1','-i','pipe:0','-af','loudnorm=I=-18:TP=-2:LRA=9','-ar','24000','-ac','1','-c:a','libmp3lame','-b:a','64k',path],{input:Buffer.from(samples.buffer,samples.byteOffset,samples.byteLength),maxBuffer:10*1024*1024});
 if(result.status!==0||(await stat(path)).size<=1000)throw Error('No se pudo guardar '+clip.file+': '+result.stderr.toString());
 console.log(++count,clip.role,clip.file);
}
await model.dispose();
console.log('Audios preparados. Ejecuta npm test y npm run build.');
