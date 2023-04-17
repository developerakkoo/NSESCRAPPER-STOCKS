const express = require('express');
const routes = express.Router();
const DataController =  require('../app.controller')

routes.post('/App/api/v1/scrapData',DataController.scrapData);
module.exports = {ScrapDataRoutes : routes}