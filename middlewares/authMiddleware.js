const jwt = require('jsonwebtoken');
const { hashedSecret } = require('./crypto/config');

// - Middleware que verifica la validez del token almacenado en la sesión.

function verifyToken(req, res, next) {

    const token = req.session.token; //se mete el token guardado dentro del usuario

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, hashedSecret, (err, decoded) => { //y aca lo verificamos
      if (err) {
        return res
          .status(401)
          .json({ message: 'Token inválido', error: err.message });
      }
      
      // Attach user information from the token to the request object
      req.user = decoded.user;
      next();
  });
}



module.exports = { verifyToken }