const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
var { nanoid } = require('nanoid');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



// should read the db.json file and return all saved notes as JSON
router.get('/', function(req, res, next) {
    res.send(fs.readFileSync('./db/db.json'));
})

// should receive a new note to save on the request body, add it to the db.json file
// and then return the new note to the client.
// give each note a unique id when its saved using an NPM package
router.post('/', function(req, res, next) {
    var newData = {
            title: req.body.title,
            text: req.body.text,
            id: nanoid()
        }
        // read the JSON file and parse it from JSON string into a javascript object
    const file = fs.readFileSync('./db/db.json');
    const json = JSON.parse(file);
    // if the file is empty, stringifty the newData object and write it to the file
    if (file.length == 0) {
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    } else {
        // if there is already data in the file, push newData to the json object created on line 28 
        //and then write the updated json object to the file
        json.push(newData);
        fs.writeFileSync('./db/db.json', JSON.stringify(json));
    }
    // reload the page by doing a redirect to the originalURL during the request
    res.redirect(req.originalUrl);
})

router.delete('/:id', function(req, res) {
    // read the JSON file and parse it from JSON string into a javascript object
    file = fs.readFileSync('./db/db.json');
    data = JSON.parse(file);
    var loc;
    for (loc = 0; loc < data.length; loc++) {
        // loop through the data object and look for the object with the requested id
        if (data[loc].id == req.params.id) {
            // if the ids match, delete that object from the data array
            data.splice(loc, 1);
            // write the updated data array to the file
            fs.writeFileSync('./db/db.json', JSON.stringify(data));
            // reload the page
            res.redirect('/');
        }
    }
});


module.exports = router;