const express = require('express')
const saludar = require('./archivo.js')

const app = express()

app.get('/saluda', function(req, res) {
    res.send(saludar())
})


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})