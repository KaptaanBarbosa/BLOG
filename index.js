const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/keys').localdb;
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const passport = require('passport');

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb connect
mongoose
	.connect(db)
	.then(() => console.log('connected with mongo.......'))
	.catch((err) => console.log('exception occured while getting connected.....', err));

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use(express.static('./public'));

const PORT = process.env.PORT || 7090;
app.listen(PORT, () => console.log('listening ......on', PORT));
