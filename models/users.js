const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email       : { type: String, required: true, unique: true },
    username    : { type: String, required: true, unique: true },
    password    : { type: String, required: true  },
    firstName   : { type: String, required: false },
    lastName    : { type: String, required: false },
    fb_username : { type: String, required: false },
    fb_verify   : { type: Boolean, required: false },
    timestamp   : { type: Number, required: true, default: Date.now() },
})

userSchema.index({ username: 1 })

module.exports = mongoose.model("users", userSchema);