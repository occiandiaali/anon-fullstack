const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Array
    }
})

module.exports = mongoose.model("Post", PostSchema);