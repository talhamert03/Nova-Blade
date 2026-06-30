/* =============================================================================
   NOVA BLADE · SPACE STATION SYSTEM  (nova-station.js)
   Replaces the "Space" tab with an upgradeable home base. Four buildings gate
   weapon/armor tiers + offline income + Dark Matter Ore production. Ore converts
   to Hyperdrive Fuel, which gates the World Boss (reached via a hyperspace
   cinematic). Self-contained module — wraps a few core fns, never forks them.
   ============================================================================= */
(function(){
  'use strict';

  /* ---- wait for core ---- */
  function ready(){
    if(typeof S==='undefined' || typeof addCredits!=='function' ||
       typeof SWORDS==='undefined' || typeof ARMORS==='undefined' || typeof fmt!=='function' ||
       typeof window.NB_STA==='undefined'){
      return setTimeout(ready,150);
    }
    init();
  }

  /* ========================== STATE ========================== */
  function st(){
    if(!S.station || typeof S.station!=='object') S.station={};
    const d=S.station;
    if(typeof d.laser!=='number')  d.laser=1;
    if(typeof d.armor!=='number')  d.armor=1;
    if(typeof d.radar!=='number')  d.radar=0;
    if(typeof d.mining!=='number') d.mining=1;
    if(typeof d.ore!=='number')    d.ore=0;
    if(typeof d.oreProg!=='number')d.oreProg=0;
    if(typeof d.fuel!=='number')   d.fuel=0;
    if(typeof d.oreT!=='number')   d.oreT=Date.now();
    if(typeof d.fuelSpent!=='number') d.fuelSpent=0;
    if(typeof d.oreMade!=='number')   d.oreMade=0;
    // never lock gear the player already owns (migration / fresh)
    d.laser=Math.max(d.laser, S.swordsOwned||1);
    d.armor=Math.max(d.armor, S.armorsOwned||1);
    d.laser=Math.min(d.laser,MAXLV); d.armor=Math.min(d.armor,MAXLV);
    d.radar=Math.min(Math.max(d.radar,0),MAXLV); d.mining=Math.min(Math.max(d.mining,1),MAXLV);
    return d;
  }
  const MAXLV=20;

  /* ========================== BUILDINGS ========================== */
  // icon builders kept to simple geometry (circles / diamonds / lines) per house style
  function icoLaser(ac){ return `<svg viewBox="0 0 60 60">
    <rect x="10" y="40" width="40" height="9" rx="2" fill="#2a3340" stroke="${ac}" stroke-width="1.4"/>
    <rect x="10" y="11" width="40" height="9" rx="2" fill="#2a3340" stroke="${ac}" stroke-width="1.4"/>
    <rect x="27" y="18" width="6" height="24" rx="3" fill="${ac}"/>
    <rect x="28.5" y="18" width="3" height="24" fill="#fff" opacity=".85"/>
    <circle cx="30" cy="30" r="3.4" fill="#fff"/></svg>`; }
  function icoArmor(ac){ return `<svg viewBox="0 0 60 60">
    <path d="M30 8 L48 15 V31 Q48 46 30 53 Q12 46 12 31 V15 Z" fill="#222c38" stroke="${ac}" stroke-width="1.8"/>
    <path d="M30 14 L42 19 V31 Q42 41 30 46 Q18 41 18 31 V19 Z" fill="none" stroke="${ac}" stroke-width="1.2" opacity=".7"/>
    <path d="M30 21 V40 M22 30 H38" stroke="${ac}" stroke-width="2" opacity=".9"/></svg>`; }
  function icoRadar(ac){ return `<svg viewBox="0 0 60 60">
    <circle cx="30" cy="34" r="20" fill="none" stroke="${ac}" stroke-width="1.4" opacity=".4"/>
    <circle cx="30" cy="34" r="13" fill="none" stroke="${ac}" stroke-width="1.4" opacity=".6"/>
    <circle cx="30" cy="34" r="6" fill="none" stroke="${ac}" stroke-width="1.4"/>
    <circle cx="30" cy="34" r="2.4" fill="${ac}"/>
    <path d="M30 34 L30 14" stroke="${ac}" stroke-width="2.2" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 30 34" to="360 30 34" dur="3.6s" repeatCount="indefinite"/></path></svg>`; }
  function icoMining(ac){ return `<svg viewBox="0 0 60 60">
    <path d="M30 8 L44 26 L30 52 L16 26 Z" fill="#1c0f30" stroke="${ac}" stroke-width="1.8"/>
    <path d="M30 8 L30 52 M16 26 H44 M30 8 L16 26 M30 8 L44 26" stroke="${ac}" stroke-width="1.1" opacity=".7"/>
    <path d="M30 8 L37 26 L30 52 L23 26 Z" fill="${ac}" opacity=".35"/></svg>`; }

  const B = {
    laser:  { name:'Laser Workshop',  short:'LASER FORGE', ac:'#4db8ff', ico:icoLaser, base:1,
      desc:(lv)=>`Unlocks <em>Weapon Tiers 1–${lv}</em> of 20.${lv<MAXLV?` Next Lv ${lv+1} → Tier ${lv+1}.`:''}` },
    armor:  { name:'Armor Workshop',  short:'ARMOR BAY', ac:'#54e0a0', ico:icoArmor, base:1,
      desc:(lv)=>`Unlocks <em>Armor Tiers 1–${lv}</em> of 20.${lv<MAXLV?` Next Lv ${lv+1} → Tier ${lv+1}.`:''}` },
    radar:  { name:'Radar Room',      short:'RADAR ARRAY', ac:'#ffb14a', ico:icoRadar, base:0,
      desc:(lv)=>`Offline gold income <em>+${lv*8}%</em>.${lv<MAXLV?` Next +8% (→ +${(lv+1)*8}%).`:' Maxed.'}` },
    mining: { name:'Ore Mining Factory', short:'ORE MINE', ac:'#b98bff', ico:icoMining, base:1,
      desc:(lv)=>`Mines Dark Matter Ore — <em>1 ore / ${fmtDur(secPerOre(lv))}</em>.${lv<MAXLV?' Upgrade to speed it up.':' Max rate.'}` }
  };
  const ORDER=['laser','armor','radar','mining'];

  // upgrade cost (current level -> +1), tied to the live economy curve
  function bcost(type){
    const d=st(), lv=d[type];
    if(type==='laser'){ const s=SWORDS[Math.min(lv,SWORDS.length-1)]; return Math.max(150, Math.round((s?s.cost:0)*0.22)); }
    if(type==='armor'){ const a=ARMORS[Math.min(lv,ARMORS.length-1)]; return Math.max(150, Math.round((a?a.cost:0)*0.22)); }
    const s=SWORDS[Math.min(Math.max(lv,0),SWORDS.length-1)], base=(s?s.cost:0);
    if(type==='radar')  return Math.max(600,  Math.round(base*0.12)+400*(lv+1));
    return Math.max(800, Math.round(base*0.18)+600*(lv+1)); // mining
  }

  // unlock chain — showcases the locked-barrier visual + base->gear synergy
  function unlocked(type){
    const d=st();
    if(type==='laser'||type==='armor') return true;
    if(type==='radar')  return (d.laser+d.armor)>=6;
    if(type==='mining') return d.radar>=3;
    return true;
  }
  function lockReq(type){
    if(type==='radar')  return 'Upgrade <b>Laser + Armor</b> Workshops to a combined <b>Lv 6</b>';
    if(type==='mining') return 'Upgrade the <b>Radar Room</b> to <b>Lv 3</b>';
    return '';
  }

  /* ---- tier gating (used by weapon/armor galleries + buy guards) ---- */
  function weaponLockReason(i){ return (st().laser < i+1) ? 'Requires Laser Workshop Lv '+(i+1) : null; }
  function armorLockReason(i){  return (st().armor < i+1) ? 'Requires Armor Workshop Lv '+(i+1) : null; }

  function upgrade(type){
    const d=st();
    if(!unlocked(type)){ toast('Locked', stripTags(lockReq(type)),'gold'); return; }
    if(d[type]>=MAXLV){ return; }
    const cost=bcost(type);
    if(S.credits<cost){ toast('Not enough gold','Need '+fmt(cost)+' gold to upgrade '+B[type].name+'.','gold'); return; }
    S.credits-=cost; d[type]++;
    try{ sfx.buy&&sfx.buy(); }catch(e){}
    const nm=B[type].name+' → Lv '+d[type];
    if(type==='laser') toast('Workshop upgraded!', nm+' · Weapon Tier '+d.laser+' unlocked','gold');
    else if(type==='armor') toast('Workshop upgraded!', nm+' · Armor Tier '+d.armor+' unlocked','gold');
    else if(type==='radar') toast('Radar upgraded!', nm+' · offline income +'+(d.radar*8)+'%','gold');
    else toast('Factory upgraded!', nm+' · faster ore mining','gold');
    if(d[type]>=MAXLV) toast(B[type].name+' MAXED','Plasma core online — maximum power.','gold');
    try{ if(typeof checkAch==='function') checkAch(); }catch(e){}
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
    renderStation(); renderHUD(); updateChips();
    if(focusType===type) renderDetail(type, true);   // refresh open sheet with level-up FX
    try{ if(typeof fullRefresh==='function' && (type==='laser'||type==='armor')) fullRefresh(); }catch(e){}
  }

  /* ========================== ORE MINING ========================== */
  // tuned so even at max (~90s/ore) 20 ore (=1 fuel) takes ~30 real minutes;
  // at base Lv1 (~900s/ore) it is intentionally glacial.
  function secPerOre(lv){ lv=lv||st().mining; return 900*Math.pow(90/900,(Math.max(1,lv)-1)/(MAXLV-1)); }
  function fmtDur(s){ s=Math.round(s); if(s<60) return s+'s'; const m=Math.floor(s/60), r=s%60; return r? m+'m '+r+'s' : m+'m'; }

  function mineTick(){
    const d=st(), now=Date.now();
    let dt=(now-(d.oreT||now))/1000; d.oreT=now;
    if(!isFinite(dt)||dt<0) dt=0;
    if(dt>14*3600) dt=14*3600;                 // generous offline cap
    if(d.mining<1) return;
    d.oreProg += dt/secPerOre(d.mining);
    let made=0;
    while(d.oreProg>=1){ d.oreProg-=1; d.ore++; d.oreMade++; made++; if(made>5000) break; }
    if(made>0) onOreProduced(made, dt>5);
  }
  function onOreProduced(made, offline){
    updateChips(); renderHUD();
    if(mineView()) updateMineHud();
    if(offline){ if(made>0) toast('Dark Matter mined', '+'+made+' ore accrued while away.','gold'); return; }
    // foreground single-ore juice: ground shudder + ore burst at the rig + heavy thud
    const ov=document.getElementById('stnOverlay');
    if(ov && ov.classList.contains('show') && mineView()){
      ov.classList.remove('quake'); void ov.offsetWidth; ov.classList.add('quake');
      const stage=document.getElementById('stnMineStage');
      if(stage){ const fl=document.createElement('div'); fl.className='stnOreFloat'; fl.textContent='+'+made+' ◆';
        stage.appendChild(fl); setTimeout(()=>fl.remove(),1000); }
    }
    audioThud();
    try{ if(navigator.vibrate) navigator.vibrate(24); }catch(e){}
  }

  function convertOre(){
    const d=st(); const n=Math.floor(d.ore/20);
    if(n<=0) return;
    d.ore-=n*20; d.fuel+=n;
    try{ sfx.buy&&sfx.buy(); }catch(e){}
    toast('Hyperdrive Fuel refined!', '+'+n+' Fuel ('+(n*20)+' ore consumed).','gold');
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
    updateChips(); renderHUD(); updateMineHud();
  }

  /* +20 dakika ilerlet — ödüllü reklam izleyip madenciliği 20 dk ileri sarar.
     Reklam tamamlanmazsa ödül verilmez. ~4 dk gerçek-zaman cooldown spam'i önler. */
  function advanceMineByAd(){
    const d=st();
    if(Date.now() < (d.adOreAt||0)) return;
    const grant=()=>{
      const gain=Math.max(2, Math.round(1200/secPerOre(d.mining)));
      d.ore+=gain; d.oreMade=(d.oreMade||0)+gain;
      d.adOreAt=Date.now()+4*60*1000;
      try{ sfx.buy&&sfx.buy(); }catch(e){}
      try{ onOreProduced&&onOreProduced(gain,false); }catch(e){}
      toast('Mining advanced +20 min','+'+fmt(gain)+' Dark Matter Ore extracted.','gold');
      try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
      updateChips(); renderHUD(); updateMineHud();
    };
    if(window.NB_AD && typeof NB_AD.show==='function') NB_AD.show({label:'Advance Mining +20 min', dur:5}, grant);
    else grant();
  }
  /* ========================== WEB AUDIO ========================== */
  function actx(){ try{ return (typeof ac==='function')?ac():null; }catch(e){ return null; } }
  function noiseBuf(c,dur){ const n=Math.floor(c.sampleRate*dur), b=c.createBuffer(1,n,c.sampleRate), a=b.getChannelData(0);
    for(let i=0;i<n;i++) a[i]=Math.random()*2-1; return b; }
  function audioThud(){
    if(!S.sound) return; const c=actx(); if(!c) return; const t=c.currentTime;
    const o=c.createOscillator(), g=c.createGain();
    o.type='sine'; o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(34,t+0.3);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.5,t+0.018); g.gain.exponentialRampToValueAtTime(0.0001,t+0.55);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+0.6);
    const nb=c.createBufferSource(); nb.buffer=noiseBuf(c,0.12); const nf=c.createBiquadFilter(), ng=c.createGain();
    nf.type='lowpass'; nf.frequency.value=420; ng.gain.setValueAtTime(0.3,t); ng.gain.exponentialRampToValueAtTime(0.001,t+0.12);
    nb.connect(nf); nf.connect(ng); ng.connect(c.destination); nb.start(t); nb.stop(t+0.13);
  }
  let cineNodes=[];
  function stopCineAudio(){ cineNodes.forEach(n=>{ try{ n.stop&&n.stop(); }catch(e){} try{ n.disconnect&&n.disconnect(); }catch(e){} }); cineNodes=[]; }
  function audioRumble(dur){
    if(!S.sound) return; const c=actx(); if(!c) return; const t=c.currentTime;
    const o=c.createOscillator(), g=c.createGain(), f=c.createBiquadFilter();
    o.type='sawtooth'; o.frequency.setValueAtTime(44,t); o.frequency.linearRampToValueAtTime(70,t+dur);
    f.type='lowpass'; f.frequency.value=200;
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.32,t+0.6); g.gain.setValueAtTime(0.32,t+dur-0.4); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(f); f.connect(g); g.connect(c.destination); o.start(t); o.stop(t+dur+0.05); cineNodes.push(o);
  }
  function audioWhoosh(at){
    if(!S.sound) return; const c=actx(); if(!c) return; const t=c.currentTime+(at||0);
    const nb=c.createBufferSource(); nb.buffer=noiseBuf(c,2.0); const f=c.createBiquadFilter(), g=c.createGain();
    f.type='bandpass'; f.Q.value=0.8; f.frequency.setValueAtTime(300,t); f.frequency.exponentialRampToValueAtTime(2600,t+1.8);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.26,t+0.5); g.gain.exponentialRampToValueAtTime(0.0001,t+2.0);
    nb.connect(f); f.connect(g); g.connect(c.destination); nb.start(t); nb.stop(t+2.05); cineNodes.push(nb);
  }
  function audioDecel(at){
    if(!S.sound) return; const c=actx(); if(!c) return; const t=c.currentTime+(at||0);
    const o=c.createOscillator(), g=c.createGain();
    o.type='square'; o.frequency.setValueAtTime(900,t); o.frequency.exponentialRampToValueAtTime(70,t+0.5);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.3,t+0.04); g.gain.exponentialRampToValueAtTime(0.0001,t+0.6);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+0.65); cineNodes.push(o);
  }

  /* ========================== HUD CHIPS ========================== */
  function injectChips(){
    const bar=document.getElementById('topbar'); if(!bar || document.getElementById('oreRes')) return;
    const anchor=document.getElementById('zoneInfo');
    // Skill Points (from skill tree)
    const sp=document.createElement('div'); sp.className='resource stnRes'; sp.id='spRes'; sp.title='Skill Points';
    sp.innerHTML='<span class="ico"><svg viewBox="0 0 20 20"><path d="M10 1.6 12.3 7.4 18.4 7.8 13.7 11.7 15.3 17.6 10 14.2 4.7 17.6 6.3 11.7 1.6 7.8 7.7 7.4Z" fill="#7fffd0" stroke="#bfffe9" stroke-width=".7"/></svg></span><span id="spVal" style="color:#bfffe9">0</span>';
    // Dark Matter Ore
    const ore=document.createElement('div'); ore.className='resource stnRes'; ore.id='oreRes'; ore.title='Dark Matter Ore';
    ore.innerHTML='<span class="ico"><svg viewBox="0 0 20 20"><defs><radialGradient id="oreChipG" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#c79bff"/><stop offset=".55" stop-color="#6a2fb0"/><stop offset="1" stop-color="#140428"/></radialGradient></defs><path d="M10 1.5 16.5 8 10 18.5 3.5 8Z" fill="url(#oreChipG)" stroke="#b98bff" stroke-width="1"/></svg></span><span id="oreVal">0</span>';
    // Hyperdrive Fuel
    const fuel=document.createElement('div'); fuel.className='resource stnRes'; fuel.id='fuelRes'; fuel.title='Hyperdrive Fuel';
    fuel.innerHTML='<span class="ico"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#0a2230" stroke="#46d8ff" stroke-width="1.2"/><path d="M11 3 6 11h3l-1 6 5-8h-3Z" fill="#9af0ff" stroke="#d8fbff" stroke-width=".5"/></svg></span><span id="fuelVal">0</span>';
    if(anchor){ bar.insertBefore(sp,anchor); bar.insertBefore(ore,anchor); bar.insertBefore(fuel,anchor); }
    else { bar.appendChild(sp); bar.appendChild(ore); bar.appendChild(fuel); }
    updateChips();
  }
  function updateChips(){
    const d=st();
    const o=document.getElementById('oreVal'); if(o) o.textContent=fmt(d.ore);
    const f=document.getElementById('fuelVal'); if(f) f.textContent=fmt(d.fuel);
    const s=document.getElementById('spVal'); if(s){ let p=0; try{ p=window.NB_TREE?window.NB_TREE.available():0; }catch(e){} s.textContent=p; }
  }

  /* ========================== STATION OVERLAY ========================== */
  let curView='hub', consoleType=null;
  function mineView(){ return curView==='mine'; }
  const effIcon={ laser:'⚔', armor:'🛡', radar:'📡', mining:'◆' };
  function art(type,p,ac){ try{ return NB_STA.build[type](p,ac); }catch(e){ return ''; } }

  // ---- GALAXY MAP — every upgrade is its own world orbiting the command star.
  // x,y = world centre in % of the galaxy field. r = sphere radius (px @ scale 1),
  // ring = orbit-ring diameter, spin = self-rotation period (s), name/sub = labels.
  const PLANETS=[
    {type:'laser',   x:27, y:29, r:62, ring:150, spin:42, name:'PYRON',    sub:'WEAPON FORGE WORLD'},
    {type:'armor',   x:73, y:25, r:58, ring:138, spin:54, name:'AEGIS-4',  sub:'ARMOR FOUNDRY WORLD'},
    {type:'radar',   x:83, y:60, r:46, ring:112, spin:36, name:'VIGIL',    sub:'DEEP-SCAN RELAY WORLD'},
    {type:'mining',  x:29, y:69, r:66, ring:158, spin:66, name:'KORATH',   sub:'DARK MATTER MINE WORLD'},
    {type:'teleport',x:55, y:80, r:54, ring:170, spin:26, name:'RIFTGATE', sub:'HYPERDRIVE TELEPORT'}
  ];
  const PMAP={}; PLANETS.forEach(p=>PMAP[p.type]=p);
  const TELE={ name:'Riftgate', sub:'HYPERDRIVE TELEPORT', ac:'#e85fc0' };
  const FOCUS_K=2.35, FOCUS_Y=30;   // zoom magnification + on-screen y% of the focused world

  function buildOverlay(){
    if(document.getElementById('stnOverlay')) return;
    const ov=document.createElement('div'); ov.id='stnOverlay';
    ov.innerHTML=
      '<div class="stnView on" id="stnHub">'
        +'<div class="stnSky"></div>'
        +'<div class="gxNebula"></div>'
        +'<div class="stnStars l1"></div><div class="stnStars l2"></div><div class="stnStars l3"></div>'
        +'<div class="gxScrim" id="gxScrim" data-stn="unfocus"></div>'
        +'<div class="galaxy" id="stnGalaxy">'
          +'<div class="gxLines" id="gxLines"></div>'
          +'<div class="gxSun"><span class="gxSunGlow"></span><span class="gxSunCore"></span></div>'
          +'<div class="gxPlanets" id="stnColony"></div>'
        +'</div>'
        +'<div class="gxSpot" id="gxSpot"></div>'
        +'<div class="gxHint" id="gxHint">Tap a world to travel</div>'
        +'<div class="gxDetail" id="gxDetail"></div>'
      +'</div>'
      +'<div class="stnView" id="stnMine"></div>'
      +'<div class="stnHUD" id="stnHUD"></div>';
    document.body.appendChild(ov);
    var _lo=document.body.classList.contains('nb-lowfx');
    seedStars(ov.querySelector('.stnStars.l1'),_lo?16:26,1.5);
    seedStars(ov.querySelector('.stnStars.l2'),_lo?10:16,2.3);
    seedStars(ov.querySelector('.stnStars.l3'),_lo?6:10,3.0);
    ov.addEventListener('click',onOverlayClick);
    /* PERF: SMIL idle animasyonları (mobilde en pahalı kısım) JS ile DONDURULUR.
       Binalar/çekirdek detaylı görünür ama her-kare CPU yükü ~sıfır olur.
       Observer DEBOUNCE'lu: her mutasyonda değil, kare başına en fazla bir kez
       pauseSmil çağırır (eski kod her mutasyonda yeni rAF kuruyordu = thrash). */
    try{
      var _pausePending=false;
      var pauseSmil=function(){ _pausePending=false;
        ov.querySelectorAll('svg').forEach(function(s){ try{ s.pauseAnimations(); }catch(e){} }); };
      pauseSmil();
      var _mo=new MutationObserver(function(){
        if(_pausePending) return; _pausePending=true; requestAnimationFrame(pauseSmil); });
      _mo.observe(ov,{childList:true,subtree:true});
    }catch(e){}
  }
  function seedStars(layer,n,maxR){ let h='';
    for(let i=0;i<n;i++){ const r=(.6+Math.random()*maxR).toFixed(1);
      h+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(Math.random()*60).toFixed(1)+'%;width:'+r+'px;height:'+r+'px"></i>'; }
    layer.innerHTML=h; }
  function seedMotes(layer,n){ if(!layer) return; let h='';
    for(let i=0;i<n;i++){ const s=(2+Math.random()*3).toFixed(1);
      h+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;bottom:'+(Math.random()*55).toFixed(0)+'%;width:'+s+'px;height:'+s+'px;animation-delay:'+(Math.random()*8).toFixed(1)+'s;animation-duration:'+(7+Math.random()*7).toFixed(1)+'s"></i>'; }
    layer.innerHTML=h; }

  /* ---- GALAXY FOCUS CONTROLLER ----
     No scrolling. Tap a world → the whole galaxy GPU-zooms so that world fills
     the upper screen and its console slides up. Tap back/scrim → zoom out. Only
     a single composited `transform` animates, so it stays buttery on mobile. */
  let panAPI=null, focusType=null;
  function focusPlanet(type){
    const P=PMAP[type]; if(!P) return;
    const gx=document.getElementById('stnGalaxy'), hub=document.getElementById('stnHub');
    if(!gx||!hub) return;
    focusType=type;
    const tx=(50-P.x).toFixed(2);
    const ty=(50-P.y+(FOCUS_Y-50)/FOCUS_K).toFixed(2);
    gx.style.transform='scale('+FOCUS_K+') translate('+tx+'%,'+ty+'%)';
    hub.classList.add('focused');
    [].forEach.call(gx.querySelectorAll('.gxPlanet'),el=>{
      el.classList.toggle('isFocus', el.dataset.t===type); });
    const ac=(type==='teleport')?TELE.ac:(B[type]?B[type].ac:'#5fdcff');
    const spot=document.getElementById('gxSpot'); if(spot) spot.style.setProperty('--ac',ac);
    renderDetail(type,false);
    renderHUD();
    try{ if(S.sound) zoomAudio(true); }catch(e){}
  }
  function unfocusGalaxy(){
    if(!focusType) return;
    focusType=null;
    const gx=document.getElementById('stnGalaxy'), hub=document.getElementById('stnHub');
    if(gx){ gx.style.transform=''; [].forEach.call(gx.querySelectorAll('.gxPlanet'),el=>el.classList.remove('isFocus')); }
    if(hub) hub.classList.remove('focused');
    const dt=document.getElementById('gxDetail'); if(dt) dt.classList.remove('show');
    renderHUD();
    try{ if(S.sound) zoomAudio(false); }catch(e){}
  }
  function zoomAudio(zin){
    const c=actx(); if(!c) return; const t=c.currentTime;
    const o=c.createOscillator(), g=c.createGain();
    o.type='sine';
    if(zin){ o.frequency.setValueAtTime(220,t); o.frequency.exponentialRampToValueAtTime(660,t+0.3); }
    else   { o.frequency.setValueAtTime(560,t); o.frequency.exponentialRampToValueAtTime(180,t+0.28); }
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.12,t+0.04); g.gain.exponentialRampToValueAtTime(0.0001,t+0.34);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+0.38);
  }

  function openStation(){
    buildOverlay();
    document.body.classList.add('stnActive');
    curView='hub'; closeConsole();
    document.getElementById('stnHub').classList.add('on');
    document.getElementById('stnMine').classList.remove('on');
    renderStation(); renderHUD();
    const ov=document.getElementById('stnOverlay');
    requestAnimationFrame(()=>{ ov.classList.add('show'); });
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
    const tb=document.querySelector('.tab[data-tab="station"]'); if(tb) tb.classList.add('on');
    try{ if(typeof closeDrawer==='function') closeDrawer(); }catch(e){}
  }
  function closeStation(){
    const ov=document.getElementById('stnOverlay'); if(!ov) return;
    document.body.classList.remove('stnActive');
    closeConsole();
    ov.classList.remove('show');
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
  }
  function isOpen(){ const ov=document.getElementById('stnOverlay'); return ov && ov.classList.contains('show'); }

  function showMine(){ curView='mine'; closeConsole();
    document.getElementById('stnHub').classList.remove('on');
    document.getElementById('stnMine').classList.add('on');
    renderMining(); renderHUD();
  }
  function showHub(){ curView='hub'; closeConsole();
    document.getElementById('stnMine').classList.remove('on');
    document.getElementById('stnHub').classList.add('on');
    renderStation(); renderHUD();
  }

  /* ---- shared top HUD ---- */
  function renderHUD(){
    const d=st(), hud=document.getElementById('stnHUD'); if(!hud) return;
    const focP = focusType ? PMAP[focusType] : null;
    const title = curView==='mine'
      ? '<span>DARK MATTER MINE</span><small>SUBSURFACE EXTRACTION</small>'
      : focP
        ? '<span>'+focP.name+'</span><small>'+focP.sub+'</small>'
        : '<span>NOVA GALAXY</span><small>SECTOR 7G · 5 WORLDS</small>';
    const backAct = curView==='mine' ? 'hub' : (focusType ? 'unfocus' : 'close');
    hud.innerHTML='<button class="stnBack" data-stn="'+backAct+'">‹</button>'
      +'<div class="stnHudTitle">'+title+'</div>'
      +'<div class="stnHudCur">'
        +'<div class="stnCur" style="color:#ffd87a"><span class="dot" style="background:#ffce4d;color:#ffce4d"></span><b>'+fmt(S.credits)+'</b></div>'
        +'<div class="stnCur ore"><span class="dot" style="background:#7a3bd6;color:#b98bff"></span><b>'+fmt(d.ore)+'</b></div>'
        +'<div class="stnCur fuel"><span class="dot" style="background:#1e9fd0;color:#46d8ff"></span><b>'+fmt(d.fuel)+'</b></div>'
      +'</div>';
  }
  function colonyName(){ return 'NOVA PRIME'; }

  /* ---- GALAXY render: lay the 5 worlds + orbit lines into the field ---- */
  function renderStation(){
    const host=document.getElementById('stnColony'); if(!host) return;
    host.innerHTML=PLANETS.map(planetNode).join('');
    drawLines();
    if(focusType){
      const f=host.querySelector('.gxPlanet[data-t="'+focusType+'"]');
      if(f) f.classList.add('isFocus');     // keep the zoomed world lit after a rebuild
      renderDetail(focusType,false);         // keep open sheet synced after upgrades
    }
  }
  function drawLines(){
    const el=document.getElementById('gxLines'); if(!el) return;
    let ln=''; PLANETS.forEach(P=>{
      const ac=(P.type==='teleport')?TELE.ac:(B[P.type]?B[P.type].ac:'#5fdcff');
      ln+='<line x1="50" y1="50" x2="'+P.x+'" y2="'+P.y+'" stroke="'+ac+'"/>'; });
    el.innerHTML='<svg viewBox="0 0 100 100" preserveAspectRatio="none">'+ln+'</svg>';
  }
  function planetNode(P){
    const type=P.type;
    let ac, badge, open;
    if(type==='teleport'){
      const d=st(); open=teleOpen(); ac=TELE.ac;
      badge = !open ? 'SEALED' : (d.fuel>0 ? '⛽ '+fmt(d.fuel) : 'STANDBY');
    } else {
      const d=st(), b=B[type], lv=d[type]; ac=b.ac; open=unlocked(type);
      badge = !open ? 'LOCKED' : (lv>=MAXLV ? '★ MAX' : 'Lv '+lv);
    }
    const maxed=(type!=='teleport' && open && st()[type]>=MAXLV);
    const art=(NB_STA.worldPlanet?NB_STA.worldPlanet(type,type+'_pl'):'');
    return '<button class="gxPlanet'+(maxed?' maxed':'')+(open?'':' locked')+'" data-stn="planet" data-t="'+type+'" '
      +'style="left:'+P.x+'%;top:'+P.y+'%;--r:'+P.r+'px;--ring:'+P.ring+'px;--spin:'+P.spin+'s;--ac:'+ac+'">'
      +'<span class="gxRing"></span>'
      +'<span class="gxBody'+(open?'':' dim')+'">'+art+(open?'':'<span class="gxLock">🔒</span>')+'</span>'
      +'<span class="gxLabel"><b>'+P.name+'</b><i>'+badge+'</i></span>'
      +'</button>';
  }
  function teleOpen(){ return unlocked('mining')||st().fuel>0; }

  /* ---- holographic detail / UPGRADE screen ---- */
  function ringGauge(lv,ac){ const C=2*Math.PI*30, off=(C*(1-lv/MAXLV)).toFixed(1);
    return '<svg viewBox="0 0 80 80" class="stnRing"><circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="6"/>'
      +'<circle cx="40" cy="40" r="30" fill="none" stroke="'+ac+'" stroke-width="6" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+off+'" transform="rotate(-90 40 40)" style="filter:drop-shadow(0 0 4px '+ac+')"/>'
      +'<text x="40" y="40" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">'+lv+'</text>'
      +'<text x="40" y="55" text-anchor="middle" font-size="9" fill="'+ac+'">/ '+MAXLV+'</text></svg>'; }

  // current vs next-level benefit, shown with an arrow
  function nextEffect(type,lv){
    if(type==='laser') return {label:'WEAPON TIER', now:'Tier '+lv, next:lv<MAXLV?'Tier '+(lv+1):'MAX'};
    if(type==='armor') return {label:'ARMOR TIER',  now:'Tier '+lv, next:lv<MAXLV?'Tier '+(lv+1):'MAX'};
    if(type==='radar') return {label:'OFFLINE GOLD', now:'+'+(lv*8)+'%', next:lv<MAXLV?'+'+((lv+1)*8)+'%':'MAX'};
    return {label:'MINE RATE', now:'1 / '+fmtDur(secPerOre(lv)), next:lv<MAXLV?'1 / '+fmtDur(secPerOre(lv+1)):'MAX'};
  }

  function renderDetail(type, fx){
    const dt=document.getElementById('gxDetail'); if(!dt) return;
    if(type==='teleport'){ renderTeleDetail(dt,fx); return; }
    const d=st(), b=B[type], lv=d[type], ac=b.ac, open=unlocked(type), maxed=lv>=MAXLV;
    const ne=nextEffect(type,lv);
    let btns='';
    if(!open){ btns='<div class="conLock"><span class="lk">🔒</span><span class="rq">'+lockReq(type)+'</span></div>'; }
    else if(maxed){ btns='<div class="conMax">★ MAX LEVEL<small>Plasma core online — peak output</small></div>'; }
    else { const cost=bcost(type), poor=S.credits<cost;
      btns='<button class="conUp'+(poor?' poor':'')+'" data-stn="up" data-t="'+type+'" style="--ac:'+ac+'">'
        +'<span class="conUpGlow"></span>'
        +'<span class="ua">▲ UPGRADE</span><span class="ub">Level '+lv+' → '+(lv+1)+'</span>'
        +'<span class="uc">💰 '+fmt(cost)+'</span></button>'; }
    if(type==='mining' && open) btns+='<button class="conMine" data-stn="mine">⛏ ENTER THE MINE</button>';
    dt.style.setProperty('--ac',ac);
    dt.innerHTML='<div class="gxdHandle" data-stn="unfocus"></div>'
      +'<div class="gxdHero">'
        +'<div class="gxdArt'+(maxed?' maxed':'')+(fx?' pop':'')+'">'+(NB_STA.worldPlanet?NB_STA.worldPlanet(type,type+'_dt'):'')+'</div>'
        +'<div class="conHd"><div class="conName">'+b.name+'</div>'
          +'<div class="conLvPill'+(fx?' bump':'')+'" style="--ac:'+ac+'">'+(open?('LEVEL '+lv+' <i>/ '+MAXLV+'</i>'):'LOCKED')+'</div></div>'
        +'<div class="conGauge">'+ringGauge(lv,ac)+'</div>'
      +'</div>'
      +'<div class="conProg"><i style="--ac:'+ac+';width:'+(lv/MAXLV*100).toFixed(1)+'%"></i></div>'
      +'<div class="conStatRow">'
        +'<div class="conStatHd"><i style="color:'+ac+'">'+effIcon[type]+'</i> '+ne.label+'</div>'
        +'<div class="conStatVals"><span class="cNow">'+ne.now+'</span>'
          +(maxed?'':'<span class="cArr" style="color:'+ac+'">→</span><span class="cNext'+(fx?' flash':'')+'" style="color:'+ac+'">'+ne.next+'</span>')+'</div>'
      +'</div>'
      +'<div class="conDesc">'+b.desc(lv)+'</div>'
      +'<div class="conBtns">'+btns+'</div>';
    dt.classList.add('show');
    if(fx){ try{ levelUpAudio(ac); }catch(e){}
      dt.classList.remove('flashUp'); void dt.offsetWidth; dt.classList.add('flashUp'); }
  }
  function renderTeleDetail(dt,fx){
    const d=st(), ac=TELE.ac, open=teleOpen(), fuel=d.fuel;
    let cta;
    if(!open) cta='<div class="conLock"><span class="lk">🔒</span><span class="rq">Power the Riftgate by unlocking the <b>Ore Mine</b> and refining Hyperdrive Fuel.</span></div>';
    else if(fuel>0) cta='<button class="conUp" data-stn="boss" style="--ac:'+ac+'"><span class="conUpGlow"></span><span class="ua">▸ Engage Teleport</span><span class="ub">Warp to the World Boss</span><span class="uc">⛽ '+fmt(fuel)+'</span></button>';
    else cta='<div class="conMax" style="background:linear-gradient(180deg,#f3acdd,#a23b86);color:#2a0a24">⛽ NO FUEL<small>Refine Dark Matter Ore into Fuel at KORATH</small></div>';
    dt.style.setProperty('--ac',ac);
    dt.innerHTML='<div class="gxdHandle" data-stn="unfocus"></div>'
      +'<div class="gxdHero">'
        +'<div class="gxdArt tele">'+(NB_STA.teleGate?NB_STA.teleGate('dtg_',ac):'')+'</div>'
        +'<div class="conHd"><div class="conName">Riftgate</div>'
          +'<div class="conLvPill" style="--ac:'+ac+'">'+(open?(fuel>0?'ONLINE':'STANDBY'):'SEALED')+'</div></div>'
      +'</div>'
      +'<div class="conDesc">A folded-space gateway anchored in low orbit. Spend <em>1 Hyperdrive Fuel</em> to tear open a rift and teleport straight into the World Boss arena.</div>'
      +'<div class="conBtns">'+cta+'</div>';
    dt.classList.add('show');
  }
  function closeConsole(){ focusType=null;
    const gx=document.getElementById('stnGalaxy');
    if(gx){ gx.style.transform=''; [].forEach.call(gx.querySelectorAll('.gxPlanet'),el=>el.classList.remove('isFocus')); }
    const hub=document.getElementById('stnHub'); if(hub) hub.classList.remove('focused');
    const dt=document.getElementById('gxDetail'); if(dt) dt.classList.remove('show'); }

  function levelUpAudio(ac){
    if(!S.sound) return; const c=actx(); if(!c) return; const t=c.currentTime;
    [523,659,784,1047].forEach((f,i)=>{ const o=c.createOscillator(), g=c.createGain();
      o.type='triangle'; o.frequency.setValueAtTime(f,t+i*0.05);
      g.gain.setValueAtTime(0.0001,t+i*0.05); g.gain.exponentialRampToValueAtTime(0.22,t+i*0.05+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+i*0.05+0.4);
      o.connect(g); g.connect(c.destination); o.start(t+i*0.05); o.stop(t+i*0.05+0.45); });
  }

  /* ---- mining scene ---- */
  function renderMining(){
    const host=document.getElementById('stnMine'); if(!host) return;
    host.innerHTML=
      '<div class="mnBg"></div><div class="mnFog"></div>'
      +'<div class="mnMotes" id="mnMotes"></div>'
      +'<div class="mnStage" id="stnMineStage">'
        +'<div class="mnCryB" style="left:14%">'+sideCrystal('#7a3bd6')+'</div>'
        +'<div class="mnCryB" style="right:12%;transform:scaleX(-1)">'+sideCrystal('#5a2fa0')+'</div>'
        +'<div class="mnRig">'+art('mining','mn_hero_','#b98bff')+'</div>'
      +'</div>'
      +'<div class="mnHud" id="mnHud"></div>';
    const motes=host.querySelector('#mnMotes'); let mh='';
    for(let i=0;i<16;i++){ mh+='<i style="left:'+(Math.random()*100).toFixed(0)+'%;bottom:'+(Math.random()*60).toFixed(0)+'%;animation-delay:'+(Math.random()*6).toFixed(1)+'s;animation-duration:'+(5+Math.random()*5).toFixed(1)+'s"></i>'; }
    motes.innerHTML=mh;
    updateMineHud();
  }
  function sideCrystal(c){ return '<svg viewBox="0 0 80 120"><defs><radialGradient id="sc'+c.slice(1)+'" cx=".42" cy=".3" r=".8"><stop offset="0" stop-color="#c9a3ff"/><stop offset=".5" stop-color="'+c+'"/><stop offset="1" stop-color="#0a0316"/></radialGradient></defs>'
    +'<path d="M40 118 L24 70 L36 30 L48 56 L58 44 L60 82 Z" fill="url(#sc'+c.slice(1)+')" stroke="#b98bff" stroke-width="1.2" opacity=".9"><animate attributeName="opacity" values=".9;.6;.9" dur="3s" repeatCount="indefinite"/></path></svg>'; }

  function updateMineHud(){
    const d=st(), hud=document.getElementById('mnHud'); if(!hud) return;
    const prog=Math.max(0,Math.min(1,d.oreProg))*100;
    const orePerHr=3600/secPerOre(d.mining);
    const can=Math.floor(d.ore/20);
    hud.innerHTML=
      '<div class="mnTop"><div class="mnOre"><span class="mnOreN">'+fmt(d.ore)+'</span><span class="mnOreL">◆ DARK MATTER ORE</span></div>'
        +'<div class="mnRate">'+(orePerHr<10?orePerHr.toFixed(1):Math.round(orePerHr))+' / hr<small>1 ore · '+fmtDur(secPerOre(d.mining))+'</small></div></div>'
      +'<div class="mnBar"><i style="width:'+prog.toFixed(1)+'%"></i></div>'
      +'<button class="mnRefine" data-stn="convert"'+(can<=0?' disabled':'')+'>'
        +(can>0?'<span class="ra">REFINE '+can+' FUEL</span><span class="rb">20 ◆ → 1 ⛽ · uses '+(can*20)+' ore</span>'
               :'<span class="ra dim">REFINE FUEL</span><span class="rb">Need 20 ore (have '+fmt(d.ore)+')</span>')+'</button>'
      +(function(){
          var ready = Date.now() >= (d.adOreAt||0);
          var gain = Math.max(2, Math.round(1200/secPerOre(d.mining)));
          if(ready) return '<button class="mnAdvance" data-stn="adOre"><span class="ra">📺 ADVANCE +20 MIN</span><span class="rb">Watch an ad → +'+fmt(gain)+' ◆ ore instantly</span></button>';
          var left=Math.ceil(((d.adOreAt||0)-Date.now())/1000);
          return '<button class="mnAdvance" disabled><span class="ra dim">📺 ADVANCE +20 MIN</span><span class="rb">Ready in '+fmtDur(left)+'</span></button>';
        })();
  }

  function onOverlayClick(e){
    const t=e.target.closest('[data-stn]'); if(!t) return;
    const act=t.dataset.stn;
    if(act==='close'){ closeStation(); }
    else if(act==='mine'){ showMine(); }
    else if(act==='hub'){ showHub(); }
    else if(act==='planet'){ if(focusType===t.dataset.t) unfocusGalaxy(); else focusPlanet(t.dataset.t); }
    else if(act==='unfocus'){ unfocusGalaxy(); }
    else if(act==='conClose'){ unfocusGalaxy(); }
    else if(act==='up'){ upgrade(t.dataset.t); }
    else if(act==='convert'){ convertOre(); }
    else if(act==='adOre'){ advanceMineByAd(); }
    else if(act==='boss'){ goWorldBoss(); }
  }

  /* ========================== WORLD BOSS (fuel-gated + cinematic) ========================== */
  function pickBoss(){
    const list=(window.NB_WB&&window.NB_WB.bosses)||[{name:'World Boss',unlock:1}];
    const mw=Math.max((S.wave||1),(S.stats&&S.stats.maxWave)||1);
    let idx=0; list.forEach((b,i)=>{ if(mw>=b.unlock) idx=i; });
    return { idx, name:list[idx].name };
  }

  let launchedBoss=false;
  function launchBossIdx(idx){
    const d=st();
    if(d.fuel<1){ toast('No Hyperdrive Fuel','Refine ore into fuel in the colony mine first.','gold'); return; }
    if(!window.NB_WB || typeof window.NB_WB.enter!=='function'){ toast('World Boss offline','Boss system not ready.','gold'); return; }
    d.fuel--; d.fuelSpent++; updateChips();
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
    try{ if(window.NB_BW) window.NB_BW.close(); }catch(e){}
    closeStation();
    playCinematic(()=>{
      launchedBoss=true;
      document.body.classList.add('wbAlarm');
      try{ window.NB_WB.enter(idx); }catch(e){ document.body.classList.remove('wbAlarm'); }
    });
  }
  function goWorldBoss(){
    if(!window.NB_WB || typeof window.NB_WB.enter!=='function'){ toast('World Boss offline','Boss system not ready.','gold'); return; }
    // Hyperdrive pad → gezegen/boss seçim ekranı (3 gezegen × 3 boss, kaydırmalı)
    if(window.NB_BW && typeof window.NB_BW.open==='function'){
      window.NB_BW.open({
        fuelLeft: function(){ return st().fuel; },
        canLaunch: function(){ return st().fuel>=1; },
        onLaunch: function(idx){ launchBossIdx(idx); }
      });
      return;
    }
    // yedek: doğrudan rastgele boss
    launchBossIdx(pickBoss().idx);
  }

  // 5-second hyperspace travel
  function buildCine(){
    if(document.getElementById('hyperCine')) return;
    const c=document.createElement('div'); c.id='hyperCine';
    let streaks=''; for(let i=0;i<60;i++){ streaks+='<i style="top:'+(Math.random()*100).toFixed(1)+'%;animation-delay:'+(Math.random()*0.5).toFixed(2)+'s"></i>'; }
    let rings=''; const cols=['#b87bff','#46a8ff','#ffffff','#8a5bff','#6ad0ff'];
    for(let i=0;i<14;i++){ rings+='<div class="ring" style="border-color:'+cols[i%cols.length]+';animation-delay:'+(i*0.16).toFixed(2)+'s"></div>'; }
    c.innerHTML='<div class="hcStars">'+streaks+'</div>'
      +'<div class="hcTunnel">'+rings+'</div>'
      +'<div class="hcFlash"></div><div class="hcPlanet"></div>'
      +'<button class="hcSkip">SKIP ▸</button>';
    document.body.appendChild(c);
    c.querySelector('.hcSkip').addEventListener('click',skipCine);
  }
  let cineTimers=[], cineDone=null, cineFinished=false;
  function clearCineTimers(){ cineTimers.forEach(clearTimeout); cineTimers=[]; }
  function playCinematic(done){
    buildCine();
    const c=document.getElementById('hyperCine');
    cineDone=done; cineFinished=false;
    c.className=''; void c.offsetWidth; c.classList.add('show');
    try{ if(actx() && actx().state==='suspended') actx().resume(); }catch(e){}
    // sec 0-1: warp streaks + rumble
    c.classList.add('warp'); audioRumble(5.0);
    // sec 1-3: wormhole tunnel + whoosh
    cineTimers.push(setTimeout(()=>{ c.classList.add('tunnel'); audioWhoosh(0); },1000));
    // skippable after 2s
    cineTimers.push(setTimeout(()=>{ c.classList.add('canskip'); },2000));
    // sec 3-4.5: white flash + decel
    cineTimers.push(setTimeout(()=>{ c.classList.remove('tunnel'); c.classList.add('flash'); audioDecel(0); },3000));
    // sec 4.5-5: arrival
    cineTimers.push(setTimeout(()=>{ c.classList.add('arrive'); },4400));
    cineTimers.push(setTimeout(()=>{ finishCine(); },5000));
  }
  function skipCine(){
    const c=document.getElementById('hyperCine'); if(!c) return;
    clearCineTimers(); audioDecel(0);
    c.classList.add('flash','arrive');
    cineTimers.push(setTimeout(finishCine,420));
  }
  function finishCine(){
    if(cineFinished) return; cineFinished=true;
    clearCineTimers(); stopCineAudio();
    const c=document.getElementById('hyperCine'); if(c) c.className='';
    const cb=cineDone; cineDone=null; if(typeof cb==='function') cb();
  }

  // detect end of boss fight → fade out and return to Station
  function watchBossReturn(){
    setInterval(()=>{
      if(launchedBoss && !document.body.classList.contains('worldBoss')){
        launchedBoss=false;
        const curtain=ensureCurtain();
        curtain.classList.add('on');
        setTimeout(()=>{
          document.body.classList.remove('wbAlarm');
          openStation();
          requestAnimationFrame(()=>{ setTimeout(()=>curtain.classList.remove('on'),60); });
        },1500);
      }
    },400);
  }
  function ensureCurtain(){ let c=document.getElementById('stnCurtain'); if(!c){ c=document.createElement('div'); c.id='stnCurtain'; document.body.appendChild(c); } return c; }

  /* ========================== TAB / GATE HOOKS ========================== */
  function hookTab(){
    const tb=document.querySelector('.tab[data-tab="station"]'); if(!tb) return;
    tb.addEventListener('click',function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if(isOpen()) closeStation(); else openStation();
    },true);
    // tapping any OTHER bottom tab dismisses the station overlay first
    const tabs=document.getElementById('tabs');
    if(tabs) tabs.addEventListener('click',function(e){
      const t=e.target.closest('.tab'); if(!t) return;
      if(t.dataset.tab!=='station' && isOpen()) closeStation();
    },true);
  }

  function stripTags(s){ return String(s).replace(/<[^>]+>/g,''); }

  function wrapGuards(){
    if(typeof window.buySword==='function' && !window.buySword.__stn){
      const _bs=window.buySword;
      window.buySword=function(i){ const r=weaponLockReason(i); if(r){ toast('Tier locked', r+' — upgrade it in the Space Station.','gold'); return; } return _bs.apply(this,arguments); };
      window.buySword.__stn=true;
    }
    if(typeof window.buyArmor==='function' && !window.buyArmor.__stn){
      const _ba=window.buyArmor;
      window.buyArmor=function(i){ const r=armorLockReason(i); if(r){ toast('Tier locked', r+' — upgrade it in the Space Station.','gold'); return; } return _ba.apply(this,arguments); };
      window.buyArmor.__stn=true;
    }
    if(typeof window.offlineRateBonus==='function' && !window.offlineRateBonus.__stn){
      const _or=window.offlineRateBonus;
      window.offlineRateBonus=function(){ let v=_or.apply(this,arguments); try{ v+=st().radar*0.08; }catch(e){} return v; };
      window.offlineRateBonus.__stn=true;
    }
  }

  /* ========================== INIT ========================== */
  function init(){
    st();
    injectChips();
    buildOverlay();
    buildCine();
    hookTab();
    wrapGuards();
    watchBossReturn();
    // ore production loop (independent of combat tick — runs in every mode)
    mineTick();               // catch up offline ore immediately
    setInterval(mineTick,1000);
    setInterval(updateChips,1500);
    // expose for the inline gallery gating + debugging
    window.NB_ST={
      open:openStation, close:closeStation,
      weaponLockReason, armorLockReason,
      state:st, upgrade, convertOre, goWorldBoss,
      secPerOre, bcost
    };
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ready);
  else ready();
})();
