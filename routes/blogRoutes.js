const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();


//Getting all blogs from database
router.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})   // sorting by descending order
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => console.log(err));
});


// Adding blogs to the database
router.post('/', (req, res) => {
 const blog = new Blog(req.body);

 blog.save()
 .then((result) => {
    res.redirect('/blogs');
 })
 .catch((err) => { console.log(err);});
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog'});
});


// Get Blog by Id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog: result, title: 'Blog Details'})
    })
    .catch((err) => { console.log(err);});
});

//Delete blog
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs'})
    })
    .catch((err) => { console.log(err);});
});

module.exports = router;