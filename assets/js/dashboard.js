// Functions to display Dashboard correctly for that user
	var location; 

function showDashboard(tripId) {
	$("#user-trips").addClass("hide");
	$("#dashboard").removeClass("hide").attr("data-id", tripId);

	database.ref("trips/" + tripId).once("value").then(function(snapshot) {
		var city = snapshot.val().city;
		var state = snapshot.val().state;
		var leaving = snapshot.val().leaving;
		var returning = snapshot.val().returning;

		console.log(leaving);

		var location = city + ", " + state;
		$("#city-name").text(location);
		showWeather(city + "," + state);

		var tripTimeFrame = leaving + " - " + returning;
		$("#trip-timeframe").html(tripTimeFrame);
	});

	showFlights(tripId);
	showHotels(tripId);
	showTransport(tripId);
	showItinerary(tripId);
}

function showFlights(tripId) {
	database.ref("trips/" + tripId + "/flights").once("value").then(function(snapshot) {
		var flightInfo = snapshot.val();

	});
}

function showHotels(tripId) {
	database.ref("trips/" + tripId + "/hotels").once("value").then(function(snapshot) {
		var hotelInfo = snapshot.val();
		console.log(hotelInfo);
	});
}

function showTransport(tripId) {
	database.ref("trips/" + tripId + "/transport").once("value").then(function(snapshot) {
		var transportInfo = snapshot.val();
		console.log(transportInfo);
	});
}

function showItinerary(tripId) {
	database.ref("trips/" + tripId + "/itinerary").once("value").then(function(snapshot) {
		var itinerary = snapshot.val();
		console.log(itinerary);
	});
}
function googleTourist(tripId){
	$("#googleTour").attr("href", "https://google.com/search?q=" + "austin" + "+tourist");
};

// Open modals to add things to Dashboard

$("#add-hotel").on("click", function() {
	$("#hotel-name").attr("value", "");
	$("#hotel-address").attr("value", "");
	("#addHotelModal").modal();
})

// On click buttons to add information

$(document).on("click", "#add-hotel", function(event) {
	var hotelName = $("#hotel-name").val().trim();
	var hotelAddress = $("#hotel-address").val().trim();
})
