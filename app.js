"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

//Conexión con MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Practica9');
const TablaSchema = mongoose.Schema({
    "entrada_actual": String
});
const Tabla = mongoose.model("Tabla",TablaSchema);
    
app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {     
  //console.log("Accediendo a index");
  response.render('index', {title: "Comma Separated Values (CSV) Analyzer with Ajax" , autor1: "Maria Nayra Rodriguez Perez", autor2: "Josue Toledo Castro"});
});

app.get('/csv', (request, response) => {
    let t1 = new Tabla({entrada_actual: request.query.input});

    let p1 = t1.save(function(err)
    {
        if(err)
        {
            console.log(`Hubieron errores:\n${err}`); return err; 
        }
        else
        {
            console.log(`Saved: ${t1}`);
        }
    });
  
    response.send({ "rows": calculate(request.query.input) });
});

app.get('/mostrar_bd',(request, response) => { 
    console.log("Mostrando el contenido de la bd"); 
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
