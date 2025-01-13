const Store = require('../models/Store');
const User = require('../models/User');
const Point = require('../models/Point');

const approveStore = async (req, res) => {
    const { storeId } = req.params;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            console.log('Store not found');
            return res.status(404).json({ message: 'Store not found' });
        }

        store.status = 'approved';
        await store.save();

        console.log('Store approved successfully');
        res.status(200).json({ message: 'Store approved successfully', store });
    } catch (error) {
        console.error('Error approving store:', error);
        res.status(500).json({ message: 'Error approving store', error: error.message });
    }
};

const rejectStore = async (req, res) => {
    const { storeId } = req.params;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        store.status = 'rejected';
        await store.save();

        res.status(200).json({ message: 'Store rejected successfully', store });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting store', error: error.message });
    }
};

const viewStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json({ message: 'Stores retrieved successfully', stores });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving stores', error: error.message });
    }
};

const viewUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // حذف النقاط المرتبطة بالمستخدم
        await Point.destroy({ where: { userId: id } });

        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

const createSuperAdmin = async (req, res) => {
    const bcrypt = require('bcrypt');

    try {
        const existingAdmin = await User.findOne({ where: { role: 'admin' } });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Super Admin already exists' });
        }

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const superAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: '0000000000',
            uniqueCode: Math.floor(10000000 + Math.random() * 90000000),
            role: 'admin',
        });

        res.status(201).json({ message: 'Super Admin created successfully', superAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Super Admin', error: error.message });
    }
};

const createSubAdmin = async (req, res) => {
    const bcrypt = require('bcrypt');

    try {
        const { name, email, password, permissions } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const subAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: '0000000000',
            uniqueCode: Math.floor(10000000 + Math.random() * 90000000),
            role: 'sub-admin',
            permissions,
        });

        res.status(201).json({ message: 'Sub Admin created successfully', subAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Sub Admin', error: error.message }); // تصحيح الخطأ هنا
    }
};

const viewReports = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalPoints = await Point.sum('points');

        res.status(200).json({
            message: 'Reports retrieved successfully',
            reports: {
                totalUsers,
                totalStores,
                totalPoints,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reports', error: error.message });
    }
};

const adminLogin = async (req, res) => {
    // ...الكود الخاص بتسجيل الدخول للإدارة...
};

module.exports = {
    approveStore,
    rejectStore,
    viewReports,
    viewUsers,
    updateUser,
    deleteUser,
    viewStores,
    createSuperAdmin,
    createSubAdmin,
    adminLogin
};
