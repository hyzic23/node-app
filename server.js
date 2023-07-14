const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    
    // lodash
    // This generated Random Number
    const num = _.random(0, 20);
    console.log('Random number generated is ', num);

    // Prints greet once
    const greet = _.once(() => {
        console.log('Hello World');
    });

    greet();

    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
            case '/about':
                path += 'about.html';
                res.statusCode = 200;
                break;
            case '/about-me':
                res.setHeader('Location', '/about');
                res.statusCode = 301;
                res.end();
                break;
            default:
                path += '404.html';
                res.statusCode = 404;
                break;
    }

    //send an html file
    //fs.readFile('./views/index.html', (err, data) => {
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.write(data);
            //res.end(data);
            res.end();
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});