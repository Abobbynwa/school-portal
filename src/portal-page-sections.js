function addPortalPageCss() {
  let style = document.getElementById("portal-page-sections-css");
  if (!style) {
    style = document.createElement("style");
    style.id = "portal-page-sections-css";
    document.head.appendChild(style);
  }

  style.textContent = `
    .portalPageNav{max-width:1250px;margin:18px auto 26px;padding:14px;background:#020617;border-radius:22px;display:flex;gap:10px;overflow-x:auto;position:sticky;top:8px;z-index:50;box-shadow:0 18px 45px rgba(15,23,42,.22)}
    .portalPageNav button{border:0;background:rgba(255,255,255,.08);color:#dbeafe;border-radius:14px;padding:12px 15px;font-weight:900;white-space:nowrap;cursor:pointer;transition:.2s ease}
    .portalPageNav button:hover,.portalPageNav button.active{background:#38bdf8;color:#082f49}
    body.portalSplitMode #records{display:none!important}
    body.portalSplitMode.showRecords #records{display:block!important}
    body.portalSplitMode.showRecords #admin .adminModulePanel,
    body.portalSplitMode.showRecords #admin .adminGrid,
    body.portalSplitMode.showRecords #admin .portalWorkActions,
    body.portalSplitMode.showRecords #admin .scoreFlowPanel{display:none!important}
    body.portalSplitMode.showDashboard #records{display:none!important}
    body.portalSplitMode.showDashboard #admin .adminModulePanel{display:block!important}
    body.portalSplitMode.showDashboard #admin .adminManagedForm:not(.activeModuleForm){display:none!important}
    body.portalSplitMode.showDashboard #admin .dataGrid{display:none!important}
    body.portalSplitMode.showStudents #records{display:block!important}
    body.portalSplitMode.showStudents #records .recordsBox:not([data-box-title*="student"]){display:none!important}
    body.portalSplitMode.showStaff #records{display:block!important}
    body.portalSplitMode.showStaff #records .recordsBox:not([data-box-title*="staff"]){display:none!important}
    body.portalSplitMode.showAdmissions #records{display:block!important}
    body.portalSplitMode.showAdmissions #records .recordsBox:not([data-box-title*="admission"]){display:none!important}
    body.portalSplitMode.showFees #records{display:block!important}
    body.portalSplitMode.showFees #records .recordsBox:not([data-box-title*="fee"]):not([data-box-title*="payment"]):not([data-box-title*="balance"]){display:none!important}
    body.portalSplitMode.showResults #records{display:block!important}
    body.portalSplitMode.showResults #records .recordsBox:not([data-box-title*="result"]):not([data-box-title*="grade"]){display:none!important}
    body.portalSplitMode.showAssignments #records{display:block!important}
    body.portalSplitMode.showAssignments #records .recordsBox:not([data-box-title*="assignment"]){display:none!important}
    body.portalSplitMode.showAnnouncements #records{display:block!important}
    body.portalSplitMode.showAnnouncements #records .recordsBox:not([data-box-title*="announcement"]):not([data-box-title*="notification"]):not([data-box-title*="message"]){display:none!important}
    body.portalSplitMode:not(.showDashboard) #admin .adminModulePanel,
    body.portalSplitMode:not(.showDashboard) #admin .adminManagedForm,
    body.portalSplitMode:not(.showDashboard) #admin .portalWorkActions,
    body.portalSplitMode:not(.showDashboard) #admin .scoreFlowPanel{display:none!important}
    .portalPageHint{max-width:1250px;margin:0 auto 16px;background:#ecfdf5;border:1px solid #bbf7d0;color:#166534;border-radius:16px;padding:12px 15px;font-weight:800;line-height:1.5}
    @media(max-width:700px){.portalPageNav{margin:12px 12px 18px;border-radius:16px;padding:10px}.portalPageNav button{padding:10px 12px;font-size:.86rem}.portalPageHint{margin:0 12px 14px;font-size:.9rem}}
  `;
}

function titleSlug(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function labelRecordBoxes() {
  document.querySelectorAll("#records .recordsBox").forEach((box) => {
    if (box.dataset.boxTitle) return;
    const title = box.querySelector(".recordsBoxHead strong")?.textContent || box.querySelector("h3")?.textContent || "";
    box.dataset.boxTitle = titleSlug(title);
  });
}

function setPortalPage(page) {
  const pages = ["showDashboard", "showRecords", "showStudents", "showStaff", "showAdmissions", "showFees", "showResults", "showAssignments", "showAnnouncements"];
  pages.forEach((p) => document.body.classList.remove(p));
  document.body.classList.add(page);
  document.querySelectorAll(".portalPageNav button").forEach((btn) => btn.classList.toggle("active", btn.dataset.page === page));
  if (page === "showDashboard") {
    document.querySelector("#admin")?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    document.querySelector("#records")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const firstBox = document.querySelector("#records .recordsBox:not([style*='display: none'])");
      firstBox?.classList.add("open");
    }, 150);
  }
}

function setupPortalPages() {
  addPortalPageCss();
  const admin = document.querySelector("#admin");
  const records = document.querySelector("#records");
  const status = admin?.querySelector(".apiStatusCard");
  if (!admin || !records || !status) return;

  document.body.classList.add("portalSplitMode");
  labelRecordBoxes();

  if (!document.querySelector(".portalPageNav")) {
    const hint = document.createElement("div");
    hint.className = "portalPageHint";
    hint.textContent = "Portal is now separated into internal pages. Use the menu below instead of seeing everything on one long page.";

    const nav = document.createElement("div");
    nav.className = "portalPageNav";
    nav.innerHTML = `
      <button type="button" data-page="showDashboard">Dashboard / Create</button>
      <button type="button" data-page="showRecords">All Records</button>
      <button type="button" data-page="showStudents">Students</button>
      <button type="button" data-page="showStaff">Staff</button>
      <button type="button" data-page="showAdmissions">Admissions</button>
      <button type="button" data-page="showFees">Fees & Payments</button>
      <button type="button" data-page="showResults">Results</button>
      <button type="button" data-page="showAssignments">Assignments</button>
      <button type="button" data-page="showAnnouncements">Announcements</button>
    `;
    status.after(hint);
    hint.after(nav);
    nav.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => setPortalPage(btn.dataset.page)));
  }

  if (![...document.body.classList].some((c) => c.startsWith("show"))) {
    setPortalPage("showDashboard");
  }
}

window.addEventListener("load", setupPortalPages);
new MutationObserver(setupPortalPages).observe(document.documentElement, { childList: true, subtree: true });
setInterval(setupPortalPages, 1200);
