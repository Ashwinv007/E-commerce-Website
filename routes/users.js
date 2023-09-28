var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers.js');
const userHelpers = require('../helpers/user-helpers.js')
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  console.log(user);
  
  productHelpers.getAllProducts().then((product)=>{
    res.render('user/view-products', {admin:false , product,user})


   })});
   router.get('/login', (req,res)=>{
    if(req.session.loggedIn){
      res.redirect('/')
    }else{
      res.setHeader('Cache-Control', 'no-store, must-revalidate');


      res.render('user/login', {'loginErr':req.session.loginErr})
      req.session.loginErr=false


    }
   })

   router.get('/signup', (req,res)=>{
    res.render('user/signup')
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
   })

   router.post('/signup', (req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
      console.log(response)
    })
  })


   router.post('/login', (req,res)=>{
    userHelpers.doLogin(req.body).then((response)=>{
      if(response.status){
        req.session.loggedIn = true
        req.session.user = response.user
        res.redirect('/')
      }else{
        req.session.loginErr = "Invalid username or Password"
        res.redirect('/login')
      }
       console.log(response)
    })
    
   })

   router.get('/logout', (req,res)=>{
    req.session.destroy()
      res.redirect('/')
   })

   router.get('/cart', verifyLogin, (req,res)=>{
    res.render('user/cart')
   })
    
   


module.exports = router;
