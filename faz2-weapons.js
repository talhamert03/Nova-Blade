/* ===========================================================================
   NOVA BLADE · FAZ 2 — 20 IŞIN SİLAHI · v4 (silüet çeşitliliği)
   • Her silah AYRI bir arketip: ince saber, tsuba saber, shoto, plazma balta,
     pala, mızrak, katana, çapraz saber, çift uçlu staff, tırpan, rünlü kılıç,
     trident, BUSTER (dev levha), çekiç, glaive, çift ağızlı balta, çift hançer,
     ikiz kılıç, kara delik tırpan, nova çapraz.
   • Şekilli enerji bıçağı motoru: dış parıltı + gradient gövde + beyaz kenar +
     parlak çekirdek hattı. Metal kabza/sap ele oturur, kesici kısım enerjidir.
   • Kart tuvali 400×140. Silah ortalı + çapraz. Kanonik dik yön: el=origin,
     bıçak yukarı (-Y). Aynı çizim hem kartta hem kahramanın elinde kullanılır.
   • Korunan dövme silahlar (çekiç/glaive/ikiz kılıç) frame() ile çizilir.
   =========================================================================== */
(function(){
  const A = window.NB2, rng = A.rng;

  /* ===================== KART ARKA PLANI (400×140) ===================== */
  function bg(p, c1, c2, opt){ opt=opt||{};
    let s='<defs><radialGradient id="'+p+'cb" cx=".5" cy=".46" r=".72">'
      +'<stop offset="0" stop-color="'+c1+'" stop-opacity="'+(opt.glow||.3)+'"/>'
      +'<stop offset=".55" stop-color="'+c2+'" stop-opacity=".10"/>'
      +'<stop offset="1" stop-color="#05060f" stop-opacity="0"/></radialGradient></defs>'
      +'<rect width="400" height="140" fill="#070912"/><rect width="400" height="140" fill="url(#'+p+'cb)"/>';
    if(opt.stars){ const r=rng(opt.stars); for(let i=0;i<40;i++){ const x=(r()*400).toFixed(0),y=(r()*140).toFixed(0),rad=(0.4+r()*1.2).toFixed(2),o=(0.2+r()*0.6).toFixed(2);
      s+='<circle cx="'+x+'" cy="'+y+'" r="'+rad+'" fill="#dfe6ff" opacity="'+o+'">'+(r()<0.4?'<animate attributeName="opacity" values="'+o+';'+(o*0.2).toFixed(2)+';'+o+'" dur="'+(2+r()*3).toFixed(1)+'s" repeatCount="indefinite"/>':'')+'</circle>'; } }
    if(opt.embers){ const r=rng(opt.embers); for(let i=0;i<16;i++){ const x=(r()*400).toFixed(0),y=(70+r()*70).toFixed(0),d=(2+r()*2).toFixed(1);
      s+='<circle cx="'+x+'" cy="'+y+'" r="'+(0.8+r()*1.5).toFixed(2)+'" fill="'+(opt.ember||'#ff8a3a')+'"><animate attributeName="cy" values="'+y+';'+(parseFloat(y)-70).toFixed(0)+'" dur="'+d+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="'+d+'s" repeatCount="indefinite"/></circle>'; } }
    return s;
  }

  /* ===================== SABER KABZA PARÇALARI ===================== */
  function lsDefs(p,c,core){ core=core||'#ffffff';
    return '<defs>'
      +'<linearGradient id="'+p+'st" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b0e14"/><stop offset=".2" stop-color="#5c6675"/><stop offset=".5" stop-color="#b8c4d4"/><stop offset=".8" stop-color="#454e5c"/><stop offset="1" stop-color="#090c11"/></linearGradient>'
      +'<linearGradient id="'+p+'dk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#04060a"/><stop offset=".5" stop-color="#39414e"/><stop offset="1" stop-color="#04060a"/></linearGradient>'
      +'<linearGradient id="'+p+'gd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4910"/><stop offset=".5" stop-color="#ffe6a0"/><stop offset="1" stop-color="#6a4910"/></linearGradient>'
      +'<linearGradient id="'+p+'bd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+c+'" stop-opacity=".18"/><stop offset=".5" stop-color="'+core+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".18"/></linearGradient>'
      + A.energy(p+'gl', c, '#ffffff')
      + A.bloom(p+'b2', 3.4) + A.bloom(p+'b1', 1.5)
      +'</defs>';
  }

  function emit(p,o,w,h,top){ const t=o.emitter||'flared', mt=o.metal||'st';
    if(t==='claw'||t==='cross'){
      return '<rect x="-'+(h+1)+'" y="'+(top-7)+'" width="'+(w+2)+'" height="8" rx="1.6" fill="url(#'+p+mt+')" stroke="#04060a" stroke-width="1"/>'
        +'<rect x="-'+(h-1)+'" y="'+(top-9)+'" width="'+(w-2)+'" height="3.4" rx="1.2" fill="#0c1016"/>';
    }
    return '<path d="M-'+(h+2.4)+' '+(top-8)+' L-'+h+' '+top+' L'+h+' '+top+' L'+(h+2.4)+' '+(top-8)+' Z" fill="url(#'+p+mt+')" stroke="#04060a" stroke-width="1"/>'
      +'<rect x="-'+(h-1)+'" y="'+(top-10)+'" width="'+(w-2)+'" height="4" rx="1.4" fill="#0c1016"/>';
  }

  function hilt(p,o){
    const H=o.hiltLen||30, w=o.w||11, h=w/2, top=-H/2, bot=H/2, mt=o.metal||'st';
    let s='';
    s+='<path d="M-'+h+' '+(bot-3)+' Q-'+h+' '+(bot+5)+' 0 '+(bot+5)+' Q'+h+' '+(bot+5)+' '+h+' '+(bot-3)+' Z" fill="url(#'+p+mt+')" stroke="#04060a" stroke-width="1"/>';
    s+='<rect x="-'+(h-1)+'" y="'+(bot+1.4)+'" width="'+(w-2)+'" height="2" rx="1" fill="#04060a"/>';
    s+='<rect x="-'+h+'" y="'+top+'" width="'+w+'" height="'+H+'" rx="2.4" fill="url(#'+p+mt+')" stroke="#04060a" stroke-width="1"/>';
    s+='<rect x="-'+(h-1.4)+'" y="'+(top+1)+'" width="1.8" height="'+(H-2)+'" fill="#fff" opacity=".2"/>';
    for(let y=top+5;y<bot-3;y+=5.5) s+='<rect x="-'+(h+0.6)+'" y="'+y.toFixed(1)+'" width="'+(w+1.2)+'" height="1.7" rx=".85" fill="#0e1219" opacity=".85"/>';
    s+='<rect x="'+(h-0.5)+'" y="'+(top+H*0.32).toFixed(1)+'" width="3.8" height="8" rx="1.2" fill="#161b23" stroke="#04060a" stroke-width=".7"/>';
    s+='<circle cx="'+(h+1.4)+'" cy="'+(top+H*0.32+3).toFixed(1)+'" r="1.3" fill="'+(o.led||'#9fd8ff')+'"><animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/></circle>';
    if(o.ornate>=1&&o.accent){ s+='<rect x="-'+(h+0.8)+'" y="'+(top+1)+'" width="'+(w+1.6)+'" height="2.5" rx="1" fill="url(#'+p+o.accent+')"/>'
      +'<rect x="-'+(h+0.8)+'" y="'+(bot-4)+'" width="'+(w+1.6)+'" height="2.5" rx="1" fill="url(#'+p+o.accent+')"/>'; }
    if(o.ornate>=2) s+='<circle cx="-'+(h+2.6)+'" cy="'+(bot-3)+'" r="2.3" fill="none" stroke="url(#'+p+mt+')" stroke-width="1.5"/>';
    if(o.ornate>=3) s+='<rect x="-'+(h+1.4)+'" y="-2" width="'+(w+2.8)+'" height="4" rx="1" fill="url(#'+p+(o.accent||'gd')+')"/>';
    s+=emit(p,o,w,h,top);
    return s;
  }

  function blade(p,o){
    const len=o.len, w=o.w||9, y0=o.fromY, tip=y0-len, c=o.c;
    let b = (o.flick===false)?'<g>':'<g><animateTransform attributeName="transform" type="scale" values="1 1;1 1.014;1 .996;1 1" dur="2.6s" repeatCount="indefinite" additive="sum"/>';
    b+='<rect x="-'+(w*1.7)+'" y="'+tip+'" width="'+(w*3.4)+'" height="'+len+'" rx="'+(w*1.7)+'" fill="'+c+'" opacity=".26" filter="url(#'+p+'b2)"><animate attributeName="opacity" values=".26;.4;.26" dur="2s" repeatCount="indefinite"/></rect>';
    b+='<rect x="-'+w+'" y="'+tip+'" width="'+(w*2)+'" height="'+len+'" rx="'+w+'" fill="url(#'+p+'bd)"/>';
    b+='<rect x="-'+(w*0.4)+'" y="'+(tip+2)+'" width="'+(w*0.8)+'" height="'+(len-2)+'" rx="'+(w*0.4)+'" fill="#fff"><animate attributeName="opacity" values="1;.84;1" dur="1.3s" repeatCount="indefinite"/></rect>';
    b+='<ellipse cx="0" cy="'+y0+'" rx="'+(w*1.5)+'" ry="'+(w*0.9)+'" fill="#fff" opacity=".5" filter="url(#'+p+'b1)"/>';
    if(o.anim>=2) b+=motes(p,y0,len,w,o.seed);
    return b+'</g>';
  }
  function miniBlade(p,len,w,c){ return '<rect x="-'+(w*1.5)+'" y="-'+len+'" width="'+(w*3)+'" height="'+len+'" rx="'+(w*1.5)+'" fill="'+c+'" opacity=".26" filter="url(#'+p+'b2)"/>'
    +'<rect x="-'+w+'" y="-'+len+'" width="'+(w*2)+'" height="'+len+'" rx="'+w+'" fill="url(#'+p+'bd)"/>'
    +'<rect x="-'+(w*0.4)+'" y="-'+(len-1)+'" width="'+(w*0.8)+'" height="'+(len-1)+'" rx="'+(w*0.4)+'" fill="#fff"/>'; }

  function motes(p,y0,len,w,seed){ const r=rng(seed||len*3); let s='<g>';
    for(let i=0;i<7;i++){ const x=((r()-0.5)*w*1.7).toFixed(1), ys=(y0-r()*len).toFixed(1), d=(1.3+r()*1.4).toFixed(1);
      s+='<circle cx="'+x+'" cy="'+ys+'" r="'+(0.5+r()*0.8).toFixed(2)+'" fill="#fff"><animate attributeName="cy" values="'+ys+';'+(parseFloat(ys)-len*0.45).toFixed(1)+'" dur="'+d+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="'+d+'s" repeatCount="indefinite"/></circle>'; }
    return s+'</g>'; }

  /* ===================== ŞEKİLLİ ENERJİ BIÇAĞI MOTORU ===================== */
  function eDefs(p,c,core){ core=core||'#ffffff';
    return '<defs>'
      +'<linearGradient id="'+p+'st" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b0e14"/><stop offset=".2" stop-color="#5c6675"/><stop offset=".5" stop-color="#b8c4d4"/><stop offset=".8" stop-color="#454e5c"/><stop offset="1" stop-color="#090c11"/></linearGradient>'
      +'<linearGradient id="'+p+'dk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#04060a"/><stop offset=".5" stop-color="#39414e"/><stop offset="1" stop-color="#04060a"/></linearGradient>'
      +'<linearGradient id="'+p+'gd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4910"/><stop offset=".5" stop-color="#ffe6a0"/><stop offset="1" stop-color="#6a4910"/></linearGradient>'
      +'<linearGradient id="'+p+'gd2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#b8862a"/><stop offset="1" stop-color="#5a3e10"/></linearGradient>'
      +'<linearGradient id="'+p+'mt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfd6e2"/><stop offset=".5" stop-color="#5a6272"/><stop offset="1" stop-color="#2a303c"/></linearGradient>'
      +'<linearGradient id="'+p+'hf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0e1016"/><stop offset=".5" stop-color="#39414e"/><stop offset="1" stop-color="#0b0d12"/></linearGradient>'
      +'<linearGradient id="'+p+'eb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+c+'" stop-opacity=".30"/><stop offset=".5" stop-color="'+core+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".30"/></linearGradient>'
      +'<linearGradient id="'+p+'ev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c+'" stop-opacity=".30"/><stop offset=".5" stop-color="'+core+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".30"/></linearGradient>'
      + A.energy(p+'rg', c, core) + A.bloom(p+'b2', 3.4) + A.bloom(p+'b1', 1.5)
      +'</defs>';
  }
  const HUM='<animateTransform attributeName="transform" type="scale" values="1 1;1 1.013;1 .997;1 1" dur="2.6s" repeatCount="indefinite" additive="sum"/>';

  // dolu enerji bıçağı: parıltı + gövde + beyaz kenar + parlak çekirdek
  function eBlade(p,d,c,o){ o=o||{};
    let s='<g>'+(o.hum===false?'':HUM);
    s+='<path d="'+d+'" fill="'+c+'" opacity=".24" filter="url(#'+p+'b2)"/>';
    s+='<path d="'+d+'" fill="url(#'+p+(o.grad||'eb')+')" stroke="'+c+'" stroke-width=".5"/>';
    s+='<path d="'+d+'" fill="none" stroke="#fff" stroke-width="'+(o.edge||1.3)+'" opacity=".82"/>';
    if(o.core) s+='<path d="'+o.core+'" fill="none" stroke="#fff" stroke-width="'+(o.coreW||2.2)+'" stroke-linecap="round" opacity=".9"><animate attributeName="opacity" values=".9;.62;.9" dur="1.3s" repeatCount="indefinite"/></path>';
    return s+'</g>';
  }
  // açık enerji keskin (kenar çizgisi) — metal bıçaklara enerji ağız eklemek için
  function eEdge(p,d,c,w){ w=w||2.4;
    return '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(w*2.6)+'" stroke-linecap="round" opacity=".5" filter="url(#'+p+'b1)"/>'
      +'<path d="'+d+'" fill="none" stroke="#fff" stroke-width="'+w+'" stroke-linecap="round" opacity=".95"><animate attributeName="opacity" values=".95;.7;.95" dur="1.3s" repeatCount="indefinite"/></path>';
  }

  // dövme kabza: sarılı tutamak + (tsuba ya da haç) muhafız (origin = bıçak tabanı)
  function fGrip(p,o){ o=o||{}; const gl=o.gripLen||26;
    let s=grip(p,gl,o.wrap||'#2a2118',o.pom,o.gruna);
    if(o.tsuba){ s+='<ellipse cx="0" cy="-1" rx="'+o.tsuba+'" ry="3.6" fill="url(#'+p+'mt)" stroke="#14110b" stroke-width="1.2"/>'
      +'<ellipse cx="0" cy="-1" rx="'+(o.tsuba*0.46).toFixed(1)+'" ry="1.9" fill="#0c0e12"/>'; }
    else if(o.gw!==0){ const gw=o.gw||12;
      s+='<path d="M-'+gw+' -2 Q0 -9 '+gw+' -2 L'+(gw-3)+' 5 Q0 1 -'+(gw-3)+' 5 Z" fill="url(#'+p+'gd2)" stroke="#1c1610" stroke-width="1.1"/>'; }
    return s;
  }
  // uzun metal sap (mızrak/balta/tırpan/trident) — origin civarı, sap +y'ye
  function pole(p,o){ const top=o.top;
    let s='<rect x="-3.4" y="'+top+'" width="6.8" height="'+(18-top).toFixed(1)+'" rx="3" fill="url(#'+p+'hf)" stroke="#070a0e" stroke-width="1"/>'
      +'<rect x="-3.2" y="'+top+'" width="2" height="'+(18-top).toFixed(1)+'" fill="#fff" opacity=".06"/>';
    for(let y=top+24;y<6;y+=30){ s+='<rect x="-5" y="'+y.toFixed(1)+'" width="10" height="5" rx="2" fill="#262b35" stroke="#070a0e" stroke-width=".9"/>'
      +(o.gruna?'<rect x="-1.3" y="'+(y+1.3).toFixed(1)+'" width="2.6" height="2.6" rx=".5" fill="'+o.gruna+'"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite"/></rect>':''); }
    s+='<path d="M-4.4 12 L0 24 L4.4 12 Z" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1"/>';
    return s;
  }

  /* ---- saber arketipleri ---- */
  function lsSaber(p,o){ const H=o.hiltLen||30;
    return lsDefs(p,o.c,o.core)+hilt(p,o)+blade(p,{len:o.blLen,w:o.blW||9,c:o.c,fromY:-H/2-2,anim:o.anim||1,seed:o.seed}); }

  function lsTsuba(p,o){ const H=o.hiltLen||30, yt=-H/2-1, R=o.tsuba||12;
    return lsDefs(p,o.c,o.core)+hilt(p,o)
      +'<ellipse cx="0" cy="'+yt+'" rx="'+R+'" ry="3.6" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>'
      +'<ellipse cx="0" cy="'+yt+'" rx="'+R+'" ry="3.6" fill="none" stroke="'+(o.ring||'#ffe6a0')+'" stroke-width=".8" opacity=".6"/>'
      +'<ellipse cx="0" cy="'+yt+'" rx="'+(R*0.5).toFixed(1)+'" ry="1.8" fill="#0c0e12"/>'
      +blade(p,{len:o.blLen,w:o.blW||8,c:o.c,fromY:-H/2-2,anim:o.anim||1,seed:o.seed}); }

  function lsCross(p,o){ const H=o.hiltLen||30, w=o.w||12, h=w/2, top=-H/2, c=o.c, qb=o.qb||34, qy=top-3;
    let s=lsDefs(p,c,o.core)+hilt(p,{...o, emitter:'cross'});
    s+='<rect x="-'+(h+13)+'" y="'+(qy-2.5)+'" width="13" height="5" rx="1.4" fill="url(#'+p+(o.metal||'st')+')" stroke="#04060a" stroke-width=".9"/>'
      +'<rect x="'+h+'" y="'+(qy-2.5)+'" width="13" height="5" rx="1.4" fill="url(#'+p+(o.metal||'st')+')" stroke="#04060a" stroke-width=".9"/>';
    s+='<g transform="translate(-'+(h+12)+' '+qy+') rotate(-94)">'+miniBlade(p,qb,5.5,c)+'</g>';
    s+='<g transform="translate('+(h+12)+' '+qy+') rotate(94)">'+miniBlade(p,qb,5.5,c)+'</g>';
    s+=blade(p,{len:o.blLen,w:o.blW||10,c:c,fromY:top-2,anim:3,seed:o.seed});
    return s; }

  function lsSaberstaff(p,o){ const H=o.hiltLen||44, w=o.w||11, h=w/2, top=-H/2;
    let s=lsDefs(p,o.c,o.core);
    s+='<rect x="-'+h+'" y="'+top+'" width="'+w+'" height="'+H+'" rx="2.4" fill="url(#'+p+(o.metal||'st')+')" stroke="#04060a" stroke-width="1"/>';
    s+='<rect x="-'+(h-1.4)+'" y="'+(top+1)+'" width="1.8" height="'+(H-2)+'" fill="#fff" opacity=".2"/>';
    for(let y=top+6;y<H/2-3;y+=6) s+='<rect x="-'+(h+0.6)+'" y="'+y.toFixed(1)+'" width="'+(w+1.2)+'" height="1.7" rx=".85" fill="#0e1219" opacity=".8"/>';
    s+='<rect x="-'+(h+1)+'" y="-3.4" width="'+(w+2)+'" height="6.8" rx="1.4" fill="url(#'+p+(o.accent||'gd')+')" stroke="#04060a" stroke-width=".7"/>';
    s+='<circle cx="'+(h+1.6)+'" cy="0" r="1.3" fill="'+(o.led||o.c)+'"><animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/></circle>';
    s+=emit(p,{...o,emitter:'flared'},w,h,top);
    s+='<g transform="scale(1 -1)">'+emit(p,{...o,emitter:'flared'},w,h,top)+'</g>';
    s+=blade(p,{len:o.blLen,w:o.blW||9,c:o.c,fromY:top-2,anim:o.anim||2,seed:o.seed});
    s+='<g transform="scale(1 -1)">'+blade(p,{len:o.blLen,w:o.blW||9,c:o.c,fromY:top-2,anim:o.anim||2,seed:(o.seed||1)+50})+'</g>';
    return s; }

  /* ---- şekilli enerji arketipleri ---- */
  // shoto: kısa, geniş yaprak bıçak
  function eShoto(p,o){ const c=o.c,L=o.blLen||84,w=o.blW||12,B=-2;
    const d='M -'+w+' '+B+' L -'+w+' '+(B-L*0.55).toFixed(1)+' Q -'+(w*0.66).toFixed(1)+' '+(B-L*0.93).toFixed(1)+' 0 '+(B-L)+' Q '+(w*0.66).toFixed(1)+' '+(B-L*0.93).toFixed(1)+' '+w+' '+(B-L*0.55).toFixed(1)+' L '+w+' '+B+' Z';
    return eDefs(p,c,o.core)+fGrip(p,{gripLen:20,wrap:o.wrap||'#22382a',tsuba:9,gruna:o.gruna})
      +eBlade(p,d,c,{core:'M0 '+B+' L0 '+(B-L+5).toFixed(1),coreW:w*0.6,edge:1.4}); }

  // pala / scimitar: kavisli tek ağız
  function eScimitar(p,o){ const c=o.c,L=o.blLen||150,w=o.blW||9,B=-2;
    const d='M -'+(w*0.5)+' '+B
      +' Q '+(w*0.3).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+(L*0.14).toFixed(1)+' '+(B-L*0.80).toFixed(1)
      +' Q '+(L*0.26).toFixed(1)+' '+(B-L).toFixed(1)+' '+(L*0.34).toFixed(1)+' '+(B-L*0.84).toFixed(1)
      +' Q '+(w*2.4).toFixed(1)+' '+(B-L*0.42).toFixed(1)+' '+(w*0.6).toFixed(1)+' '+B+' Z';
    const core='M 0 '+(B-2)+' Q '+(w*0.6).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+(L*0.18).toFixed(1)+' '+(B-L*0.82).toFixed(1);
    return eDefs(p,c,o.core)+fGrip(p,{gripLen:24,wrap:o.wrap||'#1f3a2a',gw:11,gruna:o.gruna})
      +eBlade(p,d,c,{core:core,coreW:w*0.7,edge:1.3}); }

  // katana: hafif kavis, kissaki uç, yuvarlak tsuba + uzun sap
  function eKatana(p,o){ const c=o.c,L=o.blLen||156,w=o.blW||8,B=-2,cx=L*0.10;
    const d='M -'+(w*0.45).toFixed(1)+' '+B
      +' Q '+(w*0.15).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+cx.toFixed(1)+' '+(B-L*0.9).toFixed(1)
      +' L '+(cx+w*0.18).toFixed(1)+' '+(B-L).toFixed(1)
      +' L '+(cx-w*1.4).toFixed(1)+' '+(B-L*0.88).toFixed(1)
      +' Q '+(w*1.3).toFixed(1)+' '+(B-L*0.45).toFixed(1)+' '+(w*0.55).toFixed(1)+' '+B+' Z';
    const core='M '+(w*0.05).toFixed(1)+' '+(B-2)+' Q '+(w*0.7).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+cx.toFixed(1)+' '+(B-L*0.86).toFixed(1);
    return eDefs(p,c,o.core)+fGrip(p,{gripLen:30,wrap:o.wrap||'#1c2c3a',tsuba:10,gruna:o.gruna})
      +eBlade(p,d,c,{core:core,coreW:w*0.62,edge:1.2}); }

  // mızrak: uzun sap + kristal yaprak uç
  function eSpear(p,o){ const c=o.c, sh=o.blLen||150, hd=o.head||50, hw=o.blW||9, HT=-2-sh, neck=HT+hd*0.42;
    let s=eDefs(p,c,o.core)+pole(p,{top:neck,gruna:o.gruna});
    s+='<rect x="-4.5" y="'+(neck-3).toFixed(1)+'" width="9" height="9" rx="2" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1"/>';
    const d='M 0 '+neck.toFixed(1)+' Q '+hw+' '+(HT+hd*0.05).toFixed(1)+' '+(hw*0.5).toFixed(1)+' '+(HT-hd*0.2).toFixed(1)+' L 0 '+(HT-hd).toFixed(1)+' L -'+(hw*0.5).toFixed(1)+' '+(HT-hd*0.2).toFixed(1)+' Q -'+hw+' '+(HT+hd*0.05).toFixed(1)+' 0 '+neck.toFixed(1)+' Z';
    s+=eBlade(p,d,c,{core:'M0 '+neck.toFixed(1)+' L0 '+(HT-hd*0.92).toFixed(1),coreW:hw*0.5,edge:1.2});
    return s; }

  // trident: uzun sap + 3 çatal
  function eTrident(p,o){ const c=o.c, sh=o.blLen||150, pl=o.head||42, cw=o.spread||11, HT=-2-sh;
    let s=eDefs(p,c,o.core)+pole(p,{top:HT,gruna:o.gruna});
    s+='<rect x="-'+(cw+3)+'" y="'+(HT-2)+'" width="'+(2*cw+6)+'" height="5" rx="2" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1"/>';
    const prong=(x,len,bend)=>{ const tipx=x+bend; return 'M '+x+' '+HT+' Q '+(x-2.2)+' '+(HT-len*0.5).toFixed(1)+' '+tipx+' '+(HT-len).toFixed(1)+' Q '+(x+2.2)+' '+(HT-len*0.5).toFixed(1)+' '+x+' '+HT+' Z'; };
    s+=eBlade(p,prong(0,pl*1.2,0),c,{core:'M0 '+HT+' L0 '+(HT-pl*1.12).toFixed(1),coreW:2.2,edge:1.1});
    s+=eBlade(p,prong(-cw,pl,-2.5),c,{edge:1});
    s+=eBlade(p,prong(cw,pl,2.5),c,{edge:1});
    return s; }

  // BUSTER: dev levha (referans) — metal yaka + cıvata + sırt çubuğu
  function eBuster(p,o){ const c=o.c,L=o.blLen||182,w=o.blW||22,B=-2;
    const d='M -'+w+' '+B+' L -'+w+' '+(B-L*0.80).toFixed(1)+' L -'+(w*0.14).toFixed(1)+' '+(B-L).toFixed(1)+' L '+w+' '+(B-L*0.58).toFixed(1)+' L '+w+' '+B+' Z';
    let s=eDefs(p,c,o.core)+fGrip(p,{gripLen:30,wrap:o.wrap||'#2a1810',gw:0,gruna:o.gruna});
    s+='<rect x="-'+(w+1)+'" y="'+(B-3)+'" width="'+(2*w+2)+'" height="8" rx="2" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1.2"/>';
    s+='<circle cx="0" cy="'+(B+1)+'" r="4.2" fill="url(#'+p+'st)" stroke="#070a0e" stroke-width="1.1"/>';
    s+=eBlade(p,d,c,{grad:'eb',edge:1.6,core:'M -'+(w*0.34).toFixed(1)+' '+(B-4)+' L -'+(w*0.34).toFixed(1)+' '+(B-L*0.78).toFixed(1),coreW:w*0.48});
    s+='<path d="M '+(w-1.4).toFixed(1)+' '+(B-2)+' L '+(w-1.4).toFixed(1)+' '+(B-L*0.56).toFixed(1)+'" stroke="url(#'+p+'mt)" stroke-width="3" stroke-linecap="round" opacity=".9"/>';
    return s; }

  // rünlü savaş kılıcı: geniş düz enerji kılıç + rünler + haç muhafız
  function eRunedSword(p,o){ const c=o.c,L=o.blLen||150,w=o.blW||12,B=-2;
    const d='M -'+w+' '+B+' L -'+w+' '+(B-L*0.72).toFixed(1)+' L 0 '+(B-L).toFixed(1)+' L '+w+' '+(B-L*0.72).toFixed(1)+' L '+w+' '+B+' Z';
    let s=eDefs(p,c,o.core)+fGrip(p,{gripLen:26,wrap:o.wrap||'#2a1838',gw:15,gruna:o.gruna});
    s+=eBlade(p,d,c,{core:'M0 '+B+' L0 '+(B-L+4).toFixed(1),coreW:w*0.5,edge:1.4});
    if(o.rune) for(let i=1;i<=3;i++){ const yy=(B-L*i/4.2).toFixed(1); s+='<rect x="-2.2" y="'+yy+'" width="4.4" height="4.4" rx=".8" fill="'+o.rune+'" opacity=".95"><animate attributeName="opacity" values=".95;.35;.95" dur="1.6s" begin="'+(i*0.2)+'s" repeatCount="indefinite"/></rect>'; }
    return s; }

  // plazma savaş baltası: uzun sap + tek enerji ağız + tepe enerji çiviler
  function eAxe(p,o){ const c=o.c, sh=o.blLen||120, R=o.head||46, HT=-2-sh, ay=HT+22;
    let s=eDefs(p,c,o.core)+pole(p,{top:HT,gruna:o.gruna});
    s+='<rect x="-4.5" y="'+(ay-2)+'" width="9" height="16" rx="2" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1"/>';
    s+=eBlade(p,'M -2.5 '+ay+' L 0 '+(HT-3).toFixed(1)+' L 2.5 '+ay+' Z',c,{edge:1});
    const bit='M 3 '+(ay+2)+' Q '+(R*1.05).toFixed(1)+' '+(ay-R*0.1).toFixed(1)+' '+(R*0.92).toFixed(1)+' '+(ay-R*0.74).toFixed(1)+' Q '+(R*0.45).toFixed(1)+' '+(ay-R*0.42).toFixed(1)+' 3 '+(ay-R*0.12).toFixed(1)+' Z';
    s+=eBlade(p,bit,c,{grad:'ev',edge:1.3,core:'M 5 '+(ay-R*0.06).toFixed(1)+' Q '+(R*0.66).toFixed(1)+' '+(ay-R*0.32).toFixed(1)+' '+(R*0.9).toFixed(1)+' '+(ay-R*0.68).toFixed(1),coreW:2});
    return s; }

  // çift ağızlı dev balta (altın metal gövde + enerji ağız)
  function eGreataxe(p,o){ const c=o.c, sh=o.blLen||150, R=o.head||44, HT=-2-sh, ay=HT+26;
    let s=eDefs(p,c,o.core)+pole(p,{top:HT,gruna:o.gruna});
    s+=eBlade(p,'M -3 '+ay+' L 0 '+(HT-5).toFixed(1)+' L 3 '+ay+' Z',c,{edge:1.1});
    const bit=(dir)=>'M '+(dir*5)+' '+(ay+1)+' Q '+(dir*R*1.05).toFixed(1)+' '+(ay-R*0.05).toFixed(1)+' '+(dir*R*0.95).toFixed(1)+' '+(ay-R*0.72).toFixed(1)+' Q '+(dir*R*0.5).toFixed(1)+' '+(ay-R*0.46).toFixed(1)+' '+(dir*5)+' '+(ay-R*0.16).toFixed(1)+' Z';
    s+='<rect x="-6" y="'+(ay-3)+'" width="12" height="20" rx="3" fill="url(#'+p+'gd2)" stroke="#3a2a0a" stroke-width="1.2"/>';
    s+='<path d="'+bit(1)+'" fill="url(#'+p+'gd2)" stroke="#3a2a0a" stroke-width="1.1"/>';
    s+='<path d="'+bit(-1)+'" fill="url(#'+p+'gd2)" stroke="#3a2a0a" stroke-width="1.1"/>';
    s+=eEdge(p,'M '+(R*0.95).toFixed(1)+' '+(ay-R*0.72).toFixed(1)+' Q '+(R*1.16).toFixed(1)+' '+(ay-R*0.35).toFixed(1)+' '+(R*1.0).toFixed(1)+' '+(ay-R*0.02).toFixed(1),c,2.4);
    s+=eEdge(p,'M -'+(R*0.95).toFixed(1)+' '+(ay-R*0.72).toFixed(1)+' Q -'+(R*1.16).toFixed(1)+' '+(ay-R*0.35).toFixed(1)+' -'+(R*1.0).toFixed(1)+' '+(ay-R*0.02).toFixed(1),c,2.4);
    return s; }

  // NOVA GREATSWORD: dev çift ağızlı enerji pala + kanatlı enerji muhafız (ultimate)
  function eNovaGreat(p,o){ const c=o.c, L=o.blLen||206, w=o.blW||20, B=-2, G=o.guard||30;
    const d='M -'+w+' '+B+' L -'+(w*0.94).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' L -'+(w*0.52).toFixed(1)+' '+(B-L*0.86).toFixed(1)+' L 0 '+(B-L)+' L '+(w*0.52).toFixed(1)+' '+(B-L*0.86).toFixed(1)+' L '+(w*0.94).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' L '+w+' '+B+' Z';
    let s=eDefs(p,c,o.core)+fGrip(p,{gripLen:34,wrap:o.wrap||'#2a0e16',gw:0,gruna:o.gruna});
    s+='<rect x="-'+(w+2)+'" y="'+(B-2)+'" width="'+(2*w+4)+'" height="7" rx="2" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1.1"/>';
    s+='<path d="M-4 '+B+' L-'+G+' '+(B-7)+' L-'+(G-3)+' '+(B+4)+' L-4 '+(B+5)+' Z" fill="url(#'+p+'eb)" stroke="'+c+'" stroke-width=".6" opacity=".92"/>';
    s+='<path d="M4 '+B+' L'+G+' '+(B-7)+' L'+(G-3)+' '+(B+4)+' L4 '+(B+5)+' Z" fill="url(#'+p+'eb)" stroke="'+c+'" stroke-width=".6" opacity=".92"/>';
    s+=eBlade(p,d,c,{grad:'ev',edge:1.7,core:'M0 '+(B-5)+' L0 '+(B-L+6).toFixed(1),coreW:w*0.4});
    s+=eEdge(p,'M -'+(w*0.94).toFixed(1)+' '+(B-4)+' L -'+(w*0.52).toFixed(1)+' '+(B-L*0.86).toFixed(1)+' L 0 '+(B-L+4).toFixed(1),c,1.5);
    s+=eEdge(p,'M '+(w*0.94).toFixed(1)+' '+(B-4)+' L '+(w*0.52).toFixed(1)+' '+(B-L*0.86).toFixed(1)+' L 0 '+(B-L+4).toFixed(1),c,1.5);
    return s; }

  // ikiz hançer: çapraz iki kısa hançer
  function eTwinDagger(p,o){ const c=o.c, L=o.blLen||96, w=o.blW||9, B=-2;
    const d='M -'+w+' '+B+' L -'+(w*0.7).toFixed(1)+' '+(B-L*0.6).toFixed(1)+' L 0 '+(B-L)+' L '+(w*0.7).toFixed(1)+' '+(B-L*0.6).toFixed(1)+' L '+w+' '+B+' Z';
    const one=()=>fGrip(p,{gripLen:16,wrap:o.wrap||'#1c1238',gw:10,gruna:o.gruna})+eBlade(p,d,c,{core:'M0 '+B+' L0 '+(B-L+3).toFixed(1),coreW:w*0.5,edge:1.3});
    return eDefs(p,c,o.core)+'<g transform="rotate(-10) translate(-4 2)">'+one()+'</g><g transform="rotate(10) translate(4 2)">'+one()+'</g>'; }

  // tırpan (yeniden tasarım): metal sap + boyun + dolgun süpüren enerji hilal
  function eScythe(p,o){ const c=o.c, R=o.head||78, shaft=o.shaft||112, HT=-2-shaft, ex=R*0.30, ey=HT-R*0.16;
    let s=eDefs(p,c,o.core)+pole(p,{top:HT,gruna:o.gruna});
    s+='<path d="M0 '+HT+' Q '+(R*0.28).toFixed(1)+' '+(HT-3)+' '+ex.toFixed(1)+' '+ey.toFixed(1)+'" stroke="url(#'+p+'mt)" stroke-width="4.5" fill="none" stroke-linecap="round"/>';
    s+='<circle cx="0" cy="'+HT+'" r="4.5" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1.1"/>';
    const d='M '+ex.toFixed(1)+' '+ey.toFixed(1)
      +' Q '+(R*0.95).toFixed(1)+' '+(ey-R*0.2).toFixed(1)+' '+(R*0.92).toFixed(1)+' '+(ey-R*0.66).toFixed(1)
      +' Q '+(R*0.86).toFixed(1)+' '+(ey-R*0.92).toFixed(1)+' '+(R*0.55).toFixed(1)+' '+(ey-R*0.98).toFixed(1)
      +' Q '+(R*0.7).toFixed(1)+' '+(ey-R*0.5).toFixed(1)+' '+(ex+2).toFixed(1)+' '+(ey-R*0.06).toFixed(1)+' Z';
    s+=eBlade(p,d,c,{grad:'ev',edge:1.3,core:'M '+(ex+2).toFixed(1)+' '+(ey-R*0.04).toFixed(1)+' Q '+(R*0.62).toFixed(1)+' '+(ey-R*0.42).toFixed(1)+' '+(R*0.52).toFixed(1)+' '+(ey-R*0.9).toFixed(1),coreW:2.4});
    if(o.blackhole){ const bx=(R*0.55).toFixed(1), by=(ey-R*0.98).toFixed(1);
      s+='<g transform="translate('+bx+' '+by+')"><circle r="7" fill="#08040f"/><circle r="7" fill="none" stroke="'+c+'" stroke-width="2"><animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.2;.9" dur="2s" repeatCount="indefinite"/></circle><circle r="4" fill="none" stroke="#fff" stroke-width="1"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite"/></circle></g>'; }
    return s; }

  // ortalı + çapraz kart yerleşimi
  function lsCard(p, drawFn, span, rot){
    const cy=(span.top+span.bottom)/2, H=span.bottom-span.top, s=(118/H);
    rot=(rot==null?-30:rot);
    return '<g transform="translate(200 70) rotate('+rot+') scale('+s.toFixed(3)+')"><g transform="translate(0 '+(-cy).toFixed(1)+')">'+drawFn(p)+'</g></g>';
  }

  /* ===================== KORUNAN DÖVME ŞEKİLLER (çekiç/glaive/ikiz) ===================== */
  function wdefs(p, c, core){
    return '<defs>'
      + '<linearGradient id="'+p+'bl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="'+c+'" stop-opacity=".5"/><stop offset=".5" stop-color="'+(core||'#ffffff')+'"/><stop offset="1" stop-color="'+c+'"/></linearGradient>'
      + '<linearGradient id="'+p+'mt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfd6e2"/><stop offset=".5" stop-color="#5a6272"/><stop offset="1" stop-color="#2a303c"/></linearGradient>'
      + '<linearGradient id="'+p+'hf" x1="-1" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0e1016"/><stop offset=".5" stop-color="#39414e"/><stop offset="1" stop-color="#0b0d12"/></linearGradient>'
      + '<linearGradient id="'+p+'gd2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#b8862a"/><stop offset="1" stop-color="#5a3e10"/></linearGradient>'
      + A.energy(p+'au', c, '#ffffff') + A.bloom(p+'bl2', 3) + A.bloom(p+'bl1', 1.6)
      + '</defs>';
  }
  function grip(p, len, wrapCol, pomCol, runes){
    let g='<rect x="-3.4" y="0" width="6.8" height="'+len+'" rx="2.2" fill="'+(wrapCol||'#3a2e22')+'" stroke="#1c1610" stroke-width="1"/>';
    for(let i=6;i<len-4;i+=6) g+='<path d="M-3.4 '+i+' l6.8 2" stroke="#1c1610" stroke-width="1.2" opacity=".6"/>';
    if(runes) for(let i=8;i<len-6;i+=10) g+='<rect x="-1.4" y="'+i+'" width="2.8" height="2.8" fill="'+runes+'" opacity=".85"><animate attributeName="opacity" values=".85;.3;.85" dur="1.6s" begin="'+(i*0.05).toFixed(1)+'s" repeatCount="indefinite"/></rect>';
    g+='<ellipse cx="0" cy="'+(len+3)+'" rx="6.5" ry="6.5" fill="url(#'+p+'gd2)" stroke="#1c1610" stroke-width="1"/>';
    if(pomCol) g+='<circle cx="0" cy="'+(len+3)+'" r="3" fill="'+pomCol+'"><animate attributeName="opacity" values="1;.5;1" dur="1.8s" repeatCount="indefinite"/></circle>';
    return g;
  }
  function haft(p, topY, rune){
    const total = 18 - topY;
    let s='<rect x="-3.6" y="'+topY+'" width="7.2" height="'+total.toFixed(1)+'" rx="3" fill="url(#'+p+'hf)" stroke="#070a0e" stroke-width="1"/>'
      +'<rect x="-3.4" y="'+topY+'" width="2.2" height="'+total.toFixed(1)+'" fill="#fff" opacity=".06"/>';
    for(let y=topY+16; y<8; y+=30){
      s+='<rect x="-5.2" y="'+y.toFixed(1)+'" width="10.4" height="5.2" rx="2" fill="#262b35" stroke="#070a0e" stroke-width=".9"/>';
      if(rune) s+='<rect x="-1.3" y="'+(y+1.4).toFixed(1)+'" width="2.6" height="2.6" rx=".6" fill="'+rune+'"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" begin="'+(Math.abs(y)*0.012).toFixed(2)+'s" repeatCount="indefinite"/></rect>';
    }
    s+='<path d="M-4.5 12 L0 24 L4.5 12 Z" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1"/>';
    return s;
  }
  function aura(p, len, w, c, lvl){
    if(!lvl) return '';
    let s='';
    if(lvl>=1) s+='<path d="M0 0 L-'+(w+3)+' -'+(len*0.4)+' L0 -'+len+' L'+(w+3)+' -'+(len*0.4)+' Z" fill="'+c+'" opacity=".22" filter="url(#'+p+'bl2)"/>';
    if(lvl>=2) s+='<ellipse cx="0" cy="-'+(len*0.6)+'" rx="'+(w+10)+'" ry="'+(len*0.55)+'" fill="url(#'+p+'au)" opacity=".38"/>';
    if(lvl>=3){ const r=rng(len*7); for(let i=0;i<14;i++){ const yy=(r()*len).toFixed(0), xx=((r()-0.5)*w*3).toFixed(0), d=(1.4+r()*1.6).toFixed(1);
      s+='<circle cx="'+xx+'" cy="-'+yy+'" r="'+(0.8+r()*1.4).toFixed(2)+'" fill="'+(r()<0.5?c:'#ffffff')+'"><animate attributeName="cy" values="-'+yy+';-'+(parseFloat(yy)+30).toFixed(0)+'" dur="'+d+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="'+d+'s" repeatCount="indefinite"/></circle>'; } }
    return s;
  }
  function bTwin(p,c,len,w){ return ''
    +'<g transform="rotate(-9)">'+bSword(p,c,len,w)+'</g>'
    +'<g transform="rotate(9) translate(8 4)">'+bSword(p,c,len*0.92,w*0.85)+'</g>'; }
  function bSword(p,c,len,w){ return ''
    +'<path d="M-'+w+' -14 L0 -'+len+' L'+w+' -14 L'+(w-2)+' -2 L-'+(w-2)+' -2 Z" fill="url(#'+p+'bl)" stroke="#0c0e16" stroke-width="1.4"/>'
    +'<path d="M0 -16 L0 -'+(len-6)+'" stroke="#fff" stroke-width="1.4" opacity=".7"/>'
    +'<path d="M-'+w+' -14 L-1.5 -'+(len-10)+' L-1.5 -14 Z" fill="#fff" opacity=".18"/>'; }
  function bGlaive(p,c,len,w,rune){ const topY=-(len*0.5);
    return haft(p,topY,rune)
      +'<g transform="translate(0 '+topY+')"><rect x="-5" y="-4" width="10" height="12" rx="3" fill="url(#'+p+'mt)" stroke="#0c0e16" stroke-width="1"/>'
      +'<g filter="url(#'+p+'bl1)">'
      +'<path d="M-2 -2 Q-'+(w-2)+' -'+(len*0.22)+' -1 -'+(len*0.5)+' Q'+(w+10)+' -'+(len*0.46)+' '+(w+6)+' -'+(len*0.14)+' Q'+w+' -'+(len*0.16)+' 2 -2 Z" fill="url(#'+p+'bl)" stroke="#0c0e16" stroke-width="1.3"/>'
      +'<path d="M-1 -'+(len*0.46)+' Q'+(w+4)+' -'+(len*0.42)+' '+(w+2)+' -'+(len*0.16)+'" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8"/>'
      +'<path d="M0 -6 Q4 -'+(len*0.28)+' -1 -'+(len*0.46)+'" stroke="#fff" stroke-width="1" fill="none" opacity=".5"/>'
      +'</g></g>'; }
  function bHammer(p,c,len,w,rune){ const topY=-(len*0.62);
    let s='<rect x="-4.6" y="'+topY+'" width="9.2" height="'+(18-topY).toFixed(1)+'" rx="3.5" fill="url(#'+p+'hf)" stroke="#070a0e" stroke-width="1"/>';
    for(let y=topY+18; y<8; y+=30) s+='<rect x="-6" y="'+y.toFixed(1)+'" width="12" height="5.4" rx="2" fill="#262b35" stroke="#070a0e" stroke-width=".9"/>'+(rune?'<rect x="-1.4" y="'+(y+1.4).toFixed(1)+'" width="2.8" height="2.8" fill="'+rune+'"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite"/></rect>':'');
    s+='<path d="M-5 12 L0 24 L5 12 Z" fill="url(#'+p+'mt)" stroke="#070a0e" stroke-width="1"/>';
    s+='<g transform="translate(0 '+topY+')">'
      +'<rect x="-'+(w+12)+'" y="-16" width="'+(w*2+24)+'" height="32" rx="6" fill="url(#'+p+'mt)" stroke="#0c0e16" stroke-width="1.6"/>'
      +'<rect x="-'+(w+12)+'" y="-16" width="9" height="32" fill="#fff" opacity=".16"/>'
      +'<rect x="-'+(w+4)+'" y="-10" width="'+(w*2+8)+'" height="20" rx="3" fill="#0c1016"/>'
      +'<circle cx="0" cy="0" r="8" fill="url(#'+p+'au)"/><circle cx="0" cy="0" r="4.6" fill="'+c+'" filter="url(#'+p+'bl1)"><animate attributeName="r" values="4.6;3;4.6" dur="1.3s" repeatCount="indefinite"/></circle>'
      +(rune?'<rect x="-'+(w+2)+'" y="-7" width="3" height="3" fill="'+rune+'"/><rect x="'+(w-1)+'" y="4" width="3" height="3" fill="'+rune+'"/>':'')
      +'</g>';
    return s; }
  function gem(p,col){ return '<circle cx="0" cy="-1" r="3.4" fill="'+col+'" stroke="#fff" stroke-width=".6"><animate attributeName="opacity" values="1;.5;1" dur="1.6s" repeatCount="indefinite"/></circle>'; }
  function frame(p, bgStr, c, core, shapeFn, cfg){
    const len=cfg.len, w=cfg.w, gl=cfg.gl||44, rot=cfg.rot!=null?cfg.rot:-30;
    let inner = aura(p,len,w,c,cfg.aura);
    if(!cfg.polearm){
      inner += grip(p, gl, cfg.wrap, cfg.pom, cfg.gruna)
        + (cfg.guard!==false ? '<path d="M-'+(cfg.gw||14)+' -2 Q0 -10 '+(cfg.gw||14)+' -2 L'+((cfg.gw||14)-3)+' 6 Q0 0 -'+((cfg.gw||14)-3)+' 6 Z" fill="url(#'+p+'gd2)" stroke="#1c1610" stroke-width="1.2"/>' : '')
        + (cfg.glowBlade===false ? shapeFn(p,c,len,w,cfg.gruna) : '<g filter="url(#'+p+'bl1)">'+shapeFn(p,c,len,w,cfg.gruna)+'</g>');
    } else { inner += shapeFn(p,c,len,w,cfg.gruna); }
    inner += (cfg.extra?cfg.extra(p,len,w,c):'');
    const topAbs = cfg.polearm? len*1.04 : len+14, botAbs = cfg.polearm? 26 : gl+10;
    const cy=(-topAbs+botAbs)/2, H=topAbs+botAbs, s=118/H;
    return bgStr + wdefs(p,c,core) + '<g transform="translate(200 70) rotate('+rot+') scale('+s.toFixed(3)+')"><g transform="translate(0 '+(-cy).toFixed(1)+')">'+inner+'</g></g>';
  }

  /* ===================== 20 SİLAH ===================== */
  const sp=(top,bottom)=>({top:top,bottom:bottom});

  window.NB2_WEAPONS = [
    // —— SIRADAN ——
    {n:'Apprentice Light Blade', tier:'Common', power:1, c:'#4db8ff', fx:'+8% tap damage',
     build:p=>bg(p,'#2e6ad8','#10203a',{glow:.32,stars:1})+lsCard(p,q=>lsSaber(q,{c:'#4db8ff',core:'#eaf6ff',blLen:150,blW:10,hiltLen:30,emitter:'flared',led:'#9fd8ff',anim:1,seed:11}),sp(-166,22),-30)},
    {n:'Sentinel Saber', tier:'Common', power:2, c:'#6ad0ff', fx:'+4% crit chance',
     build:p=>bg(p,'#357fd8','#10203a',{glow:.34,stars:2})+lsCard(p,q=>lsTsuba(q,{c:'#6ad0ff',core:'#ffffff',blLen:168,blW:11,hiltLen:32,tsuba:13,ornate:1,accent:'gd',emitter:'flared',led:'#6ad0ff',anim:1,seed:22}),sp(-186,24),-30)},
    // —— GELİŞMİŞ ——
    {n:'Verdant Shoto', tier:'Advanced', power:3, c:'#54e08a', fx:'+8% attack speed',
     build:p=>bg(p,'#2ea86a','#16301f',{glow:.32})+lsCard(p,q=>eShoto(q,{c:'#54e08a',core:'#eafff0',blLen:84,blW:12,gruna:'#aaffc4'}),sp(-92,30),-28)},
    {n:'Forest War Axe', tier:'Advanced', power:4, c:'#7bffb6', fx:'+10% area (shock) damage',
     build:p=>bg(p,'#2ea86a','#16301f',{glow:.34})+lsCard(p,q=>eAxe(q,{c:'#7bffb6',core:'#f2fff6',blLen:120,head:46,gruna:'#aef0c8'}),sp(-128,26),-26)},
    {n:'Emerald Scimitar', tier:'Advanced', power:5, c:'#54e08a', fx:'Bleed: 20% of tap damage over 3s',
     build:p=>bg(p,'#2ea86a','#16301f',{glow:.36,embers:5,ember:'#7dffb0'})+lsCard(p,q=>eScimitar(q,{c:'#54e08a',core:'#eafff0',blLen:150,blW:9,gruna:'#aef0c8'}),sp(-158,30),-30)},
    // —— NADİR ——
    {n:'Frost Spear', tier:'Rare', power:6, c:'#8fc6ff', fx:'8% stun chance',
     build:p=>bg(p,'#3a7ad8','#142a4a',{glow:.36,stars:6})+lsCard(p,q=>eSpear(q,{c:'#8fc6ff',core:'#eaf4ff',blLen:150,head:50,blW:9,gruna:'#bfe0ff'}),sp(-208,28),-32)},
    {n:'Ocean Katana', tier:'Rare', power:7, c:'#7fc8ff', fx:'+12% passive DPS',
     build:p=>bg(p,'#2e8ad8','#142a4a',{glow:.38,stars:7})+lsCard(p,q=>eKatana(q,{c:'#7fc8ff',core:'#ffffff',blLen:158,blW:8,gruna:'#bfe6ff'}),sp(-166,32),-30)},
    {n:'Storm Crossguard Saber', tier:'Rare', power:8, c:'#6ad0ff', fx:'+12% ally hero damage',
     build:p=>bg(p,'#3a6ad8','#101e3a',{glow:.4,stars:8})+lsCard(p,q=>lsCross(q,{c:'#6ad0ff',core:'#ffffff',blLen:150,blW:10,hiltLen:30,w:12,qb:34,ornate:1,led:'#6ad0ff',seed:88}),sp(-167,21),-30)},
    // —— EPİK ——
    {n:'Amethyst Saberstaff', tier:'Epic', power:9, c:'#c89bff', fx:'Armor pierce: +10% all damage',
     build:p=>bg(p,'#7a3ad8','#1e1040',{glow:.4,stars:9})+lsCard(p,q=>lsSaberstaff(q,{c:'#c89bff',core:'#ffffff',blLen:150,blW:9,hiltLen:44,w:11,ornate:2,accent:'gd',led:'#c89bff',anim:2,seed:99}),sp(-174,174),-20)},
    {n:'Light Scythe: Void', tier:'Epic', power:10, c:'#b86bff', fx:'+12% area (harvest) damage',
     build:p=>bg(p,'#6a2ad8','#16082e',{glow:.42,stars:10})+lsCard(p,q=>eScythe(q,{c:'#b86bff',core:'#f0e0ff',shaft:112,head:78,gruna:'#d9b8ff'}),sp(-198,28),-26)},
    {n:'Runed War Sword', tier:'Epic', power:11, c:'#b86bff', fx:'Combo target −8',
     build:p=>bg(p,'#7a2ad8','#1a0a30',{glow:.44,embers:11,ember:'#c89bff'})+lsCard(p,q=>eRunedSword(q,{c:'#b86bff',core:'#f0e0ff',blLen:148,blW:12,rune:'#e3ccff',gruna:'#e3ccff'}),sp(-156,30),-30)},
    {n:'Violet Lightning Trident', tier:'Epic', power:12, c:'#c89bff', fx:'+35% crit damage',
     build:p=>bg(p,'#7a3ad8','#1a0a36',{glow:.46,stars:12})+lsCard(p,q=>eTrident(q,{c:'#c89bff',core:'#ffffff',blLen:150,head:44,spread:11,gruna:'#d9b8ff'}),sp(-208,28),-32)},
    // —— EFSANEVİ ——
    {n:'Dragon Ember Blade', tier:'Legendary', power:13, c:'#ff7a3a', fx:'+30% boss damage · −12% attack speed',
     build:p=>bg(p,'#d8521a','#2a0c08',{glow:.5,embers:13,ember:'#ff8a3a'})+lsCard(p,q=>eBuster(q,{c:'#ff7a3a',core:'#fff0c0',blLen:182,blW:22,gruna:'#ffcf6a'}),sp(-190,36),-30)},
    {n:'Sunfire War Hammer', tier:'Legendary', power:14, c:'#ffb24a', fx:'+12% gold income',
     build:p=>frame(p, bg(p,'#e0901a','#2a1a08',{glow:.5,embers:14,ember:'#ffd24a'}), '#ffd24a','#fff6d0', bHammer,
       {len:188,w:22,aura:3,polearm:true,gruna:'#ffe9a0'})},
    {n:'Phoenix Glaive', tier:'Legendary', power:15, c:'#ff7a2a', fx:'+18% Force XP gain',
     build:p=>frame(p, bg(p,'#e0661a','#2a0e08',{glow:.54,embers:15,ember:'#ffae3a'}), '#ff9a3a','#fff0c0', bGlaive,
       {len:206,w:18,aura:3,polearm:true,gruna:'#ffd24a',
        extra:(p,len,w)=>A.rise(p+'fz',15,9,-w*2,w*2,-len,-len*0.3,'#ffae3a',1.6,1.6)})},
    {n:'Golden Emperor Axe', tier:'Legendary', power:16, c:'#ffe07a', fx:'+15% area damage · +10% gold',
     build:p=>bg(p,'#e0a81a','#2a1e08',{glow:.56,stars:16,embers:16,ember:'#ffe9a0'})+lsCard(p,q=>eGreataxe(q,{c:'#ffe07a',core:'#fffae0',blLen:150,head:44,gruna:'#fff0b8'}),sp(-160,28),-28)},
    // —— MİTİK ——
    {n:'Cosmic Twin Daggers', tier:'Mythic', power:17, c:'#c89bff', fx:'Double strike: left + right, 55% damage each',
     build:p=>bg(p,'#7a4ad8','#0e0826',{glow:.6,stars:17})+lsCard(p,q=>eTwinDagger(q,{c:'#c89bff',core:'#ffffff',blLen:96,blW:9,gruna:'#ff9af0'}),sp(-104,26),-26)},
    {n:'Starkiller Twin Blades', tier:'Mythic', power:18, c:'#ff3145', fx:'+18% attack speed (dual grip)',
     build:p=>frame(p, bg(p,'#a02a5a','#1a0820',{glow:.6,stars:18,embers:18,ember:'#ff5a8a'}), '#ff5a7a','#ffffff', bTwin,
       {len:170,w:11,gl:46,wrap:'#1e1020',aura:3,gw:16,gruna:'#ff9ab0'})},
    {n:'Light Scythe: Black Hole', tier:'Mythic', power:19, c:'#9b6bff', fx:'+3% ALL stats',
     build:p=>bg(p,'#5a3ad8','#080614',{glow:.6,stars:19})+lsCard(p,q=>eScythe(q,{c:'#9b6bff',core:'#ffffff',shaft:104,head:74,blackhole:true,gruna:'#c89bff'}),sp(-192,28),-26)},
    {n:'NOVA SABER · Infinity', tier:'Mythic', power:20, c:'#ff3b4d', fx:'+4% ALL stats (peak)',
     build:p=>bg(p,'#b83a6a','#0a0618',{glow:.7,stars:20,embers:20,ember:'#ff9af0'})+lsCard(p,q=>eNovaGreat(q,{c:'#ff3b4d',core:'#ffffff',blLen:212,blW:21,guard:32,gruna:'#ff9af0'}),sp(-220,40),-26)}
  ];

  /* ===================== KAHRAMAN ELİNDEKİ SİLAH ===================== */
  const HERO = [
    {draw:p=>lsSaber(p,{c:'#4db8ff',core:'#eaf6ff',blLen:150,blW:10,hiltLen:30,emitter:'flared',led:'#9fd8ff',anim:1,seed:11}), top:-166},
    {draw:p=>lsTsuba(p,{c:'#6ad0ff',core:'#ffffff',blLen:168,blW:11,hiltLen:32,tsuba:13,ornate:1,accent:'gd',emitter:'flared',led:'#6ad0ff',anim:1,seed:22}), top:-186},
    {draw:p=>eShoto(p,{c:'#54e08a',core:'#eafff0',blLen:84,blW:12,gruna:'#aaffc4'}), top:-92, hand:9},
    {draw:p=>eAxe(p,{c:'#7bffb6',core:'#f2fff6',blLen:120,head:46,gruna:'#aef0c8'}), top:-128},
    {draw:p=>eScimitar(p,{c:'#54e08a',core:'#eafff0',blLen:150,blW:9,gruna:'#aef0c8'}), top:-158, hand:11},
    {draw:p=>eSpear(p,{c:'#8fc6ff',core:'#eaf4ff',blLen:150,head:50,blW:9,gruna:'#bfe0ff'}), top:-208},
    {draw:p=>eKatana(p,{c:'#7fc8ff',core:'#ffffff',blLen:158,blW:8,gruna:'#bfe6ff'}), top:-166, hand:14},
    {draw:p=>lsCross(p,{c:'#6ad0ff',core:'#ffffff',blLen:150,blW:10,hiltLen:30,w:12,qb:34,ornate:1,led:'#6ad0ff',seed:88}), top:-167},
    {draw:p=>lsSaberstaff(p,{c:'#c89bff',core:'#ffffff',blLen:150,blW:9,hiltLen:44,w:11,ornate:2,accent:'gd',led:'#c89bff',anim:2,seed:99}), top:-174},
    {draw:p=>eScythe(p,{c:'#b86bff',core:'#f0e0ff',shaft:112,head:78,gruna:'#d9b8ff'}), top:-198},
    {draw:p=>eRunedSword(p,{c:'#b86bff',core:'#f0e0ff',blLen:148,blW:12,rune:'#e3ccff',gruna:'#e3ccff'}), top:-156, hand:12},
    {draw:p=>eTrident(p,{c:'#c89bff',core:'#ffffff',blLen:150,head:44,spread:11,gruna:'#d9b8ff'}), top:-208},
    {draw:p=>eBuster(p,{c:'#ff7a3a',core:'#fff0c0',blLen:182,blW:22,gruna:'#ffcf6a'}), top:-190, hand:14},
    {s:bHammer, c:'#ffd24a', core:'#fff6d0', len:188, w:22, pole:1, rune:'#ffe9a0'},
    {s:bGlaive, c:'#ff9a3a', core:'#fff0c0', len:206, w:18, pole:1, rune:'#ffd24a'},
    {draw:p=>eGreataxe(p,{c:'#ffe07a',core:'#fffae0',blLen:150,head:44,gruna:'#fff0b8'}), top:-160},
    {draw:p=>eTwinDagger(p,{c:'#c89bff',core:'#ffffff',blLen:96,blW:9,gruna:'#ff9af0'}), top:-104, hand:6},
    {s:bTwin,   c:'#ff5a7a', core:'#ffffff', len:170, w:11, gl:46, gw:16, wrap:'#1e1020', rune:'#ff9ab0'},
    {draw:p=>eScythe(p,{c:'#9b6bff',core:'#ffffff',shaft:104,head:74,blackhole:true,gruna:'#c89bff'}), top:-192},
    {draw:p=>eNovaGreat(p,{c:'#ff3b4d',core:'#ffffff',blLen:212,blW:21,guard:32,gruna:'#ff9af0'}), top:-220}
  ];

  /* kavrama tipi: 'one' tek el, 'two' iki el (uzun sap), 'twin' çift silah */
  window.NB2_WEAPON_GRIP = ['one','one','one','two','one','two','one','one','one','two','one','two','two','two','two','two','twin','twin','two','two'];

  window.NB2_heroBlade = function(i, scale, uid){
    const d = HERO[i] || HERO[0];
    const p = 'nbh'+(uid||('i'+i))+'_';
    const pow = i+1;
    const grip2 = (window.NB2_WEAPON_GRIP||[])[i]||'one';
    const reach = grip2==='two' ? 1.5 : 1;   // iki elli silahlar ekranda daha uzun
    let inner, top, hand=0;
    if(d.draw){ inner = d.draw(p); top = d.top; hand = d.hand||0; }
    else {
      const gl = d.gl||42;
      inner = wdefs(p, d.c, d.core)
        + (d.pole ? d.s(p,d.c,d.len,d.w,d.rune)
          : grip(p, gl, d.wrap||'#2a221a', null, d.rune)
            + (d.gw ? '<path d="M-'+d.gw+' -2 Q0 -10 '+d.gw+' -2 L'+(d.gw-3)+' 6 Q0 0 -'+(d.gw-3)+' 6 Z" fill="url(#'+p+'gd2)" stroke="#1c1610" stroke-width="1.2"/>' : '')
            + '<g filter="url(#'+p+'bl1)">'+d.s(p,d.c,d.len,d.w,d.rune)+'</g>');
      top = -(d.len + (d.pole? d.len*0.04 : 14));
      hand = d.pole ? 0 : gl*0.4;   // dövme kılıçlarda yumruk kabzanın ortasına otursun
    }
    const k = ((60 + pow*1.05)*reach/Math.abs(top)) * (scale||1);
    return '<g transform="scale('+k.toFixed(3)+')"><g transform="translate(0 '+(-hand).toFixed(1)+')">'+inner+'</g></g>';
  };
})();
