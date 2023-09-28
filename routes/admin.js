var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers.js');

/* GET users listing. */

router.get('/', function(req, res, next) {
   productHelpers.getAllProducts().then((product)=>{
    res.render('admin/view-products', {admin:true , product})


   })
});



router.get('/add-product', function(req,res){
    res.render('admin/add-product', {admin:true})
})

router.post('/add-product', (req,res)=>{
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

router.get('/delete-product/:id', function(req,res){
  let proId = req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then(()=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id', async (req,res)=>{
  let product =await productHelpers.getProductDetails(req.params.id)
  console.log(product)
  res.render('admin/edit-product',{product})

})

router.post('/edit-product/:id',(req,res)=>{
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
