/* =============================================================================
   NOVA BLADE · SPACE STATION — SCENE ART  (nova-station-art.js)
   Hand-drawn, animated SVG art for the colony base: planet backdrop, alien
   terrain, and four living factory buildings (idle SMIL animations baked in).
   Pure functions → SVG strings. Exposed as window.NB_STA.
   ============================================================================= */
(function(){
  'use strict';

  function glow(p,std){ return ''; } /* PERF: blur filtreleri kaldirildi (mobilde her-kare rasterize maliyeti) */
  function lg(id,a,b,vert){ return '<linearGradient id="'+id+'" x1="0" y1="0" x2="'+(vert?0:1)+'" y2="'+(vert?1:0)+'">'
    +'<stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient>'; }

  /* ============================ PLANET BACKDROP ============================ */
  // big ringed gas giant + small moon — drawn into a wide SVG layer
  function planet(p){
    p=p||'pl_';
    return '<svg viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">'
    +'<defs>'
      +'<radialGradient id="'+p+'gg" cx=".38" cy=".34" r=".75">'
        +'<stop offset="0" stop-color="#b98bd6"/><stop offset=".4" stop-color="#7a4fb0"/>'
        +'<stop offset=".75" stop-color="#3a2168"/><stop offset="1" stop-color="#1a0e36"/></radialGradient>'
      +'<radialGradient id="'+p+'gl" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-color="#9a6bd6" stop-opacity="0"/><stop offset="1" stop-color="#c79bff" stop-opacity=".5"/></radialGradient>'
      +'<radialGradient id="'+p+'mn" cx=".4" cy=".36" r=".7"><stop offset="0" stop-color="#dfe6f0"/><stop offset=".6" stop-color="#9aa6bd"/><stop offset="1" stop-color="#4a5268"/></radialGradient>'
      +'<linearGradient id="'+p+'rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c79bff" stop-opacity="0"/><stop offset=".5" stop-color="#e6d2ff" stop-opacity=".85"/><stop offset="1" stop-color="#c79bff" stop-opacity="0"/></linearGradient>'
    +'</defs>'
    // gas giant upper-right
    +'<g transform="translate(760 150)">'
      +'<circle r="190" fill="url(#'+p+'gl)" opacity=".7"/>'
      +'<circle r="132" fill="url(#'+p+'gg)"/>'
      // banding
      +'<clipPath id="'+p+'cp"><circle r="132"/></clipPath>'
      +'<g clip-path="url(#'+p+'cp)" opacity=".55">'
        +'<path d="M-140 -54 q140 -26 280 0 v18 q-140 26 -280 0 Z" fill="#5a3590"/>'
        +'<path d="M-140 4 q140 -22 280 0 v26 q-140 22 -280 0 Z" fill="#9a6bc8" opacity=".6"/>'
        +'<path d="M-140 64 q140 24 280 0 v20 q-140 -22 -280 0 Z" fill="#2a1652"/>'
        +'<ellipse cx="38" cy="-18" rx="34" ry="20" fill="#d6b8ff" opacity=".5"/>'
      +'</g>'
      // rings
      +'<g transform="rotate(-24)"><ellipse rx="232" ry="44" fill="none" stroke="url(#'+p+'rg)" stroke-width="13"/>'
        +'<ellipse rx="206" ry="38" fill="none" stroke="url(#'+p+'rg)" stroke-width="5" opacity=".7"/></g>'
    +'</g>'
    // small moon left
    +'<g transform="translate(150 96)"><circle r="34" fill="url(#'+p+'mn)"/>'
      +'<circle cx="-9" cy="-6" r="6" fill="#3a4258" opacity=".5"/><circle cx="11" cy="8" r="9" fill="#3a4258" opacity=".4"/><circle cx="4" cy="-12" r="3.4" fill="#3a4258" opacity=".5"/></g>'
    // distant rose planet (the pink one)
    +'<defs><radialGradient id="'+p+'pk" cx=".36" cy=".32" r=".8"><stop offset="0" stop-color="#ffc6e6"/><stop offset=".45" stop-color="#ff86c2"/><stop offset=".8" stop-color="#b8417e"/><stop offset="1" stop-color="#5e1c40"/></radialGradient></defs>'
    +'<g transform="translate(330 232)"><circle r="78" fill="url(#'+p+'gl)" opacity=".4"/><circle r="50" fill="url(#'+p+'pk)"/>'
      +'<clipPath id="'+p+'pc"><circle r="50"/></clipPath>'
      +'<g clip-path="url(#'+p+'pc)" opacity=".4"><ellipse cx="6" cy="-8" rx="54" ry="9" fill="#ffd0ea"/><ellipse cx="-4" cy="14" rx="54" ry="11" fill="#a83466"/><ellipse cx="16" cy="-22" rx="16" ry="8" fill="#fff" opacity=".5"/></g></g>'
    +'</svg>';
  }

  /* ============================ ATMOSPHERIC HORIZON ============================ */
  // layered distant mountains with aerial perspective + a far colony megastructure
  function ridge(p){ return horizon(p); }
  function horizon(p){
    p=p||'hz_';
    return '<svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" style="width:100%;height:100%">'
    +'<defs>'+lg(p+'f3','#3a2a64','#241640',1)+lg(p+'f2','#2a1d4e','#180e32',1)+lg(p+'f1','#1c1238','#0c0720',1)
      +'<linearGradient id="'+p+'atm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98bd6" stop-opacity=".34"/><stop offset="1" stop-color="#c98bd6" stop-opacity="0"/></linearGradient></defs>'
    // atmospheric glow band on the horizon line
    +'<rect x="0" y="96" width="1000" height="120" fill="url(#'+p+'atm)"/>'
    // farthest ridge + a megastructure tower silhouette
    +'<path d="M0 150 L120 118 L210 138 L300 104 L360 124 L420 92 L500 126 L560 100 L660 140 L760 112 L860 142 L940 116 L1000 138 V300 H0 Z" fill="url(#'+p+'f3)" opacity=".75"/>'
    +'<g opacity=".7"><path d="M408 92 L408 54 L414 50 L420 54 L420 92 Z" fill="#2a1d4e"/><circle cx="414" cy="48" r="3" fill="#ffb14a"><animate attributeName="opacity" values="1;.3;1" dur="2.4s" repeatCount="indefinite"/></circle>'
      +'<path d="M556 100 L556 70 L572 70 L572 100 Z M560 70 L560 58 L568 58 L568 70" fill="#2a1d4e"/></g>'
    // distant lights twinkling along the far ridge
    +'<g fill="#ffd9a0">'+[140,300,360,500,660,860,940].map((x,i)=>'<rect x="'+x+'" y="'+(120+(i%3)*5)+'" width="2" height="3"><animate attributeName="opacity" values="'+(0.4+0.4*(i%2))+';.15;'+(0.4+0.4*(i%2))+'" dur="'+(2+i%4)+'s" repeatCount="indefinite"/></rect>').join('')+'</g>'
    // mid ridge
    +'<path d="M0 188 L130 150 L250 184 L360 142 L470 186 L580 150 L700 190 L820 152 L920 184 L1000 168 V300 H0 Z" fill="url(#'+p+'f2)" opacity=".9"/>'
    // near ridge (frames the base)
    +'<path d="M0 240 L150 200 L300 238 L460 196 L620 240 L780 202 L900 240 L1000 220 V300 H0 Z" fill="url(#'+p+'f1)"/>'
    +'</svg>';
  }

  /* ============================ COLONY PROPS ============================ */
  // central command core — the heart of the base (rotating holo ring + spire)
  function core(p,ac){ p=p||'cr_'; ac=ac||'#5fdcff';
    return '<svg viewBox="0 0 160 200">'
    +'<defs>'+glow(p,2.6)+lg(p+'b','#2a3550','#141d30',1)
      +'<radialGradient id="'+p+'o" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="'+ac+'"/><stop offset="1" stop-color="#0a2740"/></radialGradient></defs>'
    +'<ellipse cx="80" cy="188" rx="66" ry="12" fill="#000" opacity=".45"/>'
    // hex pedestal
    +'<path d="M30 178 L80 196 L130 178 L130 150 L80 134 L30 150 Z" fill="url(#'+p+'b)" stroke="'+ac+'" stroke-width="1.6"/>'
    +'<path d="M30 150 L80 168 L130 150 M80 168 L80 196" fill="none" stroke="'+ac+'" stroke-width="1" opacity=".5"/>'
    // spire
    +'<path d="M72 150 L74 40 L86 40 L88 150 Z" fill="url(#'+p+'b)" stroke="'+ac+'" stroke-width="1.2"/>'
    +'<rect x="68" y="66" width="24" height="5" rx="2" fill="'+ac+'" opacity=".6"/><rect x="68" y="92" width="24" height="5" rx="2" fill="'+ac+'" opacity=".5"/>'
    // holo core orb + rotating rings
    +'<g transform="translate(80 40)"><circle r="12" fill="url(#'+p+'o)" ><animate attributeName="r" values="12;9;12" dur="2s" repeatCount="indefinite"/></circle>'
      +'<ellipse rx="24" ry="9" fill="none" stroke="'+ac+'" stroke-width="1.6" opacity=".8"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite"/></ellipse>'
      +'<ellipse rx="24" ry="9" fill="none" stroke="#fff" stroke-width="1" opacity=".5" transform="rotate(60)"><animateTransform attributeName="transform" type="rotate" from="60" to="420" dur="7s" repeatCount="indefinite"/></ellipse></g>'
    +'<circle cx="80" cy="24" r="3" fill="#fff"><animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/></circle>'
    +'</svg>'; }

  // tilted solar array
  function solar(p,ac){ p=p||'so_'; ac=ac||'#46a8ff';
    return '<svg viewBox="0 0 160 120">'
    +'<ellipse cx="80" cy="112" rx="60" ry="8" fill="#000" opacity=".35"/>'
    +'<rect x="76" y="60" width="8" height="50" fill="#2a3346"/>'
    +'<g transform="translate(80 50) rotate(-18)">'
      +'<rect x="-58" y="-22" width="116" height="44" rx="3" fill="#0e1c30" stroke="'+ac+'" stroke-width="1.4"/>'
      +'<g stroke="'+ac+'" stroke-width=".8" opacity=".5">'+[-29,0,29].map(x=>'<line x1="'+x+'" y1="-22" x2="'+x+'" y2="22"/>').join('')+'<line x1="-58" y1="0" x2="58" y2="0"/></g>'
      +'<rect x="-58" y="-22" width="116" height="10" rx="3" fill="'+ac+'" opacity=".18"><animate attributeName="opacity" values=".1;.3;.1" dur="4s" repeatCount="indefinite"/></rect>'
    +'</g></svg>'; }

  // supply crate stack
  function crates(p,ac){ p=p||'cb_'; ac=ac||'#ffb14a';
    return '<svg viewBox="0 0 140 110">'
    +'<ellipse cx="70" cy="104" rx="56" ry="8" fill="#000" opacity=".35"/>'
    +'<g stroke="#0a0f18" stroke-width="1.4">'
      +'<rect x="16" y="56" width="48" height="44" rx="3" fill="#2c3647"/><rect x="22" y="62" width="36" height="14" rx="2" fill="#1a2230"/>'
      +'<rect x="70" y="60" width="50" height="40" rx="3" fill="#28323f"/><rect x="76" y="66" width="38" height="12" rx="2" fill="#161d29"/>'
      +'<rect x="40" y="22" width="46" height="36" rx="3" fill="#323d4f"/><rect x="46" y="28" width="34" height="11" rx="2" fill="#1c2533"/>'
    +'</g>'
    +'<g fill="'+ac+'"><rect x="24" y="80" width="8" height="3" rx="1"/><rect x="80" y="82" width="8" height="3" rx="1"/><rect x="48" y="44" width="8" height="3" rx="1"><animate attributeName="opacity" values="1;.3;1" dur="2.6s" repeatCount="indefinite"/></rect></g>'
    +'</svg>'; }

  // light pole casting a glow pool
  function lightPole(p,ac){ p=p||'lp_'; ac=ac||'#9fd0ff';
    return '<svg viewBox="0 0 60 150">'+glow(p,2.4)
    +'<ellipse cx="30" cy="144" rx="24" ry="6" fill="#000" opacity=".3"/>'
    +'<rect x="27" y="30" width="6" height="114" rx="2" fill="#2a3346"/>'
    +'<path d="M30 30 L48 22 L48 30 L33 38 Z" fill="#39455c"/>'
    +'<ellipse cx="44" cy="27" rx="6" ry="4" fill="'+ac+'" ><animate attributeName="opacity" values="1;.7;1" dur="3s" repeatCount="indefinite"/></ellipse>'
    +'<path d="M44 28 L66 130 L20 130 Z" fill="'+ac+'" opacity=".10"/>'
    +'</svg>'; }

  /* ============================ BUILDINGS ============================ */
  // all anchored on a 220×220 canvas, ground ≈ y=196

  // ---- Laser Workshop: energy forge with vertical beam emitter ----
  function laser(p,ac){
    p=p||'lz_'; ac=ac||'#4db8ff';
    return '<svg viewBox="0 0 220 220">'
    +'<defs>'+glow(p,2.6)+lg(p+'wall','#2f3a4c','#161d29',1)+lg(p+'roof','#3c4a60','#202836',1)
      +'<radialGradient id="'+p+'core" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="'+ac+'"/><stop offset="1" stop-color="#0a2740"/></radialGradient>'
      +lg(p+'beam',ac,'#ffffff',0)+'</defs>'
    +'<ellipse cx="110" cy="200" rx="86" ry="12" fill="#000" opacity=".4"/>'
    // base block
    +'<path d="M44 196 L44 130 Q44 120 54 120 L166 120 Q176 120 176 130 L176 196 Z" fill="url(#'+p+'wall)" stroke="#0a0f18" stroke-width="2"/>'
    +'<path d="M44 134 L176 134" stroke="'+ac+'" stroke-width="1.4" opacity=".5"/>'
    // window strips (lit)
    +'<g>'+[60,90,120,150].map(x=>'<rect x="'+x+'" y="150" width="14" height="20" rx="2" fill="#0a1622" stroke="'+ac+'" stroke-width="1"/><rect x="'+(x+2)+'" y="152" width="10" height="7" fill="'+ac+'" opacity=".7"><animate attributeName="opacity" values=".7;.3;.7" dur="'+(2+x%3)+'s" repeatCount="indefinite"/></rect>').join('')+'</g>'
    // angled roof + emitter housing
    +'<path d="M58 120 L74 96 L146 96 L162 120 Z" fill="url(#'+p+'roof)" stroke="#0a0f18" stroke-width="1.6"/>'
    +'<rect x="92" y="64" width="36" height="36" rx="5" fill="url(#'+p+'wall)" stroke="'+ac+'" stroke-width="1.6"/>'
    +'<circle cx="110" cy="82" r="11" fill="url(#'+p+'core)" ><animate attributeName="r" values="11;9;11" dur="1.6s" repeatCount="indefinite"/></circle>'
    // vertical laser beam
    +'<g>'
      +'<rect x="106" y="6" width="8" height="62" rx="4" fill="url(#'+p+'beam)" opacity=".9"><animate attributeName="opacity" values=".95;.45;.95" dur="1.1s" repeatCount="indefinite"/></rect>'
      +'<rect x="108.5" y="2" width="3" height="66" fill="#fff"><animate attributeName="opacity" values="1;.5;1" dur=".7s" repeatCount="indefinite"/></rect>'
    +'</g>'
    +'<circle cx="110" cy="10" r="5" fill="#fff" opacity=".9"><animate attributeName="r" values="5;8;5" dur="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.2;.9" dur="1.1s" repeatCount="indefinite"/></circle>'
    // conduits
    +'<path d="M52 196 L52 140 M168 196 L168 140" stroke="'+ac+'" stroke-width="2.2" opacity=".55" />'
    // spark embers
    +'<g fill="'+ac+'">'+[0,1,2].map(i=>'<circle cx="'+(96+i*14)+'" cy="100" r="1.6"><animate attributeName="cy" values="100;70;100" dur="'+(1.4+i*0.4)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="'+(1.4+i*0.4)+'s" repeatCount="indefinite"/></circle>').join('')+'</g>'
    +'</svg>';
  }

  // ---- Armor Workshop: fabrication hangar with welding arm + shield crest ----
  function armor(p,ac){
    p=p||'ar_'; ac=ac||'#54e0a0';
    return '<svg viewBox="0 0 220 220">'
    +'<defs>'+glow(p,2.4)+lg(p+'wall','#2c3a36','#141d1a',1)+lg(p+'door','#0c1714','#06100d',1)
      +'<radialGradient id="'+p+'spk" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="'+ac+'"/><stop offset="1" stop-color="'+ac+'" stop-opacity="0"/></radialGradient></defs>'
    +'<ellipse cx="110" cy="200" rx="92" ry="12" fill="#000" opacity=".4"/>'
    // arched hangar body
    +'<path d="M36 196 L36 116 Q36 70 110 70 Q184 70 184 116 L184 196 Z" fill="url(#'+p+'wall)" stroke="#070d0b" stroke-width="2"/>'
    // roof ribs
    +'<g stroke="'+ac+'" stroke-width="1.3" opacity=".4" fill="none">'+[96,116,136].map(y=>'<path d="M40 '+y+' Q110 '+(y-30)+' 180 '+y+'"/>').join('')+'</g>'
    // bay door (dark) with arm inside
    +'<path d="M70 196 L70 120 Q70 96 110 96 Q150 96 150 120 L150 196 Z" fill="url(#'+p+'door)" stroke="'+ac+'" stroke-width="1.4"/>'
    // robotic welding arm
    +'<g transform="translate(110 196)">'
      +'<rect x="-5" y="-30" width="10" height="30" rx="3" fill="#3a4a44" stroke="#0a1410" stroke-width="1"/>'
      +'<g transform="rotate(-18)"><animateTransform attributeName="transform" type="rotate" values="-22;-6;-22" dur="2.2s" repeatCount="indefinite"/>'
        +'<rect x="-4" y="-72" width="8" height="46" rx="3" fill="#46564f" stroke="#0a1410" stroke-width="1"/>'
        +'<circle cx="0" cy="-72" r="6" fill="#2c3a36" stroke="'+ac+'" stroke-width="1.2"/>'
        +'<rect x="-3" y="-86" width="6" height="16" rx="2" fill="#5a6a62"/>'
        // spark at tip
        +'<circle cx="0" cy="-90" r="6" fill="url(#'+p+'spk)" ><animate attributeName="r" values="2;7;2" dur=".5s" repeatCount="indefinite"/></circle>'
      +'</g>'
      +'<circle cx="0" cy="-30" r="5" fill="#2c3a36" stroke="'+ac+'" stroke-width="1.2"/>'
    +'</g>'
    // shield crest above
    +'<g transform="translate(110 60)" ><path d="M0 -22 L17 -15 V2 Q17 16 0 24 Q-17 16 -17 2 V-15 Z" fill="#13201c" stroke="'+ac+'" stroke-width="2"/>'
      +'<path d="M0 -12 V14 M-9 1 H9" stroke="'+ac+'" stroke-width="2"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></path></g>'
    // floor sparks
    +'<g fill="'+ac+'">'+[0,1,2,3].map(i=>'<circle cx="'+(96+i*8)+'" cy="190" r="1.5"><animate attributeName="cy" values="190;182;190" dur="'+(0.5+i*0.13)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="'+(0.5+i*0.13)+'s" repeatCount="indefinite"/></circle>').join('')+'</g>'
    // side lamps
    +'<circle cx="44" cy="110" r="3" fill="'+ac+'"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></circle>'
    +'<circle cx="176" cy="110" r="3" fill="'+ac+'"><animate attributeName="opacity" values=".3;1;.3" dur="1.4s" repeatCount="indefinite"/></circle>'
    +'</svg>';
  }

  // ---- Radar Room: comms tower with rotating dish + sweep ----
  function radar(p,ac){
    p=p||'rd_'; ac=ac||'#ffb14a';
    return '<svg viewBox="0 0 220 220">'
    +'<defs>'+glow(p,2.2)+lg(p+'tw','#3a3a4c','#1c1c28',1)
      +'<radialGradient id="'+p+'dish" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#5a5a72"/><stop offset="1" stop-color="#20202e"/></radialGradient>'
      +'<radialGradient id="'+p+'sw" cx="1" cy="1" r="1"><stop offset="0" stop-color="'+ac+'" stop-opacity=".7"/><stop offset="1" stop-color="'+ac+'" stop-opacity="0"/></radialGradient></defs>'
    +'<ellipse cx="110" cy="202" rx="70" ry="11" fill="#000" opacity=".4"/>'
    // base hut
    +'<path d="M62 198 L62 156 Q62 148 70 148 L150 148 Q158 148 158 156 L158 198 Z" fill="url(#'+p+'tw)" stroke="#0a0a14" stroke-width="2"/>'
    +'<rect x="74" y="166" width="16" height="22" rx="2" fill="#0a0e1a" stroke="'+ac+'" stroke-width="1"/><rect x="76" y="168" width="12" height="9" fill="'+ac+'" opacity=".6"/>'
    +'<rect x="130" y="166" width="16" height="22" rx="2" fill="#0a0e1a" stroke="'+ac+'" stroke-width="1"/><rect x="132" y="168" width="12" height="9" fill="'+ac+'" opacity=".45"/>'
    // lattice mast
    +'<path d="M98 148 L104 70 L116 70 L122 148" fill="none" stroke="#4a4a5e" stroke-width="3"/>'
    +'<g stroke="#3a3a4c" stroke-width="1.6">'+[140,124,108,92].map((y,i)=>'<path d="M'+(100+i*1.2)+' '+y+' L'+(120-i*1.2)+' '+(y-16)+' M'+(120-i*1.2)+' '+y+' L'+(100+i*1.2)+' '+(y-16)+'"/>').join('')+'</g>'
    // beacon light
    +'<circle cx="110" cy="70" r="4" fill="#ff5a4a" ><animate attributeName="opacity" values="1;.15;1" dur="1.3s" repeatCount="indefinite"/></circle>'
    // rotating dish assembly
    +'<g transform="translate(110 78)">'
      +'<g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite"/>'
        +'<ellipse cx="22" cy="0" rx="11" ry="26" fill="url(#'+p+'dish)" stroke="'+ac+'" stroke-width="1.6" transform="rotate(28 22 0)"/>'
        +'<path d="M22 0 L4 0" stroke="#5a5a72" stroke-width="2.4"/>'
        +'<circle cx="22" cy="0" r="2.4" fill="'+ac+'"/>'
        // sweep cone
        +'<path d="M22 0 L80 -28 A62 62 0 0 1 80 28 Z" fill="url(#'+p+'sw)" opacity=".8"><animate attributeName="opacity" values=".8;.25;.8" dur="1.6s" repeatCount="indefinite"/></path>'
      +'</g>'
      +'<circle cx="0" cy="0" r="6" fill="#2a2a38" stroke="'+ac+'" stroke-width="1.4"/>'
    +'</g>'
    // pulse rings
    +'<g fill="none" stroke="'+ac+'" stroke-width="1.4">'+[0,1].map(i=>'<circle cx="110" cy="78" r="14"><animate attributeName="r" values="10;52;52" dur="3s" begin="'+(i*1.5)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0;0" dur="3s" begin="'+(i*1.5)+'s" repeatCount="indefinite"/></circle>').join('')+'</g>'
    +'</svg>';
  }

  // ---- Ore Mining Factory: derrick + auto pickaxe striking a dark crystal ----
  function mining(p,ac){
    p=p||'mn_'; ac=ac||'#b98bff';
    return '<svg viewBox="0 0 220 220">'
    +'<defs>'+glow(p,2.6)+lg(p+'rig','#34304a','#191528',1)
      +'<radialGradient id="'+p+'cry" cx=".42" cy=".34" r=".75"><stop offset="0" stop-color="#c9a3ff"/><stop offset=".45" stop-color="#6a2fb0"/><stop offset=".8" stop-color="#2a0e52"/><stop offset="1" stop-color="#0a0316"/></radialGradient>'
      +'<radialGradient id="'+p+'spk" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="'+ac+'"/><stop offset="1" stop-color="'+ac+'" stop-opacity="0"/></radialGradient></defs>'
    +'<ellipse cx="110" cy="202" rx="88" ry="12" fill="#000" opacity=".45"/>'
    // rock mound + exposed crystal vein
    +'<path d="M30 200 Q60 168 96 176 Q120 150 150 172 Q186 166 196 200 Z" fill="#14101f" stroke="#0a0712" stroke-width="2"/>'
    +'<g>'
      +'<path d="M104 196 L92 158 L108 132 L118 150 L130 140 L134 168 L126 196 Z" fill="url(#'+p+'cry)" stroke="'+ac+'" stroke-width="1.4"/>'
      +'<path d="M108 132 L112 196 M118 150 L116 196 M104 168 L130 162" stroke="'+ac+'" stroke-width="1" opacity=".55"/>'
      +'<animate attributeName="opacity" values="1;.78;1" dur="2.4s" repeatCount="indefinite"/>'
    +'</g>'
    // derrick frame
    +'<path d="M56 196 L84 96 M164 196 L136 96 M84 96 L136 96" fill="none" stroke="url(#'+p+'rig)" stroke-width="6"/>'
    +'<g stroke="#2a2640" stroke-width="2.4">'+[176,150,124].map((y,i)=>{const t=(y-96)/(196-96);const lx=84+(56-84)*t, rx=136+(164-136)*t, lx2=84+(56-84)*((y-26-96)/(100)), rx2=136+(164-136)*((y-26-96)/(100));return '<path d="M'+lx.toFixed(0)+' '+y+' L'+rx2.toFixed(0)+' '+(y-26)+' M'+rx.toFixed(0)+' '+y+' L'+lx2.toFixed(0)+' '+(y-26)+'"/>';}).join('')+'</g>'
    // motor housing at top
    +'<rect x="92" y="80" width="36" height="20" rx="4" fill="url(#'+p+'rig)" stroke="'+ac+'" stroke-width="1.4"/>'
    +'<circle cx="110" cy="90" r="4" fill="'+ac+'"><animate attributeName="opacity" values="1;.4;1" dur=".9s" repeatCount="indefinite"/></circle>'
    // pivoting pickaxe arm (wind-up + strike + recoil)
    +'<g transform="translate(110 96)">'
      +'<g transform="rotate(-46)">'
        +'<animateTransform attributeName="transform" type="rotate" values="-50;-50;6;-50" keyTimes="0;0.45;0.62;1" dur="1.7s" repeatCount="indefinite"/>'
        +'<rect x="-3" y="0" width="6" height="58" rx="3" fill="#5a5470" stroke="#0a0712" stroke-width="1"/>'
        // pick head
        +'<path d="M-16 58 Q0 50 16 58 L13 66 Q0 60 -13 66 Z" fill="#7a7290" stroke="#0a0712" stroke-width="1.2"/>'
        +'<path d="M-16 58 L-22 62 M16 58 L22 62" stroke="#8a82a0" stroke-width="3" stroke-linecap="round"/>'
      +'</g>'
      +'<circle r="5" fill="#2a2640" stroke="'+ac+'" stroke-width="1.4"/>'
    +'</g>'
    // strike spark burst (synced to strike at ~62% of 1.7s)
    +'<g transform="translate(110 150)">'
      +'<circle r="9" fill="url(#'+p+'spk)" ><animate attributeName="r" values="0;14;0" keyTimes="0;0.66;0.74" dur="1.7s" repeatCount="indefinite"/></circle>'
      +[ -1,0,1].map(i=>'<circle cx="'+(i*9)+'" cy="0" r="2" fill="'+ac+'"><animate attributeName="cy" values="0;'+( -16-Math.abs(i)*6)+';0" keyTimes="0;0.7;0.86" dur="1.7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" keyTimes="0.6;0.7;0.9" dur="1.7s" repeatCount="indefinite"/></circle>').join('')
    +'</g>'
    // ore silo + conveyor
    +'<path d="M150 196 L150 168 Q150 162 158 162 L182 162 Q190 162 190 168 L190 196 Z" fill="url(#'+p+'rig)" stroke="'+ac+'" stroke-width="1.4"/>'
    +'<rect x="158" y="170" width="24" height="6" rx="3" fill="'+ac+'" opacity=".6"><animate attributeName="opacity" values=".6;.25;.6" dur="1.7s" repeatCount="indefinite"/></rect>'
    +'</svg>';
  }

  /* small scenery props */
  function dome(p,ac){ p=p||'dm_'; ac=ac||'#86dcff';
    return '<svg viewBox="0 0 200 160">'
    +'<defs>'
      +'<linearGradient id="'+p+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+ac+'" stop-opacity=".30"/><stop offset=".55" stop-color="'+ac+'" stop-opacity=".10"/><stop offset="1" stop-color="'+ac+'" stop-opacity=".04"/></linearGradient>'
      +'<radialGradient id="'+p+'in" cx=".5" cy=".95" r=".7"><stop offset="0" stop-color="#9fe6c8" stop-opacity=".5"/><stop offset="1" stop-color="#9fe6c8" stop-opacity="0"/></radialGradient>'
    +'</defs>'
    +'<ellipse cx="100" cy="150" rx="74" ry="10" fill="#000" opacity=".35"/>'
    // cam kabuk (saydam) \u2014 i\u00e7ini g\u00f6rebildi\u011fimiz koloni kubbesi\n    +'<path d="M30 150 L30 116 Q30 52 100 52 Q170 52 170 116 L170 150 Z" fill="url(#'+p+'g)" stroke="'+ac+'" stroke-width="1.8"/>'
    +'<clipPath id="'+p+'c"><path d="M31 150 L31 116 Q31 53 100 53 Q169 53 169 116 L169 150 Z"/></clipPath>'
    +'<g clip-path="url(#'+p+'c)">'
      +'<rect x="30" y="118" width="140" height="32" fill="url(#'+p+'in)"/>'
      +'<g fill="#1a2a3a" opacity=".7"><path d="M70 150 q-2 -22 6 -24 q8 2 6 24 Z"/><path d="M128 150 q-2 -16 5 -18 q7 2 5 18 Z"/><rect x="90" y="132" width="20" height="18" rx="3"/></g>'
      +'<g fill="#9fe6c8" opacity=".5"><circle cx="76" cy="128" r="6"/><circle cx="133" cy="134" r="4.5"/></g>'
    +'</g>'
    // parlak \u00e7er\u00e7eve mullion\u2019lar\u0131\n    +'<g stroke="'+ac+'" stroke-width="1.1" opacity=".55" fill="none"><path d="M30 116 Q100 86 170 116"/><path d="M44 150 L44 92 M72 150 L72 64 M100 150 L100 53 M128 150 L128 64 M156 150 L156 92"/></g>'
    // cam yans\u0131mas\u0131\n    +'<path d="M58 150 L86 60 L96 60 L68 150 Z" fill="#fff" opacity=".07"/>'
    +'<circle cx="100" cy="53" r="3.6" fill="#fff"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle>'
    +'</svg>'; }

  function pad(p,ac){ p=p||'pd_'; ac=ac||'#5fdcff';
    return '<svg viewBox="0 0 240 120">'
    +'<ellipse cx="120" cy="78" rx="104" ry="34" fill="#10182a" stroke="'+ac+'" stroke-width="2" opacity=".85"/>'
    +'<ellipse cx="120" cy="78" rx="72" ry="22" fill="none" stroke="'+ac+'" stroke-width="1.4" opacity=".5" stroke-dasharray="6 7"><animateTransform attributeName="transform" type="rotate" from="0 120 78" to="360 120 78" dur="14s" repeatCount="indefinite"/></ellipse>'
    +'<path d="M120 60 L120 96 M102 78 L138 78" stroke="'+ac+'" stroke-width="2" opacity=".7"/>'
    +'<g fill="'+ac+'">'+[0,1,2,3,4,5].map(i=>{const a=i/6*Math.PI*2;const x=120+Math.cos(a)*100,y=78+Math.sin(a)*32;return '<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="2.4"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" begin="'+(i*0.2)+'s" repeatCount="indefinite"/></circle>';}).join('')+'</g>'
    +'</svg>'; }

  /* ============================ GALAXY PLANETS ============================ */
  // Each station upgrade lives on its OWN world. These are lit, 3D-feeling
  // spheres (radial body + terminator shadow + atmospheric rim) with a themed
  // surface. Liveliness (float / spin / orbit) comes from cheap CSS on the
  // wrapper — the SVG itself stays static so it paints once.
  const PAL = {
    laser:   { a:'#cfeeff', b:'#3aa0e8', c:'#0b3a66', rim:'#6fd0ff', hot:'#9fe8ff' },
    armor:   { a:'#c8f7df', b:'#3fc98a', c:'#0c5a3e', rim:'#5fe6a8', hot:'#aff6cf' },
    radar:   { a:'#ffe6c0', b:'#f2a24a', c:'#7a3c12', rim:'#ffc06a', hot:'#ffd79a' },
    mining:  { a:'#e3c8ff', b:'#9a5fe0', c:'#3a1466', rim:'#c79bff', hot:'#f0d4ff' },
    teleport:{ a:'#ffccf2', b:'#e85fc0', c:'#5e1450', rim:'#ff9ae0', hot:'#ffd0f4' }
  };
  function worldPlanet(type, p){
    p=(p||type)+'_w'; const c=PAL[type]||PAL.laser;
    // ---- BOLD themed surface (clipped to the globe, drawn around local 0,0) ----
    let surf='';
    if(type==='laser'){            // forge world — molten energy fissures
      surf = '<g stroke="'+c.hot+'" stroke-width="3.2" fill="none" opacity=".78" stroke-linecap="round">'
        +'<path d="M-88 -26 Q-34 -42 16 -18 Q56 -2 90 -20"/>'
        +'<path d="M-84 26 Q-30 12 22 32 Q56 46 88 28"/>'
        +'<path d="M-14 -64 L-2 -20 L-24 16 L-6 58"/>'
        +'<path d="M44 -50 L34 -8 L54 26"/></g>'
        +'<g fill="#fff" opacity=".9">'+[[-38,-22],[14,-12],[44,24],[-20,30]].map(pt=>'<circle cx="'+pt[0]+'" cy="'+pt[1]+'" r="2.6"/>').join('')+'</g>';
    } else if(type==='armor'){     // armored world — riveted plate continents
      surf = '<g fill="'+c.c+'" opacity=".92" stroke="'+c.b+'" stroke-width="1.6">'
        +'<path d="M-74 -26 q28 -22 58 -8 q26 2 18 26 q-32 18 -60 6 q-30 -10 -16 -24Z"/>'
        +'<path d="M10 18 q34 -10 56 12 q-4 32 -46 32 q-30 -8 -22 -36Z"/></g>'
        +'<g stroke="'+c.hot+'" stroke-width="2" fill="none" opacity=".5"><path d="M-56 -22 q22 -14 44 -4"/><path d="M16 26 q22 -6 40 10"/></g>';
    } else if(type==='radar'){     // banded gas/ocean world
      surf = '<g>'+[[-50,'#d98a3a',15],[-20,'#f4b766',12],[8,'#c46a26',16],[36,'#e8a04a',13],[62,'#b85e22',10]].map(b=>'<ellipse cx="0" cy="'+b[0]+'" rx="94" ry="'+b[2]+'" fill="'+b[1]+'" opacity=".85"/>').join('')+'</g>'
        +'<ellipse cx="-18" cy="-2" rx="20" ry="9" fill="#7a3c12" opacity=".5"/>'
        +'<ellipse cx="26" cy="-28" rx="22" ry="9" fill="#fff" opacity=".18"/>';
    } else if(type==='mining'){    // crystalline world — glowing veins + shards
      surf = '<g fill="'+c.c+'" opacity=".6"><path d="M-92 38 L-50 -8 L-20 30 L18 -18 L50 26 L92 -12 L92 94 L-92 94Z"/></g>'
        +'<g stroke="'+c.hot+'" stroke-width="3" fill="none" opacity=".9" stroke-linejoin="round">'
        +'<path d="M-58 -30 L-28 -4 L-44 28 M-28 -4 L8 2 L22 32"/>'
        +'<path d="M32 -40 L44 -8 L70 8 M44 -8 L28 22"/></g>'
        +'<g fill="#fff" opacity=".95">'+[[-28,-4],[8,2],[44,-8]].map(pt=>'<circle cx="'+pt[0]+'" cy="'+pt[1]+'" r="2.6"/>').join('')+'</g>';
    } else {                       // teleport — swirling rift
      surf = '<g fill="none" stroke="'+c.hot+'" stroke-width="3.6" opacity=".72" stroke-linecap="round">'
        +[26,46,68].map(r=>'<path d="M0 -'+r+' A'+r+' '+r+' 0 1 1 -'+(r*0.72).toFixed(0)+' '+(r*0.72).toFixed(0)+'"/>').join('')+'</g>'
        +'<circle cx="0" cy="0" r="14" fill="#fff"/>';
    }
    // installation / city lights on the lit hemisphere
    let lights='';
    if(type!=='teleport'){
      lights='<g fill="#fff" opacity=".85">'+[[-58,-34],[-44,18],[-30,-12],[34,40],[58,12]]
        .map(pt=>'<circle cx="'+pt[0]+'" cy="'+pt[1]+'" r="1.5"/>').join('')+'</g>';
    }
    const facScale = (type==='radar') ? 0.78 : 0.86;
    return '<svg viewBox="0 0 220 220" style="width:100%;height:100%;overflow:visible">'
      +'<defs>'
        +'<radialGradient id="'+p+'s" cx=".35" cy=".29" r=".8">'
          +'<stop offset="0" stop-color="'+c.a+'"/><stop offset=".4" stop-color="'+c.b+'"/>'
          +'<stop offset=".82" stop-color="'+c.c+'"/><stop offset="1" stop-color="#04030c"/></radialGradient>'
        +'<radialGradient id="'+p+'atm" cx=".5" cy=".5" r=".5"><stop offset=".66" stop-color="'+c.rim+'" stop-opacity="0"/><stop offset=".87" stop-color="'+c.rim+'" stop-opacity=".72"/><stop offset="1" stop-color="'+c.rim+'" stop-opacity="0"/></radialGradient>'
        +'<radialGradient id="'+p+'tm" cx=".31" cy=".27" r=".86"><stop offset=".46" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></radialGradient>'
        +'<radialGradient id="'+p+'gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="'+c.hot+'" stop-opacity=".85"/><stop offset="1" stop-color="'+c.hot+'" stop-opacity="0"/></radialGradient>'
        +'<radialGradient id="'+p+'spec" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'
        +'<linearGradient id="'+p+'rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#62749c"/><stop offset="1" stop-color="#1a2233"/></linearGradient>'
        +'<radialGradient id="'+p+'fx" cx=".5" cy=".34" r=".66"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="'+c.hot+'"/><stop offset="1" stop-color="'+c.c+'"/></radialGradient>'
        +'<clipPath id="'+p+'cp"><circle cx="110" cy="110" r="92"/></clipPath>'
      +'</defs>'
      +'<circle cx="110" cy="110" r="109" fill="url(#'+p+'atm)"/>'
      +'<circle cx="110" cy="110" r="92" fill="url(#'+p+'s)"/>'
      +'<g clip-path="url(#'+p+'cp)" transform="translate(110 110)">'+surf+lights+'</g>'
      +'<circle cx="110" cy="110" r="92" fill="url(#'+p+'tm)" clip-path="url(#'+p+'cp)"/>'
      // bright sun glint (upper-left) — gives the sphere real volume
      +'<ellipse cx="80" cy="72" rx="30" ry="20" fill="url(#'+p+'spec)" opacity=".55" clip-path="url(#'+p+'cp)"/>'
      // facility glow halo behind the structure (reads as a powered installation)
      +'<g clip-path="url(#'+p+'cp)"><ellipse cx="110" cy="90" rx="48" ry="42" fill="url(#'+p+'gl)" opacity=".5"/></g>'
      // lit landing platform the facility sits on — makes the "factory" placement obvious
      +'<ellipse cx="110" cy="107" rx="44" ry="13" fill="#000" opacity=".34"/>'
      +'<ellipse cx="110" cy="107" rx="42" ry="12" fill="'+c.rim+'" opacity=".14"/>'
      +'<ellipse cx="110" cy="107" rx="42" ry="12" fill="none" stroke="'+c.rim+'" stroke-width="1.8" opacity=".75"/>'
      // themed facility standing ON the platform (clearly placed, prominent)
      +'<g transform="translate(110 105) scale('+facScale+')">'+worldRig(type,c,p)+'</g>'
      +'<circle cx="110" cy="110" r="92" fill="none" stroke="'+c.rim+'" stroke-width="1.8" opacity=".62"/>'
      +'</svg>';
  }

  /* themed surface installation for each world. Drawn with the base sitting at
     local y=0, structures rising into negative-y. Lit from upper-left to match
     the globe. Kept static (no SMIL) — motion comes from the CSS bob/spin. */
  function worldRig(type,c,p){
    const D='#1c2434', M='#323d54', E=c.rim, G=c.hot, RG='url(#'+p+'rg)', FX='url(#'+p+'fx)';
    const LE='#6a7ca6';
    if(type==='laser'){            // weapon forge — block forge + bright vertical beam
      return ''
        +'<path d="M-30 0 L-30 -20 L30 -20 L30 0 Z" fill="'+D+'" stroke="'+E+'" stroke-width="1.6"/>'
        +'<path d="M-30 -20 L-18 -34 L18 -34 L30 -20 Z" fill="'+M+'" stroke="'+E+'" stroke-width="1.4"/>'
        +'<g fill="'+G+'">'+[-22,-12,-2,8,18].map(x=>'<rect x="'+x+'" y="-15" width="5" height="8" rx="1"/>').join('')+'</g>'
        +'<rect x="-9" y="-47" width="18" height="15" rx="2" fill="'+RG+'" stroke="'+E+'" stroke-width="1.2"/>'
        +'<circle cx="0" cy="-39" r="5.4" fill="'+FX+'"/>'
        +'<rect x="-3" y="-94" width="6" height="50" rx="3" fill="'+FX+'" opacity=".92"/>'
        +'<rect x="-1.4" y="-98" width="2.8" height="54" fill="#fff"/>'
        +'<circle cx="0" cy="-96" r="4.4" fill="#fff"/>';
    }
    if(type==='armor'){            // armor foundry — domed bunker + glowing shield crest
      return ''
        +'<path d="M-30 0 L-30 -18 L30 -18 L30 0 Z" fill="'+D+'" stroke="'+E+'" stroke-width="1.6"/>'
        +'<g fill="'+G+'" opacity=".85">'+[-24,-15,-6,15,24].map(x=>'<rect x="'+x+'" y="-13" width="5" height="7" rx="1"/>').join('')+'</g>'
        +'<path d="M-25 -18 L-25 -36 Q-25 -52 0 -52 Q25 -52 25 -36 L25 -18 Z" fill="'+RG+'" stroke="'+E+'" stroke-width="1.4"/>'
        +'<path d="M-25 -36 Q-25 -52 0 -52 Q25 -52 25 -36 Z" fill="'+LE+'" opacity=".5"/>'
        +'<path d="M0 -46 L13 -40 V-30 Q13 -21 0 -17 Q-13 -21 -13 -30 V-40 Z" fill="'+D+'" stroke="'+G+'" stroke-width="1.6"/>'
        +'<path d="M0 -41 V-23 M-7 -32 H7" stroke="'+G+'" stroke-width="2.2"/>';
    }
    if(type==='radar'){            // deep-scan relay — hut + tall mast + big dish + sweep
      return ''
        +'<path d="M-26 0 L-26 -16 L26 -16 L26 0 Z" fill="'+D+'" stroke="'+E+'" stroke-width="1.6"/>'
        +'<g fill="'+G+'">'+[-20,-11,-2].map(x=>'<rect x="'+x+'" y="-12" width="5" height="6" rx="1"/>').join('')+'</g>'
        +'<line x1="2" y1="-16" x2="2" y2="-52" stroke="'+LE+'" stroke-width="5"/>'
        +'<g transform="translate(2 -54) rotate(-20)">'
          +'<path d="M-23 -18 A27 27 0 0 1 23 -18 L13 11 A16 16 0 0 0 -13 11 Z" fill="'+RG+'" stroke="'+E+'" stroke-width="1.6"/>'
          +'<ellipse cx="0" cy="-5" rx="18" ry="11" fill="'+D+'" opacity=".5"/>'
          +'<line x1="0" y1="-5" x2="0" y2="17" stroke="'+E+'" stroke-width="1.6"/><circle cx="0" cy="17" r="3.6" fill="'+G+'"/>'
        +'</g>'
        +'<g fill="none" stroke="'+G+'" stroke-width="2.2" opacity=".55"><path d="M34 -56 q17 8 19 27"/><path d="M41 -64 q23 10 25 37"/></g>';
    }
    if(type==='mining'){           // dark-matter mine — A-frame derrick over glowing crystal
      return ''
        +'<path d="M-30 0 L-30 -14 L30 -14 L30 0 Z" fill="'+D+'" stroke="'+E+'" stroke-width="1.6"/>'
        +'<path d="M-15 -14 L-7 -42 L0 -16 L8 -50 L15 -14 Z" fill="'+FX+'" stroke="'+E+'" stroke-width="1.2"/>'
        +'<path d="M-27 -14 L-7 -60 M27 -14 L7 -60 M-7 -60 L7 -60" fill="none" stroke="'+LE+'" stroke-width="4"/>'
        +'<g stroke="'+M+'" stroke-width="1.8">'+[-26,-40].map(y=>{const t=(y+14)/-46;const lx=(-27+20*t).toFixed(0), rx=(27-20*t).toFixed(0);const t2=(y-14+14)/-46;const lx2=(-27+20*t2).toFixed(0), rx2=(27-20*t2).toFixed(0);return '<path d="M'+lx+' '+y+' L'+rx2+' '+(y-14)+' M'+rx+' '+y+' L'+lx2+' '+(y-14)+'"/>';}).join('')+'</g>'
        +'<rect x="-10" y="-69" width="20" height="10" rx="2" fill="'+RG+'" stroke="'+E+'" stroke-width="1.2"/>'
        +'<circle cx="0" cy="-64" r="3.2" fill="'+G+'"/>';
    }
    // teleport — standing rift arch on a launch deck
    return ''
      +'<path d="M-28 0 L-28 -12 L28 -12 L28 0 Z" fill="'+D+'" stroke="'+E+'" stroke-width="1.6"/>'
      +'<ellipse cx="0" cy="-12" rx="21" ry="5" fill="'+FX+'" opacity=".55"/>'
      +'<path d="M-22 -12 L-22 -44 Q-22 -62 0 -62 Q22 -62 22 -44 L22 -12" fill="none" stroke="'+LE+'" stroke-width="7"/>'
      +'<path d="M-22 -12 L-22 -44 Q-22 -62 0 -62 Q22 -62 22 -44 L22 -12" fill="none" stroke="'+E+'" stroke-width="2.4"/>'
      +'<ellipse cx="0" cy="-38" rx="15" ry="23" fill="'+FX+'"/>'
      +'<g fill="none" stroke="#fff" stroke-width="1.4" opacity=".55"><ellipse cx="0" cy="-38" rx="9" ry="14"/></g>'
      +'<g fill="'+G+'">'+[[-30,-20],[30,-20]].map(pt=>'<circle cx="'+pt[0]+'" cy="'+pt[1]+'" r="2.6"/>').join('')+'</g>';
  }

  // teleport gate — used as the detail-panel header art for the 5th world
  function teleGate(p,ac){ p=p||'tg_'; ac=ac||'#e85fc0';
    return '<svg viewBox="0 0 220 220">'
    +'<defs><radialGradient id="'+p+'p" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="'+ac+'"/><stop offset="1" stop-color="#2a0a28"/></radialGradient>'
    +'<linearGradient id="'+p+'r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4a66"/><stop offset="1" stop-color="#241a30"/></linearGradient></defs>'
    +'<ellipse cx="110" cy="198" rx="80" ry="12" fill="#000" opacity=".4"/>'
    +'<path d="M58 198 L58 176 L162 176 L162 198 Z" fill="url(#'+p+'r)" stroke="'+ac+'" stroke-width="1.6"/>'
    +'<rect x="46" y="170" width="128" height="9" rx="3" fill="url(#'+p+'r)" stroke="'+ac+'" stroke-width="1"/>'
    +'<circle cx="110" cy="102" r="64" fill="none" stroke="url(#'+p+'r)" stroke-width="14"/>'
    +'<circle cx="110" cy="102" r="64" fill="none" stroke="'+ac+'" stroke-width="2" opacity=".75"/>'
    +'<g stroke="'+ac+'" stroke-width="2" opacity=".8">'+[0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180,x1=110+Math.cos(r)*56,y1=102+Math.sin(r)*56,x2=110+Math.cos(r)*70,y2=102+Math.sin(r)*70;return '<line x1="'+x1.toFixed(0)+'" y1="'+y1.toFixed(0)+'" x2="'+x2.toFixed(0)+'" y2="'+y2.toFixed(0)+'"/>';}).join('')+'</g>'
    +'<circle cx="110" cy="102" r="48" fill="url(#'+p+'p)" opacity=".92"><animate attributeName="r" values="48;44;48" dur="2.4s" repeatCount="indefinite"/></circle>'
    +'<g fill="none" stroke="#fff" stroke-width="1.4" opacity=".5"><circle cx="110" cy="102" r="30"/><circle cx="110" cy="102" r="18"/></g>'
    +'</svg>'; }

  window.NB_STA = { planet, ridge, horizon, laser, armor, radar, mining, dome, pad,
    core, solar, crates, lightPole, domeCanopy, worldPlanet, teleGate, PAL,
    build:{ laser, armor, radar, mining, teleport:teleGate } };

  /* ============================ GLASS BIODOME CANOPY ============================ */
  // arching habitat glass we look out through — frames the colony as an enclosed
  // pressurized dome. Drawn over the sky (upper area), fades before the buildings.
  function domeCanopy(p, ac){ p=p||'dc_'; ac=ac||'#86dcff';
    // TEMIZ cam kubbe: hafif tint + parlak kenar + birkac meridyen kabur + tek statik parlama
    var ribs='';
    [44,118,282,356].forEach(function(x){ ribs+='<path d="M200 2 Q'+((200+x)/2)+' 64 '+x+' 232" fill="none" stroke="url(#'+p+'rib)" stroke-width="1.1" opacity=".5"/>'; });
    return '<svg viewBox="0 0 400 232" preserveAspectRatio="xMidYMin slice" style="width:100%;height:100%">'
    +'<defs>'
      +'<linearGradient id="'+p+'glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+ac+'" stop-opacity=".16"/><stop offset=".55" stop-color="'+ac+'" stop-opacity=".05"/><stop offset="1" stop-color="'+ac+'" stop-opacity="0"/></linearGradient>'
      +'<linearGradient id="'+p+'rib" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+ac+'" stop-opacity=".75"/><stop offset="1" stop-color="'+ac+'" stop-opacity=".04"/></linearGradient>'
      +'<linearGradient id="'+p+'sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>'
      +'<clipPath id="'+p+'cap"><path d="M-30 232 Q200 -44 430 232 Z"/></clipPath>'
    +'</defs>'
    +'<g clip-path="url(#'+p+'cap)">'
      +'<rect x="0" y="0" width="400" height="232" fill="url(#'+p+'glass)"/>'
      +'<path d="M-20 232 Q110 -6 208 64 Q120 76 64 232 Z" fill="url(#'+p+'sheen)"/>'
      +ribs
    +'</g>'
    // parlak, temiz cam kenari (cift cizgi: ac + ince beyaz)
    +'<path d="M-30 232 Q200 -44 430 232" fill="none" stroke="'+ac+'" stroke-width="2.6" opacity=".72"/>'
    +'<path d="M-22 232 Q200 -30 422 232" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/>'
    +'<circle cx="200" cy="2" r="3.6" fill="#fff"><animate attributeName="opacity" values="1;.45;1" dur="3s" repeatCount="indefinite"/></circle>'
    +'</svg>';
  }
})();
