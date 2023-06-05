<!DOCTYPE html>
<html>

<head>
  <title>Lanzamiento de Dados</title>
  <link href="style.css" rel="stylesheet" type="text/css">
  <script src="funciones.js"></script>
</head>

<body>
  <h1 id="titulo">Lanzamiento de Dados</h1>
  <img id="gif-carga" src="img/gifdado.gif">
  <div id="dado"></div>
  <input type="number" id="num-lanzamientos" placeholder="Número de lanzamientos" class="modern-input">

  <div class="button-container">
    <button onclick="realizarLanzamientos()">Realizar Lanzamientos</button>
    <button onclick="guardarLanzamiento()">Lanzar Dado</button>
    <button onclick="guardarResultados()">Guardar Resultados</button>
    <button onclick="mostrarResultados()">Mostrar Resultados</button>
    <button onclick="mostrarProbabilidad()">Calcular Probabilidad</button>
  </div>

  <div class="grid-container">
    <div id="lanzamientos-container">
      <h3>Resultados del Lanzamiento</h3>
    </div>
    <div>
      <h3>Resultados Guardados</h3>
      <ul id="resultados"></ul>
    </div>
    <div id="probabilidad">
      <h3>Probabilidad</h3>
    </div>
    <div id="info-paginacion"></div>
    <button id="btn-anterior" onclick="paginaAnterior()" disabled>Anterior</button>
    <button id="btn-siguiente" onclick="paginaSiguiente()" disabled>Siguiente</button>

  </div>

</body>

</html>