const {mailCarrito} = require ('../helpers/Email')
const ContCarritos = require('../datamongo/ContCarritos')
const ContProductos = require ('../datamongo/ContProductos')



const contenedorcarritos1 = new ContCarritos ([])
const contprod = new ContProductos ()

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
        let busqueda = await contprod.buscarprodNombre(titulo)
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
    const usuario = {
        email:req.session.user[0].email,
        nombre:req.session.user[0].nombre
    }
    const carrito = req.session.carrito
    const carritonuevo = {
        date: new Date(),
        usuario: usuario,
        carrito:carrito
    }
    try{
        const confirmado = await contenedorcarritos1.crearCarrito(carritonuevo)
        console.log(confirmado)

    //await mailCarrito(JSON.stringify(usuario),new Date(),JSON.stringify(carrito))
    res.send(confirmado)
    }catch(err){
        console.log(err)
    }
}

module.exports = {listaCarritos,agregarProducto,mostrarcarrito,confirmarCarrito}