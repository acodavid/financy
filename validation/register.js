const Validator = require('validator');
const empty = require('./empty');

module.exports = function validationRegister(data) {

    let errors = {};

    data.name = !empty(data.name) ? data.name : '';
    data.email = !empty(data.email) ? data.email : '';
    data.password = !empty(data.password) ? data.password : '';

    if (!Validator.isLength(data.name, { min: 2, max: 25 })) {
        errors.name = 'Ime mora biti izmedju 2 i 25 karaktera'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Ime je obavezno'
    }

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

    if (!Validator.isAlpha(data.workplace)) {
        errors.workplace = 'Lokacija nije validna (koristiti samo slova)'
    }

    if (Validator.isEmpty(data.workplace)) {
        errors.workplace = 'Lokacija je obavezna'
    }

    return {
        errors,
        isValid: empty(errors)
    }

}