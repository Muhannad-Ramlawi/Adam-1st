/* =========================================================
   ✏️  EDIT YOUR PARTY DETAILS HERE
   ========================================================= */
const INVITE = {
  dateTime: "2026-12-18T13:00:00+02:00",   // party start (Cairo time) – drives the countdown
  durationHours: 3,                         // length of the calendar event
  countdownFrom: "2026-11-07T15:00:00+02:00", // when the invitation went out (for the days ring)
  mapsLink: "https://maps.app.goo.gl/cqPghF7x2MxTsE5Q7?g_st=ac",   // "Open in Maps" button
  mapQuery: "Triumph Luxury Hotel New Cairo",                        // what the embedded map shows
  whatsapp: "",    // e.g. "201001234567" (country code, no + or spaces). Leave empty to hide the RSVP button.

  babyName: { en: "Adam", ar: "آدم" },   // shown big in the hero and used across the texts ({name})
  place: {
    en: "Triumph Luxury Hotel – Pool Restaurant, New Cairo",
    ar: "فندق تريومف لاكجري – مطعم حمام السباحة، القاهرة الجديدة",
  },

  // Photos in the looping strip. Add your own to assets/moments/ and list them here.
  moments: [
    "assets/moments/full.jpg",
    "assets/moments/head.jpg",
    "assets/moments/face.jpg",
    "assets/moments/tie.jpg",
    "assets/moments/crown.jpg",
  ],
};

/* ---------- Texts (English / عربي) ---------- */
const I18N = {
  en: {
    title: "Boss Party 👑 {name}'s 1st Birthday | You're Invited",
    lang_btn: "عربي",
    gate_kicker: "Top secret · for invited guests only",
    gate_title: "A very <em>important</em> meeting awaits",
    tap: "Tap to open",
    hero_kicker: "You're invited to the",
    hero_title: "BOSS PARTY!",
    hero_sub: "turns ONE",
    scroll: "Scroll",
    cd_title: "Until the Boss Party",
    u_days: "Days", u_hours: "Hours", u_min: "Minutes", u_sec: "Seconds",
    cd_live: "The meeting is in session! 🎉",
    msg_body: "One year ago, the most important boss in our lives joined the family. {name} runs the house, the schedule and every heart in it. Come celebrate his first year with cake, laughter and one very serious meeting.",
    msg_sign: "— Mom & Dad",
    mo_title: "{name}'s First Year",
    mo_sub: "Sharing his first memories with you",
    dt_title: "Meeting Details",
    dt_date: "Date", dt_time: "Time", dt_venue: "Venue",
    btn_maps: "Open in Maps", btn_cal: "Add to Calendar", btn_rsvp: "RSVP on WhatsApp",
    dt_note: "Attendance is mandatory. Cake is non-negotiable. 🎂",
    foot: "Made with love by Mom & Dad",
    ics_title: "Boss Party – {name}'s 1st Birthday 👑",
    rsvp_text: "Hi! I'm coming to {name}'s Boss Party 🎉",
  },
  ar: {
    title: "حفلة الزعيم 👑 عيد ميلاد {name} الأول | أنتم مدعوون",
    lang_btn: "EN",
    gate_kicker: "سرّي للغاية · للمدعوين فقط",
    gate_title: "اجتماع <em>مهم جدًا</em> في انتظاركم",
    tap: "اضغط للفتح",
    hero_kicker: "أنتم مدعوون إلى",
    hero_title: "حفلة الزعيم!",
    hero_sub: "يُتمّ عامه الأول",
    scroll: "مرّر لأسفل",
    cd_title: "باقي على حفلة الزعيم",
    u_days: "يوم", u_hours: "ساعة", u_min: "دقيقة", u_sec: "ثانية",
    cd_live: "الاجتماع بدأ! 🎉",
    msg_body: "منذ عام واحد، انضمّ إلى عائلتنا أهمّ زعيم في حياتنا. {name} يدير البيت وجدولنا وكل القلوب فيه. تعالوا نحتفل بعامه الأول بالكعك والضحك واجتماع جادّ جدًا.",
    msg_sign: "— ماما وبابا",
    mo_title: "السنة الأولى من عمر {name}",
    mo_sub: "نشارككم أجمل لحظاته الأولى",
    dt_title: "تفاصيل الحفل",
    dt_date: "التاريخ", dt_time: "الموعد", dt_venue: "المكان",
    btn_maps: "افتح الخريطة", btn_cal: "أضف إلى التقويم", btn_rsvp: "تأكيد الحضور عبر واتساب",
    dt_note: "الحضور إلزامي، والكعكة غير قابلة للتفاوض 🎂",
    foot: "صُنع بحب من ماما وبابا",
    ics_title: "حفلة الزعيم – عيد ميلاد {name} الأول 👑",
    rsvp_text: "مرحبًا! سأحضر حفلة الزعيم {name} 🎉",
  },
};

/* ---------- Helpers ---------- */
const $ = (id) => document.getElementById(id);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

/* =========================================================
   🌍  LANGUAGE
   ========================================================= */
let lang = store.get("lang") || ((navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en");

// text in the current language, with {name} replaced by the baby's name
const tr = (key) => I18N[lang][key].replaceAll("{name}", INVITE.babyName[lang]);

function applyLang(l) {
  lang = l;
  store.set("lang", l);
  document.documentElement.lang = l;
  document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  document.title = tr("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = tr(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = tr(el.dataset.i18nHtml); });

  const loc = l === "ar" ? "ar-EG" : "en-GB";
  const when = new Date(INVITE.dateTime);
  const date = new Intl.DateTimeFormat(loc, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" }).format(when);
  const time = new Intl.DateTimeFormat(loc, { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Cairo" }).format(when);
  $("heroDate").textContent = date;
  $("heroTime").textContent = time;
  $("dDate").textContent = date;
  $("dTime").textContent = time;
  $("dPlace").textContent = INVITE.place[l];
  $("heroName").textContent = INVITE.babyName[l];

  document.querySelectorAll(".one, .case-card b").forEach((el) => { el.textContent = l === "ar" ? "١" : "1"; });
  nf = new Intl.NumberFormat(loc, { minimumIntegerDigits: 2, useGrouping: false });
  Object.keys(prev).forEach((k) => delete prev[k]);
  tick();
}
document.querySelectorAll("[data-lang-toggle]").forEach((b) =>
  b.addEventListener("click", () => applyLang(lang === "ar" ? "en" : "ar")));

/* =========================================================
   ⏳  COUNTDOWN with progress rings
   ========================================================= */
const target = new Date(INVITE.dateTime).getTime();
const startAt = new Date(INVITE.countdownFrom).getTime();
const CIRC = 2 * Math.PI * 44;
let nf = new Intl.NumberFormat("en", { minimumIntegerDigits: 2, useGrouping: false });
const prev = {};

function setDial(id, arcId, value, fraction) {
  const el = $(id);
  const txt = nf.format(value);
  if (prev[id] !== txt) {
    el.textContent = txt;
    if (prev[id] !== undefined && !reduceMotion) { el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); }
    prev[id] = txt;
  }
  $(arcId).style.strokeDashoffset = (CIRC * (1 - Math.min(1, Math.max(0, fraction)))).toFixed(2);
}
function tick() {
  const diff = target - Date.now();
  if (diff <= 0) {
    $("dials").hidden = true;
    $("live").hidden = false;
    return;
  }
  const d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60;
  setDial("d", "arcD", d, diff / (target - startAt));
  setDial("h", "arcH", h, h / 24);
  setDial("m", "arcM", m, m / 60);
  setDial("s", "arcS", s, s / 60);
}
setInterval(tick, 1000);

/* ---------- Map, directions, RSVP, calendar ---------- */
$("mapFrame").src = `https://www.google.com/maps?q=${encodeURIComponent(INVITE.mapQuery)}&output=embed`;
$("mapBtn").href = INVITE.mapsLink;
if (INVITE.whatsapp) {
  $("rsvpBtn").hidden = false;
  $("rsvpBtn").addEventListener("click", (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${INVITE.whatsapp}?text=${encodeURIComponent(tr("rsvp_text"))}`, "_blank", "noopener");
  });
}
$("calBtn").addEventListener("click", () => {
  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start = new Date(INVITE.dateTime);
  const end = new Date(start.getTime() + INVITE.durationHours * 3600000);
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Boss Party Invitation//EN", "BEGIN:VEVENT",
    `UID:boss-party-${start.getTime()}@baby-corp`, `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${tr("ics_title")}`,
    `LOCATION:${INVITE.place[lang].replace(/,/g, "\\,")}`,
    `DESCRIPTION:${INVITE.mapsLink}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "boss-party.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  burst(80);
});

/* ---------- Moments strip (looping) + lightbox ---------- */
(function moments() {
  const track = $("track");
  const make = (src) => {
    const f = document.createElement("figure");
    f.className = "polaroid";
    f.innerHTML = `<img src="${src}" alt="" loading="lazy" />`;
    f.onclick = () => openLightbox(src);
    return f;
  };
  // repeat the set so the strip is always wider than the screen, then double it for a seamless loop
  let set = [...INVITE.moments];
  while (set.length && set.length < 8) set = set.concat(INVITE.moments);
  [...set, ...set].forEach((src) => track.appendChild(make(src)));
  // the strip moves by half its width, so keep it proportional to the number of photos
  track.style.animationDuration = Math.max(24, set.length * 6) + "s";
})();
function openLightbox(src) {
  const lb = document.createElement("div");
  lb.style.cssText = "position:fixed;inset:0;z-index:95;display:grid;place-items:center;padding:20px;background:rgba(5,11,28,.93);cursor:zoom-out";
  lb.innerHTML = `<img src="${src}" alt="" style="max-width:100%;max-height:90vh;border-radius:8px;box-shadow:0 18px 40px rgba(0,0,0,.5)">`;
  lb.onclick = () => lb.remove();
  document.body.appendChild(lb);
}

/* =========================================================
   🎵  MUSIC  (assets/song.mp3 if present, else a synthesized Happy Birthday)
   ========================================================= */
const N = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
const MELODY = [
  ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
  ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
  ["G4", .75], ["G4", .25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
  ["F5", .75], ["F5", .25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 3],
];
const BEAT = 0.42;
let ctx = null, playing = false, loopTimer = null, useSong = false;
const song = $("song");

// look for a real song at load time (so tapping "open" can start it instantly)
["assets/song.mp3", "assets/happy-birthday.mp3"].reduce((p, url) => p.then((found) => found ||
  fetch(url, { method: "HEAD" }).then((r) => (r.ok ? url : null)).catch(() => null)), Promise.resolve(null))
  .then((url) => { if (url) { song.src = url; useSong = true; } });

function playNote(freq, start, dur) {
  [["sine", 1, 0.28], ["triangle", 2, 0.06]].forEach(([type, mult, vol]) => {
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = type; osc.frequency.value = freq * mult;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur * 0.95);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start); osc.stop(start + dur);
  });
}
function playSong() {
  let t = ctx.currentTime + 0.1;
  MELODY.forEach(([n, b]) => { playNote(N[n], t, b * BEAT); t += b * BEAT; });
  loopTimer = setTimeout(() => { if (playing && ctx) playSong(); }, (t - ctx.currentTime + 1.2) * 1000);
}
function setMuteUI(on) { $("muteBtn").textContent = on ? "🔊" : "🔇"; $("muteBtn").classList.toggle("on", on); }
function startMusic() {
  playing = true; setMuteUI(true);
  if (useSong) { song.play().catch(() => { playing = false; setMuteUI(false); }); return; }
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  ctx.resume(); playSong();
}
function stopMusic() {
  playing = false; setMuteUI(false);
  clearTimeout(loopTimer); song.pause();
  if (ctx) { ctx.close(); ctx = null; }
}
$("muteBtn").addEventListener("click", () => (playing ? stopMusic() : startMusic()));

/* =========================================================
   🎉  CONFETTI
   ========================================================= */
const canvas = $("confetti"), cx = canvas.getContext("2d");
const COLORS = ["#e0b341", "#f8de8e", "#ffffff", "#15296a", "#d7263d", "#b98a1c"];
let pieces = [];
const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
addEventListener("resize", resize); resize();
function burst(count = 120, x = innerWidth / 2, y = innerHeight / 3) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) pieces.push({
    x, y, vx: (Math.random() - .5) * 15, vy: Math.random() * -13 - 4,
    size: Math.random() * 8 + 4, rot: Math.random() * 360, vr: (Math.random() - .5) * 14,
    color: COLORS[(Math.random() * COLORS.length) | 0], life: 0, round: Math.random() < .25,
  });
}
(function animate() {
  cx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter((p) => p.y < innerHeight + 20 && p.life < 420);
  pieces.forEach((p) => {
    p.vy += .3; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot * Math.PI / 180); cx.fillStyle = p.color;
    if (p.round) { cx.beginPath(); cx.arc(0, 0, p.size / 2.2, 0, 7); cx.fill(); }
    else cx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    cx.restore();
  });
  requestAnimationFrame(animate);
})();

/* =========================================================
   ✨  DYNAMIC TOUCHES
   ========================================================= */
(function floaters() {
  if (reduceMotion) return;
  const icons = ["🍼", "💼", "⭐", "🧸", "🎈", "👑", "🍰", "🎁"], box = $("floaters");
  for (let i = 0; i < (innerWidth < 600 ? 9 : 15); i++) {
    const s = document.createElement("span"), dur = 16 + Math.random() * 16;
    s.className = "floater"; s.textContent = icons[i % icons.length];
    s.style.left = Math.random() * 96 + "%"; s.style.fontSize = 18 + Math.random() * 22 + "px";
    s.style.animationDuration = dur + "s"; s.style.animationDelay = -Math.random() * dur + "s";
    box.appendChild(s);
  }
})();

// 3D tilt on the boss, confetti when you tap the arch
const baby = $("babyPop"), arch = $("archWrap");
if (!reduceMotion) addEventListener("pointermove", (e) => {
  const r = arch.getBoundingClientRect();
  baby.style.setProperty("--ry", (((e.clientX - (r.left + r.width / 2)) / innerWidth) * 24).toFixed(2) + "deg");
  baby.style.setProperty("--rx", ((-(e.clientY - (r.top + r.height / 2)) / innerHeight) * 16).toFixed(2) + "deg");
});
arch.addEventListener("click", (e) => burst(90, e.clientX, e.clientY));

// Scroll reveal
function startReveals() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((el) => el.classList.add("in")); return; }
  document.querySelectorAll(".hero .reveal").forEach((el, i) => (el.style.transitionDelay = i * 0.14 + "s"));
  const io = new IntersectionObserver((list) => list.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
}

/* =========================================================
   💼  TAP TO OPEN
   ========================================================= */
let opened = false;
function openInvitation() {
  if (opened) return;
  opened = true;
  startMusic();                                  // inside the tap, so browsers allow sound
  $("gate").classList.add("open");               // lid lifts, invitation card rises
  setTimeout(() => {
    $("gate").classList.add("hide");
    document.body.classList.remove("locked");
    $("controls").classList.add("show");
    startReveals();
    burst(220);
  }, reduceMotion ? 0 : 1900);
}
$("openBtn").addEventListener("click", openInvitation);
$("case").parentElement.addEventListener("click", (e) => { if (e.target.closest("#case")) openInvitation(); });

applyLang(lang);
