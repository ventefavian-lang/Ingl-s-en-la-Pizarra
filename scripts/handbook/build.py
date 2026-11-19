"""Rebuild original teaching handbook, lesson links, printable copy and audio manifest."""
from pathlib import Path
import json,hashlib,html,re
from foundations import TOPICS as BASE
from expanded import TOPICS as MORE
from mapping import MAPPING
from scenes import SCENES
root=Path(__file__).resolve().parents[2]
topics=BASE+MORE
pairs=[['Leo','Mia'],['Sam','Nora'],['Oliver','Ella'],['Max','Zoe'],['Noah','Ava']]
for i,t in enumerate(topics):
    if t['id'] in SCENES:
        lines,g=SCENES[t['id']]
        t['scene']=[dict(speaker=j%2,en=en,es=es) for j,(en,es) in enumerate(lines)]
        t['gist']=dict(prompt=g[0],es=g[1],answer=g[2],options=g[2:5],evidence=g[5])
    t['people']=pairs[i%5]
    if t['id']=='sentence':t['people']=['Sam','Nora']
    if t['id']=='be':t['people']=['Mia','Leo']
    if t['id']=='social':t['people']=['Leo','Mia']
    for s in t['sections']:
        if s.get('table'):s['table']['enColumns']=[1,2] if t['id']=='nouns' else list(range(len(s['table']['headers'])))
        s['brief']=re.split(r'(?<=\.)\s+(?=[A-ZÁÉÍÓÚ¿¡])',s['paragraphs'][0],maxsplit=1)[0]
byid={t['id']:t for t in topics}
assert len(byid)==61
for level,units in MAPPING.items():
    assert len(units)==24
    for lessons in units:
        assert len(lessons)==3
        for link in lessons:
            assert 0<=link['section']<len(byid[link['topic']]['sections'])
for t in topics:
    assert len(t['scene'])==4 and len(t['questions'])==2
    assert t['gist']['answer'] in t['gist']['options'] and 0<=t['gist']['evidence']<4
    for q in t['questions']:assert q['answer'] in q['options'] and len(set(q['options']))==3
sources=[
('British Council — present simple','https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple'),
('British Council — present perfect','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-perfect'),
('British Council — third and mixed conditionals','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-third-mixed'),
('British Council — wishes','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/wishes-wish-if-only'),
('Cambridge — verb patterns','https://dictionary.cambridge.org/grammar/british-grammar/verb-patterns-verb-infinitive-or-verb-ing'),
('Council of Europe — CEFR level descriptions','https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions')]
counts={'topics':len(topics),'sections':sum(len(t['sections']) for t in topics),'examples':sum(len(s['examples']) for t in topics for s in t['sections']),'scenes':len(topics),'turns':4*len(topics),'checks':sum(len(t['questions']) for t in topics),'linkedLessons':288}
data=dict(version=9,topics=topics,lessons=MAPPING,counts=counts,sources=sources)
(root/'src/handbook.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
manifest_path=root/'src/recorded-voices.json';manifest=json.loads(manifest_path.read_text())
plan_path=root/'scripts/audio-plan.json';plan=json.loads(plan_path.read_text());jobs={x['file']:x for x in plan}
active_keys={t['people'][l['speaker']]+'\n'+l['en'] for t in topics for l in t['scene']}
for key,file in list(manifest['entries'].items()):
    if key not in active_keys and file==hashlib.sha256(('handbook9\n'+key).encode()).hexdigest()[:20]+'.mp3':
        del manifest['entries'][key];jobs.pop(file,None)
for t in topics:
    for l in t['scene']:
        role=t['people'][l['speaker']];key=role+'\n'+l['en'];file=manifest['entries'].get(key) or hashlib.sha256(('handbook9\n'+key).encode()).hexdigest()[:20]+'.mp3'
        manifest['entries'][key]=file
        jobs[file]=dict(text=l['en'],role=role,voice=manifest['cast'][role],file=file)
manifest['version']=9
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
plan_path.write_text(json.dumps(list(jobs.values()),ensure_ascii=False,indent=2)+'\n')
esc=lambda x:html.escape(str(x),quote=True)
def rich(x):return re.sub(r'\[\[(.*?)\]\]',r'<span lang="en">\1</span>',esc(x))
def table(s):
    tb=s.get('table')
    if not tb:return ''
    return '<div class="scroll"><table><thead><tr>'+''.join('<th>'+esc(h)+'</th>' for h in tb['headers'])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+esc(c)+'</td>' for c in row)+'</tr>' for row in tb['rows'])+'</tbody></table></div>'
parts=[]
for t in topics:
    parts.append(f'<article id="{t["id"]}"><p class="tag">{t["level"].upper()} · INGLÉS EN USO</p><h2>{esc(t["title"])}</h2><div class="scene">'+''.join(f'<p><b>{t["people"][l["speaker"]]}</b> <span lang="en">{esc(l["en"])}</span><small>{esc(l["es"])}</small></p>' for l in t['scene'])+'</div>')
    for s in t['sections']:
        parts.append('<section><h3>'+esc(s['title'])+'</h3>'+''.join('<div class="example"><p lang="en">'+esc(e['en'])+'</p><p>'+esc(e['es'])+'</p><small>'+esc(e['why'])+'</small></div>' for e in s['examples'])+''.join('<p>'+rich(p)+'</p>' for p in s['paragraphs'])+table(s)+'</section>')
    if t['errors']:parts.append('<h3>Errores que cambian la frase</h3>'+''.join('<p><s lang="en">'+esc(e['bad'])+'</s> → <b lang="en">'+esc(e['good'])+'</b><br>'+esc(e['why'])+'</p>' for e in t['errors']))
    parts.append('<h3>Comprueba el sentido</h3>'+''.join('<details><summary>'+esc(q['prompt'])+'</summary><p lang="en">'+esc(q['answer'])+'</p><p>'+esc(q['why'])+'</p></details>' for q in t['questions'])+'<a href="#index">Volver al índice ↑</a></article>')
head='''<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Entender el inglés · A1–B2</title><style>body{font:17px/1.65 system-ui;color:#25243b;background:#f7f6fb;max-width:900px;margin:auto;padding:28px}h1,h2,h3{line-height:1.2}h1{font-size:46px}a{color:#6343bd}.tag{color:#6b529b;font-size:12px;letter-spacing:2px;font-weight:700}article{background:white;border:1px solid #e7e2f3;border-radius:22px;padding:30px;margin:28px 0}section{margin-top:32px}.scene{background:#f2effb;padding:18px 24px;border-radius:16px}.scene small{display:block;color:#656277}.example{border-left:4px solid #8b6ac9;padding:8px 18px;margin:16px 0}.example p{margin:2px 0}.example [lang=en]{font-size:20px;font-weight:650}.scroll{overflow:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:9px;text-align:left}details{padding:12px 0;border-bottom:1px solid #e6e0f2}summary{cursor:pointer}nav{columns:2}nav a{display:block;margin:10px 0}small{font-size:14px}.note{color:#686579}@media(max-width:600px){body{padding:15px}article{padding:18px}nav{columns:1}h1{font-size:34px}}@media print{body{background:white;padding:0;font-size:11pt}article{border:0;padding:0;break-before:page}details>p{display:block}nav{columns:2}.scene,.example{break-inside:avoid}}</style><header><p class="tag">HELLO ENGLISH · EDICIÓN 9</p><h1>Entender el inglés.<br>Y empezar a usarlo.</h1><p>61 temas · A1–B2 · ejemplos, usos y contrastes</p><p class="note">Textos originales de apoyo al curso. Los niveles indican el punto de entrada aproximado; el dominio se demuestra usando el idioma en situaciones nuevas. Esta copia es de consulta. Las conversaciones con audio y la práctica interactiva están en la web.</p></header><nav id="index" aria-label="Temas">'''
manual=head+''.join('<a href="#'+t['id']+'">'+esc(t['title'])+'</a>' for t in topics)+'</nav>'+''.join(parts)+'<footer><h2>Referencias de consulta</h2><p>Consultadas para contrastar usos y orientación por niveles; no son textos reproducidos ni avales del curso.</p>'+''.join('<p><a href="'+url+'">'+esc(label)+'</a></p>' for label,url in sources)+'</footer></html>'
(root/'MANUAL_INGLES_A1_B2.html').write_text(manual)
(root/'public/manual-ingles.html').write_text(manual)
print(json.dumps(counts));print('Audio manifest:',len(manifest['entries']),'keys;',len(set(manifest['entries'].values())),'files')
