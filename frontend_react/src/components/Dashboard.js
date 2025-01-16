import React, { useState } from "react";
import styles from "../css/dashboard.module.css";
import favicon from "../img/favicon.jpg";
import Home from "./Home";
import Menu from "./Menu";
import Order from "./Order";

const Dashboard = ({ username, logOut }) => {
  const [activeSection, setActiveSection] = useState("home");

  function showSection(section) {
    setActiveSection(section);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <span>CoffeeeNM</span>
        </div>
        <img
          src={favicon}
          alt="CoffeeeNM Logo"
          className={styles.logo}
        />
        <div className={styles.navLinks}>
          <a href="#" onClick={() => showSection("home")}>
            Home
          </a>
          <a href="#" onClick={() => showSection("menu")}>
            Menu
          </a>
          <a href="#" onClick={() => showSection("orders")}>
            Orders
          </a>
          <a href="#" onClick={logOut}>
            Logout
          </a>
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <h2 className={styles.greeting}>
          Welcome, {username}!
        </h2>
        {activeSection === "home" && <Home username={username} showSection={showSection} />}
        {activeSection === "menu" && <Menu username={username} />}
        {activeSection === "orders" && <Order username={username} />}
      </div>

      <div className={styles.footer}>
        <p>&copy; 2024 CoffeeeNM. All rights reserved.</p>
        <p>
          Contact us at: coffeeenm@mail.com | +XX XXXXXXXXX
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
