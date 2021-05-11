const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: { type: String, require: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, require: true },
    date: { type: Date, default: Date.now },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    post_image: { type: String, require: true },
})

module.exports = mongoose.model('Post', PostSchema)