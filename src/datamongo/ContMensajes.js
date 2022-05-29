const mongoose  = require('mongoose')
const MensajeSchema = require ('../schemas/schemamensajes')

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