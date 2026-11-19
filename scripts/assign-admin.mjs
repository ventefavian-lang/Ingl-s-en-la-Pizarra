// Run ONLY on your own machine, outside the published web directory.
// Requires: npm install --no-save firebase-admin
// Set GOOGLE_APPLICATION_CREDENTIALS to a Firebase service account JSON path.
// Example: node scripts/assign-admin.mjs user@example.com
import {initializeApp,applicationDefault} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
const email=process.argv[2];
if(!email || !email.includes('@') || !process.env.GOOGLE_APPLICATION_CREDENTIALS){
 console.error('Uso: GOOGLE_APPLICATION_CREDENTIALS=/ruta/privada/credenciales.json node scripts/assign-admin.mjs correo@ejemplo.com');process.exit(1);
}
initializeApp({credential:applicationDefault()});
const auth=getAuth(),user=await auth.getUserByEmail(email);
await auth.setCustomUserClaims(user.uid,{...(user.customClaims||{}),admin:true});
console.log('Rol admin asignado. Cierra sesión y vuelve a iniciar sesión en Hello English.');
