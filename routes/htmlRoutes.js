const express = require('express');
const router = express.Router();
const path = require('path');
const { nextTick } = require('process');

// should return ../public/notes.html using sendFile
router.get('/', function(req, res, next) {
    var options = {
        root: path.join(__dirname, '../public')
    }

    var filename = 'notes.html';
    res.sendFile(filename, options, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent: ', filename);
        }
    })
})



module.exports = router;