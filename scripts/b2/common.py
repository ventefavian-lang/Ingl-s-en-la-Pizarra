import re
UNITS=[]
def rule(title,text,pattern,tip,*examples):
    out={'title':title,'text':text,'pattern':pattern,'tip':tip,'examples':[],'items':[]}
    for row in examples:
        cells=row.split('|'); sentence=cells[0]
        m=re.search(r'\{([^}]+)\}',sentence)
        out['examples'].append(re.sub(r'\{([^}]+)\}',r'\1',sentence))
        if m:
            out['items'].append({'prompt':sentence.replace(m.group(0),'___'),'answer':m[1],'options':[m[1],*cells[1:]],'why':text+' '+tip})
    return out
def qs(rows):
    return [dict(zip(['prompt','answer','wrong','why'],row.split('|'))) for row in rows.strip().split('\n')]
def unit(title,en,icon,goal,rules,vocab,reading,reading_q,case,case_q,listening,listening_q,task,model,speaking,transforms,forms,focus):
    i=len(UNITS)+1
    vs=[]
    for row in vocab.strip().split('\n'):
        a,b,c=row.split('|');vs.append({'en':a,'es':b,'example':c,'icon':icon})
    assert len(vs)==20,(i,len(vs))
    def convert(rows):
        return [{'prompt':q['prompt'],'answer':q['answer'],'options':[q['answer'],*q['wrong'].split('~')],'why':q['why']} for q in qs(rows)]
    u=dict(id=i,title=title,en=en,icon=icon,goal=goal,rules=rules,vocab=vs,story=reading,reading=convert(reading_q),case=case,caseQuestions=convert(case_q),listening={'text':listening,'questions':convert(listening_q)},writing=task,model=model,mission=speaking,focus=focus)
    u['questions']=[q for r in rules for q in r['items']]
    u['transforms']=[dict(zip(['prompt','answer','why'],x.split('|'))) for x in transforms.strip().split('\n')]
    u['forms']=[dict(zip(['prompt','stem','answer','why'],x.split('|'))) for x in forms.strip().split('\n')]
    UNITS.append(u)
