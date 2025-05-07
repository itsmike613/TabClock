const settings = {
    use24h: false,
    showSeconds: false,
    showAMPM: true,
    showDate: true,
    showMilliseconds: false,
    slowMsUpdate: false,
    hideHint: false,
    datePattern: "W, M Do YYYY",
    font: "sans-serif",
    textColor: "#ffffff",
    bgColor: "#000000",
    theme: "dark",
    placement: "middle-center"
};

const themeMap = {
    dark: { bg: "#000000", text: "#ffffff", font: "Inter" },
    light: { bg: "#ffffff", text: "#000000", font: "Inter" },
    solarized: { bg: "#002b36", text: "#93a1a1", font: "monospace" },
    coffee: { bg: "#3b2f2f", text: "#f5f5dc", font: "serif" },
    ocean: { bg: "#001f3f", text: "#7fdbff", font: "sans-serif" },
    forest: { bg: "#0b3d0b", text: "#cce6cc", font: "cursive" },
    hacker: { bg: "#000000", text: "#00F800", font: "monospace" },
    moooo: { bg: "#f8f8f8", text: "#222222", font: "Moo Lah Lah" },
    cherry: { bg: "#f3eded", text: "#fda9a9", font: "Cherry Bomb One" },
    belgian: { bg: "#e6d9bd", text: "#6f8b6e", font: "Hanalei" },
    retrowave: { bg: "#14165F", text: "#000000", font: "Honk" }
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

    return settings.datePattern
        .replace(/YYYY/g, Y)
        .replace(/YY/g, String(Y).slice(-2))
        .replace(/Do/g, Do)
        .replace(/DD/g, DD)
        .replace(/MM/g, MM)
        .replace(/mm/g, mm)
        .replace(/M(?![a-z])/g, M)
        .replace(/m(?![a-z])/g, m)
        .replace(/D/g, D)
        .replace(/W/g, W)
        .replace(/w/g, w);
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
    document.title = timeString;
    dateEl.textContent = formatDate(now);
    dateEl.style.display = settings.showDate ? "block" : "none";
    document.getElementById("scroll-indicator").style.display = settings.hideHint ? "none" : "block";
}

function applyTheme(theme) {
    const t = themeMap[theme];
    settings.bgColor = t.bg;
    settings.textColor = t.text;
    settings.font = t.font;
    updateAppearance();
}

function updateAppearance() {
    clockEl.style.backgroundColor = settings.bgColor;
    clockEl.style.color = settings.textColor;
    clockEl.style.fontFamily = settings.font;

    const [vertical, horizontal] = settings.placement.split("-");
    const justifyMap = { top: "flex-start", middle: "center", bottom: "flex-end" };
    const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
    clockEl.style.justifyContent = justifyMap[vertical];
    clockEl.style.alignItems = alignMap[horizontal];

    elBack.value = settings.bgColor;
    elText.value = settings.textColor;
    elFont.value = settings.font;
    elPlacement.value = settings.placement;
}

function saveSettings() {
    localStorage.setItem("TCDB_use24h", settings.use24h);
    localStorage.setItem("TCDB_showSeconds", settings.showSeconds);
    localStorage.setItem("TCDB_showAMPM", settings.showAMPM);
    localStorage.setItem("TCDB_showDate", settings.showDate);
    localStorage.setItem("TCDB_showMilliseconds", settings.showMilliseconds);
    localStorage.setItem("TCDB_slowMsUpdate", settings.slowMsUpdate);
    localStorage.setItem("TCDB_hideHint", settings.hideHint);
    localStorage.setItem("TCDB_datePattern", settings.datePattern);
    localStorage.setItem("TCDB_font", settings.font);
    localStorage.setItem("TCDB_textColor", settings.textColor);
    localStorage.setItem("TCDB_bgColor", settings.bgColor);
    localStorage.setItem("TCDB_theme", settings.theme);
    localStorage.setItem("TCDB_placement", settings.placement);
}

function loadSettings() {
    settings.use24h = localStorage.getItem("TCDB_use24h") === "true";
    settings.showSeconds = localStorage.getItem("TCDB_showSeconds") === "true";
    settings.showAMPM = localStorage.getItem("TCDB_showAMPM") === "true";
    settings.showDate = localStorage.getItem("TCDB_showDate") === "true";
    settings.showMilliseconds = localStorage.getItem("TCDB_showMilliseconds") === "true";
    settings.slowMsUpdate = localStorage.getItem("TCDB_slowMsUpdate") === "true";
    settings.hideHint = localStorage.getItem("TCDB_hideHint") === "true";
    settings.datePattern = localStorage.getItem("TCDB_datePattern") || "W, M Do YYYY";
    settings.font = localStorage.getItem("TCDB_font") || "sans-serif";
    settings.textColor = localStorage.getItem("TCDB_textColor") || "#ffffff";
    settings.bgColor = localStorage.getItem("TCDB_bgColor") || "#000000";
    settings.theme = localStorage.getItem("TCDB_theme") || "dark";
    settings.placement = localStorage.getItem("TCDB_placement") || "middle-center";

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

    toggleAMPMState();
    updateAppearance();
    setUpdateInterval();
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

let clockInterval;

function setUpdateInterval() {
    clearInterval(clockInterval);
    let interval = 1000;
    if (settings.showMilliseconds) {
        interval = settings.slowMsUpdate ? 100 : 10;
    }
    clockInterval = setInterval(updateClock, interval);
}

el24h.addEventListener("change", (e) => {
    settings.use24h = e.target.checked;
    toggleAMPMState();
    saveSettings();
    setUpdateInterval();
});

elSecs.addEventListener("change", (e) => {
    settings.showSeconds = e.target.checked;
    saveSettings();
    setUpdateInterval();
});

elAMPM.addEventListener("change", (e) => {
    settings.showAMPM = e.target.checked;
    saveSettings();
});

elShowDate.addEventListener("change", (e) => {
    settings.showDate = e.target.checked;
    saveSettings();
});

elShowMilliseconds.addEventListener("change", (e) => {
    settings.showMilliseconds = e.target.checked;
    saveSettings();
    setUpdateInterval();
});

elSlowMs.addEventListener("change", (e) => {
    settings.slowMsUpdate = e.target.checked;
    saveSettings();
    setUpdateInterval();
});

elHideHint.addEventListener("change", (e) => {
    settings.hideHint = e.target.checked;
    saveSettings();
    updateClock();
});

elDateInput.addEventListener("input", (e) => {
    settings.datePattern = e.target.value;
    saveSettings();
});

elFont.addEventListener("change", (e) => {
    settings.font = e.target.value;
    updateAppearance();
    saveSettings();
});

elText.addEventListener("input", (e) => {
    settings.textColor = e.target.value;
    updateAppearance();
    saveSettings();
});

elBack.addEventListener("input", (e) => {
    settings.bgColor = e.target.value;
    updateAppearance();
    saveSettings();
});

elTheme.addEventListener("change", (e) => {
    settings.theme = e.target.value;
    applyTheme(settings.theme);
    saveSettings();
});

elPlacement.addEventListener("change", (e) => {
    settings.placement = e.target.value;
    updateAppearance();
    saveSettings();
});

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

loadSettings();
setUpdateInterval();
updateClock();