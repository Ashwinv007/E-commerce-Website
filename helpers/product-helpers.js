var db = require('../config/connection')
const collections = require('../config/collections')
var objectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

module.exports={

  addProduct:(product,callback)=>{
    console.log(product)

    db.get().collection('product').insertOne(product).then((data)=>{
      callback(data.insertedId)
      console.log(data.insertedId)

    })

  },

  doLogin:(adminData)=>{
    return new Promise(async(resolve,reject)=>{
    let loginstatus = false;
    let response = {}

    let admin = await db.get().collection(collections.ADMIN_COLLECTION).findOne({username:adminData.username})
    if(admin){
         bcrypt.compare(adminData.Password,admin.password).then((adminStatus)=>{
            if(adminStatus){
                                console.log('login sucess')
                                response.admin=admin
                                response.adminStatus=true
                                resolve(response)


            }else{
                console.log('Invalid PAssword')
                resolve({adminStatus:false})

            }
         })
    }else{
        console.log('Admin not found')
        resolve({adminStatus:false})
    }

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

  getProductDetails:(proId)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
        resolve(product)
      })
    })
  },

  updateProduct:(proId, proDetails)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
        $set:{
          productName:proDetails.productName,
          productDescription: proDetails.productDescription,
          productPrice: proDetails.productPrice,
          Category: proDetails.Category,
        
        }
      }).then((response)=>{
        resolve()
      })
    })
    
  }



}