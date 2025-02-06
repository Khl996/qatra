const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Store = require('../models/Store');
const Point = require('../models/Point'); // تعديل الاستيراد
const logger = require('../config/logger');

const adminController = {
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const admin = await Admin.findOne({
                where: { email }
            });

            if (!admin) {
                logger.warn(`Admin login failed: no admin found with email ${email}`);
                return res.status(401).json({ 
                    message: 'بيانات الدخول غير صحيحة'
                });
            }

            const isValid = await bcrypt.compare(password, admin.password);
            if (!isValid) {
                logger.warn(`Admin login failed: invalid password for ${email}`);
                return res.status(401).json({ 
                    message: 'بيانات الدخول غير صحيحة'
                });
            }

            const token = jwt.sign(
                { 
                    id: admin.id, 
                    role: 'admin',
                    email: admin.email
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' } // تمديد مدة الصلاحية إلى 7 أيام
            );

            logger.info(`Admin logged in successfully: ${email}`);
            res.json({ 
                token,
                user: {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: 'admin'
                }
            });
        } catch (error) {
            logger.error('Admin login error:', error);
            res.status(500).json({ 
                message: 'حدث خطأ أثناء تسجيل الدخول'
            });
        }
    },

    createSuperAdmin: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            
            // التحقق من عدم وجود مسؤول بنفس البريد الإلكتروني
            const existingAdmin = await Admin.findOne({ where: { email } });
            if (existingAdmin) {
                return res.status(400).json({ 
                    message: 'البريد الإلكتروني مستخدم بالفعل'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const admin = await Admin.create({
                name,
                email,
                password: hashedPassword,
                role: 'admin'
            });

            logger.info(`Super admin created successfully: ${email}`);
            res.status(201).json({ 
                message: 'تم إنشاء حساب المسؤول بنجاح',
                admin: { 
                    id: admin.id, 
                    email: admin.email,
                    name: admin.name
                }
            });
        } catch (error) {
            logger.error('Error creating super admin:', error);
            res.status(500).json({ message: error.message });
        }
    },

    viewStores: async (req, res) => {
        try {
            const stores = await Store.findAll();
            res.status(200).json({ message: 'Stores retrieved successfully', stores });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving stores', error: error.message });
        }
    },

    approveStore: async (req, res) => {
        try {
            const { storeId } = req.params;
            const store = await Store.findByPk(storeId);

            if (!store) {
                return res.status(404).json({ message: 'Store not found' });
            }

            store.status = 'approved';
            await store.save();

            res.status(200).json({ message: 'Store approved successfully', store });
        } catch (error) {
            res.status(500).json({ message: 'Error approving store', error: error.message });
        }
    },

    rejectStore: async (req, res) => {
        try {
            const { storeId } = req.params;
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
    },

    viewUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json({ message: 'Users retrieved successfully', users });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error: error.message });
        }
    },

    updateUser: async (req, res) => {
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
    },

    deleteUser: async (req, res) => {
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
    },

    viewReports: async (req, res) => {
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
    },

    createSubAdmin: async (req, res) => {
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
    },

    getDashboardStats: async (req, res) => {
        try {
            const stats = {
                totalUsers: await User.count() || 0,
                totalStores: await Store.count() || 0,
                totalPoints: await Point.sum('points') || 0
            };

            res.json(stats);
        } catch (error) {
            console.error('Error:', error);
            // إرجاع قيم افتراضية في حالة الخطأ
            res.json({
                totalUsers: 0,
                totalStores: 0,
                totalPoints: 0
            });
        }
    }
};

module.exports = adminController;
