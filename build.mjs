import {build} from 'esbuild';
await import('./scripts/sync-teacher-contexts.mjs');
await build({entryPoints:['src/main.js'],bundle:true,outfile:'public/build/app.js',format:'iife',target:['es2022'],minify:true,legalComments:'eof',loader:{'.json':'json'}});
console.log('Publicación preparada en public/');
