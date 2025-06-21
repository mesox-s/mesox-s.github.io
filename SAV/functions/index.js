const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'votre-adresse@gmail.com', // Adresse d'envoi
    pass: 'votre-mot-de-passe-app'   // Mot de passe d'application Gmail
  }
});

exports.sendTicket = functions.https.onRequest(async (req, res) => {
  // Sécurité : vérifier le token Firebase envoyé par le front
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null;
  if (!token) return res.status(401).json({ error: 'Non autorisé' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const message = req.body.message;

    await transporter.sendMail({
      from: 'Support Nolly <votre-adresse@gmail.com>',
      to: 'pinaudhugo0@gmail.com',
      subject: 'Nouveau ticket support',
      text: `Utilisateur: ${decodedToken.email}\n\nMessage:\n${message}`
    });

    res.json({ success: true });
  } catch (e) {
    res.status(401).json({ error: 'Non autorisé' });
  }
});
