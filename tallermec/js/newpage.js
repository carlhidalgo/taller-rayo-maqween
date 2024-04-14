//poppover

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

/////////////// CARRUSEL


$(window).on('load', function(){
            $('#slider').nivoSlider();
        });


	
////////////////// contacto///////////////////////////	
	
		function validateFormCotacto() {
				var name = document.getElementById('name').value;
				var email = document.getElementById('email').value;
				var phone = document.getElementById('phone').value;
				var message = document.getElementById('message').value;
				if(name == "" || email == "" || phone == "" || message == "") {
					alert("Todos los campos deben estar llenos");
					return false;
				}
			
				return true;
			}
	
	
////////////////// contacto///////////////////////////	
	
function validateFormReserva() {
	var nombre = document.getElementById("nombreInput").value;
	var apellidos = document.getElementById("apellidosInput").value;
	var rut = document.getElementById("rutInput").value;
	var email = document.getElementById("emailInput").value;
	var telefono = document.getElementById("telefonoInput").value;
	var marca = document.getElementById("marcaInput").value;
	var anio = document.getElementById("anioSelect").value;

	if (nombre == "" || apellidos == "" || rut == "" || email == "" || telefono == "" || marca == "" || anio == "Seleccione año del vehiculo") {
		alert("Por favor, complete todos los campos del formulario.");
		return false;
	}

	// Validación de formato de correo electrónico
	var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email.match(emailFormat)) {
		alert("Por favor, ingrese un correo electrónico válido.");
		return false;
	}

	// Validación de formato de teléfono (solo dígitos)
	var phoneFormat = /^\d+$/;
	if (!telefono.match(phoneFormat)) {
		alert("Por favor, ingrese un número de teléfono válido.");
		return false;
	}

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




