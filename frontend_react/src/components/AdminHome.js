import React from "react";
import styles from "../css/dashboard.module.css";

const AdminHome = ({ username, showSection }) => {
  return (
    <section id="home" className={`${styles.section} ${styles.active}`}>
      <div className={styles.container}>
        <div className={styles.contain}>
          <h1>
            Welcome back <span className={styles.highlight}>CoffeeeNM Admin</span>
          </h1>
          <p>Serve the Favorite Coffee Now!</p>
          <br />
          <p>" " " " "</p>
          <p>
            <a href="#" className={styles.btn} onClick={() => showSection("orders")}>
              Click here to see Serve the Order's
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
