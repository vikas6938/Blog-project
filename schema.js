const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    email : {
        type: String,
    },
    password: String
})

const postSchema = mongoose.Schema({
    post : {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

const userModel = mongoose.model('users', userSchema)
const postModel = mongoose.model('posts', postSchema)

module.exports = {userModel, postModel}