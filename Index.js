/*
const fs = require ('fs');

const objetos = [{title:'Libro1',price:'1400',thumbnail:'imagen',id:1},
                {title:'Libro2',price:'1500',thumbnail:'imagen',id:2},
                {title:'Libro3',price:'1600',thumbnail:'imagen',id:3}]



       
        fs.writeFile('./info.txt',JSON.stringify(objetos,null,2),error =>{
            if(error){
            throw new Error('Error al escribir info.txt')
            }
            else{
                
                console.log('Todo ok')
            }
 
        
        })
/*