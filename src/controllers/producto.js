const logger = require ('../helpers/logger')
const ContenedorMongo = require ('../datamongo/ContProductos')

const contenedorNuevo = new ContenedorMongo()


async function serverpage (req,res) {
    if(!req.session.user){
        res.redirect('/api/login')
    }
    const usuariologeado = req.session.user[0].nombre;
    const carrito = req.session.carrito
    console.log(usuariologeado)
    try{
    const renderProductos = await contenedorNuevo.mostrarProductos()

    res.render('Index', {usuariologeado,renderProductos,carrito});


    }catch(err){
        logger.warn('Lista de productos inexistente')
        console.log(err)
    }
}

async function mostrarproductos (req,res) {

    const productos = await contenedorNuevo.mostrarproductos()
    res.send(productos);

}

async function borrarproducto (req,res) {
    const { title } = req.params
    try {
        let borrado = await contenedorNuevo.borrarproducto(title)
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
    let title = req.params.title
    let price = req.params.price
    let thumbnail = req.params.thumbnail
    let stock = req.params.stock
    
    await contenedorNuevo.modificarproducto(id,title,price,thumbnail,stock)
}

async function guardarproducto (req,res){
    try{
        Firebase.agregarproducto(req.body)
   }catch(err){
       logger.error('Guardado de producto incorrecto')
   }
    res.redirect('/api')
}

async function agregarproducto (req,res) {
    try{
        await contenedorNuevo.agregarProducto(req.body)
    }catch(err){
        logger.error('Guardado prod incorrecto')
    }
    res.redirect('/api')
}

async function buscarproducto(req,res) {
    const id = req.params.id
    const busqueda = await contenedorNuevo.buscarproducto(id)
    res.send(busqueda)
}

module.exports = {agregarproducto,mostrarproductos,serverpage,buscarproducto,borrarproducto,modificarproducto,guardarproducto}