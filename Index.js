
const fs = require ("fs");

const objetos = [{title:'Libro1',price:'1400',thumbnail: src='https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',id:1,stock:100},
                {title:'Libro2',price:'1500',thumbnail: src='https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',id:2,stock:100},
                {title:'Libro3',price:'1600',thumbnail: src="https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png",id:3,stock:100}]



       
        fs.writeFile('./info.txt',JSON.stringify(objetos,null,2),error =>{
            if(error){
            throw new Error('Error al escribir info.txt')
            }
            else{
                
                console.log('Todo ok')
            }
 
        
        })

        fs.writeFile('./Carritos.txt',JSON.stringify(null,null,2),error =>{
            if(error){
            throw new Error('Error al escribir info.txt')
            }
            else{
                
                console.log('Todo ok')
            }
 
        
        })
