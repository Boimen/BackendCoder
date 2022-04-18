const admin = require("firebase-admin");
const logger = require ('../helpers/logger')
const ContenedorFirebase = require ('../src/ContenedorProdFirebase.js');


const db = admin.firestore()
const query = db.collection('productos')

const Firebase = new ContenedorFirebase(query);

async function serverpage (req,res) {
    if(!req.session.user){
        res.redirect('/api/login')
    }
    const usuariologeado = req.session.user[0].nombre;
    const carrito = req.session.carrito
    console.log(usuariologeado)
    try{
    const renderProductos = await Firebase.mostrar()

    res.render('Index', {usuariologeado,renderProductos,carrito});


    }catch(err){
        logger.warn('Lista de productos inexistente')
        console.log(err)
    }
}

async function mostrarproductos (req,res) {

    const productos = await Firebase.mostrar()
    res.send(productos);
    console.log(productos)

}

async function borrarproducto (req,res) {
    const { title } = req.params
    try {
        let borrado = await Firebase.eliminarporNombre(title)
            res.redirect('/api')
        if (borrado){
            res.redirect('/api')
        }else{
            res.send('Producto inexistente')
        }
        
    } catch (err) {
        console.log(err)
    }
}

async function modificarproducto (req,res) {
    let {id} = req.params
    res.render('modificarproducto',{id})
}

async function guardarproducto (req,res){
    try{
        Firebase.agregarproducto(req.body)
   }catch(err){
       logger.error('Guardado de producto incorrecto')
   }
    res.redirect('/api')
    
}

async function buscarprodNombre(req,res) {
    const title = req.params.title
    const busqueda = await Firebase.buscarporNombre(title)
    res.send(busqueda)
}

module.exports = {serverpage,buscarprodNombre,mostrarproductos,borrarproducto,modificarproducto,guardarproducto}