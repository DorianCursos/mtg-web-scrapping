const getCardsImages = require('../scrapping/scrapping');

const controller = {};

controller.getCardsInfo = (req, res) => {
  getCardsImages(req.body);
  res.end();
};

module.exports = controller;
