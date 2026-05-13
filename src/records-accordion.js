function addRecordsAccordionCss() {
  let style = document.getElementById("records-accordion-css");
  if (!style) {
    style = document.createElement("style");
    style.id = "records-accordion-css";
    document.head.appendChild(style);
  }

  style.textContent = `
    #records .dataGrid{align-items:start!important}
    #records .dataCard.recordsBox{display:block!important;border:1px solid #dbeafe!important;border-radius:24px!important;padding:0!important;overflow:hidden!important;background:white!important;box-shadow:0 22px 55px rgba(15,23,42,.08)!important}
    #records .recordsBoxHead{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:14px!important;padding:18px 20px!important;background:linear-gradient(135deg,#020617,#1d4ed8)!important;color:white!important;cursor:pointer!important}
    #records .recordsBoxHead strong{font-size:1.08rem!important;letter-spacing:.01em!important}
    #records .recordsBoxHead span{background:rgba(255,255,255,.14)!important;border:1px solid rgba(255,255,255,.25)!important;border-radius:999px!important;padding:7px 11px!important;font-size:.82rem!important;font-weight:900!important;white-space:nowrap!important}
    #records .recordsBoxBody{display:none!important;padding:16px!important;max-height:520px!important;overflow:auto!important;background:#fff!important}
    #records .recordsBox.open .recordsBoxBody{display:block!important}
    #records .recordsSearch{width:100%!important;border:1px solid #cbd5e1!important;background:#f8fafc!important;border-radius:12px!important;padding:11px 13px!important;margin:0 0 12px!important;font:inherit!important}
    #records .recordsBoxBody .record{border:1px solid #e2e8f0!important;background:#f8fafc!important;border-radius:16px!important;padding:14px!important;margin-bottom:10px!important;display:grid!important;gap:7px!important}
    #records .recordsBoxBody .record strong{font-size:1rem!important;color:#0f172a!important}
    #records .recordsBoxBody .record span,#records .recordsBoxBody .record p{background:white!important;border:1px solid #e5e7eb!important;border-radius:10px!important;padding:8px 10px!important;display:block!important;color:#475569!important;word-break:break-word!important}
    #records .recordsBoxBody .record button{border:0!important;background:#020617!important;color:white!important;border-radius:10px!important;padding:9px 12px!important;font-weight:900!important;margin-right:6px!important;cursor:pointer!important}
    #records .recordsEmpty{padding:18px!important;background:#f8fafc!important;border:1px dashed #cbd5e1!important;border-radius:16px!important;color:#64748b!important;font-weight:800!important}
    #records .dataCard.recordsBox > h3{display:none!important}
    @media(max-width:800px){#records .recordsBoxHead{padding:15px!important}#records .recordsBoxHead{align-items:flex-start!important;flex-direction:column!important}#records .recordsBoxBody{max-height:460px!important;padding:12px!important}}
  `;
}

function recordCount(card) {
  const records = card.querySelectorAll(":scope .record");
  if (records.length) return records.length;
  const text = (card.textContent || "").trim();
  if (!text || /No .* yet|No notifications/i.test(text)) return 0;
  return 1;
}

function setupRecordsAccordion() {
  addRecordsAccordionCss();
  const recordsSection = document.querySelector("#records");
  if (!recordsSection) return;

  recordsSection.querySelectorAll(":scope .dataGrid > .dataCard").forEach((card, index) => {
    if (card.dataset.recordsAccordion === "true") return;
    card.dataset.recordsAccordion = "true";
    card.classList.add("recordsBox");

    const title = card.querySelector("h3")?.textContent?.trim() || `Record ${index + 1}`;
    const count = recordCount(card);

    const head = document.createElement("div");
    head.className = "recordsBoxHead";
    head.innerHTML = `<strong>${title}</strong><span>${count} ${count === 1 ? "record" : "records"}</span>`;

    const body = document.createElement("div");
    body.className = "recordsBoxBody";

    const search = document.createElement("input");
    search.className = "recordsSearch";
    search.placeholder = `Search ${title.toLowerCase()}...`;

    const children = [...card.childNodes];
    children.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "H3") return;
      body.appendChild(node);
    });

    if (!body.textContent.trim()) {
      const empty = document.createElement("div");
      empty.className = "recordsEmpty";
      empty.textContent = `No ${title.toLowerCase()} found yet.`;
      body.appendChild(empty);
    }

    body.prepend(search);
    card.appendChild(head);
    card.appendChild(body);

    head.addEventListener("click", () => {
      const wasOpen = card.classList.contains("open");
      recordsSection.querySelectorAll(".recordsBox.open").forEach((box) => box.classList.remove("open"));
      if (!wasOpen) card.classList.add("open");
    });

    search.addEventListener("input", () => {
      const q = search.value.toLowerCase().trim();
      const rows = body.querySelectorAll(".record");
      rows.forEach((row) => {
        row.style.display = !q || row.textContent.toLowerCase().includes(q) ? "grid" : "none";
      });
    });
  });
}

window.addEventListener("load", setupRecordsAccordion);
new MutationObserver(setupRecordsAccordion).observe(document.documentElement, { childList: true, subtree: true });
setInterval(setupRecordsAccordion, 1200);
