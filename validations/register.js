const Validator = require('validator');
const isEmpty = require('./isempty');
module.exports = function validRegisterInput(data) {
	let errors = {};
	console.log('*********', Validator.isLength(data.name, { min: 5, max: 30 }));
	if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
		errors.name = 'name must not go away from range of 2 - 30 characters';
	}
	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name should not be empty';
	}

	if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
		errors.name = 'Password length must not go away from range of 2 - 30 characters';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is not valid';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
