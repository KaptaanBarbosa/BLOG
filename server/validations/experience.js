const Validator = require('validator');
const isEmpty = require('./isempty');
module.exports = function validExperienceInput(data) {
	let errors = {};
    console.log("Title.....",data);
	data.title = !isEmpty(data.title) ? data.title : '';
	data.location = !isEmpty(data.location) ? data.location : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (!Validator.isLength(data.title, { min: 5, max: 30 })) {
		errors.title = 'title must not go away from range of 5 - 30 characters';
	}
	if (Validator.isEmpty(data.title)) {
		errors.title = 'title should not be empty';
	}
	if (!Validator.isLength(data.location, { min: 2, max: 15 })) {
		errors.location = 'location must not go away from range of 2 - 15 characters';
	}
	if (Validator.isEmpty(data.location)) {
		errors.location = 'location should not be empty';
	}
	if (!Validator.isLength(data.description, { min: 2, max: 300 })) {
		errors.description = 'description must not go away from range of 2 - 300 characters';
	}
	if (Validator.isEmpty(data.description)) {
		errors.description = 'description should not be empty';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
