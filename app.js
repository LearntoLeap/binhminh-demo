'use strict';
/* =================== Tiện ích =================== */
const $ = (s, el = document) => el.querySelector(s);
const vnd = n => Number(n).toLocaleString('vi-VN') + 'đ';
const num = n => Number(n).toLocaleString('vi-VN');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
const pad = n => String(n).padStart(2, '0');
const today = () => { const d = new Date(); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`; };
const nowHM = () => { const d = new Date(); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* chế độ riêng tư: bỏ qua */ } },
};
const IN_FRAME = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
if (IN_FRAME) document.documentElement.classList.add('framed');

/* Ba trang web: "/" Trang thông tin MTTQ, "/ocop/" Chợ OCOP, "/admin/" trang tổng (tổng quan đề xuất, quản trị, điện thoại).
   Mã vẫn dùng đường dẫn nội bộ "#/mttq/…", "#/cho/…", "#/quan-tri"…; link() đổi sang địa chỉ thật của từng trang. */
const SITE = window.BM_SITE || 'mttq';
const SITE_DIR = { mttq: '', cho: 'ocop/', hub: 'admin/' };
const ROOT = SITE_DIR[SITE] ? '../' : '';
// Thanh BẢN DEMO chỉ hiện ở trang tổng /admin/
const SHOW_BAR = !IN_FRAME && SITE === 'hub';
if (!SHOW_BAR) document.documentElement.classList.add('nobar');
const siteOf = m => (m === 'mttq' || m === 'cho') ? m : 'hub';
function link(p) {
  const m = p.split('/')[0], t = siteOf(m), rest = t === 'hub' ? p : p.slice(m.length + 1);
  return (t === SITE ? '' : ROOT + SITE_DIR[t]) + '#/' + rest;
}
const fixLinks = html => html
  .replace(/href="#\/([^"]*)"/g, (_, p) => `href="${link(p)}"`)
  .replace(/src="(?!https?:|data:|\.\.\/|\/|#)([^"]+)"/g, (_, p) => `src="${ROOT}${p}"`);
const go = p => { const u = link(p); if (u.startsWith('#')) location.hash = u; else location.href = u; };

const I = {
  msg: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  poll: '<path d="M5 20V11M12 20V4M19 20v-7"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c1.9.8 3.1 2.6 3.5 5.2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 8H6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
  truck: '<path d="M2 6h12v10H2zM14 9h4l3 3v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  spark: '<path d="M12 3c.6 4.6 3.4 7.4 8 8-4.6.6-7.4 3.4-8 8-.6-4.6-3.4-7.4-8-8 4.6-.6 7.4-3.4 8-8z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  send: '<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="m10 13 4-4"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19 13 11"/>',
  chat: '<path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
  bank: '<path d="M3 9 12 4l9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  store: '<path d="M4 9 5.5 4h13L20 9M4 9v11h16V9M4 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3"/><path d="M10 20v-5h4v5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.2-7 8-7s7 2.5 8 7"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  zalo: '<path d="M4 5h16v11h-9l-4 4v-4H4z"/><path d="M8 9h5l-5 4h5"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ''}</svg>`;

/* =================== Trạng thái =================== */
const DEF_FILT = { cat: '', ocop: '', vung: '', q: '', sort: 'pho-bien' };
const S = {
  cart: store.get('bm.cart', []),
  myReports: store.get('bm.reports', []),
  rStatus: store.get('bm.rstatus', {}),
  votes: store.get('bm.votes', {}),
  pending: store.get('bm.pending', PENDING),
  myOrders: store.get('bm.orders', []),
  chatOpen: false,
  chat: [{ who: 'bot', text: 'Xin chào bà con! Tôi là trợ lý hỏi đáp của Ủy ban MTTQ xã Bình Minh. Bà con cần hỏi việc gì ạ?' }],
  filt: { ...DEF_FILT },
  gal: {},
  slide: 0,
  newsOrg: '',
  homeOrg: 'Hội Nông dân',
  admTab: 'tong-quan',
  rFilter: 'all',
  xomQ: '',
  sellerVung: '',
  uploaded: false,
  lastOrder: store.get('bm.lastOrder', null),
  aiOut: null,
  fs: 1,
  pollShow: false,
  socOrg: '',
};
const saveCart = () => store.set('bm.cart', S.cart);
const P = id => PRODUCTS.find(p => p.id === id);
const SL = id => SELLERS.find(s => s.id === id);
const catName = id => (CATS.find(c => c.id === id) || {}).name || '';
const cartCount = () => S.cart.reduce((a, c) => a + c.qty, 0);
const initials = name => name.split(/\s+/).slice(1).filter(w => /^[A-ZĐÂĂÊÔƠƯ]/.test(w)).slice(-2).map(w => w[0]).join('') || name[0];
const ava = (s, size = '') => `<span class="ava" style="background:${s.color}${size}">${esc(initials(s.name))}</span>`;
const allReports = () => [...S.myReports, ...REPORTS].map(r => {
  const o = S.rStatus[r.code];
  return o ? { ...r, status: o.status, answer: o.answer ?? r.answer, steps: [...r.steps, ...(o.steps || [])] } : r;
});

let toastT;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600);
}
function modal(html) { $('#modal-root').innerHTML = fixLinks(`<div class="modal-bg" data-act="close-modal"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`); }
function closeModal() { $('#modal-root').innerHTML = ''; }

/* =================== Điều hướng =================== */
function hashSeg() { return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent); }
function parse() { const s = hashSeg(); return SITE === 'hub' ? s : [SITE, ...s]; }
const LEGACY = ['mttq', 'cho', 'quan-tri', 'dien-thoai'];

function render(keepScroll) {
  // link cũ dạng "#/mttq/…", "#/cho/…", "#/quan-tri": chuyển về đúng trang
  const raw = hashSeg();
  if (SITE === 'hub' ? siteOf(raw[0]) !== 'hub' : LEGACY.includes(raw[0])) { location.replace(link(raw.join('/'))); return; }
  const seg = parse(), mod = seg[0] || '';
  let html, title;
  if (mod === 'mttq') { html = govPage(seg.slice(1)); title = 'Trang thông tin Ủy ban MTTQ Việt Nam xã Bình Minh'; }
  else if (mod === 'cho') { html = mkPage(seg.slice(1)); title = 'Chợ OCOP Bình Minh'; }
  else if (mod === 'quan-tri') { html = adminPage(); title = 'Quản trị – Bình Minh Kết Nối'; }
  else if (mod === 'dien-thoai') { html = phonePage(); title = 'Trên điện thoại'; }
  else { html = overviewPage(); title = 'Bình Minh Kết Nối – Đề xuất'; }
  const y = window.scrollY;
  $('#app').innerHTML = fixLinks((SHOW_BAR ? demoBar(mod) : '') + html);
  document.title = title + ' · bản demo';
  renderChat(mod === 'mttq');
  startSlider();
  window.scrollTo(0, keepScroll ? y : 0);
}
window.addEventListener('hashchange', () => { closeModal(); render(); });

function demoBar(mod) {
  const tabs = [['', '#/', 'Tổng quan đề xuất'], ['mttq', '#/mttq', 'Trang MTTQ xã'], ['cho', '#/cho', 'Chợ OCOP'], ['quan-tri', '#/quan-tri', 'Trang quản trị'], ['dien-thoai', '#/dien-thoai', 'Trên điện thoại']];
  return `<div class="demobar"><div class="in"><span class="tag">BẢN DEMO</span><span class="note">Dữ liệu minh họa, không phải số liệu chính thức</span>
    <nav aria-label="Phân hệ demo">${tabs.map(([k, h, t]) => `<a href="${h}" class="${k === mod ? 'on' : ''}">${t}</a>`).join('')}</nav></div></div>`;
}

/* =================================================================
   CHỢ OCOP BÌNH MINH
   ================================================================= */
const OCOP_LINK = `href="#/cho/san-pham" data-filt='{"ocop":"ocop"}'`;
const MK_NAV = [['', 'Trang chủ', 'href="#/cho"'], ['san-pham', 'Sản phẩm', `href="#/cho/san-pham" data-filt="{}"`], ['ocop', 'Sản phẩm OCOP', OCOP_LINK], ['gian-hang', 'Gian hàng', 'href="#/cho/gian-hang"'], ['mua-vu', 'Lịch mùa vụ', 'href="#/cho/mua-vu"']];

function mkPage(seg) {
  const p = seg[0] || '';
  let body, active = p;
  if (p === 'san-pham') { body = mkList(); if (S.filt.ocop === 'ocop' && !S.filt.cat && !S.filt.q) active = 'ocop'; }
  else if (p === 'sp') { body = mkProduct(seg[1]); active = 'san-pham'; }
  else if (p === 'gian-hang') body = seg[1] ? mkSeller(seg[1]) : mkSellers();
  else if (p === 'mua-vu') body = mkSeason();
  else if (p === 'gio-hang') body = mkCart();
  else if (p === 'dat-hang') body = mkDone();
  else if (p === 'dang-ky') body = mkRegister();
  else body = mkHome();
  return `<div class="mk">${mkHeader(active)}<main>${body}</main>${mkFooter()}</div>`;
}

function mkHeader(active) {
  const n = cartCount();
  return `<header>
    <div class="mk-strip"><div class="wrap"><span>Sàn giới thiệu, kết nối tiêu thụ sản phẩm OCOP xã Bình Minh · Ủy ban MTTQ và Hội Nông dân xã bảo trợ</span>
      <span class="r"><a href="#/mttq">Trang MTTQ xã</a><a href="#/dien-thoai">Zalo Mini App</a><span>Hotline 0238 3xxx xxx</span><a href="#/quan-tri">Đăng nhập người bán</a></span></div></div>
    <div class="mk-top"><div class="wrap">
      <a class="mk-logo" href="#/cho"><span class="lg">${ART.mkLogo()}</span><span><small>Chợ OCOP</small><b>Bình Minh</b></span></a>
      <form class="mk-search" data-form="mk-search" role="search"><input name="q" value="${esc(S.filt.q)}" placeholder="Tìm gạo, ốc, mật ong, tương…" aria-label="Tìm sản phẩm"><button aria-label="Tìm">${ic('search')}</button></form>
      <div class="mk-actions">
        <a class="btn ghost sm hide-s" href="#/cho/dang-ky">${ic('store', 'sm')} Mở gian hàng</a>
        <a class="btn green sm cartbtn" href="#/cho/gio-hang">${ic('cart', 'sm')} Giỏ hàng${n ? `<span class="n">${n}</span>` : ''}</a>
      </div>
    </div></div>
    <nav class="mk-nav" aria-label="Danh mục"><div class="wrap">${MK_NAV.map(([k, t, h]) => `<a ${h} class="${k === active ? 'on' : ''}">${t}</a>`).join('')}<a class="alt" href="#/mttq">Trang MTTQ xã ↗</a></div></nav>
  </header>`;
}

function mkFooter() {
  return `<footer class="mk-foot"><div class="wrap cols">
    <div><h4>Chợ OCOP Bình Minh</h4><p>Kênh giới thiệu và kết nối tiêu thụ sản phẩm của hợp tác xã, tổ hợp tác, hộ sản xuất xã Bình Minh, tỉnh Nghệ An. Do Ủy ban MTTQ và Hội Nông dân xã bảo trợ.</p></div>
    <div><h4>Mua hàng</h4><a href="#/cho/san-pham" data-filt="{}">Tất cả sản phẩm</a><a ${OCOP_LINK}>Sản phẩm OCOP</a><a href="#/cho/mua-vu">Lịch mùa vụ</a></div>
    <div><h4>Người bán</h4><a href="#/cho/dang-ky">Mở gian hàng</a><a href="#/cho/gian-hang">Danh sách gian hàng</a><a href="#/quan-tri">Quản lý đơn hàng</a></div>
    <div><h4>Hỗ trợ</h4><a href="#/dien-thoai">Zalo Mini App</a><a href="#/mttq/phan-anh">Góp ý, khiếu nại</a><span>Hotline: 0238 3xxx xxx</span></div>
  </div><div class="bottom">Bản demo · Sản phẩm, giá, người bán là dữ liệu minh họa</div></footer>`;
}

function badge(p) { return p.ocop ? `<span class="ocop">OCOP ${'★'.repeat(p.ocop)}</span>` : `<span class="ocop t">${p.tag}</span>`; }
function pcard(p) {
  const s = SL(p.seller);
  return `<a class="pcard" href="#/cho/sp/${p.id}"><div class="art">${ph(p.img)}</div>${badge(p)}
    <div class="b"><h3>${esc(p.name)}</h3><div class="seller">${esc(s.short)} · ${s.vung}</div>
    <div class="rate"><span class="star">★</span> ${p.rating.toFixed(1).replace('.', ',')} · Đã bán ${num(p.sold)}</div>
    <div class="row"><span class="price">${vnd(p.price)}</span> <span class="unit">/ ${p.unit}</span></div></div></a>`;
}

const SLIDES = [
  { img: 'banner', kick: 'Đặc sản 20 xóm · xã Bình Minh, Nghệ An', title: 'Mua tận gốc nông sản quê Bình Minh', text: 'Gạo, ốc, gà đồi, mật ong, tương nếp… từ hợp tác xã và bà con. Biết rõ ai làm ra, quét QR xem nguồn gốc, tiền chuyển thẳng cho người sản xuất.', btn: 'Mua sắm ngay', href: '#/cho/san-pham', filt: '{}' },
  { img: 'honey', kick: 'Sản phẩm OCOP 3 – 4 sao', title: 'Chất lượng được thẩm định, có tem truy xuất', text: 'Mật ong hoa rừng, chè vằng, gạo thơm Bàu Canh, tương nếp, gà đồi… đạt hạng sao theo Bộ tiêu chí OCOP (dữ liệu minh họa).', btn: 'Xem sản phẩm OCOP', href: '#/cho/san-pham', filt: '{"ocop":"ocop"}' },
  { img: 'temple_gate', kick: 'Du lịch cộng đồng', title: 'Một ngày làm nông & viếng đền Canh', text: 'Cấy lúa, bắt ốc, nấu cơm cùng bà con; nghe chuyện bàu Canh, viếng di tích lịch sử – văn hóa cấp tỉnh.', btn: 'Đặt lịch trải nghiệm', href: '#/cho/sp/trai-nghiem-bau-canh' },
];
let slideTimer;
function goSlide(i) {
  S.slide = i;
  document.querySelectorAll('#slider .slide').forEach((el, k) => el.classList.toggle('on', k === i));
  document.querySelectorAll('#slider .dots button').forEach((el, k) => el.classList.toggle('on', k === i));
}
function startSlider() {
  clearInterval(slideTimer);
  if ($('#slider')) slideTimer = setInterval(() => goSlide((S.slide + 1) % SLIDES.length), 6000);
}

function mkHome() {
  const ocop = PRODUCTS.filter(p => p.ocop);
  const month = new Date().getMonth() + 1;
  const inSeason = PRODUCTS.filter(p => SEASON[p.id] && SEASON[p.id].on.includes(month) && p.cat !== 'du-lich').sort((a, b) => (SEASON[b.id].peak.includes(month) - SEASON[a.id].peak.includes(month)) || b.sold - a.sold).slice(0, 5);
  const tour = P('trai-nghiem-bau-canh');
  return `
  <section class="mk-hero2"><div class="wrap">
    <div class="slider" id="slider">
      ${SLIDES.map((sl, i) => `<div class="slide ${i === S.slide ? 'on' : ''}"><div class="art">${ph(sl.img)}</div>
        <div class="cap"><span class="eyebrow">${sl.kick}</span><h1>${sl.title}</h1><p>${sl.text}</p><a class="btn gold lg" href="${sl.href}" ${sl.filt ? `data-filt='${sl.filt}'` : ''}>${sl.btn} ${ic('arrow', 'sm')}</a></div></div>`).join('')}
      <div class="dots">${SLIDES.map((_, i) => `<button data-act="slide" data-v="${i}" class="${i === S.slide ? 'on' : ''}" aria-label="Ảnh ${i + 1}"></button>`).join('')}</div>
    </div>
    <div class="promos">
      <a class="promo" href="#/cho/dang-ky"><div class="art">${ph('vendor')}</div><span><b>Mở gian hàng miễn phí</b>Tổ công nghệ số cộng đồng đến tận nhà hỗ trợ</span></a>
      <a class="promo" href="#/cho/sp/cam-duong"><div class="art">${ph('orange_tree')}</div><span><b>Cam vườn đồi vào mùa</b>Hái khi có đơn · tháng 10 đến tháng 1</span></a>
    </div>
  </div></section>
  <div class="wrap"><div class="mk-stats">
    <div>${ic('leaf')}<span><b>${PRODUCTS.length}</b> sản phẩm</span></div><div>${ic('store')}<span><b>${SELLERS.length}</b> gian hàng đã xác minh</span></div>
    <div>${ic('shield')}<span><b>${ocop.length}</b> sản phẩm OCOP</span></div><div>${ic('qr')}<span><b>100%</b> có tem QR truy xuất</span></div><div>${ic('truck')}<span><b>Giao</b> toàn quốc qua bưu chính</span></div>
  </div></div>

  <div class="wrap">
    <div class="mh"><div><h2>Danh mục</h2></div></div>
    <div class="cats">${CATS.map(c => `<a class="cat" href="#/cho/san-pham" data-filt='{"cat":"${c.id}"}'><div class="art">${ph(c.img)}</div><b>${c.name}</b></a>`).join('')}</div>

    <div class="mh"><div><h2>Sản phẩm OCOP của xã</h2><p>Đạt hạng sao theo Bộ tiêu chí OCOP (dữ liệu minh họa)</p></div><a ${OCOP_LINK}>Xem tất cả →</a></div>
    <div class="pgrid">${ocop.slice(0, 5).map(pcard).join('')}</div>

    <div class="mh"><div><h2>Đang vào mùa – tháng ${month}</h2><p>Hái, gặt khi có đơn để giữ độ tươi</p></div><a href="#/cho/mua-vu">Lịch mùa vụ →</a></div>
    <div class="pgrid">${inSeason.map(pcard).join('')}</div>

    <div class="mh"><div><h2>Gian hàng tiêu biểu</h2><p>Người thật, việc thật, câu chuyện của từng sản phẩm</p></div><a href="#/cho/gian-hang">Tất cả gian hàng →</a></div>
    <div class="sellers">${SELLERS.slice(0, 4).map(scard).join('')}</div>

    <div class="mh"><div><h2>Trải nghiệm & du lịch</h2></div></div>
    <a class="exp" href="#/cho/sp/${tour.id}"><div class="art">${ph('homestay')}</div><div class="b"><span class="eyebrow">Du lịch cộng đồng</span><h3>${esc(tour.name)}</h3><p class="muted">${esc(tour.desc)}</p><div><span class="price">${vnd(tour.price)}</span> <span class="unit">/ ${tour.unit}</span></div><span class="btn green" style="align-self:flex-start">Đặt lịch trải nghiệm</span></div></a>

    <div class="mh"><div><h2>Vì sao mua ở Chợ OCOP Bình Minh?</h2></div></div>
    <div class="trust">
      <div>${ic('qr')}<span><b>Truy xuất bằng QR</b>Mỗi sản phẩm có tem QR: ai làm, làm ở đâu, lô nào</span></div>
      <div>${ic('bank')}<span><b>Tiền về thẳng người bán</b>Thanh toán VietQR vào tài khoản người sản xuất</span></div>
      <div>${ic('truck')}<span><b>Giao tận nơi</b>Qua bưu điện, Viettel Post; nhận tại xã miễn phí</span></div>
      <div>${ic('shield')}<span><b>Có Mặt trận bảo trợ</b>MTTQ, Hội Nông dân xã xác minh từng gian hàng</span></div>
    </div>
  </div>`;
}

function scard(s) {
  const n = PRODUCTS.filter(p => p.seller === s.id).length;
  return `<a class="scard" href="#/cho/gian-hang/${s.id}"><div class="art cover">${ph(s.img)}</div><div class="hd">${ava(s)}<div><b>${esc(s.name)}</b><span>${s.xom} · vùng ${s.vung} · ${n} sản phẩm</span></div></div><p>${esc(s.story)}</p></a>`;
}

function filtered() {
  const f = S.filt;
  const q = norm(f.q || '');
  const list = PRODUCTS.filter(p =>
    (!f.cat || p.cat === f.cat) &&
    (!f.ocop || (f.ocop === 'ocop' ? p.ocop >= 3 : f.ocop === '4' ? p.ocop >= 4 : p.tag === 'Tiềm năng OCOP')) &&
    (!f.vung || SL(p.seller).vung === f.vung) &&
    (!q || norm(`${p.name} ${SL(p.seller).name} ${catName(p.cat)} ${p.desc}`).includes(q)));
  const by = { 'pho-bien': (a, b) => b.sold - a.sold, 'gia-tang': (a, b) => a.price - b.price, 'gia-giam': (a, b) => b.price - a.price, 'danh-gia': (a, b) => b.rating - a.rating };
  return list.sort(by[f.sort] || by['pho-bien']);
}

function chipGroup(k, opts) {
  return `<div class="tabs">${opts.map(([v, t]) => `<button class="tab ${S.filt[k] === v ? 'on' : ''}" data-act="f" data-k="${k}" data-v="${v}">${t}</button>`).join('')}</div>`;
}

function mkList() {
  const list = filtered();
  const f = S.filt;
  const title = f.q ? `Kết quả tìm “${esc(f.q)}”` : f.ocop === 'ocop' ? 'Sản phẩm OCOP' : f.cat ? catName(f.cat) : 'Tất cả sản phẩm';
  return `<div class="wrap">
    <div class="crumb"><a href="#/cho">Chợ OCOP</a> › ${title}</div>
    <div class="filters">
      <aside class="fbox">
        <h4>Danh mục</h4>${chipGroup('cat', [['', 'Tất cả'], ...CATS.map(c => [c.id, c.name])])}
        <h4>Phân hạng</h4>${chipGroup('ocop', [['', 'Tất cả'], ['ocop', 'OCOP 3★ trở lên'], ['4', 'OCOP 4★'], ['tiem-nang', 'Tiềm năng OCOP']])}
        <h4>Vùng sản xuất</h4>${chipGroup('vung', [['', 'Cả xã'], ...VUNG.map(v => [v, v])])}
      </aside>
      <div>
        <div class="listbar"><h1 style="font-size:24px">${title} <span class="muted" style="font-size:15px;font-weight:500">· ${list.length} sản phẩm</span></h1>
          <select class="input" data-input="sort" aria-label="Sắp xếp">${[['pho-bien', 'Bán chạy'], ['danh-gia', 'Đánh giá cao'], ['gia-tang', 'Giá thấp → cao'], ['gia-giam', 'Giá cao → thấp']].map(([v, t]) => `<option value="${v}" ${f.sort === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        ${f.q ? `<p style="margin:-6px 0 12px"><button class="linkbtn" data-act="clear-q">Xóa từ khóa tìm kiếm</button></p>` : ''}
        ${list.length ? `<div class="pgrid">${list.map(pcard).join('')}</div>` : `<div class="empty">Chưa có sản phẩm phù hợp. Thử bỏ bớt bộ lọc.</div>`}
      </div>
    </div>
  </div>`;
}

function traceFor(p) {
  const s = SL(p.seller);
  const T = {
    gao: [['02/2026', 'Gieo mạ giống lúa thơm', 'Giống xác nhận do HTX cung ứng'], ['03–05/2026', 'Chăm sóc theo quy trình giảm phân hóa học', 'Nhật ký đồng ruộng ghi trên điện thoại'], ['06/2026', 'Thu hoạch, sấy khô', 'Độ ẩm hạt ≤ 14%'], ['07/2026', 'Xay xát, đóng gói hút chân không', 'Lô BC-2607'], ['10/2026', 'Phân phối', 'Chợ OCOP Bình Minh, cửa hàng OCOP tỉnh']],
    'thuy-san': [['04/2026', 'Thả giống ốc bươu đen', 'Ao ruộng 0,6 ha, xóm 12'], ['04–09/2026', 'Nuôi bằng rau, bèo, cám gạo', 'Không dùng thức ăn công nghiệp'], ['Hằng ngày', 'Thu hoạch, nhả bùn 24 giờ', 'Nước giếng sạch'], ['Trong ngày', 'Đóng túi lưới, giao hàng', 'Thùng xốp sục khí khi đi xa']],
    'gia-cam': [['03/2026', 'Nhập gà giống 1 ngày tuổi', 'Tiêm phòng đầy đủ theo lịch thú y'], ['04–08/2026', 'Thả đồi, ăn ngô, thóc, rau xanh', 'Sổ chăn nuôi ghi chép đầy đủ'], ['09/2026', 'Xuất chuồng', 'Có giấy kiểm dịch'], ['Khi có đơn', 'Làm sạch, hút chân không', 'Tem QR trên từng sản phẩm']],
    'trai-cay': [['02–03/2026', 'Ra hoa, đậu quả', 'Bón phân chuồng ủ hoai'], ['04–09/2026', 'Chăm sóc, tỉa quả', 'Ngừng phun thuốc trước thu hoạch theo đúng thời gian cách ly'], ['10/2026', 'Thu hoạch khi có đơn', 'Hái trong ngày'], ['10/2026', 'Đóng thùng, giao hàng', 'Lô CL-2610']],
    'duoc-lieu': [['03–05/2026', 'Khai thác nguyên liệu', `Vùng ${s.vung}`], ['05/2026', 'Sơ chế, chế biến', 'Cơ sở đủ điều kiện an toàn thực phẩm'], ['06/2026', 'Kiểm nghiệm chỉ tiêu chất lượng', 'Phiếu kết quả kiểm nghiệm'], ['07/2026', 'Đóng gói, dán tem', `Lô ${s.id.toUpperCase().slice(0, 3)}-2607`]],
    'che-bien': [['Nguyên liệu', 'Thu mua nguyên liệu trong xã', 'Có sổ theo dõi nguồn gốc'], ['Chế biến', 'Làm theo công thức truyền thống', 'Cơ sở đủ điều kiện an toàn thực phẩm'], ['Đóng gói', 'Đóng chai, hộp, dán tem QR', `Lô ${s.id.toUpperCase().slice(0, 3)}-2609`], ['Phân phối', 'Chợ OCOP Bình Minh', 'Hạn dùng in trên bao bì']],
    'du-lich': [['Đặt lịch', 'Đăng ký trước tối thiểu 3 ngày', 'Xác nhận qua Zalo'], ['Buổi sáng', 'Viếng đền Canh, nghe chuyện bàu Canh', 'Hướng dẫn viên là đoàn viên thanh niên'], ['Buổi trưa', 'Làm nông, nấu cơm cùng bà con', 'Nguyên liệu từ các hộ trong xã'], ['Buổi chiều', 'Mua quà quê tại gian hàng HTX', 'Thanh toán VietQR']],
  };
  return T[p.cat] || T['che-bien'];
}

const REVIEWS = [
  ['Chị Hà · TP. Vinh', 5, 'Đóng gói cẩn thận, giao nhanh. Quét QR thấy cả ruộng và ngày thu hoạch, rất yên tâm.'],
  ['Anh Tuấn · Hà Nội', 5, 'Mua làm quà cho bố mẹ, ai cũng khen. Người bán nhắn Zalo xác nhận đơn rất nhiệt tình.'],
  ['Cô Lan · Diễn Châu', 4, 'Hàng đúng mô tả, giá hợp lý. Mong có thêm quy cách nhỏ để mua thử.'],
];

function mkProduct(id) {
  const p = P(id);
  if (!p) return `<div class="wrap"><div class="page-h"><h1>Không tìm thấy sản phẩm</h1></div></div>`;
  const s = SL(p.seller);
  const tr = traceFor(p);
  const lot = (tr.map(t => t[2]).find(t => /^Lô /.test(t)) || 'Lô BM-2610').replace('Lô ', '');
  const related = PRODUCTS.filter(x => x.id !== p.id && (x.seller === p.seller || x.cat === p.cat)).concat(PRODUCTS.filter(x => x.ocop && x.id !== p.id)).filter((x, i, a) => a.indexOf(x) === i).slice(0, 5);
  return `<div class="wrap">
    <div class="crumb"><a href="#/cho">Chợ OCOP</a> › <a href="#/cho/san-pham" data-filt='{"cat":"${p.cat}"}'>${catName(p.cat)}</a> › ${esc(p.name)}</div>
    <div class="pd">
      <div class="gal"><div class="art">${ph(S.gal[p.id] || p.img)}</div>
        <div class="thumbs">${[p.img, ...(p.gallery || [])].map(k => `<button class="art ${(S.gal[p.id] || p.img) === k ? 'on' : ''}" data-act="gal" data-id="${p.id}" data-k="${k}">${ph(k)}</button>`).join('')}</div></div>
      <div>
        ${badge(p).replace('class="ocop', 'class="ocop inline')}
        <h1>${esc(p.name)}</h1>
        <div class="rate"><span><span class="star">★</span> ${p.rating.toFixed(1).replace('.', ',')} (${p.reviews} đánh giá)</span><span>Đã bán ${num(p.sold)}</span><span>${ic('pin', 'sm')} ${s.xom} · vùng ${s.vung}</span></div>
        <div class="pr">${vnd(p.price)} <small>/ ${p.unit}</small></div>
        <p class="muted">${esc(p.desc)}</p>
        <div class="buyrow">
          <div class="qty"><button data-act="qty-dec" aria-label="Giảm">${ic('minus', 'sm')}</button><input id="qty" value="1" inputmode="numeric" aria-label="Số lượng"><button data-act="qty-inc" aria-label="Tăng">${ic('plus', 'sm')}</button></div>
          <button class="btn ghost lg" data-act="add" data-id="${p.id}">${ic('cart', 'sm')} Thêm vào giỏ</button>
          <button class="btn green lg" data-act="buy" data-id="${p.id}">Mua ngay</button>
        </div>
        <div class="contact"><button class="btn ghost sm" data-act="zalo-seller" data-v="${esc(s.short)}">${ic('zalo', 'sm')} Nhắn Zalo người bán</button><button class="btn ghost sm" data-act="call-seller" data-v="${esc(s.short)}">${ic('phone', 'sm')} Gọi điện</button></div>
        <a class="seller-box" href="#/cho/gian-hang/${s.id}">${ava(s)}<div class="grow"><b>${esc(s.name)}</b><div class="small muted">${esc(s.owner)} · tham gia từ ${s.joined}</div></div><span class="small" style="color:var(--green);font-weight:700">Xem gian hàng →</span></a>
        <dl class="kv" style="margin-top:18px">${(p.specs || []).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
      </div>
    </div>

    <section class="pd-sec"><h2>Câu chuyện sản phẩm</h2><p class="desc">${esc(s.story)} ${esc(p.desc)}</p></section>

    <section class="pd-sec"><h2>Truy xuất nguồn gốc</h2>
      <div class="trace">
        <div class="qrcol">${ART.qr(p.id, 170)}Tem QR trên bao bì<br>Lô: <span class="lot">${esc(lot)}</span></div>
        <div><ul class="timeline" style="margin-top:0">${tr.map(([d, t, n]) => `<li><b>${d}</b> ${esc(t)}<div class="small muted">${esc(n)}</div></li>`).join('')}</ul>
        <p class="small muted" style="margin-top:6px">Người mua quét QR trên bao bì sẽ mở đúng trang này. Bản thật kết nối được với hệ thống truy xuất nguồn gốc của tỉnh.</p></div>
      </div>
    </section>

    <section class="pd-sec"><h2>Đánh giá từ khách hàng</h2>
      <div class="reviews">${REVIEWS.map(([w, st, t]) => `<div class="rv"><b>${w}</b><div class="star">${'★'.repeat(st)}${'☆'.repeat(5 - st)}</div><p>${t}</p></div>`).join('')}</div>
    </section>

    <section class="pd-sec"><h2>Có thể bạn quan tâm</h2><div class="pgrid">${related.map(pcard).join('')}</div></section>
  </div>`;
}

function mkSellers() {
  return `<div class="wrap">
    <div class="crumb"><a href="#/cho">Chợ OCOP</a> › Gian hàng</div>
    <div class="page-h"><h1>Gian hàng</h1><p>Hợp tác xã, tổ hợp tác, hộ sản xuất đã được Ủy ban MTTQ và Hội Nông dân xã xác minh.</p></div>
    <div class="tabs">${['', ...VUNG].map(v => `<button class="tab ${v === S.sellerVung ? 'on' : ''}" data-act="seller-vung" data-v="${v}">${v || 'Cả xã'}</button>`).join('')}</div>
    <div class="sellers">${SELLERS.filter(s => !S.sellerVung || s.vung === S.sellerVung).map(scard).join('')}</div>
  </div>`;
}

function mkSeller(id) {
  const s = SL(id);
  if (!s) return `<div class="wrap"><div class="page-h"><h1>Không tìm thấy gian hàng</h1></div></div>`;
  const list = PRODUCTS.filter(p => p.seller === s.id);
  return `<div class="wrap">
    <div class="crumb"><a href="#/cho">Chợ OCOP</a> › <a href="#/cho/gian-hang">Gian hàng</a> › ${esc(s.short)}</div>
    <div class="panel" style="margin-top:14px;display:flex;gap:18px;align-items:center;flex-wrap:wrap">
      <span class="ava" style="background:${s.color};width:72px;height:72px;font-size:24px;border-radius:16px">${esc(initials(s.name))}</span>
      <div style="flex:1;min-width:240px"><h1 style="font-size:26px">${esc(s.name)}</h1><p class="muted">${esc(s.owner)} · ${s.xom}, xã Bình Minh · vùng ${s.vung} cũ · tham gia từ ${s.joined}</p>
        <p style="margin-top:8px;max-width:760px">${esc(s.story)}</p></div>
      <div class="contact"><button class="btn green" data-act="zalo-seller" data-v="${esc(s.short)}">${ic('zalo', 'sm')} Nhắn Zalo</button><button class="btn ghost" data-act="call-seller" data-v="${esc(s.short)}">${ic('phone', 'sm')} Gọi</button></div>
    </div>
    <div class="mh"><div><h2>Sản phẩm của gian hàng</h2></div></div>
    <div class="pgrid">${list.map(pcard).join('')}</div>
  </div>`;
}

function mkSeason() {
  const month = new Date().getMonth() + 1;
  const rows = Object.keys(SEASON).map(id => [P(id), SEASON[id]]);
  return `<div class="wrap">
    <div class="crumb"><a href="#/cho">Chợ OCOP</a> › Lịch mùa vụ</div>
    <div class="page-h"><h1>Lịch mùa vụ đặc sản Bình Minh</h1><p>Giúp khách đặt hàng đúng mùa và giúp hợp tác xã lên kế hoạch thu mua, đóng gói, nhất là dịp Tết.</p></div>
    <div class="season-wrap"><table class="season"><thead><tr><th>Sản phẩm</th>${Array.from({ length: 12 }, (_, i) => `<th class="${i + 1 === month ? 'now' : ''}">T${i + 1}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([p, s]) => `<tr><td><a href="#/cho/sp/${p.id}">${esc(p.name)}</a></td>${Array.from({ length: 12 }, (_, i) => { const m = i + 1; const c = s.peak.includes(m) ? 'pk' : s.on.includes(m) ? 'on' : ''; return `<td class="c ${c} ${m === month ? 'now' : ''}"><span></span></td>`; }).join('')}</tr>`).join('')}</tbody></table></div>
    <div class="legend"><span><i style="background:#cfe6c1"></i>Có hàng</span><span><i style="background:#6ea95a"></i>Chính vụ</span><span><i style="background:var(--gold-l);border:1px solid #efe0a6"></i>Tháng hiện tại</span></div>
  </div>`;
}

function mkCart() {
  const items = S.cart.map(c => ({ ...c, p: P(c.id) })).filter(c => c.p);
  if (!items.length) {
    return `<div class="wrap"><div class="crumb"><a href="#/cho">Chợ OCOP</a> › Giỏ hàng</div>
      <div class="empty" style="margin-top:20px">${ic('cart')}<p style="margin:8px 0 14px">Giỏ hàng đang trống</p><a class="btn green" href="#/cho/san-pham" data-filt="{}">Chọn sản phẩm</a></div></div>`;
  }
  const groups = {};
  items.forEach(c => { (groups[c.p.seller] = groups[c.p.seller] || []).push(c); });
  const sub = items.reduce((a, c) => a + c.p.price * c.qty, 0);
  const nShop = Object.keys(groups).length;
  return `<div class="wrap">
    <div class="crumb"><a href="#/cho">Chợ OCOP</a> › Giỏ hàng</div>
    <div class="cart-grid">
      <div>
        <h1 style="font-size:26px;margin:4px 0 14px">Giỏ hàng <span class="muted" style="font-size:15px;font-weight:500">· ${cartCount()} sản phẩm từ ${nShop} gian hàng</span></h1>
        ${Object.entries(groups).map(([sid, list]) => {
          const s = SL(sid);
          return `<div class="cgroup"><div class="gh2">${ava(s)}<span>${esc(s.name)}</span></div>
            ${list.map(c => `<div class="citem"><div class="art">${ph(c.p.img)}</div>
              <div><h4>${esc(c.p.name)}</h4><div class="small muted">${vnd(c.p.price)} / ${c.p.unit}</div></div>
              <div class="right"><div class="qty"><button data-act="c-dec" data-id="${c.id}" aria-label="Giảm">${ic('minus', 'sm')}</button><input value="${c.qty}" readonly aria-label="Số lượng"><button data-act="c-inc" data-id="${c.id}" aria-label="Tăng">${ic('plus', 'sm')}</button></div>
              <b class="price">${vnd(c.p.price * c.qty)}</b><button class="linkbtn" data-act="c-del" data-id="${c.id}">Xóa</button></div></div>`).join('')}
          </div>`;
        }).join('')}
      </div>
      <form class="panel sumbox" data-form="checkout">
        <h2>Thông tin nhận hàng</h2>
        <div class="form">
          <div class="field"><label for="o-name">Họ tên</label><input class="input" id="o-name" name="name" required placeholder="Nguyễn Thị B"></div>
          <div class="field"><label for="o-phone">Số điện thoại</label><input class="input" id="o-phone" name="phone" required inputmode="tel" placeholder="09xx xxx xxx"></div>
          <div class="field"><label for="o-addr">Địa chỉ</label><input class="input" id="o-addr" name="addr" required placeholder="Số nhà, đường, phường/xã, tỉnh"></div>
        </div>
        <div class="lbl" style="margin-top:14px">Giao hàng</div>
        <label class="radio"><input type="radio" name="ship" value="post" checked><span><b>Giao tận nơi</b>Bưu điện / Viettel Post · ${vnd(25000)} mỗi gian hàng</span></label>
        <label class="radio"><input type="radio" name="ship" value="pickup"><span><b>Nhận tại điểm giao nhận của xã</b>Nhà văn hóa trung tâm · miễn phí</span></label>
        <div class="lbl" style="margin-top:14px">Thanh toán</div>
        <label class="radio"><input type="radio" name="pay" value="qr" checked><span><b>Chuyển khoản VietQR</b>Tiền vào thẳng tài khoản từng người bán</span></label>
        <label class="radio"><input type="radio" name="pay" value="cod"><span><b>Trả tiền khi nhận hàng</b></span></label>
        <div style="margin-top:14px">
          <div class="sumline"><span>Tạm tính</span><span>${vnd(sub)}</span></div>
          <div class="sumline"><span>Phí giao hàng</span><span id="shipfee">${vnd(25000 * nShop)}</span></div>
          <div class="sumline total"><span>Tổng cộng</span><span id="grand">${vnd(sub + 25000 * nShop)}</span></div>
        </div>
        <button class="btn green lg block" style="margin-top:14px">Đặt hàng</button>
        <p class="small muted" style="margin-top:8px">Người bán xác nhận đơn qua Zalo trong vòng 2 giờ.</p>
      </form>
    </div>
  </div>`;
}

function mkDone() {
  const o = S.lastOrder;
  if (!o) return `<div class="wrap"><div class="empty" style="margin-top:20px">Chưa có đơn hàng. <a href="#/cho">Về Chợ OCOP</a></div></div>`;
  return `<div class="wrap"><div class="done-box panel" style="text-align:center">
    <div class="big-ic">${ic('check')}</div>
    <h1 style="font-size:26px">Đặt hàng thành công</h1>
    <p class="muted">Mã đơn hàng</p><div class="code">${o.code}</div>
    <p>Đơn đã được gửi tới ${o.shops.length} người bán qua Zalo. ${o.pay === 'qr' ? 'Quý khách quét mã để chuyển khoản cho từng người bán:' : 'Quý khách thanh toán khi nhận hàng.'}</p>
    ${o.pay === 'qr' ? `<div class="paylist">${o.shops.map(sh => { const s = SL(sh.id); return `<div class="payrow"><div>${ART.qr(o.code + sh.id, 110)}</div><div style="text-align:left"><b>${esc(s.name)}</b><div class="small muted">Số tiền: <b style="color:var(--red)">${vnd(sh.total)}</b> · Nội dung: ${o.code}</div><div class="small muted">Tài khoản của người bán (minh họa)</div></div></div>`; }).join('')}</div>` : ''}
    <div class="acts" style="margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn green" href="#/cho">Tiếp tục mua sắm</a><a class="btn ghost" href="#/quan-tri" data-act="adm-goto" data-v="don-hang">Xem đơn ở trang quản trị</a></div>
  </div></div>`;
}

function mkRegister() {
  return `<div class="wrap">
    <div class="crumb"><a href="#/cho">Chợ OCOP</a> › Mở gian hàng</div>
    <div class="page-h"><h1>Đăng ký mở gian hàng</h1><p>Miễn phí cho hợp tác xã, tổ hợp tác, hộ sản xuất trên địa bàn xã. Không rành điện thoại? Tổ công nghệ số cộng đồng của xóm sẽ đến tận nhà giúp bà con.</p></div>
    <div class="pa-grid">
      <form class="steps" data-form="register">
        <div class="step"><h3>Người sản xuất</h3><div class="form" style="margin-top:0">
          <div class="row2"><div class="field"><label for="g-name">Tên hộ / HTX / cơ sở</label><input class="input" id="g-name" required placeholder="Hộ bà Lê Thị Sen"></div>
          <div class="field"><label for="g-phone">Số điện thoại (Zalo)</label><input class="input" id="g-phone" required inputmode="tel"></div></div>
          <div class="row2"><div class="field"><label for="g-xom">Xóm</label><select class="input" id="g-xom">${XOM.map(x => `<option>Xóm ${x.n}</option>`).join('')}</select></div>
          <div class="field"><label for="g-type">Loại hình</label><select class="input" id="g-type"><option>Hộ gia đình</option><option>Tổ hợp tác</option><option>Hợp tác xã</option><option>Doanh nghiệp nhỏ</option></select></div></div></div></div>
        <div class="step"><h3>Sản phẩm</h3><div class="form" style="margin-top:0">
          <div class="row2"><div class="field"><label for="g-prod">Tên sản phẩm</label><input class="input" id="g-prod" name="prod" required placeholder="Nhút mít muối xổi"></div>
          <div class="field"><label for="g-cat">Danh mục</label><select class="input" id="g-cat">${CATS.map(c => `<option>${c.name}</option>`).join('')}</select></div></div>
          <div class="upload ${S.uploaded ? 'done' : ''}" data-act="upload" role="button" tabindex="0">${S.uploaded ? ic('check', 'sm') + ' Đã chụp 3 ảnh sản phẩm' : ic('camera', 'sm') + ' Chụp 3–5 ảnh sản phẩm, bao bì'}</div>
          <div class="field"><label for="g-desc">Mô tả ngắn (AI sẽ giúp viết lại cho hay)</label><textarea class="input" id="g-desc" placeholder="Mít non nhà trồng, muối với muối hạt, gừng, ớt…"></textarea></div></div></div>
        <div class="step"><h3>Xác nhận</h3>
          <label class="check"><input type="checkbox" required> Tôi cam kết thông tin đúng sự thật, sản phẩm bảo đảm an toàn thực phẩm.</label>
          <button class="btn green lg" style="margin-top:14px">Gửi đăng ký</button></div>
      </form>
      <div class="side-note">
        <h3>Sau khi gửi đăng ký</h3>
        <ul>
          <li>Ban CTMT xóm và Hội Nông dân xã xác minh trong 3 ngày làm việc.</li>
          <li>Tổ công nghệ số cộng đồng hẹn lịch chụp ảnh, ghi câu chuyện sản phẩm.</li>
          <li>Gian hàng được duyệt sẽ hiện trên Chợ và Zalo Mini App; đơn hàng báo về Zalo của bà con.</li>
          <li>Sản phẩm đủ điều kiện được hướng dẫn hồ sơ đánh giá, phân hạng OCOP và in tem QR truy xuất.</li>
        </ul>
      </div>
    </div>
  </div>`;
}

/* =================================================================
   TRANG QUẢN TRỊ
   ================================================================= */
function adminPage() {
  const tabs = [['tong-quan', 'Tổng quan', 'grid'], ['phan-anh', 'Phản ánh – kiến nghị', 'msg'], ['san-pham', 'Duyệt sản phẩm', 'leaf'], ['don-hang', 'Đơn hàng', 'cart'], ['ai', 'Trợ lý AI cho người bán', 'spark']];
  let main;
  if (S.admTab === 'phan-anh') main = admReports();
  else if (S.admTab === 'san-pham') main = admPending();
  else if (S.admTab === 'don-hang') main = admOrders();
  else if (S.admTab === 'ai') main = admAI();
  else main = admOverview();
  return `<div class="adm">
    <aside class="adm-side"><div class="brand"><span class="emblem"><img src="logo-mttq.png" alt=""></span><span>Bình Minh Kết Nối<br><small style="font-weight:400;opacity:.7">Trang quản trị</small></span></div>
      ${tabs.map(([k, t, i]) => `<button class="${S.admTab === k ? 'on' : ''}" data-act="adm-tab" data-v="${k}">${ic(i, 'sm')} ${t}${k === 'phan-anh' ? ` <span class="pill st1" style="margin-left:auto">${allReports().filter(r => r.status < 3).length}</span>` : ''}</button>`).join('')}
      <div class="who"><b>Cán bộ MTTQ xã</b>Quyền: quản trị nội dung, phản ánh, quỹ</div>
    </aside>
    <div class="adm-main">${main}</div>
  </div>`;
}

function barChart(data, labels, color) {
  const W = 560, H = 210, pl = 34, pb = 26, pt = 14, max = Math.ceil(Math.max(...data) * 1.15 / 50) * 50;
  const bw = (W - pl - 10) / data.length;
  let g = '';
  for (let i = 0; i <= 4; i++) {
    const v = max * i / 4, y = pt + (H - pt - pb) * (1 - i / 4);
    g += `<line x1="${pl}" x2="${W - 6}" y1="${y}" y2="${y}" stroke="#eceef1"/><text x="${pl - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6b7280">${Math.round(v)}</text>`;
  }
  data.forEach((v, i) => {
    const h = (H - pt - pb) * v / max, x = pl + i * bw + bw * 0.22, y = H - pb - h;
    g += `<rect x="${x}" y="${y}" width="${bw * 0.56}" height="${h}" rx="4" fill="${i === data.length - 1 ? color : color + '99'}"/>`;
    g += `<text x="${x + bw * 0.28}" y="${y - 5}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1c2024">${v}</text>`;
    g += `<text x="${x + bw * 0.28}" y="${H - 8}" text-anchor="middle" font-size="12" fill="#5b6472">${labels[i]}</text>`;
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" font-family="Be Vietnam Pro,Segoe UI,sans-serif" role="img" aria-label="Biểu đồ đơn hàng theo tháng">${g}</svg>`;
}

function admOverview() {
  const reps = allReports();
  const open = reps.filter(r => r.status < 3);
  const maxF = Math.max(...ADMIN.byField.map(f => f[1]));
  return `<div class="adm-head"><div><h1>Tổng quan</h1><p>Số liệu mô phỏng sau 6 tháng vận hành · cập nhật ${today()}</p></div><button class="btn ghost sm" data-act="export">${ic('file', 'sm')} Xuất báo cáo tháng</button></div>
    <div class="kpis">
      <div class="kpi"><span>Phản ánh tiếp nhận (2026)</span><b>214</b><small>92% đã giải quyết</small></div>
      <div class="kpi"><span>Thời gian xử lý trung bình</span><b>4,6 ngày</b><small>Giảm 2,1 ngày so với quý I</small></div>
      <div class="kpi"><span>Đơn hàng Chợ OCOP tháng 10</span><b>318</b><small>+32% so với tháng 9</small></div>
      <div class="kpi"><span>Doanh thu qua Chợ (tháng)</span><b>91,3 tr</b><small>Tiền về thẳng người bán</small></div>
      <div class="kpi"><span>Gian hàng đang hoạt động</span><b>${SELLERS.length}</b><small>${S.pending.length} hồ sơ chờ duyệt</small></div>
      <div class="kpi"><span>Người theo dõi Zalo OA</span><b>4.860</b><small>~53% số hộ trong xã</small></div>
      <div class="kpi"><span>Quỹ Vì người nghèo – tồn</span><b>262,9 tr</b><small>Công khai theo sao kê</small></div>
      <div class="kpi"><span>Xóm cập nhật tin trong tháng</span><b>18/20</b><small>2 xóm cần nhắc</small></div>
    </div>
    <div class="adm-grid">
      <div class="box"><h3>Đơn hàng Chợ OCOP theo tháng <small>đơn</small></h3>${barChart(ADMIN.orders, ADMIN.months, '#2d6a35')}</div>
      <div class="box"><h3>Phản ánh theo lĩnh vực <small>năm 2026</small></h3>${ADMIN.byField.map(([t, v]) => `<div class="hbar"><span>${t}</span><span class="tr"><i style="width:${v / maxF * 100}%"></i></span><b>${v}</b></div>`).join('')}</div>
    </div>
    <div class="adm-grid">
      <div class="box"><h3>Việc cần xử lý</h3><div class="todo">
        ${open.slice(0, 3).map(r => `<div>${ic('msg', 'sm')}<span><b>${r.code}</b> · ${esc(r.title)}</span><button class="btn ghost sm" data-act="adm-tab" data-v="phan-anh">Xử lý</button></div>`).join('')}
        ${S.pending.slice(0, 2).map(q => `<div>${ic('leaf', 'sm')}<span>Duyệt sản phẩm: <b>${esc(q.name)}</b></span><button class="btn ghost sm" data-act="adm-tab" data-v="san-pham">Duyệt</button></div>`).join('')}
      </div></div>
      <div class="box"><h3>Sản phẩm bán chạy <small>tháng 10</small></h3>
        <table class="tbl"><tbody>${[...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 5).map((p, i) => `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td class="num">${num(Math.round(p.sold / 9))} đơn</td></tr>`).join('')}</tbody></table></div>
    </div>`;
}

function admReports() {
  const reps = allReports();
  return `<div class="adm-head"><div><h1>Phản ánh – kiến nghị</h1><p>Chuyển xử lý, cập nhật kết quả. Thay đổi ở đây hiển thị ngay trên Trang thông tin và báo về Zalo người gửi.</p></div><a class="btn ghost sm" href="#/mttq/phan-anh">Xem trên Trang ↗</a></div>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>Mã</th><th>Nội dung</th><th>Xóm</th><th>Ngày</th><th>Trạng thái</th></tr></thead><tbody>
    ${reps.map(r => `<tr><td><b>${r.code}</b></td><td><div style="font-weight:600">${esc(r.title)}</div><div class="small muted">${r.field} · Người gửi: ${esc(r.by || 'Ẩn danh')}</div>
      ${r.status < 3 ? `<form class="ans" data-form="answer" data-code="${r.code}"><input class="input" name="ans" placeholder="Nhập kết quả trả lời để đóng phản ánh…"><button class="btn green sm">Trả lời</button></form>` : `<div class="answer" style="margin-top:6px">${esc(r.answer)}</div>`}</td>
      <td>${r.xom}</td><td>${r.date}</td>
      <td><select class="input" data-input="rstatus" data-code="${r.code}" aria-label="Trạng thái">${STATUS.map((t, i) => `<option value="${i}" ${i === r.status ? 'selected' : ''}>${t}</option>`).join('')}</select></td></tr>`).join('')}
    </tbody></table></div>`;
}

function admPending() {
  return `<div class="adm-head"><div><h1>Duyệt sản phẩm mới</h1><p>Hồ sơ do người sản xuất hoặc Tổ công nghệ số cộng đồng gửi lên, Hội Nông dân xã xác minh trước khi hiển thị.</p></div></div>
    <div class="pend">${S.pending.length ? S.pending.map(q => `<div><span class="qi green">${ic('leaf')}</span><div class="grow"><b>${esc(q.name)}</b><span class="small muted">${esc(q.who)} · gửi ${q.when}</span><div class="small" style="color:${q.note === 'Đủ thông tin' ? 'var(--green)' : '#9a6b00'}">${esc(q.note)}</div></div>
      <button class="btn ghost sm" data-act="adm-reject" data-id="${q.id}">Yêu cầu bổ sung</button><button class="btn green sm" data-act="adm-approve" data-id="${q.id}">${ic('check', 'sm')} Duyệt đăng</button></div>`).join('') : '<div class="empty" style="width:100%">Không còn hồ sơ chờ duyệt</div>'}</div>`;
}

function admOrders() {
  const all = [...S.myOrders, ...ORDERS];
  return `<div class="adm-head"><div><h1>Đơn hàng</h1><p>Đơn được gửi tới người bán qua Zalo; xã theo dõi tổng hợp để báo cáo và hỗ trợ khi có khiếu nại.</p></div></div>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>Mã đơn</th><th>Thời gian</th><th>Khách hàng</th><th>Sản phẩm</th><th class="num">Giá trị</th><th>Thanh toán</th><th>Trạng thái</th></tr></thead><tbody>
    ${all.map(o => `<tr><td><b>${o.code}</b></td><td>${o.time}</td><td>${esc(o.buyer)}</td><td>${esc(o.items)}</td><td class="num">${vnd(o.total)}</td><td>${o.pay}</td><td><span class="pill ${o.st === 'Đã giao' ? 'st3' : o.st === 'Đang giao' ? 'st2' : 'st1'}">${o.st}</span></td></tr>`).join('')}
    </tbody></table></div>`;
}

function admAI() {
  const o = S.aiOut;
  return `<div class="adm-head"><div><h1>Trợ lý AI cho người bán <span class="badge-sim">Mô phỏng</span></h1><p>Bà con chỉ cần nhập vài ý chính hoặc nói bằng giọng; AI viết mô tả sản phẩm, bài đăng Zalo/Facebook và kịch bản livestream.</p></div></div>
    <div class="ai-grid">
      <form class="box" data-form="ai">
        <h3>Thông tin sản phẩm</h3>
        <div class="form" style="margin-top:0">
          <div class="field"><label for="ai-name">Tên sản phẩm</label><input class="input" id="ai-name" name="name" value="Nhút mít muối xổi" required></div>
          <div class="field"><label for="ai-feat">Đặc điểm nổi bật (cách nhau bởi dấu phẩy)</label><textarea class="input" id="ai-feat" name="feat">mít non nhà trồng, muối với muối hạt và gừng, giòn, không chất bảo quản, ăn kèm cơm nóng</textarea></div>
          <div class="row2"><div class="field"><label for="ai-who">Người làm</label><input class="input" id="ai-who" name="who" value="Bà Lê Thị Sen, xóm 16"></div>
          <div class="field"><label for="ai-price">Giá bán</label><input class="input" id="ai-price" name="price" value="40.000đ/hũ 500 g"></div></div>
          <button class="btn blue">${ic('spark', 'sm')} Viết giúp tôi</button>
        </div>
      </form>
      <div class="box"><h3>Kết quả</h3>
        ${o ? `<div class="ai-lbl">Mô tả trên Chợ OCOP</div><div class="ai-out" id="ai1">${esc(o[0])}</div><div class="ai-lbl">Bài đăng Zalo / Facebook</div><div class="ai-out" id="ai2">${esc(o[1])}</div>
          <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn green sm" data-act="ai-use">${ic('check', 'sm')} Dùng mô tả này</button><button class="btn ghost sm" data-act="ai-copy">Sao chép bài đăng</button></div>`
          : '<p class="muted">Nhập thông tin bên trái rồi bấm “Viết giúp tôi”.</p>'}
      </div>
    </div>`;
}

function aiWrite(name, feat, who, price) {
  const f = feat.split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
  const first = f[0] ? f[0].charAt(0).toUpperCase() + f[0].slice(1) : '';
  const rest = f.slice(1);
  const d = `${name} do ${who} (xã Bình Minh, Nghệ An) làm theo cách truyền thống của vùng quê bán sơn địa. ${first ? first + (rest.length ? ', ' + rest.join(', ') : '') + '.' : ''} Mỗi sản phẩm có tem QR để người mua xem nguồn gốc; đặt trên Chợ OCOP Bình Minh, tiền chuyển thẳng cho người làm ra sản phẩm.\nGiá: ${price}.`;
  const p = `${name.toUpperCase()} – ĐẶC SẢN QUÊ BÌNH MINH\n\n${f.map(x => '✔ ' + x.charAt(0).toUpperCase() + x.slice(1)).join('\n')}\n\nNgười làm: ${who}\nGiá: ${price}\n👉 Đặt hàng trên Chợ OCOP Bình Minh hoặc nhắn Zalo cho người bán.\n#ChoOCOPBinhMinh #DacSanNgheAn #YenThanh`;
  return [d, p];
}
function typeInto(el, text, done) {
  let i = 0;
  const step = () => { if (!el.isConnected) return; i += 3; el.textContent = text.slice(0, i); if (i < text.length) setTimeout(step, 12); else if (done) done(); };
  step();
}

/* =================================================================
   TRÊN ĐIỆN THOẠI
   ================================================================= */
function phonePage() {
  const ph = (title, cap, sub, hash) => `<figure class="phone-wrap"><div class="phone"><div class="scr">
      <div class="zbar"><b>${title}</b><span class="zb-cap"><i>•••</i><i>✕</i></span></div>
      <iframe src="${link(hash.slice(2))}" title="${title}" loading="lazy"></iframe></div></div>
      <figcaption>${cap}<span>${sub}</span></figcaption></figure>`;
  return `<div class="ph-page"><div class="wrap">
    <div class="ph-head"><span class="eyebrow">Kênh chính: Zalo</span><h1>Bà con dùng ngay trên điện thoại</h1>
      <p>Chợ OCOP chạy dưới dạng Zalo Mini App; Trang MTTQ gắn vào menu Zalo OA của xã. Không cần cài thêm ứng dụng, không cần tạo tài khoản mới. Hai màn hình dưới đây bấm thử được.</p></div>
    <div class="phones">
      ${ph('Chợ OCOP Bình Minh', 'Zalo Mini App · Chợ OCOP', 'Xem sản phẩm, đặt hàng, quét QR thanh toán', '#/cho')}
      ${ph('MTTQ xã Bình Minh', 'Zalo OA · Gửi phản ánh', 'Gửi ý kiến kèm ảnh, nhận kết quả qua Zalo', '#/mttq/phan-anh')}
    </div>
  </div></div>`;
}

/* =================================================================
   TỔNG QUAN ĐỀ XUẤT
   ================================================================= */
function overviewPage() {
  const arrow = `<div class="arrow">${ic('arrow')}</div>`;
  return `
  <section class="ov-hero"><div class="wrap">
    <div>
      <span class="eyebrow">Đề xuất định hướng · Làm việc với xã Bình Minh, tỉnh Nghệ An</span>
      <h1>Bình Minh Kết Nối</h1>
      <p class="lead">Một nền tảng số dùng chung cho Ủy ban MTTQ, các tổ chức thành viên và người sản xuất của xã: đưa thông tin tới dân, lắng nghe ý kiến của dân, công khai quỹ, và đưa đặc sản địa phương ra thị trường. Chạy trên website và Zalo, bà con dùng ngay trên điện thoại.</p>
      <div class="acts"><a class="btn red lg" href="#/mttq">Xem Trang MTTQ ${ic('arrow', 'sm')}</a><a class="btn green lg" href="#/cho">Xem Chợ OCOP ${ic('arrow', 'sm')}</a></div>
      <div class="facts"><span>Hợp nhất từ <b>4 xã</b>: Đức Thành, Mã Thành, Tân Thành, Tiến Thành</span><span><b>91,08 km²</b></span><span><b>37.031</b> nhân khẩu</span><span><b>20</b> xóm</span></div>
    </div>
    <div class="pic">${ph('harvest')}</div>
  </div></section>

  <div class="wrap">
    <section class="ov-sec"><h2>Ba việc cần giải quyết</h2><p class="sub">Sau sắp xếp đơn vị hành chính, địa bàn rộng gấp bốn lần, các tổ chức chính trị – xã hội đã về chung một đầu mối là Mặt trận Tổ quốc.</p>
      <div class="probs">
        <div class="prob"><h3>Thông tin phân tán</h3><p>Tin của Mặt trận và 4 tổ chức thành viên nằm rải rác trong nhiều nhóm Zalo, Facebook; khó tra cứu, khó lưu trữ, khó đo được bao nhiêu người dân nắm được.</p></div>
        <div class="prob"><h3>Ý kiến của dân chưa được theo dõi đến cùng</h3><p>Phản ánh đến qua nhiều kênh nhưng chưa có mã theo dõi, khó tổng hợp số liệu phục vụ giám sát, phản biện xã hội và hội nghị đối thoại.</p></div>
        <div class="prob"><h3>Sản phẩm tốt nhưng bán nhỏ lẻ</h3><p>Nông sản, đặc sản chủ yếu bán qua người quen; thiếu ảnh, câu chuyện, tem truy xuất; chưa có kênh chung mang thương hiệu “đặc sản Bình Minh”.</p></div>
      </div></section>

    <section class="ov-sec"><h2>Một nền tảng – hai phân hệ</h2><p class="sub">Dùng chung tài khoản, dữ liệu và kênh Zalo; triển khai từng bước, mỗi bước đều dùng được ngay.</p>
      <div class="mods">
        <div class="mod"><div class="art">${ph('gathering')}</div><div class="b"><span class="eyebrow">Phân hệ 1</span><h3>Trang thông tin MTTQ xã</h3>
          <ul><li>Tin hoạt động của MTTQ, 4 tổ chức chính trị – xã hội và các hội xã hội; chuyên mục Dân vận – Tuyên giáo, Dân tộc – Tôn giáo</li><li>Tự động dẫn tin từ trang Mặt trận Trung ương và tỉnh Nghệ An</li><li>Phản ánh – kiến nghị có mã tra cứu, theo dõi đến khi có kết quả</li><li>Công khai thu – chi Quỹ “Vì người nghèo”, ủng hộ bằng VietQR</li><li>Lấy ý kiến Nhân dân: khảo sát sự hài lòng, góp ý dự thảo</li><li>Danh bạ Ban công tác Mặt trận 20 xóm; trợ lý hỏi đáp</li></ul>
          <a class="btn red" href="#/mttq">Xem demo ${ic('arrow', 'sm')}</a></div></div>
        <div class="mod"><div class="art">${ph('rice_sacks')}</div><div class="b"><span class="eyebrow" style="color:var(--green)">Phân hệ 2</span><h3>Chợ OCOP Bình Minh</h3>
          <ul><li>Gian hàng cho HTX, tổ hợp tác, hộ sản xuất đã được xã xác minh</li><li>Câu chuyện sản phẩm và tem QR truy xuất nguồn gốc</li><li>Đặt hàng, thanh toán VietQR thẳng cho người bán, giao qua bưu chính</li><li>Lịch mùa vụ; du lịch trải nghiệm (đền Canh, làm nông)</li><li>AI giúp bà con viết mô tả, bài đăng, kịch bản livestream</li></ul>
          <a class="btn green" href="#/cho">Xem demo ${ic('arrow', 'sm')}</a></div></div>
      </div>
      <div class="shared"><b>Dùng chung</b><a href="#/quan-tri">Trang quản trị, phân quyền theo tổ chức →</a><a href="#/dien-thoai">Zalo OA + Zalo Mini App →</a><a href="#/quan-tri">Số liệu điều hành, báo cáo tháng →</a></div>
    </section>

    <section class="ov-sec"><h2>Kiến trúc giải pháp</h2><p class="sub">Đi theo thói quen sẵn có của bà con (Zalo, chuyển khoản QR, bưu điện), kết nối với hạ tầng có sẵn thay vì xây mới.</p>
      <div class="arch">
        <div class="col"><h4>Người dùng</h4><div class="node">Người dân 20 xóm</div><div class="node">Hộ sản xuất, HTX, tổ hợp tác</div><div class="node">Ban CTMT xóm, tổ chức thành viên</div><div class="node">Khách mua trong và ngoài tỉnh</div></div>
        ${arrow}
        <div class="col"><h4>Kênh tiếp cận</h4><div class="node">Zalo OA & Mini App<small>Kênh chính, không cài thêm</small></div><div class="node">Website<small>Tên miền riêng của xã</small></div><div class="node">Tem QR trên bao bì<small>Truy xuất, mua lại</small></div><div class="node">Tổ công nghệ số cộng đồng<small>Hỗ trợ tận nhà</small></div></div>
        ${arrow}
        <div class="col core"><h4>Nền tảng Bình Minh Kết Nối</h4><div class="node">Trang thông tin MTTQ</div><div class="node">Chợ OCOP Bình Minh</div><div class="node">Quản trị & phân quyền<small>MTTQ, tổ chức thành viên, các hội, 20 xóm, người bán</small></div><div class="node">Trợ lý AI<small>Hỏi đáp; viết nội dung bán hàng</small></div><div class="node">Dữ liệu & báo cáo</div></div>
        ${arrow}
        <div class="col"><h4>Kết nối</h4><div class="node">Ngân hàng – VietQR<small>Tiền về thẳng người bán / Quỹ</small></div><div class="node">Bưu điện, Viettel Post</div><div class="node">Sàn TMĐT lớn, cửa hàng OCOP tỉnh</div><div class="node">Cổng TTĐT, dịch vụ công của tỉnh</div></div>
      </div></section>

    <section class="ov-sec"><h2>Lộ trình đề xuất</h2><p class="sub">Ra mắt sớm với phần cốt lõi, gắn với các mốc của xã để có người dùng thật ngay từ đầu.</p>
      <div class="phases">
        <div class="phase"><span class="when">Giai đoạn 1 · T10 – T11/2026 (6–8 tuần)</span><h3>Khởi động</h3>
          <ul><li>Trang MTTQ: tin hoạt động, phản ánh có mã tra cứu, công khai quỹ, danh bạ 20 xóm</li><li>Chợ OCOP: 20–30 sản phẩm đầu tiên, đặt hàng qua Zalo/điện thoại</li><li>Mở Zalo OA của xã; tập huấn cán bộ, Ban CTMT xóm, người bán</li></ul>
          <div class="goal"><b>Mốc:</b> ra mắt tại Ngày hội Đại đoàn kết toàn dân tộc 18/11/2026</div></div>
        <div class="phase"><span class="when">Giai đoạn 2 · T12/2026 – T2/2027</span><h3>Bán hàng mùa Tết</h3>
          <ul><li>Giỏ hàng, thanh toán VietQR, kết nối đơn vị vận chuyển</li><li>Tem QR truy xuất cho sản phẩm chủ lực; Zalo Mini App</li><li>Trợ lý AI cho người bán; khảo sát, lấy ý kiến trực tuyến</li></ul>
          <div class="goal"><b>Mốc:</b> “Giỏ quà Tết đặc sản Bình Minh” – Tết Đinh Mùi 2027</div></div>
        <div class="phase"><span class="when">Giai đoạn 3 · T3 – T9/2027</span><h3>Hoàn thiện & nhân rộng</h3>
          <ul><li>Du lịch trải nghiệm gắn đền Canh và làng quê</li><li>Bảng số liệu điều hành, trợ lý hỏi đáp AI</li><li>Kết nối sàn TMĐT lớn, cửa hàng OCOP tỉnh; nhân rộng sang các xã lân cận</li></ul>
          <div class="goal"><b>Mốc:</b> sơ kết 1 năm, đề xuất nhân rộng</div></div>
      </div></section>

    <section class="ov-sec"><h2>Nguyên tắc triển khai</h2>
      <div class="princ">
        <div><b>Zalo trước, web sau</b>Đi theo thói quen của bà con; website là “nhà gốc” lưu trữ dữ liệu.</div>
        <div><b>Nền tảng không giữ tiền</b>Tiền chuyển thẳng cho người bán và cho Quỹ; giảm rủi ro, giảm thủ tục.</div>
        <div><b>Mỗi xóm có người vận hành</b>Ban CTMT xóm và Tổ công nghệ số cộng đồng; công nghệ chỉ sống khi có người dùng.</div>
        <div><b>Dữ liệu thuộc về xã</b>Lưu trữ trong nước, phân quyền rõ ràng, tuân thủ quy định bảo vệ dữ liệu cá nhân.</div>
      </div></section>

    <section class="ov-sec"><h2>Phân công phối hợp</h2>
      <div class="roles">
        <div class="role"><h3>Xã Bình Minh (UBND, Ủy ban MTTQ)</h3><ul><li>Chủ trì, ban hành kế hoạch và quy chế vận hành, kiểm duyệt nội dung</li><li>Cử đầu mối: 01 cán bộ MTTQ, 01 cán bộ phụ trách kinh tế – nông nghiệp</li><li>Cung cấp dữ liệu: sản phẩm, chủ thể sản xuất, Ban CTMT 20 xóm, thông tin Quỹ</li><li>Trả lời phản ánh theo quy trình; huy động Đoàn Thanh niên, Hội Nông dân, Hội Phụ nữ hỗ trợ bà con</li></ul></div>
        <div class="role"><h3>Đơn vị đồng hành (tư vấn – kỹ thuật)</h3><ul><li>Thiết kế, xây dựng, vận hành kỹ thuật, bảo mật và sao lưu dữ liệu</li><li>Chụp ảnh, viết câu chuyện cho 20–30 sản phẩm đầu tiên</li><li>Tập huấn cán bộ, Ban CTMT xóm, người bán (bán hàng trên mạng, livestream)</li><li>Hỗ trợ kết nối ngân hàng (VietQR), bưu chính, sàn TMĐT, cửa hàng OCOP</li></ul></div>
      </div></section>

    <section class="ov-sec"><h2>Chỉ tiêu đề xuất sau 12 tháng</h2>
      <div class="kpi-list">
        <div><span>Xóm có Ban CTMT sử dụng hệ thống (đăng tin, nhận phản ánh)</span><b>20/20 xóm</b></div>
        <div><span>Phản ánh được phản hồi; thời gian xử lý trung bình</span><b>100% · ≤ 7 ngày làm việc</b></div>
        <div><span>Khoản thu – chi Quỹ “Vì người nghèo” công khai trực tuyến</span><b>100%</b></div>
        <div><span>Sản phẩm / gian hàng trên Chợ OCOP</span><b>≥ 50 / ≥ 30</b></div>
        <div><span>Sản phẩm mới được hỗ trợ hồ sơ đánh giá OCOP</span><b>≥ 5 sản phẩm</b></div>
        <div><span>Người theo dõi Zalo OA của xã</span><b>≥ 5.000</b></div>
      </div></section>

    <section class="ov-sec"><h2>Nội dung đề nghị trao đổi tại buổi làm việc</h2>
      <div class="ask"><ol>
        <li>Thống nhất phạm vi giai đoạn 1 và mốc ra mắt (đề xuất: Ngày hội Đại đoàn kết 18/11/2026).</li>
        <li>Đầu mối của xã; cơ chế duyệt tin bài và quy trình trả lời phản ánh.</li>
        <li>Danh sách sản phẩm OCOP, sản phẩm tiềm năng và chủ thể sản xuất hiện có.</li>
        <li>Tên miền, Zalo OA và tài khoản Quỹ dùng để công khai; quan hệ với cổng thông tin của tỉnh.</li>
        <li>Nguồn lực: kinh phí chuyển đổi số, nông thôn mới, xã hội hóa; phần đơn vị đồng hành hỗ trợ.</li>
      </ol></div></section>

    <div class="ov-foot">Bản demo phục vụ trao đổi. Thông tin hành chính của xã tổng hợp từ báo chí; sản phẩm, người bán, số liệu, tên người trong demo là minh họa.</div>
  </div>`;
}

/* =================== Sự kiện =================== */
document.addEventListener('click', e => {
  const f = e.target.closest('[data-filt]');
  if (f) {
    S.filt = { ...DEF_FILT, ...JSON.parse(f.dataset.filt || '{}') };
    if (f.getAttribute('href') === location.hash) { e.preventDefault(); render(); }
    return;
  }
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const a = el.dataset.act, v = el.dataset.v;
  switch (a) {
    case 'close-modal':
      if (e.target === el || el.tagName === 'BUTTON') closeModal();
      break;
    case 'home-org': S.homeOrg = v; render(true); break;
    case 'news-org': S.newsOrg = v; render(true); break;
    case 'r-filter': S.rFilter = v; render(true); break;
    case 'seller-vung': S.sellerVung = v; render(true); break;
    case 'upload': S.uploaded = !S.uploaded; el.classList.toggle('done', S.uploaded);
      el.innerHTML = S.uploaded ? ic('check', 'sm') + (el.closest('[data-form=register]') ? ' Đã chụp 3 ảnh sản phẩm' : ' Đã đính kèm 2 ảnh') : ic('camera', 'sm') + ' Chụp / đính kèm ảnh';
      break;
    case 'vote': S.votes[el.dataset.id] = Number(el.dataset.i); store.set('bm.votes', S.votes); render(true); toast('Cảm ơn ông/bà đã tham gia khảo sát'); break;
    case 'donate':
      modal(`<h3>Ủng hộ ${vnd(Number(v))}</h3><p>Quét mã bằng ứng dụng ngân hàng. Số tiền và nội dung đã điền sẵn.</p><div class="qrbox">${ART.qr('donate' + v, 190)}</div>
        <dl class="kv" style="text-align:left"><dt>Chủ tài khoản</dt><dd>${FUND.accName}</dd><dt>Số tiền</dt><dd>${vnd(Number(v))}</dd><dt>Nội dung</dt><dd>Ung ho Quy VNN</dd></dl>
        <div class="acts"><button class="btn gold" data-act="close-modal">Đã chuyển khoản</button></div><p class="small muted" style="margin-top:10px">Mã QR minh họa</p>`);
      break;
    case 'zalo-group': toast(`Demo: mở nhóm Zalo của xóm ${v}`); break;
    case 'soc': S.socOrg = v; if (location.hash === el.getAttribute('href')) render(true); break;
    case 'soc-f': S.socOrg = v; render(true); break;
    case 'poll-show': S.pollShow = true; render(true); break;
    case 'fs': S.fs = v === '0' ? 1 : Math.max(0, Math.min(2, S.fs + Number(v))); render(true); break;
    case 'demo-page': toast('Bản demo chỉ có 1 trang dữ liệu mẫu'); break;
    case 'dl': toast('Demo: tải tệp PDF của văn bản'); break;
    case 'video': toast('Demo: phát video phóng sự'); break;
    case 'gnav': el.closest('.g-nav').classList.toggle('open'); break;
    case 'slide': goSlide(Number(v)); startSlider(); break;
    case 'gal': S.gal[el.dataset.id] = el.dataset.k; render(true); break;
    case 'lightbox': { const p = PHOTOS[el.dataset.k]; modal(`<div class="lb art">${ph(el.dataset.k)}</div><h3 style="margin-top:12px">${esc(el.dataset.t)}</h3><p class="small muted">Ảnh minh họa · ${esc(p.by)} · ${esc(p.lic)}</p><div class="acts"><button class="btn red" data-act="close-modal">Đóng</button></div>`); break; }
    case 'share': toast('Demo: mở hộp chia sẻ'); break;
    case 'print': window.print(); break;
    case 'chat-open': S.chatOpen = true; renderChat(true); break;
    case 'chat-close': S.chatOpen = false; renderChat(true); break;
    case 'chat-q': chatAsk(QA[Number(el.dataset.i)].q); break;
    case 'f': S.filt[el.dataset.k] = v; render(true); break;
    case 'clear-q': S.filt.q = ''; render(true); break;
    case 'qty-inc': case 'qty-dec': {
      const q = $('#qty'); q.value = Math.max(1, (parseInt(q.value, 10) || 1) + (a === 'qty-inc' ? 1 : -1)); break;
    }
    case 'add': case 'buy': {
      const q = Math.max(1, parseInt(($('#qty') || {}).value, 10) || 1);
      const it = S.cart.find(c => c.id === el.dataset.id);
      if (it) it.qty += q; else S.cart.push({ id: el.dataset.id, qty: q });
      saveCart();
      if (a === 'buy') go('cho/gio-hang');
      else { render(true); toast(`Đã thêm ${q} × ${P(el.dataset.id).name} vào giỏ`); }
      break;
    }
    case 'c-inc': case 'c-dec': case 'c-del': {
      const it = S.cart.find(c => c.id === el.dataset.id);
      if (!it) break;
      if (a === 'c-inc') it.qty++;
      else if (a === 'c-dec') it.qty = Math.max(1, it.qty - 1);
      else S.cart = S.cart.filter(c => c !== it);
      saveCart(); render(true); break;
    }
    case 'zalo-seller': toast(`Demo: mở Zalo chat với ${v}`); break;
    case 'call-seller': toast(`Demo: gọi điện cho ${v}`); break;
    case 'adm-tab': S.admTab = v; if (location.hash !== '#/quan-tri') location.hash = '#/quan-tri'; else render(); break;
    case 'adm-goto': S.admTab = v; break;
    case 'adm-approve': case 'adm-reject': {
      const q = S.pending.find(x => x.id === el.dataset.id);
      S.pending = S.pending.filter(x => x.id !== el.dataset.id); store.set('bm.pending', S.pending);
      render(true);
      toast(a === 'adm-approve' ? `Đã duyệt “${q.name}”, gửi thông báo Zalo cho người bán` : `Đã gửi yêu cầu bổ sung cho “${q.name}”`);
      break;
    }
    case 'export': toast('Demo: xuất báo cáo tháng (Word/Excel)'); break;
    case 'ai-use': toast('Đã lưu mô tả vào hồ sơ sản phẩm chờ duyệt'); break;
    case 'ai-copy':
      try { navigator.clipboard.writeText(S.aiOut[1]); toast('Đã sao chép bài đăng'); } catch (err) { toast('Đã sao chép bài đăng'); }
      break;
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); if (S.chatOpen) { S.chatOpen = false; renderChat(parse()[0] === 'mttq'); } }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.upload')) { e.preventDefault(); e.target.click(); }
});

document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.input === 'xom') {
    S.xomQ = t.value;
    const pos = t.selectionStart;
    render(true);
    const n = $('[data-input=xom]'); n.focus(); n.setSelectionRange(pos, pos);
  }
});

document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.input === 'sort') { S.filt.sort = t.value; render(true); }
  if (t.dataset.input === 'rstatus') {
    const code = t.dataset.code, st = Number(t.value);
    const o = S.rStatus[code] || {};
    S.rStatus[code] = { ...o, status: st, steps: [...(o.steps || []), [today().slice(0, 5), 'Cập nhật: ' + STATUS[st]]] };
    store.set('bm.rstatus', S.rStatus); render(true); toast(`${code}: ${STATUS[st]} · đã báo Zalo người gửi`);
  }
  if (t.name === 'ship') {
    const form = t.form, nShop = new Set(S.cart.map(c => P(c.id).seller)).size;
    const sub = S.cart.reduce((a, c) => a + P(c.id).price * c.qty, 0);
    const fee = t.value === 'post' ? 25000 * nShop : 0;
    $('#shipfee', form).textContent = vnd(fee); $('#grand', form).textContent = vnd(sub + fee);
  }
});

document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-form]');
  if (!f) return;
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  switch (f.dataset.form) {
    case 'gov-search': if (d.q && d.q.trim()) go('mttq/tim-kiem/' + encodeURIComponent(d.q.trim())); else toast('Nhập từ khóa để tìm'); break;
    case 'side-poll': S.votes.p0 = Number(d.o); store.set('bm.votes', S.votes); render(true); toast('Cảm ơn ông/bà đã tham gia biểu quyết'); break;
    case 'contact': f.reset(); toast('Đã gửi thư liên hệ tới Ủy ban MTTQ xã'); break;
    case 'doc-filter': toast('Demo: lọc văn bản theo điều kiện đã chọn'); break;
    case 'report': {
      const code = `PA-2026-${String(159 + S.myReports.length).padStart(4, '0')}`;
      S.myReports.unshift({ code, title: d.title, field: d.field, xom: d.xom, date: today(), status: 0, by: d.anon ? 'Ẩn danh' : (d.name || 'Ẩn danh'), steps: [[today().slice(0, 5), 'Tiếp nhận qua Trang thông tin']], answer: '' });
      store.set('bm.reports', S.myReports); S.uploaded = false;
      render(true);
      modal(`<div class="big-ic">${ic('check')}</div><h3>Đã gửi phản ánh</h3><p>Mã tra cứu của ông/bà:</p><div class="code">${code}</div>
        <p>Ban Thường trực Ủy ban MTTQ xã sẽ tiếp nhận trong 1 ngày làm việc. Kết quả được gửi qua Zalo${d.phone ? ' tới số ' + esc(d.phone) : ''}.</p>
        <div class="acts"><button class="btn red" data-act="close-modal">Đóng</button><button class="btn ghost" data-act="adm-tab" data-v="phan-anh">Xem phía cán bộ xử lý</button></div>`);
      break;
    }
    case 'lookup': {
      const code = (d.code || '').trim().toUpperCase();
      const r = allReports().find(x => x.code === code);
      modal(r ? `<h3>${esc(r.title)}</h3><p class="small muted">${r.code} · ${r.field} · ${r.xom}</p><div style="margin:10px 0">${statusPill(r.status)}</div>
        <ul class="timeline" style="text-align:left">${r.steps.map(([dd, t]) => `<li><b>${dd}</b>${esc(t)}</li>`).join('')}</ul>${r.answer ? `<div class="answer" style="text-align:left"><b>Kết quả:</b> ${esc(r.answer)}</div>` : ''}<div class="acts"><button class="btn red" data-act="close-modal">Đóng</button></div>`
        : `<h3>Không tìm thấy mã “${esc(code)}”</h3><p>Vui lòng kiểm tra lại mã, ví dụ PA-2026-0151.</p><div class="acts"><button class="btn red" data-act="close-modal">Đóng</button></div>`);
      break;
    }
    case 'comment': f.reset(); toast('Cảm ơn ông/bà đã góp ý. Ý kiến đã được ghi nhận.'); break;
    case 'chat': if (d.q && d.q.trim()) chatAsk(d.q.trim()); break;
    case 'mk-search': S.filt = { ...DEF_FILT, q: (d.q || '').trim() }; if (location.hash === link('cho/san-pham')) render(); else go('cho/san-pham'); break;
    case 'checkout': {
      const items = S.cart.map(c => ({ ...c, p: P(c.id) }));
      const shops = [...new Set(items.map(c => c.p.seller))].map(id => ({ id, total: items.filter(c => c.p.seller === id).reduce((a, c) => a + c.p.price * c.qty, 0) + (d.ship === 'post' ? 25000 : 0) }));
      const n = 319 + S.myOrders.length;
      const code = `DH-2610-${String(n).padStart(4, '0')}`;
      S.lastOrder = { code, pay: d.pay, shops };
      S.myOrders.unshift({ code, time: nowHM(), buyer: d.name || 'Khách', items: items.map(c => `${c.p.name} ×${c.qty}`).join(', '), total: shops.reduce((a, s) => a + s.total, 0), pay: d.pay === 'qr' ? 'VietQR' : 'COD', st: 'Chờ người bán xác nhận' });
      store.set('bm.orders', S.myOrders); store.set('bm.lastOrder', S.lastOrder);
      S.cart = []; saveCart();
      go('cho/dat-hang');
      break;
    }
    case 'register': S.uploaded = false; S.pending.unshift({ id: 'u' + Date.now(), name: d.prod || 'Sản phẩm mới', who: 'Vừa đăng ký trên Chợ', when: today(), note: 'Chờ xác minh' }); store.set('bm.pending', S.pending);
      modal(`<div class="big-ic">${ic('check')}</div><h3>Đã gửi đăng ký</h3><p>Ban công tác Mặt trận xóm và Hội Nông dân xã sẽ liên hệ qua Zalo trong 3 ngày làm việc để xác minh và hẹn lịch chụp ảnh sản phẩm.</p>
        <div class="acts"><button class="btn green" data-act="close-modal">Đóng</button><button class="btn ghost" data-act="adm-tab" data-v="san-pham">Xem phía xã duyệt</button></div>`);
      break;
    case 'answer': {
      const code = f.dataset.code, ans = (d.ans || '').trim();
      if (!ans) { toast('Nhập nội dung trả lời'); break; }
      const o = S.rStatus[code] || {};
      S.rStatus[code] = { ...o, status: 3, answer: ans, steps: [...(o.steps || []), [today().slice(0, 5), 'Đã trả lời, đóng phản ánh']] };
      store.set('bm.rstatus', S.rStatus); render(true); toast(`${code}: đã trả lời · hiển thị trên Trang thông tin và báo Zalo người gửi`);
      break;
    }
    case 'ai': {
      S.aiOut = aiWrite(d.name.trim(), d.feat, d.who.trim(), d.price.trim());
      render(true);
      $('#ai1').textContent = ''; $('#ai2').textContent = '';
      typeInto($('#ai1'), S.aiOut[0], () => typeInto($('#ai2'), S.aiOut[1]));
      break;
    }
  }
});

render();
