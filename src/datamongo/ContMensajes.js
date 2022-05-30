const mongoose  = require('mongoose')
const MensajeSchema = require ('../schemas/schemamensajes')
const logger = require ('../helpers/logger')
require('dotenv').config();

conexion()

async function conexion (){
    try{
        const URL = process.env.MONGO_SERVER
        let respuesta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
    }catch(err){
        logger.error('Error de conexion DB Mensajes' +err)
    }
}


class Chat {
    constructor() {}
    
    async getMessages() {
      try {
        const messages = await MensajeSchema.find();
        if (!messages) {
          throw new Error("No hay mensajes");
        }
        return messages;
      } catch (error) {
        logger.warn(error);
      }
    }
    
    async saveMessages(obj) {
      try {
        const chatSaveModel = new MensajeSchema(obj);
        const savedMessage = await MensajeSchema.insertMany(chatSaveModel).then((message) => message).catch((err) => {
          throw new Error(err);
        });
        return savedMessage;
      } catch (error) {
        logger.warn(error);
      }
    }
}

module.exports = Chat;