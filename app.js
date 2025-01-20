const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const PORT = 3005;

const middlewares = require('./middlewares/authMiddleware')
const routes = require('./routes/routes')
const config = require('./crypto/config')

// - Middleware para manejar datos de formulario y JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


middlewares.verifyToken(app)
routes.rutas(app)
config.secret(app)

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
  