var usuario = [];
var actual = [];

$(document).ready(function() {

    var usuariosLocal = obtener_local('users');
    var usuarioActual = obtener_local('actual');
    if (!usuariosLocal) {
        usuarios = [];
    } else {
        usuarios = usuariosLocal;
    }
    if (!usuarioActual) {
        actual=[];

    } else {
        actual = usuarioActual;
    }

    mostrar_tableros(actual[2]);

    var btn = document.getElementById('btn-submit');
    btn.onclick = function(){
      crear_tableros(actual[2]);
    }

    $(".btn-success").click(function(){
      var tablero = $(this).val();
      var res = tablero.split("$");
      localStorage.setItem('tablero-actual', JSON.stringify(res));
      window.location.replace("tablero.html");
    });

});

/*
 Funcion para cargar los tableros pertenecientes al usuario logeado
*/


function crear_tableros(correo) {
  var tableros = JSON.parse(localStorage.getItem('tableros'));

  //Si tableros es null entonces inicializa el arreglo
  if(!tableros){
  tableros = new Array();
  }

  //Crea un arreglo con la información del nuevo tablero
  var tablero =new Array();
  if (typeof(Storage) !== "undefined") {

  tablero[0] = correo;
  tablero[1] = document.getElementById("table_name").value;


  //Inyecta la nueva tarea a las tareas del localStorage
  tableros.push(tablero);

  //Guarda tareas en el localStorage
  localStorage.setItem("tableros", JSON.stringify(tableros));
  }
  location.reload();
}

function mostrar_tableros(correo){
  var div_tableros = document.getElementById('lista_de_tablas');
  var tableros = JSON.parse(localStorage.getItem('tableros'));
  for (var i = 0; i < tableros.length; i++) {
      if (tableros[i][0] == correo) {
          div_tableros.innerHTML += '<button class="btn btn-success"'+
          'value="'+tableros[i][0]+"$"+tableros[i][1]+'">' + tableros[i][1] + '</button><br>';
      }
  }
}

/*
 Funcion para obtener tados de local storage a partir de una key
 @parameters key = string con la palabra clave para el local storage
*/

function obtener_local(key) {
    var array = localStorage.getItem(key); //obtiene de localStorage
    var convert = JSON.parse(array); //lo parsea a normal
    if (convert == null) { //validacion
        return convert = [];
    } else {

        return convert;
    }



}

/*
 Funcion para guardar en local storage
 @parameters key = nombre de la llave bajo la cual se guardara en local storage
 @parameters valor_a_guardar= valor que se guardara en local storage,
            tiene que estar en formato JSON para que funcione
*/
function guardar_local(key, valor_a_guardar) {

    if (valor_a_guardar == null || valor_a_guardar == undefined || valor_a_guardar == []) {
        return console.log("valor a guardar esta vacio o indefinido");
    } else {
        localStorage.setItem(key, valor_a_guardar);
        return console.log("valor guardado con exito");
    }
}
