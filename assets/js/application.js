/* Dave's Firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAh2KbxBIDfaljTf-1zuxRGW2paP3TDqIU",
  authDomain: "class-project-95553.firebaseapp.com",
  databaseURL: "https://class-project-95553.firebaseio.com",
  storageBucket: "class-project-95553.appspot.com",
  messagingSenderId: "1077729059008"
};*/
// Initialize Firebase
var config = {
	apiKey: "AIzaSyAzrf8-HFMI0rYABhns7pYbWDA5No-w9mM",
	authDomain: "test-project-3313e.firebaseapp.com",
	databaseURL: "https://test-project-3313e.firebaseio.com",
	storageBucket: "test-project-3313e.appspot.com",
	messagingSenderId: "861837605444"
};
firebase.initializeApp(config);

// Store database paths in global variables
const database = firebase.database();
const userData = firebase.database().ref("users/");
const tripData = firebase.database().ref("trips/");
const auth = firebase.auth();

// When user's authentication status changes, show certain things on the site
auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        addUser(firebaseUser.uid, firebaseUser.email)
        $('#user-trips').removeClass('hide');
        $('#signInModal').modal('close');
        $("#btnLogout").removeClass("hide");
        $("#sign-in-link").addClass("hide");
        $("#sign-up-link").addClass("hide");
        displayTrips();
    } else {
        $("#dashboard").addClass("hide");
        $("#user-trips").addClass("hide");
        $("#btnLogout").addClass("hide");
        $("#sign-in-link").removeClass("hide");
        $("#sign-up-link").removeClass("hide");
        $("#sign-in-title").text("Sign In");
        $("#btnLogin").removeClass("hide");
        $("#btnSignUp").addClass("hide");
        console.log("not logged in");
    }
});

// Open sign-in modal upon user clicking "Sign In" button
$("#sign-in-link").on("click", function() {
	$('#signInModal').modal();
});

// Change sign-in modal if user clicks "Sign Up" button
$("#sign-up-link").on("click", function() {
	$('#signInModal').modal();
	$('#sign-in-title').text("Sign Up");
	$('#btnLogin').addClass('hide');
	$('#btnSignUp').removeClass('hide');
});

// add login event
$("#btnLogin").on("click", function(){
	$('#signInModal').modal();
	const email = $("#txtEmail").val();
	const pass = $("#txtPassword").val();
	//sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
});

// User sign up
$("#btnSignUp").on("click", function(){
	const email = $("#txtEmail").val();
	const pass = $("#txtPassword").val();
	//sign in
	//check for real email
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
});

// User sign out
$("#btnLogout").on("click", function(){
	auth.signOut();
});

// Add user to user object

function addUser(userId, email) {
	database.ref("users/" + userId).set({
		"email": email
	});
}

// Display user's trips on login

function displayTrips() {
	var userId = auth.currentUser.uid;
	console.log(userId);
	database.ref("users/" + userId + "/trips").once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var tripId = childSnapshot.key;
			var location = childSnapshot.val();
			
			// Build HTML elements

			var tripTxt = $("<span>").attr({"class":"activate-dashboard", "data-id":tripId}).text(location);
			$("#trip-list").append(tripTxt);
		});
	});
}

// Pull up Add Trip modal upon clicking "Add A Trip" button

$("#add-trip-link").on("click", function(){
	$('#addTripModal').modal();	
});

// Add a trip when someone fills out the form

$("#set-location").on("click", function() {
	var location = $("#trip-destination").val().trim();
	var timeFrame = $("#trip-timeframe").val().trim();
	var userId = auth.currentUser.uid;

	var tripId = tripData.push().key;

	database.ref("trips/" + tripId).set({
		where: location,
		when: timeFrame,
		owner: userId
	});

	database.ref("users/" + userId + "/trips/" + tripId).set(
		location
	);
	$("#addTripModal").modal("close");
	displayTrips();
});

// Populate existing data from database upon clicking trip

$(document).on("click", ".activate-dashboard", function() {
	var tripId = $(".activate-dashboard").data("");
	var currentTrip = tripData.equalTo(tripId).val();
	console.log(currentTrip);
});

// FINISH THE ACTIVATE DASHBOARD FUNCTION
// WRITE PLACEHOLDER FUNCTIONS TO ADD DATA TO THE DATABASE FOR EACH SECTION


// HTML: ADD MODALS FOR EACH SECTION
// HTML: MOVE BUTTONS TO ADD THINGS FOR EACH SECTION ON DASHBOARD
