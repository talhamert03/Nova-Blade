/* ============================================================================
   NOVA BLADE · v5 SANDIK AÇILIMI — Clash Royale tarzı tek-tek açılım + FX,
   ve sahnedeki 2. sıra kahramanlarının yerleşim stilleri.
   ============================================================================ */
(function(){
  if(typeof S==='undefined') return;
  if(window.__nbChestFxInstalled) return; window.__nbChestFxInstalled=true;

  /* ---------- CSS ---------- */
  var css = document.createElement('style'); css.id='nbChestFxCss';
  css.textContent = `
  /* ====== Clash-Royale sandık açılımı ====== */
  .cr2Ov{position:fixed; inset:0; z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center;
    background:radial-gradient(circle at 50% 38%, rgba(20,28,46,.92), rgba(4,6,12,.97)); opacity:0; transition:opacity .25s;
    -webkit-user-select:none; user-select:none; overflow:hidden; touch-action:manipulation}
  .cr2Ov.show{opacity:1}
  .cr2Ov.shake{animation:cr2Shake .4s}
  @keyframes cr2Shake{0%,100%{transform:translate(0,0)}20%{transform:translate(-7px,3px)}40%{transform:translate(6px,-4px)}60%{transform:translate(-5px,2px)}80%{transform:translate(4px,-2px)}}
  .cr2Title{position:absolute; top:9%; font-size:clamp(15px,4.4vw,24px); font-weight:900; letter-spacing:.14em;
    text-transform:uppercase; text-shadow:0 0 20px currentColor, 0 2px 4px #000}
  .cr2Stage{position:relative; display:flex; align-items:center; justify-content:center; width:min(62vw,260px); height:min(62vw,260px)}
  .cr2Aura{position:absolute; inset:-30%; border-radius:50%; background:radial-gradient(circle, var(--cc,#7fe0ff) 0%, transparent 62%);
    opacity:.32; animation:cr2Pulse 2s ease-in-out infinite}
  @keyframes cr2Pulse{0%,100%{transform:scale(.92); opacity:.22}50%{transform:scale(1.08); opacity:.42}}
  .cr2Beams{position:absolute; inset:-32%; background:conic-gradient(from 0deg, transparent 0 8deg, var(--cc,#7fe0ff) 9deg 10deg, transparent 11deg 30deg);
    opacity:0; animation:cr2Spin 9s linear infinite; will-change:transform; -webkit-mask-image:radial-gradient(circle,#000 30%,transparent 70%); mask-image:radial-gradient(circle,#000 30%,transparent 70%)}
  @keyframes cr2Spin{to{transform:rotate(360deg)}}
  .cr2Ov.opening .cr2Beams{opacity:.28}
  .cr2Chest{position:relative; width:78%; height:78%; display:flex; align-items:center; justify-content:center; cursor:pointer;
    animation:cr2Idle 2.6s ease-in-out infinite; transition:transform .2s}
  .cr2Chest svg{width:100%; height:100%; overflow:visible}
  @keyframes cr2Idle{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-7px) rotate(1deg)}}
  .cr2Ov.shaking .cr2Chest{animation:cr2ChestShake .18s linear infinite}
  @keyframes cr2ChestShake{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(-4px,1px) rotate(-3deg)}75%{transform:translate(4px,-1px) rotate(3deg)}}
  .cr2Ov.burst .cr2Chest{animation:cr2ChestPop .5s ease-out forwards}
  @keyframes cr2ChestPop{0%{transform:scale(1)}40%{transform:scale(1.18)}100%{transform:scale(.6); opacity:0}}
  .cr2Hint{position:absolute; bottom:13%; font-size:13px; font-weight:800; letter-spacing:.18em; color:#cfe2ff; opacity:.85;
    animation:cr2Blink 1.2s ease-in-out infinite}
  @keyframes cr2Blink{0%,100%{opacity:.35}50%{opacity:1}}
  .cr2Count{position:absolute; top:16.5%; font-size:11px; font-weight:800; letter-spacing:.16em; color:#9fb0c4; opacity:.8}

  /* açılan ödül kartı (merkez) */
  .cr2Pop{position:absolute; display:flex; flex-direction:column; align-items:center; gap:6px; pointer-events:none;
    --pc:#9fb0c4; --pg:#d6e2f0}
  .cr2PopBurst{position:absolute; width:300px; height:300px; left:50%; top:42%; transform:translate(-50%,-50%);
    background:radial-gradient(circle, var(--pg) 0%, var(--pc) 24%, transparent 58%); opacity:0; border-radius:50%;
    animation:cr2BurstPop .6s ease-out}
  @keyframes cr2BurstPop{0%{opacity:.9; transform:translate(-50%,-50%) scale(.2)}100%{opacity:0; transform:translate(-50%,-50%) scale(1.6)}}
  .cr2Card{position:relative; width:min(46vw,180px); padding:16px 12px 13px; border-radius:18px;
    background:linear-gradient(180deg, color-mix(in srgb,var(--pc) 26%, #0c1320), #070b14);
    border:2px solid var(--pc); box-shadow:0 0 28px -4px var(--pc), inset 0 1px 0 rgba(255,255,255,.1);
    display:flex; flex-direction:column; align-items:center; gap:5px; transform-style:preserve-3d;
    animation:cr2CardSpin .62s cubic-bezier(.2,.85,.3,1)}
  @keyframes cr2CardSpin{
    0%{transform:perspective(700px) rotateY(0deg) scale(.42) translateY(22px); opacity:0}
    14%{opacity:1}
    100%{transform:perspective(700px) rotateY(720deg) scale(1) translateY(0); opacity:1}}
  .cr2Ico{width:84px; height:84px; display:flex; align-items:center; justify-content:center;
    filter:drop-shadow(0 0 12px var(--pc))}
  .cr2Ico svg{width:100%; height:100%; overflow:visible}
  .cr2Ico.hero{width:96px; height:112px}
  .cr2Rar{font-size:10.5px; font-weight:900; letter-spacing:.14em; text-transform:uppercase; color:var(--pc)}
  .cr2Name{font-size:14px; font-weight:800; color:#eaf2ff; text-align:center; line-height:1.15}
  .cr2Sub{font-size:11px; font-weight:600; color:#aebccf; text-align:center}
  .cr2Big{position:absolute; top:24%; font-size:clamp(22px,8vw,46px); font-weight:900; letter-spacing:.06em;
    text-transform:uppercase; color:var(--pc); text-shadow:0 0 30px var(--pc), 0 3px 6px #000; pointer-events:none;
    animation:cr2BigIn .5s cubic-bezier(.16,1.4,.4,1)}
  @keyframes cr2BigIn{0%{transform:scale(.3); opacity:0}55%{transform:scale(1.15)}100%{transform:scale(1); opacity:1}}

  /* alt tepsi (açılmış ödüller) */
  .cr2Tray{position:absolute; bottom:5.5%; display:flex; gap:7px; flex-wrap:wrap; justify-content:center; max-width:92vw; padding:0 8px}
  .cr2Slot{width:46px; height:46px; border-radius:11px; display:flex; align-items:center; justify-content:center;
    background:rgba(10,16,26,.8); border:1.6px solid var(--pc,#2a3a52); --pc:#9fb0c4;
    box-shadow:0 0 10px -3px var(--pc); animation:cr2SlotIn .3s ease-out}
  @keyframes cr2SlotIn{0%{transform:scale(0)}100%{transform:scale(1)}}
  .cr2Slot svg{width:78%; height:78%; overflow:visible}
  .cr2Done{position:absolute; bottom:14.5%; font-size:13px; font-weight:800; letter-spacing:.14em; color:#cfe2ff;
    opacity:0; transition:opacity .4s}
  .cr2Done.on{opacity:.9; animation:cr2Blink 1.3s ease-in-out infinite}

  /* parçacık yağmuru */
  .cr2Rain{position:absolute; inset:0; pointer-events:none; overflow:hidden}
  .cr2Rain i{position:absolute; top:-8%; width:8px; height:8px; border-radius:2px; background:var(--pc,#ffd24a);
    animation:cr2Fall linear forwards; opacity:.95}
  @keyframes cr2Fall{to{transform:translateY(118vh) rotate(360deg); opacity:.2}}
  @media (prefers-reduced-motion:reduce){ .cr2Chest,.cr2Aura,.cr2Beams{animation:none} .cr2Card{animation:cr2CardInRM .3s ease-out} @keyframes cr2CardInRM{0%{opacity:0;transform:scale(.7)}100%{opacity:1;transform:scale(1)}} }

  /* ====== SAHNE: 2. SIRA KAHRAMANLAR ====== */
  /* 2. uçan — arka planda yüksekte süzülen destek (küçük, soluk, derinlik hissi) */
  #allyBgAirWrap{position:absolute; left:62%; top:12%; width:clamp(40px,12vw,60px); z-index:3;
    pointer-events:none; opacity:.66; filter:drop-shadow(0 4px 7px rgba(0,0,0,.5)) saturate(.85);
    animation:nbBgAirDrift 13s ease-in-out infinite}
  #allyBgAirWrap .allyChar{width:100%; animation:nbBgAirFloat 4.2s ease-in-out infinite}
  #allyBgAirWrap svg{width:100%; display:block}
  @keyframes nbBgAirDrift{0%,100%{transform:translateX(0)}50%{transform:translateX(-26px)}}
  @keyframes nbBgAirFloat{0%,100%{transform:translateY(0) rotate(2deg)}50%{transform:translateY(-10px) rotate(-2deg)}}
  /* 2. yürüyen — en arkada/yanda ikinci sıra (küçük + hafif soluk, geride durur) */
  #allyBackWrap{position:absolute; left:23%; bottom:9%; width:clamp(56px,16vw,80px); z-index:4;
    pointer-events:none; opacity:.8; filter:drop-shadow(0 5px 8px rgba(0,0,0,.5)) brightness(.86) saturate(.9);
    animation:nbBackBob 3.6s ease-in-out infinite}
  #allyBackWrap .allyChar{width:100%}
  #allyBackWrap svg{width:100%; display:block}
  @keyframes nbBackBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
  @media (prefers-reduced-motion:reduce){ #allyBgAirWrap,#allyBgAirWrap .allyChar,#allyBackWrap{animation:none} }
  /* DUSUK-FX / mobil kasma: en pahali parcalar (donen huzme + aura nabzi) kapatilir.
     Huzme tam-ekran conic-gradient + blend idi; en cok kasan kisim buydu. */
  body.nb-lowfx .cr2Beams{display:none !important}
  body.nb-lowfx .cr2Aura{animation:none !important; opacity:.26}
  body.nb-lowfx .cr2Ico,body.nb-lowfx .cr2Slot{filter:none !important}
  /* while the reveal overlay covers the screen, freeze the combat background */
  body.nbModalOpen #bgWrap, body.nbModalOpen #bgWrap *, body.nbModalOpen #particleLayer{ animation-play-state:paused !important; }
  /* PERF: sandık açılım ekranı neredeyse opak — arkadaki ağır savaş katmanlarını
     tamamen gizle (paint/kompozit YOK). Açılış kartı dönüşü + tepsi animasyonu
     bu sayede orta cihazlarda da pürüzsüz akar. (İstasyon overlay'iyle aynı taktik.) */
  body.nbModalOpen #bgWrap, body.nbModalOpen #particleLayer, body.nbModalOpen #fxLayer,
  body.nbModalOpen #actors, body.nbModalOpen #forceFxLayer, body.nbModalOpen #frenzyGlow,
  body.nbModalOpen #flashLayer, body.nbModalOpen #alarmLayer{ display:none !important; }
  `;
  document.head.appendChild(css);

  /* ---------- yardımcılar ---------- */
  function rewardRank(r){
    if(r.kind==='gold') return 0;
    if(r.kind==='crystal') return 1;
    if(r.kind==='loot'){ try{ return 2 + (typeof rarIdx==='function'? rarIdx(r.it.rarity):0); }catch(e){ return 2; } }
    if(r.kind==='pet'){ var po=['common','regular','rare','epic','legendary'].indexOf(r.rarity); return 6 + (po<0?0:po); }
    if(r.kind==='hero'){ var a=ALLIES[r.idx], ri=(window.NB_RORD||[]).indexOf((a&&a.rarity)||'common'); return 7 + (ri<0?0:ri); }
    return 0;
  }
  function rewardTier(r){ // FX şiddeti 0..4
    if(r.kind==='gold'||r.kind==='crystal') return 0;
    if(r.kind==='loot'){ var i=0; try{i=rarIdx(r.it.rarity);}catch(e){} return Math.min(3,i); }
    if(r.kind==='pet'){ var po=['common','regular','rare','epic','legendary'].indexOf(r.rarity); return Math.min(4, Math.max(1, po)); }
    if(r.kind==='hero'){ if(r.dup) return 1; var a=ALLIES[r.idx], ri=(window.NB_RORD||[]).indexOf((a&&a.rarity)||'common'); return Math.min(4, Math.max(1, ri)); }
    return 0;
  }
  function rewardColor(r){
    if(r.kind==='gold') return {c:'#ffd24a', g:'#fff0b0'};
    if(r.kind==='crystal') return {c:'#b86bff', g:'#e8d0ff'};
    if(r.kind==='loot'){ try{ var lr=lootRarity(r.it); return {c:lr.color, g:lr.glow}; }catch(e){ return {c:'#9fb0c4', g:'#d6e2f0'}; } }
    if(r.kind==='pet'){ var pr=(window.NB_PETS&&window.NB_PETS.rarColor)?window.NB_PETS.rarColor(r.rarity):{col:'#9fb0c4'}; return {c:pr.col||'#9fb0c4', g:'#ffe9c2'}; }
    if(r.kind==='hero'){ var rc=(window.NB_heroRarColor?window.NB_heroRarColor(r.idx):{c:'#9fb0c4',g:'#d6e2f0'}); return {c:rc.c, g:rc.g}; }
    return {c:'#9fb0c4', g:'#d6e2f0'};
  }
  function coinIco(){ return '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="#ffd24a" stroke="#b8860b" stroke-width="2"/><circle cx="20" cy="20" r="10" fill="none" stroke="#fff3c4" stroke-width="1.5" opacity=".7"/><text x="20" y="26" text-anchor="middle" font-size="16" font-weight="900" fill="#7a5408">¢</text></svg>'; }
  function gemIco(){ return '<svg viewBox="0 0 40 40"><polygon points="20,3 33,15 20,37 7,15" fill="#c89bff" stroke="#8a4ed8" stroke-width="1.6"/><polygon points="20,3 33,15 20,18 7,15" fill="#e8d0ff" opacity=".7"/><polygon points="7,15 33,15 20,37" fill="#000" opacity=".12"/></svg>'; }
  function rewardIco(r){
    if(r.kind==='gold') return coinIco();
    if(r.kind==='crystal') return gemIco();
    if(r.kind==='loot'){ try{ return lootIconSVG(r.it); }catch(e){ return ''; } }
    if(r.kind==='pet'){ try{ return (window.NB_PETS&&window.NB_PETS.eggSVG)?window.NB_PETS.eggSVG(r.rarity):''; }catch(e){ return ''; } }
    if(r.kind==='hero'){ var a=ALLIES[r.idx], hs=(typeof NB_HEROES!=='undefined')&&NB_HEROES.find(function(h){return h.id===a.skin;}); return (hs&&hs.svg)?hs.svg:''; }
    return '';
  }
  function fmtN(n){ try{ return fmt(n); }catch(e){ return ''+n; } }

  function spawnRain(host, color, n){
    for(var i=0;i<n;i++){
      var p=document.createElement('i');
      p.style.left=(Math.random()*100)+'%';
      p.style.background=color;
      p.style.setProperty('--pc', color);
      p.style.animationDelay=(Math.random()*0.7)+'s';
      p.style.animationDuration=(1.1+Math.random()*1.2)+'s';
      p.style.transform='scale('+(0.5+Math.random()*1)+')';
      host.appendChild(p);
    }
  }

  /* ---------- Clash-Royale tarzı açılım ---------- */
  window.showChestReveal = function(rewards, chest){
    rewards = (rewards||[]).slice().sort(function(a,b){ return rewardRank(a)-rewardRank(b); });
    var c = chest.c || {glow:'#7fe0ff'};
    var ov=document.createElement('div'); ov.className='cr2Ov'; ov.style.setProperty('--cc', c.glow);

    var title=document.createElement('div'); title.className='cr2Title'; title.textContent=chest.name; title.style.color=c.glow;
    ov.appendChild(title);
    var count=document.createElement('div'); count.className='cr2Count'; ov.appendChild(count);

    var stage=document.createElement('div'); stage.className='cr2Stage';
    var aura=document.createElement('div'); aura.className='cr2Aura';
    var beams=document.createElement('div'); beams.className='cr2Beams';
    var chestEl=document.createElement('div'); chestEl.className='cr2Chest';
    chestEl.innerHTML = (typeof chestArtSVG==='function') ? chestArtSVG(chest.id) : '';
    stage.appendChild(aura); stage.appendChild(beams); stage.appendChild(chestEl);
    ov.appendChild(stage);

    var hint=document.createElement('div'); hint.className='cr2Hint'; hint.textContent='TAP TO OPEN'; ov.appendChild(hint);
    var rain=document.createElement('div'); rain.className='cr2Rain'; ov.appendChild(rain);
    var tray=document.createElement('div'); tray.className='cr2Tray'; ov.appendChild(tray);
    var done=document.createElement('div'); done.className='cr2Done'; done.textContent='TAP TO CONTINUE'; ov.appendChild(done);

    document.body.appendChild(ov);
    document.body.classList.add('nbModalOpen');
    requestAnimationFrame(function(){ ov.classList.add('show'); });

    var idx=0, state='idle', popEl=null, bigEl=null;
    function updCount(){ count.textContent = state==='revealing' ? (Math.min(idx+1,rewards.length)+' / '+rewards.length) : ''; }

    function openChest(){
      if(state!=='idle') return; state='opening';
      hint.style.display='none';
      try{ sfx.skill&&sfx.skill(); }catch(e){}
      ov.classList.add('opening','shaking');
      setTimeout(function(){
        ov.classList.remove('shaking'); ov.classList.add('burst');
        try{ sfx.buy&&sfx.buy(); }catch(e){}
        setTimeout(function(){
          stage.style.display='none'; state='revealing'; revealNext();
        }, 460);
      }, 650);
    }

    function clearPop(){ if(popEl){ popEl.remove(); popEl=null; } if(bigEl){ bigEl.remove(); bigEl=null; } }

    function revealNext(){
      if(idx>=rewards.length){ finish(); return; }
      clearPop();
      var r=rewards[idx], tier=rewardTier(r), col=rewardColor(r);
      updCount();

      var pop=document.createElement('div'); pop.className='cr2Pop';
      pop.style.setProperty('--pc', col.c); pop.style.setProperty('--pg', col.g);
      var burst=document.createElement('div'); burst.className='cr2PopBurst'; pop.appendChild(burst);

      var card=document.createElement('div'); card.className='cr2Card';
      var ico=document.createElement('div'); ico.className='cr2Ico'+(r.kind==='hero'?' hero':''); ico.innerHTML=rewardIco(r); card.appendChild(ico);

      var rar=document.createElement('div'); rar.className='cr2Rar';
      var nm=document.createElement('div'); nm.className='cr2Name';
      var sub=document.createElement('div'); sub.className='cr2Sub';

      if(r.kind==='gold'){ rar.textContent='CREDITS'; nm.textContent='+'+fmtN(r.amt); sub.textContent='gold'; }
      else if(r.kind==='crystal'){ rar.textContent='CRYSTALS'; nm.textContent='+'+r.amt+' \u25c6'; sub.textContent='plasma crystals'; }
      else if(r.kind==='loot'){
        var lr; try{ lr=lootRarity(r.it); }catch(e){ lr={name:'Item'}; }
        rar.textContent=(lr.name||'').toUpperCase();
        try{ nm.textContent=lootName(r.it); }catch(e){ nm.textContent='Equipment'; }
        try{ sub.textContent=lootStatLabel(r.it); }catch(e){ sub.textContent=''; }
      } else if(r.kind==='hero'){
        var a=ALLIES[r.idx], rc=(window.NB_RAR&&window.NB_RAR[a.rarity])||{name:a.rarity||''};
        rar.textContent=(rc.name||'').toUpperCase()+' HERO';
        nm.textContent=a.name;
        sub.textContent = r.dup ? ('Duplicate \u2192 +'+r.cv+' \u25c6') : (a.title||'New hero!');
      } else if(r.kind==='pet'){
        var pr=(window.NB_PETS&&window.NB_PETS.rarColor)?window.NB_PETS.rarColor(r.rarity):{name:r.rarity||''};
        rar.textContent=(pr.name||'').toUpperCase()+' EGG';
        nm.textContent='Companion Egg';
        sub.textContent='Incubate it in the Pets tab';
      }
      card.appendChild(rar); card.appendChild(nm); card.appendChild(sub);
      pop.appendChild(card); ov.appendChild(pop); popEl=pop;

      // FX — Clash Royale tarzı: her açılışta yükselen ritim + nadir item özel sesi
      try{
        sfx.chestStep && sfx.chestStep(idx);
        if(r.kind==='hero' && !r.dup){ sfx.chestRare && sfx.chestRare(4); sfx.zone&&sfx.zone(); }
        else if(r.kind==='pet' && tier>=3){ sfx.chestRare && sfx.chestRare(3); }
        else if(tier>=4){ sfx.chestRare && sfx.chestRare(4); }
        else if(tier>=3){ sfx.chestRare && sfx.chestRare(3); }
      }catch(e){}
      if(tier>=2){ ov.classList.remove('shake'); void ov.offsetWidth; ov.classList.add('shake'); }
      if(tier>=3){
        var big=document.createElement('div'); big.className='cr2Big'; big.style.setProperty('--pc',col.c);
        big.textContent = (r.kind==='hero') ? (((window.NB_RAR&&window.NB_RAR[ALLIES[r.idx].rarity]||{}).name||'').toUpperCase()+'!') :
          (r.kind==='pet') ? (((window.NB_PETS&&window.NB_PETS.rarColor(r.rarity)||{}).name||'').toUpperCase()+' EGG!') :
          ((function(){ try{ return lootRarity(r.it).name.toUpperCase()+'!'; }catch(e){ return 'EPIC!'; } })());
        ov.appendChild(big); bigEl=big;
        if(!document.body.classList.contains('nb-lowfx')) spawnRain(rain, col.c, tier>=4?26:18);
      }

      // tepsiye küçük kopya
      var slot=document.createElement('div'); slot.className='cr2Slot'; slot.style.setProperty('--pc',col.c); slot.innerHTML=rewardIco(r);
      tray.appendChild(slot);

      idx++;
      // otomatik ilerleme güvencesi
      ov._auto = setTimeout(function(){ advance(); }, r.kind==='hero'&&!r.dup ? 2600 : (tier>=3?2200:1500));
    }

    function advance(){
      if(ov._auto){ clearTimeout(ov._auto); ov._auto=null; }
      if(state!=='revealing') return;
      if(idx>=rewards.length){ finish(); } else { revealNext(); }
    }
    function finish(){
      clearPop(); state='end'; updCount();
      done.classList.add('on');
    }
    function close(){
      if(ov._auto) clearTimeout(ov._auto);
      document.body.classList.remove('nbModalOpen');
      ov.classList.remove('show'); setTimeout(function(){ ov.remove(); }, 280);
      try{ fullRefresh(); }catch(e){}
      try{ doAutosave(); }catch(e){}
    }

    ov.addEventListener('click', function(){
      if(state==='idle') openChest();
      else if(state==='revealing') advance();
      else if(state==='end') close();
    });
    // dokunulmazsa kilitlenmesin
    setTimeout(function(){ if(state==='idle') openChest(); }, 3200);
  };

})();
