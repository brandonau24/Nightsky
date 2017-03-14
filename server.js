var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("./")); //Serve static files in current directory

var usno = require("./USNOCaller");

app.post("/events", function(req, res){
    var lat = req.body.lat;
    var long = req.body.long
    //console.log(lat + ", " + long);
    var api = new usno(lat, long);
    api.getSolarEclipses();
});

app.listen(8080, function(){
    console.log("Listening at Port 8080");
});
