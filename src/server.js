require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes'); // Ruta al archivo de rutas

const app = express();
const port = process.env.API_PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar el router de routes.js
app.use(process.env.API_BASE_PATH, routes);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
