/* =============================================================================
   NOVA BLADE · BLASTER CLASS — Star Wars enerji silahları (BAĞIMSIZ menzilli sınıf)
   - 16 ışın silahı: tek/çift tabanca, karabina, tüfek, sniper, ağır tekrarlayıcı,
     saçma, kuşatma topu — HEPSİ tek-tek ışın atar (otomatik değil).
   - Kılıçtan AYRI bir silah türü: kendi mult/kritik/boss/atış-hızı statları ve
     kendi yükseltme ekonomisi (gold). Wave ile açılmaz — SATIN ALINIR.
   - Bir blaster kuşanmak Blaster sınıfına, bir kılıç kuşanmak Saber sınıfına geçirir.
   - Çift tabancalar iki eli görünür şekilde tutar ve dönüşümlü ateş eder.
   ============================================================================= */
(function(){
  const NS='http://www.w3.org/2000/svg';
  const POSE_ROT = 95;   // namlu sağa-yukarı (düşmana) baksın

  /* ===================== METAL + ENERJİ TANIMLARI ===================== */
  const TIERN={Common:0,Advanced:1,Rare:2,Epic:3,Legendary:4,Mythic:5};
  const TIER_ACC={Common:'#9fb0c4',Advanced:'#54e08a',Rare:'#5cc6ff',Epic:'#c08bff',Legendary:'#ffc24a',Mythic:'#ff8ae0'};
  function tnum(o){ return TIERN[o.tier]||0; }
  function bdefs(p,c,glow,acc){ glow=glow||'#ffffff'; acc=acc||'#9fb0c4';
    return '<defs>'
      // krom gövde (yatay speküler — daha parlak, daha çok kontrast)
      +'<linearGradient id="'+p+'mt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#070a10"/><stop offset=".22" stop-color="#3c4452"/><stop offset=".46" stop-color="#c4d0de"/><stop offset=".58" stop-color="#eef3fa"/><stop offset=".78" stop-color="#39414e"/><stop offset="1" stop-color="#05070c"/></linearGradient>'
      +'<linearGradient id="'+p+'mt2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#04060a"/><stop offset=".5" stop-color="#2a313c"/><stop offset="1" stop-color="#04060a"/></linearGradient>'
      // tier aksanı (renkli metalik bant — koyu→parlak→koyu)
      +'<linearGradient id="'+p+'ac" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0d1018"/><stop offset=".4" stop-color="'+acc+'"/><stop offset=".6" stop-color="#ffffff"/><stop offset="1" stop-color="#0d1018"/></linearGradient>'
      +'<linearGradient id="'+p+'gd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3e10"/><stop offset=".3" stop-color="#ffe6a0"/><stop offset=".55" stop-color="#b8862a"/><stop offset="1" stop-color="#4a3208"/></linearGradient>'
      // enerji (dikey, sıcak çekirdek)
      +'<linearGradient id="'+p+'en" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="'+c+'" stop-opacity=".22"/><stop offset=".5" stop-color="'+c+'"/><stop offset="1" stop-color="'+glow+'"/></linearGradient>'
      +'<radialGradient id="'+p+'mz" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".42" stop-color="'+glow+'"/><stop offset="1" stop-color="'+c+'" stop-opacity="0"/></radialGradient>'
      +'<radialGradient id="'+p+'core" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="'+glow+'"/><stop offset="1" stop-color="'+c+'"/></radialGradient>'
      +'<filter id="'+p+'gl" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="1.7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      +'</defs>';
  }
  function cell(p,x,y,w,h){ return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="1.4" fill="url(#'+p+'en)" filter="url(#'+p+'gl)"><animate attributeName="opacity" values="1;.55;1" dur="1.7s" repeatCount="indefinite"/></rect>'; }
  // havalandırma yarıkları (soğutma) — yan yüzde n adet eğik slot
  function vents(p,x,y,w,n){ let s=''; for(let i=0;i<n;i++){ s+='<rect x="'+x+'" y="'+(y+i*2.6).toFixed(1)+'" width="'+w+'" height="1.5" rx=".7" fill="#0a0e14" stroke="#000" stroke-width=".3"/>'; } return s; }
  // üst ray (picatinny) — çentikli
  function rail(p,x,top,len){ let s='<rect x="'+x+'" y="'+top.toFixed(1)+'" width="3.2" height="'+len.toFixed(1)+'" rx=".6" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".5"/>'; for(let y=top+1.4;y<top+len-1;y+=2){ s+='<rect x="'+x+'" y="'+y.toFixed(1)+'" width="3.2" height="1" fill="#04060a" opacity=".7"/>'; } return s; }
  // emitter (namlu ağzı) varyantları
  function emit(p,top,w,glow,c,style){
    let s='';
    if(style==='bell'){ // saçma — geniş çan ağız
      s+='<path d="M-'+(w*0.55).toFixed(1)+' '+(top+6)+' L-'+(w*1.95).toFixed(1)+' '+(top-6)+' L-'+(w*2.05).toFixed(1)+' '+(top-9)+' L'+(w*2.05).toFixed(1)+' '+(top-9)+' L'+(w*1.95).toFixed(1)+' '+(top-6)+' L'+(w*0.55).toFixed(1)+' '+(top+6)+' Z" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width="1"/>';
      s+='<ellipse cx="0" cy="'+(top-8)+'" rx="'+(w*1.95).toFixed(1)+'" ry="2.6" fill="#05070c"/>';
      s+='<circle cx="0" cy="'+(top-8)+'" r="'+(w*1.35).toFixed(1)+'" fill="url(#'+p+'mz)"><animate attributeName="opacity" values="1;.6;1" dur="1.4s" repeatCount="indefinite"/></circle>';
      return s;
    }
    if(style==='brake'){ // sniper — namlu freni
      s+='<rect x="-'+(w*0.95).toFixed(1)+'" y="'+(top-11)+'" width="'+(w*1.9).toFixed(1)+'" height="13" rx="1.4" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".9"/>';
      s+='<rect x="-'+(w*0.95).toFixed(1)+'" y="'+(top-8)+'" width="'+(w*1.9).toFixed(1)+'" height="1.6" fill="#04060a"/><rect x="-'+(w*0.95).toFixed(1)+'" y="'+(top-4.4)+'" width="'+(w*1.9).toFixed(1)+'" height="1.6" fill="#04060a"/>';
      s+='<circle cx="0" cy="'+(top-9)+'" r="'+(w*0.7).toFixed(1)+'" fill="url(#'+p+'mz)"/>';
      return s;
    }
    if(style==='coil'){ // cannon — dev ağız + enerji halkaları
      s+='<rect x="-'+(w*0.9).toFixed(1)+'" y="'+(top-3)+'" width="'+(w*1.8).toFixed(1)+'" height="9" rx="2" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width="1"/>';
      for(let k=0;k<3;k++){ const ry=top+1-k*5; s+='<ellipse cx="0" cy="'+ry.toFixed(1)+'" rx="'+(w*1.0+k*0.7).toFixed(1)+'" ry="2.3" fill="none" stroke="url(#'+p+'ac)" stroke-width="1.7" opacity=".85"><animate attributeName="opacity" values=".85;.3;.85" dur="1.4s" begin="'+(k*0.3)+'s" repeatCount="indefinite"/></ellipse>'; }
      s+='<circle cx="0" cy="'+(top-4)+'" r="'+(w*1.1).toFixed(1)+'" fill="url(#'+p+'mz)"><animate attributeName="r" values="'+(w*1.1).toFixed(1)+';'+(w*1.5).toFixed(1)+';'+(w*1.1).toFixed(1)+'" dur="1.5s" repeatCount="indefinite"/></circle>';
      return s;
    }
    // varsayılan halka ağız (+flare seçeneği)
    s+='<rect x="-'+(w*0.82).toFixed(1)+'" y="'+(top-3)+'" width="'+(w*1.64).toFixed(1)+'" height="6" rx="1.4" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".8"/>';
    if(style==='flare') s+='<path d="M-'+(w*0.82).toFixed(1)+' '+(top-1)+' L-'+(w*1.3).toFixed(1)+' '+(top-7)+' L'+(w*1.3).toFixed(1)+' '+(top-7)+' L'+(w*0.82).toFixed(1)+' '+(top-1)+' Z" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".7"/>';
    s+='<circle cx="0" cy="'+(top-(style==='flare'?6:2))+'" r="'+(w*0.62).toFixed(1)+'" fill="url(#'+p+'mz)"><animate attributeName="r" values="'+(w*0.62).toFixed(1)+';'+(w*0.9).toFixed(1)+';'+(w*0.62).toFixed(1)+'" dur="1.5s" repeatCount="indefinite"/></circle>';
    return s;
  }
  // daha geniş ergonomik kabza (sola-aşağı) + tier kayışı
  function grip(p,gx,t){ gx=gx||0; t=t||0;
    let s='<g transform="translate('+gx+' 0)"><path d="M-3.4 1 Q-10.4 6 -8.8 21 L0.8 22 Q2.6 9 4.2 2 Z" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width="1"/>'
      +'<path d="M-3.4 1 Q-7.4 4 -7.8 12 L-1.8 12 L0.6 2 Z" fill="#fff" opacity=".07"/>'
      +'<path d="M-6.8 9 L-1.2 10 M-7.2 13 L-1 14 M-7.2 17 L-1.6 18" stroke="#04060a" stroke-width="1" opacity=".55"/>';
    if(t>=3) s+='<rect x="-7.4" y="7.5" width="2" height="11.5" rx="1" fill="url(#'+p+'ac)" opacity=".85"/>';
    return s+'</g>';
  }
  function trigger(p){ return '<path d="M2.5 3 Q11 4 11 12 Q8.4 13.6 6.8 10 Q5.8 6 1.6 6 Z" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".7"/>'
    +'<path d="M4 5.6 Q6 6.2 6.4 9" stroke="#9fb0c4" stroke-width="1.3" fill="none" opacity=".7"/>'; }

  // ana gövde (receiver) — eskisinden geniş + tier aksan plakası
  function body(p,o,topRecv,t,w){ w=w||16.5; t=t||0; const x=-(w*0.42);
    let s='<rect x="'+x.toFixed(1)+'" y="'+topRecv+'" width="'+w+'" height="'+(5-topRecv).toFixed(1)+'" rx="2.8" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width="1"/>'
      +'<rect x="'+x.toFixed(1)+'" y="'+topRecv+'" width="4" height="'+(5-topRecv).toFixed(1)+'" fill="#fff" opacity=".07"/>'
      +'<rect x="'+(x+w-2.6).toFixed(1)+'" y="'+topRecv+'" width="2.6" height="'+(5-topRecv).toFixed(1)+'" fill="#000" opacity=".26"/>';
    if(t>=1) s+='<rect x="'+(x+1.6).toFixed(1)+'" y="'+(topRecv+1.4).toFixed(1)+'" width="'+(w-4).toFixed(1)+'" height="1.6" rx=".8" fill="url(#'+p+'ac)" opacity=".85"/>';
    return s;
  }
  // namlu — enerji kanalı + soğutma halkaları + tier bobinleri
  function barrel(p,o,t){ t=t||0; const bw=o.bw||4, top=-16-o.len, len=o.len;
    let s='<rect x="-'+(bw/2).toFixed(1)+'" y="'+top+'" width="'+bw+'" height="'+(len+5).toFixed(1)+'" rx="'+(bw*0.4).toFixed(1)+'" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".8"/>';
    s+='<rect x="-1.1" y="'+(top+4)+'" width="2.2" height="'+(len-6).toFixed(1)+'" fill="'+o.c+'" opacity=".58" filter="url(#'+p+'gl)"/>';
    for(let y=top+8;y<-18;y+=Math.max(8,len/5)) s+='<rect x="-'+(bw/2+1).toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+(bw+2)+'" height="2.2" rx="1" fill="#1a2028" stroke="#04060a" stroke-width=".5"/>';
    if(t>=2){ const nc=Math.min(t,4); for(let k=0;k<nc;k++){ const yy=top+len-3-k*4; s+='<rect x="-'+(bw/2+1.6).toFixed(1)+'" y="'+yy.toFixed(1)+'" width="'+(bw+3.2)+'" height="1.7" rx=".8" fill="url(#'+p+'ac)" opacity=".85"/>'; } }
    return s;
  }
  function scope(p,y,big){ const r=big?2.1:1.7,h=big?13:9.5;
    return '<rect x="-4" y="'+(y-h/2).toFixed(1)+'" width="8" height="'+h+'" rx="2.4" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".9"/>'
    +'<rect x="-4" y="'+(y-h/2).toFixed(1)+'" width="8" height="2" rx="1.2" fill="url(#'+p+'ac)"/>'
    +'<circle cx="0" cy="'+(y+0.5)+'" r="'+r+'" fill="#7fe0ff" opacity=".9"><animate attributeName="opacity" values=".9;.5;.9" dur="1.8s" repeatCount="indefinite"/></circle>'
    +'<rect x="-1.3" y="'+(y-h/2-2.4).toFixed(1)+'" width="2.6" height="3" rx="1" fill="url(#'+p+'mt)"/>'; }
  function stock(p,t){ let s='<path d="M-6 4 Q-16.5 6 -17.5 16 Q-16.5 21 -8.5 21 L-6.6 6 Z" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".9"/>'
    +'<path d="M-13 8 L-9 9" stroke="#9fb0c4" stroke-width="1" opacity=".4"/>';
    if((t||0)>=3) s+='<rect x="-16" y="14" width="8" height="2.2" rx="1" fill="url(#'+p+'ac)" opacity=".75"/>';
    return s; }

  /* AYNI ARKETİPTEKİ silahları görsel olarak ayıran varyant aksanları (sadece renk değil) */
  function variantKit(p,o,top,bw,c,acc,glow){
    const v=o.v||0, arch=o.arch; let s='';
    if(arch==='pistol'){
      if(v>=1){
        s+='<rect x="-1.2" y="'+(top-1)+'" width="2.4" height="5" rx="1" fill="url(#'+p+'mt2)"/>';
        s+='<rect x="-3" y="-7" width="2.2" height="2.2" fill="#0a0e14"/><rect x="0.8" y="-7" width="2.2" height="2.2" fill="#0a0e14"/>';
        s+='<rect x="-5.5" y="-9" width="11" height="2.4" rx="1" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".4"/>';
        s+='<circle cx="4.2" cy="-7.8" r="1" fill="'+glow+'"><animate attributeName="opacity" values="1;.3;1" dur="1.3s" repeatCount="indefinite"/></circle>';
      }
    } else if(arch==='dual'){
      if(v>=1) s+='<path d="M-4 1 Q-7 7 -3 11 L2 9 Q1 4 2 1 Z" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".5" opacity=".9"/>';
      if(v>=2){ s+='<rect x="-5" y="-15" width="10" height="1.8" rx=".8" fill="url(#'+p+'ac)" opacity=".8"/>'; s+='<rect x="-1" y="'+(top+1)+'" width="2" height="3" fill="url(#'+p+'mt)"/>'; }
    } else if(arch==='carbine'){
      if(v>=1){
        for(let k=0;k<4;k++) s+='<rect x="'+(bw/2+0.5).toFixed(1)+'" y="'+(top+6+k*4)+'" width="3" height="2.4" rx="1" fill="#141a22" stroke="#04060a" stroke-width=".4"/>';
        s+='<circle cx="-7.5" cy="-3.5" r="4.8" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".7"/>'+cell(p,-9,-9,3,8);
      }
    } else if(arch==='sniper'){
      if(v>=1){
        s+='<rect x="-3" y="-26" width="6" height="6" rx="2" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".7"/><circle cx="0" cy="-23" r="1.4" fill="#7fe0ff"/>';
        s+='<rect x="-'+(bw/2+2).toFixed(1)+'" y="'+(top-2)+'" width="'+(bw+4)+'" height="4" rx="1.4" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".6"/>';
        s+='<circle cx="-11" cy="13" r="2" fill="none" stroke="url(#'+p+'mt)" stroke-width="1.4"/>';
      }
    } else if(arch==='scatter'){
      if(v>=1){
        s+='<circle cx="7.5" cy="-5" r="4.4" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".7"/>'+cell(p,6,-11,3,8);
        s+='<ellipse cx="0" cy="'+(top-10)+'" rx="'+(bw*1.6).toFixed(1)+'" ry="2.4" fill="none" stroke="url(#'+p+'ac)" stroke-width="1.4" opacity=".7"/>';
      }
    } else if(arch==='repeater'){
      if(v>=1){
        s+='<circle cx="9.5" cy="-5.5" r="4.2" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".7"/>'+cell(p,8,-12,2.8,8);
        for(let k=0;k<4;k++) s+='<rect x="-3.5" y="'+(-20-k*3)+'" width="7" height="2" rx="1" fill="#141a22" stroke="#04060a" stroke-width=".4"/>';
      }
    } else if(arch==='cannon'){
      if(v>=1){
        s+='<rect x="-17" y="-22" width="3" height="22" rx="1.4" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".6"/><rect x="14" y="-22" width="3" height="22" rx="1.4" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".6"/>';
        s+='<path d="M-'+(bw/2+1).toFixed(1)+' '+top+' L-'+(bw/2+5).toFixed(1)+' '+(top-9)+' M'+(bw/2+1).toFixed(1)+' '+top+' L'+(bw/2+5).toFixed(1)+' '+(top-9)+'" stroke="url(#'+p+'mt)" stroke-width="2" stroke-linecap="round"/>';
        s+='<path d="M-4 6 L-9 14 M4 6 L9 14" stroke="url(#'+p+'mt)" stroke-width="2.4" stroke-linecap="round"/>';
      }
    }
    return s;
  }

  function drawBlaster(p,o){
    const arch=o.arch, glow=o.glow||'#fff', c=o.c, t=tnum(o), acc=TIER_ACC[o.tier]||'#9fb0c4';
    let s=bdefs(p,c,glow,acc);
    const top=-16-o.len, bw=o.bw||4;

    if(arch==='cannon'){
      // DEV kuşatma çerçevesi — yan enerji tankları, bobinler, koca ağız
      s+='<rect x="-11.5" y="-25" width="25" height="31" rx="4.2" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width="1.3"/>';
      s+='<rect x="-11.5" y="-25" width="6" height="31" fill="#fff" opacity=".06"/>';
      s+='<rect x="-15" y="-20" width="5.2" height="19" rx="2.4" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".9"/>'+cell(p,-14,-18,3.4,15);
      s+='<rect x="11.6" y="-19" width="4.8" height="17" rx="2.2" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".9"/>'+cell(p,12.4,-17,2.8,13);
      s+=vents(p,-7,-23,13,5);
      s+='<circle cx="2.5" cy="-9" r="5.4" fill="url(#'+p+'core)"><animate attributeName="opacity" values="1;.6;1" dur="1.6s" repeatCount="indefinite"/></circle>';
      s+='<rect x="-'+(bw/2).toFixed(1)+'" y="'+top+'" width="'+bw+'" height="'+(o.len+11).toFixed(1)+'" rx="3.2" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width="1"/>';
      s+='<rect x="-2.4" y="'+(top+7)+'" width="4.8" height="'+(o.len-9).toFixed(1)+'" fill="'+c+'" opacity=".6" filter="url(#'+p+'gl)"/>';
      for(let y=top+13;y<-23;y+=11) s+='<rect x="-'+(bw/2+2).toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+(bw+4)+'" height="3" rx="1.4" fill="#141a22" stroke="#04060a" stroke-width=".6"/>';
      for(let k=0;k<4;k++){ const yy=top+o.len-2-k*5; s+='<ellipse cx="0" cy="'+yy.toFixed(1)+'" rx="'+(bw/2+3).toFixed(1)+'" ry="2.4" fill="none" stroke="url(#'+p+'ac)" stroke-width="1.8" opacity=".8"><animate attributeName="opacity" values=".8;.25;.8" dur="1.5s" begin="'+(k*0.25)+'s" repeatCount="indefinite"/></ellipse>'; }
      s+=grip(p,-1,t)+trigger(p)+stock(p,t);
      s+=variantKit(p,o,top,bw,c,acc,glow);
      s+=emit(p,top,bw*0.95,glow,c,'coil');
      return s;
    }
    if(arch==='repeater'){
      // ağır gövde + yan enerji tamburu + büyük namlu kılıfı
      s+=body(p,o,-19,t,18);
      s+='<rect x="-13.5" y="-13" width="8" height="15" rx="2" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".9"/>';
      s+='<circle cx="-9.5" cy="-5.5" r="4.6" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".8"/>'+cell(p,-11,-12,3,9);
      s+=vents(p,4,-17,8,4);
      s+=barrel(p,o,t);
      s+='<rect x="-5.5" y="'+(top+3)+'" width="11" height="5" rx="1.6" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".6"/>';
      s+=grip(p,0,t)+trigger(p)+stock(p,t);
      s+=variantKit(p,o,top,bw,c,acc,glow);
      s+=emit(p,top,bw,glow,c,'flare');
      return s;
    }
    if(arch==='sniper'){
      // uzun ince namlu + büyük dürbün + bipod + namlu freni
      s+=body(p,o,-15,t,14);
      s+=barrel(p,o,t);
      s+=scope(p,-13,t>=3);
      s+=cell(p,-5.5,-13.5,3.2,10);
      s+='<path d="M-2 '+(top+20)+' L-8 '+(top+33)+' M2 '+(top+20)+' L8 '+(top+33)+'" stroke="url(#'+p+'mt)" stroke-width="2.2" stroke-linecap="round"/>';
      s+=grip(p,0,t)+trigger(p)+stock(p,t);
      s+=variantKit(p,o,top,bw,c,acc,glow);
      s+=emit(p,top,bw*1.05,glow,c,'brake');
      return s;
    }
    if(arch==='scatter'){
      // kısa + geniş çan ağız + tambur
      s+=body(p,o,-16,t,16);
      s+=barrel(p,{c:c,len:o.len,bw:bw},t);
      s+='<circle cx="-7" cy="-7" r="4.4" fill="url(#'+p+'mt)" stroke="#04060a" stroke-width=".8"/>'+cell(p,-8.4,-13,3.2,9);
      s+=grip(p,0,t)+trigger(p);
      s+=variantKit(p,o,top,bw,c,acc,glow);
      s+=emit(p,top,bw,glow,c,'bell');
      return s;
    }
    if(arch==='rifle'||arch==='carbine'){
      const rifle=arch==='rifle';
      s+=body(p,o,-18,t,rifle?17:16);
      s+=barrel(p,o,t);
      // el korumalı (handguard) + havalandırma
      s+='<rect x="-5" y="'+(top+4)+'" width="10" height="'+(rifle?9:6).toFixed(1)+'" rx="1.6" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".6"/>';
      s+=vents(p,-4,(top+6),8,rifle?3:2);
      s+=cell(p,-6,-15,3.4,12);
      if(o.scope) s+=scope(p,-12,t>=3); else { s+=rail(p,-1.6,-15,6); }
      s+=grip(p,0,t)+trigger(p)+stock(p,t);
      s+=variantKit(p,o,top,bw,c,acc,glow);
      s+=emit(p,top,bw,glow,c,rifle?'flare':'ring');
      return s;
    }
    // PISTOL / DUAL — daha geniş yan silah: kızak + horoz + enerji şarjörü + ön nişangah
    const pw=o.dual?14.5:15;
    s+=body(p,o,-15,t,pw);
    s+=barrel(p,o,t);
    s+='<rect x="-6.5" y="-15.5" width="13" height="5.4" rx="1.8" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".6"/>';   // kızak (slide)
    s+='<rect x="-5.8" y="-14" width="2.2" height="2.6" rx=".6" fill="#9fb0c4" opacity=".5"/>';                                   // tahliye portu
    s+=cell(p,-5.4,-12,3.4,7.5);
    s+='<path d="M-6.4 1 Q-9 0 -9.1 -4 L-6.4 -4 Z" fill="url(#'+p+'mt2)" stroke="#04060a" stroke-width=".6"/>';                  // horoz
    s+=grip(p,0,t)+trigger(p);
    s+='<rect x="-1.3" y="'+(top+2.5)+'" width="2.6" height="3" rx="1" fill="url(#'+p+'mt)"/>';                                   // ön nişangah
    s+=variantKit(p,o,top,bw,c,acc,glow);
    s+=emit(p,top,bw,glow,c,'ring');
    return s;
  }

  /* ===================== 16 BLASTER — STAT + EKONOMİ ===================== */
  const TIER_C={Common:'#aeb8c6',Advanced:'#54e08a',Rare:'#4db8ff',Epic:'#b86bff',Legendary:'#ffb24a',Mythic:'#ff7ad8'};
  // mult=hasar çarpanı (kılıçla aynı ölçekte) · cost=gold · stat alanları kılıçla aynı motorla okunur
  const BLASTERS = [
    {n:'DL Scout Pistol',  tier:'Common',   arch:'pistol',  c:'#7fe0ff',glow:'#d8f6ff',len:18,bw:3.6, mult:1,     cost:0,      aspd:0.30,            fx:'+0.30 attack speed — light, fast sidearm'},
    {n:'Ion Sidearm',      tier:'Common',   arch:'pistol',  v:1, c:'#54e08a',glow:'#c6ffd8',len:20,bw:3.8, mult:3,     cost:300,    critCh:5,  sight:true,fx:'+5% crit chance — ionized core'},
    {n:'Twin Sparrow',     tier:'Advanced', arch:'dual',    c:'#7fe0ff',glow:'#eaffff',len:18,bw:3.6, mult:9,     cost:6e3,    aspd:0.50, dual:true, fx:'+0.50 attack speed — twin light pistols'},
    {n:'Pulse Carbine',    tier:'Advanced', arch:'carbine', c:'#4db8ff',glow:'#cfeaff',len:30,bw:4,   mult:26,    cost:90e3,   critM:1.5,           fx:'+×1.5 crit damage — steady pulse'},
    {n:'Vanguard Rifle',   tier:'Rare',     arch:'rifle',   c:'#4db8ff',glow:'#dff2ff',len:42,bw:4.2, mult:70,    cost:1.4e6,  bossDmg:0.30, scope:true, fx:'+30% boss damage — precise long shot'},
    {n:'Scatter Bolt',     tier:'Rare',     arch:'scatter', c:'#ffb24a',glow:'#ffe6b0',len:16,bw:5,   mult:180,   cost:20e6,   aspd:0.60,          fx:'+0.60 attack speed — close-range spread'},
    {n:'Twin Vipers',      tier:'Rare',     arch:'dual',    v:1, c:'#b86bff',glow:'#e8d6ff',len:22,bw:4,   mult:460,   cost:260e6,  critCh:6,  dual:true, fx:'+6% crit chance — twin heavy pistols'},
    {n:'Ranger Longshot',  tier:'Epic',     arch:'sniper',  c:'#54e0c8',glow:'#d8fff6',len:54,bw:3.4, mult:1.1e3, cost:3.4e9,  bossDmg:0.45, scope:true, pierce:true, fx:'+45% boss damage · piercing bolt'},
    {n:'Heavy Repeater',   tier:'Epic',     arch:'repeater',c:'#ff6a4a',glow:'#ffd0b8',len:38,bw:5,   mult:2.8e3, cost:44e9,   aspd:0.50,          fx:'+0.50 attack speed — heavy frame, single fire'},
    {n:'Plasma Carbine',   tier:'Epic',     arch:'carbine', v:1, c:'#b86bff',glow:'#ecdcff',len:34,bw:4.4, mult:7e3,   cost:560e9,  critM:2,   scope:true, fx:'+×2 crit damage — superheated plasma'},
    {n:'Nova Sniper',      tier:'Legendary',arch:'sniper',  v:1, c:'#ffb24a',glow:'#fff0c0',len:60,bw:3.6, mult:18e3,  cost:7e12,   bossDmg:0.50, critM:1.5, scope:true, pierce:true, fx:'+50% boss dmg, +×1.5 crit dmg · pierce'},
    {n:'Storm Scatterer',  tier:'Legendary',arch:'scatter', v:1, c:'#7fe0ff',glow:'#eafdff',len:18,bw:6,   mult:46e3,  cost:90e12,  aspd:0.70, pierce:true, fx:'+0.70 attack speed · piercing storm'},
    {n:'Dual Eclipse',     tier:'Legendary',arch:'dual',    v:2, c:'#ff4d6e',glow:'#ffc6d2',len:24,bw:4.4, mult:120e3, cost:1.1e15, critCh:6, critM:2, dual:true, pierce:true, fx:'+6% crit, +×2 crit dmg · twin pierce'},
    {n:'Siege Lance',      tier:'Legendary',arch:'cannon',  c:'#4db8ff',glow:'#dff2ff',len:50,bw:8,   mult:320e3, cost:14e15,  bossDmg:0.60, pierce:true, fx:'+60% boss damage — one massive bolt'},
    {n:'Annihilator',     tier:'Mythic',    arch:'repeater',v:1, c:'#ff7ad8',glow:'#ffd8f4',len:44,bw:6,   mult:850e3, cost:175e15, allplus:0.04, pierce:true, fx:'+4% ALL stats · piercing repeater'},
    {n:'Starfire Cannon', tier:'Mythic',    arch:'cannon',  v:1, c:'#ff7ad8',glow:'#ffe0f6',len:56,bw:9,   mult:2.2e6, cost:2.2e18, allplus:0.05, bossDmg:0.50, pierce:true, fx:'+5% ALL stats, +50% boss dmg · pierce'}
  ];
  const STAT_KEYS=['critCh','critM','bossDmg','aspd','allplus','cred','forceXp','offRate'];
  function blasterArt(i,p){ const o=BLASTERS[i]||BLASTERS[0]; return drawBlaster((p||'b')+i+'_', o); }
  window.NB_BLASTER_ART = blasterArt;
  window.NB_BLASTERS = BLASTERS;

  /* ===================== DURUM ===================== */
  function ensure(){
    if(S.cls!=='blaster'&&S.cls!=='saber') S.cls='saber';
    if(typeof S.blasterEq!=='number') S.blasterEq=0;
    if(typeof S.blastersOwned!=='number') S.blastersOwned=1;   // ilk tabanca hediye (0 maliyet)
    if(!Array.isArray(S.blasterLvls)||S.blasterLvls.length!==BLASTERS.length)
      S.blasterLvls=BLASTERS.map((_,i)=>i<S.blastersOwned?1:0);
    return S;
  }

  /* ===================== EKONOMİ (gold) ===================== */
  const BUP_G=1.32;
  function blasterLevel(i){ return S.blasterLvls[i] || (i<S.blastersOwned?1:0); }
  function blasterEffMult(i){ return BLASTERS[i].mult*(1+0.25*Math.max(0,blasterLevel(i)-1)); }
  function upBase(i){ return Math.max(150, BLASTERS[i].cost*0.6); }
  function upCost(i,fromLvl,count){ return upBase(i)*Math.pow(BUP_G,fromLvl-1)*(Math.pow(BUP_G,count)-1)/(BUP_G-1); }
  function upMaxBuy(i){ const a=upBase(i)*Math.pow(BUP_G,blasterLevel(i)-1); return Math.max(0,Math.floor(Math.log(S.credits*(BUP_G-1)/a+1)/Math.log(BUP_G))); }

  // CORE KANCALARI: aktif blaster'ın çarpanı + stat profili (sınıf blaster iken kullanılır)
  window.NB_blasterMult = function(){ return blasterEffMult(S.blasterEq); };
  window.NB_blasterStat = function(){
    const o=BLASTERS[S.blasterEq]||{}; const out={};
    STAT_KEYS.forEach(k=>{ if(o[k]!=null) out[k]=o[k]; });
    return out;
  };

  /* ===================== KAHRAMAN POZU ===================== */
  function armorCols(){
    var a=(window.ARMORS&&S&&ARMORS[S.armorEq]&&ARMORS[S.armorEq].c)||{};
    return { body:a.body||'#7d8aa3', dark:a.cloak||a.trim||'#3a4150', glove:a.trim||a.cloak||'#2a3140' };
  }
  function poseInto(svg){
    if(!svg) return;
    const g=svg.querySelector('#swordG'); if(!g) return;
    const o=BLASTERS[S.blasterEq]||BLASTERS[0];
    g.setAttribute('transform','translate(82 83) rotate('+POSE_ROT+')');
    g.innerHTML='<g class="nbGunInner" transform="scale(1.06)">'+blasterArt(S.blasterEq,'hb')+'</g>';
    const tr=svg.querySelector('#slashTrail'); if(tr) tr.style.display='none';
    // varsa eski iki-el silah parçalarını ve sap elini gizle
    svg.querySelectorAll('#nbOffArm').forEach(e=>e.remove());
    if(o.dual){
      const c=armorCols();
      const off=document.createElementNS(NS,'g'); off.id='nbOffArm';
      // sol kol: omuzdan (57,60) çapraz öne, el ~(70,99)
      off.innerHTML=
         '<path d="M57 60 Q60 84 70 99" stroke="'+c.dark+'" stroke-width="9.4" stroke-linecap="round" fill="none"/>'
        +'<path d="M57 60 Q60 84 70 99" stroke="'+c.body+'" stroke-width="6.6" stroke-linecap="round" fill="none"/>'
        +'<path d="M57 61 Q59 78 66 92" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".1"/>'
        +'<ellipse cx="70" cy="99" rx="4.2" ry="4.3" fill="'+c.dark+'"/>'
        +'<rect x="67.6" y="96" width="4.8" height="2.2" rx="1" fill="'+c.body+'"/>'
        +'<g id="nbOffGun" transform="translate(70 99) rotate('+(POSE_ROT-3)+')"><g class="nbGunInner" transform="scale(.9)">'+blasterArt(S.blasterEq,'hbo')+'</g></g>';
      // ön gövde grubunun içine (torsonun önüne) ekle
      const front=svg.querySelector('#nbBodyF')||svg;
      front.appendChild(off);
    }
  }
  function applyPose(){ poseInto(document.querySelector('#heroWrap svg')); }
  window.NB_applyPoseTo = function(hostEl){ if(hostEl) poseInto(hostEl.querySelector('svg')); };

  /* ===================== ATEŞ ANİMASYONU ===================== */
  let dualToggle=0;
  function gunMuzzlePos(gunEl, sceneEl){
    if(!gunEl||!sceneEl) return null;
    const gr=gunEl.getBoundingClientRect(), sr=sceneEl.getBoundingClientRect();
    if(!gr.width) return null;
    // namlu, sağ-üst köşeye yakın (silah sağa-yukarı bakar)
    return { x: gr.right - sr.left - 2, y: gr.top - sr.top + gr.height*0.30 };
  }
  function recoil(innerEl, dual){
    if(!innerEl||!innerEl.animate) return;
    const base=innerEl.getAttribute('transform')||'scale(1)';
    // namlu geri tepkisi: barrel boyunca geri + yukarı tırmanış (muzzle climb) + hızlı toparlanma
    try{ innerEl.animate(
      [{transform:base+' translate(0,0) rotate(0deg)'},
       {transform:base+' translate(3px,6px) rotate(-9deg)', offset:.28},
       {transform:base+' translate(1px,2px) rotate(-3deg)', offset:.55},
       {transform:base+' translate(0,0) rotate(0deg)'}],
      {duration:230,easing:'cubic-bezier(.18,.9,.28,1)'}); }catch(e){}
  }
  function fireBoltFrom(host, sceneEl, gunEl, o, big){
    const L=document.getElementById('fxLayer')||sceneEl;
    const m=gunMuzzlePos(gunEl, sceneEl); if(!m) return;
    let tx, ty;
    try{ if(typeof enemyCenter==='function' && typeof enemy!=='undefined' && enemy && enemy.hp>0){ const ec=enemyCenter(); tx=ec.x; ty=ec.y; } }catch(e){}
    if(typeof window.__nbBoltTarget==='function'){ const t=window.__nbBoltTarget(); if(t){ tx=t.x; ty=t.y; } }
    if(tx==null){ tx=m.x+170; ty=m.y; }
    const fl=document.createElement('div'); fl.className='nbMuzzle'; fl.style.left=m.x+'px'; fl.style.top=m.y+'px';
    fl.style.setProperty('--mc',o.glow); fl.style.setProperty('--mc2',o.c);
    if(big) fl.style.setProperty('--ms','1.4');
    L.appendChild(fl); setTimeout(()=>fl.remove(),190);
    const dx=tx-m.x, dy=ty-m.y, ang=Math.atan2(dy,dx)*180/Math.PI;
    const bolt=document.createElement('div'); bolt.className='nbBolt'+(o.pierce?' pierce':'')+(big?' big':'');
    bolt.style.left=m.x+'px'; bolt.style.top=m.y+'px';
    bolt.style.width=(o.arch==='cannon'?30:(o.pierce?24:o.arch==='sniper'?22:16))+'px';
    bolt.style.setProperty('--bc',o.c); bolt.style.setProperty('--bg',o.glow);
    bolt.style.transform='rotate('+ang.toFixed(1)+'deg)';
    L.appendChild(bolt);
    requestAnimationFrame(()=>{
      bolt.style.transition='transform '+(big?110:92)+'ms linear, opacity 80ms ease-out '+(big?70:55)+'ms';
      bolt.style.transform='translate('+dx.toFixed(0)+'px,'+dy.toFixed(0)+'px) rotate('+ang.toFixed(1)+'deg)';
      bolt.style.opacity='0';
    });
    setTimeout(()=>bolt.remove(), big?240:200);
  }
  function fireFromHost(host, sceneEl, big){
    if(!host||!sceneEl) return;
    const o=BLASTERS[S.blasterEq]||BLASTERS[0];
    host.classList.remove('nbRecoil'); void host.offsetWidth; host.classList.add('nbRecoil');
    setTimeout(()=>host.classList.remove('nbRecoil'), big?320:290);
    const svg=host.querySelector('svg'); if(!svg) return;
    let gunEl=svg.querySelector('#swordG');
    if(o.dual){
      const off=svg.querySelector('#nbOffGun');
      dualToggle^=1;
      if(dualToggle && off){ gunEl=off; }
    }
    const inner=gunEl?gunEl.querySelector('.nbGunInner'):null;
    recoil(inner, o.dual);
    fireBoltFrom(host, sceneEl, gunEl, o, big);
  }
  function blasterFire(big){ fireFromHost(document.getElementById('heroWrap'), document.getElementById('scene'), big); }
  // World Boss arenasından çağrılır: hedefi tt sağlar
  window.NB_blasterFireAt = function(hostEl, targetFn, big){
    const sc=document.getElementById('scene');
    window.__nbBoltTarget = targetFn || null;
    fireFromHost(hostEl, sc, big);
    window.__nbBoltTarget = null;
  };
  window.NB_isBlaster = function(){ return S.cls==='blaster'; };

  /* ===================== OVERRIDE'LAR ===================== */
  function install(){
    if(window.__nbClassInstalled) return; window.__nbClassInstalled=true;
    const _render=window.renderHero;
    window.renderHero=function(){ _render.apply(this,arguments); if(S.cls==='blaster') applyPose(); };
    const _swing=window.heroSwing;
    window.heroSwing=function(big){ if(S.cls==='blaster'){ blasterFire(big); return; } return _swing.apply(this,arguments); };
    document.body.classList.toggle('blasterCls', S.cls==='blaster');
    if(S.cls==='blaster'){ try{ renderHero(false); }catch(e){} }
  }

  /* ===================== SINIF / EKİPMAN ===================== */
  function setClass(cls){
    if(cls!=='saber'&&cls!=='blaster' || S.cls===cls) return;
    S.cls=cls; document.body.classList.toggle('blasterCls', cls==='blaster');
    try{ renderHero(true); }catch(e){}
    try{ if(cls==='blaster'){ var o=BLASTERS[S.blasterEq]; heroFlare&&heroFlare(o?o.glow:'#7fe0ff'); } else { heroFlare&&heroFlare(sword?sword().glow:'#7fe0ff'); } }catch(e){}
    try{ sfx.buy&&sfx.buy(); }catch(e){}
    try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){}
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
  }
  function equipBlaster(i){
    if(i>=S.blastersOwned) return;
    S.blasterEq=i; S.cls='blaster'; document.body.classList.add('blasterCls');
    try{ renderHero(true); }catch(e){}
    try{ heroFlare&&heroFlare(BLASTERS[i].glow); sfx.buy&&sfx.buy(); }catch(e){}
    try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){}
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
    renderPanel();
  }
  function buyBlaster(i){
    if(i!==S.blastersOwned || S.credits<BLASTERS[i].cost) return;
    S.credits-=BLASTERS[i].cost; S.blastersOwned++; S.blasterLvls[i]=Math.max(1,S.blasterLvls[i]||0);
    S.blasterEq=i; S.cls='blaster'; document.body.classList.add('blasterCls');
    try{ renderHero(true); heroFlare&&heroFlare(BLASTERS[i].glow); sfx.buy&&sfx.buy(); }catch(e){}
    try{ toast('New blaster acquired!','<b>'+BLASTERS[i].n+'</b> — ×'+fmt(BLASTERS[i].mult)+' damage','gold'); }catch(e){}
    try{ if(typeof fullRefresh==='function') fullRefresh(); if(typeof checkAch==='function') checkAch(); }catch(e){}
    renderPanel();
  }
  function buyBlasterLevel(i){
    if(i>=S.blastersOwned) return;
    const lvl=blasterLevel(i);
    const n=(window.buyMult==='max')?Math.max(1,upMaxBuy(i)):parseInt(window.buyMult||'1',10);
    const cost=upCost(i,lvl,n);
    if(S.credits<cost) return;
    S.credits-=cost; S.blasterLvls[i]=lvl+n;
    try{ if(i===S.blasterEq && S.cls==='blaster'){ heroFlare&&heroFlare(BLASTERS[i].glow); } sfx.buy&&sfx.buy(); }catch(e){}
    try{ if(typeof checkAch==='function') checkAch(); if(typeof fullRefresh==='function') fullRefresh(); }catch(e){}
    renderPanel();
  }
  window.NB_setClass=setClass; window.NB_equipBlaster=equipBlaster;

  /* ===================== GALERİ (Weapons sekmesi · Blaster alt-sekmesi) ===================== */
  function statLine(o){
    const parts=[];
    if(o.aspd) parts.push('+'+o.aspd+' atk spd');
    if(o.critCh) parts.push('+'+o.critCh+'% crit');
    if(o.critM) parts.push('+×'+o.critM+' crit dmg');
    if(o.bossDmg) parts.push('+'+Math.round(o.bossDmg*100)+'% boss');
    if(o.allplus) parts.push('+'+Math.round(o.allplus*100)+'% ALL');
    return parts.join(' · ');
  }
  window.blasterGalleryHtml=function(){
    ensure();
    let h='<p class="note">Blasters are a <b style="color:var(--cyan)">separate ranged weapon class</b> with their own damage, crit, boss & speed stats and their own gold upgrades. They are <b>bought</b>, not wave-unlocked. Equipping one switches you to the <b>Blaster class</b>; equip a blade to return to <b>Saber</b>. Every shot is a single manual bolt — never automatic.</p>';
    h+='<div class="swGallery">';
    BLASTERS.forEach((o,i)=>{
      const owned=i<S.blastersOwned, next=i===S.blastersOwned, reveal=owned||next, eq=(S.cls==='blaster'&&S.blasterEq===i), lvl=blasterLevel(i);
      const inner = o.dual
        ? '<g transform="translate(7 5) rotate(8) scale(.9)" opacity=".8">'+blasterArt(i,'galB')+'</g>'
          +'<g transform="translate(-6 -2) rotate(-6)">'+blasterArt(i,'galF')+'</g>'
        : blasterArt(i,'gal');
      const art = reveal
        ? '<svg viewBox="-38 -90 76 118" preserveAspectRatio="xMidYMid meet"><g transform="rotate(-16)">'+inner+'</g></svg>'
        : '<div class="swLocked">?</div>';
      let btns='';
      if(owned){
        if(eq) btns='<button class="lootBtn on" disabled style="--lc:'+o.c+'">Equipped ★</button>';
        else btns='<button class="lootBtn" data-act="eqBlaster" data-i="'+i+'" style="--lc:'+o.c+'">Equip</button>';
        const n=(window.buyMult==='max')?Math.max(1,upMaxBuy(i)):parseInt(window.buyMult||'1',10);
        const cost=upCost(i,lvl,n), can=S.credits>=cost;
        btns+='<button class="lootBtn up'+(can?'':' dim')+'" data-act="upBlaster" data-i="'+i+'"'+(can?'':' disabled')+'>Lv '+lvl+' → '+(lvl+n)+'<br><span style="font-size:10px">💰 '+fmt(cost)+'</span></button>';
      } else if(next){
        const can=S.credits>=o.cost;
        btns='<button class="lootBtn buy'+(can?'':' dim')+'" data-act="buyBlaster" data-i="'+i+'"'+(can?'':' disabled')+'>Buy · 💰 '+fmt(o.cost)+'</button>';
      } else {
        btns='<button class="lootBtn" disabled>🔒 Buy previous first</button>';
      }
      h+='<div class="swCard'+(eq?' eqd':'')+(reveal?'':' lck')+'">'
        +'<div class="swArt">'+art+(reveal?'<span class="swTier" data-t="'+o.tier+'">'+o.tier+'</span>':'')+(eq?'<span class="swEq">EQUIPPED</span>':'')+(owned?'<span class="swLv">Lv '+lvl+'</span>':'')+'</div>'
        +'<div class="swInfo">'
          +'<div class="swName">'+(reveal?o.n:'???')+(o.dual?' <span class="rLvl">TWIN</span>':'')+(o.pierce?' <span class="rLvl" style="color:#ff7ad8;border-color:#ff7ad8">PIERCE</span>':'')+'</div>'
          +'<div class="swDesc">'+(reveal?'×'+fmt(blasterEffMult(i))+' damage · '+statLine(o):'Buy the previous blaster to reveal')+'</div>'
          +(reveal?'<div class="swFx">◆ '+o.fx+'</div>':'')
          +'<div class="swBtns">'+btns+'</div>'
        +'</div>'
      +'</div>';
    });
    h+='</div>';
    return h;
  };
  window.classSubNavHtml=function(){
    ensure();
    const cat=window.swCat==='blaster'?'blaster':'saber';
    return '<div class="subNav clsSub">'
      +'<button class="subBtn'+(cat==='saber'?' on':'')+'" data-act="swCat" data-ssub="saber">🗡 Sabers'+(S.cls==='saber'?' · active':'')+'</button>'
      +'<button class="subBtn'+(cat==='blaster'?' on':'')+'" data-act="swCat" data-ssub="blaster">🔫 Blasters'+(S.cls==='blaster'?' · active':'')+'</button>'
      +'</div>';
  };

  /* ===================== ENTEGRASYON ===================== */
  function ready(){
    if(typeof S==='undefined' || typeof renderHero!=='function' || typeof heroSwing!=='function'){ return setTimeout(ready,200); }
    ensure(); install();
    const panel=document.getElementById('panel');
    if(panel){
      panel.addEventListener('click',function(e){
        const btn=e.target.closest('[data-act]'); if(!btn) return;
        const act=btn.dataset.act;
        if(act==='swCat'){ window.swCat=btn.dataset.ssub; renderPanel(); }
        else if(act==='eqBlaster'){ equipBlaster(+btn.dataset.i); }
        else if(act==='buyBlaster'){ buyBlaster(+btn.dataset.i); }
        else if(act==='upBlaster'){ buyBlasterLevel(+btn.dataset.i); }
        else if(act==='eqSword'){ setClass('saber'); }
      });
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ready);
  else ready();
})();
