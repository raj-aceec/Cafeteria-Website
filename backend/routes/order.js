const express = require('express');
const mysql = require('mysql');
const util = require('util');
const router = express.Router();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'raj1234',
    database: 'coffee',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

router.post('/ordernow', async (req, res) => {
    const { username, item_name, table_num, quantity } = req.body;
    if (!username || !item_name || !table_num || !quantity) {
        return res.status(400).json({ message: 'Unauthorized User' });
    }
    try {
        const query = util.promisify(db.query).bind(db);
        const sql2 = 'SELECT * FROM coffee WHERE coffee_name = ?';
        const coffeeResults = await query(sql2, [item_name]);
        if (coffeeResults.length === 0) {
            return res.status(404).json({ message: 'Coffee not available' });
        }
        const coffeeDetails = coffeeResults[0];
        const price = coffeeDetails.price;
        const sql = 'INSERT INTO orders (username, item_name, tablename, quantity, price, order_date) VALUES (?, ?, ?, ?, ?, CURDATE())';
        await query(sql, [username, item_name, table_num, quantity, parseInt(price * quantity)]);
        res.status(201).json({ message: 'Ordered Successfully' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});
router.get('/orderdetails/:username', (req, res) => {
    const { username } = req.params;
    const query = `SELECT order_id, item_name, order_date, quantity, price, status FROM orders WHERE username = ? ORDER BY status DESC`;
    db.query(query, [username],(err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Failed to fetch orders' });
        } else {
            res.json(results);
        }
    });
});
router.get('/orderdetails', (req, res) => {
    const query = `SELECT order_id, item_name, order_date, quantity,tablename, price, status FROM orders ORDER BY status DESC`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Failed to fetch orders' });
        } else {
            res.json(results);
        }
    });
});
router.delete('/orderdetails/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM orders WHERE order_id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting order:', err);
            res.status(500).json({ error: 'Failed to delete order' });
        } else {
            res.json({ message: 'Order Cancelled successfully' });
        }
    });
});
router.put('/serve/:id', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE orders SET status = 'completed' WHERE order_id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error updating order status:', err);
            res.status(500).json({ error: 'Failed to update order status' });
        } else {
            res.json({ message: 'Order  served successfully' });
        }
    });
});

module.exports = router;