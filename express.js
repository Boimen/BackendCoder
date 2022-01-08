const express = require ('express');
const app = express();
const Contenedor = require ("./contenedor.js");
const handlebars = require ("express-handlebars");
const servidor = require ('http').Server(app)
const io = require ('socket.io')(servidor)


const {Router} = express;


//Handlebar Config

const hbs = handlebars.create({
    extname:".hbs",
    defaultLayout: 'Index.hbs',
    layoutsDir: __dirname + "/public",
    partialsDir: __dirname + '/views'
})
app.engine("hbs", hbs.engine);
app.set('view engine','hbs');


const contenedor1 = new Contenedor ('./info.txt')





app.set('views','./views');
//app.set('view engine','pug');
//app.set('view engine','ejs');




const RouterProductos = Router()


const PORT = process.env.PORT || 8080


const server = servidor.listen(PORT,()=>{
    console.log(`Servidor ${server.address().port}`)
});

app.use('/api',RouterProductos)
RouterProductos.use(express.json())
RouterProductos.use(express.urlencoded({extended:true}))

app.use(express.static('public'))




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
        if (borrado){
            res.send(borrado)
        }else{
            res.send('Producto inexistente')
        }
        
    } catch (err) {
        console.log(err)
    }
})

//PUG
/*
RouterProductos.get('/hellopug', async (req,res)=>{
    try{
        const renderProductos = await contenedor1.getAll()
        res.render('hellopug', {renderProductos});
        }catch(err){
            console.log(err)
        }
})

RouterProductos.post('/guardarpug', async (req,res)=>{

    contenedor1.save(req.body)
    res.redirect('/api/hellopug')
})

*/

//Ejs
/*
RouterProductos.get('/', async (req,res)=>{
    try{
    const renderProductos = await contenedor1.getAll()
    res.render('hello', {renderProductos});
    }catch(err){
        console.log(err)
    }
})

RouterProductos.post('/guardarejs', async (req,res)=>{

    contenedor1.save(req.body)
    res.redirect('/api')
})
*/


//Plantillas


RouterProductos.get('/plantilla', async (req,res)=>{
    try{
        const renderProductos = await contenedor1.getAll()
        res.render('datos', {renderProductos});
        }catch(err){
            console.log(err)
        }
        
})

RouterProductos.post('/guardarplantilla', async (req,res)=>{

    contenedor1.save(req.body)
    res.redirect('/api/plantilla')
})



//Io

let messages = []

let socket = io.connect();

io.on('conection', function(socket){
    console.log('Cliente nuevo')
    socket.emit('messages',messages )

    socket.on('new-message', data =>{
        messages.push(data);
        io.sockets.emit('messages',messages);
    })
})




socket.on('messages', data =>{
    alert('escuchando')
})

function render(data){
    const html = data.map((elem, index) =>{
        return (`<div>
        <strong> ${elem.title}</strong>:
        <em> ${elem.text}</em>
        </div`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html;

}

function addMessage(e){
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message',mensaje);
    return false;
}

socket.on('messages' , function(data) {render(data);})