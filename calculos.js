function random (cantidad){
    let numer = [];
    for(let i = 0;i<cantidad;i++){
        let numerorandom = Math.floor(Math.random(1000) * 1000)
        numer.push(numerorandom)
    }
    return numer
}


process.on('exit' , () => {
    console.log(`worker# ${process.pid} cerrado`)
})

process.on('message/:cantidad', msg => {
    console.log(`worker #${process.pid} iniciando su tarea`)
    const calculo = random (cantidad)
    process.send(calculo)
    console.log(`worker #${process.pid} finalizo su tarea`)
    process.exit()
})