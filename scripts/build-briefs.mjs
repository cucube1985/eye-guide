import {readFile,writeFile} from 'node:fs/promises';
import topics from '../dist/data/topics.js';
const briefs=JSON.parse(await readFile('content/briefs.json','utf8'));
for(const topic of topics){
  const brief=briefs[topic.id];
  for(const key of ['problem','care','alert'])if(typeof brief?.[key]!=='string'||!brief[key].trim())throw Error(`${topic.id}: brief ${key} missing`);
}
if(Object.keys(briefs).length!==topics.length)throw Error('Brief coverage differs from topic coverage');
await writeFile('dist/data/briefs.js',`// Generated from content/briefs.json.\nexport default ${JSON.stringify(briefs,null,2)};\n`,'utf8');
const markdown=['# 눈에 담다 · 진료실 1분 요약','', '기존 질환 설명의 핵심을 정리한 요약입니다. 검사 결과에 따라 본인의 관리 계획은 달라질 수 있습니다. 원고는 content/briefs.json에서 관리합니다.',''];
for(const topic of topics){const b=briefs[topic.id];markdown.push(`## ${topic.number} ${topic.title}`,'',`**어떤 문제인가요?** ${b.problem}`,'',`**어떻게 관리하나요?** ${b.care}`,'',`**언제 바로 연락하나요?** ${b.alert}`,'',`[자세히 읽기](https://cucube1985.github.io/eye-guide/#/${topic.id})`,'');}
await writeFile('dist/one-minute-guide.md',markdown.join('\n'),'utf8');
console.log(`Prepared ${topics.length} one-minute guide summaries.`);
