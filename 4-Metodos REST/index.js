const express = require('express')
let personas = require('./personas')

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get('/personas', function(req, res) {
    res.send(personas)
})

app.post('/sumar', function(req, res) {
    const {nombre, apellido, edad} = req.body
    personas.push({nombre, apellido, edad})

    res.send(personas)
})

app.put('/modificar', function(req, res) {
    const index = personas.findIndex((persona) => persona.nombre === req.body.nombre)
    
    if(index < 0) {
        res.send(`${req.body.nombre} no existe`)
        return
    }

    personas[index].apellido = req.body.apellido
    personas[index].edad = req.body.edad

    res.send(personas)
})

app.delete('/borrar', function(req, res) {
    personas = personas.filter((person) => person.nombre != req.body.nombre)
    res.send(personas)
})


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})