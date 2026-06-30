/* =============================================================================
   NOVA BLADE · COMPANION BEASTS (PET) SİSTEMİ
   - Yumurtadan rastgele pet: common / regular / rare / epic / legendary
   - Dragon City tarzı kuluçka: 30 / 45 / 60 / 80 / 90 dk (nadirliğe göre)
   - Tek kuluçka yuvası; ek yuva 49₺
   - Farklı gezegenlerden el çizimi SVG yaratıklar
   - Dengeli pasif bonuslar (aktif companion + koleksiyon bonusu) — mevcut
     artifactBonus/artifactFlat kancalarına eklenir, core formülleri değişmez.
   ============================================================================= */
(function(){

  /* ============================================================
     YARATIK ÇİZİMLERİ — viewBox 0 0 100 100, öne bakan companion
     c = {base, dark, light, belly, accent, eye, glow}
     ============================================================ */
  function defs(p,c){
    return '<defs>'
      +'<radialGradient id="'+p+'bd" cx=".42" cy=".34" r=".85"><stop offset="0" stop-color="'+c.light+'"/><stop offset=".55" stop-color="'+c.base+'"/><stop offset="1" stop-color="'+c.dark+'"/></radialGradient>'
      +'<radialGradient id="'+p+'bl" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="'+c.belly+'"/><stop offset="1" stop-color="'+c.base+'"/></radialGradient>'
      +'<radialGradient id="'+p+'ey" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="'+c.eye+'"/><stop offset="1" stop-color="'+c.dark+'"/></radialGradient>'
      +'<filter id="'+p+'gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      +'</defs>';
  }
  function shadow(){ return '<ellipse cx="50" cy="93" rx="26" ry="5.5" fill="#000" opacity=".32"/>'; }
  function eyes(p,c,lx,rx,y,r,shine){
    const e=x=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+r+'" ry="'+(r*1.12)+'" fill="url(#'+p+'ey)"/>'
      +'<circle cx="'+x+'" cy="'+y+'" r="'+(r*0.42)+'" fill="#0a0612"/>'
      +(shine!==false?'<circle cx="'+(x-r*0.3)+'" cy="'+(y-r*0.38)+'" r="'+(r*0.26)+'" fill="#fff" opacity=".95"/>':'');
    return e(lx)+e(rx);
  }

  // 1) CRITTER — yuvarlak tüylü dört-ayaklı, büyük kulaklar
  function critter(p,c){
    let s=defs(p,c)+shadow();
    // kuyruk
    s+='<g class="nbpTail"><path d="M74 76 Q92 74 90 60 Q96 70 86 80 Q80 86 70 84 Z" fill="url(#'+p+'bd)"/></g>';
    // arka ayaklar
    s+='<ellipse cx="36" cy="86" rx="10" ry="7" fill="'+c.dark+'"/><ellipse cx="64" cy="86" rx="10" ry="7" fill="'+c.dark+'"/>';
    // gövde
    s+='<ellipse cx="50" cy="64" rx="29" ry="26" fill="url(#'+p+'bd)"/>';
    s+='<ellipse cx="50" cy="70" rx="18" ry="17" fill="url(#'+p+'bl)"/>';
    // baş
    s+='<ellipse cx="50" cy="38" rx="25" ry="22" fill="url(#'+p+'bd)"/>';
    // kulaklar
    s+='<path d="M30 26 Q20 4 30 8 Q40 14 41 28 Z" fill="url(#'+p+'bd)"/><path d="M31 24 Q26 12 31 13 Q37 18 38 26 Z" fill="'+c.accent+'" opacity=".7"/>';
    s+='<path d="M70 26 Q80 4 70 8 Q60 14 59 28 Z" fill="url(#'+p+'bd)"/><path d="M69 24 Q74 12 69 13 Q63 18 62 26 Z" fill="'+c.accent+'" opacity=".7"/>';
    // yüz
    s+='<ellipse cx="50" cy="46" rx="13" ry="9" fill="url(#'+p+'bl)"/>';
    s+=eyes(p,c,42,58,38,5.2);
    s+='<path d="M47 46 Q50 49 53 46 Z" fill="'+c.dark+'"/><circle cx="50" cy="45" r="2.4" fill="'+c.accent+'"/>';
    s+='<path d="M50 47 v3 M50 50 q-4 0 -5 -2 M50 50 q4 0 5 -2" stroke="'+c.dark+'" stroke-width="1" fill="none" opacity=".6"/>';
    return s;
  }

  // 2) LIZARD — uzun semender, sırt yelesi
  function lizard(p,c){
    let s=defs(p,c)+shadow();
    s+='<g class="nbpTail"><path d="M70 78 Q92 80 94 66 Q96 56 88 54 Q94 64 84 70 Q76 74 66 72 Z" fill="url(#'+p+'bd)"/></g>';
    // ayaklar
    s+='<ellipse cx="32" cy="84" rx="9" ry="6" fill="'+c.dark+'"/><ellipse cx="60" cy="85" rx="9" ry="6" fill="'+c.dark+'"/>';
    // gövde alçak ve uzun
    s+='<ellipse cx="48" cy="68" rx="32" ry="18" fill="url(#'+p+'bd)"/>';
    s+='<ellipse cx="48" cy="74" rx="22" ry="10" fill="url(#'+p+'bl)"/>';
    // sırt yelesi
    let crest=''; for(let i=0;i<6;i++){ const x=26+i*8; crest+='<path d="M'+x+' 56 l4 -12 l4 12 Z" fill="'+c.accent+'" opacity=".9"/>'; }
    s+=crest;
    // baş (öne)
    s+='<ellipse cx="48" cy="44" rx="22" ry="18" fill="url(#'+p+'bd)"/>';
    s+='<path d="M30 44 Q24 40 22 44 Q24 48 30 47 Z" fill="'+c.dark+'"/>';
    s+=eyes(p,c,41,57,40,5);
    s+='<path d="M40 52 q8 4 16 0" stroke="'+c.dark+'" stroke-width="1.6" fill="none" opacity=".7"/>';
    s+='<circle cx="44" cy="50" r="1.1" fill="'+c.dark+'"/><circle cx="53" cy="50" r="1.1" fill="'+c.dark+'"/>';
    return s;
  }

  // 3) BLOB — mantar/jöle, benekli
  function blob(p,c){
    let s=defs(p,c)+shadow();
    s+='<path d="M22 86 Q16 60 30 48 Q42 38 50 38 Q58 38 70 48 Q84 60 78 86 Q66 92 50 92 Q34 92 22 86 Z" fill="url(#'+p+'bd)"/>';
    // şapka
    s+='<path d="M24 56 Q26 30 50 28 Q74 30 76 56 Q60 64 50 64 Q40 64 24 56 Z" fill="url(#'+p+'bd)"/>';
    s+='<path d="M24 56 Q60 66 76 56 Q60 50 50 50 Q40 50 24 56 Z" fill="'+c.accent+'" opacity=".55"/>';
    // benekler
    s+='<circle cx="38" cy="44" r="4.5" fill="'+c.belly+'" opacity=".9"/><circle cx="60" cy="42" r="6" fill="'+c.belly+'" opacity=".9"/><circle cx="50" cy="36" r="3.5" fill="'+c.belly+'" opacity=".9"/>';
    // yüz
    s+=eyes(p,c,42,58,72,5.4);
    s+='<path d="M44 82 Q50 87 56 82" stroke="'+c.dark+'" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    return s;
  }

  // 4) FINLING — manta/balık, kanat yüzgeçleri (yüzer)
  function finling(p,c){
    let s=defs(p,c)+shadow();
    // kuyruk
    s+='<path d="M50 70 Q52 92 44 96 Q50 86 48 70 Z" fill="'+c.dark+'"/>';
    // kanatlar
    s+='<g class="nbpWingL"><path d="M50 40 Q14 44 8 68 Q30 64 50 58 Z" fill="url(#'+p+'bd)"/></g>';
    s+='<g class="nbpWingR"><path d="M50 40 Q86 44 92 68 Q70 64 50 58 Z" fill="url(#'+p+'bd)"/></g>';
    s+='<path d="M50 42 Q22 48 14 66 M50 42 Q78 48 86 66" stroke="'+c.accent+'" stroke-width="1.4" fill="none" opacity=".6"/>';
    // gövde
    s+='<path d="M50 26 Q66 30 64 56 Q58 66 50 66 Q42 66 36 56 Q34 30 50 26 Z" fill="url(#'+p+'bd)"/>';
    s+='<ellipse cx="50" cy="50" rx="9" ry="16" fill="url(#'+p+'bl)"/>';
    // baş + boynuzcuklar
    s+='<path d="M40 30 Q44 22 42 18 Q47 24 47 30 Z M60 30 Q56 22 58 18 Q53 24 53 30 Z" fill="'+c.accent+'"/>';
    s+=eyes(p,c,44,56,36,4.2);
    s+='<circle cx="50" cy="46" r="2" fill="'+c.glow+'" filter="url(#'+p+'gl)"><animate attributeName="opacity" values="1;.4;1" dur="2.4s" repeatCount="indefinite"/></circle>';
    return s;
  }

  // 5) MOTH — kelebek/güve, geniş kanatlar
  function moth(p,c){
    let s=defs(p,c)+shadow();
    // alt kanatlar
    s+='<path d="M50 56 Q20 64 16 86 Q34 84 50 72 Z" fill="url(#'+p+'bd)" opacity=".96"/>';
    s+='<path d="M50 56 Q80 64 84 86 Q66 84 50 72 Z" fill="url(#'+p+'bd)" opacity=".96"/>';
    // üst kanatlar
    s+='<g class="nbpWingL"><path d="M50 50 Q14 30 10 50 Q14 66 50 62 Z" fill="url(#'+p+'bd)"/></g>';
    s+='<g class="nbpWingR"><path d="M50 50 Q86 30 90 50 Q86 66 50 62 Z" fill="url(#'+p+'bd)"/></g>';
    // kanat desenleri
    s+='<circle cx="26" cy="48" r="6" fill="'+c.accent+'" opacity=".85"/><circle cx="74" cy="48" r="6" fill="'+c.accent+'" opacity=".85"/>';
    s+='<circle cx="30" cy="78" r="4" fill="'+c.belly+'" opacity=".8"/><circle cx="70" cy="78" r="4" fill="'+c.belly+'" opacity=".8"/>';
    s+='<path d="M14 50 Q30 52 48 52 M86 50 Q70 52 52 52" stroke="'+c.glow+'" stroke-width="1" fill="none" opacity=".5"/>';
    // gövde
    s+='<ellipse cx="50" cy="58" rx="6.5" ry="20" fill="url(#'+p+'bl)"/>';
    s+='<path d="M50 58 h0 M44 56 q6 2 12 0 M44 64 q6 2 12 0 M44 72 q6 2 12 0" stroke="'+c.dark+'" stroke-width="1.2" opacity=".4"/>';
    // baş + antenler
    s+='<circle cx="50" cy="38" r="7" fill="url(#'+p+'bd)"/>';
    s+='<path d="M46 33 Q40 22 34 22 M54 33 Q60 22 66 22" stroke="'+c.dark+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    s+='<circle cx="34" cy="22" r="2.4" fill="'+c.accent+'"/><circle cx="66" cy="22" r="2.4" fill="'+c.accent+'"/>';
    s+=eyes(p,c,47,53,38,3,false);
    return s;
  }

  // 6) DRAGON — küçük kanatlı ejder, boynuzlar
  function dragon(p,c){
    let s=defs(p,c)+shadow();
    // kanatlar (arkada)
    s+='<g class="nbpWingL"><path d="M50 50 Q18 30 8 44 Q18 46 16 58 Q28 50 38 56 Q26 44 50 56 Z" fill="'+c.dark+'"/></g>';
    s+='<g class="nbpWingR"><path d="M50 50 Q82 30 92 44 Q82 46 84 58 Q72 50 62 56 Q74 44 50 56 Z" fill="'+c.dark+'"/></g>';
    s+='<path d="M50 52 Q30 42 14 46 M50 52 Q70 42 86 46" stroke="'+c.accent+'" stroke-width="1.2" fill="none" opacity=".55"/>';
    // kuyruk
    s+='<g class="nbpTail"><path d="M58 76 Q80 82 80 66 Q78 58 70 58 Q78 66 70 72 Q64 76 56 72 Z" fill="url(#'+p+'bd)"/><path d="M80 66 l8 -4 l-6 8 l6 0 Z" fill="'+c.accent+'"/></g>';
    // gövde
    s+='<path d="M36 58 Q32 84 46 88 Q50 90 54 88 Q68 84 64 58 Q62 48 50 48 Q38 48 36 58 Z" fill="url(#'+p+'bd)"/>';
    s+='<ellipse cx="50" cy="72" rx="11" ry="15" fill="url(#'+p+'bl)"/>';
    s+='<path d="M44 64 h12 M44 71 h12 M45 78 h10" stroke="'+c.belly+'" stroke-width="1.4" opacity=".5"/>';
    // küçük kollar
    s+='<g class="nbpArm nbpArmL"><path d="M38 60 Q30 66 32 74" stroke="'+c.dark+'" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
    s+='<g class="nbpArm nbpArmR"><path d="M62 60 Q70 66 68 74" stroke="'+c.dark+'" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
    // baş
    s+='<ellipse cx="50" cy="40" rx="19" ry="17" fill="url(#'+p+'bd)"/>';
    s+='<path d="M44 28 Q40 14 36 16 Q42 22 42 30 Z M56 28 Q60 14 64 16 Q58 22 58 30 Z" fill="'+c.accent+'"/>';
    s+='<path d="M40 46 Q50 52 60 46 Q56 50 50 50 Q44 50 40 46 Z" fill="'+c.dark+'"/>';
    s+=eyes(p,c,43,57,40,4.6);
    s+='<circle cx="46" cy="49" r="1" fill="'+c.dark+'"/><circle cx="54" cy="49" r="1" fill="'+c.dark+'"/>';
    return s;
  }

  // 7) SERPENT — kıvrılmış yılan, yele
  function serpent(p,c){
    let s=defs(p,c)+shadow();
    // kıvrılan gövde
    s+='<path d="M30 90 Q14 80 22 66 Q30 54 48 58 Q70 62 72 50 Q74 40 64 38" fill="none" stroke="url(#'+p+'bd)" stroke-width="15" stroke-linecap="round"/>';
    s+='<path d="M30 90 Q14 80 22 66 Q30 54 48 58 Q70 62 72 50" fill="none" stroke="'+c.belly+'" stroke-width="6" stroke-linecap="round" opacity=".55"/>';
    // yıldız pulları
    s+='<circle cx="34" cy="80" r="1.6" fill="'+c.glow+'"/><circle cx="44" cy="60" r="1.4" fill="'+c.glow+'"/><circle cx="62" cy="58" r="1.5" fill="'+c.glow+'"/>';
    // baş (üstte)
    s+='<ellipse cx="60" cy="32" rx="17" ry="15" fill="url(#'+p+'bd)"/>';
    // yele
    let mane=''; for(let i=0;i<7;i++){ const a=(-50+i*22)*Math.PI/180; const x=60+Math.cos(a)*4, y=32+Math.sin(a)*4; mane+='<path d="M'+x+' '+y+' L'+(60+Math.cos(a)*22)+' '+(32+Math.sin(a)*22)+'" stroke="'+c.accent+'" stroke-width="3" stroke-linecap="round" opacity=".85"/>'; }
    s='<g>'+mane+'</g>'+s.replace(defs(p,c),'')+defs(p,c);
    // re-stack: defs first
    s=defs(p,c)+shadow()
      +'<path d="M30 90 Q14 80 22 66 Q30 54 48 58 Q70 62 72 50 Q74 40 64 38" fill="none" stroke="url(#'+p+'bd)" stroke-width="15" stroke-linecap="round"/>'
      +'<path d="M30 90 Q14 80 22 66 Q30 54 48 58 Q70 62 72 50" fill="none" stroke="'+c.belly+'" stroke-width="6" stroke-linecap="round" opacity=".5"/>'
      +'<circle cx="34" cy="80" r="1.6" fill="'+c.glow+'"/><circle cx="44" cy="60" r="1.4" fill="'+c.glow+'"/><circle cx="62" cy="58" r="1.5" fill="'+c.glow+'"/>'
      +'<g>'+mane+'</g>'
      +'<ellipse cx="60" cy="32" rx="17" ry="15" fill="url(#'+p+'bd)"/>'
      +'<path d="M48 30 Q44 22 46 18 Q50 24 52 28 Z" fill="'+c.accent+'"/>'
      +eyes(p,c,54,67,30,4.4)
      +'<path d="M52 40 q8 3 15 0" stroke="'+c.dark+'" stroke-width="1.4" fill="none" opacity=".6"/>'
      +'<path d="M60 42 l-3 6 l3 -1 l3 1 Z" fill="'+c.glow+'" opacity=".8"/>'; // çatal dil
    return s;
  }

  // 8) PHOENIX — alevli kuş
  function phoenix(p,c){
    let s=defs(p,c)+shadow();
    // alev kuyruğu
    s+='<path d="M50 64 Q40 90 30 92 Q40 80 42 64 Z" fill="'+c.accent+'"/><path d="M50 64 Q60 90 70 92 Q60 80 58 64 Z" fill="'+c.accent+'"/><path d="M50 66 Q50 94 50 96 Q56 82 52 66 Z" fill="'+c.glow+'" opacity=".9"/>';
    // kanatlar açık
    s+='<g class="nbpWingL"><path d="M48 50 Q18 36 6 50 Q22 52 18 62 Q34 54 46 60 Z" fill="url(#'+p+'bd)"/></g>';
    s+='<g class="nbpWingR"><path d="M52 50 Q82 36 94 50 Q78 52 82 62 Q66 54 54 60 Z" fill="url(#'+p+'bd)"/></g>';
    s+='<path d="M44 54 Q26 46 12 52 M56 54 Q74 46 88 52" stroke="'+c.glow+'" stroke-width="1.4" fill="none" opacity=".6"/>';
    // gövde
    s+='<path d="M40 52 Q38 72 50 76 Q62 72 60 52 Q58 42 50 42 Q42 42 40 52 Z" fill="url(#'+p+'bl)"/>';
    // baş + tepe alevi
    s+='<circle cx="50" cy="36" r="13" fill="url(#'+p+'bd)"/>';
    s+='<path d="M46 24 Q44 12 40 8 Q48 14 50 22 Z M50 23 Q50 9 50 6 Q56 14 54 22 Z M54 24 Q56 12 60 8 Q52 14 50 22 Z" fill="'+c.glow+'" filter="url(#'+p+'gl)"/>';
    // gaga
    s+='<path d="M50 40 l-5 5 l5 2 l5 -2 Z" fill="'+c.accent+'"/>';
    s+=eyes(p,c,45,55,35,4);
    return s;
  }

  const ARCH = { critter, lizard, blob, finling, moth, dragon, serpent, phoenix };
  function drawPet(pet, prefix){ const fn=ARCH[pet.arch]||critter; return fn(prefix+pet.id+'_', pet.col); }

  /* ============================================================
     NADİRLİK + PET TANIMLARI
     bonus: [{stat, mode:'mult'|'flat', amt}]  (aktif companion'da uygulanır)
     ============================================================ */
  const RAR = {
    common:    {name:'Common',    col:'#aeb8c6', glow:'rgba(174,184,198,.5)', w:40, min:30},
    regular:   {name:'Regular',   col:'#54e08a', glow:'rgba(84,224,138,.5)',  w:27, min:45},
    rare:      {name:'Rare',      col:'#4db8ff', glow:'rgba(77,184,255,.55)', w:18, min:60},
    epic:      {name:'Epic',      col:'#b86bff', glow:'rgba(184,107,255,.55)',w:10, min:80},
    legendary: {name:'Legendary', col:'#ffb547', glow:'rgba(255,181,71,.6)',  w:5,  min:90}
  };
  const RAR_ORDER=['common','regular','rare','epic','legendary'];

  const STAT_LBL={ tapDmg:'Tap Damage', autoDmg:'Auto Damage', goldMult:'Gold Find', critChance:'Crit Chance', critMult:'Crit Power', allDmg:'All Damage', allyDmg:'Squad Damage', forceXp:'Force XP' };
  function bonusText(b){
    if(b.mode==='mult') return '+'+Math.round(b.amt*100)+'% '+STAT_LBL[b.stat];
    if(b.stat==='critChance') return '+'+b.amt.toFixed(1)+'% '+STAT_LBL[b.stat];
    return '+'+b.amt+' '+STAT_LBL[b.stat];
  }

  const PETS = [
    // ---- COMMON ----
    {id:'wompup', name:'Womp Pup', planet:'Tatooine · Desert', arch:'critter', rarity:'common',
      col:{base:'#c9a86a',dark:'#8a6a38',light:'#e8d0a0',belly:'#f0e2c0',accent:'#a07840',eye:'#5a3a18',glow:'#ffd98a'},
      bonus:[{stat:'goldMult',mode:'mult',amt:0.05}], lore:'A little one that howls in packs across the desert dunes.'},
    {id:'mossle', name:'Mossling', planet:'Endor · Forest', arch:'critter', rarity:'common',
      col:{base:'#6fae5a',dark:'#3c6e30',light:'#a8d88a',belly:'#d8eec0',accent:'#4d8a3a',eye:'#244018',glow:'#bfffa0'},
      bonus:[{stat:'autoDmg',mode:'mult',amt:0.05}], lore:'A gentle creature that gathers moss in the shade of giant trees.'},
    {id:'pebblit', name:'Pebblit', planet:'Crait · Salt Flats', arch:'critter', rarity:'common',
      col:{base:'#b9b0a4',dark:'#776e62',light:'#e2dccf',belly:'#efeae0',accent:'#d24a3a',eye:'#3a342c',glow:'#ff8a6a'},
      bonus:[{stat:'tapDmg',mode:'mult',amt:0.05}], lore:'A fidgety stone-pup with a shell crusted in crystallized salt.'},
    // ---- REGULAR ----
    {id:'frostkit', name:'Frost Kit', planet:'Hoth · Ice', arch:'critter', rarity:'regular',
      col:{base:'#9fd4ec',dark:'#4f86a8',light:'#e0f5ff',belly:'#f2fbff',accent:'#bfe8ff',eye:'#1f5470',glow:'#d8f6ff'},
      bonus:[{stat:'tapDmg',mode:'mult',amt:0.08}], lore:'Survives even blizzards thanks to its cozy warm fur.'},
    {id:'embernewt', name:'Ember Newt', planet:'Mustafar · Lava', arch:'lizard', rarity:'regular',
      col:{base:'#e0683a',dark:'#8a2a14',light:'#ffae6a',belly:'#ffd0a0',accent:'#ffcf3a',eye:'#3a0e06',glow:'#ff7a2a'},
      bonus:[{stat:'autoDmg',mode:'mult',amt:0.08}], lore:'A newt that swims lava rivers, its back glowing like embers.'},
    {id:'sporeling', name:'Sporeling', planet:'Felucia · Fungus', arch:'blob', rarity:'regular',
      col:{base:'#7ad0c0',dark:'#2e7a72',light:'#b8f2e6',belly:'#ffd6ef',accent:'#ff8ad0',eye:'#1c4a44',glow:'#caffee'},
      bonus:[{stat:'goldMult',mode:'mult',amt:0.08}], lore:'A jelly creature born from the spore clouds of the glowing forest.'},
    // ---- RARE ----
    {id:'finling', name:'Aqua Finling', planet:'Kamino · Ocean', arch:'finling', rarity:'rare',
      col:{base:'#3f9be0',dark:'#1c4e88',light:'#86d0ff',belly:'#cdeeff',accent:'#1fd0e0',eye:'#0a2848',glow:'#7afcff'},
      bonus:[{stat:'allDmg',mode:'mult',amt:0.12}], lore:'A bioluminescent manta gliding through endless rain seas.'},
    {id:'crystalmoth', name:'Crystal Moth', planet:'Ilum · Crystal Cave', arch:'moth', rarity:'rare',
      col:{base:'#9fd0ff',dark:'#5a7ac0',light:'#e6f2ff',belly:'#d8c0ff',accent:'#b88aff',eye:'#28406a',glow:'#cfe8ff'},
      bonus:[{stat:'critMult',mode:'mult',amt:0.12}], lore:'A sacred moth whose wings shimmer with kyber dust.'},
    {id:'voltcrab', name:'Volt Crab', planet:'Eadu · Storm', arch:'lizard', rarity:'rare',
      col:{base:'#7a8cff',dark:'#33408a',light:'#bcc6ff',belly:'#dfe4ff',accent:'#ffe04a',eye:'#1a1f4a',glow:'#fff36a'},
      bonus:[{stat:'critChance',mode:'flat',amt:4}], lore:'An armored creature that harvests static charge from storm clouds.'},
    // ---- EPIC ----
    {id:'stormdrake', name:'Storm Drakeling', planet:'Bespin · Gas Giant', arch:'dragon', rarity:'epic',
      col:{base:'#a07ad8',dark:'#523088',light:'#d6b8ff',belly:'#ecdcff',accent:'#4fe0ff',eye:'#2a124a',glow:'#9af0ff'},
      bonus:[{stat:'allDmg',mode:'mult',amt:0.18}], lore:'A young drake that feeds on the thunder of the cloud city.'},
    {id:'vinestalker', name:'Vine Stalker', planet:'Dagobah · Swamp', arch:'dragon', rarity:'epic',
      col:{base:'#4f9e6a',dark:'#1f5236',light:'#86d8a0',belly:'#cfeeda',accent:'#d8e84a',eye:'#13301f',glow:'#c6ff8a'},
      bonus:[{stat:'autoDmg',mode:'mult',amt:0.14},{stat:'allyDmg',mode:'mult',amt:0.10}], lore:'A master hunter that snares prey with vines in the misty swamp.'},
    // ---- LEGENDARY ----
    {id:'astralserpent', name:'Astral Serpent', planet:'Deep Space · The Void', arch:'serpent', rarity:'legendary',
      col:{base:'#5a4fd0',dark:'#241a6a',light:'#9a8eff',belly:'#3a2e9a',accent:'#c9b8ff',eye:'#0e0830',glow:'#e6dcff'},
      bonus:[{stat:'allDmg',mode:'mult',amt:0.25}], lore:'An ancient serpent drifting the interstellar void, its scales formed of constellations.'},
    {id:'solarphoenix', name:'Solar Phoenix', planet:'Twin Suns · The Core', arch:'phoenix', rarity:'legendary',
      col:{base:'#ff9a3a',dark:'#b8401a',light:'#ffd07a',belly:'#ffe6b0',accent:'#ff5a2a',eye:'#4a1606',glow:'#fff36a'},
      bonus:[{stat:'goldMult',mode:'mult',amt:0.22},{stat:'forceXp',mode:'mult',amt:0.15}], lore:'A firebird reborn from its ashes in the core of the twin suns.'}
  ];
  const PET_BY_ID={}; PETS.forEach(p=>PET_BY_ID[p.id]=p);

  /* ============================================================
     DURUM
     ============================================================ */
  function ensureState(){
    if(!S.pets||typeof S.pets!=='object') S.pets={};
    const P=S.pets;
    if(typeof P.slots!=='number') P.slots=1;
    if(!Array.isArray(P.eggs)) P.eggs=[];
    if(!Array.isArray(P.incub)) P.incub=[];
    if(!P.owned||typeof P.owned!=='object') P.owned={};
    if(!('active' in P)) P.active=null;
    if(typeof P.freeEggAt!=='number') P.freeEggAt=0;     // ilk açılışta hemen ücretsiz
    if(typeof P.starter!=='boolean'){ P.starter=true; P.eggs.push({rarity:'common'}); }  // başlangıç yumurtası
    return P;
  }
  function discoveredCount(){ return Object.keys(S.pets.owned||{}).filter(k=>S.pets.owned[k]>0).length; }
  function activePet(){ const id=S.pets&&S.pets.active; return (id&&S.pets.owned[id]>0)?PET_BY_ID[id]:null; }
  function collectionMult(){ return Math.min(0.12, discoveredCount()*0.01); }  // +%1 allDmg/tür, max %12

  /* ============================================================
     BONUS KANCALARI — artifactBonus/Flat'i sarmalar
     ============================================================ */
  function petMult(stat){
    let add=0; const a=activePet();
    if(a) a.bonus.forEach(b=>{ if(b.mode==='mult'&&b.stat===stat) add+=b.amt; });
    if(stat==='allDmg') add+=collectionMult();
    return 1+add;
  }
  function petFlat(stat){
    let add=0; const a=activePet();
    if(a) a.bonus.forEach(b=>{ if(b.mode==='flat'&&b.stat===stat) add+=b.amt; });
    return add;
  }
  function wrapBonuses(){
    if(window.__petWrapped) return; window.__petWrapped=true;
    const _ab=window.artifactBonus, _af=window.artifactFlat;
    window.artifactBonus=function(stat){ return (typeof _ab==='function'?_ab(stat):1)*petMult(stat); };
    window.artifactFlat =function(stat){ return (typeof _af==='function'?_af(stat):0)+petFlat(stat); };
    try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){}
  }

  /* ============================================================
     YUMURTA KAZANIMI
     ============================================================ */
  function rollEggRarity(noCommon){
    const list=RAR_ORDER.filter(r=>!(noCommon&&r==='common'));
    let tot=0; list.forEach(r=>tot+=RAR[r].w);
    let x=Math.random()*tot;
    for(const r of list){ x-=RAR[r].w; if(x<=0) return r; }
    return list[0];
  }
  // dışa açık: world boss vs. yumurta düşürür
  window.grantPetEgg=function(rarity){
    ensureState();
    const r=rarity||rollEggRarity(false);
    S.pets.eggs.push({rarity:r});
    try{ toast('🥚 Egg found!', '<b style="color:'+RAR[r].col+'">'+RAR[r].name+'</b> egg discovered — incubate it in the Pets tab.','gold'); }catch(e){}
    try{ sfx.buy&&sfx.buy(); }catch(e){}
    if(petsTabActive()) renderPanel();
  };
  const FREE_EGG_MS=8*3600*1000;
  function freeEggReady(){ return Date.now()>=(S.pets.freeEggAt||0); }
  function claimFreeEgg(){
    if(!freeEggReady()) return;
    S.pets.freeEggAt=Date.now()+FREE_EGG_MS;
    const r=rollEggRarity(false);
    S.pets.eggs.push({rarity:r});
    try{ sfx.zone&&sfx.zone(); }catch(e){}
    try{ toast('🥚 Free egg!', '<b style="color:'+RAR[r].col+'">'+RAR[r].name+'</b> egg added to your bag.','gold'); }catch(e){}
    save(); renderPanel();
  }
  const EGG_CRYSTAL=18, EGG_PREMIUM=70;
  function buyEgg(premium){
    const cost=premium?EGG_PREMIUM:EGG_CRYSTAL;
    if((S.crystals||0)<cost){ try{ toast('Not enough crystals','This egg needs <b>◆ '+cost+'</b>.'); }catch(e){} return; }
    S.crystals-=cost;
    const r=rollEggRarity(premium);
    S.pets.eggs.push({rarity:r});
    try{ sfx.buy&&sfx.buy(); }catch(e){}
    try{ toast('🥚 Egg acquired', '<b style="color:'+RAR[r].col+'">'+RAR[r].name+'</b> · ready to incubate.','gold'); }catch(e){}
    save(); renderPanel();
  }

  /* ============================================================
     KULUÇKA
     ============================================================ */
  function incubLeft(slot){ return Math.max(0, slot.start+slot.dur-Date.now()); }
  function placeEgg(eggIdx){
    if(S.pets.incub.length>=S.pets.slots){ try{ toast('Incubator full','Hatch the current egg first, or unlock another slot.'); }catch(e){} return; }
    const egg=S.pets.eggs[eggIdx]; if(!egg) return;
    S.pets.eggs.splice(eggIdx,1);
    S.pets.incub.push({rarity:egg.rarity, start:Date.now(), dur:RAR[egg.rarity].min*60000});
    try{ sfx.buy&&sfx.buy(); }catch(e){}
    save(); renderPanel();
  }
  function speedCost(slot){ return Math.max(1, Math.ceil(incubLeft(slot)/60000/4)); } // ~4 dk = 1 ◆
  function speedUp(slotIdx){
    const slot=S.pets.incub[slotIdx]; if(!slot) return;
    const cost=speedCost(slot);
    if((S.crystals||0)<cost){ try{ toast('Not enough crystals','Speed-up needs <b>◆ '+cost+'</b>.'); }catch(e){} return; }
    S.crystals-=cost; slot.start=Date.now()-slot.dur;
    try{ sfx.zone&&sfx.zone(); }catch(e){}
    save(); renderPanel();
  }
  function hatch(slotIdx){
    const slot=S.pets.incub[slotIdx]; if(!slot || incubLeft(slot)>0) return;
    const pool=PETS.filter(p=>p.rarity===slot.rarity);
    const pet=pool[Math.floor(Math.random()*pool.length)];
    S.pets.incub.splice(slotIdx,1);
    const isNew=!(S.pets.owned[pet.id]>0);
    S.pets.owned[pet.id]=(S.pets.owned[pet.id]||0)+1;
    if(!S.pets.active){ S.pets.active=pet.id; renderCompanion(); }
    if(isNew){ wrapBonuses(); try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){} }
    save();
    showHatch(pet, isNew);
  }

  /* ============================================================
     EK KULUÇKA YUVASI (49₺)
     ============================================================ */
  function buySlot(){
    const ov=document.createElement('div'); ov.id='petBuyOv'; ov.className='petOv';
    ov.innerHTML='<div class="petOvCard">'
      +'<div class="petOvIco">🥚➕</div>'
      +'<h3>Second Incubator Slot</h3>'
      +'<p>Incubate <b>2 eggs</b> at once. Permanent upgrade.</p>'
      +'<div class="petPrice">₺49,00</div>'
      +'<div class="petOvBtns"><button class="petBtn ghost" data-x>Cancel</button><button class="petBtn buy" data-ok>Buy</button></div>'
      +'</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(()=>ov.classList.add('show'));
    const close=()=>{ ov.classList.remove('show'); setTimeout(()=>ov.remove(),220); };
    ov.querySelector('[data-x]').onclick=close;
    ov.addEventListener('click',e=>{ if(e.target===ov) close(); });
    ov.querySelector('[data-ok]').onclick=()=>{
      S.pets.slots=2;
      try{ sfx.buy&&sfx.buy(); }catch(e){}
      try{ toast('✓ Slot unlocked','You can now incubate 2 eggs at the same time.','gold'); }catch(e){}
      close(); save(); renderPanel();
    };
  }

  /* ============================================================
     HATCH REVEAL
     ============================================================ */
  function showHatch(pet, isNew){
    const r=RAR[pet.rarity];
    const rank=RAR_ORDER.indexOf(pet.rarity);   // 0 common … 4 legendary
    const FLAVOR={
      common:'A new companion joins your squad.',
      regular:'A steady little companion joins you.',
      rare:'A rare companion — nicely done!',
      epic:'An epic companion — a powerful ally!',
      legendary:'An extraordinarily rare find. Treasure it.'
    };
    // nadirliğe göre parçacık patlaması
    const pc=[7,9,12,16,24][rank];
    let parts='';
    for(let i=0;i<pc;i++){
      const ang=(i/pc)*Math.PI*2 + Math.random()*0.5;
      const dist=70+Math.random()*(70+rank*22);
      const dx=(Math.cos(ang)*dist).toFixed(0), dy=(Math.sin(ang)*dist).toFixed(0);
      const sz=(3.5+Math.random()*(3+rank)).toFixed(1);
      parts+='<i style="--dx:'+dx+'px;--dy:'+dy+'px;width:'+sz+'px;height:'+sz+'px;animation-delay:'+(Math.random()*0.14).toFixed(2)+'s"></i>';
    }
    // tam ekran parlaması (epic+)
    if(rank>=3){
      const fl=document.createElement('div'); fl.className='petHatchFlash'; fl.style.setProperty('--fc', r.col);
      document.body.appendChild(fl); setTimeout(()=>fl.remove(),700);
    }
    const ov=document.createElement('div'); ov.id='petHatch'; ov.className='petOv';
    ov.innerHTML='<div class="petHatchCard hatch-'+pet.rarity+'" style="--rc:'+r.col+';--rg:'+r.glow+'">'
      +'<div class="petHatchRays"></div>'
      +'<div class="petHatchBurst"></div>'
      +'<div class="petHatchParticles">'+parts+'</div>'
      +(isNew?'<div class="petNewTag">NEW SPECIES!</div>':'')
      +'<div class="petHatchKick">YOU HATCHED A</div>'
      +'<div class="petHatchTier">'+r.name.toUpperCase()+'</div>'
      +'<div class="petHatchArt"><svg viewBox="0 0 100 100">'+drawPet(pet,'hx_')+'</svg></div>'
      +'<div class="petHatchName">'+pet.name+'</div>'
      +'<div class="petHatchPlanet">'+pet.planet+'</div>'
      +'<div class="petHatchFlavor">'+(FLAVOR[pet.rarity]||'')+'</div>'
      +'<div class="petHatchBonus">'+pet.bonus.map(bonusText).join(' · ')+'</div>'
      +'<button class="petBtn buy" data-ok>'+(rank>=4?'INCREDIBLE!':rank>=3?'AMAZING!':'AWESOME!')+'</button>'
      +'</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(()=>ov.classList.add('show'));
    try{ sfx.zone&&sfx.zone(); }catch(e){}
    // yüksek nadirlikte ikinci bir vurgu sesi
    if(rank>=3){ try{ setTimeout(()=>{ sfx.buy&&sfx.buy(); }, 220); }catch(e){} }
    const close=()=>{ ov.classList.remove('show'); setTimeout(()=>ov.remove(),240); renderPanel(); };
    ov.querySelector('[data-ok]').onclick=close;
    ov.addEventListener('click',e=>{ if(e.target===ov) close(); });
  }

  /* ============================================================
     PANEL
     ============================================================ */
  function fmtT(ms){
    const s=Math.ceil(ms/1000), h=Math.floor(s/3600), m=Math.floor(s%3600/60), ss=s%60;
    if(h>0) return h+'h '+String(m).padStart(2,'0')+'m';
    if(m>0) return m+'m '+String(ss).padStart(2,'0')+'s';
    return ss+'s';
  }
  const RING_C=2*Math.PI*34;
  window.petsPanelHtml=function(){
    ensureState();
    const P=S.pets;
    let h='';
    // başlık
    h+='<div class="petHead">'
      +'<div class="petBal"><span style="color:#c89bff">◆ '+(typeof fmt==='function'?fmt(S.crystals||0):(S.crystals||0))+'</span></div>'
      +'<div class="petDisc">Discovered <b>'+discoveredCount()+'</b>/'+PETS.length+'</div>'
      +'</div>';

    // aktif companion + koleksiyon bonusu
    const a=activePet();
    h+='<div class="petActiveCard">';
    if(a){ const r=RAR[a.rarity];
      h+='<div class="petActiveArt" style="--rc:'+r.col+'"><svg viewBox="0 0 100 100">'+drawPet(a,'act_')+'</svg></div>'
        +'<div class="petActiveInfo"><div class="petActiveLbl">ACTIVE COMPANION</div>'
        +'<div class="petActiveName">'+a.name+' <span class="petRarTag" style="background:'+r.col+'">'+r.name+'</span></div>'
        +'<div class="petActiveBonus">'+a.bonus.map(bonusText).join(' · ')+'</div>'
        +'<div class="petCollBonus">Collection: +'+Math.round(collectionMult()*100)+'% All Damage ('+discoveredCount()+' species)</div></div>';
    } else {
      h+='<div class="petActiveArt empty">?</div><div class="petActiveInfo"><div class="petActiveLbl">ACTIVE COMPANION</div><div class="petActiveName" style="color:var(--dim)">None yet</div><div class="petActiveBonus" style="color:var(--dim)">Hatch an egg and pick a companion.</div></div>';
    }
    h+='</div>';

    // KULUÇKA
    h+='<div class="petSec">INCUBATOR</div>';
    h+='<div class="petIncWrap">';
    for(let i=0;i<P.slots;i++){
      const slot=P.incub[i];
      if(slot){
        const left=incubLeft(slot), pct=1-left/slot.dur, ready=left<=0, r=RAR[slot.rarity];
        h+='<div class="petIncSlot'+(ready?' ready':'')+'" data-slot="'+i+'"'+(ready?'':' data-running')+' style="--rc:'+r.col+';--rg:'+r.glow+'">'
          +'<div class="petEggArt">'+eggSVG(slot.rarity, 'inc'+i+'_')
            +'<svg class="petIncRing" viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="5"/>'
            +'<circle class="petIncRingArc" cx="40" cy="40" r="34" fill="none" stroke="'+r.col+'" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+RING_C.toFixed(1)+'" stroke-dashoffset="'+(RING_C*(1-pct)).toFixed(1)+'" transform="rotate(-90 40 40)"/></svg>'
          +'</div>';
        if(ready){
          h+='<div class="petIncMeta"><b style="color:'+r.col+'">'+r.name+' egg</b><span class="petReadyTxt">READY TO HATCH!</span></div>'
            +'<button class="petBtn hatch" data-act="petHatch" data-slot="'+i+'">HATCH</button>';
        } else {
          h+='<div class="petIncMeta"><b style="color:'+r.col+'">'+r.name+' egg</b><span class="petIncTimer">'+fmtT(left)+'</span></div>'
            +'<button class="petBtn speed" data-act="petSpeed" data-slot="'+i+'">⚡ ◆'+speedCost(slot)+'</button>';
        }
        h+='</div>';
      } else {
        h+='<div class="petIncSlot empty"><div class="petEggArt empty">🥚</div><div class="petIncMeta"><b>Empty slot</b><span>Place an egg from your bag</span></div></div>';
      }
    }
    // ek yuva
    if(P.slots<2) h+='<button class="petAddSlot" data-act="petBuySlot"><div class="petAddPlus">＋</div><div class="petAddTxt">2nd Slot<span>₺49</span></div></button>';
    h+='</div>';

    // YUMURTA ÇANTASI + alma
    h+='<div class="petSec">EGG BAG</div>';
    h+='<div class="petEggBag">';
    if(P.eggs.length===0){ h+='<p class="petNote">No eggs in your bag. Buy one below, claim the free egg, or defeat <b>wave bosses</b> to drop them.</p>'; }
    else {
      P.eggs.forEach((e,i)=>{ const r=RAR[e.rarity];
        h+='<div class="petEggCard" style="--rc:'+r.col+';--rg:'+r.glow+'">'
          +'<div class="petEggMini">'+eggSVG(e.rarity,'bag'+i+'_')+'</div>'
          +'<div class="petEggName" style="color:'+r.col+'">'+r.name+'</div>'
          +'<div class="petEggTime">⏱ '+r.min+' min</div>'
          +'<button class="petBtn place" data-act="petPlace" data-egg="'+i+'">INCUBATE</button>'
          +'</div>';
      });
    }
    h+='</div>';

    // GET EGGS
    h+='<div class="petSec">GET EGGS</div>';
    h+='<div class="petBuyRow">';
    const freeReady=freeEggReady();
    h+='<div class="petBuyCard free">'
      +'<div class="petBuyTtl">Free Egg</div>'
      +'<div class="petBuySub">Every 8 hours</div>'
      +(freeReady?'<button class="petBtn buy" data-act="petFree">CLAIM</button>'
        :'<div class="petBuyWait">⏱ '+fmtT((S.pets.freeEggAt||0)-Date.now())+'</div>')
      +'</div>';
    h+='<div class="petBuyCard">'
      +'<div class="petBuyTtl">Mystery Egg</div>'
      +'<div class="petBuySub">Random rarity</div>'
      +'<button class="petBtn buy" data-act="petBuy">◆ '+EGG_CRYSTAL+'</button>'
      +'</div>';
    h+='<div class="petBuyCard prem">'
      +'<div class="petBuyTtl">Prime Egg</div>'
      +'<div class="petBuySub">No Common</div>'
      +'<button class="petBtn buy" data-act="petBuyPrem">◆ '+EGG_PREMIUM+'</button>'
      +'</div>';
    h+='</div>';

    // KOLEKSİYON — iki bölüm: (1) sahip olunan petler, (2) çıkabilecek (kilitli) petler
    function dexCard(p){
      const owned=(P.owned[p.id]||0)>0, cnt=P.owned[p.id]||0, r=RAR[p.rarity], act=P.active===p.id;
      return '<div class="petDexCard'+(owned?'':' locked')+(act?' active':'')+'" style="--rc:'+r.col+';--rg:'+r.glow+'"'
        +(owned?' data-act="petSelect" data-id="'+p.id+'"':'')+'>'
        +(cnt>1?'<div class="petDexCount">×'+cnt+'</div>':'')
        +(act?'<div class="petDexActive">★</div>':'')
        +'<div class="petDexArt">'+(owned?'<svg viewBox="0 0 100 100">'+drawPet(p,'dx_')+'</svg>':'<div class="petDexQ">?</div>')+'</div>'
        +'<div class="petDexName">'+(owned?p.name:'???')+'</div>'
        +'<div class="petDexRar" style="color:'+r.col+'">'+r.name+'</div>'
        +(owned?'<div class="petDexPlanet">'+p.planet.split(' · ')[0]+'</div><div class="petDexBonus">'+p.bonus.map(bonusText).join(' · ')+'</div>':'<div class="petDexPlanet">Undiscovered</div>')
        +'</div>';
    }
    const ownedList=[], lockedList=[];
    RAR_ORDER.forEach(rk=>{
      PETS.filter(p=>p.rarity===rk).forEach(p=>{
        if((P.owned[p.id]||0)>0) ownedList.push(p); else lockedList.push(p);
      });
    });
    // (1) Sahip olunan petler
    h+='<div class="petSec">MY COMPANIONS <span class="petSecCnt">'+ownedList.length+'/'+PETS.length+'</span></div>';
    if(ownedList.length){
      h+='<div class="petDexNote">Tap a creature to set it as your active companion.</div>';
      h+='<div class="petDex">';
      ownedList.forEach(p=>{ h+=dexCard(p); });
      h+='</div>';
    } else {
      h+='<div class="petDexEmpty">No companions yet — incubate an egg to hatch your first creature.</div>';
    }
    // (2) Çıkabilecek (kilitli) petler
    if(lockedList.length){
      h+='<div class="petSec petSecLocked">POSSIBLE DISCOVERIES <span class="petSecCnt">'+lockedList.length+'</span></div>';
      h+='<div class="petDexNote">Creatures still waiting to be discovered from eggs.</div>';
      h+='<div class="petDex">';
      lockedList.forEach(p=>{ h+=dexCard(p); });
      h+='</div>';
    }
    return h;
  };

  // YUMURTA SVG (benekli, nadirlik renkli)
  function eggSVG(rarity, p){
    const r=RAR[rarity];
    return '<svg viewBox="0 0 60 76"><defs><radialGradient id="'+p+'e" cx=".4" cy=".34" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".4" stop-color="'+r.col+'"/><stop offset="1" stop-color="'+r.col+'" stop-opacity=".55"/></radialGradient></defs>'
      +'<ellipse cx="30" cy="70" rx="16" ry="3.5" fill="#000" opacity=".25"/>'
      +'<path d="M30 4 C46 4 52 30 52 46 C52 62 42 72 30 72 C18 72 8 62 8 46 C8 30 14 4 30 4 Z" fill="url(#'+p+'e)" stroke="'+r.col+'" stroke-width="1.4"/>'
      +'<ellipse cx="23" cy="28" rx="6" ry="9" fill="#fff" opacity=".35"/>'
      +'<path d="M18 50 q6 -4 12 0 M30 56 q6 -4 12 0 M14 40 q5 -3 10 0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".4"/>'
      +'<circle cx="38" cy="44" r="3" fill="#fff" opacity=".3"/><circle cx="24" cy="54" r="2.4" fill="#fff" opacity=".3"/>'
      +'</svg>';
  }

  /* ============================================================
     SAHNE COMPANION
     ============================================================ */
  function renderCompanion(){
    const actors=document.getElementById('actors'); if(!actors) return;
    let c=document.getElementById('petCompanion');
    const a=activePet();
    if(!a){ if(c) c.remove(); return; }
    if(!c){ c=document.createElement('div'); c.id='petCompanion'; actors.appendChild(c); }
    c.innerHTML='<div class="petCmpInner"><svg viewBox="0 0 100 100">'+drawPet(a,'cmp_')+'</svg></div>';
  }
  // companion saldırı animasyonu: hamle + düşmana giden minik enerji kıvılcımı (sadece görsel)
  // her arketipe özel saldırı: gövde/uzuv hareketi + düşmana özgün vuruş efekti
  const ATK_CLS=['atk-critter','atk-lizard','atk-blob','atk-finling','atk-moth','atk-dragon','atk-serpent','atk-phoenix'];
  // arketip → vuruş türü (claw=pençe izi, ring=şok dalgası, splat=jöle, bolt=enerji)
  const ATK_KIND={ critter:'claw', lizard:'claw', dragon:'claw', blob:'splat', serpent:'bolt', finling:'ring', moth:'ring', phoenix:'ring' };
  function petMeleeFx(x,y,col,kind){
    const fx=document.getElementById('fxLayer'); if(!fx) return;
    const el=document.createElement('div'); el.className='petHitFx pf-'+kind;
    el.style.left=x+'px'; el.style.top=y+'px'; el.style.setProperty('--pc',col||'#fff');
    if(kind==='claw'){
      el.innerHTML='<svg viewBox="0 0 60 60"><path d="M10 8 Q34 26 50 50" /><path d="M20 6 Q42 26 54 44" /><path d="M4 18 Q28 34 46 54" /></svg>';
    }
    fx.appendChild(el);
    setTimeout(()=>el.remove(), 420);
  }
  function companionAttack(){
    const c=document.getElementById('petCompanion'); if(!c) return;
    if(document.body.classList.contains('worldBoss')||document.body.classList.contains('spaceMode')) return;
    if(typeof enemy==='undefined' || !enemy || enemy.hp<=0) return;
    const a=activePet(); if(!a) return;
    const inner=c.querySelector('.petCmpInner');
    if(inner){ inner.classList.remove('petAtk',...ATK_CLS); void inner.offsetWidth; inner.classList.add('petAtk','atk-'+a.arch); }
    const sc=document.getElementById('scene'), fx=document.getElementById('fxLayer'); if(!sc||!fx) return;
    let ec=null; try{ ec=enemyCenter(); }catch(e){}
    const cr=c.getBoundingClientRect(), sr=sc.getBoundingClientRect();
    if(!cr.width||!ec) return;
    const sx=cr.right-sr.left-4, sy=cr.top-sr.top+cr.height*0.5;
    const dx=ec.x-sx, dy=ec.y-sy, ang=Math.atan2(dy,dx);
    const glow=a.col&&a.col.glow||'#fff', kind=ATK_KIND[a.arch]||'bolt';
    // mermi: gövde hamlesinin tepe noktasında (uzuvlar savrulurken) fırlatılır
    setTimeout(()=>{
      if(typeof enemy==='undefined' || !enemy || enemy.hp<=0) return;
      let ec2=ec; try{ ec2=enemyCenter(); }catch(e){}
      const ddx=ec2.x-sx, ddy=ec2.y-sy;
      const sp=document.createElement('div'); sp.className='petSpark pk-'+kind; sp.style.setProperty('--psc', glow);
      sp.style.left=sx+'px'; sp.style.top=sy+'px'; sp.style.transform='translate(0,0) rotate('+ang+'rad)';
      fx.appendChild(sp);
      requestAnimationFrame(()=>{ sp.style.transform='translate('+ddx.toFixed(0)+'px,'+ddy.toFixed(0)+'px) rotate('+ang+'rad)'; sp.style.opacity='0'; });
      setTimeout(()=>sp.remove(),200);
    }, 150);
    // düşman üzerinde özgün vuruş efekti (pençe izi / şok dalgası / jöle sıçraması)
    setTimeout(()=>{ try{
      if(typeof enemy==='undefined' || !enemy || enemy.hp<=0) return;
      let ec2=ec; try{ ec2=enemyCenter(); }catch(e){}
      const hx=ec2.x+Math.random()*12-6, hy=ec2.y+Math.random()*12-6;
      petMeleeFx(hx, hy, glow, kind);
      if(typeof impactFx==='function') impactFx(hx, hy, glow, true);
    }catch(e){} },330);
  }

  /* ============================================================
     YARDIMCILAR + ENTEGRASYON
     ============================================================ */
  function petsTabActive(){ return typeof activeTab!=='undefined' && activeTab==='pets' && document.body.classList.contains('drawerOpen'); }
  function save(){ try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){} }

  function ready(){
    if(typeof S==='undefined' || typeof addCredits!=='function' || typeof fmt!=='function' || typeof window.artifactBonus!=='function'){ return setTimeout(ready,200); }
    ensureState();
    wrapBonuses();
    init();
  }
  function init(){
    renderCompanion();
    // panel buton dispatcher
    const panel=document.getElementById('panel');
    if(panel){
      panel.addEventListener('click', function(e){
        const btn=e.target.closest('[data-act]'); if(!btn) return;
        const act=btn.dataset.act;
        if(act==='petPlace'){ placeEgg(+btn.dataset.egg); }
        else if(act==='petHatch'){ hatch(+btn.dataset.slot); }
        else if(act==='petSpeed'){ speedUp(+btn.dataset.slot); }
        else if(act==='petBuySlot'){ buySlot(); }
        else if(act==='petFree'){ claimFreeEgg(); }
        else if(act==='petBuy'){ buyEgg(false); }
        else if(act==='petBuyPrem'){ buyEgg(true); }
        else if(act==='petSelect'){ const id=btn.dataset.id; if(S.pets.owned[id]>0){ S.pets.active=id; wrapBonuses(); renderCompanion(); try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){} try{ sfx.buy&&sfx.buy(); }catch(e){} save(); renderPanel(); } }
      });
    }
    // canlı kuluçka geri sayımı
    setInterval(()=>{
      if(!petsTabActive()) return;
      let needRender=false;
      document.querySelectorAll('.petIncSlot[data-running]').forEach(el=>{
        const i=+el.dataset.slot, slot=S.pets.incub[i]; if(!slot) return;
        const left=incubLeft(slot);
        const t=el.querySelector('.petIncTimer'); if(t) t.textContent=fmtT(left);
        const arc=el.querySelector('.petIncRingArc'); if(arc){ const pct=1-left/slot.dur; arc.style.strokeDashoffset=(RING_C*(1-pct)).toFixed(1); }
        if(left<=0) needRender=true;
      });
      if(needRender) renderPanel();
    },1000);
    // companion periyodik saldırısı (düşman varken her ~1.3sn)
    setInterval(companionAttack, 1300);
    // dışa açılan kancalar
    window.NB_PETS={ pets:PETS, draw:drawPet, grantEgg:window.grantPetEgg, panel:window.petsPanelHtml, attack:companionAttack,
      rarColor:function(r){ return (RAR[r]||RAR.common); },
      rollEggRarity:rollEggRarity,
      eggSVG:function(r,p){ return eggSVG(r, p||('cr_'+Math.random().toString(36).slice(2)+'_')); },
      // sessiz ekleme (sandık açılımı kendi reveal'ını gösterir, ayrı toast istemez)
      addEggSilent:function(r){ ensureState(); r=r||rollEggRarity(false); S.pets.eggs.push({rarity:r}); if(petsTabActive()) renderPanel(); return r; } };
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
