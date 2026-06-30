/* ============================================================================
   NOVA BLADE · v5 KOLEKSİYON — sandıktan düşen kahramanlar, çoklu ödül,
   sahnede 2. sıra (uçan + yürüyen). Ana script'ten SONRA yüklenir.
   ============================================================================ */
(function(){
  if(typeof ALLIES==='undefined' || typeof NB_HEROES==='undefined' || typeof S==='undefined') return;
  if(window.__nbCollectionInstalled) return; window.__nbCollectionInstalled=true;

  /* ---- nadirlik renkleri ---- */
  const RAR = {
    common:    {name:'Common',    c:'#9fb0c4', g:'#d6e2f0'},
    uncommon:  {name:'Uncommon',  c:'#54e08a', g:'#bdf7d3'},
    rare:      {name:'Rare',      c:'#4db8ff', g:'#cfeaff'},
    epic:      {name:'Epic',      c:'#b86bff', g:'#e8d6ff'},
    legendary: {name:'Legendary', c:'#ffb24a', g:'#fff0c4'}
  };
  const RORD = ['common','uncommon','rare','epic','legendary'];
  window.NB_RAR = RAR; window.NB_RORD = RORD;

  /* ===================== GROUND HERO SVG (chibi savaşçı, kılıçlı) ===================== */
  function gruntHero(p, id){
    const u='g_'+id+'_';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 165" preserveAspectRatio="xMidYMid meet">'
    +'<defs>'
      +'<linearGradient id="'+u+'b" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="'+p.light+'"/><stop offset="1" stop-color="'+p.body+'"/></linearGradient>'
      +'<linearGradient id="'+u+'d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p.body+'"/><stop offset="1" stop-color="'+p.dark+'"/></linearGradient>'
      +'<radialGradient id="'+u+'bg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="'+p.glow+'" stop-opacity=".6"/><stop offset="1" stop-color="'+p.glow+'" stop-opacity="0"/></radialGradient>'
    +'</defs>'
    +'<ellipse cx="60" cy="158.5" rx="26" ry="4.2" fill="#000" opacity=".4"/>'
    +'<ellipse cx="60" cy="94" rx="36" ry="44" fill="url(#'+u+'bg)" opacity=".4"/>'
    +'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -1.6;0 0" dur="3.2s" repeatCount="indefinite"/>'
      /* bacaklar */
      +'<path d="M48 102 L44 150 L55 150 L58 108 Z" fill="url(#'+u+'d)" stroke="'+p.dark+'" stroke-width="1"/>'
      +'<path d="M72 102 L76 150 L65 150 L62 108 Z" fill="'+p.dark+'" stroke="'+p.dark+'" stroke-width="1"/>'
      +'<path d="M42 148 h16 v8 h-18 Z M62 148 h16 v8 h-18 Z" fill="#1a1f2a"/>'
      /* gövde */
      +'<path d="M44 62 L76 62 L80 106 Q60 114 40 106 Z" fill="url(#'+u+'b)" stroke="'+p.dark+'" stroke-width="1.4"/>'
      +'<path d="M44 62 L54 62 L52 106 L42 104 Z" fill="#fff" opacity=".1"/>'
      +'<path d="M50 72 L70 72 L67 96 L53 96 Z" fill="'+p.acc+'" opacity=".26"/>'
      +'<circle cx="60" cy="82" r="3.4" fill="'+p.acc+'"><animate attributeName="opacity" values="1;.45;1" dur="1.6s" repeatCount="indefinite"/></circle>'
      /* sol kol */
      +'<path d="M44 66 L34 92 L42 95 L50 70 Z" fill="'+p.body+'" stroke="'+p.dark+'" stroke-width="1"/>'
      +'<circle cx="38" cy="95" r="4" fill="'+p.light+'"/>'
      /* sağ kol + enerji kılıcı */
      +'<path d="M76 66 Q90 70 96 86" stroke="'+p.body+'" stroke-width="7" stroke-linecap="round" fill="none"/>'
      +'<rect x="92" y="82" width="6" height="12" rx="2" fill="#2a2f3a" stroke="'+p.dark+'" stroke-width="1"/>'
      +'<rect x="93.4" y="40" width="3.2" height="44" rx="1.6" fill="'+p.glow+'"><animate attributeName="opacity" values="1;.6;1" dur="1.4s" repeatCount="indefinite"/></rect>'
      +'<polygon points="95,30 97.6,42 92.4,42" fill="'+p.light+'"/>'
      /* kask */
      +'<path d="M49 34 L71 34 L74 52 Q60 58 46 52 Z" fill="url(#'+u+'b)" stroke="'+p.dark+'" stroke-width="1.4"/>'
      +'<rect x="48" y="40" width="24" height="8" rx="3" fill="#0a1018"/>'
      +'<rect x="50" y="41.5" width="20" height="4.5" rx="2.2" fill="'+p.visor+'"><animate attributeName="opacity" values="1;.5;1" dur="2.2s" repeatCount="indefinite"/></rect>'
      +'<rect x="58.6" y="28" width="2.8" height="6" fill="'+p.acc+'"/><circle cx="60" cy="27" r="1.6" fill="'+p.glow+'"><animate attributeName="opacity" values="1;.3;1" dur="1s" repeatCount="indefinite"/></circle>'
    +'</g></svg>';
  }

  /* ===================== AIR HERO SVG (kanat-glider, ışın silahı) ===================== */
  function flyHero(p, id){
    const u='f_'+id+'_';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 150" preserveAspectRatio="xMidYMid meet">'
    +'<defs><radialGradient id="'+u+'bg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="'+p.glow+'" stop-opacity=".55"/><stop offset="1" stop-color="'+p.glow+'" stop-opacity="0"/></radialGradient></defs>'
    +'<ellipse cx="65" cy="140" rx="18" ry="3.2" fill="#000" opacity=".18"><animate attributeName="rx" values="18;13;18" dur="2.6s" repeatCount="indefinite"/></ellipse>'
    +'<ellipse cx="65" cy="74" rx="44" ry="34" fill="url(#'+u+'bg)" opacity=".5"/>'
    /* kanatlar */
    +'<path d="M58 56 Q22 44 8 64 Q30 64 56 70 Z" fill="'+p.dark+'" stroke="#0e1016" stroke-width="1"/>'
    +'<path d="M72 56 Q108 44 122 64 Q100 64 74 70 Z" fill="'+p.body+'" stroke="#0e1016" stroke-width="1"/>'
    +'<path d="M58 56 Q30 48 14 62" stroke="'+p.acc+'" stroke-width="1.6" fill="none" opacity=".7"/>'
    +'<path d="M72 56 Q100 48 116 62" stroke="'+p.acc+'" stroke-width="1.6" fill="none" opacity=".7"/>'
    /* gövde */
    +'<path d="M56 56 L74 56 L78 100 Q65 108 52 100 Z" fill="'+p.body+'" stroke="#0e1016" stroke-width="1.1"/>'
    +'<path d="M56 56 L63 56 L60 100 L54 98 Z" fill="'+p.light+'" opacity=".35"/>'
    +'<circle cx="65" cy="74" r="3.4" fill="'+p.acc+'"><animate attributeName="opacity" values="1;.45;1" dur="1.6s" repeatCount="indefinite"/></circle>'
    /* bacaklar toplanmış */
    +'<path d="M58 100 Q54 116 58 124 L64 122 Q62 110 64 102 Z" fill="'+p.dark+'"/>'
    +'<path d="M66 102 Q72 116 78 122 L80 116 Q74 110 72 100 Z" fill="'+p.body+'"/>'
    /* kask */
    +'<path d="M58 38 Q58 31 65 31 Q73 31 73 40 Q73 48 66 50 L61 50 Q58 47 58 38 Z" fill="'+p.body+'" stroke="#0e1016" stroke-width="1"/>'
    +'<path d="M60 40 L72 38 L72 44 L62 46 Z" fill="'+p.visor+'"><animate attributeName="opacity" values="1;.55;1" dur="2.2s" repeatCount="indefinite"/></path>'
    /* ışın tüfeği (sağa) */
    +'<path d="M66 64 Q80 66 92 72" stroke="'+p.body+'" stroke-width="6" stroke-linecap="round" fill="none"/>'
    +'<rect x="88" y="69" width="22" height="6" rx="2" fill="#22262f" stroke="#0e1016" stroke-width="1"/>'
    +'<rect x="92" y="65.5" width="7" height="4" rx="1" fill="'+p.acc+'"/>'
    +'<circle cx="111" cy="72" r="3" fill="'+p.glow+'"><animate attributeName="r" values="2.4;4;2.4" dur=".7s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;1" dur=".7s" repeatCount="indefinite"/></circle>'
    +'</svg>';
  }

  /* ===================== YENİ KOLEKSİYON KAHRAMANLARI ===================== */
  // pal: {body,dark,light,acc,glow,visor}
  const NEW_HEROES = [
    // ---- COMMON ----
    {pid:'scrap',  name:'TIK-30',     title:'Scrap Runner',      rar:'common',   dps:30,    cost:1.2e3,  glow:'#9fe2c4', dmgType:'physical',
      pal:{body:'#5a6a52',dark:'#2e362a',light:'#8fa07e',acc:'#9fe2c4',glow:'#bdffe0',visor:'#cffae2'}, quip:'"Junk today, glory tomorrow."'},
    {pid:'flick',  name:'FLICK',      title:'Street Slinger',    rar:'common',   dps:220,   cost:2.5e4,  glow:'#ffd24a', dmgType:'physical',
      pal:{body:'#6a5a3a',dark:'#352c1c',light:'#a8905a',acc:'#ffd24a',glow:'#ffe9a0',visor:'#ffe9b0'}, quip:'"Quick hands, quicker feet."'},
    {pid:'embers', name:'EMBER-2',    title:'Furnace Drone',     rar:'common',   dps:1.4e3, cost:6e5,    glow:'#ff7b3a', dmgType:'fire', mode:'air',
      pal:{body:'#5a3424',dark:'#2e1810',light:'#8a4e30',acc:'#ff7b3a',glow:'#ffb070',visor:'#ffcaa0'}, quip:'"Burn bright, burn fast."'},
    // ---- UNCOMMON ----
    {pid:'frost',  name:'KRIO',       title:'Glacier Sentinel',  rar:'uncommon', dps:6e3,   cost:4e6,    glow:'#9fe5ff', dmgType:'ice',
      pal:{body:'#3e5e76',dark:'#1e3142',light:'#7aa2bc',acc:'#9fe5ff',glow:'#d8f6ff',visor:'#e8fbff'}, quip:'"Cold steel, colder resolve."'},
    {pid:'volt',   name:'ZAP-V',      title:'Storm Caller',      rar:'uncommon', dps:2.0e4, cost:8e7,    glow:'#bfe4ff', dmgType:'storm', mode:'air',
      pal:{body:'#2c3a52',dark:'#161f30',light:'#52688a',acc:'#bfe4ff',glow:'#e0f0ff',visor:'#eafaff'},
      passive:'Air support: all damage <b>+6%</b>.', quip:'"I am the thunder before the strike."'},
    {pid:'moss',   name:'SYLVA',      title:'Grove Warden',      rar:'uncommon', dps:5.5e4, cost:9e8,    glow:'#aaff6a', dmgType:'poison',
      pal:{body:'#2d4a32',dark:'#16281a',light:'#4e7a52',acc:'#aaff6a',glow:'#caff8a',visor:'#d8ffa8'}, quip:'"The forest fights with me."'},
    {pid:'dune',   name:'RA-KIN',     title:'Dune Marauder',     rar:'uncommon', dps:1.3e5, cost:8e9,    glow:'#ffc488', dmgType:'physical',
      pal:{body:'#8a6a44',dark:'#4a3520',light:'#c0a070',acc:'#ffc488',glow:'#ffe0b0',visor:'#ffe9c8'}, quip:'"Sand hides me. Speed kills you."'},
    // ---- RARE ----
    {pid:'ion',    name:'AX-ION',     title:'Ion Vanguard',      rar:'rare',     dps:3.0e5, cost:9e10,   glow:'#4db8ff', dmgType:'ion',
      pal:{body:'#2a4866',dark:'#142536',light:'#5a86b0',acc:'#4db8ff',glow:'#bfe6ff',visor:'#dff2ff'},
      passive:'Crit chance <b>+4%</b>.', quip:'"Charged and aimed."'},
    {pid:'corsair',name:'NEVE',       title:'Void Corsair',      rar:'rare',     dps:7e5,   cost:9e11,   glow:'#7fe0ff', dmgType:'energy', mode:'air',
      pal:{body:'#22384a',dark:'#10202c',light:'#446a82',acc:'#7fe0ff',glow:'#cfeeff',visor:'#e6f8ff'},
      passive:'Loot drop chance <b>+6%</b>.', quip:'"The void owes me nothing. I take anyway."'},
    {pid:'crimson',name:'KORVUS',     title:'Crimson Blade',     rar:'rare',     dps:1.6e6, cost:9e12,   glow:'#ff5b6e', dmgType:'dark',
      pal:{body:'#4a1e28',dark:'#260e14',light:'#7a3340',acc:'#ff5b6e',glow:'#ff9aa8',visor:'#ffc0c8'},
      passive:'Boss damage <b>+12%</b>.', quip:'"Bleed for me."'},
    {pid:'aurum',  name:'AURELIA',    title:'Sun Priestess',     rar:'rare',     dps:3.6e6, cost:9e13,   glow:'#ffe07a', dmgType:'light',
      pal:{body:'#9a7a30',dark:'#4e3c12',light:'#d8b85a',acc:'#ffe07a',glow:'#fff3b0',visor:'#fff8d0'},
      passive:'All loot stat values <b>+4%</b>.', quip:'"Stand in the light, or fall in shadow."'},
    // ---- EPIC ----
    {pid:'obsidian',name:'XARN',      title:'Obsidian Warlord',  rar:'epic',     dps:8e6,   cost:9e14,   glow:'#b86bff', dmgType:'dark',
      pal:{body:'#2e1c44',dark:'#150a22',light:'#52386e',acc:'#c89bff',glow:'#e0c0ff',visor:'#eedcff'},
      passive:'All damage <b>+10%</b>.', quip:'"Kneel, or be broken."'},
    {pid:'tempest',name:'VEGA',       title:'Tempest Ace',       rar:'epic',     dps:1.8e7, cost:9e15,   glow:'#9fd0ff', dmgType:'storm', mode:'air',
      pal:{body:'#26354e',dark:'#101a2a',light:'#48628a',acc:'#9fd0ff',glow:'#dff0ff',visor:'#eafaff'},
      passive:'Boss damage <b>+15%</b>.', quip:'"Catch me if the sky lets you."'},
    {pid:'magma',  name:'PYRE',       title:'Magma Berserker',   rar:'epic',     dps:4e7,   cost:9e16,   glow:'#ff8a3a', dmgType:'fire',
      pal:{body:'#5a2414',dark:'#2e120a',light:'#8a3e1e',acc:'#ff8a3a',glow:'#ffba70',visor:'#ffd0a0'},
      passive:'Attack speed <b>+0.4</b>.', quip:'"Everything burns eventually."'},
    // ---- LEGENDARY ----
    {pid:'eclipse',name:'NOCTYS',     title:'Eclipse Sovereign', rar:'legendary',dps:1.2e8, cost:9e17,   glow:'#c89bff', dmgType:'dark',
      pal:{body:'#1c1230',dark:'#0c0718',light:'#3a2a58',acc:'#c89bff',glow:'#e8d0ff',visor:'#f2e6ff'},
      passive:'All damage <b>+18%</b> and boss damage <b>+20%</b>.', quip:'"I am the dark between the stars."'},
    {pid:'nova',   name:'SOLARA',     title:'Nova Empress',      rar:'legendary',dps:3e8,   cost:9e18,   glow:'#ffd24a', dmgType:'light', mode:'air',
      pal:{body:'#7a5a18',dark:'#3e2e0a',light:'#c8a838',acc:'#ffe07a',glow:'#fff3b0',visor:'#fff8d8'},
      passive:'All damage <b>+20%</b> and all loot stats <b>+6%</b>.', quip:'"Witness a dying sun reborn."'}
  ];

  /* skinleri NB_HEROES'a kaydet + ALLIES'e ekle */
  NEW_HEROES.forEach(function(h){
    var skId = 'col_'+h.pid;
    if(!NB_HEROES.find(function(x){return x.id===skId;})){
      var svg = (h.mode==='air') ? flyHero(h.pal, h.pid) : gruntHero(h.pal, h.pid);
      NB_HEROES.push({id:skId, name:h.name, svg:svg});
    }
    if(!ALLIES.find(function(a){return a.pid===h.pid;})){
      ALLIES.push({
        name:h.name, title:h.title, skin:skId, dps:h.dps, cost:h.cost, glow:h.glow,
        dmgType:h.dmgType, mode:h.mode, pid:h.pid, rarity:h.rar, chestHero:true,
        passive:h.passive, lootFx:h.lootFx, quip:h.quip
      });
    }
  });

  /* S.allies'i yeni uzunluğa tamamla */
  try{ if(Array.isArray(S.allies)){ for(var qi=S.allies.length; qi<ALLIES.length; qi++) S.allies[qi]=0; } }catch(e){}

  /* ---- chestHero havuzu + nadirlik eşlemesi ---- */
  function heroPoolByRar(rar){
    var out=[];
    ALLIES.forEach(function(a,i){ if(a.chestHero && a.rarity===rar) out.push(i); });
    return out;
  }
  // sandık tier'ına göre kahraman nadirlik dağılımı (Clash Royale benzeri — yüksek nadir zor)
  var HERO_RAR_TABLE = {
    common:    {common:80, uncommon:20, rare:0,  epic:0,  legendary:0},
    rare:      {common:30, uncommon:46, rare:22, epic:2,  legendary:0},
    epic:      {common:0,  uncommon:30, rare:48, epic:20, legendary:2},
    legendary: {common:0,  uncommon:8,  rare:46, epic:40, legendary:6}
  };
  function rollRar(tbl){
    var tot=0; RORD.forEach(function(k){ tot+=(tbl[k]||0); });
    var r=Math.random()*tot;
    for(var i=0;i<RORD.length;i++){ r-=(tbl[RORD[i]]||0); if(r<=0) return RORD[i]; }
    return 'common';
  }
  // bir sandıktan kahraman ödülü seç (yeni veya dup). null dönebilir.
  function rollChestHero(chestId){
    var tbl=HERO_RAR_TABLE[chestId]||HERO_RAR_TABLE.common;
    // önce hedef nadirlik, sahip olunmayan varsa onu ver; yoksa dup
    var rar=rollRar(tbl);
    // hedef nadirlikte sahip olunmayanları topla, aşağı doğru ara
    var order=[rar].concat(RORD.slice(0,RORD.indexOf(rar)).reverse());
    for(var k=0;k<order.length;k++){
      var pool=heroPoolByRar(order[k]).filter(function(i){return (S.allies[i]||0)<=0;});
      if(pool.length){ return {idx:pool[Math.floor(Math.random()*pool.length)], dup:false}; }
    }
    // hepsi sahip → dup (kristal'e çevrilecek)
    var any=heroPoolByRar(rar);
    if(any.length) return {idx:any[Math.floor(Math.random()*any.length)], dup:true};
    return null;
  }
  // sandık tier'ına göre kahraman ÇIKMA şansı
  var HERO_DROP_CHANCE = {common:0, rare:0.07, epic:0.16, legendary:0.30};
  // dup kahraman → kristal değeri (nadirliğe göre)
  var DUP_CRYSTAL = {common:1, uncommon:2, rare:4, epic:8, legendary:18};

  /* ===================== ÇOKLU ÖDÜL: openChestFlow OVERRIDE ===================== */
  // ödül modeli: {kind:'loot'|'gold'|'crystal'|'hero', ...}
  window.openChestFlow = function(chest, free){
    var rewards=[];
    // 1) loot (mevcut motor)
    var items = generateChestItems(chest);
    items.forEach(function(it){ addItemToInv(it); rewards.push({kind:'loot', it:it}); });
    S.stats.boxesOpened=(S.stats.boxesOpened||0)+1;
    // 2) altın (sandık tier'ına göre, dengeli — wave ödülüne bağlı)
    var goldMult = {common:6, rare:14, epic:34, legendary:75}[chest.id]||6;
    var gold = Math.max(100, Math.ceil(creditReward(currentWave())*goldMult));
    addCredits(gold, true);
    rewards.push({kind:'gold', amt:gold});
    // 3) kristal (mevcut gem)
    var gems=0;
    if(chest.gem){ gems = chest.gem[0]+Math.floor(Math.random()*(chest.gem[1]-chest.gem[0]+1)); S.crystals+=gems; S.crystalsEarned=(S.crystalsEarned||0)+gems; }
    if(gems>0) rewards.push({kind:'crystal', amt:gems});
    // 4) kahraman (şansa bağlı)
    var hc = HERO_DROP_CHANCE[chest.id]||0;
    if(hc>0 && Math.random()<hc){
      var pick = rollChestHero(chest.id);
      if(pick){
        var a=ALLIES[pick.idx];
        if(pick.dup){
          var cv = DUP_CRYSTAL[a.rarity]||2; S.crystals+=cv; S.crystalsEarned=(S.crystalsEarned||0)+cv;
          rewards.push({kind:'hero', idx:pick.idx, dup:true, cv:cv});
        } else {
          S.allies[pick.idx]=1;
          rewards.push({kind:'hero', idx:pick.idx, dup:false});
        }
      }
    }
    // 5) pet yumurtası (şansa bağlı — daha üst sandıklarda daha sık ve daha iyi)
    var PET_DROP_CHANCE = {common:0.08, rare:0.16, epic:0.28, legendary:0.45};
    var pc = PET_DROP_CHANCE[chest.id]||0;
    if(pc>0 && window.NB_PETS && typeof window.NB_PETS.addEggSilent==='function' && Math.random()<pc){
      // üst sandıklar common yumurta düşürmesin
      var noCommon = (chest.id==='epic'||chest.id==='legendary');
      var er = window.NB_PETS.rollEggRarity ? window.NB_PETS.rollEggRarity(noCommon) : null;
      var got = window.NB_PETS.addEggSilent(er);
      rewards.push({kind:'pet', rarity:got});
    }
    try{ if(typeof renderAllies==='function') renderAllies(); }catch(e){}
    showChestReveal(rewards, chest);
    try{ checkAch(); }catch(e){}
  };

  window.NB_heroRarColor = function(idx){ var a=ALLIES[idx]; var r=(a&&a.rarity)||'common'; return (RAR[r]||RAR.common); };

  /* ===================== SAHNE: 2. SIRA (uçan bg + yürüyen arka) ===================== */
  // ikincil saha kahramanı seç: en güçlü 2.'yi (deploy edilen hariç) getir
  function secondField(mode){
    var air=(mode==='air');
    var primary = (typeof fieldHero==='function') ? fieldHero(mode) : -1;
    var arr=[];
    ALLIES.forEach(function(a,i){ if((S.allies[i]||0)>0 && (a.mode==='air')===air && i!==primary) arr.push(i); });
    if(!arr.length) return -1;
    arr.sort(function(x,y){ return (S.allies[y]-S.allies[x])||(y-x); });
    return arr[0];
  }
  var _renderAllies = window.renderAllies;
  window.renderAllies = function(){
    if(typeof _renderAllies==='function') _renderAllies.apply(this, arguments);
    var actors=document.getElementById('actors'); if(!actors) return;
    // eski ikincil katmanları temizle
    var oldA=document.getElementById('allyBgAirWrap'); if(oldA) oldA.remove();
    var oldG=document.getElementById('allyBackWrap'); if(oldG) oldG.remove();
    // 2. uçan → arka planda yüksekte süzülen destek
    var sa=secondField('air');
    if(sa>=0){
      var a2=ALLIES[sa]; var hs=NB_HEROES.find(function(h){return h.id===a2.skin;});
      var w=document.createElement('div'); w.id='allyBgAirWrap'; w.title=a2.name+' — '+a2.title;
      w.innerHTML='<div class="allyChar">'+((hs&&hs.svg)?hs.svg:heroSVG())+'</div>';
      actors.appendChild(w);
    }
    /* NOT: ikinci YER kahramanı (#allyBackWrap) artık çizilmiyor — v5'te #allyRow
       zaten 2 yer kahramanını gösteriyor; bu katman ana kahramanla çakışıyordu. */
  };
  try{ if(typeof renderAllies==='function') renderAllies(); }catch(e){}

})();
