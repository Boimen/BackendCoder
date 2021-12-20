import express from 'express'
import Contenedor from './contenedor.js'
import randomItem from 'random-item'


const contenedor1 = new Contenedor ('./info.txt')

const app = express();
const {Router} = express;

const RouterProductos = Router()

const PORT = 8181;

app.use('/api',RouterProductos)
RouterProductos.use(express.json())
RouterProductos.use(express.urlencoded({extende:true}))

app.use(express.static('public'))


const server = app.listen(PORT,()=>{
    console.log(`Servidor ${server.address().port}`)
});


server.on("error",error=> console.log(`Error en servidor ${error}`));

RouterProductos.get('/productos', async (req,res)=>{
    const productos = await contenedor1.getAll()
    res.send(productos);
    console.log(productos)
})

RouterProductos.get('/productoRandom',async (req,res)=>{
    const productosRandom = await contenedor1.getAll()
    res.send(randomItem(productosRandom));
    console.log(productosRandom)
})



RouterProductos.post('/guardar', async (req,res)=>{

    contenedor1.save(req.body)
    res.json(req.body)
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

