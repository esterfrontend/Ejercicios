let factorial = require('./funciones/factorial')
let supervillains = require('supervillains')

const allSupervillains = supervillains.all

for(let i = 0; i < 4; i++) {
    const getRandomNumber = (max, min) => {
        return Math.floor((Math.random() * max) + min)
    }

    const randomNumber = getRandomNumber(5, 1)
    const numberOfVillain = factorial(randomNumber)
    console.log(allSupervillains[numberOfVillain])
}
