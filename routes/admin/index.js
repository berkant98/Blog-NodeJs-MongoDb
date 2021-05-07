const express = require('express');
const Category = require('../../models/Category');
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

module.exports = router