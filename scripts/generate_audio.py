"""Generate bundled speech from official Supertonic 3 assets; never used by the learner's browser."""
import os
os.environ['ORT_DISABLE_TELEMETRY']='1'
os.environ['HF_HUB_OFFLINE']='1'
import argparse,sys,json,subprocess,hashlib
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--model',required=True);p.add_argument('--workers',type=int,default=3);p.add_argument('--worker',type=int,default=-1);a=p.parse_args()
root=Path(__file__).resolve().parents[1]
if a.worker<0:
 children=[subprocess.Popen([sys.executable,__file__,'--model',a.model,'--workers',str(a.workers),'--worker',str(i)]) for i in range(a.workers)]
 codes=[c.wait() for c in children];sys.exit(0 if all(x==0 for x in codes) else 1)
import numpy as np
import onnxruntime as ort
import tts_helper as helper
ort.disable_telemetry_events()
assets=Path(a.model).resolve();opts=ort.SessionOptions();opts.intra_op_num_threads=2;opts.inter_op_num_threads=1;opts.enable_cpu_mem_arena=False;opts.enable_mem_pattern=False
sessions=helper.load_onnx_all(str(assets/'onnx'),opts,['CPUExecutionProvider'])
tts=helper.TextToSpeech(helper.load_cfgs(str(assets/'onnx')),helper.load_text_processor(str(assets/'onnx')),*sessions)
styles={p.stem:helper.load_voice_style([str(p)]) for p in (assets/'voice_styles').glob('*.json')}
plan=list({x['file']:x for x in json.loads((root/'scripts/audio-plan.json').read_text())}.values())
count=0
for c in plan[a.worker::a.workers]:
 dst=root/'public/assets/voices'/c['file']
 if dst.exists() and dst.stat().st_size>1000:continue
 np.random.seed(int(hashlib.sha256(c['file'].encode()).hexdigest()[:8],16))
 wav,duration=tts(c['text'],'en',styles[c['voice']],10,1.03)
 data=wav[0,:int(duration[0]*tts.sample_rate)].astype('<f4')
 if len(data)<4000 or not np.isfinite(data).all():raise RuntimeError('Invalid generated audio: '+c['file'])
 tmp=dst.with_suffix('.part.mp3')
 r=subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','f32le','-ar',str(tts.sample_rate),'-ac','1','-i','pipe:0','-af','loudnorm=I=-18:TP=-2:LRA=9','-ar','44100','-ac','1','-c:a','libmp3lame','-b:a','80k',str(tmp)],input=data.tobytes(),capture_output=True)
 if r.returncode:raise RuntimeError(r.stderr.decode())
 tmp.replace(dst);count+=1
 if count%50==0:print('voice worker',a.worker,count,'done',flush=True)
print('voice worker',a.worker,'complete',count,flush=True)
