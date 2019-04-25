const JwtStrategy = require('passport-jwt').Strategy;
const ExtractStrategy = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const opts = {};

opts.jwtFromRequest = ExtractStrategy.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = (passport) => {
	console.log('passport data....');
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			console.log('JWT DONE ......', typeof jwt_payload.id);
			User.findById(jwt_payload.id, (err, user) => {
				if (user) {
					console.log('yes user is found...', user);
					return done(null, user);
				}
				if (err) {
					console.log('ERROR is ', err);
					return done(err);
				}
				return done(null, false, {
					message: 'User not found'
				});
			});
		})
	);
};
