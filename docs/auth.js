// Simple password protection
(function() {
    // Check if already authenticated
    const authKey = 'rand_ai_auth';
    const isAuthenticated = sessionStorage.getItem(authKey);
    
    if (!isAuthenticated) {
        const password = prompt('Please enter the access password:');
        
        // Change this to your desired password
        const correctPassword = 'changeme123';
        
        if (password !== correctPassword) {
            document.body.innerHTML = '<h1>Access Denied</h1><p>Invalid password. Please refresh to try again.</p>';
            throw new Error('Unauthorized');
        }
        
        sessionStorage.setItem(authKey, 'true');
    }
})();