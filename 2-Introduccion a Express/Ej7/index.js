const express = require('express')
const array = require('./array')
const randomNumber = require('./randomNumber')

const app = express()

app.get('/', function(req, res) {
    const random = randomNumber()
    array[random] = array[random] + 1

    res.send(array)
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})