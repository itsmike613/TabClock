const settings = {
    use24h: false,
    showSeconds: false,
    showAMPM: true,
    showDate: true,
    showMilliseconds: false,
    slowMsUpdate: false,
    hideHint: false,
    datePattern: "W, M Do YYYY",
    font: "Inter",
    textColor: "#000000",
    bgColor: "#FFFFFF",
    theme: "light",
    placement: "middle-center",
    clockFontSize: "80px",
    dateFontSize: "32px",
    backgroundImage: "None"
};

const themeMap = {
    dark: { displayName: "Dark", bg: "#000000", text: "#ffffff", font: "Inter", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    light: { displayName: "Light", bg: "#ffffff", text: "#000000", font: "Inter", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    belgian: { displayName: "Belgian Evergreen", bg: "#e6d9bd", text: "#6f8b6e", font: "Hanalei", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    bluepen: { displayName: "Blue Pen", bg: "#fdfcf7", text: "#1b49d1", font: "Patrick Hand", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    cherry: { displayName: "Cherry Blossom", bg: "#f3eded", text: "#fda9a9", font: "Cherry Bomb One", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    ghostscript: { displayName: "Ghostscript", bg: "#f8f8ff", text: "#555555", font: "Tagesschrift", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    glitchcore: { displayName: "Glitchcore", bg: "#0d0d0d", text: "#ff0033", font: "Rubik Glitch", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    hacker: { displayName: "Hacker", bg: "#000000", text: "#00F800", font: "monospace", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    holochip: { displayName: "Holo Chip", bg: "#0e0b1e", text: "#ffffff", font: "Nabla", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    moooo: { displayName: "Moooo", bg: "#f8f8f8", text: "#222222", font: "Moo Lah Lah", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    retrowave: { displayName: "Retrowave", bg: "#14165F", text: "#000000", font: "Honk", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    sakura: { displayName: "Sakura", bg: "#ffe4e1", text: "#8b0000", font: "Sawarabi Mincho", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    scribblepad: { displayName: "Scribble Pad", bg: "#fffbe6", text: "#2c2c2c", font: "Rubik Scribble", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    solarized: { displayName: "Solarized", bg: "#002b36", text: "#93a1a1", font: "monospace", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    spaceodyssey: { displayName: "Space Odyssey", bg: "#000022", text: "#ffffff", font: "Orbitron", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    puddles: { displayName: "Puddles", bg: "#39ABD0", text: "#EDF1F3", font: "Rubik Puddles", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    patrick: { displayName: "Patrick", bg: "#000000", text: "#F8F8FF", font: "Patrick Hand", backgroundImage: "Source/Images/Backgrounds/patrick.jpg", placement: "top-right", clockFontSize: "80px", dateFontSize: "32px" },
    spiderman: { displayName: "Spiderman", bg: "#000000", text: "#F8F8FF", font: "Rubik Dirt", backgroundImage: "Source/Images/Backgrounds/spider.jpg", placement: "bottom-left", clockFontSize: "80px", dateFontSize: "32px" }
};

const el_time = document.getElementById("time");
const el_date = document.getElementById("date");
const el_clck = document.getElementById("clck");
const el_1224 = document.getElementById("1224");
const el_secs = document.getElementById("secs");
const el_ampm = document.getElementById("ampm");
const el_dtog = document.getElementById("dtog");
const el_mtog = document.getElementById("mtog");
const el_slow = document.getElementById("slow");
const el_htog = document.getElementById("htog");
const el_dtin = document.getElementById("dtin");
const el_font = document.getElementById("font");
const el_thme = document.getElementById("thme");
const el_text = document.getElementById("text");
const el_back = document.getElementById("back");
const el_plcm = document.getElementById("plcm");
const el_full = document.getElementById("full");
const el_ckfs = document.getElementById("ckfs");
const el_dtfs = document.getElementById("dtfs");
const el_bgim = document.getElementById("bgim");

const settingHandlers = [
    { el: el_1224, key: "use24h", event: "change", action: () => toggleAMPMState() },
    { el: el_secs, key: "showSeconds", event: "change" },
    { el: el_ampm, key: "showAMPM", event: "change" },
    { el: el_dtog, key: "showDate", event: "change" },
    { el: el_mtog, key: "showMilliseconds", event: "change", action: () => { toggleSlowMsState(); updateClock(); } },
    { el: el_slow, key: "slowMsUpdate", event: "change" },
    { el: el_htog, key: "hideHint", event: "change", action: () => updateClock() },
    { el: el_dtin, key: "datePattern", event: "input" },
    { el: el_font, key: "font", event: "change", action: () => updateAppearance() },
    { el: el_text, key: "textColor", event: "input", action: () => updateAppearance() },
    { el: el_back, key: "bgColor", event: "input", action: () => updateAppearance() },
    { el: el_thme, key: "theme", event: "change", action: () => applyTheme(settings.theme) },
    { el: el_plcm, key: "placement", event: "change", action: () => updateAppearance() },
    { el: el_ckfs, key: "clockFontSize", event: "change", action: () => updateAppearance() },
    { el: el_dtfs, key: "dateFontSize", event: "change", action: () => updateAppearance() },
    { el: el_bgim, key: "backgroundImage", event: "change", action: () => updateAppearance() }
];

settingHandlers.forEach(({ el, key, event, action }) => {
    el.addEventListener(event, (e) => {
        settings[key] = el.type === "checkbox" ? e.target.checked : e.target.value;
        if (action) action();
        saveSettings();
    });
});

function pad(n) {
    return n < 10 ? "0" + n : n;
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(now) {
    if (!settings.showDate) return "";
    const D = now.getDate();
    const DD = pad(D);
    const Do = getOrdinal(D);
    const m = now.getMonth() + 1;
    const mm = pad(m);
    const M = now.toLocaleString("default", { month: "short" });
    const MM = now.toLocaleString("default", { month: "long" });
    const w = now.toLocaleString("default", { weekday: "short" });
    const W = now.toLocaleString("default", { weekday: "long" });
    const Y = now.getFullYear();
    const temp = new Date(Date.UTC(Y, now.getMonth(), D));
    const dayNum = temp.getUTCDay() || 7;
    temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
    const WW = Math.ceil((((temp - yearStart) / 86400000) + 1) / 7);
    const startOfYear = new Date(Y, 0, 1);
    const DDD = Math.ceil((now - startOfYear) / 86400000) + 1;
    const DDDo = getOrdinal(DDD);
    const Q = Math.floor((m - 1) / 3) + 1;
    const Qo = getOrdinal(Q);

    return settings.datePattern
        .replace(/\bYYYY\b/g, Y)
        .replace(/\bYY\b/g, String(Y).slice(-2))
        .replace(/\bWW\b/g, WW)
        .replace(/\bDDDo\b/g, DDDo)
        .replace(/\bDDD\b/g, DDD)
        .replace(/\bQo\b/g, Qo)
        .replace(/\bQ\b/g, Q)
        .replace(/\bDo\b/g, Do)
        .replace(/\bDD\b/g, DD)
        .replace(/\bMM\b/g, MM)
        .replace(/\bmm\b/g, mm)
        .replace(/\bM\b/g, M)
        .replace(/\bm\b/g, m)
        .replace(/\bD\b/g, D)
        .replace(/\bW\b/g, W)
        .replace(/\bw\b/g, w);
}

function formatTime(now) {
    let h = now.getHours();
    let m = pad(now.getMinutes());
    let s = pad(now.getSeconds());
    let ms = pad(Math.floor(now.getMilliseconds() / 10));
    let ampm = "";

    if (!settings.use24h) {
        ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
    }
    h = pad(h);

    let t = `${h}:${m}`;
    if (settings.showSeconds) t += `:${s}`;
    if (settings.showMilliseconds) t += `:${ms}`;
    if (settings.showAMPM && !settings.use24h) t += ` ${ampm}`;
    return t;
}

function updateClock() {
    const now = new Date();
    const timeString = formatTime(now);
    el_time.textContent = timeString;
    el_date.textContent = formatDate(now);
    el_date.style.display = settings.showDate ? "block" : "none";
    document.getElementById("scroll-indicator").style.display = settings.hideHint ? "none" : "block";
}

function applyTheme(theme) {
    const t = themeMap[theme];
    settings.bgColor = t.bg;
    settings.textColor = t.text;
    settings.font = t.font;
    settings.backgroundImage = t.backgroundImage;
    settings.placement = t.placement;
    settings.clockFontSize = t.clockFontSize;
    settings.dateFontSize = t.dateFontSize;
    updateAppearance();
}

function updateAppearance() {
    el_clck.style.backgroundColor = settings.bgColor;
    el_clck.style.color = settings.textColor;
    el_clck.style.fontFamily = settings.font;
    el_time.style.fontSize = settings.clockFontSize;
    el_date.style.fontSize = settings.dateFontSize;
    const [vertical, horizontal] = settings.placement.split("-");
    const justifyMap = { top: "flex-start", middle: "center", bottom: "flex-end" };
    const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
    el_clck.style.justifyContent = justifyMap[vertical];
    el_clck.style.alignItems = alignMap[horizontal];
    el_back.value = settings.bgColor;
    el_text.value = settings.textColor;
    el_font.value = settings.font;
    el_plcm.value = settings.placement;
    el_ckfs.value = settings.clockFontSize;
    el_dtfs.value = settings.dateFontSize;
    el_bgim.value = settings.backgroundImage;

    if (settings.backgroundImage === "None") {
        el_clck.style.backgroundImage = "none";
        el_clck.style.backgroundColor = settings.bgColor;
    } else {
        el_clck.style.backgroundImage = `url('${settings.backgroundImage}')`;
        el_clck.style.backgroundSize = "cover";
        el_clck.style.backgroundPosition = "center";
    }
}

function saveSettings() {
    localStorage.setItem("TCDB_settings", JSON.stringify(settings));
}

function loadSettings() {
    const savedSettings = localStorage.getItem("TCDB_settings");
    if (savedSettings) {
        Object.assign(settings, JSON.parse(savedSettings));
        if (!themeMap[settings.theme]) settings.theme = "dark";
    }
    el_1224.checked = settings.use24h;
    el_secs.checked = settings.showSeconds;
    el_ampm.checked = settings.showAMPM;
    el_dtog.checked = settings.showDate;
    el_mtog.checked = settings.showMilliseconds;
    el_slow.checked = settings.slowMsUpdate;
    el_htog.checked = settings.hideHint;
    el_dtin.value = settings.datePattern;
    el_font.value = settings.font;
    el_thme.value = settings.theme;
    el_text.value = settings.textColor;
    el_back.value = settings.bgColor;
    el_plcm.value = settings.placement;
    el_ckfs.value = settings.clockFontSize;
    el_dtfs.value = settings.dateFontSize;
    el_bgim.value = settings.backgroundImage;
    toggleAMPMState();
    toggleSlowMsState();
    updateAppearance();
    startClock();
}

function toggleAMPMState() {
    if (settings.use24h) {
        el_ampm.checked = false;
        el_ampm.disabled = true;
        settings.showAMPM = false;
    } else {
        el_ampm.disabled = false;
    }
}

function toggleSlowMsState() {
    if (!settings.showMilliseconds) {
        el_slow.checked = false;
        el_slow.disabled = true;
        settings.slowMsUpdate = false;
    } else {
        el_slow.disabled = false;
    }
}

let lastTimeString = "";
let lastDateString = "";
let lastMsUpdate = 0;

function updateClock() {
    const now = new Date(), t = now.getTime();
    if (!settings.showMilliseconds || !settings.slowMsUpdate || t - lastMsUpdate >= 100) {
        const ts = formatTime(now);
        if (ts !== lastTimeString) el_time.textContent = lastTimeString = ts;
        lastMsUpdate = t;
    }
    if (settings.showDate) {
        const ds = formatDate(now);
        if (ds !== lastDateString) el_date.textContent = lastDateString = ds;
        el_date.style.display = "block";
    } else el_date.style.display = "none";
    document.getElementById("scroll-indicator").style.display = settings.hideHint ? "none" : "block";
    requestAnimationFrame(updateClock);
}

function startClock() {
    updateClock();
}

el_full.onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();

document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById("thme");
    Object.entries(themeMap).forEach(([key, value]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = value.displayName;
        themeSelect.appendChild(option);
    });

    loadSettings();
    startClock();
});