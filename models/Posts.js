const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const postSchema = {
     user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	 },
     text:{
         type:String,
         required:true
     },
     name:{
         type:String,
         required:true
     },
     avatar:{
         type:String
     },
     likes:[{
         user:{
            type: Schema.Types.ObjectId,
		    ref: 'users'
         }
     }],
     comments:[{
          user:{
            type: Schema.Types.ObjectId,
		    ref: 'users'
         },
         text:{
           type:String
         },
         date:{
             type:Date,
             default:Date.now()
         }
     }]
    }


const PostSchema = new Schema(postSchema)
module.exports = mongoose.model('posts', PostSchema);

