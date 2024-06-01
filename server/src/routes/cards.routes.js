const express = require('express');
const cardsRouter = express.Router();
const controller = require('../controllers/cards.controller');

cardsRouter.post('/', controller.getCardsInfo);

module.exports = cardsRouter;
