/* ===========================================================================
   NOVA BLADE · ORGANİK GEZEGEN YARATIKLARI
   Gezegen sürekli değişiyor; her dünya robot olmak zorunda değil. Bu modül
   çöl/buz/orman/lav/fırtına/karanlık tapınak için CANLI yaratıklar üretir.
   FAZ2 sözleşmesi: viewBox 0 0 200 220 · merkez x=100 · ayak ~y198 · NB2 helper.
   Mevcut robot skin'leri SİLİNMEZ — yalnızca organik gezegenlerde override.
   =========================================================================== */
(function(){
  'use strict';
  if(!window.NB2){ return; }
  var A = window.NB2;
  var shadow=A.shadow, bobOpen=A.bobOpen, eye=A.eye, rise=A.rise;

  /* organik gövde gradyanı (deri/kabuk) */
  function skin(id,a,b,hi){ return '<linearGradient id="'+id+'" x1=".3" y1="0" x2=".5" y2="1">'
    +'<stop offset="0" stop-color="'+(hi||a)+'"/><stop offset=".45" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient>'; }
  function belly(id,a,b){ return '<radialGradient id="'+id+'" cx=".5" cy=".4" r=".7">'
    +'<stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></radialGradient>'; }
  function cdefs(p,pal){ return '<defs>'
    +skin(p+'sk', pal.mid, pal.dark, pal.light)
    +belly(p+'bl', pal.light, pal.mid)
    +A.energy(p+'eg', pal.glow, '#ffffff')
    +A.bloom(p+'gl', 2.4)
    +'</defs>'; }
  // organik bacak/pençe çifti
  function paws(p,pal,y,spread){ y=y||156; spread=spread||20;
    var lx=100-spread, rx=100+spread;
    return '<path d="M'+lx+' '+y+' Q'+(lx-6)+' '+(y+30)+' '+(lx-2)+' '+(y+40)+' L'+(lx+8)+' '+(y+40)+' Q'+(lx+10)+' '+(y+24)+' '+(lx+8)+' '+y+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +'<path d="M'+rx+' '+y+' Q'+(rx+6)+' '+(y+30)+' '+(rx+2)+' '+(y+40)+' L'+(rx-8)+' '+(y+40)+' Q'+(rx-10)+' '+(y+24)+' '+(rx-8)+' '+y+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      // pençe tırnakları
      +claw(lx-4,y+40,pal)+claw(lx+2,y+41,pal)+claw(rx+4,y+40,pal)+claw(rx-2,y+41,pal); }
  function claw(x,y,pal){ return '<path d="M'+x+' '+y+' l-2 6 l3 -1 Z" fill="'+(pal.claw||pal.light)+'"/>'; }
  // boynuz
  function horn(x,y,dx,dy,pal){ return '<path d="M'+x+' '+y+' Q'+(x+dx*0.4)+' '+(y-dy*0.7)+' '+(x+dx)+' '+(y-dy)+' Q'+(x+dx*0.5)+' '+(y-dy*0.55)+' '+(x+2)+' '+y+' Z" fill="'+(pal.horn||pal.light)+'" stroke="'+pal.dark+'" stroke-width="1"/>'; }

  /* =================== ARKETİP: DÖRT/İKİ AYAKLI CANAVAR (kürklü, vahşi) =================== */
  function beast(p,pal,o){ o=o||{};
    var bt=o.bodyT||96, ht=o.headT||42;
    // kürk püskülü kenarı (testere dişli organik silüet)
    function fur(x0,x1,y,h,n){ var t='M'+x0+' '+y; var step=(x1-x0)/n;
      for(var i=0;i<n;i++){ var xa=x0+step*i, xb=x0+step*(i+0.5), xc=x0+step*(i+1);
        t+=' Q'+xb.toFixed(1)+' '+(y+h)+' '+xc.toFixed(1)+' '+y; }
      return t; }
    return cdefs(p,pal)+shadow(100,206,o.sh||44)
      +bobOpen(o.amp||2.4, o.dur||2.7)
      +paws(p,pal,o.legY||158, o.spread||22)
      // gövde — yumuşak organik kütle + kürk yaka
      +'<path d="M62 '+bt+' Q62 '+(bt-28)+' 100 '+(bt-28)+' Q138 '+(bt-28)+' 138 '+bt+' L132 162 Q100 178 68 162 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.8"/>'
      // göğüs kürkü (açık ton, dişli)
      +'<path d="'+fur(74,126,bt-2,11,5)+' L120 '+(bt+44)+' Q100 '+(bt+52)+' 80 '+(bt+44)+' Z" fill="url(#'+p+'bl)" opacity=".9"/>'
      +'<path d="'+fur(78,122,bt+10,7,5)+'" stroke="'+pal.light+'" stroke-width="1.4" fill="none" opacity=".5"/>'
      +(o.spots||'')
      // omuz kürkü püskülleri
      +'<path d="M62 '+(bt+2)+' Q50 '+(bt-4)+' 54 '+(bt+14)+' Q58 '+(bt+6)+' 66 '+(bt+8)+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1"/>'
      +'<path d="M138 '+(bt+2)+' Q150 '+(bt-4)+' 146 '+(bt+14)+' Q142 '+(bt+6)+' 134 '+(bt+8)+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1"/>'
      // kollar/ön pençeler (kürklü)
      +'<path d="M60 '+(bt+6)+' Q42 '+(bt+16)+' 38 '+(bt+40)+' Q46 '+(bt+32)+' 56 '+(bt+28)+' Q60 '+(bt+18)+' 66 '+(bt+14)+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +'<path d="M140 '+(bt+6)+' Q158 '+(bt+16)+' 162 '+(bt+40)+' Q154 '+(bt+32)+' 144 '+(bt+28)+' Q140 '+(bt+18)+' 134 '+(bt+14)+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +claw(38,bt+40,pal)+claw(43,bt+42,pal)+claw(162,bt+40,pal)+claw(157,bt+42,pal)
      // kafa — vahşi, geniş çene + snout
      +'<path d="M72 '+ht+' Q70 '+(ht-18)+' 100 '+(ht-20)+' Q130 '+(ht-18)+' 128 '+ht+' Q128 '+(ht+18)+' 112 '+(ht+24)+' Q100 '+(ht+40)+' 88 '+(ht+24)+' Q72 '+(ht+18)+' 72 '+ht+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      // yanak kürkü
      +'<path d="M72 '+(ht-2)+' Q62 '+(ht-2)+' 60 '+(ht+8)+' Q68 '+(ht+4)+' 74 '+(ht+8)+' Z M128 '+(ht-2)+' Q138 '+(ht-2)+' 140 '+(ht+8)+' Q132 '+(ht+4)+' 126 '+(ht+8)+' Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1"/>'
      // büyük kıvrık boynuzlar (varsayılan)
      +(o.horns||('<path d="M78 '+(ht-14)+' Q60 '+(ht-30)+' 58 '+(ht-50)+' Q70 '+(ht-38)+' 84 '+(ht-22)+' Z" fill="'+(pal.horn||pal.light)+'" stroke="'+pal.dark+'" stroke-width="1.2"/>'
        +'<path d="M122 '+(ht-14)+' Q140 '+(ht-30)+' 142 '+(ht-50)+' Q130 '+(ht-38)+' 116 '+(ht-22)+' Z" fill="'+(pal.horn||pal.light)+'" stroke="'+pal.dark+'" stroke-width="1.2"/>'))
      // snout + burun
      +'<ellipse cx="100" cy="'+(ht+20)+'" rx="11" ry="8" fill="url(#'+p+'bl)" opacity=".85"/>'
      +'<ellipse cx="100" cy="'+(ht+16)+'" rx="4" ry="2.6" fill="'+pal.dark+'"/>'
      // gözler (eğik, vahşi) + ağız + dişler
      +eye(87,ht+2,4,pal.glow,p,1.7)+eye(113,ht+2,4,pal.glow,p,1.9)
      +'<path d="M80 '+(ht-2)+' L92 '+(ht+2)+' M120 '+(ht-2)+' L108 '+(ht+2)+'" stroke="'+pal.dark+'" stroke-width="2" opacity=".6"/>'
      +(o.mouth||('<path d="M86 '+(ht+26)+' Q100 '+(ht+34)+' 114 '+(ht+26)+' Q108 '+(ht+30)+' 100 '+(ht+30)+' Q92 '+(ht+30)+' 86 '+(ht+26)+' Z" fill="#160c0c"/>'
        +'<path d="M90 '+(ht+27)+' l-1 5 l3 -1 Z M110 '+(ht+27)+' l1 5 l-3 -1 Z" fill="#fff"/>'))
      +'</g>'+(o.aura||''); }

  /* =================== ARKETİP: UÇAN YARATIK =================== */
  function flyer(p,pal,o){ o=o||{};
    var wing = '<path d="M96 92 Q'+(o.wf||40)+' '+(o.wy||70)+' '+(o.wf2||30)+' '+(o.wy2||120)+' Q60 104 92 104 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4" opacity=".96">'
      +'<animateTransform attributeName="transform" type="rotate" values="-12 96 96;6 96 96;-12 96 96" dur="'+(o.flap||0.8)+'s" repeatCount="indefinite"/></path>';
    var wingR = '<path d="M104 92 Q'+(200-(o.wf||40))+' '+(o.wy||70)+' '+(200-(o.wf2||30))+' '+(o.wy2||120)+' Q140 104 108 104 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4" opacity=".96">'
      +'<animateTransform attributeName="transform" type="rotate" values="12 104 96;-6 104 96;12 104 96" dur="'+(o.flap||0.8)+'s" repeatCount="indefinite"/></path>';
    return cdefs(p,pal)
      +'<ellipse cx="100" cy="202" rx="'+(o.sh||26)+'" ry="5" fill="#000" opacity=".3"><animate attributeName="rx" values="'+(o.sh||26)+';'+((o.sh||26)-6)+';'+(o.sh||26)+'" dur="'+(o.flap||0.8)+'s" repeatCount="indefinite"/></ellipse>'
      +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -9;0 0" dur="'+(o.dur||2.4)+'s" repeatCount="indefinite"/>'
      +wing+wingR
      // gövde iğ
      +'<path d="M100 78 Q86 86 88 116 Q100 150 112 116 Q114 86 100 78 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M94 96 Q100 100 106 96 L104 130 Q100 138 96 130 Z" fill="url(#'+p+'bl)" opacity=".8"/>'
      +(o.tail||'<path d="M100 148 Q96 168 100 184 Q104 168 100 148 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.2"/>')
      // kafa
      +'<path d="M100 60 Q84 64 86 82 Q100 96 114 82 Q116 64 100 60 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.5"/>'
      +(o.crest||'')
      +eye(92,76,3.6,pal.glow,p,1.6)+eye(108,76,3.6,pal.glow,p,1.8)
      +(o.beak||'<path d="M100 86 l-5 8 q5 4 10 0 Z" fill="'+pal.dark+'"/>')
      +'</g>'+(o.aura||''); }

  /* =================== ARKETİP: ELEMENTAL GOLEM/BLOB =================== */
  function golem(p,pal,o){ o=o||{};
    return cdefs(p,pal)+shadow(100,208,o.sh||46)
      +bobOpen(o.amp||1.8, o.dur||3)
      // bacak blokları
      +'<path d="M78 150 L72 198 L96 198 L96 154 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M122 150 L128 198 L104 198 L104 154 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M66 196 h32 l3 6 h-38 Z" fill="'+pal.dark+'"/><path d="M102 196 h32 l3 6 h-38 Z" fill="'+pal.dark+'"/>'
      // dev gövde — kaba taş kütle
      +'<path d="M58 '+(o.bodyT||86)+' Q56 64 100 62 Q144 64 142 '+(o.bodyT||86)+' L136 152 Q100 166 64 152 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="2"/>'
      // çatlak enerji damarları
      +(o.cracks||'<path d="M84 80 L92 104 L82 122 M118 78 L110 102 L120 124 M100 70 L100 130" stroke="'+pal.glow+'" stroke-width="2" fill="none" opacity=".8"><animate attributeName="opacity" values=".85;.35;.85" dur="1.8s" repeatCount="indefinite"/></path>')
      +'<circle cx="100" cy="106" r="9" fill="url(#'+p+'eg)"/><circle cx="100" cy="106" r="4.5" fill="'+pal.glow+'"><animate attributeName="r" values="4.5;6;4.5" dur="1.6s" repeatCount="indefinite"/></circle>'
      // kollar — kaya yumruk
      +'<path d="M56 92 Q34 100 30 128 L48 134 Q52 112 64 108 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M144 92 Q166 100 170 128 L152 134 Q148 112 136 108 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<circle cx="38" cy="134" r="11" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/><circle cx="162" cy="134" r="11" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      // kafa — köşeli blok
      +'<path d="M80 '+(o.headT||40)+' Q80 26 100 26 Q120 26 120 '+(o.headT||40)+' L118 58 Q100 66 82 58 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.8"/>'
      +(o.horns||'')
      +'<path d="M84 44 h32 v8 h-32 Z" fill="#100c14"/>'
      +eye(91,48,3.6,pal.glow,p,1.5)+eye(109,48,3.6,pal.glow,p,1.7)
      +'</g>'+(o.aura||''); }

  /* =================== ARKETİP: HAYALET/WRAITH (ayaksız, süzülen) =================== */
  function wraith(p,pal,o){ o=o||{};
    return cdefs(p,pal)
      +'<ellipse cx="100" cy="204" rx="'+(o.sh||30)+'" ry="6" fill="'+pal.glow+'" opacity=".18"><animate attributeName="opacity" values=".22;.08;.22" dur="2.6s" repeatCount="indefinite"/></ellipse>'
      +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="'+(o.dur||3)+'s" repeatCount="indefinite"/>'
      // dalgalı alt etek
      +'<path fill="url(#'+p+'sk)" opacity=".95"><animate attributeName="d" dur="3.4s" repeatCount="indefinite" '
      +'values="M70 90 Q60 150 70 190 Q84 176 100 190 Q116 176 130 190 Q140 150 130 90 Z;'
      +'M70 90 Q56 152 72 192 Q86 178 100 188 Q114 178 128 192 Q144 152 130 90 Z;'
      +'M70 90 Q60 150 70 190 Q84 176 100 190 Q116 176 130 190 Q140 150 130 90 Z"/></path>'
      // iç gölge
      +'<path d="M82 96 Q76 150 84 182 Q100 172 116 182 Q124 150 118 96 Z" fill="'+pal.dark+'" opacity=".45"/>'
      +(o.runes||'')
      // başlık
      +'<path d="M74 70 Q70 40 100 36 Q130 40 126 70 Q120 84 100 88 Q80 84 74 70 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +'<path d="M80 64 Q78 46 100 44 Q92 50 90 66 Z" fill="'+pal.light+'" opacity=".25"/>'
      +'<path d="M82 62 Q100 54 118 62 L114 78 Q100 84 86 78 Z" fill="#06060e"/>'
      +eye(91,68,4.4,pal.glow,p,2.2)+eye(109,68,4.4,pal.glow,p,2.4)
      // süzülen kollar/pençeler
      +'<path d="M76 104 Q56 116 50 140 Q60 132 70 130" stroke="url(#'+p+'sk)" stroke-width="7" fill="none" stroke-linecap="round"/>'
      +'<path d="M124 104 Q144 116 150 140 Q140 132 130 130" stroke="url(#'+p+'sk)" stroke-width="7" fill="none" stroke-linecap="round"/>'
      +claw(50,140,pal)+claw(54,142,pal)+claw(150,140,pal)+claw(146,142,pal)
      +'</g>'+(o.aura||''); }

  /* ============================================================================
     YARATIK TANIMLARI — gezegen temasına göre palet + ayırt edici özellikler
     ============================================================================ */
  var C = {};

  /* ----------------------------- ÇÖL: KAROON ----------------------------- */
  // Sand Raider — çöl akrep-savaşçısı (insektoid kabuk + kıskaç + kuyruk iğne)
  C['Sand Raider'] = function(p){ var pal={dark:'#5a4630',mid:'#9a7a4a',light:'#e0c188',glow:'#ffb14a',claw:'#f0d8a0',horn:'#caa868'};
    return cdefs(p,pal)+shadow(100,206,40)+bobOpen(2,2.6)
      +paws(p,pal,160,18)
      // kuyruk + iğne (arkada)
      +'<path d="M132 120 Q168 110 170 70 Q160 84 150 92" stroke="url(#'+p+'sk)" stroke-width="10" fill="none" stroke-linecap="round"/>'
      +'<path d="M170 70 l6 -10 l4 10 Z" fill="'+pal.glow+'" filter="url(#'+p+'gl)"/>'
      // gövde kabuk
      +'<path d="M68 98 Q66 74 100 74 Q134 74 132 98 L126 156 Q100 168 74 156 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.8"/>'
      +'<path d="M76 96 L124 96 M78 116 L122 116 M80 134 L120 134" stroke="'+pal.dark+'" stroke-width="1.6" opacity=".5"/>'
      +'<path d="M82 84 Q100 90 118 84" stroke="'+pal.light+'" stroke-width="2" fill="none" opacity=".5"/>'
      // kıskaç kollar
      +'<path d="M64 100 Q40 104 32 124 Q44 120 52 122" stroke="url(#'+p+'sk)" stroke-width="8" fill="none" stroke-linecap="round"/>'
      +'<path d="M30 118 q-8 4 -8 12 q6 -2 10 -1 m-2 -10 q-6 6 -4 14" stroke="'+pal.dark+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
      +'<path d="M136 100 Q160 104 168 124 Q156 120 148 122" stroke="url(#'+p+'sk)" stroke-width="8" fill="none" stroke-linecap="round"/>'
      +'<path d="M170 118 q8 4 8 12 q-6 -2 -10 -1 m2 -10 q6 6 4 14" stroke="'+pal.dark+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
      // kafa + mandibül
      +'<path d="M78 44 Q78 28 100 28 Q122 28 122 44 Q122 62 100 66 Q78 62 78 44 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M84 60 l-6 10 l8 -4 M116 60 l6 10 l-8 -4" stroke="'+pal.dark+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
      +eye(90,44,3.4,pal.glow,p,1.5)+eye(110,44,3.4,pal.glow,p,1.7)+eye(100,40,2.4,pal.glow,p,2.1)
      +'</g>'+rise(p+'r',7,6,80,120,150,180,pal.glow,1,2.6); };

  // Carrion Probe — leş yiyici uçan yaratık (akbaba-wyvern, sargılı boyun)
  C['Carrion Probe'] = function(p){ return flyer(p,{dark:'#4a3f30',mid:'#7a6a52',light:'#c9b08a',glow:'#ff8a3a'},{
    flap:0.7, wf:34, wy:60, wf2:18, wy2:118, sh:30,
    crest:'<path d="M100 60 Q98 48 104 42 Q102 52 106 60 Z" fill="#3a2f24"/>',
    beak:'<path d="M100 84 l-8 10 q8 5 16 0 Z" fill="#e8c47a" stroke="#4a3f30" stroke-width="1"/><path d="M92 94 q8 4 16 0" stroke="#4a3f30" stroke-width="1.4" fill="none"/>',
    tail:'<path d="M100 148 Q90 170 96 186 Q100 176 104 186 Q110 170 100 148 Z" fill="url(#'+p+'sk)" stroke="#4a3f30" stroke-width="1.2"/>',
    aura:rise(p+'r',9,5,80,120,140,180,'#ff8a3a',0.9,2.4) }); };

  // Dune Breaker — kum solucanı brute (yerden çıkan dev ağız + halka gövde)
  C['Dune Breaker'] = function(p){ var pal={dark:'#5e4226',mid:'#9a703e',light:'#e6b878',glow:'#ffb36a',horn:'#caa060'};
    return cdefs(p,pal)+shadow(100,208,52)+bobOpen(1.6,2.4)
      // halka segmentli gövde (yukarı doğru incelen)
      +'<path d="M62 196 Q58 150 72 120 Q86 96 100 92 Q114 96 128 120 Q142 150 138 196 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="2"/>'
      +'<path d="M66 180 Q100 192 134 180 M68 158 Q100 170 132 158 M72 134 Q100 146 128 134" stroke="'+pal.dark+'" stroke-width="2.2" fill="none" opacity=".55"/>'
      +'<path d="M78 116 Q100 126 122 116" stroke="'+pal.dark+'" stroke-width="2" fill="none" opacity=".5"/>'
      // açık dairesel ağız + diş halkası
      +'<ellipse cx="100" cy="74" rx="34" ry="38" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="2"/>'
      +'<ellipse cx="100" cy="76" rx="22" ry="26" fill="#1c0e06"/>'
      +'<ellipse cx="100" cy="78" rx="11" ry="13" fill="#3a160a"/>'
      // diş halkası
      +(function(){var t='';for(var i=0;i<12;i++){var a=i/12*Math.PI*2;var x=100+Math.cos(a)*22,y=76+Math.sin(a)*26;var x2=100+Math.cos(a)*15,y2=76+Math.sin(a)*18;t+='<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+' L'+x2.toFixed(1)+' '+y2.toFixed(1)+' L'+(x2+3).toFixed(1)+' '+(y2+2).toFixed(1)+' Z" fill="#f0e0c0"/>';}return t;})()
      +'<ellipse cx="100" cy="78" rx="5" ry="6" fill="'+pal.glow+'" filter="url(#'+p+'gl)"><animate attributeName="ry" values="6;3;6" dur="2s" repeatCount="indefinite"/></ellipse>'
      // küçük yan gözler
      +eye(72,60,3,pal.glow,p,1.6)+eye(128,60,3,pal.glow,p,1.8)
      +'</g>'+rise(p+'r',5,7,70,130,170,195,pal.glow,1.2,2.2); };

  /* ----------------------------- BUZ: KRION ----------------------------- */
  // Ice Recon Probe — kristal buz-kelebeği (süzülen, kristal kanatlar)
  C['Ice Recon Probe'] = function(p){ var pal={dark:'#3e5e76',mid:'#6f97b2',light:'#dff4ff',glow:'#9fe5ff'};
    return cdefs(p,pal)
      +'<ellipse cx="100" cy="200" rx="22" ry="5" fill="'+pal.glow+'" opacity=".2"><animate attributeName="rx" values="22;16;22" dur="0.9s" repeatCount="indefinite"/></ellipse>'
      +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="2.6s" repeatCount="indefinite"/>'
      // kristal kanatlar
      +'<g><animateTransform attributeName="transform" type="rotate" values="-10 100 100;8 100 100;-10 100 100" dur="0.85s" repeatCount="indefinite"/>'
      +'<path d="M96 92 L48 60 L40 96 L70 104 Z" fill="url(#'+p+'eg)" stroke="'+pal.glow+'" stroke-width="1.4" opacity=".9"/>'
      +'<path d="M96 104 L52 124 L62 148 L86 116 Z" fill="url(#'+p+'eg)" stroke="'+pal.glow+'" stroke-width="1.2" opacity=".8"/>'
      +'<path d="M62 78 L72 100 M58 116 L78 112" stroke="'+pal.light+'" stroke-width="1" opacity=".7"/></g>'
      +'<g><animateTransform attributeName="transform" type="rotate" values="10 100 100;-8 100 100;10 100 100" dur="0.85s" repeatCount="indefinite"/>'
      +'<path d="M104 92 L152 60 L160 96 L130 104 Z" fill="url(#'+p+'eg)" stroke="'+pal.glow+'" stroke-width="1.4" opacity=".9"/>'
      +'<path d="M104 104 L148 124 L138 148 L114 116 Z" fill="url(#'+p+'eg)" stroke="'+pal.glow+'" stroke-width="1.2" opacity=".8"/>'
      +'<path d="M138 78 L128 100 M142 116 L122 112" stroke="'+pal.light+'" stroke-width="1" opacity=".7"/></g>'
      // ince kristal gövde
      +'<path d="M100 72 L92 100 L100 150 L108 100 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +'<path d="M100 78 L96 100 L100 140 L104 100 Z" fill="'+pal.light+'" opacity=".5"/>'
      // baş kristal
      +'<path d="M100 58 L90 74 L100 84 L110 74 Z" fill="url(#'+p+'eg)" stroke="'+pal.glow+'" stroke-width="1.2"/>'
      +eye(95,72,2.8,pal.glow,p,1.6)+eye(105,72,2.8,pal.glow,p,1.8)
      +'</g>'+rise(p+'r',8,7,78,122,120,170,pal.glow,1,3); };

  // Frost Commando — kürklü yeti-savaşçı (kar kürkü + buz pençeleri)
  C['Frost Commando'] = function(p){ var pal={dark:'#4a6678',mid:'#86abc0',light:'#e8f8ff',glow:'#9fe5ff',claw:'#cfeeff',horn:'#bfe4f5'};
    return beast(p,pal,{ sh:46, amp:2.2, dur:2.8, legY:158, spread:24, bodyT:98, headT:42,
      spots:'<path d="M70 120 q6 4 4 10 m12 -8 q4 5 1 11 m24 -11 q3 6 0 11 m12 -10 q5 4 3 10" stroke="'+pal.light+'" stroke-width="2" fill="none" opacity=".6"/>',
      aura:rise(p+'r',12,6,78,122,150,185,pal.glow,1,3) }); };

  // Glacier Executioner — buz golemi brute (kristalize blok gövde + buz balta)
  C['Glacier Executioner'] = function(p){ var pal={dark:'#2e5066',mid:'#5e87a0',light:'#dffaff',glow:'#bff0ff',horn:'#bff0ff'};
    return golem(p,pal,{ sh:50, headT:42, bodyT:88,
      horns:'<path d="M80 30 L72 12 L86 28 Z" fill="url(#'+p+'eg)" stroke="'+pal.glow+'" stroke-width="1"/><path d="M120 30 L128 12 L114 28 Z" fill="url(#'+p+'eg)" stroke="'+pal.glow+'" stroke-width="1"/>',
      cracks:'<path d="M84 78 L94 104 L80 124 M118 76 L106 102 L122 126 M100 66 L100 132" stroke="'+pal.glow+'" stroke-width="2.2" fill="none" opacity=".85"><animate attributeName="opacity" values=".9;.4;.9" dur="2s" repeatCount="indefinite"/></path>'
        +'<path d="M70 96 L60 90 M130 96 L140 90 M76 140 L66 148 M124 140 L134 148" stroke="'+pal.light+'" stroke-width="2" opacity=".5"/>',
      aura:'<path d="M30 134 l-10 -8 m10 -4 l-12 0 M170 134 l10 -8 m-10 -4 l12 0" stroke="'+pal.light+'" stroke-width="2" opacity=".6"/>'+rise(p+'r',14,6,70,130,150,185,pal.glow,1.1,3) }); };

  /* ----------------------------- ORMAN: SYLVA ----------------------------- */
  // Grove Warden Droid → Treant koruyucu (kabuk gövde + yaprak taç + kök bacak)
  C['Grove Warden Droid'] = function(p){ var pal={dark:'#2d4a2e',mid:'#4e7a48',light:'#9fd47a',glow:'#aaff4a',horn:'#6a4a2c'};
    return cdefs(p,pal)+shadow(100,208,46)+bobOpen(1.6,3.2)
      // kök bacaklar
      +'<path d="M80 150 Q72 174 64 198 L80 198 Q86 172 90 154 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M120 150 Q128 174 136 198 L120 198 Q114 172 110 154 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M60 198 q-6 0 -8 4 l20 0 Z M140 198 q6 0 8 4 l-20 0 Z" fill="'+pal.dark+'"/>'
      // gövde — ağaç gövdesi, kabuk dokusu
      +'<path d="M70 96 Q66 70 100 66 Q134 70 130 96 L126 154 Q100 166 74 154 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="2"/>'
      +'<path d="M84 80 Q82 120 86 152 M100 76 Q98 120 100 158 M116 80 Q118 120 114 152" stroke="'+pal.dark+'" stroke-width="1.6" fill="none" opacity=".5"/>'
      // göğüste oyuk + parlayan öz
      +'<ellipse cx="100" cy="116" rx="12" ry="16" fill="#14240e"/><ellipse cx="100" cy="116" rx="6" ry="9" fill="url(#'+p+'eg)"/><circle cx="100" cy="116" r="3.5" fill="'+pal.glow+'"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle>'
      // dal kollar
      +'<path d="M68 100 Q42 96 30 110 Q40 112 50 110 M30 110 l-8 -6 m8 10 l-10 2" stroke="url(#'+p+'sk)" stroke-width="6" fill="none" stroke-linecap="round"/>'
      +'<path d="M132 100 Q158 96 170 110 Q160 112 150 110 M170 110 l8 -6 m-8 10 l10 2" stroke="url(#'+p+'sk)" stroke-width="6" fill="none" stroke-linecap="round"/>'
      // kafa — kütük + yaprak taç
      +'<path d="M80 44 Q80 28 100 28 Q120 28 120 44 Q120 60 100 64 Q80 60 80 44 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      +'<path d="M70 34 Q60 18 76 16 Q72 26 84 32 Z M130 34 Q140 18 124 16 Q128 26 116 32 Z M100 24 Q92 8 100 4 Q108 8 100 24 Z" fill="'+pal.light+'" stroke="'+pal.dark+'" stroke-width="1" opacity=".95"/>'
      +eye(91,46,3.6,pal.glow,p,1.7)+eye(109,46,3.6,pal.glow,p,1.9)
      +'<path d="M90 56 Q100 60 110 56" stroke="'+pal.dark+'" stroke-width="2" fill="none"/>'
      +'</g>'+rise(p+'r',3,7,76,124,120,170,pal.glow,0.9,3); };

  // Vine Stalker — sarmaşık-yılan canavarı (uzun esnek gövde + diken)
  C['Vine Stalker'] = function(p){ var pal={dark:'#234028',mid:'#3f6a40',light:'#7ae06a',glow:'#aaff5a',claw:'#cfff8a'};
    return cdefs(p,pal)+shadow(100,206,40)+bobOpen(2.4,2.4)
      // kıvrımlı sarmaşık gövde
      +'<path d="M76 196 Q70 160 90 140 Q110 122 96 96 Q86 80 100 64" stroke="url(#'+p+'sk)" stroke-width="22" fill="none" stroke-linecap="round"/>'
      +'<path d="M78 190 Q74 162 92 142 Q112 124 98 98 Q90 84 100 70" stroke="'+pal.light+'" stroke-width="3" fill="none" opacity=".5"/>'
      // dikenler + yapraklar
      +'<path d="M84 168 l-10 4 l8 4 Z M108 130 l12 2 l-8 6 Z M90 104 l-12 0 l8 6 Z" fill="'+pal.glow+'" opacity=".85"/>'
      +'<path d="M120 150 q14 -6 18 -18 q-10 4 -16 10 Z M70 120 q-14 -4 -18 -16 q10 4 16 10 Z" fill="'+pal.light+'" stroke="'+pal.dark+'" stroke-width="1"/>'
      // baş — yılan çiçek-ağız
      +'<path d="M100 58 Q82 56 84 38 Q90 24 100 24 Q110 24 116 38 Q118 56 100 58 Z" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.6"/>'
      // taç yaprakları
      +'<path d="M100 24 Q92 10 80 14 Q88 18 90 28 Z M100 24 Q108 10 120 14 Q112 18 110 28 Z M100 20 Q100 6 100 4 Q104 12 104 22 Z" fill="'+pal.light+'" stroke="'+pal.dark+'" stroke-width="1" opacity=".9"/>'
      +eye(92,40,3.4,pal.glow,p,1.4)+eye(108,40,3.4,pal.glow,p,1.6)
      +'<path d="M94 50 Q100 56 106 50" stroke="#0c1e0c" stroke-width="3" fill="none"/><path d="M100 54 l0 8 q-3 0 -3 -3 m3 3 q3 0 3 -3" stroke="'+pal.glow+'" stroke-width="1.4" fill="none"/>'
      +'</g>'+rise(p+'r',4,6,80,120,140,180,pal.glow,1,2.6); };

  // Moss Brute — yosunlu dev (kaya+yosun brute, taş yumruk)
  C['Moss Brute'] = function(p){ var pal={dark:'#1e3a22',mid:'#3a6238',light:'#8ad86a',glow:'#caff6a',horn:'#5a7a3a'};
    return golem(p,pal,{ sh:50, headT:42, bodyT:88,
      horns:'<path d="M78 30 Q70 18 80 14 Q80 24 90 30 Z M122 30 Q130 18 120 14 Q120 24 110 30 Z" fill="'+pal.light+'" stroke="'+pal.dark+'" stroke-width="1"/>',
      cracks:'<path d="M82 78 Q88 104 80 122 M120 78 Q112 104 120 124 M100 70 L100 130" stroke="'+pal.glow+'" stroke-width="2" fill="none" opacity=".75"><animate attributeName="opacity" values=".8;.4;.8" dur="2.2s" repeatCount="indefinite"/></path>'
        +'<path d="M70 96 q6 -4 12 -2 m36 0 q6 -2 12 2 M74 140 q8 -3 14 0 m24 0 q6 -3 14 0" stroke="'+pal.light+'" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>',
      aura:rise(p+'r',6,6,72,128,150,185,pal.glow,1,3) }); };

  /* ----------------------------- LAV: PYROS ----------------------------- */
  // Magma Guardian — lav elementali (çatlamış kaya deri + akkor magma)
  C['Magma Guardian'] = function(p){ var pal={dark:'#3a160e',mid:'#6e2c18',light:'#ff8a3a',glow:'#ffcd3a',horn:'#ff7b2d'};
    return golem(p,pal,{ sh:48, headT:42, bodyT:86,
      horns:'<path d="M80 30 L74 14 L88 28 Z M120 30 L126 14 L112 28 Z" fill="'+pal.glow+'" filter="url(#'+p+'gl)"/>',
      cracks:'<path d="M82 76 L92 100 L80 124 M118 74 L108 100 L122 126 M100 64 L100 134 M70 100 L88 110 M130 100 L112 110" stroke="'+pal.glow+'" stroke-width="2.6" fill="none" opacity=".9" filter="url(#'+p+'gl)"><animate attributeName="opacity" values="1;.45;1" dur="1.4s" repeatCount="indefinite"/></path>',
      aura:rise(p+'r',13,9,68,132,140,190,'#ff7b2d',1.3,1.8) }); };

  // Ember War Drone → ateş güvesi/anka (alev kanatlar + kor gövde)
  C['Ember War Drone'] = function(p){ return flyer(p,{dark:'#46180e',mid:'#8a2e16',light:'#ffae3a',glow:'#ffcd3a'},{
    flap:0.6, wf:30, wy:56, wf2:14, wy2:120, sh:30, dur:2.2,
    crest:'<path d="M100 60 Q96 44 102 36 Q104 48 108 58 Z" fill="'+'#ff7b2d'+'" filter="url(#'+p+'gl)"/>',
    beak:'<path d="M100 84 l-6 9 q6 4 12 0 Z" fill="#ffcd3a"/>',
    tail:'<path d="M100 148 Q88 178 96 196 Q100 182 104 196 Q112 178 100 148 Z" fill="url(#'+p+'eg)" opacity=".9"/>',
    aura:rise(p+'r',11,8,76,124,130,185,'#ff7b2d',1.2,1.8) }); };

  // Slag Droid → obsidyen kaya brute (siyah cam blok + kırmızı çekirdek)
  C['Slag Droid'] = function(p){ var pal={dark:'#241410',mid:'#4a2418',light:'#ff9a3a',glow:'#ffcd3a',horn:'#6a2a16'};
    return golem(p,pal,{ sh:48, headT:42, bodyT:88,
      horns:'<path d="M82 30 L76 16 L90 28 Z M118 30 L124 16 L110 28 Z" fill="'+pal.mid+'" stroke="'+pal.glow+'" stroke-width="1"/>',
      cracks:'<path d="M84 78 L94 104 L82 124 M116 78 L106 104 L118 126 M100 68 L100 132" stroke="'+pal.glow+'" stroke-width="2.2" fill="none" opacity=".85"><animate attributeName="opacity" values=".9;.4;.9" dur="1.7s" repeatCount="indefinite"/></path>'
        +'<path d="M74 92 l-6 4 m64 -4 l6 4 M78 138 l-8 6 m44 -6 l8 6" stroke="'+pal.mid+'" stroke-width="2" opacity=".6"/>',
      aura:rise(p+'r',15,7,72,128,150,188,'#ff7b2d',1.1,2) }); };

  /* ----------------------------- FIRTINA: VOLTAR ----------------------------- */
  // Volt Creature — elektrik canavarı (dört ayaklı, yıldırım yelesi)
  C['Volt Creature'] = function(p){ var pal={dark:'#1e3050',mid:'#3a5884',light:'#bfe4ff',glow:'#9fd0ff',claw:'#dff0ff',horn:'#9fd0ff'};
    return beast(p,pal,{ sh:42, amp:2.2, dur:2.4, legY:158, spread:24, bodyT:98, headT:42,
      spots:'<path d="M76 96 L86 108 L78 118 M124 96 L114 108 L122 118" stroke="'+pal.glow+'" stroke-width="2" fill="none" opacity=".8"><animate attributeName="opacity" values=".9;.3;.9" dur="0.8s" repeatCount="indefinite"/></path>',
      horns:'<path d="M78 30 L70 10 L80 22 L76 6 L88 26 Z" fill="'+pal.glow+'" filter="url(#'+p+'gl)"/><path d="M122 30 L130 10 L120 22 L124 6 L112 26 Z" fill="'+pal.glow+'" filter="url(#'+p+'gl)"/>',
      mouth:'<path d="M88 60 Q100 66 112 60 Q108 56 100 57 Q92 56 88 60 Z" fill="#0a1830"/><path d="M94 60 l-2 6 M106 60 l2 6" stroke="'+pal.glow+'" stroke-width="1.6"/>',
      aura:'<path d="M60 120 L50 132 L58 130 L48 146 M140 120 L150 132 L142 130 L152 146" stroke="'+pal.glow+'" stroke-width="1.6" fill="none" opacity=".7"><animate attributeName="opacity" values=".8;.2;.8" dur="0.7s" repeatCount="indefinite"/></path>'+rise(p+'r',10,6,78,122,140,180,pal.glow,1,1.6) }); };

  // Storm Wisp — fırtına ruhu (süzülen bulut-wraith + şimşek)
  C['Storm Wisp'] = function(p){ return wraith(p,{dark:'#2c3c58',mid:'#4a6488',light:'#cfe8ff',glow:'#9fd0ff'},{
    sh:30, dur:2.8,
    runes:'<path d="M96 110 L88 128 L98 126 L90 148" stroke="#cfe8ff" stroke-width="2" fill="none" opacity=".8"><animate attributeName="opacity" values=".9;.2;.9" dur="0.6s" repeatCount="indefinite"/></path>'
      +'<path d="M112 116 L106 130 L114 128 L108 144" stroke="#9fd0ff" stroke-width="1.6" fill="none" opacity=".7"><animate attributeName="opacity" values=".8;.2;.8" dur="0.8s" begin=".2s" repeatCount="indefinite"/></path>',
    aura:rise(p+'r',2,7,76,124,120,180,'#9fd0ff',1,1.8) }); };

  // Tempest Brute — gök gürültüsü golemi (bulut gövde + şimşek damar)
  C['Tempest Brute'] = function(p){ var pal={dark:'#22304a',mid:'#3e5878',light:'#bfe4ff',glow:'#9fd0ff',horn:'#cfe8ff'};
    return golem(p,pal,{ sh:50, headT:42, bodyT:86,
      horns:'<path d="M80 30 L72 14 L86 28 Z M120 30 L128 14 L114 28 Z" fill="'+pal.glow+'" filter="url(#'+p+'gl)"/>',
      cracks:'<path d="M86 76 L94 96 L84 116 L96 134 M114 76 L106 96 L116 116 L104 134" stroke="'+pal.glow+'" stroke-width="2.4" fill="none" opacity=".9" filter="url(#'+p+'gl)"><animate attributeName="opacity" values="1;.3;1" dur="0.7s" repeatCount="indefinite"/></path>',
      aura:'<path d="M30 134 L20 124 L28 128 L18 116 M170 134 L180 124 L172 128 L182 116" stroke="'+pal.glow+'" stroke-width="1.6" fill="none" opacity=".7"><animate attributeName="opacity" values=".8;.2;.8" dur="0.6s" repeatCount="indefinite"/></path>'+rise(p+'r',7,6,72,128,150,186,pal.glow,1,1.8) }); };

  /* ----------------------------- KARANLIK TAPINAK ----------------------------- */
  // Shadow Guard — gölge wraith savaşçısı (karanlık zırh + parlayan rünler)
  C['Shadow Guard'] = function(p){ return wraith(p,{dark:'#191226',mid:'#2c2044',light:'#a86bff',glow:'#c89bff'},{
    sh:30, dur:3,
    runes:'<path d="M84 100 L84 116 M116 100 L116 116 M88 112 L112 112" stroke="#a86bff" stroke-width="2" opacity=".7"/>'
      +'<path d="M100 120 L94 134 L106 134 Z" fill="none" stroke="#c89bff" stroke-width="1.6" opacity=".7"><animate attributeName="opacity" values=".8;.3;.8" dur="2s" repeatCount="indefinite"/></path>',
    aura:'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="3s" repeatCount="indefinite"/>'
      +'<path d="M70 96 Q40 100 36 128" stroke="#2c2044" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>'
      +'<path d="M36 128 q-4 -8 -10 -10 q4 8 2 16 Z" fill="#a86bff" opacity=".7"/></g>'
      +rise(p+'r',1,6,76,124,120,178,'#a86bff',1,2.4) }); };

  // Void Acolyte — boşluk ruhu (yüzen küre başlı yaratık + halka)
  C['Void Acolyte'] = function(p){ var pal={dark:'#150e22',mid:'#271a40',light:'#c89bff',glow:'#d2adff'};
    return cdefs(p,pal)
      +'<ellipse cx="100" cy="204" rx="26" ry="6" fill="'+pal.glow+'" opacity=".16"><animate attributeName="opacity" values=".2;.06;.2" dur="2.8s" repeatCount="indefinite"/></ellipse>'
      +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="3s" repeatCount="indefinite"/>'
      // dönen boşluk halkası
      +'<g style="transform-origin:100px 96px"><animateTransform attributeName="transform" type="rotate" from="0 100 96" to="360 100 96" dur="9s" repeatCount="indefinite"/>'
      +'<ellipse cx="100" cy="96" rx="44" ry="14" fill="none" stroke="'+pal.glow+'" stroke-width="2" opacity=".55"/>'
      +'<circle cx="144" cy="96" r="3" fill="'+pal.glow+'"/><circle cx="56" cy="96" r="3" fill="'+pal.light+'"/></g>'
      // dalgalı cüppe gövde
      +'<path fill="url(#'+p+'sk)"><animate attributeName="d" dur="3.6s" repeatCount="indefinite" values="M76 100 Q66 156 78 192 Q90 178 100 190 Q110 178 122 192 Q134 156 124 100 Z;M76 100 Q62 158 80 194 Q92 180 100 188 Q108 180 120 194 Q138 158 124 100 Z;M76 100 Q66 156 78 192 Q90 178 100 190 Q110 178 122 192 Q134 156 124 100 Z"/></path>'
      +'<path d="M86 104 Q80 156 88 184 Q100 174 112 184 Q120 156 114 104 Z" fill="'+pal.dark+'" opacity=".5"/>'
      // başlık küre
      +'<circle cx="100" cy="82" r="22" fill="url(#'+p+'sk)" stroke="'+pal.dark+'" stroke-width="1.4"/>'
      +'<circle cx="100" cy="82" r="13" fill="#06040e"/>'
      +eye(94,82,3.4,pal.glow,p,2)+eye(106,82,3.4,pal.glow,p,2.3)
      +'<circle cx="100" cy="76" r="2.2" fill="'+pal.light+'"/>'
      +'</g>'+rise(p+'r',2,6,78,122,120,178,pal.glow,1,2.6); };

  // Crypt Brute — taş mezar golemi (eski heykel brute + mor rünler)
  C['Crypt Brute'] = function(p){ var pal={dark:'#1a1228',mid:'#332450',light:'#9a7ad0',glow:'#d2adff',horn:'#8a6abf'};
    return golem(p,pal,{ sh:50, headT:42, bodyT:86,
      horns:'<path d="M80 30 L74 12 L88 28 Z M120 30 L126 12 L112 28 Z" fill="'+pal.mid+'" stroke="'+pal.glow+'" stroke-width="1"/>',
      cracks:'<path d="M84 78 L92 104 L82 124 M118 76 L108 102 L120 126 M100 66 L100 132" stroke="'+pal.glow+'" stroke-width="2.2" fill="none" opacity=".8"><animate attributeName="opacity" values=".85;.35;.85" dur="2.4s" repeatCount="indefinite"/></path>'
        +'<path d="M88 92 h24 M86 110 h28 M90 128 h20" stroke="'+pal.glow+'" stroke-width="1.4" opacity=".45"/>',
      aura:rise(p+'r',9,6,72,128,150,186,pal.glow,1,2.8) }); };

  window.NB_CREATURES = C;
})();
