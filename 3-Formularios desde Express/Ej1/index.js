const express = require('express')
const animales = require('./animales')

const app = express()

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.send(muestraAnimales(animales))
})

app.get('/sumar-animal', function(req, res) {
    const {nombre, edad, tipo} = req.query
    animales.push({nombre, edad, tipo})
    res.send(muestraAnimales(animales))
})

app.get('/adoptar', function(req, res) {
    const nombre = req.query.nombre
    const indice = animales.findIndex(el => nombre === el.nombre)
    console.log(indice)
    if(indice < 0) {
        return (muestraAnimales(animales))
    }
    animales.splice(indice, 1)
    res.send(muestraAnimales(animales))
})

const muestraAnimales = (animales) => {
    let lista = ''
    animales.forEach(animal => lista += 
        `<li>${animal.nombre}, ${animal.edad} años, ${animal.tipo} 
        <a href="/adoptar?nombre=${animal.nombre}">Adoptar</a>
        </li>`)
    return `<ul>${lista}</ul>`
}


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})