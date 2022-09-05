const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('./routes/routesIndex');

// allow the server to choose the port or run it locally
const PORT = process.env.PORT || 3001;

const app = express();

/*
express.static is built-in middleware function in express.
The root argument specifies the root directory from which to serve static assets. 
The function determines the file to serve by combining req.url with the provided root directory. 
When a file is not found, instead of sending a 404 response, it calls next() to move on to the next middleware, 
allowing for stacking and fall-backs.
*/
app.use(express.static('public'));

/*
This is a built-in middleware function in Express. 
It parses incoming requests with urlencoded payloads and is based on body-parser.
*/
app.use(express.urlencoded({ extended: true }));

// use all my routes coming from my indexRoutes.js in my routes folder defined on line 4
app.use(routes);

// any route not defined in my indexRoutes.js will display my index.html page
app.get('*', function(req, res, next) {
    var options = {
        root: path.join(__dirname, 'public')
    }

    var fileName = 'index.html';
    res.sendFile(fileName, options, function(err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));