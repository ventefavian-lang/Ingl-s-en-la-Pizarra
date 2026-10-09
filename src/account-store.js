import {recordAutomaticEvents} from './practice-memory.js';
import {freshProgress,cleanProgress,clone,equal,mergeProgress,readRecord,hasLearning} from './progress.js';
export class AccountStore {
 constructor({adapter=null,storage,courseId='a1',delay=1800,id=()=>globalThis.crypto.randomUUID()}) {
  this.courseId=courseId;this.adapter=adapter;this.storage=storage;this.delay=delay;this.id=id;this.user=null;this.scope='guest';this.seq=0;this.listeners=new Set();this.status=adapter?'connecting':'not-configured';this.message='';this.localAvailable=true;this.record=readRecord(storage,this.key());this.running=null;this.timer=null;
  try{if(!storage.getItem(this.key())){const old=JSON.parse(storage.getItem('hello-'+this.courseId+'-v1')||'null');if(old && (this.courseId==='a1'?old.version===1:this.courseId==='a2'?old.version===2&&old.course==='A2':this.courseId==='b1'?old.version===3&&old.course==='B1':false))this.record.state=cleanProgress(old);}}catch{this.localAvailable=false;}
  this.persist();
 }
 key(scope=this.scope){return 'hello-english:'+this.courseId+':'+scope;}
 getState(){return clone(this.record.state);}
 snapshot(){return{user:this.user?{uid:this.user.uid,displayName:this.user.displayName||'',email:this.user.email||''}:null,scope:this.scope,status:this.status,message:this.message,configured:!!this.adapter,dirty:this.record.dirty,lastSynced:this.record.lastSynced,localAvailable:this.localAvailable,progress:this.getState(),guestAvailable:hasLearning(readRecord(this.storage,this.key('guest')).state)};}
 subscribe(fn){this.listeners.add(fn);fn(this.snapshot(),{kind:'initial'});return()=>this.listeners.delete(fn);}
 emit(kind='status'){const snapshot=this.snapshot();for(const fn of this.listeners)fn(snapshot,{kind});}
 persist(){try{this.storage.setItem(this.key(),JSON.stringify(this.record));}catch{this.localAvailable=false;}}
 start(){if(!this.adapter){this.emit();return;}this.stopAuth=this.adapter.watchAuth(user=>this.setUser(user),error=>{this.status='error';this.message=this.explain(error);this.emit();});}
 async setUser(user){
  const token=++this.seq;clearTimeout(this.timer);this.running=null;this.user=user;this.scope=user?user.uid:'guest';this.record=readRecord(this.storage,this.key());this.message='';this.status=user?'loading':(this.adapter?'guest':'not-configured');this.emit('scope');
  if(user)await this.sync(token);
 }
 save(progress){this.record.state=recordAutomaticEvents(this.record.state,cleanProgress(progress));this.record.dirty=this.user?!equal(this.record.state,this.record.base):false;this.persist();this.message='';this.status=this.user?(this.record.dirty?'pending':'saved'):(this.adapter?'guest':'not-configured');this.emit('local');if(this.user)this.schedule();}
 schedule(){clearTimeout(this.timer);if(this.user)this.timer=setTimeout(()=>this.sync(),this.delay);}
 async login(){if(!this.adapter){this.message='El acceso con Google todavía no está activado en esta página. Puedes estudiar como invitado.';this.emit();return false;}try{this.status='signing-in';this.message='';this.emit();await this.adapter.signIn();return true;}catch(e){this.status=this.user?'error':'guest';this.message=this.explain(e);this.emit();return false;}}
 async logout(){clearTimeout(this.timer);if(!this.user)return true;const token=this.seq,uid=this.user.uid;await this.sync();if(token!==this.seq||this.user?.uid!==uid)return false;if(this.record.dirty){this.message='Todavía hay cambios pendientes. Conéctate y pulsa Sincronizar antes de cerrar sesión, o descarga una copia de tu progreso.';this.status='error';this.emit();return false;}try{await this.adapter.signOut();return true;}catch(e){this.message=this.explain(e);this.emit();return false;}}
 async sync(token=this.seq){
  if(!this.user||!this.adapter)return false;if(this.running)return this.running;
  const uid=this.user.uid;const task=this.doSync(uid,token);this.running=task;
  try{return await task;}finally{if(token===this.seq){this.running=null;if(this.record.dirty&&this.status!=='error')this.schedule();}}
 }
 async doSync(uid,token){
  try{
   this.status='syncing';this.emit();
   if(this.record.dirty||this.record.pending){
    if(!this.record.pending)this.record.pending={id:this.id(),base:clone(this.record.base),local:clone(this.record.state),epoch:this.record.epoch};
    this.persist();const sent=clone(this.record.pending),result=await this.adapter.commit(uid,sent);
    if(token!==this.seq)return false;
    const current=clone(this.record.state);
    this.record.state=result.reset?cleanProgress(result.progress):mergeProgress(sent.local,current,result.progress);
    this.record.base=cleanProgress(result.progress);this.record.epoch=result.epoch;this.record.pending=null;
    this.record.dirty=!equal(this.record.state,this.record.base);
    if(result.reset)this.message='El progreso se reemplazó desde otro dispositivo. Se ha cargado esa versión.';
   }else{
    const result=await this.adapter.read(uid);if(token!==this.seq)return false;
    const remote=cleanProgress(result?.progress),epoch=result?.epoch||0;
    if(this.record.epoch!==epoch){this.record.state=remote;this.record.dirty=false;}
    else this.record.state=mergeProgress(this.record.base,this.record.state,remote);
    this.record.base=remote;this.record.epoch=epoch;this.record.dirty=!equal(this.record.state,this.record.base);
   }
   this.record.lastSynced=new Date().toISOString();this.status=this.record.dirty?'pending':'saved';this.persist();this.emit('remote');return true;
  }catch(e){if(token!==this.seq)return false;this.status='error';this.message=this.explain(e);this.persist();this.emit();return false;}
 }
 async replace(progress){
  const next=cleanProgress(progress);
  if(!this.user){this.record.state=next;this.record.base=freshProgress();this.record.dirty=false;this.persist();this.emit('remote');return true;}
  // Esperar cualquier envío anterior antes de un borrado o reemplazo intencional.
  const token=this.seq,uid=this.user.uid;if(this.running)await this.running;if(token!==this.seq||this.user?.uid!==uid)return false;clearTimeout(this.timer);
  try{this.status='syncing';this.emit();const result=await this.adapter.replace(uid,next,this.id());if(token!==this.seq)return false;this.record={recordVersion:1,state:cleanProgress(result.progress),base:cleanProgress(result.progress),epoch:result.epoch,dirty:false,pending:null,lastSynced:new Date().toISOString()};this.status='saved';this.persist();this.emit('remote');return true;}catch(e){if(token===this.seq){this.status='error';this.message=this.explain(e);this.emit();}return false;}
 }
 importGuest(){if(!this.user)return;const guest=readRecord(this.storage,this.key('guest')).state;const prior=cleanProgress(this.record.importedGuest);this.record.importedGuest=clone(guest);this.save(mergeProgress(prior,guest,this.record.state));}
 explain(error){const code=error?.code||'';const map={'auth/popup-closed-by-user':'Se cerró la ventana de Google. Puedes intentarlo de nuevo.','auth/popup-blocked':'El navegador bloqueó la ventana. Permite ventanas emergentes para este sitio y vuelve a pulsar el botón.','auth/unauthorized-domain':'Google todavía no está habilitado para esta dirección. El responsable de la página debe autorizar su dominio.','auth/operation-not-allowed':'El acceso con Google aún no está habilitado para esta página.','auth/network-request-failed':'No se pudo conectar con Google. Comprueba tu conexión.','permission-denied':'No se pudo guardar en tu cuenta. El responsable de la página debe revisar los permisos de la base de datos.','resource-exhausted':'Se alcanzó el límite del servicio de guardado. Conserva una copia y vuelve a intentarlo más tarde.','unavailable':'Sin conexión con el servicio. Tus cambios siguen pendientes en este navegador.','failed-precondition':'No se pudo completar el guardado. Conserva una copia e inténtalo de nuevo.','auth/cancelled-popup-request':'Ya hay una ventana de acceso abierta.'};return map[code]||'No se pudo conectar con el servicio. Tu copia local sigue disponible; puedes reintentar o exportarla.';}
 destroy(){clearTimeout(this.timer);this.seq++;this.stopAuth?.();this.listeners.clear();}
}
