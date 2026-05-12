const PUBLIC_SCHOOL_EMAIL = import.meta.env.VITE_SCHOOL_EMAIL || "info@schoolportal.com";
const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || "#admin";

function isPortalHost() {
  return window.location.hostname.startsWith("portal.");
}

function applyDomainMode() {
  document.body.classList.toggle("portalHost", isPortalHost());
  document.body.classList.toggle("publicHost", !isPortalHost());

  if (isPortalHost() && !window.location.hash) {
    window.location.hash = "#admin";
  }
}

function addPublicSiteStyles() {
  if (document.getElementById("public-site-enhancements-css")) return;
  const style = document.createElement("style");
  style.id = "public-site-enhancements-css";
  style.textContent = `
    .navLinks a[href="#records"]{display:none!important}
    .publicHost .navLinks a[href="#admin"]{display:none!important}
    .portalHost .publicSchoolSite,.portalHost #about,.portalHost #news,.portalHost #gallery,.portalHost #admission-public,.portalHost #contact{display:none!important}
    .portalHost .navLinks a:not([href="#admin"]){display:none!important}
    .portalHost .navLinks a[href="#admin"]{display:inline-flex!important}
    .portalHost .hero{min-height:45vh!important}
    .publicSchoolSite{max-width:1180px;margin:-60px auto 70px;padding:0 24px;position:relative;z-index:6;display:grid;gap:26px}
    .publicHeroCards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
    .publicHeroCard,.publicSection{background:white;border:1px solid #dbeafe;border-radius:28px;padding:28px;box-shadow:0 24px 65px rgba(15,23,42,.09)}
    .publicHeroCard strong{display:block;font-size:1.65rem;color:#0f172a;margin-bottom:4px;letter-spacing:-.04em}.publicHeroCard span{color:#64748b;line-height:1.65}
    .publicSection{scroll-margin-top:30px}.publicSectionHeader{display:flex;justify-content:space-between;gap:18px;align-items:flex-end;margin-bottom:20px;border-bottom:1px solid #e2e8f0;padding-bottom:18px}.publicSectionHeader h2{margin:0;color:#0f172a;font-size:clamp(1.8rem,3vw,2.7rem);letter-spacing:-.055em}.publicSectionHeader p{margin:6px 0 0;color:#64748b;line-height:1.7;max-width:720px}.publicBadge{display:inline-flex;background:#e0f2fe;color:#075985;border:1px solid #bae6fd;border-radius:999px;padding:8px 12px;font-weight:900;font-size:.78rem;text-transform:uppercase;letter-spacing:.1em}
    .aboutGrid,.newsGrid,.galleryGrid,.contactGrid{display:grid;gap:16px}.aboutGrid{grid-template-columns:1.2fr .8fr}.newsGrid{grid-template-columns:repeat(3,1fr)}.galleryGrid{grid-template-columns:repeat(4,1fr)}.contactGrid{grid-template-columns:1fr 1fr}
    .publicInfoBox{background:#f8fafc;border:1px solid #e2e8f0;border-radius:20px;padding:20px}.publicInfoBox h3{margin:0 0 10px;color:#0f172a}.publicInfoBox p,.publicInfoBox li{color:#64748b;line-height:1.75}.publicInfoBox ul{margin:0;padding-left:20px}.newsCard{background:#f8fafc;border:1px solid #e2e8f0;border-radius:20px;padding:18px}.newsCard small{color:#2563eb;font-weight:900}.newsCard h3{margin:8px 0;color:#0f172a}.newsCard p{margin:0;color:#64748b;line-height:1.65}.galleryTile{min-height:150px;border-radius:22px;background:linear-gradient(135deg,#0f172a,#1d4ed8);display:flex;align-items:flex-end;padding:16px;color:white;font-weight:900;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
    .publicAdmissionCTA{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#020617,#1d4ed8);color:white;border-radius:24px;padding:22px}.publicAdmissionCTA p{margin:0;color:#dbeafe;line-height:1.6}.publicAdmissionCTA a{background:#38bdf8;color:#082f49;border-radius:14px;padding:13px 18px;font-weight:900}.publicContactLine{display:flex;gap:12px;align-items:center;margin:12px 0;color:#475569}.publicContactIcon{width:38px;height:38px;border-radius:12px;background:#dbeafe;color:#1d4ed8;display:flex;align-items:center;justify-content:center;font-weight:900}
    #admission .formCard:after{content:"After submission, the portal saves the application and prepares a confirmation email to the parent email entered above.";display:block;background:#ecfdf5;color:#166534;border:1px solid #bbf7d0;border-radius:14px;padding:12px 14px;font-weight:800;line-height:1.5}
    .admissionMailNotice{position:fixed;right:22px;bottom:22px;z-index:100001;max-width:380px;background:#020617;color:#e0f2fe;border:1px solid #38bdf8;border-radius:18px;padding:18px;box-shadow:0 24px 65px rgba(15,23,42,.35);line-height:1.55}.admissionMailNotice strong{display:block;color:white;margin-bottom:6px}.admissionMailNotice button{margin-top:12px;border:0;background:#38bdf8;color:#082f49;border-radius:10px;padding:9px 12px;font-weight:900;cursor:pointer}
    @media(max-width:900px){.publicHeroCards,.aboutGrid,.newsGrid,.galleryGrid,.contactGrid{grid-template-columns:1fr 1fr}.publicSectionHeader{display:block}.galleryGrid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:640px){.publicSchoolSite{padding:0 16px}.publicHeroCards,.aboutGrid,.newsGrid,.galleryGrid,.contactGrid{grid-template-columns:1fr}.publicAdmissionCTA{display:block}.publicAdmissionCTA a{display:inline-flex;margin-top:16px}}
  `;
  document.head.appendChild(style);
}

function buildPublicViews() {
  if (document.querySelector(".publicSchoolSite")) return;
  const hero = document.querySelector("#home");
  if (!hero) return;

  const oldBlocks = document.querySelector(".portalPublicBlocks");
  if (oldBlocks) oldBlocks.remove();

  const publicSite = document.createElement("section");
  publicSite.className = "publicSchoolSite";
  publicSite.innerHTML = `
    <div class="publicHeroCards">
      <article class="publicHeroCard"><strong>Digital Admission</strong><span>Parents apply online and admin reviews every application from the portal.</span></article>
      <article class="publicHeroCard"><strong>Academic Records</strong><span>Students, staff, fees, assignments and results are managed securely.</span></article>
      <article class="publicHeroCard"><strong>School Communication</strong><span>Announcements, notices and parent updates stay organized.</span></article>
    </div>

    <section id="about" class="publicSection">
      <div class="publicSectionHeader"><div><span class="publicBadge">About</span><h2>About the School</h2><p>A school built around academic excellence, discipline, digital administration and strong parent communication.</p></div></div>
      <div class="aboutGrid">
        <div class="publicInfoBox"><h3>Our Mission</h3><p>To provide a structured learning environment where students grow academically, morally and socially while school operations remain transparent and well documented.</p></div>
        <div class="publicInfoBox"><h3>Core Strengths</h3><ul><li>Class-based student management</li><li>Staff and subject teacher workflows</li><li>Digital admission and result processing</li><li>Fee tracking and parent communication</li></ul></div>
      </div>
    </section>

    <section id="news" class="publicSection">
      <div class="publicSectionHeader"><div><span class="publicBadge">News</span><h2>News & Updates</h2><p>School updates, events, examination notices and parent announcements will appear here.</p></div></div>
      <div class="newsGrid">
        <article class="newsCard"><small>Admission</small><h3>Admission is open</h3><p>Parents can now apply online and receive confirmation after submission.</p></article>
        <article class="newsCard"><small>Academics</small><h3>Result processing</h3><p>Staff can prepare spreadsheet-style results and upload printable PDFs.</p></article>
        <article class="newsCard"><small>School Notice</small><h3>Digital records active</h3><p>Fees, students, staff and class records are now handled from the portal.</p></article>
      </div>
    </section>

    <section id="gallery" class="publicSection">
      <div class="publicSectionHeader"><div><span class="publicBadge">Gallery</span><h2>School Gallery</h2><p>Photos from school activities, classrooms, events and student programmes.</p></div></div>
      <div class="galleryGrid"><div class="galleryTile">Classroom</div><div class="galleryTile">Laboratory</div><div class="galleryTile">Assembly</div><div class="galleryTile">Excursion</div></div>
    </section>

    <section id="admission-public" class="publicSection">
      <div class="publicSectionHeader"><div><span class="publicBadge">Admission</span><h2>Admission/Application</h2><p>Submit a student application online. The parent email entered in the form will be used for the confirmation message.</p></div></div>
      <div class="publicAdmissionCTA"><div><h3>Ready to apply?</h3><p>Click the button, fill the admission form, and submit. The application will be saved for admin review.</p></div><a href="#admission">Apply for Admission</a></div>
    </section>

    <section id="contact" class="publicSection">
      <div class="publicSectionHeader"><div><span class="publicBadge">Contact</span><h2>Contact the School</h2><p>Reach the school for admission, fees, academic records and general enquiries.</p></div></div>
      <div class="contactGrid">
        <div class="publicInfoBox"><h3>Contact Details</h3><p class="publicContactLine"><span class="publicContactIcon">@</span>${PUBLIC_SCHOOL_EMAIL}</p><p class="publicContactLine"><span class="publicContactIcon">☎</span>+234 800 000 0000</p><p class="publicContactLine"><span class="publicContactIcon">⌂</span>Lagos, Nigeria</p></div>
        <div class="publicInfoBox"><h3>Portal Access</h3><p>Admin and staff use the secure portal subdomain to manage student records, results, fees, assignments and announcements.</p><p><a class="primaryBtn" href="${PORTAL_URL}">Open Portal Login</a></p></div>
      </div>
    </section>
  `;

  hero.after(publicSite);
}

function upgradeNavLinks() {
  const nav = document.querySelector(".navLinks");
  if (!nav || nav.dataset.publicNav === "true") return;
  nav.dataset.publicNav = "true";
  nav.innerHTML = isPortalHost()
    ? `<a href="#admin">Portal Login</a>`
    : `
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#news">News</a>
      <a href="#gallery">Gallery</a>
      <a href="#admission-public">Admission</a>
      <a href="#contact">Contact</a>
    `;
}

function showAdmissionMailNotice(email, studentName) {
  document.querySelector(".admissionMailNotice")?.remove();
  const notice = document.createElement("div");
  notice.className = "admissionMailNotice";
  notice.innerHTML = `<strong>Admission submitted.</strong>Confirmation email prepared for <b>${email || "the parent email"}</b> about ${studentName || "the applicant"}.<br><button type="button">Close</button>`;
  notice.querySelector("button").onclick = () => notice.remove();
  document.body.appendChild(notice);
  setTimeout(() => notice.remove(), 9000);
}

function watchAdmissionSubmit() {
  const form = document.querySelector("#admission form");
  if (!form || form.dataset.mailWatch === "true") return;
  form.dataset.mailWatch = "true";
  form.addEventListener("submit", () => {
    const inputs = [...form.querySelectorAll("input, textarea, select")];
    const studentName = inputs.find((input) => /student full name/i.test(input.placeholder || ""))?.value || "";
    const parentEmail = inputs.find((input) => /parent email/i.test(input.placeholder || ""))?.value || "";
    setTimeout(() => showAdmissionMailNotice(parentEmail, studentName), 900);
  });
}

function runPublicEnhancements() {
  applyDomainMode();
  addPublicSiteStyles();
  upgradeNavLinks();
  buildPublicViews();
  watchAdmissionSubmit();
}

new MutationObserver(runPublicEnhancements).observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("load", runPublicEnhancements);
setInterval(runPublicEnhancements, 1200);
