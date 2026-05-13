const SCHOOL_CLASSES = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

function addFinalPolishCss() {
  let style = document.getElementById("final-portal-polish-css");
  if (!style) {
    style = document.createElement("style");
    style.id = "final-portal-polish-css";
    document.head.appendChild(style);
  }

  style.textContent = `
    body:not(.showAdmissionPage) #admission{display:none!important}
    body.showAdmissionPage #admission{display:block!important}
    body.portalSplitMode:not(.showStudents) .classRecordsSection{display:none!important}
    body.portalSplitMode.showStudents .classRecordsSection{display:block!important}
    body.portalSplitMode.showStudents #records{display:block!important}
    body.portalSplitMode.showStudents #records .recordsBox:not([data-box-title*="student"]){display:none!important}
    body.portalSplitMode.showDashboard .classRecordsSection{display:none!important}
    .cleanAdmissionLauncher{max-width:1180px;margin:22px auto;background:linear-gradient(135deg,#020617,#1d4ed8);color:white;border-radius:24px;padding:28px;display:flex;justify-content:space-between;align-items:center;gap:18px;box-shadow:0 24px 70px rgba(15,23,42,.16)}
    .cleanAdmissionLauncher h2{margin:0 0 6px;font-size:1.6rem}.cleanAdmissionLauncher p{margin:0;color:#dbeafe;line-height:1.6}.cleanAdmissionLauncher button{border:0;background:#38bdf8;color:#082f49;border-radius:14px;padding:13px 18px;font-weight:900;cursor:pointer;white-space:nowrap}
    .portalPageNav{top:0!important}
    .portalPageHint{display:none!important}
    .autoSubjectNotice{background:#ecfdf5;border:1px solid #bbf7d0;color:#166534;border-radius:12px;padding:10px 12px;font-weight:800;margin:8px 0;line-height:1.4}
    .rsGrid select[data-f="className"]{border:1px solid #94a3b8;border-radius:8px;padding:9px;background:white}
    @media(max-width:700px){.cleanAdmissionLauncher{margin:14px 12px;display:block;padding:18px;border-radius:18px}.cleanAdmissionLauncher button{width:100%;margin-top:14px}.portalPageNav{position:relative!important;top:auto!important}}
  `;
}

function normalizePathState() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const showAdmission = path.includes("admission") || hash.includes("admission") || document.body.classList.contains("forceAdmissionOpen");
  document.body.classList.toggle("showAdmissionPage", showAdmission);
}

function markClassRecordsSection() {
  [...document.querySelectorAll("section, div")].forEach((el) => {
    if (el.classList.contains("classRecordsSection")) return;
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (/View students by class/i.test(text) && /JSS1/i.test(text) && /SS3/i.test(text)) {
      el.classList.add("classRecordsSection");
    }
  });
}

function addAdmissionLauncher() {
  const home = document.querySelector("#home") || document.querySelector("main");
  if (!home || document.querySelector(".cleanAdmissionLauncher")) return;
  const launcher = document.createElement("section");
  launcher.className = "cleanAdmissionLauncher";
  launcher.innerHTML = `<div><h2>Online Admission</h2><p>The admission form stays closed until a parent clicks apply. This keeps the public page clean.</p></div><button type="button">Apply for Admission</button>`;
  launcher.querySelector("button").onclick = () => {
    document.body.classList.add("forceAdmissionOpen", "showAdmissionPage");
    const admission = document.querySelector("#admission");
    admission?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const hero = document.querySelector(".hero") || home;
  hero.after(launcher);
}

function improvePortalPages() {
  const nav = document.querySelector(".portalPageNav");
  if (!nav || nav.dataset.polished === "true") return;
  nav.dataset.polished = "true";
  nav.querySelectorAll("button").forEach((btn) => {
    const text = btn.textContent.trim();
    if (text === "Students") btn.textContent = "Students / Class Records";
    if (text === "Dashboard / Create") btn.textContent = "Dashboard";
  });
}

function classSelectHtml(current) {
  return `<select data-f="className">${SCHOOL_CLASSES.map((c) => `<option ${c === current ? "selected" : ""}>${c}</option>`).join("")}</select>`;
}

function enhanceResultAutomation() {
  document.querySelectorAll(".rsBuilder").forEach((builder) => {
    if (builder.dataset.autoReady === "true") return;
    builder.dataset.autoReady = "true";

    const oldClass = builder.querySelector('[data-f="className"]');
    if (oldClass && oldClass.tagName !== "SELECT") {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = classSelectHtml((oldClass.value || "JSS1").toUpperCase());
      oldClass.replaceWith(wrapper.firstElementChild);
    }

    const classField = builder.querySelector('[data-f="className"]');
    const deptField = builder.querySelector('[data-f="dept"]');
    const refreshBtn = builder.querySelector('[data-a="subjects"]');
    const loadBtn = builder.querySelector('[data-a="load"]');

    const notice = document.createElement("div");
    notice.className = "autoSubjectNotice";
    notice.textContent = "Automation active: choose student/class/gender, then subjects load automatically. JSS uses general subjects. SS uses Science, Art or Commercial.";
    builder.querySelector("h3")?.after(notice);

    const autoRefresh = () => setTimeout(() => refreshBtn?.click(), 50);
    classField?.addEventListener("change", autoRefresh);
    deptField?.addEventListener("change", autoRefresh);

    const resultForm = builder.closest("form");
    const studentSelect = [...(resultForm?.querySelectorAll("select") || [])].find((s) => /select student|assigned student/i.test(s.options?.[0]?.textContent || ""));
    studentSelect?.addEventListener("change", () => setTimeout(() => loadBtn?.click(), 80));

    const genderField = builder.querySelector('[data-f="gender"]');
    genderField?.addEventListener("change", autoRefresh);
  });
}

function runFinalPolish() {
  addFinalPolishCss();
  normalizePathState();
  markClassRecordsSection();
  addAdmissionLauncher();
  improvePortalPages();
  enhanceResultAutomation();
}

window.addEventListener("load", runFinalPolish);
window.addEventListener("popstate", runFinalPolish);
new MutationObserver(runFinalPolish).observe(document.documentElement, { childList: true, subtree: true });
setInterval(runFinalPolish, 1000);
