const express = require('express');
const router = express.Router()
const Post = require('../models/Post');
const Category = require('../models/Category');

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('site/index');
})

router.get('/index', (req, res) => {
    res.render('site/index');
})

router.get('/blog', (req, res) => {
    Post.find({}).sort({ $natural: -1 }).lean().then(posts => {
        Category.find({}).sort({ $natural: -1 }).lean().then(categories => {
            res.render('site/blog', { myPosts: posts, categories: categories })
        })
    })
})

router.get('/contact', (req, res) => {
    res.render('site/contact');
})

module.exports = router