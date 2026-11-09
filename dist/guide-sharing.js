import topics from './data/topics.js';
import {shareScopes,scopeUrl,parseGuideRoute} from './guide-links.js';
import {qrSvg,qrPngUrl} from './qr.js';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function setupGuideSharing(toast){
  const dialog=document.querySelector('#share-dialog');
  let currentTopic=null,currentScope='all',currentUrl='';
  function update(){
    currentScope=dialog.querySelector('#share-scope').value;
    currentUrl=scopeUrl(currentTopic.id,currentScope);
    dialog.querySelector('#share-url').value=currentUrl;
    dialog.querySelector('#qr-image').innerHTML=qrSvg(currentUrl);
    dialog.querySelector('#share-preview').href=currentUrl;
    const download=dialog.querySelector('#qr-download');
    download.href=qrPngUrl(currentUrl);
    download.download=`eye-guide-${currentTopic.id}-${currentScope}.png`;
    const scope=shareScopes(currentTopic).find(x=>x.key===currentScope);
    dialog.querySelector('#share-description').textContent=`${currentTopic.shortTitle} · ${scope.label}`;
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-share-scope]');if(!button)return;
    const route=parseGuideRoute(location.hash);currentTopic=topics.find(t=>t.id===route.topicId);if(!currentTopic)return;
    const scopes=shareScopes(currentTopic),requested=button.dataset.shareScope;
    const selected=scopes.some(s=>s.key===requested)?requested:'all';
    dialog.innerHTML=`<div class="dialog-head"><h2 id="share-title">설명 공유 · QR</h2><button class="icon-button" data-close-share aria-label="공유 창 닫기" autofocus>×</button></div><p id="share-description"></p><label for="share-scope">보낼 내용</label><select id="share-scope">${scopes.map(s=>`<option value="${s.key}" ${s.key===selected?'selected':''}>${escape(s.label)}</option>`).join('')}</select><div id="qr-image" class="qr-image"></div><p class="qr-instruction">휴대폰 카메라로 비추면 선택한 설명이 열립니다.</p><label for="share-url">공유 주소</label><input id="share-url" readonly><div class="share-buttons"><button type="button" class="primary-button" id="dialog-copy">주소 복사</button><a class="secondary-button" id="qr-download" download>QR 이미지 저장</a><a id="share-preview" class="secondary-button" target="_blank" rel="noopener noreferrer">설명 열기 ↗</a></div>`;
    dialog.querySelector('[data-close-share]').addEventListener('click',()=>dialog.close());
    dialog.querySelector('#share-scope').addEventListener('change',update);
    dialog.querySelector('#dialog-copy').addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(currentUrl);toast('설명 주소를 복사했어요.');}
      catch{const input=dialog.querySelector('#share-url');input.focus();input.select();toast('선택된 주소를 복사해 주세요.');}
    });
    update();dialog.showModal();
  });
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();});
}
