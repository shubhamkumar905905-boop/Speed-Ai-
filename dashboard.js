// Dashboard Functionality
const sidebarNav = document.querySelectorAll('.sidebar-nav .nav-item:not(.logout-btn)');
const logoutBtn = document.querySelector('.logout-btn');
const dashboardSections = document.querySelectorAll('.dashboard-section');

// Navigation between sections
sidebarNav.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        sidebarNav.forEach(nav => nav.classList.remove('active'));
        dashboardSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Get target section
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            alert('Logged out successfully!');
            window.location.href = 'index.html';
        }
    });
}

// Set first item as active by default
if (sidebarNav.length > 0) {
    sidebarNav[0].classList.add('active');
    const firstSectionId = sidebarNav[0].getAttribute('href');
    document.querySelector(firstSectionId)?.classList.add('active');
}

// Edit Profile Form Handler
const accountSection = document.getElementById('account');
if (accountSection) {
    const saveBtn = accountSection.querySelector('.btn-primary');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            showNotification('Profile updated successfully!', 'success');
        });
    }
}

// Toggle Switch Handlers
document.querySelectorAll('.toggle-switch input').forEach(input => {
    input.addEventListener('change', () => {
        const label = input.closest('.setting-item').querySelector('.setting-info h4').textContent;
        const state = input.checked ? 'enabled' : 'disabled';
        showNotification(`${label} ${state}`, 'success');
    });
});

// Subscription Button Handlers
const subscriptionSection = document.getElementById('subscription');
if (subscriptionSection) {
    const buttons = subscriptionSection.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim();
            if (text === 'Upgrade Plan') {
                alert('Redirecting to upgrade page...');
            } else if (text === 'Cancel Subscription') {
                if (confirm('Are you sure you want to cancel your subscription?')) {
                    showNotification('Subscription cancelled', 'success');
                }
            }
        });
    });
}

// Quick Actions
document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (card.getAttribute('href') && card.getAttribute('href').startsWith('http')) {
            return;
        }
    });
});

// Initialize statistics (in real app, fetch from backend)
function updateStats() {
    // This would fetch real data from backend
    const stats = {
        imagesGenerated: 234,
        videosCreated: 12,
        creditsUsed: 850,
        creditsTotal: 1000
    };
    
    // Save to localStorage
    localStorage.setItem('userStats', JSON.stringify(stats));
}

// Load user stats on page load
window.addEventListener('load', () => {
    updateStats();
});
