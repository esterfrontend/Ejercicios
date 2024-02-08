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


app.get('/menu', async (req, res) => {
    try {
        const menu = await Menu.find()
        const bebida = await Bebida.find()
        const patatas = await Patata.find()
        res.send({menu, bebida, patatas })
    } catch (error) {
        res.send({mensaje: 'Error', error})
    }
})

app.get('/hamburguesa', async (req, res) => {
    try {
        const hamburguesa = await Hamburguesa.find()
        const patatas = await Patata.find()
        res.send({hamburguesa, patatas})
    } catch (error) {
        res.send({mensaje: 'Error', error})
    }
})

app.get('/bebida', async (req, res) => {
    try {
        const bebida = await Bebida.find()
        res.send({mensaje: 'Bebida:', bebida})
    } catch (error) {
        res.send({mensaje: 'Error', error})
    }
})

app.post('/terminar-pedido', async (req, res) => {
    try {
        const pedido = await Pedido.create(req.body.pedido)
        res.send({mensaje: "Pedido: ", pedido})
    } catch (error) {
        res.send({mensaje: 'Error', error})
    }
})

app.put('/editar-pedido/:id', async (req, res) => {
    try {
        const pedido = await Pedido.updateOne(
            {numero: req.params.id}, 
            {$set: {articulos: req.body.articulos}})
        res.send({mensaje: "Pedido modificado: ", pedido})
    } catch (error) {
        res.send({mensaje: 'Error', error})
    }
})




app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})
