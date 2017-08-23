var usuarios = [];
var usuarioLogeado=[];

$(document).ready(function() {
    var url = window.location.href;
    var urlSplit = url.split("/");
    var listUrl = ["fulanito-a.html", "home_administrador.html", "home_colaborador.html", "infor-patron.html", "list-cows.html",
        "list-workers.html", "login.html", "login.html?",
        "logout.html", "sing_up.html", "sing_up.html?", "vacunas-colaborador.html", "vacunas.html"
    ];
    for (var i = listUrl.length - 1; i >= 0; i--) {
        /*If para traer los usuarios en las paginas que se ocupan*/
        if (urlSplit[urlSplit.length - 1] == listUrl[i]) {
            usuarios = obtener_local('users');
            /*for para saber si ya hay un usuario logeado*/
            for (var i = usuarios.length - 1; i >= 0; i--) {
                if (usuarios[i][usuarios.length - 1] == "login") {
                    window.location.replace("home_administrador.html");
                    break;
                }

            }
            break;
        }
    }


});


$( "#btn_login" ).click(function() {
    alert("kjlkjljljklj");
});



/**
	funcion para validar el usuario al hacer un login
	consulta a la lista de usuarios y al encontrar el usuario
	solicitado, le agrega un token="login";
*/
function login() {
    var nick = document.getElementById("nick").value;
    var contraseña = document.getElementById("contraseña").value;
	var usuarios = JSON.parse(localStorage.getItem('users'));
	alert("nick-->" + nick + " -- contraseña--->"+ contraseña);
	return;
   for(var user in usuarios) {
   		if(nick == user[0]){
   			if(contraseña == user[3]){
	   			localStorage.setItem('actual', nick);
   				window.location.replace("home_administrador.html");
   			}else{
   				alert("Usuario no registrado");
   			}
   		}else{
 			alert("Usuario no registrado");
   		}
    }

}




/*
	Funcion para obtener tados de local storage a partir de una key
	@parameters key = string con la palabra clave para el local storage
*/
function obtener_local(key) {
    var array = localStorage.getItem(key);
    var convert = JSON.parse(array);
    if (convert == null) {
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
/*
	Funcion para guardar un nuevo usaurio
*/

function nuevo_usuario() {
    var nombre = document.getElementById('name').value;
    var apellido = document.getElementById('last-name').value;
    var email = document.getElementById('email-direction').value;
    var contraseña = document.getElementById('contraseña').value;
    var confirmar_contraseña = document.getElementById('pass-validation').value;
    /*recorrido de usuarios para validar que no se encuentren repetidos
     los nombres de usuario o correos	electronicos*/
    var bandera = true;

    for (var i = usuarios.length - 1; i >= 0; i--) {
        if (usuarios[i][0] == nombre) {
            alert("El nombre de usuario ya existe");
            limpiar_campos_sing_up();
            bandera = false;
            break;

        } else if (usuarios[i][2] == email) {
            alert("El email ya esta en uso");
            limpiar_campos_sing_up();
            bandera = false;
            break
        }


    }

    while (bandera) {
        if (contraseña != confirmar_contraseña) {
            alert("Las contraseña no coinciden");
            limpiar_campos_sing_up();
            bandera = false;
        } else {
            var usuario_nuevo = [nombre, apellido, email, contraseña];

            usuarios.push(usuario_nuevo);
            guardar_local('users', JSON.stringify(usuarios));
            alert("Se agrego correctamente");
            limpiar_campos_sing_up();
            bandera = false;
        }
    }



}
/*
	Funcion para limpiar los inputs de la pagina sing_up.html
*/
function limpiar_campos_sing_up() {
    document.getElementById('name').setAttribute('value', " ");
    document.getElementById('last-name').setAttribute('value', " ");
    document.getElementById('email-direction').setAttribute('value', " ");
    document.getElementById('contraseña').setAttribute('value', "");
    document.getElementById('pass-validation').setAttribute('value', " ");
}

/**function crear_nueva_tabla(){

	var nombre_tabla=document.getElementById('table_name').value;
	var div = document.getElementById('lista_de_tablas');
	div.innerHTML += '<a type="button" class="btn btn-success" href="https://www.youtube.com/">'+nombre_tabla+'</a>';
}**/

function cargar_tableros(){
  var tableros = JSON.parse(localStorage.getItem('tableros'));
  var div_tableros = document.getElementById('lista_de_tablas');
  for(var tab in tableros) {
  	if(tab[1] == usuarioLogeado[2]){
		div_tableros.innerHTML += '<a type="button" class="btn btn-success" href="https://www.youtube.com/">'+tab[0]+'</a>';
  	}
  }
}

function crear_nueva_tabla(){
  var tableros = JSON.parse(localStorage.getItem('tableros'));

  //Si tableros es null entonces inicializa el arreglo
  if(!tableros){
  tableros = new Array();
  }

  //Crea un arreglo con la información de la nueva tableros
  var tablero =new Array();
  if (typeof(Storage) !== "undefined") {

  tablero[0] = document.getElementById('table_name').value;;
  tablero[1] = usuarioLogeado[2];/*se iguala el email*/
  alert(tablero);
  return;

  //Inyecta la nueva tarea a las tableros del localStorage
  tableros.push(tablero);

  //Guarda tableros en el localStorage
  localStorage.setItem("tableros", JSON.stringify(tableros));
  }
  location.reload();
}
