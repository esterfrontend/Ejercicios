const express = require('express')
const almacen = require('./almacen')

const app = express()


const cesta = []

app.get('/:department', function(req, res) {
    res.send(showProducts(req.params.department))
})

app.get('/:department/:name/:quantity', function(req, res) {
    const {department, name, quantity} = req.params
    const quantityNumber = Number(quantity)
    
    const indexDepartment = almacen.findIndex(dep => dep.name === department)
    const indexProduct = almacen[indexDepartment].products.findIndex(prod => prod.name === name)
    const product = almacen[indexDepartment].products[indexProduct];


    if(quantityNumber > product.stock) {
        res.send(`Solo hay disponibles ${product.stock} productos.`)
    } else {
        cesta.push({
            name,
            quantity: quantityNumber
        })
        res.send(cesta)   
    }
})


const showProducts = (department) => {
    let table = ''
    
    let index = almacen.findIndex(dep => dep.name === department)
    
    if(index === -1) return 'Ese departamento no existe'

    almacen[index].products.forEach(producto => {
        table += `<tr><td>${producto.name}</td><td>${producto.price}</td><td>${producto.stock}</td></tr>`
    });
    
    return `<table>${table}</table>`
}


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor conectado a puerto:' + (process.env.PORT || 3000))
})