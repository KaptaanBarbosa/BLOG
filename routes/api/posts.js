const express = require('express');
const posts = express.Router();
posts.get('/test',(req,res)=> res.json({msg:'Posts Works'})); 

module.exports = posts;