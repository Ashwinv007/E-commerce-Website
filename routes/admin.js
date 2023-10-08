var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers.js');
const verifyLogin=(req,res,next)=>{
  if(req.session.adminLoggedIn){
    next()
  }else{
    res.redirect('/admin/login')
  }
}

/* GET users listing. */

router.get('/', verifyLogin,function(req, res, next) {
   productHelpers.getAllProducts().then((product)=>{
    res.render('admin/view-products', {admin:true , product})


   })
});
router.get('/login', (req,res)=>{
  if(req.session.admin){
    res.redirect('/')
  }else{
    res.setHeader('Cache-Control', 'no-store, must-revalidate');


    res.render('admin/login', {'loginErr':req.session.adminLoginErr})
    req.session.adminLoginErr=false


  }
 })

 router.post('/login', (req,res)=>{
  productHelpers.doLogin(req.body).then((response)=>{
    if(response.adminStatus){
      req.session.admin = response.admin
      req.session.adminLoggedIn = true
      res.redirect('/admin')
    }else{
      req.session.adminLoginErr = "Invalid username or Password"
      res.redirect('/admin/login')
    }
     console.log(response)
  })
  
 })


router.get('/add-product', verifyLogin,function(req,res){
    res.render('admin/add-product', {admin:true})
})

router.post('/add-product', verifyLogin,(req,res)=>{
  console.log(req.body)
  console.log(req.files.productImage)
  
  productHelpers.addProduct(req.body, (id)=>{
    let image = req.files.productImage
    image.mv('./public/product-images/'+id+'.jpg', (err,done)=>{
      if(!err){
            res.redirect('/admin')


      }else{
        console.log('Error occured while Image storing '+ err)
      }

    })
  } )
})

router.get('/delete-product/:id',verifyLogin, function(req,res){
  let proId = req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then(()=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id', verifyLogin,async (req,res)=>{
  let product =await productHelpers.getProductDetails(req.params.id)
  console.log(product)
  res.render('admin/edit-product',{product})

})

router.post('/edit-product/:id',verifyLogin,(req,res)=>{
  let id = req.params.id

  productHelpers.updateProduct(id,req.body).then(()=>{
  res.redirect('/admin')

  let image = req.files.productImage
  image.mv('./public/product-images/'+id+'.jpg', (err,done)=>{
    if(!err){
          res.render('admin/add-product')


    }else{
      console.log('Error occured while Image storing '+ err)
    }

  })
  // if(req.files.productImage){
  //   let image = req.files.productImage
  //   image.mv('./public/product-images/'+id+'.jpg')
  // }
})
})
module.exports = router;
