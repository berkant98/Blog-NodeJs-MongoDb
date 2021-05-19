const router = require('express').Router()

const { getAllPosts, getPostByPostId } = require('../controllers/post/postController');

router.route('/posts').get(getAllPosts)

router.route('/posts/:id').get(getPostByPostId)


module.exports = router