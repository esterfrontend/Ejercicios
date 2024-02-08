const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose')
const {Menu, Hamburguesa, Bebida, Patata, Pedido} = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017/hamburgueseria')
    .then(console.log('MongoDB está conectado'))
    .catch(e => {
        console.log('MongoDB no conectado: ' + e)
    })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.get('/hamburguesa', async (req, res) => {
    try {
        const result = await Hamburguesa.find()
        res.send({mensaje: 'Hamburguesas:', result})
    } catch (error) {
        res.send({mensaje: 'Error', error})
    }
})

app.get('/patatas', async (req, res) => {
    try {
        const result = await Patata.find()
        res.send({mensaje: 'Patatas:', result})
    } catch (error) {
        res.send({mensaje: 'Error', error})
    }
})


app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})
