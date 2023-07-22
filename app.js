const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv').config();

//dotenv.config();

//const jsonwebtoken = require('jsonwebtoken');
//const cookieParser = require('cookie-parser');

// The SecretKey 
//const JWT_SECRET = 'goK!123Aszx';

// express app
const app = express();


//app.use(cookieParser);
// This helps the application to accept json datatype
app.use(express.json());

// connect to mongoDb database
const dbURI = 'mongodb+srv://sa:localdb23@node-cluster.i6lttna.mongodb.net/node-tut?retryWrites=true&w=majority';

// mongoose.connect(dbURI);
// const connection = mongoose.connection;
// connection.once('open', function(){
//     console.log('MongoDB database connection established successfully');
// })


mongoose.connect(process.env.MONGO)
        .then((res) => app.listen(4000))
        .catch((err) => console.log(err));

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!!!');
})

const PORT = 4000;

// app.listen(PORT, () => {
//     console.log('Listening to ', PORT);
// })


app.use('/api/demo', (req, res) => {
    console.log('Demo API')
    res.status(200).json({message: 'Called Demo API'})
});

app.get('/api/auth/dummy', (req, res) => {
    console.log('Hey!!!')
    res.status(200).json({message: 'Called Dummy API'})
}
);

app.use('/api/auth', authRoutes);




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
//app.use('/api/auth', authRoutes);



// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});