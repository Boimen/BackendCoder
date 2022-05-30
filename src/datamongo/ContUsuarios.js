const mongoose  = require('mongoose')
const User = require ('../schemas/schemausuarios')
const logger = require ('../helpers/logger')
require('dotenv').config();

conexion()

async function conexion (){
    try{
        const URL = process.env.MONGO_SERVER
        let respuesta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
    }catch(err){
        logger.error('Error de conexion DB Usuarios' +err)
    }
}

class ContenedorUser {

    async crearUsuario(objeto){
        try{
            const usuarionuevo = new User(objeto)
            let guardado = await usuarionuevo.save()
            return usuarionuevo
            }catch(err){
                console.log(err)
            }
    }

    async buscarUsuario(email){
        try{
            let buscar = await User.find({email:email})
            let mapeo = buscar.map (doc => ({
                _id:doc._id,
                nombre:doc.nombre,
                email:doc.email,
                contraseña:doc.contraseña,
        }))
            if(buscar.length !=0){
                return mapeo
            }console.log('Usuario no encontrado')
            return null
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = ContenedorUser