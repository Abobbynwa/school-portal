import React from "react";
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
} from "lucide-react";
import "./styles.css";

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

const stats = [
  { value: "3", label: "Core User Roles" },
  { value: "8+", label: "Planned Modules" },
  { value: "100%", label: "Responsive UI" },
];

function App() {
  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand">
            <GraduationCap size={28} />
            <span>SchoolPortal</span>
          </div>
          <a href="https://github.com/Abobbynwa/school-portal" target="_blank" rel="noreferrer">
            GitHub Repo
          </a>
        </nav>

        <div className="heroGrid">
          <div className="heroContent">
            <p className="eyebrow">Education Technology Dashboard</p>
            <h1>Modern school management portal for admins, staff, and students.</h1>
            <p className="lead">
              A portfolio-ready school system interface designed to simplify student records,
              staff management, academic workflows, and secure role-based access.
            </p>
            <div className="actions">
              <a className="primaryBtn" href="#features">Explore Features</a>
              <a className="secondaryBtn" href="#roles">View User Roles</a>
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
              <p><span></span> Student registration workflow</p>
              <p><span></span> Staff profile management</p>
              <p><span></span> Grades and assignment planning</p>
            </div>
          </div>
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
          <h2>Frontend now live. Backend integration ready.</h2>
          <p>
            This deployed version presents the project interface and product structure.
            It is prepared for connection to a Node.js/Express backend, PostgreSQL database,
            Firebase Authentication, email notifications, and live chat modules.
          </p>
        </div>
        <div className="stackTags">
          <span>React</span>
          <span>Vite</span>
          <span>CSS</span>
          <span>Node.js Ready</span>
          <span>PostgreSQL Ready</span>
          <span>Firebase Auth Ready</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
