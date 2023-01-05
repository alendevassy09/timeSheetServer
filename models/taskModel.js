
const mongoose=require('mongoose')
let schema=mongoose.Schema
const Model=schema({
    tname: String,
    time: String,
    end:String,
    status:{
        type:Boolean,
        default:false
    },
    incomplete:{
        type:Boolean,
        default:false
    },
    users: [{
        type: schema.Types.ObjectId,
        ref: 'users',
    }],
    description: String
  },{
    
    timestamps:true
}
)

const task=mongoose.model("tasks",Model)
module.exports = task