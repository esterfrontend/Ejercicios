const express = require('express')
const almacen = require('./almacen')

const app = express()


const cesta = []

app.get('departamento/:department', function(req, res) {
    res.send(showProducts(req.params.department))
})

app.get('/comprar/:department/:name/:quantity', function(req, res) {
    const {department, name, quantity} = req.params
    
    const indexDepartment = almacen.findIndex(dep => dep.name === department)
    if(indexDepartment < 0 ) {
        res.send(`El departamento ${department} no existe`)
        return
    }

    const indexProduct = almacen[indexDepartment].products.findIndex(prod => prod.name === name)
    if(indexProduct < 0 ) {
        res.send(`El producto ${name} no existe`)
        return
    }
    
    const product = almacen[indexDepartment].products[indexProduct];

    if(quantity > product.stock) {
        res.send(`Solo hay disponibles ${product.stock} productos.`)
        return
    }

    product.stock -= quantity

    const price = product.price * quantity

    cesta.push({
        name,
        quantity,
        price
    })
    res.send(cesta)
})

app.get('/cesta', function(req, res) {
    res.send(cesta)
})

app.get('/checkout', function(req, res) {
    let total = 0
    cesta.forEach(el => {
        total += Number(el.price)
    });
    
    res.send(`Total: ${total}€`)
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