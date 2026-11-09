export const PUBLIC_GUIDE_URL='https://cucube1985.github.io/eye-guide/';
// Hash titles instead of section positions so links survive reordered sections.
export function sectionKey(section){
  const simple={symptoms:'symptoms',care:'care',urgent:'urgent',faq:'faq',sources:'sources'}[section.role];
  if(simple)return simple;
  let hash=2166136261;
  for(const ch of section.title){hash^=ch.codePointAt(0);hash=Math.imul(hash,16777619);}
  return `s-${(hash>>>0).toString(36)}`;
}
export function routeHash(topicId,{view='detail',section=null}={}){
  const params=new URLSearchParams();
  if(view==='brief')params.set('view','brief');
  if(section)params.set('section',section);
  return `#/${encodeURIComponent(topicId)}${params.size?'?'+params:''}`;
}
export function publicGuideUrl(topicId,options={}){return PUBLIC_GUIDE_URL+routeHash(topicId,options);}
export function parseGuideRoute(hash){
  const [path,query='']=hash.replace(/^#\/?/,'').split('?');
  const params=new URLSearchParams(query);
  return {topicId:path,view:params.get('view')==='brief'?'brief':'detail',section:params.get('section')||null};
}
export function shareScopes(topic){
  return [{key:'all',label:'전체 설명'},{key:'brief',label:'1분 요약'},{key:'key',label:'핵심 안내'},{key:'illustrations',label:'그림으로 이해하기'},
    ...(topic.id==='floaters-pvd'?[{key:'vitreous-model',label:'유리체 액화 3D'}]:[]),
    ...topic.sections.map(s=>({key:sectionKey(s),label:s.title}))];
}
export function scopeUrl(topicId,scope){
  return publicGuideUrl(topicId,scope==='brief'?{view:'brief'}:scope==='all'?{}:{section:scope});
}
export function sectionElementId(key){return key==='key'?'key-message':key==='illustrations'?'illustrations-target':key==='vitreous-model'?key:`section-${key}`;}
