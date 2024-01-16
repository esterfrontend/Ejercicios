function mostrarPersonas(personas) {
    let table = ""
    for (let i = 0; i < personas.length; i++) {
        table += ` 
        <tr>
            <td>${personas[i].nombre}</td>
            <td>${personas[i].apellido}</td>
            <td>${personas[i].edad}</td>
        </tr>`    
    }

    return `
        <table>
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
        </tr>
        ${table}
        </table>`
}

fetch('/personas')
.then(response => response.json())
.then(personas => {
    document.getElementById("table").innerHTML = mostrarPersonas(personas)
})
