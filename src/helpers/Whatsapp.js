const twilio = require ('twilio')

 const acountSid = 'AC5c1922794a2496c38738ac5effb1740d'
 const authToken = 'eadbc969d0ca433cf4ad35736539f56a'
 const client = twilio (acountSid,authToken)

async function enviarWsp (res,req) {
 try{
     const message = await client.messages.create({
         body: 'Gracias por registrarse',
         from: 'whatsapp:+14155238886',
         to: 'whatsapp:+541131610864'
     })
 }catch(err){
     console.log(err)
 }
}

module.exports = enviarWsp