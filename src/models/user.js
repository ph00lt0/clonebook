const mongoose = require("mongoose")
const schema = mongoose.Schema;


let postSchema = schema({
    title: {type: String, required: true},
    body: {type: String, required: true}
})

let friendSchema = schema({
    userId: {type: schema.Types.ObjectId, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    status: {type: Boolean, required: true},
    avatar: {type: String, required: true},
    posts: [postSchema]
})

let userSchema = schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    }
    password:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: false,
        default: false
    },
    avatar:{
        type: String,
        required: true
    },
    posts: [postSchema],
    friends:[friendSchema],
});

module.exports=mongoose.model("User", UserSchema);
