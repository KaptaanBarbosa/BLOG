const Validator = require('validator');
const isEmpty = require('./isempty');
module.exports = function validProfileInput(data) {
	let errors = {};
	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';
	// data.handle = !isEmpty(data.handle) ? data.handle : '';
	// data.handle = !isEmpty(data.handle) ? data.handle : '';
	// data.handle = !isEmpty(data.handle) ? data.handle : '';
	// data.handle = !isEmpty(data.handle) ? data.handle : '';

	if (!Validator.isLength(data.handle, { min: 5, max: 30 })) {
		errors.handle = 'handle must not go away from range of 5 - 30 characters';
	}
	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'handle should not be empty';
	}
	if (!Validator.isLength(data.status, { min: 2, max: 30 })) {
		errors.status = 'status must not go away from range of 2 - 30 characters';
	}
	if (Validator.isEmpty(data.status)) {
		errors.status = 'status should not be empty';
	}
	if (!Validator.isLength(data.skills, { min: 5, max: 300 })) {
		errors.skills = 'skills must not go away from range of 5 - 300characters';
	}
	if (Validator.isEmpty(data.skills)) {
		errors.skills = 'skills should not be empty';
	}
	// if (!Validator.isLength(data.education, { min: 2, max: 30 })) {
	// 	errors.skills = 'enter education values';
	// }
	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = 'NOT a valid URL';
		}
	}
	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = 'NOT a valid URL';
		}
	}
	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = 'NOT a valid URL';
		}
	}
	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = 'NOT a valid URL';
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.facebook = 'NOT a valid URL';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
