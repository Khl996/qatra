const bcrypt = require('bcrypt');

const passwordHooks = {
    beforeCreate: async (instance) => {
        if (instance.password) {
            instance.password = await bcrypt.hash(instance.password, 10);
        }
    },
    beforeUpdate: async (instance) => {
        if (instance.changed('password')) {
            instance.password = await bcrypt.hash(instance.password, 10);
        }
    }
};

module.exports = passwordHooks;
