
var lanzamientos = [];
var paginaActual = 1;
var resultadosPorPagina = 10;
var totalResultados = 0;
var numLanzamientosFaltantes = 0;


function lanzamientoDado() {
    var resultado = Math.floor(Math.random() * 6) + 1;
    return resultado;
}

function guardarLanzamiento() {
    var dado = document.getElementById("dado");
    var gifCarga = document.getElementById("gif-carga");
    dado.style.display = "none";
    gifCarga.style.display = "block";
    dado.style.animation = "rotate 1s linear";
    setTimeout(function () {
        var resultadoLanzamiento = lanzamientoDado();
        lanzamientos.push(resultadoLanzamiento);
        dado.style.animation = "";
        dado.style.backgroundImage = "url('img/cara" + resultadoLanzamiento + ".png')";
        dado.style.display = "block";
        gifCarga.style.display = "none";
        numLanzamientosFaltantes--;
        actualizarLanzamientosFaltantes();
        mostrarLanzamiento(resultadoLanzamiento);
    }, 500);
}

function actualizarLanzamientosFaltantes() {
    var inputNumLanzamientos = document.getElementById("num-lanzamientos");
    inputNumLanzamientos.value = numLanzamientosFaltantes;
}

function mostrarLanzamiento(resultado) {
    var lanzamientoDiv = document.createElement("div");
    lanzamientoDiv.textContent = "Resultado: " + resultado;
    document.getElementById("lanzamientos-container").appendChild(lanzamientoDiv);
}

function guardarResultados() {
    // Convertir el array de lanzamientos a JSON
    var resultadosJSON = JSON.stringify(lanzamientos);

    // Enviar los resultados al servidor mediante una solicitud AJAX
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Mostrar un mensaje de éxito cuando los resultados se guarden correctamente
            alert("Resultados guardados exitosamente");
        }
    };
    xmlhttp.open("POST", "guardar_resultados.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(resultadosJSON);
}

function mostrarResultados() {
    fetch("resultados.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (resultados) {
            totalResultados = resultados.length;
            lanzamientos = resultados;
            var resultadosHTML = "";
            var inicio = (paginaActual - 1) * resultadosPorPagina;
            var fin = inicio + resultadosPorPagina;

            for (var i = inicio; i < fin && i < totalResultados; i++) {
                var j = i + 1;
                resultadosHTML += "<li> Lanzamiento N.- " + j + " Resultado.- " + resultados[i] + "</li>";
            }

            document.getElementById("resultados").innerHTML = resultadosHTML;
            document.getElementById("info-paginacion").textContent = "Mostrando resultados " + (inicio + 1) + " - " + fin + " de " + totalResultados;
            actualizarBotonesPaginacion();
        });
}


function irPagina(pagina) {
    paginaActual = pagina;
    mostrarResultados();
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarResultados();
    }
}

function paginaSiguiente() {
    var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarResultados();
    }
}

function actualizarBotonesPaginacion() {
    var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
    var btnAnterior = document.getElementById("btn-anterior");
    var btnSiguiente = document.getElementById("btn-siguiente");

    btnAnterior.disabled = (paginaActual === 1);
    btnSiguiente.disabled = (paginaActual === totalPaginas);
}

function realizarLanzamientos() {
    var numLanzamientos = parseInt(document.getElementById("num-lanzamientos").value);
    if (!isNaN(numLanzamientos) && numLanzamientos > 0) {
        numLanzamientosFaltantes = numLanzamientos;
        actualizarLanzamientosFaltantes();

        for (var i = 0; i < numLanzamientos; i++) {
            guardarLanzamiento();
        }
    }
} function calcularProbabilidad() {
    var numLanzamientos = lanzamientos.length;
    var resultadoProbabilidad = {};

    // Calcular la frecuencia de cada número
    for (var i = 0; i < numLanzamientos; i++) {
        var resultado = lanzamientos[i];
        if (resultado in resultadoProbabilidad) {
            resultadoProbabilidad[resultado]++;
        } else {
            resultadoProbabilidad[resultado] = 1;
        }
    }

    // Calcular la probabilidad de cada número
    for (var resultado in resultadoProbabilidad) {
        var frecuencia = resultadoProbabilidad[resultado];
        var probabilidad = frecuencia / numLanzamientos;
        resultadoProbabilidad[resultado] = probabilidad;
    }

    return resultadoProbabilidad;
}


function mostrarProbabilidad() {
    var probabilidad = calcularProbabilidad();
    var probabilidadHTML = "<h2>Probabilidad de cada número:</h2><ul>";

    for (var resultado in probabilidad) {
        probabilidadHTML += "<li>Número " + resultado + ": " + (probabilidad[resultado] * 100).toFixed(2) + "%</li>";
    }

    probabilidadHTML += "</ul>";

    document.getElementById("probabilidad").innerHTML = probabilidadHTML;
}

