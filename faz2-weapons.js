/* ===========================================================================
   NOVA BLADE · FAZ 2 — 20 IŞIN KILICI · v5 (TAP TITANS × STAR WARS sentezi)
   • Star Wars işçiliği: detaylı ışın kılıcı kabzaları — emitter shroud, kontrol
     kutusu + aktivasyon düğmesi + LED, kyber kristal penceresi, işlenmiş halkalar,
     havalandırma kanatları, pommel kapağı, sarılı tutamak.
   • Tap Titans hazine hissi: kanatlı muhafızlar, pençe/dragon emitter, taç
     uçları, mücevher yuvaları, rünler, altın kakma — her kılıç bir koleksiyon.
   • Her kılıç KENDİ Star Wars kimliğine eşlenir (renkler SWORDS dizisiyle birebir):
     Darksaber, Dooku eğri kabza, Inquisitor dönen kılıç, Maul çift saber, vb.
   • Kanonik yön: el = origin (0,0), bıçak yukarı (-Y). Aynı çizim hem galeride
     hem kahramanın elinde (NB2_heroBlade) kullanılır.
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

  /* ===================== ORTAK DEFS (metal + enerji) ===================== */
  function defs(p,c,core,acc){ core=core||'#ffffff'; acc=acc||c;
    return '<defs>'
      // krom çelik gövde (dikey speküler)
      +'<linearGradient id="'+p+'st" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#090c12"/><stop offset=".18" stop-color="#454d5b"/><stop offset=".42" stop-color="#c2cdda"/><stop offset=".58" stop-color="#e8eef6"/><stop offset=".78" stop-color="#3a414e"/><stop offset="1" stop-color="#070a0e"/></linearGradient>'
      // koyu metal (kontrol kutusu / gölge parçalar)
      +'<linearGradient id="'+p+'dk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#04060a"/><stop offset=".5" stop-color="#2e353f"/><stop offset="1" stop-color="#04060a"/></linearGradient>'
      // altın kakma
      +'<linearGradient id="'+p+'gd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3e10"/><stop offset=".3" stop-color="#ffe6a0"/><stop offset=".55" stop-color="#b8862a"/><stop offset="1" stop-color="#4a3208"/></linearGradient>'
      +'<linearGradient id="'+p+'gd2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#b8862a"/><stop offset="1" stop-color="#5a3e10"/></linearGradient>'
      // aksan (bıçak rengiyle metalize muhafız/kakma)
      +'<linearGradient id="'+p+'ac" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+acc+'" stop-opacity=".3"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="'+acc+'" stop-opacity=".3"/></linearGradient>'
      +'<linearGradient id="'+p+'ac2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="'+acc+'"/><stop offset="1" stop-color="'+acc+'" stop-opacity=".4"/></linearGradient>'
      // enerji bıçak: yatay (genişlik) ve dikey (uzunluk) çekirdek hatları
      +'<linearGradient id="'+p+'eb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+c+'" stop-opacity=".34"/><stop offset=".5" stop-color="'+core+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".34"/></linearGradient>'
      +'<linearGradient id="'+p+'ev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c+'" stop-opacity=".30"/><stop offset=".5" stop-color="'+core+'"/><stop offset="1" stop-color="'+c+'" stop-opacity=".30"/></linearGradient>'
      + A.energy(p+'rg', c, core) + A.bloom(p+'b2', 3.4) + A.bloom(p+'b1', 1.5)
      +'</defs>';
  }
  const HUM='<animateTransform attributeName="transform" type="scale" values="1 1;1 1.012;1 .997;1 1" dur="2.6s" repeatCount="indefinite" additive="sum"/>';

  /* ===================== METAL KABZA PARÇA SETİ ===================== */
  // yatay işlenmiş halka (rounded rect bant)
  function ring(p,cy,hw,h,fill){ return '<rect x="-'+(hw).toFixed(1)+'" y="'+(cy-h/2).toFixed(1)+'" width="'+(hw*2).toFixed(1)+'" height="'+h+'" rx="'+(h*0.45).toFixed(1)+'" fill="'+(fill||('url(#'+p+'st)'))+'" stroke="#04060a" stroke-width=".8"/>'
    +'<rect x="-'+(hw).toFixed(1)+'" y="'+(cy-h/2).toFixed(1)+'" width="'+(hw*2).toFixed(1)+'" height="'+(h*0.34).toFixed(1)+'" rx="'+(h*0.3).toFixed(1)+'" fill="#fff" opacity=".18"/>'; }

  // pommel kapağı (alt) — origin altı, +y
  function pommel(p,y,w,o){ o=o||{}; const h=w/2;
    let s='<path d="M-'+(h-1)+' '+(y-2)+' Q-'+(h+1.5)+' '+(y+7)+' 0 '+(y+8)+' Q'+(h+1.5)+' '+(y+7)+' '+(h-1)+' '+(y-2)+' Z" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>';
    s+='<ellipse cx="0" cy="'+(y+0.5)+'" rx="'+(h+1)+'" ry="2.4" fill="url(#'+p+(o.acc||'gd')+')" stroke="#04060a" stroke-width=".7"/>';
    if(o.gem) s+='<circle cx="0" cy="'+(y+5)+'" r="'+(o.gemR||2.6)+'" fill="'+o.gem+'" stroke="#fff" stroke-width=".5"><animate attributeName="opacity" values="1;.45;1" dur="1.8s" repeatCount="indefinite"/></circle>';
    return s;
  }

  // ana tutamak gövdesi: çelik silindir + ribbed bantlar + kontrol kutusu + LED + kyber penceresi
  function grip(p,top,bot,w,c,o){ o=o||{}; const h=w/2, H=bot-top;
    let s='<rect x="-'+h+'" y="'+top+'" width="'+w+'" height="'+H+'" rx="2.2" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>';
    s+='<rect x="-'+(h-1.2)+'" y="'+(top+1)+'" width="1.6" height="'+(H-2)+'" fill="#fff" opacity=".22"/>';
    s+='<rect x="'+(h-2)+'" y="'+(top+1)+'" width="1.6" height="'+(H-2)+'" fill="#000" opacity=".3"/>';
    // ribbed işleme bantları (üst ve alt bölgede)
    if(o.ribs!==false){ for(let y=top+3;y<bot-2;y+=3.4){ s+='<rect x="-'+(h+0.5)+'" y="'+y.toFixed(1)+'" width="'+(w+1)+'" height="1.5" rx=".7" fill="#0c1016" opacity=".8"/>'; } }
    // kyber kristal penceresi (parlayan dikey yuva)
    if(o.kyber!==false){ const ky=top+H*0.30, kh=H*0.26;
      s+='<rect x="-1.7" y="'+ky.toFixed(1)+'" width="3.4" height="'+kh.toFixed(1)+'" rx="1.2" fill="#05070c"/>'
       +'<rect x="-1.1" y="'+(ky+1).toFixed(1)+'" width="2.2" height="'+(kh-2).toFixed(1)+'" rx=".9" fill="'+c+'" filter="url(#'+p+'b1)"><animate attributeName="opacity" values=".95;.5;.95" dur="1.6s" repeatCount="indefinite"/></rect>'; }
    // kontrol kutusu (sağ yan) + aktivasyon düğmesi + LED
    if(o.box!==false){ const by=top+H*0.5;
      s+='<rect x="'+(h-0.4)+'" y="'+(by-6).toFixed(1)+'" width="4.6" height="12" rx="1.2" fill="url(#'+p+'dk)" stroke="#04060a" stroke-width=".7"/>'
       +'<rect x="'+(h+0.4)+'" y="'+(by-3.4).toFixed(1)+'" width="2.8" height="2.4" rx=".6" fill="'+(o.acc==='gd'?'url(#'+p+'gd)':'url(#'+p+'ac)')+'"/>'
       +'<circle cx="'+(h+1.8)+'" cy="'+(by+2.6).toFixed(1)+'" r="1.2" fill="'+(o.led||c)+'"><animate attributeName="opacity" values="1;.2;1" dur="1.3s" repeatCount="indefinite"/></circle>'; }
    // d-ring / kanca (sol yan)
    if(o.dring){ s+='<circle cx="-'+(h+2.2)+'" cy="'+(bot-3).toFixed(1)+'" r="2.2" fill="none" stroke="url(#'+p+'st)" stroke-width="1.4"/>'; }
    // aksan halkalar (üst/alt)
    s+=ring(p,top+1.6,h+1,3,'url(#'+p+(o.acc||'gd')+')');
    s+=ring(p,bot-1.6,h+1,3,'url(#'+p+(o.acc||'gd')+')');
    return s;
  }

  // ribbed nötr çelik halka yığını (emitter boynu)
  function neck(p,y,w,acc){ const h=w/2;
    return ring(p,y,h+1.4,3.4,'url(#'+p+'st)')+ring(p,y-3.6,h+0.6,2.6,'url(#'+p+(acc||'gd')+')'); }

  // ---- EMITTER VARYANTLARI (y = bıçağın çıktığı nokta) ----
  function emFlared(p,y,w,acc){ const h=w/2;
    return '<path d="M-'+h+' '+(y+4)+' L-'+(h+2.6)+' '+(y-7)+' L'+(h+2.6)+' '+(y-7)+' L'+h+' '+(y+4)+' Z" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>'
      +'<rect x="-'+(h+2.6)+'" y="'+(y-8.5)+'" width="'+(w+5.2)+'" height="2.6" rx="1" fill="url(#'+p+(acc||'gd')+')" stroke="#04060a" stroke-width=".6"/>'
      +'<rect x="-'+(h-1)+'" y="'+(y-7)+'" width="'+(w-2)+'" height="4" rx="1.2" fill="#0a0d13"/>'; }

  // pençe emitter (Tap Titans dragon cradle): 3 kavisli metal pençe
  function emClaw(p,y,w,acc){ const h=w/2;
    const prong=(x,dx)=>'<path d="M'+x+' '+(y+2)+' Q'+(x+dx*0.4)+' '+(y-9)+' '+(x+dx)+' '+(y-15)+' Q'+(x+dx*0.2)+' '+(y-8)+' '+(x+(x<0?2:-2))+' '+(y+2)+' Z" fill="url(#'+p+'st)" stroke="#04060a" stroke-width=".9"/>'
      +'<circle cx="'+(x+dx)+'" cy="'+(y-15)+'" r="1.4" fill="url(#'+p+(acc||'gd')+')"/>';
    return '<rect x="-'+(h+3)+'" y="'+(y-3)+'" width="'+(w+6)+'" height="5" rx="2" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>'
      +prong(-h,-5)+prong(h,5)+prong(0,0).replace(/Q[^Z]+Z/,'')  // merkez yok
      +'<path d="M-2 '+(y-2)+' L0 '+(y-12)+' L2 '+(y-2)+' Z" fill="url(#'+p+'st)" stroke="#04060a" stroke-width=".7"/>'
      +'<rect x="-'+(h-1)+'" y="'+(y-6)+'" width="'+(w-2)+'" height="3.5" rx="1" fill="#0a0d13"/>'; }

  // kanatlı muhafız (winged crossguard): emitter + iki süpürülmüş metal kanat
  function emWing(p,y,w,acc){ const h=w/2;
    const wing=(s)=>'<path d="M'+(s*h)+' '+(y+1)+' Q'+(s*(h+16))+' '+(y-6)+' '+(s*(h+22))+' '+(y+5)+' Q'+(s*(h+14))+' '+(y+3)+' '+(s*h)+' '+(y+5)+' Z" fill="url(#'+p+'ac2)" stroke="#04060a" stroke-width=".9"/>'
      +'<path d="M'+(s*(h+3))+' '+(y+1.5)+' Q'+(s*(h+13))+' '+(y-3)+' '+(s*(h+19))+' '+(y+4)+'" stroke="#fff" stroke-width=".8" fill="none" opacity=".5"/>';
    return wing(-1)+wing(1)+emFlared(p,y,w,acc); }

  // taç emitter (royal): 5 sivri uç + merkez mücevher
  function emCrown(p,y,w,acc,gem){ const h=w/2; let s='<rect x="-'+(h+2)+'" y="'+(y-2)+'" width="'+(w+4)+'" height="5" rx="1.6" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>';
    [-1,-0.5,0.5,1].forEach(f=>{ const x=f*(h+1); s+='<path d="M'+x+' '+(y-1)+' l'+(f<0?-2:2)+' -9 l'+(f<0?2:-2)+' 9 Z" fill="url(#'+p+(acc||'gd')+')" stroke="#04060a" stroke-width=".6"/>'; });
    s+='<path d="M-3 '+(y-2)+' L0 '+(y-14)+' L3 '+(y-2)+' Z" fill="url(#'+p+(acc||'gd')+')" stroke="#04060a" stroke-width=".7"/>';
    if(gem) s+='<circle cx="0" cy="'+(y-3)+'" r="2.4" fill="'+gem+'" stroke="#fff" stroke-width=".5"><animate attributeName="opacity" values="1;.5;1" dur="1.8s" repeatCount="indefinite"/></circle>';
    return s; }

  // halka muhafız (metalik ornate tsuba)
  function emRing(p,y,w,acc,R){ R=R||13; const h=w/2;
    return '<ellipse cx="0" cy="'+y+'" rx="'+R+'" ry="3.8" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>'
      +'<ellipse cx="0" cy="'+y+'" rx="'+R+'" ry="3.8" fill="none" stroke="url(#'+p+(acc||'gd')+')" stroke-width="1.1"/>'
      +'<ellipse cx="0" cy="'+y+'" rx="'+(R*0.46).toFixed(1)+'" ry="1.8" fill="#0a0d13"/>'
      +'<circle cx="-'+(R-1)+'" cy="'+y+'" r="1.3" fill="url(#'+p+(acc||'gd')+')"/><circle cx="'+(R-1)+'" cy="'+y+'" r="1.3" fill="url(#'+p+(acc||'gd')+')"/>'; }

  // tam kabza derleyici: blade emitY'den yukarı çıkar
  function swHilt(p,o){ const H=o.hiltLen||32, w=o.w||13, top=-H/2, bot=H/2, emitY=top, c=o.c, acc=o.acc||'gd';
    let s=pommel(p,bot,w,{acc:acc,gem:o.pommelGem,gemR:o.pommelGemR});
    s+=grip(p,top+ (o.neck!==false?2:0),bot-2,w,c,{acc:acc,led:o.led||c,box:o.box,kyber:o.kyber,ribs:o.ribs,dring:o.dring});
    if(o.neck!==false) s+=neck(p,top+1,w,acc);
    const em=o.emitter||'flared';
    if(em==='claw') s+=emClaw(p,emitY,w,acc);
    else if(em==='wing') s+=emWing(p,emitY,w,acc);
    else if(em==='crown') s+=emCrown(p,emitY,w,acc,o.crownGem);
    else if(em==='ring') s+=emRing(p,emitY,w,acc,o.ringR);
    else s+=emFlared(p,emitY,w,acc);
    return s;
  }

  /* ===================== BIÇAK MOTORU ===================== */
  // düz ışın bıçağı (chunkier, sıcak uç). dark=true → kara bıçak (Darksaber/Eternal)
  function blade(p,o){ const len=o.len, w=o.w||10, y0=o.fromY, tip=y0-len, c=o.c, core=o.core||'#fff';
    let b='<g>'+(o.flick===false?'':HUM);
    // dış hale (ince, net)
    b+='<rect x="-'+(w*1.3)+'" y="'+(tip-2)+'" width="'+(w*2.6)+'" height="'+(len+2)+'" rx="'+(w*1.3)+'" fill="'+c+'" opacity=".22" filter="url(#'+p+'b2)"><animate attributeName="opacity" values=".22;.36;.22" dur="2s" repeatCount="indefinite"/></rect>';
    if(o.dark){
      // kara plazma: koyu gövde + parlak renkli kenar + ince çekirdek
      b+='<path d="M-'+w+' '+y0+' L-'+w+' '+(tip+w*0.7).toFixed(1)+' Q0 '+(tip-w*1.1).toFixed(1)+' '+w+' '+(tip+w*0.7).toFixed(1)+' L'+w+' '+y0+' Z" fill="#0a0c12"/>';
      b+='<path d="M-'+w+' '+y0+' L-'+w+' '+(tip+w*0.7).toFixed(1)+' Q0 '+(tip-w*1.1).toFixed(1)+' '+w+' '+(tip+w*0.7).toFixed(1)+' L'+w+' '+y0+' Z" fill="none" stroke="'+c+'" stroke-width="2.4" opacity=".95" filter="url(#'+p+'b1)"/>';
      b+='<path d="M0 '+(y0-2)+' L0 '+(tip+w*0.6).toFixed(1)+'" stroke="'+c+'" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>';
    } else {
      // gövde (yuvarlak kapaklı sütun) + sıcak uç
      b+='<path d="M-'+w+' '+y0+' L-'+w+' '+(tip+w).toFixed(1)+' Q0 '+(tip-w*1.3).toFixed(1)+' '+w+' '+(tip+w).toFixed(1)+' L'+w+' '+y0+' Z" fill="url(#'+p+'eb)" stroke="'+c+'" stroke-width=".5"/>';
      b+='<path d="M-'+w+' '+y0+' L-'+w+' '+(tip+w).toFixed(1)+' Q0 '+(tip-w*1.3).toFixed(1)+' '+w+' '+(tip+w).toFixed(1)+' L'+w+' '+y0+' Z" fill="none" stroke="#fff" stroke-width="'+(o.edge||1.4)+'" opacity=".8"/>';
      b+='<rect x="-'+(w*0.3)+'" y="'+(tip+2)+'" width="'+(w*0.6)+'" height="'+(len-2)+'" rx="'+(w*0.3)+'" fill="'+core+'"><animate attributeName="opacity" values="1;.82;1" dur="1.3s" repeatCount="indefinite"/></rect>';
      b+='<circle cx="0" cy="'+(tip+w*0.45).toFixed(1)+'" r="'+(w*0.44).toFixed(1)+'" fill="#fff" opacity=".75" filter="url(#'+p+'b1)"/>';
    }
    // emitter ağzı parıltısı
    b+='<ellipse cx="0" cy="'+y0+'" rx="'+(w*1.15)+'" ry="'+(w*0.8)+'" fill="'+(o.dark?c:'#fff')+'" opacity=".5" filter="url(#'+p+'b1)"/>';
    if(o.motes) b+=motes(p,y0,len,w,o.seed);
    if(o.crackle) b+=crackle(p,y0,len,w,c,o.seed);
    return b+'</g>'; }

  function miniBlade(p,len,w,c,core){ core=core||'#fff'; return '<rect x="-'+(w*1.25)+'" y="-'+len+'" width="'+(w*2.5)+'" height="'+len+'" rx="'+(w*1.25)+'" fill="'+c+'" opacity=".22" filter="url(#'+p+'b2)"/>'
    +'<path d="M-'+w+' 0 L-'+w+' '+(-len+w).toFixed(1)+' Q0 '+(-len-w*1.2).toFixed(1)+' '+w+' '+(-len+w).toFixed(1)+' L'+w+' 0 Z" fill="url(#'+p+'eb)"/>'
    +'<rect x="-'+(w*0.34)+'" y="-'+(len-1)+'" width="'+(w*0.68)+'" height="'+(len-1)+'" rx="'+(w*0.34)+'" fill="'+core+'"/>'; }

  function motes(p,y0,len,w,seed){ const r=rng(seed||len*3); let s='<g>';
    for(let i=0;i<7;i++){ const x=((r()-0.5)*w*1.7).toFixed(1), ys=(y0-r()*len).toFixed(1), d=(1.3+r()*1.4).toFixed(1);
      s+='<circle cx="'+x+'" cy="'+ys+'" r="'+(0.5+r()*0.8).toFixed(2)+'" fill="#fff"><animate attributeName="cy" values="'+ys+';'+(parseFloat(ys)-len*0.45).toFixed(1)+'" dur="'+d+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="'+d+'s" repeatCount="indefinite"/></circle>'; }
    return s+'</g>'; }
  // kararsız çekirdek (Cross Guard / Cracked Ember) — titrek yan kıvılcımlar
  function crackle(p,y0,len,w,c,seed){ const r=rng(seed||99); let s='<g>';
    for(let i=0;i<5;i++){ const ys=(y0-len*(0.15+0.7*r())).toFixed(1), dir=r()<0.5?-1:1, ln=(4+r()*7).toFixed(1);
      s+='<path d="M'+(dir*w*0.7).toFixed(1)+' '+ys+' l'+(dir*ln)+' '+((r()-0.5)*6).toFixed(1)+'" stroke="'+c+'" stroke-width="1.6" stroke-linecap="round" opacity=".85" filter="url(#'+p+'b1)"><animate attributeName="opacity" values=".85;0;.85" dur="'+(0.5+r()*0.6).toFixed(2)+'s" repeatCount="indefinite"/></path>'; }
    return s+'</g>'; }

  // şekilli enerji bıçağı (eğri/yaprak/balta ağzı)
  function eBlade(p,d,c,o){ o=o||{}; let s='<g>'+(o.hum===false?'':HUM);
    s+='<path d="'+d+'" fill="'+c+'" opacity=".24" filter="url(#'+p+'b2)"/>';
    s+='<path d="'+d+'" fill="url(#'+p+(o.grad||'eb')+')" stroke="'+c+'" stroke-width=".5"/>';
    s+='<path d="'+d+'" fill="none" stroke="#fff" stroke-width="'+(o.edge||1.3)+'" opacity=".82"/>';
    if(o.core) s+='<path d="'+o.core+'" fill="none" stroke="'+(o.coreCol||'#fff')+'" stroke-width="'+(o.coreW||2.2)+'" stroke-linecap="round" opacity=".9"><animate attributeName="opacity" values=".9;.62;.9" dur="1.3s" repeatCount="indefinite"/></path>';
    return s+'</g>'; }
  function eEdge(p,d,c,w){ w=w||2.4;
    return '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(w*2.6)+'" stroke-linecap="round" opacity=".5" filter="url(#'+p+'b1)"/>'
      +'<path d="'+d+'" fill="none" stroke="#fff" stroke-width="'+w+'" stroke-linecap="round" opacity=".95"><animate attributeName="opacity" values=".95;.7;.95" dur="1.3s" repeatCount="indefinite"/></path>'; }

  // uzun metal sap (mızrak/balta/tırpan/trident) — sarılı tutamak + metal yakalar + dipçik
  function staff(p,o){ const top=o.top, c=o.c, acc=o.acc||'gd';
    let s='<rect x="-3.6" y="'+top+'" width="7.2" height="'+(18-top).toFixed(1)+'" rx="3" fill="url(#'+p+'dk)" stroke="#070a0e" stroke-width="1"/>'
      +'<rect x="-3.4" y="'+top+'" width="2" height="'+(18-top).toFixed(1)+'" fill="#fff" opacity=".08"/>';
    // sarılı kavrama bölgesi (origin civarı)
    s+='<rect x="-4" y="-14" width="8" height="28" rx="3" fill="'+(o.wrap||'#241a12')+'" stroke="#14100a" stroke-width="1"/>';
    for(let y=-12;y<13;y+=3.2) s+='<path d="M-4 '+y+' l8 1.8" stroke="#14100a" stroke-width="1" opacity=".55"/>';
    // metal yakalar (boyunca)
    for(let y=top+22;y<-16;y+=28){ s+=ring(p,y,5.2,5,'url(#'+p+'st)')+ring(p,y,5.8,2,'url(#'+p+acc+')'); }
    // dipçik
    s+='<path d="M-4.6 12 L0 24 L4.6 12 Z" fill="url(#'+p+'st)" stroke="#070a0e" stroke-width="1"/>'
      +'<circle cx="0" cy="14" r="2.4" fill="url(#'+p+acc+')"/>';
    return s;
  }

  /* ===================== SABER ARKETİPLERİ ===================== */
  function lsSaber(p,o){ const H=o.hiltLen||32;
    return defs(p,o.c,o.core,o.acc&&o.accCol)+swHilt(p,o)+blade(p,{len:o.blLen,w:o.blW||10,c:o.c,core:o.core,fromY:-H/2-3,motes:o.motes,crackle:o.crackle,dark:o.dark,seed:o.seed}); }

  function lsCross(p,o){ const H=o.hiltLen||32, w=o.w||13, h=w/2, top=-H/2, c=o.c;
    let s=defs(p,c,o.core)+swHilt(p,{...o,emitter:'flared'});
    // yan çapraz ventler (Kylo Ren) — kısa enerji ağızlar
    s+='<rect x="-'+(h+14)+'" y="'+(top-2)+'" width="14" height="5" rx="1.4" fill="url(#'+p+'st)" stroke="#04060a" stroke-width=".9"/>'
      +'<rect x="'+h+'" y="'+(top-2)+'" width="14" height="5" rx="1.4" fill="url(#'+p+'st)" stroke="#04060a" stroke-width=".9"/>';
    s+='<g transform="translate(-'+(h+13)+' '+(top+0.5)+') rotate(-92)">'+miniBlade(p,o.qb||32,5,c,o.core)+'</g>';
    s+='<g transform="translate('+(h+13)+' '+(top+0.5)+') rotate(92)">'+miniBlade(p,o.qb||32,5,c,o.core)+'</g>';
    s+=blade(p,{len:o.blLen,w:o.blW||11,c:c,core:o.core,fromY:top-3,crackle:true,seed:o.seed});
    return s; }

  function lsSaberstaff(p,o){ const H=o.hiltLen||46, w=o.w||13, h=w/2, top=-H/2, bot=H/2;
    let s=defs(p,o.c,o.core,o.acc&&o.accCol);
    s+=grip(p,top+3,bot-3,w,o.c,{acc:o.acc||'gd',led:o.c,kyber:true});
    s+=neck(p,top+2,w,o.acc||'gd'); s+='<g transform="scale(1 -1)">'+neck(p,top+2,w,o.acc||'gd')+'</g>';
    s+=emFlared(p,top,w,o.acc||'gd'); s+='<g transform="scale(1 -1)">'+emFlared(p,top,w,o.acc||'gd')+'</g>';
    s+=blade(p,{len:o.blLen,w:o.blW||10,c:o.c,core:o.core,fromY:top-3,motes:o.motes,seed:o.seed});
    s+='<g transform="scale(1 -1)">'+blade(p,{len:o.blLen,w:o.blW||10,c:o.c,core:o.core,fromY:top-3,motes:o.motes,seed:(o.seed||1)+50})+'</g>';
    return s; }

  // çift saber (Ahsoka / Starkiller): iki çapraz tek-elli saber
  function lsTwin(p,o){ const one=(s)=>swHilt(p,{...o,hiltLen:o.hiltLen||26,w:o.w||11})+blade(p,{len:o.blLen,w:o.blW||9,c:o.c,core:o.core,fromY:-(o.hiltLen||26)/2-3,seed:s});
    return defs(p,o.c,o.core)+'<g transform="rotate(-11) translate(-5 2)">'+one(7)+'</g><g transform="rotate(11) translate(5 2)">'+one(40)+'</g>'; }

  /* ---- şekilli enerji arketipleri (kabza = swHilt sapı) ---- */
  function gripHandle(p,o){ // saber tutamağı (emitter yerine düz muhafız) — şekilli bıçaklar için
    const H=o.hiltLen||26, w=o.w||12, top=-H/2, bot=H/2;
    let s=pommel(p,bot,w,{acc:o.acc||'gd',gem:o.pommelGem});
    s+=grip(p,top,bot-2,w,o.c,{acc:o.acc||'gd',led:o.c,box:o.box,kyber:o.kyber!==false});
    if(o.guard==='cross') s+='<path d="M-'+(w*0.5+11)+' '+(top-1)+' Q0 '+(top-9)+' '+(w*0.5+11)+' '+(top-1)+' L'+(w*0.5+7)+' '+(top+6)+' Q0 '+(top)+' -'+(w*0.5+7)+' '+(top+6)+' Z" fill="url(#'+p+'gd2)" stroke="#1c1610" stroke-width="1.1"/>';
    else if(o.guard==='ring') s+=emRing(p,top,w,o.acc||'gd',o.ringR||11);
    else s+=ring(p,top,w*0.5+2,4,'url(#'+p+(o.acc||'gd')+')'); // basit muhafız bandı
    return s;
  }

  // shoto: kısa geniş yaprak
  function eShoto(p,o){ const c=o.c,L=o.blLen||84,w=o.blW||12,B=-15;
    const d='M -'+w+' '+B+' L -'+w+' '+(B-L*0.55).toFixed(1)+' Q -'+(w*0.66).toFixed(1)+' '+(B-L*0.93).toFixed(1)+' 0 '+(B-L)+' Q '+(w*0.66).toFixed(1)+' '+(B-L*0.93).toFixed(1)+' '+w+' '+(B-L*0.55).toFixed(1)+' L '+w+' '+B+' Z';
    return defs(p,c,o.core)+gripHandle(p,{c:c,hiltLen:24,w:11,acc:'ac',guard:'band',pommelGem:o.gruna})
      +eBlade(p,d,c,{core:'M0 '+B+' L0 '+(B-L+5).toFixed(1),coreCol:o.core,coreW:w*0.6,edge:1.4}); }

  // pala / scimitar (Orange Current): kavisli tek ağız
  function eScimitar(p,o){ const c=o.c,L=o.blLen||150,w=o.blW||9,B=-13;
    const d='M -'+(w*0.5)+' '+B
      +' Q '+(w*0.3).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+(L*0.14).toFixed(1)+' '+(B-L*0.80).toFixed(1)
      +' Q '+(L*0.26).toFixed(1)+' '+(B-L).toFixed(1)+' '+(L*0.34).toFixed(1)+' '+(B-L*0.84).toFixed(1)
      +' Q '+(w*2.4).toFixed(1)+' '+(B-L*0.42).toFixed(1)+' '+(w*0.6).toFixed(1)+' '+B+' Z';
    const core='M 0 '+(B-2)+' Q '+(w*0.6).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+(L*0.18).toFixed(1)+' '+(B-L*0.82).toFixed(1);
    return defs(p,c,o.core)+gripHandle(p,{c:c,hiltLen:26,w:12,acc:'gd',guard:'cross',pommelGem:o.gruna})
      +eBlade(p,d,c,{core:core,coreCol:o.core,coreW:w*0.7,edge:1.3}); }

  // katana (eğri SW vibe): hafif kavis + kissaki uç + halka tsuba
  function eKatana(p,o){ const c=o.c,L=o.blLen||156,w=o.blW||8,B=-13,cx=L*0.10;
    const d='M -'+(w*0.45).toFixed(1)+' '+B
      +' Q '+(w*0.15).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+cx.toFixed(1)+' '+(B-L*0.9).toFixed(1)
      +' L '+(cx+w*0.18).toFixed(1)+' '+(B-L).toFixed(1)
      +' L '+(cx-w*1.4).toFixed(1)+' '+(B-L*0.88).toFixed(1)
      +' Q '+(w*1.3).toFixed(1)+' '+(B-L*0.45).toFixed(1)+' '+(w*0.55).toFixed(1)+' '+B+' Z';
    const core='M '+(w*0.05).toFixed(1)+' '+(B-2)+' Q '+(w*0.7).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' '+cx.toFixed(1)+' '+(B-L*0.86).toFixed(1);
    return defs(p,c,o.core)+gripHandle(p,{c:c,hiltLen:30,w:11,acc:'gd',guard:'ring',ringR:10,pommelGem:o.gruna})
      +eBlade(p,d,c,{core:core,coreCol:o.core,coreW:w*0.62,edge:1.2}); }

  // mızrak: uzun sap + kristal yaprak uç
  function eSpear(p,o){ const c=o.c, sh=o.blLen||150, hd=o.head||50, hw=o.blW||9, HT=-15-sh, neckY=HT+hd*0.42;
    let s=defs(p,c,o.core)+staff(p,{top:neckY,c:c,acc:o.acc||'gd',wrap:o.wrap});
    s+=ring(p,neckY,5,5,'url(#'+p+'st)')+ring(p,neckY,5.6,2,'url(#'+p+(o.acc||'gd')+')');
    const d='M 0 '+neckY.toFixed(1)+' Q '+hw+' '+(HT+hd*0.05).toFixed(1)+' '+(hw*0.5).toFixed(1)+' '+(HT-hd*0.2).toFixed(1)+' L 0 '+(HT-hd).toFixed(1)+' L -'+(hw*0.5).toFixed(1)+' '+(HT-hd*0.2).toFixed(1)+' Q -'+hw+' '+(HT+hd*0.05).toFixed(1)+' 0 '+neckY.toFixed(1)+' Z';
    s+=eBlade(p,d,c,{core:'M0 '+neckY.toFixed(1)+' L0 '+(HT-hd*0.92).toFixed(1),coreCol:o.core,coreW:hw*0.5,edge:1.2});
    return s; }

  // trident: uzun sap + 3 çatal
  function eTrident(p,o){ const c=o.c, sh=o.blLen||150, pl=o.head||42, cw=o.spread||11, HT=-15-sh;
    let s=defs(p,c,o.core)+staff(p,{top:HT,c:c,acc:o.acc||'gd',wrap:o.wrap});
    s+='<rect x="-'+(cw+3)+'" y="'+(HT-2)+'" width="'+(2*cw+6)+'" height="5" rx="2" fill="url(#'+p+'st)" stroke="#070a0e" stroke-width="1"/>';
    const prong=(x,len,bend)=>{ const tipx=x+bend; return 'M '+x+' '+HT+' Q '+(x-2.2)+' '+(HT-len*0.5).toFixed(1)+' '+tipx+' '+(HT-len).toFixed(1)+' Q '+(x+2.2)+' '+(HT-len*0.5).toFixed(1)+' '+x+' '+HT+' Z'; };
    s+=eBlade(p,prong(0,pl*1.2,0),c,{core:'M0 '+HT+' L0 '+(HT-pl*1.12).toFixed(1),coreCol:o.core,coreW:2.2,edge:1.1});
    s+=eBlade(p,prong(-cw,pl,-2.5),c,{edge:1});
    s+=eBlade(p,prong(cw,pl,2.5),c,{edge:1});
    return s; }

  // Darksaber (Nightblade): siyah düz pala — Mandalor ikonik şekli + krom kabza
  function eDarksaber(p,o){ const c=o.c, L=o.blLen||150, w=o.blW||11, B=-15;
    // hafif asimetrik, sivri uç (Darksaber silüeti)
    const d='M -'+w+' '+B+' L -'+w+' '+(B-L*0.55).toFixed(1)+' L -'+(w*0.5).toFixed(1)+' '+(B-L*0.86).toFixed(1)+' L 0 '+(B-L)+' L '+(w*0.85).toFixed(1)+' '+(B-L*0.72).toFixed(1)+' L '+w+' '+(B-L*0.4).toFixed(1)+' L '+w+' '+B+' Z';
    let s=defs(p,c,o.core,'#cfd8e6')+swHilt(p,{c:c,hiltLen:30,w:12,acc:'ac',emitter:'flared',led:c,pommelGem:o.gruna});
    // kara plazma dolgu + beyaz/parlak kenar
    s+='<path d="'+d+'" fill="'+c+'" opacity=".3" filter="url(#'+p+'b2)"/>';
    s+='<path d="'+d+'" fill="#0a0c12"/>';
    s+='<path d="'+d+'" fill="none" stroke="#ffffff" stroke-width="2.2" opacity=".95" filter="url(#'+p+'b1)"/>';
    s+='<path d="M -'+(w*0.5).toFixed(1)+' '+(B-2)+' L 0 '+(B-L+6).toFixed(1)+'" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>';
    return s; }

  // BUSTER / dev levha (Crimson Fury): metal yaka + cıvata
  function eBuster(p,o){ const c=o.c,L=o.blLen||182,w=o.blW||22,B=-15;
    const d='M -'+w+' '+B+' L -'+w+' '+(B-L*0.80).toFixed(1)+' L -'+(w*0.14).toFixed(1)+' '+(B-L).toFixed(1)+' L '+w+' '+(B-L*0.58).toFixed(1)+' L '+w+' '+B+' Z';
    let s=defs(p,c,o.core)+gripHandle(p,{c:c,hiltLen:30,w:13,acc:'gd',guard:'band',pommelGem:o.gruna});
    s+='<rect x="-'+(w+1)+'" y="'+(B-3)+'" width="'+(2*w+2)+'" height="8" rx="2" fill="url(#'+p+'st)" stroke="#070a0e" stroke-width="1.2"/>';
    s+='<circle cx="0" cy="'+(B+1)+'" r="4.2" fill="url(#'+p+'gd2)" stroke="#070a0e" stroke-width="1.1"/>';
    s+=eBlade(p,d,c,{grad:'eb',edge:1.6,core:'M -'+(w*0.34).toFixed(1)+' '+(B-4)+' L -'+(w*0.34).toFixed(1)+' '+(B-L*0.78).toFixed(1),coreCol:o.core,coreW:w*0.48});
    s+='<path d="M '+(w-1.4).toFixed(1)+' '+(B-2)+' L '+(w-1.4).toFixed(1)+' '+(B-L*0.56).toFixed(1)+'" stroke="url(#'+p+'st)" stroke-width="3" stroke-linecap="round" opacity=".9"/>';
    return s; }

  // rünlü/geniş savaş kılıcı (Golden Hunter): geniş düz enerji kılıç + altın haç + rünler
  function eRunedSword(p,o){ const c=o.c,L=o.blLen||150,w=o.blW||12,B=-15;
    const d='M -'+w+' '+B+' L -'+w+' '+(B-L*0.72).toFixed(1)+' L 0 '+(B-L)+' L '+w+' '+(B-L*0.72).toFixed(1)+' L '+w+' '+B+' Z';
    let s=defs(p,c,o.core)+gripHandle(p,{c:c,hiltLen:28,w:13,acc:'gd',guard:'cross',pommelGem:o.gruna});
    s+=eBlade(p,d,c,{core:'M0 '+B+' L0 '+(B-L+4).toFixed(1),coreCol:o.core,coreW:w*0.5,edge:1.4});
    if(o.rune) for(let i=1;i<=3;i++){ const yy=(B-L*i/4.2).toFixed(1); s+='<rect x="-2.2" y="'+yy+'" width="4.4" height="4.4" rx=".8" fill="'+o.rune+'" opacity=".95"><animate attributeName="opacity" values=".95;.35;.95" dur="1.6s" begin="'+(i*0.2)+'s" repeatCount="indefinite"/></rect>'; }
    return s; }

  // dönen hilal kılıç (Spinning Crescent — Inquisitor): halka kabza + çift hilal
  function eSpinner(p,o){ const c=o.c, R=o.head||74, B=-15;
    let s=defs(p,c,o.core)+gripHandle(p,{c:c,hiltLen:30,w:12,acc:'dk',guard:'ring',ringR:13,pommelGem:o.gruna});
    // büyük dış halka muhafız (Inquisitor spin ring)
    s+='<g><animateTransform attributeName="transform" type="rotate" from="0 0 '+(B-R*0.9).toFixed(1)+'" to="360 0 '+(B-R*0.9).toFixed(1)+'" dur="'+(o.spin||3.4)+'s" repeatCount="indefinite"/>';
    s+='<circle cx="0" cy="'+(B-R*0.9).toFixed(1)+'" r="'+(R*0.62).toFixed(1)+'" fill="none" stroke="url(#'+p+'st)" stroke-width="4"/>';
    const cres=(rot)=>{ const cy=B-R*0.9; return '<g transform="rotate('+rot+' 0 '+cy.toFixed(1)+')"><path d="M 0 '+(cy-R*0.62).toFixed(1)+' Q '+(R*0.5).toFixed(1)+' '+(cy-R*0.5).toFixed(1)+' '+(R*0.5).toFixed(1)+' '+(cy-R*0.08).toFixed(1)+' Q '+(R*0.34).toFixed(1)+' '+(cy-R*0.32).toFixed(1)+' 0 '+(cy-R*0.5).toFixed(1)+' Z" fill="url(#'+p+'eb)" stroke="'+c+'" stroke-width=".5"/><path d="M 0 '+(cy-R*0.62).toFixed(1)+' Q '+(R*0.5).toFixed(1)+' '+(cy-R*0.5).toFixed(1)+' '+(R*0.5).toFixed(1)+' '+(cy-R*0.08).toFixed(1)+'" fill="none" stroke="#fff" stroke-width="1.2" opacity=".85"/></g>'; };
    s+=cres(0)+cres(180);
    s+='</g>';
    // halka ile kabza bağlantısı
    s+='<rect x="-2.5" y="'+(B-R*0.28).toFixed(1)+'" width="5" height="'+(R*0.28).toFixed(1)+'" rx="2" fill="url(#'+p+'st)" stroke="#04060a" stroke-width=".8"/>';
    return s; }

  // plazma savaş baltası (Forest War Axe vb.): uzun sap + tek enerji ağız
  function eAxe(p,o){ const c=o.c, sh=o.blLen||120, R=o.head||46, HT=-15-sh, ay=HT+22;
    let s=defs(p,c,o.core)+staff(p,{top:HT,c:c,acc:o.acc||'gd',wrap:o.wrap});
    s+='<rect x="-4.5" y="'+(ay-2)+'" width="9" height="16" rx="2" fill="url(#'+p+'st)" stroke="#070a0e" stroke-width="1"/>';
    s+=eBlade(p,'M -2.5 '+ay+' L 0 '+(HT-3).toFixed(1)+' L 2.5 '+ay+' Z',c,{edge:1});
    const bit='M 3 '+(ay+2)+' Q '+(R*1.05).toFixed(1)+' '+(ay-R*0.1).toFixed(1)+' '+(R*0.92).toFixed(1)+' '+(ay-R*0.74).toFixed(1)+' Q '+(R*0.45).toFixed(1)+' '+(ay-R*0.42).toFixed(1)+' 3 '+(ay-R*0.12).toFixed(1)+' Z';
    s+=eBlade(p,bit,c,{grad:'ev',edge:1.3,core:'M 5 '+(ay-R*0.06).toFixed(1)+' Q '+(R*0.66).toFixed(1)+' '+(ay-R*0.32).toFixed(1)+' '+(R*0.9).toFixed(1)+' '+(ay-R*0.68).toFixed(1),coreCol:o.core,coreW:2});
    return s; }

  // çift ağızlı dev balta (altın gövde + enerji ağız)
  function eGreataxe(p,o){ const c=o.c, sh=o.blLen||150, R=o.head||44, HT=-15-sh, ay=HT+26;
    let s=defs(p,c,o.core)+staff(p,{top:HT,c:c,acc:'gd',wrap:o.wrap});
    s+=eBlade(p,'M -3 '+ay+' L 0 '+(HT-5).toFixed(1)+' L 3 '+ay+' Z',c,{edge:1.1});
    const bit=(dir)=>'M '+(dir*5)+' '+(ay+1)+' Q '+(dir*R*1.05).toFixed(1)+' '+(ay-R*0.05).toFixed(1)+' '+(dir*R*0.95).toFixed(1)+' '+(ay-R*0.72).toFixed(1)+' Q '+(dir*R*0.5).toFixed(1)+' '+(ay-R*0.46).toFixed(1)+' '+(dir*5)+' '+(ay-R*0.16).toFixed(1)+' Z';
    s+='<rect x="-6" y="'+(ay-3)+'" width="12" height="20" rx="3" fill="url(#'+p+'gd2)" stroke="#3a2a0a" stroke-width="1.2"/>';
    s+='<path d="'+bit(1)+'" fill="url(#'+p+'gd2)" stroke="#3a2a0a" stroke-width="1.1"/>';
    s+='<path d="'+bit(-1)+'" fill="url(#'+p+'gd2)" stroke="#3a2a0a" stroke-width="1.1"/>';
    s+=eEdge(p,'M '+(R*0.95).toFixed(1)+' '+(ay-R*0.72).toFixed(1)+' Q '+(R*1.16).toFixed(1)+' '+(ay-R*0.35).toFixed(1)+' '+(R*1.0).toFixed(1)+' '+(ay-R*0.02).toFixed(1),c,2.4);
    s+=eEdge(p,'M -'+(R*0.95).toFixed(1)+' '+(ay-R*0.72).toFixed(1)+' Q -'+(R*1.16).toFixed(1)+' '+(ay-R*0.35).toFixed(1)+' -'+(R*1.0).toFixed(1)+' '+(ay-R*0.02).toFixed(1),c,2.4);
    return s; }

  // EFSANE GREATSWORD (Eternal Dark): dev kara çift-ağız + kızıl çekirdek + kanatlı muhafız
  function eNovaGreat(p,o){ const c=o.c, core=o.core, edge=o.edge2||'#ff3b4d', L=o.blLen||206, w=o.blW||20, B=-15, G=o.guard||30, dark=o.dark;
    const d='M -'+w+' '+B+' L -'+(w*0.94).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' L -'+(w*0.52).toFixed(1)+' '+(B-L*0.86).toFixed(1)+' L 0 '+(B-L)+' L '+(w*0.52).toFixed(1)+' '+(B-L*0.86).toFixed(1)+' L '+(w*0.94).toFixed(1)+' '+(B-L*0.5).toFixed(1)+' L '+w+' '+B+' Z';
    let s=defs(p,c,core,edge)+gripHandle(p,{c:edge,hiltLen:34,w:14,acc:'ac',guard:'band',pommelGem:edge});
    // kanatlı enerji muhafız
    s+='<path d="M-4 '+B+' L-'+G+' '+(B-7)+' L-'+(G-3)+' '+(B+4)+' L-4 '+(B+5)+' Z" fill="url(#'+p+'ac2)" stroke="'+edge+'" stroke-width=".6" opacity=".95"/>';
    s+='<path d="M4 '+B+' L'+G+' '+(B-7)+' L'+(G-3)+' '+(B+4)+' L4 '+(B+5)+' Z" fill="url(#'+p+'ac2)" stroke="'+edge+'" stroke-width=".6" opacity=".95"/>';
    if(dark){
      s+='<path d="'+d+'" fill="'+edge+'" opacity=".34" filter="url(#'+p+'b2)"/>';
      s+='<path d="'+d+'" fill="#1a0610"/>';
      s+='<path d="'+d+'" fill="'+edge+'" opacity=".16"/>';
      s+='<path d="'+d+'" fill="none" stroke="'+edge+'" stroke-width="2.4" opacity=".95" filter="url(#'+p+'b1)"/>';
      s+='<path d="M0 '+(B-5)+' L0 '+(B-L+6).toFixed(1)+'" stroke="'+edge+'" stroke-width="2" stroke-linecap="round" opacity=".85"><animate attributeName="opacity" values=".85;.5;.85" dur="1.4s" repeatCount="indefinite"/></path>';
    } else {
      s+=eBlade(p,d,c,{grad:'ev',edge:1.7,core:'M0 '+(B-5)+' L0 '+(B-L+6).toFixed(1),coreCol:core,coreW:w*0.4});
    }
    return s; }

  // ikiz hançer
  function eTwinDagger(p,o){ const c=o.c, L=o.blLen||96, w=o.blW||9, B=-12;
    const d='M -'+w+' '+B+' L -'+(w*0.7).toFixed(1)+' '+(B-L*0.6).toFixed(1)+' L 0 '+(B-L)+' L '+(w*0.7).toFixed(1)+' '+(B-L*0.6).toFixed(1)+' L '+w+' '+B+' Z';
    const one=()=>gripHandle(p,{c:c,hiltLen:18,w:10,acc:'ac',guard:'cross',kyber:false})+eBlade(p,d,c,{core:'M0 '+B+' L0 '+(B-L+3).toFixed(1),coreCol:o.core,coreW:w*0.5,edge:1.3});
    return defs(p,c,o.core)+'<g transform="rotate(-10) translate(-4 2)">'+one()+'</g><g transform="rotate(10) translate(4 2)">'+one()+'</g>'; }

  // tırpan: metal sap + boyun + süpüren enerji hilal
  function eScythe(p,o){ const c=o.c, R=o.head||78, shaft=o.shaft||112, HT=-15-shaft, ex=R*0.30, ey=HT-R*0.16;
    let s=defs(p,c,o.core)+staff(p,{top:HT,c:c,acc:o.acc||'gd',wrap:o.wrap});
    s+='<path d="M0 '+HT+' Q '+(R*0.28).toFixed(1)+' '+(HT-3)+' '+ex.toFixed(1)+' '+ey.toFixed(1)+'" stroke="url(#'+p+'st)" stroke-width="4.5" fill="none" stroke-linecap="round"/>';
    s+='<circle cx="0" cy="'+HT+'" r="4.5" fill="url(#'+p+'st)" stroke="#070a0e" stroke-width="1.1"/>';
    const d='M '+ex.toFixed(1)+' '+ey.toFixed(1)
      +' Q '+(R*0.95).toFixed(1)+' '+(ey-R*0.2).toFixed(1)+' '+(R*0.92).toFixed(1)+' '+(ey-R*0.66).toFixed(1)
      +' Q '+(R*0.86).toFixed(1)+' '+(ey-R*0.92).toFixed(1)+' '+(R*0.55).toFixed(1)+' '+(ey-R*0.98).toFixed(1)
      +' Q '+(R*0.7).toFixed(1)+' '+(ey-R*0.5).toFixed(1)+' '+(ex+2).toFixed(1)+' '+(ey-R*0.06).toFixed(1)+' Z';
    s+=eBlade(p,d,c,{grad:'ev',edge:1.3,core:'M '+(ex+2).toFixed(1)+' '+(ey-R*0.04).toFixed(1)+' Q '+(R*0.62).toFixed(1)+' '+(ey-R*0.42).toFixed(1)+' '+(R*0.52).toFixed(1)+' '+(ey-R*0.9).toFixed(1),coreCol:o.core,coreW:2.4});
    if(o.blackhole){ const bx=(R*0.55).toFixed(1), by=(ey-R*0.98).toFixed(1);
      s+='<g transform="translate('+bx+' '+by+')"><circle r="7" fill="#08040f"/><circle r="7" fill="none" stroke="'+c+'" stroke-width="2"><animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.2;.9" dur="2s" repeatCount="indefinite"/></circle><circle r="4" fill="none" stroke="#fff" stroke-width="1"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite"/></circle></g>'; }
    return s; }

  // çekiç: metal sap + enerji çekirdekli dev başlık
  function eHammer(p,o){ const c=o.c, sh=o.blLen||120, w=o.blW||22, HT=-15-sh, hy=HT+18;
    let s=defs(p,c,o.core)+staff(p,{top:HT,c:c,acc:'gd',wrap:o.wrap});
    s+='<rect x="-'+(w+10)+'" y="'+(hy-15)+'" width="'+(2*w+20)+'" height="30" rx="6" fill="url(#'+p+'st)" stroke="#0c0e16" stroke-width="1.6"/>';
    s+='<rect x="-'+(w+10)+'" y="'+(hy-15)+'" width="8" height="30" fill="#fff" opacity=".18"/>';
    s+='<rect x="-'+(w+3)+'" y="'+(hy-9)+'" width="'+(2*w+6)+'" height="18" rx="3" fill="#0c1016"/>';
    s+='<circle cx="0" cy="'+hy+'" r="8" fill="url(#'+p+'rg)"/><circle cx="0" cy="'+hy+'" r="4.6" fill="'+c+'" filter="url(#'+p+'b1)"><animate attributeName="r" values="4.6;3;4.6" dur="1.3s" repeatCount="indefinite"/></circle>';
    s+='<rect x="-'+(w+11)+'" y="'+(hy-8)+'" width="3" height="3" fill="url(#'+p+'gd)"/><rect x="'+(w+8)+'" y="'+(hy+5)+'" width="3" height="3" fill="url(#'+p+'gd)"/>';
    return s; }

  // glaive: uzun sap + süpüren enerji ağız (Phoenix)
  function eGlaive(p,o){ const c=o.c, sh=o.blLen||150, L=o.head||90, w=o.blW||18, HT=-15-sh;
    let s=defs(p,c,o.core)+staff(p,{top:HT,c:c,acc:'gd',wrap:o.wrap});
    s+='<rect x="-5" y="'+(HT-4)+'" width="10" height="12" rx="3" fill="url(#'+p+'st)" stroke="#0c0e16" stroke-width="1"/>';
    const d='M-2 '+(HT-2)+' Q-'+(w-2)+' '+(HT-L*0.22).toFixed(1)+' -1 '+(HT-L*0.5).toFixed(1)+' Q'+(w+10)+' '+(HT-L*0.46).toFixed(1)+' '+(w+6)+' '+(HT-L*0.14).toFixed(1)+' Q'+w+' '+(HT-L*0.16).toFixed(1)+' 2 '+(HT-2)+' Z';
    s+=eBlade(p,d,c,{grad:'ev',edge:1.4,core:'M0 '+(HT-6)+' Q4 '+(HT-L*0.28).toFixed(1)+' -1 '+(HT-L*0.46).toFixed(1),coreCol:o.core,coreW:2.2});
    return s; }

  /* ===================== KART YERLEŞİMİ ===================== */
  function lsCard(p, drawFn, span, rot){
    const cy=(span.top+span.bottom)/2, H=span.bottom-span.top, s=(118/H);
    rot=(rot==null?-30:rot);
    return '<g transform="translate(200 70) rotate('+rot+') scale('+s.toFixed(3)+')"><g transform="translate(0 '+(-cy).toFixed(1)+')">'+drawFn(p)+'</g></g>';
  }
  const sp=(top,bottom)=>({top:top,bottom:bottom});

  /* ===================== 20 SİLAH (renkler SWORDS ile birebir) ===================== */
  // her giriş: draw fn (kanonik) + span (kart) + top (kahraman eli ölçeği)
  const DEF = [
    // 0 Sky Heirloom — ince eğitim saberi (temiz SW kabza)
    {c:'#4db8ff',core:'#eaf6ff',tier:'Common',
     draw:p=>lsSaber(p,{c:'#4db8ff',core:'#eaf6ff',blLen:150,blW:9,hiltLen:30,acc:'ac',emitter:'flared',led:'#9fd8ff',seed:11}),
     span:sp(-168,20),top:-168, grip:'one'},
    // 1 Crimson Tyrant — saldırgan kırmızı saber, pençe emitter
    {c:'#ff4d5e',core:'#fff0f0',tier:'Common',
     draw:p=>lsSaber(p,{c:'#ff4d5e',core:'#fff0f0',blLen:160,blW:10,hiltLen:32,acc:'gd',emitter:'claw',led:'#ff4d5e',seed:22}),
     span:sp(-180,22),top:-180, grip:'one'},
    // 2 Master's Green — bilge yeşil saber, halka muhafız
    {c:'#54e08a',core:'#eafff0',tier:'Advanced',
     draw:p=>lsSaber(p,{c:'#54e08a',core:'#eafff0',blLen:158,blW:10,hiltLen:32,acc:'gd',emitter:'ring',ringR:11,led:'#54e08a',seed:33}),
     span:sp(-178,22),top:-178, grip:'one'},
    // 3 Violet Verdict — uzun mor saber, electrum kabza + mücevher (Mace Windu)
    {c:'#b86bff',core:'#f3e8ff',tier:'Advanced',
     draw:p=>lsSaber(p,{c:'#b86bff',core:'#f3e8ff',blLen:176,blW:10,hiltLen:34,acc:'gd',emitter:'crown',crownGem:'#ffe6a0',pommelGem:'#b86bff',led:'#b86bff',motes:true,seed:44}),
     span:sp(-198,24),top:-198, grip:'one'},
    // 4 Cross Guard — çapraz saber, kararsız bıçak (Kylo Ren)
    {c:'#ff3b30',core:'#fff0e8',tier:'Advanced',
     draw:p=>lsCross(p,{c:'#ff3b30',core:'#fff0e8',blLen:152,blW:11,hiltLen:32,w:13,qb:34,acc:'dk',led:'#ff3b30',seed:55}),
     span:sp(-170,22),top:-170, grip:'one'},
    // 5 Twin White — çift beyaz saber (Ahsoka)
    {c:'#f2f6ff',core:'#ffffff',tier:'Rare',
     draw:p=>lsTwin(p,{c:'#f2f6ff',core:'#ffffff',blLen:128,blW:8,hiltLen:26,w:11,acc:'gd',seed:66}),
     span:sp(-150,30),top:-150, grip:'twin'},
    // 6 Cracked Ember — kararsız çatlak kızıl saber
    {c:'#ff2d3e',core:'#fff0f0',tier:'Rare',
     draw:p=>lsSaber(p,{c:'#ff2d3e',core:'#fff0f0',blLen:160,blW:11,hiltLen:30,acc:'ac',emitter:'flared',led:'#ff2d3e',crackle:true,seed:77}),
     span:sp(-180,20),top:-180, grip:'one'},
    // 7 Nightblade — DARKSABER (kara bıçak, krom kabza)
    {c:'#cfd8e6',core:'#ffffff',tier:'Rare',
     draw:p=>eDarksaber(p,{c:'#cfd8e6',core:'#ffffff',blLen:150,blW:11,gruna:'#9fd8ff'}),
     span:sp(-176,22),top:-176, grip:'one'},
    // 8 Orange Current — eğri turuncu saber (pala)
    {c:'#ff8a3a',core:'#fff2e0',tier:'Epic',
     draw:p=>eScimitar(p,{c:'#ff8a3a',core:'#fff2e0',blLen:150,blW:10,gruna:'#ffd2a8'}),
     span:sp(-160,28),top:-160, grip:'one'},
    // 9 Yellow Sentinel — altın sentinel saber, taç emitter
    {c:'#ffd24a',core:'#fff8e0',tier:'Epic',
     draw:p=>lsSaber(p,{c:'#ffd24a',core:'#fff8e0',blLen:166,blW:10,hiltLen:34,acc:'gd',emitter:'crown',crownGem:'#fff0b8',pommelGem:'#ffd24a',led:'#ffd24a',seed:99}),
     span:sp(-188,24),top:-188, grip:'one'},
    // 10 Spinning Crescent — dönen hilal kılıç (Inquisitor)
    {c:'#ff4d5e',core:'#fff0f0',tier:'Epic',
     draw:p=>eSpinner(p,{c:'#ff4d5e',core:'#fff0f0',head:78,spin:3.2,gruna:'#ffb3ba'}),
     span:sp(-150,24),top:-150, grip:'two'},
    // 11 Double Blue — çift uçlu staff (Maul, mavi)
    {c:'#4db8ff',core:'#eaf6ff',tier:'Epic',
     draw:p=>lsSaberstaff(p,{c:'#4db8ff',core:'#eaf6ff',blLen:148,blW:9,hiltLen:46,w:13,acc:'gd',led:'#4db8ff',motes:true,seed:111}),
     span:sp(-174,174),top:-174, grip:'two'},
    // 12 Dark Ancient — eğri kabzalı kızıl saber (Dooku)
    {c:'#c41e2f',core:'#ffe8ea',tier:'Legendary',
     draw:p=>lsCurved(p,{c:'#c41e2f',core:'#ffe8ea',blLen:170,blW:10,hiltLen:34,acc:'gd',led:'#c41e2f',seed:122}),
     span:sp(-196,30),top:-196, grip:'one'},
    // 13 Ancient Pale — ince soluk tapınak saberi, ornate kabza
    {c:'#9fc6e8',core:'#f0f8ff',tier:'Legendary',
     draw:p=>lsSaber(p,{c:'#9fc6e8',core:'#f0f8ff',blLen:160,blW:8,hiltLen:34,acc:'gd',emitter:'ring',ringR:12,pommelGem:'#9fc6e8',led:'#9fc6e8',seed:133}),
     span:sp(-182,24),top:-182, grip:'one'},
    // 14 Double-Edged Red — çift ağızlı kızıl staff
    {c:'#ff4d5e',core:'#fff0f0',tier:'Legendary',
     draw:p=>lsSaberstaff(p,{c:'#ff4d5e',core:'#fff0f0',blLen:150,blW:10,hiltLen:46,w:13,acc:'dk',led:'#ff4d5e',seed:144}),
     span:sp(-176,176),top:-176, grip:'two'},
    // 15 Golden Hunter — geniş altın savaş kılıcı + rünler
    {c:'#ffd24a',core:'#fffae0',tier:'Legendary',
     draw:p=>eRunedSword(p,{c:'#ffd24a',core:'#fffae0',blLen:152,blW:13,rune:'#fff0b8',gruna:'#ffe9a0'}),
     span:sp(-168,28),top:-168, grip:'two'},
    // 16 Crimson Fury — dev buster levha
    {c:'#ff2438',core:'#fff0f0',tier:'Mythic',
     draw:p=>eBuster(p,{c:'#ff2438',core:'#fff0f0',blLen:188,blW:22,gruna:'#ff9aa4'}),
     span:sp(-196,30),top:-196, grip:'two'},
    // 17 Exile Green — yıpranmış yeşil saber
    {c:'#2e8b57',core:'#e8fff2',tier:'Mythic',
     draw:p=>lsSaber(p,{c:'#2e8b57',core:'#e8fff2',blLen:160,blW:10,hiltLen:32,acc:'dk',emitter:'flared',dring:true,led:'#3fbf77',seed:155}),
     span:sp(-180,22),top:-180, grip:'one'},
    // 18 Holocron Blue — beam saber, holocron-tech (taç emitter)
    {c:'#6ad4ff',core:'#f0fcff',tier:'Mythic',
     draw:p=>lsSaber(p,{c:'#6ad4ff',core:'#f0fcff',blLen:182,blW:11,hiltLen:34,acc:'gd',emitter:'wing',pommelGem:'#6ad4ff',led:'#6ad4ff',motes:true,seed:166}),
     span:sp(-204,24),top:-204, grip:'one'},
    // 19 Eternal Dark — kara greatsword + kızıl çekirdek (ULTIMATE)
    {c:'#1a0a10',core:'#ff6a78',tier:'Mythic',
     draw:p=>eNovaGreat(p,{c:'#1a0a10',core:'#ff6a78',edge2:'#ff3b4d',blLen:208,blW:21,guard:32,dark:true}),
     span:sp(-220,40),top:-220, grip:'two'}
  ];

  // eğri kabzalı saber (Dooku) — gripHandle'a benzer ama kavisli sap
  function lsCurved(p,o){ const H=o.hiltLen||34, w=o.w||12, h=w/2, top=-H/2, bot=H/2, c=o.c;
    let s=defs(p,c,o.core,o.accCol);
    // kavisli sap gövdesi
    s+='<path d="M-'+h+' '+top+' Q-'+(h+5)+' 0 -'+(h-1)+' '+(bot+6)+' L'+(h+1)+' '+(bot+8)+' Q'+(h+2)+' 2 '+h+' '+top+' Z" fill="url(#'+p+'st)" stroke="#04060a" stroke-width="1"/>';
    s+='<path d="M-'+(h-1)+' '+(top+1)+' Q-'+(h+4)+' 0 -'+(h-2)+' '+(bot+4)+'" stroke="#fff" stroke-width="1.4" fill="none" opacity=".25"/>';
    for(let y=top+4;y<bot;y+=3.4) s+='<path d="M-'+(h+1)+' '+y.toFixed(1)+' q'+(w+2)+' .6 '+(w+2)+' 1.4" stroke="#0c1016" stroke-width="1.2" opacity=".55" fill="none"/>';
    // alt kapak + mücevher
    s+='<ellipse cx="'+(h*0.2)+'" cy="'+(bot+7)+'" rx="'+(h+1)+'" ry="2.6" fill="url(#'+p+(o.acc||'gd')+')" stroke="#04060a" stroke-width=".7"/>';
    // kyber penceresi + LED
    s+='<rect x="-1.6" y="'+(top+H*0.34).toFixed(1)+'" width="3.2" height="'+(H*0.3).toFixed(1)+'" rx="1.1" fill="'+c+'" filter="url(#'+p+'b1)"><animate attributeName="opacity" values=".95;.5;.95" dur="1.6s" repeatCount="indefinite"/></rect>';
    s+=neck(p,top+1,w,o.acc||'gd');
    // muhafız (eğri emitter — hafif yana eğik enerji ağız)
    s+=emFlared(p,top,w,o.acc||'gd');
    s+=blade(p,{len:o.blLen,w:o.blW||10,c:c,core:o.core,fromY:top-3,seed:o.seed});
    return s;
  }

  // build() — galeri kartı (fallback) için arka plan + kanonik çizim
  const TIER_BG = {Common:['#2e6ad8','#10203a'],Advanced:['#2ea86a','#16301f'],Rare:['#3a6ad8','#101e3a'],Epic:['#7a3ad8','#1a0a36'],Legendary:['#e0901a','#2a1a08'],Mythic:['#b83a6a','#0a0618']};
  window.NB2_WEAPONS = DEF.map((d,i)=>{
    const bgc=TIER_BG[d.tier]||['#3a6ad8','#101e3a'];
    return { n:'Blade '+(i+1), tier:d.tier, power:i+1, c:d.c, fx:'',
      build:p=>bg(p,bgc[0],bgc[1],{glow:.4,stars:i+3,embers:(d.tier==='Legendary'||d.tier==='Mythic')?(i+3):0,ember:d.c})
        +lsCard(p,d.draw,d.span,d.grip==='two'&&d.span.bottom>100?-20:-30) };
  });

  /* ===================== KAHRAMAN ELİNDEKİ SİLAH ===================== */
  window.NB2_WEAPON_GRIP = DEF.map(d=>d.grip);

  window.NB2_heroBlade = function(i, scale, uid){
    const d = DEF[i] || DEF[0];
    const p = 'nbh'+(uid||('i'+i))+'_';
    const pow = i+1;
    const grip2 = d.grip;
    const reach = grip2==='two' ? 1.5 : 1;
    const top = d.top;
    const k = ((60 + pow*1.05)*reach/Math.abs(top)) * (scale||1);
    return '<g transform="scale('+k.toFixed(3)+')">'+d.draw(p)+'</g>';
  };
})();
