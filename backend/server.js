const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: '785fce2651e12e24f5fbd370f175c37b643c9d724d92362256f28af30fbf32c5acbbebf75d021f6b3201734ff7ff21b88649cd8045a8e01b042152e050010280',
    resave: false,
    saveUninitialized: true,
}));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
