const mongoose = require('mongoose')

const currentYear = new Date().getFullYear()

const discoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: {
        type: String,
        required: [true, 'Título del disco obligatorio']
    },
    artista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artista',
        requires: [true, 'Artista del disco obligatorio']
    },
    anyo: {
        type: Number,
        required: [true, 'Año del disco obligatorio'],
        min: [1887, 'El año debe ser superior a 1887'],
        max: [currentYear, `El año no puede ser superior al actual: ${currentYear}`]
    },
    genero: String,
    stock: {
        type: Number,
        required: [true, 'Stock obligatorio'],
        min: 0
    },
    formato: String
})


const artistasSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: [true, 'Nombre del artista obligatorio']
    },
    genero: {
        type: String,
        required: [true, 'Género del artista obligatorio']
    },
    fechaNacimiento: Date,
    nacionalidad: {
        type: String,
        required: [true, 'Nacionalidad del artista obligatoria']
    },
    nombreArtistico: String
})

let Artista = mongoose.model('artista', artistasSchema)
let Disco = mongoose.model('disco', discoSchema)

module.exports = {Artista, Disco}