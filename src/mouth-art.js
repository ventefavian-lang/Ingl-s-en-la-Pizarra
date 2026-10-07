// Ilustración vectorial original. Posiciones didácticas aproximadas, no simulación clínica.
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const mouthParts={tongue:['Lengua','La punta, la lámina y la parte posterior pueden moverse de forma distinta. Observa dónde hay contacto y dónde queda un espacio para el aire.'],lips:['Labios','Compara apertura, redondeamiento y cierre. En /f, v/, el labio inferior se acerca a los dientes superiores. No fuerces una sonrisa o una tensión excesiva.'],palate:['Paladar','La zona justo detrás de los dientes es el reborde alveolar; más atrás están el paladar duro y el paladar blando o velo. Distintos sonidos usan diferentes zonas.'],teeth:['Dientes','Sirven de referencia para /θ, ð/ y participan en /f, v/. La lengua o el labio se acercan suavemente; no necesitas morder ni presionar con fuerza.'],air:['Aire','Una oclusiva cierra el paso y después lo libera. Una fricativa estrecha el paso. Las nasales dejan salir aire por la nariz. En /l/, el aire pasa por los lados de la lengua.'],voice:['Voz','La vibración de los pliegues vocales distingue muchos pares. Apoya suavemente los dedos en el cuello para explorar la vibración, sin apretar. No se mide con este dibujo.']};
export function naturalMouthSVG(s,p,phase=0,{view='both',labels=true,air=true,tongue=true}={}){
 const [tx,ty,mx,my,bx,by]=p.tongue;
 const closed=p.lip==='closed',rounded=p.lip==='round',dental=s.place==='dental',bite=s.place==='labiodental';
 const opening=p.aperture??(closed?1.8:p.lip==='open'?37:rounded?26:bite?11:dental?19:20);
 const width=p.width??(rounded?45:p.lip==='spread'?94:82);
 const flow=!((s.manner==='stop'&&phase<.6)||(s.manner==='affricate'&&phase<.3));
 const voiced=s.voiced&&(!['stop','affricate'].includes(s.manner)||phase>.5);
 const title=`Articulación aproximada de /${s.ipa}/. ${s.tip}`;
 const openingPath=`M ${-width} 0 C ${-width*.6} ${-opening*.9} ${width*.6} ${-opening*.9} ${width} 0 C ${width*.66} ${opening*1.45} ${-width*.66} ${opening*1.45} ${-width} 0Z`;
 const defs=`<defs>
 <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fce8d6"/><stop offset=".45" stop-color="#e9bda3"/><stop offset="1" stop-color="#ca8f78"/></linearGradient>
 <radialGradient id="skinLight"><stop stop-color="#ffeadd"/><stop offset="1" stop-color="#e6b599"/></radialGradient>
 <linearGradient id="lipTop" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#a34d59"/><stop offset=".6" stop-color="#d68088"/><stop offset="1" stop-color="#7c3644"/></linearGradient>
 <linearGradient id="lipBottom" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b55c68"/><stop offset=".45" stop-color="#eb9ba0"/><stop offset="1" stop-color="#c56f79"/></linearGradient>
 <linearGradient id="tongueTone" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f4a4a6"/><stop offset=".65" stop-color="#dc6d80"/><stop offset="1" stop-color="#a64c64"/></linearGradient>
 <linearGradient id="teethTone" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fffcf0"/><stop offset="1" stop-color="#dcd8d2"/></linearGradient>
 <radialGradient id="cavityTone"><stop stop-color="#692939"/><stop offset="1" stop-color="#301c2a"/></radialGradient>
 <linearGradient id="panelTone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4f8f8"/><stop offset="1" stop-color="#e5efef"/></linearGradient>
 <clipPath id="frontOpening"><path d="${openingPath}"/></clipPath>
 <marker id="airArrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#39b8be" stroke-width="1.5"/></marker>
 </defs>`;
 const side=`<g class="mouth-side" transform="translate(22 92)">
 <path d="M124 -30 Q189 -66 269 -33 Q330 -11 330 63 L319 232 L260 251 L247 192 Q221 223 154 235 Q115 239 96 214 Q87 202 91 186 L80 169 Q64 164 72 153 L77 144 Q60 140 75 128 L82 118 L83 101 Q64 104 53 93 Q50 86 61 74 L85 42 Q84 10 101 -12Z" fill="url(#skin)" stroke="#bb8776" stroke-width="1.5"/>
 <path d="M98 49 Q133 28 172 41 Q159 57 128 61 Q109 58 98 49Z" fill="#be7f72" opacity=".23"/>
 <path d="M84 87 Q119 72 153 88" fill="none" stroke="#ad7166" stroke-width="2"/>
 <path d="M75 128 Q98 85 165 82 Q238 71 271 104 Q292 136 283 215 L267 240 L245 207 Q171 224 106 186 L78 159Z" fill="url(#cavityTone)"/>
 <path d="M91 112 Q115 83 168 82 Q233 75 260 91 Q270 97 270 117 Q272 128 279 124 Q284 116 277 99" fill="none" stroke="#dfb0a4" stroke-width="10" stroke-linecap="round"/>
 <path d="M101 107 Q151 73 214 84" fill="none" stroke="#f7d3bd" stroke-width="3" opacity=".8"/>
 <path d="M86 112 Q95 106 105 111 L104 137 Q96 141 87 136Z" fill="url(#teethTone)" stroke="#bfa99f" stroke-width="1"/>
 <path d="M88 ${168+opening*.1} Q98 ${164+opening*.1} 108 ${170+opening*.1} L106 ${187+opening*.1} L94 ${185+opening*.1}Z" fill="url(#teethTone)" stroke="#bfa99f"/>
 <path d="M267 218 Q210 234 121 198 Q${tx-19} ${ty+22} ${tx} ${ty} Q${mx} ${my} ${bx} ${by} Q278 148 267 218Z" fill="url(#tongueTone)" stroke="#b35068" stroke-width="2" opacity="${tongue?1:.12}"/>
 ${tongue?`<path d="M${tx+7} ${ty+12} Q${mx} ${my+14} ${bx-10} ${by+12}" fill="none" stroke="#ffc8c4" stroke-width="3" opacity=".55"/><path d="M172 208 Q200 194 239 189" fill="none" stroke="#b95470" stroke-width="1.5" opacity=".4"/>`:''}
 <path d="M83 124 Q72 126 68 137 Q75 141 82 139" fill="url(#lipTop)" stroke="#ac626b" stroke-width="1"/>
 <path d="M82 ${145+opening*.18} Q67 ${151+opening*.18} 77 ${160+opening*.18} Q89 ${165+opening*.18} 94 ${160+opening*.18}" fill="url(#lipBottom)" stroke="#ac626b" stroke-width="1"/>
 ${closed?'<path d="M69 141Q79 144 88 140" stroke="#743746" fill="none" stroke-width="2"/>':''}
 ${bite?'<path d="M82 143Q85 138 92 137" stroke="#c87881" fill="none" stroke-width="7"/>':''}
 <path d="M270 218 Q277 197 280 172" fill="none" stroke="#e5b9ab" stroke-width="6"/>
 <path d="M264 212l15 4m-17 3l14 5" stroke="${voiced?'#398b8f':'#b5877d'}" stroke-width="3" stroke-linecap="round" class="${voiced?'mouth-voice-wave':''}"/>
 ${air&&flow?`<path d="${s.manner==='nasal'?'M281 203Q305 118 253 58Q157 44 67 88':s.manner==='lateral'?'M281 203Q281 100 215 101Q149 102 110 144L38 149':`M281 203Q287 ${by-6} ${bx+5} ${by-9}Q${mx} ${my-14} ${tx} ${ty-9}Q${Math.max(100,tx-16)} ${ty-9} 109 145Q88 149 36 149`}" fill="none" stroke="#39b8be" stroke-width="3" stroke-dasharray="7 7" marker-end="url(#airArrow)" class="air-path" opacity=".9"/>`:''}
 ${labels?`<g class="mouth-svg-labels"><path d="M290 18L179 79M16 117L83 125M177 268L182 180M332 256L278 218"/><text x="268" y="8">Paladar</text><text x="-2" y="110">Dientes</text><text x="149" y="286">Lengua</text><text x="267" y="275">Pliegues vocales</text><text x="14" y="231" class="mouth-air-label">${s.manner==='nasal'?'aire por la nariz':s.manner==='lateral'?'aire por los lados (fuera de este plano)':flow?'salida de aire':'cierre del paso'}</text></g>`:''}
 </g>`;
 const front=`<g class="mouth-front" transform="translate(571 200)">
 <path d="M-109 -143 Q-142 -105 -129 -25 Q-121 78 -75 121 Q0 165 75 121 Q121 78 129 -25 Q142 -105 109 -143Z" fill="url(#skinLight)"/>
 <path d="M-109 -89Q-130 -18 -99 41M109 -89Q130 -18 99 41" fill="none" stroke="#ce9983" opacity=".3" stroke-width="4"/>
 <path d="M-24 -94 Q-29 -64 -40 -54 Q-33 -37 -14 -43 Q0 -31 14 -43 Q33 -37 40 -54 Q29 -64 24 -94" fill="url(#skin)" stroke="#c8917b" stroke-width="1"/>
 <path d="M-31 -47Q-23 -54 -14 -46M14 -46Q23 -54 31 -47" fill="none" stroke="#946258" stroke-width="4" stroke-linecap="round"/>
 <path d="M-9 -32L-13 -19M9 -32L13 -19" stroke="#b47f6e" opacity=".35" stroke-width="1.5"/>
 <ellipse cx="0" cy="${opening+27}" rx="${width*.62}" ry="8" fill="#ad7769" opacity=".14"/>
 <path d="${openingPath}" fill="url(#cavityTone)"/>
 <g clip-path="url(#frontOpening)">
 <path d="M-${width-12} ${-opening*.72} Q0 ${-opening*.9} ${width-12} ${-opening*.72} L${width-15} ${bite?11:4} Q0 ${bite?17:12} -${width-15} ${bite?11:4}Z" fill="url(#teethTone)"/>
 ${[-50,-31,-13,13,31,50].map(x=>`<path d="M${x} ${-opening*.8}L${x*.96} ${bite?12:7}" stroke="#cec5bf" stroke-width=".8"/>`).join('')}
 ${tongue?`<path d="M-58 ${opening*1.2} Q-54 ${opening*.38} 0 ${opening*.42} Q54 ${opening*.38} 58 ${opening*1.2}Z" fill="url(#tongueTone)"/><path d="M0 ${opening*.55}L0 ${opening*1.03}" stroke="#b35c72" opacity=".5"/>`:''}
 <path d="M-52 ${opening*.97} Q0 ${opening*1.16} 52 ${opening*.97} L52 ${opening*1.5}H-52Z" fill="url(#teethTone)" opacity=".88"/>
 </g>
 <path d="M-${width} 0 C-${width*.64} -${opening*.65+15} -${width*.3} -${opening*.74+19} -${width*.14} -${opening*.68+10} Q0 -${opening*.58+6} ${width*.14} -${opening*.68+10} C${width*.3} -${opening*.74+19} ${width*.64} -${opening*.65+15} ${width} 0 C${width*.6} -${opening*.9} -${width*.6} -${opening*.9} -${width} 0Z" fill="url(#lipTop)"/>
 <path d="M-${width} 0 C-${width*.66} ${opening*1.45} ${width*.66} ${opening*1.45} ${width} 0 C${width*.66} ${opening*1.4+22} -${width*.66} ${opening*1.4+22} -${width} 0Z" fill="url(#lipBottom)"/>
 <path d="M-${width*.48} ${opening*.98+10} Q0 ${opening*1.18+17} ${width*.48} ${opening*.98+10}" stroke="#ffd0cb" fill="none" opacity=".5" stroke-width="2"/>
 ${dental&&tongue?`<path d="M-24 8 Q0 2 24 8 L24 21 Q0 35 -24 21Z" fill="url(#tongueTone)" stroke="#bc6678"/><path d="M0 13v13" stroke="#bf6a79"/>`:''}
 <path d="M-${width+3} -1Q-${width+8} 2 -${width+3} 7M${width+3} -1Q${width+8} 2 ${width+3} 7" fill="none" stroke="#956257" stroke-width="1.5" opacity=".7"/>
 ${air&&flow&&s.manner!=='nasal'?`<path d="M-18 ${opening+30}Q-21 ${opening+49} -29 ${opening+61}M18 ${opening+30}Q21 ${opening+49} 29 ${opening+61}" stroke="#39b8be" stroke-width="2.5" stroke-dasharray="5 6" fill="none" class="air-path"/>`:''}
 </g>`;
 const box=view==='front'?'396 0 364 420':view==='side'?'0 0 399 420':'0 0 760 420';
 return `<svg class="natural-mouth" viewBox="${box}" role="img" aria-label="${esc(title)}">${defs}<rect width="760" height="420" rx="24" fill="url(#panelTone)"/>${view!=='front'?'<text x="35" y="35" class="mouth-view-title">VISTA LATERAL</text><text x="35" y="55" class="mouth-view-subtitle">Posición de lengua y paso del aire</text>':''}${view!=='side'?'<text x="443" y="35" class="mouth-view-title">VISTA FRONTAL</text><text x="443" y="55" class="mouth-view-subtitle">Apertura y forma de los labios</text>':''}${view==='both'?'<path d="M401 35V381" stroke="#c9dbdb" stroke-dasharray="4 6"/>':''}${view!=='front'?side:''}${view!=='side'?front:''}<text x="${view==='front'?435:35}" y="403" class="mouth-view-subtitle">Ilustración didáctica · posiciones aproximadas · no está a escala</text></svg>`;
}

const vowels={iy:[90,75],ih:[162,122],eh:[191,205],ae:[232,282],aa:[507,294],lot:[552,288],ao:[541,206],uh:[482,132],uw:[552,75],ah:[376,251],ergb:[359,194],ax:[345,160],er:[421,181],axr:[399,142]};
export function vowelMapSVG(accent='us',chosen='iy',phase=0){
 const us=accent==='us',ids=us?['iy','ih','eh','ae','aa','ao','uh','uw','ah','ax','er','axr']:['iy','ih','eh','ae','aa','lot','ao','uh','uw','ah','ergb','ax'];
 const ipa={iy:us?'i':'iː',ih:'ɪ',eh:us?'ɛ':'e',ae:'æ',aa:us?'ɑ':'ɑː',lot:'ɒ',ao:us?'ɔ':'ɔː',uh:'ʊ',uw:us?'u':'uː',ah:'ʌ',ergb:'ɜː',ax:'ə',er:'ɝ',axr:'ɚ'};
 const tracks={ey:['eh','ih'],ay:['aa','ih'],oy:['ao','ih'],ow:['ao','uh'],owgb:['ax','uh'],aw:['aa','uh'],ia:['ih','ax'],ea:['eh','ax'],ua:['uh','ax']};
 let track='';if(tracks[chosen]){const [a,b]=tracks[chosen].map(id=>vowels[id]);const x=a[0]+(b[0]-a[0])*phase,y=a[1]+(b[1]-a[1])*phase;track=`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="#ce8940" stroke-width="5" stroke-dasharray="7 6"/><circle cx="${x}" cy="${y}" r="11" fill="#d8994f" stroke="white" stroke-width="3"/>`;}
 return `<svg class="vowel-map" viewBox="0 0 640 366" role="group" aria-label="Mapa aproximado de vocales según altura y avance de la lengua"><rect x="0" y="0" width="640" height="366" rx="20" fill="#f3f8f7"/><path d="M88 74H552V296H237Z" fill="#e1f0e9" stroke="#a7c9bc" stroke-width="2"/><path d="M137 148H552M187 222H552M320 74L395 296" fill="none" stroke="#b4d1c4" stroke-width="1.2"/><g class="vowel-axis"><text x="88" y="35">Anterior</text><text x="286" y="35">Central</text><text x="490" y="35">Posterior</text><text x="18" y="60">Alta</text><text x="17" y="320">Baja</text><text x="207" y="345">← lengua hacia delante · hacia atrás →</text></g>${track}${ids.map(id=>{let[x,y]=vowels[id];if(!us&&id==='aa')x=486;return `<g data-vowel="${id}" tabindex="0" role="button" aria-label="Elegir sonido ${ipa[id]}" aria-pressed="${id===chosen}" class="vowel-point ${id===chosen?'active':''}"><title>/${ipa[id]}/ · seleccionar sonido</title><circle cx="${x}" cy="${y}" r="23"/><text x="${x}" y="${y+7}" text-anchor="middle">${ipa[id]}</text></g>`;}).join('')}</svg>`;
}
