var db = require('../config/connection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then(data => resolve(data.insertedId))
            console.log(userData)

        })

    },
    doLogin:(userData)=>{
        let loginstatus = false;
        let response = {}

        let user = await db.get().collection()(collections.USER_COLLECTION).findOne
    }
}