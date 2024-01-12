const express = require('express')
const array = require('./array')
const randomNumber = require('./randomNumber')

const app = express()

app.get('/', function(req, res) {
    const random = randomNumber()
    array[random] ++

    res.send(array)
})

app.get('/borrar/:numero', function(req, res) {
    const index = req.params.numero
    array[index] = 0

    res.send(array)
})


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})