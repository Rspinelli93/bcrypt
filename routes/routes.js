const middlewares = require('./middlewares/authMiddleware')
const config = require('./crypto/config')
const users = require('./data/users')

function generateToken(user) {
    return jwt.sign({ user: user.id }, req.config.secret, { expiresIn: '1h' });
}

const rutas = (app) => {
    
    
    app.use(
        session({
        secret: req.config.secret, // Clave secreta para firmar el token (debería ser segura, preferiblemente generada con crypto)
        resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio
        saveUninitialized: true, // Se guarda la inicialización de la sesión
        cookie: { secure: false }, // Cambia a 'true' si estás utilizando HTTPS
        })
    );


    app.get('/', (req, res) => {
        const loginForm = `
      <form action="/login" method="post">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username" required><br>
      
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>
      
            <button type="submit">Iniciar sesión</button>
          </form>
          <a href="/dashboard">dashboard</a>
      
      `;
      
        res.send(loginForm);
    });

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
      
        if (user) {
          const token = generateToken(user);
          req.session.token = token;
          res.redirect('/dashboard');
        } else {
          res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    });


    app.get('/dashboard', middlewares.verifyToken, (req, res) => {
        const userId = req.user;
        const user = users.find((u) => u.id === userId);
        
        if (user) {
            res.send(
            ` <h1>Bienvenido, ${user.name}!</h1> <p>ID: ${user.id}</p> <p>Usuario: ${user.username}</p> <br> <form action="/logout" method="post"> <button type="submit">Cerrar sesión</button> </form> <a href="/">home</a> `
            );
        } else {
            res.status(401).json({ message: 'Usuario no encontrado' });
        }
    });
    
    app.post('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

}

module.exports = { rutas,
};