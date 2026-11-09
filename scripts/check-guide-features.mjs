import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import topics from '../dist/data/topics.js';
import briefs from '../dist/data/briefs.js';
import {parseGuideRoute,routeHash,sectionKey,sectionElementId,shareScopes,scopeUrl,PUBLIC_GUIDE_URL} from '../dist/guide-links.js';
import {articleHTML} from '../dist/views.js';
import {qrMatrix} from '../dist/qr.js';
const source=JSON.parse(await readFile('content/briefs.json','utf8'));
assert.deepEqual(source,briefs,'Generated one-minute summaries differ from the source');
const helpers={icon:()=>'',groupIcon:()=>''};
let links=0;
for(const topic of topics){
  const keys=topic.sections.map(sectionKey);
  assert.equal(new Set(keys).size,keys.length,`${topic.id}: section address collision`);
  assert.deepEqual([...topic.sections].reverse().map(sectionKey).reverse(),keys,'Reordering changed section addresses');
  const detail=articleHTML(topic,helpers),brief=articleHTML(topic,helpers,{view:'brief',section:null});
  assert.match(brief,/class="clinic-brief"/);assert.ok(!brief.includes('undefined'));
  for(const field of ['problem','care','alert'])assert.ok(briefs[topic.id][field].length>20);
  for(const scope of shareScopes(topic)){
    const url=scopeUrl(topic.id,scope.key),parsed=parseGuideRoute(new URL(url).hash);
    assert.ok(url.startsWith(PUBLIC_GUIDE_URL));assert.equal(parsed.topicId,topic.id);
    if(scope.key==='brief'){assert.equal(parsed.view,'brief');assert.equal(parsed.section,null);}
    else if(scope.key==='all')assert.equal(parsed.section,null);
    else {
      assert.equal(parsed.section,scope.key);
      assert.ok(detail.includes(`id="${sectionElementId(scope.key)}"`),`${topic.id}: shared target missing ${scope.key}`);
    }
    links++;
  }
}
for(const url of [scopeUrl('intravitreal-injection','urgent'),scopeUrl('glaucoma-progression','brief')]){
  const matrix=qrMatrix(url);assert.ok(matrix.length>=21);assert.ok(matrix.every(row=>row.length===matrix.length));
  assert.ok(matrix[0][0]&&matrix[6][6]&&!matrix[1][1],'QR finder pattern malformed');
}
assert.equal(parseGuideRoute(routeHash('floaters-pvd',{view:'brief'})).view,'brief');
console.log(`PASS: ${topics.length} one-minute guides, ${links} share URLs, stable section targets and QR encoding`);
