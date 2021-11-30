
const fs = require ('fs');


const productos = []

class Contenedor {
    constructor(archivo){
       this.archivo = archivo
    }

 

readFile(){
    return new Promise((resolve,reject) =>{
          
            fs.readFile(this.archivo,'utf-8',(error, data) => {
                if (error){
                 reject(error);
                }else{
                 resolve(JSON.parse(data));
            }})
    })
}

/*
  async readFile2(){
      try{
        const lectura = await fs.promises.readFile(this.archivo,'utf-8')
    
            }
        
        catch(error){
            console.log(error)
        }
  
    }
    */

    save(obj){
        let registros = this.readFile()
        //registros.length ??
        let id = 1

        let newObj = {...obj,id}

        registros.push(newObj)

        return registros
    }
}
          

    const contendernuevo = new Contenedor ('./info.txt')

   let libro4 =  {nombre:'Libro4',autor:'autor4',imagen:'imagen'}

   contendernuevo.save()
        .then((data)=>
        console.log(data))
        .catch((err)=>
        console.log(err));


