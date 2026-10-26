import MarkdownIt from './vendor/markdown-it.mjs';
import topics from './data/topics.js';

const byNumber=new Map(topics.map(t=>[t.number,t]));
const md=new MarkdownIt({html:false,linkify:false,typographer:false,breaks:false});
const linkRule=md.renderer.rules.link_open || ((tokens,idx,options,env,self)=>self.renderToken(tokens,idx,options));
md.renderer.rules.link_open=(tokens,idx,options,env,self)=>{
  const href=tokens[idx].attrGet('href') || '';
  if(/^https?:\/\//i.test(href)){
    tokens[idx].attrSet('target','_blank');
    tokens[idx].attrSet('rel','noopener noreferrer');
  }
  return linkRule(tokens,idx,options,env,self);
};
md.renderer.rules.table_open=(_tokens,_idx,_options,env)=>`<div class="table-scroll" role="region" aria-label="${md.utils.escapeHtml(env?.sectionTitle || '설명 비교')} 표 · 가로 스크롤" tabindex="0"><table>`;
md.renderer.rules.table_close=()=>'</table></div>';
export function resolveLinks(markdown) {
  return markdown.replace(/\[\[#([\d.]+) ([^\]]+)\]\]/g,(_whole,number,label)=>{
    const topic=byNumber.get(number);
    return topic?`[${label}](#/${topic.id})`:label;
  });
}
export const renderMarkdown=(markdown,title='')=>md.render(resolveLinks(markdown || ''),{sectionTitle:title});
export const renderInline=markdown=>md.renderInline(resolveLinks(markdown || ''));
