// 1) Crie um projeto no Firebase.
// 2) Adicione um app Web.
// 3) Copie a configuração abaixo para este arquivo.
// 4) Ative Authentication > E-mail/senha e Firestore.
//
// NÃO coloque chaves privadas aqui. A configuração web do Firebase
// (apiKey, authDomain etc.) pode ficar no frontend.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "COLOQUE_SUA_API_KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.firebasestorage.app",
  messagingSenderId: "COLOQUE_SEU_SENDER_ID",
  appId: "COLOQUE_SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);