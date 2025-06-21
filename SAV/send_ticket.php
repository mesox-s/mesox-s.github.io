<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "pinaudhugo0@gmail.com";
    $subject = "Nouveau ticket support : " . htmlspecialchars($_POST["subject"]);
    $message = "Nom: " . htmlspecialchars($_POST["name"]) . "\n";
    $message .= "Email: " . htmlspecialchars($_POST["email"]) . "\n\n";
    $message .= "Message:\n" . htmlspecialchars($_POST["message"]);

    $headers = "From: " . $_POST["email"] . "\r\n" .
               "Reply-To: " . $_POST["email"] . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "<p style='color:green;'>Ticket envoyé avec succès !</p>";
    } else {
        echo "<p style='color:red;'>Erreur lors de l'envoi du ticket.</p>";
    }
} else {
    header("Location: index.html");
    exit;
}
?>
