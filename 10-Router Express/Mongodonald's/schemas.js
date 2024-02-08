const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    nombre: {
        type: String,
        min: 3,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
})

const hamburguesaSchema = mongoose.Schema({
    nombre: {
        type: String,
        min: 3,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
})

const bebidaSchema = mongoose.Schema({
    nombre: {
        type: String,
        min: 3,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
})

const patataSchema = mongoose.Schema({
    nombre: {
        type: String,
        min: 3,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
})

const pedidoSchema = mongoose.Schema({
})


let Menu = mongoose.model('menu', menuSchema)
let Hamburguesa = mongoose.model('hamburguesa', hamburguesaSchema)
let Bebida = mongoose.model('bebida', bebidaSchema)
let Patata = mongoose.model('patata', patataSchema)
let Pedido = mongoose.model('pedido', pedidoSchema)

module.exports = {Menu, Hamburguesa, Bebida, Patata, Pedido}