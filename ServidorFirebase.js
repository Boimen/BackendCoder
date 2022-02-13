let admin = require("firebase-admin");
let ContenedorProd = require ('./src/ContenedorProdFirebase')


var serviceAccount = require("./coderbackend-3c5d1-firebase-adminsdk-d2qrh-3781e00c29.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Conectado')

let contenedor1 = new ContenedorProd()

CRUD()

async function CRUD(){
    const db = admin.firestore()
    const query = db.collection('productos')

    let contenedor1 = new ContenedorProd(query)
    /*
    try{
        let id = 1;
        let doc = query.doc(`${id}`);
        await doc.create({title:'Libro1',price:'1400',thumbnail: src='https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',stock:100})
        id++;
        console.log('insertado')
    }catch(err){
        console.log(err)
    }
    */
/*
    let productonuevo = {title:'Libro2',price:'5600',thumbnail: src='https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',stock:100}
    try{
        await contenedor1.agregarproducto(productonuevo)
    }catch(error){
        console.log(error)
    }
    */
   /*
    try{
        await contenedor1.mostrar()
    }catch(err){
        console.log(err)
    }
    */
   /*
    try{
        await contenedor1.buscarporId('Libro1')
    }catch(err){
        console.log(err)
    } 
    */
   /*
    try{
        await contenedor1.eliminarporNombre('Libro2')
    }catch(err){
        console.log(err)
    }
    */
   
    try{
        await contenedor1.modificarporNombre('Libro1',5000,"imagen",100)
    }catch(err){
        console.log(err)
    }

    }
