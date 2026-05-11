import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
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
  Upload,
  Users,
} from "lucide-react";
import "./styles.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://school-backend-rkq3.onrender.com";

const classes = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const genders = ["Male", "Female"];
const genotypes = ["AA", "AS", "SS", "AC", "SC", "Not specified"];
const terms = ["First Term", "Second Term", "Third Term"];
const paymentMethods = ["Cash", "Bank Transfer", "POS", "Online Payment", "Cheque"];

const emptyAdmission = {
  studentName: "",
  classApplying: "JSS1",
  gender: "Male",
  age: "",
  genotype: "AA",
  previousSchool: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  homeAddress: "",
  passportUrl: "",
  note: "",
};

const emptyStudent = {
  name: "",
  email: "",
  admissionNumber: "",
  className: "JSS1",
  gender: "Male",
  age: "",
  genotype: "AA",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  emergencyContact: "",
  homeAddress: "",
  term: "First Term",
  subjects: "",
  passportUrl: "",
};

const emptyStaff = {
  name: "",
  email: "",
  password: "",
  staffId: "",
  role: "Form Teacher",
  classHandled: "JSS1",
  gender: "Male",
  phone: "",
  department: "",
  qualification: "",
  homeAddress: "",
  subjects: "",
  photoUrl: "",
};

const emptyGrade = {
  studentId: "",
  subject: "",
  score: "",
  term: "First Term",
  reportCardUrl: "",
};

const emptyAnnouncement = {
  title: "",
  message: "",
  audience: "All",
};

const emptyMessage = {
  to: "Admin",
  message: "",
};

const emptyFee = {
  title: "School Fees",
  className: "JSS1",
  term: "First Term",
  amount: "",
  session: "2025/2026",
  dueDate: "",
  note: "",
};

const emptyPayment = {
  studentId: "",
  feeItemId: "",
  amountPaid: "",
  paymentMethod: "Cash",
  reference: "",
  receiptUrl: "",
  note: "",
};

const emptyAssignment = {
  title: "",
  subject: "",
  instructions: "",
  dueDate: "",
  attachmentUrl: "",
};

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
  const [admissions, setAdmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [staffStudents, setStaffStudents] = useState([]);
  const [staffProfile, setStaffProfile] = useState(null);

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

  const [selectedClass, setSelectedClass] = useState("JSS1");

  const [admissionForm, setAdmissionForm] = useState(emptyAdmission);
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [staffForm, setStaffForm] = useState(emptyStaff);
  const [gradeForm, setGradeForm] = useState(emptyGrade);
  const [staffGradeForm, setStaffGradeForm] = useState(emptyGrade);
  const [assignmentForm, setAssignmentForm] = useState(emptyAssignment);
  const [announcementForm, setAnnouncementForm] = useState(emptyAnnouncement);
  const [messageForm, setMessageForm] = useState(emptyMessage);
  const [feeForm, setFeeForm] = useState(emptyFee);
  const [paymentForm, setPaymentForm] = useState(emptyPayment);

  const isLoggedIn = Boolean(token && user);
  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";

  const stats = useMemo(
    () => [
      { value: students.length, label: "Students" },
      { value: staff.length, label: "Staff" },
      { value: grades.length, label: "Grades" },
      { value: fees.length, label: "Fees" },
      { value: payments.length, label: "Payments" },
      { value: results.length, label: "Results" },
    ],
    [students.length, staff.length, grades.length, fees.length, payments.length, results.length]
  );

  const selectedClassStudents = useMemo(
    () => students.filter((student) => student.class_name === selectedClass),
    [students, selectedClass]
  );

  const api = async (path, options = {}) => {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Request failed.");
    }

    return data;
  };

  const loadBackendData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        healthData,
        studentsData,
        staffData,
        gradesData,
        announcementsData,
        messagesData,
        feesData,
        paymentsData,
        balancesData,
        resultsData,
      ] = await Promise.all([
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

      if (token && isAdmin) {
        try {
          const notificationsData = await api("/api/notifications");
          setNotifications(notificationsData.data || []);
        } catch {
          setNotifications([]);
        }

        try {
          const admissionsData = await api("/api/admissions");
          setAdmissions(admissionsData.data || []);
        } catch {
          setAdmissions([]);
        }

        try {
          const assignmentsData = await api("/api/assignments");
          setAssignments(assignmentsData.data || []);
        } catch {
          setAssignments([]);
        }
      }

      if (token && (isStaff || isAdmin)) {
        try {
          const staffStudentsData = await api("/api/staff/my-students");
          setStaffStudents(staffStudentsData.data || []);
          setStaffProfile(staffStudentsData.staff || null);
        } catch {
          setStaffStudents([]);
          setStaffProfile(null);
        }
      }

      if (token && isStaff) {
        try {
          const assignmentsData = await api("/api/assignments");
          setAssignments(assignmentsData.data || []);
        } catch {
          setAssignments([]);
        }
      }
    } catch (err) {
      setError(err.message || "Frontend could not reach the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, [token, user?.role]);

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
      const payload =
        authMode === "register"
          ? authForm
          : { email: authForm.email, password: authForm.password };

      const data = await api(endpoint, { method: "POST", body: JSON.stringify(payload) });

      localStorage.setItem("school_token", data.token);
      localStorage.setItem("school_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ name: "", email: "", password: "" });
      setNotice(data.message || "Authentication successful.");
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("school_token");
    localStorage.removeItem("school_user");
    setToken("");
    setUser(null);
    setNotifications([]);
    setStaffStudents([]);
    setStaffProfile(null);
    setNotice("Logged out successfully.");
  };

  const submitPublic = async (event, path, form, resetForm, successText) => {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      await api(path, { method: "POST", body: JSON.stringify(form) });
      resetForm();
      setNotice(successText);
      await loadBackendData();
    } catch (err) {
      setError(err.message);
    }
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
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteRecord = async (path, successText) => {
    if (!window.confirm("Delete this record permanently?")) return;

    setError("");
    setNotice("");

    try {
      await api(path, { method: "DELETE" });
      setNotice(successText);
      await loadBackendData();
    } catch (err) {
      setError(err.message);
    }
  };

  const editStudent = async (student) => {
    const name = window.prompt("Edit student name", student.name) || student.name;
    const className = window.prompt("Edit class", student.class_name) || student.class_name;
    const parentPhone =
      window.prompt("Edit parent phone", student.parent_phone || "") || student.parent_phone;

    try {
      await api(`/api/students/${student.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, className, parentPhone }),
      });
      setNotice("Student updated successfully.");
      await loadBackendData();
    } catch (err) {
      setError(err.message);
    }
  };

  const editStaff = async (member) => {
    const name = window.prompt("Edit staff name", member.name) || member.name;
    const role = window.prompt("Edit role", member.role) || member.role;
    const classHandled =
      window.prompt("Edit class handled", member.class_handled) || member.class_handled;

    try {
      await api(`/api/staff/${member.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, role, classHandled }),
      });
      setNotice("Staff updated successfully.");
      await loadBackendData();
    } catch (err) {
      setError(err.message);
    }
  };

  const editFee = async (fee) => {
    const amount = window.prompt("Edit fee amount", fee.amount) || fee.amount;

    try {
      await api(`/api/fees/${fee.id}`, {
        method: "PUT",
        body: JSON.stringify({ amount }),
      });
      setNotice("Fee updated successfully.");
      await loadBackendData();
    } catch (err) {
      setError(err.message);
    }
  };

  const convertAdmission = async (admissionId) => {
    try {
      await api(`/api/admissions/${admissionId}/convert`, { method: "POST" });
      setNotice("Applicant converted to student successfully.");
      await loadBackendData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <section id="home" className="hero">
        <nav className="nav">
          <div className="brand">
            <GraduationCap size={28} />
            <span>SchoolPortal</span>
          </div>

          <div className="navLinks">
            <a href="#home">Home</a>
            <a href="#admission">Admission</a>
            <a href="#admin">Portal Login</a>
            <a href="#records">Records</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroContent">
            <p className="eyebrow">Modern School Management Portal</p>
            <h1>Admissions, students, staff, fees, assignments, and results in one system.</h1>
            <p className="lead">
              A complete school portal for managing admission applications, student records, staff
              logins, class-based access, school fees, payment tracking, announcements, and academic
              results.
            </p>
            <div className="actions">
              <a className="primaryBtn" href="#admission">
                Apply for Admission
              </a>
              <a className="secondaryBtn" href="#admin">
                Portal Login
              </a>
            </div>
          </div>

          <div className="dashboardCard">
            <div className="cardTop">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="dashboardHeader">
              <div>
                <p>{isLoggedIn ? `Logged in as ${user.name}` : "Admin / Staff Access"}</p>
                <h2>{isLoggedIn ? `${user.role} Dashboard` : "Login Required"}</h2>
              </div>
              {isLoggedIn ? <ShieldCheck size={34} /> : <Lock size={34} />}
            </div>

            <div className="statsGrid">
              {stats.map((stat) => (
                <div key={stat.label} className="statBox">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="miniList">
              <p>
                <span></span> Backend: {API_BASE_URL}
              </p>
              <p>
                <span></span> API: {health?.status || (loading ? "checking" : "offline")}
              </p>
              <p>
                <span></span> Database: {health?.database || dbHealth?.database || "check pending"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="admission" className="section backendSection">
        <div className="sectionHeader">
          <p className="eyebrow">Admission Portal</p>
          <h2>Apply for admission</h2>
          <p>
            Parents or guardians can submit a student application here. The admin will review the
            application and convert accepted applicants into student records.
          </p>
        </div>

        <form
          className="formCard wideForm"
          onSubmit={(e) =>
            submitPublic(
              e,
              "/api/admissions",
              admissionForm,
              () => setAdmissionForm(emptyAdmission),
              "Admission application submitted successfully."
            )
          }
        >
          <div className="formTitle">
            <BookOpen size={22} />
            <h3>New Student Admission</h3>
          </div>

          <input
            placeholder="Student full name"
            value={admissionForm.studentName}
            onChange={(e) => setAdmissionForm({ ...admissionForm, studentName: e.target.value })}
          />

          <select
            value={admissionForm.classApplying}
            onChange={(e) => setAdmissionForm({ ...admissionForm, classApplying: e.target.value })}
          >
            {classes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={admissionForm.gender}
            onChange={(e) => setAdmissionForm({ ...admissionForm, gender: e.target.value })}
          >
            {genders.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            placeholder="Age"
            value={admissionForm.age}
            onChange={(e) => setAdmissionForm({ ...admissionForm, age: e.target.value })}
          />

          <select
            value={admissionForm.genotype}
            onChange={(e) => setAdmissionForm({ ...admissionForm, genotype: e.target.value })}
          >
            {genotypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <input
            placeholder="Previous school"
            value={admissionForm.previousSchool}
            onChange={(e) => setAdmissionForm({ ...admissionForm, previousSchool: e.target.value })}
          />

          <input
            placeholder="Parent/Guardian name"
            value={admissionForm.parentName}
            onChange={(e) => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
          />

          <input
            placeholder="Parent phone number"
            value={admissionForm.parentPhone}
            onChange={(e) => setAdmissionForm({ ...admissionForm, parentPhone: e.target.value })}
          />

          <input
            placeholder="Parent email"
            value={admissionForm.parentEmail}
            onChange={(e) => setAdmissionForm({ ...admissionForm, parentEmail: e.target.value })}
          />

          <textarea
            placeholder="Home address"
            value={admissionForm.homeAddress}
            onChange={(e) => setAdmissionForm({ ...admissionForm, homeAddress: e.target.value })}
          />

          <input
            placeholder="Passport photo URL"
            value={admissionForm.passportUrl}
            onChange={(e) => setAdmissionForm({ ...admissionForm, passportUrl: e.target.value })}
          />

          <textarea
            placeholder="Admission note"
            value={admissionForm.note}
            onChange={(e) => setAdmissionForm({ ...admissionForm, note: e.target.value })}
          />

          <button type="submit">Submit Application</button>
        </form>
      </section>

      <section id="admin" className="section backendSection">
        <div className="sectionHeader">
          <p className="eyebrow">Dashboard</p>
          <h2>Login and manage school workflows</h2>
          <p>Admin routes manage school records. Staff routes are limited to assigned class authorization.</p>
        </div>

        {notice && <p className="successBox">{notice}</p>}
        {error && <p className="errorBox">{error}</p>}

        {!isLoggedIn ? (
          <div className="authGrid">
            <form className="formCard" onSubmit={submitAuth}>
              <div className="formTitle">
                <Lock size={22} />
                <h3>{authMode === "register" ? "Register First Admin" : "Admin / Staff Login"}</h3>
              </div>

              {authMode === "register" && (
                <input
                  placeholder="Full name"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                />
              )}

              <input
                type="email"
                placeholder="Email address"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              />

              <button type="submit">
                {authMode === "register" ? "Create Admin Account" : "Login"}
              </button>

              <button
                className="ghostButton"
                type="button"
                onClick={() => setAuthMode(authMode === "register" ? "login" : "register")}
              >
                {authMode === "register" ? "Already have account? Login" : "First time? Register admin"}
              </button>
            </form>

            <article className="dataCard">
              <h3>Portal Access</h3>
              <div className="record">
                <strong>Admin</strong>
                <span>Can create, edit, delete, authorize staff, manage fees and payments.</span>
              </div>
              <div className="record">
                <strong>Staff</strong>
                <span>Can log in, view assigned class students, upload results, and write assignments.</span>
              </div>
              <div className="record">
                <strong>Storage Bucket</strong>
                <span>Passport photos, receipts, and report-card PDF URLs are prepared.</span>
              </div>
            </article>
          </div>
        ) : (
          <>
            <div className="apiStatusCard">
              <div>
                <Server size={26} />
                <strong>{user.name}</strong>
                <span>
                  {user.email} • {user.role}
                  {staffProfile ? ` • ${staffProfile.class_handled}` : ""}
                </span>
              </div>

              <div className="inlineActions">
                <button type="button" onClick={checkDatabase}>
                  Check Database
                </button>
                <button type="button" onClick={loadBackendData}>
                  <RefreshCw size={16} /> Refresh
                </button>
                <button type="button" onClick={logout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>

            {isStaff && (
              <div className="adminGrid">
                <article className="dataCard">
                  <h3>My Staff Profile</h3>
                  <div className="record">
                    <strong>{staffProfile?.name || user.name}</strong>
                    <span>{staffProfile?.role || "Staff"} • {staffProfile?.class_handled || "Not assigned"}</span>
                    <span>{user.email}</span>
                    <span>Subjects: {(staffProfile?.subjects || []).join(", ") || "None"}</span>
                    <span>This profile is read-only. Only admin can edit staff records.</span>
                  </div>
                </article>

                <article className="dataCard">
                  <h3>My Assigned Students</h3>
                  {staffStudents.length ? (
                    staffStudents.map((s) => (
                      <div className="record" key={s.id}>
                        <strong>{s.name}</strong>
                        <span>
                          {s.class_name} • {s.gender} • Age {s.age || "N/A"}
                        </span>
                        <span>
                          Parent: {s.parent_name || "N/A"} • {s.parent_phone || "N/A"}
                        </span>
                        <span>Subjects: {(s.subjects || []).join(", ") || "None"}</span>
                      </div>
                    ))
                  ) : (
                    <div className="record">
                      <strong>No student found</strong>
                      <span>
                        You are assigned to {staffProfile?.class_handled || "a class"}. Ask admin to
                        create students in that class.
                      </span>
                    </div>
                  )}
                </article>

                <form
                  className="formCard"
                  onSubmit={(e) =>
                    submitProtected(
                      e,
                      "/api/staff/grades",
                      staffGradeForm,
                      () => setStaffGradeForm(emptyGrade),
                      "Result uploaded for assigned class."
                    )
                  }
                >
                  <div className="formTitle">
                    <ClipboardList size={22} />
                    <h3>Upload Result for My Class</h3>
                  </div>

                  <select
                    value={staffGradeForm.studentId}
                    onChange={(e) =>
                      setStaffGradeForm({ ...staffGradeForm, studentId: e.target.value })
                    }
                  >
                    <option value="">Select assigned student</option>
                    {staffStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} - {student.class_name}
                      </option>
                    ))}
                  </select>

                  <input
                    placeholder="Subject"
                    value={staffGradeForm.subject}
                    onChange={(e) =>
                      setStaffGradeForm({ ...staffGradeForm, subject: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Score"
                    value={staffGradeForm.score}
                    onChange={(e) =>
                      setStaffGradeForm({ ...staffGradeForm, score: e.target.value })
                    }
                  />

                  <select
                    value={staffGradeForm.term}
                    onChange={(e) =>
                      setStaffGradeForm({ ...staffGradeForm, term: e.target.value })
                    }
                  >
                    {terms.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <input
                    placeholder="Report-card PDF URL"
                    value={staffGradeForm.reportCardUrl}
                    onChange={(e) =>
                      setStaffGradeForm({ ...staffGradeForm, reportCardUrl: e.target.value })
                    }
                  />

                  <button type="submit">Upload Result</button>
                </form>

                <form
                  className="formCard"
                  onSubmit={(e) =>
                    submitProtected(
                      e,
                      "/api/assignments",
                      assignmentForm,
                      () => setAssignmentForm(emptyAssignment),
                      "Assignment created successfully."
                    )
                  }
                >
                  <div className="formTitle">
                    <BookOpen size={22} />
                    <h3>Write Assignment</h3>
                  </div>

                  <input
                    placeholder="Assignment title"
                    value={assignmentForm.title}
                    onChange={(e) =>
                      setAssignmentForm({ ...assignmentForm, title: e.target.value })
                    }
                  />

                  <input
                    placeholder="Subject"
                    value={assignmentForm.subject}
                    onChange={(e) =>
                      setAssignmentForm({ ...assignmentForm, subject: e.target.value })
                    }
                  />

                  <textarea
                    placeholder="Assignment instructions"
                    value={assignmentForm.instructions}
                    onChange={(e) =>
                      setAssignmentForm({ ...assignmentForm, instructions: e.target.value })
                    }
                  />

                  <input
                    type="date"
                    value={assignmentForm.dueDate}
                    onChange={(e) =>
                      setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })
                    }
                  />

                  <input
                    placeholder="Attachment URL"
                    value={assignmentForm.attachmentUrl}
                    onChange={(e) =>
                      setAssignmentForm({ ...assignmentForm, attachmentUrl: e.target.value })
                    }
                  />

                  <button type="submit">Save Assignment</button>
                </form>
              </div>
            )}

            {isAdmin && (
              <>
                <section className="classSection">
                  <div className="sectionHeader">
                    <p className="eyebrow">Class Records</p>
                    <h2>View students by class</h2>
                    <p>Click any class to show only the students registered under that class.</p>
                  </div>

                  <div className="classGrid">
                    {classes.map((classItem) => (
                      <button
                        type="button"
                        key={classItem}
                        className={selectedClass === classItem ? "activeClassCard" : "classCard"}
                        onClick={() => setSelectedClass(classItem)}
                      >
                        <strong>{classItem}</strong>
                        <span>
                          {
                            students.filter((student) => student.class_name === classItem).length
                          }{" "}
                          students
                        </span>
                      </button>
                    ))}
                  </div>

                  <article className="dataCard">
                    <h3>{selectedClass} Students</h3>

                    {selectedClassStudents.length ? (
                      selectedClassStudents.map((student) => (
                        <div className="record" key={student.id}>
                          <strong>{student.name}</strong>
                          <span>
                            {student.class_name} • {student.gender} • Age{" "}
                            {student.age || "N/A"} • Genotype {student.genotype || "N/A"}
                          </span>
                          <span>{student.email}</span>
                          <span>
                            Parent: {student.parent_name || "N/A"} •{" "}
                            {student.parent_phone || "N/A"}
                          </span>
                          <span>Address: {student.home_address || "N/A"}</span>
                          <span>Subjects: {(student.subjects || []).join(", ") || "None"}</span>
                          {student.passport_url && (
                            <a href={student.passport_url} target="_blank" rel="noreferrer">
                              View Passport
                            </a>
                          )}
                          <span>
                            <button type="button" onClick={() => editStudent(student)}>
                              Edit
                            </button>{" "}
                            <button
                              type="button"
                              onClick={() =>
                                deleteRecord(`/api/students/${student.id}`, "Student deleted.")
                              }
                            >
                              Delete
                            </button>
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="record">
                        <strong>No student in {selectedClass}</strong>
                        <span>Create a student and assign them to {selectedClass}.</span>
                      </div>
                    )}
                  </article>
                </section>

                <div className="adminGrid">
                  <form
                    className="formCard"
                    onSubmit={(e) =>
                      submitProtected(
                        e,
                        "/api/students",
                        studentForm,
                        () => setStudentForm(emptyStudent),
                        "Student profile saved permanently."
                      )
                    }
                  >
                    <div className="formTitle">
                      <Users size={22} />
                      <h3>Create Student</h3>
                    </div>

                    <input
                      placeholder="Admission number"
                      value={studentForm.admissionNumber}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, admissionNumber: e.target.value })
                      }
                    />

                    <input
                      placeholder="Student name"
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    />

                    <input
                      type="email"
                      placeholder="Student email"
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    />

                    <select
                      value={studentForm.className}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, className: e.target.value })
                      }
                    >
                      {classes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <select
                      value={studentForm.gender}
                      onChange={(e) => setStudentForm({ ...studentForm, gender: e.target.value })}
                    >
                      {genders.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="1"
                      placeholder="Age"
                      value={studentForm.age}
                      onChange={(e) => setStudentForm({ ...studentForm, age: e.target.value })}
                    />

                    <select
                      value={studentForm.genotype}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, genotype: e.target.value })
                      }
                    >
                      {genotypes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Parent/Guardian name"
                      value={studentForm.parentName}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, parentName: e.target.value })
                      }
                    />

                    <input
                      placeholder="Parent phone number"
                      value={studentForm.parentPhone}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, parentPhone: e.target.value })
                      }
                    />

                    <input
                      placeholder="Parent email"
                      value={studentForm.parentEmail}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, parentEmail: e.target.value })
                      }
                    />

                    <input
                      placeholder="Emergency contact"
                      value={studentForm.emergencyContact}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, emergencyContact: e.target.value })
                      }
                    />

                    <textarea
                      placeholder="Home address"
                      value={studentForm.homeAddress}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, homeAddress: e.target.value })
                      }
                    />

                    <select
                      value={studentForm.term}
                      onChange={(e) => setStudentForm({ ...studentForm, term: e.target.value })}
                    >
                      {terms.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Subjects comma separated"
                      value={studentForm.subjects}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, subjects: e.target.value })
                      }
                    />

                    <input
                      placeholder="Passport photo URL"
                      value={studentForm.passportUrl}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, passportUrl: e.target.value })
                      }
                    />

                    <button type="submit">Save Student</button>
                  </form>

                  <form
                    className="formCard"
                    onSubmit={(e) =>
                      submitProtected(
                        e,
                        "/api/staff",
                        staffForm,
                        () => setStaffForm(emptyStaff),
                        "Staff member and login saved."
                      )
                    }
                  >
                    <div className="formTitle">
                      <ShieldCheck size={22} />
                      <h3>Create Staff Login</h3>
                    </div>

                    <input
                      placeholder="Staff ID"
                      value={staffForm.staffId}
                      onChange={(e) => setStaffForm({ ...staffForm, staffId: e.target.value })}
                    />

                    <input
                      placeholder="Staff name"
                      value={staffForm.name}
                      onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    />

                    <input
                      type="email"
                      placeholder="Staff email/login"
                      value={staffForm.email}
                      onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    />

                    <input
                      type="password"
                      placeholder="Temporary staff password"
                      value={staffForm.password}
                      onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                    />

                    <input
                      placeholder="Role e.g. Form Teacher"
                      value={staffForm.role}
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    />

                    <select
                      value={staffForm.classHandled}
                      onChange={(e) =>
                        setStaffForm({ ...staffForm, classHandled: e.target.value })
                      }
                    >
                      <option>Non-teaching</option>
                      {classes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <select
                      value={staffForm.gender}
                      onChange={(e) => setStaffForm({ ...staffForm, gender: e.target.value })}
                    >
                      {genders.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Phone number"
                      value={staffForm.phone}
                      onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    />

                    <input
                      placeholder="Department"
                      value={staffForm.department}
                      onChange={(e) =>
                        setStaffForm({ ...staffForm, department: e.target.value })
                      }
                    />

                    <input
                      placeholder="Qualification"
                      value={staffForm.qualification}
                      onChange={(e) =>
                        setStaffForm({ ...staffForm, qualification: e.target.value })
                      }
                    />

                    <textarea
                      placeholder="Home address"
                      value={staffForm.homeAddress}
                      onChange={(e) =>
                        setStaffForm({ ...staffForm, homeAddress: e.target.value })
                      }
                    />

                    <input
                      placeholder="Subjects comma separated"
                      value={staffForm.subjects}
                      onChange={(e) => setStaffForm({ ...staffForm, subjects: e.target.value })}
                    />

                    <input
                      placeholder="Staff photo URL"
                      value={staffForm.photoUrl}
                      onChange={(e) => setStaffForm({ ...staffForm, photoUrl: e.target.value })}
                    />

                    <button type="submit">Save Staff + Login</button>
                  </form>

                  <form
                    className="formCard"
                    onSubmit={(e) =>
                      submitProtected(
                        e,
                        "/api/fees",
                        feeForm,
                        () => setFeeForm(emptyFee),
                        "School fee uploaded."
                      )
                    }
                  >
                    <div className="formTitle">
                      <ClipboardList size={22} />
                      <h3>Upload School Fee</h3>
                    </div>

                    <input
                      placeholder="Fee title e.g. Tuition Fee"
                      value={feeForm.title}
                      onChange={(e) => setFeeForm({ ...feeForm, title: e.target.value })}
                    />

                    <select
                      value={feeForm.className}
                      onChange={(e) => setFeeForm({ ...feeForm, className: e.target.value })}
                    >
                      {classes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <select
                      value={feeForm.term}
                      onChange={(e) => setFeeForm({ ...feeForm, term: e.target.value })}
                    >
                      {terms.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="0"
                      placeholder="Amount"
                      value={feeForm.amount}
                      onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })}
                    />

                    <input
                      placeholder="Session e.g. 2025/2026"
                      value={feeForm.session}
                      onChange={(e) => setFeeForm({ ...feeForm, session: e.target.value })}
                    />

                    <input
                      type="date"
                      value={feeForm.dueDate}
                      onChange={(e) => setFeeForm({ ...feeForm, dueDate: e.target.value })}
                    />

                    <textarea
                      placeholder="Fee note"
                      value={feeForm.note}
                      onChange={(e) => setFeeForm({ ...feeForm, note: e.target.value })}
                    />

                    <button type="submit">Save Fee</button>
                  </form>

                  <form
                    className="formCard"
                    onSubmit={(e) =>
                      submitProtected(
                        e,
                        "/api/payments",
                        paymentForm,
                        () => setPaymentForm(emptyPayment),
                        "Payment recorded."
                      )
                    }
                  >
                    <div className="formTitle">
                      <Mail size={22} />
                      <h3>Record Fee Payment</h3>
                    </div>

                    <select
                      value={paymentForm.studentId}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, studentId: e.target.value })
                      }
                    >
                      <option value="">Select student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name} - {student.class_name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={paymentForm.feeItemId}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, feeItemId: e.target.value })
                      }
                    >
                      <option value="">Select fee</option>
                      {fees.map((fee) => (
                        <option key={fee.id} value={fee.id}>
                          {fee.title} - {fee.class_name} - ₦{Number(fee.amount).toLocaleString()}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="0"
                      placeholder="Amount paid"
                      value={paymentForm.amountPaid}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, amountPaid: e.target.value })
                      }
                    />

                    <select
                      value={paymentForm.paymentMethod}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })
                      }
                    >
                      {paymentMethods.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Receipt/reference number"
                      value={paymentForm.reference}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, reference: e.target.value })
                      }
                    />

                    <input
                      placeholder="Receipt URL"
                      value={paymentForm.receiptUrl}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, receiptUrl: e.target.value })
                      }
                    />

                    <textarea
                      placeholder="Payment note"
                      value={paymentForm.note}
                      onChange={(e) => setPaymentForm({ ...paymentForm, note: e.target.value })}
                    />

                    <button type="submit">Record Payment</button>
                  </form>

                  <form
                    className="formCard"
                    onSubmit={(e) =>
                      submitProtected(
                        e,
                        "/api/grades",
                        gradeForm,
                        () => setGradeForm(emptyGrade),
                        "Grade saved and result updated."
                      )
                    }
                  >
                    <div className="formTitle">
                      <ClipboardList size={22} />
                      <h3>Upload Result/Grade</h3>
                    </div>

                    <select
                      value={gradeForm.studentId}
                      onChange={(e) => setGradeForm({ ...gradeForm, studentId: e.target.value })}
                    >
                      <option value="">Select student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name} - {student.class_name}
                        </option>
                      ))}
                    </select>

                    <input
                      placeholder="Subject"
                      value={gradeForm.subject}
                      onChange={(e) => setGradeForm({ ...gradeForm, subject: e.target.value })}
                    />

                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Score"
                      value={gradeForm.score}
                      onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })}
                    />

                    <select
                      value={gradeForm.term}
                      onChange={(e) => setGradeForm({ ...gradeForm, term: e.target.value })}
                    >
                      {terms.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Report-card PDF URL"
                      value={gradeForm.reportCardUrl}
                      onChange={(e) =>
                        setGradeForm({ ...gradeForm, reportCardUrl: e.target.value })
                      }
                    />

                    <button type="submit">Upload Result</button>
                  </form>

                  <form
                    className="formCard"
                    onSubmit={(e) =>
                      submitProtected(
                        e,
                        "/api/announcements",
                        announcementForm,
                        () => setAnnouncementForm(emptyAnnouncement),
                        "Announcement published."
                      )
                    }
                  >
                    <div className="formTitle">
                      <Mail size={22} />
                      <h3>Publish Announcement</h3>
                    </div>

                    <input
                      placeholder="Title"
                      value={announcementForm.title}
                      onChange={(e) =>
                        setAnnouncementForm({ ...announcementForm, title: e.target.value })
                      }
                    />

                    <select
                      value={announcementForm.audience}
                      onChange={(e) =>
                        setAnnouncementForm({ ...announcementForm, audience: e.target.value })
                      }
                    >
                      <option>All</option>
                      <option>Students</option>
                      <option>Staff</option>
                      <option>Parents</option>
                    </select>

                    <textarea
                      placeholder="Announcement message"
                      value={announcementForm.message}
                      onChange={(e) =>
                        setAnnouncementForm({ ...announcementForm, message: e.target.value })
                      }
                    />

                    <button type="submit">Publish</button>
                  </form>

                  <form
                    className="formCard"
                    onSubmit={(e) =>
                      submitProtected(
                        e,
                        "/api/messages",
                        messageForm,
                        () => setMessageForm(emptyMessage),
                        "Message sent and saved."
                      )
                    }
                  >
                    <div className="formTitle">
                      <MessageCircle size={22} />
                      <h3>Send Message</h3>
                    </div>

                    <select
                      value={messageForm.to}
                      onChange={(e) => setMessageForm({ ...messageForm, to: e.target.value })}
                    >
                      <option>Admin</option>
                      <option>Staff</option>
                      <option>Student</option>
                      <option>Parent</option>
                    </select>

                    <textarea
                      placeholder="Message"
                      value={messageForm.message}
                      onChange={(e) =>
                        setMessageForm({ ...messageForm, message: e.target.value })
                      }
                    />

                    <button type="submit">Send Message</button>
                  </form>
                </div>

                <section className="classSection">
                  <div className="sectionHeader">
                    <p className="eyebrow">Admission Applications</p>
                    <h2>Review student applications</h2>
                    <p>Accept applicants and convert them into registered students.</p>
                  </div>

                  <div className="dataGrid">
                    {admissions.length ? (
                      admissions.map((item) => (
                        <article className="dataCard" key={item.id}>
                          <h3>{item.student_name || item.studentName}</h3>
                          <div className="record">
                            <strong>{item.class_applying || item.classApplying}</strong>
                            <span>Status: {item.status || "Pending"}</span>
                            <span>
                              Parent: {item.parent_name || item.parentName} •{" "}
                              {item.parent_phone || item.parentPhone}
                            </span>
                            <span>{item.parent_email || item.parentEmail}</span>
                            <button type="button" onClick={() => convertAdmission(item.id)}>
                              Accept & Convert to Student
                            </button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <article className="dataCard">
                        <h3>No admission applications yet</h3>
                        <p>Applications submitted from the public admission form will appear here.</p>
                      </article>
                    )}
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </section>

      {isLoggedIn && isAdmin && (
        <section id="records" className="section backendSection">
          <div className="sectionHeader">
            <p className="eyebrow">Live Admin Records</p>
            <h2>See everything you logged</h2>
            <p>Admin can edit/delete records. Staff can view assigned class records from their dashboard.</p>
          </div>

          <div className="dataGrid">
            <article className="dataCard">
              <h3>Student Profiles</h3>
              {students.map((s) => (
                <div className="record" key={s.id}>
                  <strong>{s.name}</strong>
                  <span>
                    {s.class_name} • {s.gender} • Age {s.age || "N/A"} • Genotype{" "}
                    {s.genotype || "N/A"}
                  </span>
                  <span>{s.email}</span>
                  <span>
                    Parent: {s.parent_name || "N/A"} • {s.parent_phone || "N/A"}
                  </span>
                  <span>Address: {s.home_address || "N/A"}</span>
                  <span>Subjects: {(s.subjects || []).join(", ") || "None"}</span>
                  {s.passport_url && (
                    <a href={s.passport_url} target="_blank" rel="noreferrer">
                      View Passport
                    </a>
                  )}
                  <span>
                    <button onClick={() => editStudent(s)}>Edit</button>{" "}
                    <button
                      onClick={() => deleteRecord(`/api/students/${s.id}`, "Student deleted.")}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Staff</h3>
              {staff.map((m) => (
                <div className="record" key={m.id}>
                  <strong>{m.name}</strong>
                  <span>
                    {m.role} • {m.class_handled}
                  </span>
                  <span>
                    {m.gender} • {m.email}
                  </span>
                  <span>Subjects: {(m.subjects || []).join(", ") || "None"}</span>
                  {m.photo_url && (
                    <a href={m.photo_url} target="_blank" rel="noreferrer">
                      View Staff Photo
                    </a>
                  )}
                  <span>
                    <button onClick={() => editStaff(m)}>Edit</button>{" "}
                    <button onClick={() => deleteRecord(`/api/staff/${m.id}`, "Staff deleted.")}>
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>School Fees</h3>
              {fees.map((f) => (
                <div className="record" key={f.id}>
                  <strong>{f.title}</strong>
                  <span>
                    {f.class_name} • {f.term} • {f.session}
                  </span>
                  <span>Amount: ₦{Number(f.amount).toLocaleString()}</span>
                  <span>
                    <button onClick={() => editFee(f)}>Edit</button>{" "}
                    <button onClick={() => deleteRecord(`/api/fees/${f.id}`, "Fee deleted.")}>
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Fee Payments</h3>
              {payments.map((p) => (
                <div className="record" key={p.id}>
                  <strong>{p.student_name}</strong>
                  <span>
                    {p.fee_title} • Paid ₦{Number(p.amount_paid).toLocaleString()}
                  </span>
                  <span>
                    {p.payment_method} • Ref: {p.reference || "N/A"}
                  </span>
                  {p.receipt_url && (
                    <a href={p.receipt_url} target="_blank" rel="noreferrer">
                      View Receipt
                    </a>
                  )}
                  <span>
                    <button
                      onClick={() => deleteRecord(`/api/payments/${p.id}`, "Payment deleted.")}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Fee Balances</h3>
              {balances.map((b) => (
                <div className="record" key={`${b.student_id}-${b.fee_item_id}`}>
                  <strong>{b.student_name}</strong>
                  <span>
                    {b.title} • {b.class_name} • {b.term}
                  </span>
                  <span>
                    Expected ₦{Number(b.expected_amount).toLocaleString()} • Paid ₦
                    {Number(b.paid_amount).toLocaleString()}
                  </span>
                  <span>Balance: ₦{Number(b.balance).toLocaleString()}</span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Result Summary</h3>
              {results.map((r) => (
                <div className="record" key={r.student_id}>
                  <strong>{r.name}</strong>
                  <span>
                    {r.class_name} • {r.term}
                  </span>
                  <span>
                    Subjects: {r.subjects_count} • Average: {Number(r.average_score).toFixed(2)}%
                  </span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Grades</h3>
              {grades.map((g) => (
                <div className="record" key={g.id}>
                  <strong>{g.subject}</strong>
                  <span>
                    {g.student_name || `Student #${g.student_id}`} • Score {g.score} • Grade{" "}
                    {g.grade}
                  </span>
                  <span>
                    {g.term} • Uploaded by {g.uploaded_by || "Admin"}
                  </span>
                  {g.report_card_url && (
                    <a href={g.report_card_url} target="_blank" rel="noreferrer">
                      View Report Card
                    </a>
                  )}
                  <span>
                    <button onClick={() => deleteRecord(`/api/grades/${g.id}`, "Grade deleted.")}>
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Assignments</h3>
              {assignments.length ? (
                assignments.map((a) => (
                  <div className="record" key={a.id}>
                    <strong>{a.title}</strong>
                    <span>
                      {a.class_name} • {a.subject}
                    </span>
                    <span>{a.instructions}</span>
                  </div>
                ))
              ) : (
                <div className="record">
                  <strong>No assignments yet</strong>
                  <span>Assignments created by staff will appear here.</span>
                </div>
              )}
            </article>

            <article className="dataCard">
              <h3>Announcements</h3>
              {announcements.map((a) => (
                <div className="record" key={a.id}>
                  <strong>{a.title}</strong>
                  <span>
                    {a.audience} • {a.message}
                  </span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Messages</h3>
              {messages.map((m) => (
                <div className="record" key={m.id}>
                  <strong>
                    {m.sender} → {m.recipient}
                  </strong>
                  <span>{m.message}</span>
                </div>
              ))}
            </article>

            <article className="dataCard">
              <h3>Notifications</h3>
              {notifications.length ? (
                notifications.map((n) => (
                  <div className="record" key={n.id}>
                    <strong>{n.subject}</strong>
                    <span>
                      {n.recipient} • {n.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="record">
                  <strong>No notifications yet</strong>
                  <span>Notifications are visible to admin only.</span>
                </div>
              )}
            </article>
          </div>
        </section>
      )}

      <section id="features" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Working Modules</p>
          <h2>School portal features now active</h2>
          <p>
            Admission portal, admin dashboard, class records, staff login, staff result upload,
            fees, payments, balances, assignments, and file URL fields are ready.
          </p>
        </div>

        <div className="featureGrid">
          {[
            {
              icon: BookOpen,
              title: "Admission Portal",
              description: "Parents can submit student applications from the public page.",
            },
            {
              icon: LayoutDashboard,
              title: "Admin Dashboard",
              description: "Create, edit, and delete school records.",
            },
            {
              icon: Users,
              title: "Class Records",
              description: "Click JSS1, JSS2, JSS3, SS1, SS2, or SS3 to view students.",
            },
            {
              icon: ClipboardList,
              title: "Result Upload",
              description: "Staff upload results for assigned class only.",
            },
            {
              icon: ShieldCheck,
              title: "Authorization",
              description: "Admin and staff permissions are separated.",
            },
            {
              icon: Upload,
              title: "File URLs",
              description: "Passport, receipts, and report-card links are prepared.",
            },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="featureCard" key={feature.title}>
                <Icon size={28} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
