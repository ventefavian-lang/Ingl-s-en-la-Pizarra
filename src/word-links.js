// Los textos ingleses del curso permiten practicar cada palabra sin alterar respuestas.
let pending=null;
const observer=new MutationObserver(()=>{
 if(location.hash.startsWith('#print'))return;
 document.querySelectorAll('#app [lang="en"]:not([data-word-links])').forEach(el=>{
  el.dataset.wordLinks='1';if(el.closest('#mouth-coach,.story-line,button,input,textarea,select'))return;
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode()){const node=walker.currentNode;if(!node.parentElement.closest('button,a,textarea,script'))nodes.push(node);}
  for(const node of nodes){const pieces=node.textContent.split(/([A-Za-z]+(?:['’][A-Za-z]+)?)/);if(pieces.length<2)continue;const frag=document.createDocumentFragment();pieces.forEach((p,i)=>{if(i%2){const b=document.createElement('button');b.className='word-link';b.dataset.practiceWord=p;b.textContent=p;b.title='Escuchar y ver articulación';frag.append(b);}else frag.append(document.createTextNode(p));});node.replaceWith(frag);}
 });
 if(pending&&document.getElementById('coach-text')){const word=pending;pending=null;document.getElementById('coach-text').value=word;document.querySelector('[data-lab="analyse"]')?.click();document.getElementById('mouth-coach').scrollIntoView({block:'start'});}
});
observer.observe(document.getElementById('app'),{childList:true,subtree:true});
document.addEventListener('click',e=>{const b=e.target.closest('[data-practice-word]');if(!b)return;pending=b.dataset.practiceWord;location.hash='lab';});
