const mongoose = require("mongoose");

const DBConnect=async()=>{
    try {
       const connection= await mongoose.connect(process.env.MONGO_URI)
       console.log("Connected DB")
    } catch (error) {
        console.log("ERROR DB",error.message)
    }

}

module.exports=DBConnect
 