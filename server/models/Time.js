const mongoose = require('mongoose');
const validStatus=['Pending','Accepted'];

const Time=new mongoose.Schema({
       timing: String,
       name:String,
       status:{
        type:String,
        enum:validStatus,
       default: "Pending"
    }

});

const TimeModel=mongoose.model("time",Time);
module.exports=TimeModel;
