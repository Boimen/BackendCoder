import mongoose from 'mongoose';

const collectionProductos = 'productos'

const ProductosSchema = new mongoose.Schema({
    title: {type:String, require: true, max:50},
    price: {type: Number, require:true},
    thumbnail: {type:String, require:true,max:200},
    stock: {type: Number,require:true},
})

export const modeloProducto = mongoose.model(collectionProductos,ProductosSchema)