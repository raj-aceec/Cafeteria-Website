function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  const sectionToShow = document.getElementById(sectionId);
  sectionToShow.classList.add('active');
}
function logOut() {
  if (confirm("Do you want to Logout..?")) window.location.href = './index.html';
}
const popupContainer = document.getElementById('popupContainer');
const closeFormBtn = document.getElementById('closeFormBtn');
const popupForm = document.getElementById('popupForm');
const coffeeTypeInput = document.getElementById('coffeeType');
document.querySelectorAll('button[data]').forEach(button => {
  button.addEventListener('click', () => {
    const coffeeType = button.getAttribute('data');
    coffeeTypeInput.value = coffeeType;
    popupContainer.style.display = 'flex';
  });
});
closeFormBtn.addEventListener('click', () => {
  popupContainer.style.display = 'none';
  popupForm.reset();
});
popupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const coffeeType = coffeeTypeInput.value;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');
  const cups = document.getElementById('cups').value;
  const table = document.getElementById('table').value;
  const orderData = {
    username: username,
    item_name: coffeeType,
    table_num: parseInt(table),
    quantity: parseInt(cups)
  };
  try {
    const response = await fetch('http://localhost:3000/order/ordernow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    alert('An error occurred. Please try again.');
  }
  popupContainer.style.display = 'none';
  popupForm.reset();
  location.reload();
});
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
console.log(username);
document.addEventListener('DOMContentLoaded', () => {
  const ordersContainer = document.querySelector('.order_box');
  fetch(`http://localhost:3000/order/orderdetails/${username}`)
    .then(response => response.json())
    .then(orders => {
      orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order_card';

        orderCard.innerHTML = `
                  <div class="order_image">
                      <img src="C:/Users/nagar/Documents/GRADIOUS RESOURCES/Coffeee/frontend/img/americano.jpg" alt="${order.item_name}">
                  </div>
                  <div class="para">
                      <h4>Order ID: ${order.order_id}</h4>
                      <h4>Order Name: ${order.item_name}</h4>
                      <h4>Date: ${order.order_date}</h4>
                      <h4>Quantity: ${order.quantity}</h4>
                      <h4>Price: ₹${order.price}</h4>
                  </div>
                  <div class="btn2">
                        ${order.status === 'pending'
            ? `<button type="button" onclick="cancelOrder(${order.order_id})">Cancel</button>`
            : `<span class="completed">Completed</span>`}
                  </div>
              `;
        ordersContainer.appendChild(orderCard);
      });
    })
    .catch(error => console.error('Error fetching orders:', error));
});
function cancelOrder(orderId) {
  fetch(`http://localhost:3000/order/orderdetails/${orderId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(result => {
      alert('Order cancelled successfully');
      location.reload();
    })
    .catch(error => console.error('Error cancelling order:', error));
}
