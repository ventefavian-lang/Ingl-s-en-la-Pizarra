// Hello English V16: explicación por oración, sin traducción automática inventada.
import annotations from './reading-annotations.json';
export const splitSentences = paragraph => String(paragraph||'').match(/[^.!?]+(?:[.!?]+|$)/g)?.map(x=>x.trim()).filter(Boolean) || [];
export const readingAnnotation = (id,index) => annotations[id]?.[String(index)] || null;
export function analyseSentence(sentence){
 const s=String(sentence||'').trim(), rules=[];
 const hit=(regex,label,why)=>{if(regex.test(s))rules.push({label,why});};
 hit(/\b(?:will|shall)\s+have\s+been\s+\w+ing\b/i,'Future perfect continuous','Will have been + verbo en -ing: una acción en desarrollo considerada desde un punto futuro.');
 hit(/\b(?:will|shall)\s+have\s+\w+(?:ed|en)\b/i,'Future perfect','Will have + participio: una acción completada antes de cierto momento futuro.');
 hit(/\b(?:has|have)\s+been\s+\w+ing\b/i,'Present perfect continuous','Have/has been + -ing: conecta un proceso iniciado antes con el presente.');
 hit(/\b(?:had)\s+been\s+\w+ing\b/i,'Past perfect continuous','Had been + -ing: proceso anterior a otro momento pasado.');
 hit(/\b(?:has|have)\s+(?:\w+ed|been|gone|seen|grown|made|known|written|taken|become|built|found|said)\b/i,'Present perfect','Have/has + participio: relaciona una experiencia o resultado previo con el presente.');
 hit(/\bhad\s+(?:\w+ed|been|gone|seen|grown|made|known|written|taken|become|built|found|said)\b/i,'Past perfect','Had + participio: un hecho previo a otro momento del pasado.');
 hit(/\b(?:am|is|are)\s+\w+ing\b/i,'Present continuous','Be en presente + -ing: acción en curso o situación temporal.');
 hit(/\b(?:was|were)\s+\w+ing\b/i,'Past continuous','Was/were + -ing: acción que estaba desarrollándose en el pasado.');
 hit(/\b(?:will|shall)\s+(?:not\s+)?\w+\b/i,'Future with will','Will + verbo base: predicción, decisión, promesa u otra referencia al futuro.');
 hit(/\b(?:could|would|might|should|must|may|can)\s+\w+/i,'Modal verb','El auxiliar modal modifica el significado: capacidad, probabilidad, consejo u obligación. No es necesariamente un tiempo verbal.');
 hit(/\b(?:did|didn't)\s+\w+\b/i,'Past simple — auxiliar','Did + verbo base indica preguntas o negativas en pasado simple.');
 hit(/\b(?:was|were)\b|\b(?:\w+ed|went|saw|took|said|made|found|gave|had|grew|became)\b/i,'Posible past simple','Una forma pasada puede describir un hecho terminado. Hay que comprobar su función en toda la oración.');
 if(!rules.length)rules.push({label:'Posible present simple / estructura general',why:'Puede describir hábitos, hechos o afirmaciones generales. La interpretación depende del verbo principal, los auxiliares y el contexto.'});
 return rules.slice(0,3);
}
export function glossaryContext(sentence,glossary=[]){
 const words=glossary.filter(x=>new RegExp('\\b'+x.word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i').test(sentence));
 return words.map(x=>({en:x.word,es:x.es}));
}
