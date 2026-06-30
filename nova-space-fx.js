/* =============================================================================
   NOVA BLADE · SPACE FX — uzay sekansı yeniden tasarımı
   • Detaylı + büyük oyuncu yıldız avcısı (X-wing / starfighter ruhu)
   • Tehditkâr düşman avcısı + boss dretnotu (TIE / imperial)
   • Güçlü ateş efektleri: namlu parlaması, kalın çift ışın, isabet patlaması,
     ekran sarsıntısı, motor jet alevi.
   Var olan space motorunu (shipSVG / spaceEnemySVG / spaceLaser) override eder;
   tüm çağrılar runtime'da window.* üzerinden çözüldüğü için güvenli.
   ============================================================================= */
(function(){
  'use strict';

  /* ---------- enjekte CSS (gemi boyu + efektler) ---------- */
  var css = `
  /* daha büyük, daha okunur gemiler */
  #playerShip{ width:clamp(186px,50vw,272px) !important; left:5% !important; bottom:28% !important;
    filter:drop-shadow(0 10px 20px rgba(0,0,0,.62)) drop-shadow(0 0 18px var(--shipGlow,rgba(120,200,255,.4))); }
  #spaceEnemyWrap{ width:clamp(150px,46vw,224px) !important; right:5% !important; top:18% !important; }
  #spaceEnemyWrap.boss{ width:clamp(200px,62vw,300px) !important; top:11% !important; }
  #spaceEnemySvg{ filter:drop-shadow(0 6px 12px rgba(0,0,0,.6)); }

  /* atmosferik derinlik — gezegen üst atmosferinde uçuş hissi */
  #spaceScene::before{ content:''; position:absolute; inset:0; z-index:1; pointer-events:none;
    background:
      radial-gradient(120% 70% at 50% 118%, var(--atmoGlow,rgba(90,170,255,.32)) 0%, transparent 56%),
      linear-gradient(180deg, rgba(2,4,12,.55) 0%, transparent 26%, transparent 66%, rgba(2,4,12,.4) 100%);
    mix-blend-mode:screen; }
  #spaceScene::after{ content:''; position:absolute; inset:0; z-index:2; pointer-events:none;
    box-shadow:inset 0 0 120px 30px rgba(0,0,0,.55); }
  #spaceBg, #spaceEnemyWrap, #playerShip, #fxLayer{ z-index:3; }
  #spaceHud, #spaceHudTag{ z-index:6; }

  /* oyuncu ateş geri tepmesi — kısa geri kayma + burun parlaması */
  @keyframes shipFireK2{ 0%{transform:translateX(0)} 22%{transform:translateX(-13px)} 60%{transform:translateX(4px)} 100%{transform:translateX(0)} }
  #playerShip.fire{ animation:shipFireK2 .22s cubic-bezier(.3,.9,.4,1), shipHover 3.2s ease-in-out infinite !important; }

  /* düşman isabet — sars + beyaz flash (squash) */
  @keyframes spHitK{ 0%{transform:translate(0,0) scale(1,1); filter:brightness(1)}
    16%{transform:translate(10px,-3px) scale(1.07,.9); filter:brightness(2.6) drop-shadow(0 0 10px #fff)}
    44%{transform:translate(-3px,1px) scale(.97,1.03); filter:brightness(1.2)}
    100%{transform:translate(0,0) scale(1,1); filter:brightness(1)} }
  #spaceEnemySvg.hitFx{ animation:spHitK .2s cubic-bezier(.25,.9,.3,1) !important; }

  /* ekran sarsıntısı (kritik / boss vuruşu) */
  @keyframes spShake{ 0%,100%{transform:translate(0,0)} 20%{transform:translate(-4px,2px)} 40%{transform:translate(4px,-2px)} 60%{transform:translate(-3px,-2px)} 80%{transform:translate(3px,2px)} }
  #spaceScene.shake{ animation:spShake .26s ease-out; }

  /* namlu parlaması */
  .spMuzzle{ position:absolute; z-index:8; pointer-events:none; width:30px; height:30px; margin:-15px 0 0 -15px;
    border-radius:50%; background:radial-gradient(circle,#fff 0%,var(--mz,#9fe0ff) 40%,transparent 72%);
    animation:spMuzzleK .18s ease-out forwards; }
  @keyframes spMuzzleK{ 0%{transform:scale(.3);opacity:1} 100%{transform:scale(1.5);opacity:0} }

  /* kalın çift ışın bolt */
  .spBolt{ position:absolute; z-index:7; pointer-events:none; height:5px; border-radius:3px; transform-origin:0 50%;
    background:linear-gradient(90deg, transparent, var(--bc,#ff5b5b) 30%, #fff 78%, #fff);
    box-shadow:0 0 10px var(--bc,#ff5b5b), 0 0 4px #fff; animation:spBoltK .16s linear forwards; }
  @keyframes spBoltK{ 0%{opacity:.5} 25%{opacity:1} 100%{opacity:0} }

  /* isabet patlaması (düşman üstünde) */
  .spImpact{ position:absolute; z-index:9; pointer-events:none; width:38px; height:38px; margin:-19px 0 0 -19px;
    border-radius:50%; background:radial-gradient(circle,#fff 0%,var(--ic,#ffd9a8) 38%,transparent 70%);
    animation:spImpactK .3s ease-out forwards; }
  @keyframes spImpactK{ 0%{transform:scale(.3);opacity:1} 55%{transform:scale(1.1);opacity:1} 100%{transform:scale(1.8);opacity:0} }
  .spImpact i{ position:absolute; inset:0; border-radius:50%; }
  .spImpact i::before,.spImpact i::after{ content:''; position:absolute; left:50%; top:50%; width:3px; height:26px; margin:-13px 0 0 -1.5px;
    background:linear-gradient(transparent,#fff,transparent); animation:spImpactK .3s ease-out forwards; }
  .spImpact i::after{ transform:rotate(90deg); }
  @media (prefers-reduced-motion:reduce){ #playerShip.fire,#spaceEnemySvg.hitFx,#spaceScene.shake{ animation:none !important; } }

  /* ===== BÜYÜK GEMİ ATEŞİ — kalın enerji ışınları + namlu şarjı + plazma mermisi ===== */
  /* kalın sürekli enerji ışını (her kanat topundan biri) */
  .spBeam{ position:absolute; z-index:7; pointer-events:none; height:9px; border-radius:5px; transform-origin:0 50%;
    background:linear-gradient(90deg, var(--cc,#fff) 0%, var(--bc,#ff7a3a) 14%, var(--bc,#ff7a3a) 68%, var(--cc,#fff) 100%);
    box-shadow:0 0 18px 3px var(--bc,#ff7a3a), 0 0 7px 1px var(--cc,#fff);
    animation:spBeamK .3s cubic-bezier(.2,.8,.3,1) forwards; }
  @keyframes spBeamK{ 0%{opacity:0; filter:brightness(2.4); transform:rotate(var(--a,0)) scaleY(1.6)} 14%{opacity:1} 55%{opacity:.92} 100%{opacity:0; transform:rotate(var(--a,0)) scaleY(.5)} }

  /* hareketli plazma mermisi (gemi → düşman) */
  .spBoltP{ position:absolute; z-index:8; pointer-events:none; width:30px; height:11px; border-radius:6px;
    background:radial-gradient(ellipse 62% 100% at 28% 50%, #fff 0%, var(--cc,#fff) 34%, var(--bc,#ff7a3a) 72%, transparent 100%);
    box-shadow:0 0 16px 5px var(--bc,#ff7a3a);
    animation:spBoltPK .2s linear forwards; }
  @keyframes spBoltPK{ 0%{ transform:translate(0,0) rotate(var(--ang,0)); opacity:1 }
    100%{ transform:translate(var(--tx,0),var(--ty,0)) rotate(var(--ang,0)); opacity:.9 } }

  /* namlu şarj parlaması */
  .spCharge{ position:absolute; z-index:9; pointer-events:none; width:36px; height:36px; margin:-18px 0 0 -18px;
    border-radius:50%; background:radial-gradient(circle, #fff 0%, var(--bc,#ff7a3a) 46%, transparent 72%);
    animation:spChargeK .22s ease-out forwards; }
  @keyframes spChargeK{ 0%{transform:scale(.2);opacity:1} 100%{transform:scale(1.8);opacity:0} }

  /* isabet şok halkası */
  .spRing{ position:absolute; z-index:8; pointer-events:none; width:22px; height:22px; margin:-11px 0 0 -11px;
    border-radius:50%; border:3px solid var(--bc,#ff7a3a); opacity:.9;
    animation:spRingK .42s ease-out forwards; }
  @keyframes spRingK{ 0%{transform:scale(.3);opacity:.95} 100%{transform:scale(3.6);opacity:0} }
  @media (prefers-reduced-motion:reduce){ .spBeam,.spBoltP,.spCharge,.spRing{ animation-duration:.12s !important; } }
  `;
  var st=document.createElement('style'); st.id='novaSpaceFxCss'; st.textContent=css; document.head.appendChild(st);

  /* ============================ OYUNCU YILDIZ AVCISI ============================ */
  window.shipSVG = function(idx, small){
    var SH=(window.SHIPS&&SHIPS[idx])?SHIPS[idx]:{c:['#cdd6e6','#ff5b5b','#7fd6ff']};
    var c=SH.c, hull=c[0], trim=c[1]||'#ff5b5b', glow=c[2]||'#7fd6ff', u='psh'+idx+'_';
    // facing RIGHT: engines left (x small), nose right (x large)
    function wing(y, up){ var dir=up?-1:1, ty=y+dir*30; // wingtip
      return '<g>'
        +'<path d="M52 '+y+' L30 '+ty+' L40 '+(ty+dir*5)+' L60 '+(y+dir*4)+' Z" fill="url(#'+u+'wg)" stroke="#0b1018" stroke-width="1.4"/>'
        +'<path d="M52 '+y+' L34 '+(ty+dir*1)+'" stroke="'+trim+'" stroke-width="2.4" opacity=".9"/>'
        // wingtip cannon (long barrel pointing forward/right)
        +'<rect x="34" y="'+(ty-2.4)+'" width="86" height="4.8" rx="2.4" fill="url(#'+u+'cn)" stroke="#0b1018" stroke-width=".8"/>'
        +'<rect x="112" y="'+(ty-2.4)+'" width="9" height="4.8" rx="2.2" fill="#1a2230"/>'
        +'<circle cx="121" cy="'+ty+'" r="2.2" fill="'+trim+'"><animate attributeName="opacity" values="1;.35;1" dur="1.1s" repeatCount="indefinite"/></circle>'
        +'<rect x="40" y="'+(ty-2.4)+'" width="5" height="4.8" fill="#0b1018" opacity=".5"/></g>';
    }
    return '<svg viewBox="0 0 168 108" style="overflow:visible">'
      +'<defs>'
      +'<linearGradient id="'+u+'bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f8ff"/><stop offset=".42" stop-color="'+hull+'"/><stop offset="1" stop-color="#5a6376"/></linearGradient>'
      +'<linearGradient id="'+u+'wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+hull+'"/><stop offset="1" stop-color="#444c5c"/></linearGradient>'
      +'<linearGradient id="'+u+'cn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa4b6"/><stop offset=".5" stop-color="#e6ecf6"/><stop offset="1" stop-color="#3a4150"/></linearGradient>'
      +'<radialGradient id="'+u+'dome" cx="40%" cy="32%" r="70%"><stop offset="0" stop-color="#dff4ff"/><stop offset=".5" stop-color="'+glow+'"/><stop offset="1" stop-color="#0c2233"/></radialGradient>'
      +'<radialGradient id="'+u+'jet" cx="80%" cy="50%" r="60%"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="'+glow+'"/><stop offset="1" stop-color="'+glow+'" stop-opacity="0"/></radialGradient>'
      +'</defs>'
      +'<ellipse cx="86" cy="98" rx="46" ry="5" fill="#000" opacity=".22"/>'
      // back wings (darker, depth)
      +'<g opacity=".82">'
        +'<path d="M54 50 L34 24 L44 26 L62 48 Z" fill="#3a4150" stroke="#0b1018" stroke-width="1"/>'
        +'<path d="M54 58 L34 84 L44 82 L62 60 Z" fill="#3a4150" stroke="#0b1018" stroke-width="1"/></g>'
      // front wings + cannons (upper & lower)
      +wing(48,true)+wing(60,false)
      // engine block (left)
      +'<rect x="14" y="40" width="34" height="28" rx="7" fill="url(#'+u+'bd)" stroke="#0b1018" stroke-width="1.6"/>'
      +'<rect x="16" y="44" width="6" height="20" rx="3" fill="#0b1018"/>'
      // engine jets
      +'<g><ellipse cx="10" cy="48" rx="12" ry="4" fill="url(#'+u+'jet)"><animate attributeName="rx" values="12;19;12" dur=".4s" repeatCount="indefinite"/></ellipse>'
      +'<ellipse cx="10" cy="60" rx="12" ry="4" fill="url(#'+u+'jet)"><animate attributeName="rx" values="12;19;12" dur=".4s" begin=".2s" repeatCount="indefinite"/></ellipse></g>'
      // fuselage (engine → nose)
      +'<path d="M44 42 L120 40 Q150 44 162 54 Q150 64 120 68 L44 66 Q40 54 44 42 Z" fill="url(#'+u+'bd)" stroke="#0b1018" stroke-width="1.8"/>'
      +'<path d="M48 45 L120 43 Q146 47 156 54" stroke="#fff" stroke-width="1.2" fill="none" opacity=".4"/>'
      +'<path d="M46 64 L120 66 Q146 62 156 55" stroke="#000" stroke-width="1.4" fill="none" opacity=".22"/>'
      // hull stripes (faction color)
      +'<path d="M70 41 L78 41 L74 67 L66 67 Z" fill="'+trim+'" opacity=".85"/>'
      +'<path d="M92 40.5 L98 40.6 L95 67.4 L89 67.3 Z" fill="'+trim+'" opacity=".7"/>'
      // cockpit canopy
      +'<path d="M104 38 Q118 34 130 42 L126 54 L106 54 Q102 46 104 38 Z" fill="url(#'+u+'dome)" stroke="#0b1018" stroke-width="1.4"/>'
      +'<path d="M108 41 Q117 38 124 43" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6"/>'
      // nose tip + sensor
      +'<path d="M156 50 Q166 54 156 58 Z" fill="'+trim+'"/>'
      +'<circle cx="150" cy="54" r="2.4" fill="'+glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.4s" repeatCount="indefinite"/></circle>'
      // astromech bump
      +'<circle cx="98" cy="36" r="5" fill="#cfd8e6" stroke="#0b1018" stroke-width="1.2"/><circle cx="98" cy="35" r="2" fill="'+glow+'"/>'
      +'</svg>';
  };

  /* ============================ DÜŞMAN AVCISI / BOSS ============================ */
  window.spaceEnemySVG = function(def, boss){
    var c=(def&&def.c)||['#6a3f8a','#ff4d6a','#ff7a9a'];
    var hull=c[0], trim=c[1]||'#ff4d6a', glow=c[1]||'#ff4d6a', u='esh'+(Math.random()*1e5|0)+'_';
    // facing LEFT (player is left): pod center, hex solar wings
    function panel(s){ // s=-1 top, 1 bottom
      var cy=40+s*0, top=8, bot=72;
      return '<g>'
        +'<line x1="60" y1="40" x2="'+(s<0?60:60)+'" y2="40" stroke="#222" stroke-width="0"/>'
        // strut
        +'<rect x="44" y="'+(s<0?28:46)+'" width="20" height="6" rx="2" fill="#2a2230" stroke="#0a0710" stroke-width="1"/>'
        // hex panel
        +'<path d="M40 '+(s<0?6:44)+' L52 '+(s<0?2:40)+' L52 '+(s<0?40:78)+' L40 '+(s<0?44:82)+' L28 '+(s<0?40:78)+' L28 '+(s<0?2:40)+' Z" fill="url(#'+u+'pn)" stroke="'+trim+'" stroke-width="1.8"/>'
        +'<path d="M40 '+(s<0?6:44)+' L40 '+(s<0?44:82)+' M28 '+(s<0?21:59)+' L52 '+(s<0?21:59)+'" stroke="#0a0710" stroke-width="1.2" opacity=".7"/>'
        +'</g>';
    }
    var R=boss?1.25:1;
    return '<svg viewBox="0 0 130 96" style="overflow:visible">'
      +'<defs>'
      +'<radialGradient id="'+u+'pod" cx="60%" cy="38%" r="62%"><stop offset="0" stop-color="#5a6072"/><stop offset=".5" stop-color="'+hull+'"/><stop offset="1" stop-color="#0a0710"/></radialGradient>'
      +'<linearGradient id="'+u+'pn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#161320"/><stop offset=".5" stop-color="'+hull+'"/><stop offset="1" stop-color="#0c0a14"/></linearGradient>'
      +'<radialGradient id="'+u+'eye" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="'+trim+'"/><stop offset="1" stop-color="'+trim+'" stop-opacity="0"/></radialGradient>'
      +'</defs>'
      +'<ellipse cx="65" cy="90" rx="'+(34*R).toFixed(0)+'" ry="5" fill="#000" opacity=".22"/>'
      +'<g transform="translate(65 48) scale('+R.toFixed(2)+') translate(-65 -48)">'
      +panel(-1)+panel(1)
      // central pod
      +'<circle cx="74" cy="48" r="22" fill="url(#'+u+'pod)" stroke="'+trim+'" stroke-width="2"/>'
      +'<circle cx="74" cy="48" r="22" fill="none" stroke="#0a0710" stroke-width="1" opacity=".6"/>'
      // armor ridges
      +'<path d="M58 38 Q74 32 90 38 M56 48 L92 48 M58 58 Q74 64 90 58" stroke="#0a0710" stroke-width="1.4" fill="none" opacity=".55"/>'
      // menacing eye (faces left)
      +'<circle cx="62" cy="48" r="'+(boss?9:7)+'" fill="#0a0410" stroke="'+trim+'" stroke-width="1.8"/>'
      +'<circle cx="62" cy="48" r="'+(boss?12:9)+'" fill="url(#'+u+'eye)" opacity=".7"/>'
      +'<circle cx="62" cy="48" r="'+(boss?4:3)+'" fill="'+trim+'"><animate attributeName="r" values="'+(boss?4:3)+';'+(boss?2.4:1.8)+';'+(boss?4:3)+'" dur="1.3s" repeatCount="indefinite"/></circle>'
      // forward cannons (point left toward player)
      +'<rect x="40" y="42" width="18" height="3.4" rx="1.6" fill="#cfd6e2" stroke="#0a0710" stroke-width=".7"/>'
      +'<rect x="40" y="51" width="18" height="3.4" rx="1.6" fill="#cfd6e2" stroke="#0a0710" stroke-width=".7"/>'
      +'<circle cx="40" cy="43.7" r="1.6" fill="'+trim+'"/><circle cx="40" cy="52.7" r="1.6" fill="'+trim+'"/>'
      +(boss?'<path d="M74 26 L70 16 L78 16 Z M74 70 L70 80 L78 80 Z" fill="'+trim+'" opacity=".9"/>':'')
      +'</g></svg>';
  };

  /* ============================ ATEŞ + İSABET EFEKTLERİ ============================ */
  function fxLayer(){ return document.getElementById('fxLayer')||document.getElementById('scene'); }
  function rectIn(el){ var sc=document.getElementById('scene'); if(!el||!sc) return null;
    var r=el.getBoundingClientRect(), s=sc.getBoundingClientRect();
    return {l:r.left-s.left, t:r.top-s.top, w:r.width, h:r.height, cx:r.left-s.left+r.width/2, cy:r.top-s.top+r.height/2}; }

  window.spaceLaser = function(green){
    var ship=rectIn(document.getElementById('playerShip')),
        en=rectIn(document.getElementById('spaceEnemyWrap')),
        layer=fxLayer();
    if(!ship||!en||!layer) return;
    // tap = sıcak turuncu plazma · pasif/oto = yeşil iyon
    var col  = green ? '#6cf0a4' : '#ff7a3a';
    var core = green ? '#e2fff0' : '#fff1d8';
    // iki kanat topu: gemi burnundan, merkeze göre üst+alt ofset
    var muzX = ship.l + ship.w*0.82;
    var tx = en.cx - en.w*0.10, ty = en.cy;
    [-ship.h*0.17, ship.h*0.17].forEach(function(off){
      var y1 = ship.cy + off;
      var dx = tx - muzX, dy = ty - y1;
      var ang = Math.atan2(dy,dx)*180/Math.PI, len = Math.hypot(dx,dy);
      // kalın enerji ışını
      var beam=document.createElement('div'); beam.className='spBeam';
      beam.style.setProperty('--bc', col); beam.style.setProperty('--cc', core); beam.style.setProperty('--a', ang+'deg');
      beam.style.left=muzX+'px'; beam.style.top=y1+'px'; beam.style.width=len+'px';
      beam.style.transform='rotate('+ang+'deg)';
      layer.appendChild(beam); setTimeout(function(){ beam.remove(); }, 300);
      // hareketli plazma mermisi
      var bolt=document.createElement('div'); bolt.className='spBoltP';
      bolt.style.setProperty('--bc', col); bolt.style.setProperty('--cc', core);
      bolt.style.setProperty('--ang', ang+'deg');
      bolt.style.setProperty('--tx', dx.toFixed(1)+'px'); bolt.style.setProperty('--ty', dy.toFixed(1)+'px');
      bolt.style.left=muzX+'px'; bolt.style.top=(y1-5.5)+'px';
      layer.appendChild(bolt); setTimeout(function(){ bolt.remove(); }, 210);
      // namlu şarj parlaması
      var ch=document.createElement('div'); ch.className='spCharge'; ch.style.setProperty('--bc', col);
      ch.style.left=muzX+'px'; ch.style.top=y1+'px';
      layer.appendChild(ch); setTimeout(function(){ ch.remove(); }, 220);
    });
    // isabet patlaması (mermi varışına denk) — patlama + şok halkası
    setTimeout(function(){
      var imp=document.createElement('div'); imp.className='spImpact'; imp.style.setProperty('--ic', core);
      imp.style.left=tx+'px'; imp.style.top=ty+'px'; imp.innerHTML='<i></i>';
      layer.appendChild(imp); setTimeout(function(){ imp.remove(); }, 360);
      var ring=document.createElement('div'); ring.className='spRing'; ring.style.setProperty('--bc', col);
      ring.style.left=tx+'px'; ring.style.top=ty+'px';
      layer.appendChild(ring); setTimeout(function(){ ring.remove(); }, 420);
    }, 140);
  };

  // kritik / boss vuruşunda ekran sarsıntısı — damageSpaceEnemy'i sarmala
  if(typeof window.damageSpaceEnemy==='function'){
    var _dmg=window.damageSpaceEnemy;
    window.damageSpaceEnemy=function(amount,crit,fromTap){
      _dmg.apply(this,arguments);
      var isBoss=false; try{ isBoss = (typeof spaceEnemy!=='undefined' && spaceEnemy && spaceEnemy.isBoss); }catch(_){}
      if(fromTap && (crit || isBoss)){
        var sc=document.getElementById('spaceScene');
        if(sc){ sc.classList.remove('shake'); void sc.offsetWidth; sc.classList.add('shake');
          clearTimeout(sc._shk); sc._shk=setTimeout(function(){ sc.classList.remove('shake'); }, 280); }
      }
    };
  }

  // hâlihazırda uzaydaysak gemiyi yeni tasarımla tazele
  try{
    if(document.body.classList.contains('spaceMode')){
      var ps=document.getElementById('playerShip');
      if(ps && typeof SP==='function') ps.innerHTML=shipSVG(SP().activeShip>=0?SP().activeShip:0);
      if(typeof spaceEnemy!=='undefined' && spaceEnemy && typeof spawnSpaceEnemy==='function'){
        var w=document.getElementById('spaceEnemySvgWrap');
        if(w) w.innerHTML='<div id="spaceEnemySvg">'+spaceEnemySVG(spaceEnemy.def,spaceEnemy.isBoss)+'</div>';
      }
    }
  }catch(e){}
})();
