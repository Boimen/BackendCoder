const express = require('express');
const app = express();
const servidor = require ('http').Server(app)
const io = require ('socket.io')(servidor)
const cors = require('cors');
const Carritos = require ('./src/Carritos.js');
const ContenedorFirebase = require ('./src/ContenedorProdFirebase.js');
const ContenedorMensajes = require ('./src/ContenedorMensajes')
let admin = require("firebase-admin");
let serviceAccount = require("./coderbackend-3c5d1-firebase-adminsdk-d2qrh-3781e00c29.json");
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const jwt = require ('./jwt')
const ContenedorUsuario = require ('./src/ContenedorUsuarios')
const path = require ('path')
const {fork} = require ('child_process')
const cluster = require ('cluster')
const numCpu = require ('os').cpus().length;
const compression = require ('compression')
const logger = require ('./logger.js')
const {encrypt,compare} = require('./helpers/encriptacion')




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


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



    const db = admin.firestore()
    const query = db.collection('productos')

    const db2 = admin.firestore()
    const query2 = db2.collection('Carritos')

    const db3 = admin.firestore()
    const query3 = db3.collection('Mensajes')

    const db4 = admin.firestore()
    const query4 = db4.collection('usuarios')


const {Router} = express;
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const contenedorcarritos1 = new Carritos (query2,[])
const Firebase = new ContenedorFirebase(query);
const Mensajes = new ContenedorMensajes(query3)
const usuarios = new ContenedorUsuario(query4)

app.set('views','./public');
app.set('view engine','ejs');
app.use(cookieParser())




const RouterLogin = Router()
const RouterProductos = Router()
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



//const PORT = parseInt(process.argv[2]) || 8080 //process.env.PORT || 8080

/*
const server = servidor.listen(PORT,()=>{
    console.log(`Servidor ${server.address().port}`)
});
*/


app.use('/api',RouterLogin)
app.use('/api',RouterProductos)
app.use('/api',RouterCarrito)
app.use('/api',RouterRandom)

RouterLogin.use(express.json());
RouterLogin.use(express.urlencoded({ extended: true }));
RouterProductos.use(express.json())
RouterProductos.use(express.urlencoded({extended:true}))
RouterCarrito.use(express.json())
RouterCarrito.use(express.urlencoded({extended:true}))
RouterRandom.use(express.json())
RouterRandom.use(express.urlencoded({extended:true}))

//server.on("error",error=> console.log(`Error en servidor ${error}`));

RouterProductos.get('/productos', async (req,res)=>{
    const productos = await Firebase.mostrar()
    res.send(productos);
    console.log(productos)
})

app.get('*', (req,res) => {
    const { url } = req
    logger.warn(`Ruta ${url} inexistente`)
    res.send(`Ruta ${url} inexistente`)
})



RouterProductos.post('/guardar', async (req,res)=>{

    contenedor1.save(req.body)
    res.redirect('/api')
})

RouterProductos.get('/productos/:title',async (req,res)=>{
    const title = req.params.title
    const busqueda = await Firebase.buscarporNombre(title)
    res.send(busqueda)

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
app.get('/' , (req,res) =>
    res.send('Bienvenido')
    )

RouterProductos.get('/',  async (req,res)=>{
    const usuariologeado = req.session.user[0].nombre;
    console.log(usuariologeado)
    try{
    const renderProductos = await Firebase.mostrar()

    res.render('Index', {usuariologeado,renderProductos});


    }catch(err){
        logger.warn('Lista de productos inexistente')
        console.log(err)
    }
  
})


RouterProductos.post('/guardarejs', async (req,res)=>{

   try{
        Firebase.agregarproducto(req.body)
   }catch(err){
       logger.error('Guardado de producto incorrecto')
   }
    res.redirect('/api')
})




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


// Login session
let contador = 0;

RouterLogin.get('/registro' , async (req,res)=>{ 
    res.render('Registro');
  
})
RouterLogin.get('/usuarios' , async (req,res)=>{ 
    res.send(usuarios.mostrar())
  
})

RouterLogin.post('/registro/guardar', async (req,res)=>{

    const {nombre,correo,contraseña} = req.body
    const usuarioencontrado = await usuarios.buscarporNombre(nombre)

    logger.info(`El nombre a buscar es ${nombre}`)

        if (usuarioencontrado.length != 0) {
        return res.status(400).json(`El usuario: ${nombre} ya existe`)
        }else{
    const user = req.body
    if(!user.contador){
        user.contador = 0;
    }
    const pass = await encrypt(contraseña)
    const nuevousuario = {
        nombre,
        correo:correo,
        contraseña:pass}
    usuarios.agregarUsuario(nuevousuario)
    const access_token = jwt.generateAuthToken(nombre);
    res.json({ access_token })
}
    res.redirect('login')

})

RouterLogin.get('errorRegistro', (req,res) =>{
    res.render('errorRegistro')
    logger.error('Registro invalido')
})  

RouterLogin.get('/logout', async (req, res) => {
    const nombre = req.session.nombre;
    req.session.destroy(err => {
        if(!err){ res.redirect('/api/Login')
    }else res.send({status:'Logout ERR', body: err})
})
    res.render('Logout', { nombre });
  });

RouterLogin.get('/login', (req,res) =>{
    res.render('Login')
})

RouterLogin.post('/login', async (req,res) =>{

    let {nombre,contraseña} = req.body
    let usuario = await usuarios.buscarporNombre(nombre)
    console.log(usuario)

    let credencialesok = null
    credencialesok = usuario.find(u => u.nombre == nombre && compare(contraseña, u.contraseña))
    if(credencialesok == null){
            res.render('Login-error')
    }else{
    usuario.contador = 0;
    const access_token = jwt.generateAuthToken(nombre)
    req.session.user = usuario
    res.redirect('/api')
}

})

RouterLogin.get('/login-error' , (req,res) =>{
    res.render('Login-error')
})

RouterLogin.get('/datos', jwt.auth , async (req,res) => {
    const usuario = usuarios.buscarporNombre(req.user.nombre)
        if(!usuario) {
            return res.status(404).json({error: 'usuario no encontrado'})
        }

        usuario.contador ++
        res.json({
            datos:usuario,
            contador:usuario.contador
        })
        
})

RouterLogin.get('/info' , compression() , (req,res) =>{

    let datos = {
        Sistema_Operativo: process.platform,
        Version_Node_Js:process.version,
        Memoria_total_reservada:process.memoryUsage(),
        Ruta_Ejecucion: process.execPath,
        Id_Proceso:process.pid,
        Directorio: process.cwd(),
    }
    res.send(datos)
    logger.info(datos)
})

// Random con Fork



RouterRandom.get('/random/:cantidad', (req,res) => {
    
    let cantidad = req.params.cantidad

    if(cantidad == 0 || cantidad == null){
    const calculo = fork(path.resolve(__dirname, './calculos.js')) // Mandar cantidad como parametro ?
    calculo.send('start')
    calculo.on('message' , cantidad => {
        res.json ({cantidad})
    })
}else{
    const calculo = fork(path.resolve(__dirname, './calculos.js'),{cantidad},cantidad) // Mandar cantidad como parametro ?
    calculo.send('start')
    calculo.on('message' , cantidad => {
        res.json ({cantidad})

    })}
    
})

