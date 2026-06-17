/* ===========================================================================
   NOVA BLADE · FAZ 2 — DÜŞMAN ROSTERİ (dalga / dalga)
   Her dalga bambaşka bir fraksiyon. Her builder(p) tam SVG iç içeriği döndürür.
   viewBox 0 0 200 220 · karakter x=100 merkezli · ayaklar ~y198
   =========================================================================== */
(function(){
  const A = window.NB2;
  const {shadow, bobOpen, eye, rise} = A;

  /* ---- küçük yardımcılar ---- */
  // bacak çifti
  function legs(p,pal,y){ y=y||150;
    return '<path d="M86 '+y+' L82 198 L96 198 L98 '+(y+6)+' Z" fill="url(#'+p+'bd)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +'<path d="M114 '+y+' L118 198 L104 198 L102 '+(y+6)+' Z" fill="url(#'+p+'bd)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +'<path d="M78 196 h22 l2 6 h-26 Z" fill="'+pal.dark+'"/><path d="M100 196 h22 l2 6 h-26 Z" fill="'+pal.dark+'"/>'; }

  /* =================== DALGA 1 · HURDA AKINCILARI =================== */
  const W1A = {dark:'#3a3128',mid:'#6e5f48',light:'#b59a6a',glow:'#ff7a2a',metalA:'#8a7a5e',metalB:'#322a20',cloak:'#54422c'};
  function rustGrunt(p){ return A.defs(p,W1A)+shadow(100,206,38)
    +bobOpen(2.2,2.9)
    +legs(p,W1A,152)
    // gövde — paslı kutu plakalar
    +'<rect x="72" y="96" width="56" height="58" rx="9" fill="url(#'+p+'bd)" stroke="'+W1A.dark+'" stroke-width="1.6"/>'
    +'<path d="M76 100 q12 -3 22 -1 l-1 5 q-10 -2 -19 1 Z" fill="#fff" opacity=".1"/>'
    +'<rect x="80" y="108" width="40" height="3" fill="'+W1A.dark+'" opacity=".7"/><rect x="80" y="128" width="40" height="3" fill="'+W1A.dark+'" opacity=".7"/>'
    +'<path d="M88 116 l6 8 l-4 6" stroke="'+W1A.glow+'" stroke-width="1.4" fill="none" opacity=".7"/>'
    +'<circle cx="110" cy="120" r="3" fill="'+W1A.glow+'"><animate attributeName="opacity" values="1;.3;1" dur="1.5s" repeatCount="indefinite"/></circle>'
    // kollar + boru silah
    +'<rect x="58" y="100" width="13" height="34" rx="6" fill="url(#'+p+'mt)" stroke="'+W1A.dark+'" stroke-width="1.2"/>'
    +'<rect x="129" y="100" width="13" height="30" rx="6" fill="url(#'+p+'mt)" stroke="'+W1A.dark+'" stroke-width="1.2"/>'
    +'<g transform="rotate(20 138 120)"><rect x="132" y="78" width="9" height="46" rx="3" fill="#4a4036" stroke="'+W1A.dark+'" stroke-width="1.2"/><rect x="130" y="74" width="13" height="8" rx="2" fill="'+W1A.metalB+'"/></g>'
    // kafa — tek optik
    +'<rect x="78" y="38" width="44" height="42" rx="11" fill="url(#'+p+'bd)" stroke="'+W1A.dark+'" stroke-width="1.6"/>'
    +'<path d="M82 44 q14 -4 26 -2 l-1 5 q-12 -2 -23 2 Z" fill="#fff" opacity=".12"/>'
    +'<rect x="84" y="52" width="32" height="16" rx="5" fill="#14100a"/>'
    +eye(100,60,5.4,'#ff7a2a',p,1.3)
    +'<rect x="90" y="30" width="20" height="9" rx="3" fill="url(#'+p+'mt)" stroke="'+W1A.dark+'" stroke-width="1"/>'
    +'<path d="M100 30 l0 -8" stroke="'+W1A.dark+'" stroke-width="2"/><circle cx="100" cy="20" r="2.4" fill="'+W1A.glow+'"><animate attributeName="opacity" values="1;.2;1" dur="1s" repeatCount="indefinite"/></circle>'
    +'</g>'
    +rise(p+'r',11,7,80,120,150,180,'#ff7a2a',1.2,2.4); }

  const W1B = {dark:'#2a3128',mid:'#5a6e4c',light:'#9fc47a',glow:'#9fff5a',metalA:'#8aa07a',metalB:'#283020'};
  function scavDrone(p){ return A.defs(p,W1B)
    +'<ellipse cx="100" cy="200" rx="26" ry="5" fill="#000" opacity=".34"><animate attributeName="rx" values="26;20;26" dur="2.4s" repeatCount="indefinite"/></ellipse>'
    +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="2.6s" repeatCount="indefinite"/>'
    // ana gövde küre
    +'<ellipse cx="100" cy="96" rx="38" ry="34" fill="url(#'+p+'bd)" stroke="'+W1B.dark+'" stroke-width="1.6"/>'
    +'<path d="M70 84 q10 -16 30 -18 l1 6 q-16 2 -25 16 Z" fill="#fff" opacity=".12"/>'
    +'<ellipse cx="100" cy="96" rx="20" ry="18" fill="#0c140a" stroke="'+W1B.dark+'" stroke-width="1.2"/>'
    +'<circle cx="100" cy="96" r="11" fill="url(#'+p+'eg)"/>'
    +eye(100,96,7,'#9fff5a',p,1.8)
    // kıskaç kollar
    +'<path d="M64 100 q-18 6 -22 22 q8 -8 16 -8" stroke="'+W1B.metalA+'" stroke-width="5" fill="none" stroke-linecap="round"/>'
    +'<path d="M136 100 q18 6 22 22 q-8 -8 -16 -8" stroke="'+W1B.metalA+'" stroke-width="5" fill="none" stroke-linecap="round"/>'
    +'<path d="M54 120 l-6 6 m6 -1 l-7 2" stroke="'+W1B.dark+'" stroke-width="2.4" stroke-linecap="round"/>'
    +'<path d="M146 120 l6 6 m-6 -1 l7 2" stroke="'+W1B.dark+'" stroke-width="2.4" stroke-linecap="round"/>'
    // antenler
    +'<path d="M86 64 l-8 -20" stroke="'+W1B.dark+'" stroke-width="2.4"/><circle cx="77" cy="42" r="2.6" fill="'+W1B.glow+'"><animate attributeName="opacity" values="1;.2;1" dur="1.1s" repeatCount="indefinite"/></circle>'
    +'<path d="M114 64 l8 -20" stroke="'+W1B.dark+'" stroke-width="2.4"/><circle cx="123" cy="42" r="2.6" fill="'+W1B.glow+'"><animate attributeName="opacity" values="1;.2;1" dur="1.1s" begin=".5s" repeatCount="indefinite"/></circle>'
    +'</g>'; }

  const W1C = {dark:'#33291f',mid:'#6a5236',light:'#a8814e',glow:'#ffae3a',metalA:'#9a7c52',metalB:'#2e2418',cloak:'#4a3824'};
  function junkBrute(p){ return A.defs(p,W1C)+shadow(100,208,48)
    +bobOpen(2,3.1)
    // bacaklar geniş
    +'<path d="M80 150 L72 198 L92 198 L94 156 Z" fill="url(#'+p+'bd)" stroke="'+W1C.dark+'" stroke-width="1.6"/>'
    +'<path d="M120 150 L128 198 L108 198 L106 156 Z" fill="url(#'+p+'bd)" stroke="'+W1C.dark+'" stroke-width="1.6"/>'
    +'<path d="M68 196 h26 l2 6 h-30 Z" fill="'+W1C.dark+'"/><path d="M106 196 h26 l2 6 h-30 Z" fill="'+W1C.dark+'"/>'
    // dev gövde, karışık plakalar
    +'<path d="M64 92 Q66 70 100 70 Q134 70 136 92 L132 150 Q100 162 68 150 Z" fill="url(#'+p+'bd)" stroke="'+W1C.dark+'" stroke-width="1.8"/>'
    +'<path d="M70 80 q16 -7 30 -5 l-1 6 q-13 -1 -24 6 Z" fill="#fff" opacity=".1"/>'
    +'<path d="M72 108 L130 104 M72 126 L130 122" stroke="'+W1C.dark+'" stroke-width="1.6" opacity=".6"/>'
    +'<rect x="90" y="112" width="20" height="14" rx="3" fill="#14100a"/><rect x="96" y="111" width="8" height="16" rx="2" fill="'+W1C.glow+'" opacity=".85"><animate attributeName="opacity" values=".85;.3;.85" dur="1.6s" repeatCount="indefinite"/></rect>'
    // büyük yumruk kollar
    +'<path d="M60 96 Q40 102 36 124 L52 132 Q56 112 66 110 Z" fill="url(#'+p+'mt)" stroke="'+W1C.dark+'" stroke-width="1.4"/>'
    +'<ellipse cx="44" cy="132" rx="11" ry="10" fill="url(#'+p+'bd)" stroke="'+W1C.dark+'" stroke-width="1.4"/><path d="M37 130 h14 M37 134 h14" stroke="'+W1C.dark+'" stroke-width="1.4"/>'
    +'<path d="M140 96 Q160 102 164 124 L148 132 Q144 112 134 110 Z" fill="url(#'+p+'mt)" stroke="'+W1C.dark+'" stroke-width="1.4"/>'
    +'<ellipse cx="156" cy="132" rx="11" ry="10" fill="url(#'+p+'bd)" stroke="'+W1C.dark+'" stroke-width="1.4"/><path d="M149 130 h14 M149 134 h14" stroke="'+W1C.dark+'" stroke-width="1.4"/>'
    // küçük kafa, omuzlara gömülü
    +'<rect x="84" y="48" width="32" height="28" rx="9" fill="url(#'+p+'bd)" stroke="'+W1C.dark+'" stroke-width="1.6"/>'
    +'<rect x="88" y="56" width="24" height="11" rx="4" fill="#14100a"/>'
    +eye(94,61,3.4,'#ffae3a',p,1.4)+eye(106,61,3.4,'#ffae3a',p,1.4)
    +'<path d="M84 52 q-10 -10 -4 -22 q6 8 10 16 Z" fill="'+W1C.metalB+'" stroke="'+W1C.dark+'" stroke-width="1"/>'
    +'<path d="M116 52 q10 -10 4 -22 q-6 8 -10 16 Z" fill="'+W1C.metalB+'" stroke="'+W1C.dark+'" stroke-width="1"/>'
    +'</g>'; }

  /* =================== DALGA 2 · KEMİK TARİKATI =================== */
  const W2A = {dark:'#1c1426',mid:'#352647',light:'#6a4f8e',glow:'#ff3145',metalA:'#cfc2dd',metalB:'#241a33',cloak:'#241632'};
  function skeletonLord(p){ return A.defs(p,W2A)+shadow(100,208,42)
    +bobOpen(2.4,3.2)
    // dalgalanan pelerin
    +'<path fill="url(#'+p+'cl)" opacity=".96"><animate attributeName="d" dur="3.4s" repeatCount="indefinite" values="M70 70 Q44 120 54 198 L80 190 Q70 130 80 84 Z;M70 70 Q40 124 50 200 L80 190 Q70 130 80 84 Z;M70 70 Q44 120 54 198 L80 190 Q70 130 80 84 Z"/></path>'
    +'<path fill="'+W2A.dark+'" opacity=".9"><animate attributeName="d" dur="2.9s" repeatCount="indefinite" values="M130 70 Q156 120 146 198 L120 190 Q130 130 120 84 Z;M130 70 Q160 124 150 200 L120 190 Q130 130 120 84 Z;M130 70 Q156 120 146 198 L120 190 Q130 130 120 84 Z"/></path>'
    +legs(p,W2A,150)
    // robe gövde
    +'<path d="M76 84 L124 84 L130 150 Q100 162 70 150 Z" fill="url(#'+p+'bd)" stroke="'+W2A.dark+'" stroke-width="1.6"/>'
    +'<path d="M88 96 L112 96 L114 140 L86 140 Z" fill="#0e0a16"/><text x="100" y="124" fill="'+W2A.glow+'" font-size="13" font-family="monospace" text-anchor="middle" opacity=".8">48</text>'
    // kemikli omuz zırhı
    +'<path d="M70 84 Q60 74 70 64 Q82 70 84 82 Z" fill="url(#'+p+'mt)" stroke="'+W2A.dark+'" stroke-width="1.2"/>'
    +'<path d="M130 84 Q140 74 130 64 Q118 70 116 82 Z" fill="url(#'+p+'mt)" stroke="'+W2A.dark+'" stroke-width="1.2"/>'
    // kollar + kızıl plazma kılıç
    +'<path d="M128 92 Q150 96 156 84" stroke="url(#'+p+'mt)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<g transform="translate(158 82) rotate(-44)" filter="url(#'+p+'bl)">'
      +'<rect x="-3.5" y="0" width="7" height="18" rx="2" fill="#2a1f33"/><rect x="-5" y="-2" width="10" height="3" fill="#cfc2dd"/>'
      +'<path d="M-7 -2 L0 -64 L7 -2 Z" fill="'+W2A.glow+'" opacity=".35"><animate attributeName="opacity" values=".35;.6;.35" dur="1s" repeatCount="indefinite"/></path>'
      +'<path d="M-4 -2 L0 -58 L4 -2 Z" fill="#ff3145"/><path d="M-1.4 -2 L0 -54 L1.4 -2 Z" fill="#fff"/>'
    +'</g>'
    // kapüşonlu kuru kafa
    +'<path d="M74 54 Q72 26 100 24 Q128 26 126 54 Q124 64 116 66 L84 66 Q76 64 74 54 Z" fill="url(#'+p+'cl)" stroke="'+W2A.dark+'" stroke-width="1.6"/>'
    +'<ellipse cx="100" cy="56" rx="18" ry="19" fill="#e8e2d2"/>'
    +'<ellipse cx="92" cy="54" rx="6" ry="7" fill="#0c0810"/><ellipse cx="108" cy="54" rx="6" ry="7" fill="#0c0810"/>'
    +'<circle cx="92" cy="54" r="3.2" fill="'+W2A.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.5s" repeatCount="indefinite"/></circle>'
    +'<circle cx="108" cy="54" r="3.2" fill="'+W2A.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.5s" begin=".3s" repeatCount="indefinite"/></circle>'
    +'<path d="M96 62 l2 6 l4 0 l2 -6 M94 66 h12" stroke="#9a8f7a" stroke-width="1.2" fill="none"/>'
    // boynuzlar
    +'<path d="M80 30 Q66 18 70 2 Q80 12 88 28 Z" fill="'+W2A.dark+'" stroke="'+W2A.metalA+'" stroke-width="1" stroke-opacity=".5"/>'
    +'<path d="M120 30 Q134 18 130 2 Q120 12 112 28 Z" fill="'+W2A.dark+'" stroke="'+W2A.metalA+'" stroke-width="1" stroke-opacity=".5"/>'
    +'</g>'
    +rise(p+'r',22,6,120,160,120,170,'#ff3145',1.1,2.2); }

  const W2B = {dark:'#161018',mid:'#2c2233',light:'#5a4566',glow:'#ff2d4a',metalA:'#b8324a',metalB:'#1a1020',cloak:'#1a1220'};
  function hoodedAssassin(p){ return A.defs(p,W2B)+shadow(100,208,36)
    +bobOpen(2.2,2.7)
    +'<path fill="url(#'+p+'cl)"><animate attributeName="d" dur="3.6s" repeatCount="indefinite" values="M72 76 Q56 130 64 198 L84 192 Q76 134 82 88 Z;M72 76 Q52 132 60 200 L84 192 Q76 134 82 88 Z;M72 76 Q56 130 64 198 L84 192 Q76 134 82 88 Z"/></path>'
    +'<path fill="'+W2B.dark+'"><animate attributeName="d" dur="3.1s" repeatCount="indefinite" values="M128 76 Q144 130 136 198 L116 192 Q124 134 118 88 Z;M128 76 Q148 132 140 200 L116 192 Q124 134 118 88 Z;M128 76 Q144 130 136 198 L116 192 Q124 134 118 88 Z"/></path>'
    +legs(p,W2B,150)
    +'<path d="M78 82 L122 82 L126 150 Q100 160 74 150 Z" fill="url(#'+p+'bd)" stroke="'+W2B.dark+'" stroke-width="1.6"/>'
    +'<path d="M82 110 L118 106 M80 124 L120 120" stroke="'+W2B.dark+'" stroke-width="1.4" opacity=".7"/>'
    +'<rect x="84" y="128" width="32" height="6" rx="2" fill="#4a3020"/><rect x="96" y="127" width="8" height="8" rx="1.5" fill="'+W2B.glow+'" opacity=".8"/>'
    // iki yana açık kollar + kızıl hançerler
    +'<path d="M78 90 Q56 96 50 78" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<path d="M122 90 Q144 96 150 78" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<g transform="translate(48 76) rotate(-26)" filter="url(#'+p+'bl)"><rect x="-2.4" y="0" width="5" height="12" fill="#221620"/><path d="M-3.5 0 L0 -34 L3.5 0 Z" fill="'+W2B.glow+'"/><path d="M-1.2 0 L0 -30 L1.2 0 Z" fill="#fff"/></g>'
    +'<g transform="translate(152 76) rotate(26)" filter="url(#'+p+'bl)"><rect x="-2.4" y="0" width="5" height="12" fill="#221620"/><path d="M-3.5 0 L0 -34 L3.5 0 Z" fill="'+W2B.glow+'"/><path d="M-1.2 0 L0 -30 L1.2 0 Z" fill="#fff"/></g>'
    // kapüşon
    +'<path d="M72 56 Q68 22 100 20 Q132 22 128 56 Q126 66 118 70 L82 70 Q74 66 72 56 Z" fill="url(#'+p+'cl)" stroke="'+W2B.dark+'" stroke-width="1.6"/>'
    +'<path d="M80 50 L120 50 L116 64 L100 70 L84 64 Z" fill="#0a070d"/>'
    +'<ellipse cx="91" cy="56" rx="6" ry="3.4" fill="'+W2B.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="109" cy="56" rx="6" ry="3.4" fill="'+W2B.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="2s" begin=".3s" repeatCount="indefinite"/></ellipse>'
    +'</g>'; }

  const W2C = {dark:'#141022',mid:'#28203f',light:'#5a4a82',glow:'#b88bff',metalA:'#c8b8e8',metalB:'#1a1430',cloak:'#1c1530'};
  function boneWraith(p){ return A.defs(p,W2C)
    +'<ellipse cx="100" cy="204" rx="30" ry="6" fill="url(#'+p+'eg)" opacity=".5"><animate attributeName="opacity" values=".5;.2;.5" dur="2.6s" repeatCount="indefinite"/></ellipse>'
    +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="3.4s" repeatCount="indefinite"/>'
    +'<path fill="'+W2C.dark+'" opacity=".5"><animate attributeName="d" dur="3.6s" repeatCount="indefinite" values="M62 170 Q52 80 100 40 Q148 80 138 170 Q118 152 100 174 Q82 152 62 170 Z;M64 174 Q50 84 100 38 Q150 84 136 174 Q118 150 100 172 Q82 154 64 174 Z;M62 170 Q52 80 100 40 Q148 80 138 170 Q118 152 100 174 Q82 152 62 170 Z"/></path>'
    +'<path fill="url(#'+p+'cl)" opacity=".95"><animate attributeName="d" dur="2.9s" repeatCount="indefinite" values="M70 164 Q60 84 100 48 Q140 84 130 164 Q116 150 100 168 Q84 150 70 164 Z;M72 168 Q58 88 100 46 Q142 88 128 168 Q116 148 100 166 Q84 152 72 168 Z;M70 164 Q60 84 100 48 Q140 84 130 164 Q116 150 100 168 Q84 150 70 164 Z"/></path>'
    // hayalet yüz
    +'<path d="M78 78 Q100 56 122 78 L118 100 Q100 84 82 100 Z" fill="#0c0a14"/>'
    +eye(89,82,5,'#b88bff',p,1.8)+eye(111,82,5,'#b88bff',p,1.8)
    +'<path d="M94 92 l3 8 l3 -6 l3 8 l3 -8" stroke="'+W2C.glow+'" stroke-width="1.4" fill="none" opacity=".7"/>'
    // hayalet kollar
    +'<path d="M70 110 Q50 116 42 138 Q52 130 60 132" stroke="url(#'+p+'cl)" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>'
    +'<path d="M130 110 Q150 116 158 138 Q148 130 140 132" stroke="url(#'+p+'cl)" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>'
    +'</g>'
    +rise(p+'r',23,8,72,128,120,170,'#b88bff',1.2,2.6); }

  /* =================== DALGA 3 · İMPARATORLUK MUHAFIZLARI =================== */
  const W3A = {dark:'#173026',mid:'#2c5a44',light:'#54a878',glow:'#ff7a2a',metalA:'#dfeee6',metalB:'#1c3a2c',cloak:'#234a38'};
  function greenCommando(p){ return A.defs(p,W3A)+shadow(100,206,38)
    +bobOpen(2,2.8)
    +legs(p,W3A,150)
    +'<path d="M74 92 Q76 80 100 80 Q124 80 126 92 L122 150 Q100 160 78 150 Z" fill="url(#'+p+'bd)" stroke="'+W3A.dark+'" stroke-width="1.6"/>'
    +'<path d="M80 86 q12 -3 22 -1 l-1 5 q-10 -2 -19 1 Z" fill="#fff" opacity=".14"/>'
    +'<path d="M84 110 L116 106 M82 128 L118 124" stroke="'+W3A.dark+'" stroke-width="1.4" opacity=".6"/>'
    +'<rect x="86" y="130" width="28" height="7" rx="2" fill="#1c2a20"/><rect x="96" y="129" width="8" height="9" rx="1.5" fill="'+W3A.glow+'" opacity=".85"/>'
    // omuz zırhı
    +'<path d="M74 88 Q62 80 66 66 L80 78 Z" fill="url(#'+p+'mt)" stroke="'+W3A.dark+'" stroke-width="1.2"/>'
    +'<path d="M126 88 Q138 80 134 66 L120 78 Z" fill="url(#'+p+'mt)" stroke="'+W3A.dark+'" stroke-width="1.2"/>'
    +'<path d="M132 70 q12 0 14 12 l-10 4 q-2 -8 -8 -8 Z" fill="url(#'+p+'mt)" stroke="'+W3A.dark+'" stroke-width="1.2"/>'
    // kol + blaster tabanca
    +'<path d="M76 96 Q56 102 52 120 L66 126 Q70 110 80 110 Z" fill="url(#'+p+'bd)" stroke="'+W3A.dark+'" stroke-width="1.2"/>'
    +'<g transform="translate(46 122)"><rect x="-2" y="-4" width="20" height="9" rx="2.5" fill="#222a30" stroke="'+W3A.dark+'" stroke-width="1"/><rect x="16" y="-2.5" width="8" height="5" rx="2" fill="#11161b"/><rect x="2" y="5" width="6" height="10" rx="2" fill="#222a30"/><circle cx="25" cy="0" r="2.2" fill="'+W3A.glow+'"><animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite"/></circle></g>'
    // kask — kapalı vizör (motosiklet kask gibi)
    +'<path d="M74 56 Q72 28 100 26 Q128 28 126 56 L124 66 Q100 74 76 66 Z" fill="url(#'+p+'bd)" stroke="'+W3A.dark+'" stroke-width="1.6"/>'
    +'<path d="M78 40 Q88 30 100 30 l0 5 q-9 0 -16 9 Z" fill="#fff" opacity=".16"/>'
    +'<path d="M76 50 Q100 42 124 50 L120 62 Q100 56 80 62 Z" fill="#1a0e08"/>'
    +'<path d="M80 52 Q100 47 120 52 L117 59 Q100 54 83 59 Z" fill="'+W3A.glow+'" opacity=".9"><animate attributeName="opacity" values=".9;.5;.9" dur="2s" repeatCount="indefinite"/></path>'
    +'<circle cx="128" cy="46" r="5" fill="url(#'+p+'mt)" stroke="'+W3A.dark+'" stroke-width="1"/><circle cx="128" cy="46" r="2" fill="'+W3A.glow+'"/>'
    +'<path d="M118 28 l8 -10 l3 4 l-7 9 Z" fill="url(#'+p+'mt)" stroke="'+W3A.dark+'" stroke-width="1"/>'
    +'</g>'; }

  const W3B = {dark:'#3a3f4a',mid:'#cfd6e2',light:'#ffffff',glow:'#ff8a3a',metalA:'#eef2f8',metalB:'#3a4250',cloak:'#9aa4b4'};
  function whiteTrooper(p){ return A.defs(p,W3B)+shadow(100,206,38)
    +bobOpen(2,2.8)
    +legs(p,W3B,150)
    +'<path d="M74 92 Q76 80 100 80 Q124 80 126 92 L122 150 Q100 160 78 150 Z" fill="url(#'+p+'bd)" stroke="'+W3B.dark+'" stroke-width="1.4"/>'
    +'<path d="M80 86 q12 -3 22 -1 l-1 5 q-10 -2 -19 1 Z" fill="#fff" opacity=".5"/>'
    +'<path d="M88 104 q12 6 24 0 l-2 10 q-10 5 -20 0 Z" fill="'+W3B.dark+'" opacity=".5"/>'
    +'<rect x="90" y="124" width="20" height="14" rx="3" fill="#2a3038"/><rect x="96" y="126" width="8" height="10" rx="2" fill="'+W3B.glow+'" opacity=".8"><animate attributeName="opacity" values=".8;.3;.8" dur="1.6s" repeatCount="indefinite"/></rect>'
    +'<path d="M74 88 Q62 80 66 66 L82 78 Z" fill="url(#'+p+'bd)" stroke="'+W3B.dark+'" stroke-width="1.2"/>'
    +'<path d="M126 88 Q138 80 134 66 L118 78 Z" fill="url(#'+p+'bd)" stroke="'+W3B.dark+'" stroke-width="1.2"/>'
    // çift elle tutulan tüfek
    +'<path d="M78 96 Q66 104 64 116" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<path d="M122 96 Q136 102 140 112" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<g transform="translate(58 116) rotate(-8)"><rect x="0" y="-3" width="46" height="8" rx="2" fill="#2c333d" stroke="'+W3B.dark+'" stroke-width="1"/><rect x="44" y="-1.5" width="14" height="4" rx="2" fill="#14181e"/><rect x="10" y="5" width="7" height="12" rx="2" fill="#2c333d"/><rect x="6" y="-7" width="14" height="4" rx="1.5" fill="#3a424e"/><circle cx="60" cy="0.5" r="2.2" fill="'+W3B.glow+'"><animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite"/></circle></g>'
    // beyaz kask, turuncu vizör
    +'<path d="M74 54 Q72 26 100 24 Q128 26 126 54 L123 66 Q100 74 77 66 Z" fill="url(#'+p+'bd)" stroke="'+W3B.dark+'" stroke-width="1.4"/>'
    +'<path d="M78 38 Q88 28 100 28 l0 5 q-9 0 -16 9 Z" fill="#fff" opacity=".6"/>'
    +'<path d="M84 30 L116 30 L114 40 L86 40 Z" fill="'+W3B.metalB+'" opacity=".5"/>'
    +'<path d="M78 48 Q100 40 122 48 L118 62 Q100 55 82 62 Z" fill="#160c06"/>'
    +'<path d="M82 50 Q100 44 118 50 L115 58 Q100 52 85 58 Z" fill="'+W3B.glow+'"><animate attributeName="opacity" values="1;.5;1" dur="2.2s" repeatCount="indefinite"/></path>'
    +'<path d="M96 56 l8 0" stroke="#160c06" stroke-width="2"/>'
    +'</g>'; }

  const W3C = {dark:'#3a1414',mid:'#8a2424',light:'#d84a4a',glow:'#ff5a3a',metalA:'#c8ccd4',metalB:'#2a2e36',cloak:'#7a1818'};
  function crimsonSentinel(p){ return A.defs(p,W3C)+shadow(100,208,40)
    +bobOpen(2.2,3)
    // kızıl pelerin
    +'<path fill="url(#'+p+'cl)"><animate attributeName="d" dur="3.4s" repeatCount="indefinite" values="M72 78 Q50 130 60 198 L86 192 Q76 132 82 86 Z;M72 78 Q46 132 56 200 L86 192 Q76 132 82 86 Z;M72 78 Q50 130 60 198 L86 192 Q76 132 82 86 Z"/></path>'
    +'<path fill="'+W3C.dark+'" opacity=".9"><animate attributeName="d" dur="2.9s" repeatCount="indefinite" values="M128 78 Q150 130 140 198 L114 192 Q124 132 118 86 Z;M128 78 Q154 132 144 200 L114 192 Q124 132 118 86 Z;M128 78 Q150 130 140 198 L114 192 Q124 132 118 86 Z"/></path>'
    +legs(p,{dark:'#2a2e36',mid:'#5a6070'},150)
    +'<path d="M76 84 Q78 72 100 72 Q122 72 124 84 L120 150 Q100 160 80 150 Z" fill="url(#'+p+'bd)" stroke="'+W3C.dark+'" stroke-width="1.6"/>'
    +'<path d="M88 96 L112 96 L114 120 L86 120 Z" fill="'+W3C.metalB+'"/><path d="M94 100 l6 8 l6 -8 M94 112 l6 -8 l6 8" stroke="'+W3C.metalA+'" stroke-width="1.6" fill="none" opacity=".7"/>'
    +'<rect x="84" y="128" width="32" height="7" rx="2" fill="'+W3C.metalB+'"/><rect x="96" y="127" width="8" height="9" rx="1.5" fill="'+W3C.glow+'"/>'
    // omuz plakaları metal
    +'<path d="M76 80 Q62 72 66 56 L84 72 Z" fill="url(#'+p+'mt)" stroke="'+W3C.dark+'" stroke-width="1.2"/>'
    +'<path d="M124 80 Q138 72 134 56 L116 72 Z" fill="url(#'+p+'mt)" stroke="'+W3C.dark+'" stroke-width="1.2"/>'
    // enerji mızrağı (sol elde dik)
    +'<g transform="translate(60 30)"><rect x="-2.5" y="0" width="5" height="150" rx="2" fill="#3a2e22" stroke="'+W3C.dark+'" stroke-width="1"/>'
      +'<path d="M-9 4 Q0 -30 9 4 L4 18 L-4 18 Z" fill="url(#'+p+'mt)" stroke="'+W3C.dark+'" stroke-width="1.2"/>'
      +'<path d="M-4 6 Q0 -16 4 6 Z" fill="'+W3C.glow+'" filter="url(#'+p+'bl)"><animate attributeName="opacity" values="1;.5;1" dur="1.3s" repeatCount="indefinite"/></path>'
      +'<circle cx="0" cy="-4" r="3" fill="#fff"/></g>'
    // kapüşon + kask gözleri
    +'<path d="M74 54 Q72 26 100 24 Q128 26 126 54 Q124 64 116 68 L84 68 Q76 64 74 54 Z" fill="url(#'+p+'cl)" stroke="'+W3C.dark+'" stroke-width="1.6"/>'
    +'<path d="M82 46 Q100 38 118 46 L114 60 Q100 52 86 60 Z" fill="#14060a"/>'
    +'<path d="M86 52 l10 -2 l-2 7 l-9 1 Z" fill="'+W3C.glow+'"><animate attributeName="opacity" values="1;.45;1" dur="1.8s" repeatCount="indefinite"/></path>'
    +'<path d="M114 52 l-10 -2 l2 7 l9 1 Z" fill="'+W3C.glow+'"><animate attributeName="opacity" values="1;.45;1" dur="1.8s" begin=".3s" repeatCount="indefinite"/></path>'
    +'<path d="M92 40 L108 40 L104 24 L100 32 L96 24 Z" fill="url(#'+p+'mt)" stroke="'+W3C.dark+'" stroke-width="1"/>'
    +'</g>'; }

  /* =================== DALGA 4 · ASİ MAKİNELER =================== */
  const W4A = {dark:'#2a2e36',mid:'#5e6676',light:'#aab4c4',glow:'#ffe23a',metalA:'#c4ccd8',metalB:'#262a32',cloak:'#3a4250'};
  function warBot(p){ return A.defs(p,W4A)+shadow(100,206,36)
    +bobOpen(2,3)
    +legs(p,W4A,150)
    +'<rect x="38" y="100" width="13" height="36" rx="6" fill="url(#'+p+'mt)" stroke="'+W4A.dark+'" stroke-width="1.2"/>'
    +'<rect x="149" y="100" width="13" height="36" rx="6" fill="url(#'+p+'mt)" stroke="'+W4A.dark+'" stroke-width="1.2"/>'
    // tüfek iki elde yatay
    +'<g transform="translate(40 128)"><rect x="0" y="-3" width="120" height="9" rx="3" fill="#2c333d" stroke="'+W4A.dark+'" stroke-width="1"/><rect x="116" y="-1.5" width="16" height="5" rx="2" fill="#14181e"/><rect x="30" y="6" width="8" height="14" rx="2" fill="#2c333d"/><rect x="86" y="6" width="8" height="14" rx="2" fill="#2c333d"/><rect x="6" y="-8" width="20" height="5" rx="2" fill="#3a424e"/><circle cx="134" cy="1" r="2.4" fill="'+W4A.glow+'"><animate attributeName="opacity" values="0;1;0" dur="1.3s" repeatCount="indefinite"/></circle></g>'
    +'<rect x="74" y="92" width="52" height="58" rx="10" fill="url(#'+p+'bd)" stroke="'+W4A.dark+'" stroke-width="1.6"/>'
    +'<path d="M78 96 q12 -3 22 -1 l-1 5 q-10 -2 -19 1 Z" fill="#fff" opacity=".14"/>'
    +'<rect x="82" y="104" width="36" height="20" rx="4" fill="#14181e"/><rect x="86" y="108" width="12" height="5" rx="2" fill="'+W4A.glow+'" opacity=".8"/><rect x="86" y="116" width="28" height="3" rx="1.5" fill="'+W4A.glow+'" opacity=".4"/>'
    +'<rect x="86" y="130" width="28" height="14" rx="3" fill="'+W4A.metalB+'"/><path d="M90 134 h20 M90 140 h20" stroke="'+W4A.glow+'" stroke-width="1" opacity=".4"/>'
    // omuzlar
    +'<rect x="60" y="92" width="16" height="14" rx="5" fill="url(#'+p+'mt)" stroke="'+W4A.dark+'" stroke-width="1.2"/>'
    +'<rect x="124" y="92" width="16" height="14" rx="5" fill="url(#'+p+'mt)" stroke="'+W4A.dark+'" stroke-width="1.2"/>'
    // robot kafa — iki sarı göz
    +'<rect x="80" y="46" width="40" height="36" rx="11" fill="url(#'+p+'bd)" stroke="'+W4A.dark+'" stroke-width="1.6"/>'
    +'<path d="M84 50 q14 -4 26 -2 l-1 5 q-12 -2 -23 2 Z" fill="#fff" opacity=".14"/>'
    +'<rect x="84" y="56" width="32" height="16" rx="5" fill="#0e1116"/>'
    +eye(91,64,5,'#ffe23a',p,1.3)+eye(109,64,5,'#ffe23a',p,1.3)
    +'<path d="M120 52 l14 -6 l2 4 l-14 7 Z" fill="url(#'+p+'mt)" stroke="'+W4A.dark+'" stroke-width="1"/><circle cx="135" cy="47" r="2.4" fill="'+W4A.glow+'"><animate attributeName="opacity" values="1;.2;1" dur="1s" repeatCount="indefinite"/></circle>'
    +'<path d="M88 46 l-2 -8 m24 8 l2 -8" stroke="'+W4A.dark+'" stroke-width="2"/>'
    +'</g>'; }

  const W4B = {dark:'#3e4654',mid:'#9aa6b6',light:'#dfe6ee',glow:'#ff3145',metalA:'#e4eaf2',metalB:'#3a4250'};
  function sentrySphere(p){ return A.defs(p,W4B)
    +'<ellipse cx="100" cy="200" rx="30" ry="6" fill="#000" opacity=".32"><animate attributeName="rx" values="30;24;30" dur="2.6s" repeatCount="indefinite"/></ellipse>'
    +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="3s" repeatCount="indefinite"/>'
    // dikenler / sensörler
    +'<g stroke="'+W4B.dark+'" stroke-width="2.6" stroke-linecap="round">'
      +'<path d="M100 60 V36"/><path d="M70 74 L52 56"/><path d="M130 74 L148 56"/><path d="M64 100 H40"/><path d="M136 100 H160"/><path d="M72 128 L56 146"/><path d="M128 128 L144 146"/></g>'
    +'<g fill="'+W4B.glow+'"><circle cx="100" cy="34" r="3"/><circle cx="50" cy="54" r="3"/><circle cx="150" cy="54" r="3"/><circle cx="38" cy="100" r="3"/><circle cx="162" cy="100" r="3"/><circle cx="54" cy="148" r="3"/><circle cx="146" cy="148" r="3"><animate attributeName="opacity" values="1;.3;1" dur="1.2s" repeatCount="indefinite"/></circle></g>'
    // ana küre
    +'<circle cx="100" cy="100" r="42" fill="url(#'+p+'bd)" stroke="'+W4B.dark+'" stroke-width="1.8"/>'
    +'<path d="M66 84 q12 -22 34 -24 l1 6 q-18 2 -29 22 Z" fill="#fff" opacity=".2"/>'
    +'<path d="M58 100 H142" stroke="'+W4B.dark+'" stroke-width="1.4" opacity=".5"/>'
    +'<circle cx="74" cy="118" r="4" fill="#3aff7a"/><circle cx="126" cy="118" r="4" fill="#3aff7a"/>'
    // merkez kızıl göz
    +'<circle cx="100" cy="98" r="17" fill="#1a0a0e" stroke="'+W4B.dark+'" stroke-width="1.4"/>'
    +'<circle cx="100" cy="98" r="13" fill="url(#'+p+'eg)"/>'
    +'<circle cx="100" cy="98" r="8" fill="'+W4B.glow+'"><animate attributeName="r" values="8;6;8" dur="1.4s" repeatCount="indefinite"/></circle>'
    +'<circle cx="95" cy="93" r="2.4" fill="#fff" opacity=".9"/>'
    +'<rect x="92" y="128" width="16" height="6" rx="3" fill="'+W4B.metalB+'"/>'
    +'</g>'; }

  const W4C = {dark:'#3a4250',mid:'#aeb8c8',light:'#f2f6fb',glow:'#3ad8ff',metalA:'#eef3f8',metalB:'#39414e',cloak:'#5a6476'};
  function heavyMech(p){ return A.defs(p,W4C)+shadow(100,210,52)
    +bobOpen(1.6,3.4)
    // geniş bacaklar
    +'<path d="M72 140 L60 176 L52 200 L70 200 L74 178 L82 146 Z" fill="url(#'+p+'bd)" stroke="'+W4C.dark+'" stroke-width="1.6"/>'
    +'<path d="M128 140 L140 176 L148 200 L130 200 L126 178 L118 146 Z" fill="url(#'+p+'bd)" stroke="'+W4C.dark+'" stroke-width="1.6"/>'
    +'<path d="M48 198 h26 l2 6 h-30 Z" fill="'+W4C.dark+'"/><path d="M126 198 h26 l2 6 h-30 Z" fill="'+W4C.dark+'"/>'
    +'<circle cx="74" cy="142" r="6" fill="'+W4C.metalB+'"/><circle cx="126" cy="142" r="6" fill="'+W4C.metalB+'"/>'
    // gövde — köşeli mech torso
    +'<path d="M62 96 Q64 80 100 80 Q136 80 138 96 L132 142 Q100 152 68 142 Z" fill="url(#'+p+'bd)" stroke="'+W4C.dark+'" stroke-width="1.8"/>'
    +'<path d="M70 86 q18 -5 30 -3 l-1 6 q-12 -2 -25 4 Z" fill="#fff" opacity=".2"/>'
    +'<rect x="86" y="100" width="28" height="20" rx="4" fill="#0e2530"/><rect x="90" y="104" width="20" height="5" rx="2" fill="'+W4C.glow+'"/><rect x="90" y="112" width="20" height="4" rx="2" fill="'+W4C.glow+'" opacity=".5"/>'
    // omuz roket podları (sol)
    +'<g transform="translate(40 86)"><rect x="0" y="0" width="26" height="22" rx="5" fill="url(#'+p+'bd)" stroke="'+W4C.dark+'" stroke-width="1.4"/>'
      +'<circle cx="7" cy="7" r="3.4" fill="#0e1620"/><circle cx="18" cy="7" r="3.4" fill="#0e1620"/><circle cx="7" cy="16" r="3.4" fill="#0e1620"/><circle cx="18" cy="16" r="3.4" fill="#0e1620"/>'
      +'<circle cx="7" cy="7" r="1.6" fill="'+W4C.glow+'"/><circle cx="18" cy="16" r="1.6" fill="'+W4C.glow+'"/></g>'
    // sağ omuz top + arm cannon
    +'<g transform="translate(134 86)"><rect x="0" y="0" width="26" height="22" rx="5" fill="url(#'+p+'bd)" stroke="'+W4C.dark+'" stroke-width="1.4"/>'
      +'<circle cx="7" cy="7" r="3.4" fill="#0e1620"/><circle cx="18" cy="7" r="3.4" fill="#0e1620"/><circle cx="7" cy="16" r="3.4" fill="#0e1620"/><circle cx="18" cy="16" r="3.4" fill="#0e1620"/></g>'
    +'<g transform="translate(126 118)"><rect x="0" y="-7" width="40" height="16" rx="5" fill="url(#'+p+'bd)" stroke="'+W4C.dark+'" stroke-width="1.4"/><rect x="38" y="-4" width="14" height="8" rx="3" fill="#11161c"/><ellipse cx="56" cy="0" rx="6" ry="8" fill="url(#'+p+'eg)"/><circle cx="54" cy="0" r="3" fill="'+W4C.glow+'"><animate attributeName="opacity" values="1;.3;1" dur=".9s" repeatCount="indefinite"/></circle></g>'
    // mech kafa
    +'<rect x="84" y="56" width="32" height="24" rx="8" fill="url(#'+p+'bd)" stroke="'+W4C.dark+'" stroke-width="1.6"/>'
    +'<path d="M88 64 Q100 60 112 64 L110 72 Q100 68 90 72 Z" fill="#0e1620"/>'
    +'<path d="M91 66 Q100 63 109 66 L108 70 Q100 67 92 70 Z" fill="'+W4C.glow+'"><animate attributeName="opacity" values="1;.5;1" dur="1.6s" repeatCount="indefinite"/></path>'
    +'<path d="M100 56 l0 -8" stroke="'+W4C.dark+'" stroke-width="2"/><circle cx="100" cy="46" r="2.4" fill="'+W4C.glow+'"/>'
    +'</g>'
    +'<path d="M178 118 q14 4 22 14 q-14 -2 -22 2 Z" fill="#ff8a3a" opacity=".7"><animate attributeName="opacity" values=".7;.2;.7" dur=".5s" repeatCount="indefinite"/></path>'; }

  /* =================== DALGA 5 · KIZIL LEJYON =================== */
  const W5A = {dark:'#3a0e10',mid:'#7a1a18',light:'#d63a2a',glow:'#ff7a1a',metalA:'#caa86a',metalB:'#2a1810',cloak:'#5a1412'};
  function magmaKnight(p){ return A.defs(p,W5A)+shadow(100,208,42)
    +bobOpen(2.2,3)
    +'<path fill="url(#'+p+'cl)"><animate attributeName="d" dur="3.4s" repeatCount="indefinite" values="M74 80 Q52 132 62 198 L88 192 Q78 134 84 86 Z;M74 80 Q48 134 58 200 L88 192 Q78 134 84 86 Z;M74 80 Q52 132 62 198 L88 192 Q78 134 84 86 Z"/></path>'
    +legs(p,{dark:'#2a1810',mid:'#5a3a24'},150)
    +'<path d="M76 84 Q78 72 100 72 Q122 72 124 84 L120 150 Q100 160 80 150 Z" fill="url(#'+p+'bd)" stroke="'+W5A.dark+'" stroke-width="1.6"/>'
    +'<path d="M86 96 L114 96 L116 122 L84 122 Z" fill="'+W5A.metalB+'"/><path d="M90 100 l10 16 l10 -16 M90 118 h20" stroke="'+W5A.glow+'" stroke-width="1.6" fill="none" opacity=".7"/>'
    +'<rect x="84" y="128" width="32" height="8" rx="2" fill="url(#'+p+'mt)"/><circle cx="100" cy="132" r="3" fill="'+W5A.glow+'"/>'
    // boynuzlu omuz zırhları
    +'<path d="M76 80 Q60 70 64 52 Q76 60 84 74 Z" fill="url(#'+p+'mt)" stroke="'+W5A.dark+'" stroke-width="1.2"/><path d="M64 52 l-4 -10" stroke="'+W5A.dark+'" stroke-width="2.4"/>'
    +'<path d="M124 80 Q140 70 136 52 Q124 60 116 74 Z" fill="url(#'+p+'mt)" stroke="'+W5A.dark+'" stroke-width="1.2"/><path d="M136 52 l4 -10" stroke="'+W5A.dark+'" stroke-width="2.4"/>'
    // alev mızrağı (sağ)
    +'<g transform="translate(150 36)" filter="url(#'+p+'bl)"><rect x="-2.5" y="0" width="5" height="146" rx="2" fill="#3a2614" stroke="'+W5A.dark+'" stroke-width="1"/>'
      +'<path d="M-10 6 Q0 -34 10 6 L5 22 L-5 22 Z" fill="url(#'+p+'mt)" stroke="'+W5A.dark+'" stroke-width="1.2"/>'
      +'<path d="M-5 8 Q0 -20 5 8 Z" fill="'+W5A.glow+'"><animate attributeName="d" dur=".8s" repeatCount="indefinite" values="M-5 8 Q0 -20 5 8 Z;M-5 8 Q0 -28 5 8 Z;M-5 8 Q0 -20 5 8 Z"/></path>'
      +'<circle cx="0" cy="-2" r="3.4" fill="#fff"/></g>'
    // boynuzlu kask
    +'<path d="M74 56 Q72 28 100 26 Q128 28 126 56 Q124 66 116 70 L84 70 Q76 66 74 56 Z" fill="url(#'+p+'bd)" stroke="'+W5A.dark+'" stroke-width="1.6"/>'
    +'<path d="M82 48 Q100 40 118 48 L114 62 Q100 54 86 62 Z" fill="#1a0604"/>'
    +'<path d="M86 54 l10 -2 l-2 7 l-9 1 Z" fill="'+W5A.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.6s" repeatCount="indefinite"/></path>'
    +'<path d="M114 54 l-10 -2 l2 7 l9 1 Z" fill="'+W5A.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.6s" begin=".3s" repeatCount="indefinite"/></path>'
    +'<path d="M76 34 Q64 22 68 6 Q78 16 86 30 Z" fill="'+W5A.metalA+'" stroke="'+W5A.dark+'" stroke-width="1"/>'
    +'<path d="M124 34 Q136 22 132 6 Q122 16 114 30 Z" fill="'+W5A.metalA+'" stroke="'+W5A.dark+'" stroke-width="1"/>'
    +'<path d="M100 40 l-5 -14 l5 6 l5 -6 Z" fill="'+W5A.metalA+'"/>'
    +'</g>'
    +rise(p+'r',51,7,140,170,110,170,'#ff7a1a',1.3,2); }

  const W5B = {dark:'#241f2a',mid:'#3e3848',light:'#6a6276',glow:'#ff5a1a',metalA:'#7a7286',metalB:'#1e1a24'};
  function ironGolem(p){ return A.defs(p,W5B)+shadow(100,210,48)
    +bobOpen(1.8,3.2)
    +'<path d="M78 148 L70 198 L92 198 L94 154 Z" fill="url(#'+p+'bd)" stroke="'+W5B.dark+'" stroke-width="1.6"/>'
    +'<path d="M122 148 L130 198 L108 198 L106 154 Z" fill="url(#'+p+'bd)" stroke="'+W5B.dark+'" stroke-width="1.6"/>'
    +'<path d="M66 196 h28 l2 6 h-32 Z" fill="'+W5B.dark+'"/><path d="M106 196 h28 l2 6 h-32 Z" fill="'+W5B.dark+'"/>'
    // gövde — ağır demir, ortada kor çekirdek
    +'<path d="M64 92 Q66 72 100 72 Q134 72 136 92 L130 150 Q100 162 70 150 Z" fill="url(#'+p+'bd)" stroke="'+W5B.dark+'" stroke-width="1.8"/>'
    +'<path d="M72 84 q16 -6 28 -4 l-1 6 q-12 -1 -23 5 Z" fill="#fff" opacity=".1"/>'
    +'<path d="M76 108 L124 104 M76 128 L124 124" stroke="'+W5B.dark+'" stroke-width="1.6" opacity=".6"/>'
    +'<circle cx="100" cy="116" r="11" fill="#1a0c08"/><circle cx="100" cy="116" r="8" fill="url(#'+p+'eg)"/><circle cx="100" cy="116" r="5" fill="'+W5B.glow+'"><animate attributeName="r" values="5;3.5;5" dur="1.3s" repeatCount="indefinite"/></circle>'
    // dev yumruk kollar
    +'<path d="M60 96 Q40 100 36 122 L52 130 Q56 110 66 110 Z" fill="url(#'+p+'mt)" stroke="'+W5B.dark+'" stroke-width="1.4"/>'
    +'<path d="M30 124 q14 -4 22 6 l-4 14 q-12 2 -20 -8 Z" fill="url(#'+p+'bd)" stroke="'+W5B.dark+'" stroke-width="1.4"/><path d="M34 130 l16 4 M33 138 l16 2" stroke="'+W5B.dark+'" stroke-width="1.4"/>'
    +'<path d="M140 96 Q160 100 164 122 L148 130 Q144 110 134 110 Z" fill="url(#'+p+'mt)" stroke="'+W5B.dark+'" stroke-width="1.4"/>'
    +'<path d="M170 124 q-14 -4 -22 6 l4 14 q12 2 20 -8 Z" fill="url(#'+p+'bd)" stroke="'+W5B.dark+'" stroke-width="1.4"/><path d="M166 130 l-16 4 M167 138 l-16 2" stroke="'+W5B.dark+'" stroke-width="1.4"/>'
    // kafa — kızıl gözler, dişli alın
    +'<path d="M80 56 Q78 38 100 36 Q122 38 120 56 L118 74 Q100 80 82 74 Z" fill="url(#'+p+'bd)" stroke="'+W5B.dark+'" stroke-width="1.6"/>'
    +'<path d="M84 60 Q100 54 116 60 L114 70 Q100 64 86 70 Z" fill="#160a06"/>'
    +eye(91,64,4.4,'#ff5a1a',p,1.3)+eye(109,64,4.4,'#ff5a1a',p,1.3)
    +'<path d="M88 56 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6" stroke="'+W5B.metalA+'" stroke-width="1.4" fill="none"/>'
    +'<path d="M80 50 l-8 -6 m48 6 l8 -6" stroke="'+W5B.dark+'" stroke-width="2.4" stroke-linecap="round"/>'
    +'</g>'
    +rise(p+'r',52,5,86,114,110,140,'#ff5a1a',1,2.2); }

  const W5C = {dark:'#4a3410',mid:'#a8801c',light:'#ffcf3a',glow:'#ffe23a',metalA:'#ffe9a0',metalB:'#3a2a0c',cloak:'#7a5a14'};
  function goldExecutioner(p){ return A.defs(p,W5C)+shadow(100,206,38)
    +bobOpen(2,2.8)
    +legs(p,W5C,150)
    +'<rect x="40" y="100" width="13" height="36" rx="6" fill="url(#'+p+'mt)" stroke="'+W5C.dark+'" stroke-width="1.2"/>'
    +'<path d="M74 92 Q76 80 100 80 Q124 80 126 92 L122 150 Q100 160 78 150 Z" fill="url(#'+p+'bd)" stroke="'+W5C.dark+'" stroke-width="1.6"/>'
    +'<path d="M80 86 q12 -3 22 -1 l-1 5 q-10 -2 -19 1 Z" fill="#fff" opacity=".24"/>'
    +'<rect x="84" y="104" width="32" height="22" rx="4" fill="'+W5C.metalB+'"/><path d="M88 110 h24 M88 116 h24 M88 122 h24" stroke="'+W5C.glow+'" stroke-width="1" opacity=".5"/>'
    +'<rect x="86" y="130" width="28" height="7" rx="2" fill="'+W5C.metalB+'"/><rect x="96" y="129" width="8" height="9" rx="1.5" fill="'+W5C.glow+'"/>'
    +'<path d="M74 88 Q60 80 64 64 L82 78 Z" fill="url(#'+p+'mt)" stroke="'+W5C.dark+'" stroke-width="1.2"/>'
    +'<path d="M126 88 Q140 80 136 64 L118 78 Z" fill="url(#'+p+'mt)" stroke="'+W5C.dark+'" stroke-width="1.2"/>'
    // ağır blaster (sol elde yana doğru)
    +'<path d="M76 96 Q56 102 50 118" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<g transform="translate(34 116) rotate(-12)"><rect x="0" y="-5" width="40" height="11" rx="3" fill="#2a230c" stroke="'+W5C.dark+'" stroke-width="1"/><rect x="38" y="-2.5" width="14" height="6" rx="2" fill="#14100a"/><rect x="8" y="6" width="8" height="14" rx="2" fill="#2a230c"/><circle cx="55" cy="0.5" r="2.6" fill="'+W5C.glow+'"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/></circle></g>'
    // kask — geniş çene, mavi gözler
    +'<path d="M76 54 Q74 26 100 24 Q126 26 124 54 L121 68 Q100 76 79 68 Z" fill="url(#'+p+'bd)" stroke="'+W5C.dark+'" stroke-width="1.6"/>'
    +'<path d="M80 38 Q90 30 100 30 l0 5 q-8 0 -14 8 Z" fill="#fff" opacity=".24"/>'
    +'<path d="M78 48 Q100 40 122 48 L118 62 Q100 54 82 62 Z" fill="#0a1620"/>'
    +'<path d="M82 52 l12 -3 l-1 8 l-12 1 Z" fill="#3ad8ff"><animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/></path>'
    +'<path d="M118 52 l-12 -3 l1 8 l12 1 Z" fill="#3ad8ff"><animate attributeName="opacity" values="1;.5;1" dur="2s" begin=".3s" repeatCount="indefinite"/></path>'
    +'<path d="M88 66 h24 l-3 6 h-18 Z" fill="'+W5C.metalB+'"/><path d="M92 68 h16" stroke="'+W5C.glow+'" stroke-width="1" opacity=".5"/>'
    +'<path d="M120 30 l10 -8 l2 4 l-9 8 Z" fill="url(#'+p+'mt)" stroke="'+W5C.dark+'" stroke-width="1"/>'
    +'</g>'; }

  /* =================== DALGA 6 · BOŞLUK KORSANLARI =================== */
  const W6A = {dark:'#0e2a2e',mid:'#1c5a56',light:'#2ea89a',glow:'#35e0d2',metalA:'#cfa84a',metalB:'#142a28',cloak:'#16302e'};
  function pirateCaptain(p){ return A.defs(p,W6A)+shadow(100,208,40)
    +bobOpen(2.2,3)
    +'<path fill="url(#'+p+'cl)"><animate attributeName="d" dur="3.4s" repeatCount="indefinite" values="M128 78 Q152 130 142 198 L116 192 Q126 132 120 86 Z;M128 78 Q156 132 146 200 L116 192 Q126 132 120 86 Z;M128 78 Q152 130 142 198 L116 192 Q126 132 120 86 Z"/></path>'
    +legs(p,{dark:'#10201e',mid:'#2a4a44'},150)
    +'<path d="M76 84 Q78 72 100 72 Q122 72 124 84 L120 150 Q100 160 80 150 Z" fill="url(#'+p+'bd)" stroke="'+W6A.dark+'" stroke-width="1.6"/>'
    // korsan ceket — çapraz kemer + altın düğmeler
    +'<path d="M88 76 L84 150 L100 156 L100 76 Z" fill="'+W6A.dark+'" opacity=".5"/>'
    +'<path d="M82 96 L118 108" stroke="'+W6A.metalA+'" stroke-width="4"/><circle cx="92" cy="100" r="2" fill="'+W6A.metalA+'"/><circle cx="108" cy="104" r="2" fill="'+W6A.metalA+'"/>'
    +'<rect x="84" y="126" width="32" height="9" rx="2" fill="#2a1c10"/><rect x="95" y="125" width="10" height="11" rx="2" fill="'+W6A.metalA+'"/><circle cx="100" cy="130" r="2.4" fill="'+W6A.dark+'"/>'
    +'<path d="M76 80 Q60 72 64 56 L82 72 Z" fill="url(#'+p+'mt)" stroke="'+W6A.dark+'" stroke-width="1.2"/>'
    // plazma pala (sağ)
    +'<path d="M124 88 Q146 92 152 78" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<g transform="translate(154 78) rotate(-40)" filter="url(#'+p+'bl)"><rect x="-3" y="0" width="6" height="16" rx="2" fill="#2a1c10"/><path d="M-3 -2 Q14 -30 4 -54 Q2 -36 -3 -16 Z" fill="'+W6A.glow+'" opacity=".85"/><path d="M-2 -4 Q8 -26 2 -46 Q1 -30 -2 -14 Z" fill="#eafffb"/></g>'
    // korsan başı — bandana + kafatası amblem
    +'<path d="M76 54 Q74 30 100 28 Q126 30 124 54 L121 66 Q100 72 79 66 Z" fill="url(#'+p+'bd)" stroke="'+W6A.dark+'" stroke-width="1.6"/>'
    +'<path d="M74 40 Q100 30 126 40 L124 52 Q100 44 76 52 Z" fill="'+W6A.metalB+'"/><path d="M118 40 q10 2 12 14 l-8 2 q-2 -8 -6 -10 Z" fill="'+W6A.metalB+'"/>'
    +'<circle cx="100" cy="44" r="5" fill="#e8e2d2"/><circle cx="97" cy="43" r="1.4" fill="#0c0810"/><circle cx="103" cy="43" r="1.4" fill="#0c0810"/>'
    +'<path d="M80 56 Q100 50 120 56 L116 66 Q100 60 84 66 Z" fill="#08120f"/>'
    +'<path d="M84 59 l10 -2 l-2 6 l-9 1 Z" fill="'+W6A.glow+'"><animate attributeName="opacity" values="1;.45;1" dur="1.8s" repeatCount="indefinite"/></path>'
    +'<path d="M116 59 l-10 -2 l2 6 l9 1 Z" fill="'+W6A.glow+'"><animate attributeName="opacity" values="1;.45;1" dur="1.8s" begin=".3s" repeatCount="indefinite"/></path>'
    +'</g>'; }

  const W6B = {dark:'#2a1438',mid:'#4e2a6e',light:'#8a52b8',glow:'#c46bff',metalA:'#b8a4d8',metalB:'#221030',cloak:'#2e1842'};
  function plasmaCorsair(p){ return A.defs(p,W6B)+shadow(100,206,36)
    +bobOpen(2.2,2.8)
    +legs(p,W6B,150)
    +'<path d="M74 88 Q76 76 100 76 Q124 76 126 88 L122 150 Q100 160 78 150 Z" fill="url(#'+p+'bd)" stroke="'+W6B.dark+'" stroke-width="1.6"/>'
    +'<path d="M86 92 L112 102 M84 104 L116 96" stroke="'+W6B.metalA+'" stroke-width="3" opacity=".7"/>'
    +'<rect x="84" y="126" width="32" height="9" rx="2" fill="#1c1028"/><rect x="95" y="125" width="10" height="11" rx="2" fill="'+W6B.metalA+'"/>'
    // sol kanca el
    +'<path d="M76 96 Q58 102 52 118" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<path d="M50 118 q-8 6 -4 16 q4 -6 10 -6" stroke="'+W6B.metalA+'" stroke-width="4" fill="none" stroke-linecap="round"/>'
    // sağ blaster
    +'<path d="M124 96 Q142 102 146 116" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<g transform="translate(140 114) rotate(14)"><rect x="0" y="-4" width="30" height="9" rx="3" fill="#241030" stroke="'+W6B.dark+'" stroke-width="1"/><rect x="28" y="-2" width="12" height="5" rx="2" fill="#120818"/><circle cx="42" cy="0.5" r="2.6" fill="'+W6B.glow+'"><animate attributeName="opacity" values="0;1;0" dur="1.3s" repeatCount="indefinite"/></circle></g>'
    // başlık — eşarp + tek göz vizör
    +'<path d="M76 56 Q74 30 100 28 Q126 30 124 56 L121 68 Q100 74 79 68 Z" fill="url(#'+p+'bd)" stroke="'+W6B.dark+'" stroke-width="1.6"/>'
    +'<path d="M124 50 q14 4 14 22 l-8 -2 q-2 -12 -8 -14 Z" fill="url(#'+p+'cl)" stroke="'+W6B.dark+'" stroke-width="1"/>'
    +'<path d="M80 50 Q100 42 120 50 L116 62 Q100 54 84 62 Z" fill="#10081a"/>'
    +'<ellipse cx="100" cy="55" rx="16" ry="5" fill="'+W6B.glow+'"><animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/></ellipse>'
    +'<rect x="84" y="53" width="32" height="4" fill="#10081a" opacity=".5"/>'
    +'</g>'; }

  const W6C = {dark:'#1a2632',mid:'#34506a',light:'#5e88aa',glow:'#35e0d2',metalA:'#aebccc',metalB:'#16222e'};
  function boardingDroid(p){ return A.defs(p,W6C)+shadow(100,206,34)
    +bobOpen(2,2.9)
    +legs(p,W6C,150)
    +'<rect x="76" y="94" width="48" height="56" rx="9" fill="url(#'+p+'bd)" stroke="'+W6C.dark+'" stroke-width="1.6"/>'
    +'<path d="M80 98 q11 -3 20 -1 l-1 5 q-9 -2 -17 1 Z" fill="#fff" opacity=".12"/>'
    +'<rect x="82" y="106" width="36" height="4" fill="'+W6C.dark+'" opacity=".6"/><rect x="82" y="128" width="36" height="4" fill="'+W6C.dark+'" opacity=".6"/>'
    +'<circle cx="100" cy="120" r="6" fill="#0c1620"/><circle cx="100" cy="120" r="3.4" fill="'+W6C.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.5s" repeatCount="indefinite"/></circle>'
    // tek büyük kıskaç sol, plazma kesici sağ
    +'<rect x="58" y="98" width="13" height="30" rx="6" fill="url(#'+p+'mt)" stroke="'+W6C.dark+'" stroke-width="1.2"/>'
    +'<path d="M58 126 q-8 4 -8 14 q6 -4 10 -2 M64 128 q-2 6 2 14" stroke="'+W6C.metalA+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
    +'<rect x="129" y="98" width="13" height="26" rx="6" fill="url(#'+p+'mt)" stroke="'+W6C.dark+'" stroke-width="1.2"/>'
    +'<g transform="translate(140 120) rotate(30)" filter="url(#'+p+'bl)"><rect x="-2.4" y="0" width="5" height="12" fill="#16222e"/><path d="M-3 -2 L0 -38 L3 -2 Z" fill="'+W6C.glow+'"/><path d="M-1 -2 L0 -34 L1 -2 Z" fill="#eafffb"/></g>'
    // kafa — tek geniş optik bar
    +'<rect x="80" y="48" width="40" height="34" rx="10" fill="url(#'+p+'bd)" stroke="'+W6C.dark+'" stroke-width="1.6"/>'
    +'<rect x="84" y="58" width="32" height="14" rx="6" fill="#0a141c"/>'
    +'<rect x="87" y="62" width="26" height="6" rx="3" fill="'+W6C.glow+'"><animate attributeName="width" values="26;10;26" dur="2.4s" repeatCount="indefinite"/></rect>'
    +'<path d="M92 48 l-2 -8 m16 8 l2 -8" stroke="'+W6C.dark+'" stroke-width="2"/><circle cx="90" cy="40" r="2" fill="'+W6C.glow+'"/>'
    +'</g>'; }

  /* =================== FİNAL · KADİM TEHDİTLER (BOSS) =================== */
  const FBA = {dark:'#1a2a30',mid:'#2c4a56',light:'#4e7e8e',glow:'#3affd2',metalA:'#cfe2ea',metalB:'#14242a',cloak:'#1c3038'};
  function starShaman(p){ return A.defs(p,FBA)+shadow(100,210,52)
    +bobOpen(2,3.2)
    +legs(p,FBA,154)
    +'<path d="M70 96 Q72 78 100 78 Q128 78 130 96 L124 154 Q100 166 76 154 Z" fill="url(#'+p+'bd)" stroke="'+FBA.dark+'" stroke-width="1.8"/>'
    +'<path d="M88 96 L112 96 L100 150 Z" fill="'+FBA.cloak+'"/><path d="M94 104 l6 30 l6 -30" stroke="'+FBA.glow+'" stroke-width="1.6" fill="none" opacity=".6"/>'
    +'<circle cx="100" cy="112" r="7" fill="#0a1a1e"/><circle cx="100" cy="112" r="4" fill="'+FBA.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.4s" repeatCount="indefinite"/></circle>'
    // 4 KOL + 4 ışın kılıcı (iki üst, iki alt — çift renk)
    +'<g filter="url(#'+p+'bl)">'
      // üst sol
      +'<path d="M76 92 Q50 80 38 56" stroke="url(#'+p+'mt)" stroke-width="7" fill="none" stroke-linecap="round"/>'
      +'<g transform="translate(38 56) rotate(-58)"><rect x="-2.4" y="0" width="5" height="14" fill="#16242a"/><rect x="-3.4" y="-46" width="6.8" height="46" rx="3" fill="#3a8fff" opacity=".9"/><rect x="-1.4" y="-44" width="2.8" height="44" fill="#fff"/></g>'
      // üst sağ
      +'<path d="M124 92 Q150 80 162 56" stroke="url(#'+p+'mt)" stroke-width="7" fill="none" stroke-linecap="round"/>'
      +'<g transform="translate(162 56) rotate(58)"><rect x="-2.4" y="0" width="5" height="14" fill="#16242a"/><rect x="-3.4" y="-46" width="6.8" height="46" rx="3" fill="#ff3145" opacity=".9"/><rect x="-1.4" y="-44" width="2.8" height="44" fill="#fff"/></g>'
      // alt sol
      +'<path d="M72 116 Q48 116 36 134" stroke="url(#'+p+'mt)" stroke-width="6.5" fill="none" stroke-linecap="round"/>'
      +'<g transform="translate(36 134) rotate(-118)"><rect x="-2.2" y="0" width="4.4" height="12" fill="#16242a"/><rect x="-3" y="-40" width="6" height="40" rx="3" fill="'+FBA.glow+'" opacity=".9"/><rect x="-1.2" y="-38" width="2.4" height="38" fill="#fff"/></g>'
      // alt sağ
      +'<path d="M128 116 Q152 116 164 134" stroke="url(#'+p+'mt)" stroke-width="6.5" fill="none" stroke-linecap="round"/>'
      +'<g transform="translate(164 134) rotate(118)"><rect x="-2.2" y="0" width="4.4" height="12" fill="#16242a"/><rect x="-3" y="-40" width="6" height="40" rx="3" fill="#c46bff" opacity=".9"/><rect x="-1.2" y="-38" width="2.4" height="38" fill="#fff"/></g>'
    +'</g>'
    // yabancı kafa — uzun kafatası kask
    +'<path d="M80 56 Q74 22 100 16 Q126 22 120 56 Q118 68 110 72 L90 72 Q82 68 80 56 Z" fill="url(#'+p+'bd)" stroke="'+FBA.dark+'" stroke-width="1.6"/>'
    +'<path d="M86 30 Q100 22 114 30 L110 50 Q100 42 90 50 Z" fill="#08161a"/>'
    +eye(92,40,4.4,'#3affd2',p,1.5)+eye(108,40,4.4,'#3affd2',p,1.5)
    +'<path d="M94 54 l6 12 l6 -12 M96 60 h8" stroke="'+FBA.metalA+'" stroke-width="1.4" fill="none" opacity=".6"/>'
    +'<path d="M100 16 L94 2 L100 8 L106 2 Z" fill="'+FBA.metalA+'"/>'
    +'<path d="M82 26 l-10 -8 m46 8 l10 -8" stroke="'+FBA.metalA+'" stroke-width="2" stroke-linecap="round"/>'
    +'</g>'
    +rise(p+'r',91,10,60,140,90,170,'#3affd2',1.3,2.4); }

  const FBB = {dark:'#0c0a10',mid:'#1c1822',light:'#3a3442',glow:'#ff2233',metalA:'#8a828e',metalB:'#0e0c12',cloak:'#100c16'};
  function darkLord(p){ return A.defs(p,FBB)+shadow(100,210,46)
    +bobOpen(2,3.4)
    +'<path fill="url(#'+p+'cl)" opacity=".97"><animate attributeName="d" dur="3.6s" repeatCount="indefinite" values="M68 70 Q40 130 50 200 L78 192 Q68 130 80 80 Z;M68 70 Q36 134 46 202 L78 192 Q68 130 80 80 Z;M68 70 Q40 130 50 200 L78 192 Q68 130 80 80 Z"/></path>'
    +'<path fill="'+FBB.dark+'"><animate attributeName="d" dur="3s" repeatCount="indefinite" values="M132 70 Q160 130 150 200 L122 192 Q132 130 120 80 Z;M132 70 Q164 134 154 202 L122 192 Q132 130 120 80 Z;M132 70 Q160 130 150 200 L122 192 Q132 130 120 80 Z"/></path>'
    +legs(p,FBB,150)
    +'<path d="M76 80 L124 80 L130 150 Q100 162 70 150 Z" fill="url(#'+p+'bd)" stroke="'+FBB.dark+'" stroke-width="1.6"/>'
    +'<path d="M88 92 L112 92 L114 132 L86 132 Z" fill="#08060c"/><path d="M92 100 h16 M92 110 h16 M92 120 h16" stroke="'+FBB.glow+'" stroke-width="1" opacity=".35"/>'
    +'<rect x="84" y="134" width="32" height="8" rx="2" fill="'+FBB.metalB+'"/><circle cx="100" cy="138" r="2.6" fill="'+FBB.glow+'"/>'
    // kollar + uzun kızıl ışın kılıcı (sağ, dik savruk)
    +'<path d="M124 88 Q150 92 158 76" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    +'<g transform="translate(160 74) rotate(-30)" filter="url(#'+p+'bl)">'
      +'<rect x="-3.5" y="0" width="7" height="22" rx="2" fill="#2a2630"/><rect x="-3.6" y="6" width="7.2" height="2" fill="#11101a"/><rect x="-5" y="-2" width="10" height="3" fill="'+FBB.metalA+'"/>'
      +'<rect x="-6" y="-86" width="12" height="86" rx="5" fill="'+FBB.glow+'" opacity=".3"><animate attributeName="opacity" values=".3;.55;.3" dur="1s" repeatCount="indefinite"/></rect>'
      +'<rect x="-3.4" y="-82" width="6.8" height="82" rx="3.2" fill="#ff2233"/><rect x="-1.2" y="-80" width="2.4" height="80" fill="#fff"/></g>'
    +'<path d="M76 88 Q56 94 52 110" stroke="url(#'+p+'bd)" stroke-width="8" stroke-linecap="round" fill="none"/>'
    // kapüşon + yaşlı yüz (sakal, kızıl gözler)
    +'<path d="M72 56 Q68 22 100 20 Q132 22 128 56 Q126 68 116 72 L84 72 Q74 68 72 56 Z" fill="url(#'+p+'cl)" stroke="'+FBB.dark+'" stroke-width="1.6"/>'
    +'<ellipse cx="100" cy="52" rx="18" ry="20" fill="#d8c8b0"/>'
    +'<path d="M82 44 Q100 38 118 44 L116 52 Q100 46 84 52 Z" fill="#0a0810" opacity=".5"/>'
    +'<ellipse cx="92" cy="50" rx="4.4" ry="3.4" fill="#1a0608"/><ellipse cx="108" cy="50" rx="4.4" ry="3.4" fill="#1a0608"/>'
    +'<circle cx="92" cy="50" r="2.4" fill="'+FBB.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.4s" repeatCount="indefinite"/></circle>'
    +'<circle cx="108" cy="50" r="2.4" fill="'+FBB.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.4s" begin=".3s" repeatCount="indefinite"/></circle>'
    +'<path d="M86 46 l8 2 m20 -2 l-8 2" stroke="#b8a890" stroke-width="1.4"/>'
    +'<path d="M88 60 Q100 96 112 60 Q108 74 100 78 Q92 74 88 60 Z" fill="#e8e2d6"/><path d="M94 64 l-2 14 m16 -14 l2 14 M100 66 v16" stroke="#b8b0a4" stroke-width="1" opacity=".6"/>'
    +'</g>'
    +rise(p+'r',92,7,120,165,90,160,'#ff2233',1.2,2.2); }

  /* =================== ROSTER =================== */
  window.NB2_WAVES = [
    {wave:'01', faction:'Scrap Raiders', biome:'Karoon · Desert & Scrap', accent:'#ff7a2a',
     intro:'First wave: feral machines born from rust and scrap. Weak, but they come in numbers.',
     enemies:[
       {n:'Rust Grunt', role:'Infantry', power:1, build:rustGrunt, desc:'Single-optic rusted body; strikes with scavenged pipes.'},
       {n:'Scrap Probe', role:'Flying recon', power:1, build:scavDrone, desc:'Clawed hover-bot; steals loot and swarms in numbers.'},
       {n:'Slag Crusher', role:'Heavy', power:2, build:junkBrute, desc:'Mismatched-plate giant; its fist punches through armor.'} ]},
    {wave:'02', faction:'Bone Cult', biome:'Dark Temple', accent:'#ff3145',
     intro:'The mood shifts: a crimson-lit cult that wears the color of death. Plasma edges draw blood.',
     enemies:[
       {n:'Skeleton Lord', role:'Elite', power:3, build:skeletonLord, desc:'Horned hood, dry skull, crimson plasma sword.'},
       {n:'Hooded Assassin', role:'Fast', power:3, build:hoodedAssassin, desc:'Twin crimson daggers; strikes twice from the shadows.'},
       {n:'Bone Wraith', role:'Wraith', power:4, build:boneWraith, desc:'Legless spirit; phases through bodies, shedding purple energy.'} ]},
    {wave:'03', faction:'Imperial Guards', biome:'Orbital Station', accent:'#54e08a',
     intro:'Disciplined, armored troops. Visors glow, blasters aligned — an orderly firing line.',
     enemies:[
       {n:'Green Commando', role:'Marksman', power:5, build:greenCommando, desc:'Closed-visor helm, side blaster; suppresses from range.'},
       {n:'White Trooper', role:'Line trooper', power:6, build:whiteTrooper, desc:'Two-handed rifle; orange visor, white shell armor.'},
       {n:'Crimson Sentinel', role:'Officer', power:7, build:crimsonSentinel, desc:'Crimson cape + energy spear; commands the line.'} ]},
    {wave:'04', faction:'Rogue Machines', biome:'Scrap Valley · Deep', accent:'#3ad8ff',
     intro:'Cold metal intellect. Yellow optics scan, spheres glide, mech cannons turn — a shielded threat.',
     enemies:[
       {n:'War Bot', role:'Gunner', power:8, build:warBot, desc:'Twin yellow eyes, heavy auto rifle; deadly accurate.'},
       {n:'Sentry Sphere', role:'Flying turret', power:9, build:sentrySphere, desc:'Spiked gliding orb; its central red eye fires beams.'},
       {n:'Heavy Mech', role:'Siege', power:11, build:heavyMech, desc:'Shoulder rocket pods + arm cannon; wide area damage.'} ]},
    {wave:'05', faction:'Crimson Legion', biome:'Lava Planet Pyros', accent:'#ff5a1a',
     intro:'War gods with molten cores. Horns, ember veins, flame spears — the heat rises.',
     enemies:[
       {n:'Magma Knight', role:'Champion', power:13, build:magmaKnight, desc:'Horned helm, flame spear; its strikes set you alight.'},
       {n:'Iron Golem', role:'Tank', power:15, build:ironGolem, desc:'Ember-core iron giant; its fists shake the ground.'},
       {n:'Gold Executioner', role:'Commander', power:17, build:goldExecutioner, desc:'Golden armor, heavy blaster; leads the legion with fire.'} ]},
    {wave:'06', faction:'Void Pirates', biome:'Syndicate Flagship', accent:'#35e0d2',
     intro:'Interstellar raiders. Plasma cutlasses, hook hands, skull banners — agile and merciless.',
     enemies:[
       {n:'Pirate Captain', role:'Elite', power:19, build:pirateCaptain, desc:'Skull bandana + plasma cutlass; always chasing the bounty.'},
       {n:'Plasma Corsair', role:'Raider', power:21, build:plasmaCorsair, desc:'Hook hand + plasma blaster; leaps ship to ship.'},
       {n:'Boarding Droid', role:'Boarder', power:23, build:boardingDroid, desc:'Scanning bar-eye, plasma cutter; rips doors open.'} ]},
    {wave:'07', faction:'Ancient Threats · BOSS', biome:'Nova Throne', accent:'#ff2233',
     intro:'The final act. Legendary powers awaken — a four-saber star shaman and the shadow of the crimson master.',
     enemies:[
       {n:'Star Shaman VORN-AKH', role:'BOSS', power:30, build:starShaman, desc:'Four-armed alien; reaps with four dual-color light blades.'},
       {n:'Dark Lord NOX', role:'FINAL BOSS', power:40, build:darkLord, desc:'Ancient master; his single crimson blade cleaves worlds in two.'} ]}
  ];
})();
