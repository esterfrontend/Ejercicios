fetch('http://xkcd.com/614/info.0.json', { mode: 'no-cors' })
    .then((data) => {
        console.log(data)
    })

    // No he conseguido obtener los datos