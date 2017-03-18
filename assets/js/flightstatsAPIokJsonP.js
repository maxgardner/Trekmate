function flightInfo(info) {
    console.log(info);
    $("#flightStatus").empty();
    $("#flightStatus").html("<br>" + info.appendix.airlines[0].name + "<br>");
    $("#flightStatus").append(info.flightStatuses[0].carrierFsCode + "<br>");
    $("#flightStatus").append(info.flightStatuses[0].flightNumber + "<br>");
    $("#flightStatus").append("Status: " + info.flightStatuses[0].status);
}

// add flight modal
$('document').ready(function() {
// // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();


});

// flight information

var date = null;
var res = null;
var year = null;
var month = null;
var day = null;
var airlineName = null;
var flightNumber = null;
// airline name
var airlineName = $("#autocomplete-input").val();
var tripId = null;

$("#flight-info").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    date = $("#flightDate").val();
    res = date.split("-");
    year = res[0];
    month = res[1];
    day = res[2];

    // airline name
    airlineName = $("#autocomplete-input").val();
    flightNumber = $("#flightNumber").val();

    tripId = $("#dashboard").data("id");

    var flightKey = database.ref("trips/" + tripId + "/flights").push().key;
    database.ref("trips/" + tripId + "/flights/" + flightKey).set({
        year: year,
        month: month,
        day: day,
        airlineName: airlineName,
        flightNumber: flightNumber
    });

});

//// get

function showFlights(tripId) {
  console.log("I'm working");
  console.log(tripId);
    database.ref("trips/" + tripId + "/flights").once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnap) {
          console.log("flights " + childSnap.val().airlineName);
            airlineName = childSnap.val().airlineName;
            flightNumber = childSnap.val().flightNumber;
            year = childSnap.val().year;
            month = childSnap.val().month;
            day = childSnap.val().day;
            console.log("flight Number "  + flightNumber);
            var flightDate = year + "/" + month + "/" + day; // from database

            console.log(airlineName);
            console.log(flightNumber);
            console.log(flightDate);

            parameters = "flight/status/" + airlineName + "/" + flightNumber + "/arr/" + flightDate;
            console.log(parameters);

            addAPIscript("flightstatus", "rest", "v2", "jsonp", parameters, "", "flightInfo");


        });
    });
}
