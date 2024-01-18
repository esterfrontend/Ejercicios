fetch('https://gutendex.com//books')
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)

        const containerBooks = document.querySelector('#books')

        data.results.forEach((book) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = book.formats['image/jpeg'];

            const containerDiv = document.createElement('div');
            containerDiv.classList.add('container');

            const title = document.createElement('h3');
            title.textContent = book.title;

            const authors = document.createElement('p');
            let authorsList = ''
            book.authors.forEach((author, i, arr) => {
                const authorArr = author.name.split(',')
                const authorName = `${authorArr[1]} ${authorArr[0]}`
                if(arr.length === 1) {
                    authorsList = authorName
                } else { 
                    if(i < arr.length - 1) {
                        authorsList += authorName + ','
                    } else {
                        authorsList += authorName
                    }
                }
            })
            authors.textContent = authorsList;

            containerBooks.appendChild(card);
            card.appendChild(img);
            card.appendChild(containerDiv);
            containerDiv.appendChild(title);
            containerDiv.appendChild(authors);
        })
    })