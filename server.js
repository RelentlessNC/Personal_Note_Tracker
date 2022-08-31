const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => {
    res.send('Hello!');
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));