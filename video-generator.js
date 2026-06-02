// Video Generator Functionality
const generateVideoBtn = document.getElementById('generateVideoBtn');
const videoPromptInput = document.getElementById('videoPrompt');
const videoPreview = document.getElementById('videoPreview');
const videoLoadingSpinner = document.getElementById('videoLoadingSpinner');
const videoHistoryList = document.getElementById('videoHistoryList');

let videoGenerations = JSON.parse(localStorage.getItem('videoGenerations') || '[]');

if (generateVideoBtn) {
    generateVideoBtn.addEventListener('click', generateVideo);
}

async function generateVideo() {
    const prompt = videoPromptInput?.value.trim();
    
    if (!prompt) {
        showNotification('Please enter a video description!', 'error');
        return;
    }
    
    const resolution = document.getElementById('videoResolution')?.value || '2160';
    const duration = document.getElementById('duration')?.value || '10';
    const fps = document.getElementById('fps')?.value || '30';
    const style = document.getElementById('videoStyle')?.value || 'cinematic';
    
    // Show loading state
    if (videoLoadingSpinner) videoLoadingSpinner.style.display = 'flex';
    if (videoPreview) videoPreview.style.display = 'none';
    
    // Simulate video generation
    setTimeout(() => {
        const generation = {
            id: Date.now(),
            prompt: prompt,
            resolution: resolution,
            duration: duration,
            fps: fps,
            style: style,
            timestamp: new Date().toLocaleString(),
            videoUrl: 'https://via.placeholder.com/854x480?text=Generated+Video'
        };
        
        videoGenerations.unshift(generation);
        localStorage.setItem('videoGenerations', JSON.stringify(videoGenerations));
        
        if (videoLoadingSpinner) videoLoadingSpinner.style.display = 'none';
        displayGeneratedVideo(generation);
        updateVideoHistory();
        
        showNotification('Video generated successfully!', 'success');
        if (videoPromptInput) videoPromptInput.value = '';
    }, 3000);
}

function displayGeneratedVideo(generation) {
    if (!videoPreview) return;
    
    videoPreview.innerHTML = '';
    videoPreview.style.display = 'grid';
    
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 0.5rem;
        overflow: hidden;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    card.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 1rem; display: block;"></i>
            <p>${generation.duration}s • ${generation.resolution}p • ${generation.fps}FPS</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">${generation.style}</p>
        </div>
        <div style="position: absolute; top: 0.5rem; right: 0.5rem; display: flex; gap: 0.5rem;">
            <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.5rem; border-radius: 0.25rem; cursor: pointer;" title="Download"><i class="fas fa-download"></i></button>
            <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.5rem; border-radius: 0.25rem; cursor: pointer;" title="Share"><i class="fas fa-share"></i></button>
        </div>
    `;
    
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
    
    videoPreview.appendChild(card);
}

function updateVideoHistory() {
    if (!videoHistoryList) return;
    
    if (videoGenerations.length === 0) {
        videoHistoryList.innerHTML = '<p class="empty-state">No videos generated yet. Create your first video!</p>';
        return;
    }
    
    videoHistoryList.innerHTML = videoGenerations.slice(0, 4).map(gen => `
        <div style="background: white; padding: 1rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 10px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
            <div style="width: 100%; height: 100px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 0.25rem; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                <i class="fas fa-video" style="font-size: 2rem;"></i>
            </div>
            <p style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${gen.prompt.substring(0, 30)}...</p>
            <p style="color: #64748b; font-size: 0.8rem;">${gen.duration}s • ${gen.resolution}p</p>
            <p style="color: #64748b; font-size: 0.8rem;">${gen.timestamp}</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                <button style="flex: 1; padding: 0.5rem; background: #6366f1; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem;" onclick="downloadVideo('${gen.id}')"><i class="fas fa-download"></i></button>
                <button style="flex: 1; padding: 0.5rem; background: #ec4899; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem;" onclick="deleteVideo('${gen.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function downloadVideo(id) {
    showNotification('Downloading video...', 'success');
}

function deleteVideo(id) {
    videoGenerations = videoGenerations.filter(gen => gen.id != id);
    localStorage.setItem('videoGenerations', JSON.stringify(videoGenerations));
    updateVideoHistory();
    showNotification('Video deleted!', 'success');
}

// Initialize on page load
if (videoHistoryList) {
    updateVideoHistory();
}
