var accessToken = 'pk.eyJ1IjoiYXJ0aHlvbSIsImEiOiJjaWwxMTRrcGswMDlwdzltMG8wMWpoeWEwIn0.1YjqxG-8GJDU27DT_nDwHw';



var tamaño;

var lat;
var lng;
var pos;

//Inserta el nodo como el último hijo del nodo "padre"
function insertAsLastChild(padre, nuevo){
  padre.appendChild(nuevo);
}

//Inserta el nodo como el primer hijo del nodo "padre"
function insertAsFirstChild(padre, nuevo){
  padre.insertBefore(nuevo, padre.firstChild);
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

//Elimina el nodo pasado como paramtero
function removeElement(nodo){
    queryAncestorSelector(nodo, '*').removeChild(nodo);
}

//Al cargar la página que llame a init()
window.onload = function(){
  init();
};

function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
}

function init(){
	L.mapbox.accessToken = accessToken;
  
	var map = L.mapbox.map('map', 'mapbox.streets', {
    	zoomControl: false
    }).setView([38.385213, -0.513532], 16);

    L.control.scale().addTo(map);

    document.getElementById('nombreR').value = window.opener.nombreParaEditar;
    document.getElementById('botonVolver').addEventListener("click", Volver, false);
    document.getElementById('botonGuardar').addEventListener("click", ActualizarRuta, false);

    var url = "buscarruta?nombre=" + window.opener.nombreParaEditar;

    $.getJSON(url, function(data) {
      if(typeof data.error !== "undefined"){
      	alert(data.error.message);
      }

      else{
      	var directions = L.mapbox.directions({
                  profile: 'mapbox.walking',
                  units: 'metric'
              });

        var tam = data.result.Puntos.length;
        tamaño = tam;
        document.getElementById('descripcion').innerHTML = data.result.descripcion;
        var ul = document.getElementById('ul');

        var i = 0;
        
        //var div = document.createElement('div');
        //div.innerHTML = '<li draggable="true">' + data.result.Puntos[i].nombreP + '</li>';
        //insertAsLastChild(ul, div);
        //addCruz(div);
        
        directions.setOrigin(L.latLng(data.result.Puntos[i].lat, data.result.Puntos[i].lng));        
        ul.innerHTML += '<div class="contenedor"><li draggable="true">' + data.result.Puntos[i].nombreP + '</li></div>';

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
          ul.innerHTML += '<div class="contenedor"><li draggable="true">' + data.result.Puntos[i].nombreP + '</li></div>';
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
        ul.innerHTML += '<div class="contenedor"><li draggable="true">' + data.result.Puntos[tam-1].nombreP + '</li></div></div>';
        marker = L.marker(L.latLng(data.result.Puntos[tam-1].lat, data.result.Puntos[tam-1].lng), {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': tam
          }),
          draggable: false
        }).addTo(map);
        
        marker.bindPopup("<b>"+ data.result.Puntos[tam-1].nombreP + "</b><br>"+ data.result.Puntos[tam-1].desc);
        

        var directionsLayer = L.mapbox.directions.layer(directions).addTo(map);
        var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions).addTo(map);
        var myLayer = L.mapbox.featureLayer().addTo(map);

        directions.query();

        var dragSrcEl = null;

		function handleDragStart(e) {
		  dragSrcEl = this;

		  e.dataTransfer.effectAllowed = 'move';
		  e.dataTransfer.setData('text/html', this.innerHTML);
		}

		function handleDragOver(e) {
		  if (e.preventDefault) {
		    e.preventDefault(); // Necessary. Allows us to drop.
		  }

		  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

		  return false;
		}

		function handleDragEnter(e) {
		  // this / e.target is the current hover target.
		  this.classList.add('over');
		}

		function handleDragLeave(e) {
		  this.classList.remove('over');  // this / e.target is previous target element.
		}

		function handleDrop(e) {
		  // this/e.target is current target element.

		  if (e.stopPropagation) {
		    e.stopPropagation(); // Stops some browsers from redirecting.
		  }

		  // Don't do anything if dropping the same column we're dragging.
		  if (dragSrcEl != this) {
		    // Set the source column's HTML to the HTML of the columnwe dropped on.
		    dragSrcEl.innerHTML = this.innerHTML;
		    this.innerHTML = e.dataTransfer.getData('text/html');
		  }

		  return false;
		}

		function handleDragEnd(e) {
		  // this/e.target is the source node.

		  [].forEach.call(cols, function (col) {
		    col.classList.remove('over');
		  });
		}

        var cols = document.querySelectorAll('li');
			[].forEach.call(cols, function(col) {
			  col.addEventListener('dragstart', handleDragStart, false);
			  col.addEventListener('dragenter', handleDragEnter, false)
			  col.addEventListener('dragover', handleDragOver, false);
			  col.addEventListener('dragleave', handleDragLeave, false);
			  col.addEventListener('drop', handleDrop, false);
			  col.addEventListener('dragend', handleDragEnd, false);
			});

			document.getElementById('botonBorrar').addEventListener("click", BorrarRuta, false);

			var contenedor = document.querySelectorAll('.contenedor');

			for (var i = 0; i < contenedor.length; i++)
          		addCruz(contenedor[i]);

          	$('#añadir').click(
          		function AñadirPunto(){
				removeElement(document.getElementById('form'));
				removeElement(document.querySelector('footer'));
				removeElement(document.getElementById('map'));

				var divmap = document.createElement('div');
				divmap.id= "map";
				insertAsLastChild(document.querySelector('main'), divmap)

				var div = document.createElement('div');
				div.id = "form";
				div.innerHTML= '<div id="nombreRutaPunto"><b><i>Nombre de la ruta: \"' + window.opener.nombreParaEditar + '\"</b></i></div>\
				<input id="nombrePunto" type="text" title="Nombre del punto" placeholder="Nombre del punto"></input>\
				<TEXTAREA id="descripcionPunto" title="Descripcion" placeholder="Descripcion" ROWS=3 COLS=20></TEXTAREA>\
				<input id="boton" type="button" value="Añadir Punto"></input>'

				insertAsLastChild(document.querySelector('main'), div);
				var aux = false;

				L.mapbox.accessToken = accessToken;
  
				var map = L.mapbox.map('map', 'mapbox.streets', {
			    	zoomControl: false
			    }).setView([38.385213, -0.513532], 16);

				map.on('click', function(e){

					if(aux == false){
					  	marker = L.marker(e.latlng, {
			                icon: L.mapbox.marker.icon({
			                  'marker-color': '#f86767',
			                }),
			                draggable: false
			            }).addTo(map);

					  	aux = true;
					  	lat = e.latlng.lat;
					    lng = e.latlng.lng;
					    tamaño++;
					    pos = tamaño;
					}
				});

				document.getElementById('boton').addEventListener("click", NuevoPunto, false);	
			});
      }

  }).fail(function(data){
      alert("Fallo al buscar la ruta");
    });
}

//Función que añade la cruz al nodo pasado como parámetro y le asigna el manejador "borrarPregunta()"
function addCruz(nodo) {

	var n = document.createElement('div');
	n.className="borra";
	n.appendChild(document.createTextNode("\u2612"));

	insertAsLastChild(nodo, n);
	n.addEventListener("click", borrarPuntoLI, false);
}


//Actualiza la ruta en la base de Datos
function BorrarRuta(){
	confirmar = confirm("Seguro que desea borrar la ruta?");
	if (confirmar){
		var url = "borrarruta?nombreR=" + window.opener.nombreParaEditar;

	    $.getJSON(url, function(data) {
          if(typeof data.error !== "undefined") {
              alert(data.error.message);
          }
          else{
          	alert("Ruta \"" + document.getElementById('nombreR').value + "\" borrada");
          }	          
      	})
	    .fail(function(data) {	        
	    });

		window.opener.TusRutas();
		window.close();
	}
}

//Borra el punto al clickar la cruz
function borrarPuntoLI(){
	var contenedor = queryAncestorSelector(event.target, '.contenedor');
	window.opener.puntosDelete.push(contenedor.querySelector('li').innerHTML);
	removeElement(contenedor);
}

//Actualiza la ruta en la base de Datos
function ActualizarRuta(){

	confirmar = confirm("Desa guardar los cambios?");
	if (confirmar){
		var nombreR = window.opener.nombreParaEditar;

		for(var x in window.opener.puntosDelete)
			window.opener.BorrarPunto(nombreR, window.opener.puntosDelete[x]);

		var puntosRuta = document.querySelectorAll('li');

		for (var i = 0; i < puntosRuta.length; i++) {
          var nombreP = puntosRuta[i].innerHTML;
          var url = "actualizarpunto?nombreR=" + nombreR + "&nombreP=" + nombreP+ "&pos=" + (i+1);
          $.getJSON(url, function(data) {
		      if(typeof data.error !== "undefined"){
		      	alert(data.error.message);
		      }
		      else{
		      }
        	}).fail(function(data){
		    });
     	 }
     	window.opener.puntosAdd.length = 0; 
		window.opener.TusRutas();
		window.close();
	}
}

//Vuelve a la interfaz principal
function Volver(){
	var nombreR = window.opener.nombreParaEditar;
	for(var x in window.opener.puntosAdd){
		window.opener.BorrarPunto(nombreR, window.opener.puntosAdd[x]);
	}
	window.close();
}

function NuevoPunto(){

	var nombreR = window.opener.nombreParaEditar;
	var nombreP = document.getElementById('nombrePunto').value;
	var descripcion = document.getElementById('descripcionPunto').value;

	if(nombreP !== "" && descripcion !== "" && lat !== undefined){
    	var url = "nuevopunto?nombreR=" + nombreR + "&nombreP=" + nombreP + "&desc=" + descripcion + "&lat=" + lat + "&lng=" + lng + "&pos=" + pos;
    	
	    $.getJSON(url, function(data) {      
	      if(typeof data.error !== "undefined"){
	        alert(data.error.message);
	      }
	      else{
	        //window.opener.pos++;
	        window.opener.puntosAdd.push(nombreP);
	        removeElement(document.querySelector('main'));

			var main = document.createElement('main');
			main.innerHTML = '<div id="map">\
						    <div id=\"directions\"></div>\
						    </div>\
						    <div id="form">\
						      <p><b><i>Nombre de la Ruta*</i></b><p>\
						      <input id="nombreR" type="text" readonly></input>\
						      <p><b><i>Descripción</i></b><p>\
						      <TEXTAREA id="descripcion" title="Descripcion de la Ruta" placeholder="Descripcion de la Ruta" ROWS=3 COLS=15></TEXTAREA>\
						      <p id="puntosP"><b><i>Puntos</i></b><p id="punto"><a id="añadir">Añadir Punto</a>\
						      <div id="puntos">\
						        <ul id="ul"></ul>\
						      </div>\
						    </div>'

			insertAsLastChild(document.querySelector('body'), main);

			var footer = document.createElement('footer');
			footer.innerHTML = '<i>*No se puede cambiar el nombre de la ruta</i>\
		    <input id="botonGuardar" type="button" value="Guardar"></input>\
		    <input id="botonBorrar" type="button" value="Borrar Ruta "></input>\
		    <input id="botonVolver" type="button" value="Volver"></input>'

		    insertAsLastChild(document.querySelector('body'), footer);

		    init();
	      }
	    	}).fail(function(data){
	      		alert("Error al crear el punto:" + data.error);
	    	});
    }
    
    else if(nombreP === "")
      alert("Es necesario un nombre para el punto");
    
    else if(descripcion === "")
      alert("Es necesario una descripcion para el punto");

  	else
  		alert("Es necesario indicar un punto en el mapa");
}