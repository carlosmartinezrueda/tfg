<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'>
  <title>Crear Ruta</title>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  
  <link id="estilo" rel="stylesheet" type="text/css" href="./css/editar.css">
  <link href='https://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type="text/css">
  <script type="text/javascript" src="./js/javascript-editar.js"></script>   
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
    <div id="map">
    <div id='directions'></div>
    </div>
    <div id="form">
      <p><b><i>Nombre de la Ruta*</i></b><p>
      <input id="nombreR" type="text" readonly></input>
      <p><b><i>Descripción</i></b><p>
      <TEXTAREA id="descripcion" title="Descripcion de la Ruta" placeholder="Descripcion de la Ruta" ROWS=3 COLS=15></TEXTAREA>
      <p id="puntosP"><b><i>Puntos</i></b><p id="punto"><a id="añadir">Añadir Punto</a>
      <div id="puntos">
        <ul id="ul"></ul>
      </div>
    </div>    
  </main>

  <footer>
    <i>*No se puede cambiar el nombre de la ruta</i>
    <input id="botonGuardar" type="button" value="Guardar"></input>
    <input id="botonBorrar" type="button" value="Borrar Ruta "></input>
    <input id="botonVolver" type="button" value="Volver"></input>
  </footer>

</body>
</html>