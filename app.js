const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3005;

const middlewares = require('./middlewares/authMiddleware')
const router = require('./routes/routes')
const config = require('./crypto/config')

// - Middleware para manejar datos de formulario y JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// - Aqui guardamos la sesion del usuario (va en donde montes el servidor (necesitas express))

app.use(
    session({
    secret: hashedSecret, // Clave secreta para firmar el token (debería ser segura, preferiblemente generada con crypto)
    resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio
    saveUninitialized: true, // Se guarda la inicialización de la sesión
    cookie: { secure: false }, // Cambia a 'true' si estás utilizando HTTPS
    })
);

// - Usando las funciones/rutas/middlewares que requerimos en las lineas 8-9-10

middlewares.verifyToken(app)
config.hashedSecret(app)

router.get('/', router)
router.use('/login', router)
router.get('/dashboard', router)
app.post('/logout', router)


app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});




