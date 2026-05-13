const juniorSubjects = ["Social Studies","English Language","Mathematics","Basic Science","Basic Technology","Agricultural Science","Physical and Health Education","Civic Education","Computer Studies","Religious Studies","Home Economics"];
const scienceSubjects = ["English Language","Mathematics","Physics","Chemistry","Biology","Further Mathematics","Computer Studies","Civic Education","Agricultural Science"];
const artSubjects = ["English Language","Mathematics","Literature in English","Government","Christian Religious Studies","History","Civic Education","Economics","Visual Arts"];
const commercialSubjects = ["English Language","Mathematics","Economics","Commerce","Financial Accounting","Business Studies","Office Practice","Civic Education","Computer Studies"];

function calcGrade(total){
  total = Number(total || 0);
  if(total >= 70) return ["A","Excellent"];
  if(total >= 60) return ["B","Very Good"];
  if(total >= 50) return ["C","Good"];
  if(total >= 45) return ["D","Pass"];
  if(total >= 40) return ["E","Fair"];
  return ["F","Fail"];
}

function addResultSlipCss(){
  if(document.getElementById("result-slip-builder-css")) return;
  const css = document.createElement("style");
  css.id = "result-slip-builder-css";
  css.textContent = `
    .rsBuilder{border:2px solid #111;background:white;border-radius:16px;padding:14px;margin-top:14px;display:grid;gap:12px}.rsBuilder h3{margin:0;background:#020617;color:white;text-align:center;border-radius:12px;padding:12px;text-transform:uppercase;letter-spacing:.04em}.rsGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.rsGrid input,.rsGrid select{border:1px solid #94a3b8;border-radius:8px;padding:9px;background:white}.rsTableWrap{overflow-x:auto;border:1px solid #111}.rsTable{width:100%;min-width:900px;border-collapse:collapse;font-size:12px}.rsTable th,.rsTable td{border:1px solid #111;padding:5px;text-align:center}.rsTable th{background:#e5e7eb}.rsTable td:nth-child(2){text-align:left}.rsTable input{width:100%;border:0;background:transparent;text-align:center}.rsTable .subject{text-align:left}.rsActions{display:flex;gap:10px;flex-wrap:wrap}.rsActions button{border:0;border-radius:10px;background:#020617;color:white;padding:11px 14px;font-weight:900;cursor:pointer}.rsActions button:nth-child(2){background:#2563eb}.rsActions button:nth-child(3){background:#16a34a}.rsOverlay{position:fixed;inset:0;background:rgba(2,6,23,.78);z-index:100000;overflow:auto;padding:20px}.rsModal{background:white;max-width:980px;margin:auto;border-radius:14px;padding:16px}.rsTop{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.rsTop button,.rsPrintBtns button{border:0;background:#020617;color:white;border-radius:9px;padding:9px 12px;font-weight:900}.rsPrintBtns{display:flex;gap:10px;margin-top:12px}.rsSlip{width:900px;margin:auto;background:white;color:#111;border:2px solid #111;padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:11px}.rsDate{display:flex;justify-content:space-between;font-size:10px}.rsHead{display:grid;grid-template-columns:70px 1fr 70px;text-align:center;align-items:center}.rsLogo{border:1px solid #111;width:58px;height:58px;margin:auto;display:flex;align-items:center;justify-content:center;font-size:9px}.rsHead h1{font-size:15px;margin:0;text-transform:uppercase}.rsHead p{margin:2px 0}.rsBio{display:grid;grid-template-columns:1fr 90px 1fr;border:1px solid #111;margin:6px 0}.rsBioGrid{display:grid;grid-template-columns:1fr 1fr}.rsBioGrid div,.rsPassport{border:1px solid #111;padding:4px}.rsPassport{display:flex;align-items:center;justify-content:center;text-align:center;background:#e0f2fe}.rsSlip table{width:100%;border-collapse:collapse}.rsSlip th,.rsSlip td{border:1px solid #111;padding:4px;text-align:center}.rsSlip th{background:#e5e7eb}.rsSlip td:nth-child(2),.rsSlip th:nth-child(2){text-align:left}.rsLower{display:grid;grid-template-columns:1fr 1fr 1fr;border:1px solid #111;margin-top:5px}.rsLower>div{border:1px solid #111;padding:5px}.rsLower h3{font-size:11px;text-align:center;text-decoration:underline;margin:0 0 4px}.rsLower p{margin:2px 0;display:flex;justify-content:space-between}.rsLine{display:grid;grid-template-columns:150px 1fr;border-bottom:1px solid #111;margin-top:7px}.rsSign{display:grid;grid-template-columns:1fr 1fr;gap:45px;margin-top:26px}.rsSign div{border-top:1px solid #111;text-align:center;padding-top:4px}.rsNext{border:1px solid #111;text-align:center;margin-top:8px;padding:5px}@media(max-width:700px){.rsGrid{grid-template-columns:1fr}.rsOverlay{padding:8px}.rsModal{overflow-x:auto}.rsSlip{transform:scale(.36);transform-origin:top left;margin-bottom:-520px}.rsPrintBtns{display:grid}.rsPrintBtns button{width:100%}}@media print{body>*:not(.rsOverlay){display:none!important}.rsOverlay{position:static;background:white;padding:0}.rsModal{box-shadow:none;padding:0}.rsTop,.rsPrintBtns{display:none}.rsSlip{transform:none;width:100%;border:2px solid #111}}
  `;
  document.head.appendChild(css);
}

function subjectsFor(cls, dept){
  cls = String(cls || "").toUpperCase();
  if(!cls.startsWith("SS")) return juniorSubjects;
  if(dept === "Art") return artSubjects;
  if(dept === "Commercial") return commercialSubjects;
  return scienceSubjects;
}

function selectedStudent(form){
  const sel = [...form.querySelectorAll("select")].find(s => /select student|assigned student/i.test(s.options?.[0]?.textContent || ""));
  const txt = sel?.options?.[sel.selectedIndex]?.textContent || "Student Name - JSS1";
  return { name: txt.split("-")[0].trim() || "Student Name", className: (txt.match(/JSS\d|SS\d/i)?.[0] || "JSS1").toUpperCase() };
}

function slipHtml(state){
  const grand = state.rows.reduce((a,r)=>a+Number(r.total||0),0);
  const avg = (grand / Math.max(1,state.rows.length)).toFixed(2);
  const summary = avg >= 70 ? "Excellent" : avg >= 60 ? "Very Good" : avg >= 50 ? "Good" : "Poor";
  return `<div class="rsSlip" id="rsSlip"><div class="rsDate"><span>${new Date().toLocaleDateString()}</span><span>Examination Result Slip</span></div><div class="rsHead"><div class="rsLogo">School<br>Logo</div><div><h1>${state.school}</h1><p>${state.address}</p><p>${state.phone} | ${state.email}</p><p><b>${state.term.toUpperCase()}, ${state.session} Examination Result</b></p></div><div class="rsLogo">Coat<br>of Arms</div></div><div class="rsBio"><div class="rsBioGrid"><div><b>Name</b><br>${state.name}</div><div><b>Gender</b><br>${state.gender}</div><div><b>Class</b><br>${state.className}</div><div><b>Age</b><br>${state.age}</div><div><b>Reg. No.</b><br>${state.reg}</div><div><b>Roll No</b><br>${state.roll}</div><div style="grid-column:1/-1"><b>Email</b><br>${state.studentEmail}</div></div><div class="rsPassport">Student<br>Passport</div><div class="rsBioGrid"><div><b>Position</b><br>${state.position}</div><div><b>No. of Students</b><br>${state.noStudents}</div><div><b>Grand Total</b><br>${grand} / ${state.rows.length*100}</div><div><b>Grade Point Average</b><br>${avg}</div><div style="grid-column:1/-1"><b>Result Summary</b><br>${summary}</div></div></div><table><thead><tr><th>#</th><th>Subject</th><th>Continuous<br>Assessment</th><th>Mid<br>Term</th><th>Examination</th><th>Total<br>Score</th><th>Grade</th><th>Grade Remark</th><th>Subject Teacher</th></tr></thead><tbody>${state.rows.map((r,i)=>`<tr><td>${i+1}</td><td>${r.subject}</td><td>${r.ca}</td><td>${r.mid}</td><td>${r.exam}</td><td>${r.total}</td><td>${r.grade}</td><td>${r.remark}</td><td>${r.teacher}</td></tr>`).join("")}</tbody></table><div class="rsLower"><div><h3>Key to Grades</h3><p><span>70-100</span><b>A Excellent</b></p><p><span>60-69</span><b>B Very Good</b></p><p><span>50-59</span><b>C Good</b></p><p><span>45-49</span><b>D Pass</b></p><p><span>40-44</span><b>E Fair</b></p><p><span>0-39</span><b>F Fail</b></p></div><div><h3>Affective Skills Assessment</h3><p><span>Punctuality</span><b>${state.punctuality}</b></p><p><span>Attentiveness</span><b>${state.attentive}</b></p><p><span>Neatness</span><b>${state.neatness}</b></p><p><span>Politeness</span><b>${state.polite}</b></p><p><span>Relationship</span><b>${state.relate}</b></p></div><div><h3>Psychomotor Skills Assessment</h3><p><span>Hand Writing</span><b>${state.handwriting}</b></p><p><span>Drawing/Painting</span><b>${state.drawing}</b></p><p><span>Speech</span><b>${state.speech}</b></p><p><span>Processing Speed</span><b>${state.speed}</b></p><p><span>Sports/Games</span><b>${state.sports}</b></p></div></div><div class="rsLine"><span><b>Form Teacher's Comment:</b></span><span>${state.formComment}</span></div><div class="rsLine"><span><b>Form Teacher:</b></span><span>${state.formTeacher}</span></div><div class="rsLine"><span><b>Principal's Comment:</b></span><span>${state.principalComment}</span></div><div class="rsSign"><div>Principal</div><div>Principal's Signature</div></div><div class="rsNext">Next Term Begins: <b>${state.nextTerm}</b></div><p style="text-align:center;font-size:9px;margin:3px 0 0">Printed by SchoolPortal</p></div>`;
}

function enhanceResultForm(form){
  if(form.dataset.rsReady === "1") return;
  const txt = form.textContent || "";
  if(!/upload result|result\/grade|upload grade/i.test(txt)) return;
  form.dataset.rsReady = "1";
  const stu = selectedStudent(form);
  const box = document.createElement("div");
  box.className = "rsBuilder";
  box.innerHTML = `<h3>Printable Result Slip Builder</h3><div class="rsGrid"><input data-f="school" value="GLOBAL FOCUS INT'L SCHOOL OF ICT STUDIES"><input data-f="address" value="Lagos State Nigeria"><input data-f="phone" value="+234 805 6176 947"><input data-f="email" value="info@schoolportal.com"><input data-f="name" value="${stu.name}" placeholder="Student name"><select data-f="gender"><option>Male</option><option>Female</option></select><input data-f="age" placeholder="Age"><input data-f="className" value="${stu.className}"><input data-f="reg" placeholder="Reg. No"><input data-f="roll" placeholder="Roll No"><input data-f="studentEmail" placeholder="Student email"><input data-f="position" placeholder="Position"><input data-f="noStudents" placeholder="No. of Students"><select data-f="dept"><option>Science</option><option>Art</option><option>Commercial</option><option>General</option></select><select data-f="term"><option>First Term</option><option>Second Term</option><option>Third Term</option></select><input data-f="session" value="2025/2026"></div><div class="rsTableWrap"><table class="rsTable"><thead><tr><th>#</th><th>Subject</th><th>Continuous<br>Assessment</th><th>Mid<br>Term</th><th>Examination</th><th>Total</th><th>Grade</th><th>Grade Remark</th><th>Subject Teacher</th></tr></thead><tbody></tbody></table></div><div class="rsGrid"><input data-f="punctuality" value="4"><input data-f="attentive" value="4"><input data-f="neatness" value="4"><input data-f="polite" value="5"><input data-f="relate" value="4"><input data-f="handwriting" value="5"><input data-f="drawing" value="4"><input data-f="speech" value="4"><input data-f="speed" value="4"><input data-f="sports" value="4"><input data-f="formTeacher" value="DEMO TEACHER"><input data-f="nextTerm" value="Monday 7th January"><input data-f="formComment" value="Excellent Result! Keep it up."><input data-f="principalComment" value="Excellent!"></div><div class="rsActions"><button type="button" data-a="load">Load Selected Student</button><button type="button" data-a="subjects">Refresh Subjects</button><button type="button" data-a="preview">Preview/Print Result</button></div>`;
  form.appendChild(box);
  const tbody = box.querySelector("tbody");
  function renderRows(){
    const cls = box.querySelector('[data-f="className"]').value;
    const dept = box.querySelector('[data-f="dept"]').value;
    tbody.innerHTML = subjectsFor(cls,dept).map((s,i)=>`<tr><td>${i+1}</td><td><input class="subject" value="${s}"></td><td><input data-s="ca" type="number" value="0"></td><td><input data-s="mid" type="number" value="0"></td><td><input data-s="exam" type="number" value="0"></td><td data-total>0</td><td data-grade>F</td><td data-remark>Fail</td><td><input value="DEMO TEACHER"></td></tr>`).join("");
    update();
  }
  function update(){
    [...tbody.querySelectorAll("tr")].forEach(row=>{const ca=+row.querySelector('[data-s="ca"]').value||0;const mid=+row.querySelector('[data-s="mid"]').value||0;const exam=+row.querySelector('[data-s="exam"]').value||0;const total=ca+mid+exam;const [g,r]=calcGrade(total);row.querySelector('[data-total]').textContent=total;row.querySelector('[data-grade]').textContent=g;row.querySelector('[data-remark]').textContent=r;});
  }
  function state(){
    const f=n=>box.querySelector(`[data-f="${n}"]`)?.value||"";
    return {school:f("school"),address:f("address"),phone:f("phone"),email:f("email"),name:f("name"),gender:f("gender"),age:f("age"),className:f("className"),reg:f("reg"),roll:f("roll"),studentEmail:f("studentEmail"),position:f("position"),noStudents:f("noStudents"),term:f("term"),session:f("session"),punctuality:f("punctuality"),attentive:f("attentive"),neatness:f("neatness"),polite:f("polite"),relate:f("relate"),handwriting:f("handwriting"),drawing:f("drawing"),speech:f("speech"),speed:f("speed"),sports:f("sports"),formTeacher:f("formTeacher"),nextTerm:f("nextTerm"),formComment:f("formComment"),principalComment:f("principalComment"),rows:[...tbody.querySelectorAll("tr")].map(row=>{const total=row.querySelector('[data-total]').textContent;const [grade,remark]=calcGrade(total);return {subject:row.querySelector('td:nth-child(2) input').value,ca:row.querySelector('[data-s="ca"]').value,mid:row.querySelector('[data-s="mid"]').value,exam:row.querySelector('[data-s="exam"]').value,total,grade,remark,teacher:row.querySelector('td:nth-child(9) input').value};})};
  }
  function preview(){
    update();
    document.querySelector(".rsOverlay")?.remove();
    const ov=document.createElement("div");ov.className="rsOverlay";ov.innerHTML=`<div class="rsModal"><div class="rsTop"><h2>Printable Result Slip</h2><button type="button">Close</button></div>${slipHtml(state())}<div class="rsPrintBtns"><button type="button" data-p>Print</button><button type="button" data-d>Download PDF</button></div></div>`;ov.querySelector(".rsTop button").onclick=()=>ov.remove();ov.querySelector("[data-p]").onclick=()=>window.print();ov.querySelector("[data-d]").onclick=()=>{const area=ov.querySelector("#rsSlip"); if(window.html2pdf){window.html2pdf().set({filename:`${state().name||"result"}-result-slip.pdf`,html2canvas:{scale:2},jsPDF:{format:"a4",orientation:"portrait"}}).from(area).save();}else window.print();};document.body.appendChild(ov);
  }
  box.addEventListener("input", update);
  box.querySelector('[data-a="load"]').onclick=()=>{const s=selectedStudent(form);box.querySelector('[data-f="name"]').value=s.name;box.querySelector('[data-f="className"]').value=s.className;renderRows();};
  box.querySelector('[data-a="subjects"]').onclick=renderRows;
  box.querySelector('[data-a="preview"]').onclick=preview;
  box.querySelector('[data-f="dept"]').onchange=renderRows;
  renderRows();
}

function runResultSlipBuilder(){
  addResultSlipCss();
  document.querySelectorAll("form.formCard").forEach(enhanceResultForm);
}
window.addEventListener("load", runResultSlipBuilder);
new MutationObserver(runResultSlipBuilder).observe(document.documentElement,{childList:true,subtree:true});
setInterval(runResultSlipBuilder,1000);
