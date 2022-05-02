const axios = require ('axios');



axios.get('http://localhost:8080/api/productos')
    .then(res => {
        console.log(`${res.status}`)
        console.log(res.data)
    })
    .catch(err =>{
        console.log(err)
    })

const getRespuesta = async () => {
    let data;
    try{
    let respuesta = await axios.get('http://localhost:8080/api/productos')
    data = respuesta.data
}catch(err){
    console.log(err)
}
return data
}

Promise.resolve(getRespuesta()).then(res =>  console.log(res))