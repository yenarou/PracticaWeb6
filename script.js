function ValidarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value.trim();
    const equipo = document.getElementById("nombre-equipo").value.trim();
    const numero = document.getElementById("numero-jugador").value.trim();
    const posicion = document.getElementById("posicion").value.trim();
    const aceptado = document.getElementById("aceptar").checked;

    let error = "";

    // 1. Campos obligatorios
    if (!nombre || !telefono || !direccion || !fechaNacimiento || !equipo || !numero || !posicion) {
        error = "Todos los campos obligatorios deben estar completos.";
    }

    // 2. Teléfono (10 dígitos)
    const telefonoLimpio = telefono.replace(/\D/g, "");
    if (!error && telefonoLimpio.length !== 10) {
        error = "El número de teléfono debe tener 10 dígitos.";
    }

    // 3. Fecha (< 100 años)
    if (!error) {
        const partes = fechaNacimiento.split("/");
        if (partes.length !== 3) {
            error = "Formato de fecha inválido (usa dd / mm / aaaa).";
        } else {
            const dia = parseInt(partes[0]);
            const mes = parseInt(partes[1]) - 1;
            const anio = parseInt(partes[2]);

            const fechaNac = new Date(anio, mes, dia);
            const hoy = new Date();

            if (isNaN(fechaNac.getTime())) { // Checa ms desde 1970
                error = "Fecha de nacimiento inválida.";
            } else {
                let edad = hoy.getFullYear() - fechaNac.getFullYear();

                if (edad >= 100) {
                    error = "La edad no puede ser mayor o igual a 100 años.";
                }
            }
        }
    }

    if (!error && !aceptado) {
        error = "Debes aceptar los términos.";
    }

    if (error) {
        alert(error);
        return;
    }

    alert("Formulario válido");
}