# Práctica 10. Mongoose y Populations

## Desarrollo de Sistemas Informáticos. 
## ETSII ULL Grado de Informática.


A los requisitos de la práctica CSV usando MongoDB anterior, le añadimos una colección de usuarios: un usuario tiene un nombre y varios (no mas de cuatro) ejemplos. 
Cada ejemplo pertenece a un único usuario.

La secuencia de pasos debe ser parecida a esta:
* Inicialmente se solicita se rellene en la vista de entrada el nombre de usuario.
* Cuando se rellena el cliente hace un request Ajax al servidor.
* El servidor busca dicho nombre en la colección de usuarios y si no lo encuentra crea un nuevo usuario y lo guarda en la base de datos. Su colección de ejemplos asociada es vacía.
* En cualquier caso el servidor responde al request con los nombres de los ejemplos asociados con dicho usuario.
* El cliente muestra los botones con los ejemplos de dicho usuario.
* No se pide ninguna forma de autenticación en esta práctica.
* El resto de botones y conductas es como en la práctica anterior.



## Requisitos Práctica anterior:

* Añadir un botón guardar. Cuando se hace click en dicho botón se guarda la entrada actual en una base de datos MongoDB.
    * El contenidode la entrada actual se guarda con un nombre que se solicita previamente al usuario.
    * Usaremos Mongoose para acceder a la base de datos.
* Sólo se guardan hasta un límite de cuatro ejemplos en la Base de Datos. Cuando el número excede del límite se borra uno de los anteriores y se guarda la nueva entrada.
* Botones de selección de ejemplo.
    * Tantos botones como registros hay en la Base de Datos.
    * Al hacer click en uno de estos botones se carga el ejemplo con ese nombre desde la base de datos en la textarea de entrada.
* Despliegue en Cloud9.

--------

## Conceptos

### ECMA6
* Funciones de dirección. Sintaxis más corta en comparación con las expresiones de función.
* Plantillas literales de strings que permiten expresiones incrustadas.
* Se pueden utilizar cadenas multilínea e interpolación de cadenas con cadenas de la plantilla.
* Diferencia entre let y var.
Cuando let se utiliza dentro de un bloque, el alcance de los límites de la variable para ese bloque. El alcance de var está dentro de la función en la que se declara.

`let name = "Bob", time = "today";`

`Hello ${name}, how are you ${time}?`

### MongoDB

`$ mkdir data`

`$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod`

`$ chmod a+x mongod`

--------

### ENLACES DE INTERÉS:
### Enlace al campus de la asignatura

* [Desarrollo de Sistemas Informáticos](https://campusvirtual.ull.es/my/)


### Repositorios en github.io

* [Repositorio de la práctica en la organización](https://github.com/ULL-ESIT-GRADOII-DSI/mongoose-y-populations-josue-nayra-dsi15-16-1)
* [Fork del repositorio](https://github.com/JosueTC94/mongoose-y-populations-josue-nayra-dsi15-16-1)


### Despliegue de la práctica

* [Cloud 9](https://practica10dsi-mongoose-populations-josuetc94.c9users.io/)
* [Workspace](https://ide.c9.io/josuetc94/practica10dsi_mongoose_populations)

--------

### AUTORES: 
### Páginas personales de gh-pages:

* [Josué Toledo Castro](http://josuetc94.github.io/)
* [María Nayra Rodríguez Pérez](http://alu0100406122.github.io/)


