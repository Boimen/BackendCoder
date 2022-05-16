const express = require ('express')
const Router = require ('express')
const {listaCarritos,agregarProducto,mostrarcarrito,confirmarCarrito} = require ('../Controllers/Carrito')

    const RouterCarrito = new Router ()

    RouterCarrito.use(express.json())
    RouterCarrito.use(express.urlencoded({extended:true}))

RouterCarrito.get('/Carritos', listaCarritos)

RouterCarrito.get('/Carrito/confirmacion', confirmarCarrito)

RouterCarrito.post('/Carrito/agregarproducto/:title', agregarProducto)

RouterCarrito.get('/Carrito', mostrarcarrito)

/*RouterCarrito.get('/Carrito/:carritoid/borrar/:idproducto', async (req,res)=>{

    const carritoid  = req.params.carritoid
    const productoid  = req.params.idproducto

 
    try {

        let borradodecarrito = await contenedorcarritos1.deleteproductById(carritoid,productoid)
        res.redirect('back')
     
        
        } catch (err) {

            res.send('Invalido')
        }

})*/

module.exports = RouterCarrito