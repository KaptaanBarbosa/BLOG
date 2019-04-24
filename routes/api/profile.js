const express = require('express');
const profile = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validations/profile');
const validateExperienceInput = require('../../validations/experience');
const validEducationInput = require('../../validations/education')
//Load Profile Model
const profileSchema = require('../../models/Profile');

profile.post('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);

	//check validation
	if (!isValid) {
		res.status(400).json(errors);
	}

	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;

	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
	if (req.body.skills) {
		profileFields.skills = req.body.skills.split(',');
	}
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
	profileSchema.findOne({ user: req.user.id }).then((err, profile) => {
		if (profile) {
			profileSchema
				.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
				.then((profile) => {
					return res.status(200).json(profile);
				});
		} else {
			profileSchema
				.findOne({ handle: profileFields.handle })
				.populate('user', [ 'name', 'avatar', 'email' ])
				.then((profile) => {
					if (profile) {
						errors.handle = 'That handle already exist';
						return res.status(404).json(profile);
					}
				});
			new profileSchema(profileFields)
				.save()
				.then((profile) => {
				  res.json(profile);
				})
				.catch((err) => {
					console.error('Error while saving profile schema.....', err);
				});
		}
	});
});

profile.get('/handle/:handle', (req, res) => {
	const errors = {};
	console.log('Req param----->>>>', req.params);
	profileSchema
		.findOne({ handle: req.params.handle })
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'No handle like this exist';
				return res.status(404).json(errors);
			}

			return res.json(profile);
		})
		.catch((error) => {
			return res.status(404).json(error);
		});
});

profile.get('/user/:user_id', (req, res) => {
	const errors = {};
	profileSchema
		.findOne({ user: req.params.user_id })
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'No user like this exist';
				return res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((error) => {
			res.status(404).json({ profile: 'No profile for this user' });
		});
});

profile.get('/experience/:exp_id', passport.authenticate('jwt', { session: false }),(req, res) => {
	const errors = {};
    console.log("Experience id .....",req.user.id );
	profileSchema
		.findOne({ user: req.user.id })
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profile) => {
            console.log("Profile.....",profile);
			if (!profile) {
				errors.noProfile = 'No user....... like this exist';
				return res.status(404).json(errors);
			}
           const removableIndex =  profile.experience.map((value)=> (value.id === req.params.exp_id));
           profile.experience.splice(removableIndex,1);
           profile.save().then(profile => res.json(profile)).catch(err=> res.status(404).json({error:err}));
		})
		.catch((error) => {
            console.log("ERROR.......",error);
			res.status(404).json({ profile: 'No profile for this user' });
		});
});

profile.get('/all', (req, res) => {
	const errors = {};
	profileSchema
		.find()
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'There are no Profiles';
				return res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((error) => {
			res.status(404).json({ profile: 'There are no profiles' });
		});
});

profile.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateExperienceInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	profileSchema
		.findOne({ user: req.user.id })
		.then((profile) => {
			const newExp = {
				title: req.body.title,
				location: req.body.location,
				company: req.body.company,
				from: req.body.from,
				to: req.body.to,
				current: req.body.description,
				description: req.body.description
			};

			profile.experience.unshift(newExp);
			profile.save().then((profile) => {
				res.json(profile);
			});
		})
		.catch((error) => {
			res.status(404).json({ profile: 'Cant save experience No user with this ID' });
		});
});

profile.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validEducationInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	profileSchema
		.findOne({ user: req.user.id })
		.then((profile) => {
			const newExp = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.description,
				description: req.body.description
			};
            console.log('profile....',profile);
			profile.education.unshift(newExp);
			profileSchema.save().then((profile) => {
				res.json(profile);
			});
		})
		.catch((error) => {
			res.status(404).json();
		});
});


module.exports = profile;
