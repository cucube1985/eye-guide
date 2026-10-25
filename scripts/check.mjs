import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import anterior from '../dist/data/anterior.js';
import glaucoma from '../dist/data/glaucoma.js';
import retina from '../dist/data/retina.js';
const topics=[...anterior,...glaucoma,...retina];
assert.equal(topics.length,13,'안내는 13개여야 합니다.');
assert.equal(new Set(topics.map(t=>t.id)).size,13,'질환 주소가 중복되면 안 됩니다.');
for(const t of topics){
  for(const key of ['id','category','title','english','summary','keyMessage'])assert.ok(typeof t[key]==='string'&&t[key].trim(),`${t.id}: ${key}`);
  assert.match(t.id,/^[a-z]+(?:-[a-z]+)*$/);
  assert.ok(['anterior','cataract','glaucoma','retina'].includes(t.category));
  assert.ok(t.sections.length>=3&&t.care.length>=3&&t.faq.length>=2&&t.sources.length>=2&&t.symptoms.length>=3,`${t.id}: 안내 내용 누락`);
  assert.ok(t.urgent.title&&t.urgent.text,`${t.id}: 진료가 필요한 신호 누락`);
  for(const s of t.sections)assert.ok(s.title&&s.paragraphs?.length,`${t.id}: 설명 섹션 누락`);
  for(const s of t.sources)assert.equal(new URL(s.url).protocol,'https:');
}
for(const file of ['dist/app.js','dist/data/anterior.js','dist/data/glaucoma.js','dist/data/retina.js'])execFileSync(process.execPath,['--check',file],{stdio:'pipe'});
const html=await readFile('dist/index.html','utf8');
assert.match(html,/<html lang="ko">/);
for(const file of ['dist/styles.css','dist/favicon.svg','dist/.nojekyll'])await access(file);
console.log('PASS: 13개 안내, 고유 주소, 필수 설명·응급 안내·공식 출처, JavaScript 문법, 정적 배포 파일');
