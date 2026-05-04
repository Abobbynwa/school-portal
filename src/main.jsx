import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
} from "lucide-react";
import "./styles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://school-backend-rkq3.onrender.com";

const classes = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const genders = ["Male", "Female"];
const genotypes = ["AA", "AS", "SS", "AC", "SC", "Not specified"];
const terms = ["First Term", "Second Term", "Third Term"];
const paymentMethods = ["Cash", "Bank Transfer", "POS", "Online Payment", "Cheque"];

const emptyStudent = { name: "", email: "", className: "JSS1", gender: "Male", age: "", genotype: "AA", parentName: "", parentPhone: "", homeAddress: "", term: "First Term", subjects: "" };
const emptyStaff = { name: "", email: "", role: "Form Teacher", classHandled: "JSS1", gender: "Male", subjects: "" };
const emptyGrade = { studentId: "", subject: "", score: "", term: "First Term" };
const emptyAnnouncement = { title: "", message: "", audience: "All" };
const emptyMessage = { to: "Admin", message: "" };
const emptyFee = { title: "School Fees", className: "JSS1", term: "First Term", amount: "", session: "2025/2026" };
const emptyPayment = { studentId: "", feeItemId: "", amountPaid: "", paymentMethod: "Cash", reference: "", note: "" };

function App() {
  const [health, setHealth] = useState(null);
  const [dbHealth, setDbHealth] = useState(null);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [grades, setGrades] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [balances, setBalances] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [token, setToken] = useState(() => localStorage.getItem("school_token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("school_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [staffForm, setStaffForm] = useState(emptyStaff);
  const [gradeForm, setGradeForm] = useState(emptyGrade);
  const [announcementForm, setAnnouncementForm] = useState(emptyAnnouncement);
  const [messageForm, setMessageForm] = useState(emptyMessage);
  const [feeForm, setFeeForm] = useState(emptyFee);
  const [paymentForm, setPaymentForm] = useState(emptyPayment);

  const isLoggedIn = Boolean(token && user);

  const stats = useMemo(() => [
    { value: students.length, label: "Students" },
    { value: staff.length, label: "Staff" },
    { value: grades.length, label: "Grades" },
    { value: fees.length, label: "Fees" },
    { value: payments.length, label: "Payments" },
    { value: results.length, label: "Results" },
  ], [students.length, staff.length, grades.length, fees.length, payments.length, results.length]);

  const api = async (path, options = {}) => {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Request failed.");
    return data;
  };

  const loadBackendData = async () => {
    try {
      setLoading(true);
      setError("");
      const [healthData, studentsData, staffData, gradesData, announcementsData, messagesData, feesData, paymentsData, balancesData, resultsData] = await Promise.all([
        api("/api/health"),
        api("/api/students"),
        api("/api/staff"),
        api("/api/grades"),
        api("/api/announcements"),
        api("/api/messages"),
        api("/api/fees"),
        api("/api/payments"),
        api("/api/fee-balances"),
        api("/api/results"),
      ]);

      setHealth(healthData);
      setStudents(studentsData.data || []);
      setStaff(staffData.data || []);
      setGrades(gradesData.data || []);
      setAnnouncements(announcementsData.data || []);
      setMessages(messagesData.data || []);
      setFees(feesData.data || []);
      setPayments(paymentsData.data || []);
      setBalances(balancesData.data || []);
      setResults(resultsData.data || []);

      if (token) {
        try {
          const notificationsData = await api("/api/notifications");
          setNotifications(notificationsData.data || []);
        } catch {
          setNotifications([]);
        }
      }
    } catch (err) {
      setError(err.message || "Frontend could not reach the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBackendData(); }, [token]);

  const checkDatabase = async () => {
    try {
      const data = await api("/api/db-health");
      setDbHealth(data);
      setNotice("Database connection is active.");
    } catch (err) {
      setDbHealth({ success: false, message: err.message });
      setError(`Database check failed: ${err.message}`);
    }
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      const endpoint = authMode === "register" ? "/api/auth/register-admin" : "/api/auth/login";
      const payload = authMode === "register" ? authForm : { email: authForm.email, password: authForm.password };
      const data = await api(endpoint, { method: "POST", body: JSON.stringify(payload) });
      localStorage.setItem("school_token", data.token);
      localStorage.setItem("school_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ name: "", email: "", password: "" });
      setNotice(data.message || "Authentication successful.");
    } catch (err) { setError(err.message); }
  };

  const logout = () => {
    localStorage.removeItem("school_token");
    localStorage.removeItem("school_user");
    setToken("");
    setUser(null);
    setNotifications([]);
    setNotice("Logged out successfully.");
  };

  const submitProtected = async (event, path, form, resetForm, successText) => {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      await api(path, { method: "POST", body: JSON.stringify(form) });
      resetForm();
      setNotice(successText);
      await loadBackendData();
    } catch (err) { setError(err.message); }
  };

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand"><GraduationCap size={28} /><span>SchoolPortal</span></div>
          <div className="navLinks">
            <a href="https://github.com/Abobbynwa/school-portal" target="_blank" rel="noreferrer">Frontend Repo</a>
            <a href="https://github.com/Abobbynwa/school-backend" target="_blank" rel="noreferrer">Backend Repo</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroContent">
            <p className="eyebrow">Standard School Admin System</p>
            <h1>Live school portal with student records, fees, payments, and result management.</h1>
            <p className="lead">Manage admission records, staff, school fees, payment tracking, grades, report results, announcements, and messages with permanent Supabase storage.</p>
            <div className="actions"><a className="primaryBtn" href="#admin">Open Admin Dashboard</a><a className="secondaryBtn" href="#records">See Logged Records</a></div>
          </div>

          <div className="dashboardCard">
            <div className="cardTop"><span></span><span></span><span></span></div>
            <div className="dashboardHeader"><div><p>{isLoggedIn ? `Logged in as ${user.name}` : "Admin Access"}</p><h2>{isLoggedIn ? "Dashboard Active" : "Login Required"}</h2></div>{isLoggedIn ? <ShieldCheck size={34} /> : <Lock size={34} />}</div>
            <div className="statsGrid">{stats.map((stat) => <div key={stat.label} className="statBox"><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
            <div className="miniList"><p><span></span> Backend: {API_BASE_URL}</p><p><span></span> API: {health?.status || (loading ? "checking" : "offline")}</p><p><span></span> Database: {health?.database || dbHealth?.database || "check pending"}</p></div>
          </div>
        </div>
      </section>

      <section id="admin" className="section backendSection">
        <div className="sectionHeader"><p className="eyebrow">Admin Dashboard</p><h2>Manage real school operations</h2><p>Student admission, staff, fees, payments, results, messages, and announcements are saved through protected JWT routes.</p></div>
        {notice && <p className="successBox">{notice}</p>}
        {error && <p className="errorBox">{error}</p>}

        {!isLoggedIn ? (
          <div className="authGrid">
            <form className="formCard" onSubmit={submitAuth}>
              <div className="formTitle"><Lock size={22} /><h3>{authMode === "register" ? "Register First Admin" : "Admin Login"}</h3></div>
              {authMode === "register" && <input placeholder="Full name" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} />}
              <input type="email" placeholder="Email address" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
              <input type="password" placeholder="Password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
              <button type="submit">{authMode === "register" ? "Create Admin Account" : "Login"}</button>
              <button className="ghostButton" type="button" onClick={() => setAuthMode(authMode === "register" ? "login" : "register")}>{authMode === "register" ? "Already have admin? Login" : "First time? Register admin"}</button>
            </form>
            <article className="dataCard"><h3>Protected System</h3><div className="record"><strong>Authentication</strong><span>JWT login and token verification</span></div><div className="record"><strong>School Operations</strong><span>Students, staff, fees, payments, results, communication</span></div><div className="record"><strong>Database</strong><span>Supabase PostgreSQL persistence</span></div></article>
          </div>
        ) : (
          <>
            <div className="apiStatusCard"><div><Server size={26} /><strong>{user.name}</strong><span>{user.email} • {user.role}</span></div><div className="inlineActions"><button type="button" onClick={checkDatabase}>Check Database</button><button type="button" onClick={loadBackendData}><RefreshCw size={16} /> Refresh</button><button type="button" onClick={logout}><LogOut size={16} /> Logout</button></div></div>
            <div className="adminGrid">
              <form className="formCard" onSubmit={(e) => submitProtected(e, "/api/students", studentForm, () => setStudentForm(emptyStudent), "Student profile saved permanently.")}>
                <div className="formTitle"><Users size={22} /><h3>Create Student</h3></div>
                <input placeholder="Student name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} />
                <input type="email" placeholder="Student email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} />
                <select value={studentForm.className} onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })}>{classes.map((item) => <option key={item}>{item}</option>)}</select>
                <select value={studentForm.gender} onChange={(e) => setStudentForm({ ...studentForm, gender: e.target.value })}>{genders.map((item) => <option key={item}>{item}</option>)}</select>
                <input type="number" min="1" placeholder="Age" value={studentForm.age} onChange={(e) => setStudentForm({ ...studentForm, age: e.target.value })} />
                <select value={studentForm.genotype} onChange={(e) => setStudentForm({ ...studentForm, genotype: e.target.value })}>{genotypes.map((item) => <option key={item}>{item}</option>)}</select>
                <input placeholder="Parent/Guardian name" value={studentForm.parentName} onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })} />
                <input placeholder="Parent phone number" value={studentForm.parentPhone} onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })} />
                <textarea placeholder="Home address" value={studentForm.homeAddress} onChange={(e) => setStudentForm({ ...studentForm, homeAddress: e.target.value })} />
                <select value={studentForm.term} onChange={(e) => setStudentForm({ ...studentForm, term: e.target.value })}>{terms.map((item) => <option key={item}>{item}</option>)}</select>
                <input placeholder="Subjects comma separated" value={studentForm.subjects} onChange={(e) => setStudentForm({ ...studentForm, subjects: e.target.value })} />
                <button type="submit">Save Student</button>
              </form>

              <form className="formCard" onSubmit={(e) => submitProtected(e, "/api/staff", staffForm, () => setStaffForm(emptyStaff), "Staff member saved permanently.")}>
                <div className="formTitle"><ShieldCheck size={22} /><h3>Create Staff</h3></div>
                <input placeholder="Staff name" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} />
                <input type="email" placeholder="Staff email" value={staffForm.email} onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })} />
                <input placeholder="Role e.g. Form Teacher" value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} />
                <select value={staffForm.classHandled} onChange={(e) => setStaffForm({ ...staffForm, classHandled: e.target.value })}><option>Non-teaching</option>{classes.map((item) => <option key={item}>{item}</option>)}</select>
                <select value={staffForm.gender} onChange={(e) => setStaffForm({ ...staffForm, gender: e.target.value })}>{genders.map((item) => <option key={item}>{item}</option>)}</select>
                <input placeholder="Subjects comma separated" value={staffForm.subjects} onChange={(e) => setStaffForm({ ...staffForm, subjects: e.target.value })} />
                <button type="submit">Save Staff</button>
              </form>

              <form className="formCard" onSubmit={(e) => submitProtected(e, "/api/fees", feeForm, () => setFeeForm(emptyFee), "School fee uploaded.")}>
                <div className="formTitle"><ClipboardList size={22} /><h3>Upload School Fee</h3></div>
                <input placeholder="Fee title e.g. Tuition Fee" value={feeForm.title} onChange={(e) => setFeeForm({ ...feeForm, title: e.target.value })} />
                <select value={feeForm.className} onChange={(e) => setFeeForm({ ...feeForm, className: e.target.value })}>{classes.map((item) => <option key={item}>{item}</option>)}</select>
                <select value={feeForm.term} onChange={(e) => setFeeForm({ ...feeForm, term: e.target.value })}>{terms.map((item) => <option key={item}>{item}</option>)}</select>
                <input type="number" min="0" placeholder="Amount" value={feeForm.amount} onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })} />
                <input placeholder="Session e.g. 2025/2026" value={feeForm.session} onChange={(e) => setFeeForm({ ...feeForm, session: e.target.value })} />
                <button type="submit">Save Fee</button>
              </form>

              <form className="formCard" onSubmit={(e) => submitProtected(e, "/api/payments", paymentForm, () => setPaymentForm(emptyPayment), "Payment recorded.")}>
                <div className="formTitle"><Mail size={22} /><h3>Record Fee Payment</h3></div>
                <select value={paymentForm.studentId} onChange={(e) => setPaymentForm({ ...paymentForm, studentId: e.target.value })}><option value="">Select student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name} - {student.class_name}</option>)}</select>
                <select value={paymentForm.feeItemId} onChange={(e) => setPaymentForm({ ...paymentForm, feeItemId: e.target.value })}><option value="">Select fee</option>{fees.map((fee) => <option key={fee.id} value={fee.id}>{fee.title} - {fee.class_name} - ₦{Number(fee.amount).toLocaleString()}</option>)}</select>
                <input type="number" min="0" placeholder="Amount paid" value={paymentForm.amountPaid} onChange={(e) => setPaymentForm({ ...paymentForm, amountPaid: e.target.value })} />
                <select value={paymentForm.paymentMethod} onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}>{paymentMethods.map((item) => <option key={item}>{item}</option>)}</select>
                <input placeholder="Receipt/reference number" value={paymentForm.reference} onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })} />
                <textarea placeholder="Payment note" value={paymentForm.note} onChange={(e) => setPaymentForm({ ...paymentForm, note: e.target.value })} />
                <button type="submit">Record Payment</button>
              </form>

              <form className="formCard" onSubmit={(e) => submitProtected(e, "/api/grades", gradeForm, () => setGradeForm(emptyGrade), "Grade saved and result updated.")}>
                <div className="formTitle"><ClipboardList size={22} /><h3>Upload Result/Grade</h3></div>
                <select value={gradeForm.studentId} onChange={(e) => setGradeForm({ ...gradeForm, studentId: e.target.value })}><option value="">Select student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name} - {student.class_name}</option>)}</select>
                <input placeholder="Subject" value={gradeForm.subject} onChange={(e) => setGradeForm({ ...gradeForm, subject: e.target.value })} />
                <input type="number" min="0" max="100" placeholder="Score" value={gradeForm.score} onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })} />
                <select value={gradeForm.term} onChange={(e) => setGradeForm({ ...gradeForm, term: e.target.value })}>{terms.map((item) => <option key={item}>{item}</option>)}</select>
                <button type="submit">Upload Result</button>
              </form>

              <form className="formCard" onSubmit={(e) => submitProtected(e, "/api/announcements", announcementForm, () => setAnnouncementForm(emptyAnnouncement), "Announcement published.")}>
                <div className="formTitle"><Mail size={22} /><h3>Publish Announcement</h3></div>
                <input placeholder="Title" value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} />
                <select value={announcementForm.audience} onChange={(e) => setAnnouncementForm({ ...announcementForm, audience: e.target.value })}><option>All</option><option>Students</option><option>Staff</option><option>Parents</option></select>
                <textarea placeholder="Announcement message" value={announcementForm.message} onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })} />
                <button type="submit">Publish</button>
              </form>

              <form className="formCard" onSubmit={(e) => submitProtected(e, "/api/messages", messageForm, () => setMessageForm(emptyMessage), "Message sent and saved.")}>
                <div className="formTitle"><MessageCircle size={22} /><h3>Send Message</h3></div>
                <select value={messageForm.to} onChange={(e) => setMessageForm({ ...messageForm, to: e.target.value })}><option>Admin</option><option>Staff</option><option>Student</option><option>Parent</option></select>
                <textarea placeholder="Message" value={messageForm.message} onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })} />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </>
        )}
      </section>

      <section id="records" className="section backendSection">
        <div className="sectionHeader"><p className="eyebrow">Live Admin Records</p><h2>See everything you logged</h2><p>Students, fees, payments, balances, and results are loaded from Supabase PostgreSQL.</p></div>
        <div className="dataGrid">
          <article className="dataCard"><h3>Student Profiles</h3>{students.map((s) => <div className="record" key={s.id}><strong>{s.name}</strong><span>{s.class_name} • {s.gender} • Age {s.age || "N/A"} • Genotype {s.genotype || "N/A"}</span><span>{s.email}</span><span>Parent: {s.parent_name || "N/A"} • {s.parent_phone || "N/A"}</span><span>Address: {s.home_address || "N/A"}</span><span>Subjects: {(s.subjects || []).join(", ") || "None"}</span></div>)}</article>
          <article className="dataCard"><h3>School Fees</h3>{fees.map((f) => <div className="record" key={f.id}><strong>{f.title}</strong><span>{f.class_name} • {f.term} • {f.session}</span><span>Amount: ₦{Number(f.amount).toLocaleString()}</span></div>)}</article>
          <article className="dataCard"><h3>Fee Payments</h3>{payments.map((p) => <div className="record" key={p.id}><strong>{p.student_name}</strong><span>{p.fee_title} • Paid ₦{Number(p.amount_paid).toLocaleString()}</span><span>{p.payment_method} • Ref: {p.reference || "N/A"}</span></div>)}</article>
          <article className="dataCard"><h3>Fee Balances</h3>{balances.map((b) => <div className="record" key={`${b.student_id}-${b.fee_item_id}`}><strong>{b.student_name}</strong><span>{b.title} • {b.class_name} • {b.term}</span><span>Expected ₦{Number(b.expected_amount).toLocaleString()} • Paid ₦{Number(b.paid_amount).toLocaleString()}</span><span>Balance: ₦{Number(b.balance).toLocaleString()}</span></div>)}</article>
          <article className="dataCard"><h3>Result Summary</h3>{results.map((r) => <div className="record" key={r.student_id}><strong>{r.name}</strong><span>{r.class_name} • {r.term}</span><span>Subjects: {r.subjects_count} • Average: {Number(r.average_score).toFixed(2)}%</span></div>)}</article>
          <article className="dataCard"><h3>Grades</h3>{grades.map((g) => <div className="record" key={g.id}><strong>{g.subject}</strong><span>{g.student_name || `Student #${g.student_id}`} • Score {g.score} • Grade {g.grade}</span><span>{g.term}</span></div>)}</article>
          <article className="dataCard"><h3>Staff</h3>{staff.map((m) => <div className="record" key={m.id}><strong>{m.name}</strong><span>{m.role} • {m.class_handled}</span><span>{m.gender} • {m.email}</span><span>Subjects: {(m.subjects || []).join(", ") || "None"}</span></div>)}</article>
          <article className="dataCard"><h3>Announcements</h3>{announcements.map((a) => <div className="record" key={a.id}><strong>{a.title}</strong><span>{a.audience} • {a.message}</span></div>)}</article>
          <article className="dataCard"><h3>Messages</h3>{messages.map((m) => <div className="record" key={m.id}><strong>{m.sender} → {m.recipient}</strong><span>{m.message}</span></div>)}</article>
          <article className="dataCard"><h3>Notifications</h3>{notifications.length ? notifications.map((n) => <div className="record" key={n.id}><strong>{n.subject}</strong><span>{n.recipient} • {n.status}</span></div>) : <div className="record"><strong>Login required</strong><span>Notifications are visible to admin only.</span></div>}</article>
        </div>
      </section>

      <section id="features" className="section">
        <div className="sectionHeader"><p className="eyebrow">Working Modules</p><h2>Standard school admin features</h2><p>Student profiles, staff, fees, payments, balances, results, announcements, and messages are functional.</p></div>
        <div className="featureGrid">
          {[{ icon: LayoutDashboard, title: "Admin Dashboard", description: "Protected dashboard with real school office modules." }, { icon: Users, title: "Student Details", description: "Class, gender, age, genotype, parent, address, subjects." }, { icon: ClipboardList, title: "Fees & Results", description: "Upload fees, record payments, check balances, upload results." }, { icon: ShieldCheck, title: "JWT Authentication", description: "Login and protected backend routes." }, { icon: MessageCircle, title: "Messages", description: "Messages are sent and stored through the API." }, { icon: Mail, title: "Announcements", description: "Announcements are published to the database." }].map((feature) => { const Icon = feature.icon; return <article className="featureCard" key={feature.title}><Icon size={28} /><h3>{feature.title}</h3><p>{feature.description}</p></article>; })}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
