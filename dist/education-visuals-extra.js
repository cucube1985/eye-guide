import {tearFilmReviewed,ciliaContactReviewed} from './reviewed-visuals.js';
// Original vector illustrations added in the 2026-10-29 image review. Artwork: CC BY 4.0.
// Anterior segment, dry-eye treatment, glaucoma and presbyopia-drop explanations.
const source=(url,label)=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const svg=(id,title,description,body,box='0 0 960 500')=>`<svg class="education-svg" viewBox="${box}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${description}</desc>${body}</svg>`;
const credit=references=>`<p class="education-credit">자체 제작 모식도 · ${source('https://creativecommons.org/licenses/by/4.0/','CC BY 4.0')} · 설명 근거: ${references}</p>`;
const note=text=>`<p class="visual-note">${text}</p>`;
const text=(x,y,value,size=17,weight=400,fill='#36594c',anchor='start')=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${value}</text>`;
const arrowDefs=(id,color)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="${color}"/></marker>`;

const NEI_DRY='https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye';
const TFOS='https://pubmed.ncbi.nlm.nih.gov/40467022/';
const NEI_GLAUCOMA='https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/glaucoma';

/* ---------- 1. 눈물막의 성분과 치료가 돕는 곳 ---------- */
function tearFilm(focus='all'){return tearFilmReviewed(focus);}
const TEAR_NOTES={
  all:'눈물의 양과 성분, 깜박임, 눈꺼풀과 눈 표면의 상태가 함께 영향을 줍니다. 증상과 검사 결과를 보고 치료를 조합합니다.',
  artificial:'인공눈물은 수분과 윤활을 보충합니다. 지질 성분을 포함한 제제도 있으므로 제품 성분과 사용법을 확인합니다. 원인을 없애는 치료는 아니므로 불편이 계속되면 다른 치료를 함께 합니다.',
  mucin:'디쿠아포솔과 레바미피드는 수분·뮤신 분비와 눈 표면 상태를 돕는 약입니다. 작용과 용법이 서로 다르며 효과와 불편을 진료에서 확인합니다.',
  inflammation:'염증이 눈물막을 더 불안정하게 만드는 악순환을 끊는 것이 목적입니다. 스테로이드는 안압·감염 위험 등을 확인하며 기간을 정하고, 다른 항염증 점안제도 반응을 보며 사용합니다.',
  serum:'혈청 점안제는 잘 낫지 않는 눈 표면 손상 등에서 고려합니다. 효과·보관·오염 위험을 함께 확인합니다.'
};

/* ---------- 2. 다래끼 절개: 안쪽 vs 바깥쪽 ---------- */
function lidPanel(px,inner){
  const chx=inner?px+246:px+194;
  const skinColor=inner?'#ecc6ab':'#e4a891';
  return `<g>
  <path d="M${px+392} 70Q${px+300} 270 ${px+392} 470" fill="none" stroke="#cbd8d0" stroke-width="8"/><path d="M${px+396} 70Q${px+304} 270 ${px+396} 470H${px+450}V70Z" fill="#eef3ef"/>
  <path d="M${px+175} 80H${px+268}V392Q${px+222} 418 ${px+175} 392Z" fill="#f4dcd0"/>
  <path d="M${px+175} 80V392Q${px+170} 404 ${px+180} 410" fill="none" stroke="${skinColor}" stroke-width="10"/>
  <rect x="${px+186}" y="95" width="20" height="290" rx="8" fill="#dfa79a" opacity=".75"/>
  <rect x="${px+214}" y="226" width="44" height="160" rx="10" fill="#f3ead2" stroke="#cdbb8f" stroke-width="2"/>
  <path d="M${px+268} 80V392" stroke="#eba7ad" stroke-width="6"/>
  <path d="M${px+186} 405l-34 30M${px+196} 409l-26 38M${px+206} 411l-14 40" stroke="#4b3b33" stroke-width="3" stroke-linecap="round"/>
  <circle cx="${chx}" cy="304" r="27" fill="#f7d36f" stroke="#c99a2e" stroke-width="3"/>
  ${inner?`<path d="M${px+278} 270V338" stroke="#b5534a" stroke-width="4" stroke-dasharray="8 6"/><path d="M${px+318} 250l-30 30" stroke="#6c7a76" stroke-width="5" stroke-linecap="round"/><path d="M${px+322} 246l14-14" stroke="#9aa8a4" stroke-width="9" stroke-linecap="round"/>`:`<path d="M${px+165} 280V330" stroke="#b5534a" stroke-width="4" stroke-dasharray="8 6"/><path d="M${px+126} 262l30 26" stroke="#6c7a76" stroke-width="5" stroke-linecap="round"/><path d="M${px+122} 258l-14-12" stroke="#9aa8a4" stroke-width="9" stroke-linecap="round"/>`}
  ${text(px+120,72,'피부',15,700,'#8a5a42','end')}<path d="M${px+124} 66h46" stroke="#a98f80" stroke-width="1.5"/>
  ${text(px+300,72,'결막',15,700,'#b0576a')}<path d="M${px+296} 66h-24" stroke="#a98f80" stroke-width="1.5"/>
  ${text(px+300,214,'검판',15,400,'#7a6a43')}<path d="M${px+296} 209l-38 20" stroke="#a98f80" stroke-width="1.5"/>
  ${text(px+120,150,'눈둘레근',15,400,'#8a5a42','end')}<path d="M${px+124} 145l60 8" stroke="#a98f80" stroke-width="1.5"/>
  ${text(px+410,270,'안구',15,400,'#61776c')}
  ${text(px+120,450,'속눈썹',14,400,'#61776c','end')}
  ${text(inner?px+300:px+40,inner?370:370,'콩다래끼',15,700,'#a47c1d')}
  </g>`;
}
function incisionApproaches(){
  const body=`<rect width="960" height="560" rx="14" fill="#faf9f2"/>
  <rect x="12" y="12" width="462" height="536" rx="12" fill="#eef4ee"/><rect x="486" y="12" width="462" height="536" rx="12" fill="#f8efe6"/>
  ${text(30,46,'① 안쪽(결막)에서 절개',20,700,'#294f43')}${text(504,46,'② 바깥쪽(피부)에서 절개',20,700,'#7a4630')}
  ${lidPanel(12,true)}${lidPanel(486,false)}
  ${text(30,490,'멍울이 눈꺼풀 안쪽에 가까울 때 · 대부분의 콩다래끼',15,700,'#294f43')}
  ${text(30,514,'✓ 피부 흉터 없음 · 대개 봉합 불필요',15,400,'#3f6c51')}${text(30,536,'△ 남거나 재발, 결막 쪽 붉은 살(육아종)',15,400,'#8b6a2c')}
  ${text(504,490,'멍울이 피부 쪽으로 튀어나오거나 피부가 얇아졌을 때',15,700,'#7a4630')}
  ${text(504,514,'✓ 피부 바로 아래 내용물을 확실히 제거',15,400,'#3f6c51')}${text(504,536,'△ 흉터·색소 침착 가능, 봉합 후 5~7일 실밥 제거',15,400,'#8b6a2c')}`;
  return svg('incision-approaches','다래끼 절개: 결막 쪽 절개와 피부 쪽 절개','눈꺼풀 단면 그림. 왼쪽은 멍울이 결막 쪽에 있어 눈꺼풀 안쪽 결막을 절개하는 방법, 오른쪽은 멍울이 피부 쪽에 있어 피부를 절개하는 방법입니다. 붉은 점선이 절개 위치입니다.',body,'0 0 960 560')+note('눈꺼풀을 옆에서 자른 단면 모식도입니다. 붉은 점선이 절개 위치입니다. 어느 쪽으로 절개할지는 멍울의 위치와 피부 상태를 보고 정합니다.');
}

/* ---------- 3. 눈물점 마개 ---------- */
function punctalPlug(){
  const body=`<defs>${arrowDefs('pp-flow','#4f8fb0')}${arrowDefs('pp-stay','#5f927c')}</defs><rect width="960" height="470" rx="14" fill="#faf9f2"/>
  <path d="M60 220Q250 70 470 205Q250 330 60 220Z" fill="#ffffff" stroke="#b9a08c" stroke-width="5"/>
  <clipPath id="pp-eye"><path d="M60 220Q250 70 470 205Q250 330 60 220Z"/></clipPath><g clip-path="url(#pp-eye)"><circle cx="260" cy="205" r="72" fill="#8a6a4a"/><circle cx="260" cy="205" r="30" fill="#2c2b29"/><circle cx="246" cy="190" r="9" fill="#fff"/></g><path d="M60 220Q250 70 470 205Q250 330 60 220Z" fill="none" stroke="#b9a08c" stroke-width="5"/>
  <path d="M92 236Q250 318 452 221" stroke="#8fc7dc" stroke-width="10" fill="none" opacity=".9"/>
  <circle cx="470" cy="196" r="6" fill="#f0c9c4" stroke="#b57b73" stroke-width="2"/>
  <circle cx="452" cy="223" r="6" fill="#f0c9c4" stroke="#b57b73" stroke-width="2"/>
  <path d="M476 194Q560 160 640 172" stroke="#e7b6b0" stroke-width="13" fill="none"/>
  <path d="M458 227Q560 230 640 202" stroke="#e7b6b0" stroke-width="13" fill="none"/>
  <rect x="628" y="140" width="50" height="104" rx="22" fill="#f1c4bd" stroke="#c6857c" stroke-width="2"/>
  <path d="M653 244V420" stroke="#f1c4bd" stroke-width="30"/>
  <path d="M490 189Q560 162 620 172" stroke="#4f8fb0" stroke-width="3" fill="none" marker-end="url(#pp-flow)" stroke-dasharray="7 6"/>
  <path d="M653 255V400" stroke="#4f8fb0" stroke-width="3" marker-end="url(#pp-flow)" stroke-dasharray="7 6"/>
  <g transform="translate(452 224) rotate(-12)"><rect x="-4" y="-9" width="34" height="18" rx="6" fill="#4b8bbf" stroke="#2c5f86" stroke-width="2"/><rect x="-14" y="-13" width="12" height="26" rx="5" fill="#3c78a8"/></g>
  <path d="M500 250l26 26m0-26-26 26" stroke="#b5534a" stroke-width="4"/>
  <path d="M170 270q40 30 90 18" stroke="#5f927c" stroke-width="4" fill="none" marker-end="url(#pp-stay)"/>
  ${text(40,40,'아래 눈물점에 마개를 넣은 모습 (모식도)',19,700,'#294f43')}
  ${text(96,318,'눈 표면에 머무는 눈물이 늘어남',16,700,'#3f6c51')}
  ${text(484,128,'위 눈물점 · 열려 있음',15,400,'#36594c')}
  ${text(470,302,'아래 눈물점 + 마개',16,700,'#2c5f86')}
  ${text(700,190,'눈물주머니',15,400,'#36594c')}
  ${text(690,340,'코눈물관 → 코',15,400,'#36594c')}
  <rect x="700" y="380" width="236" height="72" rx="12" fill="#eef4ee"/>${text(716,408,'흡수형: 수일~수개월 뒤 녹음',14,400,'#36594c')}${text(716,434,'실리콘형: 필요하면 다시 뺄 수 있음',14,400,'#36594c')}`;
  return svg('punctal-plug','눈물점 마개의 원리','눈 안쪽 구석의 아래 눈물점에 작은 마개를 넣어, 눈물이 코 쪽으로 빠져나가는 길을 줄이고 눈 표면에 눈물이 더 오래 머물게 하는 원리를 보여줍니다. 위 눈물점은 열려 있어 일부 눈물은 계속 빠집니다.',body,'0 0 960 470')+note('일부 눈물점만 막기 때문에 눈물이 완전히 막히지는 않습니다. 눈 표면 염증이 심하면 염증 물질도 함께 고일 수 있어, 대개 염증을 먼저 조절한 뒤 넣습니다.');
}

/* ---------- 4. IPL ---------- */
function iplTreatment(){
  const flashes=[[300,268],[360,282],[420,268],[540,268],[600,282],[660,268]].map(([x,y])=>`<path d="M${x} ${y-14}l5 10 11 1-8 7 3 11-11-6-11 6 3-11-8-7 11-1Z" fill="#f5c443" stroke="#c99a2e" stroke-width="1.5"/>`).join('');
  const vessels=[0,1,2,3].map(i=>`<path d="M${625+i*14} 390q10-12 4-24t6-22" stroke="#d2564b" stroke-width="2.5" fill="none"/>`).join('');
  const glands=[0,1,2,3,4].map(i=>`<circle cx="${640+i*48}" cy="${430}" r="9" fill="#f2cd68" stroke="#c99a2e" stroke-width="2"/><circle cx="${640+i*48}" cy="${423}" r="4" fill="#fff6d8"/>`).join('');
  const body=`<rect width="960" height="480" rx="14" fill="#faf9f2"/>
  <ellipse cx="480" cy="250" rx="250" ry="210" fill="#f3d7c4" stroke="#d1a98f" stroke-width="3"/>
  <path d="M230 290Q480 360 730 290L728 238Q480 300 232 238Z" fill="#f7cf62" opacity=".45"/>
  <ellipse cx="380" cy="212" rx="62" ry="30" fill="#4c5a57"/><ellipse cx="580" cy="212" rx="62" ry="30" fill="#4c5a57"/>
  <path d="M442 212h76" stroke="#4c5a57" stroke-width="6"/>
  ${flashes}
  <path d="M478 250q-14 50 2 66" stroke="#d1a98f" stroke-width="3" fill="none"/><path d="M440 370q40 18 80 0" stroke="#c98c80" stroke-width="5" fill="none"/>
  ${text(40,40,'IPL 시술 부위 (모식도)',19,700,'#294f43')}
  ${text(380,170,'눈 보호 안대',15,700,'#36594c','middle')}
  ${text(140,262,'빛을 쏘는 부위',16,700,'#a47c1d','end')}${text(140,286,'눈 아래 뺨·코',15,400,'#a47c1d','end')}<path d="M146 270h80" stroke="#c99a2e" stroke-width="2"/>
  <rect x="770" y="100" width="170" height="250" rx="12" fill="#eef4ee"/>
  ${text(784,130,'빛 → 열',16,700,'#294f43')}
  ${text(784,160,'· 눈꺼풀 주변의',14,400,'#36594c')}${text(796,180,'비정상 혈관·염증 감소',14,400,'#36594c')}
  ${text(784,210,'· 굳은 기름을',14,400,'#36594c')}${text(796,230,'부드럽게 녹임',14,400,'#36594c')}
  ${text(784,262,'· 직후 기름샘 짜기를',14,400,'#36594c')}${text(796,282,'함께 하기도 함',14,400,'#36594c')}
  ${text(784,318,'2~4주 간격 3~4회',14,700,'#a47c1d')}`;
  return svg('ipl-treatment','IPL 시술 부위와 원리','양쪽 눈을 보호 안대로 가리고, 눈 아래 뺨과 코 부위에 강한 빛을 여러 번 쏘는 모습. 빛이 열로 바뀌어 눈꺼풀 주변 비정상 혈관과 염증을 줄이고 굳은 기름을 녹입니다.',body,'0 0 960 480')+note('눈은 보호 안대로 가리고 시술합니다. 빛을 쏘는 위치와 횟수는 장비와 피부 상태에 따라 다릅니다. 시술 후 온찜질·눈꺼풀 세정을 이어가야 효과가 오래갑니다.');
}

/* ---------- 5. 자가혈청 만드는 과정 ---------- */
function serumSteps(){
  const steps=[
    {t:'① 채혈',d:'본인 혈액을 뽑음',icon:x=>`<rect x="${x-14}" y="92" width="28" height="70" rx="6" fill="#e9eef0" stroke="#7d9a9a" stroke-width="2"/><rect x="${x-14}" y="122" width="28" height="40" rx="4" fill="#c44f4f"/><path d="M${x} 92V70" stroke="#7d9a9a" stroke-width="3"/>`},
    {t:'② 원심분리',d:'혈청(맑은 노란 층)을 분리',icon:x=>`<path d="M${x-16} 70h32v84a16 16 0 0 1-32 0Z" fill="#f3f0e6" stroke="#8f9a88" stroke-width="2"/><path d="M${x-16} 70h32v40h-32Z" fill="#f2d27a"/><path d="M${x-16} 110h32v44a16 16 0 0 1-32 0Z" fill="#b8423f"/>`},
    {t:'③ 희석 · 소분',d:'처방 농도로 작은 병에 나눔',icon:x=>[-26,0,26].map(o=>`<rect x="${x+o-9}" y="98" width="18" height="52" rx="5" fill="#fbefc9" stroke="#b49a52" stroke-width="2"/><rect x="${x+o-5}" y="86" width="10" height="14" rx="2" fill="#7d9a9a"/>`).join('')},
    {t:'④ 보관',d:'안 쓰는 병은 냉동, 쓰는 병은 냉장',icon:x=>`<rect x="${x-34}" y="76" width="68" height="84" rx="8" fill="#e5f0f6" stroke="#6f9fb8" stroke-width="2"/><path d="M${x-34} 106h68" stroke="#6f9fb8" stroke-width="2"/><path d="M${x} 82v18m-8-14 16 10m0-10-16 10" stroke="#4f8fb0" stroke-width="2.5"/>`}
  ];
  const cards=steps.map((s,i)=>{const x=120+i*240;return `<rect x="${x-104}" y="44" width="208" height="210" rx="14" fill="${i%2?'#f8efe6':'#eef4ee'}"/>${s.icon(x)}${text(x,200,s.t,18,700,'#294f43','middle')}${text(x,228,s.d,13,400,'#61776c','middle')}${i<3?`<path d="M${x+108} 150h20" stroke="#8fae9a" stroke-width="4" marker-end="url(#ss-arrow)"/>`:''}`;}).join('');
  const body=`<defs>${arrowDefs('ss-arrow','#8fae9a')}</defs><rect width="960" height="330" rx="14" fill="#faf9f2"/>${text(16,30,'자가혈청 안약을 만드는 과정',18,700,'#294f43')}${cards}
  <rect x="16" y="270" width="928" height="46" rx="10" fill="#fff3d3"/>${text(34,300,'⚠ 방부제가 없어 오염에 약합니다. 병 입구가 눈·손에 닿지 않게 하고, 색이 변하거나 탁하면 버리세요.',15,700,'#8b6a2c')}`;
  return svg('serum-steps','자가혈청 안약을 만드는 4단계','본인의 혈액을 채혈해 원심분리로 혈청을 분리하고, 처방 농도로 희석해 작은 병에 나눈 뒤 냉동·냉장 보관하는 과정입니다.',body,'0 0 960 330');
}

/* ---------- 6. 방수의 흐름과 녹내장 치료 위치 ---------- */
function anteriorSegment(mode='flow'){
  // Upper half of the anterior segment, eye facing left, optical axis along the bottom edge.
  const flow=`<path d="M548 238C508 282 486 340 466 398C460 418 438 420 430 402C414 340 418 252 440 188" stroke="#3f8fb3" stroke-width="5" fill="none" stroke-dasharray="10 7" marker-end="url(#as-flow)"/><path d="M458 128C474 108 496 96 528 90" stroke="#3f8fb3" stroke-width="5" fill="none" marker-end="url(#as-flow)"/>`;
  const anatomy=`<path d="M122 470C132 335 238 200 438 156L456 178C466 260 458 330 444 392L444 470Z" fill="#eaf6f7"/>
  <path d="M110 470C120 330 230 190 432 142" stroke="#9cc3c8" stroke-width="26" fill="none"/><path d="M110 470C120 330 230 190 432 142" stroke="#dcf0f2" stroke-width="18" fill="none"/>
  <path d="M430 128C560 104 760 100 940 102" stroke="#e1ded0" stroke-width="44" fill="none"/>
  <path d="M470 168Q540 138 586 164Q604 220 562 250Q512 256 478 232Z" fill="#c69a7c" stroke="#8a6550" stroke-width="2"/>
  <path d="M492 470A95 130 0 0 1 682 470Z" fill="#f6edc9" stroke="#c9b67a" stroke-width="3"/>
  <path d="M552 246L566 344M574 244L600 342M532 240L540 348" stroke="#c9b67a" stroke-width="1.5"/>
  <path d="M464 178C472 260 464 330 448 394" stroke="#7c5b45" stroke-width="20" stroke-linecap="round" fill="none"/>
  <rect x="430" y="146" width="30" height="28" rx="4" fill="#d9cfb8" stroke="#a69676" stroke-width="2"/><path d="M433 152l24 14M433 162l18 10M440 148l18 10" stroke="#a69676" stroke-width="1.2"/>
  <ellipse cx="452" cy="134" rx="13" ry="7" fill="#9fc9de" stroke="#5f8fa8" stroke-width="2"/>`;
  const labels=`${text(150,390,'각막',16,700,'#4d7b80')}${text(270,440,'앞방',16,400,'#4d7b80')}
  ${text(330,268,'홍채',16,700,'#6b4a36','end')}<path d="M336 262H460" stroke="#a48a78" stroke-width="1.5"/>
  ${text(587,446,'수정체',16,700,'#8a7535','middle')}
  ${text(606,192,'섬모체',16,700,'#6b4a36')}${text(606,214,'방수를 만듦',14,400,'#6b4a36')}
  ${text(300,186,'섬유주(배출구)',15,700,'#6b5a3a','end')}<path d="M306 181L428 162" stroke="#a69676" stroke-width="1.5"/>
  ${text(400,76,'쉴렘관 → 혈관으로',15,700,'#3f6f86','end')}<path d="M404 72L440 128" stroke="#5f8fa8" stroke-width="1.5"/>`;
  const flowInfo=`<rect x="700" y="170" width="236" height="270" rx="14" fill="#eef4ee"/>${text(718,204,'안압은 균형으로 정해져요',16,700,'#294f43')}
  ${text(718,236,'만들어지는 양 (섬모체)',14,400,'#36594c')}${text(718,258,'↕',16,700,'#3f8fb3')}${text(736,258,'빠져나가는 양 (섬유주)',14,400,'#36594c')}
  ${text(718,296,'배출이 잘 안 되면 안압↑',14,700,'#b5534a')}${text(718,320,'→ 시신경 손상의 위험이 커짐',14,400,'#36594c')}${text(718,342,'손상에는 여러 요인이 관여함',14,400,'#36594c')}
  ${text(718,380,'시신경이 약하면 안압이',14,400,'#36594c')}${text(718,402,'정상이어도 손상될 수 있음',14,400,'#36594c')}${text(718,424,'(정상안압 녹내장)',14,700,'#a47c1d')}`;
  const badge=(x,y,n,c)=>`<circle cx="${x}" cy="${y}" r="17" fill="${c}"/>${text(x,y+6,n,17,700,'#ffffff','middle')}`;
  const treat=`<path d="M446 172C500 140 560 108 616 82" stroke="#5f927c" stroke-width="6" fill="none" marker-end="url(#as-new)"/><ellipse cx="648" cy="70" rx="44" ry="15" fill="#cfe6d6" stroke="#5f927c" stroke-width="2" opacity=".9"/>
  ${badge(530,206,'①','#c08a2c')}${badge(400,212,'②','#c4675a')}${badge(648,34,'③','#5f927c')}
  <rect x="700" y="170" width="236" height="290" rx="14" fill="#eef4ee"/>
  ${badge(724,206,'①','#c08a2c')}${text(750,212,'안약',16,700,'#294f43')}${text(724,240,'만드는 양 줄이기 또는',14,400,'#36594c')}${text(724,262,'빠져나가는 양 늘리기',14,400,'#36594c')}
  ${badge(724,300,'②','#c4675a')}${text(750,306,'SLT 레이저',16,700,'#294f43')}${text(724,334,'섬유주의 배출 기능 개선',14,400,'#36594c')}
  ${badge(724,372,'③','#5f927c')}${text(750,378,'여과수술의 예',16,700,'#294f43')}${text(724,406,'새 배출 통로를 만들어',14,400,'#36594c')}${text(724,428,'결막 아래로 빠져나가게',14,400,'#36594c')}`;
  const body=`<defs>${arrowDefs('as-flow','#3f8fb3')}${arrowDefs('as-new','#5f927c')}</defs><rect width="960" height="500" rx="14" fill="#faf9f2"/>
  ${text(30,40,mode==='treatment'?'녹내장 치료가 작용하는 곳 (눈 앞부분 단면)':'눈 속 물(방수)이 만들어지고 빠져나가는 길',19,700,'#294f43')}
  ${anatomy}${flow}${labels}${mode==='treatment'?treat:flowInfo}`;
  return svg(`anterior-${mode}`,mode==='treatment'?'녹내장 치료가 작용하는 위치':'방수의 생성과 배출 경로',mode==='treatment'?'눈 앞부분 단면에서 안약은 섬모체의 방수 생성을 줄이거나 배출을 늘리고, SLT 레이저는 섬유주의 배출을 돕고, 여과수술은 결막 아래로 새 배출 통로를 만듭니다. 수술 종류별 배출 경로는 다를 수 있습니다.':'섬모체에서 만들어진 방수가 동공을 지나 앞방으로 나와 전방각의 섬유주와 쉴렘관을 통해 빠져나가는 경로. 생성과 배출의 균형이 안압을 결정합니다.',body);
}

/* ---------- 7. 정상 시신경과 녹내장 시신경 ---------- */
function cupDisc(){
  const disc=(cx,cupR,label,sub,ratio)=>`<defs><radialGradient id="fund-${cx}" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#d9633f"/><stop offset="1" stop-color="#9c2f22"/></radialGradient><clipPath id="clip-disc-${cx}"><circle cx="${cx}" cy="215" r="158"/></clipPath></defs>
  <circle cx="${cx}" cy="215" r="160" fill="url(#fund-${cx})"/>
  <ellipse cx="${cx}" cy="215" rx="66" ry="74" fill="#f2b679"/>
  <ellipse cx="${cx}" cy="215" rx="${cupR}" ry="${cupR*1.08}" fill="#fff1d2"/>
  <g clip-path="url(#clip-disc-${cx})" stroke="#a3342a" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".9"><path d="M${cx-4} ${215-cupR*0.7}C${cx-8} ${150-cupR*0.2} ${cx-20} 110 ${cx-40} 92S${cx-100} 66 ${cx-136} 76"/><path d="M${cx+4} ${215-cupR*0.7}C${cx+10} ${150-cupR*0.2} ${cx+26} 112 ${cx+48} 96S${cx+104} 72 ${cx+138} 84"/><path d="M${cx-4} ${215+cupR*0.7}C${cx-8} ${280+cupR*0.2} ${cx-20} 320 ${cx-40} 338S${cx-100} 362 ${cx-136} 352"/><path d="M${cx+4} ${215+cupR*0.7}C${cx+10} ${280+cupR*0.2} ${cx+26} 318 ${cx+48} 334S${cx+104} 358 ${cx+138} 346"/><path d="M${cx-cupR*0.6} 215C${cx-60} 210 ${cx-90} 204 ${cx-120} 208" stroke-width="2.5"/></g>
  ${text(cx,410,label,19,700,'#294f43','middle')}${text(cx,436,sub,15,400,'#61776c','middle')}${text(cx,458,ratio,14,700,'#a47c1d','middle')}`;
  const body=`<rect width="960" height="480" rx="14" fill="#faf9f2"/>${disc(250,22,'손상 없는 구조의 한 예','신경 테두리를 함께 살펴봅니다.','패임 크기에는 개인차가 있습니다.')}${disc(710,58,'신경 테두리가 줄어든 예','손상 부위와 시간에 따른 변화를 봅니다.','패임 비율 하나로 진단하지 않습니다.')}
  <path d="M310 200L424 150" stroke="#294f43" stroke-width="1.5"/>${text(428,148,'두꺼운',15,700,'#294f43')}${text(428,168,'신경 테두리',15,700,'#294f43')}
  <path d="M774 196L880 150" stroke="#294f43" stroke-width="1.5"/>${text(884,148,'얇아진',15,700,'#294f43')}${text(884,168,'테두리',15,700,'#294f43')}`;
  return svg('cup-disc','시신경 테두리의 구조 차이 · 개념 비교','눈 안쪽을 들여다본 안저 모식도. 가운데 패임과 그 주위 신경 테두리를 비교합니다. 패임의 원래 크기에는 개인차가 크며, 국소적인 테두리·신경섬유 손상과 시간에 따른 변화를 함께 평가합니다.',body,'0 0 960 480')+note('안저 검사와 OCT에서 이 패임과 신경섬유층 두께를 확인합니다. 패임이 원래 큰 사람도 있어, 한 번의 사진보다 시야검사·OCT와 시간에 따른 변화를 함께 봅니다.');
}

/* ---------- 8. 녹내장 진행 요인 ---------- */
function glaucomaRisk(){
  const col=(title,cls,items)=>`<div class="trigger-card ${cls}"><strong>${title}</strong><ul class="visual-list">${items.map(([b,d])=>`<li><b>${b}</b> · ${d}</li>`).join('')}</ul></div>`;
  return `<div class="trigger-grid">${col('조절할 수 있는 요인','',[['안압','치료로 목표 안압을 유지'],['안약 꾸준히','사용이 어렵다면 방법을 상담'],['혈압·혈류','혈압약을 임의로 조절하지 않음'],['수면무호흡','코골이·무호흡은 진료로 확인'],['스테로이드','안약·흡입제·연고 사용을 알림']])}${col('조절하기 어려운 요인','is-caution',[['나이','나이가 많을수록 위험↑'],['가족력','부모·형제자매 녹내장'],['근시','근시가 심할수록 위험↑'],['얇은 각막','안압이 낮게 측정될 수도'],['시신경 출혈·진행 정도','진행의 신호일 수 있음']])}</div>${note('발생 위험 정보와 실제 진행 소견을 구분합니다. 진행 속도는 반복한 시야검사와 OCT로 평가하며, 검사 간격은 눈 상태에 맞춥니다.')}`;
}

/* ---------- 9. 녹내장 생활 습관 ---------- */
function glaucomaLifestyle(){
  const cards=[['✓','예약된 검사·치료','목표 안압과 진행 추세 확인','good'],['✓','안약 사용 방법','빠뜨리거나 불편하면 상담','good'],['✓','유산소 운동·금연','전반적인 건강을 위한 습관','good'],['✓','수면·혈압 관리','무호흡 상담 · 혈압약 임의 변경 금지','good'],['!','머리를 오래 낮추거나 힘주기','일시적 안압 상승 · 상태별 상담','caution'],['!','수분은 적당히 나누어','수분 제한·탈수는 피하기','caution']];
  return `<div class="trigger-grid lifestyle-grid">${cards.map(([icon,title,desc,kind])=>`<div class="trigger-card ${kind==='caution'?'is-caution':''}"><span aria-hidden="true">${icon}</span><strong>${title}</strong><p>${desc}</p></div>`).join('')}</div>${note('우선은 처방된 치료와 반복 검사입니다. 생활 습관의 장기적인 진행 억제 근거는 제한적이며, 일시적인 안압 변화가 곧 시야 손상을 뜻하지는 않습니다. 일상생활을 과도하게 제한하지 마세요.')}`;
}

/* ---------- 10. 녹내장 진행 판단: 변동과 추세 ---------- */
function glaucomaMonitoring(){
  const xs=i=>110+i*58, ys=v=>420-(v-70)*10;
  const stable=[95,93,96,91,94,95,93,94,96,93,94,95,94];
  const prog=[94,95,92,93,90,91,88,89,86,87,84,83,82];
  const pts=(arr,c,shape)=>arr.map((v,i)=>shape==='c'?`<circle cx="${xs(i)}" cy="${ys(v)}" r="7" fill="${c}"/>`:`<rect x="${xs(i)-6}" y="${ys(v)-6}" width="12" height="12" fill="${c}"/>`).join('');
  const fit=arr=>{const n=arr.length,mx=(n-1)/2,my=arr.reduce((a,b)=>a+b)/n;let sxy=0,sxx=0;arr.forEach((v,i)=>{sxy+=(i-mx)*(v-my);sxx+=(i-mx)**2});const b=sxy/sxx,a=my-b*mx;return [a,a+b*(n-1)];};
  const [s0,s1]=fit(stable),[p0,p1]=fit(prog);
  const grid=[70,75,80,85,90,95,100].map(v=>`<path d="M100 ${ys(v)}H820" stroke="#e1e6dc"/>${text(90,ys(v)+5,v,13,400,'#7b887a','end')}`).join('')+[0,2,4,6,8,10,12].map(i=>`${text(xs(i),448,`${i/2}년`,13,400,'#7b887a','middle')}`).join('');
  const body=`<rect width="960" height="480" rx="14" fill="#faf9f2"/>${text(30,36,'시야검사 결과를 여러 번 이어서 보는 이유 (예시)',19,700,'#294f43')}${text(30,60,'세로: 시야 지수(%) · 가로: 검사 시점',14,400,'#61776c')}
  ${grid}
  <path d="M${xs(0)} ${ys(s0)}L${xs(12)} ${ys(s1)}" stroke="#5f927c" stroke-width="3" stroke-dasharray="9 6"/>
  <path d="M${xs(0)} ${ys(p0)}L${xs(12)} ${ys(p1)}" stroke="#c4675a" stroke-width="3" stroke-dasharray="9 6"/>
  ${pts(stable,'#5f927c','c')}${pts(prog,'#c4675a','s')}
  <circle cx="${xs(3)}" cy="${ys(91)}" r="15" fill="none" stroke="#c99a2e" stroke-width="3"/>
  <path d="M${xs(3)+12} ${ys(91)+12}L300 360" stroke="#c99a2e" stroke-width="2"/>${text(250,384,'한 번 낮게 나온 결과',14,700,'#8b6a2c')}${text(250,404,'→ 다시 검사해 확인',14,400,'#8b6a2c')}
  <rect x="836" y="110" width="110" height="150" rx="12" fill="#eef4ee"/><circle cx="854" cy="140" r="7" fill="#5f927c"/>${text(868,145,'안정',15,700,'#3f6c51')}${text(852,166,'오르내려도',13,400,'#36594c')}${text(852,184,'추세는 평평',13,400,'#36594c')}
  <rect x="848" y="204" width="12" height="12" fill="#c4675a"/>${text(868,215,'진행',15,700,'#a9473b')}${text(852,236,'추세가 꾸준히',13,400,'#36594c')}${text(852,254,'내려감',13,400,'#36594c')}`;
  return svg('glaucoma-monitoring','검사 결과의 변동과 장기 추세','두 사람의 가상 시야 지수 변화. 초록색은 결과가 오르내리지만 추세선이 평평한 안정 상태, 빨간색은 꾸준히 내려가는 진행 상태입니다. 한 번 낮게 나온 결과는 재검사로 확인합니다.',body,'0 0 960 480')+note('이해를 돕기 위한 가상의 예시입니다. 실제 판단에는 시야검사와 OCT, 안압, 검사 신뢰도를 함께 봅니다.');
}

/* ---------- 11. 열린 각·좁은 각·레이저 홍채절개술 ---------- */
function anglePanels(){
  const panel=(x0,kind)=>{const V=[x0+262,262];
    const iris=kind==='narrow'?`M${V[0]-6} ${V[1]-6}C${x0+200} ${V[1]-70} ${x0+120} ${V[1]-60} ${x0+40} ${V[1]-20}`:`M${V[0]-6} ${V[1]-4}C${x0+190} ${V[1]+4} ${x0+110} ${V[1]+8} ${x0+40} ${V[1]+16}`;
    const flowColor=kind==='narrow'?'#b5534a':'#3f8fb3';
    const flow=kind==='narrow'?`<path d="M${x0+70} ${V[1]+70}Q${x0+150} ${V[1]+40} ${x0+200} ${V[1]-20}" stroke="#3f8fb3" stroke-width="4" fill="none" stroke-dasharray="8 6"/><path d="M${x0+150} ${V[1]+30}l0-34m-14 12 14-14 14 14" stroke="#7c5b45" stroke-width="3" fill="none"/><path d="M${V[0]-30} ${V[1]-58}l18 18m0-18-18 18" stroke="#b5534a" stroke-width="4"/>`
      :kind==='lpi'?`<path d="M${x0+200} ${V[1]+70}L${x0+202} ${V[1]+14}" stroke="#3f8fb3" stroke-width="4" stroke-dasharray="8 6" marker-end="url(#ap-flow)"/><path d="M${x0+204} ${V[1]-6}Q${x0+240} ${V[1]-30} ${V[0]-20} ${V[1]-50}" stroke="#3f8fb3" stroke-width="4" fill="none" stroke-dasharray="8 6" marker-end="url(#ap-flow)"/>`
      :`<path d="M${x0+60} ${V[1]+60}Q${x0+40} ${V[1]+30} ${x0+80} ${V[1]-10}Q${x0+180} ${V[1]-60} ${V[0]-24} ${V[1]-50}" stroke="#3f8fb3" stroke-width="4" fill="none" stroke-dasharray="8 6" marker-end="url(#ap-flow)"/>`;
    const hole=kind==='lpi'?`<rect x="${x0+192}" y="${V[1]-2}" width="20" height="18" fill="#faf9f2"/>`:'';
    return `<g><path d="M${V[0]} ${V[1]}L${x0+30} ${V[1]-210}" stroke="#a8cdd2" stroke-width="22"/><path d="M${V[0]} ${V[1]}L${x0+30} ${V[1]-210}" stroke="#dcf0f2" stroke-width="14"/>
    <path d="M${V[0]-14} ${V[1]-4}L${V[0]-44} ${V[1]-31}" stroke="#c9b98f" stroke-width="12" stroke-linecap="round"/>
    <path d="${iris}" stroke="#7c5b45" stroke-width="18" fill="none" stroke-linecap="round"/>${hole}
    <path d="M${x0+30} ${V[1]+110}Q${x0+140} ${V[1]+40} ${x0+260} ${V[1]+110}" fill="#f6edc9" stroke="#c9b67a" stroke-width="3"/>
    ${flow}
    ${text(x0+96,V[1]-196,'각막',14,700,'#4d7b80')}${text(V[0]-6,V[1]-92,'섬유주',14,700,'#6b5a3a','middle')}<path d="M${V[0]-12} ${V[1]-86}L${V[0]-30} ${V[1]-38}" stroke="#a69676" stroke-width="1.5"/>${text(x0+44,V[1]+42,'홍채',14,700,'#6b4a36')}${text(x0+120,V[1]+128,'수정체',14,400,'#8a7535')}</g>`;};
  const body=`<defs>${arrowDefs('ap-flow','#3f8fb3')}</defs><rect width="960" height="500" rx="14" fill="#faf9f2"/>
  <rect x="10" y="14" width="300" height="472" rx="12" fill="#eef4ee"/><rect x="330" y="14" width="300" height="472" rx="12" fill="#f8efe6"/><rect x="650" y="14" width="300" height="472" rx="12" fill="#eef4ee"/>
  ${text(26,46,'① 열린 전방각',18,700,'#294f43')}${text(346,46,'② 전방각이 막힌 예',18,700,'#a9473b')}${text(666,46,'③ 동공차단을 줄인 예',18,700,'#294f43')}
  ${panel(10,'open')}${panel(330,'narrow')}${panel(650,'lpi')}
  ${text(26,440,'홍채와 각막 사이가 넓어',14,400,'#36594c')}${text(26,462,'열려 있어도 배출 저항은 클 수 있음',12,400,'#36594c')}
  ${text(346,440,'홍채가 앞으로 밀려 배출구를',14,400,'#36594c')}${text(346,462,'막으면 안압이 급격히 오름',14,700,'#a9473b')}
  ${text(666,440,'홍채에 작은 구멍(우회로)을 내',14,400,'#36594c')}${text(666,462,'동공차단 완화 · 좁은 각이 남을 수도',14,400,'#36594c')}`;
  return svg('angle-panels','열린 전방각, 좁은 전방각, 레이저 홍채절개술 후 비교','전방각 확대 단면 세 개. 열린 각에서는 방수가 섬유주로 잘 빠지고, 좁은 각에서는 홍채가 앞으로 밀려 배출구를 막으며, 레이저 홍채절개술 후에는 홍채 구멍으로 방수가 우회해 동공차단을 줄일 수 있습니다. 시술 뒤에도 좁은 전방각이나 유착이 남을 수 있습니다.',body)+note('파란 점선은 눈 속 물(방수)의 흐름입니다. 레이저 홍채절개술은 급성 발작 위험을 줄이는 치료이며, 이후에도 전방각과 안압을 계속 확인합니다.');
}

/* ---------- 12. 필로카르핀: 동공과 핀홀 효과 ---------- */
function pilocarpinePupil(){
  const eye=(cx,r,label,sub)=>`<clipPath id="pl-eye-${cx}"><path d="M${cx-110} 150Q${cx} 60 ${cx+110} 150Q${cx} 240 ${cx-110} 150Z"/></clipPath><path d="M${cx-110} 150Q${cx} 60 ${cx+110} 150Q${cx} 240 ${cx-110} 150Z" fill="#fff"/><g clip-path="url(#pl-eye-${cx})"><circle cx="${cx}" cy="150" r="48" fill="#7b6a52"/><circle cx="${cx}" cy="150" r="${r}" fill="#22211f"/><circle cx="${cx-12}" cy="136" r="6" fill="#fff"/></g><path d="M${cx-110} 150Q${cx} 60 ${cx+110} 150Q${cx} 240 ${cx-110} 150Z" fill="none" stroke="#b9a08c" stroke-width="4"/>${text(cx,268,label,17,700,'#294f43','middle')}${text(cx,292,sub,14,400,'#61776c','middle')}`;
  const rays=(y0,half,blur,label)=>`<path d="M520 ${y0}L700 ${y0-half}L880 ${y0-blur}M520 ${y0}L700 ${y0+half}L880 ${y0+blur}" stroke="#e0a83a" stroke-width="2.5" fill="none"/><ellipse cx="700" cy="${y0}" rx="8" ry="52" fill="#f6edc944" stroke="#c9b67a"/><path d="M692 ${y0-60}v${60-half}M692 ${y0+half}v${60-half}" stroke="#7c5b45" stroke-width="5"/><path d="M880 ${y0-60}v120" stroke="#c4675a" stroke-width="4"/><path d="M880 ${y0-blur}v${2*blur}" stroke="#294f43" stroke-width="10"/><circle cx="520" cy="${y0}" r="5" fill="#a47c1d"/>${text(520,y0-70,label,15,700,'#294f43')}`;
  const body=`<rect width="960" height="420" rx="14" fill="#faf9f2"/>${text(30,40,'필로카르핀이 가까운 것을 잘 보이게 하는 원리',19,700,'#294f43')}
  ${eye(150,24,'평소 동공','밝은 곳 기준')}${eye(390,10,'안약 넣은 뒤','동공이 작아짐')}
  ${rays(150,40,26,'가까운 물체에 초점이 맞지 않는 예')}${rays(320,14,9.1,'같은 초점 상태에서 동공을 줄인 예')}
  ${text(888,150,'망막',13,400,'#a9473b')}${text(470,402,'검은 막대 길이 = 망막에 맺히는 흐림의 크기',14,400,'#61776c','middle')}`;
  return svg('pilocarpine-pupil','필로카르핀 안약의 핀홀 효과','왼쪽은 평소 동공과 안약을 넣은 뒤 작아진 동공. 오른쪽은 수정체 크기와 초점 상태를 같게 둔 개념 비교입니다. 광선 그림에서 동공이 작으면 가까운 물체의 빛이 좁게 들어와 망막의 흐림이 줄어듭니다.',body,'0 0 960 420')+note('동공이 작아지면 일부에서 가까운 곳의 흐림이 줄 수 있지만, 들어오는 빛도 줄어 어두운 곳에서는 시야가 어둡게 느껴집니다. 어둡거나 흐리게 보이면 운전하지 마세요. 수정체의 노화 자체를 되돌리지는 않습니다.');
}

export const extraVisuals={
  'cilia-contact':()=>ciliaContactReviewed()+credit(source('https://eyewiki.aao.org/Entropion','AAO EyeWiki · 안검내반')),
  'tear-film':()=>tearFilm('all')+note(TEAR_NOTES.all)+credit(source(NEI_DRY,'NEI · 안구건조증')+' · '+source(TFOS,'TFOS DEWS III 2025')),
  'tear-film-artificial':()=>tearFilm('artificial')+note(TEAR_NOTES.artificial)+credit(source(TFOS,'TFOS DEWS III 2025 치료 보고서')),
  'tear-film-mucin':()=>tearFilm('mucin')+note(TEAR_NOTES.mucin)+credit(source(TFOS,'TFOS DEWS III 2025 치료 보고서')),
  'tear-film-inflammation':()=>tearFilm('inflammation')+note(TEAR_NOTES.inflammation)+credit(source(TFOS,'TFOS DEWS III 2025 치료 보고서')),
  'tear-film-serum':()=>tearFilm('serum')+note(TEAR_NOTES.serum)+credit(source(TFOS,'TFOS DEWS III 2025 치료 보고서')),
  'serum-steps':()=>serumSteps()+credit(source(TFOS,'TFOS DEWS III 2025 치료 보고서')),
  'incision-approaches':()=>incisionApproaches()+credit(source('https://www.aao.org/eye-health/diseases/what-are-chalazia-styes','AAO · 다래끼와 콩다래끼')),
  'punctal-plug':()=>punctalPlug()+credit(source('https://www.aao.org/eye-health/treatments/punctal-plugs','AAO · Punctal Plugs')),
  'ipl-treatment':()=>iplTreatment()+credit(source('https://eyewiki.aao.org/Intense_Pulsed_Light_%28IPL%29_therapy','AAO EyeWiki · IPL')),
  'aqueous-flow':()=>anteriorSegment('flow')+note('파란 점선은 눈 속 물(방수)의 흐름입니다. 이 물은 눈물과 다르며, 눈 안을 채우고 영양을 공급한 뒤 혈관으로 빠져나갑니다.')+credit(source(NEI_GLAUCOMA,'NEI · 녹내장')),
  'glaucoma-treatment-routes':()=>anteriorSegment('treatment')+note('치료는 안압을 낮추는 방향으로 작용합니다. 수술 종류에 따라 기존 배출 경로를 개선하거나 새 경로를 만듭니다. 어떤 치료를 먼저, 어떻게 조합할지는 녹내장 유형과 진행 정도에 따라 정합니다.')+credit(source('https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/glaucoma/glaucoma-medicines','NEI · 녹내장 약물')+' · '+source('https://www.nice.org.uk/guidance/ng81/chapter/Recommendations','NICE NG81')),
  'cup-disc':()=>cupDisc()+credit(source(NEI_GLAUCOMA,'NEI · 녹내장')),
  'glaucoma-risk':()=>glaucomaRisk()+credit(source('https://www.nice.org.uk/guidance/ng81/chapter/Recommendations','NICE NG81')+' · '+source(NEI_GLAUCOMA,'NEI · 녹내장')),
  'glaucoma-lifestyle':()=>glaucomaLifestyle()+credit(source(NEI_GLAUCOMA,'NEI · 녹내장')),
  'glaucoma-monitoring':()=>glaucomaMonitoring()+credit(source('https://www.eugs.org/news/visual-field-progression-2021-02-21-pearl','EGS · 시야 진행 평가')+' · '+source('https://www.nice.org.uk/guidance/ng81/chapter/Recommendations','NICE NG81')),
  'angle-panels':()=>anglePanels()+credit(source('https://www.aao.org/eye-health/diseases/what-is-chronic-angle-closure-glaucoma','AAO · 폐쇄각 녹내장')),
  'pilocarpine-pupil':()=>pilocarpinePupil()+credit(source('https://www.aao.org/eye-health/news/could-eyedrops-replace-glasses-presbyopia','AAO · 노안 안약'))
};
