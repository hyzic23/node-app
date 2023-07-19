
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
//dotenv.config();

const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// The SecretKey 
const JWT_SECRET = 'goK!123Aszx';

// express app
const app = express();

// connect to mongoDb database
//const dbURI = 'mongodb+srv://sa:localdb23@node-cluster.i6lttna.mongodb.net/node-tut?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO)
        .then((res) => app.listen(3000))
        .catch((err) => console.log(err));

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!!!');
})

app.use(cookieParser);
// This helps the application to accept json datatype
app.use(express.json());

// register view engine
app.set('view engine', 'ejs');

// middleware and static file
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});