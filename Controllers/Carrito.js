const admin = require("firebase-admin");
const Carritos = require ('../src/Carritos')
const ContenedorProdFirebase = require ('../src/ContenedorProdFirebase')
const {mailCarrito} = require ('../helpers/Email')

const db = admin.firestore()
const query = db.collection('productos')

const db2 = admin.firestore()
const query2 = db2.collection('Carritos')
 
const contenedorcarritos1 = new Carritos (query2,[])
const contFirebase = new ContenedorProdFirebase (query)

async function listaCarritos (req,res) {
    try{
        let renderCarrito = await contenedorcarritos1.getAll()
        /*res.render('Carrito', {renderCarrito});*/
        res.send(await renderCarrito)
        }catch(err){
            console.log(err)
        }

}
 
async function agregarProducto (req,res) {
    const titulo = req.params.title
    try {
        let busqueda = await contFirebase.buscarporNombre(titulo)
        let carrito = req.session.carrito
        carrito.push(busqueda)
        req.session.carrito = carrito
        res.redirect('/api')
    } catch (err) {
        res.send('Producto inexistente')
    }
}

async function mostrarcarrito (req,res){
      try {
    
            let carrito = req.session.carrito
            res.send(carrito)
            
        } catch (err) {
            console.log(err)
        }
    }

async function confirmarCarrito (req,res) {
    let usuario = req.session.user
    let carrito = req.session.carrito
    try{
    let confirmado = await contenedorcarritos1.crearCarrito(usuario,JSON.stringify(carrito,null,2))

    await mailCarrito(JSON.stringify(usuario),new Date(),JSON.stringify(carrito))
    res.send(confirmado)
    }catch(err){
        console.log(err)
    }
}

module.exports = {listaCarritos,agregarProducto,mostrarcarrito,confirmarCarrito}