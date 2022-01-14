const express = require ('express');
const app = express();
const Contenedor = require ("./contenedor.js");
const servidor = require ('http').Server(app)
const io = require ('socket.io')(servidor)
const Carritos = require ('./Carritos.js');



const {Router} = express;
app.use(express.static('public'))



const contenedor1 = new Contenedor ('./info.txt')
const contenedorcarritos1 = new Carritos ('./Carritos.txt',[])


app.set('views','./public');
app.set('view engine','ejs');




const RouterProductos = Router()
const RouterCarrito = Router()



const PORT = process.env.PORT || 8080


const server = servidor.listen(PORT,()=>{
    console.log(`Servidor ${server.address().port}`)
});

app.use('/api',RouterProductos)
app.use('/api',RouterCarrito)

RouterProductos.use(express.json())
RouterProductos.use(express.urlencoded({extended:true}))
RouterCarrito.use(express.json())
RouterCarrito.use(express.urlencoded({extended:true}))

server.on("error",error=> console.log(`Error en servidor ${error}`));

RouterProductos.get('/productos', async (req,res)=>{
    const productos = await contenedor1.getAll()
    res.send(productos);
    console.log(productos)
})

/*
RouterProductos.get('/productoRandom',async (req,res)=>{
    const productosRandom = await contenedor1.getAll()
    res.send(randomItem(productosRandom));
    console.log(productosRandom)
})
*/


RouterProductos.post('/guardar', async (req,res)=>{

    contenedor1.save(req.body)
    res.redirect('/api')
})

RouterProductos.get('/productos/:id',async (req,res)=>{
    let id = req.params.id
    let busqueda = await contenedor1.getById(id)

    if (busqueda){
    res.send(busqueda)
    }else{
        res.send('Producto inexistente')
    }
})

RouterProductos.put('/modificar/:id', async (req,res)=>{
    let {id} = req.params

    try{
    let modificar = await contenedor1.modifyById(id,req.body.title,req.body.price,req.body.thumbnail)
        if(modificar){
            res.send(modificar)
        }else{
            res.send('Producto inexistente')
    }}catch(err){
        console.log(err)
    }
    
})

RouterProductos.get('/borrar/:id', async (req,res)=>{
    const { id } = req.params
    try {
        let borrado = await contenedor1.deleteById(id)
            res.redirect('/api')
        if (borrado){
            res.redirect('/api')
        }else{
            res.send('Producto inexistente')
        }
        
    } catch (err) {
        console.log(err)
    }
 
})



//Ejs

RouterProductos.get('/', async (req,res)=>{
    try{
    const renderProductos = await contenedor1.getAll()
    res.render('Index', {renderProductos});
    }catch(err){
        console.log(err)
    }
})

RouterProductos.post('/guardarejs', async (req,res)=>{

    contenedor1.save(req.body)
    res.redirect('/api')
})




//Io

let messages = []


io.on('connection', function(socket){
    console.log('Cliente nuevo')
    socket.emit('messages', messages )

    socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages',messages);
    })
    console.log(messages)
})



RouterCarrito.get('/Carrito', async (req,res)=>{
    try{
        const renderCarrito = await contenedorcarritos1.crearCarrito()
        res.render('Carrito', {renderCarrito});
        }catch(err){
            console.log(err)
        }
    
})

RouterCarrito.get('/Carrito/borrar/:id', async (req,res)=>{
    const { id } = req.params
    try {
        let borrado = await contenedorcarritos1.deleteById(id)
        if (borrado){
            res.send(borrado)
        }else{
            res.send('Carrito Inexistente')
        }
        
    } catch (err) {
        console.log(err)
    }
 
})

RouterCarrito.get('/Carrito/:carritoid/:idproducto', async (req,res)=>{

    const carritoid  = req.params.carritoid
    const productoid  = req.params.idproducto

 
    try {

        let busqueda = await contenedor1.getById(productoid)
        if(busqueda){
        let agregadocarrito = await contenedorcarritos1.addById(carritoid,busqueda)
            res.send(agregadocarrito)
        }else{
        res.send('Producto inexistente')
        }
        
    } catch (err) {
        res.send('Producto inexistente')
    }

})

RouterCarrito.get('/Carrito/:carritoid/', async (req,res)=>{

    const carritoid  = req.params.carritoid

    try {

        let renderCarrito = await contenedorcarritos1.getById(carritoid)

        if (renderCarrito){
            res.render('Carritoid', {renderCarrito});
        }else{
            res.send('Carrito inexistente')
        }
        
    } catch (err) {
        console.log(err)
    }
})

RouterCarrito.get('/Carrito/:carritoid/borrar/:idproducto', async (req,res)=>{

    const carritoid  = req.params.carritoid
    const productoid  = req.params.idproducto


 
    try {

        let busqueda = await contenedorcarritos1.getById(carritoid,productoid)

        if (busqueda){
            res.send(busqueda)
        }else{
            res.send('Producto inexistente')
        }
        
    } catch (err) {
        console.log(err)
    }
})



