// Handle theme change
const themeSelector = document.getElementById('themeSelector');
themeSelector.addEventListener('change', () => {
    const selectedTheme = themeSelector.value;
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('selectedTheme', selectedTheme);
});

// Handle notification toggle
const notificationsToggle = document.getElementById('notificationsToggle');
notificationsToggle.addEventListener('change', () => {
    const notificationsEnabled = notificationsToggle.checked;
    localStorage.setItem('notificationsEnabled', notificationsEnabled);
    alert(`Notifications ${notificationsEnabled ? 'enabled' : 'disabled'}`);
});

// Reset saved data
function resetData() {
    if (confirm('Are you sure you want to reset all saved data?')) {
        localStorage.clear();
        alert('Data successfully reset!');
    }
}

// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        themeSelector.value = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    notificationsToggle.checked = notificationsEnabled;
});
