STORIES={k:[] for k in ['a1','a2','b1','b2']}
def episode(title,context,dialogue,chunks,branches,task):
    lines=[]
    for i,row in enumerate(dialogue.strip().splitlines()):
        en,es=row.split('|');lines.append({'speaker':i%2,'en':en,'es':es})
    assert len(lines)==8,(title,len(lines))
    phrases=[]
    for row in chunks.strip().splitlines():
        en,es,use,example,translation=row.split('|');phrases.append(dict(en=en,es=es,use=use,example=example,translation=translation))
    assert len(phrases)==3
    options=[]
    for row in branches.strip().splitlines():
        en,es,reply,translation,why=row.split('|');options.append(dict(en=en,es=es,reply=reply,translation=translation,why=why))
    assert len(options)==2
    return dict(title=title,context=context,lines=lines,chunks=phrases,branches=options,task=task)
def chapter(level,title,theme,people,units,first,second):
    STORIES[level].append(dict(id=len(STORIES[level])+1,title=title,theme=theme,people=people.split('|'),units=units,episodes=[first,second]))
