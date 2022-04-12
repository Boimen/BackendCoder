const express = require ('express')
const Router = require ('express')
const {serverpage,mostrarproductos,buscarprodNombre,borrarproducto,modificarproducto,guardarproducto} = require ('../Controllers/Productos')


const RouterProductos = new Router ()


RouterProductos.use(express.json());
RouterProductos.use(express.urlencoded({ extended: true }));

RouterProductos.get('/', serverpage)

RouterProductos.get('/productos', mostrarproductos)

RouterProductos.get('/productos/:title',buscarprodNombre)

RouterProductos.post('/guardarejs', guardarproducto)

RouterProductos.put('/modificar/:id', async (req,res)=>{
    let {id} = req.params

    try{
        res.send(req.body)
    //let modificar = await contenedor1.modifyById(id,req.body)
        if(modificar){
            res.send(modificar)
        }else{
            res.send('Producto inexistente')
    }}catch(err){
        console.log(err)
    }  
})

RouterProductos.get('/modificar/producto/:id', modificarproducto)

RouterProductos.get('/borrar/:title', borrarproducto)
   
module.exports = RouterProductos