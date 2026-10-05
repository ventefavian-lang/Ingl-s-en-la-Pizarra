import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,setPersistence,browserSessionPersistence} from 'firebase/auth';
import {getFirestore,doc,getDocFromServer,runTransaction,serverTimestamp} from 'firebase/firestore';
import {cleanProgress,mergeProgress} from './progress.js';
export function configured(c){return !!c&&['apiKey','authDomain','projectId','appId'].every(k=>typeof c[k]==='string'&&c[k].trim().length>0&&!c[k].includes('REEMPLAZAR'));}
export function createFirebaseAdapter(config,courseId='a1'){
 if(!configured(config))return null;
 const app=initializeApp(config),auth=getAuth(app),db=getFirestore(app),provider=new GoogleAuthProvider();
 provider.setCustomParameters({prompt:'select_account'});
 // La cuenta no queda iniciada indefinidamente al cerrar la pestaña.
 const ready=setPersistence(auth,browserSessionPersistence);ready.catch(()=>{});
 const ref=uid=>doc(db,'users',uid,'courses',courseId);
 const unpack=s=>s.exists()?{...s.data(),progress:cleanProgress(s.data().progress)}:{epoch:0,revision:0,progress:cleanProgress(null),appliedWrites:[]};
 const data=(remote,progress,id,epoch)=>({schemaVersion:1,courseId,epoch,revision:(remote.revision||0)+1,progress:cleanProgress(progress),appliedWrites:[...(remote.appliedWrites||[]),id].slice(-100),updatedAt:serverTimestamp()});
 return{
  watchAuth:(success,error)=>onAuthStateChanged(auth,success,error),
  signIn:async()=>{await ready;return signInWithPopup(auth,provider);},
  signOut:()=>signOut(auth),
  read:async uid=>unpack(await getDocFromServer(ref(uid))),
  commit:(uid,pending)=>runTransaction(db,async tx=>{
   const r=ref(uid),remote=unpack(await tx.get(r));
   if(remote.epoch!==pending.epoch)return {...remote,reset:true};
   if(remote.appliedWrites.includes(pending.id))return remote;
   const progress=mergeProgress(pending.base,pending.local,remote.progress);
   tx.set(r,data(remote,progress,pending.id,remote.epoch));return{progress,epoch:remote.epoch};
  }),
  replace:(uid,progress,id)=>runTransaction(db,async tx=>{
   const r=ref(uid),remote=unpack(await tx.get(r));
   if(remote.appliedWrites.includes(id))return remote;
   const epoch=remote.epoch+1;tx.set(r,data(remote,progress,id,epoch));return{progress:cleanProgress(progress),epoch};
  })
 };
}
