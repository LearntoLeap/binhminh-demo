'use strict';
/* =================================================================
   CỔNG THÔNG TIN ĐIỆN TỬ ỦY BAN MTTQ XÃ — bố cục theo kiểu cổng chính thống
   ================================================================= */
const PH_ERR = "this.onerror=null;this.parentNode.classList.add('ph-x');this.remove()";
function ph(key, alt = '') {
  const p = PHOTOS[key];
  return p ? `<img src="${p.src}" alt="${esc(alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="${PH_ERR}">` : '';
}
const DOW = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
function longDate() { const d = new Date(); return `${DOW[d.getDay()]}, ngày ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`; }
const dowOf = s => { const [d, m, y] = s.split('/').map(Number); return DOW[new Date(y, m - 1, d).getDay()]; };
const NC = id => (NEWS_CATS.find(c => c.id === id) || {}).name || '';
const dkey = s => Number(s.split('/').reverse().join(''));
const sortedNews = () => [...NEWS].sort((a, b) => dkey(b.date) - dkey(a.date) || b.time.localeCompare(a.time));
const catNews = (id, n = 99) => sortedNews().filter(x => x.cat === id).slice(0, n);

const GOV_MENU = [
  ['', 'Trang chủ'],
  ['gioi-thieu', 'Giới thiệu', [['gioi-thieu', 'Tổng quan xã Bình Minh'], ['co-cau', 'Cơ cấu tổ chức'], ['xom', 'Ban công tác Mặt trận 20 xóm']]],
  ['chuyen-muc/hoat-dong', 'Tin tức – Sự kiện', [['chuyen-muc/hoat-dong', 'Hoạt động Mặt trận'], ['chuyen-muc/hoi-nong-dan', 'Hội Nông dân'], ['chuyen-muc/hoi-lhpn', 'Hội Liên hiệp Phụ nữ'], ['chuyen-muc/doan-thanh-nien', 'Đoàn Thanh niên'], ['chuyen-muc/hoi-ccb', 'Hội Cựu chiến binh'], ['chuyen-muc/hoi-xa-hoi', 'Các hội xã hội'], ['tin-cap-tren', 'Tin Mặt trận Trung ương và tỉnh']]],
  ['chuyen-muc/giam-sat', 'Giám sát – Phản biện'],
  ['chuyen-muc/tuyen-giao', 'Dân vận', [['chuyen-muc/tuyen-giao', 'Dân vận – Tuyên giáo'], ['chuyen-muc/ton-giao', 'Dân vận – Tôn giáo']]],
  ['chuyen-muc/dai-doan-ket', 'An sinh xã hội', [['chuyen-muc/dai-doan-ket', 'Đại đoàn kết – An sinh xã hội'], ['quy', 'Quỹ "Vì người nghèo" – công khai thu, chi']]],
  ['van-ban', 'Văn bản', [['van-ban', 'Văn bản của Ủy ban MTTQ xã'], ['lich-cong-tac', 'Lịch công tác']]],
  ['phan-anh', 'Phản ánh – Kiến nghị'],
  ['y-kien', 'Lấy ý kiến'],
];

function govPage(seg) {
  const p = seg[0] || '';
  let body, act = p;
  if (p === 'chuyen-muc') { body = govCat(seg[1]); act = 'chuyen-muc/' + seg[1]; }
  else if (p === 'tin') { const n = NEWS.find(x => x.id === seg[1]); body = govArticle(n); act = n ? 'chuyen-muc/' + n.cat : ''; }
  else if (p === 'tim-kiem') body = govSearch(seg[1] || '');
  else if (p === 'tin-cap-tren') body = govFeeds();
  else if (p === 'gioi-thieu') body = govAbout();
  else if (p === 'co-cau') body = govOrg();
  else if (p === 'van-ban') body = govDocs();
  else if (p === 'lich-cong-tac') body = govSchedule();
  else if (p === 'phan-anh') body = govReports();
  else if (p === 'quy') body = govFund();
  else if (p === 'y-kien') body = govPolls();
  else if (p === 'xom') body = govXom();
  else if (p === 'nguon-anh') body = govCredits();
  else if (p === 'lien-he') body = govContact();
  else body = govHome();
  return `<div class="gov">${govHeader(act)}<main>${body}</main>${govFooter()}</div>`;
}

/* ---------- Đầu trang, menu, chân trang ---------- */
function govHeader(act) {
  const isOn = (k, kids) => k === act || (kids || []).some(c => c[0] === act);
  const tick = sortedNews().slice(0, 6).map(n => `<a href="#/mttq/tin/${n.id}">${esc(n.title)}</a>`).join('');
  return `<header>
    <div class="g-topbar"><div class="g-wrap"><span>${ic('calendar', 'sm')} ${longDate()}</span>
      <nav><a href="#/mttq/gioi-thieu">Giới thiệu</a><a href="#/mttq/lien-he">Liên hệ</a><a href="#/dien-thoai">Zalo OA</a><a href="#/cho">Chợ OCOP</a><a href="#/quan-tri">${ic('user', 'sm')} Đăng nhập</a></nav></div></div>
    <div class="g-banner">
      <div class="g-wrap in">
        <a class="logo" href="#/mttq" aria-label="Trang chủ"><img src="logo-mttq.png" alt="Biểu trưng Mặt trận Tổ quốc Việt Nam"></a>
        <div class="ttl"><div class="l1">Ủy ban Mặt trận Tổ quốc Việt Nam</div><div class="l2">Xã Bình Minh</div><div class="l3">Trang thông tin điện tử<span> · Tỉnh Nghệ An</span></div></div>
        <div class="slogan">Chào mừng kỷ niệm 96 năm Ngày truyền thống<br>Mặt trận Tổ quốc Việt Nam<b>18/11/1930 – 18/11/2026</b></div>
      </div></div>
    <nav class="g-nav" aria-label="Chuyên mục"><div class="g-wrap"><button class="g-burger" data-act="gnav" aria-label="Mở danh mục">${ic('grid', 'sm')} DANH MỤC</button><ul>
      ${GOV_MENU.map(([k, t, kids]) => `<li class="${isOn(k, kids) ? 'on' : ''}${kids ? ' dd' : ''}"><a href="#/mttq${k ? '/' + k : ''}" ${k ? '' : 'aria-label="Trang chủ"'}>${k ? t : ic('home')}</a>${kids ? `<ul>${kids.map(([ck, ct]) => `<li><a href="#/mttq/${ck}">${ct}</a></li>`).join('')}</ul>` : ''}</li>`).join('')}
      <li class="ext"><a href="#/cho">${ic('store', 'sm')} Chợ OCOP</a></li></ul></div></nav>
    <div class="g-subbar"><div class="g-wrap"><b class="lbl">Tin mới</b><div class="mask"><div class="run">${tick}${tick}</div></div>
      <form class="g-search" data-form="gov-search" role="search"><input name="q" placeholder="Tìm kiếm tin bài…" aria-label="Tìm kiếm"><button aria-label="Tìm">${ic('search', 'sm')}</button></form></div></div>
  </header>`;
}

function govFooter() {
  return `<footer class="g-foot"><div class="g-wrap in">
    <div class="emb"><img src="logo-mttq.png" alt=""></div>
    <div class="info"><h4>Trang thông tin điện tử Ủy ban Mặt trận Tổ quốc Việt Nam xã Bình Minh</h4>
      <p>Cơ quan chủ quản: Ủy ban MTTQ Việt Nam xã Bình Minh, tỉnh Nghệ An</p>
      <p>Chịu trách nhiệm chính: Chủ tịch Ủy ban MTTQ Việt Nam xã Bình Minh</p>
      <p>Địa chỉ: Trụ sở cơ quan xã Bình Minh, tỉnh Nghệ An · Điện thoại: 0238 3xxx xxx</p></div>
    <div class="links"><a href="#/mttq/gioi-thieu">Giới thiệu</a><a href="#/mttq/co-cau">Cơ cấu tổ chức</a><a href="#/mttq/van-ban">Văn bản</a><a href="#/mttq/phan-anh">Phản ánh – Kiến nghị</a><a href="#/mttq/lien-he">Liên hệ</a><a href="#/mttq/nguon-anh">Nguồn ảnh</a></div>
  </div><div class="g-copy">Ghi rõ nguồn "Trang thông tin điện tử Ủy ban MTTQ Việt Nam xã Bình Minh" khi phát hành lại thông tin từ website này.<br><b>BẢN DEMO</b> · Tin bài, số liệu, tên người là minh họa · Ảnh minh họa giấy phép mở, xem <a href="#/mttq/nguon-anh">Nguồn ảnh</a></div></footer>`;
}

/* ---------- Mẩu dựng sẵn ---------- */
const gh = (t, href) => `<div class="g-h"><h2>${href ? `<a href="${href}">${t}</a>` : t}</h2>${href ? `<a class="more" href="${href}">Xem tiếp ›</a>` : ''}</div>`;
const crumb = items => `<nav class="g-crumb"><a href="#/mttq">${ic('home', 'sm')} Trang chủ</a>${items.map(([h, t]) => ` <i>›</i> ${h ? `<a href="#/mttq/${h}">${t}</a>` : `<span>${t}</span>`}`).join('')}</nav>`;
const govLayout = main => `<div class="g-wrap g-cols"><div class="g-col">${main}</div><aside class="g-side">${govSide()}</aside></div>`;
const nThumb = n => `<a class="g-thumb" href="#/mttq/tin/${n.id}"><div class="art">${ph(n.img)}</div><div><h4>${esc(n.title)}</h4><time>${n.date}</time></div></a>`;
const nCard = n => `<a class="g-card" href="#/mttq/tin/${n.id}"><div class="art">${ph(n.img)}</div><h4>${esc(n.title)}</h4><time>${n.date}</time></a>`;
const nLine = n => `<li><a href="#/mttq/tin/${n.id}">${esc(n.title)}</a> <time>(${n.date})</time></li>`;
const nLead = n => `<a class="g-lead" href="#/mttq/tin/${n.id}"><div class="art">${ph(n.img)}</div><div><h3>${esc(n.title)}</h3><time>${ic('clock', 'sm')} ${n.date}</time><p>${esc(n.sum)}</p></div></a>`;
function statusPill(s) { return `<span class="pill st${s}">${s === 3 ? ic('check', 'sm') : ''}${STATUS[s]}</span>`; }
function campHTML(c) {
  const pct = Math.min(100, Math.round(c.raised / c.target * 100));
  return `<div class="camp"><h4>${esc(c.name)}</h4><div class="progress"><i style="width:${pct}%"></i></div>
    <div class="nums"><span><b>${vnd(c.raised)}</b> / ${vnd(c.target)}</span><span>${pct}% · ${num(c.donors)} lượt · hạn ${c.end}</span></div></div>`;
}
function catBlock(id, skip) {
  const l = catNews(id).filter(n => n.id !== skip);
  if (!l.length) return '';
  return `<section class="g-blk">${gh(NC(id), '#/mttq/chuyen-muc/' + id)}<div class="g-blk-in">${nCard(l[0])}<ul class="g-lines">${l.slice(1, 4).map(nLine).join('')}</ul></div></section>`;
}

/* ---------- Cột phải ---------- */
function sidePoll() {
  const p = SIDE_POLL, mine = S.votes.p0;
  if (mine === undefined && !S.pollShow) {
    return `<form data-form="side-poll"><p class="q">${esc(p.title)}</p>${p.opts.map((o, i) => `<label class="r"><input type="radio" name="o" value="${i}" ${i ? '' : 'checked'}> ${o[0]}</label>`).join('')}
      <div class="s-pbtn"><button class="btn red sm">Biểu quyết</button><button type="button" class="btn ghost sm" data-act="poll-show">Xem kết quả</button></div></form>`;
  }
  const opts = p.opts.map((o, i) => [o[0], o[1] + (mine === i ? 1 : 0)]);
  const tot = opts.reduce((a, o) => a + o[1], 0);
  return `<p class="q">${esc(p.title)}</p>${opts.map(([t, v], i) => { const pc = Math.round(v / tot * 100); return `<div class="s-res"><span>${mine === i ? '✓ ' : ''}${t}</span><b>${pc}%</b><i><em style="width:${pc}%"></em></i></div>`; }).join('')}<p class="small muted">${num(tot)} lượt biểu quyết</p>`;
}
function govSide() {
  return `
  <a class="s-ban" href="#/mttq/tin/n1"><div class="art">${ph('gathering')}</div><span><small>Hướng tới</small>Ngày hội Đại đoàn kết toàn dân tộc<b>18/11/2026</b></span></a>
  <a class="s-ban green" href="#/cho"><div class="art">${ph('rice_sacks')}</div><span><small>Sàn giới thiệu sản phẩm</small>Chợ OCOP Bình Minh<b>Đặc sản 20 xóm</b></span></a>
  <div class="s-links">
    <a class="red" href="#/mttq/phan-anh">${ic('msg')} Gửi phản ánh – kiến nghị</a>
    <a class="gold" href="#/mttq/quy">${ic('heart')} Ủng hộ Quỹ "Vì người nghèo"</a>
    <button class="blue" data-act="chat-open">${ic('chat')} Hỏi đáp trực tuyến</button>
  </div>
  <div class="s-box"><h3>Tin Mặt trận cấp trên</h3><div class="s-feed"><b class="src">Trung ương</b>${feedList(FEEDS.tw, 3, false)}<b class="src">Tỉnh Nghệ An</b>${feedList(FEEDS.tinh, 3, false)}</div><a class="s-more" href="#/mttq/tin-cap-tren">Xem thêm ›</a></div>
  <div class="s-box"><h3>Lịch công tác</h3><ul class="s-cal">${SCHEDULE.slice(1, 5).map(([d, t, w, at]) => `<li><b>${d} · ${t}</b>${esc(w)}<span>${esc(at)}</span></li>`).join('')}</ul><a class="s-more" href="#/mttq/lich-cong-tac">Xem lịch tuần ›</a></div>
  <div class="s-box"><h3>Văn bản mới</h3><ul class="s-docs">${DOCS.slice(0, 5).map(d => `<li><a href="#/mttq/van-ban"><b>${d[0]}</b> ${esc(d[3])}</a><time>${d[1]}</time></li>`).join('')}</ul><a class="s-more" href="#/mttq/van-ban">Xem tất cả ›</a></div>
  <div class="s-box"><h3>Thăm dò ý kiến</h3>${sidePoll()}</div>
  <div class="s-box"><h3>Liên kết website</h3><div class="s-ext">${LINKS.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${ic('arrow', 'sm')} ${t}</a>`).join('')}</div></div>
  <div class="s-box"><h3>Kết nối Zalo OA</h3><div class="s-zalo">${ART.qr('zalo-oa', 92)}<p>Quét mã để quan tâm Zalo OA <b>MTTQ xã Bình Minh</b>: nhận tin, gửi phản ánh, nhận kết quả trả lời.</p></div></div>
  <div class="s-box"><h3>Thống kê truy cập</h3><dl class="s-stat"><dt>Đang trực tuyến</dt><dd>37</dd><dt>Hôm nay</dt><dd>1.284</dd><dt>Tháng này</dt><dd>21.906</dd><dt>Tổng lượt truy cập</dt><dd>286.519</dd></dl></div>`;
}

/* ---------- Trang chủ ---------- */
function govHome() {
  const all = sortedNews();
  const feat = NEWS.find(n => n.hot) || all[0];
  const hl = all.filter(n => n.id !== feat.id).slice(0, 6);
  const reps = allReports();
  const hd = catNews('hoat-dong').filter(n => n.id !== feat.id);
  const ton = FUND.open + FUND.thu - FUND.chi;
  const gal = [['gathering', 'Ngày hội Đại đoàn kết ở khu dân cư'], ['training', 'Tập huấn bán hàng trên mạng'], ['house', 'Nhà Đại đoàn kết'], ['temple_gate', 'Đền Canh'], ['harvest', 'Mùa gặt'], ['road_build', 'Làm đường giao thông nông thôn']];
  const quick = [['phan-anh', 'msg', 'Gửi phản ánh, kiến nghị'], ['phan-anh', 'search', 'Tra cứu kết quả xử lý'], ['quy', 'heart', 'Ủng hộ Quỹ "Vì người nghèo"'], ['y-kien', 'poll', 'Lấy ý kiến Nhân dân'], ['van-ban', 'file', 'Văn bản – Tài liệu'], ['xom', 'users', 'Ban CTMT 20 xóm']];
  return `
  <section class="g-wrap g-top">
    <a class="g-feat" href="#/mttq/tin/${feat.id}"><div class="art">${ph(feat.img)}</div><div class="cap"><h2>${esc(feat.title)}</h2><time>${ic('clock', 'sm')} ${feat.date}</time><p>${esc(feat.sum)}</p></div></a>
    <div class="g-hl"><div class="g-hl-h">Tin mới nhất</div>${hl.map(nThumb).join('')}</div>
  </section>
  <section class="g-wrap g-quick">${quick.map(([h, i, t]) => `<a href="#/mttq/${h}"><span>${ic(i)}</span>${t}</a>`).join('')}</section>
  <div class="g-wrap g-cols"><div class="g-col">
    <section class="g-blk">${gh('Hoạt động Mặt trận', '#/mttq/chuyen-muc/hoat-dong')}
      <div class="g-blk-wide">${nLead(hd[0])}<ul class="g-lines">${hd.slice(1, 5).map(nLine).join('')}</ul></div></section>
    ${feedsBlock(5)}
    <div class="g-grid2">${ORG_CATS.map(id => catBlock(id)).join('')}</div>
    ${socBlock()}
    <a class="g-promo" href="#/mttq/chuyen-muc/hoat-dong"><div class="art">${ph('countryside')}</div><div class="t"><small>Cuộc vận động</small>"Toàn dân đoàn kết xây dựng nông thôn mới, đô thị văn minh"</div></a>
    <div class="g-grid2">${catBlock('giam-sat')}${catBlock('dai-doan-ket')}</div>
    <div class="g-grid2">${catBlock('tuyen-giao')}${catBlock('ton-giao')}</div>
    <section class="g-blk">${gh('Phản ánh – Kiến nghị của Nhân dân', '#/mttq/phan-anh')}
      <div class="stats"><div class="stat"><b>214</b><span>Tiếp nhận năm 2026</span></div><div class="stat"><b>92%</b><span>Đã giải quyết</span></div><div class="stat"><b>4,6 ngày</b><span>Thời gian xử lý trung bình</span></div></div>
      <div class="tblwrap"><table class="tbl"><thead><tr><th>Mã</th><th>Nội dung</th><th>Xóm</th><th>Ngày</th><th>Trạng thái</th></tr></thead><tbody>
      ${reps.slice(0, 5).map(r => `<tr><td><b>${r.code}</b></td><td>${esc(r.title)}</td><td>${r.xom}</td><td>${r.date}</td><td>${statusPill(r.status)}</td></tr>`).join('')}</tbody></table></div>
      <div class="g-btns"><a class="btn red sm" href="#/mttq/phan-anh">${ic('send', 'sm')} Gửi phản ánh</a><a class="btn ghost sm" href="#/mttq/phan-anh">${ic('search', 'sm')} Tra cứu theo mã</a></div></section>
    <section class="g-blk">${gh('Công khai Quỹ "Vì người nghèo" năm ' + FUND.year, '#/mttq/quy')}
      <div class="fund-box"><div class="fund-row" style="grid-template-columns:repeat(4,1fr)"><div><span>Tồn đầu năm</span><b>${vnd(FUND.open)}</b></div><div><span>Tổng thu</span><b>${vnd(FUND.thu)}</b></div><div><span>Tổng chi</span><b>${vnd(FUND.chi)}</b></div><div><span>Tồn quỹ</span><b>${vnd(ton)}</b></div></div>
      ${FUND.campaigns.slice(0, 2).map(campHTML).join('')}<a class="btn gold sm" href="#/mttq/quy">${ic('heart', 'sm')} Ủng hộ qua VietQR</a></div></section>
    <section class="g-blk">${gh('Gương người tốt – Việc tốt')}
      <div class="g-cards3">${DEEDS.map(d => `<a class="g-card" href="${d.link || '#/mttq/chuyen-muc/dai-doan-ket'}"><div class="art">${ph(d.img)}</div><h4>${esc(d.title)}</h4><span class="who">${d.name} · ${d.where}</span><p>${esc(d.text)}</p></a>`).join('')}</div></section>
    <section class="g-blk">${gh('Sản phẩm OCOP – Đặc sản Bình Minh', '#/cho')}
      <div class="g-cards4">${PRODUCTS.filter(p => p.ocop).slice(0, 4).map(p => `<a class="g-card prod" href="#/cho/sp/${p.id}"><div class="art">${ph(p.img)}</div><span class="star">${'★'.repeat(p.ocop)}</span><h4>${esc(p.name)}</h4><b class="price">${vnd(p.price)}</b> <span class="unit">/ ${p.unit}</span></a>`).join('')}</div></section>
    <section class="g-blk">${gh('Thư viện ảnh – Video')}
      <div class="g-media"><div class="g-gal">${gal.map(([k, t]) => `<button class="art" data-act="lightbox" data-k="${k}" data-t="${esc(t)}">${ph(k, t)}<span>${t}</span></button>`).join('')}</div>
      <button class="g-video art" data-act="video">${ph('festival')}<i>▶</i><span>Phóng sự: Lễ hội đền Canh – nét đẹp văn hóa vùng đất Bình Minh</span></button></div></section>
  </div><aside class="g-side">${govSide()}</aside></div>`;
}

/* ---------- Chuyên mục, bài viết, tìm kiếm ---------- */
function newsList(l) {
  return l.length ? `<div class="g-list">${l.map(n => `<a class="g-li" href="#/mttq/tin/${n.id}"><div class="art">${ph(n.img)}</div><div><h3>${esc(n.title)}</h3><div class="g-meta">${ic('clock', 'sm')} ${n.time} · ${n.date} · ${n.org ? socName(n.org) : NC(n.cat)}</div><p>${esc(n.sum)}</p></div></a>`).join('')}</div>` : '<div class="empty">Không có tin bài phù hợp</div>';
}
const pager = () => `<div class="g-pager"><span class="on">1</span><button data-act="demo-page">2</button><button data-act="demo-page">3</button><button data-act="demo-page">Trang sau ›</button></div>`;
function govCat(id) {
  if (!NC(id)) return govLayout(`<h1 class="g-pt">Không tìm thấy chuyên mục</h1>`);
  let l = catNews(id);
  let chips = '';
  if (id === 'hoi-xa-hoi') {
    if (S.socOrg) l = l.filter(n => n.org === S.socOrg);
    chips = `<div class="tabs">${[['', 'Tất cả các hội'], ...SOC_ORGS.map(o => [o.id, o.name])].map(([k, t]) => `<button class="tab ${S.socOrg === k ? 'on' : ''}" data-act="soc-f" data-v="${k}">${t}</button>`).join('')}</div>`;
  }
  return govLayout(`${crumb([[null, NC(id)]])}<h1 class="g-pt">${NC(id)}</h1>${chips}${newsList(l)}${pager()}`);
}
function govSearch(q) {
  const k = norm(q);
  const l = sortedNews().filter(n => norm(`${n.title} ${n.sum} ${n.body.join(' ')}`).includes(k));
  return govLayout(`${crumb([[null, 'Tìm kiếm']])}<h1 class="g-pt">Kết quả tìm kiếm</h1><p class="g-intro">Từ khóa “<b>${esc(q)}</b>” · ${l.length} kết quả</p>${newsList(l)}`);
}
function govArticle(n) {
  if (!n) return govLayout(`<h1 class="g-pt">Không tìm thấy bài viết</h1>`);
  const same = catNews(n.cat).filter(x => x.id !== n.id).slice(0, 3);
  const other = sortedNews().filter(x => x.cat !== n.cat).slice(0, 6);
  return govLayout(`${crumb([['chuyen-muc/' + n.cat, NC(n.cat)]])}
    <article class="g-art fs${S.fs}">
      <h1>${esc(n.title)}</h1>
      <div class="g-tools"><span>${ic('clock', 'sm')} ${dowOf(n.date)}, ${n.date} ${n.time}</span><span>${ic('eye', 'sm')} ${num(n.views)} lượt xem</span>
        <span class="fsz">Cỡ chữ <button data-act="fs" data-v="-1" aria-label="Chữ nhỏ">A-</button><button data-act="fs" data-v="0" aria-label="Chữ vừa">A</button><button data-act="fs" data-v="1" aria-label="Chữ lớn">A+</button></span>
        <button class="lk" data-act="print">${ic('file', 'sm')} In bài</button></div>
      <p class="lead">${esc(n.sum)}</p>
      <figure><div class="art">${ph(n.img)}</div><figcaption>Ảnh minh họa</figcaption></figure>
      <div class="body">${n.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      <p class="author">${esc(n.author)}</p>
      <div class="g-share"><span>Chia sẻ:</span><button data-act="share">${ic('zalo', 'sm')} Zalo</button><button data-act="share">Facebook</button><button data-act="share">Sao chép liên kết</button></div>
    </article>
    ${same.length ? `<section class="g-blk">${gh('Tin cùng chuyên mục')}<div class="g-cards3">${same.map(nCard).join('')}</div></section>` : ''}
    <section class="g-blk">${gh('Tin khác')}<ul class="g-lines">${other.map(nLine).join('')}</ul></section>`);
}

/* ---------- Giới thiệu, cơ cấu ---------- */
function govAbout() {
  return govLayout(`${crumb([['gioi-thieu', 'Giới thiệu'], [null, 'Tổng quan xã Bình Minh']])}<h1 class="g-pt">Tổng quan xã Bình Minh</h1>
    <div class="g-art"><figure><div class="art">${ph('field2')}</div><figcaption>Cánh đồng lúa vùng Yên Thành (ảnh minh họa)</figcaption></figure>
    <div class="body">
      <p>Xã Bình Minh, tỉnh Nghệ An được thành lập trên cơ sở sắp xếp các xã Đức Thành, Mã Thành, Tân Thành và Tiến Thành (thuộc huyện Yên Thành cũ), theo Nghị quyết của Ủy ban Thường vụ Quốc hội về sắp xếp đơn vị hành chính cấp xã của tỉnh Nghệ An năm 2025.</p>
      <p>Xã có diện tích tự nhiên 91,08 km², quy mô dân số 37.031 người, tổ chức thành 20 xóm. Đời sống của Nhân dân gắn với sản xuất lúa, chăn nuôi, cây ăn quả, chè và các nghề chế biến truyền thống.</p>
      <p>Trên địa bàn có nhiều di tích được xếp hạng; tiêu biểu là đền Canh – di tích lịch sử – văn hóa cấp tỉnh (công nhận năm 2017), nơi diễn ra lễ hội truyền thống từ ngày 17 đến 20 tháng Hai âm lịch hằng năm.</p>
    </div></div>
    <table class="g-info"><tbody>
      <tr><th>Hình thành từ</th><td>Các xã Đức Thành, Mã Thành, Tân Thành, Tiến Thành</td></tr>
      <tr><th>Diện tích tự nhiên</th><td>91,08 km²</td></tr><tr><th>Dân số</th><td>37.031 người</td></tr><tr><th>Đơn vị dân cư</th><td>20 xóm</td></tr>
      <tr><th>Di tích tiêu biểu</th><td>Đền Canh – di tích lịch sử – văn hóa cấp tỉnh (2017)</td></tr>
      <tr><th>Sản phẩm chủ lực</th><td>Gạo thơm, ốc bươu đen, gà đồi, mật ong, chè, tương nếp, giò chả (danh mục minh họa)</td></tr></tbody></table>
    <section class="g-blk">${gh('Hình ảnh quê hương')}<div class="g-cards3">${[['temple_gate', 'Đền Canh'], ['village', 'Làng quê'], ['tea_field', 'Đồi chè']].map(([k, t]) => `<div class="g-card"><div class="art">${ph(k)}</div><h4>${t}</h4></div>`).join('')}</div></section>`);
}
function govOrg() {
  const box = (t, s = '') => `<div class="oc-box ${s}">${t}</div>`;
  const ptc = [['Chủ tịch Ủy ban MTTQ xã', 'Chỉ đạo chung; phụ trách công tác tổ chức, cán bộ'], ['Phó Chủ tịch', 'Phụ trách giám sát, phản biện xã hội; tiếp nhận ý kiến, kiến nghị'], ['Phó Chủ tịch', 'Phụ trách cuộc vận động, an sinh xã hội, Quỹ "Vì người nghèo"'], ['Ủy viên Thường trực', 'Phụ trách tuyên truyền, Trang thông tin điện tử, chuyển đổi số']];
  return govLayout(`${crumb([['gioi-thieu', 'Giới thiệu'], [null, 'Cơ cấu tổ chức']])}<h1 class="g-pt">Cơ cấu tổ chức</h1>
    <div class="oc">${box('ỦY BAN MẶT TRẬN TỔ QUỐC VIỆT NAM XÃ BÌNH MINH', 'top')}<div class="oc-v"></div>${box('BAN THƯỜNG TRỰC', 'mid')}<div class="oc-v"></div>
      <div class="oc-row">${['Hội Nông dân', 'Hội Liên hiệp Phụ nữ', 'Đoàn Thanh niên', 'Hội Cựu chiến binh'].map(t => box(t)).join('')}</div>
      <div class="oc-cap">Các hội xã hội</div>
      <div class="oc-row five">${SOC_ORGS.map(o => box(o.name, 'soc')).join('')}</div>
      <div class="oc-cap">Các ban</div>
      <div class="oc-row three">${['Ban Thanh tra nhân dân', 'Ban Giám sát đầu tư của cộng đồng', 'Ban công tác Mặt trận 20 xóm'].map(t => box(t, 'lt')).join('')}</div></div>
    <section class="g-blk">${gh('Ban Thường trực Ủy ban MTTQ xã')}
      <div class="g-people">${ptc.map(([c]) => `<div class="person"><div class="ava-ph">${ic('user')}</div><b>Họ và tên</b><span>${c}</span></div>`).join('')}</div>
      <div class="tblwrap"><table class="tbl"><thead><tr><th>Chức vụ</th><th>Họ và tên</th><th>Lĩnh vực phụ trách</th><th>Điện thoại</th></tr></thead><tbody>
      ${ptc.map(([c, l]) => `<tr><td><b>${c}</b></td><td class="muted">(cập nhật khi triển khai)</td><td>${l}</td><td>0238 3xxx xxx</td></tr>`).join('')}</tbody></table></div></section>`);
}

/* ---------- Văn bản, lịch công tác ---------- */
function govDocs() {
  return govLayout(`${crumb([[null, 'Văn bản']])}<h1 class="g-pt">Văn bản của Ủy ban MTTQ xã</h1>
    <form class="g-filter" data-form="doc-filter"><select class="input"><option>Tất cả loại văn bản</option><option>Kế hoạch</option><option>Thông báo</option><option>Hướng dẫn</option><option>Quyết định</option><option>Báo cáo</option></select><select class="input"><option>Năm 2026</option><option>Năm 2025</option></select><input class="input" placeholder="Số, ký hiệu hoặc trích yếu…"><button class="btn red sm">${ic('search', 'sm')} Tìm</button></form>
    <div class="tblwrap"><table class="tbl g-docs"><thead><tr><th>STT</th><th>Số / Ký hiệu</th><th>Ngày ban hành</th><th>Loại</th><th>Trích yếu</th><th>Tải về</th></tr></thead><tbody>
    ${DOCS.map((d, i) => `<tr><td>${i + 1}</td><td><b>${d[0]}</b></td><td>${d[1]}</td><td>${d[2]}</td><td>${esc(d[3])}</td><td><button class="dl" data-act="dl" aria-label="Tải về">${ic('down', 'sm')} PDF</button></td></tr>`).join('')}</tbody></table></div>`);
}
function govSchedule() {
  return govLayout(`${crumb([['van-ban', 'Văn bản'], [null, 'Lịch công tác']])}<h1 class="g-pt">Lịch công tác tuần của Ban Thường trực</h1>
    <p class="g-intro">Tuần từ ngày 05/10 đến ngày 11/10/2026</p>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>Ngày</th><th>Giờ</th><th>Nội dung</th><th>Địa điểm</th></tr></thead><tbody>
    ${SCHEDULE.map(([d, t, w, at]) => `<tr><td><b>${d}</b></td><td>${t}</td><td>${esc(w)}</td><td>${esc(at)}</td></tr>`).join('')}</tbody></table></div>`);
}

/* ---------- Phản ánh, Quỹ, Lấy ý kiến, 20 xóm ---------- */
const gPage = (name, title, intro, inner, parent) => `<div class="g-wrap">${crumb([...(parent ? [parent] : []), [null, name]])}<h1 class="g-pt">${title}</h1><p class="g-intro">${intro}</p>${inner}</div>`;
function govReports() {
  const reps = allReports().filter(r => S.rFilter === 'all' || String(r.status) === S.rFilter);
  const xomOpts = XOM.map(x => `<option>Xóm ${x.n}</option>`).join('');
  return gPage('Phản ánh – Kiến nghị', 'Phản ánh – Kiến nghị của Nhân dân', 'Mọi ý kiến được Ban Thường trực Ủy ban MTTQ xã tiếp nhận, chuyển cơ quan có thẩm quyền và theo dõi đến khi có kết quả. Người gửi nhận thông báo qua Zalo hoặc tin nhắn.', `
    <div class="pa-grid">
      <div class="panel">
        <h2>Gửi phản ánh</h2><p class="muted small">Khoảng 2 phút. Có thể gửi ẩn danh.</p>
        <form class="form" data-form="report">
          <div class="row2"><div class="field"><label for="r-name">Họ và tên</label><input class="input" id="r-name" name="name" placeholder="Nguyễn Văn A"></div>
            <div class="field"><label for="r-phone">Số điện thoại (nhận kết quả)</label><input class="input" id="r-phone" name="phone" inputmode="tel" placeholder="09xx xxx xxx"></div></div>
          <div class="row2"><div class="field"><label for="r-xom">Xóm</label><select class="input" id="r-xom" name="xom">${xomOpts}</select></div>
            <div class="field"><label for="r-field">Lĩnh vực</label><select class="input" id="r-field" name="field">${REPORT_FIELDS.map(f => `<option>${f}</option>`).join('')}</select></div></div>
          <div class="field"><label for="r-title">Tiêu đề</label><input class="input" id="r-title" name="title" required placeholder="Ví dụ: Đường vào xóm 8 bị sạt lở lề"></div>
          <div class="field"><label for="r-body">Nội dung</label><textarea class="input" id="r-body" name="body" required placeholder="Mô tả sự việc, địa điểm, thời gian…"></textarea></div>
          <div class="upload ${S.uploaded ? 'done' : ''}" data-act="upload" role="button" tabindex="0">${S.uploaded ? ic('check', 'sm') + ' Đã đính kèm 2 ảnh' : ic('camera', 'sm') + ' Chụp / đính kèm ảnh, video (không bắt buộc)'}</div>
          <label class="check"><input type="checkbox" name="anon"> Gửi ẩn danh (không hiển thị tên khi công khai kết quả)</label>
          <label class="check"><input type="checkbox" name="public" checked> Đồng ý công khai nội dung và kết quả trả lời</label>
          <button class="btn red lg">${ic('send', 'sm')} Gửi phản ánh</button>
        </form>
      </div>
      <div>
        <div class="panel"><h2>Tra cứu kết quả</h2><p class="muted small">Nhập mã được cấp khi gửi, ví dụ PA-2026-0151</p>
          <form class="lookup" data-form="lookup"><input class="input" name="code" placeholder="PA-2026-…" aria-label="Mã phản ánh"><button class="btn ghost">${ic('search', 'sm')} Tra cứu</button></form>
          <div class="stats"><div class="stat"><b>214</b><span>Tiếp nhận 2026</span></div><div class="stat"><b>92%</b><span>Đã giải quyết</span></div><div class="stat"><b>4,6 ngày</b><span>Xử lý trung bình</span></div></div></div>
        <div style="padding-top:18px">
          <div class="tabs">${[['all', 'Tất cả'], ['0', STATUS[0]], ['1', STATUS[1]], ['2', STATUS[2]], ['3', STATUS[3]]].map(([k, t]) => `<button class="tab ${S.rFilter === k ? 'on' : ''}" data-act="r-filter" data-v="${k}">${t}</button>`).join('')}</div>
          ${reps.length ? reps.map(reportItem).join('') : '<div class="empty">Chưa có phản ánh ở trạng thái này</div>'}
        </div>
      </div>
    </div>`);
}
function reportItem(r) {
  return `<details class="ritem"><summary><div class="top"><div><h4>${esc(r.title)}</h4><div class="meta"><span>${r.code}</span><span>${r.field}</span><span>${r.xom}</span><span>${r.date}</span></div></div>${statusPill(r.status)}</div></summary>
    <ul class="timeline">${r.steps.map(([d, t]) => `<li><b>${d}</b>${esc(t)}</li>`).join('')}</ul>
    ${r.answer ? `<div class="answer"><b>Kết quả trả lời:</b> ${esc(r.answer)}</div>` : ''}</details>`;
}
function govFund() {
  const ton = FUND.open + FUND.thu - FUND.chi;
  return gPage('Quỹ "Vì người nghèo"', 'Quỹ "Vì người nghèo" xã Bình Minh – công khai thu, chi', 'Công khai toàn bộ khoản thu – chi theo sao kê tài khoản của Quỹ. Bà con có thể ủng hộ trực tiếp bằng VietQR, tiền vào thẳng tài khoản Quỹ.', `
    <div class="pa-grid">
      <div>
        <div class="fund-box"><div class="fund-row" style="grid-template-columns:repeat(4,1fr)">
          <div><span>Tồn đầu năm</span><b>${vnd(FUND.open)}</b></div><div><span>Tổng thu ${FUND.year}</span><b>${vnd(FUND.thu)}</b></div><div><span>Tổng chi</span><b>${vnd(FUND.chi)}</b></div><div><span>Tồn quỹ</span><b>${vnd(ton)}</b></div></div>
          <p class="small muted">Cập nhật ${today()} · Đồng bộ tự động từ sao kê ngân hàng (giai đoạn 2)</p></div>
        <section class="g-blk">${gh('Chương trình đang vận động')}
          <div class="camps">${FUND.campaigns.map(c => `<div class="campc"><div class="art">${ph(c.img)}</div><div>${campHTML(c)}<p class="small muted">${esc(c.desc)}</p></div></div>`).join('')}</div></section>
        <section class="g-blk">${gh('Khoản thu gần đây')}
          <div class="tblwrap"><table class="tbl"><thead><tr><th>Ngày</th><th>Người / đơn vị ủng hộ</th><th>Nội dung</th><th class="num">Số tiền</th></tr></thead>
          <tbody>${FUND.thuList.map(([d, w, a, n]) => `<tr><td>${d}</td><td>${esc(w)}</td><td>${esc(n)}</td><td class="num">${vnd(a)}</td></tr>`).join('')}</tbody></table></div></section>
        <section class="g-blk">${gh('Khoản chi gần đây')}
          <div class="tblwrap"><table class="tbl"><thead><tr><th>Ngày</th><th>Nội dung chi</th><th>Chứng từ</th><th class="num">Số tiền</th></tr></thead>
          <tbody>${FUND.chiList.map(([d, w, a, n]) => `<tr><td>${d}</td><td>${esc(w)}</td><td>${esc(n)}</td><td class="num">${vnd(a)}</td></tr>`).join('')}</tbody></table></div></section>
      </div>
      <div class="panel sticky">
        <h2>Ủng hộ Quỹ</h2><p class="muted small">Mở ứng dụng ngân hàng bất kỳ → quét mã</p>
        <div class="donate" style="margin-top:14px"><div class="qrbox">${ART.qr('quy-vi-nguoi-ngheo', 150)}</div>
          <dl class="kv"><dt>Ngân hàng</dt><dd>${FUND.bank}</dd><dt>Số tài khoản</dt><dd>${FUND.accNo}</dd><dt>Chủ tài khoản</dt><dd>${FUND.accName}</dd><dt>Nội dung</dt><dd>Họ tên – xóm – ung ho</dd></dl></div>
        <div class="tabs" style="margin-top:16px">${[100000, 200000, 500000, 1000000].map(v => `<button class="tab" data-act="donate" data-v="${v}">${vnd(v)}</button>`).join('')}</div>
        <p class="small muted">Mã QR minh họa. Bản chính thức dùng tài khoản thật của Quỹ, tên người ủng hộ hiển thị theo sao kê.</p>
      </div>
    </div>`, ['chuyen-muc/dai-doan-ket', 'An sinh xã hội']);
}
function govPolls() {
  return gPage('Lấy ý kiến', 'Lấy ý kiến Nhân dân', 'Khảo sát sự hài lòng, lấy ý kiến dự thảo quy ước, kế hoạch của xã. Kết quả được tổng hợp phục vụ công tác giám sát, phản biện xã hội của Mặt trận.', `
    <div class="pa-grid">
      <div>${POLLS.map(pollHTML).join('')}</div>
      <div class="panel">
        <span class="kick">Góp ý dự thảo · hạn ${DRAFT.end}</span>
        <h2 style="margin-top:4px">${esc(DRAFT.title)}</h2>
        <ol style="padding-left:20px;margin:12px 0;display:grid;gap:6px">${DRAFT.points.map(p => `<li>${esc(p)}</li>`).join('')}</ol>
        <form class="form" data-form="comment">
          <div class="field"><label for="c-body">Ý kiến của ông/bà</label><textarea class="input" id="c-body" name="body" required placeholder="Đồng ý / đề nghị bổ sung, sửa đổi…"></textarea></div>
          <div class="row2"><div class="field"><label for="c-xom">Xóm</label><select class="input" id="c-xom">${XOM.map(x => `<option>Xóm ${x.n}</option>`).join('')}</select></div>
          <div class="field"><label for="c-name">Họ tên (không bắt buộc)</label><input class="input" id="c-name"></div></div>
          <button class="btn red">${ic('send', 'sm')} Gửi góp ý</button>
          <p class="small muted">${DRAFT.comments} ý kiến đã gửi · Ban Thường trực tổng hợp, báo cáo tại hội nghị.</p>
        </form>
      </div>
    </div>`);
}
function pollHTML(p) {
  const mine = S.votes[p.id];
  const opts = p.opts.map((o, i) => [o[0], o[1] + (mine === i ? 1 : 0)]);
  const total = opts.reduce((a, o) => a + o[1], 0);
  const voted = mine !== undefined;
  return `<div class="poll"><span class="kick">${esc(p.note)}</span><h3>${esc(p.title)}</h3>
    <p class="small muted">${num(total)} lượt tham gia · hạn ${p.end}${voted ? ' · Cảm ơn ông/bà đã tham gia' : ' · Bấm để chọn'}</p>
    ${opts.map(([t, v], i) => {
      const pct = Math.round(v / total * 100);
      return `<button class="opt ${mine === i ? 'mine' : ''}" data-act="vote" data-id="${p.id}" data-i="${i}" ${voted ? 'disabled' : ''}>
        <span class="bar" style="width:${voted ? pct : 0}%"></span><span class="t"><span>${mine === i ? '✓ ' : ''}${esc(t)}</span>${voted ? `<b>${pct}%</b>` : ''}</span></button>`;
    }).join('')}</div>`;
}
function govXom() {
  const q = norm(S.xomQ);
  const list = XOM.filter(x => !q || norm(`xom ${x.n} ${x.leader}`).includes(q));
  return gPage('Ban công tác Mặt trận 20 xóm', 'Ban công tác Mặt trận 20 xóm', 'Đầu mối của Mặt trận ở khu dân cư: tiếp nhận ý kiến bà con, tổ chức Ngày hội Đại đoàn kết, vận động an sinh. Mỗi xóm có một nhóm Zalo kết nối với Zalo OA của xã. (Họ tên, số điện thoại là minh họa.)', `
    <div class="xom-tools"><input class="input" data-input="xom" value="${esc(S.xomQ)}" placeholder="Tìm số xóm hoặc tên trưởng ban…" aria-label="Tìm xóm"><span class="muted small">${list.length} xóm · khoảng ${num(XOM.reduce((a, x) => a + x.households, 0))} hộ</span></div>
    <div class="xom-grid">${list.map(x => `<div class="xom"><span class="n"><small>XÓM</small>${x.n}</span><div><b>${x.leader}</b><span>Trưởng ban CTMT · ${x.phone}</span><br><span>${x.households} hộ</span></div><button class="btn ghost sm z" data-act="zalo-group" data-v="${x.n}" aria-label="Nhóm Zalo xóm ${x.n}">${ic('zalo', 'sm')}</button></div>`).join('')}</div>`, ['gioi-thieu', 'Giới thiệu']);
}

/* ---------- Liên hệ, nguồn ảnh ---------- */
function govContact() {
  return govLayout(`${crumb([[null, 'Liên hệ']])}<h1 class="g-pt">Liên hệ</h1>
    <table class="g-info"><tbody><tr><th>Cơ quan</th><td>Ủy ban MTTQ Việt Nam xã Bình Minh, tỉnh Nghệ An</td></tr><tr><th>Địa chỉ</th><td>Trụ sở cơ quan xã Bình Minh, tỉnh Nghệ An</td></tr><tr><th>Điện thoại</th><td>0238 3xxx xxx</td></tr><tr><th>Zalo OA</th><td>MTTQ xã Bình Minh</td></tr></tbody></table>
    <section class="g-blk">${gh('Gửi thư liên hệ')}<form class="form panel" data-form="contact"><div class="row2"><div class="field"><label for="ct-n">Họ và tên</label><input class="input" id="ct-n" required></div><div class="field"><label for="ct-p">Điện thoại / Email</label><input class="input" id="ct-p" required></div></div>
      <div class="field"><label for="ct-b">Nội dung</label><textarea class="input" id="ct-b" required></textarea></div><button class="btn red">${ic('send', 'sm')} Gửi</button></form></section>`);
}
function govCredits() {
  const rows = Object.entries(PHOTOS).map(([k, p]) => `<tr><td><div class="art cr">${ph(k)}</div></td><td>${esc(p.title)}</td><td>${esc(p.by || '—')}</td><td>${esc(p.lic)}</td><td><a href="${p.page}" target="_blank" rel="noopener">${esc(p.via || 'Nguồn')}</a></td></tr>`).join('');
  return gPage('Nguồn ảnh', 'Nguồn ảnh minh họa', 'Bản demo dùng ảnh có giấy phép mở (Creative Commons, phạm vi công cộng) từ Wikimedia Commons và Flickr, chỉ để minh họa bố cục. Khi triển khai chính thức, toàn bộ ảnh sẽ được thay bằng ảnh thật của xã.', `
    <div class="tblwrap"><table class="tbl"><thead><tr><th>Ảnh</th><th>Tiêu đề gốc</th><th>Tác giả</th><th>Giấy phép</th><th>Nguồn</th></tr></thead><tbody>${rows}</tbody></table></div>`);
}

/* ---------- Trợ lý hỏi đáp ---------- */
function renderChat(show) {
  const root = $('#chat-root');
  if (!show) { root.innerHTML = ''; return; }
  if (!S.chatOpen) { root.innerHTML = `<button class="chat-fab" data-act="chat-open">${ic('chat')} Hỏi đáp</button>`; return; }
  root.innerHTML = `<div class="chat" role="dialog" aria-label="Trợ lý hỏi đáp">
    <header>${ic('spark')}<div><b>Trợ lý hỏi đáp</b><span>Ủy ban MTTQ xã Bình Minh</span></div><button data-act="chat-close" aria-label="Đóng">${ic('x')}</button></header>
    <div class="msgs" id="msgs">${S.chat.map(m => `<div class="bub ${m.who}">${m.text}</div>`).join('')}</div>
    <div class="chips">${QA.slice(0, 4).map((q, i) => `<button class="chip" data-act="chat-q" data-i="${i}">${q.q}</button>`).join('')}</div>
    <form data-form="chat"><input class="input" name="q" placeholder="Nhập câu hỏi…" autocomplete="off" aria-label="Câu hỏi"><button class="btn red sm" aria-label="Gửi">${ic('send', 'sm')}</button></form>
    <div class="ai-note">Bản demo trả lời theo kịch bản; bản thật dùng AI học từ văn bản của xã</div>
  </div>`;
  const m = $('#msgs'); m.scrollTop = m.scrollHeight;
}
function chatAsk(text) {
  S.chat.push({ who: 'me', text: esc(text) });
  const t = norm(text);
  const hit = QA.find(q => q.k.some(k => t.includes(norm(k))));
  S.chat.push({ who: 'bot', text: hit ? hit.a + (hit.link ? ` <a href="${hit.link}">Mở mục này →</a>` : '') : 'Câu hỏi của bà con đã được chuyển tới cán bộ Ủy ban MTTQ xã. Bà con sẽ nhận trả lời qua Zalo trong giờ hành chính.' });
  renderChat(true);
}

/* ---------- Các hội xã hội ---------- */
const socName = id => (SOC_ORGS.find(o => o.id === id) || {}).name || '';
function socBlock() {
  const l = catNews('hoi-xa-hoi');
  return `<section class="g-blk">${gh('Các hội xã hội', '#/mttq/chuyen-muc/hoi-xa-hoi')}
    <div class="g-soc">${SOC_ORGS.map(o => `<a href="#/mttq/chuyen-muc/hoi-xa-hoi" data-act="soc" data-v="${o.id}"><span>${ic(o.icon)}</span>${o.name}</a>`).join('')}</div>
    <div class="g-blk-wide">${nLead(l[0])}<ul class="g-lines">${l.slice(1, 5).map(nLine).join('')}</ul></div></section>`;
}

/* ---------- Dẫn tin Mặt trận Trung ương và tỉnh ---------- */
function feedList(f, n, withDate = true) {
  return `<ul class="g-feed">${f.items.slice(0, n).map(x => `<li><a href="${x.u}" target="_blank" rel="noopener">${esc(x.t)}</a>${withDate && x.d ? ` <time>(${x.d})</time>` : ''}</li>`).join('')}</ul>`;
}
function feedCol(f, n) {
  return `<div class="g-fcol"><div class="g-fsrc"><img src="logo-mttq.png" alt=""><div><b>${f.name}</b><a href="${f.home}" target="_blank" rel="noopener">${f.site} ↗</a></div></div>${feedList(f, n)}</div>`;
}
function feedsBlock(n) {
  return `<section class="g-blk">${gh('Tin Mặt trận Trung ương và tỉnh', '#/mttq/tin-cap-tren')}
    <div class="g-feeds">${feedCol(FEEDS.tw, n)}${feedCol(FEEDS.tinh, n)}</div>
    <p class="g-fnote">${ic('clock', 'sm')} Tự động dẫn tin từ trang nguồn · cập nhật ${FEEDS.updated} · Bấm tiêu đề để đọc bài gốc</p></section>`;
}
function govFeeds() {
  return govLayout(`${crumb([['chuyen-muc/hoat-dong', 'Tin tức – Sự kiện'], [null, 'Tin Mặt trận Trung ương và tỉnh']])}<h1 class="g-pt">Tin Mặt trận Trung ương và tỉnh Nghệ An</h1>
    <p class="g-intro">Trang thông tin của xã tự động dẫn tin mới từ trang của Ủy ban Trung ương MTTQ Việt Nam và Ủy ban MTTQ Việt Nam tỉnh Nghệ An, giúp cán bộ và Nhân dân theo dõi chủ trương, hoạt động của Mặt trận cấp trên ngay tại một nơi.</p>
    <div class="g-feeds">${feedCol(FEEDS.tw, 8)}${feedCol(FEEDS.tinh, 8)}</div>
    <p class="g-fnote">${ic('clock', 'sm')} Cập nhật ${FEEDS.updated} · Bấm tiêu đề để mở bài gốc trên trang nguồn</p>
    <div class="g-howto"><b>Cách hoạt động khi triển khai chính thức</b><ul>
      <li>Máy chủ đọc RSS/trang tin nguồn định kỳ 30 phút/lần, lọc theo chuyên mục: hoạt động Mặt trận, các cuộc vận động, giám sát – phản biện, dân tộc – tôn giáo.</li>
      <li>Chỉ hiển thị tiêu đề, ngày đăng và liên kết về bài gốc; không sao chép nội dung, ghi rõ nguồn.</li>
      <li>Cán bộ quản trị có thể ghim tin quan trọng lên trang chủ hoặc ẩn tin không phù hợp với địa phương.</li></ul></div>`);
}
