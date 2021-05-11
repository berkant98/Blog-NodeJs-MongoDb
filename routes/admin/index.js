const express = require('express');
const path = require('path');
const Category = require('../../models/Category');
const Post = require('../../models/Post');
const User = require('../../models/User');
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin/index');
})

router.get('/categories', (req, res) => {
    Category.find({}).sort({ $natural: -1 }).lean().then(categories => {
        res.render('admin/categories', { categories: categories });
    })
})

router.post('/categories', (req, res) => {
    Category.create(req.body, (err, category) => {
        if (err) {
            req.session.sessionFlash = {
                type: "alert alert-danger",
                message: "Kategori oluşturulamadı!"
            }
            console.log("Kategori oluşturulamadı!", err);
        } else {
            req.session.sessionFlash = {
                type: "alert alert-success",
                message: "Kategori başarılı bir şekilde oluşturuldu!"
            }
            console.log("Kategori başarılı bir şekilde oluşturuldu!");
        }
    });
    res.redirect('/admin/categories')
})

router.delete('/categories/:id', (req, res) => {
    Category.remove({ _id: req.params.id }).then((err) => {
        if (err) {
            console.log("hata", err);
        } else {
            console.log("Silme işlemi başarılı!");
        }
    })
    res.redirect('/admin/categories')
})

router.get('/posts', (req, res) => {
    Post.find({}).populate([{ path: 'author', model: User }, { path: 'category', model: Category }]).sort({ $natural: -1 }).lean().then(posts => {
        res.render('admin/posts', { posts: posts })
        // Category.find({}).sort({ $natural: -1 }).lean().then(categories => {
        // })
    })
})

router.delete('/posts/:id', (req, res) => {
    Post.remove({ _id: req.params.id }).then((err) => {
        if (err) {
            console.log("hata", err);
        } else {
            console.log("Silme işlemi başarılı!");
        }
    })
    res.redirect('/admin/posts')
})

router.get('/posts/edit/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }).populate([{ path: 'author', model: User }, { path: 'category', model: Category }]).sort({ $natural: -1 }).lean().then(post => {
        Category.find({}).lean().then(categories => {
            categories.forEach((item, i) => categories[i].status = String(item._id) == String(post.category ? post.category._id : ""));
            res.render('admin/editpost', { post: post, categories: categories })
        });
    })
})

router.put('/posts/:id', (req, res) => {
    const post_image = req.files != null ? req.files.post_image : null;

    Post.findOne({ _id: req.params.id }).then(post => {
        post.title = req.body.title;
        post.content = req.body.content;
        post.category = req.body.category;

        if (post_image != null && post.post_image != post_image.name) {
            post_image.mv(path.resolve(__dirname, '../../public/img/postimages', post_image.name))
            post.post_image = `/img/postimages/${post_image.name}`;
        }

        post.save().then(p => {
            res.redirect("/admin/posts");
        })
    })
})
module.exports = router