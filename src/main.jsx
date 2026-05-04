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
} from "lucide-react";
import "./styles.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://school-backend-rkq3.onrender.com";

const features = [
  {
    icon: LayoutDashboard,
    title: "Role-Based Dashboards",
    description:
      "Separate dashboard experiences for Admin, Staff, and Students with focused workflows.",
  },
  {
    icon: Users,
    title: "Student & Staff Records",
    description:
      "Structured profile management for students, teachers, and non-teaching staff.",
  },
  {
    icon: ClipboardList,
    title: "Academic Management",
    description:
      "Designed for subjects, classes, grades, assignments, and report-card workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Secure System Design",
    description:
      "Built with authentication, protected routes, and backend authorization in mind.",
  },
  {
    icon: MessageCircle,
    title: "Communication Ready",
    description:
      "Prepared for Admin-to-Student and Admin-to-Staff chat and notification features.",
  },
  {
    icon: Mail,
    title: "Email Notifications",
    description:
      "Supports future email triggers for grades, assignments, and school announcements.",
  },
];

const roles = [
  {
    title: "Admin",
    points: [
      "Create student and staff accounts",
      "Manage classes, profiles, and records",
      "Control school-wide academic workflows",
    ],
  },
  {
    title: "Staff",
    points: [
      "View assigned students and classes",
      "Upload grades and assignments",
      "Support academic communication",
    ],
  },
  {
    title: "Student",
    points: [
      "View profile and academic records",
      "Access subjects and assignments",
      "Download report-card-ready records",
    ],
  },
];

function App() {
  const [health, setHealth] = useState(null);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBackendData = async () => {
    try {
      setLoading(true);
      setError("");

      const [healthRes, studentsRes, staffRes, gradesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/health`),
        fetch(`${API_BASE_URL}/api/students`),
        fetch(`${API_BASE_URL}/api/staff`),
        fetch(`${API_BASE_URL}/api/grades`),
      ]);

      if (!healthRes.ok || !studentsRes.ok || !staffRes.ok || !gradesRes.ok) {
        throw new Error("One or more backend requests failed.");
      }

      const [healthData, studentsData, staffData, gradesData] = await Promise.all([
        healthRes.json(),
        studentsRes.json(),
        staffRes.json(),
        gradesRes.json(),
      ]);

      setHealth(healthData);
      setStudents(studentsData.data || []);
      setStaff(staffData.data || []);
      setGrades(gradesData.data || []);
    } catch (err) {
      setError(
        "Frontend is live, but it could not reach the backend. Check VITE_API_BASE_URL and backend CORS settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, []);

  const stats = useMemo(
    () => [
      { value: students.length || "--", label: "Students from API" },
      { value: staff.length || "--", label: "Staff from API" },
      { value: grades.length || "--", label: "Grades from API" },
    ],
    [students.length, staff.length, grades.length]
  );

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
            <p className="eyebrow">Full-Stack Education Technology</p>
            <h1>Modern school management portal connected to a live backend API.</h1>
            <p className="lead">
              A portfolio-ready school system interface designed to simplify student records,
              staff management, academic workflows, and secure role-based access.
            </p>
            <div className="actions">
              <a className="primaryBtn" href="#backend">View Live API Data</a>
              <a className="secondaryBtn" href="#features">Explore Features</a>
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
                <p>Admin Overview</p>
                <h2>School Operations</h2>
              </div>
              <BookOpen size={34} />
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
              <p><span></span> Backend URL: {API_BASE_URL}</p>
              <p><span></span> API Status: {health?.status || (loading ? "checking" : "offline")}</p>
              <p><span></span> Frontend connected through VITE_API_BASE_URL</p>
            </div>
          </div>
        </div>
      </section>

      <section id="backend" className="section backendSection">
        <div className="sectionHeader">
          <p className="eyebrow">Live Backend Connection</p>
          <h2>Frontend fetching data from the Express API</h2>
          <p>
            This section proves the frontend and backend are connected. It reads students,
            staff, grades, and health status from the backend API.
          </p>
        </div>

        <div className="apiStatusCard">
          <div>
            <Server size={26} />
            <strong>{loading ? "Checking backend..." : health?.service || "Backend connection"}</strong>
            <span>{health?.timestamp || "No timestamp available"}</span>
          </div>
          <button type="button" onClick={loadBackendData}>
            <RefreshCw size={16} />
            Refresh API Data
          </button>
        </div>

        {error && <p className="errorBox">{error}</p>}

        <div className="dataGrid">
          <article className="dataCard">
            <h3>Students</h3>
            {students.map((student) => (
              <div className="record" key={student.id}>
                <strong>{student.name}</strong>
                <span>{student.className} • {student.email}</span>
              </div>
            ))}
          </article>

          <article className="dataCard">
            <h3>Staff</h3>
            {staff.map((member) => (
              <div className="record" key={member.id}>
                <strong>{member.name}</strong>
                <span>{member.role} • {member.classHandled}</span>
              </div>
            ))}
          </article>

          <article className="dataCard">
            <h3>Grades</h3>
            {grades.map((grade) => (
              <div className="record" key={grade.id}>
                <strong>{grade.subject}</strong>
                <span>Student #{grade.studentId} • Score {grade.score} • Grade {grade.grade}</span>
              </div>
            ))}
          </article>
        </div>
      </section>

      <section id="features" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Core Features</p>
          <h2>Built around real school operations</h2>
          <p>
            The portal focuses on practical workflows that schools need daily, from user
            management to academic records and communication.
          </p>
        </div>

        <div className="featureGrid">
          {features.map((feature) => {
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

      <section id="roles" className="section altSection">
        <div className="sectionHeader">
          <p className="eyebrow">User Roles</p>
          <h2>Designed for Admin, Staff, and Student access</h2>
        </div>

        <div className="roleGrid">
          {roles.map((role) => (
            <article className="roleCard" key={role.title}>
              <h3>{role.title}</h3>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section stackSection">
        <div>
          <p className="eyebrow">Tech Direction</p>
          <h2>Frontend and backend are now wired together.</h2>
          <p>
            The frontend reads live demo records from the Node.js/Express API. The next
            production upgrade is adding PostgreSQL or Supabase for persistent database storage.
          </p>
        </div>
        <div className="stackTags">
          <span>React</span>
          <span>Vite</span>
          <span>Express API</span>
          <span>CORS</span>
          <span>Node.js</span>
          <span>PostgreSQL Ready</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
