# RESERVAS DE HOTEL

## Registro de nuevo usuario
Campos necesarios:
- Nombre
- Apellido
- DNI (sin letra)

Todos los campos son obligatorios y deben pasarse en el body. Ejemplo:

```json
{
    "nombre": "María",
    "apellido": "García",
    "dni": 79243574
}
````

La petición se realiza mediante el **método POST** en la **url "/registro"**.

Se comprueba que el cliente no existe previamente en la BBDD, si no existe guardará el nuevo cliente. En caso de que ya exista, devolverá error indicando la razón.


## Editar cliente
Podrán editarse tanto nombre como apellidos, el DNI no es editable.

La petición se realiza mediante el **método PUT** en la **url "/editar-cliente"**.

Se le debe pasar en el body el DNI del cliente al que queremos modificar y los datos a modificar. Ejemplo:

```json
{
    "nombre": "Juan",
    "apellido": "López",
    "dni": 79243574
}
````

Se comprueba que el cliente existe en la BBDD, si existe hará las modificaciones. En caso de que no exista, devolverá error indicando la razón.


## Check in

