function addStaffRolePolishCss() {
  if (document.getElementById("staff-role-polish-css")) return;
  const style = document.createElement("style");
  style.id = "staff-role-polish-css";
  style.textContent = `
    .staffRoleHelp{background:#ecfdf5;border:1px solid #bbf7d0;color:#166534;border-radius:12px;padding:10px 12px;margin:8px 0;font-weight:800;line-height:1.45}
    .bursarAccessNote{background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:12px;padding:10px 12px;margin:8px 0;font-weight:800;line-height:1.45}
  `;
  document.head.appendChild(style);
}

function isCreateStaffForm(form) {
  return /create staff login/i.test(form.textContent || "");
}

function enhanceCreateStaffForm(form) {
  if (form.dataset.staffRolePolished === "true") return;
  form.dataset.staffRolePolished = "true";

  const inputs = [...form.querySelectorAll("input,select,textarea")];
  const roleInput = inputs.find((el) => /form teacher|subject teacher|non-teaching|bursar|driver|security/i.test(el.value || el.options?.[el.selectedIndex]?.textContent || ""));
  const classInput = inputs.find((el) => el.tagName === "SELECT" && /JSS1|JSS2|JSS3|SS1|SS2|SS3/i.test(el.textContent || ""));
  const subjectsInput = inputs.find((el) => /subjects comma separated/i.test(el.placeholder || ""));

  const help = document.createElement("div");
  help.className = "staffRoleHelp";
  help.textContent = "Choose Teaching Staff for teachers/form teachers. Choose Non-Teaching Staff for Bursar, Accountant, Driver, Security, Cleaner, Nurse, Secretary, Librarian and ICT staff.";
  form.querySelector("h3")?.after(help);

  const category = document.createElement("select");
  category.name = "staffCategoryView";
  category.innerHTML = `<option>Teaching Staff</option><option>Non-Teaching Staff</option>`;
  help.after(category);

  const teachingRoles = ["Form Teacher", "Subject Teacher", "Class Teacher"];
  const nonTeachingRoles = ["Bursar", "Accountant", "Admin Assistant", "Secretary", "Driver", "Security", "Cleaner", "Nurse", "Librarian", "ICT Officer", "Store Keeper"];

  function setOptions(list) {
    if (!roleInput) return;
    if (roleInput.tagName === "SELECT") {
      roleInput.innerHTML = list.map((item) => `<option>${item}</option>`).join("");
    } else {
      roleInput.value = list[0];
      roleInput.placeholder = "Staff role";
    }
  }

  function syncMode() {
    const nonTeaching = category.value === "Non-Teaching Staff";
    setOptions(nonTeaching ? nonTeachingRoles : teachingRoles);
    if (classInput) {
      classInput.disabled = nonTeaching;
      if (nonTeaching) classInput.value = "Not assigned";
    }
    if (subjectsInput) {
      subjectsInput.placeholder = nonTeaching ? "Department / duty e.g. Accounts, Transport, Security" : "Subjects comma separated";
      if (nonTeaching && !subjectsInput.value) subjectsInput.value = category.value;
    }
  }

  category.addEventListener("change", syncMode);
  syncMode();
}

function addBursarPortalNote() {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("school_user") || "{}"); } catch { return {}; }
  })();
  if (user.role !== "staff" || document.querySelector(".bursarAccessNote")) return;

  fetch("https://school-backend-rkq3.onrender.com/api/staff/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("school_token") || ""}` },
  })
    .then((r) => r.json())
    .then((data) => {
      const profile = data.data || {};
      const role = String(profile.role || "").toLowerCase();
      const dept = String(profile.department || "").toLowerCase();
      const isBursar = role.includes("bursar") || role.includes("accountant") || dept.includes("account") || dept.includes("finance");
      if (!isBursar) return;
      const section = document.querySelector("#admin") || document.querySelector("main");
      const note = document.createElement("div");
      note.className = "bursarAccessNote";
      note.innerHTML = "Bursar access detected. This account should handle fee/payment workflows while teachers handle students, assignments and results.";
      section?.prepend(note);
    })
    .catch(() => {});
}

function runStaffRolePolish() {
  addStaffRolePolishCss();
  document.querySelectorAll("form.formCard").forEach((form) => {
    if (isCreateStaffForm(form)) enhanceCreateStaffForm(form);
  });
  addBursarPortalNote();
}

window.addEventListener("load", runStaffRolePolish);
new MutationObserver(runStaffRolePolish).observe(document.documentElement, { childList: true, subtree: true });
setInterval(runStaffRolePolish, 1500);
