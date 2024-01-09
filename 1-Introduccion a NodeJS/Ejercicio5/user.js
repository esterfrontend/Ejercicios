let user = {
    favoritos : [1,3,5],
    paises: {
        a: ["albania", "andorra"],
        b: ["bélgica", "brasil"],
        c: ["canadá", "cuba"]
    },
    nombre: "Antonio",
}

let countries = []
for (element in user.paises) {
    countries = countries.concat(user.paises[element])
}

let favoriteCountries = []
user.favoritos.forEach(favorite => {
    if(countries[favorite]) {
        favoriteCountries.push(countries[favorite])
    }
});

module.exports.favoriteCountries = favoriteCountries