const sequelize = require('../config/database');
const Store = require('../models/storeModel');

async function seedStores() {
    await sequelize.sync({ alter: true });
    await Store.bulkCreate([
        { name: 'متجر A', rating: 4.8 },
        { name: 'متجر B', rating: 4.5 }
    ]);
    console.log('Stores have been seeded!');
}

seedStores()
    .then(() => console.log('Seeding completed.'))
    .catch(err => console.error('Error seeding stores:', err));
