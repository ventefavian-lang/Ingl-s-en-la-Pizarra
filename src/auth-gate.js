// Pantalla pública de bienvenida. Los cursos permanecen ocultos hasta que Firebase
// confirme una sesión. La autorización de datos se valida además en Firestore.
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const signIcon = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>`;
const googleIcon = `<svg width="21" height="21" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.28-3.13.77-4.59l-7.98-6.19A23.92 23.92 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;

export function initAuthGate(store) {
 const root = document.getElementById('auth-gate') || document.createElement('div');
 root.id = 'auth-gate';
 root.classList.remove('v12-gate-startup');
 root.removeAttribute('role');
 root.setAttribute('aria-live', 'polite');
 if(!root.isConnected)document.body.insertBefore(root, document.querySelector('#app'));
 const app = document.querySelector('#app');
 let view = 'welcome', snapshot = store.snapshot(), notice = '', noticeKind='error', pending = false;
 const configured = () => snapshot.configured;
 const blocked = () => !configured() || pending || ['connecting','signing-in'].includes(snapshot.status);
 const buttonAttrs = () => blocked() ? 'disabled aria-disabled="true"' : '';
 const status = () => !configured()
  ? '<div class="v12-auth-info" role="status">El acceso todavía no está configurado. Para habilitar registros, el administrador debe activar Firebase y añadir la configuración pública del proyecto.</div>'
  : snapshot.status === 'connecting' ? '<div class="v12-auth-info" role="status">Comprobando si ya tienes una cuenta abierta…</div>'
  : notice || snapshot.status === 'error' ? `<div class="v12-auth-info ${noticeKind==='success'?'success':'error'}" role="${noticeKind==='success'?'status':'alert'}">${esc(notice || snapshot.message || 'No se pudo completar el acceso.')}</div>` : '';
 const field = (id,label,type,placeholder,opts='') => `<label for="v12-${id}">${label}</label><input id="v12-${id}" name="${id}" type="${type}" placeholder="${placeholder}" autocomplete="${opts}" ${type==='password'?'minlength="6"':''} required>`;
 const registerFields = `${field('name','¿Cómo te llamas?','text','Tu nombre','given-name')}${field('email','Correo electrónico','email','nombre@correo.com','email')}${field('password','Crea una contraseña','password','Mínimo 6 caracteres','new-password')}${field('confirm','Repite tu contraseña','password','Confirma tu contraseña','new-password')}`;
 const loginFields = `${field('email','Correo electrónico','email','nombre@correo.com','email')}${field('password','Contraseña','password','Tu contraseña','current-password')}`;
 const title = view==='register'?'Crea tu cuenta gratis':view==='login'?'Bienvenido de nuevo':view==='reset'?'Recuperar contraseña':'Tu aventura comienza aquí';
 const subtitle = view==='register'?'Guarda tu recorrido y continúa desde cualquier dispositivo.':view==='login'?'Inicia sesión para retomar tus lecciones.':view==='reset'?'Te enviaremos un enlace para recuperar el acceso.':'Elige cómo quieres empezar a aprender.';
 function form(){
  if(view==='reset')return `<form class="v12-auth-form" data-v12-form="reset">${field('email','Tu correo electrónico','email','nombre@correo.com','email')}<button class="v12-btn v12-btn-primary" ${buttonAttrs()} type="submit">Enviar enlace de recuperación</button></form><button type="button" class="v12-auth-text-btn" data-v12-mode="login">← Volver a iniciar sesión</button>`;
  if(view==='welcome')return `<div class="v12-auth-actions"><button class="v12-btn v12-btn-primary" data-v12-mode="register">Crear cuenta gratis <span aria-hidden="true">→</span></button><button class="v12-btn v12-btn-outline" data-v12-mode="login">Ya tengo una cuenta</button></div><p class="v12-auth-promise">Tu progreso se guarda con tu cuenta. Empieza desde A1 o cambia de nivel después.</p>`;
  return `<form class="v12-auth-form" data-v12-form="${view}">${view==='register'?registerFields:loginFields}<button class="v12-btn v12-btn-primary" ${buttonAttrs()} type="submit">${view==='register'?'Crear mi cuenta':'Entrar a mi curso'} <span aria-hidden="true">→</span></button></form><div class="v12-auth-separator"><span>o continúa con</span></div><button type="button" class="v12-btn v12-btn-google" data-v12-google ${buttonAttrs()}>${googleIcon} Google</button><div class="v12-auth-switch">${view==='register'?'¿Ya tienes una cuenta? <button type="button" data-v12-mode="login">Inicia sesión</button>':'¿Todavía no tienes cuenta? <button type="button" data-v12-mode="register">Regístrate</button>'}</div>${view==='login'?'<button type="button" class="v12-auth-text-btn" data-v12-mode="reset">¿Olvidaste tu contraseña?</button>':''}`;
 }
 function paint(){
  const signedIn = !!snapshot.user;
  root.hidden = signedIn;
  document.body.classList.toggle('auth-locked',!signedIn);
  app.inert = !signedIn;
  const skip=document.querySelector('.skip');if(skip)skip.href=signedIn?'#main':'#v12-landing';
  if(signedIn){root.innerHTML='';return;}
  root.innerHTML = `<div class="v12-public"><header class="v12-public-header"><a class="v12-logo" href="#" data-v12-mode="welcome" aria-label="Hello English, inicio"><span class="v12-logo-mark">h!</span><span>hello<span class="v12-brand-dot">.</span><small>ENGLISH</small></span></a><nav aria-label="Acceso a tu cuenta"><button data-v12-mode="login" type="button">Iniciar sesión</button><button class="v12-header-cta" data-v12-mode="register" type="button">Crear cuenta</button></nav></header><main class="v12-public-main" id="v12-landing"><div class="v12-hero-grid"><section class="v12-marketing" aria-labelledby="v12-main-title"><span class="v12-eyebrow">TU INGLÉS EMPIEZA AQUÍ ✦</span><h1 id="v12-main-title">Un idioma nuevo.<br><em>Un mundo de posibilidades.</em></h1><p>Aprende inglés a tu ritmo, con historias, misiones, pronunciación y explicaciones que de verdad puedes entender.</p><div class="v12-feature-pills"><span>${signIcon} Lecciones A1 a B2</span><span>${signIcon} Aprende paso a paso</span><span>${signIcon} Repasa sin presión</span></div><div class="v12-public-illustration"><div class="v12-illustration-copy"><span>HELLO, WORLD!</span><b>Tu próxima historia<br>empieza contigo.</b></div><img src="assets/journey/world.png" alt="Ilustración de un pueblo con lugares para practicar situaciones cotidianas en inglés" loading="eager"></div></section><section class="v12-auth-card" aria-labelledby="v12-card-title"><span class="v12-card-star">✦</span><h2 id="v12-card-title">${title}</h2><p class="v12-card-sub">${subtitle}</p>${status()}${form()}<p class="v12-auth-footnote">Acceso personal para que tus avances no se mezclen con los de otros estudiantes.</p></section></div><section class="v12-metrics" aria-label="Conoce Hello English"><div><strong>4</strong><span>niveles A1–B2</span></div><div><strong>96</strong><span>unidades de estudio</span></div><div><strong>288</strong><span>misiones para practicar</span></div></section><section class="v12-benefits"><div class="v12-benefit-heading"><span class="v12-eyebrow">APRENDE COMO DE VERDAD SE APRENDE</span><h2>Menos memorizar por memorizar.<br>Más usar el inglés.</h2></div><div class="v12-benefit-grid"><article><span class="v12-benefit-icon">💬</span><h3>Historias y conversaciones</h3><p>Lee, escucha y responde en situaciones cercanas a la vida real.</p></article><article><span class="v12-benefit-icon">🎧</span><h3>Escucha y pronunciación</h3><p>Repite audios, practica sonidos y gana confianza al hablar.</p></article><article><span class="v12-benefit-icon">🧠</span><h3>Repaso que tiene sentido</h3><p>Vuelve a las palabras importantes cuando necesitas recordarlas.</p></article></div></section></main><footer class="v12-public-footer">Hello English · Aprende inglés todos los días <span>Tu cuenta, tu recorrido.</span></footer></div>`;
 }
 store.subscribe(s => { snapshot=s; if(s.user)notice=''; else if(s.status==='error'&&s.message)notice=s.message; paint(); });
 root.addEventListener('click',async ev=>{
  const mode = ev.target.closest('[data-v12-mode]');
  if(mode){ev.preventDefault();view=mode.dataset.v12Mode;notice='';noticeKind='error';paint();if(view!=='welcome')root.querySelector('input')?.focus();return;}
  const google = ev.target.closest('[data-v12-google]');
  if(google&&!pending){pending=true;notice='';paint();await store.login();pending=false;paint();}
 });
 root.addEventListener('submit',async ev=>{
  const f=ev.target.closest('[data-v12-form]');if(!f)return;ev.preventDefault();
  if(pending||!configured())return;
  const data=new FormData(f),mode=f.dataset.v12Form;
  const email=String(data.get('email')||'').trim(),password=String(data.get('password')||'');
  if(mode==='register'&&password!==data.get('confirm')){noticeKind='error';notice='Las contraseñas no coinciden. Revísalas e inténtalo de nuevo.';paint();return;}
  pending=true;notice='';paint();
  let ok=false;
  if(mode==='register')ok=await store.signUp(email,password,String(data.get('name')||'').trim());
  if(mode==='login')ok=await store.signInWithPassword(email,password);
  if(mode==='reset')ok=await store.resetPassword(email);
  pending=false;
  if(ok&&mode==='reset'){view='login';noticeKind='success';notice='Te enviamos un correo de recuperación si la dirección está registrada. Revisa tu bandeja de entrada.';}
  paint();
 });
 paint();
}
