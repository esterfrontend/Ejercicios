const express = require('express')
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const bcrypt = require('bcrypt')

// Conect to BBDD
let client = new MongoClient('mongodb://127.0.0.1:27017');
async function connectToMongo() {
    try {
        await client.connect().then((client)=>app.locals.db=client.db('ejercicios'))
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar MongoDB:', error);
    }
}
connectToMongo()

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(mostrarIpYRuta)


// Cors
const corsOptions = {
    origin: 'http://www.midominio.es',
    methods: 'GET, HEAD, POST, DELETE'
}
app.use(cors(corsOptions))


app.get('/', async (req, res)=> {
    try {
        const results = await app.locals.db.collection('usuarios').find({}).toArray();
        res.send({mensaje: 'Hola desde el GET', results})
    }
    catch (error) {
        res.send({error})
    }
})

app.post('/registro', async (req, res)=> {
    try {
        const contrasenya = bcrypt.hashSync(req.body.password, 10)
        const results = await app.locals.db.collection('usuarios').insertOne({
            username: req.body.username,
            password: contrasenya
        })
        res.send({mensaje: 'Hola desde el POST', results})
    }
    catch (error) {
        res.send({error})
    }
})

app.put('/editar', async (req, res)=> {
    try {
        console.log('body: ', req.body)
        const contrasenya = bcrypt.hashSync(req.body.password, 10)
        console.log('pass:', contrasenya)
        const results = await app.locals.db.collection('usuarios').updateOne({username: req.body.username}, {$set: {password: contrasenya}})
        res.send({mensaje: 'Usuario modificado', results})
    }
    catch (error) {
        res.send({error})
    }
})

app.delete('/eliminar', async (req, res)=> {
    try {
        const results = await app.locals.db.collection('usuarios').deleteOne({username: req.body.username});
        res.send({mensaje: 'Usuario eliminado', results})
    }
    catch (error) {
        res.send({error})
    }
})

app.post('/login', async (req, res) => {
    try {
        let user = await app.locals.db.collection('usuarios').findOne({ username: req.body.username })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            res.send({ mensaje: 'Logueado correctamente' })
        } else {
            res.send({ mensaje: 'Usuario o contraseña incorrectos' })
        }
    } catch (error) {
        res.send({ mensaje: "Error al registrar al usuario", error })
    }
})

function mostrarIpYRuta(req, res, next) {
    console.log({
        Method: req.method,
        IP: req.ip, 
        URL: req.url
    })
    next()
}

app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})