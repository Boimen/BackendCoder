import mongoose from 'mongoose'
import * as model from './public/ContenedorProducto.js'
import ContenedorProductoMongo from './ContenedorProductosMongo.js'



CRUD()

async function CRUD(){
    try{
        const URL = 'mongodb://localhost:27017/ecommerce'
        let rta = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conectado')
    }catch(error){
       console.log(error)
    }
}

const nuevoContMongoProd = new ContenedorProductoMongo ()

/*const productos = [{title:'Libro1',price:'1400',thumbnail:'https://cdn1.iconfinder.com/dataiconsaddress-book-providers-in-colors512/macoscontacts-1024.png',stock:100},
                {title:'Libro2',price:'1500',thumbnail: 'https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',stock:100},
                {title:'Libro3',price:'1600',thumbnail: 'https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',stock:100}]
*/

//const productosavemodelo = productos.map(producto => new model.modeloProducto(estudiante))
//nuevoContMongoProd.insertarmuchos(productos)
/*
try{
    const mostrar = await nuevoContMongoProd.mostrarLista()
}catch(error){
    console.log(error)
}

try{
    const borrado = await nuevoContMongoProd.borrar("Libro3")
    console.log(borrado)
}catch(error){
    console.log(error)
}
*/
try{
    await nuevoContMongoProd.modificarporNombre("Libro2",6500,"Imagen",35)
}catch(e){
    console.log(e)
}