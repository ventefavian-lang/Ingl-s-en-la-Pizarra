// Secure optional admin CLI: never place Firebase Admin credentials in public/ or a ZIP.
// npm install --no-save firebase-admin; export GOOGLE_APPLICATION_CREDENTIALS=/ruta/privada/credenciales.json
import {initializeApp,applicationDefault} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
const email=process.argv[2],name=process.argv.slice(3).join(' ');
if(!email?.includes('@')||!name||!process.env.GOOGLE_APPLICATION_CREDENTIALS){console.error('Uso: GOOGLE_APPLICATION_CREDENTIALS=... node scripts/create-student.mjs correo@ejemplo.com Nombre de estudiante');process.exit(1);}
initializeApp({credential:applicationDefault()});
const user=await getAuth().createUser({email,displayName:name,emailVerified:false});
const link=await getAuth().generatePasswordResetLink(email);
console.log('Cuenta creada:',user.uid,'\nEnvía PRIVADAMENTE al estudiante el enlace para establecer su contraseña:',link);
