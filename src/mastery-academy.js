import curriculum from './mastery-curriculum.json';
import atlas from './mastery-atlas.json';

// Extensión autónoma C1/C2: no afirma certificar niveles ni utiliza IA.
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isId = value => /^(c1|c2)-(0[1-9]|1[0-2])$/.test(value || '');
const getLesson = id => isId(id) ? curriculum.find(l => l.id === id) : undefined;
let currentStore = null;
let quiz = null;
let quizUser = null;
const summary = (p,level) => {
 const data = curriculum.filter(x=>!level || x.level===level);
 return {total:data.length, attempted:data.filter(x=>p.mastery?.[x.id]?.attempts).length, passed:data.filter(x=>p.mastery?.[x.id]?.best>=70).length};
};
export const masteryLessons = curriculum;
export function gradeMastery(lesson,answers){
 if(!lesson || !Array.isArray(lesson.questions))return {right:0,total:0,score:0};
 const right=lesson.questions.reduce((sum,q,i)=>sum+(answers?.[i]===q.answer ? 1:0),0);
 return {right,total:lesson.questions.length,score:Math.round(100*right/lesson.questions.length)};
}
const sections = passage => String(passage).split(/\n\s*\n/).map(p=>`<p lang="en">${esc(p)}</p>`).join('');
const root = body => `<div id="mastery-root" class="mastery-root">${body}</div>`;
const intro = (eyebrow,title,desc) => `<div class="mastery-intro"><span class="mastery-kicker">${esc(eyebrow)}</span><h2>${esc(title)}</h2><p>${esc(desc)}</p></div>`;
const btn=(url,title,cls='mastery-btn')=>`<a href="${esc(url)}" class="${cls}">${esc(title)}</a>`;
const badge = l => `<span class="mastery-badge mastery-${l.toLowerCase()}">${l.toUpperCase()}</span>`;
function library(level){
 const p=currentStore.getState(), totals=summary(p),selected=level==='c1'||level==='c2'?level:null;
 const totalC1=summary(p,'c1'),totalC2=summary(p,'c2');
 const library=curriculum.filter(x=>!selected||x.level===selected);
 return root(`<nav aria-label="Ubicación actual" class="mastery-breadcrumb">${btn('#home','Mi ruta','mastery-text-link')} <span aria-hidden="true">/</span> Academia C1–C2</nav>
 ${intro('DESPUÉS DE B2 · INGLÉS AVANZADO','Domina los matices, no solo las reglas','Dos itinerarios superiores con lecturas originales, interpretación, gramática avanzada, vocabulario, pruebas, escritura, speaking y mediación. No son certificados oficiales.')}
 <div class="mastery-hero"><div><span>✦ MÁS ALLÁ DE B2</span><h3>De entender inglés a razonar y expresarte con precisión.</h3><p>La fluidez avanzada incluye crítica de fuentes, estructura de argumentos, connotaciones, registro y reformulación para distintos públicos.</p><div class="mastery-hero-actions">${btn('#mastery/c1','Explorar C1')}${btn('#mastery/c2','Explorar C2','mastery-btn secondary')}</div></div><div class="mastery-hero-visual" aria-hidden="true"><b>C1</b><span>→</span><b>C2</b></div></div>
 <div class="mastery-atlas-shortcut"><div><span class="mastery-kicker">ATLAS C1–C2</span><h3>64 conceptos para estudiar con precisión</h3><p>Gramática avanzada, discurso, retórica, léxico, investigación, escritura y comunicación intercultural explicados con ejemplos.</p></div>${btn('#mastery/atlas','Explorar el atlas')}</div>
 <div class="mastery-stats"><div><strong>${totals.total}</strong><span>módulos de profundización</span></div><div><strong>${totals.passed}</strong><span>exámenes con 70% o más</span></div><div><strong>${Object.keys(p.masteryDrafts||{}).length}</strong><span>módulos con borradores</span></div></div>
 <div class="mastery-tabs" aria-label="Filtrar nivel">${[['','Todos · 24'],['c1','C1 · Avanzado'],['c2','C2 · Dominio']].map(([l,t])=>btn('#mastery'+(l?'/'+l:''),t,'mastery-tab'+(l===selected||(!l&&!selected)?' selected':''))).join('')}</div>
 <div class="mastery-levels"><section><strong>C1 · Lenguaje flexible</strong><p>Analiza argumentos y evidencias, redacta con cohesión y desarrolla una postura matizada.</p><small>${totalC1.passed}/12 exámenes superados</small></section><section><strong>C2 · Precisión y síntesis</strong><p>Interpreta presuposiciones, negocia significados y comunica con sensibilidad al contexto.</p><small>${totalC2.passed}/12 exámenes superados</small></section></div>
 <div class="mastery-modules">${library.map((x,i)=>{const result=p.mastery?.[x.id];return `<a class="mastery-module" href="#mastery/${x.id}"><span class="mastery-module-number">${String(Number(x.id.slice(-2))).padStart(2,'0')}</span><span class="mastery-module-detail">${badge(x.level)}<span class="mastery-strand">${esc(x.strand)}</span><strong>${esc(x.title)}</strong><small>${esc(x.goal)}</small></span><span class="mastery-module-status">${result?.best>=70?'✓ Examen superado':result?.attempts?`Mejor nota: ${result.best}%`:'Empezar'} <span aria-hidden="true">→</span></span></a>`;}).join('')}</div>
 <section class="mastery-disclaimer"><h3>Cómo utilizar esta academia</h3><p>Terminar las actividades no demuestra automáticamente dominio de C1 o C2. Los textos y preguntas permiten practicar. La escritura y el habla requieren también evaluación humana y contacto con inglés auténtico de diferentes contextos.</p></section>`);
}
function atlasPage(level){
 const list=atlas.filter(x=>!['c1','c2'].includes(level)||x.level===level);
 return root(`<nav class="mastery-breadcrumb">${btn('#mastery','← Academia C1–C2','mastery-text-link')}<span>/</span> Atlas del inglés avanzado</nav>
 ${intro('64 CONCEPTOS · C1 Y C2','Atlas del inglés experto','Una referencia organizada para consultar gramática, léxico, retórica, investigación, escritura, pronunciación y mediación. Los ejemplos son originales.')}
 <div class="mastery-tabs">${[['','Todos'],['c1','Solo C1'],['c2','Solo C2']].map(([l,t])=>btn('#mastery/atlas'+(l?'/'+l:''),t,'mastery-tab'+((level||'')===l?' selected':''))).join('')}</div>
 <div class="mastery-atlas-filters"><label for="mastery-atlas-search">Buscar concepto <input id="mastery-atlas-search" placeholder="Ej. conditionals, causality, register..."></label><label for="mastery-atlas-category">Área <select id="mastery-atlas-category"><option value="all">Todas las áreas</option>${[...new Set(list.map(x=>x.category))].sort().map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('')}</select></label><p id="mastery-atlas-count" aria-live="polite">${list.length} conceptos</p></div>
 <div class="mastery-atlas-grid">${list.map(x=>`<details class="mastery-atlas-card" data-master-atlas-card data-category="${esc(x.category)}" data-search="${esc([x.title,x.category,x.explain,x.example].join(' ').toLowerCase())}"><summary><span>${badge(x.level)} <small>${esc(x.category)}</small></span><strong>${esc(x.title)}</strong></summary><div><p>${esc(x.explain)}</p><blockquote lang="en">${esc(x.example)}</blockquote><p><b>Atención:</b> ${esc(x.warning)}</p></div></details>`).join('')}</div><p class="mastery-atlas-footer">Los niveles C1 y C2 exigen poner estas herramientas en práctica. Consulta las lecturas y busca retroalimentación para tu producción escrita y oral.</p>`);
}
function lesson(lesson){
 const p=currentStore.getState(),draft=p.masteryDrafts?.[lesson.id]||{},result=p.mastery?.[lesson.id];
 return root(`<nav aria-label="Ubicación actual" class="mastery-breadcrumb">${btn('#mastery','Academia C1–C2','mastery-text-link')}<span aria-hidden="true">/</span>${badge(lesson.level)}<span aria-hidden="true">/</span><span>${esc(lesson.title)}</span></nav>
 ${intro(`${lesson.level.toUpperCase()} · ${lesson.strand}`,lesson.title,lesson.goal)}
 <div class="mastery-actions">${btn(`#mastery/${lesson.id}/exam`,result?'Volver a hacer el examen (5 preguntas)':'Realizar examen de 5 preguntas')}${btn('#mastery/'+lesson.level,'Ver módulos de '+lesson.level.toUpperCase(),'mastery-btn secondary')}${result?`<span class="mastery-last">Mejor nota registrada: <b>${result.best}%</b></span>`:''}</div>
 <div class="mastery-layout"><article class="mastery-article"><header><span class="mastery-kicker">READING · TEXTO ORIGINAL</span><button type="button" data-master="speak" data-text="passage" class="mastery-tool">🔊 Escuchar con la voz del navegador</button></header><div class="mastery-passage">${sections(lesson.passage)}</div><p class="mastery-hint">La reproducción utiliza la síntesis de voz disponible en tu dispositivo; no es una grabación de hablante nativo.</p></article>
 <aside class="mastery-aside"><section><h3>Palabras en contexto</h3><dl>${lesson.glossary.map(w=>`<div><dt lang="en">${esc(w.en)}</dt><dd>${esc(w.es)}</dd></div>`).join('')}</dl></section><section><h3>Lenguaje avanzado</h3><b>${esc(lesson.grammar.title)}</b><p>${esc(lesson.grammar.explain)}</p><blockquote lang="en">${esc(lesson.grammar.example)}</blockquote><details><summary>Ver dos errores frecuentes</summary><ol>${lesson.grammar.contrast.map(e=>`<li lang="en">${esc(e)}</li>`).join('')}</ol></details></section></aside></div>
 <div class="mastery-production"><div class="mastery-production-heading"><h3>Aplica lo aprendido</h3><p>Escribir, comunicar oralmente y reformular son tareas diferentes. Guarda tu proceso y solicita retroalimentación de un profesor si quieres evaluar la calidad de tus textos.</p></div>
 ${[['writing','Writing · Texto argumentativo',lesson.writing,2400],['speaking','Speaking · Guion para tu intervención',lesson.speaking,1100],['mediation','Mediation · Reformulación para otro público',lesson.mediation,1600]].map(([k,t,prompt,limit])=>`<section><h4>${esc(t)}</h4><p>${esc(prompt)}</p><label for="mastery-${k}">Tu borrador en inglés</label><textarea id="mastery-${k}" data-master-draft="${k}" maxlength="${limit}" rows="5" placeholder="Write your answer in English…" lang="en">${esc(draft[k]||'')}</textarea></section>`).join('')}
 <div class="mastery-selfcheck"><h4>Antes de guardar, comprueba lo siguiente</h4>${[['argument','Presenté una idea y la justifiqué con razones claras.'],['precision','Elegí expresiones apropiadas para el público y el propósito.'],['cohesion','Usé conectores sin alterar la lógica del texto.'],['limits','Reconocí un matiz, una limitación o un punto de vista alternativo.']].map(([k,t])=>`<label><input type="checkbox" data-master-check="${k}" ${(draft.checks||[]).includes(k)?'checked':''}>${esc(t)}</label>`).join('')}</div>
 <div class="mastery-savebar"><button type="button" data-master="save" class="mastery-btn">Guardar mis borradores</button><p id="mastery-save-status" role="status">${draft.updated?'Último guardado registrado.':'Todavía no has guardado tus borradores.'}</p></div></div>`);
}
function examView(l){
 if(!quiz||quiz.id!==l.id)quiz={id:l.id,index:0,answers:[],selected:null,revealed:false,done:false};
 if(quiz.done)return resultView(l);
 const q=l.questions[quiz.index],correct=quiz.revealed&&quiz.selected===q.answer;
 return root(`<nav class="mastery-breadcrumb">${btn('#mastery/'+l.id,'← Volver al artículo','mastery-text-link')}</nav>${intro(`EXAMEN ${l.level.toUpperCase()} · ${l.title}`,'Comprender, inferir y usar el inglés','Cinco preguntas originales con retroalimentación. Consulta el texto si necesitas comprobar la evidencia.')}
 <div class="mastery-exam"><div class="mastery-exam-head"><b>Pregunta ${quiz.index+1} de ${l.questions.length}</b><span>${esc(q.skill)}</span></div><div class="mastery-meter"><span style="width:${quiz.index/l.questions.length*100}%"></span></div>
 <div class="mastery-q-layout"><section class="mastery-question"><h3 lang="en">${esc(q.prompt)}</h3><div class="mastery-choices">${q.options.map((option,i)=>`<button type="button" data-master="choose" data-index="${i}" aria-pressed="${quiz.selected===i}" ${quiz.revealed?'disabled':''} class="${quiz.selected===i?'chosen ':''}${quiz.revealed&&i===q.answer?'correct ':''}${quiz.revealed&&quiz.selected===i&&i!==q.answer?'incorrect':''}"><span>${String.fromCharCode(65+i)}</span>${esc(option)}</button>`).join('')}</div>
 ${quiz.revealed?`<div class="mastery-explanation"><strong>${correct?'✓ Respuesta correcta':'↻ Revisa tu razonamiento'}</strong><p>${esc(q.why)}</p><p><b>Respuesta:</b> ${esc(q.options[q.answer])}</p></div>`:''}
 <div class="mastery-actions"><button data-master="${quiz.revealed?'next':'check'}" type="button" class="mastery-btn" ${!quiz.revealed&&quiz.selected===null?'disabled':''}>${quiz.revealed?quiz.index===l.questions.length-1?'Finalizar examen':'Siguiente →':'Comprobar respuesta'}</button></div></section>
 <aside class="mastery-article-mini"><details><summary>Consultar el artículo original</summary>${sections(l.passage)}</details></aside></div></div>`);
}
function resultView(l){
 const result=gradeMastery(l,quiz.answers),p=currentStore.getState(),saved=p.mastery?.[l.id];
 return root(`<nav class="mastery-breadcrumb">${btn('#mastery/'+l.id,'← Volver al módulo','mastery-text-link')}</nav>
 ${intro(`${l.level.toUpperCase()} · EVALUACIÓN FORMATIVA`,'Tu examen de comprensión','Este resultado mide estas cinco preguntas, no tu dominio completo del inglés ni un nivel oficial del MCER.')}
 <section class="mastery-results"><strong>${result.score}%</strong><h3>${result.right} de ${result.total} respuestas correctas</h3><p>Mejor nota guardada: ${saved?.best ?? result.score}% · Puedes revisar los errores y volver a practicar.</p><div class="mastery-actions">${btn('#mastery/'+l.id,'Volver al aprendizaje')}${btn('#mastery/'+l.level,'Elegir otra lectura','mastery-btn secondary')}<button type="button" data-master="restart" class="mastery-btn secondary">Repetir examen</button></div></section>
 <div class="mastery-review">${l.questions.map((q,i)=>`<article><span class="mastery-review-mark">${quiz.answers[i]===q.answer?'✓':'↻'}</span><div><b>${i+1}. ${esc(q.prompt)}</b><p>Tu respuesta: ${esc(q.options[quiz.answers[i]] || 'Sin respuesta')}</p><p>Respuesta correcta: <b>${esc(q.options[q.answer])}</b></p><small>${esc(q.why)}</small></div></article>`).join('')}</div>`);
}
export function renderMastery(store,id='',stage=''){
 // Nunca conservar el examen anterior cuando cambia la identidad autenticada.
 const activeUid=store.user?.uid ?? null;
 if(activeUid!==quizUser){quiz=null;quizUser=activeUid;}
 currentStore=store;
 if(store.courseId!=='b2')return root(intro('NIVEL AVANZADO','Abre tu academia desde B2','Para guardar C1 y C2 en un solo lugar, esta extensión utiliza el espacio de progreso B2 de tu cuenta.')+btn('?level=b2#mastery'+(id?'/'+id:''),'Continuar en la academia C1–C2'));
 if(!id || id==='c1' || id==='c2')return library(id);
 if(id==='atlas')return atlasPage(stage);
 const item=getLesson(id);
 if(!item)return root(intro('NO ENCONTRADO','Módulo no disponible','Vuelve a la biblioteca y selecciona una lectura.')+btn('#mastery','Abrir la biblioteca'));
 if(stage==='exam')return examView(item);
 return lesson(item);
}
function redraw(){if(!currentStore||typeof document==='undefined')return;const el=document.querySelector('#mastery-root');if(!el)return;const parts=location.hash.slice(1).split('/');const fresh=document.createElement('div');fresh.innerHTML=renderMastery(currentStore,parts[1],parts[2]);el.replaceWith(fresh.firstElementChild);}
function saveQuiz(l){
 const r=gradeMastery(l,quiz.answers),p=currentStore.getState(),old=p.mastery[l.id]||{best:0,attempts:0};
 p.mastery[l.id]={best:Math.max(old.best,r.score),last:r.score,attempts:Math.min(10000,old.attempts+1),updated:Date.now()};
 currentStore.save(p);
}
function saveDraft(){
 const root=document.querySelector('#mastery-root'),parts=location.hash.slice(1).split('/'),id=parts[1];if(!root||!getLesson(id))return;
 const p=currentStore.getState();const checks=[...root.querySelectorAll('[data-master-check]:checked')].map(node=>node.dataset.masterCheck);
 p.masteryDrafts[id]={writing:root.querySelector('#mastery-writing')?.value.slice(0,2400)||'',speaking:root.querySelector('#mastery-speaking')?.value.slice(0,1100)||'',mediation:root.querySelector('#mastery-mediation')?.value.slice(0,1600)||'',checks,updated:Date.now()};
 currentStore.save(p);
 const s=root.querySelector('#mastery-save-status');if(s)s.textContent='Borradores guardados en tu progreso. Se sincronizarán con tu cuenta cuando haya conexión.';
}
function readAloud(text){
 if(!('speechSynthesis' in window)){const s=document.getElementById('mastery-save-status');if(s)s.textContent='La voz del navegador no está disponible en este dispositivo.';return;}
 window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.slice(0,3500));u.lang='en-GB';u.rate=.89;window.speechSynthesis.speak(u);
}
if(typeof document!=='undefined'){
 document.addEventListener('input',e=>{if(e.target.id==='mastery-atlas-search')filterAtlas();});
 document.addEventListener('change',e=>{if(e.target.id==='mastery-atlas-category')filterAtlas();});
 document.addEventListener('click',e=>{
  const button=e.target.closest('[data-master]'),wrapper=e.target.closest('#mastery-root');if(!button||!wrapper||!currentStore?.user)return;
  const action=button.dataset.master,parts=location.hash.slice(1).split('/'),item=getLesson(parts[1]);
  if(action==='save'){saveDraft();return;}
  if(action==='speak'&&item){readAloud(item.passage);return;}
  if(!item||parts[2]!=='exam'||!quiz||quiz.id!==item.id)return;
  if(action==='choose'&&!quiz.revealed){const i=Number(button.dataset.index);if(i>=0&&i<item.questions[quiz.index].options.length){quiz.selected=i;redraw();}}
  if(action==='check'&&quiz.selected!==null&&!quiz.revealed){quiz.revealed=true;quiz.answers[quiz.index]=quiz.selected;redraw();}
  if(action==='next'&&quiz.revealed){if(quiz.index===item.questions.length-1){quiz.done=true;saveQuiz(item);}else{quiz.index++;quiz.selected=null;quiz.revealed=false;}redraw();}
  if(action==='restart'){quiz=null;redraw();}
 });
}

function filterAtlas(){
 const root=document.getElementById('mastery-root');if(!root)return;
 const text=(root.querySelector('#mastery-atlas-search')?.value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const category=root.querySelector('#mastery-atlas-category')?.value||'all';let count=0;
 root.querySelectorAll('[data-master-atlas-card]').forEach(el=>{const matches=(category==='all'||el.dataset.category===category)&&el.dataset.search.normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(text);el.hidden=!matches;if(matches)count++;});
 const output=root.querySelector('#mastery-atlas-count');if(output)output.textContent=count+' conceptos encontrados';
}
