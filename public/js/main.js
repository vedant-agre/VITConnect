const API_URL = '/api';

// DOM Elements
const navContainer = document.querySelector('.nav-links');

// State
let user = null;

// Init
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    renderNav();
    if(typeof initPage === 'function') initPage();
});

// Check Authentication
async function checkAuth() {
    try {
        const res = await fetch(`${API_URL}/auth/me`);
        if (res.ok) {
            user = await res.json();
        }
    } catch (error) {
        console.log('Not logged in');
    }
}

// Render Navbar
function renderNav() {
    let links = `
        <li><a href="/">Home</a></li>
        <li><a href="/events.html">Events</a></li>
    `;

    if (user) {
        if (user.role === 'admin') {
            links += `<li><a href="/admin/dashboard.html">Dashboard</a></li>`;
        } else {
             links += `<li><a href="/dashboard.html">My Dashboard</a></li>`;
        }
        links += `
            <li><span style="color: var(--text-secondary)">Hi, ${user.name}</span></li>
            <li><button onclick="logout()" class="btn btn-outline" style="padding: 0.4rem 1rem; font-size: 0.9rem;">Logout</button></li>
        `;
    } else {
        links += `<li><a href="/login.html" class="btn btn-primary">Login</a></li>`;
    }

    if(navContainer) navContainer.innerHTML = links;
}

// Logout
async function logout() {
    try {
        await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout failed');
    }
}

// Utility: Show Toast (Simple alert for now, can be improved)
function showToast(message, type = 'success') {
    alert(message); // Placeholder for a nicer custom toast
}
