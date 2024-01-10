const express = require('express')

const app = express()

app.get('/:number', function(req, res){
    const number = req.params.number
    if(!Number(number)) res.send('Escribe un número')

    const randomNumber = Math.floor((Math.random() * Number(number)) + 1)
    res.send(randomNumber.toString())
})


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})