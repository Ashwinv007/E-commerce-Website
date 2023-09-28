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
    }
}