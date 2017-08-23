var tablero;
$(document).ready(function() {
  tablero = JSON.parse(localStorage.getItem('tablero-actual'));
  document.getElementById("tablero").innerHTML = tablero[1];
  mostrar_tareas();
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var tareas = JSON.parse(localStorage.getItem('tareas'));
    var tarea = new Array();
    for (var i = 0; i < tareas.length; i++) {
      var val = tareas[i][2];
        if(val == data){
          alert("entra");
          tarea[0] = tareas[i][0];
          tarea[1] = tareas[i][1];
          tarea[2] = tareas[i][2];
          tarea[3] = tareas[i][3];
          tarea[4] = ev.target.className;
          tareas.splice(i, 1);
          tareas.push(tarea);
          localStorage.setItem("tareas", JSON.stringify(tareas));
        }
    }
}

function crear_tareas() {
  var tareas = JSON.parse(localStorage.getItem('tareas'));

  //Si tableros es null entonces inicializa el arreglo
  if(!tareas){
  tareas = new Array();
  }

  //Crea un arreglo con la información del nuevo tablero
  var tarea =new Array();
  if (typeof(Storage) !== "undefined") {

    tarea[0] = tablero[0];
    tarea[1] = tablero[1];
    tarea[2] = document.getElementById("tarea_nombre").value;
    tarea[3] = document.getElementById("tarea_nombre").value;
    tarea[4] = "drop 1";


  //Inyecta la nueva tarea a las tareas del localStorage
  tareas.push(tarea);

  //Guarda tareas en el localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));
  }
  location.reload();
}

function mostrar_tareas(){
  var div_tableros = document.getElementById('div1');
  var tareas = JSON.parse(localStorage.getItem('tareas'));
  if(tareas!=null){
    for (var i = 0; i < tareas.length; i++) {
        if ((tareas[i][0] == tablero[0]) && (tareas[i][1] == tablero[1])) {
            tbody_tareas.innerHTML += '<tr>'+
            '<td><div id="'+tareas[i][2]+1+'" ondrop="drop(event)" ondragover="allowDrop(event)"'+
            'class="drop 1"><label draggable="true" ondragstart="drag(event)"'+
            'id="'+tareas[i][2]+1+'">'+tareas[i][2]+'</label></div>'+
            '</td>'+
            '<td><div id="'+tareas[i][2]+2+'" ondrop="drop(event)" ondragover="allowDrop(event)"'+
            'class="drop 2"></div></td>'+
            '<td><div id="'+tareas[i][2]+3+'" ondrop="drop(event)" ondragover="allowDrop(event)"'+
            'class="drop 3"></div></td>'+
            '<td><div id="'+tareas[i][2]+4+'" ondrop="drop(event)" ondragover="allowDrop(event)"'+
            'class="drop 4"></div></td>'+
            '<td><div id="'+tareas[i][2]+5+'" ondrop="drop(event)" ondragover="allowDrop(event)"'+
            'class="drop 5"></div></td>'+
            '</tr>';
        }
    }
  }
}
