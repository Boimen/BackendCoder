
class ContenedorMensajes {
    constructor(query){
    this.query = query
    }

    async getLastFromList() {

        this.query.limitToLast(1).once(this.query.doc.id)
            .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                return(childSnapshot.val());     
            })
            })
            .catch((error) => console.log(error))

    }


    async agregarNuevo (mensaje){
        
        let snapshot = await getLastFromList()
        let doc = this.query.doc(`${snapshot + 1}`)
        doc.create(mensaje)

        return console.log('Insertado')
    }   

    async mostrar(){
        try{
        const querySnapshot = await this.query.get()
        let docs = querySnapshot.docs


        const respuesta = docs.map(doc=>({
            id:doc.id,
            author:doc.data().author,
            fecha:doc.data().fecha,
            texto:doc.data().texto

        }))
            return respuesta
        }catch(err){
            console.log(err)
        }}
    }

module.exports = ContenedorMensajes