var accessToken = 'pk.eyJ1IjoiYXJ0aHlvbSIsImEiOiJjaWwxMTRrcGswMDlwdzltMG8wMWpoeWEwIn0.1YjqxG-8GJDU27DT_nDwHw';

//Al cargar la página que llame a init()
window.onload = function(){
  init();
};

function init(){
	L.mapbox.accessToken = accessToken;
  
	var map = L.mapbox.map('map', 'mapbox.streets', {
    	zoomControl: false
    }).setView([window.opener.coor.lat, window.opener.coor.lng], 16);

    var marker = L.marker(window.opener.coor, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': window.opener.pos
          }),
          draggable: false
      }).addTo(map);
    
	document.getElementById('title').innerHTML = window.opener.document.getElementById("textbuscar").value;
	document.getElementById("boton").addEventListener("click", crearPunto, false);
}

function crearPunto(){
  var nombreR = document.getElementById('title').innerHTML;
	var nombreP = document.getElementById('nombreP').value;
  var descripcion = document.getElementById('descripcion').value;
  var lat = window.opener.coor.lat;
  var lng = window.opener.coor.lng;
  var pos = window.opener.pos;

  if(nombreP !== "" && descripcion !== ""){
    var url = "nuevopunto?nombreR=" + nombreR + "&nombreP=" + nombreP + "&desc=" + descripcion + "&lat=" + lat + "&lng=" + lng + "&pos=" + pos;

    $.getJSON(url, function(data) {      
      if(typeof data.error !== "undefined"){
        alert(data.error.message);
      }
      else{
        window.opener.pos++;
        window.close();
      }
    }).fail(function(data){
      alert("Error al crear el punto:" + data.error);
    });
  }
  else if(nombreP === ""){
    alert("Es necesario un nombre para el punto");
  }
  else{
    alert("Es necesario una descripcion para el punto");
  }
}