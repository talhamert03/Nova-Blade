/* =============================================================================
   NOVA BLADE · ARTIFACT (ESER) + MINI LEAP + MILESTONE SİSTEMLERİ
   - 22 artifact, ağırlıklı rastgele kazanım (Galaxy Leap + boss kilometre taşı)
   - Plasma Crystal VEYA Galactic Shard ile yükseltme
   - Mini Leap (Wave 30): credits+wave sıfırlar, Galactic Shard verir
   - Milestone: ilk kez ulaşılan dalga eşiklerinde dramatik kutlama + ödül
   Oyunun globalleri ile entegre (S, addCredits, addChest, toast, fmt, sfx,
   crystals/shards). Core hesap fonksiyonlarına window.artifactBonus/Flat zaten
   bağlandı (NOVA BLADE v4.html içinde guarded çağrılarla).
   ============================================================================= */
(function(){
  // === ARTIFACT TANIMLARI (22) === stat: mult/flat; per: seviye başına bonus
  const ARTIFACT_DEFS = [
    // —— tap hasarı ——
    {id:'kyberHeart', name:'Kyber Heart', icon:'💎', stat:'tapDmg', mode:'mult', per:0.08, max:20, weight:110,
      lore:'Vuruşuna susamış kusursuz bir kyber kristali.'},
    {id:'carbonLattice', name:'Carbonite Lattice', icon:'🧊', stat:'tapDmg', mode:'mult', per:0.06, max:24, weight:120,
      lore:'Donmuş zamanın içine işlenmiş güç.'},
    {id:'vaderite', name:'Vaderite Core', icon:'🔻', stat:'tapDmg', mode:'mult', per:0.13, max:16, weight:42,
      lore:'Bir lordun öfkesiyle dövülmüş kara çekirdek.'},
    // —— otomatik hasar ——
    {id:'holoStrike', name:'Holocron of Strikes', icon:'🔷', stat:'autoDmg', mode:'mult', per:0.10, max:20, weight:96,
      lore:'Bin ustanın savurma anısını saklar.'},
    {id:'phrikBand', name:'Phrik Alloy Band', icon:'⭕', stat:'autoDmg', mode:'mult', per:0.08, max:22, weight:104,
      lore:'Işın kılıcına direnen efsanevi alaşım.'},
    {id:'droidOC', name:'Droid Overclock', icon:'🤖', stat:'autoDmg', mode:'mult', per:0.15, max:15, weight:38,
      lore:'Güvenlik protokollerini söken hız modülü.'},
    // —— altın ——
    {id:'sabacc', name:'Sabacc Chip', icon:'🎴', stat:'goldMult', mode:'mult', per:0.07, max:20, weight:98,
      lore:'İdolün talihi bu çipe sinmiş.'},
    {id:'corusca', name:'Corusca Gem', icon:'🟢', stat:'goldMult', mode:'mult', per:0.05, max:24, weight:118,
      lore:'Gezegen çekirdeğinde oluşan ışıltılı taş.'},
    {id:'ledger', name:"Smuggler's Ledger", icon:'📒', stat:'goldMult', mode:'mult', per:0.12, max:16, weight:44,
      lore:'Hangi kaçakçının serveti burada gizli?'},
    // —— kritik ——
    {id:'sithWrath', name:'Sith Wrath Shard', icon:'🩸', stat:'critMult', mode:'mult', per:0.06, max:18, weight:56,
      lore:'Nefret, her darbeyi daha ölümcül kılar.'},
    {id:'echoWhills', name:'Echo of the Whills', icon:'🌀', stat:'critMult', mode:'mult', per:0.11, max:14, weight:30,
      lore:'Kâinatın kadim fısıltısı.'},
    {id:'jediFocus', name:'Jedi Focus Stone', icon:'🔵', stat:'critChance', mode:'flat', per:1.6, max:15, weight:62,
      lore:'Sakin zihin, kusursuz isabet.'},
    {id:'nightsister', name:'Nightsister Charm', icon:'🟣', stat:'critChance', mode:'flat', per:2.4, max:12, weight:34,
      lore:'Dathomir büyüsüyle lekelenmiş tılsım.'},
    // —— tüm hasar ——
    {id:'mandoSigil', name:'Mandalorian Sigil', icon:'🛡️', stat:'allDmg', mode:'mult', per:0.05, max:20, weight:72,
      lore:'Bu, Yol\u2019dur.'},
    {id:'wayfinder', name:'Wayfinder Fragment', icon:'🧭', stat:'allDmg', mode:'mult', per:0.04, max:24, weight:122,
      lore:'Karanlığın gizli yolunu işaret eder.'},
    {id:'beskarEdge', name:'Beskar Edge', icon:'⚔️', stat:'allDmg', mode:'mult', per:0.09, max:15, weight:34,
      lore:'Saf beskardan dövülmüş kesici kenar.'},
    // —— boss süresi ——
    {id:'chronoCap', name:'Chrono Capacitor', icon:'⏱️', stat:'bossTime', mode:'flat', per:1.3, max:12, weight:52,
      lore:'Boss savaşında zamanı senin lehine büker.'},
    // —— çevrimdışı ——
    {id:'hyperRelay', name:'Hyperdrive Relay', icon:'🛰️', stat:'offlineRate', mode:'flat', per:0.08, max:18, weight:66,
      lore:'Sen yokken bile galakside iz bırakır.'},
    {id:'flameCell', name:'Eternal Flame Cell', icon:'🔥', stat:'offlineRate', mode:'flat', per:0.13, max:14, weight:34,
      lore:'Hiç sönmeyen bir yıldız çekirdeği.'},
    // —— Force XP ——
    {id:'starMap', name:'Ancient Star Map', icon:'🗺️', stat:'forceXp', mode:'mult', per:0.12, max:16, weight:60,
      lore:'Kayıp tapınakların yolunu gösterir.'},
    // —— ekip hasarı ——
    {id:'squadBeacon', name:'Squadron Beacon', icon:'📡', stat:'allyDmg', mode:'mult', per:0.12, max:18, weight:66,
      lore:'Yoldaşlarını tek bir iradede toplar.'},
    {id:'twinSun', name:'Twin Sun Talisman', icon:'🌅', stat:'allyDmg', mode:'mult', per:0.18, max:13, weight:28,
      lore:'İki güneşin altında verilmiş bir yemin.'}
  ];
  const DEF_BY_ID = {}; ARTIFACT_DEFS.forEach(d=>DEF_BY_ID[d.id]=d);
  const STAT_LABEL = {
    tapDmg:'Tap Damage', autoDmg:'Auto Damage', goldMult:'Gold', critChance:'Crit Chance',
    critMult:'Crit Power', bossTime:'Boss Time', offlineRate:'Offline Rate', allDmg:'All Damage',
    forceXp:'Force XP', allyDmg:'Squad Damage'
  };
  const MILESTONES = [
    {w:25,  cr:3,  gold:1.5, arti:0, ch:null,        sh:0,  txt:'İlk büyük eşik!'},
    {w:50,  cr:8,  gold:3,   arti:1, ch:null,        sh:4,  txt:'Galaksi adını duydu.'},
    {w:75,  cr:14, gold:4,   arti:0, ch:'rare',      sh:6,  txt:'Tehdit seviyesi yükseliyor.'},
    {w:100, cr:25, gold:6,   arti:1, ch:null,        sh:10, txt:'Yüz dalga! Bir efsane doğuyor.'},
    {w:150, cr:40, gold:8,   arti:0, ch:'epic',      sh:16, txt:'Sektörler senden korkuyor.'},
    {w:200, cr:60, gold:12,  arti:1, ch:'epic',      sh:24, txt:'İmparatorluk seni hedef aldı.'},
    {w:300, cr:120,gold:18,  arti:1, ch:'legendary', sh:40, txt:'Yıkılmaz bir güç oldun.'},
    {w:500, cr:250,gold:30,  arti:2, ch:'legendary', sh:80, txt:'Galaksinin efendisi.'},
    {w:750, cr:450,gold:50,  arti:2, ch:'legendary', sh:140,txt:'Kâinat senin önünde eğiliyor.'},
    {w:1000,cr:800,gold:80,  arti:3, ch:'legendary', sh:240,txt:'NOVA — sonsuzluğun ötesi.'}
  ];

  function ready(){
    if(typeof S==='undefined' || typeof addCredits!=='function' || typeof fmt!=='function'){ return setTimeout(ready,200); }
    ensureState();
    init();
  }
  function ensureState(){
    if(!S.artifacts||typeof S.artifacts!=='object') S.artifacts={};
    if(typeof S.shards!=='number') S.shards=0;
    if(typeof S.miniLeaps!=='number') S.miniLeaps=0;
    if(!S.milestones||typeof S.milestones!=='object') S.milestones={};
    if(typeof S.artiBossMark!=='number') S.artiBossMark=Math.floor((S.stats&&S.stats.bossKills||0)/50);
  }

  // ============ BONUS HESAPLAYICILAR (core fonksiyonlar bunları çağırır) ============
  function lvlOf(id){ return (S.artifacts&&S.artifacts[id])||0; }
  window.artifactBonus = function(stat){   // çarpan (1.0 = bonus yok)
    let sum=0;
    for(const d of ARTIFACT_DEFS){ if(d.stat===stat && d.mode==='mult'){ const l=lvlOf(d.id); if(l>0) sum+=l*d.per; } }
    return 1+sum;
  };
  window.artifactFlat = function(stat){    // toplamsal (0 = bonus yok)
    let sum=0;
    for(const d of ARTIFACT_DEFS){ if(d.stat===stat && d.mode==='flat'){ const l=lvlOf(d.id); if(l>0) sum+=l*d.per; } }
    return sum;
  };

  // ============ KAZANIM ============
  function lockedDefs(){ return ARTIFACT_DEFS.filter(d=>lvlOf(d.id)<=0); }
  function ownedUnmaxed(){ return ARTIFACT_DEFS.filter(d=>{const l=lvlOf(d.id); return l>0 && l<d.max;}); }
  function weightedPick(list){
    let tot=0; list.forEach(d=>tot+=d.weight);
    let r=Math.random()*tot;
    for(const d of list){ r-=d.weight; if(r<=0) return d; }
    return list[list.length-1];
  }
  window.grantArtifact = function(n, src){
    n=n||1;
    for(let k=0;k<n;k++){
      const locked=lockedDefs();
      if(locked.length){
        const d=weightedPick(locked);
        S.artifacts[d.id]=1;
        artifactToast('🏺 Artifact discovered!', '<b>'+d.name+'</b> · +'+statLabelShort(d)+' kazanıldı');
      } else {
        const up=ownedUnmaxed();
        if(up.length){ const d=up[Math.floor(Math.random()*up.length)]; S.artifacts[d.id]=lvlOf(d.id)+1;
          artifactToast('🏺 Artifact empowered!', '<b>'+d.name+'</b> Sv '+lvlOf(d.id)); }
        else { S.crystals=(S.crystals||0)+5; S.crystalsEarned=(S.crystalsEarned||0)+5;
          artifactToast('🏺 Relic mastery', 'Tüm artifactler zirvede — <b>+5 ◆</b>'); }
      }
    }
    if(typeof activeTab!=='undefined' && activeTab==='artifacts' && document.body.classList.contains('drawerOpen')) renderPanel();
  };
  function statLabelShort(d){ return STAT_LABEL[d.stat]||d.stat; }
  function artifactToast(t,b){ try{ toast(t,b,'gold'); }catch(e){} try{ sfx.buy(); }catch(e){} }

  // ============ YÜKSELTME ============
  function upCost(lvl){ return Math.max(1, Math.floor(Math.pow(1.4, lvl))); }   // spec: floor(1.4^lvl)
  window.buyArtifactUp = function(id, cur){
    const d=DEF_BY_ID[id]; if(!d) return;
    const lvl=lvlOf(id); if(lvl<=0 || lvl>=d.max) return;
    const cost=upCost(lvl);
    if(cur==='shard'){
      if((S.shards||0)<cost) return;
      S.shards-=cost;
    } else {
      if((S.crystals||0)<cost) return;
      S.crystals-=cost;
    }
    S.artifacts[id]=lvl+1;
    try{ sfx.buy(); }catch(e){}
    try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){}
    renderPanel();
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
  };

  // ============ MINI LEAP ============
  function miniLeapWave(){ return Math.max(S.stats&&S.stats.maxWaveRun||1, S.wave||1); }
  function miniLeapUnlocked(){ return miniLeapWave()>=30; }
  function miniLeapGain(){ const w=miniLeapWave(); if(w<30) return 0; return Math.max(1, Math.floor(Math.pow(w/8, 1.2))); }
  window.doMiniLeap = function(){
    const gain=miniLeapGain(); if(gain<=0 || !miniLeapUnlocked()) return;
    S.shards=(S.shards||0)+gain;
    S.miniLeaps=(S.miniLeaps||0)+1;
    // SADECE credits + wave sıfırlanır (hero/ally/crystal/artifact korunur)
    S.credits=0;
    S.wave=1; S.farmWave=0; S.stats.maxWaveRun=1;
    if(typeof enemy!=='undefined'){ try{ enemy=null; }catch(e){} }
    try{ if(typeof spawnTimer!=='undefined') spawnTimer=0.05; }catch(e){}
    try{ sfx.zone(); }catch(e){}
    try{ toast('⚡ Mini Leap!', '<b>+'+gain+' ✦</b> Galactic Shard kazandın. Dalga sıfırlandı, gücün kaldı.','gold'); }catch(e){}
    try{ if(typeof renderZoneBg==='function') renderZoneBg(); }catch(e){}
    try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){}
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
  };

  // ============ MILESTONE (poll) ============
  function checkMilestones(){
    const mw=Math.max(S.stats&&S.stats.maxWave||1, S.wave||1);
    for(const m of MILESTONES){
      if(mw>=m.w && !S.milestones[m.w]){
        S.milestones[m.w]=1;
        awardMilestone(m);
        break;   // tek seferde bir kutlama (sıradaki bir sonraki saniyede)
      }
    }
    // boss kilometre taşı: her 50 boss → garantili artifact
    const mark=Math.floor((S.stats&&S.stats.bossKills||0)/50);
    if(mark>(S.artiBossMark||0)){ const diff=mark-(S.artiBossMark||0); S.artiBossMark=mark; grantArtifact(diff,'boss'); }
  }
  function awardMilestone(m){
    // ödülleri uygula
    const goldAmt=Math.max(1000, Math.round((typeof creditReward==='function'?creditReward(currentWave()):500)*m.gold*8));
    if(typeof addCredits==='function') addCredits(goldAmt,true);
    if(m.cr){ S.crystals=(S.crystals||0)+m.cr; S.crystalsEarned=(S.crystalsEarned||0)+m.cr; }
    if(m.sh){ S.shards=(S.shards||0)+m.sh; }
    if(m.ch && typeof addChest==='function') addChest(m.ch,1);
    if(m.arti) grantArtifact(m.arti,'milestone');
    try{ if(typeof checkAch==='function') checkAch(); }catch(e){}
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
    celebrate(m, {gold:goldAmt});
  }
  function celebrate(m, extra){
    try{ sfx.zone(); }catch(e){}
    const ov=document.createElement('div'); ov.id='msCelebrate';
    let rewards='';
    rewards+='<div class="msRew"><span>💰</span> +'+fmt(extra.gold)+' Gold</div>';
    if(m.cr) rewards+='<div class="msRew"><span style="color:#c89bff">◆</span> +'+m.cr+' Plasma Crystals</div>';
    if(m.sh) rewards+='<div class="msRew"><span style="color:#7fffd0">✦</span> +'+m.sh+' Galactic Shards</div>';
    if(m.ch) rewards+='<div class="msRew"><span style="color:#ffd24a">📦</span> '+m.ch.charAt(0).toUpperCase()+m.ch.slice(1)+' Chest</div>';
    if(m.arti) rewards+='<div class="msRew"><span>🏺</span> '+m.arti+' Artifact'+(m.arti>1?'s':'')+'</div>';
    ov.innerHTML='<div class="msBurst"></div><div class="msCard">'
      +'<div class="msKick">MILESTONE</div>'
      +'<div class="msWave">WAVE '+m.w+'</div>'
      +'<div class="msTxt">'+m.txt+'</div>'
      +'<div class="msRewards">'+rewards+'</div>'
      +'<button class="msBtn">DEVAM ET</button></div>';
    document.body.appendChild(ov);
    requestAnimationFrame(()=>ov.classList.add('show'));
    const close=()=>{ ov.classList.remove('show'); setTimeout(()=>ov.remove(),300); };
    ov.querySelector('.msBtn').onclick=close;
    ov.addEventListener('click',e=>{ if(e.target===ov) close(); });
    setTimeout(()=>{ if(ov.parentNode) close(); }, 6000);
  }

  // ============ PANEL ============
  window.artifactsPanelHtml = function(){
    ensureState();
    const owned=ARTIFACT_DEFS.filter(d=>lvlOf(d.id)>0);
    const cr=S.crystals||0, sh=S.shards||0;
    let h='';
    // başlık: bakiye + mini leap
    h+='<div class="artiHead">'
      +'<div class="artiBal"><span class="artiCcy" style="color:#c89bff">◆ '+fmt(cr)+'</span>'
        +'<span class="artiCcy" style="color:#7fffd0">✦ '+fmt(sh)+'</span></div>'
      +'<div class="artiDisc">Discovered <b>'+owned.length+'</b></div>'
      +'</div>';
    // Mini Leap kartı
    const mlGain=miniLeapGain(), mlOk=miniLeapUnlocked();
    h+='<div class="miniLeapCard'+(mlOk?'':' lk')+'">'
      +'<div class="mlIco">⚡</div>'
      +'<div class="mlInfo"><div class="mlName">Mini Leap <span class="mlSub">Wave 30+</span></div>'
        +'<div class="mlDesc">'+(mlOk
          ? 'Sadece <b>altın + dalga</b> sıfırlanır (gücün kalır) → <b style="color:#7fffd0">+'+mlGain+' ✦</b> Galactic Shard'
          : 'Dalga 30\u2019a ulaş — şu an: '+miniLeapWave())+'</div></div>'
      +(mlOk?'<button class="mlBtn" data-act="miniLeap">LEAP<br><span>+'+mlGain+' ✦</span></button>'
            :'<div class="mlLock">🔒</div>')
      +'</div>';
    h+='<div class="artiNote">Her <b>Galaxy Leap</b> ve her 50. boss kesimi yeni bir artifact verir. Artifactleri <b style="color:#c89bff">Plasma Crystal</b> ya da <b style="color:#7fffd0">Galactic Shard</b> ile yükselt.</div>';
    // grid
    h+='<div class="artiGrid">';
    owned.forEach(d=>{ h+=artiCard(d); });
    // gizemli kilitli kartlar (kaç tane kaldığı belli değil)
    const mystery = lockedDefs().length>0 ? Math.min(3, lockedDefs().length) : 0;
    for(let i=0;i<mystery;i++) h+=mysteryCard();
    h+='</div>';
    return h;
  };
  function artiCard(d){
    const lvl=lvlOf(d.id), maxed=lvl>=d.max;
    const cur=curBonusLabel(d,lvl), nxt=maxed?'':nextBonusLabel(d,lvl);
    const cost=maxed?0:upCost(lvl);
    const canCr=(S.crystals||0)>=cost, canSh=(S.shards||0)>=cost;
    let btns;
    if(maxed){ btns='<div class="artiMax">★ MAX</div>'; }
    else {
      btns='<div class="artiBtns">'
        +'<button class="artiUp cr'+(canCr?'':' dim')+'" data-act="artiUp" data-id="'+d.id+'"'+(canCr?'':' disabled')+'>◆ '+fmt(cost)+'</button>'
        +'<button class="artiUp sh'+(canSh?'':' dim')+'" data-act="artiUpShard" data-id="'+d.id+'"'+(canSh?'':' disabled')+'>✦ '+fmt(cost)+'</button>'
        +'</div>';
    }
    return '<div class="artiCard" data-stat="'+d.stat+'">'
      +'<div class="artiTop"><span class="artiIco">'+d.icon+'</span>'
        +'<span class="artiLvl">Sv '+lvl+'<small>/'+d.max+'</small></span></div>'
      +'<div class="artiName">'+d.name+'</div>'
      +'<div class="artiStat">'+(STAT_LABEL[d.stat]||d.stat)+'</div>'
      +'<div class="artiBonus">'+cur+(nxt?'<span class="artiNext"> → '+nxt+'</span>':'')+'</div>'
      +'<div class="artiLore">'+d.lore+'</div>'
      +btns+'</div>';
  }
  function mysteryCard(){
    return '<div class="artiCard myst"><div class="artiTop"><span class="artiIco">❔</span></div>'
      +'<div class="artiName">Undiscovered Relic</div>'
      +'<div class="artiStat">???</div>'
      +'<div class="artiLore">Galaksiyi keşfettikçe yeni eserler açığa çıkar. <b>Galaxy Leap</b> yap.</div></div>';
  }
  function curBonusLabel(d,lvl){
    if(lvl<=0) return '—';
    if(d.mode==='mult') return '+'+Math.round(lvl*d.per*100)+'%';
    if(d.stat==='critChance') return '+'+(lvl*d.per).toFixed(1)+'%';
    if(d.stat==='bossTime') return '+'+(lvl*d.per).toFixed(1)+'s';
    if(d.stat==='offlineRate') return '+'+Math.round(lvl*d.per*100)+'%';
    return '+'+(lvl*d.per).toFixed(2);
  }
  function nextBonusLabel(d,lvl){ return curBonusLabel(d,lvl+1); }

  // ============ ENTEGRASYON ============
  function init(){
    // panel buton dispatcher (oyunun kendi handler'ı bilinmeyen act'leri yok sayar)
    const panel=document.getElementById('panel');
    if(panel){
      panel.addEventListener('click', function(e){
        const btn=e.target.closest('button[data-act]'); if(!btn||btn.disabled) return;
        const act=btn.dataset.act;
        if(act==='artiUp') buyArtifactUp(btn.dataset.id,'crystal');
        else if(act==='artiUpShard') buyArtifactUp(btn.dataset.id,'shard');
        else if(act==='miniLeap') confirmMiniLeap();
      });
    }
    // milestone + boss-artifact poll
    setInterval(checkMilestones, 1200);
    // dışa açılan kancalar
    window.NB_ARTIFACTS={ defs:ARTIFACT_DEFS, grant:grantArtifact, miniLeap:doMiniLeap, panel:artifactsPanelHtml };
  }
  function confirmMiniLeap(){
    const gain=miniLeapGain();
    const ov=document.createElement('div'); ov.id='mlConfirm';
    ov.innerHTML='<div class="mlcCard"><h3>⚡ Mini Leap</h3>'
      +'<p>Altının ve dalgan sıfırlanacak. <b>Kahraman, ekip, kristal ve artifactler kalır.</b></p>'
      +'<div class="mlcGain">+'+gain+' <span>✦ Galactic Shard</span></div>'
      +'<div class="mlcBtns"><button class="mlcNo">Vazgeç</button><button class="mlcYes">Mini Leap</button></div></div>';
    document.body.appendChild(ov);
    requestAnimationFrame(()=>ov.classList.add('show'));
    const close=()=>{ ov.classList.remove('show'); setTimeout(()=>ov.remove(),240); };
    ov.querySelector('.mlcNo').onclick=close;
    ov.querySelector('.mlcYes').onclick=()=>{ close(); doMiniLeap(); renderPanel(); };
    ov.addEventListener('click',e=>{ if(e.target===ov) close(); });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
