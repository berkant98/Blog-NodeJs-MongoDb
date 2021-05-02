// const mongoose = require('mongoose');
// const Post = require('./models/Post');

// mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: false,
//     // useCreateIndex: true
// })

// function List(where) {
//     Post.find({}, (error, post) => {
//         console.log(error, post);
//     })
// }

// // Post.findByIdAndUpdate('605f777766a7163e184e9936', {
// //     title: 'My first post title (updated)'
// // }, (err, post) => {
// //     console.log(err,post);
// // })

// List({});

// Post.findByIdAndDelete('605f777766a7163e184e9936', (err, post) => {
//     console.log(err, post);
// });

// List({});

// // Post.findById('605f777766a7163e184e9936', (err, post) => { 
// //     console.log(err, post);
// // })

// // Post.update()


// // Post.create({
// //     title: 'ikinci postum',
// //     content: "Hello nodeJs and MongoDB denemeler"
// // }, (error, post) => {
// //     console.log(error, post);
// // })