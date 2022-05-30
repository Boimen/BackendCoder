const logger = require ('../helpers/logger')
const jwt = require ('../helpers/jwt')
const {enviarmail} = require ('../helpers/Email')
const {encrypt,compare} = require ('../helpers/encriptacion')
const enviarWsp = require ('../helpers/Whatsapp')
const ContenedorUser = require ('../datamongo/ContUsuarios')

const nuevoContenedor = new ContenedorUser()


async function registro (req,res) {
    res.render('Registro');
}

async function guardarRegistro (req,res) {
    const {nombre,email,contraseña} = req.body
    const usuarioencontrado = await nuevoContenedor.buscarUsuario(email)
    console.log(usuarioencontrado)

    logger.info(`El correo a buscar es ${email}`)

        if (usuarioencontrado) {
        return res.status(400).json(`El correo: ${email} ya esta registrado`)
        }else{
    const user = req.body
    if(!user.contador){
        user.contador = 0;
    }
    const pass = await encrypt(contraseña)
    let nuevousuario = {
        nombre,
        email:email,
        contraseña:pass}
    nuevoContenedor.crearUsuario(nuevousuario)
    const access_token = jwt.generateAuthToken(nombre);
    try{
    await enviarmail(nombre,email,contraseña);
    //wait enviarWsp ();
    }catch(err){
        console.log('error de envio email')
    }
    res.redirect('/api/login')
    }}

async function getlogin (req,res) {
    res.render('Login')
}

async function login (req,res) {

    let {email,contraseña} = req.body
    let usuario = await nuevoContenedor.buscarUsuario(email)
    console.log(usuario)
    if(usuario == null){
        res.render('Login-error')
    }
    let credencialesok = null
    credencialesok = usuario.find(u => u.email == email && compare(contraseña, u.contraseña))
    if(!credencialesok){
            res.render('Login-error')
    }
    usuario.contador = 0;
    const access_token = jwt.generateAuthToken(email)
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