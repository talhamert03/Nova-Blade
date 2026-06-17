/* ===========================================================================
   NOVA BLADE · FAZ 2 — Ortak Sanat Kütüphanesi
   Chibi düşman + epik silah SVG'leri için paylaşılan yardımcılar.
   Her builder bir "prefix" alır; tüm gradient/filter id'leri prefix ile
   ad-uzaylanır (aynı sayfada onlarca SVG çakışmasın diye).
   =========================================================================== */
(function(){
  'use strict';

  function rng(seed){ let s=seed%2147483647; if(s<=0)s+=2147483646;
    return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; }; }

  /* lineer dikey gradient (gövde panelleri) */
  function lin(id,a,b,c){
    return '<linearGradient id="'+id+'" x1="0" y1="0" x2=".5" y2="1">'
      +'<stop offset="0" stop-color="'+(c||a)+'"/>'
      +'<stop offset=".5" stop-color="'+a+'"/>'
      +'<stop offset="1" stop-color="'+b+'"/></linearGradient>';
  }
  /* metal: keskin speküler bantlı */
  function metal(id,a,b){ a=a||'#aeb8c6'; b=b||'#2c323d';
    return '<linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1">'
      +'<stop offset="0" stop-color="'+b+'"/><stop offset=".14" stop-color="'+a+'"/>'
      +'<stop offset=".42" stop-color="'+b+'"/><stop offset=".64" stop-color="'+a+'" stop-opacity=".6"/>'
      +'<stop offset="1" stop-color="'+b+'"/></linearGradient>'; }
  /* kumaş / pelerin */
  function cloth(id,a,b){
    return '<linearGradient id="'+id+'" x1=".2" y1="0" x2=".8" y2="1">'
      +'<stop offset="0" stop-color="'+a+'"/><stop offset=".55" stop-color="'+b+'"/>'
      +'<stop offset="1" stop-color="'+b+'"/></linearGradient>'; }
  /* radyal enerji çekirdeği */
  function energy(id,c,core){
    return '<radialGradient id="'+id+'" cx=".5" cy=".5" r=".5">'
      +'<stop offset="0" stop-color="'+(core||'#ffffff')+'"/>'
      +'<stop offset=".35" stop-color="'+c+'"/>'
      +'<stop offset="1" stop-color="'+c+'" stop-opacity="0"/></radialGradient>'; }
  /* yumuşak bloom filtresi */
  function bloom(id,dev){ dev=dev||2.4;
    return '<filter id="'+id+'" x="-80%" y="-80%" width="260%" height="260%">'
      +'<feGaussianBlur stdDeviation="'+dev+'" result="b"/>'
      +'<feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'; }

  /* zemin gölgesi */
  function shadow(cx,cy,rx,op){ return '<ellipse cx="'+cx+'" cy="'+(cy||206)+'" rx="'+(rx||40)+'" ry="'+((rx||40)*0.16)+'" fill="#000" opacity="'+(op||0.42)+'">'
      +'<animate attributeName="rx" values="'+(rx||40)+';'+((rx||40)*0.9).toFixed(1)+';'+(rx||40)+'" dur="2.8s" repeatCount="indefinite"/></ellipse>'; }

  /* idle nefes / sallanma sarmalayıcı (g açar) — kapatmayı unutma: '</g>' */
  function bobOpen(amp,dur){ amp=amp||2.4; dur=dur||2.8;
    return '<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -'+amp+';0 0" dur="'+dur+'s" repeatCount="indefinite" additive="sum"/>'; }

  /* parlayan göz */
  function eye(cx,cy,r,col,p,dur){
    return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*2.1)+'" fill="url(#'+p+'eg)"/>'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+col+'">'
      +'<animate attributeName="opacity" values="1;.45;1" dur="'+(dur||1.6)+'s" repeatCount="indefinite"/></circle>'
      +'<circle cx="'+(cx-r*0.3)+'" cy="'+(cy-r*0.3)+'" r="'+(r*0.32)+'" fill="#fff" opacity=".9"/>'; }

  /* yükselen kıvılcım/parçacık alanı (id tekil olmalı) */
  function rise(id,seed,n,x0,x1,y0,y1,col,rad,dur){
    const r=rng(seed); let dots='';
    for(let i=0;i<n;i++){
      const x=(x0+r()*(x1-x0)).toFixed(1), y=(y0+r()*(y1-y0)).toFixed(1);
      const d=(dur*(0.7+r()*0.6)).toFixed(1), rr=(rad*(0.5+r())).toFixed(2);
      dots+='<circle cx="'+x+'" cy="'+y+'" r="'+rr+'" fill="'+col+'">'
        +'<animate attributeName="cy" values="'+y+';'+(parseFloat(y)-46-r()*30).toFixed(1)+'" dur="'+d+'s" repeatCount="indefinite"/>'
        +'<animate attributeName="opacity" values="0;'+(0.5+r()*0.5).toFixed(2)+';0" dur="'+d+'s" repeatCount="indefinite"/></circle>';
    }
    return '<g>'+dots+'</g>';
  }

  window.NB2 = {
    rng, lin, metal, cloth, energy, bloom, shadow, bobOpen, eye, rise,
    /* her builder'ın başında çağrılacak ortak defs paketi */
    defs(p, pal){
      return '<defs>'
        + metal(p+'mt', pal.metalA||'#9aa6b6', pal.metalB||'#2a303b')
        + lin(p+'bd', pal.mid, pal.dark, pal.light)
        + cloth(p+'cl', pal.cloak||pal.mid, pal.dark)
        + energy(p+'eg', pal.glow, '#ffffff')
        + bloom(p+'bl', 2.2)
        + '</defs>';
    }
  };
})();
