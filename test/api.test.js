const request = require ('supertest')('http://localhost:8080')
const expect = require ('chai').expect
const { assert } = require('chai')
const faker = require ('faker') 
const admin = require('firebase-admin')
const ContenedorProd = require ('../src/ContenedorProdFirebase')
let serviceAccount = require("../coderbackend-3c5d1-firebase-adminsdk-d2qrh-3781e00c29.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore()
const query = db.collection('productos')

const contenedornuevo = new ContenedorProd (query)

describe('testproducutos',function() {
    it('crearquery',function(){
        const contenedornuevo = new ContenedorProd (query)
})
    it('agregar' , async function() {
        const contenedornuevo = new ContenedorProd (query)
        /*let productonuevo = {
            title:"Libro1",
            price:200,
            thumbnail:"google.com.ar",
            stock:20
        }*/
       // contenedornuevo.agregarproducto(productonuevo)
    })
})
const crearproductofake = () => ({
    id:faker.random.number(20),
    title: faker.Name.firstName(),
    price: faker.random.number(4),
    thumbnail: faker.Name.firstName(),
    stock: faker.random.number(2)
})

describe('test', () => {
    describe('GET', () =>{
        it('Test',async () => {
            let respuesta = await request.get('/api')
            expect(respuesta.status).to.eql(200)
        })  
    })
})

describe('POST', () => {
    it('incorporacion de un producto', async () => { 
        let producto = crearproductofake()
        let respuesta = await request.post('/api/guardarproducto').send(producto)

        expect(respuesta.status).to.eql(200)
        const prod = respuesta.body
        expect(prod).to.include.keys('title','price','stock')
        expect(prod.title).to.eql(producto.title)
        expect(prod.price).to.eql(producto.price)
        expect(prod.stock).to.eql(producto.stock)
})
})
