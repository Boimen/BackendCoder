const mongoose = require ('mongoose')


const usuarioSchema = new mongoose.Schema({
    id: {type:Number, require:true, trim:true},
    nombre: {type:String, require:true, trim:true},
    email: {type:String, require:true, trim:true},
    contraseña: {type:String , require:true, trim:true},
})

const User = mongoose.model('usuarios', usuarioSchema)

module.exports = User