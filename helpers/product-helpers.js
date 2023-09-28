var db = require('../config/connection')
const collections = require('../config/collections')
var objectId = require('mongodb').ObjectId
module.exports={

  addProduct:(product,callback)=>{
    console.log(product)

    db.get().collection('product').insertOne(product).then((data)=>{
      callback(data.insertedId)
      console.log(data.insertedId)

    })

  },

  getAllProducts:()=>{
    return new Promise(async(resolve,reject)=>{
      let product = await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
      resolve(product)


})
  },

  deleteProduct:(proId)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collections.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
        console.log(response)
        resolve(response)
        
      })
    })
  },

  getProductDetails:()=>{
    
  }



}