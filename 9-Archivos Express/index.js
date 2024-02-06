const express = require('express')
const app = express();
const fs = require('fs')
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(fileUpload({createParentPath: true, safeFileNames: true, preserveExtension: true}))
app.use('/fotos', express.static('files'));


app.post('/subir', (req, res) => {
    if(!req.files) {
        res.send({message: 'No hay archivo'})
    } else {
        const file = req.files.file
        const md5 = file.md5
        const fileName = md5 + file.name
        file.mv('./files/' + fileName)
        
        res.send({
            message: 'Archivo subido',
            data: {
                name: fileName
            }
        })
    }
})

app.get('/descarga/:file', (req, res) => {
    res.download('./files/' + req.params.file)
})

app.get('/imagenes', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if(err) {
            res.send('Error leyendo los archivos.', err)
        } else {
            const imgPaths = files.map((file) => {
                return {
                    url : `http://localhost:3000/fotos/${file}`,
                    name : file
                }
            })
            res.send(imgPaths)
        }
    })
})



app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})