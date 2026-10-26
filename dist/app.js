import topics,{categories,metadata} from './data/topics.js';
import {navigationHTML,articleHTML} from './views.js';

const $ = selector => document.querySelector(selector);
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = (name,size=17) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${({search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',back:'<path d="M19 12H5m6-6-6 6 6 6"/>',print:'<path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7z"/><path d="M17 11h.01"/>',share:'<path d="M12 16V3m-5 5 5-5 5 5M5 13v7h14v-7"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',lens:'<ellipse cx="12" cy="12" rx="5" ry="9"/><path d="M3 12h3m12 0h3"/>',nerve:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6m-4-8 5 2m-9 2 2 5"/>',retina:'<path d="M17 4a9 9 0 1 0 0 16M17 4a12 12 0 0 1 0 16m-5-8h8M7 7l5 5-5 5"/>'})[name] || ''}</svg>`;
const groupIcon = id => icon(({anterior:'eye',cataract:'lens',glaucoma:'nerve',retina:'retina',pediatric:'eye',other:'eye'})[id] || 'eye');
let filter = 'all';
let query = '';
let toastTimer;

function eyeDiagram(id='overview', hero=false) {
  const anteriorEye = ['conjunctivitis','stye','subconjunctival-hemorrhage','tearing'].includes(id);
  if (anteriorEye) {
    let variation = '';
    if(id==='conjunctivitis') variation='<path d="m48 79 18 7m-5-21 11 17m114-3-15 7m12 16-16-7M62 111l15-9" stroke="#c48677" stroke-width="1.5"/>';
    if(id==='stye') variation='<circle cx="139" cy="57" r="9" fill="#d6a18a" stroke="#ad715a" stroke-width="1.5"/>';
    if(id==='subconjunctival-hemorrhage') variation='<path d="M160 70q19 7 24 21-12 14-31 16l-4-18Z" fill="#bb7468" opacity=".8"/>';
    if(id==='tearing') variation='<path d="M178 113q-7 10-7 14a7 7 0 0 0 14 0q0-4-7-14Z" fill="#97b8bc"/><path d="m48 98 19 4m96 0 22-4" stroke="#97b8bc" stroke-width="3"/>';
    return `<svg viewBox="0 0 240 180" aria-hidden="true"><path d="M32 90Q70 32 120 42q49-8 88 48-39 55-88 49Q71 146 32 90Z" fill="#fcfbf5" stroke="#8eaa82" stroke-width="2"/><path d="M31 91q90-97 178 0" fill="none" stroke="#92a986" stroke-width="3"/><circle cx="120" cy="90" r="32" fill="#bfd0ad" stroke="#819f76" stroke-width="1.5"/><circle cx="120" cy="90" r="22" fill="#7c9c74"/><circle cx="120" cy="90" r="12" fill="#315e49"/><circle cx="112" cy="81" r="6" fill="#f6f8ed" opacity=".9"/>${variation}<path d="M45 53q72-44 145 0" fill="none" stroke="#c7d1ba" stroke-width="1.4"/></svg>`;
  }
  const lens = id==='cataract' ? '#d2c5a0' : '#bdcfbb';
  const nerve = id.startsWith('glaucoma') ? '#bc9a71' : '#d5be8d';
  const retinaColor = ['retinal-detachment','epiretinal-membrane','macular-degeneration','central-serous'].includes(id) ? '#b78274' : '#b6c3a0';
  const detail = {
    'retinal-detachment':'<path d="M291 107Q257 140 275 184" fill="none" stroke="#ad7668" stroke-width="5"/><path d="M291 107Q296 144 291 184" fill="#dcbeb0" opacity=".4"/>',
    'epiretinal-membrane':'<path d="M286 130q-5 9 0 17t-1 16" fill="none" stroke="#9c766c" stroke-width="4"/>',
    'macular-degeneration':'<circle cx="288" cy="154" r="9" fill="#ceac78"/><circle cx="282" cy="140" r="3" fill="#ceac78"/><circle cx="283" cy="168" r="3" fill="#ceac78"/>',
    'central-serous':'<path d="M291 127q-29 24-1 48" fill="#c0d8d3" stroke="#8eb2aa" stroke-width="2"/>',
    'glaucoma-basics':'<path d="m306 142 20-4m-20 12 20 1m-20 8 20 5" stroke="#ad8c65" stroke-width="2"/>',
    'glaucoma-progression':'<path d="m306 142 20-4m-20 12 20 1m-20 8 20 5" stroke="#ad8c65" stroke-width="2"/>',
  }[id] || '';
  const labels=hero?'<g font-family="sans-serif" font-size="10" fill="#819473"><path d="M125 117 79 65H34" fill="none" stroke="#a6b39c"/><circle cx="125" cy="117" r="3" fill="#819c6c"/><text x="34" y="57">전안부</text><path d="M162 151 141 249H84" fill="none" stroke="#a6b39c"/><circle cx="162" cy="151" r="3" fill="#819c6c"/><text x="84" y="265">수정체</text><path d="M289 103 330 64h51" fill="none" stroke="#a6b39c"/><circle cx="289" cy="103" r="3" fill="#819c6c"/><text x="340" y="56">망막</text><path d="M321 153 342 243h42" fill="none" stroke="#a6b39c"/><circle cx="321" cy="153" r="3" fill="#819c6c"/><text x="341" y="259">시신경</text></g>':'';
  return `<svg viewBox="${hero?'0 0 420 320':'66 40 286 225'}" aria-hidden="true"><path d="m300 131 46 8v27l-46 9" fill="${nerve}" stroke="#a4a580" stroke-width="1.5"/><path d="m310 143 38 4m-38 9 38 3" stroke="#e8ddb8" stroke-width="2"/><ellipse cx="212" cy="151" rx="96" ry="101" fill="#f9f6e9" stroke="#8da77c" stroke-width="2.5"/><path d="M158 71a89 94 0 1 1 0 160" fill="#edf0dc" stroke="${retinaColor}" stroke-width="5"/><path d="M156 77a83 88 0 1 1 0 148" fill="none" stroke="#d4d6b8" stroke-width="2"/><path d="M132 98Q88 151 132 204q22-52 0-106Z" fill="#edf2e5" stroke="#8da77c" stroke-width="2"/><path d="M138 108v27m0 32v27" stroke="#789a70" stroke-width="6"/><ellipse cx="157" cy="151" rx="19" ry="43" fill="${lens}" stroke="#8ca47c" stroke-width="1.7" opacity=".88"/><path d="m42 130 98 10 35 10 113 1m-246 21 98-11 35-9" stroke="#cabd89" stroke-width="1.4" fill="none" opacity=".7"/><path d="M192 90q44-20 74 23" fill="none" stroke="#fffef4" stroke-width="6" opacity=".7"/>${detail}${labels}</svg>`;
}

function renderNavigation(currentId) {
  $('#navigation').innerHTML=navigationHTML(currentId,groupIcon);
  $('[data-home] .count').textContent=topics.length;
  $('[data-home]').classList.toggle('active',!currentId);
  if(!currentId) $('[data-home]').setAttribute('aria-current','page'); else $('[data-home]').removeAttribute('aria-current');
}

function renderHome() {
  document.title='눈에 담다 · 안과 진료 안내';
  $('#breadcrumb').innerHTML='눈 건강 라이브러리 <span>/</span> 전체 안내';
  $('#main').innerHTML=`<section class="hero" aria-labelledby="home-heading"><div class="hero-copy"><div class="eyebrow">A LITTLE CLARITY FOR YOUR EYES</div><h1 id="home-heading">눈 건강,<br><strong>차근차근 함께.</strong></h1><p>어려웠던 눈 이야기, 이해하기 쉽게 담았습니다.<br>궁금한 질환을 선택하고 내 눈에 대해 알아보세요.</p><div class="hero-caption"><span>✓</span> 진료실에서 함께 보고, 집에서도 다시 읽는 안내</div></div><div class="eye-visual">${eyeDiagram('overview',true)}<div class="visual-caption">OUR EYES, A CLOSER LOOK · 눈의 구조 모식도</div></div></section><div class="welcome-strip"><span class="strip-icon" aria-hidden="true">✧</span><span><strong>어떤 설명이 필요하신가요?</strong> 질환을 선택하면 증상부터 치료, 관리 방법까지 볼 수 있어요.</span><span class="strip-end">${topics.length}개의 눈 건강 이야기</span></div><section class="library" aria-labelledby="library-heading"><div class="section-head"><h2 id="library-heading">질환별 안내<small>내 눈에 필요한 설명 찾기</small></h2><div class="search">${icon('search',14)}<label class="sr-only" for="search">질환 또는 증상 검색</label><input type="search" id="search" autocomplete="off" placeholder="질환 또는 증상으로 찾아보세요" value="${escape(query)}"><button class="search-clear" id="clear-search" aria-label="검색어 지우기" ${query?'':'hidden'}>×</button></div></div><div class="filters" role="group" aria-label="질환 분류">${categories.map(c=>`<button class="filter ${filter===c.id?'active':''}" data-filter="${c.id}" aria-pressed="${filter===c.id}">${c.label}<span>${c.id==='all'?topics.length:topics.filter(t=>t.category===c.id).length}</span></button>`).join('')}</div><div id="result-info" class="result-info" role="status" aria-live="polite"></div><div id="disease-grid" class="disease-grid"></div></section><section class="urgent-banner" aria-label="응급 증상 안내"><span class="urgent-icon" aria-hidden="true">!</span><div><h3>갑작스러운 눈의 변화, 기다리지 마세요.</h3><p>갑자기 시력이 떨어지거나 심한 통증, 번쩍임·날파리 증가, 커튼처럼 가리는 증상이 생기면 즉시 안과에 연락하거나 응급 진료를 받으세요.</p></div></section>`;
  renderCards();
  $('#search').addEventListener('input',e=>{query=e.target.value;$('#clear-search').hidden=!query;renderCards();});
  $('#clear-search').addEventListener('click',()=>{query='';$('#search').value='';$('#clear-search').hidden=true;renderCards();$('#search').focus();});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===filter);b.setAttribute('aria-pressed',b.dataset.filter===filter);});
    renderCards();
  }));
}

function renderCards() {
  const normalized=query.toLocaleLowerCase().replace(/\s/g,'');
  const found=topics.filter(t=>(filter==='all'||t.category===filter)&&[t.searchText,t.id==='central-serous'?'CSC 중심성 장액성 맥락망막병증 중심장액':''].join(' ').toLocaleLowerCase().replace(/\s/g,'').includes(normalized));
  $('#result-info').textContent=query?`“${query}” 검색 결과 ${found.length}개`:'';
  $('#result-info').hidden=!query;
  $('#disease-grid').innerHTML=found.length ? found.map(t=>{
    const c=categories.find(c=>c.id===t.category);
    return `<a class="disease-card category-${t.category}" href="#/${t.id}" aria-label="${escape(t.title)} 설명 보기"><div class="card-illustration"><span class="card-index">${t.number}</span><span class="card-category">${c.label}</span>${eyeDiagram(t.id)}</div><div class="card-body"><h3>${escape(t.title)}</h3><p>${escape(t.summary)}</p><div class="card-bottom"><span>${t.number.split('.').length>2?'더 자세한 설명':'증상 · 치료 · 생활 관리'}</span><span class="card-arrow" aria-hidden="true">↗</span></div></div></a>`;
  }).join('') : `<div class="empty-state"><h3>일치하는 설명이 없어요.</h3><p>검색어를 짧게 바꾸거나 다른 분류를 선택해 보세요.</p><button class="secondary-button" id="reset-search">전체 안내 보기</button></div>`;
  $('#reset-search')?.addEventListener('click',()=>{query='';filter='all';renderHome();$('#search').focus();});
}

function renderArticle(t) {
  const category=categories.find(c=>c.id===t.category);
  document.title=`${t.title} · 눈에 담다`;
  $('#breadcrumb').innerHTML=`<a href="#/">눈 건강 라이브러리</a> <span>/</span> ${category.label}`;
  $('#main').innerHTML=articleHTML(t,{icon,groupIcon,eyeDiagram});
  document.querySelectorAll('[data-scroll]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById(a.dataset.scroll)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}));
  $('#share-guide').addEventListener('click',share);
  $('#print-guide').addEventListener('click',()=>window.print());
  $('#font-smaller').addEventListener('click',()=>adjustFont(-1));
  $('#font-larger').addEventListener('click',()=>adjustFont(1));
}

function adjustFont(change) {
  const current=parseFloat(getComputedStyle(document.body).getPropertyValue('--article-size'));
  const next=Math.max(15,Math.min(28,current+change));
  document.body.style.setProperty('--article-size',`${next}px`);
  toast(`본문 글자 크기 ${next}px`);
}

function route() {
  const id=location.hash.replace(/^#\/?/,'').split('?')[0];
  renderNavigation(id);
  if(!id) renderHome();
  else {
    const topic=topics.find(t=>t.id===id);
    if(topic) renderArticle(topic);
    else {
      document.title='설명을 찾을 수 없어요 · 눈에 담다';
      $('#breadcrumb').textContent='눈 건강 라이브러리';
      $('#main').innerHTML='<section class="not-found"><div class="eyebrow">EYE HEALTH GUIDE</div><h1>설명을 찾을 수 없어요.</h1><p>주소를 다시 확인하거나 전체 안내에서 질환을 선택해 주세요.</p><a class="primary-button" href="#/">전체 안내 보기</a></section>';
    }
  }
  $('.sidebar').classList.remove('menu-open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','질환 메뉴 열기');
  window.scrollTo({top:0,behavior:'instant'});
  $('#main').focus({preventScroll:true});
}

function toast(message) {$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3000);}
async function copyLink() {
  try {await navigator.clipboard.writeText(location.href);toast('설명 링크를 복사했어요.');return true;}
  catch {return false;}
}
async function share() {
  if(await copyLink()) return;
  $('#share-url').value=location.href;$('#share-dialog').showModal();$('#share-url').select();
}
$('.skip-link').addEventListener('click',e=>{e.preventDefault();$('#main').focus();$('#main').scrollIntoView();});
$('#dialog-copy').addEventListener('click',async()=>{
  if(await copyLink()) $('#share-dialog').close();
  else {$('#share-url').focus();$('#share-url').select();toast('선택된 주소를 Ctrl+C로 복사하세요.');}
});
$('[data-close-dialog]').addEventListener('click',()=>$('#share-dialog').close());
$('#share-dialog').addEventListener('click',e=>{if(e.target===$('#share-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('#reading-toggle').addEventListener('click',()=>{
  const enabled=document.body.classList.toggle('reading-mode');document.body.style.removeProperty('--article-size');
  $('#reading-toggle').setAttribute('aria-pressed',enabled);$('#reading-toggle').innerHTML=`<span aria-hidden="true">Aa</span> ${enabled?'기본 글씨':'큰 글씨'}`;
  toast(enabled?'큰 글씨로 바꿨어요.':'기본 글씨로 바꿨어요.');
});
$('#menu-toggle').addEventListener('click',()=>{const open=$('.sidebar').classList.toggle('menu-open');$('#menu-toggle').setAttribute('aria-expanded',open);$('#menu-toggle').setAttribute('aria-label',open?'질환 메뉴 닫기':'질환 메뉴 열기');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('.sidebar').classList.remove('menu-open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','질환 메뉴 열기');}});
document.addEventListener('click',e=>{if(window.innerWidth<=700&&!e.target.closest('.sidebar,.mobile-bar')){$('.sidebar').classList.remove('menu-open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','질환 메뉴 열기');}});
let printClosed=[];
window.addEventListener('beforeprint',()=>{printClosed=[...document.querySelectorAll('.faq details:not([open])')];printClosed.forEach(d=>d.open=true);});
window.addEventListener('afterprint',()=>{printClosed.forEach(d=>d.open=false);printClosed=[];});
window.addEventListener('hashchange',route);
route();
