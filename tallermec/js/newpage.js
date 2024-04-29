//poppover

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

/////////////// CARRUSEL


$(window).on('load', function(){
            $('#slider').nivoSlider();
        });


	
////////////////// contacto///////////////////////////	
	
		
			function validateFormCotacto() {
				var name = $('#name').val();
				var email = $('#email').val();
				var phone = $('#phone').val();
				var message = $('#message').val();
				if (name == "" || email == "" || phone == "" || message == "") {
					alert("Todos los campos deben estar llenos");
					return false;
				}

				return true;
			}
		
////////////////// contacto///////////////////////////	
	
function validateFormReserva() {
	var nombre = $("#nombreInput").val();
	var apellidos = $("#apellidosInput").val();
	var rut = $("#rutInput").val();
	var email = $("#emailInput").val();
	var telefono = $("#telefonoInput").val();
	var marca = $("#marcaInput").val();
	var anio = $("#anioSelect").val();
	

	if (nombre == "" || apellidos == "" || rut == "" || email == "" || telefono == "" || marca == "" || anio == "Seleccione año del vehiculo") {
		alert("Por favor, complete todos los campos del formulario.");
		return false;
	}

	// Validación de largo
	if (nombre.length >= 3 || nombre.length > 21) {
		alert("El nombre debe tener entre 3 y 20 caracteres.");
		return false;
	}

	if (apellidos.length >= 3 || apellidos.length > 21) {
		alert("El apellido debe tener entre 3 y 20 caracteres.");
		return false;
	}
	if ( rut.length < 11 || rut.length > 8) {
		alert("El rut debe tener entre 8 y 10 caracteres.");
		return false;
	}

	if (telefono.length >= 9 || telefono.length > 12) {
		alert("El teléfono debe tener entre 9 y 12 caracteres.");
		return false;
	}
	
	// Validación de formato de correo electrónico
	var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email.match(emailFormat) ) {
		alert("Por favor, ingrese un correo electrónico válido.");
		return false;
	}

	// Validación de formato de teléfono (solo dígitos)
	var phoneFormat = /^\d+$/;
	if (!telefono.match(phoneFormat)) {
		alert("Por favor, ingrese un número de teléfono válido.");
		return false;
	}

	// Validación de formato de RUT
	
	return true;

	


}

//////////////////barra de contacto///////////////////////////	
	var v = 48;
 	$(".legend").click(function(){
	if (v ==48){ 
	    v = 480;
		$("#wrapper-formulario").height(v);
	} 
	else{
		v = 48;
    	$("#wrapper-formulario").height(v);
	}});
	
	$("#onecontact").click(function(){
	if (v ==48){ 
	    v = 480;
		$("#wrapper-formulario").height(v);
	} 
	else{
		v = 48;
    	$("#wrapper-formulario").height(v);
	}}); 




