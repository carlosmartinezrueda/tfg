var accessToken = 'pk.eyJ1IjoiYXJ0aHlvbSIsImEiOiJjaWwxMTRrcGswMDlwdzltMG8wMWpoeWEwIn0.1YjqxG-8GJDU27DT_nDwHw';

//Al cargar la página que llame a init()
window.onload = function(){
  init();
};


//Inserta el nodo como el último hijo del nodo "padre"
function insertAsLastChild(padre, nuevo){
  padre.appendChild(nuevo);
}

var coor;
var pos;
var markerCrear;
var nombreParaEditar;

var puntosDelete = new Array();
var puntosAdd = new Array();

//Inserta el nodo como el primer hijo del nodo "padre"
function insertAsFirstChild(padre, nuevo){
  padre.insertBefore(nuevo, padre.firstChild);
}


//Inserta en nodo como hijo anterior al hijo pasado como paramtero
function insertBeforeChild(padre, hijo, nuevo){
  padre.insertBefore(nuevo, hijo);
}


//Elimina el nodo pasado como paramtero
function removeElement(nodo){
    queryAncestorSelector(nodo, '*').removeChild(nodo);
}


// Determina el nodo padre del nodo seleccionado, que sea del tipo del selector
function queryAncestorSelector (node, selector) {
      var parent = node.parentNode;
      var all = document.querySelectorAll(selector);
      var found = false;
      while (parent !== document && !found) {
        for (var i = 0; i < all.length && !found; i++) {
          found = (all[i] === parent)?true:false;
        }
        parent = (!found)?parent.parentNode:parent;
      }
      return (found)?parent:null;
    }


//Función que inicializa todos los elementos del index.html
//Ahora tambien añade los cuestionarios de la BD
function init(){
  var btn = document.getElementById('boton');
  var ul = document.querySelector('ul');
  var tusrutas = ul.querySelectorAll('li')[1];
  var crear = ul.querySelectorAll('li')[2];

  btn.addEventListener("click", BuscarRuta, false);
  tusrutas.addEventListener("click", TusRutas, false);
  crear.addEventListener("click", create, false);

  L.mapbox.accessToken = accessToken;
  
  var map = L.mapbox.map('map', 'mapbox.streets', {
      zoomControl: true
  }).setView([38.385213, -0.513532], 16);

  var url = "listarrutas";

   $.getJSON(url, function(data) {
      $.each(data.result, function(index, item) {
        var enlace = document.createElement('div');
        enlace.innerHTML = '<input class="ruta" type="button" value=\"' + item + '\"></input>';
        enlace.addEventListener("click", BuscarRutaClick, false);
        insertAsLastChild(document.getElementById('rutas'), enlace);
      });
    }).fail(function(data){
      alert("Fallo al listar las rutas");
    });
}


//Crear la sección de Buscar
function Buscar(){
  removeElement(document.getElementById('contenido'));
  var privada = document.createElement('div');
  privada.id = "contenido";

  privada.innerHTML= '<input id="textbuscar" type="text" title="Nombre de la ruta" placeholder="Nombre de la ruta"></input>\
    <input id="boton" type="button" value="Buscar"></input>\
    <label id="textruta"></label>';

  insertAsLastChild(document.getElementById('cuadro'), privada);

   var btn = document.getElementById('boton');
   btn.addEventListener("click", BuscarRuta, false);

  var ul = document.getElementById('cuadro');
  var buscar = ul.querySelectorAll('li')[2];

  buscar.addEventListener("click", create, false);

  var rutas = document.createElement('div');
  rutas.id = "rutas";
  insertAsLastChild(document.getElementById('contenido'), rutas);
  
  removeElement(document.getElementById('map'));
  var map = document.createElement('div');
  map.id = 'map';

  insertAsFirstChild(document.querySelector('main'), map);

  L.mapbox.accessToken = accessToken;
  
  var map = L.mapbox.map('map', 'mapbox.streets', {
      zoomControl: true
  }).setView([38.385213, -0.513532], 16);
  var url = "listarrutas";

   $.getJSON(url, function(data) {
      $.each(data.result, function(index, item) {
        var enlace = document.createElement('div');
        enlace.innerHTML = '<input class="ruta" type="button" value=\"' + item + '\"></input>';
        enlace.addEventListener("click", BuscarRutaClick, false);
        insertAsLastChild(document.getElementById('rutas'), enlace);
      });
    }).fail(function(data){
      alert("Fallo al listar las rutas");
    });

  var urlaux = "borrarpuntossinruta";

  $.getJSON(urlaux, function(data) {
  })    
  .fail(function(data){
      alert("Error integridad");
  });
}

//Buscar la ruta en la Base de Datos
function BuscarRuta(){

  var nombre = document.getElementById('textbuscar');
  var ruta = nombre.value;

  if(ruta===""){
    if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));

    if(document.getElementById('textruta')!=null)
        removeElement(document.getElementById('textruta'));

    if(document.getElementById('rutas')!=null)
        removeElement(document.getElementById('rutas'));

    window.alert("Es necesario el nombre de una ruta para la Busqueda");   
  }

  else{
    var url = "buscarruta?nombre=" + ruta;

    $.getJSON(url, function(data) {
      if(typeof data.error !== "undefined"){
        if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));
        
        if(document.getElementById('textruta')==null){
          var textruta = document.createElement('label');
          textruta.id = "textruta";
          insertAsLastChild(document.getElementById('contenido'), textruta);
        }

        if(document.getElementById('rutas')!=null)
          removeElement(document.getElementById('rutas'));

        document.getElementById('textruta').innerHTML = data.error.message + " \"" + ruta + "\"";
        nombre.value="";

        removeElement(document.getElementById('map'));
        var map = document.createElement('div');
        map.id = 'map';

        insertAsFirstChild(document.querySelector('main'), map);

        L.mapbox.accessToken = accessToken;
        
        var map = L.mapbox.map('map', 'mapbox.streets', {
            zoomControl: true
        }).setView([38.385213, -0.513532], 16);

      }
      else{
        nombre.value = "";

        if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));

        if(document.getElementById('textruta')!=null)
          removeElement(document.getElementById('textruta'));

        if(document.getElementById('rutas')!=null)
          removeElement(document.getElementById('rutas'));
        
        var info = document.createElement('div');
        info.id = "info";

        info.innerHTML= '<div id="nombre"><b>Nombre: </b>' + data.result.nombre +  '</div>\
              <div><b>Descripcion: </b>' + data.result.descripcion + '</div><br>';

        insertAsLastChild(document.getElementById('contenido'), info);

        removeElement(document.getElementById('map'));
        var map = document.createElement('div');
        map.id = 'map';

        map.innerHTML = '<div id=\'inputs\'></div>\
                         <div id=\'errors\'></div>\
                         <div id=\'directions\'>\
                           <div id=\'routes\'></div>\
                           <div id=\'instructions\'></div>\
                         </div>';

        insertAsFirstChild(document.querySelector('main'), map);

        L.mapbox.accessToken = accessToken;
        
        var map = L.mapbox.map('map', 'mapbox.streets', {
            zoomControl: true
        }).setView([38.385213, -0.513532], 16);

        // move the attribution control out of the way
        map.attributionControl.setPosition('bottomleft');
        L.control.scale().addTo(map);

        var directions = L.mapbox.directions({
                  profile: 'mapbox.walking',
                  units: 'metric'
              });

        var tam = data.result.Puntos.length;
        var i = 0

        directions.setOrigin(L.latLng(data.result.Puntos[i].lat, data.result.Puntos[i].lng));
        info.innerHTML += '<div id="itinerario"><b>ITINERARIO: </b></div>\
                           <div id=\"' + (i+1) + '\">' + data.result.Puntos[i].nombreP + '</div>'

        for (i = 1; i < tam-1; i++){
          directions.addWaypoint(i, L.latLng(data.result.Puntos[i].lat, data.result.Puntos[i].lng));
          info.innerHTML += '<div id=\"' + (i+1) + '\">' + data.result.Puntos[i].nombreP + '</div>'
        };

        directions.setDestination(L.latLng(data.result.Puntos[tam-1].lat, data.result.Puntos[tam-1].lng));        
        info.innerHTML += '<div id=\"' + tam + '\">' + data.result.Puntos[tam-1].nombreP + '</div>'
        

        var directionsLayer = L.mapbox.directions.layer(directions).addTo(map);
        var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions).addTo(map);
        var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions).addTo(map);
        var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions).addTo(map);        
        var myLayer = L.mapbox.featureLayer().addTo(map);

        directions.query();

      }
    })
    .fail(function(data){
      alert("Fallo al buscar la ruta");
    });
  }
}

//Muestra la información de la ruta clickada
function BuscarRutaClick(){

  ruta = this.querySelector('input').value;
  
  if(ruta===""){
    if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));

    if(document.getElementById('textruta')!=null)
        removeElement(document.getElementById('textruta'));      

    if(document.getElementById('rutas')!=null)
      removeElement(document.getElementById('rutas'));

    window.alert("Es necesario el nombre de una ruta para la Busqueda");   
  }

  else{
    var url = "buscarruta?nombre=" + ruta;

    $.getJSON(url, function(data) {
      if(typeof data.error !== "undefined"){
        if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));
        
        if(document.getElementById('textruta')==null){
          var textruta = document.createElement('label');
          textruta.id = "textruta";
          insertAsLastChild(document.getElementById('contenido'), textruta);
        }

        if(document.getElementById('rutas')!=null)
          removeElement(document.getElementById('rutas'));

        document.getElementById('textruta').innerHTML = data.error.message + " \"" + ruta + "\"";
      }
      else{

        if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));

        if(document.getElementById('textruta')!=null)
          removeElement(document.getElementById('textruta'));          

        if(document.getElementById('rutas')!=null)
          removeElement(document.getElementById('rutas'));
        
        var info = document.createElement('div');
        info.id = "info";

        info.innerHTML= '<div id="nombre"><b>Nombre: </b>' + data.result.nombre +  '</div>\
              <div><b>Descripcion: </b>' + data.result.descripcion + '</div><br>';

        insertAsLastChild(document.getElementById('contenido'), info);

        removeElement(document.getElementById('map'));
        var map = document.createElement('div');
        map.id = 'map';

        map.innerHTML = '<div id=\'inputs\'></div>\
                         <div id=\'errors\'></div>\
                         <div id=\'directions\'>\
                           <div id=\'routes\'></div>\
                           <div id=\'instructions\'></div>\
                         </div>';

        insertAsFirstChild(document.querySelector('main'), map);

        L.mapbox.accessToken = accessToken;
        
        var map = L.mapbox.map('map', 'mapbox.streets', {
            zoomControl: true
        }).setView([38.385213, -0.513532], 16);

        // move the attribution control out of the way
        map.attributionControl.setPosition('bottomleft');
        L.control.scale().addTo(map);

        var directions = L.mapbox.directions({
                  profile: 'mapbox.walking',
                  units: 'metric'
              });

        var tam = data.result.Puntos.length;
        var marker;
        var i = 0;

        directions.setOrigin(L.latLng(data.result.Puntos[0].lat, data.result.Puntos[0].lng));
        info.innerHTML += '<div id="itinerario"><b>ITINERARIO: </b></div>\
                           <div id=\"' + (i+1) + '\">' + data.result.Puntos[i].nombreP + '</div>';
        
        marker = L.marker(L.latLng(data.result.Puntos[0].lat, data.result.Puntos[0].lng), {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': 1
          }),
          draggable: false
        }).addTo(map);
        
        marker.bindPopup("<b>"+ data.result.Puntos[0].nombreP + "</b><br>"+ data.result.Puntos[0].desc).openPopup();                           

        for (i = 1; i < tam-1; i++){
          directions.addWaypoint(i, L.latLng(data.result.Puntos[i].lat, data.result.Puntos[i].lng));
          info.innerHTML += '<div id=\"' + (i+1) + '\">' + data.result.Puntos[i].nombreP + '</div>';

          marker = L.marker(L.latLng(data.result.Puntos[i].lat, data.result.Puntos[i].lng), {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': (i+1)
          }),
          draggable: false
        }).addTo(map);
        
        marker.bindPopup("<b>"+ data.result.Puntos[i].nombreP + "</b><br>"+ data.result.Puntos[i].desc);
        };

        directions.setDestination(L.latLng(data.result.Puntos[tam-1].lat, data.result.Puntos[tam-1].lng));        
        info.innerHTML += '<div id=\"' + tam + '\">' + data.result.Puntos[tam-1].nombreP + '</div>';

        marker = L.marker(L.latLng(data.result.Puntos[tam-1].lat, data.result.Puntos[tam-1].lng), {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': tam
          }),
          draggable: false
        }).addTo(map);
        
        marker.bindPopup("<b>"+ data.result.Puntos[tam-1].nombreP + "</b><br>"+ data.result.Puntos[tam-1].desc);

        var directionsLayer = L.mapbox.directions.layer(directions).addTo(map);
        var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions).addTo(map);
        var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions).addTo(map);
        var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions).addTo(map);        
        var myLayer = L.mapbox.featureLayer().addTo(map);

        directions.query();
      }
    })
    .fail(function(data){
      alert("Fallo al buscar la ruta");
    });
  }
}

//Crear la sección de "Crear"
function create(){
  removeElement(document.getElementById('contenido'));
  var privada = document.createElement('div');
  privada.id = "contenido";

  privada.innerHTML= '<input id="textbuscar" type="text" title="Nombre" placeholder="Nombre"></input>\
                      <TEXTAREA id="textdescripcion" title="Descripcion" placeholder="Descripcion" ROWS=2 COLS=20></TEXTAREA>\
                      <input id="boton" type="button" value="Crear"></input>\
                      <label id="textruta"></label>';

  insertAsLastChild(document.getElementById('cuadro'), privada);

  var btn = document.getElementById('boton');
  btn.addEventListener("click", CrearRuta, false);

  var ul = document.getElementById('cuadro');
  var crear = ul.querySelectorAll('li')[0];

  crear.addEventListener("click", Buscar, false);

  removeElement(document.getElementById('map'));
  var map = document.createElement('div');
  map.id = 'map';

  insertAsFirstChild(document.querySelector('main'), map);

  L.mapbox.accessToken = accessToken;

  var map = L.mapbox.map('map', 'mapbox.streets', {
      zoomControl: true
  }).setView([38.385213, -0.513532], 16);

  pos = 1;

  map.on('click', function(e){
    if(document.getElementById('textbuscar').value === "")
      alert("Se necesita el nombre de ruta para añadir puntos")

    else{
      var url = "comprobarruta?nombreRuta=" + document.getElementById('textbuscar').value;

      $.getJSON(url, function(data) {
          
          if(typeof data.error !== "undefined"){
            alert(data.error.message);
          }
          else{
            markerCrear = L.marker(e.latlng, {
                icon: L.mapbox.marker.icon({
                  'marker-color': '#f86767',
                  'marker-symbol': pos
                }),
                draggable: false
            }).addTo(map);

            coor = e.latlng;
            var myWindow = myWindow = window.open("ruta.jsp", "MsgWindow", "width=1000,height=500,top=50,left=75");
          }
        })    
        .fail(function(data){
          alert("Error al comprobar el nombre de la ruta en la BD");
        });
      }
  });
}

//Boton que crea la ruta
function CrearRuta(){
  var nombre = document.getElementById('textbuscar');
  var descripcion = document.getElementById('textdescripcion');

  if(nombre.value === "")
    window.alert("Es necesario un nombre para la ruta");

  else if(descripcion.value === "")
    window.alert("Es necesaria una descripcion para la ruta");

  else{
    var url = "buscarpuntos?nombreRuta=" + nombre.value;

    $.getJSON(url, function(data) {

      if(typeof data.error !== "undefined"){
        document.getElementById('textruta').innerHTML = "Imposible crear la ruta: <br>" + data.error.message;
      }

      else{
        url = "nuevaruta?nombre=" + nombre.value + "&descripcion=" + descripcion.value;

        $.getJSON(url, function(data) {
          
          if(typeof data.error !== "undefined"){
            document.getElementById('textruta').innerHTML = "Imposible crear la ruta: <br>" + data.error.message;
          }
          else{
            create();
            var anterior = document.getElementById('info');
            
            if(anterior !== null)
              removeElement(anterior);

            var info = document.createElement('div');
            info.id = "info";

            info.innerHTML= '<div id="nombre"><b>Nombre: </b>'+ data.result.nombre +  '</div>\
                  <div><b>Descripcion: </b>' + data.result.descripcion + '</div><br>';

            insertAsLastChild(document.getElementById('contenido'), info);
            nombre.value = "";
            descripcion.value ="";
            document.getElementById('textruta').innerHTML = "Ruta creada con éxito!"
          } 

        })    
        .fail(function(data){
          alert("Error al crear la ruta en el crear");
        });
      }
    })    
    .fail(function(data){
      alert("Error al crear la ruta en el buscar ruta");
    });   
  }
}

// Crea el apartado "Tus Rutas"
function TusRutas(){
  removeElement(document.getElementById('map'));
  var map = document.createElement('div');
  map.id = 'map';

  insertAsFirstChild(document.querySelector('main'), map);

  L.mapbox.accessToken = accessToken;
  
  var map = L.mapbox.map('map', 'mapbox.streets', {
      zoomControl: true
  }).setView([38.385213, -0.513532], 16);

  var url = "/listarrutasuser";

  var ul = document.getElementById('cuadro');
  var crear = ul.querySelectorAll('li')[0];

  crear.addEventListener("click", Buscar, false);

  $.getJSON(url, function(data) {
      
      if(typeof data.error !== "undefined"){
        alert("Imposible listar las ruta: " + data.error.message);
      }
      else{
        removeElement(document.getElementById('contenido'));
        var privada = document.createElement('div');
        privada.id = "contenido";
        insertAsLastChild(document.getElementById('cuadro'), privada);

        var texto = document.createElement('div');
        texto.id = "sinrutas";
        texto.innerHTML = "Todavia no tienes creada una ruta, en la pestaña \"Crear\" puedes crear tus propias rutas"; 
        insertAsLastChild(document.getElementById('contenido'), texto);

        var divaux = document.createElement('div');
        divaux.id = "rutas";

        $.each(data.result, function(index, item) {
          if(document.getElementById('sinrutas') !== null){
            removeElement(document.getElementById('sinrutas'));
            insertAsLastChild(document.getElementById('contenido'), divaux);
          }

          var enlace = document.createElement('div');
          enlace.innerHTML = '<input class="ruta" type="button" value=\"' + item + '\"></input>';
          enlace.addEventListener("click", BuscarRutaEditar, false);
          insertAsLastChild(document.getElementById('rutas'), enlace);
        });
     }
  })    
  .fail(function(data){
    alert("Error al crear la ruta");
  });

  var urlaux = "borrarpuntossinruta";

  $.getJSON(urlaux, function(data) {
  })    
  .fail(function(data){
      alert("Error integridad");
  });
}

//Muestra la información de la ruta clickada en el panel de TusRutas
function BuscarRutaEditar(){

  ruta = this.querySelector('input').value;
  
  if(ruta===""){
    if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));

    if(document.getElementById('textruta')!=null)
        removeElement(document.getElementById('textruta'));      

    if(document.getElementById('rutas')!=null)
      removeElement(document.getElementById('rutas'));

    window.alert("Es necesario el nombre de una ruta para la Busqueda");   
  }

  else{
    var url = "buscarruta?nombre=" + ruta;

    $.getJSON(url, function(data) {
      if(typeof data.error !== "undefined"){
        if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));
        
        if(document.getElementById('textruta')==null){
          var textruta = document.createElement('label');
          textruta.id = "textruta";
          insertAsLastChild(document.getElementById('contenido'), textruta);
        }

        if(document.getElementById('rutas')!=null)
          removeElement(document.getElementById('rutas'));

        document.getElementById('textruta').innerHTML = data.error.message + " \"" + ruta + "\"";
      }
      else{

        if(document.getElementById('info')!=null)
          removeElement(document.getElementById('info'));

        if(document.getElementById('textruta')!=null)
          removeElement(document.getElementById('textruta'));          

        if(document.getElementById('rutas')!=null)
          removeElement(document.getElementById('rutas'));
        
        var info = document.createElement('div');
        info.id = "info";

        info.innerHTML= '<div id="nombre"><b>Nombre: </b>' + data.result.nombre +  '</div>\
              <div><b>Descripcion: </b>' + data.result.descripcion + '</div><br>';

        insertAsLastChild(document.getElementById('contenido'), info);

        //Obtenemos el nombre de la ruta para poder hacer la edición
        nombreParaEditar = data.result.nombre;

        removeElement(document.getElementById('map'));
        var map = document.createElement('div');
        map.id = 'map';

        map.innerHTML = '<div id=\'inputs\'></div>\
                         <div id=\'errors\'></div>\
                         <div id=\'directions\'>\
                           <div id=\'routes\'></div>\
                           <div id=\'instructions\'></div>\
                         </div>';

        insertAsFirstChild(document.querySelector('main'), map);

        L.mapbox.accessToken = accessToken;
        
        var map = L.mapbox.map('map', 'mapbox.streets', {
            zoomControl: true
        }).setView([38.385213, -0.513532], 16);

        // move the attribution control out of the way
        map.attributionControl.setPosition('bottomleft');
        L.control.scale().addTo(map);

        var directions = L.mapbox.directions({
                  profile: 'mapbox.walking',
                  units: 'metric'
              });

        var tam = data.result.Puntos.length;
        var marker;
        var i = 0;
        
        directions.setOrigin(L.latLng(data.result.Puntos[0].lat, data.result.Puntos[0].lng));
        info.innerHTML += '<div id="itinerario"><b>ITINERARIO: </b></div>\
                           <div id=\"' + (i+1) + '\">' + data.result.Puntos[i].nombreP + '</div>'
        
        marker = L.marker(L.latLng(data.result.Puntos[0].lat, data.result.Puntos[0].lng), {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': 1
          }),
          draggable: false
        }).addTo(map);
        
        marker.bindPopup("<b>"+ data.result.Puntos[0].nombreP + "</b><br>"+ data.result.Puntos[0].desc).openPopup();                           

        for (i = 1; i < tam-1; i++){
          directions.addWaypoint(i, L.latLng(data.result.Puntos[i].lat, data.result.Puntos[i].lng));
          info.innerHTML += '<div id=\"' + (i+1) + '\">' + data.result.Puntos[i].nombreP + '</div>';

          marker = L.marker(L.latLng(data.result.Puntos[i].lat, data.result.Puntos[i].lng), {
            icon: L.mapbox.marker.icon({
              'marker-color': '#f86767',
              'marker-symbol': i+1
            }),
              draggable: false
          }).addTo(map);
        
          marker.bindPopup("<b>"+ data.result.Puntos[i].nombreP + "</b><br>"+ data.result.Puntos[i].desc);
        };

        directions.setDestination(L.latLng(data.result.Puntos[tam-1].lat, data.result.Puntos[tam-1].lng));        
        info.innerHTML += '<div id=\"' + tam + '\">' + data.result.Puntos[tam-1].nombreP + '</div>';

        marker = L.marker(L.latLng(data.result.Puntos[tam-1].lat, data.result.Puntos[tam-1].lng), {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': tam
          }),
          draggable: false
        }).addTo(map);
        
        marker.bindPopup("<b>"+ data.result.Puntos[tam-1].nombreP + "</b><br>"+ data.result.Puntos[tam-1].desc);

        var directionsLayer = L.mapbox.directions.layer(directions).addTo(map);
        var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions).addTo(map);
        var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions).addTo(map);
        var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions).addTo(map);        
        var myLayer = L.mapbox.featureLayer().addTo(map);

        directions.query();

        var input = document.createElement('input');
        input.id = "boton";
        input.type = "button";
        input.value = "Editar Ruta";

        // Ya tenemos en nombre de la ruta en "nombreParaEditar"
        insertAsLastChild(document.getElementById('contenido'), input);

        input.addEventListener("click", EditarRuta, false);
      }
    })
    .fail(function(data){
      alert("Fallo al buscar la ruta");
    });
  }
}

//Crea el panel donde e va a llevar a cabo la edición de la ruta
function EditarRuta(){
  var myWindow = myWindow = window.open("editarRuta.jsp", "MsgWindow", "width=1200,height=600,top=50,left=75");
}

//refresca la página para los cambios
function refresh(){
  location.reload(true);
}

function BorrarPunto(nombreR, nombreP){
  var url = "borrarpunto?nombreR=" + nombreR + "&nombreP=" + nombreP;
      
      $.getJSON(url, function(data) {      
        if(typeof data.error !== "undefined"){
          alert(data.error.message);
        }
        else{
        }
       }).fail(function(data){            
      });
}