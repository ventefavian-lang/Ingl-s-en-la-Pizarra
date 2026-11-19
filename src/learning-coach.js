// Ruta pedagógica sencilla apoyada en las unidades reales del proyecto.
import {routeState} from './journey-model.js';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const levels={a1:'Primero comprende la expresión, luego úsala en una frase corta.',a2:'Compara dos formas, explica cuándo elegirlas y escribe una situación propia.',b1:'Conecta ideas con razones y ejemplos, sin limitarte a traducir palabra por palabra.',b2:'Observa el matiz, defiende una interpretación y vuelve a expresarla de otra manera.'};
let context=null;
export function renderLearningCoach(store,course,requested){
 const level=store.courseId,next=routeState(course,level,store.getState()).next;
 const unit=course.units.find(u=>u.id===Number(requested))||course.units.find(u=>u.id===next.unit)||course.units[0];
 context={store,course,unit};
 const rule=unit.rules?.[0],example=rule?.examples?.find(v=>typeof v==='string')||unit.model?.split(/[.!?]/)[0]?.trim()||unit.vocab?.[0]?.en||'';
 const challenge=unit.questions?.find(q=>q.options?.length>=2&&q.answer)||null;
 return `<section class="v12-coach-intro"><div><p class="h-overline">TU GUÍA DE ESTUDIO · ${level.toUpperCase()}</p><h2>Entiende. Practica. Hazlo tuyo.</h2><p>Una guía breve para estudiar cada tema con propósito. No necesitas memorizar todo de golpe.</p></div><span aria-hidden="true">✦</span></section>
 <div class="v12-coach-tools"><label for="v12-coach-unit">Tema que quieres reforzar</label><select id="v12-coach-unit">${course.units.map(u=>`<option value="${u.id}" ${u.id===unit.id?'selected':''}>${String(u.id).padStart(2,'0')} · ${esc(u.title)}</option>`).join('')}</select></div>
 <section class="v12-coach-steps"><article><span class="v12-step-no">01</span><p class="h-overline">COMPRENDE</p><h3>${esc(rule?.title||unit.title)}</h3><p>${esc(rule?.text||unit.goal)}</p>${example?`<blockquote lang="en">${esc(example)}${/[.!?]$/.test(example)?'':'.'}</blockquote>`:''}<a href="#understand/${unit.id}" class="v12-step-link">Explorar la explicación →</a></article><article><span class="v12-step-no">02</span><p class="h-overline">PONLO EN CONTEXTO</p><h3>${esc(unit.goal)}</h3><p>${esc(levels[level]||levels.a1)}</p><div class="v12-vocab-chip-list">${(unit.vocab||[]).slice(0,4).map(v=>`<span><b lang="en">${esc(v.en)}</b><small>${esc(v.es)}</small></span>`).join('')}</div><a href="#resources/words/${unit.id}" class="v12-step-link">Explorar palabras del tema →</a></article><article><span class="v12-step-no">03</span><p class="h-overline">RECUPERA Y USA</p><h3>Comprueba lo que entendiste</h3>${challenge?`<p class="v12-coach-question">${esc(challenge.prompt)}</p><div class="v12-coach-answers">${challenge.options.map((o,i)=>`<button type="button" data-v12-coach-choice="${i}" aria-pressed="false">${esc(o)}</button>`).join('')}</div><p class="v12-coach-feedback" id="v12-coach-feedback" aria-live="polite">Elige una respuesta y descubre por qué.</p>`:`<p>Escribe dos ejemplos tuyos usando las expresiones de arriba y compáralos con la explicación.</p>`}<a href="#study/${unit.id}" class="v12-step-link">Ir a un taller de este tema →</a></article></section>
 <section class="v12-coach-outro"><h3>Una rutina corta que sí ayuda</h3><p>Escucha una frase → intenta decirla sin mirar → explica qué significa → úsala en una situación nueva → repásala en otro momento.</p><div><a href="#mission/${unit.id}/0">Practicar una misión</a><a href="#memory">Repasar lo aprendido</a></div></section>`;
}
document.addEventListener('change',ev=>{if(ev.target?.id==='v12-coach-unit')location.hash='coach/'+ev.target.value;});
document.addEventListener('click',ev=>{
 const b=ev.target.closest('[data-v12-coach-choice]');if(!b||!context)return;
 const {unit}=context,q=unit.questions?.find(q=>q.options?.length>=2&&q.answer);if(!q)return;
 const choice=q.options[Number(b.dataset.v12CoachChoice)],ok=choice===q.answer;
 document.querySelectorAll('[data-v12-coach-choice]').forEach(node=>{node.setAttribute('aria-pressed',String(node===b));node.classList.toggle('correct',node.textContent===q.answer);node.classList.toggle('incorrect',node===b&&!ok);});
 const feedback=document.getElementById('v12-coach-feedback');if(feedback)feedback.textContent=(ok?'¡Muy bien! ':'Buen intento. ')+(q.why||`La respuesta correcta es: ${q.answer}.`);
});
