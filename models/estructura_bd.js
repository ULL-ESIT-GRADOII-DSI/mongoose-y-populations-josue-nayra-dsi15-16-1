    "use strict";
    console.log("Configurando MongoDB...");
    //Conexión con MongoDB
    const util = require('util');
    const mongoose = require('mongoose');
    
    mongoose.connect('mongodb://localhost/Practica10');
    
    const Schema = mongoose.Schema;
    
    const UserSchema = new Schema({
        nombre: String,
        apellidos: String
    });

    const TablaSchema = new Schema({
        entrada_tabla: String,
        nombre: String,
        descripcion: String,
        _creator: [{type: Schema.Types.ObjectId, ref: "User"}]
    });

    const User = mongoose.model("User", UserSchema);
    const Tabla = mongoose.model("Tabla",TablaSchema);
    
    User.remove({}).then(() => {
        Tabla.remove({}).then(() => {
               //Usuario Josue de Prueba
               console.log("Usuario Josue de prueba");
               let usuario_prueba1 = new User(
               {
                    nombre: "Josue",
                    apellidos: "Toledo"
               });
               usuario_prueba1.save(function(err)
               {
                    if(err) return console.log(err);
                    console.log(`Saved: ${usuario_prueba1}`);
                    //Ejemplos por defecto
                    let tabla1 = new Tabla(
                    {
                        entrada_tabla: '"producto", "precio"\n "cam", "4,3" \n"libro de O\'Reilly", "7,2"',
                        nombre: "Ejemplo1",
                        descripcion: "Primer ejemplo para que el usuario cargue en la app",
                        _creator: usuario_prueba1._id
                    });
                    //Guardamos tabla en BD
                    tabla1.save(function(err)
                    {
                       if(err) return console.log(err); 
                       console.log(`Saved: ${tabla1}`);
                    }).then(()=>{
                        Tabla
                        .findOne({entrada_tabla: '"producto", "precio"\n "cam", "4,3" \n"libro de O\'Reilly", "7,2"',nombre: "Ejemplo1",descripcion: "Primer ejemplo para que el usuario cargue en la app"})
                        .populate('_creator')
                        .exec(function(err,tabla){
                            if(err) return console.log(err);
                            console.log('Propietario de tabla: %s',tabla._creator);
                        }).then( () => {
                           //mongoose.connection.close(); 
                        });
                    });
               });
               
               console.log("--------------------------------------------");
               console.log("Usuario Nayra de prueba");
               //Usuario Nayra de prueba
               let usuario_prueba2 = new User(
               {
                    nombre: "Nayra",
                    apellidos: "Rodriguez"
               });
               usuario_prueba2.save(function(err)
               {
                    if(err) return console.log(err);
                    console.log(`Saved: ${usuario_prueba2}`);
                    //Ejemplos por defecto
                    let tabla2 = new Tabla(
                    {
                        entrada_tabla: '"producto","precio","fecha"\n "camisa","4,3","14/01"\n "libro de O\'Reilly", "7,2","13/02"',
                        nombre: "Ejemplo2",
                        descripcion: "Segundo ejemplo para que el usuario cargue en la app",
                        _creator: usuario_prueba2._id
                    });
                    //Guardamos tabla en BD
                    tabla2.save(function(err)
                    {
                       if(err) return console.log(err); 
                       console.log(`Saved: ${tabla2}`);
                    }).then(()=>{
                        Tabla
                        .findOne({entrada_tabla: '"producto","precio","fecha"\n "camisa","4,3","14/01"\n "libro de O\'Reilly", "7,2","13/02"',nombre: "Ejemplo2",descripcion: "Segundo ejemplo para que el usuario cargue en la app"})
                        .populate('_creator')
                        .exec(function(err,tabla){
                            if(err) return console.log(err);
                            console.log('Propietario de tabla: %s',tabla._creator);
                        }).then( () => {
                           //mongoose.connection.close(); 
                        });
                    });
               });
        });
    });
    
    module.exports = { Tabla: Tabla, User: User};
