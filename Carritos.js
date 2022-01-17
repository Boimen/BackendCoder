const fs = require ("fs")
const server = require ('./server.js')

class Carrito {
    constructor(id,date,productos){
        this.id = id
        this.date = date;
        this.productos = productos
    }
}

class Carritos {
    constructor(archivo,Carrito){
    this.archivo = archivo;
    this.Carrito = Carrito;
    }



    async getAll(){
        try{
            const lectura = await fs.promises.readFile(this.archivo,'utf-8')
                if(!lectura){
                    return fs.writeFileSync(this.archivo,JSON.stringify([]),null,2)
                }
                const datos = JSON.parse(lectura);
                return datos;
                }
                catch(error){
                    throw error;
                }
    }

    async crearCarrito () {

        try{    
            const file = await this.getAll()
                    .then((respuesta)=>
                        respuesta)
                    
                    let nuevoid = file.length + 1
                    let nuevocarrito = new Carrito(nuevoid,new Date(),[])
                        /*const momento = new Date();
                        let objetosencarrito = file.length
                            nuevocarrito.id = objetosencarrito + 1;
                            nuevocarrito.date = momento;
                            nuevocarrito.productos = []*/
                                file.push(nuevocarrito)
                                const datos = JSON.stringify(file)
                                fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')
                                return file;

    }catch(error){
        throw error;
    }
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