const Validator = require('validator');
const isEmpty = require('./isempty');
module.exports = function validPostInput(data) {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.avatar = !isEmpty(data.avatar) ? data.avatar : '';
	data.text  = !isEmpty(data.text) ? data.text : '';
    console.log("Data....",data);
	if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
		errors.handle = 'name must not go away from range of 3 - 30 characters';
	}
	if (Validator.isEmpty(data.name)) {
		errors.handle = 'name should not be empty';
	}
	
	if (!Validator.isLength(data.text, { min: 5, max: 500 })) {
		errors.comments = 'comments must not go away from range of 5 - 300characters';
	}
	if (Validator.isEmpty(data.text)) {
		errors.comments = 'comments should not be empty';
	}


	return {
		errors,
		isValid: isEmpty(errors)
	};
};
