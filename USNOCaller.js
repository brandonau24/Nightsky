var http = require("http");
var utils = require("util");
var EventEmitter = require("events").EventEmitter;

var latCoord;
var longCoord;
var solarEclipsesJSON;

function USNOCaller(lat, long){
    latCoord = lat;
    longCoord = long;
    console.log(latCoord + ", " + longCoord);
    EventEmitter.call(this);
}

utils.inherits(USNOCaller,EventEmitter);

USNOCaller.prototype.getSolarEclipses = function(){
    //Retrieves a list of solar eclipses in the current year
    var year = new Date().getFullYear(); //Get current year
    var options = {
        host: "api.usno.navy.mil",
        path: "/eclipses/solar?year=" + year
                + "&coords=" + latCoord + "," + longCoord
                + "&height=176&format=json"
    };
    http.get(options, function(response){
        var str = "";
        response.on('data', function(chunk){
            str += chunk;
        });
        response.on('end', function(){
            //Create a JSON object with the key being the date of the event and the event being the attribute to the date
            var json = JSON.parse(str);
            var eclipseArray = json.eclipses_in_year;
            solarEclipsesJSON = "{";
            for(var i = 0; i < eclipseArray.length-1; i++){
                solarEclipsesJSON += eclipseArray[i].month + "/" + eclipseArray[i].day + "/" + eclipseArray[i].year + ": ";
                solarEclipsesJSON += eclipseArray[i].event;
                solarEclipsesJSON += ",";
            }
            //Last item of the eclipseArray will not follow with a comma
            var lastIndex = eclipseArray.length-1;
            solarEclipsesJSON += eclipseArray[lastIndex].month + "/" + eclipseArray[lastIndex].day + "/" + eclipseArray[lastIndex].year + ": ";
            solarEclipsesJSON += eclipseArray[lastIndex].event;
            solarEclipsesJSON += "};";
            //console.log(solarEclipsesJSON);
        });
    });
}

module.exports = USNOCaller;
