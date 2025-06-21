// Import Firebase modules (version modulaire)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Configuration Firebase (remplace par tes propres valeurs)
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  // ... autres options si besoin
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de l’authentification
const auth = getAuth(app);

// Export pour utilisation ailleurs
export { app, auth };
