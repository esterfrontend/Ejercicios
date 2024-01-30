const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

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

app.get('/api/libros', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').find({}).toArray();
        res.send(muestraLibros(results));
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/api/libros/:titulo', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').find({titulo : req.params.titulo}).toArray();
        res.send({mensaje: "Aquí tienes el libro: ", results});
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/api/nuevoLibro/:titulo', async (req, res)=>{
    try {
        const results = await app.locals.db.collection('libros').insertOne({titulo: req.params.titulo, leido: false})
        res.send({mensaje: "Libro añadido.", results})
    } catch (error) {
        console.error('Error en la petición')
        res.status(500).send('Internal Server Error')
    }
})

app.put('/api/editarLibro/:titulo', async(req,res)=>{
    try {
        const results = await app.locals.db.collection('libros').updateOne({titulo: req.params.titulo}, {$set: {leido: true}})
        res.send({mensaje: "Libro leído.", results})        
    } catch (error) {
        console.error('Error en la peticion')
        res.status(500).send('Internal Server Error')
    }
})

app.delete('/api/borrarLibro/:titulo', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').deleteOne({titulo: req.params.titulo});
        res.send({mensaje: "Libro eliminado.", results});
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
})

const muestraLibros = (libros) => {
    let lista = ''
    libros.forEach(libro => lista += 
        `<li>
            ${libro.titulo}
            <form action="/leer" method="post">
                <input type="text" hidden name="titulo" value="${libro.titulo}" id="titulo">
                <button type="submit">Marcar como leído</button>
            </form>
            <form action="/leer" method="post">
                <input type="text" hidden name="titulo" value="${libro.titulo}" id="titulo">
                <button type="submit">Marcar como leído</button>
            </form>
        </li>`)
    return `<ul>${lista}</ul>`
}


app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})