/* =============================================================================
   NOVA BLADE · SKILL TREE (Tap Titans 2 tarzı ana karakter yetenek ağacı)
   - Her kahraman level'ında +1 Skill Point (tek havuz, iki ağaca harcanır).
   - İKİ AYRI AĞAÇ: Saber (yakın dövüş) ve Blaster (menzilli). Bir ağacın
     bonusları SADECE o sınıf aktifken uygulanır → gerçek class kimliği.
   - Tier kilidi: bir ağaçta yeterli puan harcayınca üst tier açılır.
   - Bonuslar artifactBonus/artifactFlat kancalarına eklenir; core formülü AYNI.
   - Puanlar kalıcı (respec yok); yanlış tıklamaya karşı onay sorulur.
   ============================================================================= */
(function(){
  const TIER_REQ=[0,4,10,20];   // tier'ı açmak için o ağaçta harcanmış puan
  const ICON={ tapDmg:'⚔', autoDmg:'🌀', goldMult:'💰', critChance:'🎯', critMult:'💥', allDmg:'☄', allyDmg:'🤝', forceXp:'✦' };
  const SLBL={ tapDmg:'Tap Damage', autoDmg:'Auto Damage', goldMult:'Gold', critChance:'Crit Chance', critMult:'Crit Power', allDmg:'All Damage', allyDmg:'Squad Damage', forceXp:'Force XP' };

  // n: ad · s: stat · m:'mult'|'flat' · per · max · t: tier(0-3)
  const TREES = {
    saber: { name:'Saber Tree', cls:'saber', accent:'#7fd6ff', icon:'🗡',
      nodes:[
        {id:'s_focus', n:'Blade Focus',      s:'tapDmg',    m:'mult', per:0.04, max:5, t:0},
        {id:'s_edge',  n:'Honed Edge',       s:'critChance',m:'flat', per:0.6,  max:5, t:0},
        {id:'s_mom',   n:'Momentum',         s:'autoDmg',   m:'mult', per:0.05, max:5, t:1},
        {id:'s_deep',  n:'Deep Cut',         s:'critMult',  m:'mult', per:0.05, max:5, t:1},
        {id:'s_spoil', n:'War Spoils',       s:'goldMult',  m:'mult', per:0.06, max:5, t:2},
        {id:'s_trance',n:'Battle Trance',    s:'allDmg',    m:'mult', per:0.03, max:6, t:2},
        {id:'s_master',n:'Saber Master',     s:'allDmg',    m:'mult', per:0.05, max:8, t:3, cap:true},
        {id:'s_aura',  n:'Command Aura',     s:'allyDmg',   m:'mult', per:0.06, max:5, t:3}
      ]},
    blaster: { name:'Blaster Tree', cls:'blaster', accent:'#ff9a4a', icon:'🔫',
      nodes:[
        {id:'b_mark',  n:'Marksman',         s:'tapDmg',    m:'mult', per:0.04, max:5, t:0},
        {id:'b_aim',   n:'Steady Aim',       s:'critChance',m:'flat', per:0.6,  max:5, t:0},
        {id:'b_over',  n:'Overload',         s:'autoDmg',   m:'mult', per:0.05, max:5, t:1},
        {id:'b_pierce',n:'Piercing Round',   s:'allDmg',    m:'mult', per:0.03, max:5, t:1},
        {id:'b_bounty',n:'Bounty Hunter',    s:'goldMult',  m:'mult', per:0.06, max:5, t:2},
        {id:'b_optics',n:'Precision Optics', s:'critMult',  m:'mult', per:0.05, max:5, t:2},
        {id:'b_arsenal',n:'Galactic Arsenal',s:'allDmg',m:'mult', per:0.05, max:8, t:3, cap:true},
        {id:'b_comms', n:'Force Comms',      s:'forceXp',   m:'mult', per:0.06, max:5, t:3}
      ]}
  };
  const NODE_BY_ID={}; Object.values(TREES).forEach(t=>t.nodes.forEach(n=>{NODE_BY_ID[n.id]=n; n.tree=t.cls;}));

  function ensure(){
    if(!S.tree||typeof S.tree!=='object') S.tree={saber:{},blaster:{}};
    if(!S.tree.saber) S.tree.saber={};
    if(!S.tree.blaster) S.tree.blaster={};
    return S.tree;
  }
  function lvlOf(id){ const n=NODE_BY_ID[id]; if(!n) return 0; return (S.tree[n.tree][id])||0; }
  function spentIn(cls){ let s=0; TREES[cls].nodes.forEach(n=>s+=lvlOf(n.id)); return s; }
  function spentTotal(){ return spentIn('saber')+spentIn('blaster'); }
  function earned(){ return Math.floor((S.heroLevel||1)/8); }   // ~8 level = 1 puan (daha zor kazanılır)
  function available(){ return Math.max(0, earned()-spentTotal()); }
  function tierUnlocked(cls,t){ return spentIn(cls)>=TIER_REQ[t]; }

  /* ===================== BONUS KANCALARI (aktif sınıfın ağacı) ===================== */
  function activeCls(){ return S.cls==='blaster'?'blaster':'saber'; }
  function treeMult(stat){
    let add=0; const cls=activeCls();
    TREES[cls].nodes.forEach(n=>{ if(n.m==='mult'&&n.s===stat){ const l=lvlOf(n.id); if(l>0) add+=l*n.per; } });
    return 1+add;
  }
  function treeFlat(stat){
    let add=0; const cls=activeCls();
    TREES[cls].nodes.forEach(n=>{ if(n.m==='flat'&&n.s===stat){ const l=lvlOf(n.id); if(l>0) add+=l*n.per; } });
    return add;
  }
  function wrap(){
    if(window.__treeWrapped) return; window.__treeWrapped=true;
    const _ab=window.artifactBonus, _af=window.artifactFlat;
    window.artifactBonus=function(s){ return (typeof _ab==='function'?_ab(s):1)*treeMult(s); };
    window.artifactFlat =function(s){ return (typeof _af==='function'?_af(s):0)+treeFlat(s); };
  }

  /* ===================== SATIN ALMA ===================== */
  function bonusText(n,l){
    if(n.m==='mult') return '+'+Math.round(l*n.per*100)+'% '+SLBL[n.s];
    if(n.s==='critChance') return '+'+(l*n.per).toFixed(1)+'% '+SLBL[n.s];
    return '+'+(l*n.per).toFixed(2)+' '+SLBL[n.s];
  }
  function buyNode(id){
    const n=NODE_BY_ID[id]; if(!n) return;
    const l=lvlOf(id); if(l>=n.max) return;
    if(!tierUnlocked(n.tree,n.t)) return;
    if(available()<=0) return;
    S.tree[n.tree][id]=l+1;
    try{ sfx.skill&&sfx.skill(); }catch(e){}
    try{ if(typeof fullRefresh==='function') fullRefresh(); }catch(e){}
    try{ if(typeof doAutosave==='function') doAutosave(); }catch(e){}
    updateBadge();
    renderPanel();
  }
  function confirmBuy(id){
    const n=NODE_BY_ID[id]; if(!n) return; const l=lvlOf(id);
    const ov=document.createElement('div'); ov.id='treeConfirm'; ov.className='petOv';
    ov.innerHTML='<div class="petOvCard">'
      +'<div class="petOvIco">'+ICON[n.s]+'</div>'
      +'<h3>'+n.n+' · Lv '+l+'→'+(l+1)+'</h3>'
      +'<p>Spends 1 Skill Point. <b>This is permanent</b> (cannot be undone).<br><span style="color:var(--cyan)">'+bonusText(n,l+1)+'</span></p>'
      +'<div class="petOvBtns"><button class="petBtn ghost" data-x>Cancel</button><button class="petBtn buy" data-ok>Upgrade</button></div>'
      +'</div>';
    document.body.appendChild(ov); requestAnimationFrame(()=>ov.classList.add('show'));
    const close=()=>{ ov.classList.remove('show'); setTimeout(()=>ov.remove(),200); };
    ov.querySelector('[data-x]').onclick=close;
    ov.addEventListener('click',e=>{ if(e.target===ov) close(); });
    ov.querySelector('[data-ok]').onclick=()=>{ close(); buyNode(id); };
  }

  /* ===================== PANEL ===================== */
  window.skillTreePanelHtml=function(){
    ensure();
    const view = (window.treeView==='blaster'||window.treeView==='saber')?window.treeView:activeCls();
    const T=TREES[view], avail=available();
    let h='';
    // başlık
    h+='<div class="stHead">'
      +'<div class="stPts"><span class="stPtsNum">'+avail+'</span><span class="stPtsLbl">SKILL POINT</span></div>'
      +'<div class="stEarn">Total earned <b>'+earned()+'</b> · Spent <b>'+spentTotal()+'</b><br><span class="stHint">+1 point per hero level</span></div>'
      +'</div>';
    // ağaç seçimi
    h+='<div class="subNav clsSub">'
      +'<button class="subBtn'+(view==='saber'?' on':'')+'" data-act="treeView" data-ssub="saber">🗡 Saber Tree</button>'
      +'<button class="subBtn'+(view==='blaster'?' on':'')+'" data-act="treeView" data-ssub="blaster">🔫 Blaster Tree</button>'
      +'</div>';
    // aktiflik notu
    const isActive=(view===activeCls());
    h+='<div class="stActiveNote'+(isActive?' on':'')+'">'+(isActive
        ? '✓ This tree is <b>currently active</b> — its bonuses apply ('+(view==='saber'?'Saber':'Blaster')+' class).'
        : '⚠ This tree\'s bonuses only apply while the <b>'+(view==='saber'?'Saber':'Blaster')+' class</b> is active. Equip a '+(view==='saber'?'sword':'blaster')+'.')
      +'</div>';
    // tier'lar
    for(let t=0;t<4;t++){
      const unlocked=tierUnlocked(view,t);
      h+='<div class="stTier'+(unlocked?'':' locked')+'" style="--ac:'+T.accent+'">'
        +'<div class="stTierHd"><span>Tier '+(t+1)+'</span>'+(unlocked?'':'<span class="stTierLock">🔒 '+TIER_REQ[t]+' pts required (in this tree: '+spentIn(view)+')</span>')+'</div>'
        +'<div class="stNodes">';
      T.nodes.filter(n=>n.t===t).forEach(n=>{
        const l=lvlOf(n.id), maxed=l>=n.max;
        const canBuy=unlocked && !maxed && avail>0;
        h+='<div class="stNode'+(l>0?' owned':'')+(n.cap?' cap':'')+(maxed?' maxed':'')+'" style="--ac:'+T.accent+'">'
          +'<div class="stNodeTop"><span class="stNodeIco">'+ICON[n.s]+'</span><span class="stNodeLvl">'+l+'<small>/'+n.max+'</small></span></div>'
          +'<div class="stNodeName">'+n.n+(n.cap?' <span class="stCap">★</span>':'')+'</div>'
          +'<div class="stNodeStat">'+SLBL[n.s]+'</div>'
          +'<div class="stNodeBonus">'+(l>0?bonusText(n,l):'—')+(maxed?'':'<span class="stNext"> → '+bonusText(n,l+1)+'</span>')+'</div>'
          +(maxed
            ? '<div class="stNodeBtn maxed">★ MAX</div>'
            : '<button class="stNodeBtn'+(canBuy?'':' dim')+'" data-act="treeBuy" data-id="'+n.id+'"'+(canBuy?'':' disabled')+'>'+(unlocked?(avail>0?'+1 ✦':'No points'):'Locked')+'</button>')
          +'</div>';
      });
      h+='</div></div>';
    }
    return h;
  };

  /* ===================== NAV ROZETİ (kullanılabilir puan) ===================== */
  function updateBadge(){
    const tab=document.querySelector('.tab[data-tab="skills"]'); if(!tab) return;
    let b=tab.querySelector('.tabBadge');
    const a=available();
    if(a>0){ if(!b){ b=document.createElement('span'); b.className='tabBadge'; tab.appendChild(b); } b.textContent=a>99?'99+':a; }
    else if(b) b.remove();
  }

  /* ===================== ENTEGRASYON ===================== */
  function ready(){
    if(typeof S==='undefined' || typeof fmt!=='function' || typeof window.artifactBonus!=='function'){ return setTimeout(ready,200); }
    ensure(); wrap();
    const panel=document.getElementById('panel');
    if(panel){
      panel.addEventListener('click',function(e){
        const btn=e.target.closest('[data-act]'); if(!btn) return;
        const act=btn.dataset.act;
        if(act==='treeView'){ window.treeView=btn.dataset.ssub; renderPanel(); }
        else if(act==='treeBuy'){ if(!btn.disabled) buyNode(btn.dataset.id); }
      });
    }
    updateBadge();
    setInterval(updateBadge, 1500);
    window.NB_TREE={ trees:TREES, panel:window.skillTreePanelHtml, available:available };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ready);
  else ready();
})();
