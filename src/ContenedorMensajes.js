
class ContenedorMensajes {
    constructor(query){
    this.query = query
    }

    /*async getLastFromList() {
        try{
        this.query.limitToLast(1)
            .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                return(childSnapshot.val());     
            })
            })
    }catch(err){
        console.log(err)
    }*/


    async agregarNuevo (mensaje){
        let doc = this.query.doc()
        doc.create(mensaje)

        return console.log('Insertado')
    }
    
    async traerautores(){
        try{
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
    
    
            const respuesta = docs.map(doc=>({
                author:doc.data().author,
            }))
                return respuesta
            }catch(error){
                throw error
            }}
        
    

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
        }catch(error){
            throw error
        }}
    }

module.exports = ContenedorMensajes