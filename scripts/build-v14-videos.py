"""Build eight original audiovisual lessons from the course's existing voice clips.
Video art is new; voice lines are taken from the project's own recorded dialogue catalog.
Requires Pillow, pydub, opencv-python and ffmpeg. Run only when replacing video material.
"""
from pathlib import Path
import json, math, re, subprocess
from PIL import Image,ImageDraw,ImageFont
from pydub import AudioSegment
import cv2
import numpy as np
root=Path(__file__).resolve().parents[1]
voices=json.loads((root/'src/recorded-voices.json').read_text())['entries']
bytext={k.split('\n',1)[1]:v for k,v in voices.items() if '\n' in k}
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
F=lambda s,b=False: ImageFont.truetype(bold if b else font,s)
questions={
 'a1-v1':('What does Ben ask first?',['Where are you from?','What is your name?','What time is it?'],'What is your name?'),
 'a1-v2':('Is the speaker a student?',['Yes, they are.','No, they are not.','It is not mentioned.'],'Yes, they are.'),
 'a2-v1':('Where does the student usually study?',['In a library.','In a café.','At a gym.'],'In a library.'),
 'a2-v2':('What is the new flatmate like?',['Friendly and patient.','Shy and quiet.','Busy and impatient.'],'Friendly and patient.'),
 'b1-v1':('What does Sam find difficult?',['Writing emails.','Fast conversations.','Reading maps.'],'Fast conversations.'),
 'b1-v2':('Why was Sam late?',['Sam lost a ticket.','Sam forgot a phone in a café.','The bus was cancelled.'],'Sam forgot a phone in a café.'),
 'b2-v1':('How has Sam been getting on?',['Worse than before.','Better, but some jokes are still difficult.','Perfectly, without any difficulties.'],'Better, but some jokes are still difficult.'),
 'b2-v2':('What is not yet confirmed?',['The speakers.','Two rooms.','The event date.'],'Two rooms.')
}
colors={'a1':((255,231,219),(231,88,99)),'a2':((219,239,255),(77,126,210)),'b1':((228,242,232),(72,138,111)),'b2':((234,222,247),(122,83,166))}
output=root/'public/assets/v14-video';output.mkdir(parents=True,exist_ok=True)
index=[]
for level,filename in [('a1','course.json'),('a2','course-a2.json'),('b1','course-b1.json'),('b2','course-b2.json')]:
 course=json.loads((root/'src'/filename).read_text());bg,ink=colors[level]
 for count,unit in enumerate(course['units'][:2],1):
  vid=f'{level}-v{count}';segments=[];lines=[];t=0.0
  for role,text in unit['dialogue'][:6]:
   fn=bytext.get(text)
   if not fn:raise ValueError(f'Voice clip missing {vid}: {text}')
   sound=AudioSegment.from_file(root/'public/assets/voices'/fn);seconds=(len(sound)+280)/1000
   segments.append(sound+AudioSegment.silent(duration=280));lines.append({'speaker':role,'text':text,'start':round(t,3),'end':round(t+seconds,3)});t+=seconds
  audio=sum(segments,AudioSegment.silent(duration=100))
  wav=output/(vid+'.wav');audio.export(wav,format='wav')
  fps=8;W,H=640,360;tmp=output/(vid+'-silent.mp4');outfile=output/(vid+'.mp4')
  writer=cv2.VideoWriter(str(tmp),cv2.VideoWriter_fourcc(*'mp4v'),fps,(W,H));assert writer.isOpened()
  frames=[]
  for i,line in enumerate(lines):
   im=Image.new('RGB',(W,H),bg);d=ImageDraw.Draw(im)
   d.rounded_rectangle((24,19,616,341),radius=24,fill='white')
   d.rounded_rectangle((24,19,616,82),radius=24,fill=ink)
   d.rectangle((24,55,616,82),fill=ink)
   d.text((48,40),f'HELLO ENGLISH  /  {level.upper()}',font=F(19,True),fill='white')
   d.text((48,100),f'VIDEO LESSON {count:02d}',font=F(15,True),fill=ink)
   d.text((48,129),unit['title'][:34],font=F(24,True),fill=(42,48,70))
   # Two illustrated conversational avatars, animated in post by a subtle sound wave.
   for person,(cx,col) in enumerate([(210,(255,177,119)),(430,(139,179,224))]):
    d.ellipse((cx-46,196,cx+46,288),fill=col,outline=(87,91,119),width=3)
    d.ellipse((cx-27,180,cx+27,235),fill=(255,223,186))
    d.arc((cx-27,168,cx+27,207),185,353,fill=(77,69,72),width=7)
    d.ellipse((cx-11,208,cx-8,213),fill=(48,48,62))
    d.ellipse((cx+8,208,cx+11,213),fill=(48,48,62))
    d.arc((cx-10,214,cx+10,227),0,180,fill=(93,67,68),width=2)
    if i%2==person:d.ellipse((cx-55,176,cx+55,295),outline=ink,width=5)
   d.text((210,308),'SPEAKER 1',anchor='mm',font=F(12,True),fill=(65,75,100))
   d.text((430,308),'SPEAKER 2',anchor='mm',font=F(12,True),fill=(65,75,100))
   frames.append(np.asarray(im)[:,:,::-1].copy())
  for frame in range(math.ceil(len(audio)/1000*fps)):
   time=frame/fps;idx=min(len(lines)-1,next((i for i,l in enumerate(lines) if l['start']<=time<l['end']),len(lines)-1));im=frames[idx].copy()
   # Animated listening indicator and timeline.
   for b in range(9):
    h=8+int(12*(.5+.5*math.sin(frame*.45+b*.75)))
    cv2.rectangle(im,(286+b*8,278-h),(291+b*8,278),ink[::-1],-1)
   cv2.rectangle(im,(48,330),(592,334),(225,226,230),-1)
   cv2.rectangle(im,(48,330),(48+int(544*min(time/(len(audio)/1000),1)),334),ink[::-1],-1)
   writer.write(im)
  writer.release()
  command=['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(tmp),'-i',str(wav),'-c:v','libx264','-preset','veryfast','-crf','25','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart','-shortest',str(outfile)]
  subprocess.run(command,check=True)
  tmp.unlink();wav.unlink()
  q,opts,answer=questions[vid]
  index.append({'id':vid,'level':level,'title':unit['title'],'file':'assets/v14-video/'+vid+'.mp4','duration':round(len(audio)/1000),'lines':lines,'question':q,'options':opts,'answer':answer})
  print(vid,len(audio)//1000,'s',round(outfile.stat().st_size/1024),'KiB',flush=True)
(root/'src/v14-videos.json').write_text(json.dumps(index,ensure_ascii=False,indent=1))
