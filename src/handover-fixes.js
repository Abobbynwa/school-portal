const HANDOVER_API = "https://school-backend-rkq3.onrender.com";
const SCHOOL_BUCKET = "school-files";
const SCHOOL_CLASSES_HO = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const TERMS_HO = ["First Term", "Second Term", "Third Term"];

function getPortalToken() {
  return localStorage.getItem("school_token") || "";
}

function getPortalUser() {
  try { return JSON.parse(localStorage.getItem("school_user") || "{}"); } catch { return {}; }
}

async function handoverFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = getPortalToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${HANDOVER_API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed: ${path}`);
  return data;
}

function addHandoverCss() {
  if (document.getElementById("handover-fixes-css")) return;
  const style = document.createElement("style");
  style.id = "handover-fixes-css";
  style.textContent = `
    .fileUploadBox{border:1.5px dashed #94a3b8!important;background:#f8fafc!important;border-radius:14px!important;padding:14px!important;display:grid!important;gap:8px!important;color:#334155!important;font-weight:800!important}
    .fileUploadBox input{border:0!important;padding:0!important;background:transparent!important}.fileUploadBox small{color:#64748b!important;font-weight:700!important}.fileUploadStatus{background:#ecfdf5;border:1px solid #bbf7d0;color:#166534;border-radius:10px;padding:8px 10px;font-size:.88rem;font-weight:800;display:none}.fileUploadStatus.show{display:block}.financePanel{grid-column:1/-1;border:2px solid #0f172a;background:#fff;border-radius:18px;padding:16px;margin-top:14px;display:grid;gap:14px}.financeTop{background:#020617;color:#fff;border-radius:14px;padding:14px 16px}.financeTop h3{margin:0;font-size:1.05rem}.financeTop p{margin:6px 0 0;color:#dbeafe}.financeGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.financeGrid label{font-size:.82rem;font-weight:900;color:#334155;display:grid;gap:6px}.financeGrid input,.financeGrid select,.financeGrid textarea{border:1px solid #94a3b8;border-radius:10px;padding:10px;font:inherit;background:white}.financeStats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.financeStat{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:12px}.financeStat strong{display:block;color:#0f172a;font-size:1.1rem}.financeStat span{color:#64748b;font-size:.85rem}.financeActions{display:flex;gap:10px;flex-wrap:wrap}.financeActions button{border:0;border-radius:11px;background:#020617;color:white;padding:11px 14px;font-weight:900;cursor:pointer}.financeActions button.primary{background:#16a34a}.financeActions button.blue{background:#1d4ed8}.financeTable{overflow:auto;border:1px solid #e2e8f0;border-radius:14px;max-height:280px}.financeTable table{width:100%;border-collapse:collapse;font-size:.88rem}.financeTable th,.financeTable td{border-bottom:1px solid #e2e8f0;padding:10px;text-align:left}.financeTable th{background:#f8fafc;color:#0f172a}.financeBadge{display:inline-flex;border-radius:999px;padding:4px 8px;font-size:.78rem;font-weight:900}.paid{background:#dcfce7;color:#166534}.owing{background:#fee2e2;color:#991b1b}.part{background:#fef3c7;color:#92400e}
    @media(max-width:760px){.financeGrid,.financeStats{grid-template-columns:1fr}.financeActions button{width:100%}}
  `;
  document.head.appendChild(style);
}

async function uploadToSupabaseLike(file, folder) {
  if (!file) return "";
  const url = import.meta?.env?.VITE_SUPABASE_URL;
  const anon = import.meta?.env?.VITE_SUPABASE_ANON_KEY;
  const bucket = import.meta?.env?.VITE_SUPABASE_BUCKET || SCHOOL_BUCKET;
  if (!url || !anon) {
    return `local-file-selected://${folder}/${encodeURIComponent(file.name)}`;
  }
  const safe = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
  const path = `${folder}/${Date.now()}-${safe}`;
  const uploadUrl = `${url}/storage/v1/object/${bucket}/${path}`;
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: { apikey: anon, Authorization: `Bearer ${anon}`, "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
    body: file,
  });
  if (!res.ok) throw new Error("File upload failed. Check Supabase bucket/env settings.");
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}

function replaceUrlFieldWithUpload(input, label, folder) {
  if (!input || input.dataset.uploadReplaced === "true") return;
  input.dataset.uploadReplaced = "true";
  const box = document.createElement("label");
  box.className = "fileUploadBox";
  box.innerHTML = `<span>${label}</span><input type="file"><small>Choose a file. The generated file link will be saved automatically.</small><div class="fileUploadStatus"></div>`;
  const hidden = input;
  hidden.type = "hidden";
  hidden.placeholder = `${label} uploaded URL`;
  input.after(box);
  const fileInput = box.querySelector("input[type=file]");
  const status = box.querySelector(".fileUploadStatus");
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    status.textContent = "Uploading file...";
    status.classList.add("show");
    try {
      const link = await uploadToSupabaseLike(file, folder);
      hidden.value = link;
      hidden.dispatchEvent(new Event("input", { bubbles: true }));
      hidden.dispatchEvent(new Event("change", { bubbles: true }));
      status.textContent = "Upload ready: " + file.name;
    } catch (err) {
      status.textContent = err.message;
    }
  });
}

function fixUploadFields() {
  document.querySelectorAll("input").forEach((input) => {
    const ph = (input.placeholder || "").toLowerCase();
    if (ph.includes("passport photo url")) replaceUrlFieldWithUpload(input, "Upload Student Passport", "student-passports");
    if (ph.includes("staff photo url")) replaceUrlFieldWithUpload(input, "Upload Staff Photo", "staff-photos");
    if (ph.includes("receipt url")) replaceUrlFieldWithUpload(input, "Upload Payment Receipt", "payment-receipts");
    if (ph.includes("report-card pdf url") || ph.includes("report pdf") || ph.includes("report-card")) replaceUrlFieldWithUpload(input, "Upload Report PDF", "report-pdfs");
  });
}

function money(n) {
  return `₦${Number(n || 0).toLocaleString()}`;
}

function statusFor(balance, paid) {
  if (Number(balance) <= 0 && Number(paid) > 0) return ["Paid", "paid"];
  if (Number(paid) > 0) return ["Part Payment", "part"];
  return ["Owing", "owing"];
}

async function loadFinanceData() {
  const [students, fees, payments, balances] = await Promise.all([
    handoverFetch("/api/students"),
    handoverFetch("/api/finance/fee-items"),
    handoverFetch("/api/finance/payments"),
    handoverFetch("/api/finance/balances"),
  ]);
  return { students: students.data || [], fees: fees.data || [], payments: payments.data || [], balances: balances.data || [] };
}

function selectedFeeAmount(panel) {
  const feeId = panel.querySelector('[data-fin="feeItemId"]')?.value;
  const fee = window.financeData?.fees?.find((f) => String(f.id) === String(feeId));
  return Number(fee?.amount || 0);
}

function refreshFinanceCalculated(panel) {
  const amount = selectedFeeAmount(panel);
  const paid = Number(panel.querySelector('[data-fin="amountPaid"]')?.value || 0);
  const balance = Math.max(amount - paid, 0);
  panel.querySelector('[data-fin-view="total"]').textContent = money(amount);
  panel.querySelector('[data-fin-view="paid"]').textContent = money(paid);
  panel.querySelector('[data-fin-view="balance"]').textContent = money(balance);
  const [text, klass] = statusFor(balance, paid);
  const badge = panel.querySelector('[data-fin-view="status"]');
  badge.textContent = text;
  badge.className = `financeBadge ${klass}`;
}

function renderFinanceRows(panel) {
  const tbody = panel.querySelector("tbody");
  const balances = window.financeData?.balances || [];
  tbody.innerHTML = balances.map((b) => {
    const [text, klass] = statusFor(b.balance, b.paid);
    return `<tr><td>${b.student_name}</td><td>${b.class_name}</td><td>${money(b.total_fee)}</td><td>${money(b.paid)}</td><td>${money(b.balance)}</td><td><span class="financeBadge ${klass}">${text}</span></td></tr>`;
  }).join("") || `<tr><td colspan="6">No fee balance records yet.</td></tr>`;
}

async function setupFinancePanel(form) {
  if (form.dataset.financeEnhanced === "true") return;
  if (!/record fee payment/i.test(form.textContent || "")) return;
  form.dataset.financeEnhanced = "true";
  form.querySelectorAll(":scope > input, :scope > select, :scope > textarea, :scope > button").forEach((el) => { el.style.display = "none"; });

  const panel = document.createElement("section");
  panel.className = "financePanel";
  panel.innerHTML = `
    <div class="financeTop"><h3>Fee Payment Verification</h3><p>Student and fee item come from database. Admin/Bursar verifies payment and receipt.</p></div>
    <div class="financeGrid">
      <label>Student name from database<select data-fin="studentId"><option value="">Loading students...</option></select></label>
      <label>Fee item from database<select data-fin="feeItemId"><option value="">Loading fees...</option></select></label>
      <label>Amount paid<input data-fin="amountPaid" type="number" placeholder="Amount paid"></label>
      <label>Payment method<select data-fin="paymentMethod"><option>Cash</option><option>Transfer</option><option>POS</option><option>Bank Deposit</option></select></label>
      <label>Receipt/reference number<input data-fin="reference" placeholder="Receipt/reference number"></label>
      <label>Verified by Admin/Bursar<input data-fin="verifiedBy" value="${getPortalUser().name || getPortalUser().email || "Admin/Bursar"}" readonly></label>
      <label style="grid-column:1/-1">Payment note<textarea data-fin="note" placeholder="Payment note"></textarea></label>
      <input data-fin="receiptUrl" type="hidden">
    </div>
    <div class="financeGrid"><label class="fileUploadBox" style="grid-column:1/-1"><span>Upload Payment Receipt</span><input data-fin-file="receipt" type="file"><small>Receipt file will be attached to this payment record.</small><div class="fileUploadStatus"></div></label></div>
    <div class="financeStats"><div class="financeStat"><span>Total fee amount</span><strong data-fin-view="total">₦0</strong></div><div class="financeStat"><span>Amount paid</span><strong data-fin-view="paid">₦0</strong></div><div class="financeStat"><span>Balance / Payment status</span><strong><span data-fin-view="balance">₦0</span> <span data-fin-view="status" class="financeBadge owing">Owing</span></strong></div></div>
    <div class="financeActions"><button type="button" class="primary" data-fin-action="save">Save Verified Payment</button><button type="button" class="blue" data-fin-action="reload">Reload DB Data</button></div>
    <div class="financeTable"><table><thead><tr><th>Student</th><th>Class</th><th>Total Fee</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead><tbody></tbody></table></div>
  `;
  form.appendChild(panel);

  async function hydrate() {
    try {
      window.financeData = await loadFinanceData();
      panel.querySelector('[data-fin="studentId"]').innerHTML = `<option value="">Select student</option>` + window.financeData.students.map((s) => `<option value="${s.id}">${s.name} - ${s.class_name}</option>`).join("");
      panel.querySelector('[data-fin="feeItemId"]').innerHTML = `<option value="">Select fee</option>` + window.financeData.fees.map((f) => `<option value="${f.id}">${f.title} - ${f.class_name} - ${f.term} - ${money(f.amount)}</option>`).join("");
      renderFinanceRows(panel);
      refreshFinanceCalculated(panel);
    } catch (err) {
      panel.querySelector(".financeTop p").textContent = "Could not load finance database: " + err.message;
    }
  }

  panel.querySelectorAll('[data-fin="feeItemId"], [data-fin="amountPaid"]').forEach((el) => el.addEventListener("input", () => refreshFinanceCalculated(panel)));
  panel.querySelector('[data-fin-file="receipt"]').addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const status = panel.querySelector(".fileUploadStatus");
    status.textContent = "Uploading receipt...";
    status.classList.add("show");
    try {
      const link = await uploadToSupabaseLike(file, "payment-receipts");
      panel.querySelector('[data-fin="receiptUrl"]').value = link;
      status.textContent = "Receipt ready: " + file.name;
    } catch (err) { status.textContent = err.message; }
  });
  panel.querySelector('[data-fin-action="reload"]').onclick = hydrate;
  panel.querySelector('[data-fin-action="save"]').onclick = async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true; btn.textContent = "Saving...";
    try {
      await handoverFetch("/api/finance/payments", { method: "POST", body: JSON.stringify({
        studentId: panel.querySelector('[data-fin="studentId"]').value,
        feeItemId: panel.querySelector('[data-fin="feeItemId"]').value,
        amountPaid: panel.querySelector('[data-fin="amountPaid"]').value,
        paymentMethod: panel.querySelector('[data-fin="paymentMethod"]').value,
        reference: panel.querySelector('[data-fin="reference"]').value,
        receiptUrl: panel.querySelector('[data-fin="receiptUrl"]').value,
        note: panel.querySelector('[data-fin="note"]').value,
        status: "Verified",
      }) });
      alert("Payment verified and saved to database.");
      await hydrate();
    } catch (err) { alert("Payment save failed: " + err.message); }
    finally { btn.disabled = false; btn.textContent = "Save Verified Payment"; }
  };
  await hydrate();
}

function runHandoverFixes() {
  addHandoverCss();
  fixUploadFields();
  document.querySelectorAll("form.formCard").forEach((form) => setupFinancePanel(form));
}

window.addEventListener("load", runHandoverFixes);
new MutationObserver(runHandoverFixes).observe(document.documentElement, { childList: true, subtree: true });
setInterval(runHandoverFixes, 1500);
