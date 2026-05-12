function moduleTitleFromForm(form) {
  const h3 = form.querySelector("h3")?.textContent?.trim();
  if (h3) return h3;
  const text = (form.textContent || "").replace(/\s+/g, " ").trim();
  if (/create student/i.test(text)) return "Create Student";
  if (/create staff/i.test(text)) return "Create Staff Login";
  if (/upload school fee/i.test(text)) return "Upload School Fee";
  if (/record fee payment/i.test(text)) return "Record Fee Payment";
  if (/upload result|grade/i.test(text)) return "Upload Result/Grade";
  if (/publish announcement/i.test(text)) return "Publish Announcement";
  if (/send message/i.test(text)) return "Send Message";
  return "Open Module";
}

function moduleDescription(title) {
  const t = title.toLowerCase();
  if (t.includes("student")) return "Register and manage student profile details.";
  if (t.includes("staff")) return "Create staff login and class responsibility.";
  if (t.includes("school fee")) return "Create fee item for class, term and session.";
  if (t.includes("payment")) return "Record student payment and receipt reference.";
  if (t.includes("result") || t.includes("grade")) return "Upload academic score or result record.";
  if (t.includes("announcement")) return "Publish school notice to selected audience.";
  if (t.includes("message")) return "Send internal school portal message.";
  return "Open this school management module.";
}

function addAdminModuleStyles() {
  let style = document.getElementById("admin-module-toggle-css");
  if (!style) {
    style = document.createElement("style");
    style.id = "admin-module-toggle-css";
    document.head.appendChild(style);
  }
  style.textContent = `
    .adminModulePanel{grid-column:1/-1;background:#fff;border:1px solid #bfdbfe;border-radius:26px;padding:24px;margin:0 0 24px;box-shadow:0 22px 60px rgba(15,23,42,.08)}
    .adminModuleHeader{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;border-bottom:1px solid #e2e8f0;padding-bottom:16px;margin-bottom:18px}
    .adminModuleHeader h3{margin:0;font-size:1.55rem;color:#0f172a;letter-spacing:-.04em}.adminModuleHeader p{margin:6px 0 0;color:#64748b;line-height:1.5}
    .adminModuleGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.adminModuleCard{border:0;background:linear-gradient(135deg,#020617,#1d4ed8);color:#fff;border-radius:20px;padding:20px;text-align:left;cursor:pointer;min-height:120px;box-shadow:0 16px 40px rgba(29,78,216,.16);transition:.2s ease}.adminModuleCard:hover{transform:translateY(-4px)}.adminModuleCard strong{display:block;font-size:1.05rem;margin-bottom:10px}.adminModuleCard span{display:block;color:#dbeafe;line-height:1.45;font-size:.9rem}.adminModuleCard.recordCard{background:linear-gradient(135deg,#064e3b,#0891b2)}
    .adminManagedForm{display:none!important}.adminManagedForm.activeModuleForm{display:grid!important;grid-column:1/-1!important;animation:modulePop .2s ease-out}.moduleCloseBar{display:none}.activeModuleForm .moduleCloseBar{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#020617;color:white;border-radius:16px;padding:14px 16px;margin-bottom:10px}.activeModuleForm .moduleCloseBar strong{font-size:1.05rem}.activeModuleForm .moduleCloseBar button{background:#38bdf8!important;color:#082f49!important;border:0!important;border-radius:10px!important;padding:9px 13px!important;font-weight:900!important;cursor:pointer!important}
    @keyframes modulePop{from{opacity:.3;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @media(max-width:900px){.adminModuleGrid{grid-template-columns:repeat(2,1fr)}.adminModulePanel{padding:16px;border-radius:20px}.adminModuleHeader{display:block}.adminModuleCard{min-height:110px;padding:16px}}
    @media(max-width:560px){.adminModuleGrid{grid-template-columns:1fr}.adminModuleCard{min-height:auto}.adminModuleHeader h3{font-size:1.3rem}}
  `;
}

function setupAdminModules() {
  addAdminModuleStyles();
  const adminSection = document.querySelector("#admin");
  if (!adminSection) return;
  const statusCard = adminSection.querySelector(".apiStatusCard");
  if (!statusCard) return;

  const adminGrids = [...adminSection.querySelectorAll(".adminGrid")];
  const forms = adminGrids.flatMap((grid) => [...grid.querySelectorAll(":scope > form.formCard")]);
  if (!forms.length) return;

  if (!document.querySelector(".adminModulePanel")) {
    const panel = document.createElement("section");
    panel.className = "adminModulePanel";
    panel.innerHTML = `
      <div class="adminModuleHeader">
        <div><h3>Admin Work Modules</h3><p>Open only the section you want to work on. Records stay available below for viewing and modification.</p></div>
      </div>
      <div class="adminModuleGrid">
        <button type="button" class="adminModuleCard recordCard" data-records="true"><strong>View Created Records</strong><span>See students, staff, fees, payments, results, admissions, assignments and announcements.</span></button>
      </div>
    `;
    statusCard.after(panel);

    panel.querySelector('[data-records="true"]').onclick = () => {
      document.querySelector("#records")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  const grid = document.querySelector(".adminModuleGrid");
  forms.forEach((form, index) => {
    const title = moduleTitleFromForm(form);
    form.classList.add("adminManagedForm");
    form.dataset.moduleIndex = String(index);

    if (!form.querySelector(".moduleCloseBar")) {
      const close = document.createElement("div");
      close.className = "moduleCloseBar";
      close.innerHTML = `<strong>${title}</strong><button type="button">Close</button>`;
      close.querySelector("button").onclick = () => form.classList.remove("activeModuleForm");
      form.prepend(close);
    }

    if (!grid.querySelector(`[data-open-module="${index}"]`)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "adminModuleCard";
      button.dataset.openModule = String(index);
      button.innerHTML = `<strong>${title}</strong><span>${moduleDescription(title)}</span>`;
      button.onclick = () => {
        forms.forEach((f) => f.classList.remove("activeModuleForm"));
        form.classList.add("activeModuleForm");
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      grid.appendChild(button);
    }
  });
}

window.addEventListener("load", setupAdminModules);
new MutationObserver(setupAdminModules).observe(document.documentElement, { childList: true, subtree: true });
setInterval(setupAdminModules, 1000);
