const express = require('express');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
const session = require('express-session')
const path = require ('path')
const logger = require ('./src/helpers/logger')
const rutas = require ('./src/rutas/Router');

const RouterCarrito = require ('./src/rutas/RutaCarrito')
const RouterLogin = require ('./src/rutas/RutaLogin')
const RouterProductos = require ('./src/rutas/RutaProductos')

const app = express();
const servidor = require ('http').Server(app)
const io = require ('socket.io')(servidor)

app.use(session({
    store: MongoStore.create({mongoUrl: 'mongodb+srv://Boimen11:diehose11@cluster0.lao3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'}),
    secret : 'Boimen',
    resave : false,
    saveUnintialized : false,
    cookie: {
        maxAge: 600000
    }
}))


/*
    const db3 = admin.firestore()
    const query3 = db3.collection('Mensajes')
*/
app.set("layout", "layouts/layout") 
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

 
app.use(cookieParser());


app.use('/api',RouterCarrito)
app.use('/api',RouterLogin)
app.use('/api',RouterProductos)




app.get('*', (req,res) => {
    const { url } = req
    logger.warn(`Ruta ${url} inexistente`)
    res.send(`Ruta ${url} inexistente`)
})





/*
let messages = []

io.on('connection', function(socket){
    console.log('Cliente nuevo')
    socket.emit('messages', messages )

    socket.on('new-message', function (data) {

    const nuevomensaje = Mensajes.agregarNuevo(data)
    messages.push(data)
    io.sockets.emit('messages',messages);
                
    })
})*/

const PORT = parseInt(process.argv[2]) || 8080 


const server = servidor.listen(PORT,()=>{
console.log(`Servidor ${server.address().port}`)
})