const express = require ('express')
const Router = require ('express')
const logger = require ('../logger.js')
const jwt = require ('../jwt')
const compression = require ('compression');
const {registro,guardarRegistro,getlogin,login,mostrar,errorRegistro,logout,datos} = require('../Controllers/Login.js');



const RouterLogin = new Router ()

RouterLogin.use(express.json());
RouterLogin.use(express.urlencoded({ extended: true }));

let contador = 0;


RouterLogin.get('/registro' , registro)

RouterLogin.get('/usuarios' , mostrar)

RouterLogin.post('/registro/guardar', guardarRegistro)



RouterLogin.get('errorRegistro', errorRegistro)


RouterLogin.get('/logout', logout)

RouterLogin.get('/login', getlogin)


RouterLogin.post('/login',login)

RouterLogin.get('/login-error' , (req,res) =>{
    res.render('Login-error')
})

RouterLogin.get('/datos', jwt.auth , datos)

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

module.exports = RouterLogin 