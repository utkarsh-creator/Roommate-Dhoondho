import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {                 // username is email
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: false
        },
        lastname : {
            type: String,
            required: false
        },
        gender: String,
        mobile : {
            type: Number,
            required: false
        },
        isAdmin : {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        followers: [],
        following: [],
        likesRoom: []
    },
    {timestamps: true}
)

const UserModel= mongoose.model("Users", UserSchema);
export default UserModel