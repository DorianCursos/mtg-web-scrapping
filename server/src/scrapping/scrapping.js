const { chromium } = require('playwright');
const userAgentChrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36';

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const downloadImage = async (imageUrl, imageName) => {
  const formatImageName = imageName.toLowerCase().replaceAll(/\s/g, '-');
  const destinationPath = path.join(__dirname, formatImageName + '.jpg');
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    console.log(response);
    fs.writeFileSync(destinationPath, Buffer.from(response.data));
    console.log(`Imagen guardada en: ${destinationPath}`);
  } catch (error) {
    console.error('Error al descargar la imagen:', error);
  }
};

const getCardsImages = async cards => {
  console.log(cards);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ userAgent: userAgentChrome });
  const page = await context.newPage();

  for (const card of cards) {
    await page.goto('https://scryfall.com/');

    await page.fill('#q', card.name);
    await page.press('#q', 'Enter');

    // Esperar a que los resultados se carguen
    await page.waitForSelector('.print-langs', { state: 'visible' });

    // Acceder al segundo hijo del elemento con la clase print-langs
    const secondChildElement = await page.$('.print-langs > :nth-child(2)');

    if (secondChildElement) {
      // Obtener el valor del atributo data-card-front-image
      const cardFrontImageUrl = await secondChildElement.getAttribute('data-card-image-front');

      if (cardFrontImageUrl) {
        // Abrir la URL especificada por el atributo data-card-image-front en una nueva página
        const imagePage = await context.newPage();
        await imagePage.goto(cardFrontImageUrl);
        await downloadImage(cardFrontImageUrl, card.name);
      } else {
        console.error('El atributo data-card-image-front no se encontró.');
      }
    } else {
      console.error('El segundo hijo del elemento con la clase print-langs no se encontró.');
    }
  }
};

module.exports = getCardsImages;
