const mongoose = require ('mongoose')

const chatSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  const MensajeSchema = mongoose.model('mensajes', chatSchema)
  
  module.exports = MensajeSchema