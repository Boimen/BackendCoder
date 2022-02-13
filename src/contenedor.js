
const fs = require ("fs")

    const productos = []

    class Contenedor {
        constructor(archivo){
        this.archivo = archivo
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
        
        

    async save(obj){ 
        try{
            const file = await this.getAll()
                    .then((respuesta)=>
                        respuesta)
                    .catch((error)=> 
                        {throw new error});
                    
        

                if (file.length<=0){
                    obj.id;
                    file.push(obj);
                    const datos = JSON.stringify(file)
                    fs.writeFileSync(this.archivo,(datos,null,2),'utf-8')
                    return obj;
                }

                    obj.id = file.length + 1;
                    file.push(obj)
                    const datos = JSON.stringify(file)
                    fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')
                    return obj;
                
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
    async modifyById(id,body){
      
        try{
            const file = await this.getAll()
                .then((respuesta)=>
                    respuesta)
                .catch((error)=> 
                    {throw new error}); 
        
        let objmodificado = null;

        file.map(function(dato){
            if(dato.id == id){
                dato.title = body.title,
                dato.price = body.price,
                dato.thumbnail = body.thumbnail,
                dato.stock = body.stock;
                file.splice((file.indexOf(dato)),dato)
                objmodificado = dato
            }
     
        }
        ) 

        fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')   
        return objmodificado      
    }   catch(error){
        throw error;
    }
    }


        async deleteById(id){
            try{

                const file = await this.getAll()
                    .then((respuesta)=>
                            respuesta)
                    .catch((error)=> 
                        {throw new error});

                /*     const obj = await this.getById(idbusqueda)
                    .then((respuesta)=>
                            respuesta)
                    .catch((error)=> 
                        {throw new error});   


               const eliminar = Object.keys(file).reduce((acc , objeto) =>{
                   if(objeto !== obj){
                    acc[objeto] = file[objeto]
                   }
                   return acc
               },[])

             console.log(eliminar)
             fs.writeFileSync(this.archivo,JSON.stringify(eliminar,null,2),'utf-8')*/

          
                for(let x = 0; x<file.length; x++){
                        if(file[x].id == id){
                            file.splice(x,1)
                        }}
                    fs.writeFileSync(this.archivo,JSON.stringify(file,null,2),'utf-8')
           
            }catch(error){
                throw error;
        
    } 
    
    }
    async deleteAll(){
            fs.unlink(this.archivo,error =>{
                if(error){
                    console.log('No se pudo borrar')
                }else{
                    console.log('Borrado')
                }
            })

    }
    }

        const contendernuevo = new Contenedor ('./info.txt')

    
        //Imprimir objetos
        //contendernuevo.getAll()
        //.then((res) => console.log(res));

        //Metodo para agregar objeto
        //contendernuevo.save({title: 'Libro4', price: 1400.45, thumbnail: 'https://webdeimagenes.com/archivo.png'});

        //Metodo para buscar por id
        //contendernuevo.getById(4)
        //.then((res) => console.log(res));
    
        //Metodo para borrar por id e imprimir los objetos restantes con ids actualizados
        //contendernuevo.deleteById(1)
        //.then((res) => console.log(res));

        //Borrar archivo
        //contendernuevo.deleteAll()
        //.then((res) => console.log(res));

        //contendernuevo.modifyById(3,'libro20',2000,'foto')
        //.then((res) => console.log(res));

module.exports = Contenedor;