(function(exports)
{
    "use strict";
    console.log("Configurando MongoDB...");
    //Conexión con MongoDB
    const util = require('util');
    const mongoose = require('mongoose');
    
    mongoose.connect('mongodb://localhost/Practica9');
    const TablaSchema = mongoose.Schema({
        "entrada_tabla": String,
        "nombre": String,
        "descripcion": String
        //"id": String
    });
    const Tabla = mongoose.model("Tabla",TablaSchema);
    //Ejemplos por defecto
    let ejemplo1 = new Tabla(
    {
        entrada_tabla: '"producto", "precio"\n "cam", "4,3" \n"libro de O\'Reilly", "7,2"',
        nombre: "Ejemplo1",
        descripcion: "Primer ejemplo para que el usuario cargue en la app"
        //id: "Tabla1"
    });
    let p1 = ejemplo1.save(function(err)
    {
        if(err)
        {
            console.log(`Hubieron errores:\n${err}`); return err; 
        }
        else
        {
            console.log(`Saved: ${ejemplo1}`);
        }
    });
    let ejemplo2 = new Tabla(
    {
        entrada_tabla: '"producto","precio","fecha"\n "camisa","4,3","14/01"\n "libro de O\'Reilly", "7,2","13/02"',
        nombre: "Ejemplo2",
        descripcion: "Segundo ejemplo para que el usuario cargue en la app"
        //id: "Tabla2"
    });
    let p2 = ejemplo2.save(function(err)
    {
        if(err)
        {
            console.log(`Hubieron errores:\n${err}`); return err; 
        }
        else
        {
            console.log(`Saved: ${ejemplo2}`);
        }
    });
    let ejemplo3 = new Tabla(
    {
        entrada_tabla: '"edad",  "sueldo",  "peso"\n  ,"6000€","90Kg"\n47,       "3000€",  "100Kg"',
        nombre: "Ejemplo3",
        descripcion: "Tercer ejemplo para que el usuario cargue en la app"
        //id: "Tabla3"
    });
    let p3 = ejemplo3.save(function(err)
    {
        if(err)
        {
            console.log(`Hubieron errores:\n${err}`); return err; 
        }
        else
        {
            console.log(`Saved: ${ejemplo3}`);
        }
    });
    
    //Nos aseguramos de que todos los registros se han salvado
    Promise.all([p1,p2,p3]).then( (value) => {
        console.log(util.inspect(value, {depth: null}));
    }); 

    module.exports = Tabla;
})()
