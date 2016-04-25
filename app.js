"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

//Conexión con Estructura de MongoDB
const Tabla = require('./models/estructura_bd.js');
const util = require('util');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {     
  //console.log("Accediendo a index");
    response.render('index', {title: "Comma Separated Values (CSV) Analyzer with Ajax" , autor1: "M. Nayra Rguez Perez", autor2: "Josue Toledo Castro", boton4: "Ejemplo4"});
});

app.get('/csv', (request, response) => {
    response.send({ "rows": calculate(request.query.input) });
});

app.param('ejemplo', function (req, res, next, ejemplo) {  
  if (ejemplo.match(/^[a-z0-9_]*$/i)) { 
      req.ejemplo = ejemplo;
  } else { 
      next(new Error(`<${ejemplo}> does not match 'ejemplo' requirements`));
   }
  next();
});

app.get('/cargar_datos/:ejemplo',(request,response) => {
    //console.log("Cargar_datos => data: "+request.query.boton_name);
    console.log("Cargar_datos => data: "+request.params.ejemplo);
    Tabla.find({nombre: request.params.ejemplo},function(err,data){
        response.send(data); //Servidor envia datos a csv.js
    });
});

app.get('/guardar_tabla/:ejemplo',(request, response) => { 
    console.log("Guardar tabla..."); 
    console.log("Datos: nombre_tabla->"+request.params.ejemplo);

    //Comprobamos el número de registros en la base de datos
    Tabla.find({},function(err, data) 
    {
        if(err){
            console.error("Se ha producido un error->"+err);
        }
        console.log("Data.length --> "+data.length);
        if(data.length > 3){
            console.log("Nombre 3 --> "+data[3].nombre);
            Tabla.remove({nombre: data[3].nombre}).exec();
        }
        let nueva_tabla = new Tabla({
            entrada_tabla: request.query.input,
            nombre: request.params.ejemplo,
            descripcion: request.query.descripcion
        });
        let n_t = nueva_tabla.save(function(err){
            if(err)
            {
                response.send({mensaje_respuesta: 'No se ha guardado correctamente', nombre_boton:""});
                console.log(`Hubieron errores:\n${err}`); return err; 
            }
            else
            {
                response.send({mensaje_respuesta: 'Guardado con exito', nombre_boton: request.params.ejemplo});
                console.log(`Saved: ${nueva_tabla}`);
            }
            
        });
        
        n_t.then(function(value) {
            console.log(value); // Success!
        }, function(reason) {
            console.log(reason); // Error!
        });
        
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
