// Image Generator Functionality
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const imagePreview = document.getElementById('imagePreview');
const loadingSpinner = document.getElementById('loadingSpinner');
const historyList = document.getElementById('historyList');

let generations = JSON.parse(localStorage.getItem('imageGenerations') || '[]');

if (generateBtn) {
    generateBtn.addEventListener('click', generateImage);
}

async function generateImage() {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        showNotification('Please enter a prompt!', 'error');
        return;
    }
    
    const resolution = document.getElementById('resolution')?.value || '2048';
    const style = document.getElementById('style')?.value || 'artistic';
    const samples = document.getElementById('samples')?.value || '4';
    const quality = document.getElementById('quality')?.value || 'high';
    
    // Show loading state
    if (loadingSpinner) loadingSpinner.style.display = 'flex';
    if (imagePreview) imagePreview.style.display = 'none';
    
    // Simulate image generation
    setTimeout(() => {
        const generation = {
            id: Date.now(),
            prompt: prompt,
            resolution: resolution,
            style: style,
            timestamp: new Date().toLocaleString(),
            images: Array.from({ length: parseInt(samples) }, (_, i) => ({
                url: `https://via.placeholder.com/${resolution}x${resolution}?text=Generated+${i + 1}`,
                id: i + 1
            }))
        };
        
        generations.unshift(generation);
        localStorage.setItem('imageGenerations', JSON.stringify(generations));
        
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        displayGeneratedImages(generation);
        updateHistory();
        
        showNotification('Images generated successfully!', 'success');
        promptInput.value = '';
    }, 2000);
}

function displayGeneratedImages(generation) {
    if (!imagePreview) return;
    
    imagePreview.innerHTML = '';
    imagePreview.style.display = 'grid';
    
    generation.images.forEach(img => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 0.5rem;
            overflow: hidden;
            height: 250px;
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
                <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 0.5rem; display: block;"></i>
                <p>${generation.resolution}x${generation.resolution}</p>
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
        
        imagePreview.appendChild(card);
    });
}

function updateHistory() {
    if (!historyList) return;
    
    if (generations.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No generations yet. Create your first image!</p>';
        return;
    }
    
    historyList.innerHTML = generations.slice(0, 4).map(gen => `
        <div style="background: white; padding: 1rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 10px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
            <div style="width: 100%; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.25rem; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                <i class="fas fa-image" style="font-size: 2rem;"></i>
            </div>
            <p style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${gen.prompt.substring(0, 30)}...</p>
            <p style="color: #64748b; font-size: 0.8rem;">${gen.timestamp}</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                <button style="flex: 1; padding: 0.5rem; background: #6366f1; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem;" onclick="downloadGeneration('${gen.id}')"><i class="fas fa-download"></i></button>
                <button style="flex: 1; padding: 0.5rem; background: #ec4899; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem;" onclick="deleteGeneration('${gen.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function downloadGeneration(id) {
    showNotification('Downloading image...', 'success');
}

function deleteGeneration(id) {
    generations = generations.filter(gen => gen.id != id);
    localStorage.setItem('imageGenerations', JSON.stringify(generations));
    updateHistory();
    showNotification('Image deleted!', 'success');
}

// Initialize on page load
if (historyList) {
    updateHistory();
}
