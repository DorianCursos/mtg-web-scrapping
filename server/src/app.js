const express = require('express');
const cors = require('cors');
const app = express();

const { corsOptions } = require('./config/cors.config');
const cardsRouter = require('./routes/cards.routes');
const fetchMagicCardImage = require('./api/fetchCardImage');

require('dotenv').config();

// Middlewares para cliente
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api/cards', cardsRouter);

const startServer = () => {
  app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
};

startServer();
