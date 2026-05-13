const API_URL_DB_LITE = "https://school-backend-rkq3.onrender.com";

async function loadDbLiteStudents() {
  const res = await fetch(API_URL_DB_LITE + "/api/students");
  const json = await res.json();
  return json.data || [];
}

function runDbLite() {
  loadDbLiteStudents().then((students) => {
    window.dbLiteStudents = students;
    const card = document.querySelector(".apiStatusCard");
    if (card && !document.querySelector(".dbLiteBadge")) {
      const badge = document.createElement("div");
      badge.className = "dbLiteBadge";
      badge.style.cssText = "margin-top:10px;background:#ecfdf5;border:1px solid #bbf7d0;color:#166534;border-radius:12px;padding:10px;font-weight:800";
      badge.textContent = "Database live: " + students.length + " students loaded from backend.";
      card.appendChild(badge);
    }
  }).catch(() => {});
}

window.addEventListener("load", runDbLite);
setInterval(runDbLite, 5000);
