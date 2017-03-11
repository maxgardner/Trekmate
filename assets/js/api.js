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
