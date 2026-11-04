import {mkdir,writeFile} from 'node:fs/promises';
import topics from '../dist/data/topics.js';
import {cardSVG,cardConcepts} from './card-art.mjs';
const directory=new URL('../dist/images/cards/',import.meta.url);
await mkdir(directory,{recursive:true});
if(topics.length!==Object.keys(cardConcepts).length)throw Error('Card illustration coverage differs from guide count');
for(const topic of topics)await writeFile(new URL(`${topic.id}.svg`,directory),cardSVG(topic),'utf8');
console.log(`Prepared ${topics.length} original cartoon card illustrations.`);
