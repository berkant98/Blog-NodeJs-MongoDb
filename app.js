const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate;
const limit = require('./helpers/limit').limit;
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    // useFindAndModify: false,
});

app.use(expressSession({
    secret: "testbeko",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/nodeblog_db' })
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
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

app.listen(port, hostname, () => {
    console.log(`Server çalışıyor!! http://${hostname}:${port}/`);
})