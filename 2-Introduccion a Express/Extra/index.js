const express = require('express')
const { showProducts, createDocument } = require('./functions')

const app = express()


const almacen = [
    {
        0: {
            name: 'Bel-Air',
            price: '80,10',
            stock: 3
        },
        1: {
            name: 'Coconut',
            price: '103,05',
            stock: 5
        },
        2: {
            name: 'Arthur',
            price: '89,10',
            stock: 2
        },
        3: {
            name: 'Venice',
            price: '103,05',
            stock: 5
        },
    },
    {
        0: {
            name: 'Lincoln',
            price: '51,92',
            stock: 2
        },
        1: {
            name: 'Wichita',
            price: '51,92',
            stock: 4
        },
        2: {
            name: 'Indigo',
            price: '58,41',
            stock: 3
        },
        3: {
            name: 'Tennessee',
            price: '64,90',
            stock: 0
        },
    },
]

const cesta = []

app.get('/zapatillas', function(req, res) {
    // showProducts(almacen[0])
    const showTable = () => {
        createDocument()
        // showProducts(almacen[0])
    }
    res.send(showTable())
})

app.get('/sudaderas', function(req, res) {
    res.send(almacen[1])
})

app.get('/zapatillas/:name/:quantity', function(req, res) {
    const name = req.params.name
    let quantityParam = req.params.quantity
    let quantity = Number(quantityParam)
    let stock = 0
    for(productKey in almacen[0]) {
        const product = almacen[0][productKey]
        if (product.name === name) {
            stock = product.stock
            break;
        }
    }

    if(cesta.length !== 0) {
        for(productKey in cesta) {
            const productInCart = cesta[productKey]
            if (productInCart.name === name) {
                // console.log('quantity', quantity)
                // console.log('quantity: ', quantity += productInCart.quantity)
                quantity += productInCart.quantity
                break;
            }
        }
    }

    cesta.push({
        name,
        quantity
    })
    
    if(Number(quantity) > stock) {
        res.send(`Solo hay disponibles ${stock} productos.`)
    }

    res.send(cesta)
})


app.listen(3000)