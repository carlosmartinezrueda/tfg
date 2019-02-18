<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'>
  <title>UA Routes</title>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  
  <link id="estilo" rel="stylesheet" type="text/css" href="./css/normal.css">
  <link href='https://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type="text/css">
  <script type="text/javascript" src="./js/javascript.js"></script>   
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <script src="http://cdn.leafletjs.com/leaflet-0.7.4/leaflet.js"></script>
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.4/leaflet.css">

  <link rel="stylesheet" type="text/css" href="./css/leaflet-routing-machine.css">
  <script type="text/javascript" src="./js/leaflet-routing-machine.js"></script>
  <script type="text/javascript" src="./js/lrm-mapbox.js"></script>

  
  <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-draw/v0.2.3/leaflet.draw.css' rel='stylesheet' />
  <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-draw/v0.2.3/leaflet.draw.js'></script>

  <script src='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.js'></script>
  <link href='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.css' rel='stylesheet' />

  <script src='https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.js'></script>
  <link rel='stylesheet' href='https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.css' type='text/css' />

</head>

<body>
  <header>
    <h1>UA Routes</h1>
    
  </header>
  
  <main>

<div id="map"></div>


<div id="cuadro">
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#" aria-expanded="true">Buscar</a></li>
    <li><a data-toggle="tab" href="#" aria-expanded="false">Tus Rutas</a></li>
    <li><a data-toggle="tab" href="#" aria-expanded="false">Crear</a></li>
  </ul>
  <div id="contenido"> 
    <input id="textbuscar" type="text" title="Nombre de la ruta" placeholder="Nombre de la ruta"></input>
    <input id="boton" type="button" value="Buscar"></input>
    <label id="textruta"></label>
    <div id="rutas"></div>
  </div>
</div>

  </main>
  
  <footer>
    <span id="FAQ"><a href="/faq.jsp">FAQ</a></span> |
    <span id="usuario">
      <%= request.getAttribute("usuario")%> 
    </span> |
    <span id="logout"><a href="<%= request.getAttribute("logout")%>">Salir</a></span>
  </footer>

</body>
</html>