/* =============================================================================
   NOVA BLADE · BOSS WORLDS  (nova-bossworlds.js)
   Hyperdrive destination chart: 3 slowly-rotating planets in a swipe carousel,
   each holding 3 escalating world bosses. Opened from the Station hyperdrive
   pad. Selecting a boss fires the host's launch callback (fuel + wormhole
   cinematic + enter). Reuses NB_WB.bosses + NB_WB.art (demon). Self-contained.
   ============================================================================= */
(function(){
  'use strict';

  function ready(){
    if(typeof S==='undefined' || !window.NB_WB || !window.NB_WB.bosses || typeof fmt!=='function'){
      return setTimeout(ready,200);
    }
    init();
  }

  /* planet → which global boss indices it holds (matches BOSSES.world grouping) */
  const PLANETS=[
    {key:'lava', name:'PYROS PRIME', sub:'MOLTEN FORGE WORLD', wc:'#ff8a4a',
      glow:'#ff7a2a',atmo:'#ff5b2d',base0:'#8a2e14',base1:'#3a1208',baseD:'#160503',detail:'#c8401a',crack:'#ffb24a', ring:false, spin:24},
    {key:'ice', name:'CRYON VEIL', sub:'FROZEN CRYSTAL WORLD', wc:'#8fdcff',
      glow:'#8fdcff',atmo:'#6fc0ff',base0:'#aad6ee',base1:'#3a6a90',baseD:'#10283c',detail:'#cfeeff',crack:'#ffffff', ring:true, spin:30},
    {key:'void', name:'NOXARETH', sub:'VOID APOCALYPSE WORLD', wc:'#b88bff',
      glow:'#9a5bff',atmo:'#7a3bff',base0:'#5a3aa0',base1:'#2a1850',baseD:'#0a0420',detail:'#7a4bc0',crack:'#c8a3ff', ring:false, spin:36}
  ];

  function bosses(){ return window.NB_WB.bosses; }
  function planetBosses(pi){
    const list=bosses(); const out=[];
    list.forEach((b,i)=>{ if((b.world||0)===pi) out.push(i); });
    // fallback: split into thirds if no world field
    if(!out.length){ const per=Math.ceil(list.length/3); for(let i=pi*per;i<Math.min((pi+1)*per,list.length);i++) out.push(i); }
    return out;
  }
  function maxWave(){ return Math.max(S.wave||1, (S.stats&&S.stats.maxWave)||1, (S.stats&&S.stats.maxWaveRun)||1); }
  function effDps(){ try{ const v=totalDps(); if(isFinite(v)&&v>0) return v; }catch(e){}
    try{ const v=autoHitDmg()*attackSpeed(); if(isFinite(v)&&v>0) return v; }catch(e){} return 10; }
  function bossHp(b){ return effDps()*b.time*b.diff; }
  function unlocked(b){ return maxWave() >= b.unlock; }

  /* ====================== ROTATING PLANET SPHERE (SVG) ====================== */
  function planetSVG(P){
    const id='bw_'+P.key+'_';
    function tile(ox){
      let s='<g transform="translate('+ox+' 0)">';
      [[40,168,18],[78,150,12],[120,176,16],[156,140,10]].forEach(function(b,i){
        s+='<ellipse cx="100" cy="'+b[0]+'" rx="'+b[1]+'" ry="'+b[2]+'" fill="'+P.detail+'" opacity="'+(0.16+0.06*(i%2))+'"/>'; });
      [[44,60,16],[150,52,13],[70,112,12],[132,120,15],[100,150,11],[34,150,9]].forEach(function(bl){
        s+='<ellipse cx="'+bl[0]+'" cy="'+bl[1]+'" rx="'+bl[2]+'" ry="'+(bl[2]*0.7).toFixed(0)+'" fill="'+P.detail+'" opacity=".3"/>'; });
      s+='<g stroke="'+P.crack+'" stroke-width="2" fill="none" opacity=".7" filter="url(#'+id+'g)"><path d="M20 70 Q60 90 90 70 T172 80"/><path d="M30 132 Q70 122 110 142 T182 130"/><path d="M60 40 Q92 70 80 112"/></g>';
      return s+'</g>';
    }
    return '<svg viewBox="0 0 200 200" class="bwPlanetSvg">'
     +'<defs>'
       +'<radialGradient id="'+id+'atmo" cx=".5" cy=".5" r=".5"><stop offset=".64" stop-color="'+P.atmo+'" stop-opacity="0"/><stop offset=".88" stop-color="'+P.atmo+'" stop-opacity=".5"/><stop offset="1" stop-color="'+P.atmo+'" stop-opacity="0"/></radialGradient>'
       +'<radialGradient id="'+id+'base" cx=".38" cy=".34" r=".75"><stop offset="0" stop-color="'+P.base0+'"/><stop offset=".55" stop-color="'+P.base1+'"/><stop offset="1" stop-color="'+P.baseD+'"/></radialGradient>'
       +'<radialGradient id="'+id+'limb" cx=".42" cy=".4" r=".62"><stop offset=".58" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></radialGradient>'
       +'<radialGradient id="'+id+'spec" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'
       +'<filter id="'+id+'g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>'
       +'<clipPath id="'+id+'cp"><circle cx="100" cy="100" r="78"/></clipPath>'
     +'</defs>'
     + (P.ring? '<g transform="rotate(-20 100 100)"><ellipse cx="100" cy="100" rx="104" ry="22" fill="none" stroke="'+P.crack+'" stroke-width="7" opacity=".22"/></g>' : '')
     +'<circle cx="100" cy="100" r="94" fill="url(#'+id+'atmo)"/>'
     +'<g clip-path="url(#'+id+'cp)">'
       +'<circle cx="100" cy="100" r="78" fill="url(#'+id+'base)"/>'
       +'<g opacity=".92"><animateTransform attributeName="transform" type="translate" values="0 0;-200 0" dur="'+P.spin+'s" repeatCount="indefinite"/>'+tile(0)+tile(200)+'</g>'
       +'<circle cx="100" cy="100" r="78" fill="url(#'+id+'limb)"/>'
       +'<ellipse cx="74" cy="68" rx="34" ry="24" fill="url(#'+id+'spec)" opacity=".32"/>'
     +'</g>'
     +'<circle cx="100" cy="100" r="78" fill="none" stroke="'+P.atmo+'" stroke-width="1.4" opacity=".5"/>'
     + (P.ring? '<g transform="rotate(-20 100 100)"><path d="M-6 110 A104 22 0 0 0 206 110" fill="none" stroke="'+P.crack+'" stroke-width="7" opacity=".4"/><path d="M2 108 A100 20 0 0 0 198 108" fill="none" stroke="#fff" stroke-width="2" opacity=".22"/></g>' : '')
     +'</svg>';
  }

  /* ====================== OVERLAY ====================== */
  let ov=null, idx=0, ctx=null;

  function build(){
    if(ov) return;
    ov=document.createElement('div'); ov.id='bwOverlay';
    let panels='';
    PLANETS.forEach(function(P,pi){
      panels+='<div class="bwPanel bwTheme-'+P.key+'" data-screen-label="Boss World '+(pi+1)+'" style="--wc:'+P.wc+'">'
        +'<div class="bwPlanetWrap">'+planetSVG(P)+'</div>'
        +'<div class="bwWorldName" id="bwName'+pi+'"></div>'
        +'<div class="bwBosses" id="bwBosses'+pi+'"></div>'
      +'</div>';
    });
    ov.innerHTML=
      '<div class="bwHead"><button class="bwClose" data-bw="close">×</button>'
        +'<div class="bwTitle"><span>SELECT DESTINATION</span><small>HYPERDRIVE · CHART A WORLD</small></div>'
        +'<div class="bwFuel" id="bwFuel">\u26FD <b>0</b></div></div>'
      +'<div class="bwViewport" id="bwViewport"><div class="bwTrack" id="bwTrack">'+panels+'</div></div>'
      +'<button class="bwArrow l" data-bw="prev">\u2039</button><button class="bwArrow r" data-bw="next">\u203A</button>'
      +'<div class="bwDots" id="bwDots">'+PLANETS.map(function(_,i){return '<span class="bwDot'+(i===0?' on':'')+'"></span>';}).join('')+'</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', onClick);
    initDrag();
  }

  function onClick(e){
    const t=e.target.closest('[data-bw]'); 
    if(t){
      const a=t.dataset.bw;
      if(a==='close'){ close(); return; }
      if(a==='prev'){ go(idx-1); return; }
      if(a==='next'){ go(idx+1); return; }
    }
    const card=e.target.closest('.bwBoss');
    if(card){ pickBoss(+card.dataset.i); }
  }

  function pickBoss(gi){
    const b=bosses()[gi];
    if(!unlocked(b)){ try{ toast('World locked','Reach wave '+b.unlock+' to challenge '+b.name+'.','gold'); }catch(e){} return; }
    if(ctx && ctx.canLaunch && !ctx.canLaunch()){
      try{ toast('No Hyperdrive Fuel','Refine Dark Matter Ore into fuel at the colony first.','gold'); }catch(e){}
      return;
    }
    if(ctx && typeof ctx.onLaunch==='function') ctx.onLaunch(gi);
  }

  function render(){
    const fuel = (ctx && ctx.fuelLeft) ? ctx.fuelLeft() : 0;
    const canLaunch = !ctx || !ctx.canLaunch || ctx.canLaunch();
    const fb=document.getElementById('bwFuel'); if(fb) fb.innerHTML='\u26FD <b>'+fmt(fuel)+'</b>';
    const art = window.NB_WB.art;
    PLANETS.forEach(function(P,pi){
      const idxs=planetBosses(pi);
      const readyCount=idxs.filter(function(i){ return unlocked(bosses()[i]); }).length;
      const nameEl=document.getElementById('bwName'+pi);
      if(nameEl) nameEl.innerHTML='<span class="wn">'+P.name+'</span><small>'+P.sub+' · \u2694 <b>'+readyCount+'/'+idxs.length+'</b> ready</small>';
      let h='';
      idxs.forEach(function(gi){
        const b=bosses()[gi], un=unlocked(b), bc=b.art.glow||'#9a6bff';
        let go;
        if(!un) go='<span class="bwLockTag">\uD83D\uDD12 Wave '+b.unlock+'</span>';
        else if(!canLaunch) go='<span class="bwLockTag fuel">\u26FD NEEDS FUEL</span>';
        else go='<button class="bwFight">HYPERDRIVE \u25B8</button>';
        h+='<button class="bwBoss '+(un?(canLaunch?'ready':'nofuel'):'locked')+'" data-i="'+gi+'" style="--bc:'+bc+'">'
          +'<div class="bwBPort"><svg viewBox="0 0 200 200">'+art('bw'+gi+'_', b.art)+'</svg></div>'
          +'<div class="bwBInfo">'
            +'<div class="bwBN">'+b.name+' <i>'+b.tier+'</i></div>'
            +'<div class="bwBSub">HP <b>'+fmt(bossHp(b))+'</b> · <span>'+b.time+'s window</span></div>'
            +'<div class="bwBRwd"><span>\uD83D\uDCB0 '+b.goldMult+'\u00d7</span><span>\u2726 '+b.sp+'</span>'+(b.crystals?'<span>\u25C6 '+b.crystals+'</span>':'')+'</div>'
          +'</div>'
          +'<div class="bwBGo">'+go+'</div>'
        +'</button>';
      });
      const host=document.getElementById('bwBosses'+pi); if(host) host.innerHTML=h;
    });
  }

  function setTrack(animate){
    const tr=document.getElementById('bwTrack'); if(!tr) return;
    tr.classList.toggle('dragging', !animate);
    tr.style.transform='translateX('+(-idx*33.3333)+'%)';
    const dots=ov.querySelectorAll('.bwDot'); dots.forEach(function(d,i){ d.classList.toggle('on', i===idx); });
    const l=ov.querySelector('.bwArrow.l'), r=ov.querySelector('.bwArrow.r');
    if(l) l.classList.toggle('hide', idx<=0);
    if(r) r.classList.toggle('hide', idx>=PLANETS.length-1);
  }
  function go(n){ idx=Math.max(0,Math.min(PLANETS.length-1,n)); setTrack(true); }

  function initDrag(){
    const vp=document.getElementById('bwViewport'), tr=document.getElementById('bwTrack');
    let down=false, sx=0, w=1, moved=false;
    vp.addEventListener('pointerdown',function(e){
      if(e.target.closest('.bwBoss, .bwArrow, .bwClose')) return;
      down=true; moved=false; sx=e.clientX; w=vp.clientWidth||1; tr.classList.add('dragging');
    });
    window.addEventListener('pointermove',function(e){
      if(!down) return; const dx=e.clientX-sx; if(Math.abs(dx)>4) moved=true;
      tr.style.transform='translateX(calc('+(-idx*33.3333)+'% + '+dx+'px))';
    });
    window.addEventListener('pointerup',function(e){
      if(!down) return; down=false; tr.classList.remove('dragging');
      const dx=e.clientX-sx;
      if(dx<-w*0.18) go(idx+1); else if(dx>w*0.18) go(idx-1); else setTrack(true);
    });
    window.addEventListener('pointercancel',function(){ if(down){ down=false; setTrack(true); } });
  }

  function open(c){
    build();
    ctx=c||null;
    idx=0; setTrack(false); render();
    requestAnimationFrame(function(){ ov.classList.add('show'); setTrack(true); });
  }
  function close(){ if(ov){ ov.classList.remove('show'); } }

  function init(){
    window.NB_BW={ open:open, close:close, render:render };
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
