import data from './handbook.json';
export const topics=data.topics, counts=data.counts, lessonMap=data.lessons, sources=data.sources;
export const topicById=new Map(topics.map(t=>[t.id,t]));
export const escapeHTML=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const richText=x=>escapeHTML(x).replace(/\[\[(.*?)\]\]/g,'<span lang="en">$1</span>');
const normal=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function searchTopics(query='',level='all'){
 const words=normal(query).trim().split(/\s+/).filter(Boolean);
 return topics.filter(t=>(level==='all'||t.level===level)&&words.every(w=>normal([t.id.replaceAll('-',' '),t.title,t.lead,...t.sections.flatMap(s=>[s.title,...s.paragraphs,...s.examples.flatMap(e=>[e.en,e.es,e.why])])].join(' ')).includes(w)));
}
export function lessonSupport(level,unit,index){
 const ref=lessonMap[level]?.[Number(unit)-1]?.[Number(index)];if(!ref)return null;
 const topic=topicById.get(ref.topic),section=topic?.sections[ref.section];
 return topic&&section?{topic,section,index:ref.section}:null;
}
export function shuffle(xs){const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function answerFeedback(question,answer){return {correct:answer===question.answer,answer:question.answer,why:question.why||''};}
