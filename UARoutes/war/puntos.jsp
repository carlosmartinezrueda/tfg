<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    
    <meta charset="utf-8">

    <title>UA Routes</title>
    
    <script type="text/javascript" src="./js/javascript2.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>   
  
  </head>

  <style type="text/css"> 
     #filecontents { 
          border:double; 
       overflow-y:scroll; 
       height:400px; 
     }
     #sir {
      margin-bottom: 40px;
     }
</style>
<body>
  <div id="sir">
    <input id="nombre" type="text" title="Nombre" placeholder="Nombre"></input>
    <TEXTAREA id="desc" title="Descripcion" placeholder="Descripcion" ROWS=2 COLS=20></TEXTAREA> 
    <input id="btn" type="button" value="Añadir Ruta"></input>                     
  </div>
     Please Select text file of which contents are to be read: 
      <input type="file" id="txtfiletoread" />
    <div>The File Contents are as below:</div> 
     <div id="filecontents">
    </div>
</body>

</html>