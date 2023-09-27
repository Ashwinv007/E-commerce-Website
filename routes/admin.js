var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers.js');
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
  
  productHelper.addProduct(req.body, (id)=>{
    let image = req.files.productImage
    image.mv('./public/product-images/'+id+'.jpg', (err,done)=>{
      if(!err){
            res.render('admin/add-product')


      }else{
        console.log('Error occured while Image storing '+ err)
      }

    })
  } )
})



module.exports = router;
