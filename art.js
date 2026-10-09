/* Minh họa SVG tự vẽ — không dùng ảnh ngoài, chạy được khi không có mạng */
const ART = (() => {
  const FONT = 'font-family="Be Vietnam Pro,Segoe UI,Arial,sans-serif"';
  const W = (bg, inner) =>
    `<svg viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="240" height="180" fill="${bg}"/>${inner}</svg>`;
  const f1 = n => n.toFixed(1);
  const qb = (a, b, c, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;

  /* Bộ sinh số giả ngẫu nhiên cố định theo chuỗi, để hình vẽ không đổi giữa các lần mở */
  function rng(seed) {
    let h = 2166136261;
    for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; };
  }

  function stalk(x, y, h, lean, c = '#d9a92e') {
    const x1 = x + lean * 0.15, y1 = y - h * 0.6, x2 = x + lean, y2 = y - h;
    let s = `<path d="M${x} ${y} Q${f1(x1)} ${f1(y1)} ${f1(x2)} ${f1(y2)}" stroke="#8fa046" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 8; i++) {
      const t = 0.5 + i * 0.065, px = qb(x, x1, x2, t), py = qb(y, y1, y2, t), side = i % 2 ? 1 : -1;
      const gx = px + side * 3.4;
      s += `<ellipse cx="${f1(gx)}" cy="${f1(py)}" rx="2.6" ry="5.4" fill="${c}" transform="rotate(${Math.round(side * 26 + lean * 0.5)} ${f1(gx)} ${f1(py)})"/>`;
    }
    return s + `<ellipse cx="${f1(x2)}" cy="${f1(y2 - 3)}" rx="2.4" ry="5" fill="${c}" transform="rotate(${Math.round(lean * 0.6)} ${f1(x2)} ${f1(y2 - 3)})"/>`;
  }

  /* Người: chân tại (x, y). opt.hat = nón lá */
  function person(x, y, body, s = 1, opt = {}) {
    const skin = opt.skin || '#efc9a2';
    const hair = opt.hat ? '' : `<path d="M-9.5 -37 Q-10 -48 0 -48 Q10 -48 9.5 -37 Q6 -43 0 -42.5 Q-6 -43 -9.5 -37Z" fill="${opt.hair || '#2b211b'}"/>`;
    const hat = opt.hat ? `<path d="M-18 -39.5 L0 -56 L18 -39.5 Q0 -35.5 -18 -39.5Z" fill="#ecdba3" stroke="#c9b26c" stroke-width="1"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-13 0 Q-14 -24 0 -27 Q14 -24 13 0Z" fill="${body}"/><circle cx="0" cy="-36" r="9" fill="${skin}"/>${hair}${hat}</g>`;
  }

  function spiral(cx, cy, turns, rMax) {
    let d = '';
    for (let i = 0; i <= 140; i++) {
      const t = i / 140, a = t * turns * Math.PI * 2 - Math.PI / 2, r = 2 + t * rMax;
      d += (i ? 'L' : 'M') + f1(cx + r * Math.cos(a)) + ' ' + f1(cy + r * Math.sin(a));
    }
    return d;
  }

  function starPath(cx, cy, r1, r2, n = 5) {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? r2 : r1, a = -Math.PI / 2 + i * Math.PI / n;
      d += (i ? 'L' : 'M') + f1(cx + r * Math.cos(a)) + ' ' + f1(cy + r * Math.sin(a));
    }
    return d + 'Z';
  }

  function bunting(y, sag, colors) {
    let s = `<path d="M0 ${y} Q60 ${y + sag} 120 ${y} Q180 ${y + sag} 240 ${y}" stroke="#7a4b22" stroke-width="1" fill="none"/>`;
    for (let seg = 0; seg < 2; seg++) {
      for (let i = 1; i < 7; i++) {
        const t = i / 7, x = seg * 120 + qb(0, 60, 120, t), yy = qb(y, y + sag, y, t);
        s += `<path d="M${f1(x - 5)} ${f1(yy)} L${f1(x + 5)} ${f1(yy)} L${f1(x)} ${f1(yy + 11)}Z" fill="${colors[(i + seg) % colors.length]}"/>`;
      }
    }
    return s;
  }

  const hills = (c1, c2) =>
    `<path d="M0 128 Q60 106 120 120 T240 112 V180 H0Z" fill="${c1}"/><path d="M0 150 Q80 134 160 148 T240 142 V180 H0Z" fill="${c2}"/>`;

  function riceBag(label, sub, sack, tag, bg) {
    return W(bg, `
      <circle cx="198" cy="38" r="20" fill="#f6c945" opacity=".55"/>
      ${hills('#d7e6b5', '#c3d99a')}
      ${stalk(30, 172, 100, 14)}${stalk(43, 174, 86, 30)}${stalk(208, 174, 96, -16)}${stalk(220, 172, 80, -30)}
      <path d="M78 64 Q120 54 162 64 L173 152 Q120 166 67 152Z" fill="${sack}" stroke="#c4a96e" stroke-width="2"/>
      <path d="M84 66 Q100 44 120 56 Q140 44 156 66" fill="#e6d3a1" stroke="#c4a96e" stroke-width="2"/>
      <rect x="111" y="54" width="18" height="8" rx="2" fill="#b3191f"/>
      <rect x="88" y="92" width="64" height="40" rx="6" fill="${tag}"/>
      <text x="120" y="110" text-anchor="middle" ${FONT} font-size="10.5" font-weight="800" fill="#fff">${label}</text>
      <text x="120" y="124" text-anchor="middle" ${FONT} font-size="7" font-weight="700" fill="#f6d77a" letter-spacing="1">${sub}</text>`);
  }

  function hexes(x0, y0, r, color) {
    const cells = [[0, 0], [1, 0], [0.5, 1], [1.5, 1], [-0.5, 1], [0, 2], [1, 2]];
    return cells.map(([cx, cy]) => {
      const x = x0 + cx * r * 1.75, y = y0 + cy * r * 1.52;
      let d = '';
      for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; d += (i ? 'L' : 'M') + f1(x + r * Math.cos(a)) + ' ' + f1(y + r * Math.sin(a)); }
      return `<path d="${d}Z" fill="${color}" stroke="#e9c25a" stroke-width="1.2"/>`;
    }).join('');
  }

  function candyBar(x, y, rot, seed) {
    const r = rng(seed);
    let nuts = '';
    for (let i = 0; i < 14; i++) {
      const cx = f1(-31 + r() * 62), cy = f1(-9 + r() * 18);
      nuts += `<ellipse cx="${cx}" cy="${cy}" rx="5" ry="3.4" fill="#f0cf8a" transform="rotate(${Math.round(r() * 180)} ${cx} ${cy})" opacity=".95"/>`;
    }
    let ses = '';
    for (let i = 0; i < 22; i++) ses += `<ellipse cx="${f1(-34 + r() * 68)}" cy="${f1(-12 + r() * 24)}" rx="1.4" ry=".8" fill="#fff8e0"/>`;
    return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-38" y="-14" width="76" height="28" rx="5" fill="#c3802f"/><g>${nuts}</g>${ses}<rect x="-38" y="-14" width="76" height="28" rx="5" fill="none" stroke="#a8691f" stroke-width="1.5"/></g>`;
  }

  const A = {
    rice: () => riceBag('GẠO THƠM', 'BÀU CANH', '#efe2c0', '#2d6a35', '#eef3df'),
    rice2: () => riceBag('NẾP CÁI', 'HOA VÀNG', '#f6f0e2', '#a8741a', '#f6efe0'),

    snail: () => W('#e2eedf', `
      <ellipse cx="192" cy="40" rx="34" ry="11" fill="#d1e5ce"/>
      <path d="M0 132 Q120 118 240 132 V180 H0Z" fill="#a9cfa5"/>
      <ellipse cx="200" cy="156" rx="28" ry="6" fill="#8fbf8a" opacity=".7"/>
      <path d="M40 142 Q42 120 78 121 L182 128 Q200 132 196 144 Q120 154 42 148Z" fill="#7b6a50"/>
      <path d="M54 124 L42 98 M66 122 L61 95" stroke="#7b6a50" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="42" cy="97" r="4" fill="#3a2f22"/><circle cx="61" cy="94" r="4" fill="#3a2f22"/>
      <circle cx="134" cy="92" r="45" fill="#2e2620"/>
      <path d="${spiral(134, 92, 3.1, 40)}" stroke="#6d5948" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="114" cy="68" rx="13" ry="6" fill="#fff" opacity=".13" transform="rotate(-35 114 68)"/>`),

    chicken: () => W('#e9f1dc', `
      <circle cx="40" cy="36" r="16" fill="#f6c945" opacity=".5"/>
      ${hills('#c4dc98', '#a7cb78')}
      <path d="M150 84 Q172 38 192 60 Q182 70 188 96 Q170 88 158 106Z" fill="#33251a"/>
      <path d="M156 88 Q176 52 186 64 Q178 74 182 92Z" fill="#2d5a3a" opacity=".55"/>
      <ellipse cx="128" cy="110" rx="44" ry="32" fill="#b5541c"/>
      <path d="M110 104 Q134 92 154 108 Q136 126 110 118Z" fill="#8c3d12"/>
      <path d="M92 106 Q84 78 96 66 Q110 60 114 76 Q116 94 108 108Z" fill="#c9661f"/>
      <circle cx="100" cy="66" r="13" fill="#c9661f"/>
      <path d="M91 56 q3 -9 7 -2 q3 -9 7 -1 q4 -7 7 2 q-6 4 -21 1Z" fill="#d32f2f"/>
      <ellipse cx="90" cy="79" rx="4" ry="6" fill="#d32f2f"/>
      <path d="M88 65 L77 69 L88 72Z" fill="#f2b234"/>
      <circle cx="97" cy="63" r="2" fill="#1d1d1d"/>
      <path d="M120 140 v14 m-6 0 h12 M138 140 v14 m-6 0 h12" stroke="#e0a030" stroke-width="3" stroke-linecap="round"/>`),

    eggs: () => W('#f6eedf', `
      <circle cx="200" cy="36" r="18" fill="#f6c945" opacity=".45"/>
      <ellipse cx="120" cy="138" rx="92" ry="24" fill="#b9864a"/>
      <ellipse cx="94" cy="108" rx="20" ry="26" fill="#f1dfc2"/>
      <ellipse cx="128" cy="102" rx="20" ry="27" fill="#e8cfa9"/>
      <ellipse cx="160" cy="114" rx="18" ry="24" fill="#f5e8d3"/>
      <ellipse cx="114" cy="126" rx="19" ry="24" fill="#eed8b6"/>
      <ellipse cx="144" cy="128" rx="18" ry="23" fill="#f3e2c6"/>
      <ellipse cx="88" cy="98" rx="5" ry="8" fill="#fff" opacity=".5"/><ellipse cx="122" cy="92" rx="5" ry="8" fill="#fff" opacity=".45"/>
      <path d="M28 132 Q120 176 212 132 Q208 166 120 170 Q32 166 28 132Z" fill="#9c6a33"/>
      <path d="M36 142 Q80 160 130 156 M58 156 Q120 168 200 146 M44 150 Q100 170 186 160" stroke="#7d5226" stroke-width="2" fill="none"/>`),

    orange: () => {
      let seg = '';
      for (let i = 0; i < 9; i++) { const a = i * Math.PI * 2 / 9; seg += `<line x1="0" y1="0" x2="${f1(Math.cos(a) * 22)}" y2="${f1(Math.sin(a) * 22)}" stroke="#f2a43a" stroke-width="1.6"/>`; }
      return W('#fdf0da', `
      <path d="M0 140 Q120 126 240 140 V180 H0Z" fill="#f3dcb4"/>
      <circle cx="92" cy="100" r="40" fill="#ee8519"/>
      <circle cx="150" cy="114" r="34" fill="#f59a26"/>
      <circle cx="78" cy="84" r="10" fill="#fff" opacity=".2"/><circle cx="140" cy="100" r="8" fill="#fff" opacity=".2"/>
      <path d="M92 61 q2 -8 6 -12" stroke="#6b4a1f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M97 52 Q118 34 140 44 Q120 62 97 52Z" fill="#3f8a3a"/>
      <path d="M97 52 Q116 46 140 44" stroke="#2c6a2a" stroke-width="1.2" fill="none"/>
      <path d="M95 54 Q78 36 60 44 Q76 60 95 54Z" fill="#4e9b3f"/>
      <g transform="translate(190 142)"><circle r="27" fill="#f2a43a"/><circle r="23" fill="#fcd27c"/>${seg}<circle r="3" fill="#fff3d0"/></g>`);
    },

    honey: () => W('#fbf0d2', `
      ${hexes(18, 20, 11, '#f7dc8c')}
      <ellipse cx="120" cy="158" rx="62" ry="8" fill="#e9d6a6"/>
      <rect x="80" y="64" width="80" height="94" rx="18" fill="#e49b12"/>
      <rect x="80" y="64" width="80" height="94" rx="18" fill="none" stroke="#c07f05" stroke-width="2"/>
      <rect x="88" y="78" width="9" height="66" rx="4.5" fill="#fff" opacity=".22"/>
      <rect x="84" y="50" width="72" height="18" rx="5" fill="#7a4b22"/>
      <path d="M80 66 Q120 74 160 66 L160 74 Q120 82 80 74Z" fill="#b8771b"/>
      <rect x="96" y="100" width="48" height="30" rx="4" fill="#fff8e6"/>
      <text x="120" y="114" text-anchor="middle" ${FONT} font-size="8.5" font-weight="800" fill="#7a4b22">MẬT ONG</text>
      <text x="120" y="124" text-anchor="middle" ${FONT} font-size="6.5" font-weight="600" fill="#a0702a">HOA RỪNG</text>
      <path d="M156 92 Q172 72 180 66" stroke="#b08a3a" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>
      <g transform="translate(190 58) rotate(-15)">
        <ellipse cx="-2" cy="-13" rx="8" ry="5" fill="#fff" opacity=".85" transform="rotate(-20 -2 -13)"/>
        <ellipse cx="6" cy="-12" rx="6" ry="4" fill="#fff" opacity=".7" transform="rotate(20 6 -12)"/>
        <ellipse rx="13" ry="9" fill="#f2b632"/>
        <path d="M-4 -8.5 v17 M3 -8.8 v17.6" stroke="#2b211b" stroke-width="3.2"/>
        <circle cx="12" cy="-1" r="5" fill="#2b211b"/>
      </g>`),

    tea: () => {
      let rows = '';
      for (let i = 0; i < 7; i++) rows += `<path d="M-10 ${82 + i * 14} Q60 ${70 + i * 14} 120 ${80 + i * 14} T250 ${72 + i * 14}" stroke="#9cc47a" stroke-width="7" fill="none" stroke-linecap="round" opacity=".75"/>`;
      return W('#e6f1dc', `
      <path d="M0 72 Q60 58 120 68 T240 62 V180 H0Z" fill="#cfe4b8"/>${rows}
      <ellipse cx="130" cy="152" rx="56" ry="10" fill="#f6f3ea"/>
      <path d="M86 104 h88 q-4 46 -44 46 q-40 0 -44 -46Z" fill="#fff" stroke="#e1dccd" stroke-width="1.5"/>
      <ellipse cx="130" cy="104" rx="44" ry="8" fill="#b9cf6a"/>
      <path d="M173 112 q20 -2 17 14 q-3 12 -21 10" stroke="#fff" stroke-width="6" fill="none"/>
      <path d="M114 92 q-6 -10 0 -18 q6 -8 0 -16 M142 90 q-6 -10 0 -18 q6 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>
      <g transform="translate(46 132) rotate(-12)">
        <path d="M0 0 Q-28 -16 -34 -36 Q-6 -30 0 0Z" fill="#5aa040"/>
        <path d="M0 0 Q24 -14 34 -32 Q8 -30 0 0Z" fill="#4c9a35"/>
        <path d="M0 0 Q-3 -36 9 -54 Q16 -28 0 0Z" fill="#3f8a3a"/>
        <path d="M0 0 v16" stroke="#4c7a2a" stroke-width="2.5"/>
      </g>`);
    },

    herb: () => W('#edf1e1', `
      <ellipse cx="40" cy="54" rx="14" ry="7" fill="#7aa046" transform="rotate(-30 40 54)"/>
      <ellipse cx="58" cy="40" rx="12" ry="6" fill="#6a8f3a" transform="rotate(20 58 40)"/>
      <ellipse cx="34" cy="150" rx="15" ry="7" fill="#7aa046" transform="rotate(25 34 150)"/>
      <ellipse cx="206" cy="46" rx="13" ry="6" fill="#6a8f3a" transform="rotate(-20 206 46)"/>
      <path d="M20 66 Q50 40 90 30 M16 140 Q40 160 70 150" stroke="#557a2e" stroke-width="1.5" fill="none"/>
      <ellipse cx="124" cy="152" rx="70" ry="8" fill="#d9dfc6"/>
      <path d="M70 70 L150 70 L170 58 L90 58Z" fill="#7b8f45"/>
      <rect x="70" y="70" width="80" height="80" fill="#556b2f"/>
      <path d="M150 70 L170 58 L170 138 L150 150Z" fill="#435626"/>
      <rect x="80" y="90" width="60" height="38" rx="3" fill="#f4efd9"/>
      <text x="110" y="106" text-anchor="middle" ${FONT} font-size="10" font-weight="800" fill="#435626">CAO</text>
      <text x="110" y="119" text-anchor="middle" ${FONT} font-size="7.5" font-weight="700" fill="#435626">CHÈ VẰNG</text>
      <rect x="176" y="128" width="26" height="18" rx="3" fill="#2a1c10"/><rect x="196" y="142" width="24" height="16" rx="3" fill="#3a2716"/>
      <rect x="180" y="131" width="10" height="3" rx="1.5" fill="#fff" opacity=".18"/>`),

    jar: () => W('#f3e6d2', `
      <path d="M0 146 H240 V180 H0Z" fill="#e6d2b4"/>
      <ellipse cx="112" cy="152" rx="62" ry="9" fill="#cdb592"/>
      <path d="M84 62 h56 q4 10 -2 16 q34 20 32 54 q-2 22 -58 22 q-56 0 -58 -22 q-2 -34 32 -54 q-6 -6 -2 -16Z" fill="#76461f"/>
      <ellipse cx="112" cy="62" rx="30" ry="6" fill="#5a3314"/>
      <path d="M76 58 Q112 30 148 58 Q112 66 76 58Z" fill="#8c5627"/>
      <circle cx="112" cy="40" r="5" fill="#6c3f1a"/>
      <path d="M70 110 Q74 92 92 84" stroke="#fff" stroke-width="5" opacity=".14" fill="none" stroke-linecap="round"/>
      <path d="M58 114 Q112 126 166 114" stroke="#5a3314" stroke-width="3" fill="none"/>
      <g transform="translate(178 84)"><rect x="0" y="22" width="34" height="64" rx="7" fill="#8a4f1c"/><rect x="10" y="5" width="14" height="20" rx="3" fill="#8a4f1c"/><rect x="8" y="0" width="18" height="7" rx="2" fill="#b3191f"/><rect x="4" y="44" width="26" height="24" rx="3" fill="#fff6e0"/><text x="17" y="59" text-anchor="middle" ${FONT} font-size="6.5" font-weight="800" fill="#7a4b22">TƯƠNG</text></g>`),

    gio: () => {
      const r = rng('gio');
      let dots = '';
      for (let i = 0; i < 26; i++) {
        const a = r() * Math.PI * 2, d = Math.sqrt(r());
        dots += `<circle cx="${f1(Math.cos(a) * d * 16)}" cy="${f1(Math.sin(a) * d * 20)}" r="${f1(0.8 + r() * 1.6)}" fill="${i % 3 ? '#f7ece4' : '#5a4a42'}"/>`;
      }
      return W('#f6efe3', `
      <ellipse cx="120" cy="140" rx="104" ry="27" fill="#fff" stroke="#e8dfcd" stroke-width="2"/>
      <ellipse cx="120" cy="140" rx="86" ry="20" fill="none" stroke="#efe6d4" stroke-width="1.5"/>
      <ellipse cx="38" cy="122" rx="14" ry="7" fill="#5e9a3c" transform="rotate(-25 38 122)"/>
      <ellipse cx="30" cy="140" rx="13" ry="6" fill="#4f8a32" transform="rotate(15 30 140)"/>
      <rect x="48" y="88" width="108" height="50" rx="25" fill="#4f7d32"/>
      <path d="M62 95 Q100 102 148 95 M58 113 Q100 120 154 113 M62 131 Q100 136 148 131" stroke="#3d6526" stroke-width="1.5" fill="none"/>
      <path d="M72 88 v50 M100 88 v50 M128 88 v50" stroke="#efe2c0" stroke-width="2.5"/>
      <g transform="translate(200 112)"><ellipse rx="20" ry="25" fill="#d9b8a6"/><ellipse rx="17" ry="22" fill="#ead3c6"/></g>
      <g transform="translate(178 122)"><ellipse rx="21" ry="27" fill="#d1ad99"/><ellipse rx="18" ry="23.5" fill="#e6c9b9"/>${dots}</g>`);
    },

    candy: () => W('#f7ecd9', `
      <rect x="24" y="112" width="192" height="50" rx="10" fill="#e3c99a"/>
      <rect x="24" y="112" width="192" height="8" rx="4" fill="#ecd7ae"/>
      ${candyBar(92, 98, -8, 'a')}${candyBar(152, 92, 10, 'b')}${candyBar(120, 134, -2, 'c')}
      <circle cx="200" cy="40" r="16" fill="#f6c945" opacity=".45"/>`),

    temple: () => W('#fbe8cd', `
      <circle cx="192" cy="44" r="20" fill="#f6b73c" opacity=".75"/>
      <path d="M0 104 Q50 66 100 94 Q150 60 240 90 V180 H0Z" fill="#c8d8a2"/>
      <path d="M0 130 H240 V180 H0Z" fill="#dfe7c4"/>
      <ellipse cx="120" cy="164" rx="112" ry="14" fill="#9cc6d3"/>
      <path d="M40 160 q10 -3 20 0 M150 166 q12 -3 24 0" stroke="#fff" stroke-width="1.5" opacity=".7" fill="none"/>
      <rect x="40" y="114" width="4" height="18" fill="#6b4a1f"/><circle cx="36" cy="110" r="18" fill="#5f8f3a"/><circle cx="52" cy="102" r="14" fill="#6fa044"/>
      <rect x="198" y="114" width="4" height="18" fill="#6b4a1f"/><circle cx="204" cy="108" r="17" fill="#5f8f3a"/><circle cx="190" cy="102" r="13" fill="#6fa044"/>
      <rect x="72" y="120" width="96" height="10" fill="#cdb48a"/>
      <rect x="80" y="98" width="80" height="24" fill="#efdcb2"/>
      <rect x="84" y="98" width="5" height="24" fill="#a3402c"/><rect x="104" y="98" width="5" height="24" fill="#a3402c"/><rect x="131" y="98" width="5" height="24" fill="#a3402c"/><rect x="151" y="98" width="5" height="24" fill="#a3402c"/>
      <rect x="111" y="104" width="18" height="18" fill="#8e2a1e"/><rect x="91" y="106" width="10" height="16" fill="#8e2a1e"/><rect x="139" y="106" width="10" height="16" fill="#8e2a1e"/>
      <path d="M64 100 Q68 94 62 88 Q92 94 120 80 Q148 94 178 88 Q172 94 176 100Z" fill="#6e3524"/>
      <path d="M88 82 Q90 77 86 72 Q104 76 120 66 Q136 76 154 72 Q150 77 152 82Z" fill="#7d3b28"/>
      <circle cx="120" cy="64" r="3" fill="#e3a700"/>
      <path d="M68 122 v-26 M172 122 v-26" stroke="#7a4b22" stroke-width="1.5"/>
      <path d="M68 96 l11 3.5 -11 3.5Z M172 96 l11 3.5 -11 3.5Z" fill="#d6261e"/>`),

    /* ===== Minh họa tin bài ===== */
    festival: () => {
      let crowd = '';
      const cols = ['#b3191f', '#1d5fa8', '#2d6a35', '#e3a700', '#7a4b22', '#d6457a'];
      for (let i = 0; i < 10; i++) crowd += person(14 + i * 24, 182, cols[i % cols.length], 0.95 + (i % 3) * 0.05, { hat: i % 3 === 1 });
      return W('#fbefe0', `
      ${bunting(18, 16, ['#d6261e', '#f2b632'])}
      <path d="M0 132 H240 V180 H0Z" fill="#e9dcc3"/>
      <rect x="40" y="48" width="160" height="60" fill="#b3191f"/>
      <rect x="40" y="48" width="160" height="7" fill="#8f1117"/>
      <path d="${starPath(120, 69, 8, 3.3)}" fill="#f6c945"/>
      <text x="120" y="91" text-anchor="middle" ${FONT} font-size="9.5" font-weight="800" fill="#ffe08a">NGÀY HỘI ĐẠI ĐOÀN KẾT</text>
      <text x="120" y="102" text-anchor="middle" ${FONT} font-size="6.5" font-weight="600" fill="#fff">TOÀN DÂN TỘC · XÃ BÌNH MINH</text>
      <rect x="34" y="108" width="172" height="10" fill="#7a4b22"/>
      ${crowd}`);
    },

    house: () => W('#eaf2f6', `
      <circle cx="202" cy="38" r="18" fill="#f6c945" opacity=".6"/>
      ${hills('#d4e6b8', '#bfd99c')}
      <rect x="64" y="84" width="112" height="62" fill="#f4ead6"/>
      <path d="M52 90 L120 48 L188 90Z" fill="#c2412d"/>
      <path d="M70 80 L170 80 M86 70 L154 70 M102 60 L138 60" stroke="#a3321f" stroke-width="1.5"/>
      <rect x="78" y="88" width="84" height="12" rx="2" fill="#b3191f"/>
      <text x="120" y="96.5" text-anchor="middle" ${FONT} font-size="6.3" font-weight="800" fill="#ffe08a">NHÀ ĐẠI ĐOÀN KẾT</text>
      <rect x="110" y="110" width="22" height="36" fill="#7a4b22"/>
      <rect x="76" y="106" width="22" height="18" fill="#9ccbe0" stroke="#7a4b22" stroke-width="2"/>
      <rect x="144" y="106" width="22" height="18" fill="#9ccbe0" stroke="#7a4b22" stroke-width="2"/>
      ${person(32, 168, '#1d5fa8', 0.95)}${person(204, 170, '#b3191f', 0.95)}${person(222, 170, '#e3a700', 0.72)}`),

    phone: () => W('#e9f3e4', `
      <circle cx="44" cy="44" r="62" fill="#d8ebcf"/>
      <rect x="88" y="22" width="68" height="136" rx="12" fill="#1f2328"/>
      <rect x="93" y="32" width="58" height="114" rx="4" fill="#fff"/>
      <rect x="93" y="32" width="58" height="14" fill="#2d6a35"/>
      <rect x="98" y="52" width="48" height="34" rx="3" fill="#f2e3bf"/>
      <path d="M110 80 L122 60 L134 80Z" fill="#e3c25a"/><circle cx="136" cy="62" r="5" fill="#f6b73c"/>
      <rect x="100" y="55" width="17" height="8" rx="2" fill="#e5322d"/>
      <text x="108.5" y="61.3" text-anchor="middle" ${FONT} font-size="5.2" font-weight="800" fill="#fff">LIVE</text>
      <rect x="98" y="92" width="40" height="5" rx="2" fill="#d9d4c8"/><rect x="98" y="101" width="26" height="6" rx="2" fill="#b3191f"/>
      <rect x="98" y="112" width="44" height="4" rx="2" fill="#ebe7de"/><rect x="98" y="119" width="34" height="4" rx="2" fill="#ebe7de"/>
      <rect x="98" y="129" width="48" height="11" rx="5.5" fill="#2d6a35"/>
      <path d="M172 64 c-4 -6 -12 -2 -8 5 l8 7 8 -7 c4 -7 -4 -11 -8 -5z" fill="#e5322d" opacity=".85"/>
      <path d="M186 44 c-3 -4 -8 -1 -5.5 3.5 l5.5 4.5 5.5 -4.5 c2.5 -4.5 -2.5 -7.5 -5.5 -3.5z" fill="#e5322d" opacity=".6"/>
      ${person(50, 172, '#7a8f45', 1.25, { hat: true })}${person(198, 172, '#c2412d', 1.2)}`),

    learn: () => W('#eef1f8', `
      <rect x="160" y="30" width="58" height="28" rx="9" fill="#fff"/>
      <path d="M172 58 l-6 8 12 -8Z" fill="#fff"/>
      <path d="M178 44 l5 5 10 -10" stroke="#2d6a35" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      ${person(56, 156, '#6c7a89', 1.35, { hair: '#e6e6e6' })}${person(190, 156, '#1f8a4c', 1.35)}
      <rect x="0" y="122" width="240" height="58" fill="#c79a66"/>
      <rect x="0" y="122" width="240" height="6" fill="#d8ad7a"/>
      <rect x="86" y="72" width="68" height="46" rx="3" fill="#1f2328"/>
      <rect x="90" y="76" width="60" height="38" fill="#dbe8fb"/>
      <rect x="95" y="82" width="34" height="5" rx="2" fill="#1d5fa8"/>
      <rect x="95" y="91" width="50" height="4" rx="2" fill="#b7c9e6"/><rect x="95" y="98" width="42" height="4" rx="2" fill="#b7c9e6"/>
      <rect x="95" y="105" width="22" height="6" rx="3" fill="#2d6a35"/>
      <path d="M78 118 H162 L168 124 H72Z" fill="#9aa3ad"/>`),

    market: () => {
      let aw = '';
      for (let i = 0; i < 8; i++) aw += `<rect x="${40 + i * 20}" y="36" width="20" height="24" fill="${i % 2 ? '#fff6ea' : '#c2412d'}"/><circle cx="${50 + i * 20}" cy="60" r="10" fill="${i % 2 ? '#fff6ea' : '#c2412d'}"/>`;
      return W('#fdf2e4', `
      ${aw}
      <rect x="44" y="64" width="4" height="70" fill="#7a4b22"/><rect x="192" y="64" width="4" height="70" fill="#7a4b22"/>
      ${person(150, 122, '#d6457a', 1.15)}
      <rect x="40" y="108" width="160" height="44" fill="#b07a45"/>
      <rect x="40" y="108" width="160" height="6" fill="#c8915a"/>
      <path d="M64 108 q-2 -16 8 -18 h8 q10 2 8 18Z" fill="#7a461f"/><rect x="66" y="86" width="20" height="5" rx="2" fill="#5a3314"/>
      <rect x="96" y="96" width="22" height="12" rx="2" fill="#e8b84a"/>
      <rect x="76" y="122" width="88" height="16" rx="2" fill="#fff6e0"/>
      <text x="120" y="133" text-anchor="middle" ${FONT} font-size="6.4" font-weight="800" fill="#7a4b22">SẢN PHẨM CỦA HỘI VIÊN</text>
      <path d="M0 152 H240 V180 H0Z" fill="#e8d6bc"/>`);
    },

    road: () => W('#eaf2f6', `
      <path d="M0 92 H240 V180 H0Z" fill="#bcd69a"/>
      <circle cx="30" cy="84" r="10" fill="#6fa044"/><circle cx="58" cy="86" r="8" fill="#5f8f3a"/><circle cx="190" cy="84" r="10" fill="#6fa044"/><circle cx="214" cy="86" r="8" fill="#5f8f3a"/>
      <path d="M0 120 L80 100 M0 140 L84 108 M0 164 L90 116 M240 120 L160 100 M240 140 L156 108 M240 164 L150 116" stroke="#a3c47e" stroke-width="2"/>
      <path d="M110 92 H130 L204 180 H36Z" fill="#9aa0a6"/>
      <path d="M120 96 V180" stroke="#fff" stroke-width="2.4" stroke-dasharray="9 9"/>
      <path d="M170 150 l6 -16 6 16Z M184 168 l6 -16 6 16Z" fill="#f08a1c"/>
      ${person(46, 166, '#5f6b3a', 1.15)}${person(72, 170, '#5f6b3a', 1.05)}`),

    meeting: () => {
      let aud = '';
      for (let i = 0; i < 9; i++) aud += `<path d="M${10 + i * 28} 180 q0 -16 14 -16 q14 0 14 16Z" fill="${i % 2 ? '#3b4656' : '#55606e'}"/><circle cx="${24 + i * 28}" cy="158" r="8" fill="#2b211b"/>`;
      return W('#f4efe6', `
      <rect x="28" y="16" width="184" height="32" fill="#b3191f"/>
      <text x="120" y="29" text-anchor="middle" ${FONT} font-size="7.5" font-weight="800" fill="#ffe08a">HỘI NGHỊ ĐỐI THOẠI</text>
      <text x="120" y="41" text-anchor="middle" ${FONT} font-size="5.6" font-weight="600" fill="#fff">GIỮA NGƯỜI ĐỨNG ĐẦU CẤP ỦY, CHÍNH QUYỀN VỚI NHÂN DÂN</text>
      ${person(70, 116, '#344054', 0.9)}${person(102, 116, '#344054', 0.9)}${person(138, 116, '#b3191f', 0.9)}${person(170, 116, '#344054', 0.9)}
      <rect x="40" y="104" width="160" height="28" fill="#7a4b22"/>
      <rect x="40" y="104" width="160" height="8" fill="#ece3d1"/>
      <circle cx="120" cy="100" r="5" fill="#e5322d"/><circle cx="114" cy="102" r="4" fill="#f2b632"/><circle cx="126" cy="102" r="4" fill="#f2b632"/>
      ${aud}`);
    },

    fund: () => W('#fdecec', `
      <circle cx="120" cy="84" r="62" fill="#fbd9d9"/>
      <path d="M120 120 C80 96 76 64 98 56 C110 52 118 60 120 66 C122 60 130 52 142 56 C164 64 160 96 120 120Z" fill="#c8202a"/>
      <path d="M100 66 q4 -6 10 -4" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>
      <path d="M44 146 Q66 112 104 122 Q113 126 108 133 Q88 133 80 150Z" fill="#efc9a2"/>
      <path d="M196 146 Q174 112 136 122 Q127 126 132 133 Q152 133 160 150Z" fill="#e5b98e"/>
      <path d="M30 150 L80 150 L76 180 L20 180Z" fill="#1d5fa8"/>
      <path d="M210 150 L160 150 L164 180 L220 180Z" fill="#2d6a35"/>
      <circle cx="40" cy="40" r="9" fill="#f2b632"/><circle cx="200" cy="34" r="7" fill="#f2b632"/><circle cx="210" cy="56" r="5" fill="#f2b632"/>`),

    field: () => {
      let rows = '';
      for (let i = 0; i < 7; i++) rows += `<path d="M0 ${114 + i * 10} Q120 ${104 + i * 10} 240 ${114 + i * 10}" stroke="#c9a33e" stroke-width="2" fill="none"/>`;
      return W('#fbe7c6', `
      <circle cx="172" cy="70" r="26" fill="#f6b73c"/><circle cx="172" cy="70" r="38" fill="#f6b73c" opacity=".2"/>
      <path d="M0 92 Q60 70 120 86 T240 80 V180 H0Z" fill="#bfd38c"/>
      <path d="M0 106 Q120 96 240 106 V180 H0Z" fill="#e3c25a"/>${rows}
      ${person(72, 150, '#5a7d9a', 1, { hat: true })}${person(100, 154, '#8a5a3a', 1, { hat: true })}
      ${stalk(16, 182, 58, 8)}${stalk(226, 182, 62, -10)}${stalk(208, 184, 50, -4)}`);
    },

    gift: () => {
      let fl = '';
      [[36, 40], [58, 30], [80, 46], [48, 62], [100, 30], [196, 120], [212, 100]].forEach(([x, y]) => {
        fl += `<circle cx="${x}" cy="${y}" r="6" fill="#f4a3b4"/><circle cx="${x}" cy="${y}" r="2" fill="#d6457a"/>`;
      });
      return W('#fdeee6', `
      <path d="M0 50 Q40 40 70 46 Q96 34 120 22 M52 46 Q48 60 50 66 M220 140 Q206 110 214 92" stroke="#6b4a1f" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${fl}
      <ellipse cx="120" cy="150" rx="70" ry="8" fill="#ecd3c7"/>
      <rect x="84" y="88" width="72" height="60" fill="#c8202a"/>
      <rect x="78" y="76" width="84" height="16" fill="#a3141c"/>
      <rect x="114" y="76" width="12" height="72" fill="#f2b632"/>
      <path d="M120 76 Q100 56 92 66 Q96 78 120 76 Q144 78 148 66 Q140 56 120 76Z" fill="#f2b632"/>
      <rect x="164" y="118" width="22" height="30" rx="2" fill="#d6261e"/><path d="M168 126 h14" stroke="#f2b632" stroke-width="2"/>`);
    },

    deedRoad: () => W('#eef3e6', `
      <path d="M0 96 H240 V180 H0Z" fill="#c5dca4"/>
      <path d="M100 96 H140 L230 180 H10Z" fill="#b5b9bd"/>
      <path d="M120 100 V180" stroke="#fff" stroke-width="2" stroke-dasharray="8 8"/>
      <path d="M40 110 h40 v4 h-40Z M48 104 h4 v10 h-4Z M72 104 h4 v10 h-4Z" fill="#a3402c"/>
      ${person(176, 164, '#5a6b7a', 1.35, { hair: '#e6e6e6' })}`),

    deedShop: () => W('#fbf0e0', `
      ${candyBar(70, 128, -6, 'd')}${candyBar(78, 154, 4, 'e')}
      ${person(170, 172, '#d6457a', 1.45)}
      <rect x="30" y="34" width="70" height="40" rx="6" fill="#fff"/>
      <text x="65" y="52" text-anchor="middle" ${FONT} font-size="9" font-weight="800" fill="#2d6a35">OCOP</text>
      <text x="65" y="64" text-anchor="middle" ${FONT} font-size="6.5" font-weight="600" fill="#7a5600">Bình Minh</text>`),

    deedLearn: () => W('#eaf0fa', `
      ${person(80, 172, '#6c7a89', 1.35, { hair: '#e6e6e6' })}${person(164, 172, '#1f8a4c', 1.4)}
      <rect x="126" y="96" width="24" height="40" rx="4" fill="#1f2328" transform="rotate(-12 138 116)"/>
      <rect x="129" y="100" width="18" height="30" rx="2" fill="#dbe8fb" transform="rotate(-12 138 116)"/>
      <rect x="22" y="24" width="60" height="26" rx="8" fill="#fff"/>
      <text x="52" y="41" text-anchor="middle" ${FONT} font-size="8" font-weight="800" fill="#1d5fa8">Học số</text>`),
  };

  /* Cảnh bình minh trên cánh đồng — dùng ở trang tổng quan và Chợ */
  A.hero = () => {
    let rows = '';
    for (let i = 0; i < 6; i++) rows += `<path d="M0 ${252 + i * 12} Q300 ${236 + i * 12} 600 ${250 + i * 12}" stroke="#bf9a3a" stroke-width="2" fill="none" opacity=".7"/>`;
    let birds = '';
    [[150, 70], [172, 60], [190, 78], [480, 56], [500, 66]].forEach(([x, y]) => { birds += `<path d="M${x - 7} ${y} q4 -5 7 0 q3 -5 7 0" stroke="#7a5a3a" stroke-width="1.6" fill="none"/>`; });
    return `<svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde2ad"/><stop offset="1" stop-color="#fdf4e1"/></linearGradient></defs>
      <rect width="600" height="340" fill="url(#skyg)"/>
      <circle cx="380" cy="186" r="120" fill="#f9c867" opacity=".22"/><circle cx="380" cy="186" r="70" fill="#f7bb4a"/>
      ${birds}
      <path d="M0 196 Q90 136 180 172 Q260 124 340 164 Q430 116 520 152 Q570 138 600 146 V340 H0Z" fill="#b5cd8b"/>
      <path d="M0 220 Q150 190 300 210 T600 200 V340 H0Z" fill="#98bb66"/>
      <g fill="#f4ead6"><rect x="120" y="196" width="26" height="16"/><rect x="160" y="200" width="22" height="13"/></g>
      <g fill="#b64a33"><path d="M116 198 L133 186 L150 198Z"/><path d="M157 202 L171 192 L185 202Z"/></g>
      <path d="M436 206 Q440 200 434 196 Q452 198 466 188 Q480 198 498 196 Q492 200 496 206Z" fill="#6e3524"/><rect x="444" y="205" width="44" height="10" fill="#e9d6ad"/>
      <path d="M0 240 Q300 222 600 238 V340 H0Z" fill="#e2c35d"/>${rows}
      <path d="M0 300 Q300 284 600 298 V340 H0Z" fill="#cfa947"/>
      ${person(250, 262, '#5a7d9a', 1.15, { hat: true })}${person(282, 266, '#8a5a3a', 1.1, { hat: true })}
    </svg>`;
  };

  A.emblem = () => `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="32" cy="32" r="31" fill="#f6c343"/><circle cx="32" cy="32" r="26.5" fill="#c01c22"/>
    <circle cx="32" cy="32" r="23" fill="none" stroke="#ffe3a0" stroke-width="1" stroke-dasharray="2 2.4"/>
    <path d="${starPath(32, 33, 15, 6.2)}" fill="#f6c343"/></svg>`;

  A.mkLogo = () => {
    let rays = '';
    for (let i = 0; i < 7; i++) { const a = Math.PI + (i + 0.5) * Math.PI / 7; rays += `<line x1="${f1(24 + Math.cos(a) * 15)}" y1="${f1(29 + Math.sin(a) * 15)}" x2="${f1(24 + Math.cos(a) * 19)}" y2="${f1(29 + Math.sin(a) * 19)}"/>`; }
    return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#2d6a35"/>
      <g stroke="#f2b632" stroke-width="2" stroke-linecap="round">${rays}</g>
      <path d="M12 29 A12 12 0 0 1 36 29Z" fill="#f2b632"/>
      <path d="M6 32 Q24 26 42 32" stroke="#a7d47e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M9 37.5 Q24 32 39 37.5" stroke="#c6e6a2" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M13 42.5 Q24 38.5 35 42.5" stroke="#e0f2c8" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>`;
  };

  /* Họa tiết trống đồng mờ trên đầu trang Cổng MTTQ */
  A.drum = () => {
    let rays = '', ticks = '', birds = '';
    for (let i = 0; i < 14; i++) {
      const a = i * Math.PI * 2 / 14;
      rays += `<path d="M0 0 L${f1(Math.cos(a - 0.1) * 30)} ${f1(Math.sin(a - 0.1) * 30)} L${f1(Math.cos(a) * 58)} ${f1(Math.sin(a) * 58)} L${f1(Math.cos(a + 0.1) * 30)} ${f1(Math.sin(a + 0.1) * 30)}Z"/>`;
    }
    for (let i = 0; i < 72; i++) {
      const a = i * Math.PI * 2 / 72;
      ticks += `<line x1="${f1(Math.cos(a) * 112)}" y1="${f1(Math.sin(a) * 112)}" x2="${f1(Math.cos(a) * 124)}" y2="${f1(Math.sin(a) * 124)}"/>`;
    }
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI * 2 / 12, x = Math.cos(a) * 150, y = Math.sin(a) * 150, d = a * 180 / Math.PI + 90;
      birds += `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(d)})" d="M-14 4 Q0 -8 14 4 Q4 0 0 6 Q-4 0 -14 4Z"/>`;
    }
    return `<svg viewBox="-180 -180 360 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="#fff">${rays}${birds}</g>
      <g fill="none" stroke="#fff" stroke-width="2.2"><circle r="66"/><circle r="76"/><circle r="100"/><circle r="106"/><circle r="130"/><circle r="136"/><circle r="168"/><circle r="174"/>${ticks}</g></svg>`;
  };

  /* Mã QR minh họa (không quét được) — bản thật sinh mã theo từng lô sản phẩm */
  A.qr = (seed = 'binhminh', size = 150) => {
    const r = rng(seed), N = 29;
    const inF = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    let cells = '';
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inF(x, y) && r() > 0.52) cells += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
    const fd = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
    return `<svg viewBox="-2 -2 ${N + 4} ${N + 4}" width="${size}" height="${size}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" aria-label="Mã QR minh họa"><rect x="-2" y="-2" width="${N + 4}" height="${N + 4}" fill="#fff"/><g fill="#1c2024">${cells}${fd(0, 0)}${fd(N - 7, 0)}${fd(0, N - 7)}</g></svg>`;
  };

  return A;
})();
