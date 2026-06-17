/* =============================================================================
   NOVA BLADE · HIT JUICE — combo kademe çağrıları, dramatik kesim yayı,
   yükselen combo aurası. Mevcut onTap'a ek katman (bubble dinleyici).
   ============================================================================= */
(function(){
  function ready(){
    if(typeof enemyCenter!=='function' || !document.getElementById('scene') || typeof sword!=='function'){ return setTimeout(ready,200); }
    init();
  }

  let lastMilestone=0, fxRoot=null;

  function init(){
    const scene=document.getElementById('scene');
    fxRoot=document.getElementById('fxLayer')||scene;

    // onTap'tan SONRA çalışır (combo zaten artmış olur) — sadece görsel ekler
    scene.addEventListener('pointerdown', function(e){
      if(document.body.classList.contains('spaceMode')||document.body.classList.contains('worldBoss')) return;
      if(e.target.closest('#bossBtn,#luckyShip,#ultraWrap,.modal,.drawer')) return;
      if(typeof enemy==='undefined' || !enemy || enemy.hp<=0) return;
      const c=enemyCenter();
      const sw=(typeof sword==='function')?sword():null;
      const col=(sw&&sw.color==='rainbow')?'#fff':((sw&&sw.glow)||'#8fe9ff');
      const cmb=(typeof combo!=='undefined')?combo:0;
      bigSlash(c.x, c.y, col, cmb);
      comboAura(cmb);
      milestone(cmb, col);
    }, false);
  }

  // sweeping enerji kesim yayı — combo ile büyür, yön değişir
  let slashDir=1;
  function bigSlash(x,y,col,cmb){
    slashDir=-slashDir;
    const scale=1+Math.min(cmb,60)/90;        // combo arttıkça yay büyür
    const ang=(slashDir>0? -32: 28)+(Math.random()*16-8);
    const d=document.createElement('div');
    d.className='nbj-slash';
    d.style.left=x+'px'; d.style.top=y+'px';
    d.style.transform='translate(-50%,-50%) rotate('+ang+'deg) scale('+scale.toFixed(2)+')';
    d.innerHTML='<svg width="150" height="150" viewBox="-75 -75 150 150">'
      +'<path d="M-58 -26 Q0 -70 58 -22" fill="none" stroke="'+col+'" stroke-width="7" stroke-linecap="round" filter="drop-shadow(0 0 6px '+col+')"/>'
      +'<path d="M-58 -26 Q0 -70 58 -22" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';
    fxRoot.appendChild(d); setTimeout(()=>d.remove(),300);
  }

  // combo aurası — kahraman çevresinde nabız atan halka (yüksek combo)
  function comboAura(cmb){
    const hw=document.getElementById('heroWrap'); if(!hw) return;
    if(cmb>=12){ hw.classList.add('nbj-charged'); clearTimeout(hw._nbjT); hw._nbjT=setTimeout(()=>hw.classList.remove('nbj-charged'),900); }
  }

  // kademe çağrıları — 10/20/30/50/75/100/150/200…
  function milestone(cmb,col){
    const tiers=[10,20,30,50,75,100,150,200,300,500];
    if(!tiers.includes(cmb)) { if(cmb<10) lastMilestone=0; return; }
    if(cmb===lastMilestone) return; lastMilestone=cmb;
    let label, color, sz;
    if(cmb>=200){ label=cmb+' HIT · UNSTOPPABLE'; color='#ff3b4d'; sz=34; }
    else if(cmb>=100){ label=cmb+' HIT · GODLIKE'; color='#ffd24a'; sz=32; }
    else if(cmb>=50){ label=cmb+' COMBO!'; color='#ffb24a'; sz=30; }
    else if(cmb>=30){ label=cmb+' COMBO!'; color='#7fffd0'; sz=27; }
    else { label=cmb+' HIT!'; color='#8fe9ff'; sz=25; }
    const el=document.createElement('div'); el.className='nbj-callout';
    el.textContent=label;
    el.style.color=color; el.style.fontSize=sz+'px';
    el.style.textShadow='0 2px 8px #000, 0 0 18px '+color;
    (document.getElementById('scene')).appendChild(el);
    setTimeout(()=>el.remove(),900);
    // yükselen perde tonu
    try{ if(typeof tone==='function'){ const f=420+Math.min(cmb,120)*6; tone(f,f*1.6,.12,'square',.06); tone(f*1.5,f*2,.1,'sine',.04,.05); } }catch(e){}
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
