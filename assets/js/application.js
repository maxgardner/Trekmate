




var database = firebase.database();

console.log(database);

//getting all the elements in the dom
const txtEmail = $("#txtEmail");
const txtPassword = $("#txtPassword");
const btnLogin = $("#btnLogin");
const btnSignUp = $("#btnSignUp");
const btnLogout = $("#btnLogout");

//add login event
$("#btnLogin").on("click", function(){
	const email = txtEmail.val();
	const pass = txtPassword.val();
	const auth = firebase.auth();
	console.log("buttton worked");
	//sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
	$('.loginDisplay').addClass("hide");
})
$("#btnSignUp").on("click", function(){
	const email = txtEmail.val();
	const pass = txtPassword.val();
	const auth = firebase.auth();
	//sign in
	//check for real email
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
})
$("#btnLogout").on("click", function(){
	firebase.auth().signOut();
	$("#btnLogout").addClass("hide");
	$(".loginDisplay").removeClass("hide");
	
})
	
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		$('#btnLogout').removeClass("hide");
} else {
	console.log("not logged in");
}


// FOR THE WEATHER

// Pull user's city input

	$("#set-location").on("click", function() {

		var location = $("#user-location").val().trim();
		checkWeather(location);
	});


	// Figure out corresponding Weather Icons class

	function parseIcon(icon) {
		var iconToUse = "wi ";

		switch(icon) {
			case "11d":
				iconToUse += "wi-storm-showers";
				break;
			case "09d":
				iconToUse += "wi-rain";
				break;
			case "10d":
				iconToUse += "wi-day-rain";
				break;
			case "13d":
				iconToUse += "wi-snowflake-cold";
				break;
			case "50d":
				iconToUse += "wi-fog";
				break;
			case "01d":
				iconToUse += "wi-day-sunny";
				break;
			case "01n":
				iconToUse += "wi-night-clear";
				break;
			case "02d":
				iconToUse += "wi-day-cloudy";
				break;
			case "03d":
			case "03n":
			case "04d":
			case "04n":
				iconToUse += "wi-cloudy";
				break;
		};

		return iconToUse;
	};
	function googlePlaces(){
		$.ajac({
			url: querylUrl
			method: "GET"
		}).done(function(response){
			console.log(response);

		})
	}

	// Pull user's weather to query Open Weather API

	function checkWeather(location) {

		var queryURL = "http://api.openweathermap.org/data/2.5/weather?apikey=235f61aaee804ad248cc025993b5c001&units=imperial&q=" + location;
		// var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + loc.lat + "&lon=" + loc.lon;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(result) {
			console.log(result);
			var weatherClass = parseIcon(result.weather[0].icon);

			// Create HTML elements for the results
			var $weatherIcon = $("<i/>").attr("class", weatherClass);
			$("#weather-icon").html($weatherIcon);
			var $cityName = $("<h5/>").text(result.name).appendTo($("#city-name"));
			var $maxTemp = $("<p/>").attr("class", "max-temp").html(result.main.temp_max + "&deg;");
			$("#max-temp").html($maxTemp);
			var $minTemp = $("<p/>").attr("class", "min-temp").html("Low: " + result.main.temp_min + "&deg;");
			var $humidity = $("<p/>").html(result.main.humidity + "&#37; humidity");

			$("#weather").append($minTemp, $humidity);

			console.log($("#weather"));

		}).fail(function(error) {
			console.log("Error: " + error);
		})
	}
	

