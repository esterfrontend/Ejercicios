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

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// Cors
const cors = require('cors')
const corsOptions = {
    origin: 'http://www.midominio.es',
    methods: 'GET, HEAD, POST, DELETE'
}
app.use(cors(corsOptions))


function mostrarIp(req, res, next) {
    console.log('IP: ', req.ip)
    next()
}
function mostrarRuta(req, res, next) {
    console.log('URL: ', req.url)
    next()
}

app.get('/', mostrarIp, mostrarRuta, (req, res)=> {
    res.send('Get')
})

app.post('/', mostrarIp, mostrarRuta,(req, res)=> {
    res.send('Post')
})


// app.put('/', mostrarIp, mostrarRuta,(req, res)=> {
//     const {primerPlato, segundoPlato, postre, precio} = req.body
//     const numero = req.params.id

//     connection.query('UPDATE `menu` SET primerPlato = ?, segundoPlato = ?, postre = ?, precio = ? WHERE numero = ?', [primerPlato, segundoPlato, postre, precio, numero], (err, results)=> {
//         err
//         ? res.send({mensaje: 'Hay un error en la petición', err})
//         : results.changedRows > 0
//             ? res.send({mensaje: 'Menú modificado', results})
//             : res.send({mensaje: 'No se ha podido modificar', results})
//     })
// })

// app.delete('/', mostrarIp, mostrarRuta,(req, res)=> {
//     connection.query('DELETE FROM `menu` WHERE numero = ?', [req.params.id], (err, results)=> {
//         err
//         ? res.send({mensaje: 'Hay un error en la petición', err})
//         : results.changedRows > 0
//             ? res.send({mensaje: 'Menú eliminado', results})
//             : res.send({mensaje: 'No se ha podido eliminar', results})
//     })
// })



app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})