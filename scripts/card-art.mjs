// Original vector cartoons for navigation cards. Not clinical illustrations.
// Keep these independent from the licensed clinical figures inside each guide.
import {customCards} from './card-art-custom.mjs';
import {reviewedCards} from './card-art-reviewed.mjs';
const ink='#345d59', coral='#e88475', blue='#79b9ca', gold='#edbf65';
const palette={anterior:['#e5f0e8','#b6d9c4'],cataract:['#f7edd9','#eed8a4'],glaucoma:['#e6eaeF','#c3cde0'],retina:['#f6e5df','#edc0b1'],pediatric:['#e5eff0','#b6d9de'],other:['#eee8f1','#d8c4df']};
export const cardConcepts={
  'conjunctivitis':['red','eye'],
  'allergic-conjunctivitis':['red','pollen'],
  'infectious-keratoconjunctivitis':['red','germ'],
  'stye':['stye','compress'],
  'stye-incision':['stye','procedure'],
  'subconjunctival-hemorrhage':['blood','spot'],
  'tearing':['tears','drop'],
  'dry-eye':['dry','tear-layers'],
  'artificial-tears':['calm','bottle'],
  'mucin-secretagogues':['calm','mucin'],
  'dry-eye-anti-inflammatory':['calm','shield'],
  'serum-eye-drops':['calm','serum'],
  'ipl':['calm','ipl'],
  'punctal-plugs':['tears','plug'],
  'blepharitis':['lid','lid'],
  'demodex':['lid','mite'],
  'pterygium':['wing','wing'],
  'keratitis':['sore','cornea'],
  'contact-lens-keratitis':['sore','contact'],
  'cataract':['calm','lens'],
  'cataract-timing':['calm','lens-calendar'],
  'presbyopia':['calm','book'],
  'presbyopia-eye-drops':['calm','pinhole'],
  'glaucoma-basics':['calm','nerve'],
  'glaucoma-risk-factors':['calm','risk'],
  'glaucoma-lifestyle':['calm','walking'],
  'glaucoma-progression':['calm','monitor'],
  'glaucoma-treatment':['calm','therapy'],
  'glaucoma-prognosis':['calm','followup'],
  'angle-closure':['calm','angle'],
  'retinal-detachment':['calm','detachment'],
  'epiretinal-membrane':['calm','membrane'],
  'macular-degeneration':['calm','amd'],
  'drusen-dry-amd':['calm','drusen'],
  'central-serous':['calm','csc'],
  'floaters-pvd':['calm','floaters'],
  'diabetic-retinopathy':['calm','diabetes'],
  'diabetic-treatment-timing':['calm','retina-calendar'],
  'intravitreal-injection':['calm','injection'],
  'prp-laser':['calm','laser'],
  'diabetic-macular-edema':['calm','edema'],
  'retinal-vein-occlusion':['calm','vein'],
  'macular-hole':['calm','hole'],
  'child-myopia':['glasses','distance'],
  'myopia-prevalence':['glasses','chart'],
  'amblyopia':['calm','patch'],
  'strabismus':['pair','gaze'],
  'eyelid-twitch':['twitch','waves'],
  'uveitis':['sore','uvea'],
  'ptosis':['droop','lid-height'],
  'trichiasis':['lashes','lashes']
};
const line=(d,color=ink,width=3)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const circle=(x,y,r,fill,stroke=ink,w=2.5)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const drop=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-18C-3-10-14 0-14 9a14 14 0 0 0 28 0C14 0 3-10 0-18Z" fill="${blue}" stroke="${ink}" stroke-width="2.8"/>${line('M-6 7q-3 7 3 9','#eaf9ff',3)}</g>`;
function eye(kind='calm',cx=136,cy=98,scale=1,gazeX=0){
  const shape='M-78 0C-43-53 40-57 80 0C43 50-43 49-78 0Z';
  let detail='';
  if(['red','sore'].includes(kind))detail+=`<g clip-path="url(#white)">${line('M-73-8l22 5-5-16m8 40-15-7m132-24-23 6 5-15m-1 35 18-6',coral,3)}</g>`;
  if(kind==='blood')detail+='<path d="M42-24Q63-16 73 0L56 18 40 14 33-4Z" fill="#dc6b61"/>';
  if(kind==='wing')detail+='<path d="M-68-19L-21 0-68 19Q-56 0-68-19Z" fill="#e6b2a1" stroke="#ca8a7c" stroke-width="2"/>';
  if(kind==='stye')detail+=`<ellipse cx="47" cy="-31" rx="13" ry="10" fill="${coral}" stroke="${ink}" stroke-width="3"/>${line('M44-35q5-2 8 2','#fbc4ab',3)}`;
  if(kind==='lid')detail+=`<path d="M-61-21q61-53 122 1" fill="none" stroke="#e8ba88" stroke-width="8"/>${[-45,-25,0,25,45].map(x=>circle(x,-37+Math.abs(x)*.22,2.6,gold,ink,1)).join('')}`;
  if(kind==='dry')detail+=line('M-48 21l8 3m-13-14 8 3m81 9 8-2m-1-11 8-2',gold,3);
  if(kind==='tears')detail+=drop(58,31,.65);
  if(kind==='twitch')detail+=line('M-60-55q-8-5-10-12m104 9 9-13m9 33 12-5',coral,3.5);
  if(kind==='droop')detail+='<path d="M-78 0C-43-53 40-57 80 0Q3 13-78 0Z" fill="#d9c1d4" stroke="#345d59" stroke-width="3.4"/>';
  if(kind==='lashes')detail+=line('M-53-27l20 26m-6-37 14 28m-4-34 10 29','#564c4b',3.5);
  return `<g transform="translate(${cx} ${cy}) rotate(-5) scale(${scale})"><defs><clipPath id="white"><path d="${shape}"/></clipPath></defs><path d="${shape}" fill="#fffdf5" stroke="${ink}" stroke-width="3.8"/><g transform="translate(${gazeX} 0)">${circle(0,-2,29,'#8ebfae',ink,3)}${circle(0,-2,20,'#5b9d91','none',0)}${circle(0,-2,12,'#315b58','none',0)}${circle(-8,-12,7,'#fffdf5','none',0)}${circle(8,5,3,'#fffdf5','none',0)}</g>${detail}${line('M-57 35q57 27 111-2','#7fa394',2.4)}${line(kind==='sore'?'M-48-59q22-13 40-4M18-66q19 2 35 13':'M-48-57q22-17 42-11M20-68q19 0 34 12',ink,3)}${kind==='glasses'?`<rect x="-89" y="-42" width="178" height="86" rx="36" fill="none" stroke="${ink}" stroke-width="6"/>${line('M-100-13h12m176 0h12',ink,5)}`:''}</g>`;
}
function bottle(){return `<rect x="-13" y="-14" width="26" height="40" rx="7" fill="#aed9d3" stroke="${ink}" stroke-width="3"/><path d="M-7-14v-10h14v10" fill="#fffdf5" stroke="${ink}" stroke-width="3"/>${line('M-8-25v-6h16v6',ink,3)}<rect x="-8" y="-1" width="16" height="15" rx="3" fill="#fffdf5"/>${line('M-4 6h8',blue,3)}`;}
function calendar(){return `<rect x="-27" y="-23" width="54" height="50" rx="8" fill="#fffdf5" stroke="${ink}" stroke-width="3"/><path d="M-25-10h50" stroke="${coral}" stroke-width="9"/>${line('M-13-28v11m26-11v11',ink,4)}${[-13,0,13].map(x=>[-1,13].map(y=>circle(x,y,2.3,'#a1b7ac','none',0)).join('')).join('')}`;}
function retina(type){
  const backing='<path d="M-29 15q29-9 58 0v10q-29-8-58 0Z" fill="#edbc9f"/>';
  const base=backing+line('M-29 14q29-8 58 0','#bb766b',3);
  if(type==='detachment')return base+`<path d="M-29 2Q-12-30 6-22L28 1" fill="none" stroke="${coral}" stroke-width="7"/>${line('M-10-12l7-14 12 5',ink,2)}`;
  if(type==='membrane')return base+`<path d="M-29 2q7-13 14-2t14 0t14 0t16 0" fill="none" stroke="${coral}" stroke-width="7"/>${line('M-28-17q13-5 27 0t28 0','#7a9d8e',3.5)}`;
  if(type==='csc')return base+`<path d="M-29 1h9Q0-33 20 1h9" fill="#b9dce1" stroke="${coral}" stroke-width="6"/>`;
  if(type==='edema')return base+`<path d="M-28-13q28-16 56 0v22q-28-8-56 0Z" fill="#efb5a8" stroke="${coral}" stroke-width="2.5"/>${[-14,3,17].map((x,i)=>`<ellipse cx="${x}" cy="${i%2?-7:-4}" rx="6" ry="8" fill="#e7f3f4" stroke="#80b6bd" stroke-width="1.6"/>`).join('')}`;
  if(type==='hole')return base+`<path d="M-29-3h16q5 2 5 14m16 0q0-12 5-14h16" fill="none" stroke="${coral}" stroke-width="7"/>${line('M-4-23h8m-4-5v10','#b06b62',2.5)}`;
  if(['amd','drusen'].includes(type))return base+`<path d="M-29-2h8q5-3 9-9t11 0 13 6h17" fill="none" stroke="#b77d73" stroke-width="5"/>${[[-12,5,5],[0,0,6],[13,6,4]].map(([x,y,r])=>circle(x,y,r,gold,'#c89d42',1.4)).join('')}`;
  return base;
}
function symbol(type){
  if(['detachment','membrane','csc','edema','hole','amd','drusen'].includes(type))return retina(type);
  switch(type){
    case 'eye':return `<path d="M-30 0q30-35 60 0-30 34-60 0Z" fill="#fffaf3" stroke="${coral}" stroke-width="3"/>${circle(0,0,11,'#e9bcb2',coral,3)}`;
    case 'pollen':return `<g fill="${gold}" stroke="#b59b56" stroke-width="2">${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-18" rx="8" ry="12" transform="rotate(${a})"/>`).join('')}</g>${circle(0,0,10,'#f9e2a5',ink,2)}`;
    case 'germ':return line('M0-33v8m0 50v8M-33 0h8m50 0h8M-24-24l7 7m34 34 7 7m-48 0 7-7m34-34 7-7',coral,3.5)+circle(0,0,23,'#eaa99c',ink,2.5)+circle(-8,-4,4,'#bc766a','none',0)+circle(9,7,5,'#bc766a','none',0);
    case 'compress':return `<rect x="-29" y="-15" width="58" height="36" rx="10" fill="#f4d49a" stroke="${ink}" stroke-width="3"/>${line('M-20-5h40m-40 9h40m-40 9h40','#d1aa6d',2)}${line('M-12-23q-5-6 0-12m13 12q-5-6 0-12',coral,2.5)}`;
    case 'procedure':return `<path d="M-25 17q25-30 50 0" fill="#edc0ad" stroke="${ink}" stroke-width="3"/>${line('M-12 8h21',coral,4)}<path d="M20-29l8 6-23 29-7-5Z" fill="#a7c9cb" stroke="${ink}" stroke-width="2.5"/>`;
    case 'spot':return `<path d="M-29-3q29-28 58 0-29 30-58 0Z" fill="#fffaf3" stroke="${ink}" stroke-width="3"/><path d="M8-15l16 9-3 12-18 4-7-8Z" fill="#da6c61"/>`;
    case 'drop':return drop(0,-2,1.25);
    case 'tear-layers':return `<rect x="-33" y="-25" width="66" height="10" fill="#edbf65"/><rect x="-33" y="-15" width="66" height="45" fill="#d5e3e5"/><text y="-16" font-size="9" fill="#6b5313" text-anchor="middle">기름 성분</text><text y="10" font-size="10" fill="#466963" text-anchor="middle">물·뮤신 혼합</text>`;
    case 'breeze':return line('M-29-12h41q17 0 12-12M-34 1h30q18 0 16 11M-28 18h18',blue,4)+circle(27,20,5,gold,'none',0);
    case 'bottle':return bottle();
    case 'mucin':return `<path d="M-27 17Q0 2 27 17" fill="none" stroke="${blue}" stroke-width="8"/>${[-20,0,20].map(x=>`<path d="M${x} 12v-19m0 2-9-11m9 11 9-11" stroke="#b48bb5" stroke-width="3" fill="none"/>${circle(x-9,-18,3,'#d9bdd7','none',0)}${circle(x+9,-18,3,'#d9bdd7','none',0)}`).join('')}`;
    case 'shield':return `<path d="M0-29 27-18v22Q22 22 0 31-22 22-27 4v-22Z" fill="#c7e1d4" stroke="${ink}" stroke-width="3"/>${line('M-7-12v23M7-17v31','#77a896',3)}${circle(0,0,8,'#fffdf5',ink,2)}`;
    case 'serum':return `<rect x="-13" y="-22" width="26" height="49" rx="7" fill="#fffdf5" stroke="${ink}" stroke-width="3"/><path d="M-10 2h20v15q-10 15-20 0Z" fill="${gold}"/><path d="M-15-28h30v9h-30Z" fill="#d1ddde" stroke="${ink}" stroke-width="2"/>${line('M-6-9h7',coral,3)}`;
    case 'ipl':return `<path d="M-27-21h24v24h-24Z" fill="#e5d9c8" stroke="${ink}" stroke-width="3"/><path d="M-3-17h10v16H-3Z" fill="${gold}" stroke="${ink}" stroke-width="2"/>${line('M15-17l11-5M17-9h14M15-1l12 5',gold,3)}${line('M-26 25q26-12 52 0',coral,5)}`;
    case 'plug':return `<path d="M-24-8q11 13 24 13t24-13" fill="none" stroke="${blue}" stroke-width="7"/>${line('M-4 8v22','#a9c2bf',4)}<path d="M-8-5H8v10H3v13h-6V5h-5Z" fill="#e4b7ab" stroke="${ink}" stroke-width="2.5"/>`;
    case 'lid':return `<path d="M-29 6q29-42 58 0" fill="none" stroke="${ink}" stroke-width="5"/>${[-20,-7,7,20].map(x=>circle(x,-10+Math.abs(x)*.3,4,gold,'#b19460',1.5)).join('')}${line('M-27 18q27 15 54 0',coral,3)}`;
    case 'mite':return `<ellipse cy="-2" rx="12" ry="25" fill="#e6c18c" stroke="${ink}" stroke-width="2.5"/>${line('M-12-13l-9-6m9 15-10-2m10 10-9 6m9 2-8 9M12-13l9-6m-9 15 10-2m-10 10 9 6m-9 2 8 9',ink,2)}${line('M-8 6h16m-15 6h14','#be9b68',2)}`;
    case 'wing':return `<path d="M-28-21L23 0-28 21Q-11 0-28-21Z" fill="#edb4a0" stroke="${ink}" stroke-width="3"/>${line('M-20-10 9 0-20 10','#c98272',2)}`;
    case 'contact':return `<ellipse cy="3" rx="29" ry="17" fill="#cee5e8" stroke="${ink}" stroke-width="3"/><path d="M-29 2q29 39 58 0" fill="#b6d6dc" stroke="${ink}" stroke-width="3"/>${line('M-15-4q15-7 30 0','#fffdf5',3)}`;
    case 'cornea':return `<path d="M-23-22q48 22 0 46Q-6 0-23-22Z" fill="#c3dfe3" stroke="${ink}" stroke-width="3"/>${circle(15,0,15,'#fffdf5',coral,2.5)}${line('M6 0h18',coral,3)}`;
    case 'lens':return `<ellipse rx="21" ry="31" fill="#e2ded0" stroke="${ink}" stroke-width="3"/><path d="M-13 1q-8-11 3-15 4-15 14-6 16-3 12 11 12 10 0 18-2 13-14 5-15 4-15-13Z" fill="#fffdf5" opacity=".92"/>${line('M-12 21q12 8 24-2','#b9b7a6',2)}`;
    case 'lens-calendar':return `<g transform="translate(11 3) scale(.8)">${calendar()}</g><g transform="translate(-22 -12) scale(.55)">${symbol('lens')}</g>`;
    case 'book':return `<path d="M0-15q-15-10-30-3v40q15-7 30 3 15-10 30-3v-40Q15-25 0-15Z" fill="#fffdf5" stroke="${ink}" stroke-width="3"/>${line('M0-15v39M-22-8l14 2m-14 9 14 2m16-11 14-2M8 5l14-2',blue,2.5)}`;
    case 'pinhole':return circle(0,0,27,'#e6d8b3',ink,3)+circle(0,0,9,ink,'none',0)+line('M-35-18l15 11m-15 25 15-11m40-14 15-11m-15 25 15 11',gold,3);
    case 'nerve':return `<path d="M-14-25q30 0 30 25T-14 25" fill="#e6c28e" stroke="${ink}" stroke-width="3"/>${line('M12-13 33-18M15 0h21M12 13l21 5','#c29462',5)}${circle(-14,0,18,'#f6e3c5',ink,2.5)}${circle(-14,0,8,'#d3b382','none',0)}`;
    case 'risk':return circle(0,-15,9,'#bdd6c9',ink,2.5)+circle(-21,15,8,'#d6dfbf',ink,2.5)+circle(21,15,8,'#e5c4b2',ink,2.5)+line('M-5-6-16 8M5-6l11 14M-13 15h26',ink,2.5);
    case 'walking':return `<path d="M-22-14l17 5L1 5l24 11q10 3 3 11h-56q-5-10 0-18Z" fill="#f1d299" stroke="${ink}" stroke-width="3"/>${line('M-25 20h54M-6 3l9-5m-5 13 9-5',ink,2.5)}${line('M-21-26l3-6m10 9 5-7',blue,2.5)}`;
    case 'monitor':return `<rect x="-30" y="-26" width="60" height="46" rx="6" fill="#fffdf5" stroke="${ink}" stroke-width="3"/>${line('M-22 4l11-13 11 7 12-11 10 4',blue,3)}${[-22,-11,0,12,22].map((x,i)=>circle(x,[4,-9,-2,-13,-9][i],2.3,ink,'none',0)).join('')}${line('M0 20v8m-13 0h26',ink,3)}`;
    case 'therapy':return `<g transform="translate(-14 2) scale(.8)">${bottle()}</g>${line('M8-16l17-8m-13 17h20M8 3l17 8',gold,3)}${circle(21,22,8,'#c3dbcf',ink,2)}`;
    case 'followup':return `<g transform="translate(-4 1) scale(.9)">${calendar()}</g>${circle(17,18,14,'#d5e8e6',ink,2.5)}${line('M17 8v11l8 4',ink,2.5)}`;
    case 'angle':return `<path d="M-27-24 27 21H-29" fill="#d9eaeb" stroke="${ink}" stroke-width="4"/><path d="M-24 8Q3-1 21 15" fill="none" stroke="#bc9b7b" stroke-width="6"/>${line('M-3-12l8 9',coral,3)}`;
    case 'floaters':return `<rect x="-31" y="-26" width="62" height="53" rx="12" fill="#deedf0" stroke="${ink}" stroke-width="2.5"/>${line('M-21-4q-7-14 5-15t8 14M3 10q13-9 9 4t12 2','#70867f',3)}<ellipse cx="14" cy="-14" rx="8" ry="5" fill="none" stroke="#70867f" stroke-width="3"/>`;
    case 'diabetes':return `<path d="M0 28V-25m0 21-24-16M0 7l23-17M0 16l-25 7" fill="none" stroke="#c16f70" stroke-width="5"/>${[[-21,-9],[21,7],[-12,20]].map(([x,y])=>circle(x,y,3,coral,'none',0)).join('')}`;
    case 'retina-calendar':return `<g transform="translate(9 4) scale(.8)">${calendar()}</g><g transform="translate(-23 -11) scale(.55)">${symbol('diabetes')}</g>`;
    case 'injection':return `<g transform="rotate(38)"><rect x="-12" y="-24" width="24" height="35" rx="3" fill="#d0e5e7" stroke="${ink}" stroke-width="3"/>${line('M-16-29h32M0-38v9M-8-14H1m-9 8h9M0 12v26',ink,2.5)}<path d="M-6 11h12v8H-6Z" fill="${blue}" stroke="${ink}" stroke-width="2"/></g>`;
    case 'laser':return `<path d="M-28-23h21v16h-21Z" fill="#bdd5d3" stroke="${ink}" stroke-width="3"/>${line('M-7-10 14 9',gold,3)}${[[-20,20],[-4,20],[12,20],[28,20]].map(([x,y])=>circle(x,y,3,gold,'#c89d42',1.5)).join('')}${line('M-28 31q28-9 56 0',coral,4)}`;
    case 'vein':return `<path d="M-18-28 3 0-6 29M3 0l25-14M3 0l20 22" fill="none" stroke="#9a89b0" stroke-width="7"/>${circle(1,-1,8,'#edcf88',ink,2.5)}${line('M-3-5l8 8',ink,2)}`;
    case 'distance':return `<path d="M-26 19h52M-26 13v12m52-12v12" stroke="${ink}" stroke-width="2.5" fill="none"/><path d="M8-29v33m0-29h23l-6 9H8" fill="#eec47e" stroke="${ink}" stroke-width="2.5"/>${circle(-20,-12,9,'#e4d6bb',ink,2.5)}`;
    case 'chart':return line('M-28-26v53h58',ink,3)+`<rect x="-18" y="6" width="10" height="14" rx="3" fill="#88b9ac"/><rect x="-2" y="-6" width="10" height="26" rx="3" fill="#7cb2c4"/><rect x="14" y="-20" width="10" height="40" rx="3" fill="${gold}"/>`;
    case 'patch':return `<path d="M-29-12q29-19 58 0-1 37-29 39-28-2-29-39Z" fill="#d7bbd3" stroke="${ink}" stroke-width="3"/>${line('M-24-20-35-30m59 10 11-10M-20-5q20-12 40 0','#b491b0',2.5)}`;
    case 'gaze':return line('M-29 16l15-22m-4 1 5-4v8M3 16 22-6m-9 1 11-5-3 11',blue,3.5)+circle(-17,-21,6,'#b5d4c7',ink,2)+circle(19,-22,6,'#b5d4c7',ink,2);
    case 'waves':return line('M-29 0q10-28 20 0t20 0 20 0M-22 21q8-16 16 0m11-42q9-16 18 0',coral,4);
    case 'uvea':return circle(0,0,28,'#dfc8b4',ink,3)+circle(0,0,18,'#e5aea2',coral,4)+circle(0,0,9,'#477b71',ink,2);
    case 'lid-height':return `<path d="M-29 6q29-37 58 0" fill="#ddc6da" stroke="${ink}" stroke-width="4"/>${line('M-27 18q27 17 54 0M0-30v11m-6-5 6 6 6-6',ink,2.5)}`;
    case 'lashes':return `<path d="M-28 25Q-2-19 28 20" fill="none" stroke="${blue}" stroke-width="7"/>${line('M-22-24l19 27m-4-34 11 31m7-29 1 29','#67595b',3.5)}`;
    default:throw new Error(`Unknown card motif: ${type}`);
  }
}
export function cardSVG(topic){
  const concept=cardConcepts[topic.id];if(!concept)throw Error(`Card concept missing: ${topic.id}`);
  const [kind,motif]=concept,[wash,accent]=palette[topic.category];
  const backdrop=`<path d="M50 41Q91 15 139 31t56 60q4 49-42 61-59 20-101-16Q7 96 50 41Z" fill="${wash}"/><path d="M185 60q46-35 88 1t3 72q-29 30-62-5t-29-68Z" fill="${accent}" opacity=".42"/>`;
  const draw=reviewedCards[topic.id] || customCards[topic.id];
  if(draw)return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>${topic.title.replaceAll('&','&amp;').replaceAll('<','&lt;')} 카드 일러스트</title>${backdrop}${draw()}</svg>`;
  const main=kind==='pair'?eye('calm',102,101,.64)+eye('calm',202,104,.64,-15):eye(kind);
  const left=motif==='pollen'?symbol('pollen'):motif==='germ'?symbol('germ'):motif==='breeze'?symbol('breeze'):motif==='book'?symbol('book'):motif==='floaters'?symbol('floaters'):motif==='lens'?symbol('lens'):null;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>${topic.title.replaceAll('&','&amp;').replaceAll('<','&lt;')} 카드 일러스트</title><path d="M50 41Q91 15 139 31t56 60q4 49-42 61-59 20-101-16Q7 96 50 41Z" fill="${wash}"/><path d="M185 60q46-35 88 1t3 72q-29 30-62-5t-29-68Z" fill="${accent}" opacity=".42"/><ellipse cx="139" cy="153" rx="64" ry="7" fill="${accent}" opacity=".36"/>${circle(279,38,4,accent,'none',0)}${circle(38,132,5,accent,'none',0)}${line('M52 35v10m-5-5h10',accent,2.5)}${main}<g transform="translate(247 111)"><circle cy="4" r="43" fill="${accent}" opacity=".55"/><circle r="43" fill="#fffdf5" stroke="${ink}" stroke-width="2.5"/>${symbol(motif)}</g>${left?`<g transform="translate(53 58) rotate(-13) scale(.45)">${left}</g>`:''}</svg>`;
}
