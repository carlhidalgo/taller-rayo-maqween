//modal

var myModal = new bootstrap.Modal(document.getElementById('carritoModal'), {} )

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
	if (nombre.length >= 3 || nombre.length > 21) {
		alert("El nombre debe tener entre 3 y 20 caracteres.");
		return false;
	}
	var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email.match(emailFormat) ) {
		alert("Por favor, ingrese un correo electrónico válido.");
		return false;
	}
	var phoneFormat = /^\d+$/;
	if (!phone.match(phoneFormat)) {
		alert("Por favor, ingrese un número de teléfono válido.");
		return false;
	}
	if (message.length > 100) {
        alert("El mensaje debe tener un máximo de 100 caracteres.");
        return false;
    }
	return true;
}

//////////////////reserva///////////////////////////	
/*
var select = document.getElementById("anioSelect");
    var year = new Date().getFullYear();
    var earliestYear = 1950;

    for(var i = year; i >= earliestYear; i--){
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        select.appendChild(option); 
    }
	*/
$(document).ready(function() {
    var $select = $("#anioSelect");
    var year = new Date().getFullYear();
    var earliestYear = 1950;
    var options = "";

    for(var i = year; i >= earliestYear; i--){
        options += `<option value="${i}">${i}</option>`;
    }

    $select.html(options);
});


	
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

// API

	$(document).ready(function() {
		// Reemplaza 'your_api_key' con tu clave API de OpenWeatherMap
		var apiKey = 'a4a334d9aee54dc41211d403964ea7cc';
	
		// Define la ciudad para la que deseas obtener el clima
		var city = 'Viña del Mar';
	
		// Construye la URL para la API de OpenWeatherMap
		var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
	
		// Realiza una solicitud GET a la API de OpenWeatherMap
		$.get(apiUrl, function(response) {
			// Extrae la temperatura actual (en grados Kelvin)
			var temperatureInKelvin = response.main.temp;
	
			// Convierte la temperatura a Celsius
			var temperatureInCelsius = Math.round(temperatureInKelvin - 273.15);
	
			// Extrae la descripción del clima
			var weatherDescription = response.weather[0].description;
	
			// Actualiza los elementos HTML con la temperatura y la descripción del clima
			$('#temperature').text('Temperature: ' + temperatureInCelsius + '°C');
			$('#weather').text('Weather: ' + weatherDescription);
		});
	});
	
	
	
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
//////////////////barra loging dropdown///////////////////////////
$(document).ready(function() {
	$(document).click(function(event) {
		var clickover = $(event.target);
		var _opened = $(".dropdown-toggle").hasClass("show");
		if (_opened === true && !clickover.closest('.dropdown').length) {
			$(".dropdown-toggle").dropdown('toggle');
		}
	});
});

// CARRITO 



	