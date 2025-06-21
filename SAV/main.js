// Remplace par ta config Firebase (API key, etc.)
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  // ...
};
firebase.initializeApp(firebaseConfig);

function login() {
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('login').style.display = 'none';
      document.getElementById('support').style.display = 'block';
    })
    .catch(error => {
      document.getElementById('login-error').innerText = "Erreur : " + error.message;
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    document.getElementById('login').style.display = 'block';
    document.getElementById('support').style.display = 'none';
  });
}

function sendTicket() {
  const message = document.getElementById('message').value;
  firebase.auth().currentUser.getIdToken().then(token => {
    fetch('https://VOTRE_CLOUD_FUNCTION_URL/sendTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById('ticket-status').style.color = 'green';
      document.getElementById('ticket-status').innerText = 'Ticket envoyé !';
      document.getElementById('message').value = '';
    })
    .catch(err => {
      document.getElementById('ticket-status').style.color = 'red';
      document.getElementById('ticket-status').innerText = 'Erreur : ' + err.message;
    });
  });
}

// Affichage automatique selon l'état de connexion
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('support').style.display = 'block';
  } else {
    document.getElementById('login').style.display = 'block';
    document.getElementById('support').style.display = 'none';
  }
});
