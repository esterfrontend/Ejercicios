fetch('https://rickandmortyapi.com/api/location')
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.results)

        const container = document.querySelector('#select-planet')
        const select = document.createElement('select')
        select.classList.add('select');
        container.appendChild(select);
        const option = document.createElement('option')
        option.textContent = 'Selecciona un planeta'
        option.setAttribute('selected', 'true')
        option.setAttribute('disabled', 'true')
        select.appendChild(option);

        const planets = []
        data.results.forEach(element => {
            if(element.type === 'Planet') {
                const option = document.createElement('option')
                option.value = element.name
                option.textContent = element.name
                select.appendChild(option);
                planets.push(element.name)
            }
        })
        console.log(planets)
        
        select.addEventListener("change", function() {
            // console.log(`${select.value} ha sido selecionado`)
            const charactersContainer = document.querySelector('#characters')

            // Reseteo
            while(charactersContainer.firstChild) {
                charactersContainer.removeChild(charactersContainer.firstChild)
            }

            //Creo
            const title = document.createElement('h3')
            title.textContent = 'Personajes que estuvieron allí:'
            charactersContainer.appendChild(title);
            

            fetch('https://rickandmortyapi.com/api/character')
                .then((res) => res.json())
                .then((data) => {
                    const charactersInPlanet = []

                    data.results.forEach(element => {
                        if(element.location.name === select.value) {
                            const item = document.createElement('p')
                            item.classList.add('character')
                            item.textContent = element.name

                            charactersContainer.appendChild(item);

                            charactersInPlanet.push(element.name)
                        }

                    })
                    
                    if(charactersInPlanet.length === 0) {
                        const text = document.createElement('p')
                        text.textContent = `Nadie ha estado en ${select.value}.`

                        charactersContainer.appendChild(text);
                    }
                })
        });
    })
