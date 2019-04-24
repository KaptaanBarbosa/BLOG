const Validator = require('validator');
const isEmpty = require('./isempty');
module.exports = function validEducationInput(data) {
	let errors = {};
    console.log("Title.....",data);
	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.to = !isEmpty(data.to) ? data.to : '';
	data.current = !isEmpty(data.current) ? data.current : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (!Validator.isLength(data.school, { min: 5, max: 60 })) {
		errors.school = 'title must not go away from range of 5 - 60 characters';
	}
	if (Validator.isEmpty(data.school)) {
		errors.school = 'title should not be empty';
	}
	if (!Validator.isLength(data.degree, { min: 2, max: 15 })) {
		errors.degree = 'location must not go away from range of 2 - 15 characters';
	}
	if (Validator.isEmpty(data.degree)) {
		errors.degree = 'location should not be empty';
	}
	
	if (Validator.isEmpty(data.description)) {
		errors.description = 'description should not be empty';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
