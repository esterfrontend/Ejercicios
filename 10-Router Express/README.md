# RESERVAS DE HOTEL

## Registro de nuevo usuario
Nombre, apellido y DNI (sin letra) son campos obligatorios que deben pasarse en el body.
La petición se realiza mediante el método POST en la url "/registro".
Si la petición es correcta, revisa si el DNI ya existe en la BBDD, si no existe guardará el nuevo cliente en la BBDD. En caso de que ya exista, devolverá el error.