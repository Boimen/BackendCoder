const mongoose  = require('mongoose')
const Carrito = require ('../schemas/schemacarrito')

conexion()

async function conexion (){
    try{
        const URL = 'mongodb+srv://Boimen11:diehose11@cluster0.lao3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        let respuesta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
    }catch(err){

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