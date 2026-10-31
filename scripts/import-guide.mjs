import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const categories = [
  {id:'all',label:'전체',en:'ALL GUIDES'},
  {id:'anterior',label:'전안부 질환',en:'ANTERIOR SEGMENT'},
  {id:'cataract',label:'백내장·노안',en:'CATARACT & PRESBYOPIA'},
  {id:'glaucoma',label:'녹내장',en:'GLAUCOMA'},
  {id:'retina',label:'망막질환',en:'RETINA'},
  {id:'pediatric',label:'소아 안과',en:'CHILDREN’S EYES'},
  {id:'other',label:'기타 외래 질환',en:'OTHER EYE CONDITIONS'}
];
const ids = {
  '1.1':'conjunctivitis','1.1.1':'allergic-conjunctivitis','1.1.2':'infectious-keratoconjunctivitis',
  '1.2':'stye','1.2.1':'stye-incision','1.3':'subconjunctival-hemorrhage','1.4':'tearing',
  '1.5':'dry-eye','1.5.1':'artificial-tears','1.5.2':'mucin-secretagogues','1.5.3':'dry-eye-anti-inflammatory',
  '1.5.4':'serum-eye-drops','1.5.5':'ipl','1.5.6':'punctal-plugs','1.6':'blepharitis','1.6.1':'demodex',
  '1.7':'pterygium','1.8':'keratitis','1.8.1':'contact-lens-keratitis',
  '2.1':'cataract','2.1.1':'cataract-timing','2.2':'presbyopia','2.2.1':'presbyopia-eye-drops',
  '3.1':'glaucoma-basics','3.1.1':'glaucoma-risk-factors','3.1.2':'glaucoma-lifestyle',
  '3.2':'glaucoma-progression','3.3':'glaucoma-treatment','3.4':'glaucoma-prognosis','3.5':'angle-closure',
  '4.1':'retinal-detachment','4.2':'epiretinal-membrane','4.3':'macular-degeneration','4.3.1':'drusen-dry-amd',
  '4.4':'central-serous','4.5':'floaters-pvd','4.6':'diabetic-retinopathy','4.6.1':'diabetic-treatment-timing',
  '4.6.2':'intravitreal-injection','4.6.3':'prp-laser','4.6.4':'diabetic-macular-edema',
  '4.7':'retinal-vein-occlusion','4.8':'macular-hole',
  '5.1':'child-myopia','5.1.1':'myopia-prevalence','5.2':'amblyopia','5.3':'strabismus',
  '6.1':'eyelid-twitch','6.2':'uveitis','6.3':'ptosis','6.4':'trichiasis'
};
export const plainText = value => value
  .replace(/\[\[#([^\]]+)\]\]/g,'$1')
  .replace(/\[([^\]]+)\]\([^\n]+?\)/g,'$1')
  .replace(/[*_`>#|]/g,'').replace(/^\s*[-+]\s+/gm,'').replace(/\s+/g,' ').trim();

export function parseGuide(input) {
  const text=input.replace(/^\uFEFF/,'').replace(/\r\n/g,'\n');
  const matches=[...text.matchAll(/^### ([\d.]+) (.+)$/gm)];
  const topics=matches.map((m,i)=>{
    const [heading,number,title]=m;
    const id=ids[number];
    if(!id) throw new Error(`항목 ${number}에 고유 주소를 지정하세요.`);
    const body=text.slice(m.index+heading.length,matches[i+1]?.index ?? text.length)
      .replace(/^## \d+\. .+$/gm,'').replace(/\n---\s*$/,'').trim();
    const sectionMatches=[...body.matchAll(/^#### (.+)$/gm)];
    const sections=sectionMatches.map((s,j)=>{
      const markdown=body.slice(s.index+s[0].length,sectionMatches[j+1]?.index ?? body.length).trim();
      const title=s[1];
      const role=title==='한눈에 보기'?'summary':title==='이것만은 기억하세요'?'key':
        /^(이런 증상이|함께 알아둘 내용)/.test(title)?'symptoms':
        title==='진료가 필요한 신호'?'urgent':title==='자주 묻는 질문'?'faq':
        title.startsWith('더 읽어보기')?'sources':
        /^(생활 속에서|처치 후 관리|시술 후 관리|주사 후 관리|치료 중 이렇게 관리)/.test(title)?'care':'content';
      return {title,role,markdown};
    });
    const summaryMarkdown=sections.find(s=>s.role==='summary')?.markdown;
    const keyMarkdown=sections.find(s=>s.role==='key')?.markdown;
    if(!summaryMarkdown||!keyMarkdown) throw new Error(`${number}: 요약 또는 핵심 설명 누락`);
    const english=body.slice(0,sectionMatches[0]?.index ?? 0).trim();
    const category=categories[Number(number.split('.')[0])]?.id;
    const shortTitle=title.includes(' — ')?title.split(' — ').slice(1).join(' — '):title;
    const symptoms=(sections.find(s=>s.role==='symptoms')?.markdown || '').split('\n').filter(l=>l.startsWith('- ')).map(l=>plainText(l.slice(2)));
    const faqSection=sections.find(s=>s.role==='faq');
    const questions=[...(faqSection?.markdown || '').matchAll(/^\*\*Q\. (.+)\*\*$/gm)];
    const faq=questions.map((q,k)=>({q:q[1],answerMarkdown:faqSection.markdown.slice(q.index+q[0].length,questions[k+1]?.index ?? faqSection.markdown.length).trim()}));
    const sources=(sections.find(s=>s.role==='sources')?.markdown || '').split('\n').map(l=>l.match(/^- \[(.+)\]\((https:\/\/.+)\)$/)).filter(Boolean).map(m=>({label:m[1],url:m[2]}));
    return {id,number,category,title,shortTitle,english,summary:plainText(summaryMarkdown),summaryMarkdown,keyMarkdown,symptoms,
      sections:sections.filter(s=>!['summary','key'].includes(s.role)),faq,sources,
      searchText:plainText(`${title} ${english} ${body}`)};
  });
  for(const t of topics)for(const s of t.sections){
    for(const link of s.markdown.matchAll(/\[\[#([\d.]+) [^\]]+\]\]/g)){
      if(!topics.some(x=>x.number===link[1]))throw new Error(`${t.id}: 연결 대상 ${link[1]} 누락`);
    }
  }
  return {categories,topics,metadata:{updated:'2026.10.31',sourceSha256:createHash('sha256').update(text).digest('hex')}};
}

if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const source=await readFile(new URL('../content/guide.md',import.meta.url),'utf8');
  const result=parseGuide(source);
  await writeFile(new URL('../dist/data/topics.js',import.meta.url),`// Generated by npm run build from content/guide.md.\nexport const categories = ${JSON.stringify(result.categories,null,2)};\nexport const metadata = ${JSON.stringify(result.metadata,null,2)};\nexport default ${JSON.stringify(result.topics,null,2)};\n`,'utf8');
  await writeFile(new URL('../dist/guide.md',import.meta.url),source,'utf8');
  console.log(`Generated ${result.topics.length} guides in ${result.categories.length-1} categories.`);
}
