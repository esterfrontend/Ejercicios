const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())

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

app.use(express.static('public'))

app.get('/api/series', async (req, res) => {
    try {
        const results = await app.locals.db.collection('series').find({}).toArray();
        res.send({ mensaje: "Estas son las series en la base de datos: ", results });
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/api/:serie', async (req, res) => {
    try {
        const results = await app.locals.db.collection('series').find({nombre : req.params.serie}).toArray();
        results.length > 0
            ? res.send({ mensaje: "Esta es la serie que buscas: ", results })
            : res.send({ mensaje: "No tenemos esa serie en nuestra base de datos." })
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/api/nuevaSerie', async (req, res)=>{
    try {
        const {nombre, plataforma, nota} = req.body
        const results = await app.locals.db.collection('series').insertOne({nombre, plataforma, nota})
        res.send({mensaje: "Nueva serie añadida.", results})
    } catch (error) {
        console.error('Error en la petición')
        res.status(500).send('Internal Server Error')
    }
})

app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})