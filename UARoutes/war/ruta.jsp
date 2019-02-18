<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'>
  <title>Crear Ruta</title>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  
  <link id="estilo" rel="stylesheet" type="text/css" href="./css/ruta.css">
  <link href='https://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type="text/css">
  <script type="text/javascript" src="./js/javascript-ruta.js"></script>   
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <script src="http://cdn.leafletjs.com/leaflet-0.7.4/leaflet.js"></script>
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.4/leaflet.css">

  <link rel="stylesheet" type="text/css" href="./css/leaflet-routing-machine.css">
  <script type="text/javascript" src="./js/leaflet-routing-machine.js"></script>
  <script type="text/javascript" src="./js/lrm-mapbox.js"></script>

  
  <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-draw/v0.2.3/leaflet.draw.css' rel='stylesheet' />
  <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-draw/v0.2.3/leaflet.draw.js'></script>

  <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
  <link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />

  <script src='https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.js'></script>
  <link rel='stylesheet' href='https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.css' type='text/css' />

  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery.tools.js"></script>
  <script type="text/javascript" src="js/jquery.uniform.min.js"></script>

</head>

<body>
  <header>
    <h1 id="title"></h1>    
  </header>
  
  <main>
    <div id="map"></div>
    <div id="form">
      <input id="nombreP" type="text" title="Nombre del punto" placeholder="Nombre del punto"></input>
      <TEXTAREA id="descripcion" title="Descripcion" placeholder="Descripcion" ROWS=3 COLS=20></TEXTAREA>
      <input id="boton" type="button" value="Añadir Punto"></input>
    </div>    
  </main>

</body>
</html>