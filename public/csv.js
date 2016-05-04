// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const resultTemplate = `
<div class="contenido">
      <table class="center" id="result">
          <% _.each(rows, (row) => { %>
          <tr class="<%=row.type%>">
              <% _.each(row.items, (name) =>{ %>
              <td><%= name %></td>
              <% }); %>
          </tr>
          <% }); %>
      </table>
  </p>
</div>
`;

const botonesTemplate =  `
<div class="example">
  <% _.each(buttons, (button) => { %>
  <button class="example" type="button" style="width:20%"><%= button.nombre %></button>
  <% }); %>
</div>
`;

var user_actual;

/* Volcar la tabla con el resultado en el HTML */
const fillTable = (data) => { 
  $("#finaltable").html(_.template(resultTemplate, { rows: data.rows })); 
};

const botones_ejemplos = (data) => {
  user_actual = data.usuario_propietario;
  console.log("User_actual:"+user_actual);
  $("#botones").html(_.template(botonesTemplate, { buttons: data.contenido, usuario_propietario: data.usuario_propietario}));
}

/* Volcar en la textarea de entrada 
 * #original el contenido del fichero fileName */
/*const dump = (fileName) => {
  $.get(fileName, function (data) {
      $("#original").val(data);
  });
};*/

const dump = (boton_name) => {
    console.log("Ha hecho click en el boton:" + boton_name);
    $.get("/cargar_datos/"+boton_name, { boton_name: boton_name }, respuesta =>
    {
       console.log("Respuesta:"+respuesta);
       $("#original").val(respuesta[0].entrada_tabla);
    });
}

const handleFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.target.files; 
  console.log("Files:"+files);
  
  var reader = new FileReader();
  reader.onload = (e) => {
    $("#original").val(e.target.result);
  };
  reader.readAsText(files[0])
}

/* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
const handleDragFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.
  console.log("Drag and drop:"+files);
  var reader = new FileReader();
  reader.onload = (e) => {
  
    $("#original").val(e.target.result);
    console.log("E.target.result:"+e.target.result);
    
    evt.target.style.background = "white";
  };
  reader.readAsText(files[0]);
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "yellow";
}

$(document).ready(() => {
    let original = document.getElementById("original");  
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }

    $("#buscar_usuario").click( (event) => {
      event.preventDefault();
      $.get('/buscar/'+$("#nombre_usuario").val(),
        { usuario: $("nombre_usuario").val()},
        botones_ejemplos,
        'json'
      );
    });

    /* Request Ajax para que se guarde la tabla */
    /*$("#guardar").click( (event) => {
        event.preventDefault();
        $.get("/guardar_tabla/"+$("#nombre_tabla").val(), 
          { input: original.value, nombre: $("#nombre_tabla").val(), descripcion: $("#descripcion_tabla").val() },data_respuesta =>
          {
            console.log("Respuesta del servidor despues de guardar->"+data_respuesta);
            console.log("Nombre del boton:"+data_respuesta.nombre_boton);
            $("#guardado_respuesta").fadeIn();
            $("#boton4").fadeIn();
            $("#guardado_respuesta").html("<i>"+data_respuesta.mensaje_respuesta+"</i>");
            $("#boton4").html(data_respuesta.nombre_boton);
          });
    });    */
    
    //Una vez que se ha guardado la tabla, desde que el foco cambia en la página desaparece el mensaje de guardado
    $("#guardar").focusout(function()
    {
      $("#guardado_respuesta").fadeOut("slow");  
    });
    
    /* Request AJAX para que se calcule la tabla */
    $("#parse").click( () => {
        if (window.localStorage) 
        {
          localStorage.original = original.value;
        }
        console.log("Original value:"+original.value);
        $.get("/csv", 
          { input: original.value }, 
          fillTable,
          'json'
        );
        //$("#input").css("float","left");
        //$("#input").css("margin-left","70px");
        //$(".output").css("float","left");
    });
    /* botones para rellenar el textarea */
    /*dump --> vuelca el contenido del fichero y recibe como argumento el nombre del fichero*/
    
    /*`${$(y).text()}.txt` --> texto ECMA6 (comillas)*/
    
    /*$('button.example').each( (_,y) => {
      $(y).click( () => { dump(`${$(y).text()}.txt`); });
    });*/

    $('button.example').each( (_,y) => {
      $(y).click( () => { dump(`${$(y).text()}`); });
    });
    
    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    
    dropZone.addEventListener('drop', handleDragFileSelect, false);
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);
 });
})();
