const express = require('express')

const app = express()

const person = {
    name : 'Ester',
    lastName: 'Martínez',
    age: '32'
}

app.get('/name=:name', function(req, res) {
    const name = req.params.name
    person.name = name
    res.send(person)
})

app.get('/lastname=:lastname', function(req, res) {
    const lastName = req.params.lastname
    person.lastName = lastName
    res.send(person)
})

app.get('/age=:age', function(req, res) {
    const age = req.params.age
    person.age = age
    res.send(person)
})

app.listen(3000)