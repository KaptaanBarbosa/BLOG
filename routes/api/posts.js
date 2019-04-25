const express = require('express');
const posts = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')
const postSchema = require('../../models/Posts')
const profileSchema = require('../../models/Profile');
const validPostInput = require('../../validations/posts');
posts.get('/test',(req,res)=> res.json({msg:'Posts Works'})); 


posts.post('/post', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validPostInput(req.body);
    console.log("Request body",req.body);

	//check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
    //profileSchema.findOne({avatar})

	const postFields = {};
	postFields.user = req.user.id;
	if (req.body.name) postFields.name = req.body.name;
	if (req.body.text) postFields.text = req.body.text;
	if (req.body.avatar) postFields.avatar = req.body.avatar;

    const newPost = new postSchema({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    })

    console.log("comments.......",newPost);

    newPost.save().then(profile=>res.json(profile)).catch(err=> res.status(400).json(err))


});

module.exports = posts;