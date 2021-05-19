const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate;
const limit = require('./helpers/limit').limit;
const expressSession = require('express-session');
const methodOverride = require('method-override');


const mongoose = require('./config/db.js');
mongoose.connect();

app.use(expressSession({
    secret: "testbeko",
    resave: false,
    saveUninitialized: true,
    store: mongoose.mongoStore
}))

//flash - message MiddleWare
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})

app.use(fileUpload())

app.use(express.static('public'))

app.use(methodOverride('_method'))

// handlebars helpers

const hbs = exphbs.create({
    helpers: {
        generateDate: generateDate,
        limit: limit
    }
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

//DISPLAY LINK Middleware

app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals = {
            displayLink: true
        };
    } else {
        res.locals = {
            displayLink: false
        };
    }
    next()
})

const main = require('./routes/main');
const api = require('./routes/api');
const posts = require('./routes/posts');
const users = require('./routes/users');
const admin = require('./routes/admin/index');

app.use('/', main)
app.use('/api', api)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)

app.listen(3000, '127.0.0.1', () => {
    console.log(`Server çalışıyor!! http://127.0.0.1/`);
})