const mongoose=require('mongoose');

const imgSchema=new mongoose.Schema({
    url:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

module.exports=mongoose.model('img',imgSchema);