var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("./")); //Serve static files in current directory

var usno = require("./USNOCaller");
var db = require("./DatabaseManager");

var SPACE_EVENTS = ["Planets", "Solar Eclipse", "Lunar Eclipse"];
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];

app.post("/events", function(req, res){
    /*var lat = req.body.lat;
    var long = req.body.long
    //console.log(lat + ", " + long);
    var api = new usno(lat, long);
    api.getSolarEclipses();*/
    var html = 'Select a space event and a find all the ones occurring in the selected month. <br/><br/>';
    html += "<div class=\"container\">";
    html += "<div class=\"col-sm-2\ col-sm-offset-5\">";
    html += "<label for=\"spaceEvents\">Space Events:</label>"
    html += "<select class=\"form-control input-lg\" id=\"spaceEvents\">";
    for (var i = 0; i < SPACE_EVENTS.length; i++){
        //Create a dropdown menu of the different space events in array
        html += "<option value=\"" + SPACE_EVENTS[i] + "\">" + SPACE_EVENTS[i] + "</option>";
    }
    html += "</select><br>";
    html += "<label for=\"months\">Months:</label>"
    html += "<select class=\"form-control input-lg\" id=\"months\">";
    for(var i = 0; i < MONTHS.length; i++){
        //Create a dropdown menu of the months from months array
        html += "<option value=\"" + (i+1) + "\">" + MONTHS[i] + "</option>";
    }
    html += "</select><br>";

    html += "<input class=\"btn btn-default btn-lg\" type=\"button\" value=\"Find\" onclick=\"query()\"></div></div><br>"
    html += "<div class=\"container\" id=\"listings\"></div>";

    res.send(html);
});

app.post('/query', function(req, res){
    var event = req.body.event.toLowerCase();
    var month = parseInt(req.body.month);
    var dbManager = new db();
    dbManager.once("done", function(msg){
        res.send(msg);
    });
    dbManager.query(event, month);
});

app.listen(8080, function(){
    console.log("Listening at Port 8080");
});
