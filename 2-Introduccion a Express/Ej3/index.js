const express = require('express')

const app = express()

const names = ['Javi', 'Isa', 'Pablo', 'Ceci', 'Jorge']

app.get('/persona', function(req, res) {
    let people = names[0]
    for(let i = 1; i < names.length; i++) {
        people += ', ' + names[i]
    }
    res.send(people)
})

app.get('/persona/:parametro', function(req, res) {
    const param = req.params.parametro
    const numberParam = Number(param)
    if(numberParam < 0 || numberParam >= names.length || !numberParam) res.send('El parámetro no es correcto')
    res.send(names[numberParam])
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})