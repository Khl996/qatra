
const commonValidations = {
    phone: {
        validate: {
            is: /^[0-9]{10}$/
        }
    },
    email: {
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        validate: {
            len: [6, 100],
            notEmpty: true
        }
    }
};

module.exports = commonValidations;