const mongoose = require ('mongoose')
const Product = require ('./schemaproducto')
const User = require('./schemausuarios')


const carritoSchema = new mongoose.Schema({
    id: {type:Number, require:true, trim:true},
    date: {type:Date, require:true, trim:true},
    carrito: [Product],
    usuario: [[User]]
})

const Carrito = mongoose.model('carritos', carritoSchema)

module.exports = Carrito