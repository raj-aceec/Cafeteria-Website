import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import styles from './css/index.module.css';
import coffee_bean from './img/coffee_bean.png';
import AdminLogin from "./components/AdminLogin";

function App() {
  const [currentComponent, setCurrentComponent] = useState("home");
  const renderComponent = () => {
    switch (currentComponent) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "adminlogin":
        return <AdminLogin/>
      default:
        return (
          <div className={styles.bodyClass}>
            <div className={styles.container}>
              <img src={coffee_bean} alt="Coffee Icon" />
              <h1>
                Welcome to <span className={styles.highlight}>CoffeeeNM</span>
              </h1>
              <p>Order Your Favorite Coffee Now!</p>
              <div className={styles.btnGroup}>
                <button className={styles.btn} onClick={() => setCurrentComponent("register")}>
                  New user? Register here
                </button>
                <button className={styles.btn} onClick={() => setCurrentComponent("login")}>
                  Existing user? Login
                </button>
              </div>
              <p></p>
              <button className={styles.btn} onClick={() => setCurrentComponent("adminlogin")}>
                  Admin? Login here
                </button>
            </div>
          </div>
        );
    }
  };

  return <div>{renderComponent()}</div>;
}

export default App;
