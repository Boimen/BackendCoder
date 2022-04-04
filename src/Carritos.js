const server = require ('../server.js')
let admin = require("firebase-admin");


class Carrito {
    constructor(usuario,date,productos){
        this.usuario = usuario
        this.date = date;
        this.productos = productos
    }
}

class Carritos {
    constructor(query,Carrito){
    this.query = query;
    this.Carrito = Carrito;
    }


    
    async getAll(){
                const querySnapshot = await this.query.get()
                let docs = querySnapshot.docs;
        
                const respuesta = docs.map(doc=>({
                    id:doc.id,
                    date:doc.data().date,
                    productos:doc.data().productos
                }))
                return (respuesta)
            }
            

    async getLastFromList() {
                this.query.limitToLast(1).once(id)
                    .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        return(childSnapshot.val());
             });
        });
              }


    async crearCarrito (usuario) {
      
                    /*let snapshot = await getLastFromList.get()
                    let id = snapshot +1 ;*/
                    let nuevocarrito = JSON.parse(JSON.stringify(new Carrito(usuario,new Date(),[])))
                    let doc = this.query.doc();
                    doc.create(nuevocarrito)
                    return nuevocarrito

                        /*let objetosencarrito = file.length
                            nuevocarrito.id = objetosencarrito + 1;
                            nuevocarrito.date = momento;
                            nuevocarrito.productos = []
                                file.push(nuevocarrito)
                                const datos = JSON.stringify(file)
                                fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')
                                return file;
               */
       
  
}
    async deleteById (id){

        const file = await this.getAll()
        .then((respuesta)=>
                respuesta)
        .catch((error)=> 
            {throw new error});
    

                for(let x = 0; x<file.length; x++){
                    if(file[x].id == id){
                        file.splice(x,1)

                    }}
                fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')

            }catch(error){
            throw error;

            } 

    async addById (id,producto){

        try{
            const file = await this.getAll()
            .then((respuesta)=>
                    respuesta)
            .catch((error)=> 
                {throw new error});

                /*
                for(let x = 0; x<file.length; x++){ 
                    if(file[x].id == id){
                        file[x].productos.push(producto)
                        return file[x]
                    }}
                    */
                let objmodificado = null;
                
                file.map(function(dato){
                        if(dato.id == id){
                            (dato.productos).push(producto),
                            file.splice((file.indexOf(dato)),dato)

                            objmodificado = dato

                        }})
           
        fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')
        return objmodificado
        }catch(error){
            throw error;

        } 

        }
        async getById(id){
        
            try{
                const file = await this.getAll()
                    .then((respuesta)=>
                        respuesta)
                    .catch((error)=> 
                        {throw new error});
                
            let encontrado = null

            for(let x = 0;x<file.length;x++){
                    if(file[x].id == id){
                        encontrado = file [x]
                        
                    }}
                    return encontrado
            
            }catch(error){
                throw error;
            }
        
    }

    async deleteproductById (id,productoid){

                const file = await this.getAll()
                .then((respuesta)=>
                        respuesta)
                .catch((error)=> 
                    {throw new error});

                    let encontrado = null;

                    file.map(function(dato){
                            if(dato.id == id){
                                encontrado = dato
                            }})

                    encontrado.productos.map(function(producto){
                            if(producto.id == productoid){
                                encontrado.productos.splice(encontrado.productos.indexOf(producto),1)
                                }})


          
                fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')   
                return encontrado
                
        }
    }

module.exports = Carritos;