import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
pairs=[['Leo','Mia'],['Ella','Oliver'],['Nora','Max'],['Sam','Zoe'],['Ava','Noah'],['Mia','Oliver']]
men={'Leo','Sam','Oliver','Max','Noah'}
p=root/'src/conversations.json';data=json.loads(p.read_text())
for li,(level,stories) in enumerate(data.items()):
 for i,s in enumerate(stories):
  old=s['people'];new=pairs[(i+li)%6][:]
  if (old[0] in men)!=(new[0] in men):new.reverse()
  mapping=dict(zip(old,new))
  def change(v):
   if isinstance(v,str):return re.sub(r'\b(?:'+('|'.join(map(re.escape,old)))+r')\b',lambda m:mapping[m[0]],v)
   if isinstance(v,list):return [change(x) for x in v]
   if isinstance(v,dict):return {k:change(x) for k,x in v.items()}
   return v
  stories[i]=change(s)
p.write_text(json.dumps(data,ensure_ascii=False,indent=2))
for n in ['course','course-a2','course-b1','course-b2']:
 p=root/f'src/{n}.json';c=json.loads(p.read_text())
 for u in c['units']:u['voices']=[['Leo','Mia'],['Sam','Nora'],['Oliver','Ella'],['Max','Zoe'],['Noah','Ava']][(u['id']-1)%5]
 p.write_text(json.dumps(c,ensure_ascii=False,indent=2))
