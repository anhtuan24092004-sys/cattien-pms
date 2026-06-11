/* ═══════════════════════════════════════
   CAT TIEN JUNGLE LODGE — PMS v2
   app.js — full application logic
═══════════════════════════════════════ */

// ─── ROOM TYPES & ROOMS ───────────────────────────────
const DEFAULT_RT = [
  {id:'cozy-deluxe',  name:'Cozy Deluxe',  color:'#7b5e3a'},
  {id:'deluxe',       name:'Deluxe',        color:'#5c8a40'},
  {id:'super-deluxe', name:'Super Deluxe',  color:'#2a6880'},
  {id:'suite',        name:'Suite',         color:'#1e4d2b'},
  {id:'villa',        name:'Villa',         color:'#8b3a1e'},
];

const DEFAULT_ROOMS = [
  {id:'D1', type:'Cozy Deluxe',  zone:'Cozy Deluxe',  view:'Window, Shared bathroom',        pax:2,  size:'12m²',  status:'active'},
  {id:'D2', type:'Deluxe',       zone:'Deluxe',        view:'Window, Shared bathroom',        pax:4,  size:'20m²',  status:'active'},
  {id:'D3', type:'Deluxe',       zone:'Deluxe',        view:'Window, Shared bathroom',        pax:4,  size:'20m²',  status:'active'},
  {id:'D4', type:'Deluxe',       zone:'Deluxe',        view:'Shared bathroom, Bunk beds',     pax:5,  size:'35m²',  status:'active'},
  {id:'D5', type:'Deluxe',       zone:'Deluxe',        view:'Window',                         pax:2,  size:'20m²',  status:'active'},
  {id:'D6', type:'Deluxe',       zone:'Deluxe',        view:'Window',                         pax:2,  size:'20m²',  status:'active'},
  {id:'D7', type:'Deluxe',       zone:'Deluxe',        view:'Window',                         pax:2,  size:'20m²',  status:'active'},
  {id:'S1', type:'Super Deluxe', zone:'Super Deluxe',  view:'Balcony, Garden view',           pax:2,  size:'40m²',  status:'active'},
  {id:'S2', type:'Super Deluxe', zone:'Super Deluxe',  view:'Balcony, Garden view',           pax:2,  size:'40m²',  status:'active'},
  {id:'ST1',type:'Suite',        zone:'Suite',          view:'Balcony, Garden view',           pax:2,  size:'50m²',  status:'active'},
  {id:'ST2',type:'Suite',        zone:'Suite',          view:'Balcony, Garden view',           pax:2,  size:'50m²',  status:'active'},
  {id:'ST3',type:'Suite',        zone:'Suite',          view:'Balcony, Garden view',           pax:2,  size:'50m²',  status:'active'},
  {id:'ST4',type:'Suite',        zone:'Suite',          view:'Balcony, Garden view',           pax:2,  size:'50m²',  status:'active'},
  {id:'ST5',type:'Suite',        zone:'Suite',          view:'Balcony, Garden view',           pax:2,  size:'50m²',  status:'active'},
  {id:'ST6',type:'Suite',        zone:'Suite',          view:'Balcony, Garden view',           pax:2,  size:'50m²',  status:'active'},
  {id:'ST7',type:'Suite',        zone:'Suite',          view:'Balcony, Garden view',           pax:2,  size:'50m²',  status:'active'},
  {id:'V1', type:'Villa',        zone:'Villa',          view:'Riverview, 1 double + 1 single', pax:3,  size:'50m²',  status:'active'},
  {id:'V2', type:'Villa',        zone:'Villa',          view:'Riverview, 2 double beds',       pax:4,  size:'70m²',  status:'active'},
  {id:'V3', type:'Villa',        zone:'Villa',          view:'Riverview, 2 double + 4 single', pax:8,  size:'56m²',  status:'active'},
  {id:'V4', type:'Villa',        zone:'Villa',          view:'Riverview, 1 double + 2 single', pax:4,  size:'96m²',  status:'active'},
  {id:'V5', type:'Villa',        zone:'Villa',          view:'Riverview, 1 double + 16 single',pax:18, size:'120m²', status:'active'},
];

// ─── STATE ────────────────────────────────────────────
let bookings = [
  {id:'BK-001',checkin:'2024-06-01',checkout:'2024-06-04',guest:'Nguyễn Văn A',nation:'Vietnam',pax:2,room:'V1',roomType:'Villa',source:'Direct',roomPrice:3000000,fnb:500000,service:200000,paid:'paid',remains:0,notes:''},
  {id:'BK-002',checkin:'2024-06-02',checkout:'2024-06-05',guest:'John Smith',nation:'USA',pax:2,room:'S1',roomType:'Super Deluxe',source:'Booking.com',roomPrice:2340000,fnb:500000,service:200000,paid:'partial',remains:500000,notes:''},
  {id:'BK-003',checkin:'2024-06-03',checkout:'2024-06-06',guest:'Tanaka Hiroshi',nation:'Japan',pax:2,room:'ST3',roomType:'Suite',source:'Agoda',roomPrice:2750000,fnb:400000,service:150000,paid:'unpaid',remains:3300000,notes:'Late check-in'},
  {id:'BK-004',checkin:'2024-06-04',checkout:'2024-06-07',guest:'Marie Dupont',nation:'France',pax:2,room:'D5',roomType:'Deluxe',source:'Expedia',roomPrice:2000000,fnb:300000,service:100000,paid:'paid',remains:0,notes:''},
  {id:'BK-005',checkin:'2024-06-05',checkout:'2024-06-08',guest:'Li Wei',nation:'China',pax:8,room:'V3',roomType:'Villa',source:'Agoda',roomPrice:6000000,fnb:800000,service:400000,paid:'partial',remains:1000000,notes:''},
  {id:'BK-006',checkin:'2024-06-06',checkout:'2024-06-09',guest:'Ngô Thị Bình',nation:'Vietnam',pax:2,room:'D1',roomType:'Cozy Deluxe',source:'Direct',roomPrice:1200000,fnb:250000,service:100000,paid:'paid',remains:0,notes:''},
  {id:'BK-007',checkin:'2024-06-07',checkout:'2024-06-10',guest:'Carlos Rivera',nation:'Mexico',pax:2,room:'ST1',roomType:'Suite',source:'Travel Agent',roomPrice:2750000,fnb:450000,service:200000,paid:'unpaid',remains:3400000,notes:''},
  {id:'BK-008',checkin:'2024-06-08',checkout:'2024-06-11',guest:'Emily Johnson',nation:'UK',pax:2,room:'D3',roomType:'Deluxe',source:'Booking.com',roomPrice:1400000,fnb:350000,service:150000,paid:'paid',remains:0,notes:'Birthday cake'},
  {id:'BK-009',checkin:'2024-05-09',checkout:'2024-05-12',guest:'Park Ji-ho',nation:'Korea',pax:2,room:'S2',roomType:'Super Deluxe',source:'Agoda',roomPrice:2340000,fnb:700000,service:300000,paid:'partial',remains:600000,notes:''},
  {id:'BK-010',checkin:'2024-05-10',checkout:'2024-05-13',guest:'Trần Minh Đức',nation:'Vietnam',pax:4,room:'V2',roomType:'Villa',source:'Direct',roomPrice:3800000,fnb:550000,service:250000,paid:'unpaid',remains:4600000,notes:''},
];

let rooms      = JSON.parse(localStorage.getItem('ct_rooms')  || 'null') || [...DEFAULT_ROOMS];
let roomTypes  = JSON.parse(localStorage.getItem('ct_rt')     || 'null') || [...DEFAULT_RT];
let _charts    = {};
let sheetsUrl  = '', refreshTimer = null, fbDB = null, fbUnsub = null;
let editingBkIdx   = null;
let editingRoomIdx = null;
let currentTheme   = 'light';
let adminPwd       = 'admin123';
let adminUnlocked  = false;
let _dpRoomId      = null;

// Email settings
let emailSettings = {
  serviceId:   '',
  templateId:  '',
  publicKey:   '',
  recipients:  [],
  sendTime:    '07:00',
  ciLookahead: 4,
  enabled:     false,
  lastSentDate:'',
};
let emailLog = [];

const TODAY = new Date().toISOString().slice(0,10);

// ─── PERSISTENCE ──────────────────────────────────────
const save  = (k,v) => { try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
const load  = (k,d) => { try{ const v=localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } };

function loadAll(){
  bookings      = load('ct_bookings', bookings);
  rooms         = load('ct_rooms',    DEFAULT_ROOMS);
  roomTypes     = load('ct_rt',       DEFAULT_RT);
  adminPwd      = load('ct_admin_pwd','admin123');
  emailSettings = load('ct_email_settings', emailSettings);
  emailLog      = load('ct_email_log', []);
  const url = load('ct_sheets_url','');
  if(url){ sheetsUrl=url; setVal('gs-url',url); }
  const hi = load('ct_hotel_info',null);
  if(hi){
    setVal('a-hotel-name', hi.name||'Cat Tien Jungle Lodge');
    setVal('a-hotel-addr', hi.addr||'');
    setVal('a-hotel-tel',  hi.tel||'');
    setVal('a-hotel-email',hi.email||'');
  }
  // Populate email settings UI
  setVal('em-service-id',   emailSettings.serviceId);
  setVal('em-template-id',  emailSettings.templateId);
  setVal('em-public-key',   emailSettings.publicKey);
  setVal('em-send-time',    emailSettings.sendTime);
  setVal('em-lookahead',    emailSettings.ciLookahead);
  const el = document.getElementById('em-enabled');
  if(el) el.checked = emailSettings.enabled;
  renderRecipientTags();
}
function saveEmailSettings(){
  emailSettings.serviceId   = getVal('em-service-id');
  emailSettings.templateId  = getVal('em-template-id');
  emailSettings.publicKey   = getVal('em-public-key');
  emailSettings.sendTime    = getVal('em-send-time') || '07:00';
  emailSettings.ciLookahead = parseInt(getVal('em-lookahead')) || 4;
  const el=document.getElementById('em-enabled'); emailSettings.enabled = el?el.checked:false;
  save('ct_email_settings', emailSettings);
}

// ─── UTILS ────────────────────────────────────────────
const getVal = id => document.getElementById(id)?.value || '';
const setVal = (id,v) => { const el=document.getElementById(id); if(el) el.value=v||''; };
const fmt    = n => new Intl.NumberFormat('vi-VN').format(Math.round(n));
const fmtK   = n => n>=1e9?(n/1e9).toFixed(1)+'B':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(0)+'K':Math.round(n)+'';
const nights = (ci,co) => Math.max(1,Math.round((new Date(co)-new Date(ci))/86400000));
const addDays= (d,n) => { const dt=new Date(d); dt.setDate(dt.getDate()+n); return dt.toISOString().slice(0,10); };
const isDark = () => document.documentElement.getAttribute('data-theme')==='dark';
const gCol   = () => ({text:isDark()?'#8a9480':'#8a9480', grid:isDark()?'rgba(255,255,255,.06)':'rgba(0,0,0,.05)'});
const rtColor= name => (roomTypes.find(r=>r.name===name)||{color:'#888'}).color;
const rtNames= ()   => roomTypes.map(r=>r.name);
const mkChart= (id,cfg) => { if(_charts[id]) _charts[id].destroy(); _charts[id]=new Chart(document.getElementById(id),cfg); };

function getFiltered(){
  const f=getVal('from-date'), t=getVal('to-date');
  return bookings.filter(b=>(!f||b.checkin>=f)&&(!t||b.checkin<=t));
}
function calcKPIs(data){
  const totalRev=data.reduce((s,b)=>s+b.roomPrice+b.fnb+b.service,0);
  const roomRev=data.reduce((s,b)=>s+b.roomPrice,0);
  const fnbRev=data.reduce((s,b)=>s+b.fnb,0);
  const svcRev=data.reduce((s,b)=>s+b.service,0);
  const bc=data.length, pax=data.reduce((s,b)=>s+Number(b.pax),0);
  const rn=data.reduce((s,b)=>s+nights(b.checkin,b.checkout),0);
  const unpaid=data.reduce((s,b)=>s+Number(b.remains),0);
  return{totalRev,roomRev,fnbRev,svcRev,bc,pax,rn,
    adr:rn>0?roomRev/rn:0, aov:bc>0?totalRev/bc:0,
    alos:bc>0?rn/bc:0, revPax:pax>0?totalRev/pax:0,
    unpaid, collRate:totalRev>0?(totalRev-unpaid)/totalRev*100:0};
}
function toast(msg,type='success'){
  const t=document.getElementById('toast');
  t.className='toast '+type;
  t.innerHTML=`<i class="ti ti-${type==='success'?'circle-check':type==='error'?'alert-circle':'info-circle'}" style="font-size:16px"></i> ${msg}`;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3200);
}
function setSyncStatus(s,m){
  const d=document.getElementById('sync-dot'),l=document.getElementById('sync-label');
  d.className='sync-dot '+(s==='live'?'live':s==='loading'?'loading':s==='error'?'error':'');
  l.textContent=m;
}

// ─── THEME ────────────────────────────────────────────
function setTheme(t){
  currentTheme=t; save('ct_theme',t); applyTheme(); updateThemeUI();
}
function applyTheme(){
  let actual=currentTheme;
  if(actual==='auto') actual=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  document.documentElement.setAttribute('data-theme',actual);
  document.getElementById('theme-icon').className=actual==='dark'?'ti ti-moon':'ti ti-sun';
  setTimeout(()=>renderDashCharts(),60);
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme');
  setTheme(cur==='dark'?'light':'dark');
}
function updateThemeUI(){
  ['light','dark','auto'].forEach(t=>{
    const b=document.getElementById('btn-'+t);
    if(b) b.className='btn btn-sm '+(currentTheme===t?'btn-jungle':'btn-ghost');
  });
  const labels={light:'Đang dùng: Sáng ☀️',dark:'Đang dùng: Tối 🌙',auto:'Đang dùng: Tự động'};
  const el=document.getElementById('theme-status'); if(el) el.textContent=labels[currentTheme]||'';
}
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>{ if(currentTheme==='auto') applyTheme(); });

// ─── POPULATE SELECTS ─────────────────────────────────
function populateSelects(){
  const rOpts=rooms.map(r=>`<option value="${r.id}">${r.id} — ${r.type}${r.status==='maint'?' [Bảo trì]':''}</option>`).join('');
  ['f-room','e-room'].forEach(id=>{ const el=document.getElementById(id); if(el) el.innerHTML='<option value="">— chọn phòng —</option>'+rOpts; });
  const rtOpts=roomTypes.map(r=>`<option value="${r.name}">${r.name}</option>`).join('');
  ['f-rt','e-rt','rm-type'].forEach(id=>{ const el=document.getElementById(id); if(el) el.innerHTML=rtOpts; });
  const zones=[...new Set(rooms.map(r=>r.zone))];
  const zEl=document.getElementById('rm-zone');
  if(zEl) zEl.innerHTML=zones.map(z=>`<option value="${z}">${z}</option>`).join('')+'<option value="__new">+ Zone mới</option>';
}

// ─── HERO + KPI ───────────────────────────────────────
function renderHero(){
  const k=calcKPIs(getFiltered());
  document.getElementById('h-rev').textContent='₫'+fmtK(k.totalRev);
  document.getElementById('h-rev-s').textContent=k.bc+' bookings · '+k.rn+' nights';
  const occ=Math.round(k.rn/(rooms.filter(r=>r.status==='active').length*30)*100);
  document.getElementById('h-occ').textContent=occ+'%';
  document.getElementById('h-occ-s').textContent=rooms.filter(r=>r.status==='active').length+' phòng';
  document.getElementById('h-adr').textContent='₫'+fmtK(k.adr);
  document.getElementById('h-coll').textContent=k.collRate.toFixed(1)+'%';
  document.getElementById('h-unpaid').innerHTML=k.unpaid>0
    ?`<span class="tag-dn">₫${fmtK(k.unpaid)} outstanding</span>`
    :`<span class="tag-up">All settled ✓</span>`;
}
function renderKPIs(){
  const k=calcKPIs(getFiltered());
  const items=[
    {l:'Room Revenue',v:'₫'+fmtK(k.roomRev),s:Math.round(k.totalRev?k.roomRev/k.totalRev*100:0)+'%',c:'j'},
    {l:'F&B Revenue', v:'₫'+fmtK(k.fnbRev), s:Math.round(k.totalRev?k.fnbRev/k.totalRev*100:0)+'%',c:'r'},
    {l:'Service',     v:'₫'+fmtK(k.svcRev), s:Math.round(k.totalRev?k.svcRev/k.totalRev*100:0)+'%',c:'e'},
    {l:'PAX',   v:k.pax,  s:'Total guests'},
    {l:'AOV',   v:'₫'+fmtK(k.aov),  s:'Avg order'},
    {l:'ALOS',  v:k.alos.toFixed(1)+'n',s:'Avg stay'},
    {l:'Rev/PAX',v:'₫'+fmtK(k.revPax),s:'Per guest'},
    {l:'Collection',v:k.collRate.toFixed(1)+'%',s:'Paid/billed',c:k.collRate>=90?'j':'w'},
  ];
  document.getElementById('kpi-grid').innerHTML=items.map(x=>`<div class="kcard ${x.c||''}"><div class="kc-l">${x.l}</div><div class="kc-v">${x.v}</div><div class="kc-s">${x.s}</div></div>`).join('');
}

// ─── DASHBOARD CHARTS ─────────────────────────────────
function renderDashCharts(){
  const d=getFiltered(); const {text,grid}=gCol();
  const dm={}; d.forEach(b=>{dm[b.checkin]=(dm[b.checkin]||0)+b.roomPrice+b.fnb+b.service;});
  const days=Object.keys(dm).sort();
  mkChart('c-revday',{type:'bar',data:{labels:days.map(x=>x.slice(5)),datasets:[{data:days.map(k=>Math.round(dm[k]/1000)),backgroundColor:'#2d6a3f',hoverBackgroundColor:'#4aaa66',borderRadius:5,barThickness:16}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:text,font:{size:10}},grid:{display:false}},y:{ticks:{color:text,font:{size:10},callback:v=>fmtK(v*1000)},grid:{color:grid}}}}});
  const rR=d.reduce((s,b)=>s+b.roomPrice,0),fR=d.reduce((s,b)=>s+b.fnb,0),sR=d.reduce((s,b)=>s+b.service,0),tot=rR+fR+sR||1;
  const mC=['#1e4d2b','#2a6880','#c4956a'],mL=['Room','F&B','Service'],mV=[rR,fR,sR];
  document.getElementById('mix-legend').innerHTML=mL.map((l,i)=>`<span style="display:flex;align-items:center;gap:3px"><span style="width:8px;height:8px;border-radius:2px;background:${mC[i]};display:inline-block"></span>${l} ${Math.round(mV[i]/tot*100)}%</span>`).join('');
  mkChart('c-mix',{type:'doughnut',data:{labels:mL,datasets:[{data:mV,backgroundColor:mC,borderWidth:0,hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{display:false}}}});
  const sm={}; d.forEach(b=>{sm[b.source]=(sm[b.source]||0)+b.roomPrice+b.fnb+b.service;});
  const sk=Object.keys(sm).sort((a,b)=>sm[b]-sm[a]);
  mkChart('c-src',{type:'bar',data:{labels:sk,datasets:[{data:sk.map(k=>Math.round(sm[k]/1000)),backgroundColor:'#2a6880',hoverBackgroundColor:'#4a9bb5',borderRadius:4}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:text,font:{size:10},callback:v=>fmtK(v*1000)},grid:{color:grid}},y:{ticks:{color:text,font:{size:10}},grid:{display:false}}}}});
  const rm={}; d.forEach(b=>{rm[b.roomType]=(rm[b.roomType]||0)+b.roomPrice+b.fnb+b.service;});
  const rk=rtNames().filter(k=>rm[k]); const rtot=rk.reduce((s,k)=>s+rm[k],0)||1;
  document.getElementById('rt-legend').innerHTML=rk.map(k=>`<span style="display:flex;align-items:center;gap:3px"><span style="width:8px;height:8px;border-radius:50%;background:${rtColor(k)};display:inline-block"></span>${k.split(' ')[0]} ${Math.round(rm[k]/rtot*100)}%</span>`).join('');
  mkChart('c-rtdash',{type:'doughnut',data:{labels:rk,datasets:[{data:rk.map(k=>rm[k]),backgroundColor:rk.map(k=>rtColor(k)),borderWidth:0,hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{display:false}}}});
  const smax=sk[0]?sm[sk[0]]:1;
  document.getElementById('top-src').innerHTML=sk.slice(0,6).map((k,i)=>`<li class="rank-item"><span class="rn">${i+1}</span><span style="flex:0 0 90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px">${k}</span><span class="rb"><span class="rf" style="width:${Math.round(sm[k]/smax*100)}%"></span></span><span class="rv">₫${fmtK(sm[k])}</span></li>`).join('');
  const nm={}; d.forEach(b=>{nm[b.nation]=(nm[b.nation]||0)+b.roomPrice+b.fnb+b.service;});
  const nk=Object.keys(nm).sort((a,b)=>nm[b]-nm[a]); const nmax=nk[0]?nm[nk[0]]:1;
  document.getElementById('top-nat').innerHTML=nk.slice(0,6).map((k,i)=>`<li class="rank-item"><span class="rn">${i+1}</span><span style="flex:0 0 90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px">${k}</span><span class="rb"><span class="rf" style="width:${Math.round(nm[k]/nmax*100)}%;background:var(--r2)"></span></span><span class="rv">₫${fmtK(nm[k])}</span></li>`).join('');
}

// ─── ROOM PLAN ────────────────────────────────────────
function getRoomStatus(roomId){
  const r=rooms.find(r=>r.id===roomId);
  if(r&&r.status==='maint') return{status:'maint',booking:null};
  const ci=bookings.find(b=>b.room===roomId&&b.checkin===TODAY);
  if(ci) return{status:'ci',booking:ci};
  const co=bookings.find(b=>b.room===roomId&&b.checkout===TODAY);
  if(co) return{status:'co',booking:co};
  const active=bookings.find(b=>b.room===roomId&&b.checkin<=TODAY&&b.checkout>TODAY);
  if(active) return{status:'occupied',booking:active};
  return{status:'vacant',booking:null};
}
function renderRoomPlan(){
  document.getElementById('rp-date').textContent='Hôm nay: '+new Date().toLocaleDateString('vi-VN',{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric'});
  const zones=[...new Set(rooms.map(r=>r.zone))];
  const CSS={vacant:'rc-v',occupied:'rc-o',ci:'rc-ci',co:'rc-co',maint:'rc-m'};
  const SDOT={vacant:'sd-v',occupied:'sd-o',ci:'sd-ci',co:'sd-co',maint:'sd-m'};
  const ACT={vacant:'+ New booking',occupied:'View details',ci:'Check-in today',co:'Check-out today',maint:'Maintenance'};
  let ciCount=0;
  const html=zones.map(zone=>{
    const zr=rooms.filter(r=>r.zone===zone);
    const cards=zr.map(room=>{
      const {status,booking}=getRoomStatus(room.id);
      if(status==='ci') ciCount++;
      const g=booking?`<div class="rc-guest">${booking.guest}</div><div class="rc-dates">${booking.checkin}→${booking.checkout}</div>`:`<div class="rc-guest" style="color:var(--text3);font-style:italic">Available</div>`;
      return`<div class="rcard ${CSS[status]||'rc-v'}" id="rc-${room.id}" onclick="selectRoom('${room.id}')" role="button" tabindex="0" aria-label="Room ${room.id}">
        <span class="rc-sdot ${SDOT[status]||'sd-v'}" aria-hidden="true"></span>
        <div class="rc-num">${room.id}</div>
        <div class="rc-type" style="color:${rtColor(room.type)}">${room.type}</div>
        ${g}
        <div class="rc-action">${ACT[status]||''}</div>
      </div>`;
    }).join('');
    return`<div class="zone-wrap"><div class="zone-hdr"><div class="zone-left"><i class="ti ${zoneIcon(zone)}" style="color:var(--j3);font-size:15px" aria-hidden="true"></i>${zone}</div><span style="font-size:10px;color:var(--text3)">${zr.length} rooms</span></div><div class="room-grid">${cards}</div></div>`;
  }).join('');
  document.getElementById('room-zones').innerHTML=html;
  const ci=document.getElementById('ci-badge');
  if(ciCount>0){ci.style.display='';ci.textContent=ciCount;}else ci.style.display='none';
}
function zoneIcon(z){return({Villa:'ti-waves',Suite:'ti-diamond','Super Deluxe':'ti-star',Deluxe:'ti-trees','Cozy Deluxe':'ti-home-2'}[z]||'ti-door');}

function selectRoom(id){
  document.querySelectorAll('.rcard').forEach(c=>c.classList.remove('selected'));
  document.getElementById('rc-'+id)?.classList.add('selected');
  const room=rooms.find(r=>r.id===id);
  const {status,booking}=getRoomStatus(id);
  _dpRoomId=id;
  const panel=document.getElementById('dp-panel');
  panel.classList.add('open');
  document.getElementById('dp-num').textContent='Room '+id;
  document.getElementById('dp-type').textContent=room?room.type+' · '+room.view+' · '+room.size+' · Sleeps '+room.pax:'';
  document.getElementById('dp-book-btn').style.display=status==='vacant'?'':'none';
  const stBadge={vacant:'<span class="badge b-vacant">Trống</span>',occupied:'<span class="badge b-partial">Đang có khách</span>',ci:'<span class="badge b-ci">Check-in hôm nay</span>',co:'<span class="badge b-co">Check-out hôm nay</span>',maint:'<span class="badge b-maint">Bảo trì</span>'};
  const bi=booking?bookings.indexOf(booking):-1;
  const editBtn=bi>=0?`<button class="btn btn-ghost btn-xs" style="margin-top:4px" onclick="openEdit(${bi})"><i class="ti ti-pencil" style="font-size:10px"></i> Chỉnh sửa</button>`:'';
  document.getElementById('dp-body').innerHTML=booking?`
    <div class="dp-f"><div class="dp-l">Trạng thái</div><div class="dp-v">${stBadge[status]||''}</div></div>
    <div class="dp-f"><div class="dp-l">Booking ID</div><div class="dp-v">${booking.id}</div></div>
    <div class="dp-f"><div class="dp-l">Guest</div><div class="dp-v">${booking.guest}</div></div>
    <div class="dp-f"><div class="dp-l">Nation</div><div class="dp-v">${booking.nation}</div></div>
    <div class="dp-f"><div class="dp-l">Check-in</div><div class="dp-v">${booking.checkin}</div></div>
    <div class="dp-f"><div class="dp-l">Check-out</div><div class="dp-v">${booking.checkout}</div></div>
    <div class="dp-f"><div class="dp-l">PAX</div><div class="dp-v">${booking.pax} guests</div></div>
    <div class="dp-f"><div class="dp-l">Source</div><div class="dp-v">${booking.source}</div></div>
    <div class="dp-f"><div class="dp-l">Total</div><div class="dp-v" style="font-weight:700">₫${fmt(booking.roomPrice+booking.fnb+booking.service)}</div></div>
    <div class="dp-f"><div class="dp-l">Payment</div><div class="dp-v">${booking.paid==='paid'?'<span class="badge b-paid">Paid ✓</span>':booking.paid==='partial'?`<span class="badge b-partial">Partial · ₫${fmt(booking.remains)}</span>`:`<span class="badge b-unpaid">Unpaid · ₫${fmt(booking.remains)}</span>`}${editBtn}</div></div>
    ${booking.notes?`<div class="dp-f" style="grid-column:1/-1"><div class="dp-l">Notes</div><div class="dp-v">${booking.notes}</div></div>`:''}
  `:`
    <div class="dp-f"><div class="dp-l">Status</div><div class="dp-v">${stBadge[status]||''}</div></div>
    <div class="dp-f"><div class="dp-l">Type</div><div class="dp-v">${room?room.type:''}</div></div>
    <div class="dp-f"><div class="dp-l">View</div><div class="dp-v">${room?room.view:''}</div></div>
    <div class="dp-f"><div class="dp-l">Size</div><div class="dp-v">${room?room.size:''}</div></div>
    <div class="dp-f"><div class="dp-l">Capacity</div><div class="dp-v">Sleeps ${room?room.pax:''}</div></div>
  `;
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function dpNewBooking(){
  navTo('new-booking',null);
  setTimeout(()=>{ if(_dpRoomId){ setVal('f-room',_dpRoomId); const r=rooms.find(x=>x.id===_dpRoomId); if(r) setVal('f-rt',r.type); } },80);
}
function closeDP(){ document.getElementById('dp-panel').classList.remove('open'); document.querySelectorAll('.rcard').forEach(c=>c.classList.remove('selected')); }

// ─── TIMELINE ─────────────────────────────────────────
function renderTimeline(){
  const start=new Date(); start.setDate(start.getDate()-3);
  const DAYS=14,COL_W=50,ROOM_W=62;
  const dates=Array.from({length:DAYS},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return d.toISOString().slice(0,10);});
  let html=`<div style="display:grid;grid-template-columns:${ROOM_W}px repeat(${DAYS},${COL_W}px);min-width:${ROOM_W+COL_W*DAYS}px;border-bottom:1px solid var(--border);padding-bottom:8px;margin-bottom:4px;">
    <div style="font-size:9px;color:var(--text3);padding:4px"></div>
    ${dates.map(d=>`<div style="font-size:9px;color:${d===TODAY?'var(--j3)':'var(--text3)'};font-weight:${d===TODAY?700:400};text-align:center;padding:2px">${d.slice(5)}</div>`).join('')}
  </div>`;
  rooms.filter(r=>r.status==='active').forEach(room=>{
    const bkgs=bookings.filter(b=>b.room===room.id&&b.checkout>dates[0]&&b.checkin<=dates[DAYS-1]);
    html+=`<div style="display:grid;grid-template-columns:${ROOM_W}px repeat(${DAYS},${COL_W}px);min-width:${ROOM_W+COL_W*DAYS}px;margin-bottom:2px;align-items:center">
      <div style="font-size:10px;font-weight:700;color:var(--text);padding:0 6px 0 2px;background:var(--bg3);border-radius:4px;white-space:nowrap">${room.id}</div>`;
    dates.forEach((date,di)=>{
      const bk=bkgs.find(b=>b.checkin<=date&&b.checkout>date);
      html+=`<div style="height:22px;background:${date===TODAY?'rgba(61,139,82,.1)':'var(--bg3)'};border-radius:3px;margin:1px;position:relative">`;
      if(bk&&bk.checkin===date){
        const endDi=dates.indexOf(bk.checkout);
        const span=Math.max(1,Math.min(endDi>=0?endDi-di:DAYS-di,DAYS-di));
        html+=`<div style="position:absolute;top:2px;bottom:2px;left:2px;width:${span*COL_W-4}px;background:${rtColor(bk.roomType)||'#888'};border-radius:3px;display:flex;align-items:center;padding:0 5px;font-size:8px;font-weight:700;color:#fff;overflow:hidden;white-space:nowrap;z-index:2;cursor:pointer" onclick="selectRoom('${room.id}')" title="${bk.guest} (${bk.checkin}→${bk.checkout})">${bk.guest.split(' ').pop()}</div>`;
      }
      html+=`</div>`;
    });
    html+=`</div>`;
  });
  document.getElementById('tl-wrap').innerHTML=html;
}

// ─── BOOKINGS TABLE ───────────────────────────────────
function renderBookings(){
  const q=(getVal('bk-search')||'').toLowerCase();
  const filtered=bookings.filter(b=>!q||b.id.toLowerCase().includes(q)||b.guest.toLowerCase().includes(q)||b.room.toLowerCase().includes(q)||(b.nation||'').toLowerCase().includes(q));
  document.getElementById('bk-tbody').innerHTML=filtered.map(b=>{
    const i=bookings.indexOf(b);
    const total=b.roomPrice+b.fnb+b.service;
    const bc=b.paid==='paid'?'b-paid':b.paid==='partial'?'b-partial':'b-unpaid';
    const isCI=b.checkin===TODAY,isCO=b.checkout===TODAY;
    return`<tr>
      <td style="font-weight:700">${b.id}</td>
      <td>${b.checkin}${isCI?'<span class="badge b-ci" style="margin-left:4px;font-size:8px">CI</span>':''}</td>
      <td>${b.checkout}${isCO?'<span class="badge b-co" style="margin-left:4px;font-size:8px">CO</span>':''}</td>
      <td>${b.guest}</td><td>${b.nation}</td><td>${b.pax}</td>
      <td style="font-weight:700">${b.room}</td>
      <td style="color:${rtColor(b.roomType)};font-size:10px;font-weight:700">${b.roomType||'—'}</td>
      <td>${b.source}</td>
      <td>₫${fmt(b.roomPrice)}</td><td>₫${fmt(b.fnb)}</td><td>₫${fmt(b.service)}</td>
      <td style="font-weight:700">₫${fmt(total)}</td>
      <td><span class="badge ${bc}">${b.paid==='paid'?'Paid':b.paid==='partial'?'Partial':'Unpaid'}</span></td>
      <td style="color:${b.remains>0?'var(--warn)':'var(--text3)'}">${b.remains>0?'₫'+fmt(b.remains):'—'}</td>
      <td><div style="display:flex;gap:4px">
        <button onclick="openEdit(${i})" class="btn btn-ghost btn-xs" title="Edit"><i class="ti ti-pencil" style="font-size:11px"></i></button>
        <button onclick="delBooking(${i})" class="btn btn-warn btn-xs" title="Delete"><i class="ti ti-trash" style="font-size:11px"></i></button>
      </div></td>
    </tr>`;
  }).join('');
  document.getElementById('bk-count').textContent=filtered.length+'/'+bookings.length;
}

// ─── SAVE / EDIT BOOKING ──────────────────────────────
function saveBooking(){
  const ci=getVal('f-ci'),co=getVal('f-co'),bid=getVal('f-bid');
  if(!ci||!co||!bid){ showFS('Cần Check-in, Check-out và Booking ID','err'); return; }
  const bk={id:bid,checkin:ci,checkout:co,guest:getVal('f-guest')||'Guest',nation:getVal('f-nat')||'Unknown',pax:Number(getVal('f-pax'))||1,room:getVal('f-room')||'—',roomType:getVal('f-rt'),source:getVal('f-src'),roomPrice:Number(getVal('f-rp'))||0,fnb:Number(getVal('f-fnb'))||0,service:Number(getVal('f-svc'))||0,paid:getVal('f-paid'),remains:Number(getVal('f-rem'))||0,notes:getVal('f-note')};
  bookings.push(bk);
  save('ct_bookings',bookings); initCmp(); renderAll();
  cancelEdit(); toast('Booking đã lưu ✓');
  setTimeout(()=>navTo('bookings',null),400);
}
function cancelEdit(){ editingBkIdx=null; ['f-ci','f-co','f-bid','f-guest','f-nat','f-pax','f-room','f-rp','f-fnb','f-svc','f-rem','f-note'].forEach(id=>setVal(id,'')); showFS('',''); document.getElementById('form-mode-title').textContent='New Reservation'; document.getElementById('save-btn-label').textContent='Save reservation'; }
function showFS(msg,cls){ const el=document.getElementById('form-status'); if(el){el.textContent=msg;el.style.color=cls==='err'?'var(--warn)':'var(--g2)';} }

function openEdit(idx){
  editingBkIdx=idx;
  const b=bookings[idx];
  setVal('e-ci',b.checkin); setVal('e-co',b.checkout); setVal('e-bid',b.id);
  setVal('e-guest',b.guest); setVal('e-nat',b.nation); setVal('e-pax',b.pax);
  setVal('e-room',b.room); setVal('e-rt',b.roomType); setVal('e-src',b.source);
  setVal('e-rp',b.roomPrice); setVal('e-fnb',b.fnb); setVal('e-svc',b.service);
  setVal('e-paid',b.paid); setVal('e-rem',b.remains); setVal('e-note',b.notes||'');
  document.getElementById('edit-status').textContent='';
  document.getElementById('edit-modal').style.display='flex';
}
function updateBooking(){
  if(editingBkIdx===null) return;
  const b=bookings[editingBkIdx];
  bookings[editingBkIdx]={...b,checkin:getVal('e-ci'),checkout:getVal('e-co'),guest:getVal('e-guest'),nation:getVal('e-nat'),pax:Number(getVal('e-pax'))||1,room:getVal('e-room')||b.room,roomType:getVal('e-rt')||b.roomType,source:getVal('e-src'),roomPrice:Number(getVal('e-rp'))||0,fnb:Number(getVal('e-fnb'))||0,service:Number(getVal('e-svc'))||0,paid:getVal('e-paid'),remains:Number(getVal('e-rem'))||0,notes:getVal('e-note')};
  save('ct_bookings',bookings); initCmp(); renderAll();
  closeEditModal(); toast('Booking đã cập nhật ✓');
}
function closeEditModal(){ document.getElementById('edit-modal').style.display='none'; editingBkIdx=null; }
function delBooking(i){ if(!confirm('Xóa booking '+bookings[i].id+'?'))return; bookings.splice(i,1); save('ct_bookings',bookings); initCmp(); renderAll(); toast('Đã xóa','info'); }

// ─── ROOM TYPE ANALYSIS ───────────────────────────────
function renderRoomType(){
  const d=getFiltered(); const {text,grid}=gCol();
  const stats={}; rtNames().forEach(rt=>{stats[rt]={bc:0,rn:0,pax:0,roomRev:0,fnb:0,svc:0,unpaid:0};});
  d.forEach(b=>{const rt=b.roomType;if(!stats[rt])stats[rt]={bc:0,rn:0,pax:0,roomRev:0,fnb:0,svc:0,unpaid:0};stats[rt].bc++;stats[rt].rn+=nights(b.checkin,b.checkout);stats[rt].pax+=Number(b.pax);stats[rt].roomRev+=b.roomPrice;stats[rt].fnb+=b.fnb;stats[rt].svc+=b.service;stats[rt].unpaid+=Number(b.remains);});
  const rk=rtNames().filter(k=>stats[k]&&stats[k].bc>0);
  document.getElementById('rt-kpi-grid').innerHTML=rk.map(rt=>{const s=stats[rt];const tot=s.roomRev+s.fnb+s.svc;const adr=s.rn>0?s.roomRev/s.rn:0;return`<div class="kcard" style="border-top:3px solid ${rtColor(rt)}"><div class="kc-l" style="color:${rtColor(rt)}">${rt}</div><div class="kc-v">₫${fmtK(tot)}</div><div class="kc-s">${s.bc} bk · ADR ₫${fmtK(adr)}</div></div>`;}).join('');
  mkChart('c-rtstacked',{type:'bar',data:{labels:rk.map(k=>k.split(' ')[0]),datasets:[{label:'Room',data:rk.map(k=>Math.round(stats[k].roomRev/1000)),backgroundColor:rk.map(k=>rtColor(k)),borderRadius:3},{label:'F&B',data:rk.map(k=>Math.round(stats[k].fnb/1000)),backgroundColor:'#c4956a'},{label:'Service',data:rk.map(k=>Math.round(stats[k].svc/1000)),backgroundColor:'#2a6880'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,labels:{color:text,font:{size:10},boxWidth:8,padding:8}}},scales:{x:{stacked:true,ticks:{color:text,font:{size:10}},grid:{display:false}},y:{stacked:true,ticks:{color:text,font:{size:10},callback:v=>fmtK(v*1000)},grid:{color:grid}}}}});
  mkChart('c-rtadr',{type:'bar',data:{labels:rk.map(k=>k.split(' ')[0]),datasets:[{data:rk.map(k=>Math.round(stats[k].rn>0?stats[k].roomRev/stats[k].rn:0)),backgroundColor:rk.map(k=>rtColor(k)),borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:text,font:{size:10}},grid:{display:false}},y:{ticks:{color:text,font:{size:10},callback:v=>fmtK(v)},grid:{color:grid}}}}});
  mkChart('c-rtcount',{type:'bar',data:{labels:rk.map(k=>k.split(' ')[0]),datasets:[{label:'Bookings',data:rk.map(k=>stats[k].bc),backgroundColor:'#2d6a3f',borderRadius:3},{label:'PAX',data:rk.map(k=>stats[k].pax),backgroundColor:'#c4956a',borderRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,labels:{color:text,font:{size:10},boxWidth:8,padding:8}}},scales:{x:{ticks:{color:text,font:{size:10}},grid:{display:false}},y:{ticks:{color:text,font:{size:10}},grid:{color:grid}}}}});
  document.getElementById('rt-tbody').innerHTML=rk.map(rt=>{const s=stats[rt];const tot=s.roomRev+s.fnb+s.svc;const adr=s.rn>0?s.roomRev/s.rn:0;const alos=s.bc>0?s.rn/s.bc:0;const rp=s.pax>0?tot/s.pax:0;const coll=tot>0?(tot-s.unpaid)/tot*100:0;return`<tr><td style="font-weight:700;color:${rtColor(rt)}">${rt}</td><td>${s.bc}</td><td>${s.rn}</td><td>${s.pax}</td><td>₫${fmt(s.roomRev)}</td><td>₫${fmt(s.fnb)}</td><td>₫${fmt(s.svc)}</td><td style="font-weight:700">₫${fmt(tot)}</td><td>₫${fmt(adr)}</td><td>${alos.toFixed(1)}</td><td>₫${fmt(rp)}</td><td><span class="badge ${coll>=90?'b-paid':coll>=70?'b-partial':'b-unpaid'}">${coll.toFixed(0)}%</span></td></tr>`;}).join('');
}

// ─── COMPARE ──────────────────────────────────────────
function initCmp(){ const months=Array.from(new Set(bookings.map(b=>b.checkin.slice(0,7)))).sort(); ['cmp-m1','cmp-m2'].forEach((id,i)=>{const el=document.getElementById(id);if(!el)return;const prev=el.value;el.innerHTML=months.map(m=>`<option value="${m}">${m}</option>`).join('');if(prev&&months.includes(prev))el.value=prev;else el.value=months[Math.max(0,months.length-1-i)];}); }
function renderCompare(){
  const m1=getVal('cmp-m1'),m2=getVal('cmp-m2');
  const d1=bookings.filter(b=>b.checkin.startsWith(m1)),d2=bookings.filter(b=>b.checkin.startsWith(m2));
  const k1=calcKPIs(d1),k2=calcKPIs(d2); const {text,grid}=gCol();
  const delta=(a,b)=>{if(!b)return{pct:null};const p=(a-b)/Math.abs(b)*100;return{pct:Math.abs(p).toFixed(1),cls:p>=0?'du':'dd',sym:p>=0?'↑':'↓'};};
  const items=[{l:'Total Rev',v1:'₫'+fmtK(k1.totalRev),v2:'₫'+fmtK(k2.totalRev),d:delta(k1.totalRev,k2.totalRev)},{l:'Room Rev',v1:'₫'+fmtK(k1.roomRev),v2:'₫'+fmtK(k2.roomRev),d:delta(k1.roomRev,k2.roomRev)},{l:'F&B',v1:'₫'+fmtK(k1.fnbRev),v2:'₫'+fmtK(k2.fnbRev),d:delta(k1.fnbRev,k2.fnbRev)},{l:'Bookings',v1:k1.bc,v2:k2.bc,d:delta(k1.bc,k2.bc)},{l:'ADR',v1:'₫'+fmtK(k1.adr),v2:'₫'+fmtK(k2.adr),d:delta(k1.adr,k2.adr)},{l:'ALOS',v1:k1.alos.toFixed(1),v2:k2.alos.toFixed(1),d:delta(k1.alos,k2.alos)},{l:'Collection',v1:k1.collRate.toFixed(1)+'%',v2:k2.collRate.toFixed(1)+'%',d:delta(k1.collRate,k2.collRate)},{l:'Unpaid',v1:'₫'+fmtK(k1.unpaid),v2:'₫'+fmtK(k2.unpaid),d:delta(k1.unpaid,k2.unpaid)}];
  document.getElementById('cmp-kpi').innerHTML=items.map(x=>`<div class="cmp-card"><div class="cmp-l">${x.l}</div><div class="cmp-row"><span class="cmp-m" style="color:var(--j3)">${m1}</span><span class="cmp-v">${x.v1}</span></div><div class="cmp-row"><span class="cmp-m" style="color:var(--e2)">${m2}</span><span class="cmp-v">${x.v2}</span></div>${x.d.pct!==null?`<span class="delta ${x.d.cls}">${x.d.sym} ${x.d.pct}%</span>`:''}</div>`).join('');
  const map1={},map2={};d1.forEach(b=>{const dy=parseInt(b.checkin.slice(8));map1[dy]=(map1[dy]||0)+b.roomPrice+b.fnb+b.service;});d2.forEach(b=>{const dy=parseInt(b.checkin.slice(8));map2[dy]=(map2[dy]||0)+b.roomPrice+b.fnb+b.service;});
  const allDays=Array.from(new Set([...Object.keys(map1),...Object.keys(map2)].map(Number))).sort((a,b)=>a-b);
  mkChart('c-cmpday',{type:'bar',data:{labels:allDays.map(d=>'D'+d),datasets:[{label:m1,data:allDays.map(d=>Math.round((map1[d]||0)/1000)),backgroundColor:'#1e4d2b',borderRadius:2,barThickness:9},{label:m2,data:allDays.map(d=>Math.round((map2[d]||0)/1000)),backgroundColor:'#c4956a',borderRadius:2,barThickness:9}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,labels:{color:text,font:{size:10},boxWidth:8,padding:8}}},scales:{x:{ticks:{color:text,font:{size:9}},grid:{display:false}},y:{ticks:{color:text,font:{size:10},callback:v=>fmtK(v*1000)},grid:{color:grid}}}}});
  mkChart('c-cmpmix',{type:'bar',data:{labels:['Room','F&B','Svc'],datasets:[{label:m1,data:[Math.round(k1.roomRev/1000),Math.round(k1.fnbRev/1000),Math.round(k1.svcRev/1000)],backgroundColor:'#1e4d2b',borderRadius:2},{label:m2,data:[Math.round(k2.roomRev/1000),Math.round(k2.fnbRev/1000),Math.round(k2.svcRev/1000)],backgroundColor:'#c4956a',borderRadius:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,labels:{color:text,font:{size:10},boxWidth:8,padding:8}}},scales:{x:{ticks:{color:text},grid:{display:false}},y:{ticks:{color:text,font:{size:10},callback:v=>fmtK(v*1000)},grid:{color:grid}}}}});
  const rt1={},rt2={};d1.forEach(b=>{rt1[b.roomType]=(rt1[b.roomType]||0)+b.roomPrice+b.fnb+b.service;});d2.forEach(b=>{rt2[b.roomType]=(rt2[b.roomType]||0)+b.roomPrice+b.fnb+b.service;});
  const rtA=rtNames().filter(k=>rt1[k]||rt2[k]);
  mkChart('c-cmprt',{type:'bar',data:{labels:rtA.map(k=>k.split(' ')[0]),datasets:[{label:m1,data:rtA.map(k=>Math.round((rt1[k]||0)/1000)),backgroundColor:'#1e4d2b',borderRadius:2},{label:m2,data:rtA.map(k=>Math.round((rt2[k]||0)/1000)),backgroundColor:'#c4956a',borderRadius:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,labels:{color:text,font:{size:10},boxWidth:8,padding:8}}},scales:{x:{ticks:{color:text},grid:{display:false}},y:{ticks:{color:text,font:{size:10},callback:v=>fmtK(v*1000)},grid:{color:grid}}}}});
}

// ─── ALERTS ───────────────────────────────────────────
function renderAlerts(){
  const ul=bookings.filter(b=>b.paid!=='paid'&&b.remains>0);
  const badge=document.getElementById('alert-badge');
  if(ul.length){badge.style.display='';badge.textContent=ul.length;}else badge.style.display='none';
  const al=document.getElementById('alert-list');
  if(!ul.length){al.innerHTML=`<div style="text-align:center;padding:50px 20px"><i class="ti ti-circle-check" style="font-size:52px;color:var(--j3);display:block;margin-bottom:12px" aria-hidden="true"></i><div class="serif" style="font-size:18px;color:var(--text);margin-bottom:4px">No outstanding balance</div><div style="font-size:12px;color:var(--text2)">All settled</div></div>`;return;}
  al.innerHTML=ul.map(b=>`<div class="alert-item">
    <i class="ti ti-alert-circle" style="font-size:18px;color:var(--e2);flex-shrink:0;margin-top:1px" aria-hidden="true"></i>
    <div style="flex:1">
      <div style="font-weight:700;font-size:12px">${b.id} — ${b.guest} <span style="font-size:10px;color:${rtColor(b.roomType)};font-weight:700">[${b.room} · ${b.roomType}]</span></div>
      <div style="font-size:10px;color:var(--text2);margin-top:2px">CI: ${b.checkin} · CO: ${b.checkout} · ${b.source} · ${b.nation}</div>
    </div>
    <div style="text-align:right;flex-shrink:0">
      <span class="badge ${b.paid==='partial'?'b-partial':'b-unpaid'}" style="display:block;margin-bottom:3px">${b.paid==='partial'?'Partial':'Unpaid'}</span>
      <div style="font-weight:700;color:var(--warn);font-size:12px">₫${fmt(b.remains)}</div>
      <button onclick="openEdit(${bookings.indexOf(b)})" class="btn btn-ghost btn-xs" style="margin-top:4px"><i class="ti ti-pencil" style="font-size:10px"></i> Edit</button>
    </div>
  </div>`).join('');
}

// ═══════════════════════════════════════════════════
// EMAIL SYSTEM — Room Plan Daily Digest
// ═══════════════════════════════════════════════════
function buildEmailReport(){
  const lookahead = emailSettings.ciLookahead || 4;
  const todayDate = new Date();
  const lines = [];

  // 1. CHECK-IN TODAY
  const ciToday = bookings.filter(b=>b.checkin===TODAY);
  lines.push(`🏨 CAT TIEN JUNGLE LODGE — ROOM PLAN REPORT`);
  lines.push(`📅 ${new Date().toLocaleDateString('vi-VN',{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric'})}`);
  lines.push(`${'─'.repeat(48)}`);

  lines.push(`\n✅ CHECK-IN HÔM NAY (${ciToday.length} booking)`);
  if(ciToday.length){
    ciToday.forEach(b=>lines.push(`  • Room ${b.room} [${b.roomType}] — ${b.guest} (${b.nation}, ${b.pax} PAX)\n    Source: ${b.source} | Nights: ${nights(b.checkin,b.checkout)} | Total: ₫${fmt(b.roomPrice+b.fnb+b.service)} | ${b.paid==='paid'?'✅ Paid':b.paid==='partial'?`⚠️ Partial (còn ₫${fmt(b.remains)})`:`❌ Unpaid (₫${fmt(b.remains)})`}${b.notes?'\n    Notes: '+b.notes:''}`));
  } else { lines.push(`  (Không có check-in hôm nay)`); }

  // 2. CHECK-OUT TODAY
  const coToday = bookings.filter(b=>b.checkout===TODAY);
  lines.push(`\n🔑 CHECK-OUT HÔM NAY (${coToday.length} booking)`);
  if(coToday.length){
    coToday.forEach(b=>lines.push(`  • Room ${b.room} — ${b.guest} | ${b.paid==='paid'?'✅ Đã thanh toán':b.paid==='partial'?`⚠️ Còn ₫${fmt(b.remains)}`:`❌ Chưa TT: ₫${fmt(b.remains)}`}`));
  } else { lines.push(`  (Không có check-out hôm nay)`); }

  // 3. UPCOMING CHECK-INS (next N days)
  lines.push(`\n📋 CHECK-IN SẮP TỚI (${lookahead} ngày tới)`);
  let hasUpcoming = false;
  for(let d=1;d<=lookahead;d++){
    const dateStr=addDays(TODAY,d);
    const arr=bookings.filter(b=>b.checkin===dateStr);
    if(arr.length){
      hasUpcoming=true;
      const dayLabel=d===1?'Ngày mai':dateStr;
      lines.push(`  📌 ${dayLabel}:`);
      arr.forEach(b=>lines.push(`    • Room ${b.room} [${b.roomType}] — ${b.guest} (${b.nation}, ${b.pax} PAX) · ${b.source}`));
    }
  }
  if(!hasUpcoming) lines.push(`  (Không có booking sắp tới)`);

  // 4. OVERLAP / CONFLICTS
  lines.push(`\n⚠️  PHÒNG ĐANG TRÙNG/XEM THƯỜNG`);
  const conflicts=[];
  rooms.filter(r=>r.status==='active').forEach(room=>{
    const roomBks=bookings.filter(b=>b.room===room.id).sort((a,b)=>a.checkin.localeCompare(b.checkin));
    for(let i=0;i<roomBks.length-1;i++){
      const curr=roomBks[i], next=roomBks[i+1];
      if(curr.checkout>next.checkin){ // overlap
        conflicts.push(`  🔴 Room ${room.id}: "${curr.guest}" (CO: ${curr.checkout}) vs "${next.guest}" (CI: ${next.checkin})`);
      }
    }
  });
  if(conflicts.length) lines.push(...conflicts);
  else lines.push(`  ✅ Không phát hiện trùng phòng`);

  // 5. OCCUPANCY SUMMARY
  const activeRooms=rooms.filter(r=>r.status==='active').length;
  const occupiedNow=bookings.filter(b=>b.checkin<=TODAY&&b.checkout>TODAY).length;
  const occ=activeRooms>0?Math.round(occupiedNow/activeRooms*100):0;
  lines.push(`\n📊 TÌNH TRẠNG HÔM NAY`);
  lines.push(`  • Tổng phòng active: ${activeRooms}`);
  lines.push(`  • Đang có khách: ${occupiedNow} phòng (${occ}%)`);
  lines.push(`  • Trống: ${activeRooms-occupiedNow} phòng`);

  // 6. UNPAID SUMMARY
  const unpaidBks=bookings.filter(b=>b.paid!=='paid'&&b.remains>0);
  const totalUnpaid=unpaidBks.reduce((s,b)=>s+b.remains,0);
  if(unpaidBks.length){
    lines.push(`\n💰 CÔNG NỢ CHƯA THU (${unpaidBks.length} booking — ₫${fmt(totalUnpaid)})`);
    unpaidBks.slice(0,5).forEach(b=>lines.push(`  • ${b.id} — ${b.guest}: ₫${fmt(b.remains)} (${b.paid})`));
    if(unpaidBks.length>5) lines.push(`  ... và ${unpaidBks.length-5} booking khác`);
  }

  lines.push(`\n${'─'.repeat(48)}`);
  lines.push(`Gửi tự động bởi Cat Tien Jungle Lodge PMS`);
  lines.push(`${new Date().toLocaleString('vi-VN')}`);
  return lines.join('\n');
}

function buildEmailHTML(){
  const text = buildEmailReport();
  const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<div style="font-family:monospace;font-size:12px;line-height:1.8;white-space:pre-wrap;background:#f8f5ee;padding:20px;border-radius:8px;border:1px solid #d4c4b0;color:#1a1a14">${escaped}</div>`;
}

// Recipients management
let newRecipientInput = '';
function addRecipient(){
  const v=(getVal('em-new-recipient')||'').trim();
  if(!v||!v.includes('@')){ toast('Email không hợp lệ','error'); return; }
  if(emailSettings.recipients.includes(v)){ toast('Email đã có trong danh sách','info'); return; }
  emailSettings.recipients.push(v);
  save('ct_email_settings',emailSettings);
  setVal('em-new-recipient','');
  renderRecipientTags();
  toast('Đã thêm '+v);
}
function removeRecipient(email){
  emailSettings.recipients=emailSettings.recipients.filter(e=>e!==email);
  save('ct_email_settings',emailSettings);
  renderRecipientTags();
}
function renderRecipientTags(){
  const el=document.getElementById('recipient-tags');
  if(!el) return;
  if(!emailSettings.recipients.length){ el.innerHTML='<span style="font-size:11px;color:var(--text3)">Chưa có email nào</span>'; return; }
  el.innerHTML=emailSettings.recipients.map(e=>`<span class="rec-tag">${e}<button onclick="removeRecipient('${e}')" title="Xóa" aria-label="Remove ${e}">×</button></span>`).join('');
}

async function sendEmailNow(isTest=false){
  saveEmailSettings();
  if(!emailSettings.serviceId||!emailSettings.templateId||!emailSettings.publicKey){
    toast('Chưa cấu hình EmailJS. Xem hướng dẫn bên dưới.','error'); return;
  }
  if(!emailSettings.recipients.length){ toast('Chưa có email nhận','error'); return; }

  const btn=document.getElementById(isTest?'btn-test-email':'btn-send-email');
  if(btn){btn.disabled=true;btn.innerHTML='<i class="ti ti-loader" style="animation:spin .8s linear infinite;font-size:12px"></i> Đang gửi...';}

  const reportText=buildEmailReport();
  const reportHTML=buildEmailHTML();
  const subject=isTest?`[TEST] Cat Tien PMS — Room Plan ${TODAY}`:`🏨 Cat Tien Lodge — Room Plan ${TODAY}`;

  let successCount=0, failCount=0;

  for(const recipient of emailSettings.recipients){
    try{
      await emailjs.send(
        emailSettings.serviceId,
        emailSettings.templateId,
        {
          to_email:   recipient,
          to_name:    recipient.split('@')[0],
          subject:    subject,
          report_text:reportText,
          report_html:reportHTML,
          hotel_name: 'Cat Tien Jungle Lodge',
          send_date:  new Date().toLocaleDateString('vi-VN'),
          is_test:    isTest?'[TEST] ':'',
        },
        emailSettings.publicKey
      );
      successCount++;
    } catch(err){
      failCount++;
      console.error('EmailJS error for',recipient,err);
    }
  }

  // Log
  const logEntry={date:new Date().toISOString(),type:isTest?'test':'auto',recipients:emailSettings.recipients.length,success:successCount,fail:failCount,subject};
  emailLog.unshift(logEntry);
  if(emailLog.length>50) emailLog=emailLog.slice(0,50);
  save('ct_email_log',emailLog);
  if(!isTest){ emailSettings.lastSentDate=TODAY; save('ct_email_settings',emailSettings); }
  renderEmailLog();

  toast(failCount===0?`✓ Gửi thành công ${successCount} email`:`Gửi ${successCount} OK, ${failCount} lỗi`,failCount===0?'success':'error');
  if(btn){btn.disabled=false;btn.innerHTML=isTest?'<i class="ti ti-send" style="font-size:11px"></i> Gửi test':'<i class="ti ti-send" style="font-size:11px"></i> Gửi ngay';}
}

function renderEmailLog(){
  const el=document.getElementById('email-log-list');
  if(!el) return;
  if(!emailLog.length){ el.innerHTML='<div style="padding:14px;font-size:11px;color:var(--text3);text-align:center">Chưa có lịch sử gửi</div>'; return; }
  el.innerHTML=emailLog.slice(0,10).map(l=>`<div class="email-log-item">
    <div style="flex:1">
      <div style="font-weight:600;font-size:11px">${l.subject}</div>
      <div style="font-size:10px;color:var(--text2);margin-top:2px">${new Date(l.date).toLocaleString('vi-VN')} · ${l.recipients} recipients</div>
    </div>
    <div style="text-align:right;flex-shrink:0">
      <span class="email-badge ${l.fail===0?'eb-sent':l.success===0?'eb-fail':'eb-scheduled'}">${l.fail===0?`✓ ${l.success} sent`:l.success===0?`✕ Failed`:`${l.success}✓ ${l.fail}✕`}</span>
      <div style="font-size:9px;color:var(--text3);margin-top:3px">${l.type==='test'?'Manual test':'Auto send'}</div>
    </div>
  </div>`).join('');
}

// Auto-scheduler: check every minute if it's time to send
function startEmailScheduler(){
  setInterval(()=>{
    if(!emailSettings.enabled) return;
    if(!emailSettings.serviceId||!emailSettings.templateId||!emailSettings.publicKey) return;
    if(!emailSettings.recipients.length) return;
    const now=new Date();
    const hhmm=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
    const todayStr=now.toISOString().slice(0,10);
    if(hhmm===emailSettings.sendTime && emailSettings.lastSentDate!==todayStr){
      console.log('[PMS Email] Auto-sending daily report...');
      sendEmailNow(false);
    }
  }, 30000); // check every 30s
}

function updateEmailPreview(){
  const el=document.getElementById('email-preview-box');
  if(el){ el.textContent=buildEmailReport(); }
}

// ─── ADMIN ────────────────────────────────────────────
function checkAdmin(){
  const input=getVal('admin-pwd');
  if(input===adminPwd){
    adminUnlocked=true;
    document.getElementById('admin-lock-screen').style.display='none';
    document.getElementById('admin-content').style.display='block';
    setVal('admin-pwd','');
    renderRoomMgmt(); renderRTMgmt();
    toast('Đã xác thực admin ✓');
  } else {
    document.getElementById('admin-pwd-err').textContent='Mật khẩu không đúng. Mặc định: admin123';
    setTimeout(()=>{ const el=document.getElementById('admin-pwd-err');if(el)el.textContent=''; },3000);
  }
}
function lockAdmin(){ adminUnlocked=false; document.getElementById('admin-lock-screen').style.display='block'; document.getElementById('admin-content').style.display='none'; }
function changePassword(){
  const cur=getVal('a-pwd-cur'),nw=getVal('a-pwd-new'),cf=getVal('a-pwd-conf');
  const st=document.getElementById('pwd-status');
  if(cur!==adminPwd){st.innerHTML='<span style="color:var(--warn)">Mật khẩu hiện tại không đúng.</span>';return;}
  if(nw.length<4){st.innerHTML='<span style="color:var(--warn)">Tối thiểu 4 ký tự.</span>';return;}
  if(nw!==cf){st.innerHTML='<span style="color:var(--warn)">Mật khẩu không khớp.</span>';return;}
  adminPwd=nw; save('ct_admin_pwd',adminPwd);
  ['a-pwd-cur','a-pwd-new','a-pwd-conf'].forEach(id=>setVal(id,''));
  st.innerHTML='<span style="color:var(--g2)">✓ Đã đổi mật khẩu.</span>';
  toast('Đổi mật khẩu thành công');
}
function saveHotelInfo(){
  save('ct_hotel_info',{name:getVal('a-hotel-name'),addr:getVal('a-hotel-addr'),tel:getVal('a-hotel-tel'),email:getVal('a-hotel-email')});
  toast('Đã lưu thông tin resort');
}
function clearAllData(){ if(!confirm('XÓA TOÀN BỘ booking?'))return; bookings=[]; save('ct_bookings',bookings); initCmp(); renderAll(); toast('Đã xóa tất cả','info'); }
function renderRoomMgmt(){
  const el=document.getElementById('room-mgmt-list');if(!el)return;
  el.innerHTML=rooms.map((r,i)=>`<div class="room-edit-row">
    <span style="font-weight:700;min-width:38px;color:${rtColor(r.type)}">${r.id}</span>
    <span style="flex:1;font-size:11px">${r.type} · ${r.view} · ${r.size} · ${r.pax} PAX</span>
    <span class="badge ${r.status==='maint'?'b-maint':'b-vacant'}">${r.status==='maint'?'Bảo trì':'Active'}</span>
    <button class="btn btn-ghost btn-xs" onclick="toggleRoomStatus(${i})" title="Toggle"><i class="ti ti-refresh" style="font-size:10px"></i></button>
    <button class="btn btn-warn btn-xs" onclick="deleteRoom(${i})"><i class="ti ti-trash" style="font-size:10px"></i></button>
  </div>`).join('');
}
function renderRTMgmt(){
  const el=document.getElementById('rt-mgmt-list');if(!el)return;
  el.innerHTML=roomTypes.map((rt,i)=>`<div class="room-edit-row">
    <span style="width:12px;height:12px;border-radius:50%;background:${rt.color};display:inline-block;flex-shrink:0"></span>
    <span style="flex:1;font-size:11px;font-weight:600">${rt.name}</span>
    <input type="color" value="${rt.color}" onchange="updateRTColor(${i},this.value)" style="width:30px;height:24px;border:none;border-radius:4px;cursor:pointer;padding:0;background:none" title="Chọn màu">
    <button class="btn btn-warn btn-xs" onclick="deleteRT(${i})"><i class="ti ti-trash" style="font-size:10px"></i></button>
  </div>`).join('');
}
function toggleRoomStatus(i){ rooms[i].status=rooms[i].status==='maint'?'active':'maint'; save('ct_rooms',rooms); renderRoomMgmt(); renderRoomPlan(); toast('Đã cập nhật trạng thái phòng'); }
function deleteRoom(i){ if(!confirm('Xóa phòng '+rooms[i].id+'?'))return; rooms.splice(i,1); save('ct_rooms',rooms); renderRoomMgmt(); populateSelects(); renderRoomPlan(); toast('Đã xóa phòng','info'); }
function deleteRT(i){ if(!confirm('Xóa loại phòng '+roomTypes[i].name+'?'))return; roomTypes.splice(i,1); save('ct_rt',roomTypes); renderRTMgmt(); populateSelects(); toast('Đã xóa loại phòng','info'); }
function updateRTColor(i,c){ roomTypes[i].color=c; save('ct_rt',roomTypes); renderRTMgmt(); renderAll(); }
function openAddRoom(){ setVal('rm-id',''); document.getElementById('room-modal-title').textContent='Add Room'; editingRoomIdx=null; document.getElementById('room-modal').style.display='flex'; populateSelects(); }
function closeRoomModal(){ document.getElementById('room-modal').style.display='none'; }
function saveRoom(){
  const id=getVal('rm-id').trim();
  if(!id){toast('Nhập Room ID','error');return;}
  const r={id,type:getVal('rm-type'),zone:getVal('rm-zone'),view:getVal('rm-view'),pax:Number(getVal('rm-pax'))||2,size:getVal('rm-size')||'',status:getVal('rm-status')};
  if(editingRoomIdx!==null) rooms[editingRoomIdx]=r; else rooms.push(r);
  save('ct_rooms',rooms); renderRoomMgmt(); populateSelects(); renderRoomPlan(); closeRoomModal(); toast('Đã lưu phòng');
}
function openAddRT(){
  const name=prompt('Tên loại phòng mới:'); if(!name)return;
  const color=prompt('Màu hex (ví dụ #2a6880):')||'#888888';
  roomTypes.push({id:name.toLowerCase().replace(/\s+/g,'-'),name,color}); save('ct_rt',roomTypes); renderRTMgmt(); populateSelects(); toast('Đã thêm loại phòng');
}

// ─── FIREBASE / SHEETS ────────────────────────────────
async function connectFirebase(){
  const raw = getVal('fb-config').trim();

  if(!raw){
    document.getElementById('fb-status').innerHTML = '<span style="color:var(--warn)">Paste Firebase config JSON.</span>';
    return;
  }

  try{
    let cleaned = raw.trim();

    cleaned = cleaned
      .replace(/^const\s+firebaseConfig\s*=\s*/,'')
      .replace(/;+\s*$/,'');

    let cfg;

    try {
      cfg = JSON.parse(cleaned);
    } catch {
      cfg = Function('"use strict"; return (' + cleaned + ')')();
    }

    if(!cfg.projectId) throw new Error('projectId missing');

    if (!window._firebaseModules && typeof loadFirebase === 'function') {
      await loadFirebase();
    }

    const {
      initializeApp,
      getApp,
      getFirestore,
      collection,
      onSnapshot
    } = window._firebaseModules || {};

    if(!initializeApp) throw new Error('Firebase SDK not loaded');

    let app;

    try {
      app = getApp('ct-pms');
    } catch {
      app = initializeApp(cfg, 'ct-pms');
    }

    fbDB = getFirestore(app);

    if(fbUnsub) fbUnsub();

    fbUnsub = onSnapshot(collection(fbDB,'bookings'), snap => {
      bookings = snap.docs
        .map(d => ({...d.data(), _fid:d.id}))
        .map(b => ({
          ...b,
          roomPrice:Number(b.roomPrice)||0,
          fnb:Number(b.fnb)||0,
          service:Number(b.service)||0,
          remains:Number(b.remains)||0,
          pax:Number(b.pax)||1
        }));

      initCmp();
      renderAll();

      setSyncStatus(
        'live',
        'Firebase · ' + new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})
      );
    });

    save('ct_fb_config', raw);

    document.getElementById('fb-status').innerHTML = '<span style="color:var(--g2)">✓ Connected — realtime ⚡</span>';
    setSyncStatus('live','Firebase Live');
    toast('Firebase đã kết nối ⚡');

  } catch(e){
    setSyncStatus('error','Error');
    document.getElementById('fb-status').innerHTML = `<span style="color:var(--warn)">✕ ${e.message}</span>`;
  }
}
function disconnectFB(){ if(fbUnsub){fbUnsub();fbUnsub=null;} fbDB=null; setSyncStatus('off','Demo mode'); document.getElementById('fb-status').textContent='Đã ngắt Firebase.'; }
async function syncNow(){
  if(!sheetsUrl) return;
  setSyncStatus('loading','Syncing...');
  const btn=document.getElementById('sync-btn'); if(btn) btn.disabled=true;
  try{
    const res=await fetch(sheetsUrl,{mode:'cors'}); const json=await res.json();
    if(json.data){ bookings=json.data.map(r=>({...r,roomPrice:Number(r.roomPrice)||0,fnb:Number(r.fnb)||0,service:Number(r.service)||0,remains:Number(r.remains)||0,pax:Number(r.pax)||1})); initCmp(); renderAll(); save('ct_bookings',bookings); }
    const now=new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'});
    setSyncStatus('live','Sheets · '+now);
    document.getElementById('sync-time').textContent='Sync: '+now;
    const gss=document.getElementById('gs-status'); if(gss) gss.innerHTML=`<span style="color:var(--g2)">✓ ${bookings.length} bookings synced</span>`;
    toast(`Sync thành công: ${bookings.length} bookings`);
  } catch(e){ setSyncStatus('error','Sync error'); const gss=document.getElementById('gs-status'); if(gss) gss.innerHTML=`<span style="color:var(--warn)">✕ ${e.message}</span>`; }
  if(btn) btn.disabled=false;
}
function connectSheets(){ const url=getVal('gs-url').trim(); if(!url)return; sheetsUrl=url; save('ct_sheets_url',url); syncNow(); updateRefresh(); }
function disconnectSheets(){ sheetsUrl=''; if(refreshTimer)clearInterval(refreshTimer); setSyncStatus('off','Demo mode'); }
function updateRefresh(){ if(refreshTimer)clearInterval(refreshTimer); const el=document.getElementById('refresh-sel'); const v=parseInt(el?el.value:300); if(v>0&&sheetsUrl) refreshTimer=setInterval(syncNow,v*1000); }

// ─── EXPORT ───────────────────────────────────────────
function toXLSX(sheets,fn){ const wb=XLSX.utils.book_new(); sheets.forEach(({name,data})=>XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(data),name)); XLSX.writeFile(wb,fn); }
function exportExcel(){
  const d=getFiltered();
  const h=['ID','Check-in','Check-out','Guest','Nation','Pax','Room','Room Type','Source','Room Price','F&B','Service','Total','Paid','Remains','Notes'];
  const rows=d.map(b=>[b.id,b.checkin,b.checkout,b.guest,b.nation,b.pax,b.room,b.roomType||'',b.source,b.roomPrice,b.fnb,b.service,b.roomPrice+b.fnb+b.service,b.paid,b.remains,b.notes||'']);
  const k=calcKPIs(d);
  const ks=[['Cat Tien Jungle Lodge — KPI Report'],[''],['Metric','Value'],['Total Revenue',k.totalRev],['Room Revenue',k.roomRev],['F&B Revenue',k.fnbRev],['Service Revenue',k.svcRev],['Bookings',k.bc],['PAX',k.pax],['Room nights',k.rn],['ADR',Math.round(k.adr)],['AOV',Math.round(k.aov)],['ALOS',+k.alos.toFixed(2)],['Rev/PAX',Math.round(k.revPax)],['Unpaid',k.unpaid],['Collection %',+k.collRate.toFixed(1)]];
  toXLSX([{name:'Bookings',data:[h,...rows]},{name:'KPI Summary',data:ks}],'cat_tien_'+TODAY+'.xlsx');
  toast('Export thành công');
}
function exportRTExcel(){
  const d=getFiltered(); const stats={}; rtNames().forEach(rt=>{stats[rt]={bc:0,rn:0,pax:0,roomRev:0,fnb:0,svc:0,unpaid:0};});
  d.forEach(b=>{const rt=b.roomType;if(!stats[rt])stats[rt]={bc:0,rn:0,pax:0,roomRev:0,fnb:0,svc:0,unpaid:0};stats[rt].bc++;stats[rt].rn+=nights(b.checkin,b.checkout);stats[rt].pax+=Number(b.pax);stats[rt].roomRev+=b.roomPrice;stats[rt].fnb+=b.fnb;stats[rt].svc+=b.service;stats[rt].unpaid+=Number(b.remains);});
  const h=['Room Type','Bookings','Nights','PAX','Room Rev','F&B','Service','Total','ADR','ALOS','Rev/PAX','Collect %'];
  const rows=rtNames().filter(k=>stats[k]&&stats[k].bc>0).map(rt=>{const s=stats[rt];const tot=s.roomRev+s.fnb+s.svc;return[rt,s.bc,s.rn,s.pax,s.roomRev,s.fnb,s.svc,tot,+(s.rn>0?s.roomRev/s.rn:0).toFixed(0),+(s.bc>0?s.rn/s.bc:0).toFixed(2),+(tot/Math.max(1,s.pax)).toFixed(0),+((tot>0?(tot-s.unpaid)/tot*100:0).toFixed(1))];});
  toXLSX([{name:'Room Type',data:[h,...rows]}],'room_type_cat_tien.xlsx');
}
function exportCmpExcel(){
  const m1=getVal('cmp-m1'),m2=getVal('cmp-m2');
  const k1=calcKPIs(bookings.filter(b=>b.checkin.startsWith(m1))),k2=calcKPIs(bookings.filter(b=>b.checkin.startsWith(m2)));
  const chg=(a,b)=>b===0?'N/A':+((a-b)/Math.abs(b)*100).toFixed(1)+'%';
  const h=['Metric',m1,m2,'Change %'];
  const rows=[['Total Revenue',k1.totalRev,k2.totalRev,chg(k1.totalRev,k2.totalRev)],['Room Revenue',k1.roomRev,k2.roomRev,chg(k1.roomRev,k2.roomRev)],['F&B',k1.fnbRev,k2.fnbRev,chg(k1.fnbRev,k2.fnbRev)],['Bookings',k1.bc,k2.bc,chg(k1.bc,k2.bc)],['ADR',Math.round(k1.adr),Math.round(k2.adr),chg(k1.adr,k2.adr)],['ALOS',+k1.alos.toFixed(2),+k2.alos.toFixed(2),chg(k1.alos,k2.alos)],['Collection %',+k1.collRate.toFixed(1),+k2.collRate.toFixed(1),chg(k1.collRate,k2.collRate)],['Unpaid',k1.unpaid,k2.unpaid,chg(k1.unpaid,k2.unpaid)]];
  toXLSX([{name:'Comparison',data:[h,...rows]}],'compare_cat_tien.xlsx');
}

// ─── NAVIGATION ───────────────────────────────────────
const PAGE_META={
  dashboard:    ['Dashboard',      'Sales overview'],
  roomplan:     ['Room Plan',      'Live occupancy · '+TODAY],
  timeline:     ['Timeline',       '14-day view'],
  'new-booking':['New Booking',    'Add reservation'],
  bookings:     ['All Bookings',   'Reservations'],
  roomtype:     ['Room Type',      'Revenue analysis'],
  compare:      ['So sánh tháng',  'Month comparison'],
  alerts:       ['Alerts',         'Unpaid balance'],
  email:        ['Email Alerts',   'Daily room plan digest'],
  admin:        ['Admin Panel',    'System management'],
  settings:     ['Settings',       'Preferences'],
};
function navTo(name,el){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  if(el) el.classList.add('active');
  else document.querySelector(`[data-tab="${name}"]`)?.classList.add('active');
  const meta=PAGE_META[name]||[name,''];
  document.getElementById('page-title').textContent=meta[0];
  document.getElementById('page-sub').textContent=meta[1];
  document.getElementById('main-page').scrollTop=0;
  setTimeout(()=>{
    if(name==='dashboard')renderDashCharts();
    else if(name==='roomplan')renderRoomPlan();
    else if(name==='timeline')renderTimeline();
    else if(name==='roomtype')renderRoomType();
    else if(name==='compare')renderCompare();
    else if(name==='email'){updateEmailPreview();renderEmailLog();}
    else if(name==='admin'&&adminUnlocked){renderRoomMgmt();renderRTMgmt();}
  },30);
}

// ─── RENDER ALL ───────────────────────────────────────
function renderAll(){
  renderHero(); renderKPIs(); renderDashCharts();
  renderRoomPlan(); renderBookings(); renderAlerts(); renderTimeline();
}

// ─── PWA ──────────────────────────────────────────────
let _dp=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();_dp=e;document.getElementById('install-banner').style.display='flex';});
document.getElementById('install-btn')?.addEventListener('click',()=>{if(!_dp)return;_dp.prompt();_dp.userChoice.then(()=>{_dp=null;document.getElementById('install-banner').style.display='none';});});
window.addEventListener('appinstalled',()=>{document.getElementById('install-banner').style.display='none';});

// ─── INIT ─────────────────────────────────────────────
(function init(){
  loadAll();
  currentTheme = load('ct_theme','light');
  applyTheme(); updateThemeUI();
  const today=new Date();
  const m1=new Date(today.getFullYear(),today.getMonth()-1,1);
  setVal('from-date',m1.toISOString().slice(0,10));
  setVal('to-date',today.toISOString().slice(0,10));
  populateSelects();
  initCmp();
  renderAll();
  startEmailScheduler();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
  if(location.hash){ const t=location.hash.slice(1); if(PAGE_META[t]) navTo(t,null); }
})();
