import { db } from "./firebase.js";
import {
  collection, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const els = {
  vocePontos: document.getElementById("vocePontos"),
  gabrielPontos: document.getElementById("gabrielPontos"),
  voceVitorias: document.getElementById("voceVitorias"),
  gabrielVitorias: document.getElementById("gabrielVitorias"),
  totalCompeticoes: document.getElementById("totalCompeticoes"),
  pctVoce: document.getElementById("pctVoce"),
  pctGabriel: document.getElementById("pctGabriel"),
  history: document.getElementById("history"),
  leaderTag: document.getElementById("leaderTag"),
  status: document.getElementById("statusMessage"),
  cardVoce: document.getElementById("cardVoce"),
  cardGabriel: document.getElementById("cardGabriel"),
  overlay: document.getElementById("pointOverlay")
};

let previousScores = { voce: 0, gabriel: 0 };

function formatDate(timestamp, fallback) {
  if (timestamp?.toDate) return timestamp.toDate().toLocaleDateString("pt-BR");
  if (fallback) return new Date(`${fallback}T12:00:00`).toLocaleDateString("pt-BR");
  return "—";
}

function showPointAnimation(winner) {
  const scoreEl = winner === "voce" ? els.vocePontos : els.gabrielPontos;
  scoreEl.classList.remove("bump");
  void scoreEl.offsetWidth;
  scoreEl.classList.add("bump");
  els.overlay.classList.remove("show");
  void els.overlay.offsetWidth;
  els.overlay.querySelector(".point-animation").textContent = "+1";
  els.overlay.classList.add("show");
}

function renderHistory(items) {
  if (!items.length) {
    els.history.innerHTML = `<div class="empty">Nenhuma competição registrada.</div>`;
    return;
  }
  els.history.innerHTML = items.map(item => `
    <article class="history-item">
      <div class="history-icon">🏆</div>
      <div>
        <strong>${escapeHtml(item.nome)}</strong>
        <small>${formatDate(item.criadoEm, item.data)}</small>
      </div>
      <div class="result">${item.vencedor === "voce" ? "VOCÊ" : "GABRIEL"} +1</div>
    </article>
  `).join("");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

async function loadScoreboard() {
  try {
    const q = query(collection(db, "competicoes"), orderBy("criadoEm", "desc"));
    const snap = await getDocs(q);
    const items = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    let voce = 0, gabriel = 0;

    items.forEach(item => item.vencedor === "voce" ? voce++ : gabriel++);

    els.vocePontos.textContent = voce;
    els.gabrielPontos.textContent = gabriel;
    els.voceVitorias.textContent = voce;
    els.gabrielVitorias.textContent = gabriel;
    els.totalCompeticoes.textContent = items.length;

    const pctVoce = items.length ? Math.round(voce / items.length * 100) : 0;
    const pctGabriel = items.length ? Math.round(gabriel / items.length * 100) : 0;
    els.pctVoce.textContent = `${pctVoce}%`;
    els.pctGabriel.textContent = `${pctGabriel}%`;

    els.cardVoce.classList.toggle("winner", voce > gabriel);
    els.cardGabriel.classList.toggle("winner", gabriel > voce);

    if (voce > gabriel) {
      els.leaderTag.textContent = "🔥 VOCÊ ESTÁ NA LIDERANÇA!";
    } else if (gabriel > voce) {
      els.leaderTag.textContent = "🔥 GABRIEL ESTÁ NA LIDERANÇA!";
    } else {
      els.leaderTag.textContent = items.length ? "⚔️ EMPATE!" : "SEM RESULTADOS";
    }

    if (voce > previousScores.voce || gabriel > previousScores.gabriel) {
      showPointAnimation(voce > previousScores.voce ? "voce" : "gabriel");
    }
    if (items.length > 0) {
      const first = items[0];
      const lead = voce > gabriel ? "VOCÊ" : gabriel > voce ? "GABRIEL" : "NINGUÉM";
      if (lead !== "NINGUÉM") {
        els.status.textContent = `🔥 ${lead} ${lead === (first.vencedor === "voce" ? "VOCÊ" : "GABRIEL") ? "VENCEU A ÚLTIMA!" : "ESTÁ NA LIDERANÇA!"}`;
      }
    } else {
      els.status.textContent = "A rivalidade está apenas começando...";
    }

    previousScores = { voce, gabriel };
    renderHistory(items);
  } catch (error) {
    console.error(error);
    els.status.textContent = "Erro ao carregar o placar. Verifique a configuração do Firebase.";
  }
}

loadScoreboard();
setInterval(loadScoreboard, 15000);