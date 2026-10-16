def E(en,es,why): return {'en':en,'es':es,'why':why}
def X(bad,good,why): return {'bad':bad,'good':good,'why':why}
def Q(prompt,answer,wrong1,wrong2,why): return {'prompt':prompt,'answer':answer,'options':[answer,wrong1,wrong2],'why':why}
def S(title,prose,examples=None,table=None):
 return {'title':title,'paragraphs':[p.strip() for p in prose.strip().split('\n\n') if p.strip()],'examples':examples or [],'table':table}
def T(id,title,level,group,lead,sections,errors,questions):
 return {'id':id,'title':title,'level':level,'group':group,'lead':lead,'sections':sections,'errors':errors,'questions':questions}
