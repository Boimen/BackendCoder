const mongoose = require ('mongoose')


const prodSchema = new mongoose.Schema({
    id: {type:Number, require:true, trim:true},
    title: {type:String, require: true, trim: true},
    price: {type:Number, require: true, trim:true},
    stock: {type:Number , require: true, trim:true},
    thumbnail: {type: String, require:true, trim:true}

})

const Product = mongoose.model('productos', prodSchema)

module.exports = Product