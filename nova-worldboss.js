/* =============================================================================
   NOVA BLADE · WORLD BOSS — 5 iblis dünya bossu, kalıcı orb, savaş arenası,
   zamanlamalı kesim penceresi, ganimet (sandık + kredi + uzay kredisi).
   Oyunun mevcut globalleri ile entegre: tapDamage/autoHitDmg/attackSpeed/
   critChance/critMult/totalDps/addCredits/addChest/toast/fmt/sfx/heroSVG.
   ============================================================================= */
(function(){
  function ready(){
    if(typeof S==='undefined' || typeof addCredits!=='function' || typeof heroSVG!=='function'){ return setTimeout(ready,200); }
    init();
  }

  /* =================== İBLİS BOSS ÇİZİMİ =================== */
  // viewBox 0 0 200 220 · sola (kahramana) bakan tıknaz iblis
  function demon(p, o){
    const body=o.body, bodyD=o.bodyD, bodyL=o.bodyL, belly=o.belly||bodyD,
          horn=o.horn||'#e8e0d0', hornD=o.hornD||'#9a8f78', eye=o.eye||'#fff36a', glow=o.glow||'#ff5a3a';
    const defs='<defs>'
      +'<radialGradient id="'+p+'bd" cx=".42" cy=".34" r=".8"><stop offset="0" stop-color="'+bodyL+'"/><stop offset=".6" stop-color="'+body+'"/><stop offset="1" stop-color="'+bodyD+'"/></radialGradient>'
      +'<radialGradient id="'+p+'bl" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="'+belly+'"/><stop offset="1" stop-color="'+bodyD+'"/></radialGradient>'
      +'<linearGradient id="'+p+'hn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+horn+'"/><stop offset="1" stop-color="'+hornD+'"/></linearGradient>'
      +'<radialGradient id="'+p+'ey" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="'+eye+'"/><stop offset="1" stop-color="'+glow+'"/></radialGradient>'
      +'<filter id="'+p+'gl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      +'</defs>';

    let s=defs;
    // aura
    s+='<ellipse cx="100" cy="206" rx="62" ry="11" fill="#000" opacity=".5"/>';
    s+='<ellipse cx="100" cy="120" rx="84" ry="92" fill="'+glow+'" opacity=".07"><animate attributeName="opacity" values=".05;.12;.05" dur="2.6s" repeatCount="indefinite"/></ellipse>';

    // kuyruk
    if(o.tail) s+='<path d="M150 168 Q188 158 184 112 Q183 96 172 92 Q180 104 174 124 Q168 146 142 150 Z" fill="url(#'+p+'bd)" stroke="'+bodyD+'" stroke-width="1.5"/>'
      +'<path d="M184 112 L196 96 L188 114 L198 110 Z" fill="'+glow+'" opacity=".9" filter="url(#'+p+'gl)"/>';

    // ekstra: kanatlar (arkada)
    if(o.wings){
      const wing=(dir)=>'<path d="M100 96 Q'+(100+dir*72)+' 50 '+(100+dir*108)+' 70 Q'+(100+dir*86)+' 78 '+(100+dir*98)+' 98 Q'+(100+dir*72)+' 92 '+(100+dir*88)+' 116 Q'+(100+dir*60)+' 104 100 110 Z" fill="'+bodyD+'" stroke="#000" stroke-width="1.4" opacity=".94"/>'
        +'<path d="M'+(100+dir*40)+' 92 Q'+(100+dir*78)+' 74 '+(100+dir*104)+' 72 M'+(100+dir*46)+' 102 Q'+(100+dir*74)+' 92 '+(100+dir*94)+' 96" stroke="'+glow+'" stroke-width="1.5" fill="none" opacity=".5"/>';
      s+='<g>'+wing(-1)+wing(1)+'</g>';
    }

    // bacaklar (tıknaz, pençeli)
    const leg=(x)=>'<path d="M'+x+' 150 Q'+(x-14)+' 174 '+(x-10)+' 196 L'+(x+18)+' 196 Q'+(x+22)+' 172 '+(x+14)+' 150 Z" fill="url(#'+p+'bd)" stroke="'+bodyD+'" stroke-width="1.6"/>'
      +'<path d="M'+(x-12)+' 194 l-5 8 M'+(x+2)+' 196 l0 9 M'+(x+16)+' 194 l5 8" stroke="'+hornD+'" stroke-width="4" stroke-linecap="round"/>';
    s+=leg(74)+leg(118);

    // gövde + karın
    s+='<path d="M58 96 Q54 156 78 172 Q100 182 122 172 Q146 156 142 96 Q140 64 100 60 Q60 64 58 96 Z" fill="url(#'+p+'bd)" stroke="'+bodyD+'" stroke-width="2"/>';
    s+='<ellipse cx="100" cy="138" rx="32" ry="36" fill="url(#'+p+'bl)"/>';
    s+='<path d="M82 116 Q100 124 118 116 M80 134 Q100 144 120 134 M84 152 Q100 160 116 152" stroke="'+bodyD+'" stroke-width="1.6" fill="none" opacity=".5"/>';
    // göğüs enerji çatlağı
    s+='<path d="M100 96 L94 116 L104 120 L96 140" stroke="'+glow+'" stroke-width="2.2" fill="none" opacity=".8" filter="url(#'+p+'gl)"><animate attributeName="opacity" values=".8;.35;.8" dur="1.8s" repeatCount="indefinite"/></path>';

    // omuzlar + kollar + pençeler
    const arm=(dir)=>{ const sx=100+dir*40, ex=100+dir*64, ey=150;
      return '<ellipse cx="'+sx+'" cy="92" rx="22" ry="20" fill="url(#'+p+'bd)" stroke="'+bodyD+'" stroke-width="1.8"/>'
        +(o.spikes?'<path d="M'+sx+' 74 l'+(dir*4)+' -14 l'+(dir*8)+' 16 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1"/>':'')
        +'<path d="M'+sx+' 100 Q'+(sx+dir*26)+' 120 '+ex+' '+ey+' Q'+(ex+dir*10)+' '+(ey+8)+' '+(ex-dir*4)+' '+(ey+12)+' Q'+(sx+dir*14)+' 128 '+(sx-dir*4)+' 106 Z" fill="url(#'+p+'bd)" stroke="'+bodyD+'" stroke-width="1.8"/>'
        +'<path d="M'+(ex-dir*6)+' '+(ey+8)+' l'+(dir*3)+' 14 M'+(ex+dir*2)+' '+(ey+10)+' l'+(dir*7)+' 13 M'+(ex+dir*10)+' '+(ey+8)+' l'+(dir*10)+' 10" stroke="'+horn+'" stroke-width="3.4" stroke-linecap="round"/>'; };
    s+=arm(-1)+arm(1);

    // BAŞ
    s+='<path d="M64 64 Q60 22 100 18 Q140 22 136 64 Q134 86 100 88 Q66 86 64 64 Z" fill="url(#'+p+'bd)" stroke="'+bodyD+'" stroke-width="2"/>';
    // alın çıkıntısı / kaş
    s+='<path d="M70 52 Q100 38 130 52 Q124 60 100 58 Q76 60 70 52 Z" fill="'+bodyD+'" opacity=".55"/>';

    // boynuzlar
    function horns(){
      if(o.hornStyle==='crown'){
        let h='';
        for(let k=-2;k<=2;k++){ const x=100+k*15, hh=(k===0?34:Math.abs(k)===1?26:18), lean=k*5;
          h+='<path d="M'+(x-5)+' 30 Q'+(x+lean)+' '+(30-hh*0.5)+' '+(x+lean)+' '+(30-hh)+' Q'+(x+lean+3)+' '+(30-hh*0.4)+' '+(x+5)+' 30 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1.2"/>'; }
        return h;
      }
      if(o.hornStyle==='straight') return '<path d="M76 34 L66 -18 L84 30 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1.4"/>'
        +'<path d="M124 34 L134 -18 L116 30 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1.4"/>'
        +'<path d="M70 30 l-3 -26 M130 30 l3 -26" stroke="'+glow+'" stroke-width="1.4" opacity=".5"/>';
      if(o.hornStyle==='broken') return '<path d="M74 32 Q60 6 70 -8 Q66 8 80 28 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1.4"/>'
        +'<path d="M126 32 Q140 16 132 6 L128 14 L130 28 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1.4"/>'
        +'<path d="M70 -8 l-6 -6 M70 -8 l7 -3" stroke="'+glow+'" stroke-width="1.6" opacity=".7" filter="url(#'+p+'gl)"/>';
      // curved (default)
      return '<path d="M74 36 Q52 24 50 -6 Q44 6 50 30 Q56 44 78 46 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1.6"/>'
        +'<path d="M126 36 Q148 24 150 -6 Q156 6 150 30 Q144 44 122 46 Z" fill="url(#'+p+'hn)" stroke="'+hornD+'" stroke-width="1.6"/>'
        +'<path d="M58 0 Q54 16 60 30 M142 0 Q146 16 140 30" stroke="#fff" stroke-width="1" fill="none" opacity=".3"/>';
    }
    s+=horns();

    // gözler (parlayan)
    function eyes(){
      const e=(x,y,r)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+(r+2)+'" ry="'+(r+1)+'" fill="'+glow+'" opacity=".5" filter="url(#'+p+'gl)"/>'
        +'<path d="M'+(x-r-2)+' '+(y+1)+' Q'+x+' '+(y-r-2)+' '+(x+r+2)+' '+(y+1)+' Q'+x+' '+(y+r)+' '+(x-r-2)+' '+(y+1)+' Z" fill="url(#'+p+'ey)"/>'
        +'<circle cx="'+x+'" cy="'+y+'" r="'+(r*0.34)+'" fill="#1a0500"><animate attributeName="r" values="'+(r*0.34)+';'+(r*0.2)+';'+(r*0.34)+'" dur="3s" repeatCount="indefinite"/></circle>';
      if(o.eyes===4) return e(80,60,5)+e(120,60,5)+e(88,70,3.6)+e(112,70,3.6);
      if(o.eyes===3) return e(78,62,5.6)+e(122,62,5.6)+e(100,46,6.4);
      return e(82,62,7)+e(118,62,7);
    }
    s+=eyes();
    // üçüncü göz (alın)
    if(o.thirdEye) s+='<circle cx="100" cy="40" r="6" fill="url(#'+p+'ey)" filter="url(#'+p+'gl)"><animate attributeName="r" values="6;4.4;6" dur="2s" repeatCount="indefinite"/></circle>';

    // ağız + dişler
    s+='<path d="M74 76 Q100 92 126 76 Q120 84 100 86 Q80 84 74 76 Z" fill="#1a0406" stroke="'+bodyD+'" stroke-width="1.2"/>';
    const fang=(x,d)=>'<path d="M'+x+' 77 l'+(2.2)+' '+d+' l'+(2.2)+' -'+d+' Z" fill="#fff"/>';
    s+='<g>'+fang(80,9)+fang(92,12)+fang(104,12)+fang(116,9)+'</g>';
    s+='<path d="M82 84 l2 6 l2 -6 M114 84 l2 6 l2 -6" fill="#fff" opacity=".9"/>';

    // burun delikleri
    s+='<path d="M94 70 q-3 2 -1 4 M106 70 q3 2 1 4" stroke="'+bodyD+'" stroke-width="1.4" fill="none" opacity=".6"/>';

    return s;
  }

  /* =================== BOSS TANIMLARI =================== */
  // diff = HP çarpanı (oyuncu DPS'ine göre); time = kesim penceresi (sn)
  // 3 GEZEGEN × 3 BOSS = 9 dünya bossu. world: gezegen indeksi (0..2). Güç gezegen ilerledikçe artar.
  const BOSSES = [
    /* ===== GEZEGEN 0 · PYROS (lav) ===== */
    { id:'grull', name:'GRULL · Ember Maw', tier:'BRUTE', world:0, unlock:1,  diff:3.0, time:36,
      goldMult:60, sp:14, chestW:{common:70,rare:30}, chests:1, dropChance:.9, crystals:0,
      art:{body:'#9c3320',bodyD:'#4a140c',bodyL:'#d05a36',belly:'#c47a4a',horn:'#f0e6cf',hornD:'#9a8a66',eye:'#ffd24a',glow:'#ff6a2a',hornStyle:'curved',eyes:2,tail:true} },
    { id:'cind', name:'CINDROK · Magma Brute', tier:'RAVAGER', world:0, unlock:12, diff:3.7, time:35,
      goldMult:95, sp:20, chestW:{common:45,rare:45,epic:10}, chests:1, dropChance:.91, crystals:0,
      art:{body:'#a23a18',bodyD:'#3e120a',bodyL:'#e06a2e',belly:'#c86a3a',horn:'#f0d6a0',hornD:'#9a7a3a',eye:'#ffd24a',glow:'#ff6a2a',hornStyle:'broken',eyes:2,spikes:true,tail:true} },
    { id:'pyrax', name:'PYRAXIS · Forge Tyrant', tier:'WARLORD', world:0, unlock:28, diff:4.4, time:34,
      goldMult:150, sp:30, chestW:{common:30,rare:52,epic:18}, chests:1, dropChance:.93, crystals:1,
      art:{body:'#7a2410',bodyD:'#2c0c06',bodyL:'#ff7a3a',belly:'#ff9a4a',horn:'#ffe6a0',hornD:'#b8862a',eye:'#fff36a',glow:'#ff5b2d',hornStyle:'crown',eyes:3,spikes:true,tail:true} },
    /* ===== GEZEGEN 1 · CRYON (buz/kristal) ===== */
    { id:'vorth', name:'VORTH · Hexfang', tier:'COLOSSUS', world:1, unlock:45, diff:5.2, time:33,
      goldMult:220, sp:42, chestW:{rare:55,epic:38,legendary:7}, chests:1, dropChance:.95, crystals:1,
      art:{body:'#6a2b8a',bodyD:'#2a0c3a',bodyL:'#9b4fc0',belly:'#8a5aa8',horn:'#e6d8f0',hornD:'#7a5a92',eye:'#7fffd0',glow:'#c46bff',hornStyle:'straight',eyes:4,spikes:true,tail:true} },
    { id:'glac', name:'GLACIVOR · Rime Warden', tier:'TITAN', world:1, unlock:70, diff:6.0, time:32,
      goldMult:300, sp:56, chestW:{rare:45,epic:46,legendary:9}, chests:1, dropChance:.96, crystals:2,
      art:{body:'#3a6a90',bodyD:'#13283c',bodyL:'#7fc0e0',belly:'#5a90b0',horn:'#dff4ff',hornD:'#6a90a8',eye:'#bfeaff',glow:'#7fd8ff',hornStyle:'straight',eyes:2,spikes:true,tail:true} },
    { id:'kaarn', name:'KAARN · Sunderer', tier:'BEHEMOTH', world:1, unlock:95, diff:6.8, time:31,
      goldMult:400, sp:72, chestW:{rare:35,epic:52,legendary:13}, chests:2, dropChance:.97, crystals:2,
      art:{body:'#3a4250',bodyD:'#12161e',bodyL:'#5a6678',belly:'#4a5260',horn:'#cfd6e2',hornD:'#6a7280',eye:'#ff5a3a',glow:'#ff3b4d',hornStyle:'broken',eyes:3,spikes:true} },
    /* ===== GEZEGEN 2 · NOXARETH (boşluk/kıyamet) ===== */
    { id:'mawk', name:'MAWKROTH · Voidborn', tier:'NIGHTMARE', world:2, unlock:130, diff:7.6, time:31,
      goldMult:540, sp:92, chestW:{epic:58,legendary:42}, chests:2, dropChance:.98, crystals:3,
      art:{body:'#1f1438',bodyD:'#080418',bodyL:'#3a2a66',belly:'#2a1c4a',horn:'#b8a0ff',hornD:'#5a4a8a',eye:'#9b6bff',glow:'#7a3bff',hornStyle:'curved',eyes:3,thirdEye:true,wings:true,tail:true} },
    { id:'noxar', name:'NOXAR · Dread Sovereign', tier:'OVERLORD', world:2, unlock:170, diff:8.8, time:30,
      goldMult:720, sp:120, chestW:{epic:46,legendary:54}, chests:2, dropChance:.99, crystals:3,
      art:{body:'#2a1850',bodyD:'#0c0620',bodyL:'#5a3aa0',belly:'#3a2470',horn:'#cbb0ff',hornD:'#5a4a8a',eye:'#b88bff',glow:'#8a4bff',hornStyle:'crown',eyes:4,thirdEye:true,wings:true,tail:true} },
    { id:'abad', name:'ABADDON · World Ender', tier:'APOCALYPSE', world:2, unlock:215, diff:10.0, time:30,
      goldMult:940, sp:150, chestW:{epic:34,legendary:66}, chests:3, dropChance:1, crystals:4,
      art:{body:'#b8341c',bodyD:'#3a0a06',bodyL:'#ff7a3a',belly:'#ff9a4a',horn:'#ffe6a0',hornD:'#b8862a',eye:'#fff36a',glow:'#ff3b1a',hornStyle:'crown',eyes:4,thirdEye:true,wings:true,spikes:true,tail:true} }
  ];

  let WB = null;          // aktif savaş durumu
  const COOLDOWN_MS = 75000;

  // kahraman savurma — gerçek heroSwing(big) ile birebir: yön değiştirir, nbSwBig ekler
  let wbSwingDir = 1;
  function wbHeroSwing(){
    const w = document.getElementById('wbHero'); if(!w) return;
    // Blaster sınıfı: arena'da da ışın cıvatası atsın (kılıç savurma yerine)
    if(S.cls==='blaster' && typeof window.NB_blasterFireAt==='function'){
      window.NB_blasterFireAt(w, function(){
        const boss=document.getElementById('wbBoss'), sc=document.getElementById('scene');
        if(!boss||!sc) return null;
        const br=boss.getBoundingClientRect(), sr=sc.getBoundingClientRect();
        return { x: br.left - sr.left + br.width*0.5, y: br.top - sr.top + br.height*0.42 };
      }, true);
      return;
    }
    wbSwingDir = -wbSwingDir;
    const dir = wbSwingDir > 0 ? 'nbSwR' : 'nbSwL';
    w.classList.remove('nbSwR','nbSwL','nbSwBig'); void w.offsetWidth;
    w.classList.add('nbSwBig'); w.classList.add(dir);
  }

  function num(fn, d){ try{ const v=fn(); return isFinite(v)&&v>0? v : d; }catch(e){ return d; } }
  function effDps(){ return num(()=>totalDps(), num(()=>autoHitDmg()*attackSpeed(), 10)); }
  function maxWave(){ return Math.max(S.wave||1, S.stats&&S.stats.maxWave||1, S.stats&&S.stats.maxWaveRun||1); }
  function wbState(){ if(!S.wb||typeof S.wb!=='object') S.wb={kills:0, perBoss:{}, cd:{}}; if(!S.wb.perBoss)S.wb.perBoss={}; if(!S.wb.cd)S.wb.cd={}; return S.wb; }
  function unlocked(b){ return maxWave() >= b.unlock; }
  function cooldownLeft(b){ const w=wbState(); const t=(w.cd[b.id]||0)-Date.now(); return t>0? t : 0; }
  function availableCount(){ return BOSSES.filter(b=>unlocked(b) && cooldownLeft(b)<=0).length; }

  /* =================== ORB =================== */
  function buildOrb(){
    if(document.getElementById('wbOrb')) return;
    const scene=document.getElementById('scene'); if(!scene) return;
    const orb=document.createElement('div');
    orb.id='wbOrb'; orb.title='World Boss';
    orb.innerHTML='<div class="wbOrbRing"></div>'
      +'<svg viewBox="0 0 200 200">'+demon('orb_', BOSSES[0].art).replace(/<ellipse cx="100" cy="206"[^>]*>/,'')+'</svg>'
      +'<span class="wbOrbCount">0</span><span class="wbOrbLbl">WORLD BOSS</span>';
    orb.addEventListener('click', openRoster);
    var dock=document.getElementById('combatDock');
    if(dock){ var anchor=document.getElementById('dockRow'); if(anchor) dock.insertBefore(orb, anchor); else dock.appendChild(orb); }
    else scene.appendChild(orb);
    refreshOrb();
    setInterval(refreshOrb, 4000);
  }
  function refreshOrb(){
    const orb=document.getElementById('wbOrb'); if(!orb) return;
    const c=availableCount();
    const badge=orb.querySelector('.wbOrbCount');
    badge.textContent=c;
    const lbl=orb.querySelector('.wbOrbLbl');
    if(lbl) lbl.innerHTML = c>0 ? 'WORLD BOSS <span style="color:#ffd24a">×'+c+' READY</span>' : 'WORLD BOSS';
    orb.style.animationPlayState = c>0?'running':'paused';
    orb.style.filter = c>0?'none':'grayscale(.5) brightness(.7)';
    orb.style.opacity = c>0?'1':'.82';
  }

  /* =================== ROSTER (boss seçim ekranı) =================== */
  function openRoster(){
    closeRoster();
    const ov=document.createElement('div'); ov.id='wbRoster';
    let rows='';
    BOSSES.forEach((b,i)=>{
      const un=unlocked(b), cd=cooldownLeft(b), ready=un&&cd<=0;
      const hp=fmt(effDps()*b.time*b.diff);
      const kills=(wbState().perBoss[b.id]||0);
      let right;
      if(!un) right='<div class="wbLock">🔒 Wave '+b.unlock+'</div>';
      else if(cd>0) right='<div class="wbLock">⏳ '+Math.ceil(cd/1000)+'s</div>';
      else right='<button class="wbBtn" data-i="'+i+'">FIGHT</button>';
      const chestList=Object.keys(b.chestW).join(' / ');
      rows+='<div class="wbBossRow '+(ready?'ready':'locked')+'" data-i="'+i+'">'
        +'<div class="wbPort"><svg viewBox="0 0 200 200">'+demon('rp'+i+'_', b.art)+'</svg></div>'
        +'<div class="wbBossInfo">'
          +'<div class="wbN">'+b.name+' <span class="wbTier">'+b.tier+'</span></div>'
          +'<div class="wbSub">HP <span class="wbHpMini">'+hp+'</span> · kill window <b style="color:#ffd9de">'+b.time+'s</b>'+(kills?' · slain ×'+kills:'')+'</div>'
          +'<div class="wbRwd"><span>💰 +'+b.goldMult+'×</span><span style="color:#7fffd0">✦ +'+b.sp+'</span><span style="color:#ffd24a">📦 '+chestList+'</span>'+(b.crystals?'<span style="color:#c89bff">◆ +'+b.crystals+'</span>':'')+'</div>'
        +'</div>'
        +'<div class="wbGo">'+right+'</div>'
      +'</div>';
    });
    ov.innerHTML='<div class="wbCard">'
      +'<div class="wbHead"><button class="wbX">×</button><h2>⚔ WORLD BOSSES</h2>'
        +'<p>Galaksiyi kasıp kavuran iblisler. Devasa canları var — yalnızca <b style="color:#ff8a96">zamanında ve yüksek hasarla</b> kesebilirsin. Her tıklama büyük vuruş ekler. Kesersen sandık, kredi ve uzay kredisi düşer.</p></div>'
      +'<div class="wbList">'+rows+'</div></div>';
    document.body.appendChild(ov);
    requestAnimationFrame(()=>ov.classList.add('show'));
    ov.querySelector('.wbX').onclick=closeRoster;
    ov.addEventListener('click',e=>{ if(e.target===ov) closeRoster(); });
    ov.querySelectorAll('.wbBossRow.ready').forEach(row=>{
      row.addEventListener('click',()=>{ const i=+row.dataset.i; closeRoster(); enterWB(i); });
    });
  }
  function closeRoster(){ const ov=document.getElementById('wbRoster'); if(ov){ ov.classList.remove('show'); setTimeout(()=>ov.remove(),240); } }

  /* =================== ARENA =================== */
  function buildArena(){
    if(document.getElementById('wbScene')) return;
    const scene=document.getElementById('scene'); if(!scene) return;
    const wb=document.createElement('div'); wb.id='wbScene'; wb.setAttribute('data-screen-label','World Boss Arena');
    wb.innerHTML=
      '<div class="wbFloor"></div><div class="wbGrid"></div>'
      +'<button class="wbFlee">‹ Flee</button>'
      +'<div class="wbTop"><div class="wbBossName"><span class="wbTierTag"></span><span class="wbNm">—</span></div>'
        +'<div class="wbHpWrap"><div class="wbHpFill"></div><div class="wbHpTxt"></div></div></div>'
      +'<div class="wbTimer"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0,0,0,.5)" stroke-width="8"/>'
        +'<circle class="wbTimerArc" cx="50" cy="50" r="44" fill="none" stroke="#ff3b4d" stroke-width="8" stroke-linecap="round" stroke-dasharray="276.5" stroke-dashoffset="0"/></svg>'
        +'<div class="wbTimerTxt"><span class="wbTimerNum">0</span><small>SEC</small></div></div>'
      +'<div id="wbHero"></div><div id="wbBoss"></div>'
      +'<div class="wbHint"></div><div class="wbTapHint">TAP TO STRIKE — BURST IT DOWN</div>';
    scene.appendChild(wb);
    wb.querySelector('.wbFlee').addEventListener('click',(e)=>{ e.stopPropagation(); fleeWB(); });
  }

  function enterWB(i){
    buildArena();
    const b=BOSSES[i];
    const hp=Math.max(effDps()*b.time*b.diff, num(()=>tapDamage(),10)*150);
    WB={ i, b, hpMax:hp, hp, time:b.time, t:b.time, dead:false, enraged:false, lastTap:0 };
    document.body.classList.add('worldBoss');
    const wb=document.getElementById('wbScene');
    wb.querySelector('.wbTierTag').textContent=b.tier;
    wb.querySelector('.wbNm').textContent=b.name;
    const boss=document.getElementById('wbBoss');
    boss.className=''; boss.innerHTML='<svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMax meet">'+demon('arena_', b.art)+'</svg>';
    document.getElementById('wbHero').innerHTML=heroSVG();
    if(S.cls==='blaster' && typeof window.NB_applyPoseTo==='function'){ try{ window.NB_applyPoseTo(document.getElementById('wbHero')); }catch(e){} }
    wb.querySelector('.wbHint').innerHTML='Sustained DPS won\'t be enough — <b>tap fast</b> to break it before the timer ends!';
    updateWBHud();
    seedEmbers();
    try{ sfx.boss(); }catch(e){}
    try{ sfx.zone(); }catch(e){}
  }

  function seedEmbers(){
    const wb=document.getElementById('wbScene'); if(!wb) return;
    wb.querySelectorAll('.wbEmber').forEach(e=>e.remove());
    for(let k=0;k<14;k++){
      const e=document.createElement('div'); e.className='wbEmber';
      e.style.left=(Math.random()*100)+'%'; e.style.bottom='0';
      const dur=(3+Math.random()*3).toFixed(1), delay=(Math.random()*4).toFixed(1);
      e.style.animation='wbEmberRise '+dur+'s linear '+delay+'s infinite';
      wb.appendChild(e);
    }
    if(!document.getElementById('wbEmberKf')){
      const st=document.createElement('style'); st.id='wbEmberKf';
      st.textContent='@keyframes wbEmberRise{0%{opacity:0;transform:translateY(0)}15%{opacity:.9}100%{opacity:0;transform:translateY(-220px)}}';
      document.head.appendChild(st);
    }
  }

  function updateWBHud(){
    if(!WB) return;
    const wb=document.getElementById('wbScene'); if(!wb) return;
    const pct=Math.max(0, WB.hp/WB.hpMax*100);
    wb.querySelector('.wbHpFill').style.width=pct+'%';
    wb.querySelector('.wbHpTxt').textContent=fmt(Math.max(0,WB.hp))+' / '+fmt(WB.hpMax);
    const arc=wb.querySelector('.wbTimerArc'), C=276.5;
    arc.style.strokeDashoffset=(C*(1-WB.t/WB.time)).toFixed(1);
    wb.querySelector('.wbTimerNum').textContent=Math.ceil(WB.t);
    const tm=wb.querySelector('.wbTimer');
    if(WB.t<=8){ tm.classList.add('warn'); arc.setAttribute('stroke','#ff8a3a'); }
    else { tm.classList.remove('warn'); arc.setAttribute('stroke','#ff3b4d'); }
    // enrage in son %25 hp
    const boss=document.getElementById('wbBoss');
    if(pct<=25 && !WB.enraged){ WB.enraged=true; boss.classList.add('enrage'); }
  }

  /* arena tick — ana döngü buraya yönlenir */
  function wbTick(dt){
    // hafif autosave / topbar canlı
    try{ if(typeof updateTopbar==='function') updateTopbar(); }catch(e){}
    if(!WB || WB.dead) return;
    // pasif (auto) DPS — tek başına yetmez (diff>1), tıklama şart
    const auto=num(()=>autoHitDmg()*attackSpeed(),0);
    if(auto>0){ WB.hp-=auto*dt; }
    WB.t-=dt;
    updateWBHud();
    if(WB.hp<=0){ winWB(); return; }
    if(WB.t<=0){ loseWB(); return; }
  }

  /* tıklama vuruşu */
  function wbTap(ev){
    if(!WB || WB.dead) return;
    let dmg=num(()=>tapDamage(),10);
    const crit=Math.random()*100 < num(()=>critChance(),5);
    if(crit) dmg*=num(()=>critMult(),2);
    // sync strike bonus (oyundaki gibi) varsa ekle
    try{ if(typeof syncPct==='function') dmg+=autoHitDmg()*syncPct(); }catch(e){}
    WB.hp-=dmg;

    // kahraman savurma — gerçek savaş sahnesiyle birebir aynı (heroSwing(big) mantığı)
    wbHeroSwing();
    try{ sfx.tap(); if(crit) sfx.crit(); }catch(e){}

    // efektler
    const wb=document.getElementById('wbScene'), boss=document.getElementById('wbBoss');
    const br=boss.getBoundingClientRect(), sr=wb.getBoundingClientRect();
    const hx=br.left-sr.left+br.width*(0.42+Math.random()*0.2);
    const hy=br.top-sr.top+br.height*(0.34+Math.random()*0.24);
    spawnSlash(wb,hx,hy);
    spawnRing(wb,hx,hy,crit);
    spawnDmg(wb,hx,hy,dmg,crit);
    boss.classList.remove('hit'); void boss.offsetWidth; boss.classList.add('hit');
    if(crit){ wb.classList.remove('shake'); void wb.offsetWidth; wb.classList.add('shake'); }

    updateWBHud();
    if(WB.hp<=0) winWB();
  }

  function spawnSlash(wb,x,y){
    const d=document.createElement('div'); d.className='wbSlash'; d.style.left=x+'px'; d.style.top=y+'px';
    const ang=(-40+Math.random()*80).toFixed(0), col=Math.random()<.5?'#fff':'#8fe9ff';
    d.innerHTML='<svg width="120" height="120" viewBox="-60 -60 120 120" style="transform:rotate('+ang+'deg)"><path d="M-44 -20 Q0 -52 44 -16" stroke="'+col+'" stroke-width="6" fill="none" stroke-linecap="round" filter="drop-shadow(0 0 5px '+col+')"/></svg>';
    wb.appendChild(d); setTimeout(()=>d.remove(),300);
  }
  function spawnRing(wb,x,y,crit){
    const r=document.createElement('div'); r.className='wbRing'; r.style.left=x+'px'; r.style.top=y+'px';
    const sz=crit?64:40; r.style.width=sz+'px'; r.style.height=sz+'px';
    r.style.borderColor=crit?'#ffd24a':'#fff';
    wb.appendChild(r); setTimeout(()=>r.remove(),440);
  }
  function spawnDmg(wb,x,y,dmg,crit){
    const d=document.createElement('div'); d.className='wbDmg'+(crit?' crit':'');
    d.style.left=(x+(Math.random()*30-15))+'px'; d.style.top=y+'px';
    d.textContent=(crit?'✦ ':'')+fmt(dmg);
    wb.appendChild(d); setTimeout(()=>d.remove(),740);
  }

  /* =================== SONUÇ =================== */
  function winWB(){
    if(!WB||WB.dead) return; WB.dead=true; WB.hp=0; updateWBHud();
    const b=WB.b, boss=document.getElementById('wbBoss');
    boss.classList.remove('enrage','hit'); boss.classList.add('dying');
    const wb=document.getElementById('wbScene'); wb.classList.add('shake');
    try{ sfx.boss(); }catch(e){}
    // ödülleri hesapla
    const wave=num(()=>currentWave(),1);
    const gold=Math.max(500, Math.round(num(()=>creditReward(wave),100)*b.goldMult));
    const sp=b.sp;
    const drops=[];
    // sandık(lar)
    if(Math.random()<b.dropChance){
      for(let k=0;k<b.chests;k++){ const tier=rollChest(b.chestW); if(typeof addChest==='function'){ addChest(tier,1); } drops.push({k:'chest',tier}); }
    }
    // altın
    if(typeof addCredits==='function') addCredits(gold,true);
    drops.push({k:'gold',n:gold});
    // uzay kredisi
    S.space=S.space||{credits:0}; if(typeof S.space.credits!=='number') S.space.credits=0;
    S.space.credits+=sp; drops.push({k:'sp',n:sp});
    // kristal
    if(b.crystals>0 && Math.random()<.6){ S.crystals=(S.crystals||0)+b.crystals; S.crystalsEarned=(S.crystalsEarned||0)+b.crystals; drops.push({k:'cry',n:b.crystals}); }
    // pet yumurtası (üst tier boss = daha iyi nadirlik)
    if(Math.random()<.42){
      S.pets=S.pets||{}; if(!Array.isArray(S.pets.eggs)) S.pets.eggs=[];
      let eggR;
      if(b.id==='abad'||b.id==='mawk') eggR=Math.random()<.45?'epic':'rare';
      else if(b.id==='kaarn') eggR=Math.random()<.5?'rare':'regular';
      else if(b.id==='vorth') eggR=Math.random()<.5?'regular':'rare';
      else eggR=Math.random()<.55?'common':'regular';
      if(Math.random()<.05) eggR='legendary';
      S.pets.eggs.push({rarity:eggR}); drops.push({k:'egg',r:eggR});
    }
    // durum
    const w=wbState(); w.kills=(w.kills||0)+1; w.perBoss[b.id]=(w.perBoss[b.id]||0)+1; w.cd[b.id]=Date.now()+COOLDOWN_MS;
    if(S.stats){ S.stats.wbKills=(S.stats.wbKills||0)+1; }
    try{ if(typeof checkAch==='function') checkAch(); }catch(e){}
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
    setTimeout(()=>showResult(true,b,drops),700);
  }
  function loseWB(){
    if(!WB||WB.dead) return; WB.dead=true;
    const boss=document.getElementById('wbBoss'); boss.classList.remove('enrage');
    try{ sfx.fail(); }catch(e){}
    setTimeout(()=>showResult(false,WB.b,null),300);
  }
  function fleeWB(){ if(WB) WB.dead=true; exitWB(); }

  function rollChest(w){
    const keys=Object.keys(w); let tot=0; keys.forEach(k=>tot+=w[k]);
    let r=Math.random()*tot;
    for(const k of keys){ r-=w[k]; if(r<=0) return k; }
    return keys[keys.length-1];
  }

  const CHEST_META={common:{ic:'📦',c:'#aeb8c6',n:'Common Cache'},rare:{ic:'🎁',c:'#4db8ff',n:'Holokron'},epic:{ic:'💜',c:'#b86bff',n:'Epic Vault'},legendary:{ic:'🏆',c:'#ffb24a',n:'Kyber Chest'}};

  function showResult(win, b, drops){
    const ov=document.createElement('div'); ov.id='wbResult'; ov.className=win?'win':'lose';
    let inner='';
    if(win){
      inner+='<h2>BOSS SLAIN</h2><div class="wbResSub">'+b.name+' has fallen. Spoils claimed:</div><div class="wbRewards">';
      drops.forEach(d=>{
        if(d.k==='chest'){ const m=CHEST_META[d.tier]; inner+='<div class="wbRewItem"><div class="ic" style="background:'+m.c+'22;color:'+m.c+'">'+m.ic+'</div><div class="tx"><b>'+m.n+'</b><span>Loot chest — open it in the Loot tab</span></div></div>'; }
        else if(d.k==='gold'){ inner+='<div class="wbRewItem"><div class="ic" style="background:#ffd24a22;color:#ffd24a">💰</div><div class="tx"><b>+'+fmt(d.n)+' Gold</b><span>Credited to your bank</span></div></div>'; }
        else if(d.k==='sp'){ inner+='<div class="wbRewItem"><div class="ic" style="background:#35e0d222;color:#35e0d2">✦</div><div class="tx"><b>+'+d.n+' Space Credits</b><span>Spend in the Hangar</span></div></div>'; }
        else if(d.k==='cry'){ inner+='<div class="wbRewItem"><div class="ic" style="background:#a86bff22;color:#c89bff">◆</div><div class="tx"><b>+'+d.n+' Plasma Crystals</b><span>Permanent power</span></div></div>'; }
        else if(d.k==='egg'){ const cm={common:'#aeb8c6',regular:'#54e08a',rare:'#4db8ff',epic:'#b86bff',legendary:'#ffb547'},cc=cm[d.r]||'#aeb8c6'; inner+='<div class="wbRewItem"><div class="ic" style="background:'+cc+'22;color:'+cc+'">🥚</div><div class="tx"><b>'+d.r.charAt(0).toUpperCase()+d.r.slice(1)+' Pet Egg</b><span>Hatch it in the Pets tab</span></div></div>'; }
      });
      inner+='</div><button class="wbResBtn">CLAIM &amp; RETURN</button>';
    } else {
      inner+='<h2>IT ESCAPED</h2><div class="wbResSub">'+b.name+' survived the kill window. Build more burst damage and try again — no reward this time.</div>'
        +'<button class="wbResBtn">RETURN</button>';
    }
    ov.innerHTML='<div class="wbResCard">'+inner+'</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(()=>ov.classList.add('show'));
    ov.querySelector('.wbResBtn').onclick=()=>{ ov.classList.remove('show'); setTimeout(()=>ov.remove(),260); exitWB(); };
    if(win){ try{ toast('World Boss slain!', b.name+' dropped loot ✦','gold'); }catch(e){} }
  }

  function exitWB(){
    WB=null;
    document.body.classList.remove('worldBoss');
    const wb=document.getElementById('wbScene'); if(wb) wb.classList.remove('shake');
    try{ if(typeof updateTopbar==='function') updateTopbar(); }catch(e){}
    refreshOrb();
  }

  /* =================== ENTEGRASYON =================== */
  function init(){
    buildOrb();
    buildArena();

    // ana döngüyü arena moduna yönlendir
    if(typeof window.tick==='function' && !window.__wbTickWrapped){
      const orig=window.tick;
      window.tick=function(dt){
        if(document.body.classList.contains('worldBoss')){ wbTick(dt); return; }
        return orig.apply(this, arguments);
      };
      window.__wbTickWrapped=true;
    }

    // arena tıklamalarını yakala (oyunun onTap'ından önce, capture)
    document.addEventListener('pointerdown', function(e){
      if(!document.body.classList.contains('worldBoss')) return;
      if(e.target.closest('.wbFlee, #wbResult, #wbRoster, .wbTimer, .wbTop')) return;
      if(!e.target.closest('#wbScene')) return;
      e.stopImmediatePropagation(); e.preventDefault();
      wbTap(e);
    }, true);

    // dışarı açılan kancalar
    window.openWorldBoss=openRoster;
    window.NB_WB={ open:openRoster, enter:enterWB, bosses:BOSSES, art:demon };
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
