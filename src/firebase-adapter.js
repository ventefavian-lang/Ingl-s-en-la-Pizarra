import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,setPersistence,browserLocalPersistence,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,updateProfile,getIdTokenResult} from 'firebase/auth';
import {getFirestore,doc,getDocFromServer,runTransaction,serverTimestamp,getDocs,collection,query,orderBy,where,limit,onSnapshot,setDoc,deleteDoc} from 'firebase/firestore';
import {cleanProgress,mergeProgress} from './progress.js';
export function configured(c){return !!c&&['apiKey','authDomain','projectId','appId'].every(k=>typeof c[k]==='string'&&c[k].trim().length>0&&!c[k].includes('REEMPLAZAR'));}
export function createFirebaseAdapter(config,courseId='a1'){
 if(!configured(config))return null;
 const app=initializeApp(config),auth=getAuth(app),db=getFirestore(app),provider=new GoogleAuthProvider();
 provider.setCustomParameters({prompt:'select_account'});
 // Mantener sesión entre visitas hasta que el estudiante cierre sesión explícitamente.
 const ready=setPersistence(auth,browserLocalPersistence);ready.catch(()=>{});
 const ref=uid=>doc(db,'users',uid,'courses',courseId);
 const levelRef=(uid,level)=>doc(db,'users',uid,'courses',level);
 const rankRef=uid=>doc(db,'leaderboard',uid);
 const summaryRef=uid=>doc(db,'studentSummaries',uid);
 const levels=['a1','a2','b1','b2'];
 const cleanAlias=t=>String(t||'').trim().replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ0-9 _-]/g,'').replace(/\s+/g,' ').slice(0,20);
 const cleanCountry=t=>/^[A-Z]{2}$/.test(String(t||''))?t:'XX';
 const allTotals=async uid=>{const items=await Promise.all(levels.map(l=>getDocFromServer(levelRef(uid,l))));return {total:items.reduce((n,s)=>n+(s.exists()?Math.max(0,Number(s.data()?.progress?.xp)||0):0),0),byLevel:Object.fromEntries(items.map((s,i)=>[levels[i],s.exists()?Math.max(0,Number(s.data()?.progress?.xp)||0):0]))};};
 const unpack=s=>s.exists()?{...s.data(),progress:cleanProgress(s.data().progress)}:{epoch:0,revision:0,progress:cleanProgress(null),appliedWrites:[]};
 const data=(remote,progress,id,epoch)=>({schemaVersion:1,courseId,epoch,revision:(remote.revision||0)+1,progress:cleanProgress(progress),appliedWrites:[...(remote.appliedWrites||[]),id].slice(-100),updatedAt:serverTimestamp()});
 return{
  watchAuth:(success,error)=>onAuthStateChanged(auth,success,error),
  getRole:async()=>!!(await getIdTokenResult(auth.currentUser,true)).claims.admin,
  getRankProfile:async uid=>{const r=await getDocFromServer(rankRef(uid));return r.exists()?r.data():null;},
  totals:allTotals,
  publishRank:async(uid,alias,country)=>{
   const safe=cleanAlias(alias);
   if(safe.length<3)throw Error('El alias necesita al menos tres caracteres.');
   const sum=await allTotals(uid);
   await setDoc(rankRef(uid),{alias:safe,country:cleanCountry(country),score:sum.total,updatedAt:serverTimestamp()});
   return sum;
  },
  leaveRank:uid=>deleteDoc(rankRef(uid)),
  // Si el usuario aceptó aparecer públicamente, actualizar sus XP tras sincronizar.
  // No crea perfiles ni publica datos de quien no haya dado consentimiento.
  refreshRankIfOptedIn:async uid=>{
   const old=await getDocFromServer(rankRef(uid));
   if(!old.exists())return false;
   const profile=old.data(),sum=await allTotals(uid);
   if(Number(profile.score)===sum.total)return false;
   await setDoc(rankRef(uid),{alias:cleanAlias(profile.alias),country:cleanCountry(profile.country),score:sum.total,updatedAt:serverTimestamp()});
   return true;
  },
  watchRank:(country,success,error)=>{
   const filters=country&&country!=='ALL'?[where('country','==',cleanCountry(country))]:[];
   return onSnapshot(query(collection(db,'leaderboard'),...filters,orderBy('score','desc'),limit(50)),snapshot=>success(snapshot.docs.map(s=>({id:s.id,...s.data()}))),error);
  },
  publishSummary:async(uid,level)=>{
   const sum=await allTotals(uid);
   await setDoc(summaryRef(uid),{score:sum.total,level:levels.includes(level)?level:'a1',updatedAt:serverTimestamp()});
   return sum;
  },
  watchAdminSummaries:(success,error)=>onSnapshot(query(collection(db,'studentSummaries'),orderBy('updatedAt','desc'),limit(100)),s=>success(s.docs.map(d=>({id:d.id,...d.data()}))),error),
  removeRank:uid=>deleteDoc(rankRef(uid)),
  signIn:async()=>{await ready;return signInWithPopup(auth,provider);},
  signUp:async(email,password,name)=>{
   await ready;
   const created=await createUserWithEmailAndPassword(auth,email,password);
   if(name){try{await updateProfile(created.user,{displayName:name.slice(0,40)});}catch{ /* La cuenta ya existe; el nombre se puede ajustar después. */ }}
   return created;
  },
  signInWithPassword:async(email,password)=>{await ready;return signInWithEmailAndPassword(auth,email,password);},
  resetPassword:async email=>{await ready;await sendPasswordResetEmail(auth,email);},
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
