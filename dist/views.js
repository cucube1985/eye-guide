import {renderMarkdown,renderInline} from './markdown.js';
import topics,{categories,metadata} from './data/topics.js';
import {imageGalleryHTML} from './image-gallery.js';

const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sectionHTML=(s,t,i)=>{
  const cls=({content:'article-section',symptoms:'symptom-section',urgent:'article-urgent',care:'care-box',faq:'faq',sources:'sources'})[s.role]||'article-section';
  const body=s.role==='faq'&&t.faq.length?t.faq.map(f=>`<details><summary>${renderInline(f.q)}</summary><div class="faq-answer">${renderMarkdown(f.answerMarkdown,f.q)}</div></details>`).join(''):renderMarkdown(s.markdown,s.title);
  return `<section class="guide-section ${cls}" id="section-${i}"><h2>${s.role==='content'?`<span class="section-no">${String(i+1).padStart(2,'0')}</span>`:''}${escape(s.title)}</h2><div class="markdown-body ${s.role==='symptoms'?'symptoms-content':''}">${body}</div>${s.role==='sources'?`<p class="source-date">제공된 원고 반영 · 문구 갱신 ${metadata.updated}<br>개인별 진료 결과와 국내 허가·사용 가능 여부에 따라 치료 계획은 달라질 수 있습니다.</p>`:''}</section>`;
};

export function navigationHTML(currentId,groupIcon) {
  const current=topics.find(t=>t.id===currentId);
  return categories.slice(1).map(c=>`<details class="nav-group" ${current?.category===c.id||(!currentId&&c.id==='anterior')?'open':''}><summary><span class="nav-symbol">${groupIcon(c.id)}</span>${c.label}<span class="nav-count">${topics.filter(t=>t.category===c.id).length}</span></summary><div class="nav-items">${topics.filter(t=>t.category===c.id).map(t=>`<a href="#/${t.id}" class="nav-item ${t.number.split('.').length>2?'is-child':''} ${currentId===t.id?'active':''}" ${currentId===t.id?'aria-current="page"':''} title="${escape(t.title)}"><span class="nav-number">${t.number}</span>${escape(t.shortTitle)}</a>`).join('')}</div></details>`).join('');
}

export function articleHTML(t,{icon,groupIcon,eyeDiagram}) {
  const category=categories.find(c=>c.id===t.category);
  const familyNumber=t.number.split('.').slice(0,2).join('.');
  const family=topics.filter(x=>x.id!==t.id&&(x.number===familyNumber||x.number.startsWith(familyNumber+'.')));
  const related=family.length?family:topics.filter(x=>x.category===t.category&&x.id!==t.id).slice(0,6);
  return `<article><div class="article-actions"><a class="back-link" href="#/">${icon('back',14)} 전체 안내로</a><div class="action-buttons"><button class="secondary-button" id="print-guide">${icon('print',14)} 인쇄</button><button class="secondary-button" id="share-guide">${icon('share',14)} 링크 공유</button></div></div><header class="article-heading with-illustrations"><div><span class="article-tag">${groupIcon(t.category)} ${category.label} <span class="topic-number">${t.number}</span></span><h1 class="${t.title.length>25?'long-title':''}">${escape(t.title)}</h1><p class="article-english">${escape(t.english)}</p><div class="article-summary markdown-body">${renderMarkdown(t.summaryMarkdown)}</div></div></header><div class="article-grid"><div class="article-content"><section class="key-message" id="key-message"><span class="label">이것만은 기억하세요</span><div class="markdown-body">${renderMarkdown(t.keyMarkdown)}</div></section>${imageGalleryHTML(t.id)}${t.sections.map((s,i)=>sectionHTML(s,t,i)).join('')}</div><aside class="article-aside" aria-label="이 페이지 목차"><div class="aside-sticky"><p class="aside-label">IN THIS GUIDE</p><nav class="article-toc"><a href="#key-message" data-scroll="key-message">핵심 안내</a><a href="#illustrations" data-scroll="illustrations">그림으로 이해하기</a>${t.sections.map((s,i)=>`<a href="#section-${i}" data-scroll="section-${i}">${escape(s.title)}</a>`).join('')}</nav><div class="font-controls"><span>본문 글자 크기</span><div><button id="font-smaller" aria-label="본문 글씨 작게">A−</button><button id="font-larger" aria-label="본문 글씨 크게">A+</button></div></div><p class="aside-tip">상단의 ‘큰 글씨’를 누르면<br>진료실에서 함께 보기 좋은<br>넓고 큰 화면으로 바뀝니다.</p></div></aside></div>${related.length?`<section class="related"><h2>함께 읽어보세요</h2><div class="related-links">${related.map(x=>`<a href="#/${x.id}">${escape(x.shortTitle)} ↗</a>`).join('')}</div></section>`:''}</article>`;
}
