let admin = require("firebase-admin");

class ContenedorProd {
    constructor(query){
    this.query = query
    }



    async agregarproducto(objeto){

        let doc = this.query.doc()
        doc.create(objeto)
        return console.log('Insertado')
    }

    async mostrar(){
        const querySnapshot = await this.query.get()
        let docs = querySnapshot.docs;

        const respuesta = docs.map(doc=>({
            id:doc.id,
            title:doc.data().title,
            price:doc.data().price,
            thumbnail:doc.data().thumbnail,
            stock:doc.data().stock

        }))
        return (respuesta)
    }
    async buscarporNombre(title){
        const querySnapshot = await this.query.where('title','==',title).get()
        let doc = querySnapshot.docs

        const respuesta = doc.map(producto => ({
            title:producto.data().title,
            price:producto.data().price
        }))
        console.log(respuesta)
    }
    async eliminarporNombre(title){
        const querySnapshot = await this.query.where('title','==',title).get()
        try{
            querySnapshot.forEach(doc => {
            let document = this.query.doc(doc.id);
            document.delete()
            console.log('borrado')
        });
    }catch(err){
        console.log(err)
    }
    }
    async modificarporNombre(title,price,thumbnail,stock){
        try{
        const snapshot = await this.query.where('title', '==', title).get()
            if(snapshot.empty){
                console.log('el producto no existe')
            }else{
                snapshot.forEach(doc => {
                    let document = this.query.doc(doc.id)
                    document.update({price:price,thumbnail:thumbnail,stock:stock})
                    console.log("actualizado")
                })
            }
    }catch(err){
        console.log(err)
    }
    }

}

module.exports = ContenedorProd;