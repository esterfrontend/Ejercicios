const randomCharacter = Math.floor((Math.random() * 500) + 130)

fetch(`https://api.disneyapi.dev/character/${randomCharacter}`)
    .then((res) => res.json())
    .then(({data}) => {
        const image = document.querySelector('#image')
        if(data.imageUrl) {
            image.src = data.imageUrl
        } else {
            image.src = ''
            image.alt = 'Imagen no disponible'
        }
        
        const name = document.querySelector('#name')
        name.textContent = data.name
        
        const id = document.querySelector('#id')
        id.textContent = data['_id']

        if(data.films.length !== 0) {
            const films = document.querySelector('#filmsList')
            data.films.forEach((film) => {
                const filmItem = document.createElement('li');
                filmItem.textContent = film
                films.appendChild(filmItem);
            })
        } else {
            document.querySelector('.films').style.display = 'none'
        }
    })