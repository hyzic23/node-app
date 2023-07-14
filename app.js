const express = require('express');

// express app
const app = express();

//Listen for request
app.listen(3000);

app.get('/', (req, res) => {
    res.send('<p>Home page</p>');
});