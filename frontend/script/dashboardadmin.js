function logOut() {
    if (confirm("Do you want to Logout..?")) window.location.href = './login.html';
}
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const sectionToShow = document.getElementById(sectionId);
    sectionToShow.classList.add('active');
}
document.addEventListener('DOMContentLoaded', () => {
    const ordersContainer = document.querySelector('.order_box');
    fetch('http://localhost:8080/order/orderdetails')
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
                        <h4>Price: $${order.price}</h4>
                    </div>
                    <div class="btn2">
                        ${order.status === 'pending'
                        ? `<button type="button" onclick="serveOrder(${order.order_id})">Serve</button>`
                        : `<span class="completed">Already Served</span>`}
                    </div>
                `;
                ordersContainer.appendChild(orderCard);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
});

function serveOrder(orderId) {
    fetch(`http://localhost:8080/order/serve/${orderId}`, {
        method: 'PUT',
    })
        .then(response => response.json())
        .then(result => {
            alert('Order marked as served successfully');
            location.reload();
        })
        .catch(error => console.error('Error serving order:', error));
}
