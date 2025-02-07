// Initialisation du canvas
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables globales
let territories = [];
let points = {};
let leaderboard = document.getElementById('leaderboard');

// Fonction pour dessiner la carte
function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    territories.forEach(territory => {
        ctx.fillStyle = territory.color;
        ctx.fillRect(territory.x, territory.y, territory.width, territory.height);
    });
}

// Ajout d'un territoire
function addTerritory(x, y, color) {
    let size = Math.random() * 50 + 20; // Taille aléatoire
    territories.push({ x, y, width: size, height: size, color });
}

// Mise à jour des points
function updatePoints() {
    territories.forEach(territory => {
        if (!points[territory.color]) points[territory.color] = 0;
        points[territory.color] += territory.width * territory.height * 0.01; // Points par pixel
    });

    // Mise à jour du classement
    let sortedPoints = Object.entries(points).sort((a, b) => b[1] - a[1]);
    leaderboard.innerHTML = '';
    sortedPoints.forEach(([color, score], index) => {
        let crown = index === 0 ? '👑' : '';
        leaderboard.innerHTML += `<li style="color:${color}">${crown} ${color}: ${Math.floor(score)} pts</li>`;
    });
}

// Gestion des clics pour ajouter un territoire
canvas.addEventListener('click', (e) => {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    addTerritory(x, y, `hsl(${Math.random() * 360}, 100%, 50%)`);
});

// Boucle principale du jeu
function gameLoop() {
    drawMap();
    updatePoints();
    requestAnimationFrame(gameLoop);
}

// Démarrage du jeu
gameLoop();