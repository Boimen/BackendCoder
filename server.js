const express = require ('express');
const app = express();
const servidor = require ('http').Server(app)
const io = require ('socket.io')(servidor)
const Carritos = require ('./src/Carritos.js');
const ContenedorFirebase = require ('./src/ContenedorProdFirebase.js');
const ContenedorMensajes = require ('./src/ContenedorMensajes')
let admin = require("firebase-admin");
const { normalize, schema } = require("normalizr")
let serviceAccount = require("./coderbackend-3c5d1-firebase-adminsdk-d2qrh-3781e00c29.json");
const faker = require ('faker');
const { mongo } = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require ('express-session')




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


    const db = admin.firestore()
    const query = db.collection('productos')

    const db2 = admin.firestore()
    const query2 = db2.collection('Carritos')

    const db3 = admin.firestore()
    const query3 = db3.collection('Mensajes')


const {Router} = express;
app.use(express.static('public'))

const contenedorcarritos1 = new Carritos (query2,[])
const Firebase = new ContenedorFirebase(query);
const Mensajes = new ContenedorMensajes(query3)

app.set('views','./public');
app.set('view engine','ejs');
app.use(cookieParser())




const RouterLogin = Router()
const RouterProductos = Router()
const RouterCarrito = Router()

app.use(session({
    store: MongoStore.create({mongoUrl:  "mongodb+srv://Boimen:diehose11@cluster0.lao3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" }),
    secret : 'Boimen',
    resave : false,
    saveUnintialized : false,
    cookie: {
        maxAge: 600000
    }
}))



const PORT = process.env.PORT || 8080


const server = servidor.listen(PORT,()=>{
    console.log(`Servidor ${server.address().port}`)
});

app.use('/api',RouterProductos)
app.use('/api',RouterCarrito)
app.use('/api',RouterLogin)

RouterProductos.use(express.json())
RouterProductos.use(express.urlencoded({extended:true}))
RouterCarrito.use(express.json())
RouterCarrito.use(express.urlencoded({extended:true}))
RouterLogin.use(express.json())
RouterLogin.use(express.urlencoded({extended:true}))

server.on("error",error=> console.log(`Error en servidor ${error}`));

RouterProductos.get('/productos', async (req,res)=>{
    const productos = await contenedor1.getAll()
    res.send(productos);
    console.log(productos)
})



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

RouterProductos.get('/modificar/producto/:id', async (req,res)=>{
    let {id} = req.params
    res.render('modificarproducto',{id})
})

RouterProductos.get('/borrar/:title', async (req,res)=>{
    const { title } = req.params
    try {
        let borrado = await Firebase.eliminarporNombre(title)
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
    const renderProductos = await Firebase.mostrar()
    let nombre = req.session.name
    res.render('Index', {renderProductos,nombre});


    }catch(err){
        console.log(err)
    }
  
})

RouterProductos.post('/guardarejs', async (req,res)=>{

    Firebase.agregarproducto(req.body)
    res.redirect('/api')
})




//Io

RouterProductos.get('/Normalizar', async (req,res)=>{
    try{
    let mensajes = await Mensajes.mostrar()
    let participantes = await Mensajes.traerautores()
    let querySnapshot = await query3.get()
    let cantidad = querySnapshot.size

    const logmensajes = new schema.Entity('mensajes',{
        id: 1,
        Participantes: participantes,
        Cantidad_Mensajes: cantidad,
        mensajes: mensajes
    })

    res.send({logmensajes});


    }catch(err){
        console.log(err)
    }
  
})


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

        let borradodecarrito = await contenedorcarritos1.deleteproductById(carritoid,productoid)
        res.redirect('back')
     
        
        } catch (err) {

            res.send('Invalido')
        }

})

//Faker
/*
agregarfake()

function agregarfake(){

    for(let i = 0 ; i<5 ; i++){
    let faketitle = faker.lorem.words()
    let fakeprice = faker.commerce.price()
    let fakethumbnail = faker.image.avatar()
    let fakestock = faker.random.number(15)
    let fakeid = faker.random.uuid()

    let nuevoproducto = {title:faketitle,price:fakeprice,thumbnail:fakethumbnail,id:fakeid,stock:fakestock}

    Firebase.agregarproducto(nuevoproducto)
    }
}
*/

// Login session
let contador = 0;

RouterLogin.get('/Login' , async (req,res)=>{
   
       res.render('Login')
  
})

RouterLogin.post('/Login/guardar', async (req,res)=>{

    console.log(req.body)
    // req.session.name = req.body ??
    res.redirect('/api')
})

RouterLogin.get('/Logout', async (req,res) =>{
    req.session.destroy(err => {
        if(!err){ res.redirect('/api/Login')
    }else res.send({status:'Logout ERR', body: err})

    })
})