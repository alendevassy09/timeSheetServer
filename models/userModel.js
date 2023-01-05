
const mongoose=require('mongoose')
let schema=mongoose.Schema
const Model=schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    position:String
  },{
    
    timestamps:true
}
)

const userSignUp=mongoose.model("users",Model)
module.exports = userSignUp