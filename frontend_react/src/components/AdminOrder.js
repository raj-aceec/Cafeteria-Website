import React, { useEffect, useState } from 'react';
import styles from '../css/dashboard.module.css';
import coffeeBean from "../img/americano.jpg";

const AdminOrder = ({ username }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/order/orderdetails')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, );

  const serveOrder = (orderId) => {
    fetch(`http://localhost:8080/order/serve/${orderId}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(result => {
        alert('Order served successfully');
        setOrders((prevOrders) => prevOrders.filter(order => order.order_id !== orderId));
      })
      .catch(error => console.error('Error in serving  order:', error));
  };

  return (
    <section id="orders" className="section">
      <div className={styles.container1}>
        <div className={styles.orders}>
          <div className={styles.order_box}>
            {orders.map((order) => (
              <div key={order.order_id} className={styles.order_card}>
                <div className={styles.order_image}>
                  <img
                    src={coffeeBean}
                    alt={order.item_name}
                  />
                </div>
                <div className={styles.para}>
                  <h4>Order ID: {order.order_id}</h4>
                  <h4>Order Name: {order.item_name}</h4>
                  <h4>Quantity: {order.quantity}</h4>
                  <h4>Table Number: {order.tablename}</h4>
                  <h4>Price: ₹{order.price}</h4>
                </div>
                <div className={styles.btn2}>
                  {order.status === 'pending' ? (
                    <button type="button" onClick={() => serveOrder(order.order_id)}>
                      Serve
                    </button>
                  ) : (
                    <span className={styles.completed}>Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrder;
