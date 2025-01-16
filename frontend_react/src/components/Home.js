import React from "react";
import styles from "../css/dashboard.module.css";

const Home = ({ username, showSection }) => {
  return (
    <section id="home" className={`${styles.section} ${styles.active}`}>
      <div className={styles.container}>
        <div className={styles.contain}>
          <h1>
            Welcome to <span className={styles.highlight}>CoffeeeNM</span>
          </h1>
          <p>Order Your Favorite Coffee Now!</p>
          <br />
          <p>
            <a href="#" className={styles.btn} onClick={() => showSection("menu")}>
              Click here to Order
            </a>
          </p>
          <p>" " " " "</p>
          <p>
            <a href="#" className={styles.btn} onClick={() => showSection("orders")}>
              Click here to see the Order Details
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
