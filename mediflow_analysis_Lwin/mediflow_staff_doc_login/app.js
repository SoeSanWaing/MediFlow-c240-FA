const AUTH_MAP = {
    'admin123': {
        password: 'admin123',
        url: 'https://soesanwaing.github.io/MediFlow-c240-FA/Dashboard%20Soe%20San/index.html'
    },
    'patient123': {
        password: 'patient123',
        url: 'https://placeholder-patient-link.github.io'
    },
    'nurse123': {
        password: 'nurse123',
        url: 'https://placeholder-nurse-link.github.io'
    },
    'doctor123': {
        password: 'doctor123',
        url: 'https://placeholder-doctor-link.github.io'
    },
    'mgmt123': {
        password: 'mgmt123',
        url: 'https://choppedtomato277.github.io/mediflow/'
    }
};

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('errorMessage');
    
    errorElement.textContent = ''; // Reset error message
    
    const user = AUTH_MAP[username];
    
    if (user && user.password === password) {
        // Successful login
        window.location.href = user.url;
    } else {
        // Failed login
        errorElement.textContent = 'Invalid username or password. Please try again.';
    }
});