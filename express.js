import express from 'express'
import Contenedor from './contenedor.js'
import randomItem from 'random-item'

const contenedor1 = new Contenedor ('./info.txt')

const app = express();

const PORT = 8181;

const server = app.listen(PORT,()=>{
    console.log(`Servidor ${server.address().port}`)
});


server.on("error",error=> console.log(`Error en servidor ${error}`));

app.get('/productos',async (req,res)=>{
    const productos = await contenedor1.getAll()
    res.send(productos);
    console.log(productos)
})

app.get('/productoRandom',async (req,res)=>{
    const productosRandom = await contenedor1.getAll()
    res.send(randomItem(productosRandom));
    console.log(productosRandom)
})

