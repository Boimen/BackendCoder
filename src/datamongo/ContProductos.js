
const mongoose  = require('mongoose')
const Product = require ('../schemas/schemaproducto')
require('dotenv').config();

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
class ContenedorMongo {

async mostrarProductos () {
    let busqueda = await Product.find()
    const mapeo = busqueda.map(doc=>({
            id:doc._id,
            title:doc.title,
            price:doc.price,
            thumbnail:doc.thumbnail,
            stock:doc.stock
}))
    return mapeo
}

async agregarProducto (objeto) {
    try{
    const productonuevo = new Product(objeto)
    let guardado = await productonuevo.save()
    return productonuevo
    }catch(err){
        console.log(err)
    }
}
async borrarproducto(title){
    try{
            let borrado = await Product.deleteOne({title:title})
        
    }catch(err){
        console.log(err)
    }
    }
    
async buscarproducto(id){
    try{
        let encontrar = await Product.find({_id:id})
        return encontrar
    }catch(err){
        console.log(err)
    }
}

async buscarprodNombre(title){

    try{
        const querySnapshot = await Product.find({title:title})
        if(querySnapshot.empty){
            console.log('Producto inexistente')
            return;
        }else{
            let respuesta = querySnapshot.map(producto => ({
            _id:producto._id,
            title:producto.title,
            price:producto.price,
            thumbnail:producto.thumbnail
        }))
        return respuesta
    }}catch(err){
        console.log(err)
    }}

async modificarproducto(id,title,price,thumbnail,stock){
    try{
        let productoupdate = await Product.updateOne({_id:id},{
            $set:{title:title},
            $set:{price:price},
            $set:{thumbnail:thumbnail},
            $set:{stock:stock}})
        }catch(err){
            console.log(err)
        }
        return productoupdate;
    }
}



module.exports = ContenedorMongo