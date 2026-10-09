"""Regenerate the original B2 material. Python standard library only."""
import json, re
from pathlib import Path
from common import UNITS
import units_01_04, units_05_08, units_09_12, units_13_16, units_17_20, units_21_24
ROOT=Path(__file__).resolve().parents[2]
DIALOGUES=[
['How have you been getting on at the workshop?','Better, although I still miss some jokes.','What helped you join the discussion?','I started asking one useful question at each meeting.','I used to wait until I had a perfect sentence.','So did I. Now I check whether people understood my point.'],
['Will the programme be ready by Friday?','We will have contacted the speakers, but two rooms are not confirmed.','What if those rooms are unavailable?','We can move one session online, provided that the speaker agrees.','Should we print the programme now?','I would wait until the bookings are confirmed.'],
['If we had checked the address, we would not have missed the delivery.','True, but what can we change for next time?','If we kept one shared list, everyone would see the latest details.','Would that have prevented yesterday\'s problem?','It might have, though somebody would still need to check it.','Then let us assign that responsibility before the next delivery.'],
['I wish I had asked for help sooner.','What stopped you?','I thought I ought to solve everything on my own.','Would you rather work with a partner next time?','Yes, but I would prefer us to agree on responsibilities first.','That sounds sensible. We can still change the plan.'],
['The lights are off. They must have left already.','They might be working in the other room.','You are right; we should not assume.','I should have confirmed the meeting time yesterday.','Could the message have gone to your old address?','Possibly. I will check before contacting them again.'],
['Has the heating been repaired?','It was inspected yesterday, but a replacement part is needed.','Who will contact the residents?','The manager has been asked to send an update.','Should we have the windows checked as well?','Yes. Let us arrange that while the technician is here.'],
['What did the organiser say about the tickets?','She said that the first batch had sold out.','Did she promise to release more?','No. She suggested checking the website on Monday.','Then we should avoid telling people that more tickets are guaranteed.','Exactly. I will pass on the suggestion without adding a promise.'],
['Which proposal are we discussing?','The one that includes an evening service.','Is that the proposal submitted by the residents?','Yes. It was written by a group whose members use the bus every day.','Their report, which I read yesterday, gives several examples.','Could you explain the example you found most convincing?'],
['Did you remember to send the invitation?','Yes, and I remember attaching the new schedule.','I tried opening the attachment, but it would not load.','Have you tried downloading it first?','Not yet. I stopped working when the network failed.','I will send a plain-text version so we can carry on.'],
['How much evidence do we have?','We have a few interviews, but little information about evening users.','Were all the participants regular visitors?','Most were. That limits what we can conclude.','Could we speak to some people who rarely come?','Yes. A larger number would help, provided that the group is more varied.'],
['The second option is considerably cheaper.','It is, but it is not quite as flexible.','Is the difference large enough to justify the extra cost?','For occasional users, probably not.','What about people who need it every day?','They may find the more expensive option better value over time.'],
['The trial attracted more visitors; however, the waiting time increased.','Does that mean we should cancel it?','Not necessarily. Although the queues were longer, most visitors stayed.','So what would you recommend?','Add a second information desk so that simple questions can be answered quickly.','That might help, provided that we can find enough volunteers.'],
['I understand the word, but I cannot use it naturally.','Can you remember the words that usually go with it?','I know decision, but I keep saying do a decision.','Try learning make a decision as a complete expression.','Then I could change it to reach a decision when the context fits.','Exactly. Check the whole phrase in a sentence before using it.'],
['Would you say the new system has been successful?','To some extent. It appears to have reduced delays.','But have all users benefited?','That is less clear, especially for people without internet access.','What we need is a comparison across different groups.','I agree. One average figure does not explain everyone\'s experience.'],
['Can we use this report in our summary?','Yes, but we should check who produced it and when.','It says satisfaction increased after the change.','Does it show that the change caused the increase?','No. Other things may have changed at the same time.','Then our summary should keep that uncertainty.'],
['Could we move the deadline forward by two days?','That would be difficult unless we reduce the scope.','Which part could wait?','We could deliver the main findings first and the detailed tables on Friday.','Would that give the client enough information for the meeting?','I think so, but let us confirm that before we commit.'],
['This post claims that the service is closing.','What is the original source?','It links to a notice from last year.','Then the date may change how we interpret it.','I will check for a newer notice before sharing the post.','Good idea. A confident headline is not the same as current evidence.'],
['Should the council add more parking spaces?','Perhaps, but we should also compare transport alternatives.','Some residents cannot use the existing bus service.','Could a later bus help them without taking more public space?','We would need to know how many people would use it.','Then a short trial with clear measures seems a reasonable next step.'],
['I am not sure whether I understood the booking conditions.','Which part was unclear?','It says we may arrive late if we notify reception.','Shall we ask what the latest arrival time is?','Yes, and I would like written confirmation.','I can write a short message and ask them to correct any misunderstanding.'],
['I have been studying late, but I remember less the next day.','What happens if you move one session to the afternoon?','I could try that, although my timetable changes each week.','Could you reserve two short sessions instead of one long one?','That seems feasible. I will compare how well I recall the material.','And leave some time to use it in conversation, too.'],
['Would you recommend the exhibition?','Yes, especially to people interested in local stories.','Was there anything you found disappointing?','The final room felt rushed, whereas the earlier sections were carefully explained.','Did that spoil the experience?','Not entirely. The interviews were memorable enough to justify a visit.'],
['Have you written to the company about the damaged item?','I have drafted a message, but it sounds rather angry.','Have you included the order number and described the damage?','Yes. I have also attached a photograph.','Then ask for a specific remedy and give them time to respond.','I will request a replacement and ask when I can expect an update.'],
['The proposal is affordable, is it not?','Compared with the original one, yes.','Sorry, do you mean the total cost or the monthly payment?','The total cost. I should have made that clearer.','I see your point. Could I add one concern about maintenance?','Of course. Then perhaps we can agree on the next step.'],
['Which recommendation will you present?','A limited trial, followed by a review of access and cost.','What is the strongest objection?','The trial could exclude people who cannot attend in the evening.','How would you address that?','I would offer an alternative time and report whether it reaches different users.']]
assert len(UNITS)==len(DIALOGUES)==24
for u,dialogue in zip(UNITS,DIALOGUES):
 u['dialogue']=[['Alex' if i%2==0 else 'Sam',text] for i,text in enumerate(dialogue)]
 for r in u['rules']:r.pop('items',None)
 assert len(u['questions'])==6 and len(u['reading'])==4 and len(u['caseQuestions'])==4
 assert len(u['transforms'])==4 and len(u['forms'])==4
extra=json.loads((ROOT/'src/course-b1.json').read_text())['extra']
extra['checklist']=[u['goal'] for u in UNITS]
extra['resources']=[
['Council of Europe','Descriptores del MCER','Referencia de capacidades B2; este material no concede una certificación.','https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale','CE'],
['British Council','Gramática B1–B2','Explicaciones y práctica complementaria.','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2','BC'],
['British Council','Writing B2','Modelos y tareas de escritura complementarios.','https://learnenglish.britishcouncil.org/free-resources/writing/b2','BC'],
['Cambridge English','B2 First: formato','Consulta el formato oficial si tu objetivo es preparar ese examen. Las pruebas de esta página son propias.','https://www.cambridgeenglish.org/es/exams-and-tests/first/exam-format/','CE']]
extra['packs']={
 'Matizar una opinión':[['to some extent','hasta cierto punto','💬'],['on balance','considerándolo todo','💬'],['it seems likely that','parece probable que','💬'],['there is little evidence that','hay poca evidencia de que','💬'],['that does not necessarily mean','eso no significa necesariamente','💬'],['from the perspective of','desde la perspectiva de','💬']],
 'Negociar y aclarar':[['provided that','siempre que','🤝'],['could we compromise on','podríamos llegar a un acuerdo sobre','🤝'],['what I meant was','lo que quería decir era','🤝'],['just to clarify','solo para aclarar','🤝'],['if I understand correctly','si entiendo bien','🤝'],['let us weigh up the options','sopesemos las opciones','🤝']],
 'Organizar un argumento':[['the main drawback','el principal inconveniente','🧩'],['a contributing factor','un factor que contribuye','🧩'],['a plausible explanation','una explicación plausible','🧩'],['in the long run','a largo plazo','🧩'],['taking everything into account','teniendo todo en cuenta','🧩'],['this raises the question of','esto plantea la cuestión de','🧩']]}
extra['pronunciation'] += [
 ['Énfasis y contraste','I said Tuesday, not Thursday.','Destaca la información que corrige un malentendido. No pronuncies todo con la misma fuerza.','I said Tuesday, not Thursday.','I said Tuesday, not Thursday morning.'],
 ['Cortesía y entonación','Could I add something?','La intención también se comunica mediante el ritmo, las pausas y el contexto. Las voces sintéticas no cubren toda la variación humana.','Could I add something?','Would you mind clarifying that?'],
 ['Grupos de consonantes','next step · asked them','Practica despacio y luego dentro de una frase; conserva la claridad sin añadir una vocal entre cada consonante.','What is the next step?','I asked them to confirm.']]
deep=[]
for u in UNITS:
 q=u['questions'][0]
 correct=q['prompt'].replace('___',q['answer'])
 wrong=q['prompt'].replace('___',q['options'][1])+' [en este contexto]'
 deep.append({'id':u['id'],'readTitle':f"Caso {u['id']}: {u['title']}",
 'insights':[{'title':r['title'],'text':r['text']+' '+r['tip']} for r in u['rules']],
 'contrast':[correct,wrong,q['why']], 'text':u['case'],
 'facts':[[q['prompt'],q['answer']] for q in u['caseQuestions'][:3]],
 'transfer':[u['mission'],u['writing'],'Lee el caso, explica su conclusión a alguien que no lo haya leído y distingue evidencia de interpretación.'],
 'challenge':u['writing']+' Revisa tu borrador con el modelo y escribe una segunda versión sin copiar sus frases.',
 'glossary':u['vocab'][:6]})
for name,data in [('course-b2.json',{'units':UNITS,'extra':extra}),('deep-b2.json',deep)]:
 (ROOT/'src'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
stories=json.loads((ROOT/'src/stories.json').read_text());stories=[s for s in stories if s['level']!='b2']
NEW_STORIES=[('Un titular incompleto',[
('By the time the headline reached our group, hundreds of people had already shared it.','Cuando el titular llegó a nuestro grupo, cientos de personas ya lo habían compartido.'),
('It claimed that the local library would close, although the attached notice referred only to one room.','Afirmaba que la biblioteca cerraría, aunque el aviso adjunto se refería solo a una sala.'),
('Had we read the date carefully, we would have noticed that the notice was several months old.','Si hubiéramos leído la fecha con atención, habríamos notado que el aviso tenía varios meses.'),
('Rather than blame the person who posted it, we checked the library website together.','En lugar de culpar a quien lo publicó, consultamos juntos la web de la biblioteca.'),
('A newer update explained that the repairs had been completed ahead of schedule.','Un aviso más reciente explicaba que las reparaciones habían terminado antes de lo previsto.'),
('We shared the correction, making clear which part of the original claim was unsupported.','Compartimos la corrección y aclaramos qué parte de la afirmación original carecía de respaldo.')],
'¿Qué cambió su interpretación?','Comprobar el alcance y la fecha del aviso.',['Que mucha gente lo compartiera.','Comprobar el alcance y la fecha del aviso.','Que el titular fuera breve.']),
('Un acuerdo con condiciones',[
('The team had been negotiating for an hour when Nia suggested separating needs from preferences.','El equipo llevaba una hora negociando cuando Nia sugirió separar necesidades de preferencias.'),
('One group needed a quiet room, whereas the other preferred to meet close to the entrance.','Un grupo necesitaba una sala tranquila, mientras que el otro prefería reunirse cerca de la entrada.'),
('Both requirements could be met, provided that the smaller room was available after six.','Se podían satisfacer ambos requisitos siempre que la sala pequeña estuviera disponible después de las seis.'),
('The manager agreed to reserve it on a trial basis instead of making a permanent commitment.','El encargado aceptó reservarla a modo de prueba en lugar de comprometerse de forma permanente.'),
('By the following month, they would have collected enough feedback to review the arrangement.','Para el mes siguiente habrían reunido suficientes comentarios para revisar el acuerdo.'),
('What mattered most was that everyone understood what had been agreed and what remained uncertain.','Lo más importante era que todos entendieran lo acordado y lo que seguía siendo incierto.')],
'¿Qué permite la prueba temporal?','Evaluar el acuerdo antes de hacerlo permanente.',['Evitar recoger opiniones.','Evaluar el acuerdo antes de hacerlo permanente.','Prometer que no habrá cambios.']),
('Una reseña que ayuda',[
('I had been looking forward to the exhibition, so I was disappointed by the crowded entrance.','Esperaba con ilusión la exposición, así que me decepcionó la entrada abarrotada.'),
('Once inside, however, I found a collection of interviews that changed my view of the neighbourhood.','Una vez dentro encontré, sin embargo, entrevistas que cambiaron mi visión del barrio.'),
('The most memorable stories were told by residents whose experiences rarely appear in guidebooks.','Las historias más memorables eran de vecinos cuyas experiencias apenas aparecen en las guías.'),
('Although the final section felt rushed, the exhibition gave visitors plenty to discuss.','Aunque la sección final parecía apresurada, la exposición daba mucho que comentar.'),
('I would recommend booking an early session if you prefer to explore at your own pace.','Recomendaría reservar una sesión temprana si prefieres explorar a tu ritmo.'),
('A useful review should explain who might enjoy an experience, rather than simply announce that it is good.','Una reseña útil debe explicar a quién podría gustarle la experiencia, en vez de limitarse a decir que es buena.')],
'¿Qué hace útil la recomendación?','Relaciona la experiencia con las preferencias del visitante.',['Solo dice que todo fue perfecto.','Relaciona la experiencia con las preferencias del visitante.','Oculta la dificultad de la entrada.'])]
for title,lines,question,answer,options in NEW_STORIES:
 stories.append({'id':len(stories),'level':'b2','title':title,'lines':[{'en':en,'es':es}for en,es in lines],'question':question,'answer':answer,'options':options})
(ROOT/'src/stories.json').write_text(json.dumps(stories,ensure_ascii=False,indent=2)+'\n')
print('Built',len(UNITS),'units;',sum(len(u['vocab']) for u in UNITS),'vocabulary entries;',len(deep),'workshops;',len(NEW_STORIES),'microstories')
