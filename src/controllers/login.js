const admin = require("firebase-admin");
const logger = require ('../helpers/logger')
const ContenedorUsuario = require ('../data/ContenedorUsuarios')
let serviceAccount = require("../../coderbackend-3c5d1-firebase-adminsdk-d2qrh-3781e00c29.json");
const {encrypt,compare} = require ('../helpers/encriptacion')
const jwt = require ('../helpers/jwt')
const compression = require ('compression')
const session = require('express-session')
const enviarmail = require ('../helpers/Email')
const enviarWsp = require ('../helpers/Whatsapp')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db4 = admin.firestore()
const query4 = db4.collection('usuarios')

const usuarios = new ContenedorUsuario(query4)

async function registro (req,res) {
    res.render('Registro');
}

async function guardarRegistro (req,res) {
    const {nombre,correo,contraseña} = req.body
    const usuarioencontrado = await usuarios.buscarporNombre(nombre)

    logger.info(`El nombre a buscar es ${nombre}`)

        if (usuarioencontrado.length != 0) {
        return res.status(400).json(`El usuario: ${nombre} ya existe`)
        }else{
    const user = req.body
    if(!user.contador){
        user.contador = 0;
    }
    const pass = await encrypt(contraseña)
    let nuevousuario = {
        nombre,
        correo:correo,
        contraseña:pass}
    usuarios.agregarUsuario(nuevousuario)
    const access_token = jwt.generateAuthToken(nombre);

    await enviarmail (nombre,correo,contraseña);
    await enviarWsp ();
    }
    res.redirect('/api/login')
}

async function getlogin (req,res) {
    res.render('Login')
}

async function login (req,res) {

    let {nombre,contraseña} = req.body
    let usuario = await usuarios.buscarporNombre(nombre)
    console.log(usuario)

    let credencialesok = null
    credencialesok = usuario.find(u => u.nombre == nombre && compare(contraseña, u.contraseña))
    if(!credencialesok){
            res.render('Login-error')
    }
    usuario.contador = 0;
    const access_token = jwt.generateAuthToken(nombre)
    req.session.user = usuario
    req.session.carrito = []
    res.redirect('/api')

}

async function mostrar (req,res) {
    res.send(usuarios.mostrar())
}

async function errorRegistro (req,res) {
    res.render('errorRegistro')
    logger.error('Registro invalido')
}

async function logout (req,res) {
    const nombre = req.session.nombre;
    req.session.destroy(err => {
        if(!err){ res.redirect('/api/Login')
    }else res.send({status:'Logout ERR', body: err})
})
    res.render('Logout', { nombre });
}

async function datos (req,res) {
    const usuario = usuarios.buscarporNombre(req.user.nombre)
        if(!usuario) {
            return res.status(404).json({error: 'usuario no encontrado'})
        }

        usuario.contador ++
        res.json({
            datos:usuario,
            contador:usuario.contador
        })
}



module.exports = {registro,guardarRegistro,getlogin,login,mostrar,errorRegistro,logout,datos,guardarRegistro}