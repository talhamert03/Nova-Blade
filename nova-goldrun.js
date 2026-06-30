/* ============================================================================
   NOVA BLADE · GOLD RUN — arada bir sahnenin üstünden geçen kargo dronu bir
   altın sandığı taşır. Oyuncu tıklarsa sandık düşer, yere çarpıp parçalanır ve
   altınlar saçılıp gold sayacına uçar. (Mobil idle "tap the flying bonus" hazzı.)
   ========================================================================== */
(function(){
  'use strict';
  var MIN=48000, MAX=92000;   // 48–92 sn arası spawn
  var sceneEl=null, timer=null;

  function scene(){ return sceneEl || (sceneEl=document.getElementById('scene')); }
  function busy(){ return document.body.classList.contains('spaceMode') || document.body.classList.contains('worldBoss'); }
  function dps(){ try{ return window.totalDps?totalDps():0; }catch(e){ return 0; } }
  function fmtN(n){ return window.fmt?fmt(n):Math.round(n); }
  function give(n){ if(window.addCredits) addCredits(n, false); }

  /* kargo dronu + altın sandığı SVG */
  function runnerSVG(){
    return '<svg viewBox="0 0 90 70" width="100%" height="100%">'
      // drone gövde + pervaneler
      +'<g class="grDrone">'
      +'<ellipse cx="45" cy="14" rx="22" ry="5.5" fill="#2a3142" stroke="#161b26" stroke-width="1.4"/>'
      +'<rect x="40" y="11" width="10" height="7" rx="2" fill="#3a4456"/>'
      +'<circle cx="24" cy="13" r="2.4" fill="#9fb4d6"/><circle cx="66" cy="13" r="2.4" fill="#9fb4d6"/>'
      +'<ellipse cx="24" cy="9" rx="11" ry="2.4" fill="#6c84ad" opacity=".55"><animate attributeName="rx" values="11;5;11" dur=".12s" repeatCount="indefinite"/></ellipse>'
      +'<ellipse cx="66" cy="9" rx="11" ry="2.4" fill="#6c84ad" opacity=".55"><animate attributeName="rx" values="11;5;11" dur=".12s" repeatCount="indefinite"/></ellipse>'
      +'<path d="M30 18 L34 30 M60 18 L56 30" stroke="#161b26" stroke-width="2"/>'
      +'</g>'
      // altın sandık (sallanan)
      +'<g class="grChest">'
      +'<rect x="30" y="34" width="30" height="22" rx="3" fill="#7a4a1c" stroke="#3a2410" stroke-width="1.6"/>'
      +'<path d="M30 40 Q45 30 60 40 L60 42 L30 42 Z" fill="#8a5a24" stroke="#3a2410" stroke-width="1.4"/>'
      +'<rect x="29" y="42" width="32" height="4" fill="#caa050"/>'
      +'<rect x="42" y="40" width="6" height="11" rx="1.4" fill="#ffe18a" stroke="#3a2410" stroke-width="1"/>'
      +'<circle cx="45" cy="45" r="2" fill="#3a2410"/>'
      +'<rect x="33" y="47" width="24" height="2" fill="#5a3614"/>'
      // taşan altın parıltısı
      +'<circle cx="36" cy="35" r="1.6" fill="#ffe6a0"><animate attributeName="opacity" values="1;.3;1" dur="1.1s" repeatCount="indefinite"/></circle>'
      +'<circle cx="54" cy="35" r="1.6" fill="#ffe6a0"><animate attributeName="opacity" values="1;.3;1" dur="1.3s" repeatCount="indefinite"/></circle>'
      +'</g>'
      +'</svg>';
  }

  function spawn(){
    if(busy()){ schedule(); return; }
    var sc=scene(); if(!sc){ schedule(); return; }
    if(document.getElementById('goldRunner')){ schedule(); return; }
    var dir = Math.random()<0.5 ? 1 : -1;   // 1: soldan sağa
    var el=document.createElement('button');
    el.id='goldRunner'; el.className='grFly'; el.title='Tap the cargo drone!';
    el.style.setProperty('--dir', dir);
    el.innerHTML='<span class="grGlow"></span>'+runnerSVG()+'<span class="grHint">TAP!</span>';
    el.style.left = dir>0 ? '-90px' : '100%';
    sc.appendChild(el);
    // yörünge
    var travel = 7000;
    el.style.animation='grTravel'+(dir>0?'R':'L')+' '+travel+'ms linear forwards';
    var done=false;
    el.addEventListener('animationend', function(e){ if(e.animationName.indexOf('grTravel')===0 && !done){ cleanup(el); schedule(); } });
    el.addEventListener('click', function(ev){
      ev.stopPropagation();
      if(done) return; done=true;
      drop(el);
      schedule();
    });
  }

  // sandığı düşür → parçala → altın saç
  function drop(el){
    var sc=scene(); var r=el.getBoundingClientRect(), sr=sc.getBoundingClientRect();
    var x=r.left-sr.left+r.width/2, y=r.top-sr.top+r.height/2;
    // dronu uçur, sandığı düşür
    el.style.animation='none';
    el.classList.add('grTapped');
    // düşen sandık
    var chest=document.createElement('div'); chest.className='grChestFall';
    chest.style.left=x+'px'; chest.style.top=y+'px';
    chest.innerHTML='<svg viewBox="0 0 60 50" width="54" height="45">'
      +'<rect x="6" y="14" width="48" height="32" rx="4" fill="#7a4a1c" stroke="#3a2410" stroke-width="2.2"/>'
      +'<path d="M6 22 Q30 8 54 22 L54 25 L6 25 Z" fill="#8a5a24" stroke="#3a2410" stroke-width="2"/>'
      +'<rect x="4" y="24" width="52" height="6" fill="#caa050"/>'
      +'<rect x="25" y="22" width="10" height="16" rx="2" fill="#ffe18a" stroke="#3a2410" stroke-width="1.4"/>'
      +'<circle cx="30" cy="29" r="3" fill="#3a2410"/></svg>';
    sc.appendChild(chest);
    setTimeout(()=>cleanup(el), 220);
    // yere çarpınca patla
    var groundY = sr.height*0.78;
    chest.style.setProperty('--fall', (groundY - y)+'px');
    setTimeout(function(){ shatter(sc, x, groundY); chest.remove(); }, 480);
  }

  function shatter(sc, x, y){
    // patlama flaşı
    var fl=document.createElement('div'); fl.className='grBurst'; fl.style.left=x+'px'; fl.style.top=y+'px';
    sc.appendChild(fl); setTimeout(()=>fl.remove(),460);
    // tahta parçaları
    for(var i=0;i<8;i++){ (function(){
      var d=document.createElement('div'); d.className='grSplinter';
      d.style.left=x+'px'; d.style.top=y+'px';
      d.style.setProperty('--sx',((Math.random()-0.5)*160).toFixed(0)+'px');
      d.style.setProperty('--sy',(-30-Math.random()*60).toFixed(0)+'px');
      sc.appendChild(d); setTimeout(()=>d.remove(),720);
    })(); }
    // altın hesapla
    var gold = Math.max(800, Math.floor(dps()*40));   // v7: dengelendi (~40 sn DPS, eski 120sn)
    give(gold);
    if(window.toast) toast('💰 GOLD CHEST!','+'+fmtN(gold)+' credits','gold');
    if(navigator.vibrate) try{ navigator.vibrate(30); }catch(e){}
    // altın sayaca uçan paralar
    var goldIco=document.querySelector('#topbar .resource .ico') || document.getElementById('topbar');
    var gr = goldIco ? goldIco.getBoundingClientRect() : {left:20,top:10,width:16,height:16};
    var sr=sc.getBoundingClientRect();
    var tx=gr.left-sr.left+gr.width/2, ty=gr.top-sr.top+gr.height/2;
    for(var c=0;c<14;c++){ (function(k){
      var co=document.createElement('div'); co.className='grCoin';
      var sxp=x+(Math.random()-0.5)*70, syp=y+(Math.random()-0.5)*30;
      co.style.left=sxp+'px'; co.style.top=syp+'px';
      sc.appendChild(co);
      // önce saçıl, sonra sayaca uç
      requestAnimationFrame(function(){
        co.style.transition='left .5s cubic-bezier(.4,.0,.7,1) '+(k*22)+'ms, top .5s cubic-bezier(.4,.0,.7,1) '+(k*22)+'ms, opacity .2s '+(380+k*22)+'ms';
        co.style.left=tx+'px'; co.style.top=ty+'px'; co.style.opacity='0';
      });
      setTimeout(()=>co.remove(), 700+k*22);
    })(c); }
  }

  function cleanup(el){ if(el&&el.parentNode) el.remove(); }

  function schedule(){ clearTimeout(timer); timer=setTimeout(spawn, MIN+Math.random()*(MAX-MIN)); }

  function boot(){
    if(!scene()){ setTimeout(boot,400); return; }
    // ilk sandık nispeten erken (oyuncuya mekaniği tanıt)
    clearTimeout(timer); timer=setTimeout(spawn, 22000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else setTimeout(boot, 120);

  window.NB_GOLDRUN={ spawnNow:()=>{ clearTimeout(timer); spawn(); } };
})();
