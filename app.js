const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3050;

const { verifyToken } = require('./middlewares/authMiddleware')
const router = require('./routes/routes')
const { hashedSecret } = require('./crypto/config');

// - Middleware para manejar datos de formulario y JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
// - Aqui guardamos la sesion del usuario (va en donde montes el servidor (necesitas express))
app.use(
    session({
    secret: hashedSecret, // Clave secreta para firmar el token (debería ser segura, preferiblemente generada con crypto)
    resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio
    saveUninitialized: true, // Se guarda la inicialización de la sesión
    cookie: { secure: false }, // Cambia a 'true' si estás utilizando HTTPS
    })
);


// Apply middleware
app.use(verifyToken);

// Mount routes
app.use('/', router);
app.use('/login', router);
app.use('/dashboard', router);
app.use('/logout', router);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});




