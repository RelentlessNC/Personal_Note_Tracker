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
    const file = fs.readFileSync('./db/db.json');
    const json = JSON.parse(file);
    if (file.length == 0) {
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    } else {
        json.push(newData);
        fs.writeFileSync('./db/db.json', JSON.stringify(json));
    }
    res.redirect(req.originalUrl);
})


module.exports = router;