<!DOCTYPE html>
<html>

<head>
  <title>Lanzamiento de Dados</title>
  <link href="style.css" rel="stylesheet" type="text/css">
  <script src="funciones.js"></script>
</head>

<body>
  <h1>Lanzamiento de Dados</h1>
  <img id="gif-carga" src="img/gifdado.gif">
  <div id="dado"></div>
  <input type="number" id="num-lanzamientos" placeholder="Número de lanzamientos">
  <button onclick="realizarLanzamientos()">Realizar Lanzamientos</button>
  <button onclick="guardarLanzamiento()">Lanzar Dado</button>
  <button onclick="guardarResultados()">Guardar Resultados</button>
  <button onclick="mostrarResultados()">Mostrar Resultados</button>
  <ul id="resultados"></ul>
  <div id="info-paginacion"></div>
  <button id="btn-anterior" onclick="paginaAnterior()" disabled>Anterior</button>
  <button id="btn-siguiente" onclick="paginaSiguiente()" disabled>Siguiente</button>


  <div id="lanzamientos-container"></div>
</body>

</html>