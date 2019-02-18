<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>FAQ</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="./css/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="./css/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="./css/faq.css" />

    <script type="text/javascript" src="./js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="./css/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">

<div class="page-header">
    <h1>Preguntas Frecuentes</h1>
</div>

<!-- Bootstrap FAQ - START -->
<div class="container">
    <div class="panel-group" id="accordion">
        <div class="faqHeader">Preguntas Generales</div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">UA Routes</a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in">
                <div class="panel-body">
                    <strong>UA Routes</strong> pretende ser una applicación que facilite la visualización de datos abiertos sobre rutas en la Universidad de Alicante, así como una plataforma para compartir rutas personalizadas de los usuarios
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTen">Como buscar una ruta?</a>
                </h4>
            </div>
            <div id="collapseTen" class="panel-collapse collapse">
                <div class="panel-body">
                   Para poder buscar una ruta no tienes más que selecionar una de las ya disponibles nada más entrar en la applicación. Solo tendrás que hacer click en el nombre de la ruta y listo. Tmambién dispones de un buscador para buscar rutas por su nombre.
                </div>
            </div>
        </div>

        <div class="faqHeader">Acerca de las rutas</div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Como crear una ruta</a>
                </h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse">
                <div class="panel-body">
                   En el apartado <strong><i>"Crear"</i></strong> podrás crear tus propias rutas. Para ello necesitarás crear dos puntos para la ruta, dar un nombre y desccripción para esta. Para crear los puntos bastará con hacer click sobre el mapa donde quieres que este localizado el punto y rellenar el form con la información del punto.
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Como ver mis rutas</a>
                </h4>
            </div>
            <div id="collapseThree" class="panel-collapse collapse">
                <div class="panel-body">
                    En el apartado <strong><i>"Tus Rutas"</i></strong> podrás ver todas las rutas que has creado y verlas haciendo click sobre el nombre. También dispondrás de un botón de "Editar" por si deseas editar alguna ruta.
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive">Como editar una ruta</a>
                </h4>
            </div>
            <div id="collapseFive" class="panel-collapse collapse">
                <div class="panel-body">
                    Ver la pregunta <strong>Como ver mis rutas</strong> para saber donde encontrar el boton editar. 
                    <br />
                    Una vez en el apartado para editar la ruta, podrás reordenar los puntos, añadir puntos nuevos y borrar puntos. 
                    <ul>
                        <li>Para reorganizar los puntos arrastra el punto a una nueva posición y este se susituirá por el de la nueva posición.</li>
                        <li>Para añadir un nuevo punto, haz click sobre el enlace de "Añadir Punto", selecciona el lugar del nuevo punto en el mapa y rellena el formulario con su información.</li>
                        <li>Para borrar un punto no hay más que usar la cruz asociada a cada punto.</li>
                    </ul>
                    Una vez hecho los cambios tenemos 3 opciones asociadas a 3 botones: <strong>"Guardar"</strong> los cambios, <strong>"Borrar"</strong> la ruta o <strong>"Volver"</strong> y deshacer los cambios.
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Bootstrap FAQ - END -->

</div>

</body>
</html>