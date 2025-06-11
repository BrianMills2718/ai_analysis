// Simple password protection for RAND AI Analysis Dashboard
(function() {
    // Configuration
    const PASSWORD = 'changeme123'; // Change this to your desired password
    const AUTH_KEY = 'rand_ai_authenticated';
    
    // Check if already authenticated this session
    if (sessionStorage.getItem(AUTH_KEY) === 'true') {
        return; // Already authenticated
    }
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f5f7fa;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Inter', -apple-system, sans-serif;
    `;
    
    // Create login form
    const loginBox = document.createElement('div');
    loginBox.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 90%;
        text-align: center;
    `;
    
    loginBox.innerHTML = `
        <h2 style="color: #003366; margin-bottom: 1rem;">RAND AI Methods Intelligence</h2>
        <p style="color: #666; margin-bottom: 2rem;">Please enter the access password provided in your email.</p>
        <input type="password" id="password-input" placeholder="Enter password" style="
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            margin-bottom: 1rem;
        ">
        <button id="submit-btn" style="
            width: 100%;
            padding: 0.75rem;
            background-color: #003366;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        ">Access Dashboard</button>
        <p id="error-msg" style="color: #d32f2f; margin-top: 1rem; display: none;">
            Incorrect password. Please try again.
        </p>
    `;
    
    overlay.appendChild(loginBox);
    document.body.appendChild(overlay);
    
    // Focus on password input
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-btn');
    const errorMsg = document.getElementById('error-msg');
    
    passwordInput.focus();
    
    // Handle authentication
    function authenticate() {
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            overlay.style.display = 'none';
        } else {
            errorMsg.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    }
    
    // Event listeners
    submitBtn.addEventListener('click', authenticate);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            authenticate();
        }
    });
    
    // Hover effect for button
    submitBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#00509e';
    });
    submitBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#003366';
    });
})();