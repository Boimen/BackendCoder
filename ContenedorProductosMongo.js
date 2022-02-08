import mongoose from 'mongoose'
import * as model from './public/ContenedorProducto.js'

class ContenedorProducto{
    constructor(){}



    async mostrarLista(){
        try{
            model.modeloProducto.find()
                .then(users => console.log(users))
                .catch(err => console.log(err))
        }
        catch(error){
            console.log(error)
        }
    }
    async insertarmuchos(array){
        model.modeloProducto.insertMany(array)
            .then(productos => console.log(productos))
            .catch(err => console.log(err))
    }
    async insertaruno(producto){
        model.modeloProducto.insertMany(producto)
            .then(producto => console.log(producto))
            .catch(err => console.log(err))
    }
    async borrar(nombre){
        model.modeloProducto.deleteOne({title: nombre})
            .then(producto => console.log(producto))
            .catch(err => console.log(err))
        }
    
    async modificarporNombre(nombre,price,thumbnail,stock){
        try{
        model.modeloProducto.updateOne({title: nombre}, {$set:{price:price,thumbnail:thumbnail,stock:stock}})
            .then(() => console.log('actualizado'))
            .catch(err => console.log(err))
 
        }catch(err){
            console.log(err)
        }
    }
}


    

export default ContenedorProducto