const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ["superadmin", "admin"],
        default: "admin"
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;