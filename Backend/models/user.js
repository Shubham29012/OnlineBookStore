const mongoose=require("mongoose");
const user=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
    },
    role:{
        type:String,
        deafult:"user",
        enum:["user","admin"],
    },
    favourites:[
        {
            type:mongoose.Types.ObjectId,
            ref:"books",
        },
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"books",
        },
    ],
    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"order",
        },
    ],

},
{timestamps:true}
);
module.exports=mongoose.model("user",user);