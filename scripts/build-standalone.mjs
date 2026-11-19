// Genera un paquete ES Modules listo para publicar sin ejecutar npm install.
// Firebase se carga desde los módulos oficiales de Google en el navegador.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('src'),out=path.resolve('public/v12mod');
fs.mkdirSync(out,{recursive:true});
const files=fs.readdirSync(root);
let count=0;
for (const file of files) {
 const source=path.join(root,file);
 if (file.endsWith('.json')) {
  const data=JSON.parse(fs.readFileSync(source,'utf8'));
  fs.writeFileSync(path.join(out,file+'.js'),'export default '+JSON.stringify(data)+';\n');
  count++;
 } else if (file.endsWith('.js')) {
  const code=fs.readFileSync(source,'utf8')
   .replace(/^import\s+['"]\.[^'"\n]+\.css['"];?\s*$/gm,'')
   .replace(/(from\s+['"]\.\/[^'"\n]+\.json)(['"])/g,'$1.js$2');
  fs.writeFileSync(path.join(out,file),code);
  count++;
 }
}
const js=fs.readFileSync(path.join(root,'main.js'),'utf8');
const cssOrder=[...js.matchAll(/import\s+['"]\.\/(.+?\.css)['"];/g)].map(m=>m[1]);
fs.writeFileSync(path.resolve('public/v12.css'),cssOrder.map(file=>`/* ${file} */\n`+fs.readFileSync(path.join(root,file),'utf8')).join('\n\n'));
console.log(`Paquete público sin dependencias de compilación: ${count} módulos y ${cssOrder.length} estilos.`);
