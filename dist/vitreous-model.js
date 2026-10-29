// Perspective projection of a conceptual vitreous volume. No patient measurements.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const seed=i=>{const v=Math.sin(i*91.731+17.13)*43758.5453;return v-Math.floor(v);};
export function setupVitreousModels(){
  const cleanups=[];
  document.querySelectorAll('[data-vitreous-model]').forEach(root=>{
    const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');
    if(!ctx)return;
    const progress=root.querySelector('#vitreous-progress'),angle=root.querySelector('#vitreous-angle'),haze=root.querySelector('[data-vitreous-haze]'),motion=root.querySelector('[data-vitreous-motion]');
    let playing=false,frame=0,time=0,stopped=false;
    const points=Array.from({length:27},(_,i)=>{const theta=seed(i+2)*Math.PI*2,r=Math.cbrt(seed(i+66))*.82,z=(seed(i+100)*2-1)*.7;return {x:Math.cos(theta)*r*.74+.12,y:Math.sin(theta)*r*.74,z,i};});
    function draw(){
      const narrow=root.clientWidth<540,W=narrow?600:1000,H=narrow?880:510;
      if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H;}
      const p=Number(progress.value)/100,a=Number(angle.value)*Math.PI/180;
      const project=(x,y,z)=>{const xx=x*Math.cos(a)+z*Math.sin(a),zz=z*Math.cos(a)-x*Math.sin(a),depth=1/(1+zz*.18);return {x:300+xx*224*depth,y:247+y*184*depth,z:zz,s:depth};};
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#f2f6f3';ctx.fillRect(0,0,W,H);
      ctx.font='bold 23px sans-serif';ctx.fillStyle='#315e49';ctx.fillText('눈 속의 유리체',35,45);
      const globe=ctx.createRadialGradient(226,185,30,300,247,235);globe.addColorStop(0,'#fbffff');globe.addColorStop(.7,'#dbece7');globe.addColorStop(1,'#b4d0c3');ctx.fillStyle=globe;
      ctx.beginPath();ctx.ellipse(300,247,226,188,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#7d9e8c';ctx.lineWidth=3;ctx.stroke();
      ctx.save();ctx.beginPath();ctx.ellipse(300,247,219,181,0,0,Math.PI*2);ctx.clip();
      // Longitude/latitude curves make the three-dimensional volume visible.
      ctx.strokeStyle=`rgba(95,139,122,${.26-p*.16})`;ctx.lineWidth=1.5;
      for(let j=0;j<7;j++){const longitude=j*Math.PI/7;ctx.beginPath();for(let k=0;k<=60;k++){const t=k*Math.PI/30,q=project(Math.sin(t)*Math.cos(longitude),Math.cos(t),Math.sin(t)*Math.sin(longitude));if(!k)ctx.moveTo(q.x,q.y);else ctx.lineTo(q.x,q.y);}ctx.stroke();}
      for(let j=-2;j<=2;j++){const y=j*.29,r=Math.sqrt(1-y*y);ctx.beginPath();for(let k=0;k<=60;k++){const t=k*Math.PI/30,q=project(Math.cos(t)*r,y,Math.sin(t)*r);if(!k)ctx.moveTo(q.x,q.y);else ctx.lineTo(q.x,q.y);}ctx.stroke();}
      // Clear liquid pockets grow inside the gel, rather than making liquid opaque.
      for(const pt of points.slice(0,13)){const q=project(pt.x,pt.y,pt.z),r=(5+p*(18+seed(pt.i+44)*25))*q.s;const g=ctx.createRadialGradient(q.x-r*.2,q.y-r*.2,1,q.x,q.y,r);g.addColorStop(0,`rgba(255,255,255,${.4+p*.45})`);g.addColorStop(1,'rgba(176,213,218,.12)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(q.x,q.y,r,r*.72,pt.z,0,Math.PI*2);ctx.fill();ctx.strokeStyle=`rgba(109,167,175,${p*.38})`;ctx.lineWidth=1;ctx.stroke();}
      for(const pt of [...points].sort((m,n)=>m.z-n.z)){const visibility=clamp((p*28-pt.i)/5,0,1);if(!visibility)continue;const drift=playing?Math.sin(time*.8+pt.i)*.025:0;const q=project(pt.x+drift,pt.y+Math.sin(time+pt.i)*.015,pt.z);ctx.strokeStyle=`rgba(71,88,77,${visibility*(.28+(1-pt.z)*.14)})`;ctx.lineWidth=(2+seed(pt.i+21)*3)*q.s;ctx.beginPath();for(let j=0;j<12;j++){const xx=q.x+(j-5)*3*q.s,yy=q.y+Math.sin(j*.6+pt.i)*7*q.s;if(!j)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);}ctx.stroke();if(pt.i%6===0){ctx.beginPath();ctx.ellipse(q.x,q.y,11*q.s,7*q.s,pt.z,0,Math.PI*2);ctx.stroke();}}
      ctx.restore();
      // Anterior lens and posterior retinal wall are landmarks, not a PVD staging scale.
      ctx.fillStyle='#bfd2ac';ctx.strokeStyle='#7f9a78';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(130,247,19,62,0,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.strokeStyle='#bd9285';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(300,247,217,181,0,-.84,.84);ctx.stroke();
      ctx.font='17px sans-serif';ctx.fillStyle='#647d70';ctx.fillText('수정체',72,342);ctx.fillText('망막',504,342);ctx.fillStyle='#6b8e94';ctx.fillText('밝은 공간: 액체화된 부분',140,462);
      const x=narrow?40:642,y=narrow?555:136,w=narrow?520:320,h=244;
      ctx.fillStyle='#315e49';ctx.font='bold 22px sans-serif';ctx.fillText('부유물이 보이는 시야의 예',x,y-28);
      ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
      if(haze.checked)ctx.filter=`blur(${p*1.5}px)`;
      ctx.fillStyle='#e4f0f2';ctx.fillRect(x,y,w,h);ctx.fillStyle='#b6cba9';ctx.beginPath();ctx.moveTo(x,y+h*.63);ctx.quadraticCurveTo(x+w*.3,y+h*.3,x+w,y+h*.68);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.fill();ctx.fillStyle='#ede4cb';ctx.beginPath();ctx.moveTo(x+w*.3,y+h);ctx.lineTo(x+w*.55,y+h*.59);ctx.lineTo(x+w*.73,y+h);ctx.fill();ctx.fillStyle='#748f75';ctx.fillRect(x+w*.2,y+h*.35,5,h*.39);ctx.beginPath();ctx.arc(x+w*.2,y+h*.35,29,0,Math.PI*2);ctx.fill();ctx.font='22px sans-serif';ctx.fillStyle='#416451';ctx.fillText('밝은 배경에서 잘 보여요',x+18,y+h-20);ctx.filter='none';
      if(haze.checked){ctx.fillStyle=`rgba(190,199,193,${p*.1})`;ctx.fillRect(x,y,w,h);}
      for(const pt of points.slice(0,18)){const visibility=clamp((p*23-pt.i)/6,0,1);if(!visibility)continue;const xx=x+w*(.1+seed(pt.i+321)*.8)+(playing?Math.sin(time*.55+pt.i)*8:0),yy=y+h*(.15+seed(pt.i+421)*.65);ctx.strokeStyle=`rgba(52,61,54,${visibility*.38})`;ctx.lineWidth=2+seed(pt.i+81)*2;ctx.filter='blur(1px)';ctx.beginPath();ctx.moveTo(xx,yy);ctx.bezierCurveTo(xx+9,yy-15,xx+23,yy+17,xx+32,yy-6);ctx.stroke();}ctx.filter='none';ctx.restore();ctx.strokeStyle='#a8beb0';ctx.lineWidth=2;ctx.strokeRect(x,y,w,h);
      const stage=p<.33?'초기':p<.67?'중간':'진행';root.querySelector('output').textContent=stage;progress.setAttribute('aria-valuetext',`${stage} 개념 단계`);
      root.querySelector('[data-vitreous-description]').textContent=p<.33?'젤 구조 사이에 작은 액체 공간이 생기는 단계를 표현했습니다.':p<.67?'액체 공간이 커지고 남은 콜라겐 섬유가 뭉쳐 그림자를 만드는 모습을 강조했습니다.':'액체 공간과 섬유 뭉침을 더 강조한 개념 표현입니다. 부유물의 수와 흐림은 실제 진행 속도나 중증도를 뜻하지 않습니다.';
    }
    function tick(){if(stopped||!playing)return;time+=.018;draw();frame=requestAnimationFrame(tick);}
    for(const control of [progress,angle,haze])control.addEventListener('input',draw);
    motion.addEventListener('click',()=>{playing=!playing;motion.setAttribute('aria-pressed',String(playing));motion.textContent=playing?'움직임 멈추기':'부유물 움직임 보기';if(playing)tick();else{cancelAnimationFrame(frame);draw();}});
    const observer=new ResizeObserver(draw);observer.observe(root);draw();
    cleanups.push(()=>{stopped=true;cancelAnimationFrame(frame);observer.disconnect();});
  });
  return ()=>cleanups.forEach(stop=>stop());
}
