const fs = require ('fs');

const objetos = [{nombre:'Libro1',autor:'autor1',imagen:'imagen'},
                {nombre:'Libro2',autor:'autor2',imagen:'imagen'},
                {nombre:'Libro3',autor:'autor3',imagen:'imagen'}]



       
        fs.writeFile('./info.txt',JSON.stringify(objetos,null,2),error =>{
            if(error){
            throw new Error('Error al escribir info.txt')
            }
            else{
                
                console.log('Todo ok')
            }
 
        
        })
