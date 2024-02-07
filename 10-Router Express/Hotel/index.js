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
        const clienteAntiguo = await Cliente.findOne({dni: req.body.dni})
        
        if(clienteAntiguo) {
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
        if(clienteEditado) {
            res.send({mensaje: 'Cliente modificado', clienteEditado})
        } else {
            res.send({mensaje: 'Este cliente no está registrado'})
        }
    } catch (error) {
        res.send({mensaje: 'El cliente no ha podido modificarse', error})
    }
})


// Check in
app.put('/checkin', async (req, res) => {
    try {
        let {cliente, habitacion} = req.body
        const clienteReserva = await Cliente.findOne({dni: cliente})
        const habitacionSolicitada = await Habitacion.findOne({$and: [
            {number: habitacion}, {reservada: false}
        ]})
        
        
        if(clienteReserva.length === 0) {
            // Cliente no registrado
            res.send({mensaje: `El cliente ${cliente} no está registrado`})
        } else if (habitacionSolicitada.length === 0) {
            // Habitación no disponible
            res.send({mensaje: `La habitación ${habitacion} no está disponible`})
        } else {
            // Se crea la reserva
            let reserva = await Reserva.create({
                    cliente: clienteReserva._id,
                    habitacion: habitacionSolicitada._id,
                    fechaCheckIn: new Date,
                    fechaCheckOut: new Date
                })
            
            // La habitación se marca como reservada
            const habitacionReservada = await Habitacion.findOneAndUpdate(
                {number: habitacion}, 
                {$set: {reservada: true}}, 
                {new: true}
            )
            res.send({mensaje: `Habitación ${habitacion} reservada por ${cliente}`, reserva, habitacionReservada})
        }
    } catch (error) {
        res.send({mensaje: 'Error en la reserva', error})
    }
})

// Check out
app.put('/checkout', async (req, res) => {
    try {
        let {cliente} = req.body
        let clienteReserva = await Cliente.findOne({dni: cliente})
        let reserva = await Reserva.findOne({cliente: clienteReserva._id})  
             
        if(reserva.length === 0) {
            // Cliente sin reserva
            res.send({mensaje: `El cliente ${cliente} no tiene ninguna reserva`})
        } else {
            // Cambiar fecha de chekout  
            const reservaCheckOut = await Reserva.findOneAndUpdate(
                {cliente: clienteReserva._id}, 
                {$set: {fechaCheckOut: new Date}},
                {new: true}
            )
                
            // La habitación vuelve a estar disponible
            const habitacionID = reserva.habitacion.toString()
            
            const habitacionReservada = await Habitacion.findByIdAndUpdate(
                habitacionID, 
                {$set: {reservada: false}},
                {new: true}
            )

            res.send({mensaje: `Checkout realizado`, checkout: reservaCheckOut, habitacion: habitacionReservada})
        }
    } catch (error) {
        res.send({mensaje: 'Error en la reserva', error})
    }
})


app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})
