import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Users,
  ClipboardList,
  MessageCircle,
  Mail,
  Server,
  RefreshCw,
  LogOut,
  Lock,
} from "lucide-react";
import "./styles.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://school-backend-rkq3.onrender.com";

const emptyStudent = {
  name: "",
  email: "",
  className: "",
  gender: "",
  parentName: "",
  term: "First Term",
  subjects: "",
};

const emptyStaff = {
  name: "",
  email: "",
  role: "",
  classHandled: "",
  gender: "",
  subjects: "",
};

const emptyGrade = {
  studentId: "",
  subject: "",
  score: "",
  term: "First Term",
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

function App() {
  const [health, setHealth] = useState(null);
  const [dbHealth, setDbHealth] = useState(null);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [grades, setGrades] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
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

  const isLoggedIn = Boolean(token && user);

  const api = async (path, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

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

      const [healthData, studentsData, staffData, gradesData, announcementsData, messagesData] =
        await Promise.all([
          api("/api/health"),
          api("/api/students"),
          api("/api/staff"),
          api("/api/grades"),
          api("/api/announcements"),
          api("/api/messages"),
        ]);

      setHealth(healthData);
      setStudents(studentsData.data || []);
      setStaff(staffData.data || []);
      setGrades(gradesData.data || []);
      setAnnouncements(announcementsData.data || []);
      setMessages(messagesData.data || []);

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

  useEffect(() => {
    loadBackendData();
  }, [token]);

  const stats = useMemo(
    () => [
      { value: students.length, label: "Students" },
      { value: staff.length, label: "Staff" },
      { value: grades.length, label: "Grades" },
    ],
    [students.length, staff.length, grades.length]
  );

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

      const data = await api(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

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
    setNotice("Logged out successfully.");
  };

  const submitProtected = async (event, path, form, resetForm, successText) => {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      await api(path, {
        method: "POST",
        body: JSON.stringify(form),
      });
      resetForm();
      setNotice(successText);
      await loadBackendData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand">
            <GraduationCap size={28} />
            <span>SchoolPortal</span>
          </div>
          <div className="navLinks">
            <a href="https://github.com/Abobbynwa/school-portal" target="_blank" rel="noreferrer">
              Frontend Repo
            </a>
            <a href="https://github.com/Abobbynwa/school-backend" target="_blank" rel="noreferrer">
              Backend Repo
            </a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroContent">
            <p className="eyebrow">Real Full-Stack School System</p>
            <h1>Live school portal with login, admin dashboard, and saved database records.</h1>
            <p className="lead">
              This system connects React, Express, JWT authentication, and Supabase PostgreSQL
              to manage students, staff, grades, announcements, messages, and notifications.
            </p>
            <div className="actions">
              <a className="primaryBtn" href="#admin">Open Admin Dashboard</a>
              <a className="secondaryBtn" href="#records">View Live Records</a>
            </div>
          </div>

          <div className="dashboardCard" aria-label="Dashboard preview">
            <div className="cardTop">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="dashboardHeader">
              <div>
                <p>{isLoggedIn ? `Logged in as ${user.name}` : "Admin Access"}</p>
                <h2>{isLoggedIn ? "Dashboard Active" : "Login Required"}</h2>
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
              <p><span></span> Backend: {API_BASE_URL}</p>
              <p><span></span> API: {health?.status || (loading ? "checking" : "offline")}</p>
              <p><span></span> Database: {health?.database || dbHealth?.database || "check pending"}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="admin" className="section backendSection">
        <div className="sectionHeader">
          <p className="eyebrow">Admin Dashboard</p>
          <h2>Login and manage real school records</h2>
          <p>
            Admin actions are protected by JWT tokens. Records are saved through the backend into PostgreSQL.
          </p>
        </div>

        {notice && <p className="successBox">{notice}</p>}
        {error && <p className="errorBox">{error}</p>}

        {!isLoggedIn ? (
          <div className="authGrid">
            <form className="formCard" onSubmit={submitAuth}>
              <div className="formTitle">
                <Lock size={22} />
                <h3>{authMode === "register" ? "Register First Admin" : "Admin Login"}</h3>
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
                {authMode === "register" ? "Already have admin? Login" : "First time? Register admin"}
              </button>
            </form>

            <article className="dataCard">
              <h3>Protected System</h3>
              <div className="record"><strong>Authentication</strong><span>JWT login and token verification</span></div>
              <div className="record"><strong>Database</strong><span>Supabase PostgreSQL persistence</span></div>
              <div className="record"><strong>Admin Routes</strong><span>Student, staff, grade, announcement, notification creation</span></div>
            </article>
          </div>
        ) : (
          <>
            <div className="apiStatusCard">
              <div>
                <Server size={26} />
                <strong>{user.name}</strong>
                <span>{user.email} • {user.role}</span>
              </div>
              <div className="inlineActions">
                <button type="button" onClick={checkDatabase}>Check Database</button>
                <button type="button" onClick={loadBackendData}><RefreshCw size={16} /> Refresh</button>
                <button type="button" onClick={logout}><LogOut size={16} /> Logout</button>
              </div>
            </div>

            <div className="adminGrid">
              <form
                className="formCard"
                onSubmit={(e) =>
                  submitProtected(e, "/api/students", studentForm, () => setStudentForm(emptyStudent), "Student saved permanently.")
                }
              >
                <div className="formTitle"><Users size={22} /><h3>Create Student</h3></div>
                <input placeholder="Student name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} />
                <input type="email" placeholder="Student email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} />
                <input placeholder="Class e.g. SS1 Science" value={studentForm.className} onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })} />
                <input placeholder="Gender" value={studentForm.gender} onChange={(e) => setStudentForm({ ...studentForm, gender: e.target.value })} />
                <input placeholder="Parent name" value={studentForm.parentName} onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })} />
                <input placeholder="Subjects comma separated" value={studentForm.subjects} onChange={(e) => setStudentForm({ ...studentForm, subjects: e.target.value })} />
                <button type="submit">Save Student</button>
              </form>

              <form
                className="formCard"
                onSubmit={(e) =>
                  submitProtected(e, "/api/staff", staffForm, () => setStaffForm(emptyStaff), "Staff member saved permanently.")
                }
              >
                <div className="formTitle"><ShieldCheck size={22} /><h3>Create Staff</h3></div>
                <input placeholder="Staff name" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} />
                <input type="email" placeholder="Staff email" value={staffForm.email} onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })} />
                <input placeholder="Role e.g. Form Teacher" value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} />
                <input placeholder="Class handled" value={staffForm.classHandled} onChange={(e) => setStaffForm({ ...staffForm, classHandled: e.target.value })} />
                <input placeholder="Gender" value={staffForm.gender} onChange={(e) => setStaffForm({ ...staffForm, gender: e.target.value })} />
                <input placeholder="Subjects comma separated" value={staffForm.subjects} onChange={(e) => setStaffForm({ ...staffForm, subjects: e.target.value })} />
                <button type="submit">Save Staff</button>
              </form>

              <form
                className="formCard"
                onSubmit={(e) =>
                  submitProtected(e, "/api/grades", gradeForm, () => setGradeForm(emptyGrade), "Grade saved and notification queued.")
                }
              >
                <div className="formTitle"><ClipboardList size={22} /><h3>Upload Grade</h3></div>
                <select value={gradeForm.studentId} onChange={(e) => setGradeForm({ ...gradeForm, studentId: e.target.value })}>
                  <option value="">Select student</option>
                  {students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}
                </select>
                <input placeholder="Subject" value={gradeForm.subject} onChange={(e) => setGradeForm({ ...gradeForm, subject: e.target.value })} />
                <input type="number" min="0" max="100" placeholder="Score" value={gradeForm.score} onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })} />
                <input placeholder="Term" value={gradeForm.term} onChange={(e) => setGradeForm({ ...gradeForm, term: e.target.value })} />
                <button type="submit">Upload Grade</button>
              </form>

              <form
                className="formCard"
                onSubmit={(e) =>
                  submitProtected(e, "/api/announcements", announcementForm, () => setAnnouncementForm(emptyAnnouncement), "Announcement published.")
                }
              >
                <div className="formTitle"><Mail size={22} /><h3>Publish Announcement</h3></div>
                <input placeholder="Title" value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} />
                <select value={announcementForm.audience} onChange={(e) => setAnnouncementForm({ ...announcementForm, audience: e.target.value })}>
                  <option>All</option><option>Students</option><option>Staff</option><option>Parents</option>
                </select>
                <textarea placeholder="Announcement message" value={announcementForm.message} onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })} />
                <button type="submit">Publish</button>
              </form>

              <form
                className="formCard"
                onSubmit={(e) =>
                  submitProtected(e, "/api/messages", messageForm, () => setMessageForm(emptyMessage), "Message sent and saved.")
                }
              >
                <div className="formTitle"><MessageCircle size={22} /><h3>Send Message</h3></div>
                <select value={messageForm.to} onChange={(e) => setMessageForm({ ...messageForm, to: e.target.value })}>
                  <option>Admin</option><option>Staff</option><option>Student</option><option>Parent</option>
                </select>
                <textarea placeholder="Message" value={messageForm.message} onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })} />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </>
        )}
      </section>

      <section id="records" className="section backendSection">
        <div className="sectionHeader">
          <p className="eyebrow">Live Records</p>
          <h2>Records loaded from the backend database</h2>
          <p>These lists refresh from the deployed Express API connected to Supabase PostgreSQL.</p>
        </div>

        <div className="dataGrid">
          <article className="dataCard"><h3>Students</h3>{students.map((s) => <div className="record" key={s.id}><strong>{s.name}</strong><span>{s.class_name || s.className} • {s.email}</span></div>)}</article>
          <article className="dataCard"><h3>Staff</h3>{staff.map((m) => <div className="record" key={m.id}><strong>{m.name}</strong><span>{m.role} • {m.class_handled || m.classHandled}</span></div>)}</article>
          <article className="dataCard"><h3>Grades</h3>{grades.map((g) => <div className="record" key={g.id}><strong>{g.subject}</strong><span>{g.student_name || `Student #${g.student_id || g.studentId}`} • Score {g.score} • Grade {g.grade}</span></div>)}</article>
          <article className="dataCard"><h3>Announcements</h3>{announcements.map((a) => <div className="record" key={a.id}><strong>{a.title}</strong><span>{a.audience} • {a.message}</span></div>)}</article>
          <article className="dataCard"><h3>Messages</h3>{messages.map((m) => <div className="record" key={m.id}><strong>{m.sender || m.from} → {m.recipient || m.to}</strong><span>{m.message}</span></div>)}</article>
          <article className="dataCard"><h3>Notifications</h3>{notifications.length ? notifications.map((n) => <div className="record" key={n.id}><strong>{n.subject}</strong><span>{n.recipient} • {n.status}</span></div>) : <div className="record"><strong>Login required</strong><span>Notifications are visible to admin only.</span></div>}</article>
        </div>
      </section>

      <section id="features" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Working Features</p>
          <h2>Real workflows now connected</h2>
          <p>Login, protected admin actions, database saves, grade uploads, announcements, and messages are now functional.</p>
        </div>
        <div className="featureGrid">
          {[{ icon: LayoutDashboard, title: "Admin Dashboard", description: "Protected dashboard with real create forms." }, { icon: Users, title: "Student & Staff Records", description: "Saved permanently in PostgreSQL." }, { icon: ClipboardList, title: "Academic Management", description: "Grade upload calculates grades and queues notifications." }, { icon: ShieldCheck, title: "JWT Authentication", description: "Login and protected backend routes." }, { icon: MessageCircle, title: "Messages", description: "Messages are sent and stored through the API." }, { icon: Mail, title: "Announcements", description: "Announcements are published to the database." }].map((feature) => { const Icon = feature.icon; return <article className="featureCard" key={feature.title}><Icon size={28} /><h3>{feature.title}</h3><p>{feature.description}</p></article>; })}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
