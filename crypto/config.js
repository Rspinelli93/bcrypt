const crypto = require('crypto')
const bcrypt = require('bcrypt')


// generar el secreto, la clave es secreta
const secret = crypto.randomBytes(64).toString('hex');

// encriptamos la contraseña, hashear la contraseña (el Syinc hace la funcion asincrona, sin el Syinc es una funcion normal)
const hashedSecret = bcrypt.hashSync(secret, 10);


module.exports =  hashedSecret 