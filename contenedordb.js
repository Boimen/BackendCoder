const Contenedor = require('./contenedor')
const {knex} = require('./db/database')


const objetos = [   {title:'Libro1',price:'1400',thumbnail: src='https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',id:1,stock:100},
                    {title:'Libro2',price:'1500',thumbnail: src='https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png',id:2,stock:100},
                    {title:'Libro3',price:'1600',thumbnail: src="https://cdn1.iconfinder.com/data/icons/address-book-providers-in-colors/512/macoscontacts-1024.png",id:3,stock:100}]



     class Contenedordb {
        constructor(config,tabla){
        this.config = config
        this.tabla = tabla
        }

        async agregarobjetos (){
            try{
            this.config(this.tabla).insert(objetos)
                .then(()=>console.log('Productos insertados'))
                .catch(err => {console.log(err); throw err})
                .finally(()=>{
                    this.config.destroy();
                })
            }catch(error){
                throw error

            }
        return console.log(this.tabla)
            }

            
         async agregarobjeto (objeto){
            try{
            this.config(this.tabla).insert(objeto)
                .then(()=>console.log('Producto insertados'))
                .catch(err => {console.log(err); throw err})
                .finally(()=>{
                    this.config.destroy();
                })
            }catch(error){
                throw error

            }
            return console.log(this.tabla)
            }

        async getAll(){
            try{
                let lectura = this.config.from(this.tabla).select("*")
                    /*.then(console.log('lalal'))
                    .catch(err => {console.log(err); throw err})
                    .finally(()=>{
                        this.config.destroy();
                    })
                    */
                   return lectura
            }
            catch(error){
                throw error;
            }
        }

        async getById(id){
            try{
            let busqueda = this.config.from(this.tabla).where('id', '=' , id).select("*")
                /*.then(( console.log("Encontrado")))
                .catch(err => {console.log(err); throw err})*/
                return busqueda
                }
                catch(error){
                    throw error;
                }}

        async deleteById(id){
            this.config.from(this.tabla).where('id', '=' , id).del()
            .then(() => console.log("Borrado")
            .catch(err => {console.log(err); throw err})

                )
            }

    }


    const contendernuevo = new Contenedordb (knex,'productos')

    //contendernuevo.getAll()
      //  .then((res) => console.log(res));

    //contendernuevo.getById(2)
      //  .then((res) => console.log(res));


    module.exports = Contenedordb
