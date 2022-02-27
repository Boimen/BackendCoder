let admin = require("firebase-admin");

class ContenedorUsuario {
    constructor(query){
    this.query = query
    }



    async agregarUsuario(objeto){

        let doc = this.query.doc()
        doc.create(objeto)
        return console.log('Insertado')
    }

    async mostrar(){
        const querySnapshot = await this.query.get()
        let docs = querySnapshot.docs;

        const respuesta = docs.map(doc=>({
            id:doc.id,
            nombre:doc.data().nombre,
            correo:doc.data().correo,
            contraseña:doc.data().contraseña,
            contador:doc.data().contador
        }))
        return (respuesta)
    }

    async buscarporNombre(nombre){

        const querySnapshot = await this.query.where('nombre','==',nombre).get()
        let doc = querySnapshot.docs

        const respuesta = doc.map(usuario => ({
            nombre:usuario.data().nombre,
            /*email:usuario.data().email,
            contraseña:usuario.data().contraseña*/
        }))
        console.log(respuesta.data().nombre)
   
    }

  

}

module.exports = ContenedorUsuario;