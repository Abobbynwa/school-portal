const PORTAL_SHELL = {
  page: "dashboard",
};

function addShellStyle() {
  let style = document.getElementById("portal-shell-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "portal-shell-style";
    document.head.appendChild(style);
  }

  style.textContent = `
    .portalShell{max-width:1180px;margin:0 auto 24px;background:#fff;border:1px solid #dbeafe;border-radius:26px;padding:18px;box-shadow:0 22px 60px rgba(15,23,42,.08)}
    .portalShellTop{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;margin-bottom:16px;border-bottom:1px solid #e2e8f0;padding-bottom:14px}
    .portalShellTop h3{margin:0;color:#0f172a;font-size:1.4rem;letter-spacing:-.04em}.portalShellTop p{margin:5px 0 0;color:#64748b;line-height:1.5}.portalShellTabs{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px}.portalShellTabs button{border:0;border-radius:14px;background:#e0f2fe;color:#075985;padding:11px 14px;font-weight:900;white-space:nowrap;cursor:pointer}.portalShellTabs button.active{background:#020617;color:white}.portalShellHint{background:#ecfdf5;color:#166534;border:1px solid #bbf7d0;border-radius:14px;padding:12px 14px;font-weight:800;margin-top:14px;line-height:1.5}

    body.portalShellReady #admin .classSection{display:none!important}
    body.portalShellReady #admin .adminGrid{display:none!important}
    body.portalShellReady #records{display:none!important}
    body.portalShellReady #records:target{display:none!important;position:relative!important;inset:auto!important;width:auto!important;height:auto!important;overflow:visible!important;background:#f4f7fb!important;z-index:1!important}
    body.portalShellReady.portalPage-dashboard #admin .adminGrid.shellFormsGrid{display:grid!important}
    body.portalShellReady.portalPage-students #admin .classSection{display:block!important}

    body.portalShellReady.portalPage-records #records,
    body.portalShellReady.portalPage-staff #records{display:block!important;position:relative!important;inset:auto!important;width:auto!important;height:auto!important;overflow:visible!important;background:#f4f7fb!important;padding:32px 0!important;max-width:1180px!important;margin:0 auto!important;z-index:1!important}
    body.portalShellReady.portalPage-records #records:before,
    body.portalShellReady.portalPage-staff #records:before{display:none!important;content:none!important}
    body.portalShellReady.portalPage-records #records .dataGrid,
    body.portalShellReady.portalPage-staff #records .dataGrid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;max-width:1180px!important;margin:0 auto!important}
    body.portalShellReady.portalPage-staff #records .dataCard:not(.staffOnlyBox){display:none!important}

    .shellFormsGrid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:20px!important}.shellFormsGrid .formCard{display:none!important}.shellFormsGrid .formCard.shellActiveForm{display:grid!important;grid-column:1/-1!important}.shellModuleCards{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.shellModuleCard{border:0;border-radius:20px;background:linear-gradient(135deg,#020617,#1d4ed8);color:white;text-align:left;padding:20px;cursor:pointer;min-height:110px;box-shadow:0 18px 42px rgba(29,78,216,.16)}.shellModuleCard strong{display:block;font-size:1.1rem;margin-bottom:8px}.shellModuleCard span{display:block;color:#dbeafe;line-height:1.5;font-size:.9rem}.shellClose{display:none}.shellActiveForm .shellClose{display:flex;justify-content:space-between;align-items:center;background:#020617;color:white;border-radius:14px;padding:12px 14px;margin-bottom:10px}.shellClose button{border:0!important;background:#38bdf8!important;color:#082f49!important;border-radius:10px!important;padding:8px 12px!important;font-weight:900!important}.dataCard.staffOnlyBox{display:block!important}.record{word-break:break-word}

    #records .dataCard.cleanRecordBox{padding:0!important;overflow:hidden!important;border-radius:24px!important;background:white!important;border:1px solid #dbeafe!important;box-shadow:0 20px 52px rgba(15,23,42,.08)!important}
    .cleanRecordHead{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:18px 20px;background:linear-gradient(135deg,#020617,#1d4ed8);color:white;cursor:pointer}
    .cleanRecordHead strong{font-size:1.08rem}.cleanRecordHead span{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:7px 11px;font-size:.82rem;font-weight:900;white-space:nowrap}
    .cleanRecordBody{display:none;padding:16px;max-height:470px;overflow:auto;background:white}
    .cleanRecordBox.open .cleanRecordBody{display:block}
    .cleanRecordBody>h3{display:none!important}.cleanSearch{width:100%;border:1px solid #cbd5e1;background:#f8fafc;border-radius:12px;padding:11px 13px;margin-bottom:12px;font:inherit}.cleanRecordBody .record{border:1px solid #e2e8f0!important;background:#f8fafc!important;border-radius:16px!important;padding:14px!important;margin-bottom:10px!important;display:grid!important;gap:8px!important}.cleanRecordBody .record strong{font-size:1rem!important}.cleanRecordBody .record span{background:white!important;border:1px solid #e5e7eb!important;border-radius:10px!important;padding:8px 10px!important}.cleanEmpty{background:#f8fafc;border:1px dashed #cbd5e1;border-radius:16px;padding:16px;color:#64748b;font-weight:800}

    @media(max-width:800px){.portalShellTop{display:block}.shellModuleCards{grid-template-columns:1fr}.shellFormsGrid{grid-template-columns:1fr!important}body.portalShellReady.portalPage-records #records .dataGrid,body.portalShellReady.portalPage-staff #records .dataGrid{grid-template-columns:1fr!important}.portalShell{margin:0 12px 18px;padding:14px;border-radius:20px}.portalShellTabs button{font-size:.85rem;padding:10px 12px}.cleanRecordHead{align-items:flex-start;flex-direction:column;padding:15px}.cleanRecordBody{max-height:430px;padding:12px}}
  `;
}

function formTitle(form) {
  const title = form.querySelector("h3")?.textContent?.trim();
  return title || "Open Module";
}

function describe(title) {
  const t = title.toLowerCase();
  if (t.includes("student")) return "Create student record and class profile.";
  if (t.includes("staff")) return "Register staff login and assigned class.";
  if (t.includes("fee payment")) return "Record payment made by a student.";
  if (t.includes("school fee")) return "Create fee item for class and term.";
  if (t.includes("result") || t.includes("grade")) return "Upload result or report card record.";
  if (t.includes("announcement")) return "Publish school announcement.";
  if (t.includes("message")) return "Send portal message.";
  return "Open this module.";
}

function getAdminGrids(admin) {
  return [...admin.querySelectorAll(":scope > .adminGrid")];
}

function countRecords(card) {
  const records = card.querySelectorAll(".record");
  if (records.length) return records.length;
  const text = (card.textContent || "").trim();
  if (!text || /No .* yet|No notifications/i.test(text)) return 0;
  return 1;
}

function cleanRecordsView() {
  const records = document.querySelector("#records");
  if (!records) return;

  records.querySelectorAll(":scope .dataGrid > .dataCard").forEach((card) => {
    if (card.dataset.cleanedRecord === "true") return;
    card.dataset.cleanedRecord = "true";
    card.classList.add("cleanRecordBox");

    const title = card.querySelector("h3")?.textContent?.trim() || "Saved Records";
    if (title.toLowerCase().includes("staff")) card.classList.add("staffOnlyBox");

    const head = document.createElement("div");
    head.className = "cleanRecordHead";
    head.innerHTML = `<strong>${title}</strong><span>${countRecords(card)} record(s)</span>`;

    const body = document.createElement("div");
    body.className = "cleanRecordBody";

    const search = document.createElement("input");
    search.className = "cleanSearch";
    search.placeholder = `Search ${title.toLowerCase()}...`;

    [...card.childNodes].forEach((node) => body.appendChild(node));
    body.prepend(search);

    if (!body.textContent.trim()) {
      const empty = document.createElement("div");
      empty.className = "cleanEmpty";
      empty.textContent = `No ${title.toLowerCase()} saved yet.`;
      body.appendChild(empty);
    }

    card.appendChild(head);
    card.appendChild(body);

    head.addEventListener("click", () => {
      const wasOpen = card.classList.contains("open");
      records.querySelectorAll(".cleanRecordBox.open").forEach((box) => box.classList.remove("open"));
      if (!wasOpen) card.classList.add("open");
    });

    search.addEventListener("input", () => {
      const q = search.value.toLowerCase().trim();
      body.querySelectorAll(".record").forEach((row) => {
        row.style.display = !q || row.textContent.toLowerCase().includes(q) ? "grid" : "none";
      });
    });
  });
}

function setupShell() {
  try {
    addShellStyle();
    const admin = document.querySelector("#admin");
    const status = admin?.querySelector(".apiStatusCard");
    if (!admin || !status) return;
    document.body.classList.add("portalShellReady");

    if (!document.querySelector(".portalShell")) {
      const shell = document.createElement("section");
      shell.className = "portalShell";
      shell.innerHTML = `
        <div class="portalShellTop"><div><h3>Admin Portal</h3><p>Clean dashboard for creating, viewing and managing school records.</p></div></div>
        <div class="portalShellTabs">
          <button type="button" data-page="dashboard" class="active">Dashboard / Work Modules</button>
          <button type="button" data-page="students">Students by Class</button>
          <button type="button" data-page="records">All Saved Records</button>
          <button type="button" data-page="staff">Staff Records</button>
        </div>
        <div class="portalShellHint">Open one module at a time. Student and staff records stay inside clean collapsible boxes.</div>
      `;
      status.after(shell);
      shell.querySelectorAll("button[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => setShellPage(btn.dataset.page));
      });
    }

    const adminGrids = getAdminGrids(admin);
    const formsGrid = adminGrids.find((grid) => grid.querySelector("form.formCard"));
    if (formsGrid) {
      formsGrid.classList.add("shellFormsGrid");
      const forms = [...formsGrid.querySelectorAll(":scope > form.formCard")];
      let cards = formsGrid.querySelector(".shellModuleCards");
      if (!cards) {
        cards = document.createElement("div");
        cards.className = "shellModuleCards";
        formsGrid.prepend(cards);
      }
      forms.forEach((form, i) => {
        const title = formTitle(form);
        if (!form.querySelector(".shellClose")) {
          const close = document.createElement("div");
          close.className = "shellClose";
          close.innerHTML = `<strong>${title}</strong><button type="button">Close</button>`;
          close.querySelector("button").addEventListener("click", () => form.classList.remove("shellActiveForm"));
          form.prepend(close);
        }
        if (!cards.querySelector(`[data-form-index="${i}"]`)) {
          const card = document.createElement("button");
          card.type = "button";
          card.className = "shellModuleCard";
          card.dataset.formIndex = String(i);
          card.innerHTML = `<strong>${title}</strong><span>${describe(title)}</span>`;
          card.addEventListener("click", () => {
            forms.forEach((f) => f.classList.remove("shellActiveForm"));
            form.classList.add("shellActiveForm");
            form.scrollIntoView({ behavior: "smooth", block: "start" });
          });
          cards.appendChild(card);
        }
      });
    }

    cleanRecordsView();

    if (!document.body.className.includes("portalPage-")) setShellPage("dashboard");
  } catch (e) {
    console.warn("portal shell skipped", e.message);
  }
}

function setShellPage(page) {
  ["dashboard", "students", "records", "staff"].forEach((p) => document.body.classList.remove(`portalPage-${p}`));
  document.body.classList.add(`portalPage-${page}`);
  document.querySelectorAll(".portalShellTabs button").forEach((btn) => btn.classList.toggle("active", btn.dataset.page === page));
  if (page === "dashboard") document.querySelector("#admin")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (page !== "dashboard") document.querySelector(page === "students" ? ".classSection" : "#records")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener("load", setupShell);
new MutationObserver(setupShell).observe(document.documentElement, { childList: true, subtree: true });
setInterval(setupShell, 1200);
