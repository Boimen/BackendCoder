const mongoose = require ('mongoose')
const Product = require ('./schemaproducto')
const User = require('./schemausuarios')


const carritoSchema = new mongoose.Schema({
    id:{type:Number, require:true, trim:true},
    date: {type:Date, default: Date.now},
    productos: [[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        }
    ]],
      usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

const Carrito = mongoose.model('carritos', carritoSchema)

module.exports = Carrito