var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
    let products = [
        {name: 'Boat Earbuds',
        category : 'Audio Accessaries',
        description : 'Best Budget Earbuds',
        price : '1200 /-',
        image: 'https://www.boat-lifestyle.com/cdn/shop/products/main_black_fa1c6ec3-93b7-443e-ae82-d5eeb34258f8_600x.png?v=1641206192'
    
      
      },
      {
        name: 'Boat Ring',
        category : 'Electronic Accessories',
        description : 'Futuristic Ring',
        price: '8999 /-',
        image: 'https://www.boat-lifestyle.com/cdn/shop/files/SmartRing-FI02_1500x.png?v=1692966075'
      }
      ]
res.render('admin/view-products', {admin:true , products})
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
