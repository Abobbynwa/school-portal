const RESULT_API_BASE = "https://school-backend-rkq3.onrender.com";
const SCHOOL_CLASSES = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const TERMS = ["First Term", "Second Term", "Third Term"];
const GENDERS = ["Male", "Female"];
const DEPARTMENTS = ["General", "Science", "Art", "Commercial"];

const SUBJECTS = {
  JSS: [
    "Social Studies",
    "English Language",
    "Mathematics",
    "Basic Science",
    "Basic Technology",
    "Agricultural Science",
    "Physical and Health Education",
    "Civic Education",
    "Computer Studies",
    "Religious Studies",
    "Home Economics",
  ],
  Science: [
    "English Language",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Further Mathematics",
    "Computer Studies",
    "Civic Education",
    "Agricultural Science",
  ],
  Art: [
    "English Language",
    "Mathematics",
    "Literature in English",
    "Government",
    "Christian Religious Studies",
    "History",
    "Civic Education",
    "Economics",
    "Visual Arts",
  ],
  Commercial: [
    "English Language",
    "Mathematics",
    "Economics",
    "Commerce",
    "Financial Accounting",
    "Business Studies",
    "Office Practice",
    "Civic Education",
    "Computer Studies",
  ],
};

function token() {
  return localStorage.getItem("school_token") || "";
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem("school_user") || "{}");
  } catch {
    return {};
  }
}

async function apiFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token()) headers.Authorization = `Bearer ${token()}`;
  const response = await fetch(`${RESULT_API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed: ${path}`);
  return data;
}

function addResultDbStyles() {
  let style = document.getElementById("result-db-builder-css");
  if (!style) {
    style = document.createElement("style");
    style.id = "result-db-builder-css";
    document.head.appendChild(style);
  }

  style.textContent = `
    .enhancedResultForm > select,
    .enhancedResultForm > input,
    .enhancedResultForm > button:not(.resultCloseBtn),
    .enhancedResultForm > textarea{display:none!important}
    .dbResultBuilder{display:grid;gap:14px;background:#fff;border:2px solid #0f172a;border-radius:18px;padding:16px;margin-top:12px;grid-column:1/-1;overflow:hidden}
    .dbResultTop{display:flex;justify-content:space-between;align-items:center;gap:12px;background:#020617;color:white;border-radius:14px;padding:14px 16px}.dbResultTop h3{margin:0;font-size:1.05rem;letter-spacing:.04em;text-transform:uppercase}.dbResultTop span{font-size:.88rem;color:#dbeafe}.dbResultStatus{background:#ecfdf5;color:#166534;border:1px solid #bbf7d0;border-radius:12px;padding:11px 13px;font-weight:800;line-height:1.45}.dbResultGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.dbResultGrid input,.dbResultGrid select{width:100%;border:1px solid #94a3b8;background:white;border-radius:9px;padding:10px;font:inherit}.dbResultGrid label{display:grid;gap:6px;color:#334155;font-weight:800;font-size:.83rem}.dbTableWrap{overflow-x:auto;border:1px solid #111;background:white;border-radius:8px}.dbScoreTable{width:100%;min-width:980px;border-collapse:collapse;font-size:12px;color:#111;background:white}.dbScoreTable th,.dbScoreTable td{border:1px solid #111;padding:5px;text-align:center}.dbScoreTable th{background:#e5e7eb;font-weight:900}.dbScoreTable td:nth-child(2),.dbScoreTable th:nth-child(2){text-align:left}.dbScoreTable input{width:100%;border:0;background:transparent;text-align:center;font:inherit;padding:4px;outline:0}.dbScoreTable .subjectInput{text-align:left}.dbResultActions{display:flex;flex-wrap:wrap;gap:10px}.dbResultActions button{border:0;border-radius:11px;padding:11px 14px;font-weight:900;cursor:pointer;background:#020617;color:white}.dbResultActions button.primary{background:#16a34a}.dbResultActions button.blue{background:#1d4ed8}.dbResultActions button.orange{background:#7c2d12}.dbResultActions button:disabled{opacity:.55;cursor:not-allowed}

    .resultSlipOverlay{position:fixed;inset:0;background:rgba(2,6,23,.82);z-index:100000;padding:22px;overflow:auto}.resultSlipModal{max-width:1000px;margin:0 auto;background:white;border-radius:16px;padding:16px;box-shadow:0 30px 90px rgba(0,0,0,.35)}.resultSlipTop{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}.resultSlipTop h2{margin:0;color:#0f172a}.resultSlipTop button,.resultSlipBtns button{border:0;background:#020617;color:white;border-radius:10px;padding:10px 14px;font-weight:900;cursor:pointer}.resultSlipBtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
    .exactSchoolSlip{background:white;color:#111;width:920px;margin:0 auto;padding:12px;border:2px solid #111;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.22}.exactSchoolSlip *{box-shadow:none!important}.slipDate{display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px}.slipHeader{display:grid;grid-template-columns:70px 1fr 70px;align-items:center;text-align:center;margin-bottom:5px}.slipLogo{width:58px;height:58px;border:1px solid #111;display:flex;align-items:center;justify-content:center;font-size:9px;margin:auto}.slipHeader h1{font-size:15px;margin:0;text-transform:uppercase}.slipHeader p{margin:2px 0;font-size:10px}.slipBio{display:grid;grid-template-columns:1.1fr 90px 1.1fr;border:1px solid #111;margin-bottom:5px}.slipBioLeft,.slipBioRight{display:grid;grid-template-columns:1fr 1fr}.slipBioLeft div,.slipBioRight div{border:1px solid #111;padding:4px}.passportBox{border:1px solid #111;display:flex;align-items:center;justify-content:center;text-align:center;font-size:9px;background:#e0f2fe}.slipTable{width:100%;border-collapse:collapse;margin-bottom:5px}.slipTable th,.slipTable td{border:1px solid #111;padding:4px;text-align:center}.slipTable th{background:#e5e7eb}.slipTable td:nth-child(2),.slipTable th:nth-child(2){text-align:left}.slipLower{display:grid;grid-template-columns:.8fr 1.1fr 1.1fr;border:1px solid #111;margin-bottom:5px}.slipLower>div{border:1px solid #111;padding:4px}.slipLower h3{font-size:11px;text-align:center;text-decoration:underline;margin:0 0 4px}.slipLower p{margin:2px 0;display:flex;justify-content:space-between}.commentLine{display:grid;grid-template-columns:150px 1fr;border-bottom:1px solid #111;margin:8px 0 0}.commentLine span{padding:4px}.signatureGrid{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:28px}.signatureGrid div{border-top:1px solid #111;text-align:center;padding-top:4px}.nextTerm{border:1px solid #111;padding:5px;text-align:center;margin-top:8px}.smallFoot{text-align:center;font-size:9px;margin-top:3px}
    @media(max-width:760px){.dbResultGrid{grid-template-columns:1fr}.dbResultBuilder{padding:10px;border-radius:14px}.dbResultTop{display:block}.resultSlipOverlay{padding:8px}.resultSlipModal{padding:10px;overflow-x:auto}.exactSchoolSlip{transform:scale(.36);transform-origin:top left;margin-bottom:-520px}.dbResultActions button,.resultSlipBtns button{width:100%}}
    @media print{body>*:not(.resultSlipOverlay){display:none!important}.resultSlipOverlay{position:static!important;background:white!important;padding:0!important}.resultSlipModal{box-shadow:none!important;padding:0!important}.resultSlipTop,.resultSlipBtns{display:none!important}.exactSchoolSlip{transform:none!important;width:100%!important;border:2px solid #111!important}}
  `;
}

function gradeRemark(total) {
  const score = Number(total || 0);
  if (score >= 70) return { grade: "A", remark: "Excellent" };
  if (score >= 60) return { grade: "B", remark: "Very Good" };
  if (score >= 50) return { grade: "C", remark: "Good" };
  if (score >= 45) return { grade: "D", remark: "Pass" };
  if (score >= 40) return { grade: "E", remark: "Fair" };
  return { grade: "F", remark: "Fail" };
}

function defaultSubjects(className, department) {
  const cls = String(className || "JSS1").toUpperCase();
  if (!cls.startsWith("SS")) return SUBJECTS.JSS;
  if (department === "Art") return SUBJECTS.Art;
  if (department === "Commercial") return SUBJECTS.Commercial;
  return SUBJECTS.Science;
}

function studentSubjects(student, className, department) {
  if (student && Array.isArray(student.subjects) && student.subjects.length) return student.subjects;
  return defaultSubjects(className, department);
}

async function loadStudentsForUser() {
  const user = currentUser();
  if (user.role === "staff") {
    try {
      const staffData = await apiFetch("/api/staff/my-students");
      return staffData.data || [];
    } catch {
      return [];
    }
  }
  const data = await apiFetch("/api/students");
  return data.data || [];
}

function field(builder, name) {
  return builder.querySelector(`[data-rb="${name}"]`);
}

function setField(builder, name, value) {
  const el = field(builder, name);
  if (!el) return;
  el.value = value ?? "";
}

function rowData(builder) {
  return [...builder.querySelectorAll("tbody tr")].map((row) => {
    const ca = Number(row.querySelector('[data-score="ca"]')?.value || 0);
    const mid = Number(row.querySelector('[data-score="mid"]')?.value || 0);
    const exam = Number(row.querySelector('[data-score="exam"]')?.value || 0);
    const total = ca + mid + exam;
    const { grade, remark } = gradeRemark(total);
    return {
      subject: row.querySelector(".subjectInput")?.value || "",
      ca,
      mid,
      exam,
      total,
      grade,
      remark,
      teacher: row.querySelector('[data-score="teacher"]')?.value || "",
    };
  });
}

function recalcRows(builder) {
  builder.querySelectorAll("tbody tr").forEach((row) => {
    const ca = Number(row.querySelector('[data-score="ca"]')?.value || 0);
    const mid = Number(row.querySelector('[data-score="mid"]')?.value || 0);
    const exam = Number(row.querySelector('[data-score="exam"]')?.value || 0);
    const total = ca + mid + exam;
    const { grade, remark } = gradeRemark(total);
    row.querySelector("[data-total]").textContent = String(total);
    row.querySelector("[data-grade]").textContent = grade;
    row.querySelector("[data-remark]").textContent = remark;
  });
}

function renderRows(builder, subjects) {
  const user = currentUser();
  const tbody = builder.querySelector("tbody");
  tbody.innerHTML = subjects.map((subject, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><input class="subjectInput" value="${subject}"></td>
      <td><input type="number" min="0" max="20" value="0" data-score="ca"></td>
      <td><input type="number" min="0" max="20" value="0" data-score="mid"></td>
      <td><input type="number" min="0" max="60" value="0" data-score="exam"></td>
      <td data-total>0</td>
      <td data-grade>F</td>
      <td data-remark>Fail</td>
      <td><input data-score="teacher" value="${user.name || ""}"></td>
    </tr>`).join("");
  recalcRows(builder);
}

function buildOptions(list, selected = "") {
  return list.map((item) => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("");
}

function slipHtml(state) {
  const rows = state.rows;
  const totalSubjects = rows.filter((r) => r.subject).length || 1;
  const grandTotal = rows.reduce((sum, row) => sum + Number(row.total || 0), 0);
  const average = (grandTotal / totalSubjects).toFixed(2);
  const resultSummary = average >= 70 ? "Excellent" : average >= 60 ? "Very Good" : average >= 50 ? "Good" : average >= 45 ? "Pass" : "Poor";
  return `
    <div class="exactSchoolSlip" id="exactSchoolSlip">
      <div class="slipDate"><span>${new Date().toLocaleDateString()}</span><span>Examination Result Slip</span></div>
      <div class="slipHeader">
        <div class="slipLogo">School<br/>Logo</div>
        <div>
          <h1>${state.schoolName}</h1>
          <p>${state.address}</p>
          <p>☎ ${state.phone} &nbsp;&nbsp; ✉ ${state.email}</p>
          <p><b>${state.term.toUpperCase()}, ${state.session} Academic Session Result</b></p>
        </div>
        <div class="slipLogo">Coat<br/>of Arms</div>
      </div>
      <div class="slipBio">
        <div class="slipBioLeft">
          <div><b>Name</b><br/>${state.studentName}</div><div><b>Gender</b><br/>${state.gender}</div>
          <div><b>Class</b><br/>${state.className}</div><div><b>Age</b><br/>${state.age || "-"}</div>
          <div><b>Reg. No.</b><br/>${state.regNo || "-"}</div><div><b>Roll No</b><br/>${state.rollNo || "-"}</div>
          <div style="grid-column:1/-1"><b>Email</b><br/>${state.studentEmail || "-"}</div>
        </div>
        <div class="passportBox">Student<br/>Passport</div>
        <div class="slipBioRight">
          <div><b>Position</b><br/>${state.position || "-"}</div><div><b>No. of Students</b><br/>${state.noStudents || "-"}</div>
          <div><b>Grand Total</b><br/>${grandTotal} / ${totalSubjects * 100}</div><div><b>Grade Point Average</b><br/>${average}</div>
          <div style="grid-column:1/-1"><b>Result Summary</b><br/>${resultSummary}</div>
        </div>
      </div>
      <table class="slipTable">
        <thead><tr><th>#</th><th>Subject</th><th>Continuous<br/>Assessment</th><th>Mid<br/>Term</th><th>Examination</th><th>Total<br/>Score</th><th>Grade</th><th>Grade Remark</th><th>Subject Teacher</th></tr></thead>
        <tbody>${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r.subject}</td><td>${r.ca}</td><td>${r.mid}</td><td>${r.exam}</td><td>${r.total}</td><td>${r.grade}</td><td>${r.remark}</td><td>${r.teacher}</td></tr>`).join("")}</tbody>
      </table>
      <div class="slipLower">
        <div><h3>Key to Grades</h3><p><span>70 - 100</span><b>A Excellent</b></p><p><span>60 - 69</span><b>B Very Good</b></p><p><span>50 - 59</span><b>C Good</b></p><p><span>45 - 49</span><b>D Pass</b></p><p><span>40 - 44</span><b>E Fair</b></p><p><span>0 - 39</span><b>F Fail</b></p></div>
        <div><h3>Affective Skills Assessment</h3><p><span>Punctuality</span><b>${state.punctuality}</b></p><p><span>Attentiveness</span><b>${state.attentiveness}</b></p><p><span>Neatness</span><b>${state.neatness}</b></p><p><span>Politeness</span><b>${state.politeness}</b></p><p><span>Relationship With Others</span><b>${state.relationship}</b></p></div>
        <div><h3>Psychomotor Skills Assessment</h3><p><span>Hand Writing</span><b>${state.handwriting}</b></p><p><span>Drawing and Painting</span><b>${state.drawing}</b></p><p><span>Speech / Verbal Fluency</span><b>${state.speech}</b></p><p><span>Processing Speed</span><b>${state.processing}</b></p><p><span>Sports and Games</span><b>${state.sports}</b></p></div>
      </div>
      <div class="commentLine"><span><b>Form Teacher's Comment:</b></span><span>${state.formTeacherComment}</span></div>
      <div class="commentLine"><span><b>Form Teacher:</b></span><span>${state.formTeacher}</span></div>
      <div class="commentLine"><span><b>Principal's Comment:</b></span><span>${state.principalComment}</span></div>
      <div class="signatureGrid"><div>Principal</div><div>Principal's Signature</div></div>
      <div class="nextTerm">Next Term Begins: <b>${state.nextTermBegins}</b></div>
      <div class="smallFoot">Printed by SchoolPortal</div>
    </div>`;
}

function builderState(builder) {
  const get = (name) => field(builder, name)?.value || "";
  return {
    schoolName: get("schoolName"), address: get("address"), phone: get("phone"), email: get("email"),
    studentId: get("studentId"), studentName: get("studentName"), gender: get("gender"), age: get("age"), className: get("className"), regNo: get("regNo"), rollNo: get("rollNo"), studentEmail: get("studentEmail"), position: get("position"), noStudents: get("noStudents"), department: get("department"), term: get("term"), session: get("session"),
    punctuality: get("punctuality"), attentiveness: get("attentiveness"), neatness: get("neatness"), politeness: get("politeness"), relationship: get("relationship"), handwriting: get("handwriting"), drawing: get("drawing"), speech: get("speech"), processing: get("processing"), sports: get("sports"), formTeacher: get("formTeacher"), nextTermBegins: get("nextTermBegins"), formTeacherComment: get("formTeacherComment"), principalComment: get("principalComment"), rows: rowData(builder),
  };
}

function openSlip(builder, autoDownload = false) {
  recalcRows(builder);
  document.querySelector(".resultSlipOverlay")?.remove();
  const state = builderState(builder);
  const overlay = document.createElement("div");
  overlay.className = "resultSlipOverlay";
  overlay.innerHTML = `<div class="resultSlipModal"><div class="resultSlipTop"><h2>Printable Result Slip</h2><button type="button">Close</button></div>${slipHtml(state)}<div class="resultSlipBtns"><button type="button" data-print>Print</button><button type="button" data-download>Download PDF</button></div></div>`;
  overlay.querySelector(".resultSlipTop button").onclick = () => overlay.remove();
  overlay.querySelector("[data-print]").onclick = () => window.print();
  overlay.querySelector("[data-download]").onclick = () => {
    const area = overlay.querySelector("#exactSchoolSlip");
    if (window.html2pdf) {
      window.html2pdf().set({ margin: 0.2, filename: `${state.studentName || "student"}-result-slip.pdf`, html2canvas: { scale: 2 }, jsPDF: { unit: "in", format: "a4", orientation: "portrait" } }).from(area).save();
    } else window.print();
  };
  document.body.appendChild(overlay);
  if (autoDownload) setTimeout(() => overlay.querySelector("[data-download]").click(), 150);
}

function updateStudent(builder, students) {
  const id = field(builder, "studentId")?.value;
  const student = students.find((s) => String(s.id) === String(id));
  const department = field(builder, "department")?.value || "General";
  const className = student?.class_name || field(builder, "className")?.value || "JSS1";
  if (student) {
    setField(builder, "studentName", student.name || "");
    setField(builder, "className", student.class_name || "JSS1");
    setField(builder, "gender", student.gender || "Male");
    setField(builder, "age", student.age || "");
    setField(builder, "regNo", student.admission_number || `STU-${student.id}`);
    setField(builder, "studentEmail", student.email || "");
  }
  renderRows(builder, studentSubjects(student, className, department));
}

async function saveResultToDb(builder) {
  const state = builderState(builder);
  if (!state.studentId) throw new Error("Select student from database first.");
  const endpoint = currentUser().role === "staff" ? "/api/staff/grades" : "/api/grades";
  const reportCardUrl = "";
  for (const row of state.rows.filter((r) => r.subject)) {
    await apiFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ studentId: state.studentId, subject: row.subject, score: row.total, term: state.term, reportCardUrl }),
    });
  }
}

function attachBuilder(form, students) {
  if (form.dataset.dbResultBuilder === "true") return;
  if (!/upload result|result\/grade|upload grade/i.test(form.textContent || "")) return;
  form.dataset.dbResultBuilder = "true";
  form.classList.add("enhancedResultForm");

  const user = currentUser();
  const builder = document.createElement("section");
  builder.className = "dbResultBuilder";
  builder.innerHTML = `
    <div class="dbResultTop"><div><h3>Database Connected Result Slip Builder</h3><span>Select a student and the system will load class, gender, admission number and subjects automatically.</span></div></div>
    <div class="dbResultStatus">Backend connected: ${students.length} student(s) loaded. Staff will only see assigned class students.</div>
    <div class="dbResultGrid">
      <label>Student from database<select data-rb="studentId"><option value="">Select student</option>${students.map((s) => `<option value="${s.id}">${s.name} - ${s.class_name} - ${s.gender || ""}</option>`).join("")}</select></label>
      <label>Class<select data-rb="className">${buildOptions(SCHOOL_CLASSES, "JSS1")}</select></label>
      <label>Gender<select data-rb="gender">${buildOptions(GENDERS, "Male")}</select></label>
      <label>Department<select data-rb="department">${buildOptions(DEPARTMENTS, "General")}</select></label>
      <label>Student name<input data-rb="studentName" placeholder="Student name"></label>
      <label>Age<input data-rb="age" placeholder="Age"></label>
      <label>Admission / Reg No.<input data-rb="regNo" placeholder="Reg No"></label>
      <label>Roll No<input data-rb="rollNo" placeholder="Roll No"></label>
      <label>Student email<input data-rb="studentEmail" placeholder="Email"></label>
      <label>Position<input data-rb="position" placeholder="Position"></label>
      <label>No. of students<input data-rb="noStudents" placeholder="No. in class"></label>
      <label>Term<select data-rb="term">${buildOptions(TERMS, "First Term")}</select></label>
      <label>Session<input data-rb="session" value="2025/2026"></label>
      <label>School name<input data-rb="schoolName" value="GLOBAL FOCUS INT'L SCHOOL OF ICT STUDIES"></label>
      <label>Address<input data-rb="address" value="Lagos State Nigeria"></label>
      <label>School email<input data-rb="email" value="info@schoolportal.com"></label>
      <label>Phone<input data-rb="phone" value="+234 805 6176 947"></label>
    </div>
    <div class="dbTableWrap"><table class="dbScoreTable"><thead><tr><th>#</th><th>Subject</th><th>Continuous<br>Assessment</th><th>Mid<br>Term</th><th>Examination</th><th>Total</th><th>Grade</th><th>Grade Remark</th><th>Subject Teacher</th></tr></thead><tbody></tbody></table></div>
    <div class="dbResultGrid">
      <label>Punctuality<input data-rb="punctuality" value="4"></label><label>Attentiveness<input data-rb="attentiveness" value="4"></label><label>Neatness<input data-rb="neatness" value="4"></label><label>Politeness<input data-rb="politeness" value="5"></label>
      <label>Relationship<input data-rb="relationship" value="4"></label><label>Hand Writing<input data-rb="handwriting" value="5"></label><label>Drawing/Painting<input data-rb="drawing" value="4"></label><label>Speech<input data-rb="speech" value="4"></label>
      <label>Processing Speed<input data-rb="processing" value="4"></label><label>Sports/Games<input data-rb="sports" value="4"></label><label>Form Teacher<input data-rb="formTeacher" value="${user.name || ""}"></label><label>Next Term Begins<input data-rb="nextTermBegins" value="Monday 7th January"></label>
      <label>Form Teacher Comment<input data-rb="formTeacherComment" value="Excellent Result! Keep it up."></label><label>Principal Comment<input data-rb="principalComment" value="Excellent!"></label>
    </div>
    <div class="dbResultActions"><button type="button" class="primary" data-action="save">Save Result to Database</button><button type="button" class="blue" data-action="preview">Preview Exact Slip</button><button type="button" class="orange" data-action="pdf">Download PDF</button><button type="button" data-action="reload">Reload Subjects</button></div>
  `;
  form.appendChild(builder);

  renderRows(builder, SUBJECTS.JSS);
  builder.addEventListener("input", () => recalcRows(builder));
  field(builder, "studentId").addEventListener("change", () => updateStudent(builder, students));
  field(builder, "className").addEventListener("change", () => renderRows(builder, defaultSubjects(field(builder, "className").value, field(builder, "department").value)));
  field(builder, "department").addEventListener("change", () => updateStudent(builder, students));
  builder.querySelector('[data-action="reload"]').onclick = () => updateStudent(builder, students);
  builder.querySelector('[data-action="preview"]').onclick = () => openSlip(builder, false);
  builder.querySelector('[data-action="pdf"]').onclick = () => openSlip(builder, true);
  builder.querySelector('[data-action="save"]').onclick = async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.textContent = "Saving...";
    try {
      await saveResultToDb(builder);
      alert("Result saved to database successfully. Click Refresh to view it in records.");
    } catch (err) {
      alert(`Result save failed: ${err.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = "Save Result to Database";
    }
  };
}

async function runResultDbBuilder() {
  addResultDbStyles();
  const forms = [...document.querySelectorAll("form.formCard")].filter((form) => /upload result|result\/grade|upload grade/i.test(form.textContent || ""));
  if (!forms.length || !token()) return;
  try {
    const students = await loadStudentsForUser();
    forms.forEach((form) => attachBuilder(form, students));
  } catch (err) {
    console.warn("Result DB builder failed", err.message);
  }
}

window.addEventListener("load", runResultDbBuilder);
new MutationObserver(runResultDbBuilder).observe(document.documentElement, { childList: true, subtree: true });
setInterval(runResultDbBuilder, 2000);
