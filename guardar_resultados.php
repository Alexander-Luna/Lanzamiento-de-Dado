<?php
$resultadosJSON = file_get_contents("resultados.json");
$resultados = json_decode($resultadosJSON, true);

if ($resultados === null) {
  $resultados = array();
}

$data = file_get_contents('php://input');
$nuevosResultados = json_decode($data, true);

if ($nuevosResultados !== null) {
  $resultados = array_merge($resultados, $nuevosResultados);
  $resultadosJSON = json_encode($resultados);

  file_put_contents("resultados.json", $resultadosJSON);
}
?>
