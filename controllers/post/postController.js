const Post = require("../../models/Post")
const isEmpty = require('../../helpers/isEmpty.js');


// @desc    Get all posts
// @route   GET api/posts
// @access  Public
const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find();

        if (isEmpty(posts)) {
            res.status(404).json({ error: true, message: 'Posts not found!' });
        } else {
            res.status(200).json({ error: false, data: posts })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, data: error })
    }
}

// @desc    Get post info with matched posts
// @route   GET api/posts/:id
// @access  Public
const getPostByPostId = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (isEmpty(post)) {
            res.status(404).json({ error: true, message: 'Post not found!' });
        } else {
            res.status(200).json({ error: false, data: post });
        }
    } catch (error) {
        res.status(500).json({ error: false, data: error });
    }
}

module.exports = { getAllPosts, getPostByPostId }