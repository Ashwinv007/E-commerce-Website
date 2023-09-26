var express = require('express');
var router = express.Router();

/* GET home page. */
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
  res.render('index', { products });
});



module.exports = router;
