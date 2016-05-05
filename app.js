"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

//Conexión con Estructura de MongoDB
//Conexión con Estructura de MongoDB
const Estructura = require('./models/estructura_bd.js');
const User = Estructura.User;
const Tabla = Estructura.Tabla;
console.log("Estructura:"+Estructura);
console.log("User:"+User);
console.log("Tabla:"+Tabla);
const mongoose = require('mongoose');

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

app.get('/cargar_datos',(request,response) => {
    //console.log("Cargar_datos => data: "+request.query.boton_name);
    console.log("Cargar_datos => data: "+request.query.table_name);
    console.log("Nombre usuario => data: "+request.query.usuario);
    Tabla.find({nombre: request.query.table_name},function(err,data){
        response.send(data); //Servidor envia datos a csv.js
    });
});

app.param('usuario',function(req,res,next,usuario)
{
    if (usuario.match(/^[a-z0-9_]*$/i)) { 
      req.ejemplo = usuario;
    } else { 
      next(new Error(`<${usuario}> does not match 'usuario' requirements`));
    }
    next();
});

app.get('/buscar/:usuario',(request,response) => {
    console.log("Usuario a buscar:"+request.params.usuario);
    User.find({nombre: request.params.usuario},function(err,data)
    {
        if(err)
        {
            console.error("Se ha producido un error->"+err);
        }
        else
        {
            if(data.length > 0){
                console.log("Error:"+err);
                console.log("Enviando datos a csv.js => Id de usuario:"+data[0]._id);
                /*var id = new ObjectId(data[0]._id);
                console.log("Id:"+id._id);*/
                const id = mongoose.Types.ObjectId(data[0]._id);
                console.log("Id:"+id);
                Tabla.find({_creator: id},function(err,data_tablas)
                {
                    if(err)
                    {
                        console.error("Se ha producido un error->"+err);
                    }
                    else
                    {
                        console.log("Enviando dattos a csv.js => Tablas asociadas:"+data_tablas);    
                    }
                    response.send({contenido: data_tablas, usuario_propietario: id, mensaje_respuesta: "Busqueda realizada correctamente."});
                });
            }
            else{
                console.log("creando nuevo usuario.");
                let nuevo_usuario = new User({
                    nombre: request.params.usuario
                });
                nuevo_usuario.save(function(err){
                   if(err) return console.log(err);
                   response.send({contenido: "", usuario_propietario: nuevo_usuario._id, mensaje_respuesta: "Nuevo usuario creado."});
                }).then(() => {
                    console.log(`Saved: ${nuevo_usuario}`);
                })
            }
        }
    });
});



app.get('/guardar_tabla/:ejemplo',(request, response) => { 
    console.log("Guardar tabla..."); 
    console.log("Datos: nombre_tabla->"+request.params.ejemplo);
    console.log("Datos: contenido_tabla->"+request.query.input);
    console.log("Datos: descripcion_tabla->"+request.query.descripcion)
    console.log("Datos: usuario propietario->"+request.query.usuario);
    const id = mongoose.Types.ObjectId(request.query.usuario);
    console.log("Datos: id->"+id);
    //Comprobamos el número de registros en la base de datos
    Tabla.find({_creator: id},function(err, data) 
    {
        if(err){
            console.error("Se ha producido un error->"+err);
        }
        console.log("Data.length --> "+data.length);
        if(data.length > 3){
            console.log("Nombre 3 --> "+data[3].nombre);
            Tabla.remove({nombre: data[3].nombre}).exec();
        }
        let nueva_tabla = new Tabla(
        {
            entrada_tabla: request.query.input,
            nombre: request.params.ejemplo,
            descripcion: request.query.descripcion,
            _creator: id
        });
        //Guardamos tabla en BD
        nueva_tabla.save(function(err)
        {
           if(err) return console.log(err); 
           console.log(`Saved: ${nueva_tabla}`);
        }).then(()=>{
            Tabla
            .findOne({entrada_tabla: request.query.input,nombre:request.params.ejemplo,descripcion: request.query.descripcion, _creator: id})
            .populate('_creator')
            .exec(function(err,tabla){
                if(err) return console.log(err);
                console.log('Propietario de tabla: %s',tabla._creator);
            }).then( () => {
                response.send({contenido: data, usuario_propietario: id});
            });
        });
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
