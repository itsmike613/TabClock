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
    patrick: { displayName: "Patrick", bg: "#ffffff", text: "#000000", font: "Patrick Hand", backgroundImage: "Source/Images/Backgrounds/patrick.jpg", placement: "top-right", clockFontSize: "80px", dateFontSize: "32px" }
};

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const clockEl = document.getElementById("clock");
const el24h = document.getElementById("toggle-24h");
const elSecs = document.getElementById("toggle-seconds");
const elAMPM = document.getElementById("toggle-ampm");
const elShowDate = document.getElementById("toggle-date");
const elShowMilliseconds = document.getElementById("toggle-milliseconds");
const elSlowMs = document.getElementById("toggle-slow-ms");
const elHideHint = document.getElementById("toggle-hint");
const elDateInput = document.getElementById("date-input");
const elFont = document.getElementById("font-select");
const elTheme = document.getElementById("theme-select");
const elText = document.getElementById("text-color");
const elBack = document.getElementById("bg-color");
const elPlacement = document.getElementById("placement-select");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const elClockFontSize = document.getElementById("clock-fontsize");
const elDateFontSize = document.getElementById("date-fontsize");
const elBackgroundImg = document.getElementById("background-img");

const settingHandlers = [
    { el: el24h, key: "use24h", event: "change", action: () => toggleAMPMState() },
    { el: elSecs, key: "showSeconds", event: "change" },
    { el: elAMPM, key: "showAMPM", event: "change" },
    { el: elShowDate, key: "showDate", event: "change" },
    { el: elShowMilliseconds, key: "showMilliseconds", event: "change", action: () => { toggleSlowMsState(); updateClock(); } },
    { el: elSlowMs, key: "slowMsUpdate", event: "change" },
    { el: elHideHint, key: "hideHint", event: "change", action: () => updateClock() },
    { el: elDateInput, key: "datePattern", event: "input" },
    { el: elFont, key: "font", event: "change", action: () => updateAppearance() },
    { el: elText, key: "textColor", event: "input", action: () => updateAppearance() },
    { el: elBack, key: "bgColor", event: "input", action: () => updateAppearance() },
    { el: elTheme, key: "theme", event: "change", action: () => applyTheme(settings.theme) },
    { el: elPlacement, key: "placement", event: "change", action: () => updateAppearance() },
    { el: elClockFontSize, key: "clockFontSize", event: "change", action: () => updateAppearance() },
    { el: elDateFontSize, key: "dateFontSize", event: "change", action: () => updateAppearance() },
    { el: elBackgroundImg, key: "backgroundImage", event: "change", action: () => updateAppearance() }
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
    timeEl.textContent = timeString;
    dateEl.textContent = formatDate(now);
    dateEl.style.display = settings.showDate ? "block" : "none";
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
    clockEl.style.backgroundColor = settings.bgColor;
    clockEl.style.color = settings.textColor;
    clockEl.style.fontFamily = settings.font;
    timeEl.style.fontSize = settings.clockFontSize;
    dateEl.style.fontSize = settings.dateFontSize;
    const [vertical, horizontal] = settings.placement.split("-");
    const justifyMap = { top: "flex-start", middle: "center", bottom: "flex-end" };
    const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
    clockEl.style.justifyContent = justifyMap[vertical];
    clockEl.style.alignItems = alignMap[horizontal];
    elBack.value = settings.bgColor;
    elText.value = settings.textColor;
    elFont.value = settings.font;
    elPlacement.value = settings.placement;
    elClockFontSize.value = settings.clockFontSize;
    elDateFontSize.value = settings.dateFontSize;
    elBackgroundImg.value = settings.backgroundImage;

    if (settings.backgroundImage === "None") {
        clockEl.style.backgroundImage = "none";
        clockEl.style.backgroundColor = settings.bgColor;
    } else {
        clockEl.style.backgroundImage = `url('${settings.backgroundImage}')`;
        clockEl.style.backgroundSize = "cover";
        clockEl.style.backgroundPosition = "center";
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
    el24h.checked = settings.use24h;
    elSecs.checked = settings.showSeconds;
    elAMPM.checked = settings.showAMPM;
    elShowDate.checked = settings.showDate;
    elShowMilliseconds.checked = settings.showMilliseconds;
    elSlowMs.checked = settings.slowMsUpdate;
    elHideHint.checked = settings.hideHint;
    elDateInput.value = settings.datePattern;
    elFont.value = settings.font;
    elTheme.value = settings.theme;
    elText.value = settings.textColor;
    elBack.value = settings.bgColor;
    elPlacement.value = settings.placement;
    elClockFontSize.value = settings.clockFontSize;
    elDateFontSize.value = settings.dateFontSize;
    elBackgroundImg.value = settings.backgroundImage;
    toggleAMPMState();
    toggleSlowMsState();
    updateAppearance();
    startClock();
}

function toggleAMPMState() {
    if (settings.use24h) {
        elAMPM.checked = false;
        elAMPM.disabled = true;
        settings.showAMPM = false;
    } else {
        elAMPM.disabled = false;
    }
}

function toggleSlowMsState() {
    if (!settings.showMilliseconds) {
        elSlowMs.checked = false;
        elSlowMs.disabled = true;
        settings.slowMsUpdate = false;
    } else {
        elSlowMs.disabled = false;
    }
}

let lastTimeString = "";
let lastDateString = "";
let lastMsUpdate = 0;

function updateClock() {
    const now = new Date();
    const currentTime = now.getTime();

    let shouldUpdateTime = true;
    if (settings.showMilliseconds && settings.slowMsUpdate) {
        if (currentTime - lastMsUpdate < 100) {
            shouldUpdateTime = false;
        }
    }

    if (shouldUpdateTime) {
        const timeString = formatTime(now);
        if (timeString !== lastTimeString) {
            timeEl.textContent = timeString;
            lastTimeString = timeString;
        }
        lastMsUpdate = currentTime;
    }

    if (settings.showDate) {
        const dateString = formatDate(now);
        if (dateString !== lastDateString) {
            dateEl.textContent = dateString;
            lastDateString = dateString;
        }
        dateEl.style.display = "block";
    } else {
        dateEl.style.display = "none";
    }

    document.getElementById("scroll-indicator").style.display = settings.hideHint ? "none" : "block";
    requestAnimationFrame(updateClock);
}

function startClock() {
    updateClock();
}

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById("theme-select");
    Object.entries(themeMap).forEach(([key, value]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = value.displayName;
        themeSelect.appendChild(option);
    });

    loadSettings();
    startClock();
});