import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true,
        minLength: 6
    },
    userProfilePic: {
        type: String,
        default: ""
    }
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;