import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import topics from '../dist/data/topics.js';
import {assets,topicImages} from '../dist/data/illustrations.js';
import {imageGalleryHTML} from '../dist/image-gallery.js';

function dimensions(bytes){
  if(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return [bytes.readUInt32BE(16),bytes.readUInt32BE(20)];
  if(bytes[0]===255&&bytes[1]===216){
    let offset=2;
    while(offset<bytes.length-9){
      if(bytes[offset++]!==255)continue;
      while(bytes[offset]===255)offset++;
      const marker=bytes[offset++];
      if(marker===0xd9||marker===0xda)break;
      if(marker===1||(marker>=0xd0&&marker<=0xd7))continue;
      const length=bytes.readUInt16BE(offset);
      if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return [bytes.readUInt16BE(offset+5),bytes.readUInt16BE(offset+3)];
      if(length<2)break;offset+=length;
    }
  }
  throw new Error('Unsupported or invalid image file');
}
let placements=0;
for(const asset of Object.values(assets)){
  const bytes=await readFile('dist/'+asset.src.replace(/^\.\//,''));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,`${asset.id}: asset hash changed`);
  assert.deepEqual(dimensions(bytes),[asset.width,asset.height],`${asset.id}: image dimensions differ`);
  assert.ok(bytes.length<5*1048576,`${asset.id}: unnecessarily large image`);
  for(const key of ['author','originalTitle','license','licenseUrl','sourceUrl','checked','changes','alt','caption'])assert.ok(asset[key],`${asset.id}: missing attribution or explanation ${key}`);
}
for(const t of topics){
  assert.ok(topicImages[t.id]?.items.length||topicImages[t.id]?.visualId,`${t.id}: no visual`);
  const html=imageGalleryHTML(t.id);
  assert.equal((html.match(/<figure\b/g)||[]).length,topicImages[t.id].items.length);
  assert.equal((html.match(/<img\b/g)||[]).length,topicImages[t.id].items.length);
  assert.ok(!/<img[^>]+src="https?:/i.test(html),'Serve licensed copies locally');
  if(topicImages[t.id].items.length){assert.match(html,/class="image-credit"/);assert.match(html,/data-image-id=/);}
  if(topicImages[t.id].visualId)assert.match(html,/class="education-credit"/);
  placements+=topicImages[t.id].items.length;
  for(const group of topicImages[t.id].sectionGroups || []){
    assert.ok(t.sections.some(s=>s.title===group.sectionTitle),`${t.id}: figure section missing`);
    const sectionHTML=imageGalleryHTML(t.id,group.sectionTitle);
    const expected=topicImages[t.id].sectionGroups.filter(g=>g.sectionTitle===group.sectionTitle).reduce((n,g)=>n+g.items.length,0);
    assert.equal((sectionHTML.match(/<figure\b/g)||[]).length,expected,`${t.id}: section figures not rendered`);
    assert.match(sectionHTML,group.items.length?/class="image-credit"/:/class="education-credit"/);
    placements+=group.items.length;
  }
}
const credits=await readFile('IMAGE_CREDITS.md','utf8');
for(const a of Object.values(assets)){assert.ok(credits.includes(a.sourceUrl));assert.ok(credits.includes(a.license));}
console.log(`PASS: ${Object.keys(assets).length} licensed images, ${placements} placements in ${topics.length} guides, credits, file integrity and dimensions`);
