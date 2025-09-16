dayjs.extend(dayjs_plugin_advancedFormat);
dayjs.extend(dayjs_plugin_isoWeek);
dayjs.extend(dayjs_plugin_quarterOfYear);
dayjs.extend(dayjs_plugin_ordinal);
dayjs.extend(dayjs_plugin_dayOfYear);

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

const themes = {
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
    spaceodyssey: { displayName: "Space Odyssey", bg: "#000022", text: "#ffffff", font: "Orbitron", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    puddles: { displayName: "Puddles", bg: "#39ABD0", text: "#EDF1F3", font: "Rubik Puddles", backgroundImage: "None", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    patrick: { displayName: "Patrick (w/ img)", bg: "#000000", text: "#F8F8FF", font: "Patrick Hand", backgroundImage: "Source/Images/Backgrounds/patrick.jpg", placement: "top-right", clockFontSize: "80px", dateFontSize: "32px" },
    spiderman: { displayName: "Spiderman (w/ img)", bg: "#000000", text: "#F8F8FF", font: "Rubik Dirt", backgroundImage: "Source/Images/Backgrounds/spider.jpg", placement: "bottom-left", clockFontSize: "80px", dateFontSize: "32px" },
    minecraft: { displayName: "Minecraft (w/ img) [NEW!]", bg: "#FFFFFF", text: "#324076", font: "Bungee", backgroundImage: "Source/Images/Backgrounds/minecraft.jpg", placement: "top-center", clockFontSize: "60px", dateFontSize: "32px" },
    blueprint: { displayName: "Blueprint (w/ img) [NEW!]", bg: "#000000", text: "#F2F2F3", font: "Rubik Marker Hatch", backgroundImage: "Source/Images/Backgrounds/blueprint.jpg", placement: "middle-center", clockFontSize: "80px", dateFontSize: "32px" },
    city: { displayName: "Cityscapes (w/ gif)", bg: "#000000", text: "#F8F8FF", font: "Inter", backgroundImage: "Source/Images/Backgrounds/city.gif", placement: "bottom-center", clockFontSize: "80px", dateFontSize: "32px" }
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

const pad = n => n < 10 ? "0" + n : n;

function formatDate(now) {
    if (!settings.showDate) return "";
    const d = dayjs(now);
    const map = { "DDDo": d.dayOfYear() + d.format("o"), "WWo": d.isoWeek() + d.format("o") };
    let str = d.format(settings.datePattern);
    Object.entries(map).forEach(([k, v]) => str = str.replace(new RegExp(`\\b${k}\\b`, "g"), v));
    return str;
}

function formatTime(now) {
    let h = now.getHours();
    const m = pad(now.getMinutes()), s = pad(now.getSeconds()), ms = pad(now.getMilliseconds() / 10 | 0);
    let ampm = "";
    if (!settings.use24h) {
        ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
    }
    let t = `${pad(h)}:${m}`;
    if (settings.showSeconds) t += `:${s}`;
    if (settings.showMilliseconds) t += `:${ms}`;
    if (settings.showAMPM && !settings.use24h) t += ` ${ampm}`;
    return t;
}

function applyTheme(theme) {
    const t = themes[theme];
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
    if (savedSettings) Object.assign(settings, JSON.parse(savedSettings));
    if (!themes[settings.theme]) settings.theme = "dark";
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
    const use24 = settings.use24h;
    el_ampm.disabled = use24;
    if (use24) el_ampm.checked = settings.showAMPM = false;
}

function toggleSlowMsState() {
    const show = settings.showMilliseconds;
    el_slow.disabled = !show;
    if (!show) el_slow.checked = settings.slowMsUpdate = false;
}

let lastTimeString = "", lastDateString = "", lastMsUpdate = 0;

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
    Object.entries(themes).forEach(([key, value]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = value.displayName;
        themeSelect.appendChild(option);
    });
    loadSettings();
    startClock();
});
