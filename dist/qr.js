import qrcodegen from './vendor/qrcodegen.mjs';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function qrMatrix(text){
  const qr=qrcodegen.QrCode.encodeText(text,qrcodegen.QrCode.Ecc.MEDIUM);
  return Array.from({length:qr.size},(_,y)=>Array.from({length:qr.size},(_,x)=>qr.getModule(x,y)));
}
export function qrSvg(text){
  const matrix=qrMatrix(text),border=4,size=matrix.length+border*2;
  const d=matrix.flatMap((row,y)=>row.flatMap((v,x)=>v?[`M${x+border},${y+border}h1v1h-1z`]:[])).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="설명 주소 QR 코드" shape-rendering="crispEdges"><title>${escape(text)}</title><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#111"/></svg>`;
}
export function qrPngUrl(text){
  const matrix=qrMatrix(text),border=4,scale=12,size=(matrix.length+border*2)*scale;
  const canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,size,size);ctx.fillStyle='#111';
  matrix.forEach((row,y)=>row.forEach((v,x)=>{if(v)ctx.fillRect((x+border)*scale,(y+border)*scale,scale,scale);}));
  return canvas.toDataURL('image/png');
}
