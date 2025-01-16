import React, { useState } from 'react';
import styles from '../css/register.module.css'; // Import the new CSS module
import coffeeBean from "../img/coffee_bean.png";
import Login from '../components/Login';

const Register = () => {
    const [redirectTo, setRedirectTo] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        city: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful! You can now log in.');
                setRedirectTo("login");
            } else {
                alert(`Registration failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };
    if (redirectTo === "login") {
        return <Login />;
    }

    return (
        <div className={styles.bodyClass}>
            <div className={styles.loginContainer}>
                <img src={coffeeBean} alt="Coffee Icon" />
                <h1><span className={styles.highlight}>CoffeeeNM</span></h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email address"
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            placeholder="City"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            placeholder="Mobile"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account?{" "}
                    <button className={styles.linkButton}
                        onClick={() => setRedirectTo("login")}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
