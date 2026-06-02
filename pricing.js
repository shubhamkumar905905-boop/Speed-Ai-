// Pricing Page Functionality
const monthlyToggle = document.getElementById('monthlyToggle');
const yearlyToggle = document.getElementById('yearlyToggle');

const monthlyPrices = {
    starter: '$0',
    professional: '$29',
    enterprise: '$99'
};

const yearlyPrices = {
    starter: '$0',
    professional: '$278', // 20% discount
    enterprise: '$950' // 20% discount
};

if (monthlyToggle) {
    monthlyToggle.addEventListener('click', () => {
        monthlyToggle.classList.add('active');
        yearlyToggle.classList.remove('active');
        updatePrices('monthly');
    });
}

if (yearlyToggle) {
    yearlyToggle.addEventListener('click', () => {
        yearlyToggle.classList.add('active');
        monthlyToggle.classList.remove('active');
        updatePrices('yearly');
    });
}

function updatePrices(mode) {
    const prices = mode === 'monthly' ? monthlyPrices : yearlyPrices;
    const monthlyElements = document.querySelectorAll('.monthly-price');
    const yearlyElements = document.querySelectorAll('.yearly-price');
    
    if (mode === 'monthly') {
        monthlyElements.forEach(el => el.style.display = 'inline');
        yearlyElements.forEach(el => el.style.display = 'none');
    } else {
        monthlyElements.forEach(el => el.style.display = 'none');
        yearlyElements.forEach(el => el.style.display = 'inline');
    }
}

// Subscribe Button Handlers
document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const planText = this.parentElement.querySelector('h3').textContent;
        showNotification(`You're subscribing to ${planText} plan!`, 'success');
    });
});
