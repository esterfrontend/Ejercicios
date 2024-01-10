const express = require('express')
const saludar = require('./archivo.js')

const app = express()

app.get('/saluda', function(req, res) {
    res.send(saludar())
})

app.listen(3000)