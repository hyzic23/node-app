const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongoDb database
const dbURI = 'mongodb+srv://sa:localdb23@node-cluster.i6lttna.mongodb.net/node-tut?retryWrites=true&w=majority';
mongoose.connect(dbURI)
        .then((res) => app.listen(3000))
        .catch((err) => console.log(err));
//mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});

// register view engine
app.set('view engine', 'ejs');

//Listen for request
//app.listen(3000);

// middleware and static file
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

//Save Blog
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog 2',
        snippet: 'About my new blog 2',
        body: 'More about my new blog 2'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err));
});

//Get All Blogs
app.get('/all-blogs', (req, res) => {
   Blog.find().then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err));
});

//Get Single Blogs
app.get('/single-blog', (req, res) => {
    Blog.findById('64b18b27468a0481c512163e')
    .then((result) => {
             res.send(result)
         })
         .catch((err) => console.log(err));
 });



app.get('/', (req, res) => {

    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
        { title: 'How to defeat browser', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    ];

    //res.sendFile('./views/index.html', { root: __dirname});
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', { title: 'About'});
});

// Redirects
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog'});
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});