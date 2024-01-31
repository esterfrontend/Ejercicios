const express = require('express')
const mongoose = require('mongoose')
const {Artista, Disco} = require('./schemas')
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/ejercicios')
    .then(console.log('MongoDB está conectado'))
    .catch(e => {
        console.log('MongoDB no conectado: ' + e)
    })


// 1. Recibir la lista entera de discos en stock

app.get('/discos', async (req, res) => {
    try {
        let resultado = await Disco.find()
        res.send({mensaje: 'Aquí están los discos: ', resultado})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})


// 2. Recibir un disco en concreto que se pueda buscar por título o id

app.get('/buscar-disco/:busqueda', async (req, res) => {
    try {
        const busqueda = req.params.busqueda
        
        let resultado;
        
        if(mongoose.Types.ObjectId.isValid(busqueda)) {
            resultado = await Disco.findOne({_id : busqueda})
        } else {
            resultado = await Disco.findOne({titulo : busqueda})
        }
        
        resultado
            ? res.send({mensaje: 'Aquí están los discos: ', resultado})
            : res.send({mensaje: 'No existe el disco: ', busqueda})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})


// 3. Añadir un disco a la base de datos, los campos marcados con asterisco son obligatorios.

app.post('/nuevo-disco', async (req, res) => {
    try {
        const resultado = await Disco.create(req.body)

        res.send({mensaje: 'Disco eliminado: ', resultado})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})


// 4. Añadir un artista a la base de datos, los campos marcados con asterisco son obligatorios.

app.post('/nuevo-artista', async (req, res) => {
    try {
        const {nombre, genero, fechaNacimiento, nacionalidad, nombreArtistico} = req.body

        const nuevoArtista = new Disco({
            _id: new mongoose.Types.ObjectId(),
            nombre,
            genero,
            nacionalidad        
        })

        if(fechaNacimiento){
            nuevoDisco.fechaNacimiento = fechaNacimiento
        }
        if(nombreArtistico){
            nuevoDisco.nombreArtistico = nombreArtistico
        }

        nuevoArtista.save()
            .then(console.log('Disco añadido'))
            .catch((e) => console.log('Error en Disco', e))

        res.send({mensaje: 'Disco eliminado: ', resultado})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})


// 5. Actualiza la información de un disco o de un artista
app.put('/actualizar-disco', async (req, res) => {
    try {
        let resultado = await Artista.findByIdAndUpdate(id, req.body)
        res.send({mensaje: 'Artista actualizado: ', resultado})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})

app.put('/actualizar-artista', async (req, res) => {
    try {
        let resultado = await Artista.findByIdAndUpdate(id, req.body)
        res.send({mensaje: 'Disco actualizado: ', resultado})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})


// 6. Borra un disco del almacén
app.delete('/borrar-disco', async (req, res) => {
    try {
        let resultado = await Disco.findOneAndDelete(req.body.id)
        res.send({mensaje: 'Disco eliminado: ', resultado})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})


// 7. Borra un artista de la base de datos

app.delete('/borrar-artista', async (req, res) => {
    try {
        let resultado = await Artista.findOneAndDelete(req.body.id)
        res.send({mensaje: 'Disco eliminado: ', resultado})
    } catch (error) {
        res.send({mensaje: 'Error: ', error})
    }
})


app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})