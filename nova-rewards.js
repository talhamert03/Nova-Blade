/* ============================================================================
   NOVA BLADE · REWARDS — Ödüllü video reklam yerleşimleri (mobil idle standardı)
   Yerleşimler (TT2 / AFK Arena / idle-clicker mantığı):
     1) Çevrimdışı kazanç ×2   — "Welcome back" modalına buton
     2) Ücretsiz Hediye        — sahnede yüzen, zaman-kapılı kristal/altın paketi
     3) ×2 Altın Boost         — combat dock'ta buton, 8 dk boost + cooldown
     4) Boss ganimeti ×2       — boss ölünce ara sıra teklif (hook hazır)
   Gerçek SDK'ya hazır: NB_AD.show(opts,onReward) tek yerden simüle eder; yayında
   bu fonksiyonun içi gerçek rewarded-video çağrısıyla değiştirilir.
   Oyun kaydına dokunmaz — zamanlayıcılar ayrı localStorage anahtarında.
   ========================================================================== */
(function(){
  'use strict';
  var LS='nbRewards1';
  var R = load();
  function load(){ try{ return JSON.parse(localStorage.getItem(LS))||{}; }catch(e){ return {}; } }
  function save(){ try{ localStorage.setItem(LS, JSON.stringify(R)); }catch(e){} }
  var now=()=>Date.now();

  /* ---------- ekonomi köprüsü (oyun globalleri) ---------- */
  function giveCredits(n){ if(window.addCredits) addCredits(n); }
  function giveCrystals(n){ if(typeof S!=='undefined'){ S.crystals=(S.crystals||0)+n; S.crystalsEarned=(S.crystalsEarned||0)+n; } if(window.updateTopbar) updateTopbar(); }
  function dps(){ try{ return window.totalDps?totalDps():0; }catch(e){ return 0; } }
  function toastUI(t,b,c){ if(window.toast) toast(t,b,c); }
  function fmtN(n){ return window.fmt?fmt(n):Math.round(n); }

  /* ======================= SİMÜLE REKLAM OYNATICI ======================= */
  // Gerçek entegrasyonda: burada rewarded SDK çağrılır; tamamlanınca onReward().
  var AD_SPONSORS=[
    {n:'NEBULA RUSH',d:'Race across the rings of Saturn',c:'#4db8ff',i:'🚀'},
    {n:'CRYSTAL SAGA',d:'Match · Merge · Conquer',c:'#a86bff',i:'💎'},
    {n:'MECH ARENA X',d:'Build. Battle. Dominate.',c:'#ff7a2a',i:'🤖'},
    {n:'STAR FORGE',d:'Craft the ultimate blade',c:'#54e08a',i:'⚔️'}
  ];
  function show(opts, onReward){
    opts=opts||{};
    /* ---- GERÇEK REKLAM (derlenmiş Android): AdMob ödüllü video ----
       Cihazda NovaAds.isNative() true döner ve gerçek rewarded reklam oynar.
       Reklam tamamlanırsa onReward() çağrılır; aksi halde ödül verilmez.
       Tarayıcı/önizlemede aşağıdaki simüle sponsor kartı yedek olarak çalışır. */
    if(window.NovaAds && NovaAds.isNative()){
      NovaAds.showRewarded(function(ok){ if(ok && onReward) onReward(); });
      return;
    }
    var ov=document.createElement('div'); ov.className='nbAdOverlay';
    var sp=AD_SPONSORS[Math.floor(Math.random()*AD_SPONSORS.length)];
    var dur=opts.dur||5;
    ov.innerHTML=
      '<div class="nbAdFrame" style="--adc:'+sp.c+'">'
       +'<div class="nbAdTag">AD · sponsored</div>'
       +'<div class="nbAdTimer"><span id="nbAdCount">'+dur+'</span></div>'
       +'<button class="nbAdX" id="nbAdSkip" title="Skip" disabled>✕</button>'
       +'<div class="nbAdBody">'
         +'<div class="nbAdIco">'+sp.i+'</div>'
         +'<div class="nbAdName">'+sp.n+'</div>'
         +'<div class="nbAdDesc">'+sp.d+'</div>'
         +'<div class="nbAdStars">★★★★☆ · 4.6</div>'
         +'<div class="nbAdCta">INSTALL</div>'
       +'</div>'
       +'<div class="nbAdReward">Reward: <b>'+(opts.label||'Bonus')+'</b></div>'
      +'</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(()=>ov.classList.add('on'));
    var left=dur, cEl=ov.querySelector('#nbAdCount'), skip=ov.querySelector('#nbAdSkip');
    var iv=setInterval(()=>{
      left--; if(cEl) cEl.textContent=Math.max(0,left);
      if(left<=0){ clearInterval(iv); finish(true); }
    },1000);
    skip.onclick=()=>{ if(left>0) return; };  // sadece bitince
    function finish(ok){
      ov.classList.remove('on');
      setTimeout(()=>ov.remove(),260);
      if(ok && onReward) onReward();
    }
  }

  /* ======================= 1) ÇEVRİMDIŞI ×2 ======================= */
  // offlineModal'a "Watch → ×2" butonu ekle. son kazanç miktarını yakala.
  var lastOffline=0;
  // applyOffline addCredits(gain,false) çağırıyor; miktarı modal metninden okuyamayız
  // güvenle, bu yüzden global yakalama: addCredits sarmalama yerine modalı izle.
  function hookOffline(){
    var modal=document.getElementById('offlineModal'); if(!modal) return;
    var row=modal.querySelector('.mRow'); if(!row) return;
    if(modal.querySelector('#nbOff2x')) return;
    var amtEl=document.getElementById('offlineAmt');
    var btn=document.createElement('button');
    btn.id='nbOff2x'; btn.className='mBtn nbAdBtn';
    btn.innerHTML='<span class="nbAdBtnIco">📺</span> Watch → <b>×2</b>';
    row.insertBefore(btn, row.firstChild);
    btn.onclick=function(){
      // miktarı offlineAmt metninden çöz (+X credits)
      var base=parseOffline(amtEl?amtEl.textContent:'');
      btn.disabled=true;
      show({label:'×2 Offline Gold', dur:5}, function(){
        if(base>0){ giveCredits(base); toastUI('×2 OFFLINE!','+'+fmtN(base)+' bonus credits','gold'); }
        var ok=document.getElementById('offlineOk'); if(ok) ok.click();
      });
    };
  }
  // miktar string'inden sayı çöz (fmt: 1.2M / 340K / 5.0B ...)
  function parseOffline(s){
    if(!s) return 0;
    var m=s.replace(/[+,\s]/g,'').match(/([\d.]+)\s*([a-zA-Z]*)/);
    if(!m) return 0;
    var v=parseFloat(m[1])||0, suf=(m[2]||'').toLowerCase();
    var map={k:1e3,m:1e6,b:1e9,t:1e12,aa:1e15,ab:1e18,ac:1e21,ad:1e24,ae:1e27};
    // fmt uzun ekler kullanıyorsa ilk harf yeterli değil; yaygın olanları dene
    var mul=map[suf]|| (suf.length?Math.pow(10,3*(suf.charCodeAt(0)-96)):1);
    if(suf==='credits'||suf==='') mul=1;
    return Math.floor(v*mul);
  }

  /* ======================= 2) ÜCRETSİZ HEDİYE (yüzen) ======================= */
  var GIFT_COOLDOWN=18*60*1000;   // 18 dk
  function giftReady(){ return now() >= (R.giftAt||0); }
  function buildGift(){
    if(document.getElementById('nbGift')) return;
    var scene=document.getElementById('scene'); if(!scene) return;
    var g=document.createElement('button');
    g.id='nbGift'; g.title='Free Gift — watch a short video';
    g.innerHTML='<span class="nbGiftIco">🎁</span><span class="nbGiftPing"></span><span class="nbGiftLbl">FREE</span>';
    scene.appendChild(g);
    g.onclick=function(){
      if(!giftReady()){ toastUI('Not ready yet','Next free gift in '+giftLeft(),'gold'); return; }
      show({label:'Free Crystal Cache', dur:5}, function(){
        var cr=12+Math.floor(Math.random()*14);          // 12–25 kristal
        var gold=Math.floor(dps()*60*8*(1+Math.random()));// ~8–16 dk DPS değeri
        giveCrystals(cr);
        if(gold>0) giveCredits(gold);
        burstGift();
        toastUI('🎁 GIFT CLAIMED','+'+cr+' 💎  ·  +'+fmtN(gold)+' credits','gold');
        R.giftAt=now()+GIFT_COOLDOWN; save(); refreshGift();
      });
    };
    refreshGift();
    setInterval(refreshGift, 1000);
  }
  function giftLeft(){ var s=Math.max(0,Math.ceil(((R.giftAt||0)-now())/1000)); var m=Math.floor(s/60); return m>0?m+'m':s+'s'; }
  function refreshGift(){
    var g=document.getElementById('nbGift'); if(!g) return;
    var lbl=g.querySelector('.nbGiftLbl');
    if(giftReady()){ g.classList.add('ready'); if(lbl) lbl.textContent='FREE'; }
    else{ g.classList.remove('ready'); if(lbl) lbl.textContent=giftLeft(); }
  }
  function burstGift(){
    var g=document.getElementById('nbGift'); if(!g) return;
    var r=g.getBoundingClientRect(), sc=document.getElementById('scene').getBoundingClientRect();
    for(var i=0;i<14;i++){ (function(k){
      var p=document.createElement('div'); p.className='nbGiftPar';
      p.textContent= k%3===0?'💎':'✦';
      p.style.left=(r.left-sc.left+r.width/2)+'px'; p.style.top=(r.top-sc.top+r.height/2)+'px';
      p.style.setProperty('--gx',((Math.random()-0.5)*120).toFixed(0)+'px');
      p.style.setProperty('--gy',(-40-Math.random()*70).toFixed(0)+'px');
      document.getElementById('scene').appendChild(p);
      setTimeout(()=>p.remove(),950);
    })(i); }
  }

  /* ======================= 3) ×2 ALTIN BOOST (dock) ======================= */
  var BOOST_DUR=8*60*1000, BOOST_CD=22*60*1000;
  function boostActive(){ return now() < (R.boostUntil||0); }
  function boostReady(){ return now() >= (R.boostCdUntil||0); }
  // creditMult() bunu okur:
  window.goldBoostMult=function(){ return boostActive()?2:1; };
  function buildBoost(){
    var dock=document.getElementById('combatDock'); if(!dock) return;
    if(document.getElementById('nbBoostBar')) return;
    var bar=document.createElement('div'); bar.id='nbBoostBar';
    bar.innerHTML='<button id="nbBoostBtn"><span class="bIco">📺</span><span class="bMain"><b>×2 GOLD BOOST</b><i id="nbBoostSub">Watch a short video · 8 min</i></span><span id="nbBoostState">FREE</span></button>';
    dock.insertBefore(bar, dock.firstChild);
    var btn=bar.querySelector('#nbBoostBtn');
    btn.onclick=function(){
      if(boostActive()){ return; }
      if(!boostReady()){ toastUI('Boost on cooldown','Ready in '+msLeft(R.boostCdUntil),'gold'); return; }
      show({label:'×2 Gold · 8 min', dur:5}, function(){
        R.boostUntil=now()+BOOST_DUR; R.boostCdUntil=now()+BOOST_CD; save();
        toastUI('×2 GOLD ACTIVE','All gold doubled for 8 minutes!','gold');
        refreshBoost();
        if(window.updateTopbar) updateTopbar();
      });
    };
    refreshBoost(); setInterval(refreshBoost,1000);
  }
  function msLeft(t){ var s=Math.max(0,Math.ceil((t-now())/1000)); var m=Math.floor(s/60); return m>0?m+'m '+(s%60)+'s':s+'s'; }
  function refreshBoost(){
    var bar=document.getElementById('nbBoostBar'); if(!bar) return;
    var st=bar.querySelector('#nbBoostState'), sub=bar.querySelector('#nbBoostSub'), btn=bar.querySelector('#nbBoostBtn');
    if(boostActive()){ bar.className='active'; st.textContent='×2 '+msLeft(R.boostUntil); sub.textContent='Active — gold doubled'; }
    else if(!boostReady()){ bar.className='cd'; st.textContent=msLeft(R.boostCdUntil); sub.textContent='Recharging…'; }
    else{ bar.className='ready'; st.textContent='FREE'; sub.textContent='Watch a short video · 8 min'; }
  }

  /* ======================= 4) BOSS GANİMETİ ×2 (hook) ======================= */
  // Oyun boss ölümünde NB_AD.offerBossDouble(amount, onGive) çağırabilir.
  function offerBossDouble(amount, onGive){
    show({label:'×2 Boss Loot', dur:5}, function(){ if(onGive) onGive(amount); });
  }

  /* ---------- gold boost'u creditMult'a bağla ---------- */
  // creditMult zaten NB_AD.goldMult() okuyor (HTML'de eklendi)
  function goldMult(){ return boostActive()?2:1; }

  /* ======================= BAŞLAT ======================= */
  function boot(){
    buildGift(); buildBoost();
    // offlineModal her açıldığında butonu garantile
    var modal=document.getElementById('offlineModal');
    if(modal){ var mo=new MutationObserver(()=>{ if(modal.classList.contains('show')) hookOffline(); }); mo.observe(modal,{attributes:true,attributeFilter:['class']}); hookOffline(); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else setTimeout(boot, 60);

  window.NB_AD={ show, goldMult, offerBossDouble,
    forceGiftReady:()=>{ R.giftAt=0; save(); refreshGift(); } };
})();
