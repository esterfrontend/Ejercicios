const mongoose = require('mongoose')

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        min: 3,
        required: true
    },
    apellido: {
        type: String,
        min: 3,
        required: true
    },
    dni: {
        type: Number,
        min: 8,
        required: true
    }
})

const habitacionSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    reservada: {
        type: Boolean,
        required: true
    }
})

const reservaSchema = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente',
        required: true
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habitacion',
        required: true
    },
    fechaCheckIn: {
        type: Date,
        required: true
    },
    fechaCheckOut: {
        type: Date,
        required: true
    }
})


let Cliente = mongoose.model('cliente', clienteSchema)
let Habitacion = mongoose.model('habitacion', habitacionSchema, 'habitaciones')
let Reserva = mongoose.model('reserva', reservaSchema)

module.exports = {Cliente, Habitacion, Reserva}