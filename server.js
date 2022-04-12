const express = require('express');
const app = express();
const servidor = require ('http').Server(app)
const io = require ('socket.io')(servidor)
const cors = require('cors');
const Carritos = require ('./src/Carritos.js');
const ContenedorMensajes = require ('./src/ContenedorMensajes')
let admin = require("firebase-admin");
let serviceAccount = require("./coderbackend-3c5d1-firebase-adminsdk-d2qrh-3781e00c29.json");
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const path = require ('path')
const {fork} = require ('child_process')
const cluster = require ('cluster')
const numCpu = require ('os').cpus().length;
const logger = require ('./logger.js')
const RouterLogin = require ('./Rutas/RutaLogin')
const RouterProductos = require ('./Rutas/RutaProductos')




//Server 

const modoCluster = process.argv[3] == 'CLUSTER'

if(modoCluster && cluster.isMaster) {

    console.log(`Procesadores en uso: ${numCpu}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i = 0; i<numCpu; i++) {
        cluster.fork()
    }

    cluster.on('exit',worker=>{
        console.log('Worker',worker.process.pid,'died',new Date().toLocaleString())
        cluster.fork()
    })
}else{

    const PORT = parseInt(process.argv[2]) || 8080 
    
    /*const server = servidor.listen(PORT,()=>{
        console.log(`Servidor ${server.address().port}`)
    });*/

    app.get('/datoserver' ,(req,res) => {
        res.send(`Server en PORT(${PORT})`)
    })

    app.listen(PORT, err =>{
        if(!err) logger.info(`Servidor express escuchando en el puerto ${PORT}`)
    })
}

    const db2 = admin.firestore()
    const query2 = db2.collection('Carritos')

    const db3 = admin.firestore()
    const query3 = db3.collection('Mensajes')



const {Router} = express;
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const contenedorcarritos1 = new Carritos (query2,[])
const Mensajes = new ContenedorMensajes(query3)

app.set('views',path.join(__dirname, './views'));
app.set('view engine','ejs');
app.use(cookieParser())


const RouterCarrito = Router()
const RouterRandom = Router()


app.use(session({
    store: MongoStore.create({mongoUrl: 'mongodb+srv://Boimen11:diehose11@cluster0.lao3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'}),
    secret : 'Boimen',
    resave : false,
    saveUnintialized : false,
    cookie: {
        maxAge: 600000
    }
}))



app.use("/api",RouterLogin)
app.use('/api',RouterProductos)
app.use('/api',RouterCarrito)


RouterCarrito.use(express.json())
RouterCarrito.use(express.urlencoded({extended:true}))
RouterRandom.use(express.json())
RouterRandom.use(express.urlencoded({extended:true}))


app.get('*', (req,res) => {
    const { url } = req
    logger.warn(`Ruta ${url} inexistente`)
    res.send(`Ruta ${url} inexistente`)
})



//Ejs
app.get('/' , (req,res) =>
    res.send('Bienvenido')
    )

//Io



let messages = []

io.on('connection', function(socket){
    console.log('Cliente nuevo')
    socket.emit('messages', messages )

    socket.on('new-message', function (data) {

    const nuevomensaje = Mensajes.agregarNuevo(data)
    messages.push(data)
    io.sockets.emit('messages',messages);
                
    })
})


//Carrito 

RouterCarrito.get('/Carrito', async (req,res)=>{
    try{
        let renderCarrito = await contenedorcarritos1.crearCarrito(req.session.user[0].nombre)
        /*res.render('Carrito', {renderCarrito});*/
        console.log(await renderCarrito)
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

        let borradodecarrito = await contenedorcarritos1.deleteproductById(carritoid,productoid)
        res.redirect('back')
     
        
        } catch (err) {

            res.send('Invalido')
        }

})

