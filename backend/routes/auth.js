const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const router = express.Router();
const jwtSecret = 'f6ff04e2f95846451da61271655602fcf40667f189218c9f9ba87fc7f3d6416ba15174491ca45fe7a736849103c620d9266d148ada6a98c1fde58147c2acac57c7771de1ff19140c31c86f404928a9f0c21bc9d62c2d720b0784364f234993d4191e4f2607148c7e800d4955ad2f3de324c5c38d225a1e76af3b9e31bc01fd056e20abf7135ef71be292c909e2add8f29fe29a225dc449ae2a1076a68426b8aff6020a16a885f97c415148c3d6b83525397988e478fcf5d6b886d4d4cfe714d75bc752259c789617cc37a65b7bf5b66d9202e4cae22df5d116ac49c6d715fe0ea6601ae05f367658130748bda6c0c34f6f07e0c21060b89548a9b6cc5319e477';
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
router.post('/register', async (req, res) => {
    const { name, email, city, username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const sql = 'INSERT INTO users (name, email, city, username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, city, username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Existing user, Please Login' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log(username);
    // console.log(password);
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = results[0];
        const isMatch = (password === user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        req.session.user = { id: user.id, username: user.username };
        res.json({ message: 'Login successful', token });
    });
});
router.post('/adminlogin', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM admin WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const admin = results[0];
        const isMatch = (password === admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id, username: admin.username }, jwtSecret, { expiresIn: '1h' });
        req.session.user = { id: admin.id, username: admin.username };
        res.json({ message: 'Login successful', token });
    });
});
module.exports = router;
