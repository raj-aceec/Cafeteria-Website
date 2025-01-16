import React, { useState } from "react";
import loginStyles from "../css/login.module.css";
import coffeeBean from "../img/coffee_bean.png";
import Register from "../components/Register";
import Dashboard from "./Dashboard";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirectTo, setRedirectTo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);  

    const handleLogout = () => {
        setIsLoggedIn(false);  
    };


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Login successful! Rediercting to Dashboard");
                setRedirectTo("dashboard"); 
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An unexpected error occurred. Please try again.");
        }
        setIsLoggedIn(true);  
    };

    if (redirectTo === "dashboard") {
        return (<div>
            {isLoggedIn ? (
                <Dashboard username={username} logOut={handleLogout} />  
            ) : (
                <Login onLogin={handleLogin} />  
            )}
        </div>);
    }

    if (redirectTo === "register") {
        return <Register />;
    }

    return (
        <div className={loginStyles.bodyClass}>
            <div className={loginStyles.loginContainer}>
                <img src={coffeeBean} alt="Coffee Icon" className={loginStyles.logo} />
                <h1>
                    <span className={loginStyles.highlight}>CoffeeeNM</span>
                </h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="user"
                        id="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={loginStyles.inputField}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={loginStyles.inputField}
                    />
                    <button type="submit" className={loginStyles.submitButton}>
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <button className={loginStyles.linkButton}
                        onClick={() => setRedirectTo("register")}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
