// Navigation Active State
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.classList.contains('logout-btn')) {
            e.preventDefault();
            alert('Logged out successfully!');
            return;
        }
        
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId)?.classList.add('active');
    });
});

// Mobile Navigation Toggle
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.createElement('div');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '<i class="fas fa-bars"></i>';
navToggle.style.cssText = 'display: none; cursor: pointer; color: white; font-size: 1.5rem;';

// Form Validation
function validateForm(formData) {
    if (!formData.prompt || formData.prompt.trim().length === 0) {
        alert('Please enter a prompt!');
        return false;
    }
    return true;
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Local Storage for Data Persistence
const storageKey = 'speedAiData';

function saveData(data) {
    const existing = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const updated = { ...existing, ...data };
    localStorage.setItem(storageKey, JSON.stringify(updated));
}

function getData(key) {
    const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return key ? data[key] : data;
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Responsive Navigation
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (navMenu) navMenu.style.display = 'none';
    } else {
        if (navMenu) navMenu.style.display = 'flex';
    }
});

if (window.innerWidth <= 768) {
    if (navMenu) navMenu.style.display = 'none';
}
