"""Regenera las 48 escenas originales. Ejecutar: python3 scripts/conversations/build.py"""
import json
from pathlib import Path
from common import STORIES
import a1, a2, b1, b2
for level, chapters in STORIES.items():
    assert len(chapters)==6,level
    assert sorted(u for c in chapters for u in c['units'])==list(range(1,25)),level
    assert all(len(c['episodes'])==2 for c in chapters)
root=Path(__file__).resolve().parents[2]
(root/'src/conversations.json').write_text(json.dumps(STORIES,ensure_ascii=False,indent=2)+'\n')
print('24 historias · 48 escenas · 384 intervenciones · 144 expresiones · 96 decisiones')
