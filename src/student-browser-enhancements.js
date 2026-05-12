const JSS_SUBJECTS = ["Mathematics", "English Language", "Basic Science", "Basic Technology", "Social Studies", "Civic Education", "Business Studies", "Computer Studies", "Agricultural Science", "Christian Religious Studies", "Physical and Health Education", "Creative Arts"];
const SS_SUBJECTS = ["Mathematics", "English Language", "Physics", "Chemistry", "Biology", "Economics", "Government", "Literature in English", "Commerce", "Accounting", "Geography", "Civic Education", "Computer Studies", "Agricultural Science"];

function addStudentBrowserStyles() {
  if (document.getElementById("student-browser-css")) return;
  const style = document.createElement("style");
  style.id = "student-browser-css";
  style.textContent = `
    .publicHost .publicSchoolSite{display:grid!important;grid-template-columns:250px minmax(0,1fr);align-items:start;max-width:1280px!important;gap:22px!important}.publicSideNav{position:sticky;top:20px;background:#020617;color:#e0f2fe;border-radius:24px;padding:18px;box-shadow:0 24px 65px rgba(15,23,42,.18)}.publicSideNav strong{display:block;color:white;margin-bottom:12px;font-size:1.05rem}.publicSideNav a{display:block;padding:11px 12px;border-radius:12px;color:#dbeafe;font-weight:800}.publicSideNav a:hover{background:#1d4ed8;color:white}.publicSiteMain{display:grid;gap:22px}.publicHost .publicHeroCards,.publicHost .publicSection{grid-column:auto!important}.publicHost .publicHeroCards{grid-template-columns:repeat(3,1fr)}
    .rawClassRecordsHidden .classSection{display:none!important}.rawClassRecordsHidden #records .classSection{display:none!important}.rawClassRecordsHidden .classGrid{display:none!important}
    .portalStudentBrowser{grid-column:1/-1;background:#fff;border:1px solid #bfdbfe;border-radius:28px;padding:24px;box-shadow:0 22px 60px rgba(15,23,42,.08);display:grid;gap:18px}.portalStudentBrowser h3{margin:0;color:#0f172a;font-size:1.5rem}.studentBrowserTop{display:flex;gap:12px;flex-wrap:wrap;align-items:center}.studentBrowserTop input,.studentBrowserTop select{border:1px solid #cbd5e1;background:#f8fafc;border-radius:12px;padding:12px 14px;font:inherit;min-width:180px}.studentClassTabs{display:flex;gap:10px;flex-wrap:wrap}.studentClassTabs button{border:0;background:#e0f2fe;color:#075985;border-radius:999px;padding:10px 14px;font-weight:900;cursor:pointer}.studentClassTabs button.active{background:#020617;color:white}.studentListGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.studentMiniCard{border:1px solid #e2e8f0;background:#f8fafc;border-radius:18px;padding:16px;text-align:left;cursor:pointer}.studentMiniCard strong{display:block;color:#0f172a;margin-bottom:6px}.studentMiniCard span{display:block;color:#64748b;font-size:.9rem;line-height:1.5}.studentDetailGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.studentDetailGrid div{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px}.studentDetailActions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}.studentDetailActions button{border:0;background:#1d4ed8;color:white;border-radius:12px;padding:11px 14px;font-weight:900;cursor:pointer}.subjectPickerBox{border:1px solid #cbd5e1;background:#fff;border-radius:18px;padding:14px;display:grid;gap:10px;margin-top:12px}.subjectPickerGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.subjectPickerGrid label{display:flex;gap:8px;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:8px;color:#334155;font-size:.88rem}.studentAutoHint{background:#ecfdf5;border:1px solid #bbf7d0;color:#166534;border-radius:14px;padding:12px;font-weight:800}.studentExplorerModal{position:fixed;inset:0;background:rgba(2,6,23,.75);z-index:100000;overflow:auto;padding:26px}.studentExplorerModalInner{max-width:1100px;margin:auto;background:#fff;border-radius:24px;padding:22px;box-shadow:0 30px 90px rgba(0,0,0,.35)}.studentExplorerModalTop{display:flex;justify-content:space-between;align-items:center;background:#020617;color:white;border-radius:16px;padding:14px 16px;margin-bottom:16px}.studentExplorerModalTop h2{margin:0}.studentExplorerModalTop button{border:0;background:#38bdf8;color:#082f49;border-radius:10px;padding:9px 12px;font-weight:900;cursor:pointer}
    @media(max-width:900px){.publicHost .publicSchoolSite{grid-template-columns:1fr}.publicSideNav{position:relative;top:auto}.studentListGrid,.studentDetailGrid,.subjectPickerGrid{grid-template-columns:1fr 1fr}}
    @media(max-width:640px){.studentListGrid,.studentDetailGrid,.subjectPickerGrid,.publicHost .publicHeroCards{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function compactPublicSite() {
  const site = document.querySelector(".publicSchoolSite");
  if (!site || site.dataset.compact === "true") return;
  site.dataset.compact = "true";
  const nav = document.createElement("aside");
  nav.className = "publicSideNav";
  nav.innerHTML = `<strong>School Menu</strong><a href="#home">Home</a><a href="#about">About</a><a href="#news">News</a><a href="#gallery">Gallery</a><a href="#admission-public">Admission</a><a href="#contact">Contact</a>`;
  const main = document.createElement("div");
  main.className = "publicSiteMain";
  [...site.children].forEach((child) => main.appendChild(child));
  site.appendChild(nav);
  site.appendChild(main);
}

function parseStudentsFromDom() {
  const students = [];
  document.querySelectorAll(".classSection .record, #records .record").forEach((record, index) => {
    const text = (record.textContent || "").replace(/\s+/g, " ").trim();
    if (!text || !/(JSS\d|SS\d)/i.test(text)) return;
    const name = record.querySelector("strong")?.textContent?.replace(/^👤\s*/, "").trim() || text.split(" ")[0] || `Student ${index + 1}`;
    const className = text.match(/JSS\d|SS\d/i)?.[0]?.toUpperCase() || "JSS1";
    const gender = text.match(/\b(Male|Female)\b/i)?.[0] || "";
    const age = text.match(/Age\s*(\d+)/i)?.[1] || "";
    const genotype = text.match(/Genotype\s*([A-Z]+)/i)?.[1] || "";
    const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
    const parent = text.match(/Parent:\s*([^•]+?)(Address:|Subjects:|$)/i)?.[1]?.trim() || "";
    const address = text.match(/Address:\s*([^•]+?)(Subjects:|$)/i)?.[1]?.trim() || "";
    const subjects = text.match(/Subjects:\s*(.+)$/i)?.[1]?.trim() || "";
    students.push({ id: `${className}-${name}-${index}`, name, className, gender, age, genotype, email, parent, address, subjects, raw: text });
  });
  return students;
}

function createStudentBrowser() {
  const actions = document.querySelector(".portalWorkActions") || document.querySelector(".adminActionGrid");
  if (!actions || document.querySelector(".portalStudentBrowser")) return;
  document.body.classList.add("rawClassRecordsHidden");

  const browser = document.createElement("section");
  browser.className = "portalStudentBrowser";
  browser.innerHTML = `
    <h3>Student Records</h3>
    <p class="studentAutoHint">Click Student → choose class → click a name. The raw class list is hidden; details open cleanly in a popup.</p>
    <div class="studentBrowserTop"><input placeholder="Search student name e.g. Mary John"><select><option value="ALL">All Classes</option><option>JSS1</option><option>JSS2</option><option>JSS3</option><option>SS1</option><option>SS2</option><option>SS3</option></select></div>
    <div class="studentClassTabs"><button data-class="ALL" class="active">All</button><button data-class="JSS1">JSS1</button><button data-class="JSS2">JSS2</button><button data-class="JSS3">JSS3</button><button data-class="SS1">SS1</button><button data-class="SS2">SS2</button><button data-class="SS3">SS3</button></div>
    <div class="studentListGrid"></div>
  `;
  actions.before(browser);

  const input = browser.querySelector("input");
  const select = browser.querySelector("select");
  const list = browser.querySelector(".studentListGrid");
  let activeClass = "ALL";

  function render() {
    document.body.classList.add("rawClassRecordsHidden");
    const q = input.value.toLowerCase().trim();
    const classFilter = select.value === "ALL" ? activeClass : select.value;
    const students = parseStudentsFromDom().filter((student) => {
      const classOk = classFilter === "ALL" || student.className === classFilter;
      const qOk = !q || student.name.toLowerCase().includes(q) || student.email.toLowerCase().includes(q);
      return classOk && qOk;
    });
    list.innerHTML = students.length ? "" : `<div class="studentMiniCard"><strong>No student found</strong><span>Create or refresh student records first.</span></div>`;
    students.forEach((student) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "studentMiniCard";
      card.innerHTML = `<strong>${student.name}</strong><span>${student.className} ${student.gender ? "• " + student.gender : ""} ${student.age ? "• Age " + student.age : ""}</span><span>${student.email || "No email"}</span>`;
      card.onclick = () => showStudentModal(student);
      list.appendChild(card);
    });
  }

  function showStudentModal(student) {
    document.querySelector(".studentExplorerModal")?.remove();
    const overlay = document.createElement("div");
    overlay.className = "studentExplorerModal";
    overlay.innerHTML = `
      <div class="studentExplorerModalInner">
        <div class="studentExplorerModalTop"><h2>${student.name}</h2><button type="button">Close</button></div>
        <div class="studentDetailGrid">
          <div><b>Class</b><br>${student.className}</div><div><b>Gender</b><br>${student.gender || "-"}</div><div><b>Age</b><br>${student.age || "-"}</div>
          <div><b>Genotype</b><br>${student.genotype || "-"}</div><div><b>Email</b><br>${student.email || "-"}</div><div><b>Parent</b><br>${student.parent || "-"}</div>
          <div><b>Address</b><br>${student.address || "-"}</div><div><b>Subjects</b><br>${student.subjects || "-"}</div><div><b>Record ID</b><br>${student.id}</div>
        </div>
        <div class="subjectPickerBox"><b>Subject Section for ${student.className}</b><div class="subjectPickerGrid">${(student.className.startsWith("SS") ? SS_SUBJECTS : JSS_SUBJECTS).map((s) => `<label><input type="checkbox" value="${s}"> ${s}</label>`).join("")}</div></div>
        <div class="studentDetailActions"><button data-action="result">Compile Result</button><button data-action="scoresheet">Score Sheet</button></div>
      </div>`;
    overlay.querySelector(".studentExplorerModalTop button").onclick = () => overlay.remove();
    overlay.querySelector('[data-action="result"]').onclick = () => autofillResult(student);
    document.body.appendChild(overlay);
  }

  function autofillResult(student) {
    const resultForm = [...document.querySelectorAll(".formCard")].find((form) => /upload result|result for my class/i.test(form.textContent || ""));
    if (!resultForm) return alert("Result form not found. Refresh and try again.");
    const actionCard = [...document.querySelectorAll(".portalActionCard")].find((btn) => /upload result/i.test(btn.textContent || ""));
    if (actionCard) actionCard.click();
    setTimeout(() => {
      const modal = document.querySelector(".portalModalOverlay") || document;
      const set = (key, value) => setVal(modal.querySelector(`[data-rs="${key}"]`), value);
      set("name", student.name);
      set("gender", student.gender || "Male");
      set("age", student.age || "");
      set("className", student.className);
      set("reg", student.id);
      set("studentEmail", student.email || "");
      const rows = modal.querySelectorAll("tr[data-row]");
      const subjectList = student.className.startsWith("SS") ? SS_SUBJECTS : JSS_SUBJECTS;
      rows.forEach((row, idx) => {
        const subject = row.querySelector(".rs-subject");
        if (subject && subjectList[idx]) subject.value = subjectList[idx];
      });
      modal.querySelector(".exactResultBuilder")?.dispatchEvent(new Event("input", { bubbles: true }));
    }, 250);
  }

  browser.querySelectorAll(".studentClassTabs button").forEach((btn) => {
    btn.onclick = () => {
      browser.querySelectorAll(".studentClassTabs button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeClass = btn.dataset.class;
      select.value = "ALL";
      render();
    };
  });
  input.oninput = render;
  select.onchange = render;
  render();
  setInterval(render, 5000);
}

function runStudentBrowserEnhancements() {
  addStudentBrowserStyles();
  compactPublicSite();
  createStudentBrowser();
}

new MutationObserver(runStudentBrowserEnhancements).observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("load", runStudentBrowserEnhancements);
setInterval(runStudentBrowserEnhancements, 1200);
