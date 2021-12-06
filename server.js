const http = require('http')

const server = http.createServer((peticion,respesta) =>{
    console.log('Hecho')
})

const connectedServer = server.listen(8080,()=>{
    console.log(`Bienvenido al server ${connectedServer.address().port}`)
})