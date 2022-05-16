const { Router } = require('express');

const RouterLogin = require ('./RutaLogin')
const RouterProductos = require ('./RutaProductos')
const RouterCarrito = require ('./RutaCarrito')

const rutas = Router();

rutas.use(RouterLogin)
rutas.use(RouterProductos)
rutas.use(RouterCarrito)

module.exports = rutas;