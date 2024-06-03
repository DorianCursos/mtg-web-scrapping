const fetchMagicCardImage = require('./fetchCardImage');

const getCardsImages = async info => {
  console.log(info);
  const deckName = info.deckName;
  const cards = info.cards;

  for (const card of cards) {
    fetchMagicCardImage(card.name, deckName);
  }
};

module.exports = getCardsImages;
