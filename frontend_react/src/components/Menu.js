// Menu.js
import React from "react";
import { useState } from "react";
import styles from "../css/dashboard.module.css";
import cafeLatte from "../img/cafe latte.jpg";
import cappucino from "../img/cappucino.jpg";
import expresso from "../img/espresso.jpg";
import americano from "../img/americano.jpg";
import coffeeBean from "../img/coffee_bean.png";
const Menu = ({ username }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    cups: "",
    table: "",
  });
  const menuItems = [
    {
      imgSrc: cafeLatte,
      title: "Cafe Latte",
      description:
        "A café latte is a coffee drink made with espresso and steamed milk, topped with a little foam. It has a creamy and mild flavor. It has a rich flavour.",
      price: "₹250/-",
    },
    {
      imgSrc: cappucino,
      title: "Cappucino",
      description:
        "A cappuccino is a coffee drink made with equal parts espresso, steamed milk, and milk foam. It has a rich, frothy texture and a stronger coffee flavor than a latte.",
      price: "₹350/-",
    },
    {
      imgSrc: expresso,
      title: "Espresso",
      description:
        "An espresso is a strong, concentrated coffee made by forcing hot water through finely-ground coffee beans. It has a bold flavor and forms base for many coffee's.",
      price: "₹300/-",
    },
    {
      imgSrc: americano,
      title: "Americano",
      description:
        "An Americano is a coffee drink made by diluting espresso with hot water. It has a milder flavor than espresso but retains its rich, bold taste.",
      price: "₹350/-",
    },
  ];
  const handleOrderClick = (coffeeType) => {
    setSelectedCoffee(coffeeType);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setOrderDetails({ cups: "", table: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      username,
      item_name: selectedCoffee,
      table_num: parseInt(orderDetails.table),
      quantity: parseInt(orderDetails.cups),
    };
    try {
      const response = await fetch("http://localhost:8080/order/ordernow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      alert(result.message);
      if (response.ok) {
        handlePopupClose();
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.container1}>
        <div className={styles.menu}>
          <div className={styles.menuBox}>
            {menuItems.map((item, index) => (
              <div key={index} className={styles.menuCard}>
                <div className={styles.menuImage}>
                  <img src={item.imgSrc} alt={item.title} />
                </div>
                <div className={styles.menuInfo}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <h3>Price: {item.price}</h3>
                  <button data={item.title} className={styles.orderButton} onClick={() => handleOrderClick(item.title)}>
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {popupVisible && (
        <div className={`${styles.popupContainer} ${popupVisible ? styles.visible : ""}`}>
          <div className={styles.popup}>
            <img
              src={coffeeBean}
              alt="Coffee Icon"
              className={styles.popupImage}
            />
            <h2>Enter Order Details</h2>
            <form onSubmit={handleOrderSubmit}>
              <input
                type="text"
                id="coffeeType"
                value={selectedCoffee}
                readOnly
                className={styles.popupInput}
              />
              <input
                type="number"
                id="cups"
                name="cups"
                placeholder="Number of Cups"
                required
                value={orderDetails.cups}
                onChange={handleInputChange}
                className={styles.popupInput}
              />
              <input
                type="number"
                id="table"
                name="table"
                placeholder="Table Number"
                required
                value={orderDetails.table}
                onChange={handleInputChange}
                className={styles.popupInput}
              />
              <button type="submit" className={styles.popupSubmit}>
                Submit
              </button>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handlePopupClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
