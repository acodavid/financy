const Validator = require('validator');
const empty = require('./empty');

module.exports = function validationLogin(data) {

    let errors = {};

    data.email = !empty(data.email) ? data.email : '';
    data.password = !empty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email nije validan'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email je obavezan'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Lozinka mora biti izmedju 3 i 6 karaktera'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Lozinka je obavezna'
    }

    return {
        errors,
        isValid: empty(errors)
    }

}