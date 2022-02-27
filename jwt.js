const jwt = require ("jsonwebtoken")

const PRIVATE_KEY = "boimen"

function generateAuthToken(nombre) {
    const token = jwt.sign({nombre:nombre} , PRIVATE_KEY, {expiresIn: '10m'})
    return token;
}

function auth (req,res,next) {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"]

    if(!authHeader) {
        return res.status(401).json({
            error: 'auth invalida para este sitio',
            detalle: 'token sin auth'
        })
    }


const token = authHeader.split(' ')[1]

if(!token){
    return res.status(401).json({
        error: 'auth invalida para este sitio',
        detalle: 'formato de token invalido'
    })
}

try{
    req.user = jwt.verify(token, PRIVATE_KEY);
}catch(err){
    return res.status(403).json({
        error: 'token invalido',
        detalle: 'credenciales invalidas para el sitio'
    })
}

next()
}

module.exports = {
    generateAuthToken,
    auth
}
