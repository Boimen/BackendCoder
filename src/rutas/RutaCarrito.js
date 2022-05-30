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


module.exports = RouterCarrito