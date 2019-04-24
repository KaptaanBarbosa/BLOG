const express = require('express');
const router = express.Router();
const UserModel = require('../../models/Users');
const gravtar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
router.get('/test', (req, res) => {
	console.log('---------------------------jguguguygy');
	res.json({ msg: 'Users Works' });
});

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(404).json(errors);
	}
	UserModel.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: 'Email already exist' });
		} else {
			const avatar = gravtar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});
			const newUserModel = new UserModel({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password,
				comments: req.body.comments
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUserModel.password, salt, (err, hash) => {
					if (err) throw err;
					newUserModel.hash = hash;
					newUserModel
						.save()
						.then((user) => {
							res.json(user);
						})
						.catch((err) => {
							console.log('ERROR:--->', err);
						});
				});
			});
		}
	});
});

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	UserModel.findOne({ email }).then((user) => {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		var saltvalue = bcrypt.compareSync(user.password, hash);
		if (saltvalue) {
			//res.json({status:'sucess'});
			const payload = { id: user.id, name: user.name, avatar: user.avatar };
			jwt.sign(payload, keys.secret, { expiresIn: 48000 }, (err, token) => {
				res.json({ success: true, token: 'bearer' + ' ' + token });
			});
		} else {
			res.status(404).json({ credential: 'whooooo are youuuuuuu ?' });
		}
	});
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log('Test........', req.user);
	res.send({ Authorized: true });
});

module.exports = router;
