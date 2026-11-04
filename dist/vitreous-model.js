// Perspective projection of a conceptual vitreous body only. No patient measurements.
// Model frame: x runs front (−, lens side) to back (+, retina side), y up, z toward the nose.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const seed=i=>{const v=Math.sin(i*91.731+17.13)*43758.5453;return v-Math.floor(v);};
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a),0,1);return t*t*(3-2*t);};
const mix=(a,b,t)=>a+(b-a)*t;
const norm=v=>{const l=Math.hypot(v[0],v[1],v[2])||1;return [v[0]/l,v[1]/l,v[2]/l];};
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const DISC=norm([.93,.04,.36]),MACULA=norm([.99,-.04,-.1]);
const BASE_X=-.5;

// Distance from the centre to the vitreous surface in direction u at stage p.
// The vitreous base (front band) never moves; the back surface separates from the retina.
function surface(u,p){
  const fossa=1-.3*smooth(-.8,-1,u[0]);
  const behindBase=smooth(-.42,-.05,u[0]);
  const amount=smooth(.36,.86,p)*.32;
  const macularFirst=mix(Math.exp(-((1-dot(u,MACULA))/.45)),1,smooth(.55,.8,p));
  const discHold=Math.exp(-((1-dot(u,DISC))/.012))*(1-smooth(.7,.8,p));
  const ripple=.035*smooth(.78,1,p)*behindBase*Math.sin(7*Math.atan2(u[1],u[2])+u[0]*5);
  return fossa*(1-amount*behindBase*macularFirst*(1-discHold)-ripple);
}

export function setupVitreousModels(){
  const cleanups=[];
  document.querySelectorAll('[data-vitreous-model]').forEach(root=>{
    const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');
    if(!ctx)return;
    const progress=root.querySelector('#vitreous-progress'),angle=root.querySelector('#vitreous-angle'),motion=root.querySelector('[data-vitreous-motion]');
    let playing=false,frame=0,time=0,stopped=false;
    const lacunae=Array.from({length:16},(_,i)=>{const t=seed(i+3)*Math.PI*2,ph=Math.acos(seed(i+40)*2-1),r=Math.cbrt(seed(i+70))*.48;return {c:[Math.cos(ph)*r*.8+.18,Math.sin(ph)*Math.cos(t)*r,Math.sin(ph)*Math.sin(t)*r],start:seed(i+9)*.45,size:.07+seed(i+15)*.11,i};});
    const fibers=Array.from({length:26},(_,i)=>({phi:(i/26)*Math.PI*2+seed(i)*.2,cluster:Math.floor(seed(i+200)*6),bend:seed(i+90)*.4-.2,i}));
    const clusterPhi=k=>k*Math.PI/3+.4;
    function draw(){
      const narrow=root.clientWidth<540,W=narrow?600:1000,H=narrow?880:510;
      if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H;}
      const p=Number(progress.value)/100,a=Number(angle.value)*Math.PI/180;
      const cx=narrow?296:282,cy=narrow?280:262,R=narrow?150:184;
      const project=([x,y,z])=>{const xx=x*Math.cos(a)+z*Math.sin(a),zz=z*Math.cos(a)-x*Math.sin(a),depth=1/(1+zz*.16);return {x:cx+xx*R*depth,y:cy-y*R*depth,z:zz,s:depth};};
      const at=u=>{const r=surface(u,p);return [u[0]*r,u[1]*r,u[2]*r];};
      const sway=i=>playing&&p>.3?Math.sin(time*.9+i)*.018*p:0;
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#f2f6f3';ctx.fillRect(0,0,W,H);
      ctx.font='bold 23px sans-serif';ctx.fillStyle='#315e49';ctx.fillText('유리체만 떼어 본 입체 모형',30,42);
      ctx.font='15px sans-serif';ctx.fillStyle='#6b8273';ctx.fillText('왼쪽: 수정체 쪽 · 오른쪽: 망막 쪽',30,66);
      // Silhouette in the view plane (screen right = e1, up = y).
      const e1=[Math.cos(a),0,Math.sin(a)];
      const outline=radius=>{const pts=[];for(let k=0;k<=96;k++){const t=k/96*Math.PI*2,u=norm([Math.cos(t)*e1[0],Math.sin(t),Math.cos(t)*e1[2]]);pts.push(project(radius?radius(u):at(u)));}return pts;};
      const path=pts=>{ctx.beginPath();pts.forEach((q,k)=>k?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.closePath();};
      const wallAt=u=>{const r=1-.3*smooth(-.8,-1,u[0]);return [u[0]*r,u[1]*r,u[2]*r];};
      const detached=smooth(.36,.5,p);
      if(detached){
        // Liquid fills the space left behind the separated gel; the dashed line marks where the retina was.
        path(outline(wallAt));ctx.fillStyle=`rgba(214,236,244,${.8*detached})`;ctx.fill();
        ctx.setLineDash([7,6]);ctx.strokeStyle=`rgba(189,120,108,${.75*detached})`;ctx.lineWidth=2;ctx.beginPath();
        let started=false;for(let k=0;k<=96;k++){const t=k/96*Math.PI*2,u=norm([Math.cos(t)*e1[0],Math.sin(t),Math.cos(t)*e1[2]]);if(u[0]<-.4){started=false;continue;}const q=project(wallAt(u));if(!started){ctx.moveTo(q.x,q.y);started=true;}else ctx.lineTo(q.x,q.y);}
        ctx.stroke();ctx.setLineDash([]);
      }
      const sil=outline();
      const gel=ctx.createRadialGradient(cx-60,cy-60,20,cx,cy,R*1.05);
      gel.addColorStop(0,`rgba(247,252,250,${.95-p*.15})`);gel.addColorStop(.75,`rgba(199,226,214,${.92-p*.2})`);gel.addColorStop(1,`rgba(160,199,182,${.9-p*.2})`);
      path(sil);ctx.fillStyle=gel;ctx.fill();ctx.strokeStyle='#6f988a';ctx.lineWidth=p>.78?2.5:2;ctx.stroke();
      ctx.save();path(sil);ctx.clip();
      // Collagen fibres run backward from the vitreous base; with liquefaction they clump into thicker strands.
      const clump=smooth(.15,.75,p);
      for(const f of fibers){
        const phi=mix(f.phi,clusterPhi(f.cluster)+(f.phi%.3)*.4,clump);
        const start=[BASE_X+.04,Math.cos(phi)*.84,Math.sin(phi)*.84];
        const end=at(norm([.9,Math.cos(phi)*.42,Math.sin(phi)*.42])).map(v=>v*.93);
        const mid=[.15,Math.cos(phi)*(.55+f.bend),Math.sin(phi)*(.55+f.bend)];
        const q0=project(start);
        ctx.strokeStyle=`rgba(64,86,74,${(.08+clump*.26)*(q0.z>.2?.55:1)})`;
        ctx.lineWidth=(.8+clump*(1.4+seed(f.i+5)*1.2))*q0.s;ctx.beginPath();
        for(let k=0;k<=18;k++){const t=k/18,b=[0,1,2].map(j=>(1-t)**2*start[j]+2*(1-t)*t*mid[j]+t*t*end[j]);const w=Math.sin(t*Math.PI*(2+clump*2)+f.i)*(.012+clump*.03);const q=project([b[0],b[1]+w+sway(f.i)*t,b[2]+w]);k?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);}
        ctx.stroke();
      }
      // Liquid pockets (lacunae) appear in the centre and merge in front of the macula.
      const pockets=lacunae.map(l=>({...l,r:l.size*smooth(l.start,l.start+.35,p)*(1+p*.6)})).filter(l=>l.r>.005);
      pockets.push({c:[.42,-.02,-.05],r:.3*smooth(.3,.75,p),i:99});
      for(const l of pockets.sort((m,n)=>project(n.c).z-project(m.c).z)){const q=project(l.c),r=l.r*R*q.s;if(r<1)continue;const g=ctx.createRadialGradient(q.x-r*.25,q.y-r*.25,1,q.x,q.y,r);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.8,'rgba(232,246,250,.8)');g.addColorStop(1,'rgba(170,211,222,.35)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(q.x,q.y,r,r*.82,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(115,170,182,.45)';ctx.lineWidth=1;ctx.stroke();}
      ctx.restore();
      // Vitreous base: a 360° band that stays attached at every stage.
      const baseR=Math.sqrt(1-BASE_X*BASE_X);
      ctx.lineWidth=11;ctx.lineCap='round';
      for(const pass of ['back','front'])for(let k=0;k<72;k++){const t0=k/72*Math.PI*2,t1=(k+1)/72*Math.PI*2;const q0=project([BASE_X,Math.cos(t0)*baseR,Math.sin(t0)*baseR]),q1=project([BASE_X,Math.cos(t1)*baseR,Math.sin(t1)*baseR]);const front=q0.z<0;if((pass==='front')!==front)continue;ctx.strokeStyle=front?'rgba(201,150,46,.9)':'rgba(201,150,46,.3)';ctx.beginPath();ctx.moveTo(q0.x,q0.y);ctx.lineTo(q1.x,q1.y);ctx.stroke();}
      ctx.lineCap='butt';
      // Optic disc attachment, which becomes a floating Weiss ring once released.
      const released=smooth(.72,.8,p);
      const b1=norm([-DISC[2],0,DISC[0]]),b2=norm([DISC[1]*b1[2]-DISC[2]*b1[1],DISC[2]*b1[0]-DISC[0]*b1[2],DISC[0]*b1[1]-DISC[1]*b1[0]]);
      ctx.beginPath();
      for(let k=0;k<=40;k++){const t=k/40*Math.PI*2,u=norm([0,1,2].map(j=>DISC[j]+.13*(Math.cos(t)*b1[j]+Math.sin(t)*b2[j])));const r=mix(surface(u,p),surface(DISC,p)*.97,released);const q=project([u[0]*r+sway(7)*released,u[1]*r+sway(3)*released,u[2]*r]);k?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);}
      ctx.strokeStyle=released?'rgba(70,64,60,.85)':'#c4675a';ctx.lineWidth=released?5:6;ctx.stroke();
      // Macula: a weaker attachment that separates first.
      const macAttached=1-smooth(.4,.58,p);
      if(macAttached>.02){const q=project(at(MACULA));ctx.fillStyle=`rgba(141,96,158,${.85*macAttached})`;ctx.beginPath();ctx.ellipse(q.x,q.y,10*q.s,14*q.s,0,0,Math.PI*2);ctx.fill();}
      // Labels with leader lines.
      const label=(anchor,tx,ty,lines,color)=>{ctx.font='bold 16px sans-serif';const tw=ctx.measureText(lines[0]).width;ctx.strokeStyle='rgba(80,104,90,.7)';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(anchor.x,anchor.y);ctx.lineTo(tx<anchor.x?tx+tw+6:tx-6,ty+3);ctx.stroke();lines.forEach((l,k)=>{ctx.font=k?'14px sans-serif':'bold 16px sans-serif';ctx.fillStyle=k?'#5d7466':color;ctx.fillText(l,tx,ty+k*19);});};
      label(project([BASE_X,baseR*.98,0]),30,104,['유리체 기저부','평생 단단히 붙어 있음'],'#9c7420');
      label(project(at(DISC)),narrow?380:430,narrow?478:478,released?['바이스 고리','시신경에서 떨어진 고리']:['시신경 둘레 부착부','단단히 붙어 있음'],released?'#46403c':'#a9473b');
      if(macAttached>.3)label(project(at(MACULA)),narrow?452:470,narrow?150:150,['황반 부착부','약해서 먼저 떨어짐'],'#7a4f8a');
      else if(detached>.5)label(project(wallAt(norm([.85,.5,0]))),narrow?452:470,narrow?130:118,['액체가 찬 공간','점선: 원래 망막 위치'],'#3f6f86');
      const pocket=project([.42,-.02,-.05]);
      if(p>.25)label({x:pocket.x,y:pocket.y+10},30,430,['액체로 변한 공간','젤이 묽어진 부분'],'#3f6f86');
      // Field of view: clumped fibres and the Weiss ring cast shadows on the retina.
      const x=narrow?40:642,y=narrow?555:136,w=narrow?520:320,h=244;
      ctx.fillStyle='#315e49';ctx.font='bold 22px sans-serif';ctx.fillText('밝은 배경에서 보이는 모습',x,y-28);
      ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
      ctx.fillStyle='#e4f0f2';ctx.fillRect(x,y,w,h);ctx.fillStyle='#b6cba9';ctx.beginPath();ctx.moveTo(x,y+h*.63);ctx.quadraticCurveTo(x+w*.3,y+h*.3,x+w,y+h*.68);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.fill();ctx.fillStyle='#ede4cb';ctx.beginPath();ctx.moveTo(x+w*.3,y+h);ctx.lineTo(x+w*.55,y+h*.59);ctx.lineTo(x+w*.73,y+h);ctx.fill();ctx.fillStyle='#748f75';ctx.fillRect(x+w*.2,y+h*.35,5,h*.39);ctx.beginPath();ctx.arc(x+w*.2,y+h*.35,29,0,Math.PI*2);ctx.fill();
      ctx.filter='blur(1px)';
      for(let i=0;i<14;i++){const visibility=clamp((clump*16-i)/4,0,1);if(!visibility)continue;const xx=x+w*(.1+seed(i+321)*.75)+(playing?Math.sin(time*.55+i)*8:0),yy=y+h*(.12+seed(i+421)*.6);ctx.strokeStyle=`rgba(52,61,54,${visibility*.36})`;ctx.lineWidth=2+seed(i+81)*2;ctx.beginPath();ctx.moveTo(xx,yy);ctx.bezierCurveTo(xx+9,yy-15,xx+23,yy+17,xx+32,yy-6);ctx.stroke();}
      if(released){const rx=x+w*.62+(playing?Math.sin(time*.4)*10:0),ry=y+h*.32;ctx.strokeStyle=`rgba(40,40,38,${.55*released})`;ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(rx,ry,26,19,.3,0,Math.PI*2);ctx.stroke();}
      ctx.filter='none';ctx.restore();ctx.strokeStyle='#a8beb0';ctx.lineWidth=2;ctx.strokeRect(x,y,w,h);
      ctx.font='15px sans-serif';ctx.fillStyle='#5d7466';ctx.fillText(released?'고리 모양 그림자: 바이스 고리':clump>.1?'실·점 모양 그림자: 뭉친 섬유':'아직 그림자가 거의 없음',x,y+h+26);
      const stage=p<.36?'① 액화 시작':p<.72?'② 황반 주변부터 분리':'③ 후유리체박리';
      root.querySelector('output').textContent=stage;progress.setAttribute('aria-valuetext',`${stage}, 개념 단계이며 실제 진행 속도가 아님`);
      root.querySelector('[data-vitreous-description]').textContent=p<.36?'젤 같던 유리체 가운데에 묽은 액체 공간이 생기고, 남은 섬유가 서로 뭉치기 시작합니다. 아직 유리체 전체가 망막에 붙어 있습니다.':p<.72?'액체 공간이 커지면서 유리체가 줄어들어, 붙는 힘이 약한 황반 주변부터 망막에서 떨어지기 시작합니다. 시신경 둘레와 유리체 기저부는 아직 단단히 붙어 있습니다.':'시신경 둘레의 부착부까지 떨어지면 뒤쪽 유리체가 앞으로 내려앉고, 떨어진 고리(바이스 고리)가 큰 그림자로 보일 수 있습니다. 유리체 기저부는 그대로 붙어 있어, 이때 앞쪽 망막이 당겨져 찢어질 수 있습니다.';
    }
    function tick(){if(stopped||!playing)return;time+=.018;draw();frame=requestAnimationFrame(tick);}
    for(const control of [progress,angle])control.addEventListener('input',draw);
    motion.addEventListener('click',()=>{playing=!playing;motion.setAttribute('aria-pressed',String(playing));motion.textContent=playing?'움직임 멈추기':'부유물 움직임 보기';if(playing)tick();else{cancelAnimationFrame(frame);draw();}});
    const observer=new ResizeObserver(draw);observer.observe(root);draw();
    cleanups.push(()=>{stopped=true;cancelAnimationFrame(frame);observer.disconnect();});
  });
  return ()=>cleanups.forEach(stop=>stop());
}
