const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

//Listen for request
app.listen(3000);

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