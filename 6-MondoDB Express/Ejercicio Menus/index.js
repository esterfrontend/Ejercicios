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

app.get('/api/menus', async (req, res) => {
    try {
        const results = await app.locals.db.collection('menus').find({}).toArray();
        res.send({ mensaje: "Menús: ", results });
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/api/nuevoMenu', async (req, res)=>{
    try {
        const {numero, primerPlato, segundoPlato, postre, precio} = req.body
        const results = await app.locals.db.collection('menus').insertOne({numero, primerPlato, segundoPlato, postre, precio})
        const menus = await app.locals.db.collection('menus').find({}).toArray();
        res.send({mensaje: "Nueva serie añadida.", results, menus})
    } catch (error) {
        console.error('Error en la petición')
        res.status(500).send('Internal Server Error')
    }
})

app.put('/api/editarMenu', async(req,res)=>{
    try {
        const {numero, primerPlato, segundoPlato, postre, precio} = req.body
        const results = await app.locals.db.collection('menus').updateOne(
            {numero: parseInt(numero)}, 
            {$set: {primerPlato, segundoPlato, postre, precio: parseInt(precio)}})
        const menus = await app.locals.db.collection('menus').find({}).toArray();
        res.send({mensaje: "Menús", results, menus})
    } catch (error) {
        console.error('Error en la peticion')
        res.status(500).send('Internal Server Error')
    }
})

app.delete('/api/borrarMenu', async (req, res) => {
    try {
        const results = await app.locals.db.collection('menus').deleteOne({numero: parseInt(req.body.numero)});
        res.send({mensaje: "Eliminado.", results});
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})


app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})