let user = require('./user')

let countries = []
countries = user.paises.a.concat(user.paises.b, user.paises.b)

let favoriteCountries = []
user.favoritos.forEach(favorite => {
    if(countries[favorite]) {
        favoriteCountries.push(countries[favorite])
    }
});

console.log(favoriteCountries)