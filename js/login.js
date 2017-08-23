var usuarios = [];



$(document).ready(function() {

    var usuariosLocal = obtener_local('users');
    if (!usuariosLocal) {
        usuarios = [];
    } else {
        usuarios = usuariosLocal;
    }



});


/**
	funcion para validar el usuario al hacer un login
	consulta a la lista de usuarios y al encontrar el usuario
	solicitado, le agrega un token="login";
*/
function login() {
    var nick = document.getElementById("nick").value;
    var contraseña = document.getElementById("contraseña").value;
    var actual;
    var bandera = true;
    for (var i = usuarios.length - 1; i >= 0; i--) {
        if (usuarios[i][0] == nick && usuarios[i][3] == contraseña) {
        	actual=[nick,contraseña,usuarios[i][2]];
            guardar_local('actual', JSON.stringify(actual));
            bandera = false;
            break;
        }
    }
    if (bandera) {
        alert("Usuario no registrado");
    } else {
        //el window location solo funciona en FireFox
        window.location.replace("home_administrador.html");
    }

    /*
        for (var user in usuarios) {
            if (nick == user[0]) {
                if (contraseña == user[3]) {
                    actual = [nick, user[2]]
                    guardar_local('actual', JSON.stringify(actual));
                    //el window location solo funciona en FireFox
                    window.location.replace("home_administrador.html");
                    break;
                } else {
                    alert("Usuario no registrado");
                }
            }
    */






    //alerta para verificar que el usuario a logear esta en local storage  como activo
    var usuarios2 = JSON.parse(localStorage.getItem('actual'));
    alert("nick-->" + nick + " -- contraseña--->" + contraseña + " --correo-->");
    return;





} //fin del metodo







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
