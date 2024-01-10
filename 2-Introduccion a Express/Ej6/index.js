const express = require('express')

const app = express()

const students = ['Marina', 'Nuria', 'Víctor', 'Antonio', 'Santiago', 'María', 'Gloria', 'Mildry', 'Ester']

app.get('/:newname', function(req, res) {
    const newName = req.params.newname
    students.push(newName)
    res.send(students)
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})