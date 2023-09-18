import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        min:10,
        max:10
    },
    email:{
        type:String,
        required:true
    },
    pin: {
        type: String,
        required: true,
        min: 6,
        max: 6
    },
    certificates: {
        type:Array,
        default:[],
    },
},
{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;