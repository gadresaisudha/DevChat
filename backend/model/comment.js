import mongoose from "mongoose";

const commentSchema =   mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
    comment:{
        type: String,
        required: true,
    },
    likes:{
        type: Number,
        required: true,
        default: 0,
    },
    dislikes:{
        type: Number,
        required: true,
        default: 0,
    },
},
{timestamps: true});

const Comment =  mongoose.model("Comment",commentSchema);
export default Comment;