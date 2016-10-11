
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Casa Bombillo</title>

     <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">


    <link rel="stylesheet" href="/css/main.css">

    
  </head>

  <body ng-app="cbbackend">

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="/logout">Salir</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li ng-class="{active: current == 'productos' || current == undefined}" ng-click="current = 'productos'"><a href="#/productos">Productos <span class="sr-only">(current)</span></a></li>
            <li ng-class="{active: current == 'categorias'}" ng-click="current = 'categorias'"><a href="#/categorias">Categorias</a></li>
            <li ng-class="{active: current == 'admin'}" ng-click="current = 'admin'"><a href="#/admin">Administrador</a></li>
          </ul>
        </div>


        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div ui-view class="view"></div>

        </div>
          
      </div>
    </div>

    <!-- build:js js/final/vendor.js -->
    <!-- bower:js -->
    <script src="components/jquery/dist/jquery.min.js"></script>
    <script src="components/angular/angular.js"></script>
    <script src="components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="components/angular-upload/angular-upload.js"></script>
    <script src="components/idb/lib/idb.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

    <script src="//cdn.ckeditor.com/4.5.11/standard/ckeditor.js"></script>

    

   <script src="js/final/main.js"></script>
  </body>
</html>
