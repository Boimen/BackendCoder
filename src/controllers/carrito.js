const {mailCarrito} = require ('../helpers/Email')
const ContCarritos = require('../datamongo/ContCarritos')
const ContProductos = require ('../datamongo/ContProductos')
const ContUsuarios = require ('../datamongo/ContUsuarios')


const contenedorcarritos1 = new ContCarritos ([])
const contprod = new ContProductos ()
const contUsers = new ContUsuarios ()

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

    const carritonuevo = {
        date: new Date(),
        productos:req.session.carrito,
        usuario: req.session.user[0],
    }
    try{
        const confirmado = await contenedorcarritos1.crearCarrito(carritonuevo)
        res.send(confirmado)

        let usuario = await (contUsers.buscarUsuario(req.session.user[0].email))


        await mailCarrito(JSON.stringify(usuario),new Date(),JSON.stringify(req.session.carrito))
    }catch(err){
        console.log(err)
    }
}

module.exports = {listaCarritos,agregarProducto,mostrarcarrito,confirmarCarrito}