const session = require('express-session');

// - Middleware que verifica la validez del token almacenado en la sesión.

function verifyToken(req, res, next) {
    const token = req.session.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, 'tu_secreto_secreto', (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'Token inválido', error: err.message });
      }
  
      req.user = decoded.user;
      next();
    });
}



module.exports = {
    verifyToken,
}