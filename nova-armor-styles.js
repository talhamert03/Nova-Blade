/* ===========================================================================
   NOVA BLADE · ZIRH SİLÜET SİSTEMİ
   Her zırh 'style' alanı kahramanın gövdesini görsel olarak değiştirir.
   (Tap Titans benzeri ekipman çeşitliliği — sadece renk değil, SİLUET.)

   Koordinat çerçevesi heroSVG() ile aynı: viewBox 0 0 120 170, merkez x≈60.
   Üretilen parçalar:
     cape      → her şeyin arkasında (nbBodyB / nbUpper içinde döner)
     legs      → bacaklar/etek (statik, gövde ile dönmez)
     pauldronL → arka (sol) omuz
     torso     → gövde zırhı/giysi
     pauldronR → ön (sağ) omuz kapağı (kolun üstünde, statik)
     cowl      → boyun atkısı
     belt      → kemer
     head      → kask/başlık

   Renkler: C = {body, trim, cloak, dark, visor, light}
   =========================================================================== */
(function(){
  'use strict';

  // parlayan göz çifti (kapüşon/maske içinde)
  function eyes(cx, cy, col, gap, r, dur){
    gap = gap||5; r = r||1.4; dur = dur||2.4;
    return `<ellipse cx="${cx-gap}" cy="${cy}" rx="${r}" ry="${r*0.82}" fill="${col}" filter="drop-shadow(0 0 2px ${col})"><animate attributeName="opacity" values="1;.45;1" dur="${dur}s" repeatCount="indefinite"/></ellipse>`
      + `<ellipse cx="${cx+gap}" cy="${cy}" rx="${r}" ry="${r*0.82}" fill="${col}" filter="drop-shadow(0 0 2px ${col})"><animate attributeName="opacity" values="1;.45;1" dur="${dur}s" begin=".3s" repeatCount="indefinite"/></ellipse>`;
  }
  // trim parıltısı (yavaş nabız)
  function pulse(){ return `<animate attributeName="opacity" values=".9;.4;.9" dur="2.4s" repeatCount="indefinite"/>`; }

  /* ===================== BACAK / ETEK BUILDER'LARI ===================== */
  // zırhlı bacaklar + botlar (plate / commander / etched için ağır)
  function platedLegs(C){ const {body,dark,trim}=C; return `<g>
    <path d="M46.5 95 L73.5 95 L72.5 110 Q60 116 47.5 110 Z" fill="${dark}"/>
    <path d="M47.4 104 L45.4 130 L57 130 L57.6 104 Z" fill="${dark}"/>
    <path d="M48.4 104 L47 127 L56 127 L56.6 104 Z" fill="${body}"/>
    <path d="M48.4 104 L48 116 L51.8 116 L52.2 104 Z" fill="#fff" opacity=".06"/>
    <path d="M55 106 L54.4 126 L56.2 126 L56.6 106 Z" fill="#000" opacity=".15"/>
    <path d="M46.4 126 L51.5 122 L56.6 126 L55.6 134 L47.6 134 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
    <path d="M48.8 128 L51.5 126 L54.2 128 L53.6 131 L49.4 131 Z" fill="${trim}" opacity=".5"/>
    <path d="M47.8 133 L47 148 L56 148 L55.4 133 Z" fill="${body}"/>
    <path d="M47.8 133 L47.3 145 L50.4 145 L50.8 133 Z" fill="#fff" opacity=".05"/>
    <path d="M45.4 146 L44.2 154 Q43.8 158.4 49 158.4 L57 158.4 L56.4 146 Z" fill="${dark}"/>
    <rect x="47" y="149.4" width="9" height="2.6" rx="1" fill="${body}" opacity=".75"/>
    <path d="M43.8 156.4 L58 156.4 L58 159.6 L43.2 159.6 Z" fill="#0e1118"/>
    <path d="M62.4 104 L62 130 L74.2 130 L72.6 104 Z" fill="${dark}"/>
    <path d="M63.4 104 L63 127 L72.6 127 L71.6 104 Z" fill="${body}"/>
    <path d="M69 105 L69.5 126 L72.2 126 L71.5 105 Z" fill="#000" opacity=".16"/>
    <path d="M63.4 104 L63.2 116 L66.4 116 L66.6 104 Z" fill="#fff" opacity=".055"/>
    <path d="M61.8 126 L67.4 122 L73.2 126 L72.2 134 L62.8 134 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
    <path d="M64.4 128 L67.4 126 L70.2 128 L69.6 131 L65 131 Z" fill="${trim}" opacity=".5"/>
    <path d="M63 133 L62.6 148 L72 148 L71.4 133 Z" fill="${body}"/>
    <path d="M69 134 L69.4 146 L71.2 146 L70.8 134 Z" fill="#000" opacity=".12"/>
    <path d="M62 146 L61.4 158.4 L70 158.4 Q75.2 158.4 74.8 154 L73.6 146 Z" fill="${dark}"/>
    <rect x="63" y="149.4" width="9" height="2.6" rx="1" fill="${body}" opacity=".75"/>
    <path d="M61.4 156.4 L75.4 156.4 L75.6 159.6 L61.4 159.6 Z" fill="#0e1118"/>
  </g>`; }

  // ince pantolon + bot (vest / poncho)
  function pantsLegs(C){ const {body,dark,trim}=C; return `<g>
    <path d="M47 95 L73 95 L72 108 Q60 113 48 108 Z" fill="${dark}"/>
    <path d="M48.5 104 L47.6 142 L56.6 142 L57 104 Z" fill="${body}"/>
    <path d="M48.5 104 L48.2 134 L51 134 L51.4 104 Z" fill="#fff" opacity=".05"/>
    <path d="M54.6 106 L55 140 L56.6 140 L56.6 106 Z" fill="#000" opacity=".14"/>
    <path d="M46.4 140 L45.8 152 Q45.6 158.6 51 158.6 L57.4 158.6 L57 140 Z" fill="${dark}"/>
    <rect x="47.4" y="146" width="9.4" height="2.6" rx="1" fill="${trim}" opacity=".55"/>
    <path d="M45 156.6 L58.6 156.6 L58.6 159.6 L44.6 159.6 Z" fill="#0c0f15"/>
    <path d="M63 104 L63.4 142 L72.4 142 L71.5 104 Z" fill="${body}"/>
    <path d="M68.6 105 L69 140 L71.4 140 L70.8 105 Z" fill="#000" opacity=".15"/>
    <path d="M63 104 L63 134 L65.6 134 L66 104 Z" fill="#fff" opacity=".05"/>
    <path d="M62.6 140 L62.2 158.6 L69 158.6 Q74.4 158.6 74.2 152 L73.6 140 Z" fill="${dark}"/>
    <rect x="63.2" y="146" width="9.4" height="2.6" rx="1" fill="${trim}" opacity=".55"/>
    <path d="M61.4 156.6 L75 156.6 L75.2 159.6 L61.4 159.6 Z" fill="#0c0f15"/>
  </g>`; }

  // akan robe eteği (robe / phantom / regalia)
  function robeSkirt(C, opt){ opt=opt||{}; const cl=opt.cloak||C.cloak, bo=opt.body||C.body, tr=C.trim, sway=opt.sway||4.6, w=opt.w||0;
    const L=46-w, R=74+w, BL=44-w, BR=76+w;
    return `<g>
    <path fill="${cl}"><animate attributeName="d" dur="${sway}s" repeatCount="indefinite"
      values="M${L} 94 Q${BL} 128 ${BL+1} 158 L${BR-1} 158 Q${BR} 128 ${R} 94 Z;M${L} 94 Q${BL-2} 132 ${BL} 158 L${BR} 158 Q${BR+1} 130 ${R} 94 Z;M${L} 94 Q${BL} 128 ${BL+1} 158 L${BR-1} 158 Q${BR} 128 ${R} 94 Z"/></path>
    <path d="M${L+4} 95 Q${BL+3} 128 ${BL+5} 156 L${BL+9} 156 Q${BL+6} 128 ${L+9} 96 Z" fill="#fff" opacity=".05"/>
    <path d="M60 96 L60 157" stroke="${bo}" stroke-width="1.1" opacity=".4"/>
    <path d="M53 98 Q52 128 53 156 M67 98 Q68 128 67 156" stroke="#000" stroke-width="1" fill="none" opacity=".16"/>
    <path d="M${BL+2} 152 Q60 158 ${BR-2} 152 L${BR-2} 158 L${BL+2} 158 Z" fill="#000" opacity=".22"/>
    ${opt.hem?`<path d="M${BL+1} 153 Q60 159 ${BR-1} 153" stroke="${tr}" stroke-width="1.4" fill="none" opacity=".6">${pulse()}</path>`:''}
    <path d="M55 156 L53.5 159.4 L57.4 159.4 L57.4 156 Z" fill="${C.dark}"/>
    <path d="M62.6 156 L62.6 159.4 L66.5 159.4 L65 156 Z" fill="${C.dark}"/>
  </g>`; }

  /* ===================== STYLE PARÇA ÜRETİCİSİ ===================== */
  function parts(style, C){
    const body=C.body, trim=C.trim, cloak=C.cloak, dark=C.dark||'#191d26', visor=C.visor||trim;
    const P = {cape:'', legs:'', pauldronL:'', pauldronR:'', torso:'', cowl:'', belt:'', head:''};

    /* ---- ortak: arka kol zaten heroSVG'de; biz omuz/gövde/kafa veriyoruz ---- */

    switch(style){

    /* ========================= PLATE (asker zırhı) ========================= */
    case 'plate': default: {
      P.cape = `<g opacity=".97">
        <path fill="${cloak}"><animate attributeName="d" dur="4.4s" repeatCount="indefinite"
          values="M66 56 Q92 96 86 150 L60 146 Q66 100 60 60 Z;M66 56 Q98 100 90 152 L60 146 Q66 100 60 60 Z;M66 56 Q92 96 86 150 L60 146 Q66 100 60 60 Z"/></path>
        <path fill="#000" opacity=".24"><animate attributeName="d" dur="4.4s" repeatCount="indefinite"
          values="M67 57 Q86 98 82 150 L73 148 Q74 100 63 60 Z;M67 57 Q90 102 86 152 L73 148 Q74 100 63 60 Z;M67 57 Q86 98 82 150 L73 148 Q74 100 63 60 Z"/></path>
        <path d="M65 57 Q73 58 76 65" stroke="${trim}" stroke-width="1.3" fill="none" opacity=".45"/></g>`;
      P.legs = platedLegs(C);
      P.pauldronL = `<g>
        <path d="M41.5 57 Q49.5 50 57 57 L58 70 Q49.5 75 41 70 Z" fill="${body}" stroke="${dark}" stroke-width=".9"/>
        <path d="M42.4 58.4 Q49.5 53.4 56 58.4 L56.4 62 Q49.5 57.6 42.6 62 Z" fill="#fff" opacity=".12"/>
        <path d="M42.6 66.6 Q49.5 70.4 56.4 66.6" stroke="${trim}" stroke-width="1.2" fill="none" opacity=".5"/>
        <circle cx="49.5" cy="63" r="1.5" fill="${trim}" opacity=".7"/></g>`;
      P.pauldronR = `<g>
        <path d="M62.5 57 Q70.5 50 78.5 57 L79 70 Q70.5 75 62 70 Z" fill="${body}" stroke="${dark}" stroke-width=".9"/>
        <path d="M63.6 58.4 Q70.5 53.4 77.4 58.4 L77.8 62 Q70.5 57.6 64 62 Z" fill="#fff" opacity=".12"/>
        <path d="M63.6 66.6 Q70.5 70.4 77.4 66.6" stroke="${trim}" stroke-width="1.2" fill="none" opacity=".5"/></g>`;
      P.torso = `<g>
        <path d="M48 60 L72 60 L75 98 Q60 106 45 98 Z" fill="${dark}"/>
        <path d="M49 86 Q60 92 71 86 L71.6 89.6 Q60 95.4 48.4 89.6 Z" fill="${body}" opacity=".9"/>
        <path d="M49.8 90.4 Q60 95.6 70.2 90.4 L70.6 93.8 Q60 98.8 49.4 93.8 Z" fill="${body}" opacity=".74"/>
        <path d="M47.5 60 L72.5 60 L74 80 Q60 88 46 80 Z" fill="${body}"/>
        <path d="M47.5 60 L72.5 60 L73 66 L47 66 Z" fill="#fff" opacity=".09"/>
        <path d="M67 60.4 L72.5 60 L74 80 Q68.5 84 64.5 84 Z" fill="#000" opacity=".17"/>
        <path d="M60 61 L60 84" stroke="${dark}" stroke-width="1.5" opacity=".7"/>
        <path d="M52 61 L60 66 L68 61" stroke="${trim}" stroke-width="1.6" fill="none" opacity=".7"/>
        <circle cx="60" cy="74" r="2.4" fill="${trim}" opacity=".9"><animate attributeName="opacity" values=".9;.4;.9" dur="2.2s" repeatCount="indefinite"/></circle></g>`;
      P.cowl = `<g>
        <path d="M50 53.5 Q60 49.5 70 53.5 L72 62 Q60 68 48 62 Z" fill="${cloak}"/>
        <path d="M50 53.5 Q60 49.5 70 53.5 L70.6 56.6 Q60 52.8 49.4 56.6 Z" fill="#fff" opacity=".09"/></g>`;
      P.belt = beltStd(C);
      P.head = `<g>
        <rect x="56" y="48" width="9" height="8" rx="2" fill="${dark}"/>
        <path d="M51.5 41 Q50 27 60 25.5 Q70 27 68.5 41 Q68 49 64 52 L56.5 52 Q52.4 49 51.5 41 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
        <path d="M64 26.5 Q70 28 68.5 41 Q68 49 64 52 L61 52 Q66 48 66 40 Q66.5 30 62.5 27 Z" fill="#000" opacity=".18"/>
        <path d="M53.6 33 Q54 28 60 27 Q63.5 27.3 65 29.6 Q60 28.4 56 31 Q54 33 53.7 37 Z" fill="#fff" opacity=".13"/>
        <path d="M60 25.8 L62 30 L60.6 41 L59.4 41 L58 30 Z" fill="${body}"/>
        <path d="M53.5 38 Q60 36.6 66.5 38 L65.6 43.4 L60.8 44.6 L60.8 49.4 L59.2 49.4 L59.2 44.6 L54.4 43.4 Z" fill="#0a0d14"/>
        <path d="M55 40.4 Q60 39.4 65 40.4" stroke="${visor}" stroke-width="1.5" fill="none" opacity=".85" filter="drop-shadow(0 0 2px ${visor})"><animate attributeName="opacity" values=".85;.4;.85" dur="2.4s" repeatCount="indefinite"/></path>
        <path d="M60 41.6 L60 48.4" stroke="${visor}" stroke-width="1.2" opacity=".7"/></g>`;
      break;
    }

    /* ========================= ROBE (cübbe / keşiş) ========================= */
    case 'robe': {
      P.legs = robeSkirt(C, {sway:4.8});
      // yumuşak omuz örtüsü
      P.pauldronL = `<path d="M44 58 Q49.5 53 56 57 Q57 64 54 72 Q48 70 43 68 Q42 62 44 58 Z" fill="${cloak}" stroke="${dark}" stroke-width=".6" opacity=".95"/>`;
      P.pauldronR = `<path d="M64 57 Q70.5 53 76 58 Q78 62 77 68 Q72 70 66 72 Q63 64 64 57 Z" fill="${cloak}" stroke="${dark}" stroke-width=".6" opacity=".95"/>`;
      P.torso = `<g>
        <path d="M49 57 L71 57 L77 100 Q60 108 43 100 Z" fill="${cloak}"/>
        <path d="M52 58 L68 58 L60 86 Z" fill="${body}"/>
        <path d="M60 58 L60 90" stroke="${dark}" stroke-width="1.2" opacity=".5"/>
        <path d="M52 58 L60 74 L68 58" stroke="${trim}" stroke-width="1.4" fill="none" opacity=".65"/>
        <path d="M46 76 Q60 84 74 76 L73 82 Q60 90 47 82 Z" fill="${dark}" opacity=".5"/>
        <path d="M50 60 Q47 80 45 99 M70 60 Q73 80 75 99" stroke="#000" stroke-width="1" fill="none" opacity=".18"/>
        <circle cx="60" cy="70" r="2.1" fill="${trim}"><animate attributeName="opacity" values=".9;.4;.9" dur="2.4s" repeatCount="indefinite"/></circle></g>`;
      P.cowl = `<path d="M52 52 Q60 56 68 52 L70 60 Q60 65 50 60 Z" fill="${cloak}"/>`;
      P.belt = `<g><path d="M45 95 Q60 101 75 95 L74 101 Q60 107 46 101 Z" fill="${dark}"/>
        <path d="M55 97 L65 97 L64 104 L56 104 Z" fill="${body}" stroke="${dark}" stroke-width=".6"/>
        <circle cx="60" cy="100" r="2" fill="${trim}">${pulse()}</circle></g>`;
      // büyük kapüşon, gölgede yüz + parlayan gözler
      P.head = `<g>
        <path d="M48 44 Q46 24 60 22 Q74 24 72 44 Q71 52 64 55 L56 55 Q49 52 48 44 Z" fill="${cloak}" stroke="${dark}" stroke-width=".8"/>
        <path d="M50 42 Q49 27 60 25.5 Q60 25.5 60 25.5 Q56 30 55 44 Z" fill="#fff" opacity=".08"/>
        <path d="M53 40 Q60 35 67 40 L65 50 Q60 53 55 50 Z" fill="#07060c"/>
        ${eyes(60,44,trim,4.6,1.5,2.6)}
        <path d="M67 24 Q72 30 71 42" stroke="#000" stroke-width="1" fill="none" opacity=".25"/></g>`;
      break;
    }

    /* ========================= VEST (kaçakçı / pilot) ========================= */
    case 'vest': {
      P.legs = pantsLegs(C);
      P.pauldronL = `<path d="M43 58 Q49 54 55 58 L56 67 Q49.5 70 42.5 67 Z" fill="${dark}" stroke="#000" stroke-width=".5"/>`;
      P.pauldronR = `<path d="M64 58 Q70.5 54 77 58 L77.5 67 Q70.5 70 64 67 Z" fill="${dark}" stroke="#000" stroke-width=".5"/>`;
      P.torso = `<g>
        <path d="M50 58 L70 58 L73 98 Q60 104 47 98 Z" fill="${dark}"/>
        <path d="M53 59 L67 59 L66 96 L54 96 Z" fill="${body}" opacity=".9"/>
        <path d="M50 58 L57 58 L55 99 L48 97 Z" fill="${cloak}"/>
        <path d="M70 58 L63 58 L65 99 L72 97 Z" fill="${cloak}"/>
        <path d="M50 58 L57 58 L55.4 92 L49 94 Z" fill="#fff" opacity=".06"/>
        <path d="M48 64 L72 72" stroke="${trim}" stroke-width="2.4" opacity=".85"/>
        <circle cx="52" cy="66" r="1.3" fill="${body}"/><circle cx="60" cy="69" r="1.3" fill="${body}"/><circle cx="68" cy="71.5" r="1.3" fill="${body}"/>
        <rect x="55" y="80" width="10" height="7" rx="1.5" fill="${dark}"/><rect x="56.4" y="81.4" width="7" height="2" rx="1" fill="${trim}" opacity=".8"/></g>`;
      P.cowl = '';
      P.belt = `<g><rect x="47" y="95" width="26" height="7" rx="2" fill="#22262f"/><rect x="56" y="94" width="8" height="9" rx="1.5" fill="${trim}" opacity=".9"/>
        <rect x="48" y="101" width="7" height="9" rx="1.6" fill="${dark}"/><rect x="66" y="101" width="6.6" height="8" rx="1.6" fill="${dark}"/></g>`;
      // pilot kask, kalkık vizör — açık yüz hattı
      P.head = `<g>
        <path d="M52 42 Q51 28 60 26.5 Q69 28 68 42 Q67.5 49 63 52 L57 52 Q52.5 49 52 42 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
        <path d="M52 33 Q60 30 68 33 L67 39 Q60 36 53 39 Z" fill="${dark}"/>
        <ellipse cx="56" cy="42" rx="3.4" ry="2.8" fill="#0a0d14" stroke="${dark}" stroke-width=".6"/>
        <ellipse cx="64" cy="42" rx="3.4" ry="2.8" fill="#0a0d14" stroke="${dark}" stroke-width=".6"/>
        <ellipse cx="56" cy="42" rx="2" ry="1.5" fill="${visor}" opacity=".85"><animate attributeName="opacity" values=".85;.45;.85" dur="2.6s" repeatCount="indefinite"/></ellipse>
        <ellipse cx="64" cy="42" rx="2" ry="1.5" fill="${visor}" opacity=".85"><animate attributeName="opacity" values=".85;.45;.85" dur="2.6s" begin=".3s" repeatCount="indefinite"/></ellipse>
        <path d="M55 47 Q60 49 65 47 L64 50 Q60 51.6 56 50 Z" fill="#0a0d14"/>
        <path d="M66 33 Q70 35 69 44" stroke="#000" stroke-width="1" fill="none" opacity=".22"/></g>`;
      break;
    }

    /* ========================= COMMANDER (subay) ========================= */
    case 'commander': {
      P.legs = coatLegs(C);
      P.pauldronL = `<g><path d="M41 57 Q49.5 51 57 57 L58 68 Q49.5 72 41 68 Z" fill="${body}" stroke="${dark}" stroke-width=".8"/>
        <rect x="42" y="65.5" width="15" height="3" rx="1.2" fill="${trim}" opacity=".9"/>
        <path d="M44 67 l1.6 3 M48 67 l1.6 3 M52 67 l1.6 3" stroke="${trim}" stroke-width="1" opacity=".8"/></g>`;
      P.pauldronR = `<g><path d="M63 57 Q70.5 51 79 57 L79 68 Q70.5 72 62 68 Z" fill="${body}" stroke="${dark}" stroke-width=".8"/>
        <rect x="63" y="65.5" width="15" height="3" rx="1.2" fill="${trim}" opacity=".9"/>
        <path d="M65 67 l1.6 3 M69 67 l1.6 3 M73 67 l1.6 3" stroke="${trim}" stroke-width="1" opacity=".8"/></g>`;
      P.torso = `<g>
        <path d="M48 58 L72 58 L75 100 Q60 106 45 100 Z" fill="${body}"/>
        <path d="M48 58 L60 62 L60 102 L45 100 Z" fill="${cloak}" opacity=".55"/>
        <path d="M72 58 L60 62 L60 102 L75 100 Z" fill="#000" opacity=".14"/>
        <path d="M60 60 L60 100" stroke="${dark}" stroke-width="1.2" opacity=".6"/>
        <circle cx="55" cy="68" r="1.3" fill="${trim}"/><circle cx="55" cy="76" r="1.3" fill="${trim}"/><circle cx="55" cy="84" r="1.3" fill="${trim}"/>
        <circle cx="65" cy="68" r="1.3" fill="${trim}"/><circle cx="65" cy="76" r="1.3" fill="${trim}"/><circle cx="65" cy="84" r="1.3" fill="${trim}"/>
        <rect x="52" y="64" width="6" height="9" rx="1" fill="${trim}" opacity=".85"/>
        <path d="M52 65 h4 M52 67 h4 M52 69 h4" stroke="${dark}" stroke-width=".5"/></g>`;
      P.cowl = `<path d="M51 53 Q60 50 69 53 L70 60 Q60 64 50 60 Z" fill="${dark}"/>`;
      P.belt = `<g><rect x="46" y="96" width="28" height="7" rx="1.6" fill="${dark}"/><rect x="55" y="95" width="10" height="9" rx="1.4" fill="${trim}" opacity=".9"/><path d="M58 97 l2 4 l2 -4" stroke="${dark}" stroke-width=".8" fill="none"/></g>`;
      // tepe kasketi (peaked cap)
      P.head = `<g>
        <rect x="56" y="48" width="9" height="7" rx="2" fill="${dark}"/>
        <path d="M53 40 Q52 30 60 28.5 Q68 30 67 40 L66 48 Q60 51 54 48 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
        <path d="M52 40 Q60 36.5 68 40 L68 43 Q60 39.5 52 43 Z" fill="${dark}"/>
        <path d="M55 43.5 Q60 41.5 65 43.5 L64.5 46.5 Q60 44.8 55.5 46.5 Z" fill="#0a0d14"/>
        <path d="M56 44.6 Q60 43.2 64 44.6" stroke="${visor}" stroke-width="1.2" fill="none" opacity=".8"><animate attributeName="opacity" values=".8;.4;.8" dur="2.4s" repeatCount="indefinite"/></path>
        <path d="M50 47 L70 47 L70.5 50 Q60 53 49.5 50 Z" fill="${dark}"/>
        <path d="M52 28.5 Q60 26 68 28.5" stroke="${trim}" stroke-width="1.4" fill="none" opacity=".8"/>
        <path d="M56 28 L64 28 L62.5 31 L57.5 31 Z" fill="${trim}" opacity=".9"/></g>`;
      break;
    }

    /* ========================= PHANTOM (sith / karanlık) ========================= */
    case 'phantom': {
      P.cape = `<g opacity=".97">
        <path fill="${cloak}"><animate attributeName="d" dur="4.2s" repeatCount="indefinite"
          values="M64 52 Q92 96 84 158 L40 158 Q34 96 56 52 Z;M64 52 Q96 100 88 158 L36 158 Q32 96 56 52 Z;M64 52 Q92 96 84 158 L40 158 Q34 96 56 52 Z"/></path>
        <path fill="#000" opacity=".34"><animate attributeName="d" dur="4.2s" repeatCount="indefinite"
          values="M62 54 Q84 100 80 156 L52 156 Q56 100 56 56 Z;M62 54 Q88 104 84 158 L52 158 Q56 100 56 56 Z;M62 54 Q84 100 80 156 L52 156 Q56 100 56 56 Z"/></path></g>`;
      P.legs = robeSkirt(C, {cloak:dark, body:dark, sway:4.2});
      // sivri açılı omuzlar
      P.pauldronL = `<g><path d="M40 58 L57 56 L56 70 Q48 73 40 68 Z" fill="${body}" stroke="${dark}" stroke-width=".8"/>
        <path d="M40 58 L48 52 L51 58 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
        <path d="M42 66 L55 64" stroke="${trim}" stroke-width="1" opacity=".6"/></g>`;
      P.pauldronR = `<g><path d="M63 56 L80 58 L80 68 Q72 73 64 70 Z" fill="${body}" stroke="${dark}" stroke-width=".8"/>
        <path d="M80 58 L72 52 L69 58 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
        <path d="M65 64 L78 66" stroke="${trim}" stroke-width="1" opacity=".6"/></g>`;
      P.torso = `<g>
        <path d="M49 57 L71 57 L76 100 Q60 108 44 100 Z" fill="${dark}"/>
        <path d="M52 58 L68 58 L72 96 Q60 102 48 96 Z" fill="${body}" opacity=".92"/>
        <path d="M60 57 L60 98" stroke="#000" stroke-width="1.4" opacity=".5"/>
        <path d="M52 60 L60 70 L68 60 M50 74 L60 82 L70 74" stroke="${trim}" stroke-width="1.2" fill="none" opacity=".55"/>
        <path d="M55 86 L65 86 L63 94 L57 94 Z" fill="#08060c"/>
        <circle cx="60" cy="90" r="2.2" fill="${trim}"><animate attributeName="r" values="2.2;1.4;2.2" dur="1.8s" repeatCount="indefinite"/></circle></g>`;
      P.cowl = `<path d="M51 52 Q60 56 69 52 L71 60 Q60 66 49 60 Z" fill="${dark}"/>`;
      P.belt = `<path d="M46 96 Q60 102 74 96 L73 102 Q60 108 47 102 Z" fill="#08060c"/>`;
      // derin sivri kapüşon + kor gözler
      P.head = `<g>
        <path d="M47 46 Q44 22 60 19 Q76 22 73 46 Q72 52 66 56 L54 56 Q48 52 47 46 Z" fill="${dark}" stroke="#000" stroke-width=".7"/>
        <path d="M60 19 L62 12 L60 14 L58 12 Z" fill="${body}"/>
        <path d="M52 44 Q60 38 68 44 L66 53 Q60 56 54 53 Z" fill="#050308"/>
        ${eyes(60,46,trim,5,1.8,2.2)}
        <path d="M55 50 Q60 52 65 50" stroke="${trim}" stroke-width=".8" fill="none" opacity=".5"/></g>`;
      break;
    }

    /* ========================= PONCHO (çöl akıncısı) ========================= */
    case 'poncho': {
      P.legs = pantsLegs(C);
      P.pauldronL = `<path d="M40 58 Q49.5 53 57 58 L58 70 L40 72 Z" fill="${cloak}" stroke="${dark}" stroke-width=".7"/>`;
      P.pauldronR = `<path d="M63 58 Q70.5 53 80 58 L80 72 L62 70 Z" fill="${cloak}" stroke="${dark}" stroke-width=".7"/>`;
      // asimetrik poncho
      P.torso = `<g>
        <path d="M44 60 L76 60 L78 92 L42 92 Z" fill="${cloak}"/>
        <path d="M44 60 L76 60 L77 66 L43 66 Z" fill="#fff" opacity=".08"/>
        <path d="M42 86 L78 86 L72 100 L60 104 L48 100 Z" fill="${body}"/>
        <path d="M42 86 L78 86 L77.4 89 L42.4 89 Z" fill="${trim}" opacity=".7"/>
        <path d="M48 92 L72 92 L70 98 L50 98 Z" fill="${trim}" opacity=".35"/>
        <path d="M60 60 L60 104" stroke="${dark}" stroke-width="1" opacity=".4"/>
        <path d="M50 70 L70 70 M48 78 L72 78" stroke="${dark}" stroke-width="1" opacity=".3"/>
        <rect x="55" y="72" width="10" height="8" rx="1.5" fill="${body}"/><rect x="56.4" y="73.6" width="7" height="2" rx="1" fill="${trim}" opacity=".8"/></g>`;
      P.cowl = '';
      P.belt = `<g><rect x="48" y="98" width="24" height="6" rx="2" fill="${dark}"/><path d="M50 70 L70 100" stroke="#3a2e22" stroke-width="3" opacity=".7"/>
        <circle cx="54" cy="82" r="1.4" fill="${trim}"/><circle cx="60" cy="88" r="1.4" fill="${trim}"/></g>`;
      // sargılı baş + gözlük + yüz örtüsü
      P.head = `<g>
        <path d="M52 42 Q50 28 60 26.5 Q70 28 68 42 Q67 49 63 52 L57 52 Q53 49 52 42 Z" fill="${cloak}" stroke="${dark}" stroke-width=".6"/>
        <path d="M51 40 Q60 36 69 40 L68 45 Q60 41 52 45 Z" fill="${body}"/>
        <ellipse cx="56" cy="41" rx="3.2" ry="2.6" fill="#0a0d14" stroke="${dark}" stroke-width=".6"/>
        <ellipse cx="64" cy="41" rx="3.2" ry="2.6" fill="#0a0d14" stroke="${dark}" stroke-width=".6"/>
        <circle cx="56" cy="41" r="1.4" fill="${visor}"><animate attributeName="opacity" values=".9;.5;.9" dur="2.6s" repeatCount="indefinite"/></circle>
        <circle cx="64" cy="41" r="1.4" fill="${visor}"><animate attributeName="opacity" values=".9;.5;.9" dur="2.6s" begin=".3s" repeatCount="indefinite"/></circle>
        <path d="M53 46 Q60 44 67 46 L66 52 Q60 54 54 52 Z" fill="${body}"/>
        <path d="M54 48.5 Q60 47 66 48.5" stroke="${dark}" stroke-width=".7" fill="none" opacity=".5"/>
        <path d="M68 30 L73 27 L72 31 Z" fill="${cloak}"/></g>`;
      break;
    }

    /* ========================= REGALIA (kraliyet / arcane) ========================= */
    case 'regalia': {
      P.cape = `<g opacity=".96">
        <path fill="${cloak}"><animate attributeName="d" dur="4.6s" repeatCount="indefinite"
          values="M66 54 Q94 98 88 156 L60 152 Q66 100 60 58 Z;M66 54 Q98 102 92 158 L60 152 Q66 100 60 58 Z;M66 54 Q94 98 88 156 L60 152 Q66 100 60 58 Z"/></path>
        <path d="M65 56 Q74 60 76 70" stroke="${trim}" stroke-width="1.4" fill="none" opacity=".7"/>
        <path fill="#000" opacity=".22"><animate attributeName="d" dur="4.6s" repeatCount="indefinite"
          values="M67 56 Q88 100 84 154 L74 150 Q74 100 63 60 Z;M67 56 Q92 104 88 156 L74 150 Q74 100 63 60 Z;M67 56 Q88 100 84 154 L74 150 Q74 100 63 60 Z"/></path></g>`;
      P.legs = robeSkirt(C, {sway:5, hem:true});
      // kanatlı ornate omuzlar
      P.pauldronL = `<g><path d="M40 58 Q49 50 57 57 L57 70 Q48 73 40 68 Z" fill="${body}" stroke="${dark}" stroke-width=".8"/>
        <path d="M40 58 Q35 52 37 46 Q42 50 45 56 Z" fill="${trim}" opacity=".85" stroke="${dark}" stroke-width=".5"/>
        <path d="M44 64 Q49.5 67 55 64" stroke="${trim}" stroke-width="1.2" fill="none" opacity=".7"/>
        <circle cx="49.5" cy="61" r="1.6" fill="${trim}">${pulse()}</circle></g>`;
      P.pauldronR = `<g><path d="M63 57 Q71 50 80 58 L80 68 Q72 73 63 70 Z" fill="${body}" stroke="${dark}" stroke-width=".8"/>
        <path d="M80 58 Q85 52 83 46 Q78 50 75 56 Z" fill="${trim}" opacity=".85" stroke="${dark}" stroke-width=".5"/>
        <path d="M65 64 Q70.5 67 76 64" stroke="${trim}" stroke-width="1.2" fill="none" opacity=".7"/></g>`;
      P.torso = `<g>
        <path d="M48 58 L72 58 L76 100 Q60 108 44 100 Z" fill="${body}"/>
        <path d="M48 58 L72 58 L73.4 66 L46.6 66 Z" fill="#fff" opacity=".1"/>
        <path d="M60 58 L60 100" stroke="${trim}" stroke-width="1.2" opacity=".5"/>
        <path d="M52 64 Q60 60 68 64 L66 72 Q60 68 54 72 Z" fill="${cloak}"/>
        <path d="M53 78 L67 78 L65 90 L55 90 Z" fill="${dark}"/>
        <path d="M50 70 Q47 86 46 99 M70 70 Q73 86 74 99" stroke="${trim}" stroke-width=".8" fill="none" opacity=".4"/>
        <path d="M60 80 L57 84 L60 88 L63 84 Z" fill="${trim}"/>
        <circle cx="60" cy="84" r="1.8" fill="#fff" opacity=".9"><animate attributeName="opacity" values=".9;.5;.9" dur="2s" repeatCount="indefinite"/></circle></g>`;
      P.cowl = `<path d="M51 52 Q60 49 69 52 L71 60 Q60 65 49 60 Z" fill="${cloak}"/>`;
      P.belt = `<g><path d="M45 95 Q60 101 75 95 L74 102 Q60 108 46 102 Z" fill="${dark}"/>
        <path d="M55 96 L65 96 L66 104 L54 104 Z" fill="${trim}" opacity=".9"/>
        <circle cx="60" cy="100" r="2.2" fill="#fff" opacity=".85"/></g>`;
      // taçlı/sorguçlu ornate kask
      P.head = `<g>
        <rect x="56" y="48" width="9" height="7" rx="2" fill="${dark}"/>
        <path d="M52 41 Q51 28 60 26 Q69 28 68 41 Q67.5 48 63 51 L57 51 Q52.5 48 52 41 Z" fill="${body}" stroke="${dark}" stroke-width=".7"/>
        <path d="M53 39 Q60 35 67 39 L66 44 L54 44 Z" fill="#0a0d14"/>
        <path d="M55 40.5 Q60 38.5 65 40.5" stroke="${visor}" stroke-width="1.3" fill="none" opacity=".85"><animate attributeName="opacity" values=".85;.45;.85" dur="2.4s" repeatCount="indefinite"/></path>
        <path d="M60 44 L60 50" stroke="${visor}" stroke-width="1" opacity=".6"/>
        <path d="M50 41 L47 38 L50 37 Z M70 41 L73 38 L70 37 Z" fill="${trim}"/>
        <path d="M55 26 L60 16 L65 26 Z" fill="${trim}" stroke="${dark}" stroke-width=".5"/>
        <path d="M60 16 L60 26" stroke="#fff" stroke-width=".8" opacity=".6"/>
        <circle cx="60" cy="22" r="1.6" fill="#fff" opacity=".9"><animate attributeName="opacity" values=".9;.5;.9" dur="2s" repeatCount="indefinite"/></circle></g>`;
      break;
    }

    /* ========================= ETCHED (rünlü muhafız / enerji) ========================= */
    case 'etched': {
      P.cape = `<g opacity=".7">
        <path fill="${trim}" opacity=".22"><animate attributeName="d" dur="3.8s" repeatCount="indefinite"
          values="M64 54 Q86 96 80 150 L46 150 Q40 96 56 54 Z;M64 54 Q90 100 84 154 L42 154 Q38 96 56 54 Z;M64 54 Q86 96 80 150 L46 150 Q40 96 56 54 Z"/></path>
        <path stroke="${trim}" stroke-width="1" fill="none" opacity=".6"><animate attributeName="d" dur="3.8s" repeatCount="indefinite"
          values="M60 56 Q80 100 76 148;M60 56 Q84 104 80 152;M60 56 Q80 100 76 148"/></path></g>`;
      P.legs = etchedLegs(C);
      P.pauldronL = `<g><path d="M42 58 Q49.5 53 56 58 L57 69 Q49.5 72 42 69 Z" fill="${dark}" stroke="${trim}" stroke-width=".7"/>
        <path d="M44 62 L54 62 M44 66 L54 66" stroke="${trim}" stroke-width="1" opacity=".8">${pulse()}</path></g>`;
      P.pauldronR = `<g><path d="M64 58 Q70.5 53 78 58 L78 69 Q70.5 72 63 69 Z" fill="${dark}" stroke="${trim}" stroke-width=".7"/>
        <path d="M66 62 L76 62 M66 66 L76 66" stroke="${trim}" stroke-width="1" opacity=".8">${pulse()}</path></g>`;
      P.torso = `<g>
        <path d="M48 58 L72 58 L75 99 Q60 106 45 99 Z" fill="${dark}"/>
        <path d="M50 60 L70 60 L72.6 95 Q60 101 47.4 95 Z" fill="${body}" opacity=".55"/>
        <path d="M60 60 L60 98" stroke="${trim}" stroke-width="1" opacity=".7"/>
        <path d="M52 66 L68 66 M50 74 L70 74 M52 82 L68 82" stroke="${trim}" stroke-width="1" opacity=".55"/>
        <path d="M55 70 L60 76 L65 70 M55 78 L60 84 L65 78" stroke="${trim}" stroke-width="1" fill="none" opacity=".7"/>
        <circle cx="60" cy="88" r="3" fill="none" stroke="${trim}" stroke-width="1.2"><animate attributeName="r" values="3;4.4;3" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.3;.9" dur="2.2s" repeatCount="indefinite"/></circle>
        <circle cx="60" cy="88" r="1.6" fill="${trim}"/></g>`;
      P.cowl = `<path d="M51 52 Q60 49 69 52 L70 59 Q60 64 50 59 Z" fill="${dark}" stroke="${trim}" stroke-width=".5"/>`;
      P.belt = `<g><rect x="46" y="96" width="28" height="6.5" rx="2" fill="#0c0f15" stroke="${trim}" stroke-width=".5"/><rect x="56" y="95" width="8" height="9" rx="1.4" fill="${dark}"/><circle cx="60" cy="99.5" r="2" fill="${trim}">${pulse()}</circle></g>`;
      // pürüzsüz rünlü kask, tek vizör bandı
      P.head = `<g>
        <rect x="56" y="48" width="9" height="7" rx="2" fill="${dark}"/>
        <path d="M52 41 Q51 27 60 25.5 Q69 27 68 41 Q67.5 49 63 52 L57 52 Q52.5 49 52 41 Z" fill="${dark}" stroke="${trim}" stroke-width=".7"/>
        <path d="M53 40 Q60 37 67 40 L66 44.5 Q60 42 54 44.5 Z" fill="#06080c"/>
        <path d="M54 42 Q60 40 66 42" stroke="${visor}" stroke-width="1.6" fill="none" opacity=".95" filter="drop-shadow(0 0 2.5px ${visor})"><animate attributeName="opacity" values=".95;.5;.95" dur="2s" repeatCount="indefinite"/></path>
        <path d="M57 31 L63 31 M55 35 L65 35" stroke="${trim}" stroke-width="1" opacity=".6"/>
        <path d="M60 25.5 L60 31" stroke="${trim}" stroke-width="1" opacity=".7"/></g>`;
      break;
    }

    } // switch

    return P;
  }

  // ---- ortak yardımcılar (style fonksiyonlarından sonra tanımlı; hoisting ile erişilir) ----
  function beltStd(C){ const {body,dark,trim}=C; return `<g>
    <rect x="46" y="96" width="28" height="8" rx="2" fill="${dark}"/>
    <rect x="46" y="98.4" width="28" height="2" fill="#000" opacity=".4"/>
    <rect x="56" y="95" width="8" height="10" rx="1.6" fill="${body}" stroke="${dark}" stroke-width=".6"/>
    <rect x="57.4" y="97" width="5.2" height="2.2" rx="1" fill="${trim}" opacity=".8"/>
    <rect x="47" y="96.4" width="6.4" height="7.2" rx="1.4" fill="${body}" stroke="${dark}" stroke-width=".6"/>
    <rect x="66.6" y="96.4" width="6.4" height="7.2" rx="1.4" fill="${body}" stroke="${dark}" stroke-width=".6"/>
  </g>`; }

  // subay paltosu: önden açık uzun ceket — bacaklar ortada görünür
  function coatLegs(C){ const {body,dark,cloak,trim}=C; return `<g>
    <path d="M52 98 L54 152 L66 152 L68 98 Z" fill="${dark}"/>
    <path d="M55 100 L56.5 150 L63.5 150 L65 100 Z" fill="#22262f"/>
    <path d="M54.5 150 L54 158.6 L60 158.6 L60 150 Z" fill="#0c0f15"/>
    <path d="M60 150 L60 158.6 L66 158.6 L65.5 150 Z" fill="#0c0f15"/>
    <path fill="${body}"><animate attributeName="d" dur="4.6s" repeatCount="indefinite"
      values="M47 96 Q42 128 44 158 L55 158 Q54 124 54 98 Z;M47 96 Q40 130 43 158 L55 158 Q54 124 54 98 Z;M47 96 Q42 128 44 158 L55 158 Q54 124 54 98 Z"/></path>
    <path fill="${body}"><animate attributeName="d" dur="4.6s" repeatCount="indefinite"
      values="M73 96 Q78 128 76 158 L65 158 Q66 124 66 98 Z;M73 96 Q80 130 77 158 L65 158 Q66 124 66 98 Z;M73 96 Q78 128 76 158 L65 158 Q66 124 66 98 Z"/></path>
    <path d="M47.5 100 Q44 128 45.5 154" stroke="${trim}" stroke-width="1" fill="none" opacity=".5"/>
    <path d="M72.5 100 Q76 128 74.5 154" stroke="#000" stroke-width="1" fill="none" opacity=".2"/>
  </g>`; }

  // rünlü hafif bacaklar (etched)
  function etchedLegs(C){ const {body,dark,trim}=C; return `<g>
    <path d="M48 96 L46.6 142 L56.6 142 L57 96 Z" fill="${dark}"/>
    <path d="M49.4 100 L48.4 138 L55.4 138 L55.8 100 Z" fill="${body}" opacity=".5"/>
    <path d="M50 106 L54 106 M49.6 116 L54.4 116 M49.4 126 L54.6 126" stroke="${trim}" stroke-width="1" opacity=".6"/>
    <path d="M45.6 140 L45 152 Q44.8 158.6 50 158.6 L57 158.6 L56.6 140 Z" fill="${dark}"/>
    <path d="M46.6 156.6 L58 156.6 L58 159.6 L46 159.6 Z" fill="#0c0f15"/>
    <path d="M47 147 L55.6 147" stroke="${trim}" stroke-width="1.2" opacity=".7"><animate attributeName="opacity" values=".7;.3;.7" dur="2.2s" repeatCount="indefinite"/></path>
    <path d="M63 96 L62.6 142 L72.6 142 L71.4 96 Z" fill="${dark}"/>
    <path d="M64.4 100 L64 138 L71 138 L70.6 100 Z" fill="${body}" opacity=".5"/>
    <path d="M65 106 L69 106 M64.8 116 L69.4 116 M64.6 126 L69.6 126" stroke="${trim}" stroke-width="1" opacity=".6"/>
    <path d="M62.4 140 L62 152 Q61.8 158.6 67 158.6 L74 158.6 L73 140 Z" fill="${dark}"/>
    <path d="M62.6 156.6 L74.4 156.6 L74.4 159.6 L62.4 159.6 Z" fill="#0c0f15"/>
    <path d="M63.6 147 L72.4 147" stroke="${trim}" stroke-width="1.2" opacity=".7"><animate attributeName="opacity" values=".7;.3;.7" dur="2.2s" begin=".4s" repeatCount="indefinite"/></path>
  </g>`; }

  /* ===================== GALERİ MİNİ İKONU (40×40) ===================== */
  function icon(style, C){
    const body=C.body, trim=C.trim, cloak=C.cloak, dark=C.dark||'#15181f';
    const G=(a,b)=>`<linearGradient id="${a}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${body}"/><stop offset="1" stop-color="${cloak}"/></linearGradient>`;
    const uid='asI'+Math.random().toString(36).slice(2,7);
    let g='';
    switch(style){
      case 'robe':
        g=`<path d="M9 17 Q20 13 31 17 L33 36 L7 36 Z" fill="${cloak}"/>
           <path d="M14 17 L26 17 L20 30 Z" fill="${body}"/>
           <path d="M14 17 L20 25 L26 17" stroke="${trim}" stroke-width="1.2" fill="none" opacity=".7"/>
           <path d="M8 8 Q6 2 14 2 L26 2 Q34 2 32 8 Q31 13 26 15 L14 15 Q9 13 8 8 Z" fill="${cloak}" stroke="${dark}" stroke-width="1"/>
           <path d="M13 7 Q20 4 27 7 L25 12 Q20 9 15 12 Z" fill="#07060c"/>
           ${eyes(20,8,trim,3.2,1.4,2.4)}`; break;
      case 'vest':
        g=`<path d="M9 12 L31 12 L31 36 L9 36 Z" fill="${dark}"/>
           <path d="M13 12 L27 12 L27 36 L13 36 Z" fill="${body}"/>
           <path d="M9 12 L15 12 L13 36 L9 36 Z" fill="${cloak}"/><path d="M31 12 L25 12 L27 36 L31 36 Z" fill="${cloak}"/>
           <path d="M9 16 L31 22" stroke="${trim}" stroke-width="2" opacity=".85"/>
           <rect x="16" y="24" width="8" height="6" rx="1.5" fill="${dark}"/><rect x="17.4" y="25.4" width="5" height="2" fill="${trim}" opacity=".8"/>
           <path d="M13 8 Q12 2 20 1.5 Q28 2 27 8 L26 12 L14 12 Z" fill="${body}" stroke="${dark}" stroke-width="1"/>
           <ellipse cx="16" cy="7.5" rx="2.4" ry="2" fill="#0a0d14"/><ellipse cx="24" cy="7.5" rx="2.4" ry="2" fill="#0a0d14"/>
           <circle cx="16" cy="7.5" r="1.1" fill="${trim}"/><circle cx="24" cy="7.5" r="1.1" fill="${trim}"/>`; break;
      case 'commander':
        g=`<path d="M8 13 L32 13 L33 36 L7 36 Z" fill="${body}"/>
           <path d="M8 13 L20 16 L20 36 L7 36 Z" fill="${cloak}" opacity=".5"/>
           <path d="M20 14 L20 36" stroke="${dark}" stroke-width="1" opacity=".6"/>
           <circle cx="15" cy="19" r="1.2" fill="${trim}"/><circle cx="15" cy="25" r="1.2" fill="${trim}"/><circle cx="25" cy="19" r="1.2" fill="${trim}"/><circle cx="25" cy="25" r="1.2" fill="${trim}"/>
           <rect x="9" y="14" width="9" height="2.4" rx="1" fill="${trim}" opacity=".9"/><rect x="22" y="14" width="9" height="2.4" rx="1" fill="${trim}" opacity=".9"/>
           <path d="M12 8 Q11 2 20 1.5 Q29 2 28 8 L29 12 L11 12 Z" fill="${body}" stroke="${dark}" stroke-width="1"/>
           <path d="M11 11 L29 11 L29.6 13 Q20 15 10.4 13 Z" fill="${dark}"/>
           <path d="M15 4 L25 4 L23 7 L17 7 Z" fill="${trim}" opacity=".9"/>`; break;
      case 'phantom':
        g=`<path d="M6 12 Q20 6 34 12 L32 37 L8 37 Z" fill="${cloak}" opacity=".9"/>
           <path d="M11 13 L29 13 L31 36 L9 36 Z" fill="${dark}"/>
           <path d="M13 14 L27 14 L29 34 L11 34 Z" fill="${body}" opacity=".9"/>
           <path d="M13 16 L20 22 L27 16 M12 24 L20 30 L28 24" stroke="${trim}" stroke-width="1.1" fill="none" opacity=".55"/>
           <path d="M7 6 Q5 0 20 -0.5 Q35 0 33 6 Q32 12 26 15 L14 15 Q8 12 7 6 Z" fill="${dark}" stroke="#000" stroke-width="1"/>
           <path d="M12 5 Q20 1 28 5 L25 12 Q20 9 15 12 Z" fill="#050308"/>
           ${eyes(20,6,trim,3.4,1.7,2.2)}`; break;
      case 'poncho':
        g=`<path d="M5 14 L35 14 L33 28 L20 32 L7 28 Z" fill="${cloak}"/>
           <path d="M5 14 L35 14 L34.4 17 L5.6 17 Z" fill="${trim}" opacity=".7"/>
           <path d="M9 26 L31 26 L29 36 L11 36 Z" fill="${body}"/>
           <path d="M20 14 L20 32" stroke="${dark}" stroke-width="1" opacity=".4"/>
           <rect x="16" y="20" width="8" height="6" rx="1.5" fill="${body}"/><rect x="17.4" y="21.4" width="5" height="2" fill="${trim}" opacity=".8"/>
           <path d="M13 8 Q12 2 20 1.5 Q28 2 27 8 L26 12 L14 12 Z" fill="${cloak}" stroke="${dark}" stroke-width="1"/>
           <path d="M12 6.5 Q20 3 28 6.5 L27 10 Q20 7 13 10 Z" fill="${body}"/>
           <ellipse cx="16" cy="7" rx="2.4" ry="2" fill="#0a0d14"/><ellipse cx="24" cy="7" rx="2.4" ry="2" fill="#0a0d14"/>
           <circle cx="16" cy="7" r="1.1" fill="${trim}"/><circle cx="24" cy="7" r="1.1" fill="${trim}"/>`; break;
      case 'regalia':
        g=`<path d="M8 13 L32 13 L34 37 L6 37 Z" fill="${body}"/>
           <path d="M8 13 L32 13 L31 17 L9 17 Z" fill="#fff" opacity=".12"/>
           <path d="M20 13 L20 37" stroke="${trim}" stroke-width="1.1" opacity=".55"/>
           <path d="M14 18 Q20 15 26 18 L24 24 Q20 21 16 24 Z" fill="${cloak}"/>
           <path d="M20 26 L17 30 L20 34 L23 30 Z" fill="${trim}"/><circle cx="20" cy="30" r="1.6" fill="#fff" opacity=".9"/>
           <path d="M8 13 Q4 9 6 4 Q10 8 12 13 Z M32 13 Q36 9 34 4 Q30 8 28 13 Z" fill="${trim}" opacity=".85"/>
           <path d="M13 9 Q12 3 20 2.5 Q28 3 27 9 L26 12 L14 12 Z" fill="${body}" stroke="${dark}" stroke-width="1"/>
           <path d="M15 4 L20 -2 L25 4 Z" fill="${trim}" stroke="${dark}" stroke-width=".6"/><circle cx="20" cy="1" r="1.4" fill="#fff"/>`; break;
      case 'etched':
        g=`<path d="M9 13 L31 13 L33 36 L7 36 Z" fill="${dark}"/>
           <path d="M11 15 L29 15 L31 34 L9 34 Z" fill="${body}" opacity=".5"/>
           <path d="M20 14 L20 35" stroke="${trim}" stroke-width="1" opacity=".7"/>
           <path d="M13 19 L27 19 M12 25 L28 25" stroke="${trim}" stroke-width="1" opacity=".6"/>
           <path d="M15 21 L20 26 L25 21" stroke="${trim}" stroke-width="1" fill="none" opacity=".7"/>
           <circle cx="20" cy="30" r="3" fill="none" stroke="${trim}" stroke-width="1.2"/><circle cx="20" cy="30" r="1.3" fill="${trim}"/>
           <path d="M13 8 Q12 2 20 1.5 Q28 2 27 8 L26 12 L14 12 Z" fill="${dark}" stroke="${trim}" stroke-width="1"/>
           <path d="M14 7 Q20 5 26 7" stroke="${trim}" stroke-width="1.6" fill="none" opacity=".95"/>`; break;
      default: // plate
        g=`<path d="M5 14 L11 8 L15 11 L11.5 19 Z" fill="${cloak}" stroke="${trim}" stroke-width=".9"/>
           <path d="M35 14 L29 8 L25 11 L28.5 19 Z" fill="${cloak}" stroke="${trim}" stroke-width=".9"/>
           <path d="M12.5 8 L20 4.6 L27.5 8 L28.5 20 Q28.5 31.5 20 35.6 Q11.5 31.5 11.5 20 Z" fill="url(#${uid})" stroke="${trim}" stroke-width="1.4"/>
           <path d="M20 4.6 L20 35.6" stroke="${trim}" stroke-width="1" opacity=".5"/>
           <path d="M14 12.5 L26 12.5" stroke="${trim}" stroke-width="1" opacity=".45"/>
           <path d="M13 22 L27 22 L26 25 L14 25 Z" fill="${trim}" opacity=".8"/>
           <path d="M12.5 8 L20 4.6 L20 35.6 Q15 33 13.4 27 Z" fill="#000" opacity=".12"/>
           <circle cx="20" cy="16.5" r="2.3" fill="${trim}"/>`;
    }
    return `<svg viewBox="0 0 40 40"><defs>${G(uid)}</defs>${g}</svg>`;
  }

  /* ===================== ANA KAHRAMAN PARÇALARI (gradient-uyumlu) =====================
     Asıl heroSVG (override) ile aynı malzeme id'lerini kullanır:
       MAT.steel = url(#nbh_steel)  · MAT.cloth = url(#nbh_cloth) (zırh rengi kumaş)
       MAT.core  = url(#nbh_core)   · MAT.visorG = url(#nbh_visor) · MAT.glow = url(#nbh_glow)
     Dönen parçalar verilmezse (null) kahraman varsayılanı (plate/Mando) kullanır. */
  function _heroPartsRaw(style, M){
    const steel=M.steel, cloth=M.cloth, core=M.core, visorG=M.visorG, glow=M.glow;
    const trim=M.trim, trimHi=M.trimHi, saber=M.saber, saberG=M.saberG;
    const Md=M.Md, Mm=M.Mm, Mh=M.Mh, Ml=M.Ml, Mc=M.M, suit=M.suit, glove=M.glove;
    const cloakLo=M.cloakLo, cloakHi=M.cloakHi, cloakSh=M.cloakSh;

    // — paylaşılan: akan robe eteği (kumaş) —
    function skirt(sway, dark){ const f = dark? cloakSh : cloth, sw=sway||4.4;
      return '<g>'
        +'<path fill="'+f+'"><animate attributeName="d" dur="'+sw+'s" repeatCount="indefinite" values="M46 97 Q39 128 41 156 L79 156 Q81 128 74 97 Z;M46 97 Q37 130 40 156 L80 156 Q82 130 74 97 Z;M46 97 Q39 128 41 156 L79 156 Q81 128 74 97 Z"/></path>'
        +'<path d="M60 98 L60 155" stroke="'+cloakSh+'" stroke-width="1.1" opacity=".5"/>'
        +'<path d="M52 99 Q50 128 51 154 M68 99 Q70 128 69 154" stroke="'+cloakSh+'" stroke-width="1" fill="none" opacity=".4"/>'
        +'<path d="M48 100 Q47 126 48 150" stroke="'+cloakHi+'" stroke-width=".7" fill="none" opacity=".35"/>'
        +'<path d="M42 150 Q60 158 78 150 L78 156 L42 156 Z" fill="#000" opacity=".22"/>'
        +'<path d="M53 154 L51.5 157.5 L57 157.5 L57 154 Z" fill="'+Md+'"/><path d="M63 154 L63 157.5 L68.5 157.5 L67 154 Z" fill="'+Md+'"/>'
        +'</g>'; }
    // — paylaşılan: ince pantolon + bot (kaçakçı/çöl) —
    function pants(){ return '<g>'
      +'<path d="M49 99 L47 140 L57 140 L58 100 Z" fill="'+suit+'"/>'
      +'<path d="M62 100 L63 140 L73 140 L71 99 Z" fill="'+suit+'"/>'
      +'<path d="M49 99 L48.6 132 L51.4 132 L52 99 Z" fill="'+Ml+'" opacity=".25"/>'
      +'<path d="M68 100 L69 138 L71.4 138 L70 100 Z" fill="#000" opacity=".18"/>'
      +'<path d="M45.6 138 L45 151 Q45 157 50 157 L58 157 L57 138 Z" fill="'+Md+'"/>'
      +'<path d="M63 138 L64 157 L72 157 Q77 157 77 151 L76.4 138 Z" fill="'+Md+'"/>'
      +'<path d="M45 154 L58 154 L58 157.5 L44.8 157.5 Z" fill="#0c0e13"/><path d="M64 154 L77.2 154 L77.2 157.5 L64 157.5 Z" fill="#0c0e13"/>'
      +'<rect x="49" y="142" width="9" height="2.4" rx="1" fill="'+trim+'" opacity=".5"/><rect x="64" y="142" width="9" height="2.4" rx="1" fill="'+trim+'" opacity=".5"/>'
      +'</g>'; }

    switch(style){

    /* ---------------- ROBE: keşiş / Jedi cübbesi ---------------- */
    case 'robe': return {
      neck:'',
      pauldron:'<path d="M58 56 Q67 51 76 57 Q79 64 75 73 L60 73 Q56 63 58 56 Z" fill="'+cloth+'" stroke="'+cloakSh+'" stroke-width=".7"/>'
        +'<path d="M60 60 Q67 56 74 60" stroke="'+cloakHi+'" stroke-width=".9" fill="none" opacity=".4"/>',
      torso:'<path d="M48 58 L73 57 L78 101 Q60 109 43 101 Z" fill="'+cloth+'"/>'
        +'<path d="M52 58 L69 57 L60 90 Z" fill="'+cloakLo+'"/>'
        +'<path d="M52 58 L60 76 L69 57" stroke="'+trim+'" stroke-width="1.4" fill="none" opacity=".7"/>'
        +'<path d="M44 80 Q60 88 77 80 L75 88 Q60 96 46 88 Z" fill="'+cloakSh+'" opacity=".7"/>'
        +'<path d="M49 60 Q46 82 45 100 M72 59 Q75 82 76 100" stroke="'+cloakSh+'" stroke-width="1" fill="none" opacity=".4"/>'
        +'<circle cx="60" cy="70" r="2.4" fill="'+trim+'" filter="'+glow+'"><animate attributeName="opacity" values=".9;.4;.9" dur="2.4s" repeatCount="indefinite"/></circle>',
      belt:'<path d="M44 98 Q60 104 77 98 L75 105 Q60 112 46 105 Z" fill="'+Md+'"/>'
        +'<path d="M55 99 L66 99 L65 107 L56 107 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".6"/>'
        +'<circle cx="60.5" cy="103" r="2.1" fill="'+trim+'"><animate attributeName="opacity" values=".9;.45;.9" dur="2.4s" repeatCount="indefinite"/></circle>'
        +'<path stroke="'+cloakLo+'" stroke-width="2.6" fill="none" stroke-linecap="round"><animate attributeName="d" dur="3.4s" repeatCount="indefinite" values="M52 105 L51 124;M52 105 L49 125;M52 105 L51 124"/></path>',
      legs:skirt(4.8,false),
      head:'<path d="M46 46 Q43 23 60.5 20.5 Q78 23 75 46 Q74 53 66 57 L55 57 Q47 53 46 46 Z" fill="'+cloth+'" stroke="'+cloakSh+'" stroke-width=".9"/>'
        +'<path d="M49 33 Q53 25 60.5 24 Q60.5 24 60.5 24 Q55 30 53 47 Z" fill="'+cloakHi+'" opacity=".35"/>'
        +'<path d="M52 42 Q60.5 36 69 42 L66 53 Q60.5 57 55 53 Z" fill="#05060c"/>'
        +eyes(60.5,45,trim,5,1.7,2.6)
        +'<path d="M55 50 Q60.5 52.5 66 50" stroke="'+trim+'" stroke-width=".8" fill="none" opacity=".5"/>'
        +'<path d="M70 23 Q75 30 74 45" stroke="'+cloakSh+'" stroke-width="1" fill="none" opacity=".4"/>'
    };

    /* ---------------- VEST: kaçakçı / pilot ---------------- */
    case 'vest': return {
      cape:'',
      pauldron:'<path d="M59 57 Q67 53 75 58 L75 70 Q67 73 60 70 Z" fill="'+cloakLo+'" stroke="'+Md+'" stroke-width=".6"/>'
        +'<path d="M61 67 L74 67" stroke="'+trim+'" stroke-width=".9" opacity=".5"/>',
      torso:'<path d="M48 59 L73 57 L76 100 Q60 107 45 100 Z" fill="'+Mc+'"/>'
        +'<path d="M53 58 L68 57 L67 98 L54 98 Z" fill="'+Ml+'" opacity=".55"/>'
        +'<path d="M48 59 L57 58 L55 100 L46 99 Z" fill="'+cloth+'"/>'
        +'<path d="M73 57 L64 57 L66 100 L75 99 Z" fill="'+cloth+'"/>'
        +'<path d="M48 59 L57 58 L55.6 90 L48.4 92 Z" fill="'+cloakHi+'" opacity=".3"/>'
        +'<path d="M47 64 L74 73" stroke="'+Md+'" stroke-width="3" opacity=".9"/><path d="M47 64 L74 73" stroke="'+trim+'" stroke-width="1" opacity=".6"/>'
        +'<circle cx="52" cy="66" r="1.3" fill="'+Mh+'"/><circle cx="60" cy="69" r="1.3" fill="'+Mh+'"/><circle cx="68" cy="71.5" r="1.3" fill="'+Mh+'"/>'
        +'<rect x="55" y="80" width="11" height="8" rx="1.6" fill="'+Md+'" stroke="'+Mm+'" stroke-width=".5"/><rect x="56.6" y="81.6" width="7.8" height="2.2" rx="1" fill="'+trim+'" opacity=".8"/>',
      belt:'<rect x="45" y="98" width="31" height="7.5" rx="2" fill="'+Md+'"/><rect x="56" y="96.5" width="9" height="11" rx="1.6" fill="'+trim+'" opacity=".85"/>'
        +'<rect x="46.5" y="105" width="8" height="11" rx="1.6" fill="'+Mm+'" stroke="'+Md+'" stroke-width=".6"/><rect x="48" y="107" width="5" height="6" rx="1" fill="'+Md+'"/>'
        +'<rect x="67" y="105" width="7" height="9" rx="1.6" fill="'+Mm+'" stroke="'+Md+'" stroke-width=".6"/>',
      legs:pants(),
      head:'<path d="M50 44 Q48 27 60.5 25 Q73 27 71 44 Q70 51 64 55 L57 55 Q51 51 50 44 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".8"/>'
        +'<path d="M50 34 Q60.5 30 71 34 L70 41 Q60.5 37 51 41 Z" fill="'+Md+'"/>'
        +'<path d="M52 31 Q60.5 27 69 31" stroke="'+trim+'" stroke-width="1.1" fill="none" opacity=".55"/>'
        +'<ellipse cx="55.5" cy="44" rx="3.6" ry="3" fill="#0a0d14" stroke="'+Md+'" stroke-width=".6"/><ellipse cx="65.5" cy="44" rx="3.6" ry="3" fill="#0a0d14" stroke="'+Md+'" stroke-width=".6"/>'
        +'<ellipse cx="55.5" cy="44" rx="2" ry="1.5" fill="'+saber+'" filter="'+glow+'"><animate attributeName="opacity" values=".9;.45;.9" dur="2.6s" repeatCount="indefinite"/></ellipse>'
        +'<ellipse cx="65.5" cy="44" rx="2" ry="1.5" fill="'+saber+'" filter="'+glow+'"><animate attributeName="opacity" values=".9;.45;.9" dur="2.6s" begin=".3s" repeatCount="indefinite"/></ellipse>'
        +'<path d="M56 49.5 Q60.5 51.5 65 49.5 L64 53 Q60.5 54.6 57 53 Z" fill="#0a0d14"/><path d="M55 52 L66 52" stroke="'+Mh+'" stroke-width=".6" opacity=".4"/>'
    };

    /* ---------------- COMMANDER: subay üniforması ---------------- */
    case 'commander': return {
      cape:'',
      pauldron:'<path d="M58 56 Q67 51 76 57 L77 69 Q67 73 60 70 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".8"/>'
        +'<rect x="60" y="66" width="16" height="3.2" rx="1.2" fill="'+trim+'" opacity=".9"/>'
        +'<path d="M62 68 l1.6 4 M66 68 l1.6 4 M70 68 l1.6 4 M74 68 l1.4 4" stroke="'+trim+'" stroke-width="1" opacity=".8"/>',
      torso:'<path d="M47 59 L73 57 L77 101 Q60 109 44 101 Z" fill="'+cloth+'"/>'
        +'<path d="M47 59 L60 63 L60 104 L45 101 Z" fill="'+cloakLo+'" opacity=".6"/>'
        +'<path d="M73 57 L60 63 L60 104 L76 101 Z" fill="#000" opacity=".14"/>'
        +'<path d="M60 60 L60 102" stroke="'+cloakSh+'" stroke-width="1.2" opacity=".6"/>'
        +'<circle cx="54" cy="69" r="1.3" fill="'+trim+'"/><circle cx="54" cy="78" r="1.3" fill="'+trim+'"/><circle cx="54" cy="87" r="1.3" fill="'+trim+'"/>'
        +'<circle cx="67" cy="69" r="1.3" fill="'+trim+'"/><circle cx="67" cy="78" r="1.3" fill="'+trim+'"/><circle cx="67" cy="87" r="1.3" fill="'+trim+'"/>'
        +'<rect x="51" y="65" width="7" height="10" rx="1" fill="'+trim+'" opacity=".85"/><path d="M51 67 h5 M51 69.5 h5 M51 72 h5" stroke="'+cloakSh+'" stroke-width=".5"/>'
        +'<circle cx="60" cy="73" r="2" fill="'+steel+'" stroke="'+trim+'" stroke-width=".7"/>',
      belt:'<rect x="44" y="98" width="33" height="8" rx="2" fill="'+Md+'"/><rect x="55" y="96.5" width="11" height="11" rx="1.6" fill="'+trim+'" opacity=".9"/>'
        +'<path d="M58 99 l2.5 4.5 l2.5 -4.5" stroke="'+Md+'" stroke-width=".8" fill="none"/>'
        +'<rect x="46" y="104" width="7" height="9" rx="1.6" fill="'+Mm+'" stroke="'+Md+'" stroke-width=".6"/>',
      legs:'<path d="M49 99 L47 140 L57 140 L58 100 Z" fill="'+suit+'"/><path d="M62 100 L63 140 L73 140 L71 99 Z" fill="'+suit+'"/>'
        +'<path d="M45.6 138 L45 151 Q45 157 50 157 L58 157 L57 138 Z" fill="'+Md+'"/><path d="M63 138 L64 157 L72 157 Q77 157 77 151 L76.4 138 Z" fill="'+Md+'"/>'
        +'<path d="M45 154 L58 154 L58 157.5 L44.8 157.5 Z" fill="#0c0e13"/><path d="M64 154 L77.2 154 L77.2 157.5 L64 157.5 Z" fill="#0c0e13"/>'
        +'<g>'
          +'<path fill="'+cloth+'"><animate attributeName="d" dur="4.4s" repeatCount="indefinite" values="M47 100 Q42 130 44 156 L55 156 Q54 126 54 102 Z;M47 100 Q40 132 43 156 L55 156 Q54 126 54 102 Z;M47 100 Q42 130 44 156 L55 156 Q54 126 54 102 Z"/></path>'
          +'<path fill="'+cloth+'"><animate attributeName="d" dur="4.4s" repeatCount="indefinite" values="M73 100 Q78 130 76 156 L65 156 Q66 126 66 102 Z;M73 100 Q80 132 77 156 L65 156 Q66 126 66 102 Z;M73 100 Q78 130 76 156 L65 156 Q66 126 66 102 Z"/></path>'
          +'<path d="M47.5 102 Q44 130 45.5 152" stroke="'+trim+'" stroke-width=".9" fill="none" opacity=".5"/>'
        +'</g>',
      head:'<path d="M50 43 Q49 31 60.5 29.5 Q72 31 71 43 Q70.5 50 64 54 L57 54 Q51 50 50 43 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".8"/>'
        +'<path d="M49 42.5 Q60.5 38.5 72 42.5 L72 46 Q60.5 42 49 46 Z" fill="'+Md+'"/>'
        +'<path d="M54 45.6 Q60.5 43.4 67 45.6 L66 49 Q60.5 47 55 49 Z" fill="#0a0d14"/>'
        +'<path d="M55 46.8 Q60.5 45 66 46.8" stroke="'+saber+'" stroke-width="1.2" fill="none" opacity=".82" filter="'+glow+'"><animate attributeName="opacity" values=".82;.42;.82" dur="2.4s" repeatCount="indefinite"/></path>'
        +'<path d="M47 49 L74 49 L74.5 52.5 Q60.5 56 47 52.5 Z" fill="'+Md+'"/>'
        +'<path d="M51 29.5 Q60.5 26.5 70 29.5" stroke="'+trim+'" stroke-width="1.4" fill="none" opacity=".8"/>'
        +'<path d="M56 29 L65 29 L63 32.5 L58 32.5 Z" fill="'+trim+'" opacity=".9"/><circle cx="60.5" cy="30.5" r="1.4" fill="#fff" opacity=".9"/>'
    };

    /* ---------------- PHANTOM: sith / karanlık lord ---------------- */
    case 'phantom': return {
      cape:'<path fill="'+cloakSh+'" opacity=".95"><animate attributeName="d" dur="4s" repeatCount="indefinite" values="M64 54 Q90 98 84 156 L30 156 Q26 100 54 54 Z;M64 54 Q94 102 88 158 L26 158 Q24 100 54 54 Z;M64 54 Q90 98 84 156 L30 156 Q26 100 54 54 Z"/></path>'
        +'<path fill="#000" opacity=".4"><animate attributeName="d" dur="4s" repeatCount="indefinite" values="M62 56 Q84 102 80 154 L52 154 Q56 100 56 58 Z;M62 56 Q88 106 84 158 L52 158 Q56 100 56 58 Z;M62 56 Q84 102 80 154 L52 154 Q56 100 56 58 Z"/></path>'
        +'<path d="M64 54 Q90 98 84 156" stroke="'+trim+'" stroke-width=".9" fill="none" opacity=".4"/>',
      neck:'',
      pauldron:'<path d="M58 56 L77 54 L77 69 Q68 73 60 70 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".8"/>'
        +'<path d="M77 54 L70 47 L66 54 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".7"/>'
        +'<path d="M61 64 L75 62" stroke="'+trim+'" stroke-width="1" opacity=".6"/>',
      torso:'<path d="M47 58 L73 57 L77 101 Q60 109 44 101 Z" fill="'+suit+'"/>'
        +'<path d="M51 59 L69 58 L73 96 Q60 103 47 96 Z" fill="'+cloakLo+'" opacity=".9"/>'
        +'<path d="M60 57 L60 99" stroke="#000" stroke-width="1.4" opacity=".5"/>'
        +'<path d="M51 62 L60 72 L69 62 M49 78 L60 86 L71 78" stroke="'+trim+'" stroke-width="1.2" fill="none" opacity=".6"/>'
        +'<path d="M55 88 L66 88 L64 96 L57 96 Z" fill="#07060c"/>'
        +'<circle cx="60.5" cy="92" r="2.4" fill="'+trim+'" filter="'+glow+'"><animate attributeName="r" values="2.4;1.5;2.4" dur="1.8s" repeatCount="indefinite"/></circle>',
      belt:'<path d="M44 98 Q60 104 77 98 L75 105 Q60 112 46 105 Z" fill="#07060c"/><rect x="56" y="97" width="9" height="10" rx="1.6" fill="'+steel+'"/><circle cx="60.5" cy="102" r="1.8" fill="'+trim+'">'+'<animate attributeName="opacity" values=".9;.4;.9" dur="2s" repeatCount="indefinite"/></circle>',
      legs:skirt(4,true),
      head:'<path d="M45 47 Q42 22 60.5 18.5 Q79 22 76 47 Q75 54 67 58 L54 58 Q46 54 45 47 Z" fill="'+cloakSh+'" stroke="#000" stroke-width=".8"/>'
        +'<path d="M60.5 18.5 L62.5 11 L60.5 13.5 L58.5 11 Z" fill="'+steel+'"/>'
        +'<path d="M52 45 Q60.5 39 69 45 L66 55 Q60.5 58 55 55 Z" fill="#040308"/>'
        +eyes(60.5,47,trim,5.4,1.9,2.2)
        +'<path d="M55 51 Q60.5 53 66 51" stroke="'+trim+'" stroke-width=".8" fill="none" opacity=".55"/>'
        +'<path d="M48 38 Q46 28 50 22 M73 38 Q75 28 71 22" stroke="#000" stroke-width="1" fill="none" opacity=".4"/>'
    };

    /* ---------------- PONCHO: çöl akıncısı ---------------- */
    case 'poncho': return {
      cape:'',
      pauldron:'<path d="M58 57 Q67 52 77 57 L78 72 L60 72 Z" fill="'+cloth+'" stroke="'+cloakSh+'" stroke-width=".7"/>'
        +'<path d="M60 60 Q67 57 75 60" stroke="'+cloakHi+'" stroke-width=".8" fill="none" opacity=".4"/>',
      torso:'<path d="M43 60 L77 58 L78 93 L42 93 Z" fill="'+cloth+'"/>'
        +'<path d="M43 60 L77 58 L77 65 L43 65 Z" fill="'+cloakHi+'" opacity=".3"/>'
        +'<path d="M42 87 L78 87 L72 101 L60 105 L48 101 Z" fill="'+cloakLo+'"/>'
        +'<path d="M42 87 L78 87 L77.4 90 L42.4 90 Z" fill="'+trim+'" opacity=".7"/>'
        +'<path d="M48 93 L72 93 L70 99 L50 99 Z" fill="'+trim+'" opacity=".3"/>'
        +'<path d="M60 60 L60 105" stroke="'+cloakSh+'" stroke-width="1" opacity=".45"/>'
        +'<path d="M49 70 L71 70 M48 78 L72 78" stroke="'+cloakSh+'" stroke-width=".9" opacity=".35"/>'
        +'<rect x="55" y="71" width="10" height="8" rx="1.6" fill="'+Md+'"/><rect x="56.4" y="72.6" width="7" height="2.2" rx="1" fill="'+trim+'" opacity=".8"/>',
      belt:'<rect x="47" y="99" width="27" height="6.5" rx="2" fill="'+Md+'"/><path d="M50 71 L70 101" stroke="'+cloakSh+'" stroke-width="3" opacity=".7"/>'
        +'<circle cx="54" cy="83" r="1.4" fill="'+trim+'"/><circle cx="60" cy="89" r="1.4" fill="'+trim+'"/><circle cx="66" cy="95" r="1.4" fill="'+trim+'"/>',
      legs:pants(),
      head:'<path d="M50 44 Q48 28 60.5 26 Q73 28 71 44 Q70 51 64 55 L57 55 Q51 51 50 44 Z" fill="'+cloth+'" stroke="'+cloakSh+'" stroke-width=".6"/>'
        +'<path d="M49 41 Q60.5 36 72 41 L70 47 Q60.5 42 51 47 Z" fill="'+cloakLo+'"/>'
        +'<ellipse cx="55.5" cy="42.5" rx="3.4" ry="2.8" fill="#0a0d14" stroke="'+Md+'" stroke-width=".6"/><ellipse cx="65.5" cy="42.5" rx="3.4" ry="2.8" fill="#0a0d14" stroke="'+Md+'" stroke-width=".6"/>'
        +'<circle cx="55.5" cy="42.5" r="1.5" fill="'+saber+'" filter="'+glow+'"><animate attributeName="opacity" values=".9;.5;.9" dur="2.6s" repeatCount="indefinite"/></circle>'
        +'<circle cx="65.5" cy="42.5" r="1.5" fill="'+saber+'" filter="'+glow+'"><animate attributeName="opacity" values=".9;.5;.9" dur="2.6s" begin=".3s" repeatCount="indefinite"/></circle>'
        +'<path d="M52 48 Q60.5 46 69 48 L68 55 Q60.5 57 53 55 Z" fill="'+cloakLo+'"/><path d="M53 50.5 Q60.5 49 68 50.5" stroke="'+cloakSh+'" stroke-width=".7" fill="none" opacity=".5"/>'
        +'<path d="M71 30 L77 26 L75 31 Z" fill="'+cloth+'"/>'
    };

    /* ---------------- REGALIA: kraliyet / arcane ---------------- */
    case 'regalia': return {
      cape:'<path fill="'+cloth+'" opacity=".96"><animate attributeName="d" dur="4.6s" repeatCount="indefinite" values="M66 54 Q92 98 86 155 L60 152 Q64 100 60 58 Z;M66 54 Q96 102 90 157 L60 152 Q64 100 60 58 Z;M66 54 Q92 98 86 155 L60 152 Q64 100 60 58 Z"/></path>'
        +'<path d="M66 54 Q92 98 86 155" stroke="'+trim+'" stroke-width="1.2" fill="none" opacity=".7"/>'
        +'<path fill="#000" opacity=".22"><animate attributeName="d" dur="4.6s" repeatCount="indefinite" values="M67 56 Q86 100 82 153 L73 150 Q72 100 62 60 Z;M67 56 Q90 104 86 155 L73 150 Q72 100 62 60 Z;M67 56 Q86 100 82 153 L73 150 Q72 100 62 60 Z"/></path>',
      pauldron:'<path d="M58 57 Q67 51 76 58 L76 69 Q67 73 60 70 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".8"/>'
        +'<path d="M76 58 Q82 52 80 45 Q75 49 72 56 Z" fill="'+trim+'" opacity=".9" stroke="'+Md+'" stroke-width=".5"/>'
        +'<path d="M61 65 Q67 68 73 65" stroke="'+trim+'" stroke-width="1.1" fill="none" opacity=".7"/><circle cx="67" cy="62" r="1.5" fill="'+trim+'" filter="'+glow+'"/>',
      torso:'<path d="M47 59 L73 57 L77 101 Q60 109 44 101 Z" fill="'+steel+'"/>'
        +'<path d="M48 60 L72 58.5" stroke="#eef3fa" stroke-width="1" opacity=".5"/>'
        +'<path d="M52 62 Q60 58 68 62 L66 71 Q60 67 54 71 Z" fill="'+cloth+'"/>'
        +'<path d="M60 58 L60 101" stroke="'+trim+'" stroke-width="1.1" opacity=".5"/>'
        +'<path d="M50 72 Q47 88 46 100 M70 72 Q73 88 74 100" stroke="'+trim+'" stroke-width=".8" fill="none" opacity=".4"/>'
        +'<path d="M60 80 L56 85 L60 90 L64 85 Z" fill="'+trim+'"/><circle cx="60" cy="85" r="2.1" fill="#fff" filter="'+glow+'"><animate attributeName="opacity" values=".9;.5;.9" dur="2s" repeatCount="indefinite"/></circle>'
        +'<path d="M52 94 L68 94 L66 100 L54 100 Z" fill="'+cloakLo+'"/>',
      belt:'<path d="M44 98 Q60 104 77 98 L75 106 Q60 112 46 106 Z" fill="'+Md+'"/>'
        +'<path d="M55 98 L66 98 L67 107 L54 107 Z" fill="'+trim+'" opacity=".9"/><circle cx="60.5" cy="102.5" r="2.2" fill="#fff" opacity=".85" filter="'+glow+'"/>',
      legs:skirt(5,false),
      head:'<path d="M50 43 Q49 30 60.5 28 Q72 30 71 43 Q70.5 50 64 54 L57 54 Q51 50 50 43 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".8"/>'
        +'<path d="M50 41 Q60.5 37 71 41 L70 46 L51 46 Z" fill="#0a0d14"/>'
        +'<path d="M52 42.5 Q60.5 40 69 42.5" stroke="'+saber+'" stroke-width="1.3" fill="none" opacity=".85" filter="'+glow+'"><animate attributeName="opacity" values=".85;.45;.85" dur="2.4s" repeatCount="indefinite"/></path>'
        +'<path d="M60.5 46 L60.5 53" stroke="'+saber+'" stroke-width="1" opacity=".6"/>'
        +'<path d="M49 43 L45.5 39.5 L49 38.5 Z M72 43 L75.5 39.5 L72 38.5 Z" fill="'+trim+'"/>'
        +'<path d="M54 28 L60.5 17 L67 28 Z" fill="'+trim+'" stroke="'+Md+'" stroke-width=".5"/><path d="M60.5 17 L60.5 28" stroke="#fff" stroke-width=".8" opacity=".6"/>'
        +'<circle cx="60.5" cy="23" r="1.7" fill="#fff" filter="'+glow+'"><animate attributeName="opacity" values=".9;.5;.9" dur="2s" repeatCount="indefinite"/></circle>'
    };

    /* ---------------- ETCHED: rünlü enerji muhafızı ---------------- */
    case 'etched': return {
      cape:'<path fill="'+trim+'" opacity=".18"><animate attributeName="d" dur="3.8s" repeatCount="indefinite" values="M64 54 Q86 98 80 150 L40 150 Q34 100 56 54 Z;M64 54 Q90 102 84 154 L36 154 Q32 100 56 54 Z;M64 54 Q86 98 80 150 L40 150 Q34 100 56 54 Z"/></path>'
        +'<path stroke="'+trim+'" stroke-width="1" fill="none" opacity=".55"><animate attributeName="d" dur="3.8s" repeatCount="indefinite" values="M58 56 Q40 100 38 148;M58 56 Q36 104 34 152;M58 56 Q40 100 38 148"/></path>'
        +'<path stroke="'+trim+'" stroke-width="1" fill="none" opacity=".55"><animate attributeName="d" dur="3.6s" repeatCount="indefinite" values="M63 56 Q84 100 82 148;M63 56 Q88 104 86 152;M63 56 Q84 100 82 148"/></path>',
      pauldron:'<path d="M58 57 Q67 52 76 58 L76 70 Q67 73 60 70 Z" fill="'+suit+'" stroke="'+trim+'" stroke-width=".7"/>'
        +'<path d="M61 62 L74 62 M61 66 L74 66" stroke="'+trim+'" stroke-width="1" opacity=".75"><animate attributeName="opacity" values=".75;.35;.75" dur="2.2s" repeatCount="indefinite"/></path>',
      torso:'<path d="M47 59 L73 57 L77 101 Q60 108 44 101 Z" fill="'+suit+'"/>'
        +'<path d="M50 60 L70 58.5 L73.5 97 Q60 104 46.5 97 Z" fill="'+Mc+'" opacity=".45"/>'
        +'<path d="M60 59 L60 100" stroke="'+trim+'" stroke-width="1" opacity=".7"/>'
        +'<path d="M51 66 L69 66 M49 74 L71 74 M51 82 L69 82" stroke="'+trim+'" stroke-width="1" opacity=".5"/>'
        +'<path d="M54 69 L60 75 L66 69 M54 77 L60 83 L66 77" stroke="'+trim+'" stroke-width="1" fill="none" opacity=".7"/>'
        +'<circle cx="60.5" cy="90" r="3.4" fill="none" stroke="'+trim+'" stroke-width="1.3"><animate attributeName="r" values="3.4;5;3.4" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.3;.9" dur="2.2s" repeatCount="indefinite"/></circle>'
        +'<circle cx="60.5" cy="90" r="1.7" fill="'+trim+'" filter="'+glow+'"/>',
      belt:'<rect x="45" y="98" width="31" height="7" rx="2" fill="#0b0e14" stroke="'+trim+'" stroke-width=".5"/><rect x="56" y="96.5" width="9" height="10" rx="1.5" fill="'+suit+'"/><circle cx="60.5" cy="101.5" r="2" fill="'+trim+'" filter="'+glow+'"><animate attributeName="opacity" values=".9;.4;.9" dur="2s" repeatCount="indefinite"/></circle>',
      legs:'<path d="M49 99 L47 140 L57.5 140 L58 100 Z" fill="'+suit+'"/><path d="M62 100 L62.5 140 L73 140 L71 99 Z" fill="'+suit+'"/>'
        +'<path d="M50 106 L56 106 M49.6 116 L56.4 116 M49.4 126 L56.6 126" stroke="'+trim+'" stroke-width="1" opacity=".55"/>'
        +'<path d="M64 106 L70 106 M63.8 116 L70.4 116 M63.6 126 L70.6 126" stroke="'+trim+'" stroke-width="1" opacity=".55"/>'
        +'<path d="M45.6 138 L45 151 Q45 157 50 157 L58 157 L57 138 Z" fill="'+Md+'"/><path d="M63 138 L64 157 L72 157 Q77 157 77 151 L76.4 138 Z" fill="'+Md+'"/>'
        +'<path d="M45 154 L58 154 L58 157.5 L44.8 157.5 Z" fill="#0c0e13"/><path d="M64 154 L77.2 154 L77.2 157.5 L64 157.5 Z" fill="#0c0e13"/>'
        +'<path d="M47 144 L56 144" stroke="'+trim+'" stroke-width="1.1" opacity=".7"><animate attributeName="opacity" values=".7;.3;.7" dur="2.2s" repeatCount="indefinite"/></path><path d="M64 144 L73 144" stroke="'+trim+'" stroke-width="1.1" opacity=".7"><animate attributeName="opacity" values=".7;.3;.7" dur="2.2s" begin=".4s" repeatCount="indefinite"/></path>',
      head:'<path d="M49 44 Q48 28 60.5 26 Q73 28 72 44 Q71 51 65 55 L56 55 Q50 51 49 44 Z" fill="'+suit+'" stroke="'+trim+'" stroke-width=".7"/>'
        +'<path d="M50 42 Q60.5 38.5 71 42 L70 47 Q60.5 43.5 51 47 Z" fill="#05060c"/>'
        +'<path d="M51 44 Q60.5 41.5 70 44" stroke="'+saber+'" stroke-width="1.8" fill="none" opacity=".95" filter="'+glow+'"><animate attributeName="opacity" values=".95;.5;.95" dur="2s" repeatCount="indefinite"/></path>'
        +'<path d="M56 32 L65 32 M54 36 L67 36" stroke="'+trim+'" stroke-width="1" opacity=".6"/>'
        +'<path d="M60.5 26 L60.5 32" stroke="'+trim+'" stroke-width="1" opacity=".7"/>'
        +'<path d="M55 50 Q60.5 52 66 50" stroke="'+trim+'" stroke-width=".7" fill="none" opacity=".5"/>'
    };

    } // switch
    return {}; // plate → varsayılan kahraman
  }

  // dış sarmalayıcı: ham parçaları üret + zırha özel dekorasyon uygula
  function heroParts(style, M, armor){
    return applyDeco(_heroPartsRaw(style, M), style, M, armor);
  }

  /* ===================== ZIRH-ÖZEL DEKORASYON =====================
     Aynı style'ı paylaşan zırhların görsel olarak farklılaşması için: isimden türeyen
     kararlı bir seed ile miğfer tepeliği + omuz süsü + sırt parçası ekler.
     "Her gelişimde farklı/güçlenmiş hisset" kuralı. */
  function hashName(s){ s=s||''; var h=2166136261; for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return (h>>>0); }
  function applyDeco(P, style, M, armor){
    if(!armor) return P;
    var h=hashName(armor.name||'');
    var trim=M.trim, trimHi=M.trimHi, steel=M.steel, cloth=M.cloth, Md=M.Md, glow=M.glow, saber=M.saber, core=M.core, cloakSh=M.cloakSh;
    var hood = (style==='robe'||style==='phantom'||style==='poncho');
    var out = Object.assign({}, P);
    var deco='';

    // --- miğfer tepeliği / alın süsü (HER ZAMAN üstte çizilir → base'i silmez) ---
    if(!hood){
      var crests=[
        '<path d="M55 27 L57 15 L59 21 L60.5 11 L62 21 L64 15 L66 27 Z" fill="'+trim+'" stroke="'+Md+'" stroke-width=".5" filter="'+glow+'"/>',
        '<path d="M53 28 Q47 20 49 12 Q53 18 56 26 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".6"/><path d="M68 28 Q74 20 72 12 Q68 18 65 26 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".6"/>',
        '<rect x="59.2" y="14" width="1.6" height="13" rx=".8" fill="'+steel+'"/><circle cx="60" cy="12.5" r="2" fill="'+saber+'" filter="'+glow+'"><animate attributeName="opacity" values="1;.3;1" dur="1.3s" repeatCount="indefinite"/></circle>',
        '<path d="M58.4 27 L60 9 L61.6 27 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".5"/><path d="M60 11 L60 24" stroke="'+trim+'" stroke-width=".8" opacity=".7"/>',
        '<path d="M53 26 L55 19 L57.5 24 L60 17 L62.5 24 L65 19 L67 26 Z" fill="'+trim+'" stroke="'+Md+'" stroke-width=".5"/><circle cx="60" cy="21" r="1.5" fill="'+core+'" opacity=".9"/>',
        '<path d="M52 26 Q46 24 44 28 Q49 28 53 30 Z" fill="'+trim+'" stroke="'+Md+'" stroke-width=".5"/><path d="M68 26 Q74 24 76 28 Q71 28 67 30 Z" fill="'+trim+'" stroke="'+Md+'" stroke-width=".5"/>'
      ];
      deco += crests[h % crests.length];
    } else {
      var hoodDeco=[
        '<path d="M55 24 L60 17 L65 24 Z" fill="'+trim+'" stroke="'+Md+'" stroke-width=".5" opacity=".9"/><circle cx="60" cy="22" r="1.4" fill="'+core+'"/>',
        '<circle cx="60" cy="20" r="2.2" fill="'+saber+'" filter="'+glow+'"><animate attributeName="opacity" values="1;.4;1" dur="1.8s" repeatCount="indefinite"/></circle>',
        '<path d="M52 22 Q48 16 50 11 Q54 16 55 23 Z M68 22 Q72 16 70 11 Q66 16 65 23 Z" fill="'+cloakSh+'" stroke="'+Md+'" stroke-width=".5"/>',
        ''
      ];
      deco += hoodDeco[h % hoodDeco.length];
    }

    // --- omuz süsü (üstte, ön pauldron bölgesi) ---
    var sh=[
      '<path d="M60 57 L58 50 L62 55 Z M67 56 L66 49 L70 54 Z M74 58 L74 51 L77 56 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".5"/>',
      '<circle cx="62" cy="62" r="1.2" fill="'+trim+'"/><circle cx="68" cy="61" r="1.2" fill="'+trim+'"/><circle cx="74" cy="62" r="1.2" fill="'+trim+'"/>',
      '<path d="M59 64 Q68 60 77 64" stroke="'+saber+'" stroke-width="1.4" fill="none" opacity=".85" filter="'+glow+'"><animate attributeName="opacity" values=".85;.4;.85" dur="2s" repeatCount="indefinite"/></path>',
      '<path d="M58 64 Q68 69 78 64 L77 68 Q68 72 59 68 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".6"/>',
      '<path d="M58 58 Q54 62 56 68 Q59 64 61 65 Q60 61 62 58 Z" fill="'+cloth+'" stroke="'+cloakSh+'" stroke-width=".5"/>',
      ''
    ];
    deco += sh[(h>>>3) % sh.length];
    out.deco = deco;

    // --- sırt parçası: yalnızca cape AÇIKÇA boş olan style'larda (vest/poncho/commander) ---
    if(P.cape===''){
      var back=[
        '<g><rect x="40" y="64" width="9" height="26" rx="3" fill="'+steel+'" stroke="'+Md+'" stroke-width=".7"/><rect x="71" y="64" width="9" height="26" rx="3" fill="'+steel+'" stroke="'+Md+'" stroke-width=".7"/>'
          +'<rect x="42" y="68" width="2" height="18" fill="'+trim+'" opacity=".5"/><rect x="73" y="68" width="2" height="18" fill="'+trim+'" opacity=".5"/>'
          +'<ellipse cx="44.5" cy="92" rx="3" ry="5" fill="'+saber+'" filter="'+glow+'"><animate attributeName="ry" values="5;9;5" dur=".5s" repeatCount="indefinite"/></ellipse>'
          +'<ellipse cx="75.5" cy="92" rx="3" ry="5" fill="'+saber+'" filter="'+glow+'"><animate attributeName="ry" values="5;9;5" dur=".5s" begin=".1s" repeatCount="indefinite"/></ellipse></g>',
        '<g><path d="M58 60 Q40 58 34 74 Q44 70 56 72 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".7" opacity=".95"/><path d="M62 60 Q80 58 86 74 Q76 70 64 72 Z" fill="'+steel+'" stroke="'+Md+'" stroke-width=".7" opacity=".95"/>'
          +'<path d="M40 62 L52 70 M80 62 L68 70" stroke="'+trim+'" stroke-width=".7" opacity=".55"/></g>',
        '<g><path d="M70 56 L82 58 L80 96 L72 92 Z" fill="'+cloth+'" stroke="'+cloakSh+'" stroke-width=".6"/><path d="M72 60 L79 61 M72 70 L79 71 M72 80 L79 81" stroke="'+trim+'" stroke-width=".8" opacity=".5"/><path d="M70 56 L82 58" stroke="'+steel+'" stroke-width="1.6"/></g>',
        ''
      ];
      var pick=back[(h>>>6) % back.length];
      if(pick) out.cape = pick;
    }

    // --- FLAGSHIP imzası: en üst kademe zırh (Rogue Apprentice) — enerji kanatları + hale ---
    if((armor.name||'')==='Rogue Apprentice Set'){
      var core2=M.core||trim;
      var wings='<g opacity=".92">'
        +'<path d="M56 60 Q30 47 15 57 Q30 60 36 70 Q23 68 19 81 Q36 81 44 89 Q40 74 56 66 Z" fill="'+trim+'" opacity=".5" filter="'+glow+'"><animate attributeName="opacity" values=".5;.82;.5" dur="2.4s" repeatCount="indefinite"/></path>'
        +'<path d="M64 60 Q90 47 105 57 Q90 60 84 70 Q97 68 101 81 Q84 81 76 89 Q80 74 64 66 Z" fill="'+trim+'" opacity=".5" filter="'+glow+'"><animate attributeName="opacity" values=".5;.82;.5" dur="2.4s" begin=".3s" repeatCount="indefinite"/></path>'
        +'<path d="M56 60 Q30 47 15 57" stroke="'+core2+'" stroke-width="1.1" fill="none" opacity=".75"/>'
        +'<path d="M64 60 Q90 47 105 57" stroke="'+core2+'" stroke-width="1.1" fill="none" opacity=".75"/></g>';
      out.cape = wings + (out.cape||'');
      out.deco = (out.deco||'')
        +'<g><ellipse cx="60" cy="13.5" rx="10.5" ry="3.5" fill="none" stroke="'+trim+'" stroke-width="1.7" opacity=".85" filter="'+glow+'"><animate attributeName="opacity" values=".85;.4;.85" dur="2s" repeatCount="indefinite"/></ellipse>'
        +'<path d="M55 56 L57 49 L60 54 L63 49 L65 56 Z" fill="'+trim+'" stroke="'+Md+'" stroke-width=".5" filter="'+glow+'"/></g>';
    }

    return out;
  }

  window.NB_ARMOR = { parts, icon, heroParts };
})();
