// DOM Elements - Common across all pages
const loggedOutView = document.getElementById('loggedOutView');
const loggedInView = document.getElementById('loggedInView');
const usernameDisplay = document.getElementById('usernameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

// DOM Elements - Page specific
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');
const registerSuccess = document.getElementById('registerSuccess');
const authStatus = document.getElementById('authStatus');
const protectedContent = document.getElementById('protectedContent');

// Popup Elements
const signInBtn = document.getElementById('signInBtn');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');
const popupLoginForm = document.getElementById('popupLoginForm');
const popupLoginError = document.getElementById('popupLoginError');

// Initialize auth state
function updateAuthUI() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        if (loggedOutView) loggedOutView.classList.add('hidden');
        if (loggedInView) loggedInView.classList.remove('hidden');
        if (usernameDisplay) usernameDisplay.textContent = currentUser;
        
        // Update auth status on main page
        if (authStatus) {
            authStatus.textContent = `You are signed in as ${currentUser}.`;
        }
        
        // Show protected content on main page
        if (protectedContent) {
            protectedContent.classList.remove('hidden');
        }
        
        // Redirect if on login/register page and already logged in
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'login.html' || currentPage === 'register.html') {
            window.location.href = 'mainIndex.html';
        }
    } else {
        if (loggedOutView) loggedOutView.classList.remove('hidden');
        if (loggedInView) loggedInView.classList.add('hidden');
        
        // Update auth status on main page
        if (authStatus) {
            authStatus.textContent = 'You are currently not signed in. Sign in to access your account.';
        }
        
        // Hide protected content on main page
        if (protectedContent) {
            protectedContent.classList.add('hidden');
        }
    }
}

// Popup functionality
if (signInBtn) {
    signInBtn.addEventListener('click', function() {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
                
        // Small delay to ensure the display:flex is applied before animation
        setTimeout(() => {
            popup.classList.remove('scale-95', 'opacity-0');
            popup.classList.add('scale-100', 'opacity-100');
        }, 10);
    });
}

// Close popup function
function closePopup() {
    if (!popup || !overlay) return;
    
    popup.classList.remove('scale-100', 'opacity-100');
    popup.classList.add('scale-95', 'opacity-0');
                
    setTimeout(() => {
        overlay.classList.remove('flex');
        overlay.classList.add('hidden');
    }, 300);
}

// Close popup when clicking the close button
if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
}

// Close popup when clicking outside
if (overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePopup();
        }
    });
}

// Register form submission
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Reset messages
        if (registerError) registerError.classList.add('hidden');
        if (registerSuccess) registerSuccess.classList.add('hidden');
        
        // Validation
        if (!username || !email || !password || !confirmPassword) {
            registerError.textContent = 'Please fill in all fields';
            registerError.classList.remove('hidden');
            return;
        }
        
        if (password.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters long';
            registerError.classList.remove('hidden');
            return;
        }
        
        if (password !== confirmPassword) {
            registerError.textContent = 'Passwords do not match';
            registerError.classList.remove('hidden');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            registerError.textContent = 'Please enter a valid email address';
            registerError.classList.remove('hidden');
            return;
        }
        
        // Check if username already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.username === username)) {
            registerError.textContent = 'Username already exists';
            registerError.classList.remove('hidden');
            return;
        }
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            registerError.textContent = 'Email already in use';
            registerError.classList.remove('hidden');
            return;
        }
        
        // Save new user
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        registerSuccess.textContent = 'Registration successful! Redirecting to home page...';
        registerSuccess.classList.remove('hidden');
        
        // Reset form
        registerForm.reset();
        
        // Store the username for the login popup
        localStorage.setItem('lastRegisteredUser', username);
    });
}

// Login form submission (for dedicated login page)
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const remember = document.getElementById('remember')?.checked || false;
        
        // Reset messages
        if (loginError) loginError.classList.add('hidden');
        
        // Validation
        if (!username || !password) {
            loginError.textContent = 'Please fill in all fields';
            loginError.classList.remove('hidden');
            return;
        }
        
        // Check credentials
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => 
            (user.username === username || user.email === username) && 
            user.password === password
        );
        
        if (!user) {
            loginError.textContent = 'Invalid username/email or password';
            loginError.classList.remove('hidden');
            return;
        }
        
        // Login successful
        localStorage.setItem('currentUser', user.username);
        
        // Set remember me
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        // Redirect to home page
        window.location.href = 'mainIndex.html';
    });
}

// Popup Login form submission
if (popupLoginForm) {
    popupLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('popupUsername').value.trim();
        const password = document.getElementById('popupPassword').value;
        const remember = document.getElementById('popupRemember')?.checked || false;
        
        // Reset messages
        if (popupLoginError) popupLoginError.classList.add('hidden');
        
        // Validation
        if (!username || !password) {
            popupLoginError.textContent = 'Please fill in all fields';
            popupLoginError.classList.remove('hidden');
            return;
        }
        
        // Check credentials
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => 
            (user.username === username || user.email === username) && 
            user.password === password
        );
        
        if (!user) {
            popupLoginError.textContent = 'Invalid username/email or password';
            popupLoginError.classList.remove('hidden');
            return;
        }
        
        // Login successful
        localStorage.setItem('currentUser', user.username);
        
        // Set remember me
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        // Close popup and update UI
        closePopup();
        updateAuthUI();
    });
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        
        // If remember me is not set, clear all auth data
        if (!localStorage.getItem('rememberMe')) {
            // We don't clear users data to keep registrations
        }
        
        updateAuthUI();
    });
}

// Check URL parameters for showing login popup
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showLogin') === 'true' && overlay) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            
            setTimeout(() => {
                popup.classList.remove('scale-95', 'opacity-0');
                popup.classList.add('scale-100', 'opacity-100');
                
                // Pre-fill with last registered user if available
                const lastUser = localStorage.getItem('lastRegisteredUser');
                if (lastUser && document.getElementById('popupUsername')) {
                    document.getElementById('popupUsername').value = lastUser;
                    // Focus on password field
                    document.getElementById('popupPassword').focus();
                }
            }, 10);
        }, 500);
    }
}

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    checkUrlParams();
});