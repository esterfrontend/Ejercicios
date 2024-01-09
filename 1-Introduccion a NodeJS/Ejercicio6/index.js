const factorial = require('./funciones/factorial')
const supervillains = require('supervillains')


for(let i = 0; i < 4; i++) {
    const numberOfVillain = factorial(Math.floor((Math.random() * 5) + 1))
    console.log(supervillains.all[numberOfVillain])
}
