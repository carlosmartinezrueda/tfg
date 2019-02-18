
window.onload = function () {
  document.getElementById('btn').addEventListener("click", addRuta, false);
 //Check the support for the File API support 
 if (window.File && window.FileReader && window.FileList && window.Blob) {
    var fileSelected = document.getElementById('txtfiletoread');
    fileSelected.addEventListener('change', function (e) { 
         //Set the extension for the file 
         var fileExtension = /text.*/; 
         //Get the file object 
         var fileTobeRead = fileSelected.files[0];
        //Check of the extension match 
         if (fileTobeRead.type.match(fileExtension)) { 
             //Initialize the FileReader object to read the 2file 
             var fileReader = new FileReader(); 
             
             fileReader.onload = function (e) { 
                 var fileContents = document.getElementById('filecontents'); 
                 fileContents.innerText = fileReader.result;
                 lines = fileReader.result.split(/\r?\n/);

                 lines.forEach(function (line){
                    var punto = line.split(/\;/);
                    alert(punto[0]);
                    var nombre = document.getElementById('nombre').value;
                    
                    url = '/nuevopunto?nombreR=' + nombre + '&nombreP=' + punto[0]+ '&desc=' + punto[1] + '&lat=' + punto[2] + '&lng=' + punto[3] + '&pos=' + punto[4];
            
                    $.getJSON(url, function(data) {
      
                        if(typeof data.error !== "undefined"){
                            alert("Imposible crear el punto, " + data.error.message);
                        }

                        else{
                        
                        }
                    })    
                    .fail(function(data){
                      alert("Error al crear la ruta");
                    });

                 });
             } 
             fileReader.readAsText(fileTobeRead);
         } 
         else { 
             alert("Please select text file"); 
         }
 
    }, false);
} 
 else { 
     alert("Files are not supported"); 
 } 
}

function addRuta(){
    var nombre = document.getElementById('nombre').value;
    var desc = document.getElementById('desc').value;
    var url = '/nuevaruta?nombre=' + nombre + '&descripcion=' + desc;
    alert(nombre);
    $.getJSON(url, function(data) {
      
        if(typeof data.error !== "undefined"){
            alert("Imposible crear la ruta, " + data.error.message);
        }

        else{
        
        }
    })    
    .fail(function(data){
      alert("Error al crear la ruta");
    });
}