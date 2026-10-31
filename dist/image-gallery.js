import {assets,topicImages} from './data/illustrations.js';
import {educationalVisualHTML} from './educational-visuals.js';

const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external=(url,label)=>`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`;
const credit=asset=>`<details class="image-attribution"><summary>출처·저작자·이용허락 · ${escape(asset.license)}</summary><div class="image-credit"><span class="image-original-title">원작: ${escape(asset.originalTitle)}</span><span>${escape(asset.author)}</span><span aria-hidden="true"> · </span>${external(asset.licenseUrl,asset.license)}<span aria-hidden="true"> · </span>${external(asset.sourceUrl,'원본·출처')}<span class="image-change-note">${escape(asset.changes)}</span></div></details>`;

function thumbnail(asset,item){
  const r=item.region;
  const common=`src="${escape(asset.src)}" alt="${escape(item.alt || asset.alt)}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async"`;
  if(!r)return `<img ${common}>`;
  const style=`width:${asset.width/r.width*100}%;height:${asset.height/r.height*100}%;left:${-r.x/r.width*100}%;top:${-r.y/r.height*100}%`;
  return `<span class="image-panel" style="aspect-ratio:${r.width}/${r.height}"><img ${common} style="${style}"></span>`;
}

function renderGroup(group,id,inline=false){
  const level=inline?'h3':'h2';
  return `<section id="${escape(id)}" class="illustration-section ${inline?'inline-illustrations':''}" aria-labelledby="${escape(id)}-heading"><div class="illustration-section-heading"><span class="illustration-label">VISUAL GUIDE</span><${level} id="${escape(id)}-heading">${escape(group.heading || '그림으로 함께 이해하기')}</${level}></div><p class="illustration-intro">${escape(group.intro)}</p>${educationalVisualHTML(group.visualId)}<div class="illustration-list ${group.layout==='grades'?'comparison-grid grade-series':group.layout==='compare'?'comparison-grid':''}">${group.items.map(item=>{
    const asset=assets[item.assetId];
    return `<figure class="medical-figure">${item.label?`<div class="comparison-label">${escape(item.label)}</div>`:''}<div class="figure-topline"><span class="figure-kind">${asset.kind==='diagram'?'설명 그림':asset.kind==='simulation'?'증상 재현':asset.kind==='device'?'실물 사진':'실제 검사·진료 사진'}</span><span class="figure-title">${escape(item.title || asset.title)}</span></div><button type="button" class="illustration-zoom ${item.region?'is-panel':''}" data-image-id="${escape(asset.id)}" aria-label="${escape(item.title || asset.title)} 크게 보기">${thumbnail(asset,item)}<span class="zoom-hint" aria-hidden="true">⤢ 크게 보기</span></button><figcaption><p class="figure-explanation">${escape(item.caption || asset.caption)}</p>${item.region?`<p class="panel-note">원본의 ${escape(item.regionLabel || '해당')} 부분을 화면에서 확대했습니다. 크게 보기에서는 전체 원본을 확인할 수 있습니다.</p>`:''}${credit(asset)}</figcaption></figure>`;
  }).join('')}</div><p class="illustration-footnote">실제 사진과 검사 영상은 한 가지 예시이며 사람마다 모습이 다릅니다. 영어 표기가 있는 그림은 아래의 한국어 설명과 함께 보세요.</p></section>`;
}

export function imageGalleryHTML(topicId,sectionTitle=null){
  const group=topicImages[topicId];
  if(!group)return '';
  if(sectionTitle!==null)return (group.sectionGroups || []).filter(g=>g.sectionTitle===sectionTitle).map((g,i)=>renderGroup(g,`illustrations-${topicId}-${(group.sectionGroups || []).indexOf(g)}`,true)).join('');
  return group.items?.length||group.visualId?renderGroup(group,'illustrations'):'';
}

export function setupIllustrationViewer(){
  const dialog=document.createElement('dialog');
  dialog.id='illustration-dialog';dialog.className='illustration-dialog';dialog.setAttribute('aria-labelledby','illustration-dialog-title');
  document.body.append(dialog);
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-image-id]');
    if(!button)return;
    const asset=assets[button.dataset.imageId];
    if(!asset)return;
    dialog.innerHTML=`<div class="dialog-head"><h2 id="illustration-dialog-title">${escape(asset.title)}</h2><div class="viewer-actions"><button type="button" class="secondary-button" data-image-natural aria-pressed="false">원본 크기</button><button type="button" class="icon-button" data-close-illustration aria-label="그림 닫기" autofocus>×</button></div></div><div class="illustration-viewer" style="--image-natural-width:${asset.width}px"><img src="${escape(asset.src)}" alt="${escape(asset.alt)}" width="${asset.width}" height="${asset.height}"></div><p class="viewer-caption">${escape(asset.caption)}</p>${credit(asset)}`;
    dialog.querySelector('[data-close-illustration]').addEventListener('click',()=>dialog.close());
    dialog.querySelector('[data-image-natural]').addEventListener('click',event=>{
      const actual=dialog.querySelector('.illustration-viewer').classList.toggle('is-actual-size');
      event.currentTarget.textContent=actual?'화면에 맞춤':'원본 크기';
      event.currentTarget.setAttribute('aria-pressed',actual);
    });
    dialog.showModal();
  });
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();});
}
