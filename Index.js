

class Usuario  {
    constructor (nombre,apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
     getFullName () {
        return `Nombre: ${this.nombre} Apellido: ${this.apellido}`
    }

    addBook (nombre, autor){
        let arraylibros = [{nombre,autor}]
        this.libros.push(arraylibros)
    }
    countMascotas () {
        return this.mascotas.length
    }

    getBookNames(){
        if(this.libros.length>0){
            for(let i = 0;i<this.libros.length;i++){
            console.log(this.libros[i].nombre)
             
            }}
        else{
            console.log("No hay libros")
        }
    }

    addMascota(tipo){
        return this.mascotas.push(tipo)
    }


}

let numero1 = new Usuario ("Fernando","Baumann",null,null)

numero1.addBook("El señor de los anillos","Tolkien")
numero1.addBook("Harry Potter","Rowling")
numero1.addMascota("perro")
numero1.addMascota("gato")

console.log(numero1.getFullName())
console.log(numero1.getBookNames())
console.log(numero1.countMascotas())




