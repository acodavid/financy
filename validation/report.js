const Validator = require('validator');
const empty = require('./empty');

module.exports = function validationReport(data) {

    let errors = {};

    data.person = !empty(data.person) ? data.person : '';
    data.other = !empty(data.other) ? data.other : '';

    if (!Validator.isLength(data.person, { min: 2, max: 25 })) {
        errors.person = 'Ime mora biti izmedju 2 i 25 karaktera'
    }

    if (Validator.isEmpty(data.person)) {
        errors.person = 'Ime je obavezno'
    }

    if (!Validator.isLength(data.other, { min: 10 })) {
        errors.other = 'Ovo polje mora da sadrzi najmanje 10 karaktera'
    }

    if (Validator.isEmpty(data.other)) {
        errors.other = 'Ovo polje je obavezno'
    }

    return {
        errors,
        isValid: empty(errors)
    }

}