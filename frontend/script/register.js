document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const user = document.querySelector('input[name="user"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const mobile = document.querySelector('input[name="mobile"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const password1 = document.querySelector('input[name="password1"]').value;
    if (password !== password1) {
        alert('Passwords do not match!');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                city,
                username: user,
                password,
                confirmPassword: password1
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! You can now log in.');
            window.location.href = './login.html';
        } else {
            alert(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});
