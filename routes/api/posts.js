const express = require('express');
const posts = express.Router();
const passport = require('passport')
const postSchema = require('../../models/Posts');
const profileSchema = require('../../models/Profile')

const validPostInput = require('../../validations/posts');
const isEmpty = require('../../validations/isempty')

posts.get('/test',(req,res)=> res.json({msg:'Posts Works'})); 


posts.post('/post', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validPostInput(req.body);

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

    newPost.save().then(post=> {
        console.log("POST \n",post,"is been posted");
        return res.json({"success":true,post:post})
        // postSchema.find().sort({date:-1}).then(sortedPost=>{
        //     return res.json(sortedPost);
        // })
    })
    .catch(err=> res.status(400).json(err))

});

posts.get('/getpost/:id', (req, res) => {
 const idvalue = !isEmpty(req.params.id) ? req.params.id :'';
   postSchema.findById(idvalue).then(sortedPost=>{
       if(sortedPost)
         return res.json(sortedPost)
        else 
           return res.status(404).json({"Failure":"No Post"}) 
    })

})

posts.delete('/removepost/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
 const idvalue = !isEmpty(req.params.id) ? req.params.id :'';

    // first getting profile via userid
    profileSchema.findOne({user:req.user.id}).then(profile=>{
    if(profile){
        postSchema.findById(idvalue).then(post=>{
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({"ALERT":"Unauthorized entry"});
            }
            
            post.remove().then(()=>res.json({"succcess":true}));

        }).catch(err=>res.status(401).json({"ALERT":"Unauthorized Entry"}))
    }

}).catch(err=>res.status(404).json({'no profile':"No profile found in this user id"}));

});

module.exports = posts;