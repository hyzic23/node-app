const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// express app
const app = express();

// This helps the application to accept json datatype
app.use(express.json());

// const swaggerOption = {
//     swaggerDefinitions: {
//         info: {
//             title: "NodeApp API",
//             description: "NodeApp API Information to Register, login and Generate Token",
//             contact: {
//                 name: "Isaac Onoks"
//             },
//             servers: ["http://localhost:4000"]
//         }
//     },
//     //api:["app.js"]
//     api:["./routes/authRoutes.js"]
// };

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
    },
  };

  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    //apis: ['./routes/*.js'],
    apis: ['app.js'],
  };

  const swaggerDocs = swaggerJsDoc(options);
//const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *         description: A successful response
 */

app.get('/customers', (req, res) => {
    res.status(200).json({message: 'Customers results'});
})


mongoose.connect(process.env.DB_CONNECTION)
        .then((res) => {
            console.log('MongoDB database connection established successfully');
            console.log(`Server up and running on Port ${process.env.PORT}`)
            app.listen(process.env.PORT)
        })
        .catch((err) => console.log(err));

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!!!');
})

//const PORT = 4000;
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