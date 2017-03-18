// This function generates the script in the body tag to call jasonp
// objects, for example
//
// APIname = "/airports";
// protocol = "/rest";
// version = "/v1";
// format = "/jsonp";  // json, jsonp xml
// parameters = "/cityCode/AUS";
// call function callback(info) in your script

function addAPIscript(APIname, protocol, version, format, parameters, options, callbackName) {

    const baseURI = "https://api.flightstats.com/flex";
    const appId = "?appId=f1920bab";
    const appKey = "&appKey=866c0c9ddb6f2848f67b53bb6d2c8164";

    var queryURL = baseURI +
        "/" + APIname +
        "/" + protocol +
        "/" + version +
        "/" + format +
        "/" + parameters +
        appId + appKey +
        options +
        "&callback=" + callbackName;
    console.log(queryURL);

    var jsonpSrcSript = $("<script>");
    jsonpSrcSript.attr("src", queryURL);

    $("body").append(jsonpSrcSript);
}

// FOR THE WEATHER

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

function showWeather(location) {
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
        var $maxTemp = $("<p/>").attr("class", "max-temp").html(result.main.temp_max + "&deg;");
        $("#max-temp").html($maxTemp);
        var $minTemp = $("<p/>").attr("class", "min-temp").html("Low: " + result.main.temp_min + "&deg;");
        var $humidity = $("<p/>").html(result.main.humidity + "&#37; humidity");

        $("#weather").append($minTemp, $humidity);

        console.log($("#weather"));

    }).fail(function(error) {
        console.log("Error: " + error);
    });
}