// Patient-education revision: distinguish tissue structure from treatment targets.
// Original vectors, CC BY 4.0. TFOS DEWS II Tear Film / DEWS III 2025.
const tx=(x,y,t,size=17,color='#36594c')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-family="inherit">${t}</text>`;
export function tearFilmReviewed(focus='all'){
  const treatments=[
    ['artificial','인공눈물','수분·윤활을 보충 · 제제마다 성분이 다름'],
    ['mucin','분비 촉진제','수분·뮤신 분비와 표면 상태를 도움'],
    ['inflammation','항염증 안약','눈 표면의 염증을 조절'],
    ['serum','혈청 등 혈액 유래 점안제','심한 표면 손상 등에서 추가 고려'],
    ['lipid','눈꺼풀 관리 · 선택적 IPL','마이봄샘 기능장애 등을 평가해 선택'],
    ['plug','눈물점 마개','눈물 배출을 줄여 표면에 머물게 함']
  ];
  const cells=Array.from({length:10},(_,i)=>`<rect x="${50+i*47}" y="326" width="43" height="56" rx="11" fill="#efdcca" stroke="#c5aa90"/><circle cx="${71+i*47}" cy="354" r="7" fill="#c9ad8c"/>`).join('');
  const chains=Array.from({length:22},(_,i)=>{const x=60+i*21;return `<path d="M${x} 326q-7-13 1-25t-1-25" fill="none" stroke="#bc7fa2" stroke-width="2"/>`;}).join('');
  return `<svg class="education-svg" viewBox="0 0 960 530" role="img" aria-labelledby="tear-reviewed-title-${focus} tear-reviewed-desc-${focus}"><title id="tear-reviewed-title-${focus}">눈물막의 성분과 치료의 역할</title><desc id="tear-reviewed-desc-${focus}">바깥의 얇은 기름층과, 물과 뮤신이 섞인 수성 부분, 눈 표면 세포에 붙은 당질층을 보여줍니다. 물과 뮤신은 서로 분리된 단단한 층이 아닙니다. 치료는 여러 성분과 눈 표면 기능에 함께 영향을 줍니다.</desc><defs><linearGradient id="tear-mix-${focus}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c8e8ee"/><stop offset=".7" stop-color="#d0e3e6"/><stop offset="1" stop-color="#e1cddd"/></linearGradient></defs><rect width="960" height="530" rx="14" fill="#faf9f2"/>${tx(40,37,'눈 표면을 덮는 눈물막',21)}${tx(55,86,'공기와 닿는 면',16,'#637c72')}<rect x="50" y="105" width="470" height="26" fill="#efce75"/><rect x="50" y="131" width="470" height="195" fill="url(#tear-mix-${focus})"/>${chains}${cells}${tx(67,123,'기름 성분 · 주로 마이봄샘에서 공급',15,'#735c23')}${tx(67,199,'물과 뮤신이 섞인 부분',20)}${tx(67,231,'수분 공급 · 표면을 고르게 적심',17)}${tx(67,304,'표면에 붙은 뮤신·당질층',16,'#80566f')}${tx(67,413,'각막·결막 표면 세포',17)}${tx(50,463,'물과 뮤신은 섞여 있습니다.',17)}${tx(50,492,'깜박임·눈꺼풀·염증·신경 기능도 중요합니다.',16)}${tx(565,37,'검사로 원인을 확인하고 치료를 조합합니다.',18)}${treatments.map(([id,title,desc],i)=>{const y=58+i*73;return `<rect x="558" y="${y}" width="380" height="63" rx="11" fill="${id===focus?'#fff0c9':'#edf2e8'}" stroke="${id===focus?'#c6a148':'#dce4d6'}"/>${tx(576,y+26,title,18)}${tx(576,y+50,desc,14,'#62776b')}`;}).join('')}</svg>`;
}

export function ciliaContactReviewed(){
  return `<svg class="education-svg" viewBox="0 0 960 360" role="img" aria-labelledby="cilia-review-title cilia-review-desc"><title id="cilia-review-title">속눈썹 접촉과 각막 표면 손상</title><desc id="cilia-review-desc">각막 표면에 속눈썹이 닿으면 반복 마찰로 상피가 벗겨질 수 있습니다. 이물감과 눈물이 생길 수 있으며 모든 접촉이 영구 흉터로 이어지는 것은 아닙니다.</desc><rect width="960" height="360" rx="14" fill="#faf9f2"/>${tx(30,37,'속눈썹이 반복해서 닿을 때 · 단순화한 단면',21)}<rect x="45" y="163" width="470" height="107" rx="14" fill="#dbecef" stroke="#8cadb4"/><path d="M45 163H247l7 14 10-13 11 13 12-14h228" fill="none" stroke="#b56a61" stroke-width="7"/><path d="M67 101Q137 47 265 161M82 89Q174 64 278 161M99 79Q189 82 290 161" stroke="#5c5145" stroke-width="5" fill="none"/>${tx(53,307,'각막의 바탕 조직',17)}${tx(326,131,'표면 상피',17)}<path d="M330 138l-24 24" stroke="#8d9b90" stroke-width="2"/>${tx(564,109,'반복 마찰 → 표면 상피 손상',20)}${tx(564,153,'이물감·눈물·눈부심이 생길 수 있음',17)}${tx(564,209,'접촉 원인을 확인하고 치료합니다.',18)}${tx(564,249,'모든 접촉이 영구 흉터로',17)}${tx(564,276,'이어지는 것은 아닙니다.',17)}</svg>`;
}
