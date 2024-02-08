const express = require('express')
const app = express();
const router = require('./routes/routes')
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose')
const {Cliente, Habitacion, Reserva} = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017/hotel')
    .then(console.log('MongoDB está conectado'))
    .catch(e => {
        console.log('MongoDB no conectado: ' + e)
    })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/usuarios', router)



app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})
