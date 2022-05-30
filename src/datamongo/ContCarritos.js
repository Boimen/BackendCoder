const mongoose  = require('mongoose')
const Carrito = require ('../schemas/schemacarrito')
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
        logger.error('Error de conexion DB Carritos' +err)
    }
}
class ContenedorCarritos {


    async crearCarrito (objeto){
      try{
        const nuevocarrito = new Carrito(objeto)
        await nuevocarrito.save()
        return nuevocarrito
      }catch(err){
          console.log(err)
      }
    }
}


module.exports = ContenedorCarritos