const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); // تغيير من User إلى Admin
const sequelize = require('../config/database');

async function createSuperAdmin() {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        console.log('Database connected!');
        
        // التحقق من وجود مسؤول بنفس البريد الإلكتروني
        const existingAdmin = await Admin.findOne({
            where: { email: 'admin@qatra.com' }
        });

        if (existingAdmin) {
            console.log('Admin already exists with this email');
            return;
        }
        
        console.log('Creating admin account...');
        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        
        const admin = await Admin.create({
            name: 'Admin',
            email: 'admin@qatra.com',
            password: hashedPassword,
            role: 'admin'
        });

        console.log('Admin created successfully:', {
            id: admin.id,
            email: admin.email,
            role: admin.role,
            name: admin.name
        });

    } catch (error) {
        console.error('Error details:', error);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

createSuperAdmin();
