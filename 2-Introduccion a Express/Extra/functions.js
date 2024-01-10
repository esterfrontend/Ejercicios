const createDocument = () => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tienda</title>
    </head>
    <body>
        <table id="productsTable">
            <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            </tr>
        </table>
    </body>
    </html>
    `
}

const showProducts = (products) => {
    const table = document.getElementById("productsTable");

    for (product in products) {
        console.log(product.name)
        const row = table.insertRow();

        const rowName = row.insertCell(0);
        const rowPrice = row.insertCell(1);
        const rowStock = row.insertCell(2);

        rowName.innerHTML = product.name;
        rowPrice.innerHTML = product.price;
        rowStock.innerHTML = product.stock;
    }
}

module.exports.showProducts = showProducts
module.exports.createDocument = createDocument