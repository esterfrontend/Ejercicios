# RESERVAS DE HOTEL

## Registro de nuevo usuario
La petición se realiza mediante el **método POST** en la **ruta "/usuarios/registro"** y crea un nuevo usuario.

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
```

Se comprueba que el cliente no existe previamente en la BBDD, si no existe guardará el nuevo cliente. En caso de que ya exista, devolverá error indicando la razón.


## Editar cliente
La petición se realiza mediante el **método PUT** en la **ruta "/usuarios/editar-cliente"** y modifica un cliente existente.

Podrán editarse tanto nombre como apellidos, el DNI no es editable.

Se le debe pasar en el body el DNI del cliente al que queremos modificar y los datos a modificar. Ejemplo:

```json
{
    "nombre": "Juan",
    "apellido": "López",
    "dni": 79243574
}
```

Se comprueba que el cliente existe en la BBDD, si existe hará las modificaciones. En caso de que no exista, devolverá error indicando la razón.


## Check in
La petición se realiza mediante el **método PUT** en la **ruta "/usuarios/checkin"** y crea una nueva reserva a nombre de un usuario ya registrado.

Se le debe pasar en el body el DNI del cliente que realiza la reserva y el número de la habitación que desea reservar. Ejemplo:
```json
{
    "cliente": 79243574,
    "habitacion": 102
}
```

Se comprueba que el cliente ya esté registrado y que la habitación está libre. Si todo es correcto, se crea una nueva reserva con la fecha de ese mismo momento y la habitación se marca como reservada.
Si ocurre cualquier error, devolverá un error indicando la razón.


## Check out
La petición se realiza mediante el **método PUT** en la **ruta "/usuarios/checkout"** y finaliza una reserva a nombre de un usuario.

Se le debe pasar en el body el DNI del cliente. Ejemplo:
```json
{
    "cliente": 79243574
}
```

Se comprueba que el cliente tiene una reserva. Si todo es correcto, la reserva se marca como finalizada a fecha de ese mismo momento y la habitación queda libre.
Si ocurre cualquier error, devolverá un error indicando la razón.
