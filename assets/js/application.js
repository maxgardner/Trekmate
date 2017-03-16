// Initialize Firebase
var config = {
  apiKey: "AIzaSyAh2KbxBIDfaljTf-1zuxRGW2paP3TDqIU",
  authDomain: "class-project-95553.firebaseapp.com",
  databaseURL: "https://class-project-95553.firebaseio.com",
  storageBucket: "class-project-95553.appspot.com",
  messagingSenderId: "1077729059008"
};
firebase.initializeApp(config);

// Store database paths in global variables
var database = firebase.database();
var userData = firebase.database().ref("/users");
var tripData = firebase.database().ref("/trips");

// getting all the elements in the dom
const txtEmail = $("#txtEmail");
const txtPassword = $("#txtPassword");
const btnLogin = $("#btnLogin");
const btnSignUp = $("#btnSignUp");
const btnLogout = $("#btnLogout");

// add login event
$("#btnLogin").on("click", function(){
	const email = txtEmail.val();
	const pass = txtPassword.val();
	const auth = firebase.auth();
	console.log("buttton worked");
	//sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
})

// User sign up

$("#btnSignUp").on("click", function(){
	const email = txtEmail.val();
	const pass = txtPassword.val();
	const auth = firebase.auth();
	//sign in
	//check for real email
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
})

// User sign out
$("#btnLogout").on("click", function(){
	firebase.auth().signOut();
	
})

// When user's authentication status changes, show certain things on the site
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		$("#btnLogout").removeClass("hide");
		$("#btnLogin").addClass("hide");
		$("#btnSignUp").addClass("hide");
		getCurrentUser(firebaseUser.uid);
	} else {
		$("#btnLogout").addClass("hide");
		$("#btnLogin").removeClass("hide");
		$("#btnSignUp").removeClass("hide");
		console.log("not logged in");
}

// Get current user's info

function getCurrentUser(user) {
	var user = user;
	var trips = database.ref("/users" + user).trips.val();
	trips.forEach(function(snap) {
		displayTrips(snap.key, snap.val());
	});
}

// Display user's trips on login

function displayTrips(tripId, cityName) {
	var $list = $("<ul/>");
	var $link = $("<li/>").attr({"class":"activate-dashboard", "data-trip": tripId}).html(cityName).appendTo($list);
	$("user-trip-list").append($list);
}

// Populate existing data from database upon clicking trip

$(document).on("click", ".activate-dashboard", function() {
	var tripId = $(".activate-dashboard").data();
	var currentTrip = tripData.equalTo(tripId).val();
	console.log(currentTrip);
});

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
});

