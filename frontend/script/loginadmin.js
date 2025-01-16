const form = document.getElementById('loginForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:8080/auth/adminlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Login successful! Redirecting...');
            window.location.href = `C:/Users/nagar/Documents/GRADIOUS RESOURCES/Coffeee/frontend/admin/admindashboard.html?username=${username}`;
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});