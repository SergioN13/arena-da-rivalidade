import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const loginPanel = document.getElementById("loginPanel");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const competitionForm = document.getElementById("competitionForm");
const formMessage = document.getElementById("formMessage");
const adminHistory = document.getElementById("adminHistory");

onAuthStateChanged(auth, user => {
  if (user) {
    loginPanel.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadAdminHistory();
  } else {
    loginPanel.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  loginError.textContent = "";
  try {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value.trim(),
      document.getElementById("password").value
    );
  } catch (error) {
    loginError.textContent = "E-mail ou senha inválidos.";
    console.error(error);
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => signOut(auth));

competitionForm.addEventListener("submit", async e => {
  e.preventDefault();
  formMessage.textContent = "";
  try {
    await addDoc(collection(db, "competicoes"), {
      nome: document.getElementById("nome").value.trim(),
      vencedor: document.getElementById("vencedor").value,
      data: document.getElementById("data").value || null,
      criadoEm: serverTimestamp()
    });
    competitionForm.reset();
    formMessage.textContent = "🏆 Vitória registrada com sucesso!";
    await loadAdminHistory();
  } catch (error) {
    console.error(error);
    formMessage.textContent = "Não foi possível registrar. Verifique as regras do Firestore.";
  }
});

async function loadAdminHistory() {
  const q = query(collection(db, "competicoes"), orderBy("criadoEm", "desc"));
  const snap = await getDocs(q);
  const items = snap.docs.map(d => ({ id:d.id, ...d.data() }));
  adminHistory.innerHTML = items.length ? items.map(item => `
    <article class="history-item">
      <div class="history-icon">🏆</div>
      <div>
        <strong>${escapeHtml(item.nome)}</strong>
        <small>${item.vencedor === "voce" ? "Você" : "Gabriel"} venceu</small>
      </div>
      <button class="delete-btn" data-id="${item.id}" title="Excluir">Excluir</button>
    </article>
  `).join("") : `<div class="empty">Nenhuma competição registrada.</div>`;

  adminHistory.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!confirm("Excluir esta competição?")) return;
      await deleteDoc(doc(db, "competicoes", btn.dataset.id));
      loadAdminHistory();
    });
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}