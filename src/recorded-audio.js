import catalog from './recorded-voices.json';
import {configureVoice,waitForVoices} from './voice-cast.js';

export const fixedCast=Object.freeze({...catalog.cast});
const byText=new Map();
for(const [key,file] of Object.entries(catalog.entries)){
 const split=key.indexOf('\n'),text=key.slice(split+1);
 if(!byText.has(text))byText.set(text,file);
}
export function recordedClip(text,role='Narrador'){
 const clean=String(text||'').trim();
 return catalog.entries[role+'\n'+clean]||(role==='Narrador'?byText.get(clean):null)||null;
}
const safeRate=rate=>Math.max(.5,Math.min(1.25,Number(rate)||1));
let player=null,pending=null,generation=0;
export function setLessonAudioRate(rate){
 if(player){player.playbackRate=safeRate(rate);player.preservesPitch=true;}
}
export function stopLessonAudio(){
 generation++;
 if(player){player.onplaying=null;player.onended=null;player.onerror=null;player.pause();}
 if(typeof window!=='undefined')window.speechSynthesis?.cancel();
 const finish=pending;pending=null;finish?.(false);
}
/** One reusable audio element keeps dialogue playback unlocked on mobile. */
export function playLessonAudio(text,{role='Narrador',rate=1,accent='en-US',recordedOnly=false,onstart,onerror,onfinish}={}){
 stopLessonAudio();
 const token=generation;
 return new Promise(resolve=>{
  let settled=false;
  const finish=(ok,error)=>{
   if(settled)return;settled=true;
   if(token===generation){pending=null;if(player){player.onplaying=null;player.onended=null;player.onerror=null;}}
   if(error)onerror?.(error);
   onfinish?.(ok);resolve(ok);
  };
  pending=finish;
  const file=recordedClip(text,role);
  if(file){
   try{
    player??=new Audio();player.preload='auto';
    player.src=new URL('assets/voices/'+file,document.baseURI).href;
    setLessonAudioRate(rate);
    player.onplaying=()=>{if(token===generation)onstart?.();};
    player.onended=()=>finish(true);
    player.onerror=()=>finish(false,'No se pudo cargar el audio. Comprueba la conexión y pulsa Escuchar para reintentarlo.');
    const started=player.play();
    started?.catch(()=>{if(token===generation)finish(false,'No se pudo iniciar el audio. Pulsa Escuchar para volver a intentarlo.');});
   }catch{finish(false,'Este navegador no pudo reproducir el audio. Intenta abrir la página de nuevo.');}
   return;
  }
  if(recordedOnly){finish(false,'Falta el audio de esta frase. Comprueba que se haya publicado la carpeta assets/voices completa.');return;}
  // Open-ended words and texts outside the recorded dialogues use an automatic voice.
  void waitForVoices().then(voices=>{
   if(token!==generation){finish(false);return;}
   if(!voices.length){finish(false,'No hay lectura disponible para este texto en el navegador. Las conversaciones tienen sus propios audios.');return;}
   try{
    const utterance=new SpeechSynthesisUtterance(text);
    configureVoice(utterance,role,accent);utterance.rate=safeRate(rate);
    utterance.onstart=()=>{if(token===generation)onstart?.();};
    utterance.onend=()=>finish(true);
    utterance.onerror=e=>finish(false,['canceled','interrupted'].includes(e.error)?null:'No se pudo leer este texto. Inténtalo otra vez.');
    window.speechSynthesis.speak(utterance);
   }catch{finish(false,'No se pudo leer este texto en voz alta.');}
  });
 });
}
if(typeof window!=='undefined'){
 window.addEventListener('pagehide',stopLessonAudio);
 window.addEventListener('hashchange',stopLessonAudio);
}
