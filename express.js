import express from 'express'
import path from 'path'
import Contenedor from './contenedor.js'

const contenedor1 = new Contenedor ('./info.txt')
               
let lectura = contenedor1.getAll()
                .then((res) => console.log(res));

console.log(lectura)

const app = express();

const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log(`Servidor ${server.address().port}`)
});


server.on("error",error=> console.log(`Error en servidor ${error}`));

app.get('/productos',(req,res)=>{
    let arrayProductos = [obtenerProductos()]
    res.send(arrayProductos);

})

let obtenerProductos = () =>{
     return lectura
}