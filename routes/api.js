const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/posts', (req, res) => {
    Post.find({}).then(posts => {
        res.end(JSON.stringify(posts));
    })
})

router.get('/posts/limit/:length', (req, res) => {
    Post.find({}).limit(parseInt(req.params.length)).then(posts => {
        res.end(JSON.stringify(posts));
    })
})

router.get('/posts/limit/:limit/start/:start', (req, res) => {
    Post.find({}).limit(parseInt(req.params.limit)).skip(parseInt(req.params.start)).then(posts => {
        res.end(JSON.stringify(posts));
    })
})

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).lean().then(post => {
        res.end(JSON.stringify(post));
    })
})

module.exports = router