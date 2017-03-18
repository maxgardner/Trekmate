function flightInfo(info) {
    console.log(info);
    $("#flightStatus").empty();
    $("#flightStatus").html(info.appendix.airlines[0].name + "<br>");
    $("#flightStatus").append(info.flightStatuses[0].carrierFsCode + "<br>");
    $("#flightStatus").append(info.flightStatuses[0].flightNumber + "<br>");
    $("#flightStatus").append("Status: " + info.flightStatuses[0].status);
}

$("#add-flight").on("click", function(event) {
    event.preventDefault();
    //
    // var airlineCode = $("#flightStatus-code").val();
    // var flightNumber = $("#flightStatus-number").val();
    // var flightDate = $("#flightStatus-date").val();

    var airlineCode ="BA"; // from database
    var flightNumber = "4146"; // from database
    var flightDate = "2017/3/11"; // from database

    console.log(airlineCode);
    console.log(flightNumber);
    console.log(flightDate);

    parameters = "flight/status/" + airlineCode + "/" + flightNumber + "/arr/" + flightDate;
    console.log(parameters);

    addAPIscript("flightstatus", "rest", "v2", "jsonp", parameters, "", "flightInfo");

});


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

    var tripId = $("#dashboard").data("id");

    var flightKey = database.ref("trips/" + tripId + "/flights").push().key;
    database.ref("trips/" + tripId + "/flights" + flightKey).set({
        year: year,
        month: month,
        day: day,
        airlineName: airlineName,
        flightNumber: flightNumber
    });

});
