const express = require('express')

const app = express()

const person = {
    name : 'Ester',
    lastName: 'Martínez',
    age: '32'
}

app.get('/name/:name', function(req, res) {
    person.name = req.params.name
    res.send(person)
})

app.get('/lastname/:lastname', function(req, res) {
    person.lastName = req.params.lastname
    res.send(person)
})

app.get('/age/:age', function(req, res) {
    person.age = req.params.age
    res.send(person)
})


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})