var db = require('../config/connection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then(data => resolve(data.insertedId))
            console.log(userData)

        })

    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
        let loginstatus = false;
        let response = {}

        let user = await db.get().collection(collections.USER_COLLECTION).findOne({username:userData.username})
        if(user){
             bcrypt.compare(userData.Password,user.Password).then((status)=>{
                if(status){
                                    console.log('login sucess')
                                    response.user=user
                                    response.status=true
                                    resolve(response)


                }else{
                    console.log('Invalid PAssword')
                    resolve({status:false})

                }
             })
        }else{
            console.log('user not found')
            resolve({status:false})
        }

    })
    },

    addToCart:(proId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collections.CART_COLLECTION).findOne({user:objectId(userId)})
            if(userCart){
                db.get().collection(collections.CART_COLLECTION)
                .updateOne({user:objectId(userId)},
                {
                    $push:{products:objectId(proId)}
                }
                ).then((response)=>{
                    resolve()
                })
            }else{
                let cartObj={
                    user:objectId(userId),
                    products:[objectId(proId)]
                }
                db.get().collection(collections.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems = await db.get().collection(collections.CART_COLLECTION).aggregate([
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $lookup:{
                        from: collections.PRODUCT_COLLECTION,
                        let:{prodList:'$products'},
                        pipeline:[
                            {$match:{
                                $expr:{
                                    $in:['$_id',"$$prodList"]

                            }}}],as:'cartItems'
                    }
                }
                
            ]).toArray()
            resolve(cartItems[0].cartItems)
        })
    }
}