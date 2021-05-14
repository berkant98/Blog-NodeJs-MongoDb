const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/posts', (req, res) => {
    Post.find({}).lean().then(posts => {
        res.end(JSON.stringify(posts));
    })
})

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).lean().then(post => {
        res.end(JSON.stringify(post));
    })
})

module.exports = router