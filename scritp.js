// Seleccionamos los elementos necesarios
const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll("#botones button");

// Variables para almacenar los valores
let operadorActual = "";
let operadorAnterior = "";
let operacion = null;

// Función para actualizar la pantalla
function actualizarPantalla() {
    pantalla.value = operadorActual || "0";
}

// Función para manejar los clics en los botones
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;

        if (!isNaN(valor)) {
            // Si es un número
            operadorActual += valor;
        } else if (valor === "C") {
            // Limpiar la pantalla
            operadorActual = "";
            operadorAnterior = "";
            operacion = null;
        } else if (valor === "=") {
            // Realizar la operación
            if (operadorAnterior && operadorActual && operacion) {
                operadorActual = calcular(operadorAnterior, operadorActual, operacion);
                operadorAnterior = "";
                operacion = null;
            }
        } else {
            // Si es un operador (+, -, *, /)
            if (operadorActual) {
                operadorAnterior = operadorActual;
                operadorActual = "";
                operacion = valor;
            }
        }

        // Actualizar la pantalla
        actualizarPantalla();
    });
});

// Función para calcular
function calcular(a, b, operacion) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operacion) {
        case "+":
            return (num1 + num2).toString();
        case "-":
            return (num1 - num2).toString();
        case "*":
            return (num1 * num2).toString();
        case "/":
            return num2 !== 0 ? (num1 / num2).toString() : "Error";
        default:
            return "0";
    }
}

// Mostrar el valor inicial en la pantalla
actualizarPantalla();
