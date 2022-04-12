const {createTransport} = require ('nodemailer')



 const transporter = createTransport ({
    host:'smtp.ethereal.email',
    port:587,
    auth:{
        user: 'dejon.kessler41@ethereal.email',
        pass: 'yjJY64y157ebZvBzvV'
    }
})

async function enviarmail (nombre,correo,contraseña){

const mailOptions = {
    from: 'Servidor Node.js',
    to: 'dejon.kessler41@ethereal.email',
    subject: 'Confirmacion registro',
    text:`Nombre de usuario : ${nombre}, mail: ${correo}, contraseña: ${contraseña}`
}

try{
    const info = await transporter.sendMail(mailOptions)
    console.log (info)
}catch(err){
    console.log(err)
}
}

module.exports = enviarmail