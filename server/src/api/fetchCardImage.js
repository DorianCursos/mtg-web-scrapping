const axios = require('axios');
const fs = require('fs');
const path = require('path');

const fetchMagicCardImage = async (cardName, deckName) => {
  const errorsLog = path.join(__dirname, '..', 'decks', deckName, 'errors.txt'); // Corrección de la ruta
  try {
    // Fetch the card data from Scryfall in Spanish
    const response = await axios.get('https://api.scryfall.com/cards/search', {
      params: {
        q: `${cardName} lang:es`
      }
    });

    // Debugging: log the full response
    console.log('Full response:', response.data);

    // Check if the card data contains results
    if (response.data.data && response.data.data.length > 0) {
      const cardData = response.data.data[0]; // Get the first result
      if (cardData.lang === 'es' && cardData.image_uris && cardData.image_uris.normal) {
        const imageUrl = cardData.image_uris.normal;
        console.log(`Image URL: ${imageUrl}`);

        // Define the directory path
        const dirPath = path.join(__dirname, '..', 'decks', deckName); // Corrección de la ruta
        // Create the directory if it does not exist
        fs.mkdirSync(dirPath, { recursive: true });

        // Define the image path
        const imagePath = path.join(dirPath, `${cardName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`);
        // Download the image
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(imagePath, imageResponse.data);
        console.log(`Image downloaded to: ${imagePath}`);
      } else {
        console.log('No Spanish image found for the specified card.');
        fs.appendFileSync(errorsLog, `${cardName}\n`);
      }
    } else {
      console.log('No results found for the specified card.');
      fs.appendFileSync(errorsLog, `${cardName}\n`);
    }
  } catch (error) {
    console.error(`Error fetching card: ${error.message}`);
    fs.appendFileSync(errorsLog, `${cardName}\n`);
  }
};

module.exports = fetchMagicCardImage;
