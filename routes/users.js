const express = require('express');
const User = require('../models/User');
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('site/register');
})

router.get('/login', (req, res) => {
    res.render('site/login');
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }, (error, user) => {
        if (user) {
            if (user.password == password) {
                //User SESSION
                req.session.userId = user._id;
                res.redirect("/")
            } else {
                res.redirect("/users/login")
            }
        } else {
            res.redirect("/users/register")
        }
    });
})

router.post('/register', (req, res) => {
    User.create(req.body, (error, user) => {
        req.session.sessionFlash = {
            type: "alert alert-success",
            message: "Kullanıcı başarıyla oluşturuldu."
        }
        console.log(error, user);
        res.redirect('/users/login')
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect("/users/login"))
})

module.exports = router