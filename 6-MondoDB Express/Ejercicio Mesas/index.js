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

app.get('/api/mesas', async (req, res) => {
    try {
        const results = await app.locals.db.collection('mesas').find({}).toArray();
        res.send({mensaje: "Estos son los resultados: ", results});
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/api/anyadir', async (req, res)=>{
    try {
        let {tamanyo, color, material, patas} = req.body

        const results = await app.locals.db.collection('mesas').insertOne({tamanyo, color, material, patas})
        res.send({mensaje: "Nueva mesa añadida.", results})
        
    } catch (error) {
        console.error('Error en la petición')
        res.status(500).send('Internal Server Error')
    }
})

app.put('/api/modificar/:color', async(req,res)=>{
    try {
        const results = await app.locals.db.collection('mesas').updateMany(
            {color: req.params.color},
            {$set: {color: "granate"}}
        )
        res.send({mensaje: "Mesas modificadas.", results})        
    } catch (error) {
        console.error('Error en la peticion')
        res.status(500).send('Internal Server Error')
    }
})

app.delete('/api/eliminar/:patas', async (req, res) => {
    try {
        const results = await app.locals.db.collection('mesas').deleteMany(
            {patas: parseInt(req.params.patas)}
        );
        res.send({mensaje: "Mesas eliminadas.", results});
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