const {createTransport} = require ('nodemailer')



 const transporter = createTransport ({
    host:'smtp.ethereal.email',
    port:587,
    auth:{
        user: 'fern.hills55@ethereal.email',
        pass: 'vdwXJm1jPHh3XDR6qh'
    }
})

async function enviarmail (nombre,correo,contraseña){

const mailOptions = {
    from: 'Servidor Node.js',
    to: 'fern.hills55@ethereal.email',
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

async function mailCarrito (nombre,fecha,carrito){

    const mailOptions = {
        from: 'Servidor Node.js',
        to: 'fern.hills55@ethereal.email',
        subject: 'Confirmacion carrito',
        text:`Nombre de usuario : ${nombre} , \n fecha: ${fecha},\n Productos: ${carrito}`
    }
    
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log (info)
        return
    }catch(err){
        console.log(err)
    }
}


module.exports = {mailCarrito,enviarmail}