var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers.js');
const userHelpers = require('../helpers/user-helpers.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  productHelpers.getAllProducts().then((product)=>{
    res.render('user/view-products', {admin:false , product})


   })});
   router.get('/login', (req,res)=>{
    res.render('user/login')
   })

   router.get('/signup', (req,res)=>{
    res.render('user/signup')
   })

   router.post('/signup', (req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
      console.log(response)
    })
    
   })



module.exports = router;
