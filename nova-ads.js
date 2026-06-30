/* ============================================================
   NOVA BLADE — AdMob ödüllü reklam motoru
   ------------------------------------------------------------
   • Gerçek cihaz (derlenmiş Android APK/AAB): @capacitor-community/admob
     eklentisi üzerinden GERÇEK ödüllü reklam oynatır.
   • Tarayıcı / önizleme: eklenti yoksa tematik bir "mock" reklam
     gösterir ve ödülü verir — böylece akışı burada test edebilirsin.

   Kullanım:
     NovaAds.showRewarded(function(ok){ if(ok){ ...ödül ver... } });
   ============================================================ */
(function(){
  'use strict';

  // ---- AdMob KİMLİKLERİ (Google AdMob panelinden) ----
  var APP_ID      = 'ca-app-pub-1770141144744598~5788944496';   // Uygulama kimliği (AndroidManifest'e yazılır)
  var REWARDED_ID = 'ca-app-pub-1770141144744598/1382795623';    // Ödüllü reklam birimi (x2 Gold + Free Crystal)

  // Geliştirme/test sırasında Google'ın resmî TEST reklam birimini kullan.
  // Mağazaya çıkmadan önce false yap! (Kendi reklamına tıklamak hesabı askıya aldırabilir.)
  // YAYIN: Google Play'e çıkıyoruz → GERÇEK reklamlar aktif.
  var TEST_MODE = false;
  var TEST_REWARDED = 'ca-app-pub-3940256099942544/5224354917'; // Google resmî test ödüllü birimi

  function adUnit(){ return TEST_MODE ? TEST_REWARDED : REWARDED_ID; }

  // Capacitor + AdMob eklentisi var mı?
  function plugin(){
    try{
      if(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform()
         && Capacitor.Plugins && Capacitor.Plugins.AdMob){
        return Capacitor.Plugins.AdMob;
      }
    }catch(e){}
    return null;
  }

  var initDone = false;
  function ensureInit(AdMob){
    if(initDone) return Promise.resolve();
    return AdMob.initialize({ initializeForTesting: TEST_MODE }).then(function(){ initDone = true; });
  }

  /* ---------------- GERÇEK reklam (native) ---------------- */
  function showNative(AdMob, cb){
    var rewarded = false, settled = false;
    var subs = [];
    function cleanup(){ subs.forEach(function(h){ try{ h.remove && h.remove(); }catch(e){} }); subs = []; }
    function finish(ok){ if(settled) return; settled = true; cleanup(); cb(!!ok); }

    function on(ev, fn){ try{ var h = AdMob.addListener(ev, fn); subs.push(h && h.then ? null : h); if(h&&h.then) h.then(function(x){subs.push(x);}); }catch(e){} }

    on('onRewardedVideoAdReward', function(){ rewarded = true; });
    on('onRewardedVideoAdDismissed', function(){ finish(rewarded); });
    on('onRewardedVideoAdFailedToShow', function(){ finish(false); });
    on('onRewardedVideoAdFailedToLoad', function(){ finish(false); });

    ensureInit(AdMob)
      .then(function(){ return AdMob.prepareRewardVideoAd({ adId: adUnit() }); })
      .then(function(){ return AdMob.showRewardVideoAd(); })
      .catch(function(){ finish(false); });

    // güvenlik: 45 sn sonra bağı kopar
    setTimeout(function(){ if(!settled) finish(rewarded); }, 45000);
  }

  /* ---------------- MOCK reklam (tarayıcı önizleme) ---------------- */
  function showMock(cb){
    if(document.getElementById('nbAdMock')) return;
    var SEC = 5;
    var ov = document.createElement('div');
    ov.id = 'nbAdMock';
    ov.innerHTML =
      '<div class="nbAdCard">' +
        '<div class="nbAdTag">Ad · preview</div>' +
        '<div class="nbAdGlow"></div>' +
        '<div class="nbAdBlade"><span></span></div>' +
        '<div class="nbAdTitle">NOVA BLADE</div>' +
        '<div class="nbAdPitch">Rewarded ad placeholder</div>' +
        '<div class="nbAdNote">Real AdMob video plays here in the Android app</div>' +
        '<button class="nbAdSkip" id="nbAdSkip" disabled>Reward in <b>'+SEC+'</b>s</button>' +
      '</div>';
    document.body.appendChild(ov);
    if(!document.getElementById('nbAdMockCSS')){
      var st = document.createElement('style'); st.id='nbAdMockCSS';
      st.textContent =
      '#nbAdMock{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;'+
      'background:rgba(4,5,12,.86);backdrop-filter:blur(4px);animation:nbAdIn .25s ease}'+
      '@keyframes nbAdIn{from{opacity:0}to{opacity:1}}'+
      '.nbAdCard{position:relative;width:min(82vw,300px);padding:30px 24px 22px;border-radius:20px;text-align:center;overflow:hidden;'+
      'background:radial-gradient(120% 90% at 50% 18%,#23234f,#11112e 55%,#07070f);border:1px solid rgba(255,181,71,.3);box-shadow:0 24px 60px rgba(0,0,0,.6)}'+
      '.nbAdTag{position:absolute;top:10px;left:10px;font:700 9px/1 ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase;color:#0a0a1a;background:#FFB547;padding:4px 7px;border-radius:5px}'+
      '.nbAdGlow{position:absolute;top:34%;left:50%;width:160px;height:240px;transform:translate(-50%,-50%);pointer-events:none;background:radial-gradient(50% 50% at 50% 50%,rgba(77,184,255,.45),transparent 70%);filter:blur(10px);animation:nbAdGlow 2s ease-in-out infinite}'+
      '@keyframes nbAdGlow{0%,100%{opacity:.5}50%{opacity:1}}'+
      '.nbAdBlade{position:relative;margin:6px auto 14px;width:10px;height:96px}'+
      '.nbAdBlade span{display:block;width:10px;height:96px;border-radius:6px;margin:0 auto;background:linear-gradient(180deg,#eaf6ff,#9fd9ff 45%,#4db8ff);box-shadow:0 0 20px 5px rgba(77,184,255,.6)}'+
      '.nbAdTitle{font-family:Orbitron,ui-monospace,sans-serif;font-weight:900;letter-spacing:.08em;font-size:24px;background:linear-gradient(180deg,#fff,#ffd28a 55%,#FFB547);-webkit-background-clip:text;background-clip:text;color:transparent}'+
      '.nbAdPitch{margin-top:6px;color:#35e0d2;font:600 12px/1.3 ui-monospace,monospace;letter-spacing:.06em}'+
      '.nbAdNote{margin-top:10px;color:#9aa2c4;font:400 11px/1.4 -apple-system,system-ui,sans-serif}'+
      '.nbAdSkip{margin-top:18px;width:100%;padding:12px;border:none;border-radius:11px;cursor:pointer;'+
      'font:800 14px/1 -apple-system,system-ui,sans-serif;color:#0a0a1a;background:linear-gradient(90deg,#FFB547,#ffd28a);opacity:.5}'+
      '.nbAdSkip:not(:disabled){opacity:1}'+
      '.nbAdSkip b{font-variant-numeric:tabular-nums}';
      document.head.appendChild(st);
    }
    var left = SEC, btn = document.getElementById('nbAdSkip');
    var iv = setInterval(function(){
      left--;
      if(left > 0){ btn.innerHTML = 'Reward in <b>'+left+'</b>s'; }
      else {
        clearInterval(iv);
        btn.disabled = false;
        btn.textContent = 'Claim reward ✓';
        btn.onclick = function(){ ov.remove(); cb(true); };
      }
    }, 1000);
  }

  /* ---------------- Genel API ---------------- */
  var NovaAds = {
    appId: APP_ID,
    rewardedId: REWARDED_ID,
    isNative: function(){ return !!plugin(); },
    // cb(success:boolean) — success true ise ödül verilmeli
    showRewarded: function(cb){
      cb = cb || function(){};
      var AdMob = plugin();
      if(AdMob){ showNative(AdMob, cb); }
      else { showMock(cb); }
    }
  };
  window.NovaAds = NovaAds;

  // Native platformda erken init (reklam ilk seferde hızlı açılsın)
  document.addEventListener('DOMContentLoaded', function(){
    var AdMob = plugin();
    if(AdMob){ ensureInit(AdMob).catch(function(){}); }
  });
})();
