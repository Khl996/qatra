const sequelize = require('../config/database');
const initAssociations = require('../models/associations');

const initDatabase = async () => {
    try {
        // إنشاء العلاقات بين النماذج
        initAssociations();
        
        // مزامنة قاعدة البيانات
        await sequelize.sync({ force: true }); // استخدم force: true لإعادة إنشاء الجداول
        console.log('Database synchronized successfully');
        
        process.exit(0);
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
};

initDatabase();
