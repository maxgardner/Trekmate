// Functions to display Dashboard correctly for that user

var tripId;

function showDashboard(tripId) {
	tripId = tripId;
	$("#user-trips").addClass("hide");
	$("#dashboard").removeClass("hide").attr("data-id", tripId);
	$('#back2Trips').removeClass("hide");
	$('#weather').empty();
	
	database.ref("trips/" + tripId).once("value").then(function(snapshot) {
		var city = snapshot.val().city.split(" ").join("+");
		var state = snapshot.val().state;
		var leaving = snapshot.val().leaving;
		var returning = snapshot.val().returning;
		var location = city + ", " + state;
		$("#city-name").text(location);
		showWeather(city + "," + state);

		var tripTimeFrame = leaving + " - " + returning;
		$("#trip-timeframe").html(tripTimeFrame);
		$("#googleTour").attr("href", "http://google.com/search#q=" + city + "+" + state + "+tourist&*");
	});

	showFlights(tripId);
	showHotels(tripId);
	showRental(tripId);
	showItinerary(tripId);
}

function showHotels(tripId) {
	database.ref("trips/" + tripId + "/hotels").once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnap) {
			var hotel = childSnap.val();
			var outerDiv = $("<div/>").attr("class", "card-addition");
			var nameHTML = $("<p/>").attr("class", "business-name").text(hotel.name);
			var numberHTML = $("<p/>").attr("class", "business-number").text(hotel.phone);
			var addressHTML = $("<p/>").attr("class", "business-address").text(hotel.address);
			outerDiv.append(nameHTML, numberHTML, addressHTML);
			$("#userHotel").append(outerDiv);
		});
	});
}

function showRental(tripId) {
	database.ref("trips/" + tripId + "/rental").once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnap) {
			var rental = childSnap.val();
			var outerDiv = $("<div/>").attr("class", "card-addition");
			var nameHTML = $("<p/>").attr("class", "business-name").text(rental.name);
			var numberHTML = $("<p/>").attr("class", "business-number").text(rental.phone);
			var confirmNum = $("<p/>").attr("class", "business-address").text("Confirmation #" + rental.conf);
			outerDiv.append(nameHTML, numberHTML, confirmNum)
			$("#userCar").append(outerDiv);
		});
	});
}

function showItinerary(tripId) {
	database.ref("trips/" + tripId + "/itinerary").once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnap) {
			var activityId = childSnap.key;
			var text = childSnap.val();
			var activity = $("<li/>").attr({"class":"activities", "data-id":activityId}).html(text);
			$("#event").append(activity);
		});
	});
}

function googleTourist(tripId){
	$("#googleTour").attr("href", "https://google.com/search?q=" + "austin" + "+tourist");
};

// Add hotel info to database
$(document).on("click", "#addHotel", function(event) {
	event.preventDefault();
	var hotelName = $("#hotelName").val().trim();
	var hotelNumber = $("#hotelNumber").val().trim();
	var hotelAddress = $("#hotelAddress").val().trim();
	var tripId = $("#dashboard").data("id");
	var hotelId = database.ref("trips/" + tripId + "/hotels").push().key;
	database.ref("trips/" + tripId + "/hotels/" + hotelId).set({
		name: hotelName,
		phone: hotelNumber,
		address: hotelAddress
	});
	$("#addHotelModal").modal("close");
	showHotels();
});

// Add rental info to database
$(document).on("click", "#addRental", function(event) {
	event.preventDefault();
	var name = $("#carRentalName").val().trim();
	var confirmation = $("#carRentalConfirmation").val().trim();
	var number = $("#carRentalNumber").val().trim();
	var tripId = $("#dashboard").data("id");
	var rentalId = database.ref("trips/" + tripId + "/rental").push().key;
	database.ref("trips/" + tripId + "/rental/" + rentalId).set({
		name: name,
		phone: number,
		conf: confirmation
	});
	$("#addRentalModal").modal("close");
	showRental();
});

// Add activity to database
$(document).on("click", "#addActivity", function(event) {
	event.preventDefault();
	var activity = $("#user-activity").val().trim();
	var tripId = $("#dashboard").data("id");
	var activityId = database.ref("trips/" + tripId + "/itinerary").push(
		activity
	);
	$("#addActivityModal").modal("close");
	showItinerary();
});

// When a user clicks on an activity, delete it
$(document).on("click", ".activities", function(event) {
	event.preventDefault();
	var activityId = $(this).data("id");
	$(this).addClass("hide");
	var tripId = $("#dashboard").data("id");
	database.ref("trips/" + tripId + "/itinerary/" + activityId).remove();
	showItinerary();
});