const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express();
const mysql = require('mysql')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
})

connection.connect((e) => {
    e
        ? console.error("No se ha podido conectar a MySQL")
        : console.log("MySQL conectado")
})

app.use(express.static('public'))


app.get('/api/menus', (req, res)=> {
    connection.query('SELECT * FROM `menu`', (err, results) => {
        err
        ? res.send({mensaje: 'Hay un error en la petición', err})
        : results.length > 0
            ? res.send({mensaje: 'Estos son los resultados', results})
            : res.send({mensaje: 'No se han encontrado resultados', results})
    })
})

app.post('/api/nuevoMenu/', (req, res)=> {
    connection.query('INSERT INTO `menu` SET ?', [req.body], (err, results) => {
        err
        ? res.send({mensaje: 'Hay un error en la petición', err})
        : results.insertId != null
            ? res.send({mensaje: 'Menú añadido', results})
            : res.send({mensaje: 'No se ha podido insertar', results})
    })
})


app.put('/api/editarMenu/:id', (req, res)=> {
    const {primerPlato, segundoPlato, postre, precio} = req.body
    const numero = req.params.id

    connection.query('UPDATE `menu` SET primerPlato = ?, segundoPlato = ?, postre = ?, precio = ? WHERE numero = ?', [primerPlato, segundoPlato, postre, precio, numero], (err, results)=> {
        err
        ? res.send({mensaje: 'Hay un error en la petición', err})
        : results.changedRows > 0
            ? res.send({mensaje: 'Menú modificado', results})
            : res.send({mensaje: 'No se ha podido modificar', results})
    })
})

app.delete('/api/borrarMenu/:id', (req, res)=> {
    connection.query('DELETE FROM `menu` WHERE numero = ?', [req.params.id], (err, results)=> {
        err
        ? res.send({mensaje: 'Hay un error en la petición', err})
        : results.changedRows > 0
            ? res.send({mensaje: 'Menú eliminado', results})
            : res.send({mensaje: 'No se ha podido eliminar', results})
    })
})



app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})