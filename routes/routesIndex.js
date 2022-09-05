const express = require('express');
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');
const router = express.Router();

const allRoutes = express.Router();

allRoutes.use('/notes', htmlRoutes);
allRoutes.use('/api/notes', apiRoutes);



module.exports = allRoutes;