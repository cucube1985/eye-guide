import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,sep} from 'node:path';
import topics from '../dist/data/topics.js';
import {hasEducationalVisual} from '../dist/educational-visuals.js';

const manifestFiles=['anterior.json','retina.json','lens-glaucoma.json','supplemental.json','eyelids.json','cataract-revision.json','iol-history.json','accommodation.json','retina-revision.json','clinical-revision.json','pediatric-revision.json','educational-charts.json','review-1029.json'];
const collected=[];
for(const file of manifestFiles){
  try{const items=JSON.parse(await readFile(`content/images/${file}`,'utf8'));if(!Array.isArray(items))throw new Error('Expected an array');collected.push(...items);}
  catch(error){if(['eyelids.json','cataract-revision.json','iol-history.json','accommodation.json'].includes(file)&&error.code==='ENOENT')continue;throw error;}
}
const assets={};
for(const item of collected){
  if(assets[item.id])throw new Error(`Duplicate image ID: ${item.id}`);
  for(const key of ['id','src','title','alt','caption','author','license','licenseUrl','sourceUrl','originalUrl','downloadUrl','checked','changes'])if(!item[key])throw new Error(`${item.id}: missing ${key}`);
  if(!/^(CC BY(?:-SA)? (?:2\.0|2\.5|3\.0|4\.0)|CC0(?: 1\.0)?|Public domain(?: \(PD-self\))?)$/i.test(item.license))throw new Error(`${item.id}: verify supported license ${item.license}`);
  if(!/^\.\/images\/[a-z0-9-]+\.(?:png|jpe?g|webp|gif)$/.test(item.src))throw new Error(`Invalid local image path: ${item.src}`);
  for(const key of ['licenseUrl','sourceUrl','originalUrl','downloadUrl'])if(new URL(item[key]).protocol!=='https:')throw new Error(`${item.id}: HTTPS required for ${key}`);
  if(!(item.width>0&&item.height>0)||!['diagram','clinical','simulation','device'].includes(item.kind))throw new Error(`${item.id}: image dimensions or type missing`);
  const path=resolve('dist',item.src);
  if(!path.startsWith(resolve('dist/images')+sep))throw new Error('Image path escapes image directory');
  const bytes=await readFile(path);if(bytes.length<500)throw new Error(`${item.id}: not a usable image`);
  const {metadataEvidence,...publicItem}=item;
  const originalTitle=item.originalTitle || metadataEvidence?.fileTitle?.replace(/^File:/,'') || decodeURIComponent(new URL(item.sourceUrl).pathname.split('/').pop()).replace(/^File:/,'').replace(/_/g,' ');
  assets[item.id]={...publicItem,originalTitle,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
}
const topicImages=JSON.parse(await readFile('content/images/topic-map.json','utf8'));
const allItems=group=>[...group.items,...(group.sectionGroups || []).flatMap(g=>g.items)];
for(const topic of topics){
  const group=topicImages[topic.id];
  if(!group?.intro||(!group.items?.length&&!hasEducationalVisual(group.visualId)))throw new Error(`${topic.id}: missing relevant image`);
  if(group.visualId&&!hasEducationalVisual(group.visualId))throw new Error(`${topic.id}: unknown visual`);
  for(const section of group.sectionGroups || []){
    if(!topic.sections.some(s=>s.title===section.sectionTitle))throw new Error(`${topic.id}: unknown section ${section.sectionTitle}`);
    if(!section.heading||!section.intro||(!section.items?.length&&!hasEducationalVisual(section.visualId)))throw new Error(`${topic.id}: incomplete section illustrations`);
  }
  for(const item of allItems(group)){
    const asset=assets[item.assetId];if(!asset)throw new Error(`${topic.id}: unknown image ${item.assetId}`);
    if(item.region){const r=item.region;if(![r.x,r.y,r.width,r.height].every(Number.isFinite)||r.x<0||r.y<0||r.width<=0||r.height<=0||r.x+r.width>asset.width||r.y+r.height>asset.height)throw new Error(`${topic.id}: invalid panel bounds`);}
  }
}
for(const id of Object.keys(topicImages))if(!topics.some(t=>t.id===id))throw new Error(`Unknown topic ${id}`);
const used=new Set(Object.values(topicImages).flatMap(g=>allItems(g).map(i=>i.assetId)));
const selected=Object.fromEntries(Object.entries(assets).filter(([id])=>used.has(id)));
const output=`// Generated from content/images; licenses and originals preserved in IMAGE_CREDITS.md.\nexport const assets = ${JSON.stringify(selected,null,2)};\nexport const topicImages = ${JSON.stringify(topicImages,null,2)};\n`;
await writeFile('dist/data/illustrations.js',output,'utf8');
const lines=['# 환자교육 이미지 출처와 이용허락','',`이미지별 이용 조건 확인일: 2026-10-29 · ${used.size}개 이미지, ${topics.length}개 설명에 연결`,'',
  '이미지마다 표시된 저작자·원본 링크·라이선스를 유지합니다. CC BY-SA 이미지의 이용 조건은 해당 이미지에 적용됩니다. 이미지를 수정·재배포할 때는 원본 페이지와 해당 라이선스의 조건을 확인하세요. 기관·저작자가 이 사이트나 진료를 추천·보증한다는 뜻은 아닙니다.','',
  'NIH/NEI 사이트의 모든 그림이 자유 이용 가능한 것은 아닙니다. 이번에 포함한 NEI 그림은 개별 파일의 공개 이용 표시를 확인한 자료입니다. 원시 메타데이터와 검토 기록은 `content/images/*.json`에 남겼습니다.',''];
for(const asset of Object.values(assets)){
  const originalTitle=asset.originalTitle || asset.metadataEvidence?.ObjectName || asset.title;
  lines.push(`## ${asset.title}`,'',`- 파일: \`${asset.src}\``,`- 원작 제목: ${originalTitle}`,`- 저작자·표시: ${asset.author}`,`- 이용허락: [${asset.license}](${asset.licenseUrl})`,`- 원본·이용 조건: [원본 설명 페이지](${asset.sourceUrl})`,`- 원본 파일: ${asset.originalUrl}`,`- 저장에 사용한 주소: ${asset.downloadUrl}`,`- 변경 여부: ${asset.changes}`,`- 확인일: ${asset.checked}`,`- SHA-256: \`${asset.sha256}\``,
    `- 연결 설명: ${topics.filter(t=>allItems(topicImages[t.id]).some(i=>i.assetId===asset.id)).map(t=>`${t.number} ${t.title}`).join(', ') || '현재 화면 미사용 · 원본 자료 기록'}`,'');
}
await writeFile('IMAGE_CREDITS.md',lines.join('\n'),'utf8');
await writeFile('dist/IMAGE_CREDITS.md',lines.join('\n'),'utf8');
console.log(`Prepared ${used.size} licensed images for ${topics.length} guides (${(Object.values(selected).reduce((n,a)=>n+a.bytes,0)/1048576).toFixed(2)} MiB).`);
