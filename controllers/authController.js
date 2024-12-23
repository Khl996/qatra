const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// توليد رقم مستخدم فريد
function generateUserNumber() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// تسجيل المستخدمين
exports.register = async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        const newUser = await User.create({
            username,
            password,
            email,
            phone,
            userNumber: generateUserNumber(),
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration.', details: error.message });
    }
};

// تسجيل الدخول
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login.', details: error.message });
    }
};
