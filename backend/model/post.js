import mongoose from "mongoose";

const postSchema =   mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    question:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
},
{timestamps: true});

const Post =  mongoose.model("Post",postSchema);
export default Post;