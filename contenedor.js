
const fs = require ('fs');


const productos = []

class Contenedor {
    constructor(archivo){
       this.archivo = archivo
    }

 

    readFile(){
        return new Promise((resolve,reject) =>{
          
            fs.promises.readFile(this.archivo,'utf-8',(error, data) => {
                if (error) return reject(error);
                return resolve(data);
            })
    })
}
    /*
            .then(data => {
                const infoData = JSON.parse(data)
                console.log(infoData)
                return infoData
            })
            .catch(err =>{
                console.log('Error de lectura',err)
            })
            */

    

  async readFile2(){
      try{
        const lectura = await fs.promises.readFile(this.archivo,'utf-8')
        const infoData = JSON.parse(lectura);

            const info = {
                nombre : infoData.nombre,
                autor : infoData.autor,
                imagen : infoData.imagen            
            }
            return productos.push(info)
            }
        
        catch(error){
            console.log(error)
        }
  
    }
}
        

    const contendernuevo = new Contenedor ('./info.txt')

console.log(contendernuevo.readFile()
    .then(data => console.log(data))
	.catch(error => console.error(error)))


console.log(contendernuevo.readFile2())


