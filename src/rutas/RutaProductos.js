const express = require ('express')
const Router = require ('express')
const {agregarproducto,serverpage,mostrarproductos,buscarproducto,borrarproducto,modificarproducto,guardarproducto} = require ('../controllers/producto')
const {graphqlHTTP} = require ('express-graphql')
const {buildSchema} = require ('graphql')
const crypto = require ('crypto')

const schema = buildSchema(`
    type producto {
        title: String,
        price: Float
    }
    input productoinput {
        id:ID!
        title:String
        price:Float
        thumbnail:String
        stock:Int
    }
    type Query {
        mostrarproductos:producto
        buscarprodNombre(title:String):[producto]
    }
    type Mutation{
        guardarproducto(objeto:productoinput):[producto]
    }
    `
);
const RouterProductos = new Router ()


RouterProductos.use(express.json());
RouterProductos.use(express.urlencoded({ extended: true }));

RouterProductos.use('/graphql' , graphqlHTTP({
    schema:schema,
    rootValue: {
        mostrarproductos
    },
    graphiql:true,
}))

RouterProductos.get('/', serverpage)

RouterProductos.get('/productos', mostrarproductos)

RouterProductos.get('/productos/:id',buscarproducto)

RouterProductos.post('/guardarejs', agregarproducto)

//RouterProductos.put('/modificar/:id:title/:price:thumbnail:stock', modificarproducto)

//RouterProductos.get('/modificar/producto/:id:title:thumbnail:', modificarproducto)

RouterProductos.get('/borrar/:title', borrarproducto)
   
module.exports = RouterProductos