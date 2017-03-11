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
