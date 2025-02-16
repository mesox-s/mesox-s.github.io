function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

async function fetchLatestVideo() {
    try {
        const response = await fetch('AIzaSyDf7a3zpBjqWa2IvBjMFufDhSAc5xOCjVQ');
        const video = await response.json();
        
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = `
            <img class="thumbnail" src="${video.thumbnailUrl}" alt="Miniature de la vidéo">
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-meta">Publié le ${formatDate(video.publishedAt)}</div>
            </div>
        `;
    } catch (error) {
        console.error('Erreur lors de la récupération de la vidéo:', error);
    }
}

fetchLatestVideo();
