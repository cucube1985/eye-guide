import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import topics,{categories,metadata} from '../dist/data/topics.js';
import {parseGuide} from './import-guide.mjs';
import {renderMarkdown,resolveLinks} from '../dist/markdown.js';
const source=await readFile('content/guide.md','utf8');
const regenerated=parseGuide(source);
assert.deepEqual(regenerated.topics,topics,'원고와 사이트 데이터가 다릅니다. npm run build를 실행하세요.');
assert.deepEqual(regenerated.metadata,metadata);
assert.equal(await readFile('dist/guide.md','utf8'),source);
assert.equal(topics.length,51,'현재 원고의 51개 설명을 모두 포함해야 합니다.');
assert.equal(new Set(topics.map(t=>t.id)).size,topics.length,'질환 주소 중복');
assert.equal(categories.length,7,'전체와 6개 분류');
for(const id of ['conjunctivitis','stye','subconjunctival-hemorrhage','tearing','cataract','glaucoma-basics','glaucoma-progression','glaucoma-treatment','glaucoma-prognosis','retinal-detachment','epiretinal-membrane','macular-degeneration','central-serous'])assert.ok(topics.some(t=>t.id===id),`기존 주소 ${id} 누락`);
let tables=0,internalLinks=0;
for(const t of topics){
  for(const key of ['id','number','category','title','english','summary','summaryMarkdown','keyMarkdown'])assert.ok(typeof t[key]==='string'&&t[key].trim(),`${t.id}: ${key}`);
  assert.match(t.id,/^[a-z]+(?:-[a-z]+)*$/);
  assert.ok(categories.some(c=>c.id===t.category));
  assert.ok(t.sections.length>=3&&t.faq.length>=1&&t.sources.length>=1,`${t.id}: 안내 내용 누락`);
  for(const s of t.sections){
    assert.ok(s.title&&s.markdown,`${t.id}: 빈 설명 섹션`);
    const html=renderMarkdown(s.markdown,s.title);
    assert.ok(!html.includes('[[#'),`${t.id}: 변환되지 않은 원문 내부 링크`);
    tables+=(html.match(/<table>/g)||[]).length;
    const links=[...html.matchAll(/href="#\/([^"#?]+)"/g)];
    internalLinks+=links.length;
    for(const link of links)assert.ok(topics.some(x=>x.id===link[1]),`${t.id}: 잘못된 내부 링크 ${link[1]}`);
    if(s.role==='faq')assert.equal((s.markdown.match(/^\*\*Q\./gm)||[]).length,t.faq.length,`${t.id}: FAQ 누락`);
  }
  for(const f of t.faq)assert.ok(f.q&&f.answerMarkdown,`${t.id}: FAQ 답변 누락`);
  for(const s of t.sources)assert.equal(new URL(s.url).protocol,'https:');
}
assert.ok(tables>=8&&internalLinks>=10,'표 또는 연결 기능이 누락되었습니다.');
assert.ok(!renderMarkdown('<script>alert(1)</script>').includes('<script>'));
assert.ok(!renderMarkdown('[bad](javascript:alert(1))').includes('href="javascript:'));
assert.match(resolveLinks('[[#1.6 눈꺼풀염·마이봄샘 기능장애]]'),/#\/blepharitis/);
assert.match(renderMarkdown('| 구분 | 내용 |\n|---|---|\n| A | B |','비교'),/class="table-scroll"/);
for(const file of ['dist/app.js','dist/views.js','dist/markdown.js','dist/image-gallery.js','dist/educational-visuals.js','dist/vitreous-model.js','dist/data/topics.js','scripts/import-guide.mjs'])execFileSync(process.execPath,['--check',file],{stdio:'pipe'});
const html=await readFile('dist/index.html','utf8');
assert.match(html,/<html lang="ko">/);
for(const file of ['dist/styles.css','dist/favicon.svg','dist/.nojekyll','dist/vendor/markdown-it.mjs','dist/vendor/markdown-it.LICENSE.txt'])await access(file);
console.log(`PASS: 51개 설명, 6개 분류, 기존 13개 주소, 원고 일치, 표 ${tables}개, 내부 링크 ${internalLinks}개, 안전한 Markdown 렌더링, JS 문법`);
await import('./check-images.mjs');
