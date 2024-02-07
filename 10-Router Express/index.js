const express = require('express')
const app = express();
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



// Registro de nuevo cliente
app.post('/registro', async (req, res) => {
    try {
        const clienteAntiguo = await Cliente.find({dni: req.body.dni})
        
        if(clienteAntiguo.length > 0) {
            res.send({mensaje: 'Este cliente ya está registrado', clienteAntiguo})
        } else {
            const clienteNuevo = await Cliente.create(req.body)
            res.send({mensaje: 'Cliente registrado', clienteNuevo})
        }
    } catch (error) {
        res.send({mensaje: 'El cliente no se ha registrado', error})
    }
})


// Editar cliente
app.put('/editar-cliente', async (req, res) => {
    try {
        const clienteEditado = await Cliente.findOneAndUpdate(
            {dni: req.body.dni}, 
            req.body, 
            {new: true}
        )
        res.send({mensaje: 'Cliente modificado', clienteEditado})
    } catch (error) {
        res.send({mensaje: 'El cliente no ha podido modificarse', error})
    }
})


// Reservar habitación
app.put('/reservar', async (req, res) => {
    try {
        let {cliente, habitacion} = req.body
        const clienteReserva = await Cliente.find({dni: cliente})
        const habitacionReservada = await Habitacion.find({$and: [
            {number: habitacion}, {reservada: false}
        ]})
        
        
        if(clienteReserva.length === 0) {
            // Cliente no registrado
            res.send({mensaje: `El cliente ${cliente} no está registrado`})
        } else if (habitacionReservada.length === 0) {
            // Habitación no disponible
            res.send({mensaje: `La habitación ${habitacion} no está disponible`})
        } else {
            // Todo bien
            const reserva = await Habitacion.findOneAndUpdate(
                {number: habitacion}, 
                {$set: {reservada: true}}, 
                {new: true}
            )
            res.send({mensaje: `Habitación ${habitacion} reservada por ${cliente}`, reserva})
        }
        res.end()
    } catch (error) {
        res.send({mensaje: 'Error en la reserva', error})
    }
})



app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})

// {
//     "nombre": "Lucía",
//     "apellido": "Hernandez",
//     "dni": 71961412
// }

// {
//     "number": 101,
//     "reservada": false
// }

// {
//     "cliente" : 74931718,
//     "number": 101
// }