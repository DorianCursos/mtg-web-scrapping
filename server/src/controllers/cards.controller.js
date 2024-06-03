const getCardsImages = require('../api/getCardsImages');

const controller = {};

controller.getCardsInfo = (req, res) => {
  getCardsImages(req.body);

  res.json('ok');
};

module.exports = controller;
